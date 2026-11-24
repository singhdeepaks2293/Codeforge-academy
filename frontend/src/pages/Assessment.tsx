import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { api } from '../lib/api';
import { useToast } from '../components/Toast';
import { Page } from '../components/Layout';
import { useTheme } from '../lib/theme';
import { codeForgeTheme, setupCodeForgeThemes } from '../lib/monacoTheme';

interface AssessmentData {
  assessment: {
    id: string; courseSlug: string; passPercent: number;
    questions: { id: string; kind: string; topic: string; question: string; code?: string; options: string[] }[];
    programmingExercises: { id: string; title: string; instructions: string; starterCode: string; tests: { name: string }[]; language?: string }[];
    capstone: { title: string; description: string; requirements: string[]; rubric: string[] };
  };
  attempts: { id: string; score_percent: number; passed: number; weak_topics: string; created_at: string }[];
}

export function AssessmentPage() {
  const { courseSlug } = useParams();
  const theme = useTheme();
  const [data, setData] = useState<AssessmentData | null>(null);
  const [error, setError] = useState('');
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [code, setCode] = useState<Record<string, string>>({});
  const [result, setResult] = useState<{ scorePercent: number; passed: boolean; passPercent: number; correct: number; total: number; weakTopics: string[]; feedback: { questionId: string; correct: boolean; explanation: string }[] } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [startedAt] = useState(Date.now());
  const toast = useToast();

  useEffect(() => {
    if (!courseSlug) return;
    api<AssessmentData>(`/api/assessments/${courseSlug}`).then((d) => {
      setData(d);
      const init: Record<string, string> = {};
      for (const ex of d.assessment.programmingExercises) init[ex.id] = ex.starterCode;
      setCode(init);
    }).catch((e) => setError(e.message));
  }, [courseSlug]);

  if (error) return <Page title="Mastery assessment"><p role="alert" className="text-danger">{error}</p></Page>;
  if (!data) return <Page title="Mastery assessment"><p>Loading assessment…</p></Page>;
  const a = data.assessment;

  const submit = async () => {
    setSubmitting(true);
    try {
      const r = await api<typeof result & { attemptId: string }>('/api/assessments/' + courseSlug + '/submit', {
        method: 'POST',
        body: JSON.stringify({ answers, programming: code, timeSeconds: Math.round((Date.now() - startedAt) / 1000) }),
      });
      setResult(r);
      toast(r.passed ? `Passed with ${r.scorePercent}% — mastery unlocked!` : `Scored ${r.scorePercent}% — pass mark is ${r.passPercent}%. Retake when ready.`, r.passed ? 'success' : 'error');
    } catch (e) { toast((e as Error).message, 'error'); }
    finally { setSubmitting(false); }
  };

  return (
    <Page title={`${courseSlug} — Language Mastery Assessment`} subtitle={`20 conceptual + 10 code-reading + 10 debugging questions, 5 programming exercises, 1 capstone. Pass mark ${a.passPercent}%. Retakes allowed — weak topics are tracked per attempt.`}>
      {data.attempts.length > 0 && (
        <div className="card mb-4 p-4">
          <h2 className="font-bold">Previous attempts</h2>
          <ul className="mt-1 text-sm">
            {data.attempts.map((t) => (
              <li key={t.id}>{new Date(t.created_at.replace(' ', 'T')).toLocaleString()} — {t.score_percent}% {t.passed ? '✓ passed' : '✗ not passed'}{t.weak_topics && t.weak_topics !== '[]' ? ` · weak: ${JSON.parse(t.weak_topics).join(', ')}` : ''}</li>
            ))}
          </ul>
        </div>
      )}
      {result && (
        <div className={`card mb-4 p-4 ${result.passed ? 'border-success' : 'border-danger'}`}>
          <h2 className="text-lg font-bold">{result.passed ? '🎉 Passed!' : 'Not yet — keep going'}</h2>
          <p>Score: {result.scorePercent}% ({result.correct}/{result.total} items) · Pass mark: {result.passPercent}%</p>
          {result.weakTopics.length > 0 && <p className="mt-1 text-sm">Weak topics to revisit: <strong>{result.weakTopics.join(', ')}</strong></p>}
          <div className="mt-2 space-y-1">
            {result.feedback.map((f) => (
              <p key={f.questionId} className={`text-sm ${f.correct ? 'text-success' : 'text-danger'}`}>{f.correct ? '✓' : '✗'} {f.explanation}</p>
            ))}
          </div>
        </div>
      )}
      <div className="space-y-3">
        {a.questions.map((q, i) => (
          <div key={q.id} className="card p-4">
            <p className="text-sm font-semibold">{i + 1}. [{q.kind} · {q.topic}] {q.question}</p>
            {q.code && <pre className="mt-2 overflow-auto rounded-lg bg-code p-3 text-xs text-success">{q.code}</pre>}
            <div className="mt-2 space-y-1">
              {q.options.map((o, oi) => (
                <label key={oi} className="flex items-center gap-2 text-sm">
                  <input type="radio" name={q.id} checked={answers[q.id] === oi} onChange={() => setAnswers({ ...answers, [q.id]: oi })} />
                  {o}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      <h2 className="mt-6 text-lg font-bold">Programming exercises</h2>
      <div className="mt-3 space-y-4">
        {a.programmingExercises.map((ex, i) => (
          <div key={ex.id} className="card p-4">
            <p className="font-semibold">{i + 1}. {ex.title}</p>
            <p className="mt-1 text-sm">{ex.instructions}</p>
            <p className="mt-1 text-xs text-muted">Tests: {ex.tests.map((t) => t.name).join(', ')}</p>
            <div className="mt-2 min-h-[180px]">
              <Editor height="180px" language={ex.language === 'python' ? 'python' : 'typescript'} value={code[ex.id] || ''} onChange={(v) => setCode({ ...code, [ex.id]: v || '' })} theme={codeForgeTheme(theme)} beforeMount={setupCodeForgeThemes} options={{ minimap: { enabled: false }, fontSize: 13 }} />
            </div>
          </div>
        ))}
      </div>
      <div className="card mt-4 p-4">
        <h2 className="font-bold">Capstone: {a.capstone.title}</h2>
        <p className="mt-1 text-sm">{a.capstone.description}</p>
        <h3 className="mt-2 text-sm font-semibold">Requirements</h3>
        <ul className="list-disc pl-5 text-sm">{a.capstone.requirements.map((r, i) => <li key={i}>{r}</li>)}</ul>
        <h3 className="mt-2 text-sm font-semibold">Rubric</h3>
        <ul className="list-disc pl-5 text-sm">{a.capstone.rubric.map((r, i) => <li key={i}>{r}</li>)}</ul>
        <p className="mt-2 text-sm text-muted">Build the capstone as a project and submit it in the Project Academy for instructor review.</p>
      </div>
      <button className="btn-primary mt-4" onClick={submit} disabled={submitting}>{submitting ? 'Grading…' : 'Submit assessment'}</button>
      <Link className="btn-secondary ml-2" to={`/courses/${courseSlug}`}>Back to course</Link>
    </Page>
  );
}
