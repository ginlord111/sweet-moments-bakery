import { 
  type Product, 
  type InsertProduct,
  type CartItem,
  type InsertCartItem,
  type Order,
  type InsertOrder
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Products
  getAllProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;

  // Cart Items
  getAllCartItems(): Promise<CartItem[]>;
  getCartItem(id: string): Promise<CartItem | undefined>;
  createCartItem(cartItem: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: string, quantity: number): Promise<CartItem | undefined>;
  deleteCartItem(id: string): Promise<boolean>;
  clearCart(): Promise<void>;

  // Orders
  createOrder(order: InsertOrder): Promise<Order>;
  getOrder(id: string): Promise<Order | undefined>;
}

export class MemStorage implements IStorage {
  private products: Map<string, Product>;
  private cartItems: Map<string, CartItem>;
  private orders: Map<string, Order>;

  constructor() {
    this.products = new Map();
    this.cartItems = new Map();
    this.orders = new Map();
    this.initializeProducts();
  }

  private initializeProducts() {
    const initialProducts: InsertProduct[] = [
      {
        name: "Classic Croissant",
        description: "Buttery, flaky French croissant baked to golden perfection",
        price: "3.50",
        category: "Pastries",
        image: "/images/golden_flaky_croissant_product.png",
      },
      {
        name: "Artisan Sourdough",
        description: "Rustic sourdough with crispy crust and tangy flavor",
        price: "8.00",
        category: "Breads",
        image: "/images/artisan_sourdough_bread_loaf.png",
      },
      {
        name: "French Baguette",
        description: "Traditional French baguette with golden crispy crust",
        price: "4.50",
        category: "Breads",
        image: "/images/french_baguette_product_photo.png",
      },
      {
        name: "Cinnamon Roll",
        description: "Sweet cinnamon roll with cream cheese icing",
        price: "4.00",
        category: "Pastries",
        image: "/images/cinnamon_roll_with_icing.png",
      },
      {
        name: "Chocolate Croissant",
        description: "Flaky croissant filled with rich dark chocolate",
        price: "4.25",
        category: "Pastries",
        image: "/images/chocolate_croissant_pain_au_chocolat.png",
      },
      {
        name: "Blueberry Muffin",
        description: "Moist muffin bursting with fresh blueberries",
        price: "3.75",
        category: "Pastries",
        image: "/images/blueberry_muffin_product_photo.png",
      },
      {
        name: "Multigrain Bread",
        description: "Healthy whole grain bread with seeds and nuts",
        price: "6.50",
        category: "Breads",
        image: "/images/multigrain_bread_loaf_sliced.png",
      },
      {
        name: "Almond Danish",
        description: "Flaky Danish pastry topped with sliced almonds",
        price: "4.50",
        category: "Pastries",
        image: "/images/almond_danish_pastry.png",
      },
    ];

    initialProducts.forEach((product) => {
      const id = randomUUID();
      this.products.set(id, { ...product, id });
    });
  }

  // Products
  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }

  // Cart Items
  async getAllCartItems(): Promise<CartItem[]> {
    return Array.from(this.cartItems.values());
  }

  async getCartItem(id: string): Promise<CartItem | undefined> {
    return this.cartItems.get(id);
  }

  async createCartItem(insertCartItem: InsertCartItem): Promise<CartItem> {
    const id = randomUUID();
    const cartItem: CartItem = { ...insertCartItem, id };
    this.cartItems.set(id, cartItem);
    return cartItem;
  }

  async updateCartItem(id: string, quantity: number): Promise<CartItem | undefined> {
    const cartItem = this.cartItems.get(id);
    if (!cartItem) return undefined;
    
    const updated = { ...cartItem, quantity };
    this.cartItems.set(id, updated);
    return updated;
  }

  async deleteCartItem(id: string): Promise<boolean> {
    return this.cartItems.delete(id);
  }

  async clearCart(): Promise<void> {
    this.cartItems.clear();
  }

  // Orders
  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = randomUUID();
    const order: Order = { ...insertOrder, id };
    this.orders.set(id, order);
    return order;
  }

  async getOrder(id: string): Promise<Order | undefined> {
    return this.orders.get(id);
  }
}

export const storage = new MemStorage();
