# LuxeMarket - Full-Stack E-Commerce Platform

![LuxeMarket Demo](demo.gif) *(Optional: Add a GIF/screenshot of your project)*  

A modern, responsive, and full-stack e-commerce platform built with mock data for portfolio showcasing. Features include product catalog, cart/checkout, fake payment integration, real-time inventory, and an admin dashboard.

## 🔥 Live Demo  
[View Live Demo](https://luxemarket-demo.vercel.app) *(Replace with your deployment link)*  

## 🛠️ Tech Stack  
- **Frontend**: React.js + Next.js (TypeScript)  
- **Styling**: Tailwind CSS + ShadCN UI  
- **Backend**: Next.js API Routes (Mock) / Node.js + Express  
- **Database**: Firebase (or MongoDB for mock data)  
- **Payment Mock**: Stripe test mode  
- **Deployment**: Vercel (Frontend) + Render (Backend)  

## ✨ Key Features  
### User-Facing  
✅ Responsive UI (Mobile/Desktop)  
✅ Product catalog with search/filters  
✅ Cart management & mock checkout flow  
✅ Fake payment gateway (Stripe simulation)  
✅ Guest checkout & order confirmation  

### Admin Dashboard  
📊 Analytics overview (sales, orders)  
🛒 Product management (CRUD)  
📦 Order status management  
👥 User management (mock data)  

## 🚀 Installation  
1. **Clone the repo**  
   ```bash
   git clone https://github.com/your-username/luxemarket.git
   cd luxemarket
2. **Install Dependancies**
   npm install
3. **Set up environment variables**
   Create a .env.local file:
   NEXT_PUBLIC_STRIPE_PUBLIC_KEY=your_stripe_test_key
   NEXT_PUBLIC_FIREBASE_CONFIG=your_firebase_config
4. **Run the development server**
   npm run dev
