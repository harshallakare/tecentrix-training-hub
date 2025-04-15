
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { TeamMember } from '@/store/teamStore';

interface TeamMemberFormProps {
  member?: TeamMember;
  onSubmit: (member: Omit<TeamMember, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  onCancel: () => void;
}

const TeamMemberForm: React.FC<TeamMemberFormProps> = ({ member, onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [bio, setBio] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (member) {
      setName(member.name);
      setRole(member.role);
      setBio(member.bio);
      setImageUrl(member.image_url);
    }
  }, [member]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!name.trim() || !role.trim() || !bio.trim() || !imageUrl.trim()) {
      toast({
        title: "Validation error",
        description: "All fields are required",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await onSubmit({
        name,
        role,
        bio,
        image_url: imageUrl
      });
      
      // Reset form if it's an add operation (no initial member)
      if (!member) {
        setName('');
        setRole('');
        setBio('');
        setImageUrl('');
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Failed to save team member",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter full name"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="role">Role</Label>
        <Input
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Enter position/role"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="bio">Biography</Label>
        <Textarea
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Enter a brief biography"
          rows={4}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="imageUrl">Image URL</Label>
        <Input
          id="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Enter image URL"
          required
        />
        {imageUrl && (
          <div className="mt-2">
            <p className="text-sm text-gray-500 mb-1">Preview:</p>
            <img 
              src={imageUrl} 
              alt="Preview" 
              className="w-16 h-16 object-cover rounded-full"
              onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                e.currentTarget.src = "https://via.placeholder.com/150?text=Invalid+URL";
              }}
            />
          </div>
        )}
      </div>
      
      <div className="flex justify-end space-x-2 pt-2">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button 
          type="submit"
          disabled={isSubmitting}
          className="bg-tecentrix-blue hover:bg-tecentrix-blue/90"
        >
          {isSubmitting ? 'Saving...' : member ? 'Update' : 'Add'}
        </Button>
      </div>
    </form>
  );
};

export default TeamMemberForm;
