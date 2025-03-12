
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Server, Shield, Network, Terminal, Cloud, Database, Search, FilterX, Calendar, Clock, Users, BookOpen } from 'lucide-react';
import { useContentStore } from '@/store/contentStore';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
  const [activeTab, setActiveTab] = useState('all');
  
  const getIconComponent = (iconName: string) => {
    return iconMap[iconName as keyof typeof iconMap] || <Terminal className="h-6 w-6" />;
  };
  
  const filteredCourses = coursesList.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel ? course.level === selectedLevel : true;
    const matchesTab = activeTab === 'all' ? true : 
                      (activeTab === 'beginner' && course.level === 'Foundation') ||
                      (activeTab === 'advanced' && course.level === 'Advanced');
    return matchesSearch && matchesLevel && matchesTab;
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
    setActiveTab('all');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-tecentrix-blue/10 to-tecentrix-orange/10 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12 reveal">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-tecentrix-blue mb-6">
                {content.courses.title}
              </h1>
              <p className="text-lg text-tecentrix-darkgray/80">
                {content.courses.subtitle}
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <Badge variant="outline" className="py-2 px-4 bg-white/70 backdrop-blur-sm">
                  <Users className="mr-2 h-4 w-4" /> 5,000+ Students
                </Badge>
                <Badge variant="outline" className="py-2 px-4 bg-white/70 backdrop-blur-sm">
                  <BookOpen className="mr-2 h-4 w-4" /> 4 Certifications
                </Badge>
                <Badge variant="outline" className="py-2 px-4 bg-white/70 backdrop-blur-sm">
                  <Calendar className="mr-2 h-4 w-4" /> Weekly Batches
                </Badge>
              </div>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="p-4 bg-white rounded-xl shadow-md mb-6 reveal">
                <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <TabsList className="mb-0">
                      <TabsTrigger value="all">All Courses</TabsTrigger>
                      <TabsTrigger value="beginner">Beginner</TabsTrigger>
                      <TabsTrigger value="advanced">Advanced</TabsTrigger>
                    </TabsList>
                    
                    <div className="relative flex-grow max-w-md">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-tecentrix-darkgray/50" />
                      <Input
                        type="text"
                        placeholder="Search courses..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {(searchTerm || selectedLevel || activeTab !== 'all') && (
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-sm text-tecentrix-darkgray/70">Active filters:</span>
                      {searchTerm && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                          Search: {searchTerm}
                        </Badge>
                      )}
                      {selectedLevel && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                          Level: {selectedLevel}
                        </Badge>
                      )}
                      {activeTab !== 'all' && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                          Category: {activeTab === 'beginner' ? 'Beginner' : 'Advanced'}
                        </Badge>
                      )}
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={resetFilters}
                        className="h-7 px-2 text-xs"
                      >
                        <FilterX className="h-3 w-3 mr-1" />
                        Reset
                      </Button>
                    </div>
                  )}
                
                  <TabsContent value="all" className="mt-0">
                    {/* Content rendered by the filter logic below */}
                  </TabsContent>
                  <TabsContent value="beginner" className="mt-0">
                    {/* Content rendered by the filter logic below */}
                  </TabsContent>
                  <TabsContent value="advanced" className="mt-0">
                    {/* Content rendered by the filter logic below */}
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </section>

        {/* Courses List */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            {filteredCourses.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-semibold text-tecentrix-blue mb-2">No courses found</h3>
                <p className="text-tecentrix-darkgray/80 mb-4">Try adjusting your search or filters</p>
                <Button onClick={resetFilters} variant="outline">
                  Reset Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourses.map((course, index) => (
                  <Card 
                    key={course.id}
                    className={`scale-reveal overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg border-t-4 ${
                      course.highlighted ? 'border-t-tecentrix-orange' : 'border-t-tecentrix-blue'
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => navigate(`/courses/${course.id}`)}
                  >
                    <CardContent className="p-0">
                      {/* Course header */}
                      <div className={`${course.color} p-6`}>
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center">
                            <div className={`${course.iconBg} p-3 rounded-lg ${course.iconColor}`}>
                              {getIconComponent(course.icon)}
                            </div>
                            <div className="ml-4">
                              <h4 className="text-xl font-semibold text-tecentrix-blue">{course.title}</h4>
                              <div className="flex flex-wrap gap-2 mt-1">
                                <Badge variant="outline" className="text-xs font-normal">
                                  {course.level}
                                </Badge>
                                <Badge variant="outline" className="text-xs font-normal">
                                  <Clock className="mr-1 h-3 w-3" /> {course.duration}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          {course.highlighted && (
                            <div className="bg-tecentrix-orange text-white text-xs font-semibold px-3 py-1 rounded-full">
                              Best Seller
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Course body */}
                      <div className="p-6">
                        <p className="text-tecentrix-darkgray/80 mb-6">
                          {course.description}
                        </p>
                        
                        <div className="mb-6">
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
                        
                        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
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
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            
            {/* Course Categories */}
            <div className="mt-16 reveal">
              <h2 className="text-2xl font-bold text-tecentrix-blue text-center mb-12">Course Categories</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg text-center hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Terminal className="h-8 w-8 text-tecentrix-blue" />
                  </div>
                  <h3 className="text-lg font-semibold text-tecentrix-blue mb-2">System Administration</h3>
                  <p className="text-sm text-tecentrix-darkgray/80">Core Linux skills for managing servers and systems</p>
                </div>
                
                <div className="bg-orange-50 p-6 rounded-lg text-center hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Server className="h-8 w-8 text-tecentrix-orange" />
                  </div>
                  <h3 className="text-lg font-semibold text-tecentrix-blue mb-2">Infrastructure</h3>
                  <p className="text-sm text-tecentrix-darkgray/80">Design and manage enterprise-grade infrastructure</p>
                </div>
                
                <div className="bg-green-50 p-6 rounded-lg text-center hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-tecentrix-blue mb-2">Security</h3>
                  <p className="text-sm text-tecentrix-darkgray/80">Protect systems and data with advanced security practices</p>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-lg text-center hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Cloud className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-tecentrix-blue mb-2">Cloud & DevOps</h3>
                  <p className="text-sm text-tecentrix-darkgray/80">Modern cloud deployment and automation skills</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Certification Path */}
        <section className="py-16 bg-tecentrix-gray">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12 reveal">
              <h2 className="text-3xl font-bold text-tecentrix-blue mb-4">
                Your Linux Certification Path
              </h2>
              <p className="text-tecentrix-darkgray/80">
                Follow a structured learning path to become a certified Linux professional
              </p>
            </div>
            
            <div className="relative max-w-4xl mx-auto reveal">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-tecentrix-blue/20"></div>
              
              {/* Timeline items */}
              <div className="grid grid-cols-1 gap-12 relative z-10">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-12 text-right order-2 md:order-1">
                    <h3 className="text-xl font-semibold text-tecentrix-blue mb-2">Step 1: RHCSA Certification</h3>
                    <p className="text-tecentrix-darkgray/80 mb-3">
                      Begin with Red Hat Certified System Administrator (RHCSA) to learn essential Linux skills.
                    </p>
                    <Badge className="bg-blue-100 text-tecentrix-blue hover:bg-blue-200">Foundation Level</Badge>
                  </div>
                  <div className="md:w-1/2 flex justify-center items-center order-1 md:order-2 mb-4 md:mb-0">
                    <div className="w-12 h-12 bg-white rounded-full border-4 border-tecentrix-blue flex items-center justify-center">
                      <span className="text-lg font-bold text-tecentrix-blue">1</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 flex justify-center items-center mb-4 md:mb-0">
                    <div className="w-12 h-12 bg-white rounded-full border-4 border-tecentrix-orange flex items-center justify-center">
                      <span className="text-lg font-bold text-tecentrix-orange">2</span>
                    </div>
                  </div>
                  <div className="md:w-1/2 md:pl-12">
                    <h3 className="text-xl font-semibold text-tecentrix-blue mb-2">Step 2: RHCE Certification</h3>
                    <p className="text-tecentrix-darkgray/80 mb-3">
                      Advance to Red Hat Certified Engineer (RHCE) to master advanced system administration and Ansible automation.
                    </p>
                    <Badge className="bg-orange-100 text-tecentrix-orange hover:bg-orange-200">Advanced Level</Badge>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-12 text-right order-2 md:order-1">
                    <h3 className="text-xl font-semibold text-tecentrix-blue mb-2">Step 3: Specialization Courses</h3>
                    <p className="text-tecentrix-darkgray/80 mb-3">
                      Choose a specialization path in Security, Cloud, or Infrastructure to become an expert in your field.
                    </p>
                    <Badge className="bg-green-100 text-green-600 hover:bg-green-200">Specialization</Badge>
                  </div>
                  <div className="md:w-1/2 flex justify-center items-center order-1 md:order-2 mb-4 md:mb-0">
                    <div className="w-12 h-12 bg-white rounded-full border-4 border-green-600 flex items-center justify-center">
                      <span className="text-lg font-bold text-green-600">3</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 flex justify-center items-center mb-4 md:mb-0">
                    <div className="w-12 h-12 bg-white rounded-full border-4 border-purple-600 flex items-center justify-center">
                      <span className="text-lg font-bold text-purple-600">4</span>
                    </div>
                  </div>
                  <div className="md:w-1/2 md:pl-12">
                    <h3 className="text-xl font-semibold text-tecentrix-blue mb-2">Step 4: Professional Mastery</h3>
                    <p className="text-tecentrix-darkgray/80 mb-3">
                      Complete advanced coursework and gain practical experience through our mentorship and placement programs.
                    </p>
                    <Badge className="bg-purple-100 text-purple-600 hover:bg-purple-200">Expert Level</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-tecentrix-blue/10 to-tecentrix-orange/10 rounded-xl p-8 md:p-12 shadow-lg reveal">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <span className="inline-block px-4 py-1 bg-tecentrix-orange/20 text-tecentrix-orange text-sm font-medium rounded-full mb-4">Limited Time Offer</span>
                  <h2 className="text-2xl md:text-3xl font-bold text-tecentrix-blue mb-4">
                    Not Sure Which Course is Right for You?
                  </h2>
                  <p className="text-tecentrix-darkgray/80 mb-6">
                    Book a free consultation with our education advisors for personalized course recommendations based on your career goals and experience.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button 
                      className="tecentrix-primary-button"
                      onClick={() => navigate('/contact')}
                    >
                      Get Free Consultation
                    </Button>
                    <Button 
                      variant="outline"
                      className="border-tecentrix-blue text-tecentrix-blue hover:bg-tecentrix-blue/10"
                      onClick={() => navigate('/courses/1')}
                    >
                      Explore RHCSA Course
                    </Button>
                  </div>
                </div>
                <div className="hidden md:block">
                  <img 
                    src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                    alt="Education advisors" 
                    className="rounded-lg shadow-md"
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
