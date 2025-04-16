
import React, { useState, useRef } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import ReactMarkdown from 'react-markdown';
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Link,
  Image,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Undo,
  Redo,
  HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertText = (before: string, after: string = '') => {
    if (!textareaRef.current) return;
    
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end);
    onChange(newText);
    
    // Set cursor position after insertion
    setTimeout(() => {
      textarea.focus();
      // Set cursor position after the inserted text
      const newPosition = end + before.length + (selectedText.length > 0 ? 0 : after.length);
      textarea.setSelectionRange(newPosition, newPosition);
    }, 0);
  };

  const formatActions = [
    { 
      icon: <Bold size={16} />, 
      tooltip: 'Bold (Ctrl+B)', 
      action: () => insertText('**', '**'),
      shortcut: 'B'
    },
    { 
      icon: <Italic size={16} />, 
      tooltip: 'Italic (Ctrl+I)', 
      action: () => insertText('*', '*'),
      shortcut: 'I'
    },
    { 
      icon: <Heading1 size={16} />, 
      tooltip: 'Heading 1', 
      action: () => insertText('# ', '')
    },
    { 
      icon: <Heading2 size={16} />, 
      tooltip: 'Heading 2', 
      action: () => insertText('## ', '')
    },
    { 
      icon: <Heading3 size={16} />, 
      tooltip: 'Heading 3', 
      action: () => insertText('### ', '')
    },
    { 
      icon: <List size={16} />, 
      tooltip: 'Bullet List', 
      action: () => insertText('- ', '')
    },
    { 
      icon: <ListOrdered size={16} />, 
      tooltip: 'Numbered List', 
      action: () => insertText('1. ', '')
    },
    { 
      icon: <Quote size={16} />, 
      tooltip: 'Blockquote', 
      action: () => insertText('> ', '')
    },
    { 
      icon: <Code size={16} />, 
      tooltip: 'Code', 
      action: () => insertText('`', '`')
    },
    { 
      icon: <Link size={16} />, 
      tooltip: 'Link', 
      action: () => insertText('[', '](url)')
    },
    { 
      icon: <Image size={16} />, 
      tooltip: 'Image', 
      action: () => insertText('![alt text](', ')')
    }
  ];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Handle keyboard shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch (e.key.toLowerCase()) {
        case 'b':
          e.preventDefault();
          formatActions[0].action();
          break;
        case 'i':
          e.preventDefault();
          formatActions[1].action();
          break;
      }
    }
  };

  return (
    <div className="border rounded-md overflow-hidden">
      <Tabs defaultValue="edit" value={activeTab} onValueChange={setActiveTab}>
        <div className="bg-gray-50 border-b px-4 py-2">
          <div className="flex flex-col sm:flex-row justify-between gap-2">
            <TabsList className="grid w-[200px] grid-cols-2">
              <TabsTrigger value="edit">Edit</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            
            {activeTab === 'edit' && (
              <div className="flex flex-wrap gap-1 justify-start">
                <TooltipProvider>
                  {formatActions.map((action, index) => (
                    <Tooltip key={index}>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-7 w-7" 
                          onClick={(e) => {
                            e.preventDefault();
                            action.action();
                          }}
                        >
                          {action.icon}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{action.tooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </TooltipProvider>
              </div>
            )}
          </div>
        </div>
        
        <TabsContent value="edit" className="mt-0 p-0">
          <Textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`border-0 rounded-none ${height} font-mono text-sm p-4`}
            placeholder="Write your content using Markdown..."
          />
        </TabsContent>
        
        <TabsContent value="preview" className="mt-0 p-0">
          <div className={`${height} overflow-y-auto p-4 prose prose-headings:mt-4 prose-headings:mb-2 prose-p:my-2 prose-ul:my-2 prose-ol:my-2 max-w-none markdown-content`}>
            <ReactMarkdown>{value || ''}</ReactMarkdown>
          </div>
        </TabsContent>
      </Tabs>
      
      {activeTab === 'edit' && (
        <div className="bg-gray-50 border-t px-4 py-2 text-xs text-gray-500 flex justify-between items-center">
          <div className="flex items-center">
            <HelpCircle className="h-3.5 w-3.5 mr-1 text-gray-400" />
            <span>
              <strong>Markdown:</strong> Use the toolbar above or keyboard shortcuts (Ctrl+B, Ctrl+I)
            </span>
          </div>
          <div className="text-gray-400">
            {value.length} characters
          </div>
        </div>
      )}
    </div>
  );
};

export default MarkdownEditor;
