
import React, { useEffect } from 'react';
import { Terminal, Server, Code, BookOpen, Shield, Network, Users, Video, Award, Clock } from 'lucide-react';

const features = [
  {
    icon: <Terminal className="h-8 w-8" />,
    title: "Hands-on Lab Sessions",
    description: "Get practical experience with 70% hands-on training in our state-of-the-art lab environment that simulates real-world scenarios."
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Expert Instructors",
    description: "Learn from Red Hat certified trainers with 15+ years of industry experience in enterprise Linux environments."
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Exam Preparation",
    description: "Comprehensive practice tests and exam simulations with a 95% first-attempt pass rate for our RHCSA and RHCE students."
  },
  {
    icon: <Video className="h-8 w-8" />,
    title: "Recorded Sessions",
    description: "Lifetime access to class recordings and lab environments to practice and review concepts at your own pace."
  },
  {
    icon: <Award className="h-8 w-8" />,
    title: "Certification Support",
    description: "Complete guidance for exam registration, documentation, and post-training support until you achieve certification."
  },
  {
    icon: <Clock className="h-8 w-8" />,
    title: "Flexible Schedule",
    description: "Weekend batches, evening classes, and self-paced options to accommodate working professionals and students."
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
          <h2 className="text-sm font-semibold text-tecentrix-orange uppercase tracking-wide reveal">Why Choose Us</h2>
          <h3 className="mt-2 text-3xl md:text-4xl font-bold text-tecentrix-blue reveal">
            The Tecentrix Training Advantage
          </h3>
          <p className="mt-4 text-lg text-tecentrix-darkgray/80 reveal">
            Our training methodology combines theoretical concepts with extensive hands-on practice, ensuring you're job-ready upon completion.
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
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-white rounded-xl shadow-sm p-8 reveal">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-2xl font-bold text-tecentrix-blue mb-4">Your Path to Success</h4>
              <p className="text-tecentrix-darkgray/80 mb-6">
                Our training methodology has helped over 3000 professionals achieve certification and advance their careers in Linux administration and DevOps roles.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-tecentrix-orange mr-2 mt-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-tecentrix-darkgray/80">95% certification success rate on first attempt</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-tecentrix-orange mr-2 mt-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-tecentrix-darkgray/80">Dedicated placement assistance with 500+ hiring partners</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-tecentrix-orange mr-2 mt-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-tecentrix-darkgray/80">Ongoing mentorship from industry professionals</span>
                </li>
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-tecentrix-gray rounded-lg p-5 text-center">
                <div className="text-3xl font-bold text-tecentrix-orange mb-2">3000+</div>
                <div className="text-sm text-tecentrix-darkgray">Certified Alumni</div>
              </div>
              <div className="bg-tecentrix-gray rounded-lg p-5 text-center">
                <div className="text-3xl font-bold text-tecentrix-orange mb-2">95%</div>
                <div className="text-sm text-tecentrix-darkgray">Placement Rate</div>
              </div>
              <div className="bg-tecentrix-gray rounded-lg p-5 text-center">
                <div className="text-3xl font-bold text-tecentrix-orange mb-2">15+</div>
                <div className="text-sm text-tecentrix-darkgray">Years Experience</div>
              </div>
              <div className="bg-tecentrix-gray rounded-lg p-5 text-center">
                <div className="text-3xl font-bold text-tecentrix-orange mb-2">500+</div>
                <div className="text-sm text-tecentrix-darkgray">Hiring Partners</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
