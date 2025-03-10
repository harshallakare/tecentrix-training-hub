
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Server, Shield, Network, Terminal, Cloud, Database } from 'lucide-react';
import { useContentStore } from '@/store/contentStore';

const iconMap = {
  'Terminal': <Terminal className="h-6 w-6" />,
  'Server': <Server className="h-6 w-6" />,
  'Shield': <Shield className="h-6 w-6" />,
  'Network': <Network className="h-6 w-6" />,
  'Cloud': <Cloud className="h-6 w-6" />,
  'Database': <Database className="h-6 w-6" />,
};

const Courses = () => {
  const { content, coursesList } = useContentStore();
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.classList.contains('reveal-right')) {
              entry.target.classList.add('reveal-right-visible');
            } else if (entry.target.classList.contains('reveal-left')) {
              entry.target.classList.add('reveal-left-visible');
            } else if (entry.target.classList.contains('scale-reveal')) {
              entry.target.classList.add('scale-reveal-visible');
            } else {
              entry.target.classList.add('reveal-visible');
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    const revealElements = document.querySelectorAll('.reveal, .reveal-right, .reveal-left, .scale-reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const getIconComponent = (iconName: string) => {
    return iconMap[iconName as keyof typeof iconMap] || <Terminal className="h-6 w-6" />;
  };

  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-semibold text-tecentrix-orange uppercase tracking-wide reveal">Certification Courses</h2>
          <h3 className="mt-2 text-3xl md:text-4xl font-bold text-tecentrix-blue reveal">
            {content.courses.title}
          </h3>
          <p className="mt-4 text-lg text-tecentrix-darkgray/80 reveal">
            {content.courses.subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {coursesList.map((course, index) => (
            <div 
              key={course.id}
              className={`scale-reveal rounded-xl overflow-hidden transition-all duration-300 ${course.highlighted ? 'ring-2 ring-tecentrix-orange shadow-lg' : 'border border-gray-200 shadow-sm hover:shadow-md'}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`${course.color} p-8`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <div className={`${course.iconBg} p-3 rounded-lg ${course.iconColor}`}>
                      {getIconComponent(course.icon)}
                    </div>
                    <div className="ml-4">
                      <h4 className="text-xl font-semibold text-tecentrix-blue">{course.title}</h4>
                      <div className="flex space-x-3 mt-1">
                        <span className="text-sm text-tecentrix-darkgray/70">{course.level}</span>
                        <span className="text-sm text-tecentrix-darkgray/70">•</span>
                        <span className="text-sm text-tecentrix-darkgray/70">{course.duration}</span>
                      </div>
                    </div>
                  </div>
                  {course.highlighted && (
                    <div className="bg-tecentrix-orange text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Best Seller
                    </div>
                  )}
                </div>
                
                <p className="mt-4 text-tecentrix-darkgray/80">
                  {course.description}
                </p>
                
                <div className="mt-5">
                  <h5 className="text-sm font-semibold text-tecentrix-blue mb-3">Course Curriculum:</h5>
                  <ul className="space-y-2">
                    {course.modules.map((module, i) => (
                      <li key={i} className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-tecentrix-darkgray/80">{module}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-6 flex justify-between items-center">
                  <div className="text-lg font-bold text-tecentrix-blue">{course.price}</div>
                  {course.highlighted ? (
                    <Button className="tecentrix-secondary-button">Enroll Now</Button>
                  ) : (
                    <Button className="tecentrix-primary-button">Course Details</Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center reveal">
          <p className="text-tecentrix-darkgray mb-4">Need a custom training program for your organization?</p>
          <Button className="tecentrix-outline-button">
            Request Corporate Training
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Courses;
