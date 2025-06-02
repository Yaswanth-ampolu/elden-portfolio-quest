import React, { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import ParticleEffect from '@/components/ParticleEffect';
import ScrollIndicator from '@/components/ScrollIndicator';
import BackToTopButton from '@/components/BackToTop';
import FloatingContact from '@/components/FloatingContact';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  useEffect(() => {
    // Load the Elden Ring background CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/assets/backgrounds/elden-ring-bg.css';
    document.head.appendChild(link);

    return () => {
      // Cleanup: remove the CSS link when component unmounts
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden elden-ring-bg">
      <ParticleEffect />
      
      {/* Scroll Progress Indicator */}
      <ScrollIndicator 
        type="bar" 
        position="bottom-right"
        showPercentage={false}
      />
      
      {/* Back to Top Button */}
      <BackToTopButton threshold={400} />
      
      {/* Floating Contact Button */}
      <FloatingContact />
      
      <div className="container mx-auto px-4 py-8">
        <Navigation />
        <main>
          {children}
        </main>
        <footer className="mt-20 pb-8 text-center text-sm text-elden-ash">
          <p className="font-elden tracking-wider">
            © {new Date().getFullYear()} Yaswanth Ampolu · AI Engineer & Full Stack Developer
          </p>
          <div className="elden-divider w-24 mx-auto"></div>
          <p className="italic text-elden-ash/70">
            "In the age of AI, every line of code is a step toward digital mastery."
          </p>
          <div className="mt-4 flex justify-center space-x-4 text-xs">
            <a 
              href="https://github.com/Yaswanth-ampolu" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-elden-gold transition-colors"
            >
              GitHub
            </a>
            <span className="text-elden-ash/50">·</span>
            <a 
              href="https://www.linkedin.com/in/yaswanth-ampolu-a2b110238/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-elden-gold transition-colors"
            >
              LinkedIn
            </a>
            <span className="text-elden-ash/50">·</span>
            <a 
              href="mailto:ampoluyaswanth2002@gmail.com"
              className="hover:text-elden-gold transition-colors"
            >
              Contact
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;
