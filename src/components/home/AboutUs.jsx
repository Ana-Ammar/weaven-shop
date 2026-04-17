export default function AboutUs() {
  return (
    <div className="bg-base-200 py-24">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80" 
            alt="About our store" 
            className="relative rounded-2xl shadow-2xl object-cover h-[400px] w-full"
          />
        </div>
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-4xl font-bold">Crafting Style with Passion</h2>
          <p className="text-lg text-base-content/80">
            Founded with a vision to redefine everyday elegance, Weaven brings you a curated collection of premium clothing that blends modern aesthetics with timeless comfort.
          </p>
          <p className="text-lg text-base-content/80">
            We believe that what you wear is an expression of who you are. That's why we source only the finest fabrics and partner with skilled artisans to ensure every piece in our collection meets the highest standards of quality.
          </p>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-base-100 p-4 rounded-xl shadow-sm text-center">
              <h3 className="text-3xl font-bold text-primary mb-1">10k+</h3>
              <p className="text-sm font-semibold">Happy Customers</p>
            </div>
            <div className="bg-base-100 p-4 rounded-xl shadow-sm text-center">
              <h3 className="text-3xl font-bold text-secondary mb-1">500+</h3>
              <p className="text-sm font-semibold">Premium Products</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
