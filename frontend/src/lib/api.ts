export async function getCsrf(): Promise<string> {
  const r = await fetch('/api/auth/csrf', { credentials: 'include' });
  const d = await r.json();
  return d.csrfToken as string;
}

let csrf: string | null = null;

export async function api<T = unknown>(path: string, opts: RequestInit = {}): Promise<T> {
  const method = (opts.method || 'GET').toUpperCase();
  const headers: Record<string, string> = { ...(opts.headers as Record<string, string> || {}) };
  if (method !== 'GET') {
    if (!csrf) csrf = await getCsrf();
    headers['X-CSRF-Token'] = csrf;
    headers['Content-Type'] = 'application/json';
  }
  let res = await fetch(path, { ...opts, method, headers, credentials: 'include' });
  if (res.status === 403 && method !== 'GET') {
    // CSRF token may have rotated — refresh once and retry
    csrf = await getCsrf();
    headers['X-CSRF-Token'] = csrf;
    res = await fetch(path, { ...opts, method, headers, credentials: 'include' });
  }
  const text = await res.text();
  let data: unknown = null;
  try { data = text ? JSON.parse(text) : null; } catch { data = { error: text }; }
  if (!res.ok) {
    const err = new Error((data as { error?: string })?.error || `Request failed: ${res.status}`) as Error & { status: number; data: unknown };
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data as T;
}

export function langToEditor(lang: string): string {
  const map: Record<string, string> = {
    c: 'c', cpp: 'cpp', python: 'python', typescript: 'typescript',
    javascript: 'javascript', react: 'typescript', rust: 'rust', go: 'go',
    java: 'java', bash: 'shell', sql: 'sql', perl: 'perl', html: 'html',
    csharp: 'csharp', kotlin: 'kotlin', swift: 'swift', php: 'php', ruby: 'ruby',
    dart: 'dart', scala: 'scala', haskell: 'haskell', lua: 'lua', r: 'r',
    'objective-c': 'objective-c',
  };
  return map[lang] || 'plaintext';
}

/** Map a course/example language to the execution engine language id. */
export function langToExec(lang: string): string {
  if (lang === 'react') return 'react';
  if (lang === 'objective-c') return 'objc';
  return lang;
}
