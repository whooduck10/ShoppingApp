const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// Mock orders data (in real app, this would be in a database)
let orders = [
  {
    id: 1,
    userId: 1,
    items: [
      {
        productId: 1,
        name: "Chanel N°5",
        price: 299.00,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=300&h=300&fit=crop"
      }
    ],
    total: 299.00,
    status: "completed",
    shippingAddress: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA"
    },
    paymentMethod: "credit_card",
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  }
];

// Mock cart data (in real app, this would be in a database or session)
let carts = new Map();

// Get user's cart
router.get('/cart', (req, res) => {
  try {
    const userId = req.headers['user-id'] || 'anonymous';
    const userCart = carts.get(userId) || { items: [], total: 0 };
    
    res.json({ cart: userCart });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add item to cart
router.post('/cart/add', [
  body('productId').isInt({ min: 1 }),
  body('quantity').isInt({ min: 1 })
], (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.headers['user-id'] || 'anonymous';
    const { productId, quantity } = req.body;

    // In a real app, you would fetch product details from database
    const product = {
      id: productId,
      name: "Sample Product",
      price: 100.00,
      image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=300&h=300&fit=crop"
    };

    let userCart = carts.get(userId) || { items: [], total: 0 };
    
    // Check if item already exists in cart
    const existingItemIndex = userCart.items.findIndex(item => item.productId === productId);
    
    if (existingItemIndex > -1) {
      // Update quantity
      userCart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      userCart.items.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity,
        image: product.image
      });
    }

    // Recalculate total
    userCart.total = userCart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    carts.set(userId, userCart);
    
    res.json({ 
      message: 'Item added to cart successfully',
      cart: userCart 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update cart item quantity
router.put('/cart/update', [
  body('productId').isInt({ min: 1 }),
  body('quantity').isInt({ min: 0 })
], (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.headers['user-id'] || 'anonymous';
    const { productId, quantity } = req.body;

    let userCart = carts.get(userId);
    if (!userCart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = userCart.items.findIndex(item => item.productId === productId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    if (quantity === 0) {
      // Remove item
      userCart.items.splice(itemIndex, 1);
    } else {
      // Update quantity
      userCart.items[itemIndex].quantity = quantity;
    }

    // Recalculate total
    userCart.total = userCart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    carts.set(userId, userCart);
    
    res.json({ 
      message: 'Cart updated successfully',
      cart: userCart 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Remove item from cart
router.delete('/cart/remove/:productId', (req, res) => {
  try {
    const userId = req.headers['user-id'] || 'anonymous';
    const productId = parseInt(req.params.productId);

    let userCart = carts.get(userId);
    if (!userCart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = userCart.items.findIndex(item => item.productId === productId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    userCart.items.splice(itemIndex, 1);
    userCart.total = userCart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    carts.set(userId, userCart);
    
    res.json({ 
      message: 'Item removed from cart successfully',
      cart: userCart 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Clear cart
router.delete('/cart/clear', (req, res) => {
  try {
    const userId = req.headers['user-id'] || 'anonymous';
    carts.set(userId, { items: [], total: 0 });
    
    res.json({ 
      message: 'Cart cleared successfully',
      cart: { items: [], total: 0 }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create order from cart
router.post('/create', [
  body('shippingAddress').isObject(),
  body('shippingAddress.street').notEmpty(),
  body('shippingAddress.city').notEmpty(),
  body('shippingAddress.state').notEmpty(),
  body('shippingAddress.zipCode').notEmpty(),
  body('shippingAddress.country').notEmpty(),
  body('paymentMethod').isIn(['credit_card', 'paypal', 'bank_transfer'])
], (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.headers['user-id'] || 'anonymous';
    const { shippingAddress, paymentMethod } = req.body;

    const userCart = carts.get(userId);
    if (!userCart || userCart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Create new order
    const newOrder = {
      id: orders.length + 1,
      userId: userId === 'anonymous' ? null : parseInt(userId),
      items: [...userCart.items],
      total: userCart.total,
      status: 'pending',
      shippingAddress,
      paymentMethod,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    orders.push(newOrder);

    // Clear cart after order creation
    carts.set(userId, { items: [], total: 0 });

    res.status(201).json({
      message: 'Order created successfully',
      order: newOrder
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all orders (for admin or user's own orders)
router.get('/', (req, res) => {
  try {
    const userId = req.headers['user-id'];
    const { page = 1, limit = 10, status } = req.query;

    let filteredOrders = [...orders];

    // Filter by user ID (if not admin)
    if (userId && userId !== 'admin') {
      filteredOrders = filteredOrders.filter(order => order.userId === parseInt(userId));
    }

    // Filter by status
    if (status) {
      filteredOrders = filteredOrders.filter(order => order.status === status);
    }

    // Sort by creation date (newest first)
    filteredOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

    res.json({
      orders: paginatedOrders,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(filteredOrders.length / limit),
        totalOrders: filteredOrders.length,
        ordersPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get order by ID
router.get('/:id', (req, res) => {
  try {
    const order = orders.find(o => o.id === parseInt(req.params.id));
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ order });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update order status (Admin only)
router.patch('/:id/status', [
  body('status').isIn(['pending', 'processing', 'shipped', 'delivered', 'cancelled'])
], (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const orderIndex = orders.findIndex(o => o.id === parseInt(req.params.id));
    if (orderIndex === -1) {
      return res.status(404).json({ message: 'Order not found' });
    }

    orders[orderIndex].status = req.body.status;
    orders[orderIndex].updatedAt = new Date();

    res.json({
      message: 'Order status updated successfully',
      order: orders[orderIndex]
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get order statistics
router.get('/stats/overview', (req, res) => {
  try {
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const pendingOrders = orders.filter(order => order.status === 'pending').length;
    const completedOrders = orders.filter(order => order.status === 'delivered').length;

    res.json({
      totalOrders,
      totalRevenue,
      pendingOrders,
      completedOrders,
      averageOrderValue: totalOrders > 0 ? totalRevenue / totalOrders : 0
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router; 