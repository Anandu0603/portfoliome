import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { personalInfo } from '../data';

const iconMap = {
  Github,
  Linkedin,
  Mail,
};

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex md:hidden justify-center space-x-6 mb-6">
          {personalInfo.socials.map((social) => {
            const Icon = iconMap[social.icon as keyof typeof iconMap];
            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark-text hover:text-accent transition-colors duration-200"
              >
                {Icon && <Icon size={24} />}
              </a>
            );
          })}
        </div>
        <div className="text-center font-mono text-sm text-dark-text">
          <p>Designed & Built by {personalInfo.name}</p>
          <p>© {currentYear}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
