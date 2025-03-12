
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Server, Shield, Network, Terminal, Cloud, Database, Search, FilterX } from 'lucide-react';
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
  const navigate = useNavigate();
  const { content, coursesList } = useContentStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  
  const getIconComponent = (iconName: string) => {
    return iconMap[iconName as keyof typeof iconMap] || <Terminal className="h-6 w-6" />;
  };
  
  const filteredCourses = coursesList.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel ? course.level === selectedLevel : true;
    return matchesSearch && matchesLevel;
  });
  
  const levels = Array.from(new Set(coursesList.map(course => course.level)));
  
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

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedLevel(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-tecentrix-gray py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12 reveal">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-tecentrix-blue mb-6">
                {content.courses.title}
              </h1>
              <p className="text-lg text-tecentrix-darkgray/80">
                {content.courses.subtitle}
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-4 reveal">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-tecentrix-darkgray/50" />
                <Input
                  type="text"
                  placeholder="Search courses by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                {levels.map(level => (
                  <Button
                    key={level}
                    variant={selectedLevel === level ? "default" : "outline"}
                    onClick={() => setSelectedLevel(selectedLevel === level ? null : level)}
                    className="whitespace-nowrap"
                  >
                    {level}
                  </Button>
                ))}
                {(searchTerm || selectedLevel) && (
                  <Button 
                    variant="ghost" 
                    onClick={resetFilters}
                    className="flex items-center gap-1"
                  >
                    <FilterX className="h-4 w-4" />
                    Reset
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Courses List */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            {filteredCourses.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-tecentrix-blue mb-2">No courses found</h3>
                <p className="text-tecentrix-darkgray/80">Try adjusting your search or filters</p>
                <Button onClick={resetFilters} className="mt-4">
                  Reset Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourses.map((course, index) => (
                  <Card 
                    key={course.id}
                    className={`scale-reveal overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg ${
                      course.highlighted ? 'ring-2 ring-tecentrix-orange shadow-md' : 'shadow-sm'
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => navigate(`/courses/${course.id}`)}
                  >
                    <CardContent className={`${course.color} p-8`}>
                      <div className="flex items-start justify-between mb-4">
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
                      
                      <p className="text-tecentrix-darkgray/80 mb-6">
                        {course.description}
                      </p>
                      
                      <div className="mt-5 mb-6">
                        <h5 className="text-sm font-semibold text-tecentrix-blue mb-3">Course Highlights:</h5>
                        <ul className="space-y-2">
                          {course.modules.slice(0, 3).map((module, i) => (
                            <li key={i} className="flex items-start">
                              <svg className="h-5 w-5 text-green-500 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-sm text-tecentrix-darkgray/80">{module}</span>
                            </li>
                          ))}
                          {course.modules.length > 3 && (
                            <li className="text-sm text-tecentrix-blue font-medium ml-7">
                              +{course.modules.length - 3} more modules
                            </li>
                          )}
                        </ul>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="text-lg font-bold text-tecentrix-blue">{course.price}</div>
                        <Button 
                          className={course.highlighted ? "tecentrix-secondary-button" : "tecentrix-primary-button"}
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/courses/${course.id}`);
                          }}
                        >
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-tecentrix-gray">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 md:p-12 shadow-lg reveal">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-tecentrix-blue mb-4">
                    Not Sure Which Course is Right for You?
                  </h2>
                  <p className="text-tecentrix-darkgray/80 mb-6">
                    Speak with our education advisors for personalized recommendations based on your career goals and experience level.
                  </p>
                  <Button 
                    className="tecentrix-primary-button"
                    onClick={() => navigate('/contact')}
                  >
                    Get Free Consultation
                  </Button>
                </div>
                <div className="hidden md:block">
                  <img 
                    src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                    alt="Education advisors" 
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Courses;
