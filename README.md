# ☕ Coffee Shop Admin Dashboard

A modern, responsive admin dashboard built with Next.js 15, TypeScript, and ShadCN UI for managing coffee shop operations.

## ✨ Features

### 📊 Dashboard Overview

- Real-time sales statistics and metrics
- Interactive charts and graphs using Recharts
- Quick action buttons for common tasks
- Recent activity feed

### 🛒 Order Management

- View and manage all customer orders
- Filter orders by status, date, and customer
- Update order status (pending, in-progress, completed, cancelled)
- Order statistics and insights

### 📦 Product Management

- Add, edit, and delete products
- Product categorization (Hot Drinks, Cold Beverages, Pastries, Snacks)
- Stock management and availability tracking
- Product performance analytics

### 👥 Customer Management

- Customer database with detailed profiles
- Order history and spending analytics
- Customer search and filtering
- Top customer insights

### 📈 Analytics & Reports

- Comprehensive sales analytics
- Product performance tracking
- Customer growth metrics
- Revenue by category breakdown
- Interactive charts and visualizations

### ⚙️ Settings & Configuration

- User profile management
- Store information configuration
- Notification preferences
- Theme customization (Light/Dark mode)
- Security settings

### 🎨 UI/UX Features

- **Purple Theme**: Beautiful purple color scheme
- **Dark/Light Mode**: Toggle between themes
- **Responsive Design**: Works on all devices
- **Modern UI**: Built with ShadCN UI components
- **Interactive Elements**: Hover effects and animations
- **Accessibility**: Keyboard navigation and screen reader support

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: ShadCN UI
- **Charts**: Recharts
- **Icons**: Lucide React
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod
- **Notifications**: Sonner

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd coffee-shop-admin
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
coffee-shop-admin/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── dashboard/          # Dashboard overview page
│   │   ├── orders/            # Order management page
│   │   ├── products/          # Product management page
│   │   ├── customers/         # Customer management page
│   │   ├── analytics/         # Analytics and reports page
│   │   └── settings/          # Settings page
│   ├── components/
│   │   ├── ui/                # ShadCN UI components
│   │   └── dashboard/         # Dashboard-specific components
│   └── lib/
│       ├── store/             # Zustand state management
│       ├── types.ts           # TypeScript interfaces
│       └── mock-data.ts       # Sample data for development
├── public/                    # Static assets
└── package.json
```

## 🎯 Key Pages

### Dashboard (`/dashboard`)

- Overview of key metrics
- Sales charts and graphs
- Recent orders and quick actions

### Orders (`/orders`)

- Order list with filtering and search
- Order status management
- Order statistics

### Products (`/products`)

- Product grid with categories
- Product management tools
- Stock and pricing information

### Customers (`/customers`)

- Customer database
- Customer analytics
- Order history per customer

### Analytics (`/analytics`)

- Comprehensive business insights
- Sales performance charts
- Customer growth metrics

### Settings (`/settings`)

- User profile management
- Store configuration
- Theme and notification preferences

## 🎨 Customization

### Theme Colors

The dashboard uses a custom purple theme. To modify colors, edit the CSS variables in `src/app/globals.css`:

```css
:root {
  --primary: oklch(0.488 0.243 264.376); /* Purple */
  /* ... other color variables */
}
```

### Adding New Components

1. Use ShadCN UI CLI to add new components:

   ```bash
   npx shadcn@latest add <component-name>
   ```

2. Import and use in your pages:
   ```tsx
   import { ComponentName } from "@/components/ui/component-name";
   ```

## 📱 Responsive Design

The dashboard is fully responsive and works on:

- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Features

1. **New Page**: Create a new folder in `src/app/`
2. **New Component**: Add to `src/components/`
3. **New Data Type**: Update `src/lib/types.ts`
4. **New State**: Add to `src/lib/store/dashboard-store.ts`

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For support or questions, please open an issue in the GitHub repository.

---

**Built with ❤️ using Next.js and ShadCN UI**
