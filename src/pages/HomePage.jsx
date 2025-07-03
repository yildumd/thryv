import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowRight, FiCheck } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useRef } from 'react';

export default function HomePage() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityBg = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="relative overflow-hidden">
      {/* Luxury Hero Section with Parallax */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background with parallax effect */}
        <motion.div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center"
          style={{
            y: yBg,
            opacity: opacityBg,
            scale: 1.2
          }}
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30" />
        
        {/* Content */}
        <div className="relative z-10 px-6 text-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                Elevate
              </span> Your Existence
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-10 font-light">
              The ultimate 90-day metamorphosis for those who demand excellence in mind, body, and spirit.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/4-week-program"
                className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium rounded-full shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] flex items-center justify-center gap-3 group"
              >
                Begin Transformation
                <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/8-week-program"
                className="px-8 py-4 bg-transparent text-white border-2 border-white/30 hover:border-white/60 rounded-full shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02] flex items-center justify-center gap-3 group"
              >
                Explore Programs
                <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Scrolling indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span className="text-white/80 text-sm mb-2">Scroll to explore</span>
          <div className="w-4 h-8 border-2 border-white/50 rounded-full">
            <motion.div
              className="w-1 h-2 bg-white mx-auto mt-1 rounded-full"
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          </div>
        </motion.div>
      </section>

      {/* Luxury Features Section */}
      <section ref={ref} className="relative bg-gradient-to-b from-black to-gray-900 py-28">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2 
            className="text-3xl md:text-5xl font-bold text-center text-white mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            The <span className="text-amber-400">Thryv</span> Difference
          </motion.h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {[
              {
                title: "Bespoke Coaching",
                description: "1:1 sessions with elite performance specialists tailored to your unique psychology.",
                icon: "🪄"
              },
              {
                title: "Neuro-Enhanced",
                description: "Evidence-based protocols leveraging neuroscience for accelerated transformation.",
                icon: "🧠"
              },
              {
                title: "Executive Implementation",
                description: "Systems designed for high-performers who demand efficiency and measurable results.",
                icon: "⚡"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true, margin: "-100px" }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 hover:border-amber-400/30 transition-all duration-500 hover:-translate-y-2 shadow-2xl"
              >
                <div className="text-5xl mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-semibold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300 font-light leading-relaxed">{feature.description}</p>
                <div className="mt-6 pt-6 border-t border-gray-700">
                  <ul className="space-y-3">
                    {["Customized protocols", "Daily accountability", "Premium resources"].map((item, i) => (
                      <li key={i} className="flex items-center text-amber-100/80">
                        <FiCheck className="mr-2 text-amber-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="relative bg-[url('https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center bg-fixed py-32">
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl font-bold text-amber-400 mb-2">93%</div>
              <div className="text-white/90 uppercase tracking-widest text-sm">Success Rate</div>
            </motion.div>
            <motion.div 
              className="text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl font-bold text-amber-400 mb-2">4.9★</div>
              <div className="text-white/90 uppercase tracking-widest text-sm">Average Rating</div>
            </motion.div>
            <motion.div 
              className="text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl font-bold text-amber-400 mb-2">10K+</div>
              <div className="text-white/90 uppercase tracking-widest text-sm">Lives Transformed</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonial Carousel */}
      <section className="bg-gray-900 py-28">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            className="bg-gradient-to-br from-gray-800 to-gray-900 p-12 rounded-3xl border border-gray-700 relative overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-400/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <div className="flex items-center mb-8">
                <img 
                  src="https://randomuser.me/api/portraits/women/68.jpg" 
                  alt="Client" 
                  className="w-16 h-16 rounded-full object-cover border-2 border-amber-400/50"
                />
                <div className="ml-6">
                  <div className="text-xl font-medium text-white">Alexandra K.</div>
                  <div className="text-amber-400/80">CEO, Fortis Group</div>
                </div>
              </div>
              
              <blockquote className="text-2xl leading-relaxed text-white/90 font-light italic mb-8">
                "After decades of executive coaching, I've never encountered a program as transformative as Thryv. In 12 weeks, I achieved what 5 years of traditional coaching couldn't deliver. My cognitive performance metrics improved by 47%."
              </blockquote>
              
              <div className="flex items-center justify-between">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-6 h-6 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <div className="text-white/50 text-sm">Verified Client</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative bg-gradient-to-b from-gray-900 to-black py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Your <span className="text-amber-400">Evolution</span> Begins Now
            </h2>
            
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
              Limited availability for our premium coaching program. Applications close soon.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/apply"
                className="px-10 py-5 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium rounded-full shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] flex items-center justify-center gap-3 group relative overflow-hidden"
              >
                <span className="relative z-10">Apply for Premium Access</span>
                <span className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
            </div>
            
            <p className="mt-8 text-sm text-white/50">
              Only 12 spots available this quarter
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}