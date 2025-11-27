import { NextRequest, NextResponse } from "next/server";
import { storage } from "@server/storage";

// GET /api/products - Get all products
export async function GET() {
  try {
    // Verify storage is available
    if (!storage) {
      console.error("Storage is not initialized");
      return NextResponse.json(
        { error: "Storage not initialized" },
        { status: 500 }
      );
    }

    const products = await storage.getAllProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    const errorStack = error instanceof Error ? error.stack : undefined;
    console.error("Error details:", {
      errorMessage,
      errorStack,
      errorName: error instanceof Error ? error.name : typeof error,
    });
    return NextResponse.json(
      {
        error: "Failed to fetch products",
        details:
          process.env.NODE_ENV === "development" ? errorMessage : undefined,
      },
      { status: 500 }
    );
  }
}
