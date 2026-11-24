// Rust starters for every DSA problem in dsa.ts.
// Each value is a complete, self-contained Rust program (single main.rs,
// std-only) that reads the same stdin format as the Python starter for its
// problem and prints byte-identical stdout. Compiled with `rustc -O`.
export const DSA_STARTERS_RUST: Record<string, string> = {
  "dsa-two-sum": `use std::collections::HashMap;
use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let nums: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let target: i64 = t[1 + n].parse().unwrap();
    let mut seen: HashMap<i64, usize> = HashMap::new();
    let mut ans: Vec<i64> = vec![-1, -1];
    for (i, &x) in nums.iter().enumerate() {
        if let Some(&j) = seen.get(&(target - x)) { ans = vec![j as i64, i as i64]; break; }
        seen.insert(x, i);
    }
    println!("{}", ans.iter().map(|x| x.to_string()).collect::<Vec<_>>().join(" "));
}`,
  "dsa-best-time-to-buy-sell-stock": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let nums: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    if nums.is_empty() { println!("0"); return; }
    let mut best = 0i64;
    let mut low = nums[0];
    for &p in nums.get(1..).unwrap_or(&[]) {
        best = best.max(p - low);
        low = low.min(p);
    }
    println!("{}", best);
}`,
  "dsa-maximum-subarray": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let nums: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    if nums.is_empty() { return; }
    let mut best = nums[0];
    let mut cur = nums[0];
    for &x in nums.get(1..).unwrap_or(&[]) {
        cur = x.max(cur + x);
        best = best.max(cur);
    }
    println!("{}", best);
}`,
  "dsa-contains-duplicate": `use std::collections::HashSet;
use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let nums: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let set: HashSet<i64> = nums.iter().copied().collect();
    println!("{}", if set.len() != nums.len() { "true" } else { "false" });
}`,
  "dsa-product-of-array-except-self": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let nums: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let mut out = vec![1i64; n];
    let mut left = 1i64;
    for i in 0..n { out[i] = left; left *= nums[i]; }
    let mut right = 1i64;
    for i in (0..n).rev() { out[i] *= right; right *= nums[i]; }
    println!("{}", out.iter().map(|x| x.to_string()).collect::<Vec<_>>().join(" "));
}`,
  "dsa-rotate-array": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let mut nums: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    if n == 0 { println!(); return; }
    let k: usize = t[1 + n].parse::<usize>().unwrap() % n;
    if k != 0 {
        let mut rotated = nums.get(n - k..).unwrap_or(&[]).to_vec();
        rotated.extend_from_slice(&nums.get(..(n - k).min(nums.len())).unwrap_or(&[]));
        nums = rotated;
    }
    println!("{}", nums.iter().map(|x| x.to_string()).collect::<Vec<_>>().join(" "));
}`,
  "dsa-move-zeroes": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let mut nums: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let mut pos = 0usize;
    for i in 0..nums.len() {
        if nums[i] != 0 { nums[pos] = nums[i]; pos += 1; }
    }
    for i in pos..nums.len() { nums[i] = 0; }
    println!("{}", nums.iter().map(|x| x.to_string()).collect::<Vec<_>>().join(" "));
}`,
  "dsa-majority-element": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let nums: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let mut cand: Option<i64> = None;
    let mut count = 0i64;
    for &x in &nums {
        if count == 0 { cand = Some(x); count = 1; }
        else if Some(x) == cand { count += 1; }
        else { count -= 1; }
    }
    println!("{}", cand.unwrap_or(0));
}`,
  "dsa-missing-number": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let nums: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let n = nums.len() as i64;
    println!("{}", n * (n + 1) / 2 - nums.iter().sum::<i64>());
}`,
  "dsa-find-duplicate-number": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let nums: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let mut slow = nums[0];
    let mut fast = nums[0];
    loop {
        slow = nums[slow as usize];
        fast = nums[nums[fast as usize] as usize];
        if slow == fast { break; }
    }
    slow = nums[0];
    while slow != fast {
        slow = nums[slow as usize];
        fast = nums[fast as usize];
    }
    println!("{}", slow);
}`,
  "dsa-merge-sorted-array": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let a: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let m: usize = t[1 + n].parse().unwrap();
    let b: Vec<i64> = t.get(2 + n..(2 + n + m).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let mut out: Vec<i64> = Vec::new();
    let (mut i, mut j) = (0usize, 0usize);
    while i < a.len() && j < b.len() {
        if a[i] <= b[j] { out.push(a[i]); i += 1; } else { out.push(b[j]); j += 1; }
    }
    out.extend_from_slice(&a.get(i..).unwrap_or(&[]));
    out.extend_from_slice(&b.get(j..).unwrap_or(&[]));
    println!("{}", out.iter().map(|x| x.to_string()).collect::<Vec<_>>().join(" "));
}`,
  "dsa-maximum-product-subarray": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let nums: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    if nums.is_empty() { return; }
    let mut best = nums[0];
    let (mut cur_max, mut cur_min) = (nums[0], nums[0]);
    for &x in nums.get(1..).unwrap_or(&[]) {
        if x < 0 { std::mem::swap(&mut cur_max, &mut cur_min); }
        cur_max = x.max(cur_max * x);
        cur_min = x.min(cur_min * x);
        best = best.max(cur_max);
    }
    println!("{}", best);
}`,
  "dsa-trapping-rain-water": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let h: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let (mut left, mut right) = (0usize, h.len().saturating_sub(1));
    let (mut left_max, mut right_max, mut water) = (0i64, 0i64, 0i64);
    while left < right {
        if h[left] < h[right] {
            if h[left] >= left_max { left_max = h[left]; } else { water += left_max - h[left]; }
            left += 1;
        } else {
            if h[right] >= right_max { right_max = h[right]; } else { water += right_max - h[right]; }
            right -= 1;
        }
    }
    println!("{}", water);
}`,
  "dsa-jump-game": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let nums: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let mut reach = 0i64;
    let mut ok = true;
    for (i, &x) in nums.iter().enumerate() {
        if i as i64 > reach { ok = false; break; }
        reach = reach.max(i as i64 + x);
    }
    println!("{}", if ok { "true" } else { "false" });
}`,
  "dsa-jump-game-ii": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let nums: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let (mut jumps, mut cur_end, mut farthest) = (0i64, 0i64, 0i64);
    for i in 0..nums.len().saturating_sub(1) {
        farthest = farthest.max(i as i64 + nums[i]);
        if i as i64 == cur_end { jumps += 1; cur_end = farthest; }
    }
    println!("{}", jumps);
}`,
  "dsa-subarray-sum-equals-k": `use std::collections::HashMap;
use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let nums: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let k: i64 = t[1 + n].parse().unwrap();
    let mut counts: HashMap<i64, i64> = HashMap::new();
    counts.insert(0, 1);
    let (mut prefix, mut ans) = (0i64, 0i64);
    for &x in &nums {
        prefix += x;
        ans += counts.get(&(prefix - k)).copied().unwrap_or(0);
        *counts.entry(prefix).or_insert(0) += 1;
    }
    println!("{}", ans);
}`,
  "dsa-sort-colors": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let mut nums: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let (mut low, mut mid) = (0usize, 0usize);
    let mut high = nums.len().saturating_sub(1) as i64;
    while (mid as i64) <= high {
        if nums[mid] == 0 { nums.swap(low, mid); low += 1; mid += 1; }
        else if nums[mid] == 1 { mid += 1; }
        else { nums.swap(mid, high as usize); high -= 1; }
    }
    println!("{}", nums.iter().map(|x| x.to_string()).collect::<Vec<_>>().join(" "));
}`,
  "dsa-first-missing-positive": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let mut nums: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let n = nums.len();
    for i in 0..n {
        while nums[i] >= 1 && nums[i] <= n as i64 && nums[(nums[i] - 1) as usize] != nums[i] {
            let j = (nums[i] - 1) as usize;
            nums.swap(j, i);
        }
    }
    for i in 0..n {
        if nums[i] != i as i64 + 1 { println!("{}", i + 1); return; }
    }
    println!("{}", n + 1);
}`,
  "dsa-valid-palindrome": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let s = s.trim().to_string();
    let chars: Vec<char> = s.chars().filter(|c| c.is_alphanumeric()).flat_map(|c| c.to_lowercase()).collect();
    let rev: Vec<char> = chars.iter().rev().copied().collect();
    println!("{}", if chars == rev { "true" } else { "false" });
}`,
  "dsa-valid-anagram": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let lines: Vec<&str> = s.lines().collect();
    let s1 = lines.first().map(|x| x.trim()).unwrap_or("");
    let s2 = lines.get(1).map(|x| x.trim()).unwrap_or("");
    let mut a: Vec<char> = s1.chars().collect();
    let mut b: Vec<char> = s2.chars().collect();
    a.sort_unstable();
    b.sort_unstable();
    println!("{}", if a == b { "true" } else { "false" });
}`,
  "dsa-longest-substring-without-repeating": `use std::collections::HashMap;
use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let s: Vec<char> = s.trim().chars().collect();
    let mut last: HashMap<char, usize> = HashMap::new();
    let (mut best, mut start) = (0usize, 0usize);
    for (i, &c) in s.iter().enumerate() {
        if let Some(&j) = last.get(&c) {
            if j >= start { start = j + 1; }
        }
        last.insert(c, i);
        best = best.max(i - start + 1);
    }
    println!("{}", best);
}`,
  "dsa-longest-palindromic-substring": `use std::io::Read;
fn expand(s: &[char], mut l: i64, mut r: i64) -> (usize, usize) {
    while l >= 0 && r < s.len() as i64 && s[l as usize] == s[r as usize] { l -= 1; r += 1; }
    ((l + 1) as usize, r as usize)
}
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let s: Vec<char> = s.trim().chars().collect();
    if s.is_empty() { println!(); return; }
    let (mut bl, mut br) = (0usize, 1usize);
    for i in 0..s.len() {
        for (l, r) in [expand(&s, i as i64, i as i64), expand(&s, i as i64, i as i64 + 1)] {
            if r - l > br - bl { bl = l; br = r; }
        }
    }
    println!("{}", s.get(bl..(br).min(s.len())).unwrap_or(&[]).iter().collect::<String>());
}`,
  "dsa-group-anagrams": `use std::collections::HashMap;
use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let words: Vec<&str> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).to_vec();
    let mut groups: HashMap<String, Vec<String>> = HashMap::new();
    let mut order: Vec<String> = Vec::new();
    for w in words {
        let mut key: Vec<char> = w.chars().collect();
        key.sort_unstable();
        let key: String = key.into_iter().collect();
        if !groups.contains_key(&key) { order.push(key.clone()); }
        groups.entry(key).or_default().push(w.to_string());
    }
    let mut out: Vec<Vec<String>> = Vec::new();
    for k in order {
        let mut g = groups.remove(&k).unwrap();
        g.sort();
        out.push(g);
    }
    out.sort_by(|a, b| a[0].cmp(&b[0]));
    let rows: Vec<String> = out.iter().map(|g| g.join(" ")).collect();
    println!("{}", rows.join("\\n"));
}`,
  "dsa-valid-parentheses": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let s = s.trim();
    let mut stack: Vec<char> = Vec::new();
    let mut ok = true;
    for c in s.chars() {
        if "([{".contains(c) { stack.push(c); }
        else {
            let want = match c { ')' => '(', ']' => '[', '}' => '{', _ => '?' };
            if stack.pop() != Some(want) { ok = false; break; }
        }
    }
    println!("{}", if ok && stack.is_empty() { "true" } else { "false" });
}`,
  "dsa-string-to-integer-atoi": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let s: Vec<char> = s.trim().chars().collect();
    let n = s.len();
    let mut i = 0usize;
    while i < n && s[i] == ' ' { i += 1; }
    let mut sign: i128 = 1;
    if i < n && (s[i] == '+' || s[i] == '-') { sign = if s[i] == '-' { -1 } else { 1 }; i += 1; }
    let mut num: i128 = 0;
    while i < n && s[i].is_ascii_digit() {
        num = num * 10 + (s[i] as i128 - '0' as i128);
        if num > 3_000_000_000 { /* keep accumulating in i128; clamp at end */ }
        i += 1;
    }
    num *= sign;
    let clamped = num.max(-2147483648).min(2147483647);
    println!("{}", clamped);
}`,
  "dsa-longest-common-prefix": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let words: Vec<&str> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).to_vec();
    if words.is_empty() { println!(); return; }
    let mut prefix = words[0].to_string();
    for w in words.get(1..).unwrap_or(&[]) {
        while !w.starts_with(&prefix) {
            prefix.pop();
            if prefix.is_empty() { println!(); return; }
        }
    }
    println!("{}", prefix);
}`,
  "dsa-reverse-words-in-string": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let words: Vec<&str> = s.split_whitespace().collect();
    let rev: Vec<&str> = words.into_iter().rev().collect();
    println!("{}", rev.join(" "));
}`,
  "dsa-implement-strstr": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let lines: Vec<&str> = s.lines().collect();
    let hay = lines.first().map(|x| x.trim()).unwrap_or("");
    let needle = lines.get(1).map(|x| x.trim()).unwrap_or("");
    let idx = if needle.is_empty() { 0 } else { hay.find(needle).map(|i| i as i64).unwrap_or(-1) };
    println!("{}", idx);
}`,
  "dsa-count-and-say": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: i64 = t[0].parse().unwrap();
    let mut cur = "1".to_string();
    for _ in 0..n - 1 {
        let chars: Vec<char> = cur.chars().collect();
        let mut nxt = String::new();
        let mut i = 0usize;
        while i < chars.len() {
            let mut j = i;
            while j < chars.len() && chars[j] == chars[i] { j += 1; }
            nxt.push_str(&(j - i).to_string());
            nxt.push(chars[i]);
            i = j;
        }
        cur = nxt;
    }
    println!("{}", cur);
}`,
  "dsa-zigzag-conversion": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let lines: Vec<&str> = s.lines().collect();
    let st = lines.first().map(|x| x.trim()).unwrap_or("");
    let k: usize = lines.get(1).and_then(|x| x.trim().parse().ok()).unwrap_or(0);
    let chars: Vec<char> = st.chars().collect();
    if k <= 1 || k >= chars.len() { println!("{}", st); return; }
    let mut rows: Vec<String> = vec![String::new(); k];
    let (mut r, mut step): (usize, i64) = (0, 1);
    for &c in &chars {
        rows[r].push(c);
        if r == 0 { step = 1; } else if r == k - 1 { step = -1; }
        r = (r as i64 + step) as usize;
    }
    println!("{}", rows.concat());
}`,
  "dsa-minimum-window-substring": `use std::collections::HashMap;
use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let lines: Vec<&str> = s.lines().collect();
    let s1: Vec<char> = lines.first().map(|x| x.trim()).unwrap_or("").chars().collect();
    let t: Vec<char> = lines.get(1).map(|x| x.trim()).unwrap_or("").chars().collect();
    let mut need: HashMap<char, i64> = HashMap::new();
    for &c in &t { *need.entry(c).or_insert(0) += 1; }
    let mut missing = t.len() as i64;
    let (mut left, mut best) = (0usize, String::new());
    for right in 0..s1.len() {
        let c = s1[right];
        if need.get(&c).copied().unwrap_or(0) > 0 { missing -= 1; }
        *need.entry(c).or_insert(0) -= 1;
        while missing == 0 {
            if best.is_empty() || right - left + 1 < best.chars().count() {
                best = s1.get(left..=right).unwrap_or(&[]).iter().collect();
            }
            let lc = s1[left];
            *need.entry(lc).or_insert(0) += 1;
            if need[&lc] > 0 { missing += 1; }
            left += 1;
        }
    }
    println!("{}", best);
}`,
  "dsa-longest-repeating-character-replacement": `use std::collections::HashMap;
use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let lines: Vec<&str> = s.lines().collect();
    let st: Vec<char> = lines.first().map(|x| x.trim()).unwrap_or("").chars().collect();
    let k: usize = lines.get(1).and_then(|x| x.trim().parse().ok()).unwrap_or(0);
    let mut counts: HashMap<char, i64> = HashMap::new();
    let (mut best, mut left) = (0usize, 0usize);
    for right in 0..st.len() {
        *counts.entry(st[right]).or_insert(0) += 1;
        while right - left + 1 - counts.values().copied().max().unwrap_or(0) as usize > k {
            *counts.get_mut(&st[left]).unwrap() -= 1;
            left += 1;
        }
        best = best.max(right - left + 1);
    }
    println!("{}", best);
}`,
  "dsa-first-unique-character": `use std::collections::HashMap;
use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let st: Vec<char> = s.trim().chars().collect();
    let mut counts: HashMap<char, i64> = HashMap::new();
    for &c in &st { *counts.entry(c).or_insert(0) += 1; }
    for (i, &c) in st.iter().enumerate() {
        if counts[&c] == 1 { println!("{}", i); return; }
    }
    println!("-1");
}`,
  "dsa-intersection-of-two-arrays": `use std::collections::HashSet;
use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let a: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let m: usize = t[1 + n].parse().unwrap();
    let b: Vec<i64> = t.get(2 + n..(2 + n + m).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let sa: HashSet<i64> = a.into_iter().collect();
    let sb: HashSet<i64> = b.into_iter().collect();
    let mut out: Vec<i64> = sa.intersection(&sb).copied().collect();
    out.sort_unstable();
    println!("{}", out.iter().map(|x| x.to_string()).collect::<Vec<_>>().join(" "));
}`,
  "dsa-happy-number": `use std::collections::HashSet;
use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let mut n: i64 = t[0].parse().unwrap();
    let mut seen: HashSet<i64> = HashSet::new();
    while n != 1 && !seen.contains(&n) {
        seen.insert(n);
        n = n.to_string().chars().map(|d| { let v = d as i64 - '0' as i64; v * v }).sum();
    }
    println!("{}", if n == 1 { "true" } else { "false" });
}`,
  "dsa-isomorphic-strings": `use std::collections::HashMap;
use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let lines: Vec<&str> = s.lines().collect();
    let s1: Vec<char> = lines.first().map(|x| x.trim()).unwrap_or("").chars().collect();
    let s2: Vec<char> = lines.get(1).map(|x| x.trim()).unwrap_or("").chars().collect();
    let mut ok = s1.len() == s2.len();
    let mut m1: HashMap<char, char> = HashMap::new();
    let mut m2: HashMap<char, char> = HashMap::new();
    if ok {
        for (&a, &b) in s1.iter().zip(s2.iter()) {
            if m1.get(&a).copied().unwrap_or(b) != b || m2.get(&b).copied().unwrap_or(a) != a { ok = false; break; }
            m1.insert(a, b);
            m2.insert(b, a);
        }
    }
    println!("{}", if ok { "true" } else { "false" });
}`,
  "dsa-word-pattern": `use std::collections::HashMap;
use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let lines: Vec<&str> = s.lines().collect();
    let pattern: Vec<char> = lines.first().map(|x| x.trim()).unwrap_or("").chars().collect();
    let words: Vec<&str> = lines.get(1).map(|x| x.trim().split_whitespace().collect()).unwrap_or_default();
    let mut ok = words.len() == pattern.len();
    let mut p2w: HashMap<char, String> = HashMap::new();
    let mut w2p: HashMap<String, char> = HashMap::new();
    if ok {
        for (&p, &w) in pattern.iter().zip(words.iter()) {
            if p2w.get(&p).map(|x| x.as_str()).unwrap_or(w) != w || w2p.get(w).copied().unwrap_or(p) != p { ok = false; break; }
            p2w.insert(p, w.to_string());
            w2p.insert(w.to_string(), p);
        }
    }
    println!("{}", if ok { "true" } else { "false" });
}`,
  "dsa-ransom-note": `use std::collections::HashMap;
use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let lines: Vec<&str> = s.lines().collect();
    let note: Vec<char> = lines.first().map(|x| x.trim()).unwrap_or("").chars().collect();
    let mag: Vec<char> = lines.get(1).map(|x| x.trim()).unwrap_or("").chars().collect();
    let mut need: HashMap<char, i64> = HashMap::new();
    for &c in &note { *need.entry(c).or_insert(0) += 1; }
    let mut have: HashMap<char, i64> = HashMap::new();
    for &c in &mag { *have.entry(c).or_insert(0) += 1; }
    let ok = need.iter().all(|(c, &k)| have.get(c).copied().unwrap_or(0) >= k);
    println!("{}", if ok { "true" } else { "false" });
}`,
  "dsa-longest-consecutive-sequence": `use std::collections::HashSet;
use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let nums: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let set: HashSet<i64> = nums.iter().copied().collect();
    let mut best = 0i64;
    for &x in &set {
        if !set.contains(&(x - 1)) {
            let (mut cur, mut len) = (x, 1i64);
            while set.contains(&(cur + 1)) { cur += 1; len += 1; }
            best = best.max(len);
        }
    }
    println!("{}", best);
}`,
  "dsa-top-k-frequent-elements": `use std::collections::HashMap;
use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let nums: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let k: usize = t[1 + n].parse().unwrap();
    let mut counts: HashMap<i64, i64> = HashMap::new();
    for &x in &nums { *counts.entry(x).or_insert(0) += 1; }
    let mut ranked: Vec<(i64, i64)> = counts.into_iter().collect();
    ranked.sort_by(|a, b| b.1.cmp(&a.1).then(b.0.cmp(&a.0)));
    let out: Vec<i64> = ranked.iter().take(k).map(|(v, _)| *v).collect();
    println!("{}", out.iter().map(|x| x.to_string()).collect::<Vec<_>>().join(" "));
}`,
  "dsa-valid-sudoku": `use std::collections::HashSet;
use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let lines: Vec<&str> = s.lines().collect();
    let dims: Vec<&str> = lines.first().map(|x| x.split_whitespace().collect()).unwrap_or_default();
    let r: usize = dims.first().and_then(|x| x.parse().ok()).unwrap_or(0);
    let grid: Vec<Vec<char>> = (0..r).map(|i| lines.get(1 + i).map(|l| l.trim().replace(' ', "").chars().collect()).unwrap_or_default()).collect();
    let mut rows: Vec<HashSet<char>> = vec![HashSet::new(); 9];
    let mut cols: Vec<HashSet<char>> = vec![HashSet::new(); 9];
    let mut boxes: Vec<HashSet<char>> = vec![HashSet::new(); 9];
    let mut ok = true;
    for i in 0..9 {
        for j in 0..9 {
            let v = grid.get(i).and_then(|row| row.get(j)).copied().unwrap_or('.');
            if v == '.' { continue; }
            let b = (i / 3) * 3 + j / 3;
            if rows[i].contains(&v) || cols[j].contains(&v) || boxes[b].contains(&v) { ok = false; break; }
            rows[i].insert(v); cols[j].insert(v); boxes[b].insert(v);
        }
        if !ok { break; }
    }
    println!("{}", if ok { "true" } else { "false" });
}`,
  "dsa-contains-duplicate-ii": `use std::collections::HashMap;
use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let nums: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let k: i64 = t[1 + n].parse().unwrap();
    let mut last: HashMap<i64, i64> = HashMap::new();
    let mut ok = false;
    for (i, &x) in nums.iter().enumerate() {
        if let Some(&j) = last.get(&x) {
            if i as i64 - j <= k { ok = true; break; }
        }
        last.insert(x, i as i64);
    }
    println!("{}", if ok { "true" } else { "false" });
}`,
  "dsa-subarray-sum-divisible-by-k": `use std::collections::HashMap;
use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let nums: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let k: i64 = t[1 + n].parse().unwrap();
    let mut counts: HashMap<i64, i64> = HashMap::new();
    counts.insert(0, 1);
    let (mut prefix, mut ans) = (0i64, 0i64);
    for &x in &nums {
        prefix = ((prefix + x) % k + k) % k;
        ans += counts.get(&prefix).copied().unwrap_or(0);
        *counts.entry(prefix).or_insert(0) += 1;
    }
    println!("{}", ans);
}`,
  "dsa-find-all-anagrams-in-string": `use std::collections::HashMap;
use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let lines: Vec<&str> = s.lines().collect();
    let st: Vec<char> = lines.first().map(|x| x.trim()).unwrap_or("").chars().collect();
    let p: Vec<char> = lines.get(1).map(|x| x.trim()).unwrap_or("").chars().collect();
    let mut need: HashMap<char, i64> = HashMap::new();
    for &c in &p { *need.entry(c).or_insert(0) += 1; }
    let mut window: HashMap<char, i64> = HashMap::new();
    let mut out: Vec<i64> = Vec::new();
    for (i, &c) in st.iter().enumerate() {
        *window.entry(c).or_insert(0) += 1;
        if i >= p.len() {
            let left = st[i - p.len()];
            let e = window.get_mut(&left).unwrap();
            *e -= 1;
            if *e == 0 { window.remove(&left); }
        }
        if window == need { out.push(i as i64 - p.len() as i64 + 1); }
    }
    println!("{}", out.iter().map(|x| x.to_string()).collect::<Vec<_>>().join(" "));
}`,
  "dsa-two-sum-ii": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let nums: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let target: i64 = t[1 + n].parse().unwrap();
    let (mut left, mut right) = (0i64, nums.len() as i64 - 1);
    let mut ans: Vec<i64> = vec![-1, -1];
    while left < right {
        let total = nums[left as usize] + nums[right as usize];
        if total == target { ans = vec![left + 1, right + 1]; break; }
        if total < target { left += 1; } else { right -= 1; }
    }
    println!("{}", ans.iter().map(|x| x.to_string()).collect::<Vec<_>>().join(" "));
}`,
  "dsa-container-with-most-water": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let h: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let (mut left, mut right) = (0usize, h.len().saturating_sub(1));
    let mut best = 0i64;
    while left < right {
        best = best.max(h[left].min(h[right]) * (right - left) as i64);
        if h[left] < h[right] { left += 1; } else { right -= 1; }
    }
    println!("{}", best);
}`,
  "dsa-three-sum": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let mut nums: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    nums.sort_unstable();
    let mut out: Vec<Vec<i64>> = Vec::new();
    let n = nums.len();
    for i in 0..n.saturating_sub(2) {
        if i > 0 && nums[i] == nums[i - 1] { continue; }
        let (mut left, mut right) = (i + 1, n - 1);
        while left < right {
            let total = nums[i] + nums[left] + nums[right];
            if total == 0 {
                out.push(vec![nums[i], nums[left], nums[right]]);
                left += 1; right -= 1;
                while left < right && nums[left] == nums[left - 1] { left += 1; }
                while left < right && nums[right] == nums[right + 1] { right -= 1; }
            } else if total < 0 { left += 1; } else { right -= 1; }
        }
    }
    let rows: Vec<String> = out.iter().map(|r| r.iter().map(|x| x.to_string()).collect::<Vec<_>>().join(" ")).collect();
    println!("{}", rows.join("\\n"));
}`,
  "dsa-remove-duplicates-sorted": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let nums: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    if nums.is_empty() { println!(); return; }
    let mut out: Vec<i64> = vec![nums[0]];
    for i in 1..nums.len() {
        if nums[i] != out[out.len() - 1] { out.push(nums[i]); }
    }
    println!("{}", out.iter().map(|x| x.to_string()).collect::<Vec<_>>().join(" "));
}`,
  "dsa-squares-of-sorted-array": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let nums: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let n = nums.len();
    let mut out = vec![0i64; n];
    let (mut left, mut right) = (0i64, n as i64 - 1);
    let mut pos = n as i64 - 1;
    while left <= right {
        if nums[left as usize].abs() > nums[right as usize].abs() {
            out[pos as usize] = nums[left as usize] * nums[left as usize];
            left += 1;
        } else {
            out[pos as usize] = nums[right as usize] * nums[right as usize];
            right -= 1;
        }
        pos -= 1;
    }
    println!("{}", out.iter().map(|x| x.to_string()).collect::<Vec<_>>().join(" "));
}`,
  "dsa-valid-palindrome-ii": `use std::io::Read;
fn is_pal(s: &[char], mut l: i64, mut r: i64) -> bool {
    while l < r {
        if s[l as usize] != s[r as usize] { return false; }
        l += 1; r -= 1;
    }
    true
}
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let s: Vec<char> = s.trim().chars().collect();
    let (mut left, mut right) = (0i64, s.len() as i64 - 1);
    let mut ok = true;
    while left < right {
        if s[left as usize] != s[right as usize] {
            ok = is_pal(&s, left + 1, right) || is_pal(&s, left, right - 1);
            break;
        }
        left += 1; right -= 1;
    }
    println!("{}", if ok { "true" } else { "false" });
}`,
  "dsa-three-sum-closest": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let mut nums: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let target: i64 = t[1 + n].parse().unwrap();
    nums.sort_unstable();
    let mut best = nums[0] + nums[1] + nums[2];
    let n = nums.len();
    for i in 0..n - 2 {
        let (mut left, mut right) = (i + 1, n - 1);
        while left < right {
            let total = nums[i] + nums[left] + nums[right];
            if (total - target).abs() < (best - target).abs() { best = total; }
            if total < target { left += 1; } else if total > target { right -= 1; } else { println!("{}", total); return; }
        }
    }
    println!("{}", best);
}`,
  "dsa-four-sum": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let mut nums: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let target: i64 = t[1 + n].parse().unwrap();
    nums.sort_unstable();
    let mut out: Vec<Vec<i64>> = Vec::new();
    let n = nums.len();
    for i in 0..n.saturating_sub(3) {
        if i > 0 && nums[i] == nums[i - 1] { continue; }
        for j in i + 1..n.saturating_sub(2) {
            if j > i + 1 && nums[j] == nums[j - 1] { continue; }
            let (mut left, mut right) = (j + 1, n - 1);
            while left < right {
                let total = nums[i] + nums[j] + nums[left] + nums[right];
                if total == target {
                    out.push(vec![nums[i], nums[j], nums[left], nums[right]]);
                    left += 1; right -= 1;
                    while left < right && nums[left] == nums[left - 1] { left += 1; }
                    while left < right && nums[right] == nums[right + 1] { right -= 1; }
                } else if total < target { left += 1; } else { right -= 1; }
            }
        }
    }
    let rows: Vec<String> = out.iter().map(|r| r.iter().map(|x| x.to_string()).collect::<Vec<_>>().join(" ")).collect();
    println!("{}", rows.join("\\n"));
}`,
  "dsa-sort-array-by-parity": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let nums: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    // Python: evens are x % 2 == 0; odds are x % 2 == 1 — in Python -3 % 2 == 1,
    // so "odd" is really "not even". Use that, not Rust's signed remainder.
    let mut out: Vec<i64> = nums.iter().copied().filter(|x| x % 2 == 0).collect();
    out.extend(nums.iter().copied().filter(|x| x % 2 != 0));
    println!("{}", out.iter().map(|x| x.to_string()).collect::<Vec<_>>().join(" "));
}`,
  "dsa-remove-element": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let nums: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let val: i64 = t[1 + n].parse().unwrap();
    let out: Vec<i64> = nums.into_iter().filter(|x| *x != val).collect();
    println!("{}", out.iter().map(|x| x.to_string()).collect::<Vec<_>>().join(" "));
}`,
  "dsa-max-sum-subarray-size-k": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let nums: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let k: usize = t[1 + n].parse().unwrap();
    if k == 0 || nums.is_empty() { println!("0"); return; }
    let k = k.min(nums.len());
    let mut window: i64 = nums.get(..(k).min(nums.len())).unwrap_or(&[]).iter().sum();
    let mut best = window;
    for i in k..nums.len() {
        window += nums[i] - nums[i - k];
        best = best.max(window);
    }
    println!("{}", best);
}`,
  "dsa-longest-substring-k-distinct": `use std::collections::HashMap;
use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let lines: Vec<&str> = s.lines().collect();
    let st: Vec<char> = lines.first().map(|x| x.trim()).unwrap_or("").chars().collect();
    let k: usize = lines.get(1).and_then(|x| x.trim().parse().ok()).unwrap_or(0);
    let mut counts: HashMap<char, i64> = HashMap::new();
    let (mut best, mut left) = (0usize, 0usize);
    for right in 0..st.len() {
        *counts.entry(st[right]).or_insert(0) += 1;
        while counts.len() > k {
            let e = counts.get_mut(&st[left]).unwrap();
            *e -= 1;
            if *e == 0 { counts.remove(&st[left]); }
            left += 1;
        }
        best = best.max(right - left + 1);
    }
    println!("{}", best);
}`,
  "dsa-minimum-size-subarray-sum": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let nums: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let target: i64 = t[1 + n].parse().unwrap();
    let mut best: Option<usize> = None;
    let (mut left, mut total) = (0usize, 0i64);
    for right in 0..nums.len() {
        total += nums[right];
        while total >= target {
            best = Some(best.map_or(right - left + 1, |b: usize| b.min(right - left + 1)));
            total -= nums[left];
            left += 1;
        }
    }
    println!("{}", best.unwrap_or(0));
}`,
  "dsa-permutation-in-string": `use std::collections::HashMap;
use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let lines: Vec<&str> = s.lines().collect();
    let s1: Vec<char> = lines.first().map(|x| x.trim()).unwrap_or("").chars().collect();
    let s2: Vec<char> = lines.get(1).map(|x| x.trim()).unwrap_or("").chars().collect();
    let mut need: HashMap<char, i64> = HashMap::new();
    for &c in &s1 { *need.entry(c).or_insert(0) += 1; }
    let mut window: HashMap<char, i64> = HashMap::new();
    let k = s1.len();
    let mut ok = false;
    for (i, &c) in s2.iter().enumerate() {
        *window.entry(c).or_insert(0) += 1;
        if i >= k {
            let left = s2[i - k];
            let e = window.get_mut(&left).unwrap();
            *e -= 1;
            if *e == 0 { window.remove(&left); }
        }
        if window == need { ok = true; break; }
    }
    println!("{}", if ok { "true" } else { "false" });
}`,
  "dsa-fruits-into-baskets": `use std::collections::HashMap;
use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let nums: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let mut counts: HashMap<i64, i64> = HashMap::new();
    let (mut best, mut left) = (0usize, 0usize);
    for right in 0..nums.len() {
        *counts.entry(nums[right]).or_insert(0) += 1;
        while counts.len() > 2 {
            let e = counts.get_mut(&nums[left]).unwrap();
            *e -= 1;
            if *e == 0 { counts.remove(&nums[left]); }
            left += 1;
        }
        best = best.max(right - left + 1);
    }
    println!("{}", best);
}`,
  "dsa-maximum-vowels-in-substring": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let lines: Vec<&str> = s.lines().collect();
    let st: Vec<char> = lines.first().map(|x| x.trim()).unwrap_or("").chars().collect();
    let k: usize = lines.get(1).and_then(|x| x.trim().parse().ok()).unwrap_or(0);
    let is_vowel = |c: char| matches!(c, 'a' | 'e' | 'i' | 'o' | 'u');
    let k = k.min(st.len());
    let mut window: i64 = st.get(..(k).min(st.len())).unwrap_or(&[]).iter().filter(|&&c| is_vowel(c)).count() as i64;
    let mut best = window;
    for i in k..st.len() {
        if is_vowel(st[i]) { window += 1; }
        if is_vowel(st[i - k]) { window -= 1; }
        best = best.max(window);
    }
    println!("{}", best);
}`,
  "dsa-sliding-window-maximum": `use std::collections::VecDeque;
use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let nums: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let k: usize = t[1 + n].parse().unwrap();
    let mut dq: VecDeque<usize> = VecDeque::new();
    let mut out: Vec<i64> = Vec::new();
    for (i, &x) in nums.iter().enumerate() {
        while let Some(&back) = dq.back() {
            if nums[back] <= x { dq.pop_back(); } else { break; }
        }
        dq.push_back(i);
        if let Some(&front) = dq.front() {
            if front + k <= i { dq.pop_front(); }
        }
        if i + 1 >= k { out.push(nums[*dq.front().unwrap()]); }
    }
    println!("{}", out.iter().map(|x| x.to_string()).collect::<Vec<_>>().join(" "));
}`,
  "dsa-binary-subarrays-with-sum": `use std::collections::HashMap;
use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let nums: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let goal: i64 = t[1 + n].parse().unwrap();
    let mut counts: HashMap<i64, i64> = HashMap::new();
    counts.insert(0, 1);
    let (mut prefix, mut ans) = (0i64, 0i64);
    for &x in &nums {
        prefix += x;
        ans += counts.get(&(prefix - goal)).copied().unwrap_or(0);
        *counts.entry(prefix).or_insert(0) += 1;
    }
    println!("{}", ans);
}`,
  "dsa-longest-subarray-of-ones-after-deleting-one": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let nums: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let (mut best, mut left, mut zeros) = (0usize, 0usize, 0i64);
    for right in 0..nums.len() {
        if nums[right] == 0 { zeros += 1; }
        while zeros > 1 {
            if nums[left] == 0 { zeros -= 1; }
            left += 1;
        }
        best = best.max(right - left);
    }
    println!("{}", best);
}`,
  "dsa-max-consecutive-ones-iii": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let nums: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let k: i64 = t[1 + n].parse().unwrap();
    let (mut best, mut left, mut zeros) = (0usize, 0usize, 0i64);
    for right in 0..nums.len() {
        if nums[right] == 0 { zeros += 1; }
        while zeros > k {
            if nums[left] == 0 { zeros -= 1; }
            left += 1;
        }
        best = best.max(right - left + 1);
    }
    println!("{}", best);
}`,
  "dsa-evaluate-reverse-polish-notation": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let tokens: Vec<&str> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).to_vec();
    let mut stack: Vec<i64> = Vec::new();
    for tok in tokens {
        match tok {
            "+" | "-" | "*" | "/" => {
                let b = stack.pop().unwrap();
                let a = stack.pop().unwrap();
                stack.push(match tok { "+" => a + b, "-" => a - b, "*" => a * b, _ => a / b });
            }
            _ => stack.push(tok.parse().unwrap()),
        }
    }
    println!("{}", stack[0]);
}`,
  "dsa-daily-temperatures": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let temps: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let mut out = vec![0i64; temps.len()];
    let mut stack: Vec<usize> = Vec::new();
    for (i, &temp) in temps.iter().enumerate() {
        while let Some(&j) = stack.last() {
            if temps[j] < temp { stack.pop(); out[j] = (i - j) as i64; } else { break; }
        }
        stack.push(i);
    }
    println!("{}", out.iter().map(|x| x.to_string()).collect::<Vec<_>>().join(" "));
}`,
  "dsa-next-greater-element-i": `use std::collections::HashMap;
use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let a: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let m: usize = t[1 + n].parse().unwrap();
    let b: Vec<i64> = t.get(2 + n..(2 + n + m).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let mut nxt: HashMap<i64, i64> = HashMap::new();
    let mut stack: Vec<i64> = Vec::new();
    for &x in &b {
        while let Some(&top) = stack.last() {
            if top < x { nxt.insert(stack.pop().unwrap(), x); } else { break; }
        }
        stack.push(x);
    }
    while let Some(x) = stack.pop() { nxt.insert(x, -1); }
    let out: Vec<i64> = a.iter().map(|x| nxt[x]).collect();
    println!("{}", out.iter().map(|x| x.to_string()).collect::<Vec<_>>().join(" "));
}`,
  "dsa-largest-rectangle-in-histogram": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let mut h: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    h.push(0);
    let mut stack: Vec<usize> = Vec::new();
    let mut best = 0i64;
    for (i, &x) in h.iter().enumerate() {
        while let Some(&top) = stack.last() {
            if h[top] > x {
                stack.pop();
                let height = h[top];
                let left = stack.last().map(|&v| v as i64).unwrap_or(-1);
                best = best.max(height * (i as i64 - left - 1));
            } else { break; }
        }
        stack.push(i);
    }
    println!("{}", best);
}`,
  "dsa-simplify-path": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let path = s.trim();
    let mut stack: Vec<&str> = Vec::new();
    for part in path.split('/') {
        if part.is_empty() || part == "." { continue; }
        if part == ".." { stack.pop(); } else { stack.push(part); }
    }
    println!("/{}", stack.join("/"));
}`,
  "dsa-decode-string": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let s = s.trim();
    let mut stack: Vec<(String, i64)> = Vec::new();
    let mut cur = String::new();
    let mut num = 0i64;
    for c in s.chars() {
        if c.is_ascii_digit() { num = num * 10 + (c as i64 - '0' as i64); }
        else if c == '[' { stack.push((std::mem::take(&mut cur), num)); num = 0; }
        else if c == ']' {
            let (prev, k) = stack.pop().unwrap();
            cur = prev + &cur.repeat(k as usize);
        } else { cur.push(c); }
    }
    println!("{}", cur);
}`,
  "dsa-remove-duplicate-letters": `use std::collections::{HashMap, HashSet};
use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let s: Vec<char> = s.trim().chars().collect();
    let mut remaining: HashMap<char, i64> = HashMap::new();
    for &c in &s { *remaining.entry(c).or_insert(0) += 1; }
    let mut stack: Vec<char> = Vec::new();
    let mut in_stack: HashSet<char> = HashSet::new();
    for &c in &s {
        *remaining.get_mut(&c).unwrap() -= 1;
        if in_stack.contains(&c) { continue; }
        while let Some(&top) = stack.last() {
            if top > c && remaining.get(&top).copied().unwrap_or(0) > 0 {
                in_stack.remove(&stack.pop().unwrap());
            } else { break; }
        }
        stack.push(c);
        in_stack.insert(c);
    }
    println!("{}", stack.iter().collect::<String>());
}`,
  "dsa-asteroid-collision": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let nums: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let mut stack: Vec<i64> = Vec::new();
    for &a in &nums {
        let mut alive = true;
        while alive && a < 0 {
            match stack.last() {
                Some(&top) if top > 0 => {
                    if top < -a { stack.pop(); }
                    else if top == -a { stack.pop(); alive = false; }
                    else { alive = false; }
                }
                _ => break,
            }
        }
        if alive { stack.push(a); }
    }
    println!("{}", stack.iter().map(|x| x.to_string()).collect::<Vec<_>>().join(" "));
}`,
  "dsa-rotting-oranges": `use std::collections::VecDeque;
use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let r: usize = t[0].parse().unwrap();
    let c: usize = t[1].parse().unwrap();
    let vals: Vec<i64> = t.get(2..).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let mut grid: Vec<Vec<i64>> = (0..r).map(|i| vals.get(i * c..(i + 1) * c).unwrap_or(&[]).to_vec()).collect();
    let mut q: VecDeque<(usize, usize, i64)> = VecDeque::new();
    let mut fresh = 0i64;
    for i in 0..r {
        for j in 0..c {
            if grid[i][j] == 2 { q.push_back((i, j, 0)); }
            else if grid[i][j] == 1 { fresh += 1; }
        }
    }
    let mut minutes = 0i64;
    while let Some((i, j, tm)) = q.pop_front() {
        minutes = minutes.max(tm);
        for (di, dj) in [(1i64, 0i64), (-1, 0), (0, 1), (0, -1)] {
            let (ni, nj) = (i as i64 + di, j as i64 + dj);
            if ni >= 0 && ni < r as i64 && nj >= 0 && nj < c as i64 && grid[ni as usize][nj as usize] == 1 {
                grid[ni as usize][nj as usize] = 2;
                fresh -= 1;
                q.push_back((ni as usize, nj as usize, tm + 1));
            }
        }
    }
    println!("{}", if fresh == 0 { minutes } else { -1 });
}`,
  "dsa-design-circular-queue": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let ops: Vec<String> = s.lines().map(|l| l.trim().to_string()).filter(|l| !l.is_empty()).collect();
    if ops.is_empty() { return; }
    let k: usize = ops[0].parse().unwrap();
    let mut q = vec![0i64; k];
    let (mut head, mut size) = (0usize, 0usize);
    let mut out: Vec<String> = Vec::new();
    for op in ops.get(1..).unwrap_or(&[]) {
        let parts: Vec<&str> = op.split_whitespace().collect();
        match parts[0] {
            "enQueue" => {
                if size == k { out.push("false".to_string()); }
                else { q[(head + size) % k] = parts[1].parse().unwrap(); size += 1; out.push("true".to_string()); }
            }
            "deQueue" => {
                if size == 0 { out.push("false".to_string()); }
                else { head = (head + 1) % k; size -= 1; out.push("true".to_string()); }
            }
            "Front" => out.push(if size > 0 { q[head].to_string() } else { "-1".to_string() }),
            "Rear" => out.push(if size > 0 { q[(head + size - 1) % k].to_string() } else { "-1".to_string() }),
            "isEmpty" => out.push(if size == 0 { "true".to_string() } else { "false".to_string() }),
            "isFull" => out.push(if size == k { "true".to_string() } else { "false".to_string() }),
            _ => {}
        }
    }
    println!("{}", out.join("\\n"));
}`,
  "dsa-reveal-cards-in-increasing-order": `use std::collections::VecDeque;
use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let mut deck: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    deck.sort_unstable();
    let mut q: VecDeque<usize> = (0..deck.len()).collect();
    let mut out = vec![0i64; deck.len()];
    for &v in &deck {
        let i = q.pop_front().unwrap();
        out[i] = v;
        if let Some(x) = q.pop_front() { q.push_back(x); }
    }
    println!("{}", out.iter().map(|x| x.to_string()).collect::<Vec<_>>().join(" "));
}`,
  "dsa-time-needed-to-buy-tickets": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let tickets: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let k: usize = t[1 + n].parse().unwrap();
    let mut total = 0i64;
    for (i, &x) in tickets.iter().enumerate() {
        if i <= k { total += x.min(tickets[k]); } else { total += x.min(tickets[k] - 1); }
    }
    println!("{}", total);
}`,
  "dsa-dota2-senate": `use std::collections::VecDeque;
use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let senate: Vec<char> = s.trim().chars().collect();
    let n = senate.len();
    let mut radiant: VecDeque<usize> = VecDeque::new();
    let mut dire: VecDeque<usize> = VecDeque::new();
    for (i, &c) in senate.iter().enumerate() {
        if c == 'R' { radiant.push_back(i); } else { dire.push_back(i); }
    }
    while !radiant.is_empty() && !dire.is_empty() {
        let r = radiant.pop_front().unwrap();
        let d = dire.pop_front().unwrap();
        if r < d { radiant.push_back(r + n); } else { dire.push_back(d + n); }
    }
    println!("{}", if !radiant.is_empty() { "Radiant" } else { "Dire" });
}`,
  "dsa-number-of-students-unable-to-eat-lunch": `use std::collections::{HashMap, VecDeque};
use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let a: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let m: usize = t[1 + n].parse().unwrap();
    let b: Vec<i64> = t.get(2 + n..(2 + n + m).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let mut counts: HashMap<i64, i64> = HashMap::new();
    for &x in &a { *counts.entry(x).or_insert(0) += 1; }
    let mut q: VecDeque<i64> = a.into_iter().collect();
    for &sand in &b {
        if counts.get(&sand).copied().unwrap_or(0) == 0 { break; }
        while *q.front().unwrap() != sand {
            let x = q.pop_front().unwrap();
            q.push_back(x);
        }
        q.pop_front();
        *counts.get_mut(&sand).unwrap() -= 1;
    }
    println!("{}", q.len());
}`,
  "dsa-reverse-linked-list": `use std::cell::RefCell;
use std::io::Read;
use std::rc::Rc;
type Link = Option<Rc<RefCell<ListNode>>>;
struct ListNode { val: i64, next: Link }
fn build_list(vals: &[i64]) -> Link {
    let mut head: Link = None;
    let mut tail: Link = None;
    for &v in vals {
        let node = Rc::new(RefCell::new(ListNode { val: v, next: None }));
        match &tail { Some(t) => t.borrow_mut().next = Some(node.clone()), None => head = Some(node.clone()) }
        tail = Some(node);
    }
    head
}
fn fmt_list(head: &Link) -> String {
    let mut vals = Vec::new();
    let mut cur = head.clone();
    while let Some(n) = cur { vals.push(n.borrow().val.to_string()); cur = n.borrow().next.clone(); }
    vals.join(" ")
}
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let head = build_list(&t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect::<Vec<i64>>());
    let mut prev: Link = None;
    let mut cur = head;
    while let Some(node) = cur {
        let nxt = node.borrow().next.clone();
        node.borrow_mut().next = prev;
        prev = Some(node);
        cur = nxt;
    }
    println!("{}", fmt_list(&prev));
}`,
  "dsa-merge-two-sorted-lists": `use std::cell::RefCell;
use std::io::Read;
use std::rc::Rc;
type Link = Option<Rc<RefCell<ListNode>>>;
struct ListNode { val: i64, next: Link }
fn build_list(vals: &[i64]) -> Link {
    let mut head: Link = None;
    let mut tail: Link = None;
    for &v in vals {
        let node = Rc::new(RefCell::new(ListNode { val: v, next: None }));
        match &tail { Some(t) => t.borrow_mut().next = Some(node.clone()), None => head = Some(node.clone()) }
        tail = Some(node);
    }
    head
}
fn fmt_list(head: &Link) -> String {
    let mut vals = Vec::new();
    let mut cur = head.clone();
    while let Some(n) = cur { vals.push(n.borrow().val.to_string()); cur = n.borrow().next.clone(); }
    vals.join(" ")
}
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let a: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let m: usize = t[1 + n].parse().unwrap();
    let b: Vec<i64> = t.get(2 + n..(2 + n + m).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let mut h1 = build_list(&a);
    let mut h2 = build_list(&b);
    let dummy = Rc::new(RefCell::new(ListNode { val: 0, next: None }));
    let mut tail = dummy.clone();
    while h1.is_some() && h2.is_some() {
        if h1.as_ref().unwrap().borrow().val <= h2.as_ref().unwrap().borrow().val {
            let nxt = h1.as_ref().unwrap().borrow().next.clone();
            tail.borrow_mut().next = h1.clone();
            tail = h1.unwrap();
            h1 = nxt;
        } else {
            let nxt = h2.as_ref().unwrap().borrow().next.clone();
            tail.borrow_mut().next = h2.clone();
            tail = h2.unwrap();
            h2 = nxt;
        }
    }
    tail.borrow_mut().next = if h1.is_some() { h1 } else { h2 };
    let result = dummy.borrow().next.clone();
    println!("{}", fmt_list(&result));
}`,
  "dsa-linked-list-cycle": `use std::cell::RefCell;
use std::io::Read;
use std::rc::Rc;
type Link = Option<Rc<RefCell<ListNode>>>;
struct ListNode { val: i64, next: Link }
fn build_list(vals: &[i64]) -> Link {
    let mut head: Link = None;
    let mut tail: Link = None;
    for &v in vals {
        let node = Rc::new(RefCell::new(ListNode { val: v, next: None }));
        match &tail { Some(t) => t.borrow_mut().next = Some(node.clone()), None => head = Some(node.clone()) }
        tail = Some(node);
    }
    head
}
fn next_of(n: &Link) -> Link { n.as_ref().and_then(|x| x.borrow().next.clone()) }
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let pos: i64 = t[t.len() - 1].parse().unwrap();
    let n: usize = t[0].parse().unwrap();
    let head = build_list(&t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect::<Vec<i64>>());
    if pos < 0 || head.is_none() { println!("false"); return; }
    // link tail -> node at pos
    let mut target = head.clone();
    for _ in 0..pos { target = next_of(&target); }
    let mut tail = head.clone();
    while next_of(&tail).is_some() { tail = next_of(&tail); }
    if let Some(tn) = &tail { tn.borrow_mut().next = target; }
    let mut slow = head.clone();
    let mut fast = head.clone();
    let mut found = false;
    while fast.is_some() && next_of(&fast).is_some() {
        slow = next_of(&slow);
        fast = next_of(&next_of(&fast));
        if let (Some(a), Some(b)) = (&slow, &fast) {
            if Rc::ptr_eq(a, b) { found = true; break; }
        }
    }
    println!("{}", if found { "true" } else { "false" });
}`,
  "dsa-remove-nth-node-from-end": `use std::cell::RefCell;
use std::io::Read;
use std::rc::Rc;
type Link = Option<Rc<RefCell<ListNode>>>;
struct ListNode { val: i64, next: Link }
fn build_list(vals: &[i64]) -> Link {
    let mut head: Link = None;
    let mut tail: Link = None;
    for &v in vals {
        let node = Rc::new(RefCell::new(ListNode { val: v, next: None }));
        match &tail { Some(t) => t.borrow_mut().next = Some(node.clone()), None => head = Some(node.clone()) }
        tail = Some(node);
    }
    head
}
fn fmt_list(head: &Link) -> String {
    let mut vals = Vec::new();
    let mut cur = head.clone();
    while let Some(n) = cur { vals.push(n.borrow().val.to_string()); cur = n.borrow().next.clone(); }
    vals.join(" ")
}
fn next_of(n: &Link) -> Link { n.as_ref().and_then(|x| x.borrow().next.clone()) }
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let k: usize = t[t.len() - 1].parse().unwrap();
    let n: usize = t[0].parse().unwrap();
    let head = build_list(&t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect::<Vec<i64>>());
    let dummy = Rc::new(RefCell::new(ListNode { val: 0, next: head }));
    let mut fast: Link = Some(dummy.clone());
    let mut slow: Link = Some(dummy.clone());
    for _ in 0..k + 1 { fast = next_of(&fast); }
    while fast.is_some() { fast = next_of(&fast); slow = next_of(&slow); }
    // slow.next = slow.next.next
    let to_skip = next_of(&slow);
    let after = next_of(&to_skip);
    if let Some(sn) = &slow { sn.borrow_mut().next = after; }
    let result = dummy.borrow().next.clone();
    println!("{}", fmt_list(&result));
}`,
  "dsa-middle-of-linked-list": `use std::cell::RefCell;
use std::io::Read;
use std::rc::Rc;
type Link = Option<Rc<RefCell<ListNode>>>;
struct ListNode { val: i64, next: Link }
fn build_list(vals: &[i64]) -> Link {
    let mut head: Link = None;
    let mut tail: Link = None;
    for &v in vals {
        let node = Rc::new(RefCell::new(ListNode { val: v, next: None }));
        match &tail { Some(t) => t.borrow_mut().next = Some(node.clone()), None => head = Some(node.clone()) }
        tail = Some(node);
    }
    head
}
fn next_of(n: &Link) -> Link { n.as_ref().and_then(|x| x.borrow().next.clone()) }
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let head = build_list(&t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect::<Vec<i64>>());
    let mut slow = head.clone();
    let mut fast = head.clone();
    while fast.is_some() && next_of(&fast).is_some() {
        slow = next_of(&slow);
        fast = next_of(&next_of(&fast));
    }
    match slow { Some(node) => println!("{}", node.borrow().val), None => println!() }
}`,
  "dsa-palindrome-linked-list": `use std::cell::RefCell;
use std::io::Read;
use std::rc::Rc;
type Link = Option<Rc<RefCell<ListNode>>>;
struct ListNode { val: i64, next: Link }
fn build_list(vals: &[i64]) -> Link {
    let mut head: Link = None;
    let mut tail: Link = None;
    for &v in vals {
        let node = Rc::new(RefCell::new(ListNode { val: v, next: None }));
        match &tail { Some(t) => t.borrow_mut().next = Some(node.clone()), None => head = Some(node.clone()) }
        tail = Some(node);
    }
    head
}
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let head = build_list(&t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect::<Vec<i64>>());
    // Python solve() itself collects values and compares with its reverse.
    let mut vals: Vec<i64> = Vec::new();
    let mut cur = head;
    while let Some(node) = cur { vals.push(node.borrow().val); cur = node.borrow().next.clone(); }
    let rev: Vec<i64> = vals.iter().rev().copied().collect();
    println!("{}", if vals == rev { "true" } else { "false" });
}`,
  "dsa-add-two-numbers": `use std::cell::RefCell;
use std::io::Read;
use std::rc::Rc;
type Link = Option<Rc<RefCell<ListNode>>>;
struct ListNode { val: i64, next: Link }
fn build_list(vals: &[i64]) -> Link {
    let mut head: Link = None;
    let mut tail: Link = None;
    for &v in vals {
        let node = Rc::new(RefCell::new(ListNode { val: v, next: None }));
        match &tail { Some(t) => t.borrow_mut().next = Some(node.clone()), None => head = Some(node.clone()) }
        tail = Some(node);
    }
    head
}
fn fmt_list(head: &Link) -> String {
    let mut vals = Vec::new();
    let mut cur = head.clone();
    while let Some(n) = cur { vals.push(n.borrow().val.to_string()); cur = n.borrow().next.clone(); }
    vals.join(" ")
}
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let a: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let m: usize = t[1 + n].parse().unwrap();
    let b: Vec<i64> = t.get(2 + n..(2 + n + m).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let mut h1 = build_list(&a);
    let mut h2 = build_list(&b);
    let dummy = Rc::new(RefCell::new(ListNode { val: 0, next: None }));
    let mut tail = dummy.clone();
    let mut carry = 0i64;
    while h1.is_some() || h2.is_some() || carry != 0 {
        let v1 = h1.as_ref().map(|x| x.borrow().val).unwrap_or(0);
        let v2 = h2.as_ref().map(|x| x.borrow().val).unwrap_or(0);
        let total = v1 + v2 + carry;
        carry = total / 10;
        let node = Rc::new(RefCell::new(ListNode { val: total % 10, next: None }));
        tail.borrow_mut().next = Some(node.clone());
        tail = node;
        h1 = h1.and_then(|x| x.borrow().next.clone());
        h2 = h2.and_then(|x| x.borrow().next.clone());
    }
    let result = dummy.borrow().next.clone();
    println!("{}", fmt_list(&result));
}`,
  "dsa-intersection-of-two-linked-lists": `use std::cell::RefCell;
use std::collections::HashSet;
use std::io::Read;
use std::rc::Rc;
type Link = Option<Rc<RefCell<ListNode>>>;
struct ListNode { val: i64, next: Link }
fn build_list(vals: &[i64]) -> Link {
    let mut head: Link = None;
    let mut tail: Link = None;
    for &v in vals {
        let node = Rc::new(RefCell::new(ListNode { val: v, next: None }));
        match &tail { Some(t) => t.borrow_mut().next = Some(node.clone()), None => head = Some(node.clone()) }
        tail = Some(node);
    }
    head
}
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let a: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let m: usize = t[1 + n].parse().unwrap();
    let b: Vec<i64> = t.get(2 + n..(2 + n + m).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    // Python solve() is value-based: first value of list 2 present in list 1, else -1.
    let h1 = build_list(&a);
    let h2 = build_list(&b);
    let mut vals: HashSet<i64> = HashSet::new();
    let mut cur = h1;
    while let Some(node) = cur { vals.insert(node.borrow().val); cur = node.borrow().next.clone(); }
    let mut cur = h2;
    let mut ans = -1i64;
    while let Some(node) = cur {
        if vals.contains(&node.borrow().val) { ans = node.borrow().val; break; }
        cur = node.borrow().next.clone();
    }
    println!("{}", ans);
}`,
  "dsa-remove-duplicates-from-sorted-list": `use std::cell::RefCell;
use std::io::Read;
use std::rc::Rc;
type Link = Option<Rc<RefCell<ListNode>>>;
struct ListNode { val: i64, next: Link }
fn build_list(vals: &[i64]) -> Link {
    let mut head: Link = None;
    let mut tail: Link = None;
    for &v in vals {
        let node = Rc::new(RefCell::new(ListNode { val: v, next: None }));
        match &tail { Some(t) => t.borrow_mut().next = Some(node.clone()), None => head = Some(node.clone()) }
        tail = Some(node);
    }
    head
}
fn fmt_list(head: &Link) -> String {
    let mut vals = Vec::new();
    let mut cur = head.clone();
    while let Some(n) = cur { vals.push(n.borrow().val.to_string()); cur = n.borrow().next.clone(); }
    vals.join(" ")
}
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let head = build_list(&t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect::<Vec<i64>>());
    let mut cur = head.clone();
    while let Some(node) = cur.clone() {
        let nxt = node.borrow().next.clone();
        match nxt {
            Some(nx) if nx.borrow().val == node.borrow().val => {
                node.borrow_mut().next = nx.borrow().next.clone();
            }
            _ => { cur = nxt; }
        }
    }
    println!("{}", fmt_list(&head));
}`,
  "dsa-reorder-list": `use std::cell::RefCell;
use std::io::Read;
use std::rc::Rc;
type Link = Option<Rc<RefCell<ListNode>>>;
struct ListNode { val: i64, next: Link }
fn build_list(vals: &[i64]) -> Link {
    let mut head: Link = None;
    let mut tail: Link = None;
    for &v in vals {
        let node = Rc::new(RefCell::new(ListNode { val: v, next: None }));
        match &tail { Some(t) => t.borrow_mut().next = Some(node.clone()), None => head = Some(node.clone()) }
        tail = Some(node);
    }
    head
}
fn fmt_list(head: &Link) -> String {
    let mut vals = Vec::new();
    let mut cur = head.clone();
    while let Some(n) = cur { vals.push(n.borrow().val.to_string()); cur = n.borrow().next.clone(); }
    vals.join(" ")
}
fn next_of(n: &Link) -> Link { n.as_ref().and_then(|x| x.borrow().next.clone()) }
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let head = build_list(&t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect::<Vec<i64>>());
    if head.is_none() || next_of(&head).is_none() { println!("{}", fmt_list(&head)); return; }
    // Collect nodes (same split point as Python's slow/fast walk: mid = (len-1)/2).
    let mut nodes: Vec<Rc<RefCell<ListNode>>> = Vec::new();
    let mut cur = head.clone();
    while let Some(node) = cur { nodes.push(node.clone()); cur = node.borrow().next.clone(); }
    let len = nodes.len();
    let mid = (len - 1) / 2;
    // Reverse the second half by relinking (Python: reverse second, then merge).
    let mut prev: Link = None;
    for node in nodes.get(mid + 1..).unwrap_or(&[]) {
        let nxt = node.borrow().next.clone();
        node.borrow_mut().next = prev;
        prev = Some(node.clone());
        let _ = nxt;
    }
    nodes[mid].borrow_mut().next = None;
    let mut first: Link = head.clone();
    let mut second = prev;
    while let Some(sec) = second.clone() {
        let tmp1 = next_of(&first);
        let tmp2 = next_of(&second);
        if let Some(f) = &first { f.borrow_mut().next = Some(sec.clone()); }
        sec.borrow_mut().next = tmp1.clone();
        first = tmp1;
        second = tmp2;
    }
    println!("{}", fmt_list(&head));
}`,
  "dsa-swap-nodes-in-pairs": `use std::cell::RefCell;
use std::io::Read;
use std::rc::Rc;
type Link = Option<Rc<RefCell<ListNode>>>;
struct ListNode { val: i64, next: Link }
fn build_list(vals: &[i64]) -> Link {
    let mut head: Link = None;
    let mut tail: Link = None;
    for &v in vals {
        let node = Rc::new(RefCell::new(ListNode { val: v, next: None }));
        match &tail { Some(t) => t.borrow_mut().next = Some(node.clone()), None => head = Some(node.clone()) }
        tail = Some(node);
    }
    head
}
fn fmt_list(head: &Link) -> String {
    let mut vals = Vec::new();
    let mut cur = head.clone();
    while let Some(n) = cur { vals.push(n.borrow().val.to_string()); cur = n.borrow().next.clone(); }
    vals.join(" ")
}
fn next_of(n: &Link) -> Link { n.as_ref().and_then(|x| x.borrow().next.clone()) }
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let head = build_list(&t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect::<Vec<i64>>());
    let dummy = Rc::new(RefCell::new(ListNode { val: 0, next: head }));
    let mut prev: Link = Some(dummy.clone());
    while next_of(&prev).is_some() && next_of(&next_of(&prev)).is_some() {
        let a = next_of(&prev).unwrap();
        let b = next_of(&Some(a.clone())).unwrap();
        let after = next_of(&Some(b.clone()));
        a.borrow_mut().next = after;
        b.borrow_mut().next = Some(a.clone());
        prev.as_ref().unwrap().borrow_mut().next = Some(b.clone());
        prev = Some(a);
    }
    let result = dummy.borrow().next.clone();
    println!("{}", fmt_list(&result));
}`,
  "dsa-odd-even-linked-list": `use std::cell::RefCell;
use std::io::Read;
use std::rc::Rc;
type Link = Option<Rc<RefCell<ListNode>>>;
struct ListNode { val: i64, next: Link }
fn build_list(vals: &[i64]) -> Link {
    let mut head: Link = None;
    let mut tail: Link = None;
    for &v in vals {
        let node = Rc::new(RefCell::new(ListNode { val: v, next: None }));
        match &tail { Some(t) => t.borrow_mut().next = Some(node.clone()), None => head = Some(node.clone()) }
        tail = Some(node);
    }
    head
}
fn fmt_list(head: &Link) -> String {
    let mut vals = Vec::new();
    let mut cur = head.clone();
    while let Some(n) = cur { vals.push(n.borrow().val.to_string()); cur = n.borrow().next.clone(); }
    vals.join(" ")
}
fn next_of(n: &Link) -> Link { n.as_ref().and_then(|x| x.borrow().next.clone()) }
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let head = build_list(&t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect::<Vec<i64>>());
    if head.is_none() || next_of(&head).is_none() { println!("{}", fmt_list(&head)); return; }
    let odd = head.clone().unwrap();
    let even = next_of(&head).unwrap();
    let even_head: Link = Some(even.clone());
    let mut odd_cur = odd.clone();
    let mut even_cur = even.clone();
    while next_of(&Some(even_cur.clone())).is_some() {
        let odd_next = next_of(&Some(even_cur.clone())).unwrap();
        odd_cur.borrow_mut().next = Some(odd_next.clone());
        odd_cur = odd_next;
        let even_next = next_of(&Some(odd_cur.clone()));
        even_cur.borrow_mut().next = even_next.clone();
        match even_next { Some(nx) => even_cur = nx, None => break }
    }
    odd_cur.borrow_mut().next = even_head;
    println!("{}", fmt_list(&head));
}`,
  "dsa-binary-search": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let nums: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let target: i64 = t[1 + n].parse().unwrap();
    let (mut left, mut right) = (0i64, nums.len() as i64 - 1);
    let mut ans = -1i64;
    while left <= right {
        let mid = (left + right) / 2;
        if nums[mid as usize] == target { ans = mid; break; }
        if nums[mid as usize] < target { left = mid + 1; } else { right = mid - 1; }
    }
    println!("{}", ans);
}`,
  "dsa-search-insert-position": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let nums: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let target: i64 = t[1 + n].parse().unwrap();
    let (mut left, mut right) = (0i64, nums.len() as i64);
    while left < right {
        let mid = (left + right) / 2;
        if nums[mid as usize] < target { left = mid + 1; } else { right = mid; }
    }
    println!("{}", left);
}`,
  "dsa-find-first-and-last-position": `use std::io::Read;
fn bound(nums: &[i64], target: i64, first: bool) -> usize {
    let (mut left, mut right) = (0i64, nums.len() as i64);
    while left < right {
        let mid = (left + right) / 2;
        if nums[mid as usize] > target || (first && nums[mid as usize] == target) { right = mid; }
        else { left = mid + 1; }
    }
    left as usize
}
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let nums: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let target: i64 = t[1 + n].parse().unwrap();
    let lo = bound(&nums, target, true);
    if lo == nums.len() || nums[lo] != target { println!("-1 -1"); return; }
    println!("{} {}", lo, bound(&nums, target, false) - 1);
}`,
  "dsa-search-in-rotated-sorted-array": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let nums: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let target: i64 = t[1 + n].parse().unwrap();
    let (mut left, mut right) = (0i64, nums.len() as i64 - 1);
    let mut ans = -1i64;
    while left <= right {
        let mid = (left + right) / 2;
        if nums[mid as usize] == target { ans = mid; break; }
        if nums[left as usize] <= nums[mid as usize] {
            if nums[left as usize] <= target && target < nums[mid as usize] { right = mid - 1; } else { left = mid + 1; }
        } else if nums[mid as usize] < target && target <= nums[right as usize] { left = mid + 1; } else { right = mid - 1; }
    }
    println!("{}", ans);
}`,
  "dsa-find-minimum-in-rotated-sorted-array": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let nums: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let (mut left, mut right) = (0usize, nums.len() - 1);
    while left < right {
        let mid = (left + right) / 2;
        if nums[mid] > nums[right] { left = mid + 1; } else { right = mid; }
    }
    println!("{}", nums[left]);
}`,
  "dsa-peak-element": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let nums: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let (mut left, mut right) = (0usize, nums.len() - 1);
    while left < right {
        let mid = (left + right) / 2;
        if nums[mid] > nums[mid + 1] { right = mid; } else { left = mid + 1; }
    }
    println!("{}", left);
}`,
  "dsa-sqrt-x": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let x: i64 = t[0].parse().unwrap();
    if x < 2 { println!("{}", x); return; }
    let (mut left, mut right, mut ans) = (1i64, x / 2, 1i64);
    while left <= right {
        let mid = (left + right) / 2;
        if mid * mid == x { println!("{}", mid); return; }
        if mid * mid < x { ans = mid; left = mid + 1; } else { right = mid - 1; }
    }
    println!("{}", ans);
}`,
  "dsa-koko-eating-bananas": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let piles: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let h: i64 = t[1 + n].parse().unwrap();
    let (mut left, mut right) = (1i64, *piles.iter().max().unwrap());
    while left < right {
        let mid = (left + right) / 2;
        let hours: i64 = piles.iter().map(|&p| (p + mid - 1) / mid).sum();
        if hours <= h { right = mid; } else { left = mid + 1; }
    }
    println!("{}", left);
}`,
  "dsa-capacity-to-ship-packages": `use std::io::Read;
fn can(weights: &[i64], days: i64, cap: i64) -> bool {
    let (mut used, mut load) = (1i64, 0i64);
    for &w in weights {
        if load + w > cap { used += 1; load = w; } else { load += w; }
    }
    used <= days
}
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let weights: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let days: i64 = t[1 + n].parse().unwrap();
    let (mut left, mut right) = (*weights.iter().max().unwrap(), weights.iter().sum::<i64>());
    while left < right {
        let mid = (left + right) / 2;
        if can(&weights, days, mid) { right = mid; } else { left = mid + 1; }
    }
    println!("{}", left);
}`,
  "dsa-single-element-in-sorted-array": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let nums: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let (mut left, mut right) = (0usize, nums.len() - 1);
    while left < right {
        let mut mid = (left + right) / 2;
        if mid % 2 == 1 { mid -= 1; }
        if nums[mid] == nums[mid + 1] { left = mid + 2; } else { right = mid; }
    }
    println!("{}", nums[left]);
}`,
  "dsa-maximum-depth-of-binary-tree": `use std::cell::RefCell;
use std::collections::VecDeque;
use std::io::Read;
use std::rc::Rc;
type Tree = Option<Rc<RefCell<TreeNode>>>;
struct TreeNode { val: i64, left: Tree, right: Tree }
fn build_tree(tokens: &[String]) -> Tree {
    if tokens.is_empty() || tokens[0] == "null" { return None; }
    let root = Rc::new(RefCell::new(TreeNode { val: tokens[0].parse().unwrap(), left: None, right: None }));
    let mut q: VecDeque<Rc<RefCell<TreeNode>>> = VecDeque::new();
    q.push_back(root.clone());
    let mut i = 1usize;
    while !q.is_empty() && i < tokens.len() {
        let node = q.pop_front().unwrap();
        if i < tokens.len() && tokens[i] != "null" {
            let l = Rc::new(RefCell::new(TreeNode { val: tokens[i].parse().unwrap(), left: None, right: None }));
            node.borrow_mut().left = Some(l.clone());
            q.push_back(l);
        }
        i += 1;
        if i < tokens.len() && tokens[i] != "null" {
            let r = Rc::new(RefCell::new(TreeNode { val: tokens[i].parse().unwrap(), left: None, right: None }));
            node.borrow_mut().right = Some(r.clone());
            q.push_back(r);
        }
        i += 1;
    }
    Some(root)
}
fn depth(node: &Tree) -> i64 {
    match node {
        None => 0,
        Some(n) => 1 + depth(&n.borrow().left).max(depth(&n.borrow().right)),
    }
}
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<String> = s.split_whitespace().map(|x| x.to_string()).collect();
    let root = build_tree(&t);
    println!("{}", depth(&root));
}`,
  "dsa-invert-binary-tree": `use std::cell::RefCell;
use std::collections::VecDeque;
use std::io::Read;
use std::rc::Rc;
type Tree = Option<Rc<RefCell<TreeNode>>>;
struct TreeNode { val: i64, left: Tree, right: Tree }
fn build_tree(tokens: &[String]) -> Tree {
    if tokens.is_empty() || tokens[0] == "null" { return None; }
    let root = Rc::new(RefCell::new(TreeNode { val: tokens[0].parse().unwrap(), left: None, right: None }));
    let mut q: VecDeque<Rc<RefCell<TreeNode>>> = VecDeque::new();
    q.push_back(root.clone());
    let mut i = 1usize;
    while !q.is_empty() && i < tokens.len() {
        let node = q.pop_front().unwrap();
        if i < tokens.len() && tokens[i] != "null" {
            let l = Rc::new(RefCell::new(TreeNode { val: tokens[i].parse().unwrap(), left: None, right: None }));
            node.borrow_mut().left = Some(l.clone());
            q.push_back(l);
        }
        i += 1;
        if i < tokens.len() && tokens[i] != "null" {
            let r = Rc::new(RefCell::new(TreeNode { val: tokens[i].parse().unwrap(), left: None, right: None }));
            node.borrow_mut().right = Some(r.clone());
            q.push_back(r);
        }
        i += 1;
    }
    Some(root)
}
fn fmt_tree(root: &Tree) -> String {
    let mut out: Vec<String> = Vec::new();
    let mut q: VecDeque<Tree> = VecDeque::new();
    q.push_back(root.clone());
    while let Some(node) = q.pop_front() {
        match node {
            None => out.push("null".to_string()),
            Some(n) => {
                out.push(n.borrow().val.to_string());
                q.push_back(n.borrow().left.clone());
                q.push_back(n.borrow().right.clone());
            }
        }
    }
    while out.last().map(|x| x == "null").unwrap_or(false) { out.pop(); }
    out.join(" ")
}
fn invert(node: &Tree) -> Tree {
    if let Some(n) = node {
        let left = n.borrow().left.clone();
        let right = n.borrow().right.clone();
        let new_left = invert(&right);
        let new_right = invert(&left);
        n.borrow_mut().left = new_left;
        n.borrow_mut().right = new_right;
    }
    node.clone()
}
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<String> = s.split_whitespace().map(|x| x.to_string()).collect();
    let root = build_tree(&t);
    let inv = invert(&root);
    println!("{}", fmt_tree(&inv));
}`,
  "dsa-same-tree": `use std::cell::RefCell;
use std::collections::VecDeque;
use std::io::Read;
use std::rc::Rc;
type Tree = Option<Rc<RefCell<TreeNode>>>;
struct TreeNode { val: i64, left: Tree, right: Tree }
fn build_tree(tokens: &[String]) -> Tree {
    if tokens.is_empty() || tokens[0] == "null" { return None; }
    let root = Rc::new(RefCell::new(TreeNode { val: tokens[0].parse().unwrap(), left: None, right: None }));
    let mut q: VecDeque<Rc<RefCell<TreeNode>>> = VecDeque::new();
    q.push_back(root.clone());
    let mut i = 1usize;
    while !q.is_empty() && i < tokens.len() {
        let node = q.pop_front().unwrap();
        if i < tokens.len() && tokens[i] != "null" {
            let l = Rc::new(RefCell::new(TreeNode { val: tokens[i].parse().unwrap(), left: None, right: None }));
            node.borrow_mut().left = Some(l.clone());
            q.push_back(l);
        }
        i += 1;
        if i < tokens.len() && tokens[i] != "null" {
            let r = Rc::new(RefCell::new(TreeNode { val: tokens[i].parse().unwrap(), left: None, right: None }));
            node.borrow_mut().right = Some(r.clone());
            q.push_back(r);
        }
        i += 1;
    }
    Some(root)
}
fn same(a: &Tree, b: &Tree) -> bool {
    match (a, b) {
        (None, None) => true,
        (Some(x), Some(y)) => {
            x.borrow().val == y.borrow().val
                && same(&x.borrow().left, &y.borrow().left)
                && same(&x.borrow().right, &y.borrow().right)
        }
        _ => false,
    }
}
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<String> = s.split_whitespace().map(|x| x.to_string()).collect();
    if t.is_empty() { return; }
    let n1: usize = t[0].parse().unwrap();
    let t1 = &t.get(1..(1 + n1).min(t.len())).unwrap_or(&[]);
    let n2: usize = t[1 + n1].parse().unwrap();
    let t2 = &t.get(2 + n1..(2 + n1 + n2).min(t.len())).unwrap_or(&[]);
    let r1 = build_tree(t1);
    let r2 = build_tree(t2);
    println!("{}", if same(&r1, &r2) { "true" } else { "false" });
}`,
  "dsa-symmetric-tree": `use std::cell::RefCell;
use std::collections::VecDeque;
use std::io::Read;
use std::rc::Rc;
type Tree = Option<Rc<RefCell<TreeNode>>>;
struct TreeNode { val: i64, left: Tree, right: Tree }
fn build_tree(tokens: &[String]) -> Tree {
    if tokens.is_empty() || tokens[0] == "null" { return None; }
    let root = Rc::new(RefCell::new(TreeNode { val: tokens[0].parse().unwrap(), left: None, right: None }));
    let mut q: VecDeque<Rc<RefCell<TreeNode>>> = VecDeque::new();
    q.push_back(root.clone());
    let mut i = 1usize;
    while !q.is_empty() && i < tokens.len() {
        let node = q.pop_front().unwrap();
        if i < tokens.len() && tokens[i] != "null" {
            let l = Rc::new(RefCell::new(TreeNode { val: tokens[i].parse().unwrap(), left: None, right: None }));
            node.borrow_mut().left = Some(l.clone());
            q.push_back(l);
        }
        i += 1;
        if i < tokens.len() && tokens[i] != "null" {
            let r = Rc::new(RefCell::new(TreeNode { val: tokens[i].parse().unwrap(), left: None, right: None }));
            node.borrow_mut().right = Some(r.clone());
            q.push_back(r);
        }
        i += 1;
    }
    Some(root)
}
fn mirror(a: &Tree, b: &Tree) -> bool {
    match (a, b) {
        (None, None) => true,
        (Some(x), Some(y)) => {
            x.borrow().val == y.borrow().val
                && mirror(&x.borrow().left, &y.borrow().right)
                && mirror(&x.borrow().right, &y.borrow().left)
        }
        _ => false,
    }
}
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<String> = s.split_whitespace().map(|x| x.to_string()).collect();
    let root = build_tree(&t);
    let ok = match &root {
        None => true,
        Some(n) => mirror(&n.borrow().left, &n.borrow().right),
    };
    println!("{}", if ok { "true" } else { "false" });
}`,
  "dsa-binary-tree-level-order-traversal": `use std::cell::RefCell;
use std::collections::VecDeque;
use std::io::Read;
use std::rc::Rc;
type Tree = Option<Rc<RefCell<TreeNode>>>;
struct TreeNode { val: i64, left: Tree, right: Tree }
fn build_tree(tokens: &[String]) -> Tree {
    if tokens.is_empty() || tokens[0] == "null" { return None; }
    let root = Rc::new(RefCell::new(TreeNode { val: tokens[0].parse().unwrap(), left: None, right: None }));
    let mut q: VecDeque<Rc<RefCell<TreeNode>>> = VecDeque::new();
    q.push_back(root.clone());
    let mut i = 1usize;
    while !q.is_empty() && i < tokens.len() {
        let node = q.pop_front().unwrap();
        if i < tokens.len() && tokens[i] != "null" {
            let l = Rc::new(RefCell::new(TreeNode { val: tokens[i].parse().unwrap(), left: None, right: None }));
            node.borrow_mut().left = Some(l.clone());
            q.push_back(l);
        }
        i += 1;
        if i < tokens.len() && tokens[i] != "null" {
            let r = Rc::new(RefCell::new(TreeNode { val: tokens[i].parse().unwrap(), left: None, right: None }));
            node.borrow_mut().right = Some(r.clone());
            q.push_back(r);
        }
        i += 1;
    }
    Some(root)
}
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<String> = s.split_whitespace().map(|x| x.to_string()).collect();
    let root = build_tree(&t);
    let mut out: Vec<String> = Vec::new();
    if let Some(r) = root {
        let mut level: Vec<Rc<RefCell<TreeNode>>> = vec![r];
        while !level.is_empty() {
            out.push(level.iter().map(|n| n.borrow().val.to_string()).collect::<Vec<_>>().join(" "));
            let mut nxt = Vec::new();
            for n in &level {
                if let Some(l) = &n.borrow().left { nxt.push(l.clone()); }
                if let Some(rr) = &n.borrow().right { nxt.push(rr.clone()); }
            }
            level = nxt;
        }
    }
    println!("{}", out.join("\\n"));
}`,
  "dsa-validate-binary-search-tree": `use std::cell::RefCell;
use std::collections::VecDeque;
use std::io::Read;
use std::rc::Rc;
type Tree = Option<Rc<RefCell<TreeNode>>>;
struct TreeNode { val: i64, left: Tree, right: Tree }
fn build_tree(tokens: &[String]) -> Tree {
    if tokens.is_empty() || tokens[0] == "null" { return None; }
    let root = Rc::new(RefCell::new(TreeNode { val: tokens[0].parse().unwrap(), left: None, right: None }));
    let mut q: VecDeque<Rc<RefCell<TreeNode>>> = VecDeque::new();
    q.push_back(root.clone());
    let mut i = 1usize;
    while !q.is_empty() && i < tokens.len() {
        let node = q.pop_front().unwrap();
        if i < tokens.len() && tokens[i] != "null" {
            let l = Rc::new(RefCell::new(TreeNode { val: tokens[i].parse().unwrap(), left: None, right: None }));
            node.borrow_mut().left = Some(l.clone());
            q.push_back(l);
        }
        i += 1;
        if i < tokens.len() && tokens[i] != "null" {
            let r = Rc::new(RefCell::new(TreeNode { val: tokens[i].parse().unwrap(), left: None, right: None }));
            node.borrow_mut().right = Some(r.clone());
            q.push_back(r);
        }
        i += 1;
    }
    Some(root)
}
fn fmt_tree(root: &Tree) -> String {
    let mut out: Vec<String> = Vec::new();
    let mut q: VecDeque<Tree> = VecDeque::new();
    q.push_back(root.clone());
    while let Some(node) = q.pop_front() {
        match node {
            None => out.push("null".to_string()),
            Some(n) => {
                out.push(n.borrow().val.to_string());
                q.push_back(n.borrow().left.clone());
                q.push_back(n.borrow().right.clone());
            }
        }
    }
    while out.last().map(|x| x == "null").unwrap_or(false) { out.pop(); }
    out.join(" ")
}
fn read_tokens() -> Vec<String> {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    s.split_whitespace().map(|x| x.to_string()).collect()
}

fn valid(node: &Tree, low: Option<i64>, high: Option<i64>) -> bool {
    match node {
        None => true,
        Some(n) => {
            let v = n.borrow().val;
            if let Some(lo) = low { if v <= lo { return false; } }
            if let Some(hi) = high { if v >= hi { return false; } }
            valid(&n.borrow().left, low, Some(v)) && valid(&n.borrow().right, Some(v), high)
        }
    }
}
fn main() {
    let t = read_tokens();
    let root = build_tree(&t);
    println!("{}", if valid(&root, None, None) { "true" } else { "false" });
}`,
  "dsa-lowest-common-ancestor": `use std::cell::RefCell;
use std::collections::VecDeque;
use std::io::Read;
use std::rc::Rc;
type Tree = Option<Rc<RefCell<TreeNode>>>;
struct TreeNode { val: i64, left: Tree, right: Tree }
fn build_tree(tokens: &[String]) -> Tree {
    if tokens.is_empty() || tokens[0] == "null" { return None; }
    let root = Rc::new(RefCell::new(TreeNode { val: tokens[0].parse().unwrap(), left: None, right: None }));
    let mut q: VecDeque<Rc<RefCell<TreeNode>>> = VecDeque::new();
    q.push_back(root.clone());
    let mut i = 1usize;
    while !q.is_empty() && i < tokens.len() {
        let node = q.pop_front().unwrap();
        if i < tokens.len() && tokens[i] != "null" {
            let l = Rc::new(RefCell::new(TreeNode { val: tokens[i].parse().unwrap(), left: None, right: None }));
            node.borrow_mut().left = Some(l.clone());
            q.push_back(l);
        }
        i += 1;
        if i < tokens.len() && tokens[i] != "null" {
            let r = Rc::new(RefCell::new(TreeNode { val: tokens[i].parse().unwrap(), left: None, right: None }));
            node.borrow_mut().right = Some(r.clone());
            q.push_back(r);
        }
        i += 1;
    }
    Some(root)
}
fn fmt_tree(root: &Tree) -> String {
    let mut out: Vec<String> = Vec::new();
    let mut q: VecDeque<Tree> = VecDeque::new();
    q.push_back(root.clone());
    while let Some(node) = q.pop_front() {
        match node {
            None => out.push("null".to_string()),
            Some(n) => {
                out.push(n.borrow().val.to_string());
                q.push_back(n.borrow().left.clone());
                q.push_back(n.borrow().right.clone());
            }
        }
    }
    while out.last().map(|x| x == "null").unwrap_or(false) { out.pop(); }
    out.join(" ")
}
fn read_tokens() -> Vec<String> {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    s.split_whitespace().map(|x| x.to_string()).collect()
}

fn lca(node: &Tree, p: i64, q: i64) -> i64 {
    match node {
        None => -1,
        Some(n) => {
            let v = n.borrow().val;
            if v == p || v == q { return v; }
            let left = lca(&n.borrow().left, p, q);
            let right = lca(&n.borrow().right, p, q);
            if left != -1 && right != -1 { v }
            else if left != -1 { left }
            else { right }
        }
    }
}
fn main() {
    let t = read_tokens();
    if t.len() < 2 { return; }
    let p: i64 = t[t.len() - 2].parse().unwrap();
    let q: i64 = t[t.len() - 1].parse().unwrap();
    let root = build_tree(&t.get(..t.len() - 2).unwrap_or(&[]));
    println!("{}", lca(&root, p, q));
}`,
  "dsa-diameter-of-binary-tree": `use std::cell::RefCell;
use std::collections::VecDeque;
use std::io::Read;
use std::rc::Rc;
type Tree = Option<Rc<RefCell<TreeNode>>>;
struct TreeNode { val: i64, left: Tree, right: Tree }
fn build_tree(tokens: &[String]) -> Tree {
    if tokens.is_empty() || tokens[0] == "null" { return None; }
    let root = Rc::new(RefCell::new(TreeNode { val: tokens[0].parse().unwrap(), left: None, right: None }));
    let mut q: VecDeque<Rc<RefCell<TreeNode>>> = VecDeque::new();
    q.push_back(root.clone());
    let mut i = 1usize;
    while !q.is_empty() && i < tokens.len() {
        let node = q.pop_front().unwrap();
        if i < tokens.len() && tokens[i] != "null" {
            let l = Rc::new(RefCell::new(TreeNode { val: tokens[i].parse().unwrap(), left: None, right: None }));
            node.borrow_mut().left = Some(l.clone());
            q.push_back(l);
        }
        i += 1;
        if i < tokens.len() && tokens[i] != "null" {
            let r = Rc::new(RefCell::new(TreeNode { val: tokens[i].parse().unwrap(), left: None, right: None }));
            node.borrow_mut().right = Some(r.clone());
            q.push_back(r);
        }
        i += 1;
    }
    Some(root)
}
fn fmt_tree(root: &Tree) -> String {
    let mut out: Vec<String> = Vec::new();
    let mut q: VecDeque<Tree> = VecDeque::new();
    q.push_back(root.clone());
    while let Some(node) = q.pop_front() {
        match node {
            None => out.push("null".to_string()),
            Some(n) => {
                out.push(n.borrow().val.to_string());
                q.push_back(n.borrow().left.clone());
                q.push_back(n.borrow().right.clone());
            }
        }
    }
    while out.last().map(|x| x == "null").unwrap_or(false) { out.pop(); }
    out.join(" ")
}
fn read_tokens() -> Vec<String> {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    s.split_whitespace().map(|x| x.to_string()).collect()
}

fn depth(node: &Tree, best: &mut i64) -> i64 {
    match node {
        None => 0,
        Some(n) => {
            let l = depth(&n.borrow().left, best);
            let r = depth(&n.borrow().right, best);
            *best = (*best).max(l + r);
            1 + l.max(r)
        }
    }
}
fn main() {
    let t = read_tokens();
    let root = build_tree(&t);
    let mut best = 0i64;
    depth(&root, &mut best);
    println!("{}", best);
}`,
  "dsa-path-sum": `use std::cell::RefCell;
use std::collections::VecDeque;
use std::io::Read;
use std::rc::Rc;
type Tree = Option<Rc<RefCell<TreeNode>>>;
struct TreeNode { val: i64, left: Tree, right: Tree }
fn build_tree(tokens: &[String]) -> Tree {
    if tokens.is_empty() || tokens[0] == "null" { return None; }
    let root = Rc::new(RefCell::new(TreeNode { val: tokens[0].parse().unwrap(), left: None, right: None }));
    let mut q: VecDeque<Rc<RefCell<TreeNode>>> = VecDeque::new();
    q.push_back(root.clone());
    let mut i = 1usize;
    while !q.is_empty() && i < tokens.len() {
        let node = q.pop_front().unwrap();
        if i < tokens.len() && tokens[i] != "null" {
            let l = Rc::new(RefCell::new(TreeNode { val: tokens[i].parse().unwrap(), left: None, right: None }));
            node.borrow_mut().left = Some(l.clone());
            q.push_back(l);
        }
        i += 1;
        if i < tokens.len() && tokens[i] != "null" {
            let r = Rc::new(RefCell::new(TreeNode { val: tokens[i].parse().unwrap(), left: None, right: None }));
            node.borrow_mut().right = Some(r.clone());
            q.push_back(r);
        }
        i += 1;
    }
    Some(root)
}
fn fmt_tree(root: &Tree) -> String {
    let mut out: Vec<String> = Vec::new();
    let mut q: VecDeque<Tree> = VecDeque::new();
    q.push_back(root.clone());
    while let Some(node) = q.pop_front() {
        match node {
            None => out.push("null".to_string()),
            Some(n) => {
                out.push(n.borrow().val.to_string());
                q.push_back(n.borrow().left.clone());
                q.push_back(n.borrow().right.clone());
            }
        }
    }
    while out.last().map(|x| x == "null").unwrap_or(false) { out.pop(); }
    out.join(" ")
}
fn read_tokens() -> Vec<String> {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    s.split_whitespace().map(|x| x.to_string()).collect()
}

fn has_path(node: &Tree, target: i64) -> bool {
    match node {
        None => false,
        Some(n) => {
            let v = n.borrow().val;
            let (l, r) = (n.borrow().left.clone(), n.borrow().right.clone());
            if l.is_none() && r.is_none() { return v == target; }
            has_path(&l, target - v) || has_path(&r, target - v)
        }
    }
}
fn main() {
    let t = read_tokens();
    if t.is_empty() { return; }
    let target: i64 = t[t.len() - 1].parse().unwrap();
    let root = build_tree(&t.get(..t.len() - 1).unwrap_or(&[]));
    println!("{}", if has_path(&root, target) { "true" } else { "false" });
}`,
  "dsa-kth-smallest-in-bst": `use std::cell::RefCell;
use std::collections::VecDeque;
use std::io::Read;
use std::rc::Rc;
type Tree = Option<Rc<RefCell<TreeNode>>>;
struct TreeNode { val: i64, left: Tree, right: Tree }
fn build_tree(tokens: &[String]) -> Tree {
    if tokens.is_empty() || tokens[0] == "null" { return None; }
    let root = Rc::new(RefCell::new(TreeNode { val: tokens[0].parse().unwrap(), left: None, right: None }));
    let mut q: VecDeque<Rc<RefCell<TreeNode>>> = VecDeque::new();
    q.push_back(root.clone());
    let mut i = 1usize;
    while !q.is_empty() && i < tokens.len() {
        let node = q.pop_front().unwrap();
        if i < tokens.len() && tokens[i] != "null" {
            let l = Rc::new(RefCell::new(TreeNode { val: tokens[i].parse().unwrap(), left: None, right: None }));
            node.borrow_mut().left = Some(l.clone());
            q.push_back(l);
        }
        i += 1;
        if i < tokens.len() && tokens[i] != "null" {
            let r = Rc::new(RefCell::new(TreeNode { val: tokens[i].parse().unwrap(), left: None, right: None }));
            node.borrow_mut().right = Some(r.clone());
            q.push_back(r);
        }
        i += 1;
    }
    Some(root)
}
fn fmt_tree(root: &Tree) -> String {
    let mut out: Vec<String> = Vec::new();
    let mut q: VecDeque<Tree> = VecDeque::new();
    q.push_back(root.clone());
    while let Some(node) = q.pop_front() {
        match node {
            None => out.push("null".to_string()),
            Some(n) => {
                out.push(n.borrow().val.to_string());
                q.push_back(n.borrow().left.clone());
                q.push_back(n.borrow().right.clone());
            }
        }
    }
    while out.last().map(|x| x == "null").unwrap_or(false) { out.pop(); }
    out.join(" ")
}
fn read_tokens() -> Vec<String> {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    s.split_whitespace().map(|x| x.to_string()).collect()
}

fn main() {
    let t = read_tokens();
    if t.is_empty() { return; }
    let k: i64 = t[t.len() - 1].parse().unwrap();
    let root = build_tree(&t.get(..t.len() - 1).unwrap_or(&[]));
    let mut stack: Vec<Rc<RefCell<TreeNode>>> = Vec::new();
    let mut cur = root;
    let mut k = k;
    let mut ans = -1i64;
    while !stack.is_empty() || cur.is_some() {
        while let Some(n) = cur {
            stack.push(n.clone());
            cur = n.borrow().left.clone();
        }
        let node = stack.pop().unwrap();
        k -= 1;
        if k == 0 { ans = node.borrow().val; break; }
        cur = node.borrow().right.clone();
    }
    println!("{}", ans);
}`,
  "dsa-binary-tree-right-side-view": `use std::cell::RefCell;
use std::collections::VecDeque;
use std::io::Read;
use std::rc::Rc;
type Tree = Option<Rc<RefCell<TreeNode>>>;
struct TreeNode { val: i64, left: Tree, right: Tree }
fn build_tree(tokens: &[String]) -> Tree {
    if tokens.is_empty() || tokens[0] == "null" { return None; }
    let root = Rc::new(RefCell::new(TreeNode { val: tokens[0].parse().unwrap(), left: None, right: None }));
    let mut q: VecDeque<Rc<RefCell<TreeNode>>> = VecDeque::new();
    q.push_back(root.clone());
    let mut i = 1usize;
    while !q.is_empty() && i < tokens.len() {
        let node = q.pop_front().unwrap();
        if i < tokens.len() && tokens[i] != "null" {
            let l = Rc::new(RefCell::new(TreeNode { val: tokens[i].parse().unwrap(), left: None, right: None }));
            node.borrow_mut().left = Some(l.clone());
            q.push_back(l);
        }
        i += 1;
        if i < tokens.len() && tokens[i] != "null" {
            let r = Rc::new(RefCell::new(TreeNode { val: tokens[i].parse().unwrap(), left: None, right: None }));
            node.borrow_mut().right = Some(r.clone());
            q.push_back(r);
        }
        i += 1;
    }
    Some(root)
}
fn fmt_tree(root: &Tree) -> String {
    let mut out: Vec<String> = Vec::new();
    let mut q: VecDeque<Tree> = VecDeque::new();
    q.push_back(root.clone());
    while let Some(node) = q.pop_front() {
        match node {
            None => out.push("null".to_string()),
            Some(n) => {
                out.push(n.borrow().val.to_string());
                q.push_back(n.borrow().left.clone());
                q.push_back(n.borrow().right.clone());
            }
        }
    }
    while out.last().map(|x| x == "null").unwrap_or(false) { out.pop(); }
    out.join(" ")
}
fn read_tokens() -> Vec<String> {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    s.split_whitespace().map(|x| x.to_string()).collect()
}

fn main() {
    let t = read_tokens();
    let root = build_tree(&t);
    let mut out: Vec<i64> = Vec::new();
    if let Some(r) = root {
        let mut level: Vec<Rc<RefCell<TreeNode>>> = vec![r];
        while !level.is_empty() {
            out.push(level.last().unwrap().borrow().val);
            let mut nxt = Vec::new();
            for n in &level {
                if let Some(l) = &n.borrow().left { nxt.push(l.clone()); }
                if let Some(rr) = &n.borrow().right { nxt.push(rr.clone()); }
            }
            level = nxt;
        }
    }
    println!("{}", out.iter().map(|x| x.to_string()).collect::<Vec<_>>().join(" "));
}`,
  "dsa-construct-binary-tree-from-preorder-inorder": `use std::cell::RefCell;
use std::collections::VecDeque;
use std::io::Read;
use std::rc::Rc;
type Tree = Option<Rc<RefCell<TreeNode>>>;
struct TreeNode { val: i64, left: Tree, right: Tree }
fn build_tree(tokens: &[String]) -> Tree {
    if tokens.is_empty() || tokens[0] == "null" { return None; }
    let root = Rc::new(RefCell::new(TreeNode { val: tokens[0].parse().unwrap(), left: None, right: None }));
    let mut q: VecDeque<Rc<RefCell<TreeNode>>> = VecDeque::new();
    q.push_back(root.clone());
    let mut i = 1usize;
    while !q.is_empty() && i < tokens.len() {
        let node = q.pop_front().unwrap();
        if i < tokens.len() && tokens[i] != "null" {
            let l = Rc::new(RefCell::new(TreeNode { val: tokens[i].parse().unwrap(), left: None, right: None }));
            node.borrow_mut().left = Some(l.clone());
            q.push_back(l);
        }
        i += 1;
        if i < tokens.len() && tokens[i] != "null" {
            let r = Rc::new(RefCell::new(TreeNode { val: tokens[i].parse().unwrap(), left: None, right: None }));
            node.borrow_mut().right = Some(r.clone());
            q.push_back(r);
        }
        i += 1;
    }
    Some(root)
}
fn fmt_tree(root: &Tree) -> String {
    let mut out: Vec<String> = Vec::new();
    let mut q: VecDeque<Tree> = VecDeque::new();
    q.push_back(root.clone());
    while let Some(node) = q.pop_front() {
        match node {
            None => out.push("null".to_string()),
            Some(n) => {
                out.push(n.borrow().val.to_string());
                q.push_back(n.borrow().left.clone());
                q.push_back(n.borrow().right.clone());
            }
        }
    }
    while out.last().map(|x| x == "null").unwrap_or(false) { out.pop(); }
    out.join(" ")
}
fn read_tokens() -> Vec<String> {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    s.split_whitespace().map(|x| x.to_string()).collect()
}

use std::collections::HashMap;
fn build(pre: &[i64], pos: &HashMap<i64, usize>, idx: &mut usize, lo: i64, hi: i64) -> Tree {
    if lo > hi { return None; }
    let val = pre[*idx];
    *idx += 1;
    let mid = pos[&val] as i64;
    let node = Rc::new(RefCell::new(TreeNode { val, left: None, right: None }));
    let left = build(pre, pos, idx, lo, mid - 1);
    let right = build(pre, pos, idx, mid + 1, hi);
    node.borrow_mut().left = left;
    node.borrow_mut().right = right;
    Some(node)
}
fn main() {
    let t = read_tokens();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let a: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let m: usize = t[1 + n].parse().unwrap();
    let b: Vec<i64> = t.get(2 + n..(2 + n + m).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let pos: HashMap<i64, usize> = b.iter().enumerate().map(|(i, &v)| (v, i)).collect();
    let mut idx = 0usize;
    let root = build(&a, &pos, &mut idx, 0, b.len() as i64 - 1);
    println!("{}", fmt_tree(&root));
}`,
  "dsa-sum-of-left-leaves": `use std::cell::RefCell;
use std::collections::VecDeque;
use std::io::Read;
use std::rc::Rc;
type Tree = Option<Rc<RefCell<TreeNode>>>;
struct TreeNode { val: i64, left: Tree, right: Tree }
fn build_tree(tokens: &[String]) -> Tree {
    if tokens.is_empty() || tokens[0] == "null" { return None; }
    let root = Rc::new(RefCell::new(TreeNode { val: tokens[0].parse().unwrap(), left: None, right: None }));
    let mut q: VecDeque<Rc<RefCell<TreeNode>>> = VecDeque::new();
    q.push_back(root.clone());
    let mut i = 1usize;
    while !q.is_empty() && i < tokens.len() {
        let node = q.pop_front().unwrap();
        if i < tokens.len() && tokens[i] != "null" {
            let l = Rc::new(RefCell::new(TreeNode { val: tokens[i].parse().unwrap(), left: None, right: None }));
            node.borrow_mut().left = Some(l.clone());
            q.push_back(l);
        }
        i += 1;
        if i < tokens.len() && tokens[i] != "null" {
            let r = Rc::new(RefCell::new(TreeNode { val: tokens[i].parse().unwrap(), left: None, right: None }));
            node.borrow_mut().right = Some(r.clone());
            q.push_back(r);
        }
        i += 1;
    }
    Some(root)
}
fn fmt_tree(root: &Tree) -> String {
    let mut out: Vec<String> = Vec::new();
    let mut q: VecDeque<Tree> = VecDeque::new();
    q.push_back(root.clone());
    while let Some(node) = q.pop_front() {
        match node {
            None => out.push("null".to_string()),
            Some(n) => {
                out.push(n.borrow().val.to_string());
                q.push_back(n.borrow().left.clone());
                q.push_back(n.borrow().right.clone());
            }
        }
    }
    while out.last().map(|x| x == "null").unwrap_or(false) { out.pop(); }
    out.join(" ")
}
fn read_tokens() -> Vec<String> {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    s.split_whitespace().map(|x| x.to_string()).collect()
}

fn sum_left(node: &Tree) -> i64 {
    match node {
        None => 0,
        Some(n) => {
            let mut total = 0i64;
            let left = n.borrow().left.clone();
            if let Some(l) = &left {
                if l.borrow().left.is_none() && l.borrow().right.is_none() { total += l.borrow().val; }
            }
            total + sum_left(&n.borrow().left) + sum_left(&n.borrow().right)
        }
    }
}
fn main() {
    let t = read_tokens();
    let root = build_tree(&t);
    println!("{}", sum_left(&root));
}`,
  "dsa-binary-tree-maximum-path-sum": `use std::cell::RefCell;
use std::collections::VecDeque;
use std::io::Read;
use std::rc::Rc;
type Tree = Option<Rc<RefCell<TreeNode>>>;
struct TreeNode { val: i64, left: Tree, right: Tree }
fn build_tree(tokens: &[String]) -> Tree {
    if tokens.is_empty() || tokens[0] == "null" { return None; }
    let root = Rc::new(RefCell::new(TreeNode { val: tokens[0].parse().unwrap(), left: None, right: None }));
    let mut q: VecDeque<Rc<RefCell<TreeNode>>> = VecDeque::new();
    q.push_back(root.clone());
    let mut i = 1usize;
    while !q.is_empty() && i < tokens.len() {
        let node = q.pop_front().unwrap();
        if i < tokens.len() && tokens[i] != "null" {
            let l = Rc::new(RefCell::new(TreeNode { val: tokens[i].parse().unwrap(), left: None, right: None }));
            node.borrow_mut().left = Some(l.clone());
            q.push_back(l);
        }
        i += 1;
        if i < tokens.len() && tokens[i] != "null" {
            let r = Rc::new(RefCell::new(TreeNode { val: tokens[i].parse().unwrap(), left: None, right: None }));
            node.borrow_mut().right = Some(r.clone());
            q.push_back(r);
        }
        i += 1;
    }
    Some(root)
}
fn fmt_tree(root: &Tree) -> String {
    let mut out: Vec<String> = Vec::new();
    let mut q: VecDeque<Tree> = VecDeque::new();
    q.push_back(root.clone());
    while let Some(node) = q.pop_front() {
        match node {
            None => out.push("null".to_string()),
            Some(n) => {
                out.push(n.borrow().val.to_string());
                q.push_back(n.borrow().left.clone());
                q.push_back(n.borrow().right.clone());
            }
        }
    }
    while out.last().map(|x| x == "null").unwrap_or(false) { out.pop(); }
    out.join(" ")
}
fn read_tokens() -> Vec<String> {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    s.split_whitespace().map(|x| x.to_string()).collect()
}

fn gain(node: &Tree, best: &mut i64) -> i64 {
    match node {
        None => 0,
        Some(n) => {
            let v = n.borrow().val;
            let left = gain(&n.borrow().left, best).max(0);
            let right = gain(&n.borrow().right, best).max(0);
            *best = (*best).max(v + left + right);
            v + left.max(right)
        }
    }
}
fn main() {
    let t = read_tokens();
    let root = build_tree(&t);
    if root.is_none() { println!("-inf"); return; }
    let mut best = i64::MIN;
    gain(&root, &mut best);
    println!("{}", best);
}`,
  "dsa-number-of-islands": `use std::io::Read;
fn dfs(grid: &mut Vec<Vec<char>>, i: i64, j: i64) {
    let (m, n) = (grid.len() as i64, grid[0].len() as i64);
    if i < 0 || i >= m || j < 0 || j >= n || grid[i as usize][j as usize] != '1' { return; }
    grid[i as usize][j as usize] = '0';
    dfs(grid, i + 1, j);
    dfs(grid, i - 1, j);
    dfs(grid, i, j + 1);
    dfs(grid, i, j - 1);
}
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let lines: Vec<&str> = s.lines().collect();
    let dims: Vec<&str> = lines.first().map(|x| x.split_whitespace().collect()).unwrap_or_default();
    let r: usize = dims.first().and_then(|x| x.parse().ok()).unwrap_or(0);
    let mut grid: Vec<Vec<char>> = (0..r).map(|i| lines.get(1 + i).map(|l| l.trim().replace(' ', "").chars().collect()).unwrap_or_default()).collect();
    let mut count = 0i64;
    for i in 0..grid.len() {
        for j in 0..grid[i].len() {
            if grid[i][j] == '1' { count += 1; dfs(&mut grid, i as i64, j as i64); }
        }
    }
    println!("{}", count);
}`,
  "dsa-flood-fill": `use std::io::Read;
fn dfs(grid: &mut Vec<Vec<i64>>, i: i64, j: i64, old: i64, color: i64) {
    let (m, n) = (grid.len() as i64, grid[0].len() as i64);
    if i < 0 || i >= m || j < 0 || j >= n || grid[i as usize][j as usize] != old { return; }
    grid[i as usize][j as usize] = color;
    dfs(grid, i + 1, j, old, color);
    dfs(grid, i - 1, j, old, color);
    dfs(grid, i, j + 1, old, color);
    dfs(grid, i, j - 1, old, color);
}
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let r: usize = t[0].parse().unwrap();
    let c: usize = t[1].parse().unwrap();
    let vals: Vec<i64> = t.get(2..(2 + r * c).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let mut grid: Vec<Vec<i64>> = (0..r).map(|i| vals.get(i * c..(i + 1) * c).unwrap_or(&[]).to_vec()).collect();
    let sr: usize = t[2 + r * c].parse().unwrap();
    let sc: usize = t[3 + r * c].parse().unwrap();
    let color: i64 = t[4 + r * c].parse().unwrap();
    let old = grid[sr][sc];
    if old != color { dfs(&mut grid, sr as i64, sc as i64, old, color); }
    let rows: Vec<String> = grid.iter().map(|row| row.iter().map(|x| x.to_string()).collect::<Vec<_>>().join(" ")).collect();
    println!("{}", rows.join("\\n"));
}`,
  "dsa-course-schedule": `use std::collections::{HashMap, VecDeque};
use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let m: usize = t[1].parse().unwrap();
    let mut graph: HashMap<usize, Vec<usize>> = HashMap::new();
    let mut indeg = vec![0i64; n];
    for i in 0..m {
        let a: usize = t[2 + 2 * i].parse().unwrap();
        let b: usize = t[3 + 2 * i].parse().unwrap();
        graph.entry(b).or_default().push(a);
        indeg[a] += 1;
    }
    let mut q: VecDeque<usize> = (0..n).filter(|&i| indeg[i] == 0).collect();
    let mut done = 0usize;
    while let Some(u) = q.pop_front() {
        done += 1;
        if let Some(vs) = graph.get(&u) {
            for &v in vs {
                indeg[v] -= 1;
                if indeg[v] == 0 { q.push_back(v); }
            }
        }
    }
    println!("{}", if done == n { "true" } else { "false" });
}`,
  "dsa-course-schedule-ii": `use std::collections::{HashMap, VecDeque};
use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let m: usize = t[1].parse().unwrap();
    let mut graph: HashMap<usize, Vec<usize>> = HashMap::new();
    let mut indeg = vec![0i64; n];
    for i in 0..m {
        let a: usize = t[2 + 2 * i].parse().unwrap();
        let b: usize = t[3 + 2 * i].parse().unwrap();
        graph.entry(b).or_default().push(a);
        indeg[a] += 1;
    }
    let mut q: VecDeque<usize> = (0..n).filter(|&i| indeg[i] == 0).collect();
    let mut order: Vec<usize> = Vec::new();
    while let Some(u) = q.pop_front() {
        order.push(u);
        if let Some(vs) = graph.get(&u) {
            for &v in vs {
                indeg[v] -= 1;
                if indeg[v] == 0 { q.push_back(v); }
            }
        }
    }
    if order.len() == n {
        println!("{}", order.iter().map(|x| x.to_string()).collect::<Vec<_>>().join(" "));
    } else {
        println!("-1");
    }
}`,
  "dsa-pacific-atlantic-water-flow": `use std::io::Read;
fn dfs(grid: &[Vec<i64>], seen: &mut Vec<Vec<bool>>, i: i64, j: i64) {
    let (m, n) = (grid.len() as i64, grid[0].len() as i64);
    seen[i as usize][j as usize] = true;
    for (di, dj) in [(1i64, 0i64), (-1, 0), (0, 1), (0, -1)] {
        let (ni, nj) = (i + di, j + dj);
        if ni >= 0 && ni < m && nj >= 0 && nj < n && !seen[ni as usize][nj as usize] && grid[ni as usize][nj as usize] >= grid[i as usize][j as usize] {
            dfs(grid, seen, ni, nj);
        }
    }
}
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let r: usize = t[0].parse().unwrap();
    let c: usize = t[1].parse().unwrap();
    let vals: Vec<i64> = t.get(2..).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let grid: Vec<Vec<i64>> = (0..r).map(|i| vals.get(i * c..(i + 1) * c).unwrap_or(&[]).to_vec()).collect();
    let mut pac = vec![vec![false; c]; r];
    let mut atl = vec![vec![false; c]; r];
    for i in 0..r {
        dfs(&grid, &mut pac, i as i64, 0);
        dfs(&grid, &mut atl, i as i64, c as i64 - 1);
    }
    for j in 0..c {
        dfs(&grid, &mut pac, 0, j as i64);
        dfs(&grid, &mut atl, r as i64 - 1, j as i64);
    }
    let mut out: Vec<String> = Vec::new();
    for i in 0..r {
        for j in 0..c {
            if pac[i][j] && atl[i][j] { out.push(format!("{} {}", i, j)); }
        }
    }
    println!("{}", out.join("\\n"));
}`,
  "dsa-number-of-provinces": `use std::io::Read;
fn dfs(grid: &[Vec<i64>], seen: &mut Vec<bool>, i: usize) {
    seen[i] = true;
    for j in 0..grid.len() {
        if grid[i][j] == 1 && !seen[j] { dfs(grid, seen, j); }
    }
}
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let r: usize = t[0].parse().unwrap();
    let c: usize = t[1].parse().unwrap();
    let vals: Vec<i64> = t.get(2..).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let grid: Vec<Vec<i64>> = (0..r).map(|i| vals.get(i * c..(i + 1) * c).unwrap_or(&[]).to_vec()).collect();
    let n = grid.len();
    let mut seen = vec![false; n];
    let mut count = 0i64;
    for i in 0..n {
        if !seen[i] { count += 1; dfs(&grid, &mut seen, i); }
    }
    println!("{}", count);
}`,
  "dsa-word-ladder": `use std::collections::{HashSet, VecDeque};
use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let lines: Vec<String> = s.lines().map(|l| l.trim().to_string()).collect();
    let begin = lines.first().cloned().unwrap_or_default();
    let end = lines.get(1).cloned().unwrap_or_default();
    let n: usize = lines.get(2).and_then(|x| x.parse().ok()).unwrap_or(0);
    let words: Vec<String> = (0..n).map(|i| lines.get(3 + i).cloned().unwrap_or_default()).collect();
    let word_set: HashSet<String> = words.into_iter().collect();
    if !word_set.contains(&end) { println!("0"); return; }
    let mut q: VecDeque<(String, i64)> = VecDeque::new();
    q.push_back((begin.clone(), 1));
    let mut seen: HashSet<String> = HashSet::new();
    seen.insert(begin);
    let mut ans = 0i64;
    while let Some((word, steps)) = q.pop_front() {
        if word == end { ans = steps; break; }
        let chars: Vec<char> = word.chars().collect();
        for i in 0..chars.len() {
            for c in 'a'..='z' {
                let mut nxt: Vec<char> = chars.clone();
                nxt[i] = c;
                let nxt: String = nxt.into_iter().collect();
                if word_set.contains(&nxt) && !seen.contains(&nxt) {
                    seen.insert(nxt.clone());
                    q.push_back((nxt, steps + 1));
                }
            }
        }
    }
    println!("{}", ans);
}`,
  "dsa-keys-and-rooms": `use std::collections::HashSet;
use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let lines: Vec<&str> = s.lines().collect();
    let n: usize = lines.first().and_then(|x| x.trim().parse().ok()).unwrap_or(0);
    let mut rooms: Vec<Vec<usize>> = Vec::new();
    for i in 0..n {
        let parts: Vec<i64> = lines.get(1 + i).map(|l| l.split_whitespace().map(|x| x.parse().unwrap_or(0)).collect()).unwrap_or_default();
        if parts.is_empty() { rooms.push(vec![]); }
        else { rooms.push(parts[1..1 + parts[0] as usize].iter().map(|&x| x as usize).collect()); }
    }
    let mut seen: HashSet<usize> = HashSet::new();
    seen.insert(0);
    let mut stack = vec![0usize];
    while let Some(r) = stack.pop() {
        for &k in &rooms[r] {
            if !seen.contains(&k) { seen.insert(k); stack.push(k); }
        }
    }
    println!("{}", if seen.len() == rooms.len() { "true" } else { "false" });
}`,
  "dsa-shortest-path-in-binary-matrix": `use std::collections::VecDeque;
use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let lines: Vec<&str> = s.lines().collect();
    let dims: Vec<&str> = lines.first().map(|x| x.split_whitespace().collect()).unwrap_or_default();
    let r: usize = dims.first().and_then(|x| x.parse().ok()).unwrap_or(0);
    let mut grid: Vec<Vec<char>> = (0..r).map(|i| lines.get(1 + i).map(|l| l.trim().replace(' ', "").chars().collect()).unwrap_or_default()).collect();
    let n = grid.len();
    if n == 0 || grid[0][0] == '1' || grid[n - 1][n - 1] == '1' { println!("-1"); return; }
    let mut q: VecDeque<(usize, usize, i64)> = VecDeque::new();
    q.push_back((0, 0, 1));
    grid[0][0] = '1';
    let mut ans = -1i64;
    while let Some((i, j, d)) = q.pop_front() {
        if i == n - 1 && j == n - 1 { ans = d; break; }
        for di in -1i64..=1 {
            for dj in -1i64..=1 {
                if di == 0 && dj == 0 { continue; }
                let (ni, nj) = (i as i64 + di, j as i64 + dj);
                if ni >= 0 && ni < n as i64 && nj >= 0 && nj < n as i64 && grid[ni as usize][nj as usize] == '0' {
                    grid[ni as usize][nj as usize] = '1';
                    q.push_back((ni as usize, nj as usize, d + 1));
                }
            }
        }
    }
    println!("{}", ans);
}`,
  "dsa-surrounded-regions": `use std::io::Read;
fn dfs(grid: &mut Vec<Vec<char>>, i: i64, j: i64) {
    let (m, n) = (grid.len() as i64, grid[0].len() as i64);
    if i < 0 || i >= m || j < 0 || j >= n || grid[i as usize][j as usize] != 'O' { return; }
    grid[i as usize][j as usize] = 'S';
    dfs(grid, i + 1, j);
    dfs(grid, i - 1, j);
    dfs(grid, i, j + 1);
    dfs(grid, i, j - 1);
}
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let lines: Vec<&str> = s.lines().collect();
    let dims: Vec<&str> = lines.first().map(|x| x.split_whitespace().collect()).unwrap_or_default();
    let r: usize = dims.first().and_then(|x| x.parse().ok()).unwrap_or(0);
    let c: usize = dims.get(1).and_then(|x| x.parse().ok()).unwrap_or(0);
    let mut grid: Vec<Vec<char>> = (0..r).map(|i| lines.get(1 + i).map(|l| l.trim().replace(' ', "").chars().collect()).unwrap_or_default()).collect();
    let (m, n) = (r as i64, c as i64);
    for i in 0..m { dfs(&mut grid, i, 0); dfs(&mut grid, i, n - 1); }
    for j in 0..n { dfs(&mut grid, 0, j); dfs(&mut grid, m - 1, j); }
    for i in 0..r {
        for j in 0..c {
            if grid[i][j] == 'O' { grid[i][j] = 'X'; }
            else if grid[i][j] == 'S' { grid[i][j] = 'O'; }
        }
    }
    let rows: Vec<String> = grid.iter().map(|row| row.iter().collect::<String>()).collect();
    println!("{}", rows.join("\\n"));
}`,
  "dsa-graph-valid-tree": `use std::io::Read;
fn find(parent: &mut Vec<usize>, mut x: usize) -> usize {
    while parent[x] != x {
        parent[x] = parent[parent[x]];
        x = parent[x];
    }
    x
}
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let m: usize = t[1].parse().unwrap();
    let edges: Vec<(usize, usize)> = (0..m).map(|i| (t[2 + 2 * i].parse().unwrap(), t[3 + 2 * i].parse().unwrap())).collect();
    if edges.len() != n.saturating_sub(1) { println!("false"); return; }
    let mut parent: Vec<usize> = (0..n).collect();
    let mut ok = true;
    for (a, b) in edges {
        let (ra, rb) = (find(&mut parent, a), find(&mut parent, b));
        if ra == rb { ok = false; break; }
        parent[ra] = rb;
    }
    println!("{}", if ok { "true" } else { "false" });
}`,
  "dsa-cheapest-flights-within-k-stops": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let m: usize = t[1].parse().unwrap();
    let edges: Vec<(usize, usize, i64)> = (0..m).map(|i| (t[2 + 3 * i].parse().unwrap(), t[3 + 3 * i].parse().unwrap(), t[4 + 3 * i].parse().unwrap())).collect();
    let src: usize = t[2 + 3 * m].parse().unwrap();
    let dst: usize = t[3 + 3 * m].parse().unwrap();
    let k: usize = t[4 + 3 * m].parse().unwrap();
    const INF: i64 = i64::MAX / 4;
    let mut dist = vec![INF; n];
    dist[src] = 0;
    for _ in 0..k + 1 {
        let mut nxt = dist.clone();
        for &(u, v, w) in &edges {
            if dist[u] != INF && dist[u] + w < nxt[v] { nxt[v] = dist[u] + w; }
        }
        dist = nxt;
    }
    println!("{}", if dist[dst] != INF { dist[dst] } else { -1 });
}`,
  "dsa-climbing-stairs": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: i64 = t[0].parse().unwrap();
    let (mut a, mut b) = (1i64, 1i64);
    for _ in 0..n - 1 { let (na, nb) = (b, a + b); a = na; b = nb; }
    println!("{}", b);
}`,
  "dsa-house-robber": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let nums: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let (mut prev2, mut prev1) = (0i64, 0i64);
    for &x in &nums { let (n2, n1) = (prev1, prev1.max(prev2 + x)); prev2 = n2; prev1 = n1; }
    println!("{}", prev1);
}`,
  "dsa-house-robber-ii": `use std::io::Read;
fn rob_range(arr: &[i64]) -> i64 {
    let (mut prev2, mut prev1) = (0i64, 0i64);
    for &x in arr { let (n2, n1) = (prev1, prev1.max(prev2 + x)); prev2 = n2; prev1 = n1; }
    prev1
}
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let nums: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    if nums.len() == 1 { println!("{}", nums[0]); return; }
    println!("{}", rob_range(&nums.get(..nums.len() - 1).unwrap_or(&[])).max(rob_range(&nums.get(1..).unwrap_or(&[]))));
}`,
  "dsa-coin-change": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let coins: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let amount: usize = t[1 + n].parse().unwrap();
    let inf = amount as i64 + 1;
    let mut dp = vec![inf; amount + 1];
    dp[0] = 0;
    for a in 1..=amount {
        for &c in &coins {
            if c as usize <= a { dp[a] = dp[a].min(dp[a - c as usize] + 1); }
        }
    }
    println!("{}", if dp[amount] != inf { dp[amount] } else { -1 });
}`,
  "dsa-coin-change-ii": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let coins: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let amount: usize = t[1 + n].parse().unwrap();
    let mut dp = vec![0i64; amount + 1];
    dp[0] = 1;
    for &c in &coins {
        for a in c as usize..=amount { dp[a] += dp[a - c as usize]; }
    }
    println!("{}", dp[amount]);
}`,
  "dsa-longest-increasing-subsequence": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let nums: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let mut tails: Vec<i64> = Vec::new();
    for &x in &nums {
        let i = tails.partition_point(|&v| v < x);
        if i == tails.len() { tails.push(x); } else { tails[i] = x; }
    }
    println!("{}", tails.len());
}`,
  "dsa-edit-distance": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let lines: Vec<&str> = s.lines().collect();
    let w1: Vec<char> = lines.first().map(|x| x.trim()).unwrap_or("").chars().collect();
    let w2: Vec<char> = lines.get(1).map(|x| x.trim()).unwrap_or("").chars().collect();
    let (m, n) = (w1.len(), w2.len());
    let mut dp = vec![vec![0i64; n + 1]; m + 1];
    for i in 0..=m { dp[i][0] = i as i64; }
    for j in 0..=n { dp[0][j] = j as i64; }
    for i in 1..=m {
        for j in 1..=n {
            if w1[i - 1] == w2[j - 1] { dp[i][j] = dp[i - 1][j - 1]; }
            else { dp[i][j] = 1 + dp[i - 1][j].min(dp[i][j - 1]).min(dp[i - 1][j - 1]); }
        }
    }
    println!("{}", dp[m][n]);
}`,
  "dsa-longest-common-subsequence": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let lines: Vec<&str> = s.lines().collect();
    let t1: Vec<char> = lines.first().map(|x| x.trim()).unwrap_or("").chars().collect();
    let t2: Vec<char> = lines.get(1).map(|x| x.trim()).unwrap_or("").chars().collect();
    let (m, n) = (t1.len(), t2.len());
    let mut dp = vec![vec![0i64; n + 1]; m + 1];
    for i in 1..=m {
        for j in 1..=n {
            if t1[i - 1] == t2[j - 1] { dp[i][j] = dp[i - 1][j - 1] + 1; }
            else { dp[i][j] = dp[i - 1][j].max(dp[i][j - 1]); }
        }
    }
    println!("{}", dp[m][n]);
}`,
  "dsa-unique-paths": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let m: usize = t[0].parse().unwrap();
    let n: usize = t[1].parse().unwrap();
    let mut dp = vec![1i64; n];
    for _ in 1..m {
        for j in 1..n { dp[j] += dp[j - 1]; }
    }
    println!("{}", dp[n - 1]);
}`,
  "dsa-unique-paths-ii": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let r: usize = t[0].parse().unwrap();
    let c: usize = t[1].parse().unwrap();
    let vals: Vec<i64> = t.get(2..).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let grid: Vec<Vec<i64>> = (0..r).map(|i| vals.get(i * c..(i + 1) * c).unwrap_or(&[]).to_vec()).collect();
    if grid[0][0] == 1 || grid[r - 1][c - 1] == 1 { println!("0"); return; }
    let mut dp = vec![vec![0i64; c]; r];
    dp[0][0] = 1;
    for i in 0..r {
        for j in 0..c {
            if grid[i][j] == 1 { dp[i][j] = 0; continue; }
            if i > 0 { dp[i][j] += dp[i - 1][j]; }
            if j > 0 { dp[i][j] += dp[i][j - 1]; }
        }
    }
    println!("{}", dp[r - 1][c - 1]);
}`,
  "dsa-word-break": `use std::collections::HashSet;
use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let lines: Vec<String> = s.lines().map(|l| l.trim().to_string()).collect();
    let st = lines.first().cloned().unwrap_or_default();
    let n: usize = lines.get(1).and_then(|x| x.parse().ok()).unwrap_or(0);
    let words: HashSet<String> = (0..n).map(|i| lines.get(2 + i).cloned().unwrap_or_default()).collect();
    let chars: Vec<char> = st.chars().collect();
    let mut dp = vec![false; chars.len() + 1];
    dp[0] = true;
    for i in 1..=chars.len() {
        for j in 0..i {
            if dp[j] && words.contains(&chars.get(j..(i).min(chars.len())).unwrap_or(&[]).iter().collect::<String>()) { dp[i] = true; break; }
        }
    }
    println!("{}", if dp[chars.len()] { "true" } else { "false" });
}`,
  "dsa-decode-ways": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let st: Vec<char> = s.trim().chars().collect();
    if st.is_empty() || st[0] == '0' { println!("0"); return; }
    let (mut prev2, mut prev1) = (1i64, 1i64);
    for i in 1..st.len() {
        let mut cur = 0i64;
        if st[i] != '0' { cur += prev1; }
        let two: i64 = format!("{}{}", st[i - 1], st[i]).parse().unwrap();
        if (10..=26).contains(&two) { cur += prev2; }
        prev2 = prev1;
        prev1 = cur;
    }
    println!("{}", prev1);
}`,
  "dsa-partition-equal-subset-sum": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let nums: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let total: i64 = nums.iter().sum();
    if total % 2 == 1 { println!("false"); return; }
    let target = (total / 2) as usize;
    let mut dp = vec![false; target + 1];
    dp[0] = true;
    for &x in &nums {
        for s in (x as usize..=target).rev() { dp[s] = dp[s] || dp[s - x as usize]; }
    }
    println!("{}", if dp[target] { "true" } else { "false" });
}`,
  "dsa-longest-palindromic-subsequence": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let st: Vec<char> = s.trim().chars().collect();
    let n = st.len();
    if n == 0 { println!("0"); return; }
    let mut dp = vec![vec![0i64; n]; n];
    for i in 0..n { dp[i][i] = 1; }
    for length in 2..=n {
        for i in 0..=n - length {
            let j = i + length - 1;
            if st[i] == st[j] {
                dp[i][j] = if length == 2 { 2 } else { dp[i + 1][j - 1] + 2 };
            } else {
                dp[i][j] = dp[i + 1][j].max(dp[i][j - 1]);
            }
        }
    }
    println!("{}", dp[0][n - 1]);
}`,
  "dsa-best-time-to-buy-sell-stock-ii": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let prices: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let mut profit = 0i64;
    for i in 1..prices.len() {
        if prices[i] > prices[i - 1] { profit += prices[i] - prices[i - 1]; }
    }
    println!("{}", profit);
}`,
  "dsa-gas-station": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let gas: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let m: usize = t[1 + n].parse().unwrap();
    let cost: Vec<i64> = t.get(2 + n..(2 + n + m).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let (mut total, mut tank, mut start) = (0i64, 0i64, 0usize);
    for i in 0..gas.len() {
        let diff = gas[i] - cost[i];
        total += diff;
        tank += diff;
        if tank < 0 { start = i + 1; tank = 0; }
    }
    println!("{}", if total >= 0 { start as i64 } else { -1 });
}`,
  "dsa-assign-cookies": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let mut g: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let m: usize = t[1 + n].parse().unwrap();
    let mut sv: Vec<i64> = t.get(2 + n..(2 + n + m).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    g.sort_unstable();
    sv.sort_unstable();
    let (mut child, mut cookie) = (0usize, 0usize);
    while child < g.len() && cookie < sv.len() {
        if sv[cookie] >= g[child] { child += 1; }
        cookie += 1;
    }
    println!("{}", child);
}`,
  "dsa-non-overlapping-intervals": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let mut intervals: Vec<(i64, i64)> = (0..n).map(|i| (t[1 + 2 * i].parse().unwrap(), t[2 + 2 * i].parse().unwrap())).collect();
    intervals.sort_by_key(|&(_, e)| e);
    let mut kept = 0i64;
    let mut end = i64::MIN;
    for (s, e) in intervals {
        if s >= end { kept += 1; end = e; }
    }
    println!("{}", n as i64 - kept);
}`,
  "dsa-partition-labels": `use std::collections::HashMap;
use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let st: Vec<char> = s.trim().chars().collect();
    let mut last: HashMap<char, usize> = HashMap::new();
    for (i, &c) in st.iter().enumerate() { last.insert(c, i); }
    let mut out: Vec<i64> = Vec::new();
    let (mut start, mut end) = (0usize, 0usize);
    for (i, &c) in st.iter().enumerate() {
        end = end.max(last[&c]);
        if i == end { out.push((end - start + 1) as i64); start = i + 1; }
    }
    println!("{}", out.iter().map(|x| x.to_string()).collect::<Vec<_>>().join(" "));
}`,
  "dsa-lemonade-change": `use std::io::Read;
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let bills: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let (mut fives, mut tens) = (0i64, 0i64);
    let mut ok = true;
    for &b in &bills {
        if b == 5 { fives += 1; }
        else if b == 10 {
            if fives == 0 { ok = false; break; }
            fives -= 1; tens += 1;
        } else if tens > 0 && fives > 0 { tens -= 1; fives -= 1; }
        else if fives >= 3 { fives -= 3; }
        else { ok = false; break; }
    }
    println!("{}", if ok { "true" } else { "false" });
}`,
  "dsa-subsets": `use std::io::Read;
fn backtrack(nums: &[i64], i: usize, cur: &mut Vec<i64>, out: &mut Vec<Vec<i64>>) {
    if i == nums.len() { out.push(cur.clone()); return; }
    backtrack(nums, i + 1, cur, out);
    cur.push(nums[i]);
    backtrack(nums, i + 1, cur, out);
    cur.pop();
}
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let nums: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let mut out: Vec<Vec<i64>> = Vec::new();
    backtrack(&nums, 0, &mut Vec::new(), &mut out);
    let rows: Vec<String> = out.iter().map(|r| r.iter().map(|x| x.to_string()).collect::<Vec<_>>().join(" ")).collect();
    println!("{}", rows.join("\\n"));
}`,
  "dsa-permutations": `use std::io::Read;
fn backtrack(nums: &[i64], cur: &mut Vec<i64>, used: &mut Vec<bool>, out: &mut Vec<Vec<i64>>) {
    if cur.len() == nums.len() { out.push(cur.clone()); return; }
    for (i, &x) in nums.iter().enumerate() {
        if used[i] { continue; }
        used[i] = true;
        cur.push(x);
        backtrack(nums, cur, used, out);
        cur.pop();
        used[i] = false;
    }
}
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let nums: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let mut out: Vec<Vec<i64>> = Vec::new();
    backtrack(&nums, &mut Vec::new(), &mut vec![false; nums.len()], &mut out);
    let rows: Vec<String> = out.iter().map(|r| r.iter().map(|x| x.to_string()).collect::<Vec<_>>().join(" ")).collect();
    println!("{}", rows.join("\\n"));
}`,
  "dsa-combination-sum": `use std::io::Read;
fn backtrack(cands: &[i64], start: usize, remaining: i64, cur: &mut Vec<i64>, out: &mut Vec<Vec<i64>>) {
    if remaining == 0 { out.push(cur.clone()); return; }
    for i in start..cands.len() {
        if cands[i] > remaining { break; }
        cur.push(cands[i]);
        backtrack(cands, i, remaining - cands[i], cur, out);
        cur.pop();
    }
}
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let mut cands: Vec<i64> = t.get(1..(1 + n).min(t.len())).unwrap_or(&[]).iter().map(|x| x.parse().unwrap()).collect();
    let target: i64 = t[1 + n].parse().unwrap();
    cands.sort_unstable();
    let mut out: Vec<Vec<i64>> = Vec::new();
    backtrack(&cands, 0, target, &mut Vec::new(), &mut out);
    let rows: Vec<String> = out.iter().map(|r| r.iter().map(|x| x.to_string()).collect::<Vec<_>>().join(" ")).collect();
    println!("{}", rows.join("\\n"));
}`,
  "dsa-generate-parentheses": `use std::io::Read;
fn backtrack(cur: &mut Vec<char>, open: usize, close: usize, n: usize, out: &mut Vec<String>) {
    if cur.len() == 2 * n { out.push(cur.iter().collect()); return; }
    if open < n { cur.push('('); backtrack(cur, open + 1, close, n, out); cur.pop(); }
    if close < open { cur.push(')'); backtrack(cur, open, close + 1, n, out); cur.pop(); }
}
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let mut out: Vec<String> = Vec::new();
    backtrack(&mut Vec::new(), 0, 0, n, &mut out);
    println!("{}", out.join("\\n"));
}`,
  "dsa-letter-combinations-of-phone-number": `use std::io::Read;
fn mapping(d: char) -> &'static str {
    match d {
        '2' => "abc", '3' => "def", '4' => "ghi", '5' => "jkl",
        '6' => "mno", '7' => "pqrs", '8' => "tuv", '9' => "wxyz",
        _ => "",
    }
}
fn backtrack(digits: &[char], i: usize, cur: &mut Vec<char>, out: &mut Vec<String>) {
    if i == digits.len() { out.push(cur.iter().collect()); return; }
    for c in mapping(digits[i]).chars() {
        cur.push(c);
        backtrack(digits, i + 1, cur, out);
        cur.pop();
    }
}
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let digits: Vec<char> = s.trim().chars().collect();
    if digits.is_empty() { println!(); return; }
    let mut out: Vec<String> = Vec::new();
    backtrack(&digits, 0, &mut Vec::new(), &mut out);
    println!("{}", out.join(" "));
}`,
  "dsa-n-queens-count": `use std::collections::HashSet;
use std::io::Read;
fn backtrack(row: usize, n: usize, cols: &mut HashSet<i64>, d1: &mut HashSet<i64>, d2: &mut HashSet<i64>, count: &mut i64) {
    if row == n { *count += 1; return; }
    for col in 0..n {
        let (c, a, b) = (col as i64, row as i64 - col as i64, row as i64 + col as i64);
        if cols.contains(&c) || d1.contains(&a) || d2.contains(&b) { continue; }
        cols.insert(c); d1.insert(a); d2.insert(b);
        backtrack(row + 1, n, cols, d1, d2, count);
        cols.remove(&c); d1.remove(&a); d2.remove(&b);
    }
}
fn main() {
    let mut s = String::new();
    std::io::stdin().read_to_string(&mut s).unwrap();
    let t: Vec<&str> = s.split_whitespace().collect();
    if t.is_empty() { return; }
    let n: usize = t[0].parse().unwrap();
    let mut count = 0i64;
    backtrack(0, n, &mut HashSet::new(), &mut HashSet::new(), &mut HashSet::new(), &mut count);
    println!("{}", count);
}`,
};
