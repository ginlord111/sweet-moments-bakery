# Pastry Ordering System - Design Guidelines

## Design Approach
**Reference-Based**: Drawing from successful e-commerce platforms (Shopify, Etsy) with a distinctive pink pastry-themed aesthetic. The design balances visual appeal with shopping functionality, creating a delightful browsing and purchasing experience.

## Core Design Principles
- Warm, inviting pastry shop atmosphere
- Clear product showcase with appetizing imagery
- Streamlined shopping flow from browse to checkout
- Mobile-first responsive design
- Pink theme integrated tastefully without overwhelming

## Typography System

**Primary Font**: Playfair Display (serif) for headings - elegant, bakery aesthetic
**Secondary Font**: Inter (sans-serif) for body text and UI elements

**Hierarchy**:
- Hero/Page Titles: 3xl to 5xl, Playfair Display, font-bold
- Section Headers: 2xl to 3xl, Playfair Display, font-semibold
- Product Names: xl, Playfair Display, font-medium
- Body Text: base to lg, Inter, font-normal
- UI Labels: sm to base, Inter, font-medium
- Prices: lg to xl, Inter, font-bold

## Layout System

**Spacing Primitives**: Use Tailwind units of 4, 6, 8, 12, and 16 for consistent rhythm throughout (p-4, gap-6, mt-8, py-12, mb-16)

**Container Strategy**:
- Full-width sections with inner max-w-7xl
- Product grids: max-w-6xl
- Checkout forms: max-w-2xl centered

## Component Library

### Navigation Header
- Sticky top navigation with logo, category links, search bar, and cart icon with item count badge
- Cart icon displays quantity bubble
- Mobile: Hamburger menu with slide-out drawer

### Hero Section
Large hero image showcasing bakery display case with fresh pastries. Overlay with semi-transparent treatment and blurred-background button for "Shop Now" CTA. Height: 70vh desktop, 50vh mobile.

### Product Grid
- Desktop: 4 columns (grid-cols-4)
- Tablet: 2-3 columns (md:grid-cols-2 lg:grid-cols-3)
- Mobile: 1-2 columns (grid-cols-1 sm:grid-cols-2)
- Product cards with image, name, short description, price, "Add to Cart" button
- Hover effect: Subtle lift and shadow enhancement

### Shopping Cart
- Slide-out drawer from right side (desktop) or bottom sheet (mobile)
- Item rows with thumbnail image, name, quantity controls (+/-), price, remove button
- Subtotal, tax estimate, total at bottom
- "Checkout" button prominently placed

### Checkout Page
Two-column layout (desktop): Left side order summary, right side customer form
Single column (mobile): Form first, then order summary
Form sections: Contact info, delivery address, payment method
Order summary: Itemized list with thumbnails, quantities, prices

### Category Navigation
Horizontal scrolling chips/pills for bread types (Sourdough, Baguettes, Croissants, Pastries, Cakes)
Sticky below main header on scroll

### Product Cards
- Square aspect ratio images (1:1)
- Product name and price clearly visible
- Quick "+" button for one-click add to cart
- Hover reveals full description

### Footer
Three columns: About/Contact, Quick Links (Shop, Cart, Account), Newsletter signup
Social media icons and business hours
Single column stack on mobile

## Images Strategy

**Hero Image**: Full-width bakery display case shot with golden pastries, croissants, and bread loaves arranged attractively. Warm lighting, professional photography style.

**Product Images**: High-quality, consistent square photos of individual pastries/breads on white or light backgrounds. Professional food photography with natural lighting.

**Additional Imagery**: 
- Category banners: Lifestyle shots of breads in baskets or on cutting boards
- About section: Bakery interior or baker at work (if included)

All images should be optimized, using modern formats (WebP with fallbacks).

## Interactions & Animations

**Minimal, purposeful animations**:
- Smooth add-to-cart button feedback (scale pulse)
- Cart drawer slide-in/out transition
- Subtle hover states on product cards (transform: translateY(-4px))
- Loading states for checkout submission
- No scroll-triggered animations or parallax

## Responsive Behavior

**Breakpoints**:
- Mobile: Base styles up to 640px
- Tablet: md (768px) - 2 column grids
- Desktop: lg (1024px) - 4 column grids, full navigation

**Mobile Optimizations**:
- Larger tap targets (min 44px)
- Bottom navigation bar for key actions
- Collapsible sections in checkout
- Thumb-friendly cart quantity controls

## Page-Specific Layouts

**Homepage**: Hero → Featured Products → Category Grid → Newsletter CTA → Footer

**Shop Page**: Category filters → Product grid → Pagination

**Cart Overlay**: Slide-out panel, not full page

**Checkout**: Progressive disclosure form with clear step indicators

---

This design creates an inviting, efficient pastry shopping experience with the pink theme woven throughout while maintaining professional e-commerce functionality.