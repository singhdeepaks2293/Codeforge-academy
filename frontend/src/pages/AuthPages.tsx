import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';
import { Page } from '../components/Layout';

export function SetupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const { refresh } = useAuth();

  useEffect(() => {
    api<{ setupComplete: boolean }>('/api/auth/setup-status').then((d) => { if (d.setupComplete) navigate('/login'); }).catch(() => undefined);
  }, [navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await api('/api/auth/setup', { method: 'POST', body: JSON.stringify({ email, password, displayName }) });
      await refresh();
      setDone(true);
      toast('Admin account created — setup complete', 'success');
      setTimeout(() => navigate('/'), 800);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="mx-auto max-w-lg">
      <div className="card p-6">
        <h1 className="text-2xl font-bold">Welcome to CodeForge Academy</h1>
        <p className="mt-2 text-sm text-muted">First-run setup. Create the initial administrator account. No default admin credentials exist — this wizard disables itself after setup. To reset the local environment, delete <code>data/codeforge.db</code> and restart the server.</p>
        {done ? <p className="mt-4 font-semibold text-success">Setup complete — redirecting to your dashboard…</p> : (
          <form onSubmit={submit} className="mt-5 space-y-4">
            <div><label className="label" htmlFor="name">Display name</label><input id="name" className="input" value={displayName} onChange={(e) => setDisplayName(e.target.value)} required /></div>
            <div><label className="label" htmlFor="email">Email</label><input id="email" type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
            <div><label className="label" htmlFor="pw">Password (min 8 chars, upper + lower + digit)</label><input id="pw" type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
            {error && <p role="alert" className="text-sm text-danger">{error}</p>}
            <button className="btn-primary w-full" type="submit">Create administrator & finish setup</button>
          </form>
        )}
      </div>
    </div>
  );
}

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [setupNeeded, setSetupNeeded] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const { refresh } = useAuth();

  useEffect(() => {
    api<{ setupComplete: boolean }>('/api/auth/setup-status').then((d) => setSetupNeeded(!d.setupComplete)).catch(() => undefined);
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await api('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password, rememberMe }) });
      await refresh();
      toast('Welcome back!', 'success');
      navigate('/');
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="mx-auto max-w-md">
      <div className="card p-6">
        <h1 className="text-2xl font-bold">Sign in</h1>
        {setupNeeded && <p className="mt-2 text-sm">This platform has not been set up yet. <Link className="font-semibold text-accent-600" to="/setup">Run first-run setup →</Link></p>}
        <form onSubmit={submit} className="mt-5 space-y-4">
          <div><label className="label" htmlFor="email">Email</label><input id="email" type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" /></div>
          <div><label className="label" htmlFor="pw">Password</label><input id="pw" type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" /></div>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} /> Remember me (30 days)</label>
          {error && <p role="alert" className="text-sm text-danger">{error}</p>}
          <button className="btn-primary w-full" type="submit">Sign in</button>
        </form>
        <div className="mt-4 flex justify-between text-sm">
          <Link className="text-accent-600" to="/register">Create an account</Link>
          <Link className="text-accent-600" to="/forgot-password">Forgot password?</Link>
        </div>
      </div>
    </div>
  );
}

export function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const toast = useToast();
  const { refresh } = useAuth();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await api('/api/auth/register', { method: 'POST', body: JSON.stringify({ email, password, displayName }) });
      await refresh();
      toast('Account created — welcome!', 'success');
      navigate('/');
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="mx-auto max-w-md">
      <div className="card p-6">
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="mt-1 text-sm text-muted">Free, local, no cloud account needed. Passwords are hashed with bcrypt — never stored in plain text.</p>
        <form onSubmit={submit} className="mt-5 space-y-4">
          <div><label className="label" htmlFor="name">Display name</label><input id="name" className="input" value={displayName} onChange={(e) => setDisplayName(e.target.value)} required /></div>
          <div><label className="label" htmlFor="email">Email</label><input id="email" type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" /></div>
          <div><label className="label" htmlFor="pw">Password (min 8 chars, upper + lower + digit)</label><input id="pw" type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="new-password" /></div>
          {error && <p role="alert" className="text-sm text-danger">{error}</p>}
          <button className="btn-primary w-full" type="submit">Create account</button>
        </form>
        <p className="mt-4 text-sm">Already have an account? <Link className="text-accent-600" to="/login">Sign in</Link></p>
      </div>
    </div>
  );
}

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const d = await api<{ ok: boolean; resetToken?: string; note?: string }>('/api/auth/forgot-password', { method: 'POST', body: JSON.stringify({ email }) });
      setResult(d.resetToken ? `Reset token (local deployment, expires in 1 hour): ${d.resetToken}` : 'If an account exists, a reset token was created.');
    } catch (err) { setError((err as Error).message); }
  };
  return (
    <div className="mx-auto max-w-md">
      <div className="card p-6">
        <h1 className="text-2xl font-bold">Reset password</h1>
        <p className="mt-1 text-sm text-muted">Local deployment has no mail server, so the reset token is shown here after you submit.</p>
        <form onSubmit={submit} className="mt-5 space-y-4">
          <div><label className="label" htmlFor="email">Email</label><input id="email" type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
          {error && <p role="alert" className="text-sm text-danger">{error}</p>}
          {result && <p className="break-all rounded bg-elevated p-3 text-sm">{result}</p>}
          <button className="btn-primary w-full" type="submit">Request reset token</button>
        </form>
        <Link className="mt-4 block text-sm text-accent-600" to="/reset-password">I have a token — set a new password →</Link>
      </div>
    </div>
  );
}

export function ResetPasswordPage() {
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await api('/api/auth/reset-password', { method: 'POST', body: JSON.stringify({ token, newPassword }) });
      setMsg('Password reset — you can now sign in.');
      setTimeout(() => navigate('/login'), 1000);
    } catch (err) { setError((err as Error).message); }
  };
  return (
    <div className="mx-auto max-w-md">
      <div className="card p-6">
        <h1 className="text-2xl font-bold">Set a new password</h1>
        <form onSubmit={submit} className="mt-5 space-y-4">
          <div><label className="label" htmlFor="token">Reset token</label><input id="token" className="input" value={token} onChange={(e) => setToken(e.target.value)} required /></div>
          <div><label className="label" htmlFor="pw">New password</label><input id="pw" type="password" className="input" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required /></div>
          {error && <p role="alert" className="text-sm text-danger">{error}</p>}
          {msg && <p className="text-sm text-success">{msg}</p>}
          <button className="btn-primary w-full" type="submit">Reset password</button>
        </form>
      </div>
    </div>
  );
}

export function NotFoundPage() {
  return <Page title="Page not found" subtitle="That route does not exist."><Link className="btn-primary" to="/">Back to dashboard</Link></Page>;
}
