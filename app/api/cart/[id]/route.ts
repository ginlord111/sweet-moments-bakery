import { NextRequest, NextResponse } from "next/server";
import { storage } from "@server/storage";

// PATCH /api/cart/:id - Update cart item quantity
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { quantity } = body;

    if (typeof quantity !== "number" || quantity < 1) {
      return NextResponse.json({ error: "Invalid quantity" }, { status: 400 });
    }

    const updated = await storage.updateCartItem(id, quantity);

    if (!updated) {
      return NextResponse.json(
        { error: "Cart item not found" },
        { status: 404 }
      );
    }

    const product = await storage.getProduct(updated.productId);
    return NextResponse.json({
      ...updated,
      product,
    });
  } catch (error) {
    console.error("Failed to update cart item:", error);
    return NextResponse.json(
      { error: "Failed to update cart item" },
      { status: 500 }
    );
  }
}

// DELETE /api/cart/:id - Remove item from cart
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const deleted = await storage.deleteCartItem(id);
    if (!deleted) {
      return NextResponse.json(
        { error: "Cart item not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to remove item from cart:", error);
    return NextResponse.json(
      { error: "Failed to remove item from cart" },
      { status: 500 }
    );
  }
}
