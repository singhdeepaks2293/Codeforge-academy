// Regression tests for the P0 blank-editor bug: the lesson/DSA editor went
// blank after scrolling, theme toggles, or sidebar collapse/expand because
// Monaco was never re-laid-out on container resize. CodeEditor must wire a
// ResizeObserver on its container and call editor.layout() on every resize.
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';

const { fakeEditor, capturedProps } = vi.hoisted(() => ({
  fakeEditor: { layout: vi.fn() },
  capturedProps: {} as Record<string, unknown>,
}));

vi.mock('@monaco-editor/react', () => ({
  default: (props: Record<string, unknown>) => {
    Object.assign(capturedProps, props);
    return <div data-testid="monaco-stub">monaco editor</div>;
  },
}));

const roCallbacks: ResizeObserverCallback[] = [];
class MockResizeObserver {
  callback: ResizeObserverCallback;
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  constructor(cb: ResizeObserverCallback) {
    this.callback = cb;
    roCallbacks.push(cb);
  }
}

import { CodeEditor } from './MonacoEditor';

async function flushRaf() {
  // CodeEditor defers layout() a frame; let jsdom's rAF fire.
  await act(async () => { await new Promise((r) => setTimeout(r, 50)); });
}

describe('CodeEditor resize handling (P0 blank-editor regression)', () => {
  beforeEach(() => {
    roCallbacks.length = 0;
    fakeEditor.layout.mockClear();
    vi.stubGlobal('ResizeObserver', MockResizeObserver);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('observes its container with a ResizeObserver', () => {
    const { container } = render(<CodeEditor value="x = 1" language="python" />);
    expect(roCallbacks.length).toBe(1);
    expect(container.querySelector('[data-testid="monaco-stub"]')).toBeInTheDocument();
  });

  it('calls editor.layout() when the container resizes', async () => {
    render(<CodeEditor value="x = 1" language="python" />);
    // Simulate Monaco mounting.
    const onMount = capturedProps.onMount as (editor: typeof fakeEditor) => void;
    act(() => { onMount(fakeEditor); });
    await flushRaf();
    fakeEditor.layout.mockClear();

    // Simulate a container resize (sidebar collapse, theme reflow, …).
    act(() => { roCallbacks[0]([], new MockResizeObserver(() => undefined) as unknown as ResizeObserver); });
    await flushRaf();
    expect(fakeEditor.layout).toHaveBeenCalled();
  });

  it('calls editor.layout() once after mount', async () => {
    render(<CodeEditor value="x = 1" language="python" />);
    const onMount = capturedProps.onMount as (editor: typeof fakeEditor) => void;
    act(() => { onMount(fakeEditor); });
    await flushRaf();
    expect(fakeEditor.layout).toHaveBeenCalled();
  });

  it('renders no "Loading…" text line while Monaco boots', () => {
    render(<CodeEditor value="x = 1" language="python" />);
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });
});
