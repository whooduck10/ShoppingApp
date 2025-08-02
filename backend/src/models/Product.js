const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2, 100]
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.ENUM('men', 'women', 'unisex'),
    allowNull: false
  },
  fragranceFamily: {
    type: DataTypes.STRING,
    allowNull: true
  },
  topNotes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  middleNotes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  baseNotes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  concentration: {
    type: DataTypes.ENUM('eau_de_cologne', 'eau_de_toilette', 'eau_de_parfum', 'parfum'),
    allowNull: false
  },
  volume: {
    type: DataTypes.INTEGER, // in ml
    allowNull: false
  },
  stockQuantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  rating: {
    type: DataTypes.DECIMAL(3, 2),
    defaultValue: 0,
    validate: {
      min: 0,
      max: 5
    }
  },
  reviewCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  }
}, {
  timestamps: true
});

module.exports = Product; 