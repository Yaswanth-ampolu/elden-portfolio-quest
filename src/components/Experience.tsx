import React from 'react';
import { Briefcase, GraduationCap, Calendar, MapPin, Award, Code } from 'lucide-react';
import RuneFrame from './RuneFrame';

const Experience: React.FC = () => {
  const workExperience = [
    {
      title: "AI Application Engineer",
      company: "SierraEdge Pvt Ltd",
      period: "April 2024 - Present",
      location: "Bengaluru, India",
      description: "Developing cutting-edge AI solutions and intelligent systems. Working on machine learning pipelines, data analysis, and AI model deployment. Specializing in Python, TensorFlow, and cloud-based AI services.",
      achievements: [
        "Implemented ML models with 95% accuracy",
        "Optimized data processing pipelines",
        "Collaborated on AI-driven product features"
      ]
    },
    {
      title: "Full Stack Developer (Freelance)",
      company: "Independent Projects",
      period: "2023 - Present",
      location: "Remote",
      description: "Building modern web applications using React, TypeScript, Node.js, and Python. Created responsive and user-friendly interfaces with focus on performance and accessibility.",
      achievements: [
        "Delivered 10+ successful projects",
        "Built MotivHater productivity app",
        "Developed portfolio websites and web scraping tools"
      ]
    },
    {
      title: "Data Science Intern",
      company: "Various Organizations",
      period: "2023 - 2024",
      location: "India",
      description: "Gained hands-on experience in data analysis, machine learning, and statistical modeling. Worked on real-world datasets and contributed to data-driven decision making.",
      achievements: [
        "Completed 50-day data analysis challenge",
        "Built insurance claim prediction model",
        "Developed facial emotion recognition system"
      ]
    }
  ];

  const education = [
    {
      degree: "B.Tech in Information Technology",
      institution: "Aditya Institute of Technology and Management",
      period: "2020 - 2024",
      location: "Tekkali, Andhra Pradesh",
      description: "Comprehensive program covering software development, AI/ML, data structures, algorithms, and modern programming languages. Specialized in artificial intelligence and machine learning applications.",
      gpa: "CGPA: 8.5/10",
      coursework: ["Machine Learning", "Data Structures", "Web Development", "Database Management", "AI & Neural Networks"]
    },
    {
      degree: "Intermediate (12th Grade)",
      institution: "Sri Gurukula Vidyalayam",
      period: "2018 - 2020",
      location: "Andhra Pradesh",
      description: "Focused on Mathematics, Physics, and Chemistry with strong emphasis on analytical thinking and problem-solving skills.",
      percentage: "Percentage: 94%",
      coursework: ["Mathematics", "Physics", "Chemistry", "Computer Science"]
    },
    {
      degree: "Secondary School Certificate (10th Grade)",
      institution: "St. Francis de Sales High School",
      period: "Until 2018",
      location: "Andhra Pradesh",
      description: "Strong foundation in core subjects with excellent performance in mathematics and science subjects.",
      percentage: "Percentage: 92%",
      coursework: ["Mathematics", "Science", "English", "Social Studies"]
    }
  ];

  const certifications = [
    "Python for Data Science",
    "Machine Learning Fundamentals",
    "React.js Development",
    "MongoDB Database Administration",
    "Cloud Computing Basics"
  ];

  return (
    <section id="experience" className="py-16 md:py-24 relative">
      {/* Enhanced background */}
      <div className="absolute inset-0 opacity-15 bg-gradient-to-br from-elden-charcoal to-black"></div>
      
      {/* Dark overlay with vignette effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80 
                    shadow-[inset_0_0_100px_rgba(0,0,0,0.9)]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="elden-title text-3xl md:text-4xl mb-16">Chronicles of the Journey</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Work Experience */}
          <div>
            <RuneFrame title="Professional Experience">
              <div className="space-y-8">
                {workExperience.map((job, index) => (
                  <div key={index} className="relative pl-8 pb-6 border-l border-elden-gold/30 last:border-0">
                    {/* Decorative circle */}
                    <div className="absolute left-0 top-0 w-4 h-4 -translate-x-2 border-2 border-elden-gold bg-elden-darkGold/50 rounded-full"></div>
                    
                    <div className="flex items-start gap-2 mb-3">
                      <Briefcase size={20} className="text-elden-gold mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <h3 className="font-elden text-elden-gold text-lg">{job.title}</h3>
                        <p className="text-elden-ash font-semibold">{job.company}</p>
                      </div>
                    </div>
                    
                    <div className="ml-7 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-elden-ash/80">
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-1" />
                          <span>{job.period}</span>
                        </div>
                        <span className="hidden sm:inline">•</span>
                        <div className="flex items-center">
                          <MapPin size={14} className="mr-1" />
                          <span>{job.location}</span>
                        </div>
                      </div>
                      
                      <p className="text-elden-ash/80 text-sm leading-relaxed">{job.description}</p>
                      
                      <div className="space-y-1">
                        {job.achievements.map((achievement, i) => (
                          <div key={i} className="flex items-start text-xs text-elden-ash/70">
                            <span className="text-elden-gold mr-2">▸</span>
                            <span>{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                <div className="relative pl-8">
                  <div className="absolute left-0 top-0 w-4 h-4 -translate-x-2 border-2 border-elden-gold/50 bg-transparent rounded-full"></div>
                  <div className="text-elden-ash/50 italic text-sm ml-7">The quest continues...</div>
                </div>
              </div>
            </RuneFrame>
          </div>
          
          {/* Education */}
          <div>
            <RuneFrame title="Educational Quests">
              <div className="space-y-8">
                {education.map((edu, index) => (
                  <div key={index} className="relative pl-8 pb-6 border-l border-elden-gold/30 last:border-0">
                    {/* Decorative circle */}
                    <div className="absolute left-0 top-0 w-4 h-4 -translate-x-2 border-2 border-elden-gold bg-elden-darkGold/50 rounded-full"></div>
                    
                    <div className="flex items-start gap-2 mb-3">
                      <GraduationCap size={20} className="text-elden-gold mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <h3 className="font-elden text-elden-gold text-lg">{edu.degree}</h3>
                        <p className="text-elden-ash font-semibold">{edu.institution}</p>
                      </div>
                    </div>
                    
                    <div className="ml-7 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-elden-ash/80">
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-1" />
                          <span>{edu.period}</span>
                        </div>
                        <span className="hidden sm:inline">•</span>
                        <div className="flex items-center">
                          <MapPin size={14} className="mr-1" />
                          <span>{edu.location}</span>
                        </div>
                      </div>
                      
                      {edu.gpa && (
                        <div className="text-elden-gold text-sm font-elden">{edu.gpa}</div>
                      )}
                      {edu.percentage && (
                        <div className="text-elden-gold text-sm font-elden">{edu.percentage}</div>
                      )}
                      
                      <p className="text-elden-ash/80 text-sm leading-relaxed">{edu.description}</p>
                      
                      <div className="flex flex-wrap gap-1">
                        {edu.coursework.map((course, i) => (
                          <span key={i} className="text-xs bg-elden-darkPurple/30 border border-elden-gold/20 px-2 py-1 rounded-sm">
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </RuneFrame>
          </div>
        </div>

        {/* Certifications & Skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <RuneFrame title="Certifications & Achievements">
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-center text-elden-ash/80">
                  <Award size={16} className="text-elden-gold mr-3 flex-shrink-0" />
                  <span className="text-sm">{cert}</span>
                </div>
              ))}
            </div>
          </RuneFrame>

          <RuneFrame title="Technical Arsenal">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-elden-gold font-elden mb-3 text-sm">Languages</h4>
                <div className="space-y-2 text-xs">
                  <div>Python • Expert</div>
                  <div>JavaScript • Advanced</div>
                  <div>TypeScript • Advanced</div>
                  <div>SQL • Intermediate</div>
                </div>
              </div>
              <div>
                <h4 className="text-elden-gold font-elden mb-3 text-sm">Technologies</h4>
                <div className="space-y-2 text-xs">
                  <div>React • Advanced</div>
                  <div>Node.js • Intermediate</div>
                  <div>MongoDB • Intermediate</div>
                  <div>TensorFlow • Intermediate</div>
                </div>
              </div>
            </div>
          </RuneFrame>
        </div>
      </div>
    </section>
  );
};

export default Experience;
