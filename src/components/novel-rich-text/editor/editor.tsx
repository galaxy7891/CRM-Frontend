'use client';

import { useState } from 'react';

import {
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  type JSONContent,
  EditorRoot,
} from 'novel';
import { slashCommand, suggestionItems } from './slash-command';
import EditorMenu from './editor-menu';
import { defaultExtensions } from './extensions';
import { TextButtons } from '../selectors/text-buttons';
import { LinkSelector } from '../selectors/link-selector';
import { NodeSelector } from '../selectors/node-selector';

import { Separator } from '../ui/separator';
import { handleCommandNavigation } from 'novel/extensions';
import { HTMLContent } from '@tiptap/core';

const extensions = [...defaultExtensions, slashCommand];

export const defaultEditorContent = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [],
    },
  ],
};

interface EditorProps {
  initialValue?: HTMLContent | JSONContent;
  onChange: (content: string) => void;
}

export default function Editor({ initialValue, onChange }: EditorProps) {
  const [openNode, setOpenNode] = useState(false);
  const [openLink, setOpenLink] = useState(false);
  const [openAI, setOpenAI] = useState(false);

  return (
    <div className="relative w-full max-w-screen-lg">
      <EditorRoot>
        <EditorContent
          immediatelyRender={false}
          initialContent={initialValue}
          extensions={extensions}
          className="min-h-96 rounded-xl border p-4"
          editorProps={{
            handleDOMEvents: {
              keydown: (_view, event) => handleCommandNavigation(event),
            },
            attributes: {
              class:
                'prose dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full',
            },
          }}
          onUpdate={({ editor }) => {
            onChange(editor.getHTML());
          }}
        >
          <EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
            <EditorCommandEmpty className="px-2 text-muted-foreground">
              No results
            </EditorCommandEmpty>
            <EditorCommandList>
              {suggestionItems.map((item) => (
                <EditorCommandItem
                  value={item.title}
                  onCommand={(val) => item.command?.(val)}
                  className="flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent"
                  key={item.title}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </EditorCommandItem>
              ))}
            </EditorCommandList>
          </EditorCommand>

          <EditorMenu open={openAI} onOpenChange={setOpenAI}>
            <Separator orientation="vertical" />
            <NodeSelector open={openNode} onOpenChange={setOpenNode} />

            <Separator orientation="vertical" />
            <LinkSelector open={openLink} onOpenChange={setOpenLink} />

            <Separator orientation="vertical" />
            <TextButtons />
          </EditorMenu>
        </EditorContent>
      </EditorRoot>
    </div>
  );
}
