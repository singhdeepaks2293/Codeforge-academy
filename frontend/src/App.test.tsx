import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { langToEditor, langToExec } from './lib/api';
import { Visualization } from './components/Visualizations';

describe('language mapping', () => {
  it('maps course languages to Monaco editor languages', () => {
    expect(langToEditor('python')).toBe('python');
    expect(langToEditor('cpp')).toBe('cpp');
    expect(langToEditor('react')).toBe('typescript');
    expect(langToEditor('rust')).toBe('rust');
    expect(langToEditor('go')).toBe('go');
  });
  it('maps react to the react execution mode', () => {
    expect(langToExec('react')).toBe('react');
    expect(langToExec('python')).toBe('python');
  });
});

describe('visualizations', () => {
  it('renders merge sort with play controls and pseudocode', () => {
    render(<Visualization kind="merge-sort" />);
    expect(screen.getByText(/merge sort visualization/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Play/i })).toBeInTheDocument();
    expect(screen.getByText(/Pseudocode/i)).toBeInTheDocument();
  });
  it('renders the stack visualization with push/pop', () => {
    render(<Visualization kind="stack" />);
    expect(screen.getByRole('button', { name: /^Push$/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^Pop$/ })).toBeInTheDocument();
  });
  it('renders the DP fibonacci table', () => {
    render(<Visualization kind="dp-fib" />);
    expect(screen.getByText(/Compute fib/i)).toBeInTheDocument();
  });
});
