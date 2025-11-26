import { NextRequest, NextResponse } from "next/server";
import { storage } from "../../../server/storage";

// GET /api/products - Get all products
export async function GET() {
  try {
    const products = await storage.getAllProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
