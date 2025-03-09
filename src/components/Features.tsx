
import React, { useEffect } from 'react';
import { Terminal, Server, Code, BookOpen, Shield, Network } from 'lucide-react';

const features = [
  {
    icon: <Terminal className="h-8 w-8" />,
    title: "Command Line Mastery",
    description: "Learn to navigate and control Linux systems efficiently using powerful terminal commands and scripting techniques."
  },
  {
    icon: <Server className="h-8 w-8" />,
    title: "Server Management",
    description: "Master deployment, configuration, and maintenance of Linux servers for optimal performance and reliability."
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Security Hardening",
    description: "Implement robust security measures to protect systems from threats and vulnerabilities with industry best practices."
  },
  {
    icon: <Network className="h-8 w-8" />,
    title: "Networking Excellence",
    description: "Configure and troubleshoot network services and infrastructure in Linux environments with expert precision."
  },
  {
    icon: <Code className="h-8 w-8" />,
    title: "Shell Scripting",
    description: "Automate tasks and streamline operations through powerful shell scripting and process management techniques."
  },
  {
    icon: <BookOpen className="h-8 w-8" />,
    title: "Certification Preparation",
    description: "Comprehensive training aligned with industry certifications including RHCE, LPIC, and CompTIA Linux+."
  }
];

const Features = () => {
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
    <section className="section-padding bg-tecentrix-gray">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-semibold text-tecentrix-orange uppercase tracking-wide reveal">Features</h2>
          <h3 className="mt-2 text-3xl md:text-4xl font-bold text-tecentrix-blue reveal">
            Why Choose Our Linux Training
          </h3>
          <p className="mt-4 text-lg text-tecentrix-darkgray/80 reveal">
            Our comprehensive programs offer practical, hands-on training designed to build real-world Linux administration skills.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`scale-reveal bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex flex-col h-full`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-5 text-tecentrix-orange">
                {feature.icon}
              </div>
              <h4 className="text-xl font-semibold text-tecentrix-blue mb-3">{feature.title}</h4>
              <p className="text-tecentrix-darkgray/80 flex-grow">{feature.description}</p>
              <div className="mt-6 flex items-center text-tecentrix-blue font-medium">
                <span>Learn more</span>
                <svg 
                  className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
