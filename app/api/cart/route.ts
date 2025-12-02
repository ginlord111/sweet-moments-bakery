import { NextRequest, NextResponse } from "next/server";
import { storage } from "@server/storage";
import { insertCartItemSchema } from "@shared/schema";
import { z } from "zod";

// GET /api/cart - Get all cart items
export async function GET() {
  try {
    const cartItems = await storage.getAllCartItems();
    const itemsWithProducts = await Promise.all(
      cartItems.map(async (item) => {
        const product = await storage.getProduct(item.productId);
        return {
          ...item,
          product,
        };
      })
    );
    return NextResponse.json(itemsWithProducts);
  } catch (error) {
    console.error("Failed to fetch cart:", error);
    return NextResponse.json(
      { error: "Failed to fetch cart" },
      { status: 500 }
    );
  }
}

// POST /api/cart - Add item to cart
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = insertCartItemSchema.parse(body);

    // Check if product exists
    const product = await storage.getProduct(data.productId);
    console.log("🚀 ~ POST ~ product:", product);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Check if item already exists in cart
    const existingItems = await storage.getAllCartItems();
    const existingItem = existingItems.find(
      (item) => item.productId === data.productId
    );

    if (existingItem) {
      // Update quantity if item already in cart
      const updated = await storage.updateCartItem(
        existingItem.id,
        existingItem.quantity + data.quantity
      );
      return NextResponse.json({
        ...updated,
        product,
      });
    }

    const cartItem = await storage.createCartItem(data);
    return NextResponse.json({
      ...cartItem,
      product,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("Failed to add item to cart:", error);
    return NextResponse.json(
      { error: "Failed to add item to cart" },
      { status: 500 }
    );
  }
}

// DELETE /api/cart - Clear cart
export async function DELETE() {
  try {
    await storage.clearCart();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to clear cart:", error);
    return NextResponse.json(
      { error: "Failed to clear cart" },
      { status: 500 }
    );
  }
}
