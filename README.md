# 🎭 Luxe Perfumes - Full Stack E-commerce Platform

A complete online shopping platform for luxury perfumes built with React (Frontend) and Node.js/Express (Backend).

## 🚀 Project Overview

This project consists of two main components:
- **Frontend**: React TypeScript application with modern UI/UX
- **Backend**: Node.js Express API with comprehensive e-commerce functionality

## 📁 Project Structure

```
template/
├── frontend/                 # React TypeScript Frontend
│   ├── src/
│   │   ├── pages/
│   │   │   ├── MainPage.tsx  # Main shopping page
│   │   │   └── MainPage.css  # Styling for main page
│   │   ├── App.tsx           # Main app component
│   │   ├── App.css           # Global styles
│   │   ├── main.tsx          # Entry point
│   │   └── index.css         # Base styles
│   └── package.json
├── backend/                  # Node.js Express Backend
│   ├── src/
│   │   ├── routes/
│   │   │   ├── auth.js       # Authentication routes
│   │   │   ├── products.js   # Product management
│   │   │   ├── orders.js     # Order & cart management
│   │   │   └── users.js      # User management
│   │   ├── middleware/
│   │   │   ├── errorHandler.js
│   │   │   └── notFound.js
│   │   └── server.js         # Main server file
│   ├── package.json
│   ├── env.example
│   └── README.md
└── README.md                 # This file
```

## 🎨 Frontend Features

### **Main Shopping Page**
- **Swiping Image Carousel** with auto-advance and manual controls
- **8 Premium Perfume Brands** displayed in responsive grid
- **Modern Luxury Design** with gradient themes and animations
- **Responsive Layout** optimized for all devices

### **Perfume Brands Included**
1. **Chanel N°5** - The iconic luxury fragrance ($299)
2. **Dior Sauvage** - Fresh masculine scent ($189)
3. **YSL Black Opium** - Addictive gourmand fragrance ($245)
4. **Tom Ford Tobacco Vanille** - Sophisticated oriental ($385)
5. **Jo Malone Wood Sage & Sea Salt** - Fresh coastal scent ($165)
6. **Byredo Gypsy Water** - Bohemian spirit ($275)
7. **Maison Margiela Jazz Club** - Smooth jazz-inspired ($135)
8. **Le Labo Santal 33** - Iconic sandalwood ($295)

### **UI/UX Features**
- ✨ **Auto-advancing carousel** with smooth transitions
- 🎯 **Interactive hover effects** on product cards
- ⭐ **Star rating system** for each perfume
- 🛒 **Add to Cart** functionality with overlay buttons
- 📱 **Mobile-responsive** design
- 🎨 **Luxury gradient theme** (#667eea to #764ba2)
- 🔄 **Smooth animations** and transitions

## 🔧 Backend Features

### **API Endpoints**
- **Authentication**: Register, Login, Logout, User Profile
- **Products**: CRUD operations, filtering, pagination
- **Orders**: Cart management, order processing, status updates
- **Users**: Profile management, account settings

### **Security & Performance**
- 🔒 **JWT Authentication** with bcrypt password hashing
- 🛡️ **Helmet security headers** and CORS protection
- ⚡ **Rate limiting** to prevent abuse
- ✅ **Input validation** with express-validator
- 📊 **Request logging** with Morgan
- 🗜️ **Response compression** for better performance

### **Sample Data**
- **Users**: Admin and customer accounts
- **Products**: 8 premium perfume brands with detailed info
- **Orders**: Sample order data for testing

## 🚀 Quick Start

### **Frontend (Port 5173)**
```bash
cd frontend
npm install
npm run dev
# Visit: http://localhost:5173
```

### **Backend (Port 8080)**
```bash
cd backend
npm install
npm run dev
# API: http://localhost:8080
```

## 📚 API Documentation

### **Health Check**
```bash
curl http://localhost:8080/health
```

### **Authentication**
```bash
# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@luxeperfumes.com","password":"password"}'

# Register
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

### **Products**
```bash
# Get all products
curl http://localhost:8080/api/products

# Get featured products
curl http://localhost:8080/api/products/featured

# Get product by ID
curl http://localhost:8080/api/products/1
```

### **Cart & Orders**
```bash
# Add to cart
curl -X POST http://localhost:8080/api/orders/cart/add \
  -H "Content-Type: application/json" \
  -H "user-id: 1" \
  -d '{"productId": 1, "quantity": 2}'

# Get cart
curl -H "user-id: 1" http://localhost:8080/api/orders/cart
```

## 🎯 Key Features

### **Frontend**
- 🖼️ **Image Carousel** with 4 luxury shop images
- 🏷️ **Product Cards** with hover effects and ratings
- 🎨 **Modern Design** with glassmorphism and gradients
- 📱 **Responsive Layout** for all screen sizes
- ⚡ **Fast Performance** with optimized images

### **Backend**
- 🔐 **Secure Authentication** with JWT tokens
- 📦 **Product Management** with filtering and pagination
- 🛒 **Shopping Cart** functionality
- 📊 **Order Processing** with status tracking
- 👤 **User Profiles** with detailed information
- 📈 **Statistics** and analytics endpoints

## 🛠️ Technology Stack

### **Frontend**
- **React 18** with TypeScript
- **Vite** for fast development
- **CSS3** with modern features
- **Responsive Design** principles

### **Backend**
- **Node.js** with Express.js
- **JWT** for authentication
- **bcryptjs** for password hashing
- **express-validator** for input validation
- **Helmet** for security headers
- **Morgan** for request logging

## 🔒 Security Features

- **CORS** protection for cross-origin requests
- **Rate limiting** to prevent API abuse
- **Input validation** on all endpoints
- **Password hashing** with bcrypt
- **JWT token** authentication
- **Security headers** with Helmet

## 📊 Sample Data

### **Users**
- **Admin**: `admin@luxeperfumes.com` / `password`
- **Customer**: `customer@example.com` / `password`

### **Products**
- 8 premium perfume brands
- Categories: Men, Women, Unisex
- Price range: $135 - $385
- Stock management and ratings

## 🚀 Deployment

### **Frontend**
```bash
cd frontend
npm run build
# Deploy dist/ folder to your hosting service
```

### **Backend**
```bash
cd backend
npm start
# Set NODE_ENV=production for production
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support or questions:
- Create an issue in the repository
- Email: support@luxeperfumes.com

---

**🎉 Both frontend and backend are now running successfully!**

- **Frontend**: http://localhost:5173 (React shopping page)
- **Backend**: http://localhost:8080 (Express API)
- **Health Check**: http://localhost:8080/health

The complete e-commerce platform is ready for development and testing! 🚀 