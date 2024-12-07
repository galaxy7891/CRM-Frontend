import { Button } from '../ui/button';
import { cn } from '@/utils/utils'
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon
} from 'lucide-react'
import { EditorBubbleItem, useEditor } from 'novel'
import type { SelectorItem } from './node-selector'

export const TextButtons = () => {
  const { editor } = useEditor()
  if (!editor) return null
  const items: SelectorItem[] = [
    {
      name: 'bold',
      isActive: editor => (editor ? editor.isActive('bold') : false),
      command: editor => editor?.chain().focus().toggleBold().run(),
      icon: BoldIcon
    },
    {
      name: 'italic',
      isActive: editor => (editor ? editor.isActive('italic') : false),
      command: editor => editor?.chain().focus().toggleItalic().run(),
      icon: ItalicIcon
    },
    {
      name: 'underline',
      isActive: editor => (editor ? editor.isActive('underline') : false),
      command: editor => editor?.chain().focus().toggleUnderline().run(),
      icon: UnderlineIcon
    },
  ]
  return (
    <div className='flex'>
      {items.map(item => (
        <EditorBubbleItem
          key={item.name}
          onSelect={editor => {
            item.command(editor)
          }}
        >
          <Button size='sm' className='rounded-none' variant='ghost'>
            <item.icon
              className={cn('h-4 w-4', {
                'text-blue-500': item.isActive(editor)
              })}
            />
          </Button>
        </EditorBubbleItem>
      ))}
    </div>
  )
}
