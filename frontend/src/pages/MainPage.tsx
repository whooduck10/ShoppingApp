import { useState, useEffect } from 'react';
import './MainPage.css';

interface PerfumeBrand {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  rating: number;
}

const MainPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Carousel images for the shop
  const carouselImages = [
    'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=800&h=400&fit=crop'
  ];

  // Perfume brands data
  const perfumeBrands: PerfumeBrand[] = [
    {
      id: 1,
      name: "Chanel N°5",
      description: "The iconic fragrance that defines luxury and elegance",
      price: "$299",
      image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=300&h=300&fit=crop",
      rating: 5
    },
    {
      id: 2,
      name: "Dior Sauvage",
      description: "Fresh and powerful masculine fragrance",
      price: "$189",
      image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=300&h=300&fit=crop",
      rating: 4
    },
    {
      id: 3,
      name: "Yves Saint Laurent Black Opium",
      description: "Addictive gourmand fragrance with coffee notes",
      price: "$245",
      image: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=300&h=300&fit=crop",
      rating: 5
    },
    {
      id: 4,
      name: "Tom Ford Tobacco Vanille",
      description: "Warm and sophisticated oriental fragrance",
      price: "$385",
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&h=300&fit=crop",
      rating: 5
    },
    {
      id: 5,
      name: "Jo Malone London Wood Sage & Sea Salt",
      description: "Fresh and mineral fragrance inspired by the British coast",
      price: "$165",
      image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=300&h=300&fit=crop",
      rating: 4
    },
    {
      id: 6,
      name: "Byredo Gypsy Water",
      description: "Bohemian spirit with bergamot and vanilla",
      price: "$275",
      image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=300&h=300&fit=crop",
      rating: 4
    },
    {
      id: 7,
      name: "Maison Margiela Replica Jazz Club",
      description: "Smooth and sophisticated jazz-inspired scent",
      price: "$135",
      image: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=300&h=300&fit=crop",
      rating: 4
    },
    {
      id: 8,
      name: "Le Labo Santal 33",
      description: "Iconic sandalwood fragrance with leather notes",
      price: "$295",
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&h=300&fit=crop",
      rating: 5
    }
  ];

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < rating ? 'filled' : ''}`}>
        ★
      </span>
    ));
  };

  return (
    <div className="main-page">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <h1 className="logo">Luxe Perfumes</h1>
          <nav className="nav">
            <a href="#home">Home</a>
            <a href="#brands">Brands</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Carousel */}
      <section className="hero-carousel">
        <div className="carousel-container">
          <div 
            className="carousel-slides" 
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {carouselImages.map((image, index) => (
              <div key={index} className="carousel-slide">
                <img src={image} alt={`Shop showcase ${index + 1}`} />
                <div className="slide-content">
                  <h2>Discover Your Signature Scent</h2>
                  <p>Explore our curated collection of luxury fragrances</p>
                  <button className="cta-button">Shop Now</button>
                </div>
              </div>
            ))}
          </div>
          
          <button className="carousel-btn prev" onClick={prevSlide}>
            ‹
          </button>
          <button className="carousel-btn next" onClick={nextSlide}>
            ›
          </button>
          
          <div className="carousel-indicators">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Perfume Brands Section */}
      <section className="perfume-brands">
        <div className="container">
          <h2 className="section-title">Featured Perfume Brands</h2>
          <p className="section-subtitle">Discover luxury fragrances from world-renowned brands</p>
          
          <div className="brands-grid">
            {perfumeBrands.map((brand) => (
              <div key={brand.id} className="brand-card">
                <div className="brand-image">
                  <img src={brand.image} alt={brand.name} />
                  <div className="brand-overlay">
                    <button className="add-to-cart-btn">Add to Cart</button>
                  </div>
                </div>
                <div className="brand-info">
                  <h3 className="brand-name">{brand.name}</h3>
                  <p className="brand-description">{brand.description}</p>
                  <div className="brand-rating">
                    {renderStars(brand.rating)}
                    <span className="rating-text">({brand.rating}/5)</span>
                  </div>
                  <div className="brand-price">{brand.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Luxe Perfumes</h3>
              <p>Your destination for luxury fragrances and exceptional scents.</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#brands">Brands</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Contact</h4>
              <p>Email: info@luxeperfumes.com</p>
              <p>Phone: +1 (555) 123-4567</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Luxe Perfumes. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainPage;
