// import type { Express } from "express";
// import { createServer, type Server } from "http";
// import { storage } from "./storage";
// import { insertCartItemSchema, insertOrderSchema } from "@shared/schema";
// import { z } from "zod";

// export async function registerRoutes(app: Express): Promise<Server> {
//   // Get all products
//   app.get("/api/products", async (_req, res) => {
//     try {
//       const products = await storage.getAllProducts();
//       res.json(products);
//     } catch (error) {
//       res.status(500).json({ error: "Failed to fetch products" });
//     }
//   });

//   // Get single product
//   app.get("/api/products/:id", async (req, res) => {
//     try {
//       const product = await storage.getProduct(req.params.id);
//       if (!product) {
//         return res.status(404).json({ error: "Product not found" });
//       }
//       res.json(product);
//     } catch (error) {
//       res.status(500).json({ error: "Failed to fetch product" });
//     }
//   });

//   // Get all cart items
//   app.get("/api/cart", async (_req, res) => {
//     try {
//       const cartItems = await storage.getAllCartItems();
//       const itemsWithProducts = await Promise.all(
//         cartItems.map(async (item) => {
//           const product = await storage.getProduct(item.productId);
//           return {
//             ...item,
//             product,
//           };
//         })
//       );
//       res.json(itemsWithProducts);
//     } catch (error) {
//       res.status(500).json({ error: "Failed to fetch cart" });
//     }
//   });

//   // Add item to cart
//   app.post("/api/cart", async (req, res) => {
//     try {
//       const data = insertCartItemSchema.parse(req.body);
      
//       // Check if product exists
//       const product = await storage.getProduct(data.productId);
//       if (!product) {
//         return res.status(404).json({ error: "Product not found" });
//       }

//       // Check if item already exists in cart
//       const existingItems = await storage.getAllCartItems();
//       const existingItem = existingItems.find(
//         (item) => item.productId === data.productId
//       );

//       if (existingItem) {
//         // Update quantity if item already in cart
//         const updated = await storage.updateCartItem(
//           existingItem.id,
//           existingItem.quantity + data.quantity
//         );
//         return res.json({
//           ...updated,
//           product,
//         });
//       }

//       const cartItem = await storage.createCartItem(data);
//       res.json({
//         ...cartItem,
//         product,
//       });
//     } catch (error) {
//       if (error instanceof z.ZodError) {
//         return res.status(400).json({ error: error.errors });
//       }
//       res.status(500).json({ error: "Failed to add item to cart" });
//     }
//   });

//   // Update cart item quantity
//   app.patch("/api/cart/:id", async (req, res) => {
//     try {
//       const { quantity } = req.body;
      
//       if (typeof quantity !== "number" || quantity < 1) {
//         return res.status(400).json({ error: "Invalid quantity" });
//       }

//       const updated = await storage.updateCartItem(req.params.id, quantity);
      
//       if (!updated) {
//         return res.status(404).json({ error: "Cart item not found" });
//       }

//       const product = await storage.getProduct(updated.productId);
//       res.json({
//         ...updated,
//         product,
//       });
//     } catch (error) {
//       res.status(500).json({ error: "Failed to update cart item" });
//     }
//   });

//   // Remove item from cart
//   app.delete("/api/cart/:id", async (req, res) => {
//     try {
//       const deleted = await storage.deleteCartItem(req.params.id);
//       if (!deleted) {
//         return res.status(404).json({ error: "Cart item not found" });
//       }
//       res.json({ success: true });
//     } catch (error) {
//       res.status(500).json({ error: "Failed to remove item from cart" });
//     }
//   });

//   // Clear cart
//   app.delete("/api/cart", async (_req, res) => {
//     try {
//       await storage.clearCart();
//       res.json({ success: true });
//     } catch (error) {
//       res.status(500).json({ error: "Failed to clear cart" });
//     }
//   });

//   // Create order (checkout)
//   app.post("/api/orders", async (req, res) => {
//     try {
//       // Parse and validate customer information
//       const customerData = insertOrderSchema.omit({ items: true, total: true }).parse(req.body);
      
//       // Validate that the cart is not empty
//       const cartItems = await storage.getAllCartItems();
//       if (cartItems.length === 0) {
//         return res.status(400).json({ error: "Cannot place order with empty cart" });
//       }
      
//       // Build authoritative order items from cart
//       const authoritativeOrderItems: Array<{ 
//         productId: string; 
//         name: string; 
//         quantity: number; 
//         price: string;
//       }> = [];
      
//       let subtotalCents = 0;
      
//       for (const cartItem of cartItems) {
//         const product = await storage.getProduct(cartItem.productId);
//         if (!product) {
//           return res.status(400).json({ 
//             error: `Product ${cartItem.productId} no longer available` 
//           });
//         }
        
//         authoritativeOrderItems.push({
//           productId: product.id,
//           name: product.name,
//           quantity: cartItem.quantity,
//           price: product.price,
//         });
        
//         // Calculate using cents to avoid floating point issues
//         const priceCents = Math.round(parseFloat(product.price) * 100);
//         subtotalCents += priceCents * cartItem.quantity;
//       }
      
//       // Calculate tax in cents (8%)
//       const taxCents = Math.round(subtotalCents * 0.08);
//       const totalCents = subtotalCents + taxCents;
      
//       // Convert back to dollars
//       const calculatedTotal = (totalCents / 100).toFixed(2);
      
//       // Create order with authoritative data
//       const order = await storage.createOrder({
//         ...customerData,
//         items: JSON.stringify(authoritativeOrderItems),
//         total: calculatedTotal,
//       });
      
//       // Clear cart after successful order
//       await storage.clearCart();
      
//       res.json(order);
//     } catch (error) {
//       if (error instanceof z.ZodError) {
//         return res.status(400).json({ error: error.errors });
//       }
//       res.status(500).json({ error: "Failed to create order" });
//     }
//   });

//   // Get order by ID
//   app.get("/api/orders/:id", async (req, res) => {
//     try {
//       const order = await storage.getOrder(req.params.id);
//       if (!order) {
//         return res.status(404).json({ error: "Order not found" });
//       }
//       res.json(order);
//     } catch (error) {
//       res.status(500).json({ error: "Failed to fetch order" });
//     }
//   });

//   const httpServer = createServer(app);
//   return httpServer;
// }
