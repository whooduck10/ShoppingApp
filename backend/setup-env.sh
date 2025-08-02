#!/bin/bash

# Create .env file with Supabase PostgreSQL connection
cat > .env << EOF
# Server Configuration
PORT=8080
NODE_ENV=development

# Frontend URL for CORS
FRONTEND_URL=http://localhost:5173

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=24h

# Database Configuration (PostgreSQL via Supabase)
DATABASE_URL=postgresql://postgres:Huuduc18102004;@db.mcwoxoftrbrusjstkpxg.supabase.co:5432/postgres
DB_HOST=db.mcwoxoftrbrusjstkpxg.supabase.co
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=Huuduc18102004;

# Email Configuration (for future use)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Payment Configuration (for future use)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key

# File Upload Configuration (for future use)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Redis Configuration (for future use)
REDIS_URL=redis://localhost:6379

# Logging Configuration
LOG_LEVEL=info
EOF

echo "✅ .env file created successfully!"
echo "📝 Please review and update the JWT_SECRET and other sensitive values before production use." 