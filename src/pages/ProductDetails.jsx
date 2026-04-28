import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { ShoppingCart, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);

  // Use the same image multiple times since user requested placeholders to save DB space
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/products/${id}`);
        setProduct(response.data);
        setMainImage(response.data.imageUrl);
      } catch (error) {
        console.error("Failed to fetch product from API, using fallback data if available.");
        // Fallback for demo products
        const demoProducts = [
          { _id: '1', title: 'Premium Cotton T-Shirt', price: 29.99, imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=60', category: 'Men', isPopular: true, quantity: 10, sizes: ['S', 'M', 'L', 'XL'], description: 'A premium cotton t-shirt.' },
          { _id: '2', title: 'Elegant Summer Dress', price: 59.99, imageUrl: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=500&q=60', category: 'Women', isPopular: true, quantity: 5, sizes: ['S', 'M', 'L'], description: 'A beautiful summer dress.' },
          { _id: '3', title: 'Classic Denim Jacket', price: 89.99, imageUrl: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=500&q=60', category: 'Unisex', isPopular: true, quantity: 0, sizes: ['M', 'L', 'XL'], description: 'A timeless denim jacket.' },
          { _id: '4', title: 'Comfy Sneakers', price: 79.99, imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=500&q=60', category: 'Shoes', isPopular: true, quantity: 20, sizes: ['S', 'M', 'L'], description: 'Comfortable everyday sneakers.' },
          { _id: '5', title: 'Formal Suit Blazer', price: 129.99, imageUrl: 'https://images.unsplash.com/photo-1594938298596-70f594f50ff7?auto=format&fit=crop&w=500&q=60', category: 'Men', isPopular: false, quantity: 2, sizes: ['L', 'XL', 'XXL'], description: 'A sharp formal blazer.' },
          { _id: '6', title: 'Casual Hoodie', price: 49.99, imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=500&q=60', category: 'Unisex', isPopular: false, quantity: 15, sizes: ['S', 'M', 'L', 'XL'], description: 'A warm casual hoodie.' },
          { _id: '7', title: 'Floral Skirt', price: 39.99, imageUrl: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=500&q=60', category: 'Women', isPopular: false, quantity: 8, sizes: ['S', 'M'], description: 'A lovely floral skirt.' },
          { _id: '8', title: 'Leather Boots', price: 109.99, imageUrl: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=500&q=60', category: 'Shoes', isPopular: false, quantity: 0, sizes: ['M', 'L', 'XL'], description: 'Durable leather boots.' },
        ];

        const demoProd = demoProducts.find(p => p._id === id);
        if (demoProd) {
          setProduct(demoProd);
          setMainImage(demoProd.imageUrl);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);


  // Add to cart
  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart({
      id: product._id,
      name: product.title,
      price: product.price,
      size: selectedSize,
      image: product.imageUrl,
      quantity: 1,
    });
  };


  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><span className="loading loading-spinner loading-lg text-rich-accent"></span></div>;
  }

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center text-2xl font-bold">Product not found.</div>;
  }

  // Generate mock images for the gallery using the single image from DB
  const mockImages = [
    product.imageUrl,
    product.imageUrl + "?auto=format&fit=crop&q=80&w=600&h=600&blur=2", // Slightly altered for demo
    product.imageUrl + "?auto=format&fit=crop&q=80&w=600&h=600&sat=-100", // Grayscale for demo
    product.imageUrl + "?auto=format&fit=crop&q=80&w=600&h=600&con=2" // High contrast for demo
  ];

  const inStock = product.quantity > 0 || product.quantity === undefined;
  const displaySizes = product.sizes && product.sizes.length > 0 ? product.sizes : ['S', 'M', 'L', 'XL'];


  const handleWhatsapp = () => {
    window.open(`https://wa.me/1234567890?text=I'm%20interested%20in%20your%20product:%20${product.title}`, '_blank');
  };

  const handleFacebook = () => {
    window.open(`https://m.me/yourfacebookpage`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 min-h-[80vh]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <motion.div
          className="flex flex-col-reverse lg:flex-row gap-4"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Thumbnails */}
          <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto lg:w-24 shrink-0">
            {mockImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setMainImage(img)}
                className={`border-2 rounded-lg overflow-hidden shrink-0 ${mainImage === img ? 'border-rich-accent' : 'border-transparent'}`}
              >
                <img src={img} alt={`Thumbnail ${idx}`} className="w-20 h-24 object-cover" />
              </button>
            ))}
          </div>
          {/* Main Image */}
          <div className="w-full bg-rich-card rounded-2xl overflow-hidden aspect-4/5 flex items-center justify-center">
            <img src={mainImage} alt={product.title} className="w-full h-full object-cover" />
          </div>
        </motion.div>

        {/* Product Info */}
        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">{product.title}</h1>

          <div className="flex items-center gap-4 mb-6">
            <div className="text-2xl font-bold text-rich-accent">${product.price}</div>
            {inStock ? (
              <div className="badge badge-success text-white font-semibold">In Stock</div>
            ) : (
              <div className="badge badge-error text-white font-semibold">Out of Stock</div>
            )}
          </div>

          <div className="prose prose-sm mb-8 text-rich-text-muted">
            <p>{product.description}</p>
          </div>

          <div className="divider"></div>

          {/* Size Selector */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3">Select Size</h3>
            <div className="flex gap-3">
              {displaySizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`btn btn-circle btn-outline border-rich-card text-rich-text shadow-none ${selectedSize === size ? 'bg-rich-accent text-white border-rich-accent' : ''}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-8">
            <h3 className="text-sm font-medium mb-3">Quantity</h3>
            <div className="flex items-center gap-4">
              <div className="join border border-rich-card-hover rounded-lg">
                <button className="join-item btn btn-ghost" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <input className="join-item input input-ghost w-16 text-center pointer-events-none" value={quantity} readOnly />
                <button className="join-item btn btn-ghost" onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button
              onClick={handleAddToCart}
              className="btn bg-rich-accent text-white border-none shadow-none hover:bg-rich-accent-hover flex-1 btn-lg" disabled={!inStock}>
              <ShoppingCart className="w-5 h-5 mr-2" />
              {inStock ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>

          {/* Contact Actions */}
          <div className="bg-rich-card p-6 rounded-xl">
            <h3 className="font-semibold mb-4 text-center">Have questions? Contact us directly!</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={handleWhatsapp} className="btn bg-[#25D366] hover:bg-[#128C7E] text-white border-none flex-1">
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp
              </button>
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
}
