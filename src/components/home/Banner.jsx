import { useState, useEffect } from 'react';
import { Link } from "react-router";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import { db } from '../../firebase/firebase.config';
import { collection, getDocs } from 'firebase/firestore';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const defaultSlides = [
  {
    id: 'default-1',
    imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=2070',
    title: 'Elevate Your Style',
    subtitle: 'Discover the latest trends in premium clothing. From casual wear to elegant formal attire.',
    buttonText: 'Explore Collection',
    buttonLink: '/products'
  },
  {
    id: 'default-2',
    imageUrl: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=2070',
    title: 'Summer Collection',
    subtitle: 'Light, breathable, and vibrant. Get ready for the sunshine with our exclusive summer picks.',
    buttonText: 'Shop Summer',
    buttonLink: '/products'
  },
  {
    id: 'default-3',
    imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=2070',
    title: 'Accessories that Matter',
    subtitle: 'Complete your look with our meticulously crafted accessories and footwear.',
    buttonText: 'View Accessories',
    buttonLink: '/products'
  }
];

export default function Banner() {
  const [banners, setBanners] = useState([...defaultSlides]);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const fetchBanners = async () => {
  //     try {
  //       const querySnapshot = await getDocs(collection(db, 'banners'));
  //       const bannersData = querySnapshot.docs.map(doc => ({
  //         id: doc.id,
  //         ...doc.data()
  //       }));

  //       if (bannersData.length > 0) {
  //         setBanners(bannersData);
  //       } else {
  //         setBanners(defaultSlides);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching banners:", error);
  //       setBanners(defaultSlides); // Fallback to default on error
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchBanners();
  // }, []);

  // if (loading) {
  //   return (
  //     <div className="w-full h-[90svh] lg:h-[70vh] bg-rich-base flex items-center justify-center">
  //       <span className="loading loading-spinner loading-lg text-rich-accent"></span>
  //     </div>
  //   );
  // }

  return (
    <div className="w-full relative h-[90svh] lg:h-[70vh] bg-rich-base overflow-hidden">
      {/* Decorative background blur to match aesthetics */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-rich-accent/10 blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-rich-accent/10 blur-[100px] pointer-events-none"></div>

      <Swiper
        spaceBetween={0}
        effect={'fade'}
        navigation={false}
        pagination={{ clickable: true, dynamicBullets: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, EffectFade, Pagination]}
        className="w-full h-full pb-10"
      >
        {banners.map((slide) => (
          <SwiperSlide key={slide.id}>
            {({ isActive }) => (
              <div className="w-full h-full flex items-start lg:items-center justify-center pt-6 pb-8 lg:py-0">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

                    {/* Left Column - Image */}
                    <div className="order-1 lg:order-1 flex justify-center items-center h-[30vh] sm:h-[40vh] lg:h-[55vh] z-10 relative">
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, x: -50, scale: 0.95 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                          className="w-full h-full relative"
                        >
                          {/* Image frame/decoration */}
                          <div className="absolute inset-0 bg-gradient-to-tr from-rich-accent/20 to-transparent rounded-3xl -m-4 sm:-m-6 z-0"></div>

                          <img
                            src={slide.imageUrl}
                            alt={slide.title}
                            className="w-full h-full object-cover rounded-3xl shadow-2xl relative z-10 border border-rich-card-hover"
                          />
                        </motion.div>
                      )}
                    </div>

                    {/* Right Column - Text */}
                    <div className="order-2 lg:order-2 text-center lg:text-left z-10">
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                        >
                          <h1 className="mb-4 lg:mb-6 text-3xl md:text-5xl lg:text-6xl font-bold text-rich-text leading-tight">
                            {slide.title}
                          </h1>
                          <p className="mb-6 lg:mb-8 text-base md:text-xl text-rich-text-muted max-w-lg mx-auto lg:mx-0 leading-relaxed">
                            {slide.subtitle}
                          </p>
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                          >
                            <Link
                              to={slide.buttonLink || '/products'}
                              className="btn bg-rich-accent text-white border-none shadow-none hover:bg-rich-accent-hover btn-sm lg:btn-lg"
                            >
                              {slide.buttonText || 'Shop Now'}
                            </Link>
                          </motion.div>
                        </motion.div>
                      )}
                    </div>

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
