import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

export default function AddProduct() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Mock API call if server is not connected, else real call
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      
      const selectedSizes = [];
      if (data.sizeS) selectedSizes.push('S');
      if (data.sizeM) selectedSizes.push('M');
      if (data.sizeL) selectedSizes.push('L');
      if (data.sizeXL) selectedSizes.push('XL');
      if (data.sizeXXL) selectedSizes.push('XXL');
      if (data.sizeXXXL) selectedSizes.push('XXXL');

      const payload = {
        ...data,
        price: parseFloat(data.price),
        quantity: parseInt(data.quantity, 10),
        isPopular: data.isPopular === 'true',
        sizes: selectedSizes
      };

      await axios.post(`${apiUrl}/products`, payload);
      alert("Product added successfully!");
      reset();
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please make sure the backend server is running.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Add New Product</h1>
      
      <div className="bg-base-100 p-8 rounded-xl shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          <div className="form-control w-full">
            <label className="label"><span className="label-text font-semibold">Product Title</span></label>
            <input 
              type="text" 
              placeholder="e.g. Premium Cotton T-Shirt" 
              className="input input-bordered w-full" 
              {...register("title", { required: true })}
            />
            {errors.title && <span className="text-error text-sm mt-1">Title is required</span>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control w-full">
              <label className="label"><span className="label-text font-semibold">Price ($)</span></label>
              <input 
                type="number" 
                step="0.01" 
                placeholder="e.g. 29.99" 
                className="input input-bordered w-full" 
                {...register("price", { required: true, min: 0 })}
              />
              {errors.price && <span className="text-error text-sm mt-1">Valid price is required</span>}
            </div>

            <div className="form-control w-full">
              <label className="label"><span className="label-text font-semibold">Category</span></label>
              <select className="select select-bordered" {...register("category", { required: true })}>
                <option value="">Select Category</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Unisex">Unisex</option>
                <option value="Shoes">Shoes</option>
                <option value="Accessories">Accessories</option>
              </select>
              {errors.category && <span className="text-error text-sm mt-1">Category is required</span>}
            </div>
            
            <div className="form-control w-full">
              <label className="label"><span className="label-text font-semibold">Quantity (pcs)</span></label>
              <input 
                type="number" 
                placeholder="e.g. 5" 
                className="input input-bordered w-full" 
                {...register("quantity", { required: true, min: 0 })}
              />
              {errors.quantity && <span className="text-error text-sm mt-1">Valid quantity is required</span>}
            </div>
          </div>

          <div className="form-control w-full">
            <label className="label"><span className="label-text font-semibold">Available Sizes</span></label>
            <div className="flex flex-wrap gap-4">
              {['S', 'M', 'L', 'XL', 'XXL', 'XXXL'].map((size) => (
                <label key={size} className="cursor-pointer label justify-start gap-2">
                  <input type="checkbox" className="checkbox checkbox-primary" {...register(`size${size}`)} />
                  <span className="label-text">{size}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="form-control w-full">
            <label className="label"><span className="label-text font-semibold">Image URL</span></label>
            <input 
              type="url" 
              placeholder="https://example.com/image.jpg" 
              className="input input-bordered w-full" 
              {...register("imageUrl", { required: true })}
            />
            {errors.imageUrl && <span className="text-error text-sm mt-1">Image URL is required</span>}
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text font-semibold">Description</span></label>
            <textarea 
              className="textarea textarea-bordered h-24" 
              placeholder="Product description..."
              {...register("description", { required: true })}
            ></textarea>
            {errors.description && <span className="text-error text-sm mt-1">Description is required</span>}
          </div>

          <div className="form-control">
            <label className="cursor-pointer label justify-start gap-4">
              <input type="checkbox" className="checkbox checkbox-primary" value="true" {...register("isPopular")} />
              <span className="label-text font-semibold">Mark as Popular Product</span>
            </label>
          </div>

          <div className="mt-8">
            <button 
              type="submit" 
              className={`btn btn-primary w-full ${isSubmitting ? 'loading' : ''}`}
              disabled={isSubmitting}
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
