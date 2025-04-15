import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Award, 
  BookOpen, 
  Users, 
  Globe, 
  GraduationCap, 
  Heart,
  Rocket,
  BarChart,
  Hand,
  Star,
  Edit,
  Trash,
  Plus
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useSettingsStore } from '@/store/settingsStore';
import { useTeamStore, TeamMember } from '@/store/teamStore';
import TeamMemberForm from '@/components/admin/TeamMemberForm';

const About = () => {
  const navigate = useNavigate();
  const { settings } = useSettingsStore();
  const { teamMembers, fetchTeamMembers, addTeamMember, updateTeamMember, deleteTeamMember, isLoading } = useTeamStore();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentMember, setCurrentMember] = useState<TeamMember | undefined>(undefined);

  useEffect(() => {
    fetchTeamMembers();
  }, [fetchTeamMembers]);

  // Check if current user is admin
  useEffect(() => {
    const pathArray = window.location.pathname.split('/');
    const isAdminPage = pathArray.some(segment => segment === 'admin');
    setIsAdmin(isAdminPage);
  }, []);

  // Add animation effect on scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains('reveal')) {
            entry.target.classList.add('reveal-visible');
          } else if (entry.target.classList.contains('reveal-left')) {
            entry.target.classList.add('reveal-left-visible');
          } else if (entry.target.classList.contains('reveal-right')) {
            entry.target.classList.add('reveal-right-visible');
          } else if (entry.target.classList.contains('scale-reveal')) {
            entry.target.classList.add('scale-reveal-visible');
          }
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .scale-reveal').forEach(el => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleAddMember = () => {
    setCurrentMember(undefined);
    setIsFormOpen(true);
  };
  
  const handleEditMember = (member: TeamMember) => {
    setCurrentMember(member);
    setIsFormOpen(true);
  };
  
  const handleDeleteClick = (member: TeamMember) => {
    setCurrentMember(member);
    setIsDeleteDialogOpen(true);
  };
  
  const handleDeleteConfirm = async () => {
    if (currentMember) {
      await deleteTeamMember(currentMember.id);
      setIsDeleteDialogOpen(false);
    }
  };
  
  const handleFormSubmit = async (memberData: Omit<TeamMember, 'id' | 'created_at' | 'updated_at'>) => {
    if (currentMember) {
      await updateTeamMember(currentMember.id, memberData);
    } else {
      await addTeamMember(memberData);
    }
    setIsFormOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-tecentrix-gray py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 reveal-left">
                <Badge variant="blue" className="mb-4">About Us</Badge>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-tecentrix-blue mb-6">
                  Empowering the Next Generation of Tech Leaders
                </h1>
                <p className="text-lg text-tecentrix-darkgray/80 mb-8">
                  Founded in 2018, Tecentrix has been at the forefront of technology education, 
                  empowering individuals and organizations with the skills needed to thrive in 
                  the digital era. Our mission is to make high-quality tech education accessible, 
                  engaging, and transformative.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button 
                    className="bg-tecentrix-blue hover:bg-tecentrix-blue/90 text-white"
                    onClick={() => navigate('/courses')}
                  >
                    Explore Our Courses
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-tecentrix-blue text-tecentrix-blue hover:bg-tecentrix-blue/10"
                    onClick={() => navigate('/contact')}
                  >
                    Contact Us
                  </Button>
                </div>
              </div>
              <div className="order-1 lg:order-2 reveal-right">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                  alt="Team members working together" 
                  className="rounded-xl shadow-lg w-full object-cover h-[400px]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: "120+", label: "Courses" },
                { value: "50,000+", label: "Students" },
                { value: "98%", label: "Satisfaction Rate" },
                { value: "250+", label: "Industry Partners" }
              ].map((stat, index) => (
                <div key={index} className="reveal" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="text-3xl md:text-4xl font-bold text-tecentrix-blue mb-2">{stat.value}</div>
                  <div className="text-tecentrix-darkgray/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Vision Section */}
        <section className="py-16 bg-tecentrix-gray section-padding">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="reveal-left">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                  alt="Team collaboration" 
                  className="rounded-xl shadow-lg w-full object-cover h-[400px]"
                />
              </div>
              <div className="reveal-right">
                <Badge variant="blue" className="mb-4">Our Vision</Badge>
                <h2 className="text-3xl font-bold text-tecentrix-blue mb-6">Creating the Future of Tech Education</h2>
                <div className="prose prose-lg max-w-none text-tecentrix-darkgray/80">
                  <p>
                    At Tecentrix, we envision a world where quality technology education is accessible to everyone, 
                    regardless of their background, location, or prior experience. We're committed to breaking down 
                    barriers and democratizing access to the skills that power the digital economy.
                  </p>
                  <p className="mt-4">
                    Our approach combines cutting-edge curriculum, industry-experienced instructors, and an 
                    innovative learning platform to create transformative educational experiences. We don't just teach 
                    technology—we inspire our students to become creators, innovators, and leaders in the digital age.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 bg-white section-padding">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 reveal-left">
                <Badge variant="orange" className="mb-4">Our Journey</Badge>
                <h3 className="text-3xl font-bold text-tecentrix-blue mb-6">Our Story</h3>
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
              <div className="order-1 lg:order-2 reveal-right">
                <img 
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                  alt="Person using laptop" 
                  className="rounded-xl shadow-lg w-full object-cover h-[400px]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-tecentrix-gray section-padding">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12 reveal">
              <Badge variant="blue" className="mb-4">What Drives Us</Badge>
              <h3 className="text-3xl font-bold text-tecentrix-blue">Our Core Values</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <BookOpen className="h-10 w-10 text-tecentrix-blue" />,
                  title: "Continuous Learning",
                  description: "We practice what we teach. Our team is constantly learning, adapting, and evolving to stay ahead of technological trends."
                },
                {
                  icon: <Users className="h-10 w-10 text-tecentrix-blue" />,
                  title: "Community Focus",
                  description: "We believe in the power of community to accelerate learning and foster innovation through collaboration."
                },
                {
                  icon: <Award className="h-10 w-10 text-tecentrix-blue" />,
                  title: "Excellence",
                  description: "We hold ourselves to the highest standards in course development, instruction, and student support."
                },
                {
                  icon: <Globe className="h-10 w-10 text-tecentrix-blue" />,
                  title: "Accessibility",
                  description: "We strive to make quality education accessible to everyone, regardless of geographic or socioeconomic barriers."
                },
                {
                  icon: <GraduationCap className="h-10 w-10 text-tecentrix-blue" />,
                  title: "Practical Education",
                  description: "We focus on practical, applicable skills that directly translate to workplace competencies and career advancement."
                },
                {
                  icon: <Heart className="h-10 w-10 text-tecentrix-blue" />,
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
              <Badge variant="orange" className="mb-4">Our People</Badge>
              <h3 className="text-3xl font-bold text-tecentrix-blue">Leadership Team</h3>
              <p className="mt-4 text-lg text-tecentrix-darkgray/80">
                Our diverse team of experts brings together decades of industry and educational experience.
              </p>
              
              {settings.isAdmin !== undefined && settings.isAdmin && (
                <Button 
                  onClick={handleAddMember} 
                  className="mt-4 bg-tecentrix-blue hover:bg-tecentrix-blue/90"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Team Member
                </Button>
              )}
            </div>
            
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin w-8 h-8 border-4 border-tecentrix-blue/20 border-t-tecentrix-blue rounded-full mx-auto mb-4"></div>
                <p className="text-tecentrix-darkgray/80">Loading team members...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {teamMembers.map((member, index) => (
                  <Card key={member.id} className="scale-reveal overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="aspect-w-1 aspect-h-1 relative">
                      <img 
                        src={member.image_url} 
                        alt={member.name} 
                        className="object-cover w-full h-64"
                        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                          e.currentTarget.src = "https://via.placeholder.com/150?text=No+Image";
                        }}
                      />
                      {settings.isAdmin !== undefined && settings.isAdmin && (
                        <div className="absolute top-2 right-2 flex space-x-1">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={() => handleEditMember(member)}
                            className="h-8 w-8 bg-white/90 hover:bg-white text-tecentrix-blue hover:text-tecentrix-blue/80 border-none"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={() => handleDeleteClick(member)}
                            className="h-8 w-8 bg-white/90 hover:bg-white text-red-500 hover:text-red-600 border-none"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-6">
                      <h4 className="text-xl font-semibold text-tecentrix-blue">{member.name}</h4>
                      <p className="text-tecentrix-orange font-medium mb-2">{member.role}</p>
                      <p className="text-tecentrix-darkgray/80">{member.bio}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-tecentrix-blue section-padding">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center reveal">
              <h2 className="text-3xl font-bold text-white mb-6">Ready to Start Your Tech Journey?</h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of students who are already transforming their careers with Tecentrix. 
                Our industry-focused curriculum and expert instructors will help you reach your goals.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  className="bg-white text-tecentrix-blue hover:bg-white/90"
                  onClick={() => navigate('/courses')}
                >
                  Browse Courses
                </Button>
                <Button 
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                  onClick={() => navigate('/contact')}
                >
                  Contact Our Team
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Team Member Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{currentMember ? 'Edit Team Member' : 'Add Team Member'}</DialogTitle>
            <DialogDescription>
              {currentMember 
                ? 'Update the team member information below.' 
                : 'Fill in the details to add a new team member.'}
            </DialogDescription>
          </DialogHeader>
          <TeamMemberForm
            member={currentMember}
            onSubmit={handleFormSubmit}
            onCancel={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the team member "{currentMember?.name}". 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default About;
