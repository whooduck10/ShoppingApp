const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const OrderItem = sequelize.define('OrderItem', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  },
  unitPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  totalPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  }
}, {
  timestamps: true,
  hooks: {
    beforeCreate: (orderItem) => {
      if (orderItem.quantity && orderItem.unitPrice) {
        orderItem.totalPrice = orderItem.quantity * orderItem.unitPrice;
      }
    },
    beforeUpdate: (orderItem) => {
      if (orderItem.changed('quantity') || orderItem.changed('unitPrice')) {
        orderItem.totalPrice = orderItem.quantity * orderItem.unitPrice;
      }
    }
  }
});

module.exports = OrderItem; 