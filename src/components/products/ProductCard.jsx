import { Link } from "react-router";

export default function ProductCard({ product }) {
  const { _id, title, price, imageUrl, category, isPopular } = product;

  return (
    <Link to={`/product/${_id}`} className="card w-full bg-base-100 shadow-xl group overflow-hidden border border-base-200 hover:border-primary transition-colors duration-300 flex flex-col h-full">
      <figure className="relative h-64 overflow-hidden shrink-0">
        <img
          src={imageUrl}
          alt={title}
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
        />
        {isPopular && (
          <div className="absolute top-2 right-2 badge badge-secondary shadow-md">Popular</div>
        )}
        {(product.quantity > 0 || product.quantity === undefined) ? (
          <div className="absolute bottom-2 right-2 badge badge-success shadow-md text-white font-semibold">In Stock</div>
        ) : (
          <div className="absolute bottom-2 right-2 badge badge-error shadow-md text-white font-semibold">Out of Stock</div>
        )}
        <div className="absolute top-2 left-2 badge badge-ghost bg-base-100/80 backdrop-blur-sm shadow-md">{category}</div>
      </figure>
      <div className="card-body p-5 flex-grow flex flex-col justify-between">
        <h2 className="card-title text-lg line-clamp-2">{title}</h2>
        <div className="flex justify-between items-center mt-4">
          <p className="text-xl font-bold text-primary">${price}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary btn-sm">Buy Now</button>
          </div>
        </div>
      </div>
    </Link>
  );
}
