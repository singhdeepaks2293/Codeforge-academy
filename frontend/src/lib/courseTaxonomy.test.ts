import { describe, it, expect } from 'vitest';
import { CATEGORIES, LANG_LABEL, LANGUAGE_FILTER_OPTIONS, categoryLabel, coursePill } from './courseTaxonomy';

describe('coursePill', () => {
  it('shows the language when the language is the track subject', () => {
    expect(coursePill({ language: 'python', category: 'languages' })).toBe('Python');
    expect(coursePill({ language: 'react', category: 'languages' })).toBe('React');
    expect(coursePill({ language: 'mongodb', category: 'databases' })).toBe('MongoDB');
    expect(coursePill({ language: 'redis', category: 'databases' })).toBe('Redis');
    expect(coursePill({ language: 'javascript', category: 'web' })).toBe('JavaScript');
    expect(coursePill({ language: 'dart', category: 'mobile' })).toBe('Dart');
  });

  it('shows the category label for domain tracks, not the exercise vehicle', () => {
    // AWS Fundamentals runs Python snippets but is a DevOps track.
    expect(coursePill({ language: 'python', category: 'devops' })).toBe('DevOps');
    expect(coursePill({ language: 'python', category: 'cs-career' })).toBe('CS Foundations');
    expect(coursePill({ language: 'python', category: 'data-ai' })).toBe('Data & AI');
    expect(coursePill({ language: 'bash', category: 'devops' })).toBe('DevOps');
    expect(coursePill({ language: 'c', category: 'cs-career' })).toBe('CS Foundations');
  });

  it('treats a missing category as a language subject (v1 tracks)', () => {
    expect(coursePill({ language: 'python' })).toBe('Python');
    expect(coursePill({ language: 'rust' })).toBe('Rust');
  });

  it('labels Objective-C from its stored id', () => {
    expect(LANG_LABEL['objc']).toBe('Objective-C');
    expect(coursePill({ language: 'objc', category: 'languages' })).toBe('Objective-C');
  });
});

describe('LANGUAGE_FILTER_OPTIONS', () => {
  it('lists only true programming languages', () => {
    const labels = LANGUAGE_FILTER_OPTIONS.map((o) => o.label);
    const values = LANGUAGE_FILTER_OPTIONS.map((o) => o.value);
    // Frameworks and data services are not languages: React stays findable
    // via Web & Frontend, MongoDB/Redis via Databases & Backend.
    expect(labels).not.toContain('React');
    expect(labels).not.toContain('MongoDB');
    expect(labels).not.toContain('Redis');
    expect(values).not.toContain('react');
    expect(values).not.toContain('mongodb');
    expect(values).not.toContain('redis');
    for (const label of [
      'C', 'C++', 'Python', 'TypeScript', 'Rust', 'Go', 'Java', 'JavaScript', 'C#',
      'Kotlin', 'Swift', 'PHP', 'Ruby', 'Dart', 'Scala', 'Haskell', 'Elixir', 'Lua',
      'R', 'Julia', 'Perl', 'Objective-C', 'Assembly', 'Solidity', 'SQL', 'Bash', 'HTML & CSS',
    ]) {
      expect(labels).toContain(label);
    }
    expect(LANGUAGE_FILTER_OPTIONS).toHaveLength(27);
  });

  it('uses the stored language ids the API returns', () => {
    const byLabel = Object.fromEntries(LANGUAGE_FILTER_OPTIONS.map((o) => [o.label, o.value]));
    expect(byLabel['Objective-C']).toBe('objc');
    expect(byLabel['Assembly']).toBe('asm');
    expect(byLabel['HTML & CSS']).toBe('html');
    expect(byLabel['C#']).toBe('csharp');
  });
});

describe('categoryLabel', () => {
  it('resolves the known categories', () => {
    expect(categoryLabel('devops')).toBe('DevOps, Cloud & Systems');
    expect(categoryLabel('cs-career')).toBe('CS Foundations & Career');
    expect(CATEGORIES).toHaveLength(7);
  });
});
