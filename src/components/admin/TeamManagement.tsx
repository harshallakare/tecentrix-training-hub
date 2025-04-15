
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Plus, Edit, Trash, User } from 'lucide-react';
import TeamMemberForm from './TeamMemberForm';
import { useTeamStore, TeamMember } from '@/store/teamStore';

const TeamManagement: React.FC = () => {
  const { teamMembers, fetchTeamMembers, addTeamMember, updateTeamMember, deleteTeamMember, isLoading } = useTeamStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentMember, setCurrentMember] = useState<TeamMember | undefined>(undefined);
  
  useEffect(() => {
    fetchTeamMembers();
  }, [fetchTeamMembers]);
  
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
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-tecentrix-blue">Leadership Team Management</h2>
        <Button onClick={handleAddMember} className="bg-tecentrix-blue hover:bg-tecentrix-blue/90">
          <Plus className="h-4 w-4 mr-2" />
          Add Team Member
        </Button>
      </div>
      
      {isLoading && teamMembers.length === 0 ? (
        <div className="text-center py-8">
          <div className="animate-spin w-8 h-8 border-4 border-tecentrix-blue/20 border-t-tecentrix-blue rounded-full mx-auto mb-4"></div>
          <p className="text-tecentrix-darkgray/80">Loading team members...</p>
        </div>
      ) : teamMembers.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <User size={48} className="text-tecentrix-darkgray/40 mb-4" />
            <p className="text-tecentrix-darkgray/80 mb-4">No team members found</p>
            <Button onClick={handleAddMember} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Team Member
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {teamMembers.map((member) => (
            <Card key={member.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3">
                    <img 
                      src={member.image_url} 
                      alt={member.name} 
                      className="w-full h-full object-cover aspect-square"
                      onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                        e.currentTarget.src = "https://via.placeholder.com/150?text=No+Image";
                      }}
                    />
                  </div>
                  <div className="p-6 md:w-2/3">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-tecentrix-blue">{member.name}</h3>
                        <p className="text-tecentrix-orange font-medium mb-2">{member.role}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleEditMember(member)}
                          className="h-8 w-8 text-tecentrix-blue hover:text-tecentrix-blue/80 hover:bg-gray-100"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDeleteClick(member)}
                          className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-tecentrix-darkgray/80 mt-2 line-clamp-4">{member.bio}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
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

export default TeamManagement;
