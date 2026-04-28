import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-rich-card border-t border-rich-base text-rich-text-muted">
      <div className="max-w-7xl">
        <motion.div
          className="footer py-6 grid grid-cols-1"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="mx-auto text-rich-text-muted flex gap-1">&copy; 2026 All Rights Reserved by<a className="text-rich-accent font-semibold" href="https://github.com/Ana-Ammar" >Ammar</a></p>

        </motion.div>
      </div>
    </footer>
  );
}
