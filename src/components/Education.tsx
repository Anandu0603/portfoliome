import React from 'react';
import { Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { educationData } from '../data';

const Education: React.FC = () => {
  return (
    <section id="education" className="py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center mb-12">
            <h2 className="text-3xl font-bold text-light-text">
              <span className="text-accent font-mono text-2xl mr-2">02.</span>
              Education
            </h2>
            <div className="w-full h-px bg-blue-900/50 ml-6"></div>
          </div>

          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-900/50"></div>
            
            {educationData.map((item, index) => (
              <motion.div 
                key={index} 
                className="relative flex items-start mb-10 ml-4 md:ml-10"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="absolute -left-2 md:-left-6 top-1 w-4 h-4 bg-secondary border-2 border-accent rounded-full z-10"></div>
                
                <div className="glass-card p-6 w-full hover:border-accent/50 hover:shadow-xl hover:shadow-accent/10 ml-4 md:ml-0">
                  <div className="flex flex-col sm:flex-row justify-between items-start">
                    <div className="mb-2 sm:mb-0">
                      <h3 className="text-xl font-bold text-light-text mb-1">{item.degree}</h3>
                      <p className="text-accent font-semibold">{item.institution}</p>
                    </div>
                    <div className="flex items-center text-dark-text text-sm font-mono mt-2 sm:mt-0 whitespace-nowrap">
                      <Calendar size={16} className="mr-2" />
                      <span>{item.period}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
