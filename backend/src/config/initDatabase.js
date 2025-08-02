const { sequelize } = require('./database');
const { User, Product, Order, OrderItem } = require('../models');

const initDatabase = async () => {
  try {
    // Sync all models with the database
    await sequelize.sync({ force: false }); // Set force: true to drop and recreate tables
    console.log('✅ Database synchronized successfully');
    
    // Create sample data if tables are empty
    const userCount = await User.count();
    if (userCount === 0) {
      console.log('📝 Creating sample data...');
      
      // Create sample admin user
      await User.create({
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@luxeperfumes.com',
        password: 'admin123',
        role: 'admin'
      });
      
      // Create sample products
      await Product.bulkCreate([
        {
          name: 'Chanel N°5',
          description: 'The most famous perfume in the world, a timeless classic.',
          price: 150.00,
          brand: 'Chanel',
          category: 'women',
          fragranceFamily: 'Floral Aldehyde',
          topNotes: 'Aldehydes, Bergamot, Lemon, Neroli',
          middleNotes: 'Rose, Jasmine, Lily of the Valley, Iris',
          baseNotes: 'Vetiver, Sandalwood, Vanilla, Amber',
          concentration: 'eau_de_parfum',
          volume: 100,
          stockQuantity: 50,
          imageUrl: 'https://example.com/chanel-no5.jpg',
          rating: 4.8,
          reviewCount: 1250
        },
        {
          name: 'Dior Sauvage',
          description: 'A powerful freshness, a raw and noble beauty.',
          price: 120.00,
          brand: 'Dior',
          category: 'men',
          fragranceFamily: 'Fresh Spicy',
          topNotes: 'Bergamot, Pink Pepper',
          middleNotes: 'Lavender, Sichuan Pepper, Vetiver',
          baseNotes: 'Ambroxan, Cedar, Labdanum',
          concentration: 'eau_de_toilette',
          volume: 100,
          stockQuantity: 75,
          imageUrl: 'https://example.com/dior-sauvage.jpg',
          rating: 4.6,
          reviewCount: 890
        },
        {
          name: 'Jo Malone Wood Sage & Sea Salt',
          description: 'Escape the everyday along the windswept shore.',
          price: 85.00,
          brand: 'Jo Malone',
          category: 'unisex',
          fragranceFamily: 'Fresh Aromatic',
          topNotes: 'Ambrette Seeds, Sea Salt',
          middleNotes: 'Sea Salt, Sage',
          baseNotes: 'Red Algae',
          concentration: 'cologne',
          volume: 100,
          stockQuantity: 30,
          imageUrl: 'https://example.com/jo-malone-wood-sage.jpg',
          rating: 4.4,
          reviewCount: 567
        }
      ]);
      
      console.log('✅ Sample data created successfully');
    }
    
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    throw error;
  }
};

module.exports = { initDatabase }; 