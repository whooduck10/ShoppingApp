# Luxe Perfumes Backend API

A comprehensive REST API for the Luxe Perfumes e-commerce platform built with Node.js, Express, and modern JavaScript.

## 🚀 Features

- **Authentication & Authorization** - JWT-based user authentication
- **Product Management** - CRUD operations for perfume products
- **Order Management** - Shopping cart and order processing
- **User Management** - User profiles and account management
- **Security** - Rate limiting, CORS, Helmet security headers
- **Validation** - Input validation with express-validator
- **Error Handling** - Centralized error handling middleware

## 📁 Project Structure

```
backend/
├── src/
│   ├── routes/
│   │   ├── auth.js          # Authentication routes
│   │   ├── products.js      # Product management routes
│   │   ├── orders.js        # Order and cart routes
│   │   └── users.js         # User management routes
│   ├── middleware/
│   │   ├── errorHandler.js  # Error handling middleware
│   │   └── notFound.js      # 404 handler
│   └── server.js            # Main server file
├── package.json
├── env.example
└── README.md
```

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# The server will run on http://localhost:8080
```

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user |
| POST | `/api/auth/logout` | Logout user |

### Product Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products (with filtering) |
| GET | `/api/products/featured` | Get featured products |
| GET | `/api/products/:id` | Get product by ID |
| POST | `/api/products` | Create new product (Admin) |
| PUT | `/api/products/:id` | Update product (Admin) |
| DELETE | `/api/products/:id` | Delete product (Admin) |
| GET | `/api/products/categories/list` | Get all categories |
| GET | `/api/products/brands/list` | Get all brands |

### Order Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/orders/cart` | Get user's cart |
| POST | `/api/orders/cart/add` | Add item to cart |
| PUT | `/api/orders/cart/update` | Update cart item |
| DELETE | `/api/orders/cart/remove/:id` | Remove item from cart |
| DELETE | `/api/orders/cart/clear` | Clear cart |
| POST | `/api/orders/create` | Create order from cart |
| GET | `/api/orders` | Get all orders |
| GET | `/api/orders/:id` | Get order by ID |
| PATCH | `/api/orders/:id/status` | Update order status |
| GET | `/api/orders/stats/overview` | Get order statistics |

### User Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users (Admin) |
| GET | `/api/users/:id` | Get user by ID |
| GET | `/api/users/profile/me` | Get current user profile |
| PUT | `/api/users/profile/me` | Update user profile |
| PUT | `/api/users/profile/password` | Change password |
| DELETE | `/api/users/profile/me` | Delete account |
| GET | `/api/users/stats/overview` | Get user statistics |
| GET | `/api/users/search` | Search users (Admin) |

## 🔧 Configuration

### Environment Variables

Create a `.env` file based on `env.example`:

```env
# Server Configuration
PORT=8080
NODE_ENV=development

# Frontend URL for CORS
FRONTEND_URL=http://localhost:5173

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=24h
```

### Available Scripts

```bash
npm run dev      # Start development server with nodemon
npm start        # Start production server
npm test         # Run tests
npm run lint     # Run ESLint
```

## 🔒 Security Features

- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - API rate limiting
- **Input Validation** - Request validation
- **Password Hashing** - bcrypt password hashing
- **JWT Authentication** - Token-based authentication

## 📊 Sample Data

The API includes sample data for testing:

### Users
- **Admin**: `admin@luxeperfumes.com` / `password`
- **Customer**: `customer@example.com` / `password`

### Products
- 8 premium perfume brands with detailed information
- Categories: Men, Women, Unisex
- Brands: Chanel, Dior, YSL, Tom Ford, Jo Malone, Byredo, Maison Margiela, Le Labo

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 📝 API Examples

### Register a new user
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get all products
```bash
curl http://localhost:8080/api/products
```

### Add item to cart
```bash
curl -X POST http://localhost:8080/api/orders/cart/add \
  -H "Content-Type: application/json" \
  -H "user-id: 1" \
  -d '{
    "productId": 1,
    "quantity": 2
  }'
```

## 🚀 Deployment

### Production Build

```bash
# Install dependencies
npm install --production

# Set environment variables
export NODE_ENV=production
export PORT=8080

# Start server
npm start
```

### Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 8080
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email support@luxeperfumes.com or create an issue in the repository. 