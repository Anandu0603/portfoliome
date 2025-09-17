import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { personalInfo, heroData } from '../data';

const iconMap = {
  Github,
  Linkedin,
  Mail,
};

const Hero: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-24 pb-16 bg-primary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <div className="w-40 h-40 mx-auto rounded-full overflow-hidden shadow-2xl shadow-accent/10 border-4 border-secondary group">
              <img 
                src={personalInfo.profilePicture} 
                alt={personalInfo.name}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          </motion.div>

          <motion.p variants={itemVariants} className="text-accent mb-4 font-mono">
            {heroData.greeting}
          </motion.p>
          
          <motion.h1 variants={itemVariants} className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-light-text mb-4">
            {heroData.name}
          </motion.h1>

          <motion.h2 variants={itemVariants} className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-dark-text mb-8">
            {heroData.subtitle}
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-lg text-dark-text mb-12 max-w-2xl mx-auto leading-relaxed">
            {heroData.description}
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
            <button onClick={() => scrollToSection('projects')} className="btn-primary">
              View My Work
            </button>
            <button onClick={() => scrollToSection('contact')} className="btn-secondary">
              Get In Touch
            </button>
          </motion.div>

          <motion.div variants={itemVariants} className="flex md:hidden justify-center space-x-6">
            {personalInfo.socials.map((social) => {
              const Icon = iconMap[social.icon as keyof typeof iconMap];
              return (
                <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="text-dark-text hover:text-accent transition-colors duration-300">
                  {Icon && <Icon size={24} />}
                </a>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
