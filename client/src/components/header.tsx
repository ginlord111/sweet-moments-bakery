import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

export function Header({ cartItemCount, onCartClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <h1 className="font-serif text-2xl font-bold text-primary">
              Sweet Moments
            </h1>
            {/* <nav className="hidden md:flex items-center gap-6">
              <a href="#shop" className="text-sm font-medium hover-elevate active-elevate-2 px-3 py-2 rounded-md transition-colors">
                Shop
              </a>
              <a href="#about" className="text-sm font-medium hover-elevate active-elevate-2 px-3 py-2 rounded-md transition-colors">
                About
              </a>
              <a href="#contact" className="text-sm font-medium hover-elevate active-elevate-2 px-3 py-2 rounded-md transition-colors">
                Contact
              </a>
            </nav> */}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={onCartClick}
            className="relative"
            data-testid="button-cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItemCount > 0 && (
              <Badge
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary text-primary-foreground"
                data-testid="badge-cart-count"
              >
                {cartItemCount}
              </Badge>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
