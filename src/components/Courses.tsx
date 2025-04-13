import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Server, Shield, Network, Terminal, Cloud, Database, Calendar, Languages } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { useContentSync } from '@/hooks/use-content-sync';

const iconMap = {
  'Terminal': <Terminal className="h-6 w-6" />,
  'Server': <Server className="h-6 w-6" />,
  'Shield': <Shield className="h-6 w-6" />,
  'Network': <Network className="h-6 w-6" />,
  'Cloud': <Cloud className="h-6 w-6" />,
  'Database': <Database className="h-6 w-6" />,
};

const Courses = () => {
  const { content, coursesList, refreshContent } = useContentSync(true);
  
  const visibleCourses = coursesList.filter(course => course.enabled !== false);
  
  useEffect(() => {
    refreshContent();
    
    const refreshCycle = setInterval(() => {
      refreshContent();
      console.log("Course data refresh cycle triggered");
    }, 10000);
    
    const handleFocus = () => {
      refreshContent();
      console.log("Window focused, refreshing course data");
    };
    
    window.addEventListener('focus', handleFocus);
    
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
      clearInterval(refreshCycle);
      window.removeEventListener('focus', handleFocus);
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, [refreshContent]);
  
  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('tecentrix-content');
    }
    
    refreshContent();
    setTimeout(refreshContent, 1000);
    setTimeout(refreshContent, 3000);
    
    if (window.innerWidth < 768) {
      toast.info("Loading latest course data...");
    }
  }, [refreshContent]);
  
  useEffect(() => {
    console.log("Courses component rendered with", visibleCourses.length, "visible courses");
    console.log("Course IDs:", visibleCourses.map(c => c.id).join(", "));
  }, [visibleCourses]);

  const getIconComponent = (iconName: string) => {
    return iconMap[iconName as keyof typeof iconMap] || <Terminal className="h-6 w-6" />;
  };

  const handleEnroll = (course) => {
    const paymentLink = course.paymentLink || "https://rzp.io/l/tecentrix-course";
    
    window.open(paymentLink, '_blank');
    
    toast.info("Redirecting to secure payment page", {
      description: "You'll be taken to our payment partner to complete your enrollment."
    });
  };

  const renderBatchDates = (course) => {
    const batches = course.upcomingBatches || (course.upcomingBatch ? [course.upcomingBatch] : []);
    
    if (batches.length === 0) return null;
    
    return (
      <div className="flex items-center">
        <Calendar className="h-4 w-4 mr-1.5 text-tecentrix-blue" />
        <span>
          {batches.length === 1 
            ? `Next Batch: ${batches[0]}`
            : `Next Batches: ${batches.slice(0, 2).join(', ')}${batches.length > 2 ? '...' : ''}`
          }
        </span>
      </div>
    );
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
          {visibleCourses.map((course, index) => (
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
                
                <div className="mt-6 flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <div className="text-lg font-bold text-tecentrix-blue">{course.price}</div>
                    {course.highlighted ? (
                      <Button className="tecentrix-secondary-button" onClick={() => handleEnroll(course)}>Enroll Now</Button>
                    ) : (
                      <Link to={`/courses/${course.id}`}>
                        <Button className="tecentrix-primary-button">Course Details</Button>
                      </Link>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-tecentrix-darkgray/80">
                    {renderBatchDates(course)}
                    {course.language && (
                      <div className="flex items-center">
                        <Languages className="h-4 w-4 mr-1.5 text-tecentrix-blue" />
                        <span>Language: {course.language}</span>
                      </div>
                    )}
                  </div>
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
