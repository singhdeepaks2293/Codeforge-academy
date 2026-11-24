// Shared collapsible section: a header button (aria-expanded) that toggles a
// body rendered only while open. Used wherever secondary content must stay
// out of the learner's way until asked for (DSA library, hints, solutions…).
// Collapsed by default unless `defaultOpen` is set.
import { useState, type ReactNode } from 'react';

export function Collapsible({
  title,
  defaultOpen = false,
  badge,
  children,
  className = '',
  headerClassName = '',
  bodyClassName = '',
}: {
  title: string;
  defaultOpen?: boolean;
  badge?: string;
  children: ReactNode;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section className={`card ${className}`}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`flex w-full items-center gap-2 rounded-xl px-4 py-3 text-left transition-colors duration-200 hover:bg-elevated ${headerClassName}`}
      >
        <span aria-hidden className="text-sm text-muted transition-transform duration-200" style={{ transform: open ? 'rotate(90deg)' : 'none' }}>▸</span>
        <span className="min-w-0 flex-1 truncate font-bold">{title}</span>
        {badge && <span className="badge shrink-0 bg-elevated text-muted">{badge}</span>}
        <span className="shrink-0 text-xs font-semibold text-accent-600">{open ? 'Hide' : 'Show'}</span>
      </button>
      {open && <div className={`border-t border-line px-4 py-3 ${bodyClassName}`}>{children}</div>}
    </section>
  );
}
