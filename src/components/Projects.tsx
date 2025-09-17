import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, Images, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData } from '../data';

interface Project {
  title: string;
  description: string;
  techStack: string[];
  mainImage: string;
  gallery: string[];
  githubUrl: string;
  liveUrl: string | null;
}

const ProjectGalleryModal: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? project.gallery.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === project.gallery.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative bg-secondary rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-blue-900/50 flex justify-between items-center">
          <h3 className="text-lg font-bold text-light-text">{project.title}</h3>
          <button onClick={onClose} className="text-dark-text hover:text-accent transition-colors">
            <X size={24} />
          </button>
        </div>
        <div className="relative flex-grow h-full min-h-0">
          <AnimatePresence initial={false} mode="wait">
            <motion.img
              key={currentIndex}
              src={project.gallery[currentIndex]}
              alt={`${project.title} - Image ${currentIndex + 1}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full object-contain p-4"
            />
          </AnimatePresence>
          <button onClick={goToPrevious} className="absolute top-1/2 left-2 sm:left-4 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors">
            <ChevronLeft size={24} />
          </button>
          <button onClick={goToNext} className="absolute top-1/2 right-2 sm:right-4 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors">
            <ChevronRight size={24} />
          </button>
        </div>
        <div className="p-2 flex justify-center space-x-2">
          {project.gallery.map((_, index) => (
            <button key={index} onClick={() => setCurrentIndex(index)} className={`w-2 h-2 rounded-full ${currentIndex === index ? 'bg-accent' : 'bg-blue-900/50'} transition-colors`}></button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};


const Projects: React.FC = () => {
  const [galleryProject, setGalleryProject] = useState<Project | null>(null);

  return (
    <>
      <section id="projects" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center mb-12">
              <h2 className="text-3xl font-bold text-light-text">
                <span className="text-accent font-mono text-2xl mr-2">03.</span>
                Things I've Built
              </h2>
              <div className="w-full h-px bg-blue-900/50 ml-6"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectsData.map((project, index) => (
                <motion.div
                  key={index}
                  className="glass-card flex flex-col group hover:-translate-y-2 overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img src={project.mainImage} alt={project.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button 
                        onClick={() => setGalleryProject(project)}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-primary bg-accent rounded-md hover:bg-opacity-80 transition-colors"
                      >
                        <Images size={18} />
                        View Gallery
                      </button>
                    </div>
                  </div>

                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-light-text group-hover:text-accent transition-colors">
                        {project.title}
                      </h3>
                      <div className="flex items-center space-x-4 pl-4">
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-dark-text hover:text-accent transition-colors"><Github size={22} /></a>
                        {project.liveUrl ? (
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-dark-text hover:text-accent transition-colors"><ExternalLink size={22} /></a>
                        ) : (
                          <span className="text-dark-text/50 cursor-not-allowed"><ExternalLink size={22} /></span>
                        )}
                      </div>
                    </div>
                    <p className="text-dark-text mb-4 leading-relaxed flex-grow">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-sm">
                      {project.techStack.map((tech) => (
                        <span key={tech} className="text-dark-text">{tech}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      <AnimatePresence>
        {galleryProject && (
          <ProjectGalleryModal
            project={galleryProject}
            onClose={() => setGalleryProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Projects;
