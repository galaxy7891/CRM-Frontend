declare global {
  interface TrixEditorEvent extends Event {
    target: HTMLElement & { innerHTML: string };
  }
  namespace JSX {
    interface IntrinsicElements {
      'trix-editor': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & { input?: string }, // Allow the 'input' attribute
        HTMLElement
      >;
    }
  }
}

export {};
