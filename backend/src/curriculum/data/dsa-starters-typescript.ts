// TypeScript starters for CodeForge Academy DSA problems.
//
// One complete, runnable TypeScript program per problem, keyed by problem id.
// Each starter reads the same stdin format as the Python starter in dsa.ts
// and prints byte-identical stdout (same fmt rules: space-separated values,
// 'true'/'false' for booleans, tree level-order with 'null' tokens and
// trailing 'null' trimmed, '' for null/empty, multi-row outputs joined
// with '\n'). Programs run transpiled with the bundled TypeScript compiler
// under Node with CommonJS require, so they use `require('fs')` and no
// ES-module import syntax or top-level await.
export const DSA_STARTERS_TYPESCRIPT: Record<string, string> = {
  "dsa-two-sum": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(nums: number[], target: number) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need), i];
    seen.set(nums[i], i);
  }
  return [-1, -1];
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const nums = data.slice(1, 1 + n).map(Number); const target = parseInt(data[1 + n], 10);
  console.log(fmt(solve(nums, target)));
}
`,
  "dsa-best-time-to-buy-sell-stock": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(prices: number[]) {
  let best = 0;
  let low = prices[0];
  for (let i = 1; i < prices.length; i++) {
    best = Math.max(best, prices[i] - low);
    low = Math.min(low, prices[i]);
  }
  return best;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const nums = data.slice(1, 1 + n).map(Number);
  console.log(fmt(solve(nums)));
}
`,
  "dsa-maximum-subarray": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(nums: number[]) {
  let best = nums[0];
  let cur = nums[0];
  for (let i = 1; i < nums.length; i++) {
    cur = Math.max(nums[i], cur + nums[i]);
    best = Math.max(best, cur);
  }
  return best;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const nums = data.slice(1, 1 + n).map(Number);
  console.log(fmt(solve(nums)));
}
`,
  "dsa-contains-duplicate": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(nums: number[]) {
  return new Set(nums).size !== nums.length;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const nums = data.slice(1, 1 + n).map(Number);
  console.log(fmt(solve(nums)));
}
`,
  "dsa-product-of-array-except-self": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(nums: number[]) {
  const n = nums.length;
  const out = new Array(n).fill(1);
  let left = 1;
  for (let i = 0; i < n; i++) { out[i] = left; left *= nums[i]; }
  let right = 1;
  for (let i = n - 1; i >= 0; i--) { out[i] *= right; right *= nums[i]; }
  return out;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const nums = data.slice(1, 1 + n).map(Number);
  console.log(fmt(solve(nums)));
}
`,
  "dsa-rotate-array": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(nums: number[], k: number) {
  const n = nums.length;
  if (n === 0) return nums;
  k = k % n;
  const part = nums.splice(n - k);
  return part.concat(nums);
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const nums = data.slice(1, 1 + n).map(Number); const k = parseInt(data[1 + n], 10);
  console.log(fmt(solve(nums, k)));
}
`,
  "dsa-move-zeroes": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(nums: number[]) {
  let pos = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) { nums[pos] = nums[i]; pos++; }
  }
  for (let i = pos; i < nums.length; i++) nums[i] = 0;
  return nums;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const nums = data.slice(1, 1 + n).map(Number);
  console.log(fmt(solve(nums)));
}
`,
  "dsa-majority-element": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(nums: number[]) {
  let cand = null;
  let count = 0;
  for (const x of nums) {
    if (count === 0) { cand = x; count = 1; }
    else if (x === cand) count++;
    else count--;
  }
  return cand;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const nums = data.slice(1, 1 + n).map(Number);
  console.log(fmt(solve(nums)));
}
`,
  "dsa-missing-number": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(nums: number[]) {
  const n = nums.length;
  return (n * (n + 1)) / 2 - nums.reduce(function (a, b) { return a + b; }, 0);
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const nums = data.slice(1, 1 + n).map(Number);
  console.log(fmt(solve(nums)));
}
`,
  "dsa-find-duplicate-number": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(nums: number[]) {
  let slow = nums[0];
  let fast = nums[0];
  while (true) {
    slow = nums[slow];
    fast = nums[nums[fast]];
    if (slow === fast) break;
  }
  slow = nums[0];
  while (slow !== fast) {
    slow = nums[slow];
    fast = nums[fast];
  }
  return slow;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const nums = data.slice(1, 1 + n).map(Number);
  console.log(fmt(solve(nums)));
}
`,
  "dsa-merge-sorted-array": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(a: number[], b: number[]) {
  const out = [];
  let i = 0, j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] <= b[j]) { out.push(a[i]); i++; }
    else { out.push(b[j]); j++; }
  }
  while (i < a.length) { out.push(a[i]); i++; }
  while (j < b.length) { out.push(b[j]); j++; }
  return out;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const a = data.slice(1, 1 + n).map(Number); const m = parseInt(data[1 + n], 10); const b = data.slice(2 + n, 2 + n + m).map(Number);
  console.log(fmt(solve(a, b)));
}
`,
  "dsa-maximum-product-subarray": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(nums: number[]) {
  let best = nums[0];
  let curMax = nums[0];
  let curMin = nums[0];
  for (let i = 1; i < nums.length; i++) {
    const x = nums[i];
    if (x < 0) { const t = curMax; curMax = curMin; curMin = t; }
    curMax = Math.max(x, curMax * x);
    curMin = Math.min(x, curMin * x);
    best = Math.max(best, curMax);
  }
  return best;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const nums = data.slice(1, 1 + n).map(Number);
  console.log(fmt(solve(nums)));
}
`,
  "dsa-trapping-rain-water": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(height: number[]) {
  let left = 0, right = height.length - 1;
  let leftMax = 0, rightMax = 0, water = 0;
  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] >= leftMax) leftMax = height[left];
      else water += leftMax - height[left];
      left++;
    } else {
      if (height[right] >= rightMax) rightMax = height[right];
      else water += rightMax - height[right];
      right--;
    }
  }
  return water;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const nums = data.slice(1, 1 + n).map(Number);
  console.log(fmt(solve(nums)));
}
`,
  "dsa-jump-game": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(nums: number[]) {
  let reach = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > reach) return false;
    reach = Math.max(reach, i + nums[i]);
  }
  return true;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const nums = data.slice(1, 1 + n).map(Number);
  console.log(fmt(solve(nums)));
}
`,
  "dsa-jump-game-ii": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(nums: number[]) {
  let jumps = 0, curEnd = 0, farthest = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    farthest = Math.max(farthest, i + nums[i]);
    if (i === curEnd) { jumps++; curEnd = farthest; }
  }
  return jumps;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const nums = data.slice(1, 1 + n).map(Number);
  console.log(fmt(solve(nums)));
}
`,
  "dsa-subarray-sum-equals-k": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(nums: number[], k: number) {
  const counts = new Map([[0, 1]]);
  let prefix = 0, ans = 0;
  for (const x of nums) {
    prefix += x;
    ans += counts.get(prefix - k) || 0;
    counts.set(prefix, (counts.get(prefix) || 0) + 1);
  }
  return ans;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const nums = data.slice(1, 1 + n).map(Number); const k = parseInt(data[1 + n], 10);
  console.log(fmt(solve(nums, k)));
}
`,
  "dsa-sort-colors": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(nums: number[]) {
  let low = 0, mid = 0, high = nums.length - 1;
  while (mid <= high) {
    if (nums[mid] === 0) { const t = nums[low]; nums[low] = nums[mid]; nums[mid] = t; low++; mid++; }
    else if (nums[mid] === 1) mid++;
    else { const t = nums[mid]; nums[mid] = nums[high]; nums[high] = t; high--; }
  }
  return nums;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const nums = data.slice(1, 1 + n).map(Number);
  console.log(fmt(solve(nums)));
}
`,
  "dsa-first-missing-positive": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(nums: number[]) {
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    while (nums[i] >= 1 && nums[i] <= n && nums[nums[i] - 1] !== nums[i]) {
      const t = nums[nums[i] - 1]; nums[nums[i] - 1] = nums[i]; nums[i] = t;
    }
  }
  for (let i = 0; i < n; i++) {
    if (nums[i] !== i + 1) return i + 1;
  }
  return n + 1;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const nums = data.slice(1, 1 + n).map(Number);
  console.log(fmt(solve(nums)));
}
`,
  "dsa-valid-palindrome": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(s: string) {
  const chars = s.toLowerCase().replace(/[^a-z0-9]/g, '').split('');
  return chars.join('') === chars.reverse().join('');
}
const raw = fs.readFileSync(0, 'utf-8');
const s = raw.trim();
console.log(fmt(solve(s)));
`,
  "dsa-valid-anagram": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(s: string, t: string) {
  if (s.length !== t.length) return false;
  const count = {};
  for (const c of s) count[c] = (count[c] || 0) + 1;
  for (const c of t) {
    if (!count[c]) return false;
    count[c]--;
  }
  return true;
}
const lines = fs.readFileSync(0, 'utf-8').replace(/\\r/g, '').split('\\n');
const s1 = (lines[0] || "").trim(); const s2 = (lines[1] || "").trim();
console.log(fmt(solve(s1, s2)));
`,
  "dsa-longest-substring-without-repeating": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(s: string) {
  const last = new Map();
  let best = 0, start = 0;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (last.has(c) && last.get(c) >= start) start = last.get(c) + 1;
    last.set(c, i);
    best = Math.max(best, i - start + 1);
  }
  return best;
}
const raw = fs.readFileSync(0, 'utf-8');
const s = raw.trim();
console.log(fmt(solve(s)));
`,
  "dsa-longest-palindromic-substring": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(s: string) {
  let best = s[0];
  function expand(l, r) {
    while (l >= 0 && r < s.length && s[l] === s[r]) { l--; r++; }
    return s.slice(l + 1, r);
  }
  for (let i = 0; i < s.length; i++) {
    const c1 = expand(i, i), c2 = expand(i, i + 1);
    if (c1.length > best.length) best = c1;
    if (c2.length > best.length) best = c2;
  }
  return best;
}
const raw = fs.readFileSync(0, 'utf-8');
const s = raw.trim();
console.log(fmt(solve(s)));
`,
  "dsa-group-anagrams": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(words: string[]) {
  const groups = new Map();
  for (const w of words) {
    const key = w.split('').sort().join('');
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(w);
  }
  const out = Array.from(groups.values()).map(function (g) { return g.sort(); });
  out.sort(function (a, b) { return a[0] < b[0] ? -1 : 1; });
  return out;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const words = data.slice(1, 1 + n);
  console.log(fmt(solve(words)));
}
`,
  "dsa-valid-parentheses": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(s: string) {
  const stack = [];
  const pairs = { ')': '(', ']': '[', '}': '{' };
  for (const c of s) {
    if (c === '(' || c === '[' || c === '{') stack.push(c);
    else if (!stack.length || stack.pop() !== pairs[c]) return false;
  }
  return stack.length === 0;
}
const raw = fs.readFileSync(0, 'utf-8');
const s = raw.trim();
console.log(fmt(solve(s)));
`,
  "dsa-string-to-integer-atoi": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(s: string) {
  let i = 0;
  const n = s.length;
  while (i < n && s[i] === ' ') i++;
  let sign = 1;
  if (i < n && (s[i] === '+' || s[i] === '-')) { sign = s[i] === '-' ? -1 : 1; i++; }
  let num = 0;
  while (i < n && s[i] >= '0' && s[i] <= '9') { num = num * 10 + (s.charCodeAt(i) - 48); i++; }
  num *= sign;
  return Math.max(-2147483648, Math.min(2147483647, num));
}
const raw = fs.readFileSync(0, 'utf-8');
const s = raw.trim();
console.log(fmt(solve(s)));
`,
  "dsa-longest-common-prefix": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(words: string[]) {
  if (!words.length) return '';
  let prefix = words[0];
  for (let i = 1; i < words.length; i++) {
    while (words[i].indexOf(prefix) !== 0) {
      prefix = prefix.slice(0, -1);
      if (!prefix) return '';
    }
  }
  return prefix;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const words = data.slice(1, 1 + n);
  console.log(fmt(solve(words)));
}
`,
  "dsa-reverse-words-in-string": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(s: string) {
  return s.trim().split(/\\s+/).filter(function (x) { return x !== ''; }).reverse().join(' ');
}
const raw = fs.readFileSync(0, 'utf-8');
const s = raw.trim();
console.log(fmt(solve(s)));
`,
  "dsa-implement-strstr": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(haystack: string, needle: string) {
  return haystack.indexOf(needle);
}
const lines = fs.readFileSync(0, 'utf-8').replace(/\\r/g, '').split('\\n');
const s1 = (lines[0] || "").trim(); const s2 = (lines[1] || "").trim();
console.log(fmt(solve(s1, s2)));
`,
  "dsa-count-and-say": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(n: number) {
  let cur = '1';
  for (let step = 1; step < n; step++) {
    let nxt = '';
    let i = 0;
    while (i < cur.length) {
      let j = i;
      while (j < cur.length && cur[j] === cur[i]) j++;
      nxt += String(j - i) + cur[i];
      i = j;
    }
    cur = nxt;
  }
  return cur;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10);
  console.log(fmt(solve(n)));
}
`,
  "dsa-zigzag-conversion": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(s: string, k: number) {
  if (k === 1 || k >= s.length) return s;
  const rows = new Array(k).fill('');
  let r = 0, step = 1;
  for (const c of s) {
    rows[r] += c;
    if (r === 0) step = 1;
    else if (r === k - 1) step = -1;
    r += step;
  }
  return rows.join('');
}
const lines = fs.readFileSync(0, 'utf-8').replace(/\\r/g, '').split('\\n');
const s = (lines[0] || "").trim(); const k = parseInt(lines[1] || "0", 10);
console.log(fmt(solve(s, k)));
`,
  "dsa-minimum-window-substring": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(s: string, t: string) {
  const need = {};
  for (const c of t) need[c] = (need[c] || 0) + 1;
  let missing = t.length;
  let left = 0;
  let best = '';
  for (let right = 0; right < s.length; right++) {
    const c = s[right];
    if ((need[c] || 0) > 0) missing--;
    need[c] = (need[c] || 0) - 1;
    while (missing === 0) {
      if (!best || right - left + 1 < best.length) best = s.slice(left, right + 1);
      need[s[left]] = (need[s[left]] || 0) + 1;
      if (need[s[left]] > 0) missing++;
      left++;
    }
  }
  return best;
}
const lines = fs.readFileSync(0, 'utf-8').replace(/\\r/g, '').split('\\n');
const s1 = (lines[0] || "").trim(); const s2 = (lines[1] || "").trim();
console.log(fmt(solve(s1, s2)));
`,
  "dsa-longest-repeating-character-replacement": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(s: string, k: number) {
  const counts = {};
  let best = 0, left = 0;
  for (let right = 0; right < s.length; right++) {
    counts[s[right]] = (counts[s[right]] || 0) + 1;
    let maxCount = 0;
    for (const key in counts) maxCount = Math.max(maxCount, counts[key]);
    while ((right - left + 1) - maxCount > k) {
      counts[s[left]]--;
      left++;
      maxCount = 0;
      for (const key in counts) maxCount = Math.max(maxCount, counts[key]);
    }
    best = Math.max(best, right - left + 1);
  }
  return best;
}
const lines = fs.readFileSync(0, 'utf-8').replace(/\\r/g, '').split('\\n');
const s = (lines[0] || "").trim(); const k = parseInt(lines[1] || "0", 10);
console.log(fmt(solve(s, k)));
`,
  "dsa-first-unique-character": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(s: string) {
  const counts = {};
  for (const c of s) counts[c] = (counts[c] || 0) + 1;
  for (let i = 0; i < s.length; i++) {
    if (counts[s[i]] === 1) return i;
  }
  return -1;
}
const raw = fs.readFileSync(0, 'utf-8');
const s = raw.trim();
console.log(fmt(solve(s)));
`,
  "dsa-intersection-of-two-arrays": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(a: number[], b: number[]) {
  const setB = new Set(b);
  const seen = new Set();
  const out = [];
  for (const x of a) {
    if (setB.has(x) && !seen.has(x)) { seen.add(x); out.push(x); }
  }
  return out.sort(function (x, y) { return x - y; });
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const a = data.slice(1, 1 + n).map(Number); const m = parseInt(data[1 + n], 10); const b = data.slice(2 + n, 2 + n + m).map(Number);
  console.log(fmt(solve(a, b)));
}
`,
  "dsa-happy-number": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(n: number) {
  const seen = new Set();
  while (n !== 1 && !seen.has(n)) {
    seen.add(n);
    let sum = 0;
    let x = n;
    while (x > 0) { const d = x % 10; sum += d * d; x = Math.floor(x / 10); }
    n = sum;
  }
  return n === 1;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10);
  console.log(fmt(solve(n)));
}
`,
  "dsa-isomorphic-strings": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(s: string, t: string) {
  if (s.length !== t.length) return false;
  const m1 = {}, m2 = {};
  for (let i = 0; i < s.length; i++) {
    const a = s[i], b = t[i];
    if ((m1[a] || b) !== b || (m2[b] || a) !== a) return false;
    m1[a] = b; m2[b] = a;
  }
  return true;
}
const lines = fs.readFileSync(0, 'utf-8').replace(/\\r/g, '').split('\\n');
const s1 = (lines[0] || "").trim(); const s2 = (lines[1] || "").trim();
console.log(fmt(solve(s1, s2)));
`,
  "dsa-word-pattern": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(pattern: string, s: string) {
  const words = s.split(/\\s+/).filter(function (x) { return x !== ''; });
  if (words.length !== pattern.length) return false;
  const p2w = {}, w2p = {};
  for (let i = 0; i < pattern.length; i++) {
    const p = pattern[i], w = words[i];
    if ((p2w[p] || w) !== w || (w2p[w] || p) !== p) return false;
    p2w[p] = w; w2p[w] = p;
  }
  return true;
}
const lines = fs.readFileSync(0, 'utf-8').replace(/\\r/g, '').split('\\n');
const s1 = (lines[0] || "").trim(); const s2 = (lines[1] || "").trim();
console.log(fmt(solve(s1, s2)));
`,
  "dsa-ransom-note": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(note: string, magazine: string) {
  const have = {};
  for (const c of magazine) have[c] = (have[c] || 0) + 1;
  for (const c of note) {
    if (!have[c]) return false;
    have[c]--;
  }
  return true;
}
const lines = fs.readFileSync(0, 'utf-8').replace(/\\r/g, '').split('\\n');
const s1 = (lines[0] || "").trim(); const s2 = (lines[1] || "").trim();
console.log(fmt(solve(s1, s2)));
`,
  "dsa-longest-consecutive-sequence": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(nums: number[]) {
  const s = new Set(nums);
  let best = 0;
  for (const x of s) {
    if (!s.has(x - 1)) {
      let cur = x, length = 1;
      while (s.has(cur + 1)) { cur++; length++; }
      best = Math.max(best, length);
    }
  }
  return best;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const nums = data.slice(1, 1 + n).map(Number);
  console.log(fmt(solve(nums)));
}
`,
  "dsa-top-k-frequent-elements": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(nums: number[], k: number) {
  const counts = new Map();
  for (const x of nums) counts.set(x, (counts.get(x) || 0) + 1);
  const ranked = Array.from(counts.entries()).sort(function (a, b) {
    if (b[1] !== a[1]) return b[1] - a[1];
    return b[0] - a[0];
  });
  return ranked.slice(0, k).map(function (e) { return e[0]; });
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const nums = data.slice(1, 1 + n).map(Number); const k = parseInt(data[1 + n], 10);
  console.log(fmt(solve(nums, k)));
}
`,
  "dsa-valid-sudoku": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(grid: string[][]) {
  const rows = [], cols = [], boxes = [];
  for (let i = 0; i < 9; i++) { rows.push(new Set()); cols.push(new Set()); boxes.push(new Set()); }
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const v = grid[i][j];
      if (v === '.') continue;
      const b = Math.floor(i / 3) * 3 + Math.floor(j / 3);
      if (rows[i].has(v) || cols[j].has(v) || boxes[b].has(v)) return false;
      rows[i].add(v); cols[j].add(v); boxes[b].add(v);
    }
  }
  return true;
}
const lines = fs.readFileSync(0, 'utf-8').replace(/\\r/g, '').split('\\n');
const parts = lines[0].trim().split(/\\s+/); const r = parseInt(parts[0], 10); const c = parseInt(parts[1], 10); const grid: string[][] = []; for (let i = 0; i < r; i++) grid.push(lines[1 + i].replace(/\\s/g, "").split(""));
console.log(fmt(solve(grid)));
`,
  "dsa-contains-duplicate-ii": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(nums: number[], k: number) {
  const last = new Map();
  for (let i = 0; i < nums.length; i++) {
    const x = nums[i];
    if (last.has(x) && i - last.get(x) <= k) return true;
    last.set(x, i);
  }
  return false;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const nums = data.slice(1, 1 + n).map(Number); const k = parseInt(data[1 + n], 10);
  console.log(fmt(solve(nums, k)));
}
`,
  "dsa-subarray-sum-divisible-by-k": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(nums: number[], k: number) {
  const counts = new Map([[0, 1]]);
  let prefix = 0, ans = 0;
  for (const x of nums) {
    prefix = ((prefix + x) % k + k) % k;
    ans += counts.get(prefix) || 0;
    counts.set(prefix, (counts.get(prefix) || 0) + 1);
  }
  return ans;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const nums = data.slice(1, 1 + n).map(Number); const k = parseInt(data[1 + n], 10);
  console.log(fmt(solve(nums, k)));
}
`,
  "dsa-find-all-anagrams-in-string": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(s: string, p: string) {
  const need = {};
  for (const c of p) need[c] = (need[c] || 0) + 1;
  const window = {};
  const out = [];
  function equal() {
    const keys = new Set(Object.keys(need).concat(Object.keys(window)));
    for (const k of keys) if ((need[k] || 0) !== (window[k] || 0)) return false;
    return true;
  }
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    window[c] = (window[c] || 0) + 1;
    if (i >= p.length) {
      const left = s[i - p.length];
      window[left]--;
      if (window[left] === 0) delete window[left];
    }
    if (equal()) out.push(i - p.length + 1);
  }
  return out;
}
const lines = fs.readFileSync(0, 'utf-8').replace(/\\r/g, '').split('\\n');
const s1 = (lines[0] || "").trim(); const s2 = (lines[1] || "").trim();
console.log(fmt(solve(s1, s2)));
`,
  "dsa-two-sum-ii": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(nums: number[], target: number) {
  let left = 0, right = nums.length - 1;
  while (left < right) {
    const total = nums[left] + nums[right];
    if (total === target) return [left + 1, right + 1];
    if (total < target) left++;
    else right--;
  }
  return [-1, -1];
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const nums = data.slice(1, 1 + n).map(Number); const target = parseInt(data[1 + n], 10);
  console.log(fmt(solve(nums, target)));
}
`,
  "dsa-container-with-most-water": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(height: number[]) {
  let left = 0, right = height.length - 1, best = 0;
  while (left < right) {
    const area = Math.min(height[left], height[right]) * (right - left);
    best = Math.max(best, area);
    if (height[left] < height[right]) left++;
    else right--;
  }
  return best;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const nums = data.slice(1, 1 + n).map(Number);
  console.log(fmt(solve(nums)));
}
`,
  "dsa-three-sum": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(nums: number[]) {
  nums = nums.slice().sort(function (a, b) { return a - b; });
  const out = [];
  const n = nums.length;
  for (let i = 0; i < n - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let left = i + 1, right = n - 1;
    while (left < right) {
      const total = nums[i] + nums[left] + nums[right];
      if (total === 0) {
        out.push([nums[i], nums[left], nums[right]]);
        left++; right--;
        while (left < right && nums[left] === nums[left - 1]) left++;
        while (left < right && nums[right] === nums[right + 1]) right--;
      } else if (total < 0) left++;
      else right--;
    }
  }
  return out;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const nums = data.slice(1, 1 + n).map(Number);
  console.log(fmt(solve(nums)));
}
`,
  "dsa-remove-duplicates-sorted": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(nums: number[]) {
  if (!nums.length) return nums;
  let write = 1;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[write - 1]) { nums[write] = nums[i]; write++; }
  }
  return nums.slice(0, write);
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const nums = data.slice(1, 1 + n).map(Number);
  console.log(fmt(solve(nums)));
}
`,
  "dsa-squares-of-sorted-array": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(nums: number[]) {
  const n = nums.length;
  const out = new Array(n).fill(0);
  let left = 0, right = n - 1, pos = n - 1;
  while (left <= right) {
    if (Math.abs(nums[left]) > Math.abs(nums[right])) { out[pos] = nums[left] * nums[left]; left++; }
    else { out[pos] = nums[right] * nums[right]; right--; }
    pos--;
  }
  return out;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const nums = data.slice(1, 1 + n).map(Number);
  console.log(fmt(solve(nums)));
}
`,
  "dsa-valid-palindrome-ii": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(s: string) {
  function isPal(l, r) {
    while (l < r) {
      if (s[l] !== s[r]) return false;
      l++; r--;
    }
    return true;
  }
  let left = 0, right = s.length - 1;
  while (left < right) {
    if (s[left] !== s[right]) return isPal(left + 1, right) || isPal(left, right - 1);
    left++; right--;
  }
  return true;
}
const raw = fs.readFileSync(0, 'utf-8');
const s = raw.trim();
console.log(fmt(solve(s)));
`,
  "dsa-three-sum-closest": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(nums: number[], target: number) {
  nums = nums.slice().sort(function (a, b) { return a - b; });
  let best = nums[0] + nums[1] + nums[2];
  const n = nums.length;
  for (let i = 0; i < n - 2; i++) {
    let left = i + 1, right = n - 1;
    while (left < right) {
      const total = nums[i] + nums[left] + nums[right];
      if (Math.abs(total - target) < Math.abs(best - target)) best = total;
      if (total < target) left++;
      else if (total > target) right--;
      else return total;
    }
  }
  return best;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const nums = data.slice(1, 1 + n).map(Number); const target = parseInt(data[1 + n], 10);
  console.log(fmt(solve(nums, target)));
}
`,
  "dsa-four-sum": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(nums: number[], target: number) {
  nums = nums.slice().sort(function (a, b) { return a - b; });
  const out = [];
  const n = nums.length;
  for (let i = 0; i < n - 3; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    for (let j = i + 1; j < n - 2; j++) {
      if (j > i + 1 && nums[j] === nums[j - 1]) continue;
      let left = j + 1, right = n - 1;
      while (left < right) {
        const total = nums[i] + nums[j] + nums[left] + nums[right];
        if (total === target) {
          out.push([nums[i], nums[j], nums[left], nums[right]]);
          left++; right--;
          while (left < right && nums[left] === nums[left - 1]) left++;
          while (left < right && nums[right] === nums[right + 1]) right--;
        } else if (total < target) left++;
        else right--;
      }
    }
  }
  return out;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const nums = data.slice(1, 1 + n).map(Number); const target = parseInt(data[1 + n], 10);
  console.log(fmt(solve(nums, target)));
}
`,
  "dsa-sort-array-by-parity": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(nums: number[]) {
  const evens = nums.filter(function (x) { return x % 2 === 0; });
  const odds = nums.filter(function (x) { return x % 2 === 1; });
  return evens.concat(odds);
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const nums = data.slice(1, 1 + n).map(Number);
  console.log(fmt(solve(nums)));
}
`,
  "dsa-remove-element": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(nums: number[], val: number) {
  let write = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) { nums[write] = nums[i]; write++; }
  }
  return nums.slice(0, write);
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const nums = data.slice(1, 1 + n).map(Number); const k = parseInt(data[1 + n], 10);
  console.log(fmt(solve(nums, k)));
}
`,
  "dsa-max-sum-subarray-size-k": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(nums: number[], k: number) {
  let window = 0;
  for (let i = 0; i < k; i++) window += nums[i];
  let best = window;
  for (let i = k; i < nums.length; i++) {
    window += nums[i] - nums[i - k];
    best = Math.max(best, window);
  }
  return best;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const nums = data.slice(1, 1 + n).map(Number); const k = parseInt(data[1 + n], 10);
  console.log(fmt(solve(nums, k)));
}
`,
  "dsa-longest-substring-k-distinct": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(s: string, k: number) {
  const counts = {};
  let distinct = 0, best = 0, left = 0;
  for (let right = 0; right < s.length; right++) {
    const c = s[right];
    if (!counts[c]) distinct++;
    counts[c] = (counts[c] || 0) + 1;
    while (distinct > k) {
      counts[s[left]]--;
      if (counts[s[left]] === 0) distinct--;
      left++;
    }
    best = Math.max(best, right - left + 1);
  }
  return best;
}
const lines = fs.readFileSync(0, 'utf-8').replace(/\\r/g, '').split('\\n');
const s = (lines[0] || "").trim(); const k = parseInt(lines[1] || "0", 10);
console.log(fmt(solve(s, k)));
`,
  "dsa-minimum-size-subarray-sum": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(nums: number[], target: number) {
  let best = Infinity, left = 0, total = 0;
  for (let right = 0; right < nums.length; right++) {
    total += nums[right];
    while (total >= target) {
      best = Math.min(best, right - left + 1);
      total -= nums[left];
      left++;
    }
  }
  return best === Infinity ? 0 : best;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const nums = data.slice(1, 1 + n).map(Number); const target = parseInt(data[1 + n], 10);
  console.log(fmt(solve(nums, target)));
}
`,
  "dsa-permutation-in-string": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(s1: string, s2: string) {
  const need = {};
  for (const c of s1) need[c] = (need[c] || 0) + 1;
  const window = {};
  const k = s1.length;
  function equal() {
    const keys = new Set(Object.keys(need).concat(Object.keys(window)));
    for (const k2 of keys) if ((need[k2] || 0) !== (window[k2] || 0)) return false;
    return true;
  }
  for (let i = 0; i < s2.length; i++) {
    window[s2[i]] = (window[s2[i]] || 0) + 1;
    if (i >= k) {
      const left = s2[i - k];
      window[left]--;
      if (window[left] === 0) delete window[left];
    }
    if (equal()) return true;
  }
  return false;
}
const lines = fs.readFileSync(0, 'utf-8').replace(/\\r/g, '').split('\\n');
const s1 = (lines[0] || "").trim(); const s2 = (lines[1] || "").trim();
console.log(fmt(solve(s1, s2)));
`,
  "dsa-fruits-into-baskets": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(fruits: number[]) {
  const counts = new Map();
  let best = 0, left = 0;
  for (let right = 0; right < fruits.length; right++) {
    const f = fruits[right];
    counts.set(f, (counts.get(f) || 0) + 1);
    while (counts.size > 2) {
      const lf = fruits[left];
      counts.set(lf, counts.get(lf) - 1);
      if (counts.get(lf) === 0) counts.delete(lf);
      left++;
    }
    best = Math.max(best, right - left + 1);
  }
  return best;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const nums = data.slice(1, 1 + n).map(Number);
  console.log(fmt(solve(nums)));
}
`,
  "dsa-maximum-vowels-in-substring": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(s: string, k: number) {
  const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
  let window = 0;
  for (let i = 0; i < k; i++) if (vowels.has(s[i])) window++;
  let best = window;
  for (let i = k; i < s.length; i++) {
    if (vowels.has(s[i])) window++;
    if (vowels.has(s[i - k])) window--;
    best = Math.max(best, window);
  }
  return best;
}
const lines = fs.readFileSync(0, 'utf-8').replace(/\\r/g, '').split('\\n');
const s = (lines[0] || "").trim(); const k = parseInt(lines[1] || "0", 10);
console.log(fmt(solve(s, k)));
`,
  "dsa-sliding-window-maximum": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(nums: number[], k: number) {
  const dq = [];
  const out = [];
  for (let i = 0; i < nums.length; i++) {
    while (dq.length && nums[dq[dq.length - 1]] <= nums[i]) dq.pop();
    dq.push(i);
    if (dq[0] <= i - k) dq.shift();
    if (i >= k - 1) out.push(nums[dq[0]]);
  }
  return out;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const nums = data.slice(1, 1 + n).map(Number); const k = parseInt(data[1 + n], 10);
  console.log(fmt(solve(nums, k)));
}
`,
  "dsa-binary-subarrays-with-sum": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(nums: number[], goal: number) {
  const counts = new Map([[0, 1]]);
  let prefix = 0, ans = 0;
  for (const x of nums) {
    prefix += x;
    ans += counts.get(prefix - goal) || 0;
    counts.set(prefix, (counts.get(prefix) || 0) + 1);
  }
  return ans;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const nums = data.slice(1, 1 + n).map(Number); const k = parseInt(data[1 + n], 10);
  console.log(fmt(solve(nums, k)));
}
`,
  "dsa-longest-subarray-of-ones-after-deleting-one": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(nums: number[]) {
  let best = 0, left = 0, zeros = 0;
  for (let right = 0; right < nums.length; right++) {
    if (nums[right] === 0) zeros++;
    while (zeros > 1) {
      if (nums[left] === 0) zeros--;
      left++;
    }
    best = Math.max(best, right - left);
  }
  return best;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const nums = data.slice(1, 1 + n).map(Number);
  console.log(fmt(solve(nums)));
}
`,
  "dsa-max-consecutive-ones-iii": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(nums: number[], k: number) {
  let best = 0, left = 0, zeros = 0;
  for (let right = 0; right < nums.length; right++) {
    if (nums[right] === 0) zeros++;
    while (zeros > k) {
      if (nums[left] === 0) zeros--;
      left++;
    }
    best = Math.max(best, right - left + 1);
  }
  return best;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const nums = data.slice(1, 1 + n).map(Number); const k = parseInt(data[1 + n], 10);
  console.log(fmt(solve(nums, k)));
}
`,
  "dsa-evaluate-reverse-polish-notation": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(tokens: string[]) {
  const stack = [];
  for (const t of tokens) {
    if (t === '+' || t === '-' || t === '*' || t === '/') {
      const b = stack.pop();
      const a = stack.pop();
      if (t === '+') stack.push(a + b);
      else if (t === '-') stack.push(a - b);
      else if (t === '*') stack.push(a * b);
      else stack.push(Math.trunc(a / b));
    } else {
      stack.push(parseInt(t, 10));
    }
  }
  return stack[0];
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const words = data.slice(1, 1 + n);
  console.log(fmt(solve(words)));
}
`,
  "dsa-daily-temperatures": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(temps: number[]) {
  const n = temps.length;
  const out = new Array(n).fill(0);
  const stack = [];
  for (let i = 0; i < n; i++) {
    while (stack.length && temps[stack[stack.length - 1]] < temps[i]) {
      const j = stack.pop();
      out[j] = i - j;
    }
    stack.push(i);
  }
  return out;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const nums = data.slice(1, 1 + n).map(Number);
  console.log(fmt(solve(nums)));
}
`,
  "dsa-next-greater-element-i": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(a: number[], b: number[]) {
  const nxt = new Map();
  const stack = [];
  for (const x of b) {
    while (stack.length && stack[stack.length - 1] < x) nxt.set(stack.pop(), x);
    stack.push(x);
  }
  while (stack.length) nxt.set(stack.pop(), -1);
  return a.map(function (x) { return nxt.get(x); });
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const a = data.slice(1, 1 + n).map(Number); const m = parseInt(data[1 + n], 10); const b = data.slice(2 + n, 2 + n + m).map(Number);
  console.log(fmt(solve(a, b)));
}
`,
  "dsa-largest-rectangle-in-histogram": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(heights: number[]) {
  const stack = [];
  let best = 0;
  const h = heights.concat([0]);
  for (let i = 0; i < h.length; i++) {
    while (stack.length && h[stack[stack.length - 1]] > h[i]) {
      const height = h[stack.pop()];
      const left = stack.length ? stack[stack.length - 1] : -1;
      best = Math.max(best, height * (i - left - 1));
    }
    stack.push(i);
  }
  return best;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const nums = data.slice(1, 1 + n).map(Number);
  console.log(fmt(solve(nums)));
}
`,
  "dsa-simplify-path": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(path: string) {
  const stack = [];
  for (const part of path.split('/')) {
    if (part === '' || part === '.') continue;
    if (part === '..') { if (stack.length) stack.pop(); }
    else stack.push(part);
  }
  return '/' + stack.join('/');
}
const raw = fs.readFileSync(0, 'utf-8');
const s = raw.trim();
console.log(fmt(solve(s)));
`,
  "dsa-decode-string": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(s: string) {
  const stack = [];
  let cur = '';
  let num = 0;
  for (const c of s) {
    if (c >= '0' && c <= '9') num = num * 10 + (c.charCodeAt(0) - 48);
    else if (c === '[') { stack.push([cur, num]); cur = ''; num = 0; }
    else if (c === ']') {
      const pair = stack.pop();
      cur = pair[0] + cur.repeat(pair[1]);
    } else cur += c;
  }
  return cur;
}
const raw = fs.readFileSync(0, 'utf-8');
const s = raw.trim();
console.log(fmt(solve(s)));
`,
  "dsa-remove-duplicate-letters": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(s: string) {
  const remaining = {};
  for (const c of s) remaining[c] = (remaining[c] || 0) + 1;
  const stack = [];
  const inStack = new Set();
  for (const c of s) {
    remaining[c]--;
    if (inStack.has(c)) continue;
    while (stack.length && stack[stack.length - 1] > c && remaining[stack[stack.length - 1]] > 0) {
      inStack.delete(stack.pop());
    }
    stack.push(c);
    inStack.add(c);
  }
  return stack.join('');
}
const raw = fs.readFileSync(0, 'utf-8');
const s = raw.trim();
console.log(fmt(solve(s)));
`,
  "dsa-asteroid-collision": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(asteroids: number[]) {
  const stack = [];
  for (const a of asteroids) {
    let alive = true;
    while (alive && a < 0 && stack.length && stack[stack.length - 1] > 0) {
      if (stack[stack.length - 1] < -a) stack.pop();
      else if (stack[stack.length - 1] === -a) { stack.pop(); alive = false; }
      else alive = false;
    }
    if (alive) stack.push(a);
  }
  return stack;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const nums = data.slice(1, 1 + n).map(Number);
  console.log(fmt(solve(nums)));
}
`,
  "dsa-rotting-oranges": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(grid: number[][]) {
  const m = grid.length, n = grid[0].length;
  const q = [];
  let fresh = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 2) q.push([i, j, 0]);
      else if (grid[i][j] === 1) fresh++;
    }
  }
  let minutes = 0;
  while (q.length) {
    const cell = q.shift();
    const i = cell[0], j = cell[1], t = cell[2];
    minutes = Math.max(minutes, t);
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    for (const d of dirs) {
      const ni = i + d[0], nj = j + d[1];
      if (ni >= 0 && ni < m && nj >= 0 && nj < n && grid[ni][nj] === 1) {
        grid[ni][nj] = 2;
        fresh--;
        q.push([ni, nj, t + 1]);
      }
    }
  }
  return fresh === 0 ? minutes : -1;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const r = parseInt(data[0], 10); const c = parseInt(data[1], 10); const vals = data.slice(2).map(Number); const grid: number[][] = []; for (let i = 0; i < r; i++) grid.push(vals.slice(i * c, (i + 1) * c));
  console.log(fmt(solve(grid)));
}
`,
  "dsa-design-circular-queue": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(ops: string[]) {
  const k = parseInt(ops[0], 10);
  const q = new Array(k).fill(0);
  let head = 0, size = 0;
  const out = [];
  for (let idx = 1; idx < ops.length; idx++) {
    const parts = ops[idx].split(/\\s+/);
    const cmd = parts[0];
    if (cmd === 'enQueue') {
      if (size === k) out.push('false');
      else { q[(head + size) % k] = parseInt(parts[1], 10); size++; out.push('true'); }
    } else if (cmd === 'deQueue') {
      if (size === 0) out.push('false');
      else { head = (head + 1) % k; size--; out.push('true'); }
    } else if (cmd === 'Front') out.push(size ? String(q[head]) : '-1');
    else if (cmd === 'Rear') out.push(size ? String(q[(head + size - 1) % k]) : '-1');
    else if (cmd === 'isEmpty') out.push(size === 0 ? 'true' : 'false');
    else if (cmd === 'isFull') out.push(size === k ? 'true' : 'false');
  }
  return out.map(function (x) { return [x]; });
}
const lines = fs.readFileSync(0, 'utf-8').replace(/\\r/g, '').split('\\n');
const ops = lines.map(function (x) { return x.trim(); }).filter(function (x) { return x !== ""; });
console.log(fmt(solve(ops)));
`,
  "dsa-reveal-cards-in-increasing-order": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(deck: number[]) {
  deck = deck.slice().sort(function (a, b) { return a - b; });
  const q = [];
  for (let i = 0; i < deck.length; i++) q.push(i);
  const out = new Array(deck.length).fill(0);
  for (const v of deck) {
    const i = q.shift();
    out[i] = v;
    if (q.length) q.push(q.shift());
  }
  return out;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const nums = data.slice(1, 1 + n).map(Number);
  console.log(fmt(solve(nums)));
}
`,
  "dsa-time-needed-to-buy-tickets": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(tickets: number[], k: number) {
  let total = 0;
  for (let i = 0; i < tickets.length; i++) {
    if (i <= k) total += Math.min(tickets[i], tickets[k]);
    else total += Math.min(tickets[i], tickets[k] - 1);
  }
  return total;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const nums = data.slice(1, 1 + n).map(Number); const k = parseInt(data[1 + n], 10);
  console.log(fmt(solve(nums, k)));
}
`,
  "dsa-dota2-senate": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(senate: string) {
  const radiant = [], dire = [];
  const n = senate.length;
  for (let i = 0; i < n; i++) {
    if (senate[i] === 'R') radiant.push(i);
    else dire.push(i);
  }
  while (radiant.length && dire.length) {
    const r = radiant.shift();
    const d = dire.shift();
    if (r < d) radiant.push(r + n);
    else dire.push(d + n);
  }
  return radiant.length ? 'Radiant' : 'Dire';
}
const raw = fs.readFileSync(0, 'utf-8');
const s = raw.trim();
console.log(fmt(solve(s)));
`,
  "dsa-number-of-students-unable-to-eat-lunch": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(students: number[], sandwiches: number[]) {
  const counts = [0, 0];
  for (const s of students) counts[s]++;
  const q = students.slice();
  for (const s of sandwiches) {
    if (counts[s] === 0) break;
    while (q[0] !== s) q.push(q.shift());
    q.shift();
    counts[s]--;
  }
  return q.length;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const a = data.slice(1, 1 + n).map(Number); const m = parseInt(data[1 + n], 10); const b = data.slice(2 + n, 2 + n + m).map(Number);
  console.log(fmt(solve(a, b)));
}
`,
  "dsa-reverse-linked-list": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(head: ListNode | null) {
  let prev = null;
  let cur = head;
  while (cur) {
    const nxt = cur.next;
    cur.next = prev;
    prev = cur;
    cur = nxt;
  }
  return prev;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = data.length ? parseInt(data[0], 10) : 0; const head = buildList(data.slice(1, 1 + n).map(Number));
  console.log(fmt(solve(head)));
}
`,
  "dsa-merge-two-sorted-lists": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(head1: ListNode | null, head2: ListNode | null) {
  const dummy = new ListNode(0);
  let tail = dummy;
  while (head1 && head2) {
    if (head1.val <= head2.val) { tail.next = head1; head1 = head1.next; }
    else { tail.next = head2; head2 = head2.next; }
    tail = tail.next;
  }
  tail.next = head1 || head2;
  return dummy.next;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const a = data.slice(1, 1 + n).map(Number); const m = parseInt(data[1 + n], 10); const b = data.slice(2 + n, 2 + n + m).map(Number); const head1 = buildList(a); const head2 = buildList(b);
  console.log(fmt(solve(head1, head2)));
}
`,
  "dsa-linked-list-cycle": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(head: ListNode | null, pos: number) {
  if (pos < 0) return false;
  let tail = head;
  while (tail && tail.next) tail = tail.next;
  let target = head;
  for (let i = 0; i < pos; i++) target = target.next;
  tail.next = target;
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const pos = parseInt(data[data.length - 1], 10); const n = parseInt(data[0], 10); const head = buildList(data.slice(1, 1 + n).map(Number));
  console.log(fmt(solve(head, pos)));
}
`,
  "dsa-remove-nth-node-from-end": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(head: ListNode | null, k: number) {
  const dummy = new ListNode(0, head);
  let fast = dummy, slow = dummy;
  for (let i = 0; i < k + 1; i++) fast = fast.next;
  while (fast) { fast = fast.next; slow = slow.next; }
  slow.next = slow.next.next;
  return dummy.next;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const k = parseInt(data[data.length - 1], 10); const n = parseInt(data[0], 10); const head = buildList(data.slice(1, 1 + n).map(Number));
  console.log(fmt(solve(head, k)));
}
`,
  "dsa-middle-of-linked-list": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(head: ListNode | null) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow.val;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = data.length ? parseInt(data[0], 10) : 0; const head = buildList(data.slice(1, 1 + n).map(Number));
  console.log(fmt(solve(head)));
}
`,
  "dsa-palindrome-linked-list": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(head: ListNode | null) {
  const vals = [];
  let cur = head;
  while (cur) { vals.push(cur.val); cur = cur.next; }
  return vals.join(',') === vals.slice().reverse().join(',');
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = data.length ? parseInt(data[0], 10) : 0; const head = buildList(data.slice(1, 1 + n).map(Number));
  console.log(fmt(solve(head)));
}
`,
  "dsa-add-two-numbers": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(head1: ListNode | null, head2: ListNode | null) {
  const dummy = new ListNode(0);
  let tail = dummy, carry = 0;
  while (head1 || head2 || carry) {
    const v1 = head1 ? head1.val : 0;
    const v2 = head2 ? head2.val : 0;
    const total = v1 + v2 + carry;
    carry = Math.floor(total / 10);
    tail.next = new ListNode(total % 10);
    tail = tail.next;
    head1 = head1 ? head1.next : null;
    head2 = head2 ? head2.next : null;
  }
  return dummy.next;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const a = data.slice(1, 1 + n).map(Number); const m = parseInt(data[1 + n], 10); const b = data.slice(2 + n, 2 + n + m).map(Number); const head1 = buildList(a); const head2 = buildList(b);
  console.log(fmt(solve(head1, head2)));
}
`,
  "dsa-intersection-of-two-linked-lists": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(head1: ListNode | null, head2: ListNode | null) {
  const vals = new Set();
  let cur = head1;
  while (cur) { vals.add(cur.val); cur = cur.next; }
  cur = head2;
  while (cur) {
    if (vals.has(cur.val)) return cur.val;
    cur = cur.next;
  }
  return -1;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const a = data.slice(1, 1 + n).map(Number); const m = parseInt(data[1 + n], 10); const b = data.slice(2 + n, 2 + n + m).map(Number); const head1 = buildList(a); const head2 = buildList(b);
  console.log(fmt(solve(head1, head2)));
}
`,
  "dsa-remove-duplicates-from-sorted-list": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(head: ListNode | null) {
  let cur = head;
  while (cur && cur.next) {
    if (cur.val === cur.next.val) cur.next = cur.next.next;
    else cur = cur.next;
  }
  return head;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = data.length ? parseInt(data[0], 10) : 0; const head = buildList(data.slice(1, 1 + n).map(Number));
  console.log(fmt(solve(head)));
}
`,
  "dsa-reorder-list": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(head: ListNode | null) {
  if (!head || !head.next) return head;
  let slow = head, fast = head;
  while (fast.next && fast.next.next) { slow = slow.next; fast = fast.next.next; }
  let second = slow.next;
  slow.next = null;
  let prev = null;
  while (second) {
    const nxt = second.next;
    second.next = prev;
    prev = second;
    second = nxt;
  }
  let first = head;
  second = prev;
  while (second) {
    const tmp1 = first.next, tmp2 = second.next;
    first.next = second;
    second.next = tmp1;
    first = tmp1;
    second = tmp2;
  }
  return head;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = data.length ? parseInt(data[0], 10) : 0; const head = buildList(data.slice(1, 1 + n).map(Number));
  console.log(fmt(solve(head)));
}
`,
  "dsa-swap-nodes-in-pairs": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(head: ListNode | null) {
  const dummy = new ListNode(0, head);
  let prev = dummy;
  while (prev.next && prev.next.next) {
    const a = prev.next;
    const b = a.next;
    a.next = b.next;
    b.next = a;
    prev.next = b;
    prev = a;
  }
  return dummy.next;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = data.length ? parseInt(data[0], 10) : 0; const head = buildList(data.slice(1, 1 + n).map(Number));
  console.log(fmt(solve(head)));
}
`,
  "dsa-odd-even-linked-list": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(head: ListNode | null) {
  if (!head || !head.next) return head;
  let odd = head;
  let even = head.next;
  const evenHead = even;
  while (even && even.next) {
    odd.next = even.next;
    odd = odd.next;
    even.next = odd.next;
    even = even.next;
  }
  odd.next = evenHead;
  return head;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = data.length ? parseInt(data[0], 10) : 0; const head = buildList(data.slice(1, 1 + n).map(Number));
  console.log(fmt(solve(head)));
}
`,
  "dsa-binary-search": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(nums: number[], target: number) {
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const nums = data.slice(1, 1 + n).map(Number); const target = parseInt(data[1 + n], 10);
  console.log(fmt(solve(nums, target)));
}
`,
  "dsa-search-insert-position": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(nums: number[], target: number) {
  let left = 0, right = nums.length;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] < target) left = mid + 1;
    else right = mid;
  }
  return left;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const nums = data.slice(1, 1 + n).map(Number); const target = parseInt(data[1 + n], 10);
  console.log(fmt(solve(nums, target)));
}
`,
  "dsa-find-first-and-last-position": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(nums: number[], target: number) {
  function bound(first) {
    let left = 0, right = nums.length;
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (nums[mid] > target || (first && nums[mid] === target)) right = mid;
      else left = mid + 1;
    }
    return left;
  }
  const lo = bound(true);
  if (lo === nums.length || nums[lo] !== target) return [-1, -1];
  return [lo, bound(false) - 1];
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const nums = data.slice(1, 1 + n).map(Number); const target = parseInt(data[1 + n], 10);
  console.log(fmt(solve(nums, target)));
}
`,
  "dsa-search-in-rotated-sorted-array": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(nums: number[], target: number) {
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;
    if (nums[left] <= nums[mid]) {
      if (nums[left] <= target && target < nums[mid]) right = mid - 1;
      else left = mid + 1;
    } else {
      if (nums[mid] < target && target <= nums[right]) left = mid + 1;
      else right = mid - 1;
    }
  }
  return -1;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const nums = data.slice(1, 1 + n).map(Number); const target = parseInt(data[1 + n], 10);
  console.log(fmt(solve(nums, target)));
}
`,
  "dsa-find-minimum-in-rotated-sorted-array": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(nums: number[]) {
  let left = 0, right = nums.length - 1;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] > nums[right]) left = mid + 1;
    else right = mid;
  }
  return nums[left];
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const nums = data.slice(1, 1 + n).map(Number);
  console.log(fmt(solve(nums)));
}
`,
  "dsa-peak-element": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(nums: number[]) {
  let left = 0, right = nums.length - 1;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] > nums[mid + 1]) right = mid;
    else left = mid + 1;
  }
  return left;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const nums = data.slice(1, 1 + n).map(Number);
  console.log(fmt(solve(nums)));
}
`,
  "dsa-sqrt-x": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(x: number) {
  if (x < 2) return x;
  let left = 1, right = Math.floor(x / 2), ans = 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (mid * mid === x) return mid;
    if (mid * mid < x) { ans = mid; left = mid + 1; }
    else right = mid - 1;
  }
  return ans;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10);
  console.log(fmt(solve(n)));
}
`,
  "dsa-koko-eating-bananas": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(piles: number[], h: number) {
  let left = 1, right = Math.max.apply(null, piles);
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    let hours = 0;
    for (const p of piles) hours += Math.ceil(p / mid);
    if (hours <= h) right = mid;
    else left = mid + 1;
  }
  return left;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const nums = data.slice(1, 1 + n).map(Number); const k = parseInt(data[1 + n], 10);
  console.log(fmt(solve(nums, k)));
}
`,
  "dsa-capacity-to-ship-packages": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(weights: number[], days: number) {
  function can(cap) {
    let used = 1, load = 0;
    for (const w of weights) {
      if (load + w > cap) { used++; load = w; }
      else load += w;
    }
    return used <= days;
  }
  let left = Math.max.apply(null, weights);
  let right = weights.reduce(function (a, b) { return a + b; }, 0);
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (can(mid)) right = mid;
    else left = mid + 1;
  }
  return left;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const nums = data.slice(1, 1 + n).map(Number); const k = parseInt(data[1 + n], 10);
  console.log(fmt(solve(nums, k)));
}
`,
  "dsa-single-element-in-sorted-array": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(nums: number[]) {
  let left = 0, right = nums.length - 1;
  while (left < right) {
    let mid = Math.floor((left + right) / 2);
    if (mid % 2 === 1) mid--;
    if (nums[mid] === nums[mid + 1]) left = mid + 2;
    else right = mid;
  }
  return nums[left];
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const nums = data.slice(1, 1 + n).map(Number);
  console.log(fmt(solve(nums)));
}
`,
  "dsa-maximum-depth-of-binary-tree": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(root: TreeNode | null) {
  if (!root) return 0;
  return 1 + Math.max(solve(root.left), solve(root.right));
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
const root = buildTree(data);
console.log(fmt(solve(root)));
`,
  "dsa-invert-binary-tree": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(root: TreeNode | null) {
  if (!root) return null;
  const tmp = root.left;
  root.left = solve(root.right);
  root.right = solve(tmp);
  return root;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
const root = buildTree(data);
console.log(fmt(solve(root)));
`,
  "dsa-same-tree": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(root1: TreeNode | null, root2: TreeNode | null) {
  if (!root1 && !root2) return true;
  if (!root1 || !root2) return false;
  return root1.val === root2.val && solve(root1.left, root2.left) && solve(root1.right, root2.right);
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n1 = parseInt(data[0], 10); const t1 = data.slice(1, 1 + n1); const n2 = parseInt(data[1 + n1], 10); const t2 = data.slice(2 + n1, 2 + n1 + n2); const root1 = buildTree(t1); const root2 = buildTree(t2);
  console.log(fmt(solve(root1, root2)));
}
`,
  "dsa-symmetric-tree": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(root: TreeNode | null) {
  function mirror(a, b) {
    if (!a && !b) return true;
    if (!a || !b) return false;
    return a.val === b.val && mirror(a.left, b.right) && mirror(a.right, b.left);
  }
  if (!root) return true;
  return mirror(root.left, root.right);
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
const root = buildTree(data);
console.log(fmt(solve(root)));
`,
  "dsa-binary-tree-level-order-traversal": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(root: TreeNode | null) {
  if (!root) return [];
  const out = [];
  let level = [root];
  while (level.length) {
    out.push(level.map(function (n) { return n.val; }));
    const nxt = [];
    for (const n of level) {
      if (n.left) nxt.push(n.left);
      if (n.right) nxt.push(n.right);
    }
    level = nxt;
  }
  return out;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
const root = buildTree(data);
console.log(fmt(solve(root)));
`,
  "dsa-validate-binary-search-tree": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(root: TreeNode | null) {
  function valid(node, low, high) {
    if (!node) return true;
    if (node.val <= low || node.val >= high) return false;
    return valid(node.left, low, node.val) && valid(node.right, node.val, high);
  }
  return valid(root, -Infinity, Infinity);
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
const root = buildTree(data);
console.log(fmt(solve(root)));
`,
  "dsa-lowest-common-ancestor": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(root: TreeNode | null, p: number, q: number) {
  if (!root) return -1;
  if (root.val === p || root.val === q) return root.val;
  const left = solve(root.left, p, q);
  const right = solve(root.right, p, q);
  if (left !== -1 && right !== -1) return root.val;
  return left !== -1 ? left : right;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const p = parseInt(data[data.length - 2], 10); const q = parseInt(data[data.length - 1], 10); const root = buildTree(data.slice(0, data.length - 2));
  console.log(fmt(solve(root, p, q)));
}
`,
  "dsa-diameter-of-binary-tree": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(root: TreeNode | null) {
  let best = 0;
  function depth(node) {
    if (!node) return 0;
    const l = depth(node.left);
    const r = depth(node.right);
    best = Math.max(best, l + r);
    return 1 + Math.max(l, r);
  }
  depth(root);
  return best;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
const root = buildTree(data);
console.log(fmt(solve(root)));
`,
  "dsa-path-sum": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(root: TreeNode | null, target: number) {
  if (!root) return false;
  if (!root.left && !root.right) return root.val === target;
  return solve(root.left, target - root.val) || solve(root.right, target - root.val);
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const target = parseInt(data[data.length - 1], 10); const root = buildTree(data.slice(0, data.length - 1));
  console.log(fmt(solve(root, target)));
}
`,
  "dsa-kth-smallest-in-bst": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(root: TreeNode | null, k: number) {
  const stack = [];
  let cur = root;
  while (stack.length || cur) {
    while (cur) { stack.push(cur); cur = cur.left; }
    cur = stack.pop();
    k--;
    if (k === 0) return cur.val;
    cur = cur.right;
  }
  return -1;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const k = parseInt(data[data.length - 1], 10); const root = buildTree(data.slice(0, data.length - 1));
  console.log(fmt(solve(root, k)));
}
`,
  "dsa-binary-tree-right-side-view": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(root: TreeNode | null) {
  if (!root) return [];
  const out = [];
  let level = [root];
  while (level.length) {
    out.push(level[level.length - 1].val);
    const nxt = [];
    for (const n of level) {
      if (n.left) nxt.push(n.left);
      if (n.right) nxt.push(n.right);
    }
    level = nxt;
  }
  return out;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
const root = buildTree(data);
console.log(fmt(solve(root)));
`,
  "dsa-construct-binary-tree-from-preorder-inorder": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(preorder: number[], inorder: number[]) {
  const pos = new Map();
  for (let i = 0; i < inorder.length; i++) pos.set(inorder[i], i);
  let idx = 0;
  function build(lo, hi) {
    if (lo > hi) return null;
    const val = preorder[idx++];
    const node = new TreeNode(val);
    const mid = pos.get(val);
    node.left = build(lo, mid - 1);
    node.right = build(mid + 1, hi);
    return node;
  }
  return build(0, inorder.length - 1);
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const a = data.slice(1, 1 + n).map(Number); const m = parseInt(data[1 + n], 10); const b = data.slice(2 + n, 2 + n + m).map(Number);
  console.log(fmt(solve(a, b)));
}
`,
  "dsa-sum-of-left-leaves": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(root: TreeNode | null) {
  if (!root) return 0;
  let total = 0;
  if (root.left && !root.left.left && !root.left.right) total += root.left.val;
  return total + solve(root.left) + solve(root.right);
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
const root = buildTree(data);
console.log(fmt(solve(root)));
`,
  "dsa-binary-tree-maximum-path-sum": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(root: TreeNode | null) {
  let best = -Infinity;
  function gain(node) {
    if (!node) return 0;
    const left = Math.max(gain(node.left), 0);
    const right = Math.max(gain(node.right), 0);
    best = Math.max(best, node.val + left + right);
    return node.val + Math.max(left, right);
  }
  gain(root);
  return best;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
const root = buildTree(data);
console.log(fmt(solve(root)));
`,
  "dsa-number-of-islands": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(grid: string[][]) {
  const m = grid.length, n = grid[0].length;
  let count = 0;
  function dfs(i, j) {
    if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] !== '1') return;
    grid[i][j] = '0';
    dfs(i + 1, j); dfs(i - 1, j); dfs(i, j + 1); dfs(i, j - 1);
  }
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === '1') { count++; dfs(i, j); }
    }
  }
  return count;
}
const lines = fs.readFileSync(0, 'utf-8').replace(/\\r/g, '').split('\\n');
const parts = lines[0].trim().split(/\\s+/); const r = parseInt(parts[0], 10); const c = parseInt(parts[1], 10); const grid: string[][] = []; for (let i = 0; i < r; i++) grid.push(lines[1 + i].replace(/\\s/g, "").split(""));
console.log(fmt(solve(grid)));
`,
  "dsa-flood-fill": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(grid: number[][], sr: number, sc: number, color: number) {
  const old = grid[sr][sc];
  if (old === color) return grid;
  const m = grid.length, n = grid[0].length;
  function dfs(i, j) {
    if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] !== old) return;
    grid[i][j] = color;
    dfs(i + 1, j); dfs(i - 1, j); dfs(i, j + 1); dfs(i, j - 1);
  }
  dfs(sr, sc);
  return grid;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const r = parseInt(data[0], 10); const c = parseInt(data[1], 10); const vals = data.slice(2, 2 + r * c).map(Number); const grid: number[][] = []; for (let i = 0; i < r; i++) grid.push(vals.slice(i * c, (i + 1) * c)); const sr = parseInt(data[2 + r * c], 10); const sc = parseInt(data[3 + r * c], 10); const color = parseInt(data[4 + r * c], 10);
  console.log(fmt(solve(grid, sr, sc, color)));
}
`,
  "dsa-course-schedule": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(n: number, edges: number[][]) {
  const graph = new Map();
  const indeg = new Array(n).fill(0);
  for (const e of edges) {
    const a = e[0], b = e[1];
    if (!graph.has(b)) graph.set(b, []);
    graph.get(b).push(a);
    indeg[a]++;
  }
  const q = [];
  for (let i = 0; i < n; i++) if (indeg[i] === 0) q.push(i);
  let done = 0;
  while (q.length) {
    const u = q.shift();
    done++;
    for (const v of (graph.get(u) || [])) {
      indeg[v]--;
      if (indeg[v] === 0) q.push(v);
    }
  }
  return done === n;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const m = parseInt(data[1], 10); const edges: number[][] = []; for (let i = 0; i < m; i++) edges.push([parseInt(data[2 + 2*i], 10), parseInt(data[3 + 2*i], 10)]);
  console.log(fmt(solve(n, edges)));
}
`,
  "dsa-course-schedule-ii": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(n: number, edges: number[][]) {
  const graph = new Map();
  const indeg = new Array(n).fill(0);
  for (const e of edges) {
    const a = e[0], b = e[1];
    if (!graph.has(b)) graph.set(b, []);
    graph.get(b).push(a);
    indeg[a]++;
  }
  const q = [];
  for (let i = 0; i < n; i++) if (indeg[i] === 0) q.push(i);
  const order = [];
  while (q.length) {
    const u = q.shift();
    order.push(u);
    for (const v of (graph.get(u) || [])) {
      indeg[v]--;
      if (indeg[v] === 0) q.push(v);
    }
  }
  return order.length === n ? order : [-1];
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const m = parseInt(data[1], 10); const edges: number[][] = []; for (let i = 0; i < m; i++) edges.push([parseInt(data[2 + 2*i], 10), parseInt(data[3 + 2*i], 10)]);
  console.log(fmt(solve(n, edges)));
}
`,
  "dsa-pacific-atlantic-water-flow": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(grid: number[][]) {
  const m = grid.length, n = grid[0].length;
  const pac = [], atl = [];
  for (let i = 0; i < m; i++) { pac.push(new Array(n).fill(false)); atl.push(new Array(n).fill(false)); }
  function dfs(i, j, seen) {
    seen[i][j] = true;
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    for (const d of dirs) {
      const ni = i + d[0], nj = j + d[1];
      if (ni >= 0 && ni < m && nj >= 0 && nj < n && !seen[ni][nj] && grid[ni][nj] >= grid[i][j]) dfs(ni, nj, seen);
    }
  }
  for (let i = 0; i < m; i++) { dfs(i, 0, pac); dfs(i, n - 1, atl); }
  for (let j = 0; j < n; j++) { dfs(0, j, pac); dfs(m - 1, j, atl); }
  const out = [];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (pac[i][j] && atl[i][j]) out.push([i, j]);
    }
  }
  return out;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const r = parseInt(data[0], 10); const c = parseInt(data[1], 10); const vals = data.slice(2).map(Number); const grid: number[][] = []; for (let i = 0; i < r; i++) grid.push(vals.slice(i * c, (i + 1) * c));
  console.log(fmt(solve(grid)));
}
`,
  "dsa-number-of-provinces": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(grid: number[][]) {
  const n = grid.length;
  const seen = new Array(n).fill(false);
  function dfs(i) {
    seen[i] = true;
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1 && !seen[j]) dfs(j);
    }
  }
  let count = 0;
  for (let i = 0; i < n; i++) {
    if (!seen[i]) { count++; dfs(i); }
  }
  return count;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const r = parseInt(data[0], 10); const c = parseInt(data[1], 10); const vals = data.slice(2).map(Number); const grid: number[][] = []; for (let i = 0; i < r; i++) grid.push(vals.slice(i * c, (i + 1) * c));
  console.log(fmt(solve(grid)));
}
`,
  "dsa-word-ladder": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(begin: string, end: string, words: string[]) {
  const wordSet = new Set(words);
  if (!wordSet.has(end)) return 0;
  const q = [[begin, 1]];
  const seen = new Set([begin]);
  while (q.length) {
    const item = q.shift();
    const word = item[0], steps = item[1];
    if (word === end) return steps;
    for (let i = 0; i < word.length; i++) {
      for (let code = 97; code <= 122; code++) {
        const c = String.fromCharCode(code);
        const nxt = word.slice(0, i) + c + word.slice(i + 1);
        if (wordSet.has(nxt) && !seen.has(nxt)) {
          seen.add(nxt);
          q.push([nxt, steps + 1]);
        }
      }
    }
  }
  return 0;
}
const lines = fs.readFileSync(0, 'utf-8').replace(/\\r/g, '').split('\\n');
const begin = (lines[0] || "").trim(); const end = (lines[1] || "").trim(); const n = parseInt(lines[2] || "0", 10); const words = lines.slice(3, 3 + n).map(function (x) { return x.trim(); });
console.log(fmt(solve(begin, end, words)));
`,
  "dsa-keys-and-rooms": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(rooms: number[][]) {
  const seen = new Set([0]);
  const stack = [0];
  while (stack.length) {
    const r = stack.pop();
    for (const k of rooms[r]) {
      if (!seen.has(k)) { seen.add(k); stack.push(k); }
    }
  }
  return seen.size === rooms.length;
}
const lines = fs.readFileSync(0, 'utf-8').replace(/\\r/g, '').split('\\n');
const n = parseInt(lines[0], 10); const rooms: number[][] = []; for (let i = 0; i < n; i++) { const parts = lines[1 + i].trim().split(/\\s+/).map(Number); rooms.push(parts.slice(1, 1 + parts[0])); }
console.log(fmt(solve(rooms)));
`,
  "dsa-shortest-path-in-binary-matrix": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(grid: string[][]) {
  const n = grid.length;
  if (grid[0][0] === '1' || grid[n - 1][n - 1] === '1') return -1;
  const q = [[0, 0, 1]];
  grid[0][0] = '1';
  while (q.length) {
    const cell = q.shift();
    const i = cell[0], j = cell[1], d = cell[2];
    if (i === n - 1 && j === n - 1) return d;
    for (let di = -1; di <= 1; di++) {
      for (let dj = -1; dj <= 1; dj++) {
        if (di === 0 && dj === 0) continue;
        const ni = i + di, nj = j + dj;
        if (ni >= 0 && ni < n && nj >= 0 && nj < n && grid[ni][nj] === '0') {
          grid[ni][nj] = '1';
          q.push([ni, nj, d + 1]);
        }
      }
    }
  }
  return -1;
}
const lines = fs.readFileSync(0, 'utf-8').replace(/\\r/g, '').split('\\n');
const parts = lines[0].trim().split(/\\s+/); const r = parseInt(parts[0], 10); const c = parseInt(parts[1], 10); const grid: string[][] = []; for (let i = 0; i < r; i++) grid.push(lines[1 + i].replace(/\\s/g, "").split(""));
console.log(fmt(solve(grid)));
`,
  "dsa-surrounded-regions": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(grid: string[][]) {
  const m = grid.length, n = grid[0].length;
  function dfs(i, j) {
    if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] !== 'O') return;
    grid[i][j] = 'S';
    dfs(i + 1, j); dfs(i - 1, j); dfs(i, j + 1); dfs(i, j - 1);
  }
  for (let i = 0; i < m; i++) { dfs(i, 0); dfs(i, n - 1); }
  for (let j = 0; j < n; j++) { dfs(0, j); dfs(m - 1, j); }
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 'O') grid[i][j] = 'X';
      else if (grid[i][j] === 'S') grid[i][j] = 'O';
    }
  }
  return grid;
}
const lines = fs.readFileSync(0, 'utf-8').replace(/\\r/g, '').split('\\n');
const parts = lines[0].trim().split(/\\s+/); const r = parseInt(parts[0], 10); const c = parseInt(parts[1], 10); const grid: string[][] = []; for (let i = 0; i < r; i++) grid.push(lines[1 + i].replace(/\\s/g, "").split(""));
console.log(fmt(solve(grid)));
`,
  "dsa-graph-valid-tree": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(n: number, edges: number[][]) {
  if (edges.length !== n - 1) return false;
  const parent = [];
  for (let i = 0; i < n; i++) parent.push(i);
  function find(x) {
    while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; }
    return x;
  }
  for (const e of edges) {
    const ra = find(e[0]), rb = find(e[1]);
    if (ra === rb) return false;
    parent[ra] = rb;
  }
  return true;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const m = parseInt(data[1], 10); const edges: number[][] = []; for (let i = 0; i < m; i++) edges.push([parseInt(data[2 + 2*i], 10), parseInt(data[3 + 2*i], 10)]);
  console.log(fmt(solve(n, edges)));
}
`,
  "dsa-cheapest-flights-within-k-stops": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(n: number, edges: number[][], src: number, dst: number, k: number) {
  const dist = new Array(n).fill(Infinity);
  dist[src] = 0;
  for (let step = 0; step < k + 1; step++) {
    const nxt = dist.slice();
    for (const e of edges) {
      const u = e[0], v = e[1], w = e[2];
      if (dist[u] !== Infinity && dist[u] + w < nxt[v]) nxt[v] = dist[u] + w;
    }
    for (let i = 0; i < n; i++) dist[i] = nxt[i];
  }
  return dist[dst] === Infinity ? -1 : dist[dst];
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const m = parseInt(data[1], 10); const edges: number[][] = []; for (let i = 0; i < m; i++) edges.push([parseInt(data[2 + 3*i], 10), parseInt(data[3 + 3*i], 10), parseInt(data[4 + 3*i], 10)]); const src = parseInt(data[2 + 3*m], 10); const dst = parseInt(data[3 + 3*m], 10); const k = parseInt(data[4 + 3*m], 10);
  console.log(fmt(solve(n, edges, src, dst, k)));
}
`,
  "dsa-climbing-stairs": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(n: number) {
  let a = 1, b = 1;
  for (let i = 0; i < n - 1; i++) { const t = a + b; a = b; b = t; }
  return b;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10);
  console.log(fmt(solve(n)));
}
`,
  "dsa-house-robber": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(nums: number[]) {
  let prev2 = 0, prev1 = 0;
  for (const x of nums) {
    const cur = Math.max(prev1, prev2 + x);
    prev2 = prev1;
    prev1 = cur;
  }
  return prev1;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const nums = data.slice(1, 1 + n).map(Number);
  console.log(fmt(solve(nums)));
}
`,
  "dsa-house-robber-ii": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(nums: number[]) {
  function robRange(arr) {
    let prev2 = 0, prev1 = 0;
    for (const x of arr) {
      const cur = Math.max(prev1, prev2 + x);
      prev2 = prev1;
      prev1 = cur;
    }
    return prev1;
  }
  if (nums.length === 1) return nums[0];
  return Math.max(robRange(nums.slice(0, -1)), robRange(nums.slice(1)));
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const nums = data.slice(1, 1 + n).map(Number);
  console.log(fmt(solve(nums)));
}
`,
  "dsa-coin-change": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(coins: number[], amount: number) {
  const INF = amount + 1;
  const dp = new Array(amount + 1).fill(INF);
  dp[0] = 0;
  for (let a = 1; a <= amount; a++) {
    for (const c of coins) {
      if (c <= a) dp[a] = Math.min(dp[a], dp[a - c] + 1);
    }
  }
  return dp[amount] === INF ? -1 : dp[amount];
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const nums = data.slice(1, 1 + n).map(Number); const target = parseInt(data[1 + n], 10);
  console.log(fmt(solve(nums, target)));
}
`,
  "dsa-coin-change-ii": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(coins: number[], amount: number) {
  const dp = new Array(amount + 1).fill(0);
  dp[0] = 1;
  for (const c of coins) {
    for (let a = c; a <= amount; a++) dp[a] += dp[a - c];
  }
  return dp[amount];
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const nums = data.slice(1, 1 + n).map(Number); const target = parseInt(data[1 + n], 10);
  console.log(fmt(solve(nums, target)));
}
`,
  "dsa-longest-increasing-subsequence": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(nums: number[]) {
  const tails = [];
  for (const x of nums) {
    let lo = 0, hi = tails.length;
    while (lo < hi) {
      const mid = Math.floor((lo + hi) / 2);
      if (tails[mid] < x) lo = mid + 1;
      else hi = mid;
    }
    if (lo === tails.length) tails.push(x);
    else tails[lo] = x;
  }
  return tails.length;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const nums = data.slice(1, 1 + n).map(Number);
  console.log(fmt(solve(nums)));
}
`,
  "dsa-edit-distance": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(w1: string, w2: string) {
  const m = w1.length, n = w2.length;
  const dp = [];
  for (let i = 0; i <= m; i++) dp.push(new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (w1[i - 1] === w2[j - 1]) dp[i][j] = dp[i - 1][j - 1];
      else dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}
const lines = fs.readFileSync(0, 'utf-8').replace(/\\r/g, '').split('\\n');
const s1 = (lines[0] || "").trim(); const s2 = (lines[1] || "").trim();
console.log(fmt(solve(s1, s2)));
`,
  "dsa-longest-common-subsequence": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(t1: string, t2: string) {
  const m = t1.length, n = t2.length;
  const dp = [];
  for (let i = 0; i <= m; i++) dp.push(new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (t1[i - 1] === t2[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[m][n];
}
const lines = fs.readFileSync(0, 'utf-8').replace(/\\r/g, '').split('\\n');
const s1 = (lines[0] || "").trim(); const s2 = (lines[1] || "").trim();
console.log(fmt(solve(s1, s2)));
`,
  "dsa-unique-paths": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(m: number, n: number) {
  const dp = new Array(n).fill(1);
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) dp[j] += dp[j - 1];
  }
  return dp[n - 1];
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const a = parseInt(data[0], 10); const b = parseInt(data[1], 10);
  console.log(fmt(solve(a, b)));
}
`,
  "dsa-unique-paths-ii": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(grid: number[][]) {
  const m = grid.length, n = grid[0].length;
  if (grid[0][0] === 1 || grid[m - 1][n - 1] === 1) return 0;
  const dp = [];
  for (let i = 0; i < m; i++) dp.push(new Array(n).fill(0));
  dp[0][0] = 1;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) { dp[i][j] = 0; continue; }
      if (i > 0) dp[i][j] += dp[i - 1][j];
      if (j > 0) dp[i][j] += dp[i][j - 1];
    }
  }
  return dp[m - 1][n - 1];
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const r = parseInt(data[0], 10); const c = parseInt(data[1], 10); const vals = data.slice(2).map(Number); const grid: number[][] = []; for (let i = 0; i < r; i++) grid.push(vals.slice(i * c, (i + 1) * c));
  console.log(fmt(solve(grid)));
}
`,
  "dsa-word-break": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(s: string, words: string[]) {
  const wordSet = new Set(words);
  const dp = new Array(s.length + 1).fill(false);
  dp[0] = true;
  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && wordSet.has(s.slice(j, i))) { dp[i] = true; break; }
    }
  }
  return dp[s.length];
}
const lines = fs.readFileSync(0, 'utf-8').replace(/\\r/g, '').split('\\n');
const s = (lines[0] || "").trim(); const n = parseInt(lines[1] || "0", 10); const words = lines.slice(2, 2 + n).map(function (x) { return x.trim(); });
console.log(fmt(solve(s, words)));
`,
  "dsa-decode-ways": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(s: string) {
  if (!s || s[0] === '0') return 0;
  let prev2 = 1, prev1 = 1;
  for (let i = 1; i < s.length; i++) {
    let cur = 0;
    if (s[i] !== '0') cur += prev1;
    const two = parseInt(s.slice(i - 1, i + 1), 10);
    if (two >= 10 && two <= 26) cur += prev2;
    prev2 = prev1;
    prev1 = cur;
  }
  return prev1;
}
const raw = fs.readFileSync(0, 'utf-8');
const s = raw.trim();
console.log(fmt(solve(s)));
`,
  "dsa-partition-equal-subset-sum": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(nums: number[]) {
  const total = nums.reduce(function (a, b) { return a + b; }, 0);
  if (total % 2 === 1) return false;
  const target = total / 2;
  const dp = new Array(target + 1).fill(false);
  dp[0] = true;
  for (const x of nums) {
    for (let s = target; s >= x; s--) dp[s] = dp[s] || dp[s - x];
  }
  return dp[target];
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const nums = data.slice(1, 1 + n).map(Number);
  console.log(fmt(solve(nums)));
}
`,
  "dsa-longest-palindromic-subsequence": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(s: string) {
  const n = s.length;
  const dp = [];
  for (let i = 0; i < n; i++) dp.push(new Array(n).fill(0));
  for (let i = 0; i < n; i++) dp[i][i] = 1;
  for (let len = 2; len <= n; len++) {
    for (let i = 0; i + len - 1 < n; i++) {
      const j = i + len - 1;
      if (s[i] === s[j]) dp[i][j] = len === 2 ? 2 : dp[i + 1][j - 1] + 2;
      else dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
    }
  }
  return dp[0][n - 1];
}
const raw = fs.readFileSync(0, 'utf-8');
const s = raw.trim();
console.log(fmt(solve(s)));
`,
  "dsa-best-time-to-buy-sell-stock-ii": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(prices: number[]) {
  let profit = 0;
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) profit += prices[i] - prices[i - 1];
  }
  return profit;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const nums = data.slice(1, 1 + n).map(Number);
  console.log(fmt(solve(nums)));
}
`,
  "dsa-gas-station": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(gas: number[], cost: number[]) {
  let total = 0, tank = 0, start = 0;
  for (let i = 0; i < gas.length; i++) {
    const diff = gas[i] - cost[i];
    total += diff;
    tank += diff;
    if (tank < 0) { start = i + 1; tank = 0; }
  }
  return total >= 0 ? start : -1;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const a = data.slice(1, 1 + n).map(Number); const m = parseInt(data[1 + n], 10); const b = data.slice(2 + n, 2 + n + m).map(Number);
  console.log(fmt(solve(a, b)));
}
`,
  "dsa-assign-cookies": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(g: number[], s: number[]) {
  g = g.slice().sort(function (a, b) { return a - b; });
  s = s.slice().sort(function (a, b) { return a - b; });
  let child = 0, cookie = 0;
  while (child < g.length && cookie < s.length) {
    if (s[cookie] >= g[child]) child++;
    cookie++;
  }
  return child;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const a = data.slice(1, 1 + n).map(Number); const m = parseInt(data[1 + n], 10); const b = data.slice(2 + n, 2 + n + m).map(Number);
  console.log(fmt(solve(a, b)));
}
`,
  "dsa-non-overlapping-intervals": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(intervals: number[][]) {
  intervals = intervals.slice().sort(function (a, b) { return a[1] - b[1]; });
  let kept = 0;
  let end = -Infinity;
  for (const iv of intervals) {
    if (iv[0] >= end) { kept++; end = iv[1]; }
  }
  return intervals.length - kept;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const intervals: number[][] = []; for (let i = 0; i < n; i++) intervals.push([parseInt(data[1 + 2*i], 10), parseInt(data[2 + 2*i], 10)]);
  console.log(fmt(solve(intervals)));
}
`,
  "dsa-partition-labels": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(s: string) {
  const last = {};
  for (let i = 0; i < s.length; i++) last[s[i]] = i;
  const out = [];
  let start = 0, end = 0;
  for (let i = 0; i < s.length; i++) {
    end = Math.max(end, last[s[i]]);
    if (i === end) { out.push(end - start + 1); start = i + 1; }
  }
  return out;
}
const raw = fs.readFileSync(0, 'utf-8');
const s = raw.trim();
console.log(fmt(solve(s)));
`,
  "dsa-lemonade-change": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(bills: number[]) {
  let fives = 0, tens = 0;
  for (const b of bills) {
    if (b === 5) fives++;
    else if (b === 10) {
      if (fives === 0) return false;
      fives--;
      tens++;
    } else {
      if (tens > 0 && fives > 0) { tens--; fives--; }
      else if (fives >= 3) fives -= 3;
      else return false;
    }
  }
  return true;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const nums = data.slice(1, 1 + n).map(Number);
  console.log(fmt(solve(nums)));
}
`,
  "dsa-subsets": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(nums: number[]) {
  const out = [];
  function backtrack(i, cur) {
    if (i === nums.length) { out.push(cur.slice()); return; }
    backtrack(i + 1, cur);
    cur.push(nums[i]);
    backtrack(i + 1, cur);
    cur.pop();
  }
  backtrack(0, []);
  return out;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const nums = data.slice(1, 1 + n).map(Number);
  console.log(fmt(solve(nums)));
}
`,
  "dsa-permutations": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(nums: number[]) {
  const out = [];
  function backtrack(cur, used) {
    if (cur.length === nums.length) { out.push(cur.slice()); return; }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      used[i] = true;
      cur.push(nums[i]);
      backtrack(cur, used);
      cur.pop();
      used[i] = false;
    }
  }
  backtrack([], new Array(nums.length).fill(false));
  return out;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const nums = data.slice(1, 1 + n).map(Number);
  console.log(fmt(solve(nums)));
}
`,
  "dsa-combination-sum": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(candidates: number[], target: number) {
  candidates = candidates.slice().sort(function (a, b) { return a - b; });
  const out = [];
  function backtrack(start, remaining, cur) {
    if (remaining === 0) { out.push(cur.slice()); return; }
    for (let i = start; i < candidates.length; i++) {
      if (candidates[i] > remaining) break;
      cur.push(candidates[i]);
      backtrack(i, remaining - candidates[i], cur);
      cur.pop();
    }
  }
  backtrack(0, target, []);
  return out;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10); const nums = data.slice(1, 1 + n).map(Number); const target = parseInt(data[1 + n], 10);
  console.log(fmt(solve(nums, target)));
}
`,
  "dsa-generate-parentheses": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(n: number) {
  const out = [];
  function backtrack(cur, openCount, closeCount) {
    if (cur.length === 2 * n) { out.push(cur.join('')); return; }
    if (openCount < n) {
      cur.push('(');
      backtrack(cur, openCount + 1, closeCount);
      cur.pop();
    }
    if (closeCount < openCount) {
      cur.push(')');
      backtrack(cur, openCount, closeCount + 1);
      cur.pop();
    }
  }
  backtrack([], 0, 0);
  return out.map(function (s) { return [s]; });
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10);
  console.log(fmt(solve(n)));
}
`,
  "dsa-letter-combinations-of-phone-number": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(digits: string) {
  if (!digits) return [];
  const mapping = { '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl', '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz' };
  const out = [];
  function backtrack(i, cur) {
    if (i === digits.length) { out.push(cur.join('')); return; }
    for (const c of mapping[digits[i]]) {
      cur.push(c);
      backtrack(i + 1, cur);
      cur.pop();
    }
  }
  backtrack(0, []);
  return out;
}
const raw = fs.readFileSync(0, 'utf-8');
const s = raw.trim();
console.log(fmt(solve(s)));
`,
  "dsa-n-queens-count": `const fs = require('fs');

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildList(vals: number[]): ListNode | null {
  if (!vals.length) return null;
  const head = new ListNode(vals[0]);
  let cur: ListNode = head;
  for (let i = 1; i < vals.length; i++) {
    cur.next = new ListNode(vals[i]);
    cur = cur.next;
  }
  return head;
}

function buildTree(tokens: string[]): TreeNode | null {
  if (!tokens.length || tokens[0] === 'null') return null;
  const root = new TreeNode(parseInt(tokens[0], 10));
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < tokens.length) {
    const node: TreeNode = queue.shift()!;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.left = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      node.right = new TreeNode(parseInt(tokens[i], 10));
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function fmt(x: unknown): string {
  if (x === null || x === undefined) return '';
  if (typeof x === 'boolean') return x ? 'true' : 'false';
  if (x instanceof TreeNode) {
    const out: string[] = [];
    const queue: (TreeNode | null)[] = [x];
    while (queue.length) {
      const node: TreeNode | null | undefined = queue.shift();
      if (node === null || node === undefined) out.push('null');
      else {
        out.push(String(node.val));
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    while (out.length && out[out.length - 1] === 'null') out.pop();
    return out.join(' ');
  }
  if (x instanceof ListNode) {
    const vals: string[] = [];
    let cur: ListNode | null = x;
    while (cur) {
      vals.push(String(cur.val));
      cur = cur.next;
    }
    return vals.join(' ');
  }
  if (Array.isArray(x)) {
    if (!x.length) return '';
    if (Array.isArray(x[0])) {
      return (x as unknown[][]).map((r: unknown[]): string => {
        if (!r.length) return '';
        if (typeof r[0] === 'string' && r[0].length === 1) return (r as string[]).join('');
        return r.map(String).join(' ');
      }).join('\\n');
    }
    return (x as unknown[]).map(String).join(' ');
  }
  return String(x);
}

function solve(n: number) {
  let count = 0;
  const cols = new Set(), diag1 = new Set(), diag2 = new Set();
  function backtrack(row) {
    if (row === n) { count++; return; }
    for (let col = 0; col < n; col++) {
      if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) continue;
      cols.add(col); diag1.add(row - col); diag2.add(row + col);
      backtrack(row + 1);
      cols.delete(col); diag1.delete(row - col); diag2.delete(row + col);
    }
  }
  backtrack(0);
  return count;
}
const data = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/).filter(function (x) { return x !== ''; });
if (data.length) {
  const n = parseInt(data[0], 10);
  console.log(fmt(solve(n)));
}
`,
};
