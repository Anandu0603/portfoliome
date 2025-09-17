import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { supabase, ContactMessage } from '../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { contactData } from '../data';

const Contact: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill out all fields.');
      return;
    }
    setIsSubmitting(true);
    setError(null);
    setIsSubmitted(false);
    
    try {
      const contactData: Partial<ContactMessage> = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
        subject: `New message from ${formData.name.trim()}`,
        user_agent: navigator.userAgent
      };

      const { error: supabaseError } = await supabase.from('contact_messages').insert([contactData]);
      if (supabaseError) throw new Error(supabaseError.message);

      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });

      setTimeout(() => {
        setShowForm(false);
        setIsSubmitted(false);
      }, 3000);
      
    } catch (err) {
      console.error('Error submitting contact form:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to send message. Please try again.';
      setError(errorMessage.includes('security policy') ? 'Could not send message. Please try again later.' : errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="font-mono text-accent mb-2">05. What's Next?</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-light-text mb-4">{contactData.title}</h3>
          <p className="text-dark-text mb-12 max-w-xl mx-auto">
            {contactData.description}
          </p>
        </motion.div>

        <div className="min-h-[320px]">
          <AnimatePresence mode="wait">
            {!showForm ? (
              <motion.div
                key="button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <button
                  onClick={() => setShowForm(true)}
                  className="btn-primary text-lg"
                >
                  Say Hello
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-secondary border border-blue-900/50 rounded-md p-3 text-light-text placeholder-dark-text focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-secondary border border-blue-900/50 rounded-md p-3 text-light-text placeholder-dark-text focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
                    />
                  </div>
                  <div>
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-secondary border border-blue-900/50 rounded-md p-3 text-light-text placeholder-dark-text focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
                    ></textarea>
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full md:w-auto flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          Send Message
                        </>
                      )}
                    </button>
                  </div>
                </form>
                
                <AnimatePresence>
                  {isSubmitted && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-6 flex items-center justify-center p-4 rounded-md bg-green-500/10 text-green-400 border border-green-500/30"
                    >
                      <CheckCircle className="mr-3" />
                      <p>Message sent! Thank you for reaching out.</p>
                    </motion.div>
                  )}

                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-6 flex items-center justify-center p-4 rounded-md bg-red-500/10 text-red-400 border border-red-500/30"
                    >
                      <AlertCircle className="mr-3" />
                      <p>{error}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Contact;
