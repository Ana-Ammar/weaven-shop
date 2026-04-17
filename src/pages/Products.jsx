import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/products/ProductCard";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Fallback if no products in DB yet
  const displayProducts = products.length > 0 ? products : [
    { _id: '1', title: 'Premium Cotton T-Shirt', price: 29.99, imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=60', category: 'Men', isPopular: true },
    { _id: '2', title: 'Elegant Summer Dress', price: 59.99, imageUrl: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=500&q=60', category: 'Women', isPopular: true },
    { _id: '3', title: 'Classic Denim Jacket', price: 89.99, imageUrl: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=500&q=60', category: 'Unisex', isPopular: true },
    { _id: '4', title: 'Comfy Sneakers', price: 79.99, imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=500&q=60', category: 'Shoes', isPopular: true },
    { _id: '5', title: 'Formal Suit Blazer', price: 129.99, imageUrl: 'https://images.unsplash.com/photo-1594938298596-70f594f50ff7?auto=format&fit=crop&w=500&q=60', category: 'Men', isPopular: false },
    { _id: '6', title: 'Casual Hoodie', price: 49.99, imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=500&q=60', category: 'Unisex', isPopular: false },
    { _id: '7', title: 'Floral Skirt', price: 39.99, imageUrl: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=500&q=60', category: 'Women', isPopular: false },
    { _id: '8', title: 'Leather Boots', price: 109.99, imageUrl: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=500&q=60', category: 'Shoes', isPopular: false },
  ];

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">All Products</h1>
        <p className="text-gray-500">Browse our complete collection of premium clothing.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><span className="loading loading-spinner loading-lg text-primary"></span></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {displayProducts.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
