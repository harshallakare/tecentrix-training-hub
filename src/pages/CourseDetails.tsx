import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Server, Shield, Network, Terminal, Cloud, Database, 
  Clock, BarChart, User, Calendar, Award, CheckCircle2, Languages } from 'lucide-react';
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

const CourseDetails = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { coursesList, refreshContent } = useContentSync(true);
  const [course, setCourse] = useState<any>(null);
  
  useEffect(() => {
    refreshContent();
    
    if (courseId && coursesList.length > 0) {
      const foundCourse = coursesList.find(c => c.id === courseId);
      
      if (foundCourse) {
        setCourse(foundCourse);
        document.title = `${foundCourse.title} | Tecentrix Courses`;
      } else {
        console.error(`Course ${courseId} not found in ${coursesList.length} courses`);
        toast.error("Course not found", {
          description: "The course you're looking for doesn't exist or has been removed."
        });
        navigate('/courses');
      }
    }
  }, [courseId, coursesList, navigate]);
  
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
  
  if (!course) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-pulse mb-4">
              <div className="h-12 w-48 bg-gray-200 rounded mx-auto"></div>
            </div>
            <p className="text-gray-500">Loading course details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  const getIconComponent = (iconName: string) => {
    return iconMap[iconName as keyof typeof iconMap] || <Terminal className="h-6 w-6" />;
  };
  
  const handleEnroll = () => {
    const paymentLink = course?.paymentLink || "https://rzp.io/l/tecentrix-course";
    window.open(paymentLink, '_blank');
    toast.info("Redirecting to secure payment page", {
      description: "You'll be taken to our payment partner to complete your enrollment."
    });
  };

  const renderBatchDates = () => {
    if (!course.upcomingBatches || course.upcomingBatches.length === 0) return null;
    
    return (
      <div className="mb-4 flex items-center bg-white/80 rounded-lg px-4 py-2 inline-block">
        <Calendar className="h-5 w-5 text-tecentrix-orange mr-2" />
        <span className="font-medium">
          {course.upcomingBatches.length === 1 
            ? `Next Batch: ${course.upcomingBatches[0]}`
            : `Next Batches: ${course.upcomingBatches.slice(0, 2).join(', ')}${course.upcomingBatches.length > 2 ? '...' : ''}`
          }
        </span>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <section className={`${course.color} py-16 md:py-24`}>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="reveal-left">
                <div className="flex items-center mb-4">
                  <div className={`${course.iconBg} p-3 rounded-lg ${course.iconColor}`}>
                    {getIconComponent(course.icon)}
                  </div>
                  <div className="ml-4">
                    <div className="flex items-center">
                      <span className="text-sm text-tecentrix-darkgray/70">{course.level}</span>
                      <span className="text-sm text-tecentrix-darkgray/70 mx-2">•</span>
                      <span className="text-sm text-tecentrix-darkgray/70">{course.duration}</span>
                    </div>
                  </div>
                </div>
                
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-tecentrix-blue mb-6">
                  {course.title}
                </h1>
                <p className="text-lg text-tecentrix-darkgray/80 mb-6">
                  {course.description}
                </p>
                
                {renderBatchDates()}
                
                {course.highlighted && (
                  <div className="mb-6 inline-block">
                    <div className="bg-tecentrix-orange text-white text-sm font-semibold px-4 py-2 rounded-full">
                      Best Seller
                    </div>
                  </div>
                )}
                
                <div className="flex flex-wrap items-center gap-4">
                  <div className="text-2xl font-bold text-tecentrix-blue">{course.price}</div>
                  <Button 
                    className={course.highlighted ? "tecentrix-secondary-button" : "tecentrix-primary-button"}
                    onClick={handleEnroll}
                  >
                    Enroll Now
                  </Button>
                </div>
              </div>
              <div className="reveal-right">
                <img 
                  src={`https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80`} 
                  alt={course.title} 
                  className="rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 reveal-left">
                <h2 className="text-2xl font-bold text-tecentrix-blue mb-6">Course Overview</h2>
                <div className="prose prose-lg max-w-none text-tecentrix-darkgray/80">
                  <p>
                    This comprehensive {course.title} course is designed to provide you with both theoretical knowledge and practical skills that are directly applicable in real-world scenarios. Whether you're looking to start a new career or enhance your existing skillset, this course offers a structured learning path to help you achieve your goals.
                  </p>
                  <p className="mt-4">
                    Throughout the course, you'll work on hands-on projects and real-world case studies that will help you build a portfolio to showcase your new skills. Our instructor-led approach ensures that you receive guidance and support throughout your learning journey.
                  </p>
                </div>
                
                <h3 className="text-xl font-bold text-tecentrix-blue mt-8 mb-4">What You'll Learn</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {course.modules.map((module, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-2 shrink-0" />
                      <span className="text-tecentrix-darkgray/80">{module}</span>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-8" />
                
                <h3 className="text-xl font-bold text-tecentrix-blue mb-4">Course Curriculum</h3>
                <div className="space-y-4">
                  {[
                    {
                      title: "Module 1: Fundamentals",
                      lessons: [
                        "Introduction to core concepts",
                        "Setting up your development environment",
                        "Understanding key terminology",
                        "Best practices and industry standards"
                      ]
                    },
                    {
                      title: "Module 2: Building Your Foundation",
                      lessons: [
                        "In-depth exploration of core technologies",
                        "Practical application of fundamental concepts",
                        "Troubleshooting common issues",
                        "Building your first project"
                      ]
                    },
                    {
                      title: "Module 3: Advanced Concepts",
                      lessons: [
                        "Advanced techniques and methodologies",
                        "Integration with other systems",
                        "Performance optimization",
                        "Security considerations"
                      ]
                    },
                    {
                      title: "Module 4: Real-world Applications",
                      lessons: [
                        "Case studies and real-world scenarios",
                        "Building a comprehensive final project",
                        "Deployment and maintenance",
                        "Future trends and continuing education"
                      ]
                    }
                  ].map((module, index) => (
                    <Card key={index} className="border-none shadow-sm hover:shadow-md transition-all duration-300">
                      <CardContent className="p-6">
                        <h4 className="text-lg font-semibold text-tecentrix-blue mb-3">{module.title}</h4>
                        <ul className="space-y-2">
                          {module.lessons.map((lesson, i) => (
                            <li key={i} className="flex items-start">
                              <svg className="h-5 w-5 text-tecentrix-orange mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                              <span className="text-sm text-tecentrix-darkgray/80">{lesson}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              <div className="reveal-right">
                <div className="sticky top-8">
                  <Card className="border-none shadow-lg">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-tecentrix-blue mb-4">Course Details</h3>
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <Clock className="h-5 w-5 text-tecentrix-orange mr-3" />
                          <div>
                            <p className="text-sm text-tecentrix-darkgray/70">Duration</p>
                            <p className="font-medium">{course.duration}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <BarChart className="h-5 w-5 text-tecentrix-orange mr-3" />
                          <div>
                            <p className="text-sm text-tecentrix-darkgray/70">Level</p>
                            <p className="font-medium">{course.level}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <User className="h-5 w-5 text-tecentrix-orange mr-3" />
                          <div>
                            <p className="text-sm text-tecentrix-darkgray/70">Instructor</p>
                            <p className="font-medium">Expert Instructor</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 text-tecentrix-orange mr-3" />
                          <div>
                            <p className="text-sm text-tecentrix-darkgray/70">Start Date</p>
                            <p className="font-medium">
                              {course.upcomingBatches && course.upcomingBatches.length > 0
                                ? course.upcomingBatches[0]
                                : "Flexible / Self-paced"}
                            </p>
                          </div>
                        </div>
                        {course.language && (
                          <div className="flex items-center">
                            <Languages className="h-5 w-5 text-tecentrix-orange mr-3" />
                            <div>
                              <p className="text-sm text-tecentrix-darkgray/70">Language</p>
                              <p className="font-medium">{course.language}</p>
                            </div>
                          </div>
                        )}
                        <div className="flex items-center">
                          <Award className="h-5 w-5 text-tecentrix-orange mr-3" />
                          <div>
                            <p className="text-sm text-tecentrix-darkgray/70">Certificate</p>
                            <p className="font-medium">Yes, upon completion</p>
                          </div>
                        </div>
                      </div>
                      
                      <Separator className="my-6" />
                      
                      <Button 
                        className="w-full tecentrix-primary-button"
                        onClick={handleEnroll}
                      >
                        Enroll Now
                      </Button>
                      
                      <p className="text-xs text-center text-tecentrix-darkgray/60 mt-4">
                        30-day money-back guarantee if you're not satisfied
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-tecentrix-gray">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12 reveal">
              <h2 className="text-sm font-semibold text-tecentrix-orange uppercase tracking-wide">Explore More</h2>
              <h3 className="mt-2 text-3xl font-bold text-tecentrix-blue">Related Courses</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {coursesList
                .filter(c => c.id !== course.id && c.enabled !== false)
                .slice(0, 3)
                .map((relatedCourse, index) => (
                  <div 
                    key={relatedCourse.id}
                    className="scale-reveal"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Card 
                      className={`overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg ${
                        relatedCourse.highlighted ? 'ring-2 ring-tecentrix-orange shadow-md' : 'shadow-sm'
                      }`}
                      onClick={() => navigate(`/courses/${relatedCourse.id}`)}
                    >
                      <CardContent className={`${relatedCourse.color} p-6`}>
                        <div className="flex items-center mb-4">
                          <div className={`${relatedCourse.iconBg} p-2 rounded-lg ${relatedCourse.iconColor}`}>
                            {getIconComponent(relatedCourse.icon)}
                          </div>
                          <div className="ml-3">
                            <h4 className="text-lg font-semibold text-tecentrix-blue">{relatedCourse.title}</h4>
                          </div>
                        </div>
                        
                        <p className="text-sm text-tecentrix-darkgray/80 line-clamp-2 mb-4">
                          {relatedCourse.description}
                        </p>
                        
                        <div className="flex justify-between items-center mb-2">
                          <div className="text-lg font-bold text-tecentrix-blue">{relatedCourse.price}</div>
                          <div className="flex space-x-3">
                            <span className="text-xs text-tecentrix-darkgray/70">{relatedCourse.level}</span>
                            <span className="text-xs text-tecentrix-darkgray/70">•</span>
                            <span className="text-xs text-tecentrix-darkgray/70">{relatedCourse.duration}</span>
                          </div>
                        </div>
                        
                        {relatedCourse.upcomingBatches && relatedCourse.upcomingBatches.length > 0 && (
                          <div className="flex items-center text-xs text-tecentrix-darkgray/80 mt-2">
                            <Calendar className="h-3 w-3 mr-1 text-tecentrix-blue" />
                            <span>Next Batch: {relatedCourse.upcomingBatches[0]}</span>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CourseDetails;
