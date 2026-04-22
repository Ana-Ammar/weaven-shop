import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../products/ProductCard";
import { Link } from "react-router";
import { motion } from "framer-motion";

export default function PopularProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/products/popular`);
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch popular products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularProducts();
  }, []);

  if (loading) {
    return <div className="flex justify-center py-20"><span className="loading loading-spinner loading-lg text-rich-accent"></span></div>;
  }

  // Fallback if no products in DB yet
  const displayProducts = products.length > 0 ? products : [
    { _id: '1', title: 'Premium Cotton T-Shirt', price: 29.99, imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=60', category: 'Men', isPopular: true },
    { _id: '2', title: 'Elegant Summer Dress', price: 59.99, imageUrl: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=500&q=60', category: 'Women', isPopular: true },
    { _id: '3', title: 'Classic Denim Jacket', price: 89.99, imageUrl: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=500&q=60', category: 'Unisex', isPopular: true },
    { _id: '4', title: 'Comfy Sneakers', price: 79.99, imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=500&q=60', category: 'Shoes', isPopular: true },
  ];

  return (
    <div className="py-20 px-4 max-w-7xl mx-auto">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold mb-4">Trending Now</h2>
        <p className="text-rich-text-muted max-w-2xl mx-auto">Discover our most popular picks loved by customers worldwide. Upgrade your wardrobe with these must-have items.</p>
      </motion.div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {displayProducts.map((product, index) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Link to="/products" className="btn bg-transparent border-rich-accent text-rich-accent shadow-none hover:bg-rich-accent hover:text-white">View All Products</Link>
      </motion.div>
    </div>
  );
}
