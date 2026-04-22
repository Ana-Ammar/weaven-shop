import { Link } from "react-router";

export default function ProductCard({ product }) {
  const { _id, title, price, imageUrl, category, isPopular } = product;

  return (
    <Link to={`/product/${_id}`} className="card w-full bg-rich-card shadow-xl group overflow-hidden border border-rich-card hover:border-rich-accent transition-colors duration-300 flex flex-col h-full">
      <figure className="relative h-64 overflow-hidden shrink-0">
        <img
          src={imageUrl}
          alt={title}
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
        />
        {isPopular && (
          <div className="absolute top-2 right-2 badge bg-rich-accent text-white border-none shadow-none">Popular</div>
        )}
        {(product.quantity > 0 || product.quantity === undefined) ? (
          <div className="absolute bottom-2 right-2 badge badge-soft badge-success/80 shadow-md font-semibold">In Stock</div>
        ) : (
          <div className="absolute bottom-2 right-2 badge badge-error shadow-md text-white font-semibold">Out of Stock</div>
        )}
      </figure>
      <div className="card-body p-5 flex-grow flex flex-col justify-between">
        <h2 className="card-title text-lg line-clamp-2">{title}</h2>
        <div className="flex justify-between items-center mt-4">
          <p className="text-xl font-bold text-rich-accent">${price}</p>
          <div className="card-actions justify-end">
            <button className="btn bg-rich-accent text-white border-none shadow-none hover:bg-rich-accent-hover btn-sm">Buy Now</button>
          </div>
        </div>
      </div>
    </Link>
  );
}
