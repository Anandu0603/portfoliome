import React from 'react';
import { motion } from 'framer-motion';
import { skillsData } from '../data';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center mb-12">
            <h2 className="text-3xl font-bold text-light-text">
              <span className="text-accent font-mono text-2xl mr-2">04.</span>
              Skills & Technologies
            </h2>
            <div className="w-full h-px bg-blue-900/50 ml-6"></div>
          </div>

          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3 text-dark-text">
            {skillsData.map((skill, index) => (
              <motion.li 
                key={skill}
                className="flex items-center"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <span className="text-accent mr-3">▹</span>
                <span>{skill}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
