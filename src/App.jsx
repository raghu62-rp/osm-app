import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header.jsx';
import SearchBar from "./components/SearchBar.jsx";
import './components/Login.css';
import CategoryFilter from './components/CategoryFilter.jsx';
import ProductGrid from './components/ProductGrid.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import CartModal from './components/CartModal.jsx';
import Checkout from './components/Checkout.jsx';
import Footer from './components/Footer.jsx';
import { API_BASE_URL } from './config.js';
import { mockProducts } from './mockData.jsx';

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Load products from API
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/products`);
        // Expecting an array of products from backend
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        // If backend is not available (local dev), fallback to local mock data
        console.error('Error fetching products from API, falling back to mock data:', error);
        setProducts(mockProducts);
        setFilteredProducts(mockProducts);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
    }, []);

    

  // Filter products based on search and category
  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory]);

  // Add product to cart
  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Update cart item quantity
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  // Get cart total
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Get cart item count
  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Handle checkout
  const handleCheckout = async () => {
    try {
      // Get token from localStorage - you'll need to implement login/register first
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login to checkout');
        return;
      }

      const orderData = {
        orderItems: cart.map(item => ({
          product: item.id,
          name: item.name,
          qty: item.quantity,
          price: item.price,
          image: item.image
        })),
        shippingAddress: {
          address: '123 Test St',
          city: 'Test City',
          postalCode: '12345',
          country: 'Test Country'
        },
        totalPrice: getCartTotal()
      };

      await axios.post(`${API_BASE_URL}/orders`, orderData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert(`Order placed successfully! Total: $${getCartTotal().toFixed(2)}`);
      setCart([]);
      setIsCartOpen(false);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Error placing order. Please try again.');
    }
  };

  return (
    <div className="App">
      <Header 
        cartItemCount={getCartItemCount()}
        onCartClick={() => setIsCartOpen(true)}
      />
      
      <SearchBar 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      
      <CategoryFilter 
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      
      <main id="products" className="container">
        <ProductGrid 
          products={filteredProducts}
          onAddToCart={addToCart}
          isLoading={isLoading}
        />
      </main>

      <About />
      <Contact />
      
      {isCartOpen && (
        <CartModal
            cart={cart}
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeFromCart}
            onCheckout={() => setIsCheckoutOpen(true)}
            total={getCartTotal()}
        />
      )}

      {isCheckoutOpen && (
        <Checkout
          cart={cart}
          total={getCartTotal()}
          onClose={() => setIsCheckoutOpen(false)}
          onConfirm={async () => {
            // call existing handleCheckout to create order
            await handleCheckout();
            // close checkout modal after order
            setIsCheckoutOpen(false);
          }}
        />
      )}
      
      <Footer />
    </div>
  );
}

export default App;