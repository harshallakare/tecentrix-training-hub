
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, CheckCircle2, Database, RefreshCw } from 'lucide-react';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';
import { toast } from 'sonner';

const SupabaseSetup = () => {
  const [supabaseUrl, setSupabaseUrl] = useState(import.meta.env.VITE_SUPABASE_URL || '');
  const [supabaseKey, setSupabaseKey] = useState(import.meta.env.VITE_SUPABASE_ANON_KEY || '');
  const [isConfigured, setIsConfigured] = useState(isSupabaseConfigured());
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'unknown' | 'success' | 'error'>('unknown');
  const [isMigrating, setIsMigrating] = useState(false);
  
  useEffect(() => {
    // Check connection status on mount
    if (isConfigured) {
      testConnection();
    }
  }, []);
  
  const testConnection = async () => {
    setIsTestingConnection(true);
    setConnectionStatus('unknown');
    
    try {
      const { data, error } = await supabase.from('content_settings').select('id').limit(1);
      
      if (error) {
        console.error("Connection test failed:", error);
        setConnectionStatus('error');
        toast.error("Failed to connect to Supabase");
      } else {
        setConnectionStatus('success');
        toast.success("Successfully connected to Supabase");
      }
    } catch (error) {
      console.error("Connection test error:", error);
      setConnectionStatus('error');
      toast.error("Failed to connect to Supabase");
    } finally {
      setIsTestingConnection(false);
    }
  };
  
  const migrateDataToSupabase = async () => {
    setIsMigrating(true);
    
    try {
      // Get content from localStorage
      const contentStore = JSON.parse(localStorage.getItem('tecentrix-content') || '{}');
      const state = contentStore?.state;
      
      if (!state) {
        toast.error("No local data found to migrate");
        return;
      }
      
      // Migrate courses
      if (state.coursesList?.length > 0) {
        const { error: coursesError } = await supabase
          .from('courses')
          .upsert(state.coursesList);
          
        if (coursesError) {
          console.error("Error migrating courses:", coursesError);
          toast.error("Failed to migrate courses");
        } else {
          toast.success(`Migrated ${state.coursesList.length} courses`);
        }
      }
      
      // Migrate testimonials
      if (state.testimonialsList?.length > 0) {
        const { error: testimonialsError } = await supabase
          .from('testimonials')
          .upsert(state.testimonialsList);
          
        if (testimonialsError) {
          console.error("Error migrating testimonials:", testimonialsError);
          toast.error("Failed to migrate testimonials");
        } else {
          toast.success(`Migrated ${state.testimonialsList.length} testimonials`);
        }
      }
      
      // Migrate content settings
      if (state.content) {
        const { error: settingsError } = await supabase
          .from('content_settings')
          .upsert({
            id: '1',
            hero: state.content.hero,
            courses: state.content.courses,
            features: state.content.features,
            cta: state.content.cta,
          });
          
        if (settingsError) {
          console.error("Error migrating content settings:", settingsError);
          toast.error("Failed to migrate content settings");
        } else {
          toast.success("Migrated content settings");
        }
      }
      
      toast.success("Data migration completed");
    } catch (error) {
      console.error("Migration error:", error);
      toast.error("Migration failed");
    } finally {
      setIsMigrating(false);
    }
  };
  
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" /> Supabase Integration
        </CardTitle>
        <CardDescription>
          Configure your Supabase backend to store courses, testimonials, and content.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="supabaseUrl">Supabase Project URL</Label>
          <Input 
            id="supabaseUrl" 
            placeholder="https://your-project.supabase.co" 
            value={supabaseUrl}
            onChange={(e) => setSupabaseUrl(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="supabaseKey">Supabase Anon Key</Label>
          <Input 
            id="supabaseKey" 
            placeholder="your-anon-key" 
            value={supabaseKey}
            onChange={(e) => setSupabaseKey(e.target.value)}
            type="password"
          />
          <p className="text-xs text-gray-500">
            You can find these credentials in your Supabase project dashboard under Project Settings &gt; API.
          </p>
        </div>
        
        {connectionStatus === 'success' && (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertTitle>Connected</AlertTitle>
            <AlertDescription>
              Successfully connected to your Supabase project.
            </AlertDescription>
          </Alert>
        )}
        
        {connectionStatus === 'error' && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Connection Failed</AlertTitle>
            <AlertDescription>
              Could not connect to Supabase. Please check your credentials and try again.
            </AlertDescription>
          </Alert>
        )}
        
        <div className="bg-amber-50 border border-amber-200 rounded-md p-4 text-sm">
          <h4 className="font-medium text-amber-800">Important: Set Up Database Tables</h4>
          <p className="mt-2 text-amber-700">
            Make sure to create these tables in your Supabase project:
          </p>
          <ul className="list-disc list-inside mt-2 text-amber-700 space-y-1">
            <li><code>courses</code> - For storing course information</li>
            <li><code>testimonials</code> - For storing testimonials</li>
            <li><code>content_settings</code> - For global content settings</li>
          </ul>
          <p className="mt-2 text-amber-700">
            The migration tool can help you create the initial data from your local storage.
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-3">
        <Button 
          variant="outline" 
          className="w-full sm:w-auto"
          onClick={testConnection}
          disabled={isTestingConnection || !supabaseUrl || !supabaseKey}
        >
          {isTestingConnection ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Testing Connection
            </>
          ) : (
            'Test Connection'
          )}
        </Button>
        
        <Button 
          variant="default" 
          className="w-full sm:w-auto"
          onClick={migrateDataToSupabase}
          disabled={isMigrating || connectionStatus !== 'success'}
        >
          {isMigrating ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Migrating Data
            </>
          ) : (
            'Migrate Data to Supabase'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SupabaseSetup;
