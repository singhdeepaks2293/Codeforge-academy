// WorkspaceShell — shared 3-column teaching-workspace shell (Codecademy-style
// layout, CodeForge branding only).
//
// Layout: black top bar (~80px) with logo, lesson title + segment ticks,
// centred AI-help button and Get Unstuck / Tools / avatar / "Everything
// unlocked" on the right; main area is three equal columns (Learn | Code
// Editor | Output Terminal), each scrolling independently; dark bottom bar
// (~75px) with the exercise counter centred and Back / Next bottom-right.
//
// Generic on purpose: the Learn column is just a slot, so a project
// workspace can reuse this shell later with a Brief panel in its place.
// Drawers and the syllabus overlay are slots too — this shell owns their
// chrome (position, close button, aria), the caller owns their content.
//
// The shell assumes full viewport: it is `flex-1` inside the workspace
// main area (no sidebar, no page padding). It does not touch Layout/App.
import type { ReactNode, Ref } from 'react';
import { Link } from 'react-router-dom';
import './workspace.css';

export type WorkspaceDrawerId = 'ai-help' | 'unstuck' | 'tools' | 'unlocked';

export interface WorkspaceShellProps {
  /** Lesson / project title shown in the top bar. */
  title: string;
  /** Total segments (lessons in the course) for the tick progress. */
  segmentCount: number;
  /** 0-based index of the current segment. */
  segmentIndex: number;
  /** Label for the left column heading (default "Learn"). */
  learnLabel?: string;
  /** Label for the left overlay + its button (default "Syllabus"). */
  syllabusLabel?: string;
  /** Optional strip rendered between the top bar and the 3-column grid
      (e.g. a provisioning banner). */
  banner?: ReactNode;
  learn: ReactNode;
  editor: ReactNode;
  terminal: ReactNode;
  bottomCenter: ReactNode;
  bottomRight: ReactNode;
  /** Avatar initial for the top-bar avatar circle. */
  avatarInitial?: string;
  onOpenSyllabus: () => void;
  syllabusOpen: boolean;
  onCloseSyllabus: () => void;
  syllabus: ReactNode;
  drawer: WorkspaceDrawerId | null;
  onCloseDrawer: () => void;
  drawerTitle: string;
  drawerContent: ReactNode;
  onOpenAiHelp: () => void;
  onOpenUnstuck: () => void;
  onOpenTools: () => void;
  onOpenUnlocked: () => void;
  workspaceRef?: Ref<HTMLElement>;
  /** CSS-fullscreen fallback when the Fullscreen API is unavailable. */
  expanded?: boolean;
}

export function WorkspaceShell({
  title,
  segmentCount,
  segmentIndex,
  learnLabel = 'Learn',
  syllabusLabel = 'Syllabus',
  banner,
  learn,
  editor,
  terminal,
  bottomCenter,
  bottomRight,
  avatarInitial = '?',
  onOpenSyllabus,
  syllabusOpen,
  onCloseSyllabus,
  syllabus,
  drawer,
  onCloseDrawer,
  drawerTitle,
  drawerContent,
  onOpenAiHelp,
  onOpenUnstuck,
  onOpenTools,
  onOpenUnlocked,
  workspaceRef,
  expanded = false,
}: WorkspaceShellProps) {
  return (
    <section
      ref={workspaceRef}
      aria-label="Lesson workspace"
      className={`flex min-h-0 flex-1 flex-col overflow-hidden bg-black text-white ${expanded ? 'fixed inset-0 z-50' : ''}`}
    >
      {/* Black top bar (~80px) */}
      <header className="flex h-20 shrink-0 items-center gap-3 border-b border-zinc-800 bg-black px-4">
        <button
          type="button"
          onClick={onOpenSyllabus}
          aria-label={`Open ${syllabusLabel.toLowerCase()}`}
          className="rounded-md px-2 py-1.5 text-sm font-semibold text-zinc-300 hover:bg-zinc-800 hover:text-white"
        >
          ☰ {syllabusLabel}
        </button>
        <Link to="/" className="shrink-0 text-lg font-bold tracking-tight text-white">
          CodeForge <span className="text-yellow-400">Academy</span>
        </Link>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-white">{title}</p>
          {/* Segment ticks: one per lesson in the course, filled up to current. */}
          <div
            className="mt-1.5 flex items-center gap-1"
            role="img"
            aria-label={`Lesson ${segmentIndex + 1} of ${segmentCount}`}
          >
            {Array.from({ length: Math.max(segmentCount, 1) }, (_, i) => (
              <span
                key={i}
                aria-hidden
                className={`h-1.5 w-5 rounded-full ${i <= segmentIndex ? 'bg-yellow-400' : 'bg-zinc-700'}`}
              />
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={onOpenAiHelp}
          className="rounded-full bg-zinc-800 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-700"
        >
          ✦ AI help
        </button>
        <div className="ml-auto flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={onOpenUnstuck}
            className="rounded-md px-2.5 py-1.5 text-sm font-semibold text-zinc-200 hover:bg-zinc-800 hover:text-white"
          >
            Get Unstuck
          </button>
          <button
            type="button"
            onClick={onOpenTools}
            className="rounded-md px-2.5 py-1.5 text-sm font-semibold text-zinc-200 hover:bg-zinc-800 hover:text-white"
          >
            Tools
          </button>
          <span
            aria-hidden
            title="Your account"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400 text-sm font-bold text-black"
          >
            {avatarInitial}
          </span>
          <button
            type="button"
            onClick={onOpenUnlocked}
            className="rounded-full border border-yellow-400 px-3 py-1.5 text-xs font-bold text-yellow-400 hover:bg-yellow-400 hover:text-black"
          >
            Everything unlocked
          </button>
        </div>
      </header>

      {banner}

      {/* Main area: three equal columns, each with its own scrollbar. */}
      <div className="grid min-h-0 flex-1 grid-cols-3">
        <div className="panel-scroll min-h-0 min-w-0 overflow-y-auto bg-white text-zinc-900" aria-label={learnLabel}>
          {learn}
        </div>
        <div className="flex min-h-0 min-w-0 flex-col overflow-hidden border-x border-zinc-800 bg-zinc-900" aria-label="Code editor">
          {editor}
        </div>
        <div className="flex min-h-0 min-w-0 flex-col overflow-hidden bg-black" aria-label="Output terminal">
          {terminal}
        </div>
      </div>

      {/* Dark bottom bar (~75px): counter centred, Back / Next bottom-right. */}
      <footer className="grid h-[75px] shrink-0 grid-cols-3 items-center border-t border-zinc-800 bg-zinc-900 px-4">
        <div aria-hidden />
        <div className="text-center text-sm font-semibold text-white">{bottomCenter}</div>
        <div className="flex items-center justify-end gap-2">{bottomRight}</div>
      </footer>

      {/* Syllabus overlay (left slide-over). */}
      {syllabusOpen && (
        <div className="fixed inset-0 z-50" role="dialog" aria-label={syllabusLabel} aria-modal="true">
          <button
            type="button"
            aria-label="Dismiss panel"
            onClick={onCloseSyllabus}
            className="absolute inset-0 h-full w-full cursor-default bg-black/60"
          />
          <div className="workspace-drawer-left absolute inset-y-0 left-0 flex w-[340px] max-w-[90vw] flex-col overflow-hidden bg-white text-zinc-900 shadow-2xl">
            <div className="flex shrink-0 items-center justify-between border-b border-zinc-200 px-4 py-3">
              <h2 className="text-base font-bold">{syllabusLabel}</h2>
              <button
                type="button"
                onClick={onCloseSyllabus}
                aria-label="Close syllabus"
                className="rounded-md px-2 py-1 text-lg leading-none text-zinc-500 hover:bg-zinc-100"
              >
                ✕
              </button>
            </div>
            <div className="panel-scroll min-h-0 flex-1 overflow-y-auto px-4 py-3">{syllabus}</div>
          </div>
        </div>
      )}

      {/* Right slide-over drawers (AI help / Get Unstuck / Tools / Unlocked). */}
      {drawer && (
        <div className="fixed inset-0 z-50" role="dialog" aria-label={drawerTitle} aria-modal="true">
          <button
            type="button"
            aria-label="Dismiss panel"
            onClick={onCloseDrawer}
            className="absolute inset-0 h-full w-full cursor-default bg-black/60"
          />
          <div className="workspace-drawer-right absolute inset-y-0 right-0 flex w-[380px] max-w-[92vw] flex-col overflow-hidden bg-white text-zinc-900 shadow-2xl">
            <div className="flex shrink-0 items-center justify-between border-b border-zinc-200 px-4 py-3">
              <h2 className="text-base font-bold">{drawerTitle}</h2>
              <button
                type="button"
                onClick={onCloseDrawer}
                aria-label="Close panel"
                className="rounded-md px-2 py-1 text-lg leading-none text-zinc-500 hover:bg-zinc-100"
              >
                ✕
              </button>
            </div>
            <div className="panel-scroll min-h-0 flex-1 overflow-y-auto px-4 py-3">{drawerContent}</div>
          </div>
        </div>
      )}
    </section>
  );
}
