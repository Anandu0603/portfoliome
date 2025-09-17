import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import { personalInfo } from '../data';

const iconMap = {
  Github,
  Linkedin,
  Mail,
};

const SocialLinks: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 1.5 }}
      className="hidden md:flex flex-col items-center fixed bottom-0 left-12 z-30"
    >
      <div className="flex flex-col items-center space-y-6">
        {personalInfo.socials.map((social) => {
          const Icon = iconMap[social.icon as keyof typeof iconMap];
          return (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-text hover:text-accent hover:-translate-y-1 transition-all duration-200"
              aria-label={social.name}
            >
              {Icon && <Icon size={22} />}
            </a>
          );
        })}
      </div>
      <div className="w-px h-24 bg-dark-text mt-6"></div>
    </motion.div>
  );
};

export default SocialLinks;
