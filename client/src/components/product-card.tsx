import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card className="overflow-hidden hover-elevate transition-all group" data-testid={`card-product-${product.id}`}>
      <CardContent className="p-0">
        <div className="aspect-square relative overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
            data-testid={`img-product-${product.id}`}
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-3 p-4">
        <div className="w-full">
          <h3 className="font-serif font-medium text-lg mb-1" data-testid={`text-product-name-${product.id}`}>
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between gap-2">
            <span className="font-bold text-lg text-primary" data-testid={`text-price-${product.id}`}>
              ${parseFloat(product.price).toFixed(2)}
            </span>
            <Button
              size="icon"
              onClick={() => onAddToCart(product)}
              className="shrink-0"
              data-testid={`button-add-to-cart-${product.id}`}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
