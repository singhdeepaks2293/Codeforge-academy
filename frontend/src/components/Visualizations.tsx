// Interactive DSA visualizations: sorting, binary search, stack/queue, BST, graph BFS/DFS, DP table.
// Each generates step frames; controls: play/pause/step/reset/speed, pseudocode beside.
import { useEffect, useMemo, useRef, useState } from 'react';

export interface VizProps { kind: string; }

function usePlayer(frames: unknown[], speedMs: number) {
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timer = useRef<number | null>(null);
  useEffect(() => {
    if (!playing) return;
    timer.current = window.setInterval(() => {
      setIdx((i) => {
        if (i >= frames.length - 1) { setPlaying(false); return i; }
        return i + 1;
      });
    }, speedMs);
    return () => { if (timer.current) window.clearInterval(timer.current); };
  }, [playing, speedMs, frames.length]);
  return { idx, setIdx, playing, setPlaying };
}

function Controls({ idx, setIdx, playing, setPlaying, total, speed, setSpeed, onReset }: {
  idx: number; setIdx: (n: number) => void; playing: boolean; setPlaying: (b: boolean) => void;
  total: number; speed: number; setSpeed: (n: number) => void; onReset: () => void;
}) {
  return (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      <button className="btn-primary" onClick={() => setPlaying(!playing)}>{playing ? '⏸ Pause' : '▶ Play'}</button>
      <button className="btn-secondary" disabled={idx <= 0} onClick={() => setIdx(idx - 1)}>← Step back</button>
      <button className="btn-secondary" disabled={idx >= total - 1} onClick={() => setIdx(idx + 1)}>Step forward →</button>
      <button className="btn-secondary" onClick={onReset}>Reset</button>
      <label className="ml-2 text-sm">Speed
        <select className="input ml-2 w-auto" value={speed} onChange={(e) => setSpeed(Number(e.target.value))}>
          <option value={1200}>Slow</option>
          <option value={600}>Medium</option>
          <option value={250}>Fast</option>
        </select>
      </label>
      <span className="text-sm text-slate-500">Step {idx + 1} / {total}</span>
    </div>
  );
}

function BarArray({ arr, highlight, done }: { arr: number[]; highlight?: number[]; done?: number[] }) {
  const max = Math.max(...arr, 1);
  return (
    <div className="flex h-40 items-end gap-1">
      {arr.map((v, i) => (
        <div key={i} className="flex-1 rounded-t" style={{
          height: `${(v / max) * 100}%`,
          background: done?.includes(i) ? '#16a34a' : highlight?.includes(i) ? '#f97316' : '#334155',
        }} title={String(v)} />
      ))}
    </div>
  );
}

function mergeSortFrames(input: number[]): { arr: number[]; hl: number[]; note: string }[] {
  const frames: { arr: number[]; hl: number[]; note: string }[] = [{ arr: [...input], hl: [], note: 'Original array' }];
  const a = [...input];
  function mergeSort(lo: number, hi: number) {
    if (hi - lo < 2) return;
    const mid = Math.floor((lo + hi) / 2);
    frames.push({ arr: [...a], hl: Array.from({ length: hi - lo }, (_, i) => lo + i), note: `Split [${lo}..${hi}) at ${mid}` });
    mergeSort(lo, mid); mergeSort(mid, hi);
    const left = a.slice(lo, mid); const right = a.slice(mid, hi);
    let i = 0, j = 0, k = lo;
    while (i < left.length && j < right.length) {
      a[k++] = left[i] <= right[j] ? left[i++] : right[j++];
      frames.push({ arr: [...a], hl: [k - 1], note: `Merged element ${a[k - 1]} into place` });
    }
    while (i < left.length) { a[k++] = left[i++]; frames.push({ arr: [...a], hl: [k - 1], note: 'Merged remaining left element' }); }
    while (j < right.length) { a[k++] = right[j++]; frames.push({ arr: [...a], hl: [k - 1], note: 'Merged remaining right element' }); }
  }
  mergeSort(0, a.length);
  frames.push({ arr: [...a], hl: [], note: 'Sorted!' });
  return frames;
}

function quickSortFrames(input: number[]): { arr: number[]; hl: number[]; note: string }[] {
  const frames: { arr: number[]; hl: number[]; note: string }[] = [{ arr: [...input], hl: [], note: 'Original array' }];
  const a = [...input];
  function qs(lo: number, hi: number) {
    if (lo >= hi) return;
    const pivot = a[hi];
    frames.push({ arr: [...a], hl: [hi], note: `Pivot = ${pivot}` });
    let i = lo;
    for (let j = lo; j < hi; j++) {
      if (a[j] < pivot) {
        [a[i], a[j]] = [a[j], a[i]];
        frames.push({ arr: [...a], hl: [i, j], note: `${a[i]} < pivot — swap into place` });
        i++;
      }
    }
    [a[i], a[hi]] = [a[hi], a[i]];
    frames.push({ arr: [...a], hl: [i], note: `Pivot placed at index ${i}` });
    qs(lo, i - 1); qs(i + 1, hi);
  }
  qs(0, a.length - 1);
  frames.push({ arr: [...a], hl: [], note: 'Sorted!' });
  return frames;
}

function binarySearchFrames(arr: number[], target: number): { lo: number; hi: number; mid: number; note: string }[] {
  const frames: { lo: number; hi: number; mid: number; note: string }[] = [];
  let lo = 0, hi = arr.length - 1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (arr[mid] === target) { frames.push({ lo, hi, mid, note: `Found ${target} at index ${mid}` }); return frames; }
    if (arr[mid] < target) { frames.push({ lo, hi, mid, note: `${arr[mid]} < ${target} — search right half` }); lo = mid + 1; }
    else { frames.push({ lo, hi, mid, note: `${arr[mid]} > ${target} — search left half` }); hi = mid - 1; }
  }
  frames.push({ lo, hi, mid: -1, note: `${target} is not in the array` });
  return frames;
}

const PSEUDO: Record<string, string> = {
  'merge-sort': 'mergeSort(arr, lo, hi):\n  if hi - lo < 2: return\n  mid = (lo + hi) / 2\n  mergeSort(arr, lo, mid)\n  mergeSort(arr, mid, hi)\n  merge(arr, lo, mid, hi)  // merge two sorted halves',
  'quick-sort': 'quickSort(arr, lo, hi):\n  if lo >= hi: return\n  p = partition(arr, lo, hi)  // pivot to final place\n  quickSort(arr, lo, p - 1)\n  quickSort(arr, p + 1, hi)',
  'binary-search': 'binarySearch(arr, target):\n  lo = 0, hi = n - 1\n  while lo <= hi:\n    mid = (lo + hi) / 2\n    if arr[mid] == target: return mid\n    if arr[mid] < target: lo = mid + 1\n    else: hi = mid - 1\n  return -1',
  'stack': 'push(x): stack.append(x)   // O(1)\npop(): return stack.pop()  // LIFO\npeek(): return stack[-1]',
  'queue': 'enqueue(x): queue.append(x)  // FIFO\ndequeue(): return queue.popleft()\nfront(): return queue[0]',
  'bst': 'insert(node, key):\n  if node is None: return new Node(key)\n  if key < node.key: node.left = insert(node.left, key)\n  else: node.right = insert(node.right, key)\n  return node',
  'graph-bfs': 'BFS(start):\n  queue = [start]; visited = {start}\n  while queue:\n    v = queue.pop(0)\n    for w in neighbours(v):\n      if w not visited: visit, enqueue(w)',
  'dp-fib': 'fib(n):\n  dp[0] = 0, dp[1] = 1\n  for i in 2..n:\n    dp[i] = dp[i-1] + dp[i-2]\n  return dp[n]',
};

const INITIAL = [38, 27, 43, 3, 9, 82, 10];

export function Visualization({ kind }: VizProps) {
  const [speed, setSpeed] = useState(600);
  const [input, setInput] = useState(INITIAL.join(', '));
  const arr = useMemo(() => {
    const parsed = input.split(',').map((s) => Number(s.trim())).filter((n) => Number.isFinite(n));
    return parsed.length ? parsed : INITIAL;
  }, [input]);
  const sortFrames = useMemo(() => (kind === 'quick-sort' ? quickSortFrames(arr) : mergeSortFrames(arr)), [arr, kind]);
  const bsFrames = useMemo(() => binarySearchFrames([...arr].sort((a, b) => a - b), 27), [arr]);
  const { idx, setIdx, playing, setPlaying } = usePlayer(kind === 'binary-search' ? bsFrames : sortFrames, speed);
  const [stack, setStack] = useState<number[]>([10, 20, 30]);
  const [queue, setQueue] = useState<number[]>([10, 20, 30]);
  const [bstKeys, setBstKeys] = useState<number[]>([50, 30, 70, 20, 40, 60, 80]);
  const [fibN, setFibN] = useState(8);
  const fibTable = useMemo(() => {
    const dp = [0, 1];
    for (let i = 2; i <= fibN; i++) dp[i] = dp[i - 1] + dp[i - 2];
    return dp;
  }, [fibN]);
  const [bfsStep, setBfsStep] = useState(0);
  const graphEdges: Record<number, number[]> = { 0: [1, 2], 1: [0, 3, 4], 2: [0, 5], 3: [1], 4: [1, 5], 5: [2, 4] };
  const bfsOrder = useMemo(() => {
    const visited = [0]; const q = [0];
    while (q.length) { const v = q.shift()!; for (const w of graphEdges[v] || []) if (!visited.includes(w)) { visited.push(w); q.push(w); } }
    return visited;
  }, []);

  const reset = () => { setIdx(0); setPlaying(false); };

  return (
    <div className="card p-4">
      <h3 className="text-lg font-bold capitalize">{kind.replace(/-/g, ' ')} visualization</h3>
      <div className="mt-3 grid gap-4 md:grid-cols-2">
        <div>
          {(kind === 'merge-sort' || kind === 'quick-sort') && (
            <>
              <label className="label">Array (comma-separated)</label>
              <input className="input" value={input} onChange={(e) => { setInput(e.target.value); reset(); }} />
              <div className="mt-3"><BarArray arr={sortFrames[idx].arr} highlight={sortFrames[idx].hl} /></div>
              <p className="mt-2 text-sm">{sortFrames[idx].note}</p>
              <Controls idx={idx} setIdx={setIdx} playing={playing} setPlaying={setPlaying} total={sortFrames.length} speed={speed} setSpeed={setSpeed} onReset={reset} />
            </>
          )}
          {kind === 'binary-search' && (
            <>
              <p className="text-sm text-slate-500">Searching for 27 in the sorted array.</p>
              <div className="mt-3 flex gap-1">
                {[...arr].sort((a, b) => a - b).map((v, i) => {
                  const f = bsFrames[Math.min(idx, bsFrames.length - 1)];
                  const active = i >= f.lo && i <= f.hi;
                  const isMid = i === f.mid;
                  return (
                    <div key={i} className={`flex h-12 w-12 items-center justify-center rounded font-mono font-bold ${isMid ? 'bg-brand-600 text-white' : active ? 'bg-slate-700 text-white dark:bg-slate-600' : 'bg-slate-200 text-slate-400 dark:bg-navy-800'}`}>{v}</div>
                  );
                })}
              </div>
              <p className="mt-2 text-sm">{bsFrames[Math.min(idx, bsFrames.length - 1)].note}</p>
              <Controls idx={idx} setIdx={setIdx} playing={playing} setPlaying={setPlaying} total={bsFrames.length} speed={speed} setSpeed={setSpeed} onReset={reset} />
            </>
          )}
          {kind === 'stack' && (
            <>
              <div className="flex flex-col-reverse gap-1">
                {stack.map((v, i) => (
                  <div key={i} className={`rounded px-3 py-2 text-center font-mono font-bold ${i === stack.length - 1 ? 'bg-brand-600 text-white' : 'bg-slate-700 text-white dark:bg-slate-600'}`}>{v}{i === stack.length - 1 ? ' ← top' : ''}</div>
                ))}
                {stack.length === 0 && <p className="text-sm text-slate-500">Stack is empty.</p>}
              </div>
              <div className="mt-3 flex gap-2">
                <button className="btn-primary" onClick={() => setStack([...stack, Math.floor(Math.random() * 90) + 10])}>Push</button>
                <button className="btn-secondary" onClick={() => setStack(stack.slice(0, -1))}>Pop</button>
                <button className="btn-secondary" onClick={() => setStack([10, 20, 30])}>Reset</button>
              </div>
            </>
          )}
          {kind === 'queue' && (
            <>
              <div className="flex gap-1">
                {queue.map((v, i) => (
                  <div key={i} className={`rounded px-3 py-2 font-mono font-bold ${i === 0 ? 'bg-brand-600 text-white' : 'bg-slate-700 text-white dark:bg-slate-600'}`}>{v}{i === 0 ? ' ← front' : ''}</div>
                ))}
                {queue.length === 0 && <p className="text-sm text-slate-500">Queue is empty.</p>}
              </div>
              <div className="mt-3 flex gap-2">
                <button className="btn-primary" onClick={() => setQueue([...queue, Math.floor(Math.random() * 90) + 10])}>Enqueue</button>
                <button className="btn-secondary" onClick={() => setQueue(queue.slice(1))}>Dequeue</button>
                <button className="btn-secondary" onClick={() => setQueue([10, 20, 30])}>Reset</button>
              </div>
            </>
          )}
          {kind === 'bst' && (
            <>
              <p className="text-sm">In-order traversal (always sorted): <strong className="font-mono">{[...bstKeys].sort((a, b) => a - b).join(', ')}</strong></p>
              <div className="mt-2 flex flex-wrap gap-1">
                {bstKeys.map((v) => (
                  <span key={v} className="rounded-full bg-slate-700 px-3 py-1 font-mono text-sm text-white dark:bg-slate-600">{v}</span>
                ))}
              </div>
              <div className="mt-3 flex gap-2">
                <button className="btn-primary" onClick={() => { const v = Math.floor(Math.random() * 90) + 5; if (!bstKeys.includes(v)) setBstKeys([...bstKeys, v]); }}>Insert random key</button>
                <button className="btn-secondary" onClick={() => setBstKeys([50, 30, 70, 20, 40, 60, 80])}>Reset</button>
              </div>
              <p className="mt-2 text-sm text-slate-500">Keys smaller than a node go left, larger go right — so search, insert and delete all run in O(log n) on a balanced tree.</p>
            </>
          )}
          {kind === 'graph-bfs' && (
            <>
              <p className="text-sm">BFS order from node 0: <strong className="font-mono">{bfsOrder.slice(0, bfsStep + 1).join(' → ')}</strong></p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {[0, 1, 2, 3, 4, 5].map((v) => (
                  <div key={v} className={`rounded-lg px-3 py-2 text-center font-mono font-bold ${bfsOrder.slice(0, bfsStep + 1).includes(v) ? 'bg-brand-600 text-white' : 'bg-slate-200 dark:bg-navy-800'}`}>Node {v}<div className="text-xs font-normal">→ {(graphEdges[v] || []).join(', ')}</div></div>
                ))}
              </div>
              <div className="mt-3 flex gap-2">
                <button className="btn-primary" disabled={bfsStep >= bfsOrder.length - 1} onClick={() => setBfsStep(bfsStep + 1)}>Step forward →</button>
                <button className="btn-secondary" onClick={() => setBfsStep(0)}>Reset</button>
              </div>
            </>
          )}
          {kind === 'dp-fib' && (
            <>
              <label className="label">Compute fib(n), n = {fibN}</label>
              <input type="range" min={2} max={12} value={fibN} onChange={(e) => setFibN(Number(e.target.value))} className="w-full" />
              <div className="mt-2 flex flex-wrap gap-1">
                {fibTable.map((v, i) => (
                  <div key={i} className="rounded bg-slate-700 px-2 py-1 text-center font-mono text-xs text-white dark:bg-slate-600">dp[{i}]<br /><strong>{v}</strong></div>
                ))}
              </div>
              <p className="mt-2 text-sm">Each cell is built from the two before it — memoization turns exponential recursion into O(n) time.</p>
            </>
          )}
        </div>
        <div>
          <h4 className="font-semibold">Pseudocode</h4>
          <pre className="mt-2 overflow-auto rounded-lg bg-navy-950 p-3 text-xs text-green-300">{PSEUDO[kind] || 'See the lesson for pseudocode.'}</pre>
          <h4 className="mt-4 font-semibold">How to read this</h4>
          <p className="mt-1 text-sm text-slate-500">Orange marks the elements being compared or moved; green marks finished positions. Step through slowly the first time, then replay at full speed.</p>
        </div>
      </div>
    </div>
  );
}
