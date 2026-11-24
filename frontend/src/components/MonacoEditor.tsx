// Monaco editor wrapper with explicit resize handling.
//
// P0 root cause: `@monaco-editor/react` only re-lays-out when its own
// `automaticLayout` polling notices a size change. Scrolling the page,
// toggling the theme, or collapsing the sidebar changes the editor
// container's size without a window resize, and Monaco can then paint into
// a stale (zero-area) layout — the lesson/DSA editor renders as a blank
// dark box until a full reload. This wrapper observes the container with a
// ResizeObserver and calls `editor.layout()` on every size change, plus
// once after mount and whenever the theme changes, so the editor always
// repaints at its real size.
import { useCallback, useEffect, useRef } from 'react';
import Editor, { type OnMount } from '@monaco-editor/react';
import { useTheme } from '../lib/theme';
import { codeForgeTheme, setupCodeForgeThemes } from '../lib/monacoTheme';

export interface CodeEditorProps {
  value: string;
  language: string;
  onChange?: (value: string) => void;
  options?: Record<string, unknown>;
  height?: string | number;
  ariaLabel?: string;
}

export function CodeEditor({ value, language, onChange, options, height = '100%', ariaLabel }: CodeEditorProps) {
  const theme = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<Parameters<OnMount>[0] | null>(null);

  const layout = useCallback(() => {
    const editor = editorRef.current;
    if (!editor) return;
    // Defer a frame: the container's new size is only settled after React
    // has applied the layout change (sidebar collapse, theme swap, …).
    requestAnimationFrame(() => editor.layout());
  }, []);

  const handleMount: OnMount = useCallback((editor) => {
    editorRef.current = editor;
    layout();
  }, [layout]);

  // ResizeObserver: the fix for blank editors. Any container resize —
  // sidebar collapse/expand, panel drag, theme toggle reflow, window
  // resize — re-lays-out Monaco at its real size.
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(() => layout());
    ro.observe(el);
    return () => ro.disconnect();
  }, [layout]);

  // Theme swaps re-style Monaco; re-layout so nothing is left blank.
  useEffect(() => { layout(); }, [theme, layout]);

  return (
    <div ref={containerRef} className="h-full min-h-0 w-full" style={{ height }} aria-label={ariaLabel}>
      <Editor
        height="100%"
        language={language}
        value={value}
        onChange={(v) => onChange?.(v || '')}
        theme={codeForgeTheme(theme)}
        beforeMount={setupCodeForgeThemes}
        onMount={handleMount}
        // No text loading line: a stale "Loading…" under the editor was
        // reported; the editor area itself is the placeholder while Monaco
        // boots (local, fast).
        loading={<div aria-hidden className="h-full w-full bg-code" />}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          automaticLayout: true,
          fontFamily: 'JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
          fontLigatures: false,
          scrollBeyondLastLine: false,
          renderLineHighlight: 'line',
          tabSize: 2,
          ...(options || {}),
        }}
      />
    </div>
  );
}
