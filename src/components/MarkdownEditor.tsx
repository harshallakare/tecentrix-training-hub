
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import ReactMarkdown from 'react-markdown';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  height?: string;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ 
  value, 
  onChange, 
  height = 'min-h-[300px]' 
}) => {
  const [activeTab, setActiveTab] = useState<string>('edit');

  return (
    <div className="border rounded-md overflow-hidden">
      <Tabs defaultValue="edit" value={activeTab} onValueChange={setActiveTab}>
        <div className="bg-gray-50 border-b px-4 py-2">
          <TabsList className="grid w-[200px] grid-cols-2">
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="edit" className="mt-0 p-0">
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`border-0 rounded-none ${height} font-mono text-sm p-4`}
            placeholder="Write your content using Markdown..."
          />
        </TabsContent>
        
        <TabsContent value="preview" className="mt-0 p-0">
          <div className={`${height} overflow-y-auto p-4 prose max-w-none`}>
            <ReactMarkdown>{value}</ReactMarkdown>
          </div>
        </TabsContent>
      </Tabs>
      
      {activeTab === 'edit' && (
        <div className="bg-gray-50 border-t px-4 py-2 text-xs text-gray-500">
          <p>
            <strong>Tip:</strong> Use Markdown to format your content. 
            <span className="ml-2">
              # Header, **Bold**, *Italic*, [Link](url), ![Image](url), `code`
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default MarkdownEditor;
