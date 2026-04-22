import { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Edit } from "lucide-react";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/products/${id}`);
        setProducts(products.filter(p => p._id !== id));
      } catch (error) {
        console.error("Failed to delete:", error);
        alert("Failed to delete product. Make sure the backend supports the DELETE route.");
      }
    }
  };

  if (loading) {
    return <div className="flex justify-center p-12"><span className="loading loading-spinner text-rich-accent"></span></div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">All Products</h1>
        <div className="badge bg-rich-accent text-white border-none badge-lg">{products.length} Items</div>
      </div>

      <div className="bg-rich-card rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Price</th>
                <th>Popular</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-8">No products found. Add some!</td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product._id}>
                    <td>
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={product.imageUrl} alt={product.title} />
                        </div>
                      </div>
                    </td>
                    <td className="font-medium truncate max-w-xs">{product.title}</td>
                    <td>{product.category}</td>
                    <td>${product.price}</td>
                    <td>
                      {product.isPopular ? (
                        <div className="badge bg-rich-accent text-white border-none badge-sm">Yes</div>
                      ) : (
                        <div className="badge badge-ghost badge-sm">No</div>
                      )}
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button className="btn btn-sm btn-square btn-ghost text-rich-accent">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(product._id)} className="btn btn-sm btn-square btn-ghost text-error">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
