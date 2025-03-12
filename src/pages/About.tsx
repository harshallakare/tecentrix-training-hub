
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AwardIcon, BookOpenIcon, UsersIcon, GlobeIcon, GraduationCapIcon, HeartIcon } from 'lucide-react';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-tecentrix-gray py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 reveal-left">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-tecentrix-blue mb-6">
                  About Tecentrix
                </h1>
                <p className="text-lg text-tecentrix-darkgray/80 mb-8">
                  Founded in 2018, Tecentrix has been at the forefront of technology education, 
                  empowering individuals and organizations with the skills needed to thrive in 
                  the digital era. Our mission is to make high-quality tech education accessible, 
                  engaging, and transformative.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button 
                    className="tecentrix-primary-button"
                    onClick={() => navigate('/courses')}
                  >
                    Explore Our Courses
                  </Button>
                  <Button 
                    className="tecentrix-outline-button"
                    onClick={() => navigate('/contact')}
                  >
                    Contact Us
                  </Button>
                </div>
              </div>
              <div className="order-1 lg:order-2 reveal-right">
                <img 
                  src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                  alt="Team members working together" 
                  className="rounded-xl shadow-lg w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 bg-white section-padding">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12 reveal">
              <h2 className="text-sm font-semibold text-tecentrix-orange uppercase tracking-wide">Our Journey</h2>
              <h3 className="mt-2 text-3xl font-bold text-tecentrix-blue">Our Story</h3>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="reveal-left">
                <div className="prose prose-lg max-w-none text-tecentrix-darkgray/80">
                  <p>
                    Tecentrix was born from a simple observation: the gap between traditional education and the rapidly evolving tech industry was growing wider. Our founders, a group of tech professionals and educators, set out to bridge this gap.
                  </p>
                  <p className="mt-4">
                    What began as a small workshop series in 2018 has grown into a comprehensive learning platform trusted by thousands of students and dozens of corporations worldwide. We've expanded from offering just a handful of courses to delivering a diverse curriculum covering everything from cybersecurity to cloud computing.
                  </p>
                  <p className="mt-4">
                    Throughout our growth, we've remained true to our core principles: practical, industry-relevant content, exceptional instructors, and personalized learning experiences. We believe that technology education should be accessible to everyone, regardless of their background or prior experience.
                  </p>
                </div>
              </div>
              <div className="reveal-right">
                <img 
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                  alt="Person using laptop" 
                  className="rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-tecentrix-gray section-padding">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12 reveal">
              <h2 className="text-sm font-semibold text-tecentrix-orange uppercase tracking-wide">What Drives Us</h2>
              <h3 className="mt-2 text-3xl font-bold text-tecentrix-blue">Our Core Values</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <BookOpenIcon className="h-10 w-10 text-tecentrix-blue" />,
                  title: "Continuous Learning",
                  description: "We practice what we teach. Our team is constantly learning, adapting, and evolving to stay ahead of technological trends."
                },
                {
                  icon: <UsersIcon className="h-10 w-10 text-tecentrix-blue" />,
                  title: "Community Focus",
                  description: "We believe in the power of community to accelerate learning and foster innovation through collaboration."
                },
                {
                  icon: <AwardIcon className="h-10 w-10 text-tecentrix-blue" />,
                  title: "Excellence",
                  description: "We hold ourselves to the highest standards in course development, instruction, and student support."
                },
                {
                  icon: <GlobeIcon className="h-10 w-10 text-tecentrix-blue" />,
                  title: "Accessibility",
                  description: "We strive to make quality education accessible to everyone, regardless of geographic or socioeconomic barriers."
                },
                {
                  icon: <GraduationCapIcon className="h-10 w-10 text-tecentrix-blue" />,
                  title: "Practical Education",
                  description: "We focus on practical, applicable skills that directly translate to workplace competencies and career advancement."
                },
                {
                  icon: <HeartIcon className="h-10 w-10 text-tecentrix-blue" />,
                  title: "Student Success",
                  description: "We measure our success by the success of our students, both in their learning journey and career outcomes."
                }
              ].map((value, index) => (
                <Card key={index} className="scale-reveal border-none shadow-md hover:shadow-lg transition-all duration-300" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-6">
                    <div className="mb-4">{value.icon}</div>
                    <h4 className="text-xl font-semibold text-tecentrix-blue mb-2">{value.title}</h4>
                    <p className="text-tecentrix-darkgray/80">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-white section-padding">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12 reveal">
              <h2 className="text-sm font-semibold text-tecentrix-orange uppercase tracking-wide">Meet Our Team</h2>
              <h3 className="mt-2 text-3xl font-bold text-tecentrix-blue">Leadership Team</h3>
              <p className="mt-4 text-lg text-tecentrix-darkgray/80">
                Our diverse team of experts brings together decades of industry and educational experience.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Johnson",
                  role: "Founder & CEO",
                  bio: "Former tech executive with 15+ years in enterprise software. Passionate about transforming education through technology.",
                  image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                },
                {
                  name: "Michael Chen",
                  role: "Chief Learning Officer",
                  bio: "PhD in Computer Science with extensive experience in curriculum design and educational technology.",
                  image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                },
                {
                  name: "Priya Patel",
                  role: "VP of Engineering",
                  bio: "Former senior engineer at major tech companies. Specializes in cloud architecture and cybersecurity.",
                  image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                }
              ].map((member, index) => (
                <Card key={index} className="scale-reveal overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="aspect-w-1 aspect-h-1 relative">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="object-cover w-full h-64"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h4 className="text-xl font-semibold text-tecentrix-blue">{member.name}</h4>
                    <p className="text-tecentrix-orange font-medium mb-2">{member.role}</p>
                    <p className="text-tecentrix-darkgray/80">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
