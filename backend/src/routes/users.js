const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const router = express.Router();

// Mock users data (in real app, this would be in a database)
let users = [
  {
    id: 1,
    email: 'admin@luxeperfumes.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
    name: 'Admin User',
    role: 'admin',
    profile: {
      firstName: 'Admin',
      lastName: 'User',
      phone: '+1-555-123-4567',
      address: {
        street: '123 Admin St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA'
      },
      preferences: {
        newsletter: true,
        marketing: false
      }
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 2,
    email: 'customer@example.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
    name: 'John Doe',
    role: 'customer',
    profile: {
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1-555-987-6543',
      address: {
        street: '456 Customer Ave',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90210',
        country: 'USA'
      },
      preferences: {
        newsletter: true,
        marketing: true
      }
    },
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  }
];

// Get all users (Admin only)
router.get('/', (req, res) => {
  try {
    const { page = 1, limit = 10, role } = req.query;

    let filteredUsers = [...users];

    // Filter by role
    if (role) {
      filteredUsers = filteredUsers.filter(user => user.role === role);
    }

    // Remove password from response
    const safeUsers = filteredUsers.map(user => {
      const { password, ...safeUser } = user;
      return safeUser;
    });

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedUsers = safeUsers.slice(startIndex, endIndex);

    res.json({
      users: paginatedUsers,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(filteredUsers.length / limit),
        totalUsers: filteredUsers.length,
        usersPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user by ID
router.get('/:id', (req, res) => {
  try {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove password from response
    const { password, ...safeUser } = user;
    res.json({ user: safeUser });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get current user profile
router.get('/profile/me', (req, res) => {
  try {
    const userId = req.headers['user-id'];
    if (!userId) {
      return res.status(401).json({ message: 'User ID required' });
    }

    const user = users.find(u => u.id === parseInt(userId));
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove password from response
    const { password, ...safeUser } = user;
    res.json({ user: safeUser });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update user profile
router.put('/profile/me', [
  body('firstName').optional().trim().isLength({ min: 2 }),
  body('lastName').optional().trim().isLength({ min: 2 }),
  body('phone').optional().matches(/^\+?[\d\s\-\(\)]+$/),
  body('address.street').optional().trim().notEmpty(),
  body('address.city').optional().trim().notEmpty(),
  body('address.state').optional().trim().notEmpty(),
  body('address.zipCode').optional().trim().notEmpty(),
  body('address.country').optional().trim().notEmpty(),
  body('preferences.newsletter').optional().isBoolean(),
  body('preferences.marketing').optional().isBoolean()
], (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.headers['user-id'];
    if (!userId) {
      return res.status(401).json({ message: 'User ID required' });
    }

    const userIndex = users.findIndex(u => u.id === parseInt(userId));
    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user profile
    const updateData = req.body;
    if (updateData.firstName) users[userIndex].profile.firstName = updateData.firstName;
    if (updateData.lastName) users[userIndex].profile.lastName = updateData.lastName;
    if (updateData.phone) users[userIndex].profile.phone = updateData.phone;
    if (updateData.address) {
      users[userIndex].profile.address = {
        ...users[userIndex].profile.address,
        ...updateData.address
      };
    }
    if (updateData.preferences) {
      users[userIndex].profile.preferences = {
        ...users[userIndex].profile.preferences,
        ...updateData.preferences
      };
    }

    users[userIndex].updatedAt = new Date();

    // Remove password from response
    const { password, ...safeUser } = users[userIndex];
    res.json({
      message: 'Profile updated successfully',
      user: safeUser
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Change password
router.put('/profile/password', [
  body('currentPassword').notEmpty(),
  body('newPassword').isLength({ min: 6 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.headers['user-id'];
    if (!userId) {
      return res.status(401).json({ message: 'User ID required' });
    }

    const { currentPassword, newPassword } = req.body;

    const userIndex = users.findIndex(u => u.id === parseInt(userId));
    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, users[userIndex].password);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Hash new password
    const saltRounds = 10;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update password
    users[userIndex].password = hashedNewPassword;
    users[userIndex].updatedAt = new Date();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete user account
router.delete('/profile/me', (req, res) => {
  try {
    const userId = req.headers['user-id'];
    if (!userId) {
      return res.status(401).json({ message: 'User ID required' });
    }

    const userIndex = users.findIndex(u => u.id === parseInt(userId));
    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove user from array
    const deletedUser = users.splice(userIndex, 1)[0];

    res.json({
      message: 'Account deleted successfully',
      user: {
        id: deletedUser.id,
        email: deletedUser.email,
        name: deletedUser.name
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user statistics (Admin only)
router.get('/stats/overview', (req, res) => {
  try {
    const totalUsers = users.length;
    const adminUsers = users.filter(user => user.role === 'admin').length;
    const customerUsers = users.filter(user => user.role === 'customer').length;
    const newsletterSubscribers = users.filter(user => user.profile?.preferences?.newsletter).length;

    res.json({
      totalUsers,
      adminUsers,
      customerUsers,
      newsletterSubscribers,
      averageUsersPerDay: totalUsers / 30 // Mock calculation
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Search users (Admin only)
router.get('/search', (req, res) => {
  try {
    const { q, role } = req.query;

    let filteredUsers = [...users];

    // Filter by search query
    if (q) {
      const searchTerm = q.toLowerCase();
      filteredUsers = filteredUsers.filter(user => 
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm) ||
        user.profile?.firstName?.toLowerCase().includes(searchTerm) ||
        user.profile?.lastName?.toLowerCase().includes(searchTerm)
      );
    }

    // Filter by role
    if (role) {
      filteredUsers = filteredUsers.filter(user => user.role === role);
    }

    // Remove password from response
    const safeUsers = filteredUsers.map(user => {
      const { password, ...safeUser } = user;
      return safeUser;
    });

    res.json({ users: safeUsers });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router; 