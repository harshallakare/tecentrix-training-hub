
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { useNavigationStore } from '@/store/navigationStore';
import { List, Plus, Trash2, MoveUp, MoveDown, Save } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

const NavigationManager = () => {
  const { toast } = useToast();
  const { navItems, updateNavItems } = useNavigationStore();
  const [items, setItems] = useState(navItems);

  const handleAddItem = () => {
    const newItem = {
      id: uuidv4(),
      label: '',
      path: '',
      enabled: true,
      isNew: true
    };
    setItems([...items, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[index - 1];
    newItems[index - 1] = temp;
    setItems(newItems);
  };

  const handleMoveDown = (index: number) => {
    if (index === items.length - 1) return;
    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[index + 1];
    newItems[index + 1] = temp;
    setItems(newItems);
  };

  const handleItemChange = (id: string, field: string, value: string | boolean) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleSave = () => {
    // Validate all fields
    const invalidItems = items.filter(item => !item.label || !item.path);
    if (invalidItems.length > 0) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "All navigation items must have both a label and a path."
      });
      return;
    }

    // Save to store
    updateNavItems(items.map(item => ({
      id: item.id,
      label: item.label,
      path: item.path,
      enabled: item.enabled
    })));

    toast({
      title: "Navigation Updated",
      description: "Your navigation menu has been updated successfully."
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Navigation Manager</CardTitle>
        <CardDescription>
          Manage the navigation menu items displayed in the header
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              No navigation items. Add one below.
            </div>
          ) : (
            items.map((item, index) => (
              <div key={item.id} className="space-y-3 p-4 border rounded-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <List className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">{item.label || 'New Menu Item'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleMoveUp(index)}
                      disabled={index === 0}
                    >
                      <MoveUp className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleMoveDown(index)}
                      disabled={index === items.length - 1}
                    >
                      <MoveDown className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1">
                    <Label htmlFor={`label-${item.id}`}>Label</Label>
                    <Input
                      id={`label-${item.id}`}
                      value={item.label}
                      onChange={(e) => handleItemChange(item.id, 'label', e.target.value)}
                      placeholder="Home"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor={`path-${item.id}`}>Path</Label>
                    <Input
                      id={`path-${item.id}`}
                      value={item.path}
                      onChange={(e) => handleItemChange(item.id, 'path', e.target.value)}
                      placeholder="/home"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id={`enabled-${item.id}`}
                    checked={item.enabled}
                    onCheckedChange={(checked) => handleItemChange(item.id, 'enabled', checked)}
                  />
                  <Label htmlFor={`enabled-${item.id}`}>Enabled</Label>
                </div>
              </div>
            ))
          )}

          <Button variant="outline" type="button" onClick={handleAddItem} className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add Menu Item
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave} className="ml-auto">
          <Save className="mr-2 h-4 w-4" />
          Save Navigation
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NavigationManager;
