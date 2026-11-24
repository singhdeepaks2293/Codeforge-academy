import type { Monaco } from '@monaco-editor/react';
import type { Theme } from './theme';

/**
 * Warm CodeForge editor themes, matching the app palette — never pure
 * black, muted violet/orange syntax colours. Registered once via
 * `beforeMount`; the active one is picked with `codeForgeTheme(theme)`.
 */
export function setupCodeForgeThemes(monaco: Monaco): void {
  try {
    monaco.editor.defineTheme('codeforge-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: '', foreground: 'F1EDF5', background: '2B2731' },
        { token: 'comment', foreground: '8A8194', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'C084FC' },
        { token: 'keyword.control', foreground: 'C084FC' },
        { token: 'string', foreground: 'A8C69A' },
        { token: 'number', foreground: 'E78A45' },
        { token: 'type', foreground: 'E8B464' },
        { token: 'identifier', foreground: 'F1EDF5' },
        { token: 'delimiter', foreground: 'B9B0C4' },
        { token: 'operator', foreground: 'B9B0C4' },
      ],
      colors: {
        'editor.background': '#2B2731',
        'editor.lineHighlightBackground': '#332E39',
        'editorLineNumber.foreground': '#6E6578',
        'editorLineNumber.activeForeground': '#B9B0C4',
        'editorCursor.foreground': '#C084FC',
        'editor.selectionBackground': '#A970F533',
        'editor.inactiveSelectionBackground': '#A970F51F',
        'editorIndentGuide.background1': '#FFFFFF14',
        'editorIndentGuide.activeBackground1': '#FFFFFF26',
        'editorWidget.background': '#332E39',
        'editorWidget.border': '#FFFFFF12',
        'editorSuggestWidget.selectedBackground': '#393340',
        'editorHoverWidget.background': '#332E39',
        'editorHoverWidget.border': '#FFFFFF12',
        'editorGutter.background': '#2B2731',
        'editorWhitespace.foreground': '#FFFFFF14',
        'editorBracketMatch.background': '#A970F526',
        'editorBracketMatch.border': '#A970F566',
      },
    });
    monaco.editor.defineTheme('codeforge-light', {
      base: 'vs',
      inherit: true,
      rules: [
        { token: '', foreground: '2A2530', background: 'FBF9F7' },
        { token: 'comment', foreground: '8A8094', fontStyle: 'italic' },
        { token: 'keyword', foreground: '7440C2' },
        { token: 'keyword.control', foreground: '7440C2' },
        { token: 'string', foreground: '3E7A4E' },
        { token: 'number', foreground: 'C1652A' },
        { token: 'type', foreground: 'A66E14' },
        { token: 'identifier', foreground: '2A2530' },
        { token: 'delimiter', foreground: '6E6578' },
        { token: 'operator', foreground: '6E6578' },
      ],
      colors: {
        'editor.background': '#FBF9F7',
        'editor.lineHighlightBackground': '#F0EBE6',
        'editorLineNumber.foreground': '#A39AAE',
        'editorLineNumber.activeForeground': '#6E6578',
        'editorCursor.foreground': '#7440C2',
        'editor.selectionBackground': '#8B4FE022',
        'editor.inactiveSelectionBackground': '#8B4FE014',
        'editorIndentGuide.background1': '#2A253014',
        'editorIndentGuide.activeBackground1': '#2A253026',
        'editorWidget.background': '#FFFDFB',
        'editorWidget.border': '#2A253017',
        'editorSuggestWidget.selectedBackground': '#F0EBE6',
        'editorHoverWidget.background': '#FFFDFB',
        'editorHoverWidget.border': '#2A253017',
        'editorGutter.background': '#FBF9F7',
        'editorWhitespace.foreground': '#2A253014',
        'editorBracketMatch.background': '#8B4FE01F',
        'editorBracketMatch.border': '#8B4FE066',
      },
    });
  } catch {
    /* Monaco not ready — the default theme is used as a fallback. */
  }
}

export function codeForgeTheme(theme: Theme): string {
  return theme === 'dark' ? 'codeforge-dark' : 'codeforge-light';
}
