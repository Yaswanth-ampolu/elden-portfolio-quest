import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, Code, Star, GitFork } from 'lucide-react';
import RuneFrame from './RuneFrame';
import { useQuery } from '@tanstack/react-query';
import { toast } from '@/components/ui/use-toast';

// GitHub API fetch function
const fetchGithubRepos = async () => {
  const response = await fetch('https://api.github.com/users/Yaswanth-ampolu/repos');
  if (!response.ok) {
    throw new Error('Failed to fetch GitHub repositories');
  }
  return response.json();
};

// List of repositories to display with custom descriptions
const allowedRepos = [
  'MotivHater',
  'Ampolu-Yaswanth',
  'Insurance-Claim-Prediction-using-Machine-Learning',
  'RentalTruth-Scrapper',
  'llm-compare-analytics',
  'portfolio-windowsxp-style',
  '50-Data_Analysis_for_50_Days',
  'Facial-Emotion-Recognization'
];

// Custom descriptions for better presentation
const customDescriptions: Record<string, string> = {
  'MotivHater': 'A unique productivity app that blends AI-generated humor, brutal roasts, and gamified motivation. Built with React 14, Express, Vite, shadcn/ui, Tailwind CSS, and Drizzle ORM.',
  'Ampolu-Yaswanth': 'My personal portfolio website showcasing skills, projects, and professional journey in software development and AI/ML. Features responsive design and modern UI.',
  'Insurance-Claim-Prediction-using-Machine-Learning': 'Machine learning project predicting insurance claims based on demographic and health factors. Implements various ML algorithms for accurate prediction.',
  'RentalTruth-Scrapper': 'Advanced web scraping tool for rental property data analysis. Helps users find accurate rental information and market insights.',
  'llm-compare-analytics': 'Comprehensive analytics platform for comparing Large Language Models performance. Features interactive dashboards and detailed comparisons.',
  'portfolio-windowsxp-style': 'Nostalgic portfolio website designed with Windows XP aesthetic. Created with StackBlitz for a unique retro experience.',
  '50-Data_Analysis_for_50_Days': '50-day data analysis challenge covering various datasets and analytical techniques. A comprehensive journey through data science.',
  'Facial-Emotion-Recognization': 'Deep learning project for real-time facial emotion recognition using computer vision techniques and neural networks.'
};

type Repository = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  topics: string[];
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  homepage: string | null;
};

const Projects: React.FC = () => {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  
  const { data: repos, isLoading, error } = useQuery({
    queryKey: ['githubRepos'],
    queryFn: fetchGithubRepos,
  });

  useEffect(() => {
    if (error) {
      toast({
        title: "Error fetching repositories",
        description: "Could not load GitHub projects. Please try again later.",
        variant: "destructive"
      });
    }
  }, [error]);

  // Custom project images mapping
  const projectImages: Record<string, string> = {
    'MotivHater': 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=1740&q=80', // Motivation/productivity
    'Ampolu-Yaswanth': 'https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?auto=format&fit=crop&w=1740&q=80', // Portfolio/professional
    'Insurance-Claim-Prediction-using-Machine-Learning': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1740&q=80', // Data analysis
    'RentalTruth-Scrapper': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1740&q=80', // Real estate
    'llm-compare-analytics': 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1740&q=80', // AI/Analytics
    'portfolio-windowsxp-style': 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=1740&q=80', // Retro computing
    '50-Data_Analysis_for_50_Days': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1740&q=80', // Data science
    'Facial-Emotion-Recognization': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1740&q=80', // Face recognition
    'default': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1740&q=80' // Default tech
  };

  // Prepare and filter repositories for display
  const prepareRepos = (repos: Repository[] | undefined) => {
    if (!repos) return [];
    
    // Filter repositories by allowed names and sort by stars/activity
    return repos
      .filter(repo => allowedRepos.includes(repo.name))
      .sort((a, b) => {
        // Sort by stars first, then by last updated
        if (b.stargazers_count !== a.stargazers_count) {
          return b.stargazers_count - a.stargazers_count;
        }
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      })
      .map(repo => {
        const image = projectImages[repo.name] || projectImages['default'];
        const description = customDescriptions[repo.name] || repo.description || "A powerful project showcasing innovative development techniques.";
        
        return {
          ...repo,
          image,
          description,
          technologies: [repo.language, ...(repo.topics || [])].filter(Boolean)
        };
      });
  };

  const displayRepos = prepareRepos(repos);
  
  return (
    <section id="projects" className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4">
        <h2 className="elden-title text-3xl md:text-4xl mb-16">Quest Chronicles</h2>
        
        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-pulse elden-card w-full max-w-xl p-8 text-center">
              <p className="text-elden-ash">Summoning repositories from the GitHub realm...</p>
              <div className="mt-4 w-16 h-16 border-2 border-elden-gold/30 border-t-elden-gold rounded-full animate-spin mx-auto"></div>
            </div>
          </div>
        ) : error ? (
          <RuneFrame title="Connection to GitHub Realm Failed">
            <div className="text-center py-8">
              <p className="text-elden-ash mb-4">Failed to establish connection with the GitHub realm.</p>
              <p className="text-elden-ash/70 mb-6 text-sm">The sacred repositories remain beyond reach...</p>
              <button 
                onClick={() => window.location.reload()} 
                className="elden-button"
              >
                Attempt Reconnection
              </button>
            </div>
          </RuneFrame>
        ) : displayRepos.length === 0 ? (
          <RuneFrame title="No Sacred Repositories Discovered">
            <div className="text-center py-8">
              <p className="text-elden-ash mb-4">The GitHub realm yields no specified repositories.</p>
              <a 
                href="https://github.com/Yaswanth-ampolu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="elden-button inline-flex items-center"
              >
                <Github size={16} className="mr-2" />
                Explore All Repositories
              </a>
            </div>
          </RuneFrame>
        ) : (
          <>
            <div className="text-center mb-12">
              <p className="text-elden-ash/80 max-w-2xl mx-auto">
                Behold the chronicles of my journey through the realms of code and intelligence. 
                Each repository represents a quest completed, a challenge conquered.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {displayRepos.map((repo) => (
                <div 
                  key={repo.id}
                  className={`elden-card hover:border-elden-gold/60 transition-all duration-300 group h-full flex flex-col ${
                    activeProject === repo.id ? 'scale-102 border-elden-gold shadow-lg shadow-elden-gold/20' : ''
                  }`}
                  onMouseEnter={() => setActiveProject(repo.id)}
                  onMouseLeave={() => setActiveProject(null)}
                >
                  <div className="h-48 overflow-hidden mb-4 border border-elden-gold/20 relative rounded-lg">
                    <img 
                      src={repo.image} 
                      alt={repo.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-elden-charcoal/80 to-transparent"></div>
                    
                    {/* Repository stats overlay */}
                    <div className="absolute top-3 right-3 flex gap-2">
                      {repo.stargazers_count > 0 && (
                        <div className="flex items-center bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full text-xs">
                          <Star size={12} className="text-elden-gold mr-1" />
                          <span className="text-elden-ash">{repo.stargazers_count}</span>
                        </div>
                      )}
                      {repo.forks_count > 0 && (
                        <div className="flex items-center bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full text-xs">
                          <GitFork size={12} className="text-elden-gold mr-1" />
                          <span className="text-elden-ash">{repo.forks_count}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="font-elden text-xl text-elden-gold mb-3 group-hover:text-elden-lightGold transition-colors">
                    {repo.name.replace(/-/g, ' ')}
                  </h3>
                  
                  <p className="text-elden-ash/90 mb-4 flex-grow text-sm leading-relaxed">
                    {repo.description}
                  </p>
                  
                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {repo.technologies.slice(0, 4).map((tech) => tech && (
                        <span 
                          key={tech.toString()} 
                          className="text-xs bg-elden-darkPurple/50 border border-elden-gold/20 px-2 py-1 rounded-sm hover:border-elden-gold/40 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <a 
                        href={repo.html_url} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center font-elden text-sm text-elden-gold hover:text-elden-lightGold transition-colors duration-300"
                      >
                        <Github size={16} className="mr-1" />
                        <span>Repository</span>
                      </a>
                      
                      {repo.homepage && (
                        <a 
                          href={repo.homepage} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center font-elden text-sm text-elden-gold hover:text-elden-lightGold transition-colors duration-300"
                        >
                          <ExternalLink size={16} className="mr-1" />
                          <span>Live Demo</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <a 
                href="https://github.com/Yaswanth-ampolu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="elden-button inline-flex items-center"
              >
                <Github size={18} className="mr-2" />
                Explore All {repos?.length || 0} Repositories
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Projects;
