const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// Mock products data (in real app, this would be in a database)
let products = [
  {
    id: 1,
    name: "Chanel N°5",
    description: "The iconic fragrance that defines luxury and elegance",
    price: 299.00,
    brand: "Chanel",
    category: "Women",
    image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=300&h=300&fit=crop",
    rating: 5,
    stock: 50,
    featured: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 2,
    name: "Dior Sauvage",
    description: "Fresh and powerful masculine fragrance",
    price: 189.00,
    brand: "Dior",
    category: "Men",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=300&h=300&fit=crop",
    rating: 4,
    stock: 75,
    featured: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 3,
    name: "Yves Saint Laurent Black Opium",
    description: "Addictive gourmand fragrance with coffee notes",
    price: 245.00,
    brand: "Yves Saint Laurent",
    category: "Women",
    image: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=300&h=300&fit=crop",
    rating: 5,
    stock: 30,
    featured: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 4,
    name: "Tom Ford Tobacco Vanille",
    description: "Warm and sophisticated oriental fragrance",
    price: 385.00,
    brand: "Tom Ford",
    category: "Unisex",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&h=300&fit=crop",
    rating: 5,
    stock: 25,
    featured: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 5,
    name: "Jo Malone London Wood Sage & Sea Salt",
    description: "Fresh and mineral fragrance inspired by the British coast",
    price: 165.00,
    brand: "Jo Malone",
    category: "Unisex",
    image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=300&h=300&fit=crop",
    rating: 4,
    stock: 60,
    featured: false,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 6,
    name: "Byredo Gypsy Water",
    description: "Bohemian spirit with bergamot and vanilla",
    price: 275.00,
    brand: "Byredo",
    category: "Unisex",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=300&h=300&fit=crop",
    rating: 4,
    stock: 40,
    featured: false,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 7,
    name: "Maison Margiela Replica Jazz Club",
    description: "Smooth and sophisticated jazz-inspired scent",
    price: 135.00,
    brand: "Maison Margiela",
    category: "Men",
    image: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=300&h=300&fit=crop",
    rating: 4,
    stock: 55,
    featured: false,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 8,
    name: "Le Labo Santal 33",
    description: "Iconic sandalwood fragrance with leather notes",
    price: 295.00,
    brand: "Le Labo",
    category: "Unisex",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&h=300&fit=crop",
    rating: 5,
    stock: 35,
    featured: false,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  }
];

// Get all products
router.get('/', (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      category, 
      brand, 
      featured, 
      minPrice, 
      maxPrice,
      sortBy = 'name',
      sortOrder = 'asc'
    } = req.query;

    let filteredProducts = [...products];

    // Filter by category
    if (category) {
      filteredProducts = filteredProducts.filter(p => p.category === category);
    }

    // Filter by brand
    if (brand) {
      filteredProducts = filteredProducts.filter(p => p.brand === brand);
    }

    // Filter by featured
    if (featured !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.featured === (featured === 'true'));
    }

    // Filter by price range
    if (minPrice) {
      filteredProducts = filteredProducts.filter(p => p.price >= parseFloat(minPrice));
    }
    if (maxPrice) {
      filteredProducts = filteredProducts.filter(p => p.price <= parseFloat(maxPrice));
    }

    // Sort products
    filteredProducts.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (sortOrder === 'desc') {
        return aValue < bValue ? 1 : -1;
      }
      return aValue > bValue ? 1 : -1;
    });

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    res.json({
      products: paginatedProducts,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(filteredProducts.length / limit),
        totalProducts: filteredProducts.length,
        productsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get featured products
router.get('/featured', (req, res) => {
  try {
    const featuredProducts = products.filter(p => p.featured);
    res.json({ products: featuredProducts });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get product by ID
router.get('/:id', (req, res) => {
  try {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ product });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create new product (Admin only)
router.post('/', [
  body('name').trim().isLength({ min: 2 }),
  body('description').trim().isLength({ min: 10 }),
  body('price').isFloat({ min: 0 }),
  body('brand').trim().notEmpty(),
  body('category').isIn(['Men', 'Women', 'Unisex']),
  body('stock').isInt({ min: 0 }),
  body('image').isURL()
], (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newProduct = {
      id: products.length + 1,
      ...req.body,
      rating: 0,
      featured: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    products.push(newProduct);
    res.status(201).json({ 
      message: 'Product created successfully',
      product: newProduct 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update product (Admin only)
router.put('/:id', [
  body('name').optional().trim().isLength({ min: 2 }),
  body('description').optional().trim().isLength({ min: 10 }),
  body('price').optional().isFloat({ min: 0 }),
  body('brand').optional().trim().notEmpty(),
  body('category').optional().isIn(['Men', 'Women', 'Unisex']),
  body('stock').optional().isInt({ min: 0 }),
  body('image').optional().isURL()
], (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
    if (productIndex === -1) {
      return res.status(404).json({ message: 'Product not found' });
    }

    products[productIndex] = {
      ...products[productIndex],
      ...req.body,
      updatedAt: new Date()
    };

    res.json({ 
      message: 'Product updated successfully',
      product: products[productIndex] 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete product (Admin only)
router.delete('/:id', (req, res) => {
  try {
    const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
    if (productIndex === -1) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const deletedProduct = products.splice(productIndex, 1)[0];
    res.json({ 
      message: 'Product deleted successfully',
      product: deletedProduct 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get product categories
router.get('/categories/list', (req, res) => {
  try {
    const categories = [...new Set(products.map(p => p.category))];
    res.json({ categories });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get product brands
router.get('/brands/list', (req, res) => {
  try {
    const brands = [...new Set(products.map(p => p.brand))];
    res.json({ brands });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router; 