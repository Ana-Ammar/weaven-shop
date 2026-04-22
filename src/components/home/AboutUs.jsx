import { motion } from "framer-motion";

export default function AboutUs() {
  return (
    <div className="bg-rich-card py-24">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        <motion.div
          className="md:w-1/2 relative group"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-rich-accent to-rich-base rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80"
            alt="About our store"
            className="relative rounded-2xl shadow-2xl object-cover h-[400px] w-full"
          />
        </motion.div>
        <motion.div
          className="md:w-1/2 space-y-6"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        >
          <h2 className="text-4xl font-bold">Crafting Style with Passion</h2>
          <p className="text-lg text-rich-text-muted">
            Founded with a vision to redefine everyday elegance, <b className="text-rich-accent">Weaven</b> brings you a curated collection of premium clothing that blends modern aesthetics with timeless comfort.
          </p>
          <p className="text-lg text-rich-text-muted">
            We believe that what you wear is an expression of who you are. That's why we source only the finest fabrics and partner with skilled artisans to ensure every piece in our collection meets the highest standards of quality.
          </p>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <motion.div
              className="bg-rich-base p-4 rounded-xl shadow-sm text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <h3 className="text-3xl font-bold text-rich-accent mb-1">10k+</h3>
              <p className="text-sm font-semibold text-rich-text-muted">Happy Customers</p>
            </motion.div>
            <motion.div
              className="bg-rich-base p-4 rounded-xl shadow-sm text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.65 }}
            >
              <h3 className="text-3xl font-bold text-rich-accent mb-1">500+</h3>
              <p className="text-sm font-semibold text-rich-text-muted">Premium Products</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
