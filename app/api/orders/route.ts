import { NextRequest, NextResponse } from "next/server";
import { storage } from "@server/storage";
import { insertOrderSchema } from "@shared/schema";
import { z } from "zod";

// POST /api/orders - Create order (checkout)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Parse and validate customer information
    const customerData = insertOrderSchema
      .omit({ items: true, total: true })
      .parse(body);

    // Validate that the cart is not empty
    const cartItems = await storage.getAllCartItems();
    if (cartItems.length === 0) {
      return NextResponse.json(
        { error: "Cannot place order with empty cart" },
        { status: 400 }
      );
    }

    // Build authoritative order items from cart
    const authoritativeOrderItems: Array<{
      productId: string;
      name: string;
      quantity: number;
      price: string;
    }> = [];

    let subtotalCents = 0;

    for (const cartItem of cartItems) {
      const product = await storage.getProduct(cartItem.productId);
      if (!product) {
        return NextResponse.json(
          {
            error: `Product ${cartItem.productId} no longer available`,
          },
          { status: 400 }
        );
      }

      authoritativeOrderItems.push({
        productId: product.id,
        name: product.name,
        quantity: cartItem.quantity,
        price: product.price,
      });

      // Calculate using cents to avoid floating point issues
      const priceCents = Math.round(parseFloat(product.price) * 100);
      subtotalCents += priceCents * cartItem.quantity;
    }

    // Calculate tax in cents (8%)
    const taxCents = Math.round(subtotalCents * 0.08);
    const totalCents = subtotalCents + taxCents;

    // Convert back to dollars
    const calculatedTotal = (totalCents / 100).toFixed(2);

    // Create order with authoritative data
    const order = await storage.createOrder({
      ...customerData,
      items: JSON.stringify(authoritativeOrderItems),
      total: calculatedTotal,
    });

    // Clear cart after successful order
    await storage.clearCart();

    return NextResponse.json(order);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("Failed to create order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
