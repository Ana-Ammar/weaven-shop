import { Link } from "react-router";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=2070',
    title: 'Elevate Your Style',
    subtitle: 'Discover the latest trends in premium clothing. From casual wear to elegant formal attire.'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=2070',
    title: 'Summer Collection',
    subtitle: 'Light, breathable, and vibrant. Get ready for the sunshine with our exclusive summer picks.'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=2070',
    title: 'Accessories that Matter',
    subtitle: 'Complete your look with our meticulously crafted accessories and footwear.'
  }
];

export default function Banner() {
  return (
    <div className="w-full relative h-[70vh]">
      <Swiper
        spaceBetween={0}
        effect={'fade'}
        navigation={false}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, EffectFade, Pagination]}
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            {({ isActive }) => (
              <div 
                className="hero h-full w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="hero-overlay bg-opacity-60 bg-black"></div>
                <div className="hero-content text-center text-neutral-content relative z-10">
                  <div className="max-w-md">
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      >
                        <h1 className="mb-5 text-5xl font-bold text-white drop-shadow-lg">
                          {slide.title}
                        </h1>
                        <p className="mb-5 text-gray-200 drop-shadow-md">
                          {slide.subtitle}
                        </p>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: 0.8 }}
                        >
                          <Link to="/products" className="btn btn-primary btn-lg shadow-xl shadow-primary/30 hover:scale-105 transition-transform">
                            Shop Now
                          </Link>
                        </motion.div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
