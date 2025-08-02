#!/bin/bash

echo "🚀 Pushing Luxe Perfumes Shopping App to GitHub..."

# Initialize git repository
echo "📁 Initializing Git repository..."
git init
git branch -m main

# Add remote origin
echo "🔗 Adding remote origin..."
git remote add origin https://github.com/whooduck10/ShoppingApp.git

# Add all files
echo "📦 Adding files to Git..."
git add .

# Commit changes
echo "💾 Committing changes..."
git commit -m "🎭 Initial commit: Luxe Perfumes Full Stack E-commerce Platform

✨ Features:
- React TypeScript frontend with luxury perfume shopping page
- Node.js Express backend API with comprehensive e-commerce functionality
- Swiping image carousel with 8 premium perfume brands
- JWT authentication and user management
- Shopping cart and order processing
- Modern responsive design with gradient themes
- Security features: CORS, rate limiting, input validation

🛠️ Tech Stack:
- Frontend: React 18, TypeScript, Vite, CSS3
- Backend: Node.js, Express, JWT, bcrypt, express-validator
- Security: Helmet, CORS, rate limiting

📊 Sample Data:
- 8 premium perfume brands (Chanel, Dior, YSL, Tom Ford, etc.)
- User accounts with authentication
- Product management with filtering and pagination

🚀 Ready for development and deployment!"

# Push to GitHub
echo "🚀 Pushing to GitHub..."
git push -u origin main

echo "✅ Successfully pushed to GitHub!"
echo "🌐 Repository: https://github.com/whooduck10/ShoppingApp.git" 