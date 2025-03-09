
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Server, Shield, Network, Terminal } from 'lucide-react';

const courses = [
  {
    icon: <Terminal className="h-6 w-6" />,
    title: "Linux Fundamentals",
    level: "Beginner",
    duration: "6 Weeks",
    description: "Master the essentials of Linux operating systems, file systems, command line tools, and basic administration tasks.",
    modules: ["Introduction to Linux", "File System Navigation", "User Management", "Package Management", "Basic Networking"],
    highlighted: false,
    color: "bg-blue-50",
    iconBg: "bg-blue-100",
    iconColor: "text-tecentrix-blue"
  },
  {
    icon: <Server className="h-6 w-6" />,
    title: "Advanced Server Administration",
    level: "Intermediate",
    duration: "8 Weeks",
    description: "Deep dive into server management, service configuration, performance tuning, and troubleshooting techniques.",
    modules: ["Server Deployment", "Service Configuration", "Performance Optimization", "Backup & Recovery", "Virtualization"],
    highlighted: true,
    color: "bg-orange-50",
    iconBg: "bg-orange-100",
    iconColor: "text-tecentrix-orange"
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Linux Security Specialist",
    level: "Advanced",
    duration: "10 Weeks",
    description: "Implement robust security measures, encryption, threat detection, vulnerability scanning, and compliance protocols.",
    modules: ["Security Fundamentals", "Encryption", "Firewall Configuration", "Intrusion Detection", "Security Auditing"],
    highlighted: false,
    color: "bg-green-50",
    iconBg: "bg-green-100",
    iconColor: "text-green-600"
  },
  {
    icon: <Network className="h-6 w-6" />,
    title: "Linux Network Engineering",
    level: "Advanced",
    duration: "8 Weeks",
    description: "Configure and manage advanced networking services, routing, VPNs, load balancing, and network monitoring.",
    modules: ["Network Architecture", "DNS & DHCP", "VPN Implementation", "Load Balancing", "Network Monitoring"],
    highlighted: false,
    color: "bg-purple-50",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600"
  }
];

const Courses = () => {
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

  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-semibold text-tecentrix-orange uppercase tracking-wide reveal">Courses</h2>
          <h3 className="mt-2 text-3xl md:text-4xl font-bold text-tecentrix-blue reveal">
            Expert-Led Linux Training Programs
          </h3>
          <p className="mt-4 text-lg text-tecentrix-darkgray/80 reveal">
            Comprehensive courses designed to build practical skills for real-world Linux environments.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {courses.map((course, index) => (
            <div 
              key={index}
              className={`scale-reveal rounded-xl overflow-hidden transition-all duration-300 ${course.highlighted ? 'ring-2 ring-tecentrix-orange shadow-lg' : 'border border-gray-200 shadow-sm hover:shadow-md'}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`${course.color} p-8`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <div className={`${course.iconBg} p-3 rounded-lg ${course.iconColor}`}>
                      {course.icon}
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
                      Popular
                    </div>
                  )}
                </div>
                
                <p className="mt-4 text-tecentrix-darkgray/80">
                  {course.description}
                </p>
                
                <div className="mt-5">
                  <h5 className="text-sm font-semibold text-tecentrix-blue mb-3">Key Modules:</h5>
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
                
                <div className="mt-6 flex space-x-3">
                  {course.highlighted ? (
                    <Button className="tecentrix-secondary-button w-full">Enroll Now</Button>
                  ) : (
                    <Button className="tecentrix-primary-button w-full">Learn More</Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center reveal">
          <Button className="tecentrix-outline-button">
            View All Courses
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Courses;
