# Sweet Moments Bakery - Pastry Ordering System

## Overview

Sweet Moments Bakery is a full-stack e-commerce web application for ordering artisan breads and pastries online. The application features a product catalog with shopping cart functionality, checkout flow, and order management. It's designed with a warm, pink-themed pastry shop aesthetic that balances visual appeal with streamlined shopping functionality.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React with TypeScript for type-safe component development
- Vite as the build tool and development server, providing fast HMR and optimized production builds
- Wouter for lightweight client-side routing (homepage and checkout pages)

**UI Component System**
- shadcn/ui component library with Radix UI primitives for accessible, customizable components
- Tailwind CSS for utility-first styling with custom design tokens
- Custom theme system with CSS variables for colors, supporting a pink pastry aesthetic with neutral base colors
- Typography: Playfair Display (serif) for headings, Inter (sans-serif) for body text

**State Management & Data Fetching**
- TanStack React Query for server state management, caching, and data synchronization
- React Hook Form with Zod validation for form handling and validation
- Custom hooks for mobile detection and toast notifications

**Design System Principles**
- Mobile-first responsive design with breakpoint-based layouts
- Consistent spacing using Tailwind's 4, 6, 8, 12, 16 unit system
- Elevation system with hover and active states for interactive elements
- Product grids: 4 columns desktop, 2-3 tablet, 1-2 mobile

### Backend Architecture

**Server Framework**
- Express.js with TypeScript running on Node.js
- ESM module system for modern JavaScript features
- Separate development and production entry points for different build strategies

**API Design**
- RESTful API endpoints under `/api` prefix
- Product management: GET `/api/products` (list), GET `/api/products/:id` (single)
- Cart operations: GET `/api/cart`, POST `/api/cart`, PATCH `/api/cart/:id`, DELETE `/api/cart/:id`, DELETE `/api/cart`
- Order creation: POST `/api/orders`
- JSON request/response format with error handling middleware

**Data Layer**
- Drizzle ORM for type-safe database queries and schema management
- PostgreSQL dialect configuration (prepared for database connection)
- Schema-first approach with Zod validation derived from Drizzle schemas
- In-memory storage implementation (MemStorage) for development/testing

**Development vs Production**
- Development: Vite middleware integration with HMR, automatic index.html reloading
- Production: Pre-built static assets served from dist/public directory
- Build process: Vite for frontend, esbuild for backend bundling

### Data Models

**Products**
- Fields: id (UUID), name, description, price (decimal), category, image
- Initial data includes various pastries with product images

**Cart Items**
- Fields: id (UUID), productId (foreign reference), quantity (integer)
- Ephemeral state, cleared on checkout

**Orders**
- Fields: id (UUID), customer details (name, email, phone), delivery address (address, city, zipCode), items (JSON serialized), total (decimal)
- Captures complete order snapshot including product details at time of purchase

### Build & Deployment Strategy

**Development Workflow**
- `npm run dev`: Runs development server with Vite middleware and tsx for TypeScript execution
- Hot module replacement for instant feedback during development
- Type checking with `npm run check`

**Production Build**
- `npm run build`: Compiles frontend with Vite and bundles backend with esbuild
- Frontend output: dist/public (static assets)
- Backend output: dist/index.js (bundled server)
- `npm start`: Runs production server from bundled artifacts

**Database Migrations**
- Drizzle Kit for schema migrations with `npm run db:push`
- Migration files generated in ./migrations directory
- Schema source: shared/schema.ts for frontend/backend sharing

## External Dependencies

### UI & Component Libraries
- **Radix UI**: Comprehensive set of accessible UI primitives (@radix-ui/react-*)
- **shadcn/ui**: Pre-built component patterns following "New York" style variant
- **Lucide React**: Icon library for consistent iconography
- **cmdk**: Command palette component
- **Embla Carousel**: Touch-enabled carousel component
- **vaul**: Drawer/bottom sheet component

### Styling & Design
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **class-variance-authority**: Component variant management
- **tailwindcss-animate**: Animation utilities for Tailwind
- **Google Fonts**: Playfair Display, DM Sans, Architects Daughter, Fira Code, Geist Mono

### Data Management
- **TanStack React Query**: Async state management and caching
- **React Hook Form**: Performant form library with validation
- **Zod**: TypeScript-first schema validation
- **Drizzle ORM**: TypeScript ORM with drizzle-zod integration

### Database
- **PostgreSQL**: Primary database (configured via DATABASE_URL environment variable)
- **@neondatabase/serverless**: Neon-compatible PostgreSQL driver
- **connect-pg-simple**: PostgreSQL session store for Express

### Development Tools
- **Vite**: Frontend build tool and development server
- **@vitejs/plugin-react**: React support for Vite
- **tsx**: TypeScript execution for development server
- **esbuild**: Fast JavaScript bundler for production backend
- **Replit Plugins**: Runtime error modal, cartographer, dev banner for Replit environment

### Utilities
- **date-fns**: Date manipulation and formatting
- **nanoid**: Unique ID generation
- **clsx & tailwind-merge**: Conditional className utilities