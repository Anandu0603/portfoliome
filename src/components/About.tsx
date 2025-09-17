import React from 'react';
import { motion } from 'framer-motion';
import { aboutData } from '../data';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center mb-12">
            <h2 className="text-3xl font-bold text-light-text whitespace-nowrap">
              <span className="text-accent font-mono text-2xl mr-2">01.</span>
              {aboutData.title}
            </h2>
            <div className="w-full h-px bg-blue-900/50 ml-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 items-center">
            <div className="md:col-span-3 space-y-4 text-dark-text text-lg leading-relaxed">
              {aboutData.description.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <div className="md:col-span-2 flex items-center justify-center">
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 group">
                <div className="absolute inset-0 bg-accent rounded-lg transform rotate-3 group-hover:rotate-0 transition-transform duration-300"></div>
                <div className="relative w-full h-full rounded-lg overflow-hidden shadow-xl">
                  <img 
                    src={aboutData.image} 
                    alt="Anandu Suresh"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
