import React, { useState } from 'react';
import { Mail, Github, Linkedin, Send, Phone, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create mailto link with form data
    const emailSubject = `Portfolio Contact: Message from ${formData.name}`;
    const emailBody = `Hi Yaswanth,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}\n\nBest regards,\n${formData.name}`;
    const mailtoLink = `mailto:ampoluyaswanth2002@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    toast({
      title: "Email Client Opened",
      description: "Your default email client should now open with the message pre-filled.",
    });
    
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };
  
  return (
    <section id="contact" className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4">
        <h2 className="elden-title text-3xl md:text-4xl mb-16">Summon the Developer</h2>
        
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="elden-card">
            <h3 className="font-elden text-xl text-elden-gold mb-6">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-elden text-elden-ash mb-1">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 bg-elden-charcoal border border-elden-gold/30 text-foreground focus:border-elden-gold transition-colors duration-300 outline-none rounded-sm"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-elden text-elden-ash mb-1">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-2 bg-elden-charcoal border border-elden-gold/30 text-foreground focus:border-elden-gold transition-colors duration-300 outline-none rounded-sm"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-elden text-elden-ash mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell me about your project, collaboration ideas, or just say hello!"
                  className="w-full px-4 py-2 bg-elden-charcoal border border-elden-gold/30 text-foreground focus:border-elden-gold transition-colors duration-300 outline-none resize-none rounded-sm"
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="elden-button flex items-center justify-center w-full hover:bg-elden-gold/20 transition-all duration-300"
              >
                <span>Send Message</span>
                <Send size={16} className="ml-2" />
              </button>
            </form>
          </div>
          
          <div className="elden-card flex flex-col justify-between">
            <div>
              <h3 className="font-elden text-xl text-elden-gold mb-6">Connect With Me</h3>
              
              <p className="text-elden-ash/90 mb-8 leading-relaxed">
                I'm always open to discussing new opportunities, collaborations, or interesting projects. 
                Whether you're looking for an AI engineer, full-stack developer, or just want to chat about technology, 
                feel free to reach out!
              </p>
              
              <div className="space-y-4">
                <a 
                  href="mailto:ampoluyaswanth2002@gmail.com" 
                  className="flex items-center text-elden-ash hover:text-elden-gold transition-colors duration-300 group"
                >
                  <Mail size={20} className="mr-3 text-elden-gold group-hover:scale-110 transition-transform" />
                  <span>ampoluyaswanth2002@gmail.com</span>
                </a>
                
                <a 
                  href="tel:+916305151728" 
                  className="flex items-center text-elden-ash hover:text-elden-gold transition-colors duration-300 group"
                >
                  <Phone size={20} className="mr-3 text-elden-gold group-hover:scale-110 transition-transform" />
                  <span>+91 6305151728</span>
                </a>
                
                <div className="flex items-center text-elden-ash">
                  <MapPin size={20} className="mr-3 text-elden-gold" />
                  <span>Bengaluru, Karnataka, India</span>
                </div>
                
                <a 
                  href="https://github.com/Yaswanth-ampolu" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-elden-ash hover:text-elden-gold transition-colors duration-300 group"
                >
                  <Github size={20} className="mr-3 text-elden-gold group-hover:scale-110 transition-transform" />
                  <span>github.com/Yaswanth-ampolu</span>
                </a>
                
                <a 
                  href="https://www.linkedin.com/in/yaswanth-ampolu-a2b110238/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-elden-ash hover:text-elden-gold transition-colors duration-300 group"
                >
                  <Linkedin size={20} className="mr-3 text-elden-gold group-hover:scale-110 transition-transform" />
                  <span>linkedin.com/in/yaswanth-ampolu</span>
                </a>
                
                <a 
                  href="https://yaswanth-ampolu.github.io/Ampolu-Yaswanth/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-elden-ash hover:text-elden-gold transition-colors duration-300 group"
                >
                  <Mail size={20} className="mr-3 text-elden-gold group-hover:scale-110 transition-transform" />
                  <span>Portfolio Website</span>
                </a>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-elden-gold/20">
              <div className="text-center">
                <p className="text-elden-ash/70 text-sm italic mb-3">
                  "In the age of AI, the greatest adventures await those who dare to code."
                </p>
                <p className="text-elden-gold/80 text-xs font-elden">
                  — Available for freelance projects and full-time opportunities
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Quick contact cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="elden-card text-center p-6 hover:border-elden-gold/60 transition-all duration-300">
            <Mail className="text-elden-gold mx-auto mb-3" size={32} />
            <h4 className="font-elden text-lg text-elden-gold mb-2">Email Me</h4>
            <p className="text-elden-ash/80 text-sm">
              Best for detailed project discussions and professional inquiries
            </p>
          </div>
          
          <div className="elden-card text-center p-6 hover:border-elden-gold/60 transition-all duration-300">
            <Github className="text-elden-gold mx-auto mb-3" size={32} />
            <h4 className="font-elden text-lg text-elden-gold mb-2">GitHub</h4>
            <p className="text-elden-ash/80 text-sm">
              Explore my code repositories and contribute to open source projects
            </p>
          </div>
          
          <div className="elden-card text-center p-6 hover:border-elden-gold/60 transition-all duration-300">
            <Linkedin className="text-elden-gold mx-auto mb-3" size={32} />
            <h4 className="font-elden text-lg text-elden-gold mb-2">LinkedIn</h4>
            <p className="text-elden-ash/80 text-sm">
              Connect professionally and view my detailed work experience
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
