// Java starters for all 152 DSA problems. Each value is a complete runnable
// Java program (public class Main, single-file source launch: `java Main.java`)
// that reads the same stdin format as the Python starter and prints the same
// stdout byte-for-byte. Keyed by problem id.
export const DSA_STARTERS_JAVA: Record<string, string> = {
  "dsa-two-sum": `import java.util.*;
public class Main {
    static String fmtI(int[] a) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(' '); sb.append(a[i]); }
        return sb.toString();
    }
    static int[] solve(int[] nums, int target) {
        Map<Integer, Integer> seen = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            if (seen.containsKey(target - nums[i])) return new int[]{seen.get(target - nums[i]), i};
            seen.put(nums[i], i);
        }
        return new int[]{-1, -1};
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = Integer.parseInt(t[p++]);
        int target = Integer.parseInt(t[p++]);
        System.out.println(fmtI(solve(nums, target)));
    }
}
`,
  "dsa-best-time-to-buy-sell-stock": `import java.util.*;
public class Main {
    static int solve(int[] prices) {
        int best = 0;
        int low = prices[0];
        for (int i = 1; i < prices.length; i++) {
            best = Math.max(best, prices[i] - low);
            low = Math.min(low, prices[i]);
        }
        return best;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = Integer.parseInt(t[p++]);
        System.out.println(solve(nums));
    }
}
`,
  "dsa-maximum-subarray": `import java.util.*;
public class Main {
    static int solve(int[] nums) {
        int best = nums[0];
        int cur = nums[0];
        for (int i = 1; i < nums.length; i++) {
            cur = Math.max(nums[i], cur + nums[i]);
            best = Math.max(best, cur);
        }
        return best;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = Integer.parseInt(t[p++]);
        System.out.println(solve(nums));
    }
}
`,
  "dsa-contains-duplicate": `import java.util.*;
public class Main {
    static boolean solve(int[] nums) {
        Set<Integer> s = new HashSet<>();
        for (int x : nums) s.add(x);
        return s.size() != nums.length;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = Integer.parseInt(t[p++]);
        System.out.println(solve(nums) ? "true" : "false");
    }
}
`,
  "dsa-product-of-array-except-self": `import java.util.*;
public class Main {
    static String fmtL(long[] a) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(' '); sb.append(a[i]); }
        return sb.toString();
    }
    static long[] solve(int[] nums) {
        int n = nums.length;
        long[] out = new long[n];
        Arrays.fill(out, 1L);
        long left = 1;
        for (int i = 0; i < n; i++) { out[i] = left; left *= nums[i]; }
        long right = 1;
        for (int i = n - 1; i >= 0; i--) { out[i] *= right; right *= nums[i]; }
        return out;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = Integer.parseInt(t[p++]);
        System.out.println(fmtL(solve(nums)));
    }
}
`,
  "dsa-rotate-array": `import java.util.*;
public class Main {
    static String fmtI(int[] a) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(' '); sb.append(a[i]); }
        return sb.toString();
    }
    static int[] solve(int[] nums, int k) {
        int n = nums.length;
        if (n == 0) return nums;
        k %= n;
        if (k == 0) return nums;
        int[] res = new int[n];
        System.arraycopy(nums, n - k, res, 0, k);
        System.arraycopy(nums, 0, res, k, n - k);
        return res;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = Integer.parseInt(t[p++]);
        int k = Integer.parseInt(t[p++]);
        System.out.println(fmtI(solve(nums, k)));
    }
}
`,
  "dsa-move-zeroes": `import java.util.*;
public class Main {
    static String fmtI(int[] a) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(' '); sb.append(a[i]); }
        return sb.toString();
    }
    static int[] solve(int[] nums) {
        int pos = 0;
        for (int x : nums) {
            if (x != 0) { nums[pos] = x; pos++; }
        }
        for (int i = pos; i < nums.length; i++) nums[i] = 0;
        return nums;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = Integer.parseInt(t[p++]);
        System.out.println(fmtI(solve(nums)));
    }
}
`,
  "dsa-majority-element": `import java.util.*;
public class Main {
    static int solve(int[] nums) {
        Integer cand = null;
        int count = 0;
        for (int x : nums) {
            if (count == 0) { cand = x; count = 1; }
            else if (x == cand) count++;
            else count--;
        }
        return cand;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = Integer.parseInt(t[p++]);
        System.out.println(solve(nums));
    }
}
`,
  "dsa-missing-number": `import java.util.*;
public class Main {
    static int solve(int[] nums) {
        int n = nums.length;
        int sum = 0;
        for (int x : nums) sum += x;
        return n * (n + 1) / 2 - sum;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = Integer.parseInt(t[p++]);
        System.out.println(solve(nums));
    }
}
`,
  "dsa-find-duplicate-number": `import java.util.*;
public class Main {
    static int solve(int[] nums) {
        int slow = nums[0];
        int fast = nums[0];
        while (true) {
            slow = nums[slow];
            fast = nums[nums[fast]];
            if (slow == fast) break;
        }
        slow = nums[0];
        while (slow != fast) {
            slow = nums[slow];
            fast = nums[fast];
        }
        return slow;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = Integer.parseInt(t[p++]);
        System.out.println(solve(nums));
    }
}
`,
  "dsa-merge-sorted-array": `import java.util.*;
public class Main {
    static String fmtI(int[] a) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(' '); sb.append(a[i]); }
        return sb.toString();
    }
    static int[] solve(int[] a, int[] b) {
        int[] out = new int[a.length + b.length];
        int i = 0, j = 0, k = 0;
        while (i < a.length && j < b.length) {
            if (a[i] <= b[j]) out[k++] = a[i++];
            else out[k++] = b[j++];
        }
        while (i < a.length) out[k++] = a[i++];
        while (j < b.length) out[k++] = b[j++];
        return out;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = Integer.parseInt(t[p++]);
        int m = Integer.parseInt(t[p++]);
        int[] b = new int[m];
        for (int i = 0; i < m; i++) b[i] = Integer.parseInt(t[p++]);
        System.out.println(fmtI(solve(a, b)));
    }
}
`,
  "dsa-maximum-product-subarray": `import java.util.*;
public class Main {
    static int solve(int[] nums) {
        int best = nums[0];
        int curMax = nums[0];
        int curMin = nums[0];
        for (int i = 1; i < nums.length; i++) {
            int x = nums[i];
            if (x < 0) { int tmp = curMax; curMax = curMin; curMin = tmp; }
            curMax = Math.max(x, curMax * x);
            curMin = Math.min(x, curMin * x);
            best = Math.max(best, curMax);
        }
        return best;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = Integer.parseInt(t[p++]);
        System.out.println(solve(nums));
    }
}
`,
  "dsa-trapping-rain-water": `import java.util.*;
public class Main {
    static int solve(int[] height) {
        int left = 0, right = height.length - 1;
        int leftMax = 0, rightMax = 0, water = 0;
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
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = Integer.parseInt(t[p++]);
        System.out.println(solve(nums));
    }
}
`,
  "dsa-jump-game": `import java.util.*;
public class Main {
    static boolean solve(int[] nums) {
        int reach = 0;
        for (int i = 0; i < nums.length; i++) {
            if (i > reach) return false;
            reach = Math.max(reach, i + nums[i]);
        }
        return true;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = Integer.parseInt(t[p++]);
        System.out.println(solve(nums) ? "true" : "false");
    }
}
`,
  "dsa-jump-game-ii": `import java.util.*;
public class Main {
    static int solve(int[] nums) {
        int jumps = 0, curEnd = 0, farthest = 0;
        for (int i = 0; i < nums.length - 1; i++) {
            farthest = Math.max(farthest, i + nums[i]);
            if (i == curEnd) { jumps++; curEnd = farthest; }
        }
        return jumps;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = Integer.parseInt(t[p++]);
        System.out.println(solve(nums));
    }
}
`,
  "dsa-subarray-sum-equals-k": `import java.util.*;
public class Main {
    static int solve(int[] nums, int k) {
        Map<Integer, Integer> counts = new HashMap<>();
        counts.put(0, 1);
        int prefix = 0, ans = 0;
        for (int x : nums) {
            prefix += x;
            ans += counts.getOrDefault(prefix - k, 0);
            counts.put(prefix, counts.getOrDefault(prefix, 0) + 1);
        }
        return ans;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = Integer.parseInt(t[p++]);
        int k = Integer.parseInt(t[p++]);
        System.out.println(solve(nums, k));
    }
}
`,
  "dsa-sort-colors": `import java.util.*;
public class Main {
    static String fmtI(int[] a) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(' '); sb.append(a[i]); }
        return sb.toString();
    }
    static int[] solve(int[] nums) {
        int low = 0, mid = 0, high = nums.length - 1;
        while (mid <= high) {
            if (nums[mid] == 0) {
                int tmp = nums[low]; nums[low] = nums[mid]; nums[mid] = tmp;
                low++; mid++;
            } else if (nums[mid] == 1) mid++;
            else {
                int tmp = nums[mid]; nums[mid] = nums[high]; nums[high] = tmp;
                high--;
            }
        }
        return nums;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = Integer.parseInt(t[p++]);
        System.out.println(fmtI(solve(nums)));
    }
}
`,
  "dsa-first-missing-positive": `import java.util.*;
public class Main {
    static int solve(int[] nums) {
        int n = nums.length;
        for (int i = 0; i < n; i++) {
            while (nums[i] >= 1 && nums[i] <= n && nums[nums[i] - 1] != nums[i]) {
                int tmp = nums[nums[i] - 1]; nums[nums[i] - 1] = nums[i]; nums[i] = tmp;
            }
        }
        for (int i = 0; i < n; i++) if (nums[i] != i + 1) return i + 1;
        return n + 1;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = Integer.parseInt(t[p++]);
        System.out.println(solve(nums));
    }
}
`,
  "dsa-valid-palindrome": `import java.util.*;
public class Main {
    static boolean solve(String s) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (Character.isLetterOrDigit(c)) sb.append(Character.toLowerCase(c));
        }
        String f = sb.toString();
        return f.equals(new StringBuilder(f).reverse().toString());
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String s = all.strip();
        System.out.println(solve(s) ? "true" : "false");
    }
}
`,
  "dsa-valid-anagram": `import java.util.*;
import java.io.*;
public class Main {
    static boolean solve(String s, String t) {
        if (s.length() != t.length()) return false;
        int[] c = new int[256];
        for (int i = 0; i < s.length(); i++) c[s.charAt(i)]++;
        for (int i = 0; i < t.length(); i++) { c[t.charAt(i)]--; if (c[t.charAt(i)] < 0) return false; }
        return true;
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in, java.nio.charset.StandardCharsets.UTF_8));
        String s1 = br.readLine();
        String s2 = br.readLine();
        if (s1 == null) s1 = "";
        if (s2 == null) s2 = "";
        System.out.println(solve(s1.strip(), s2.strip()) ? "true" : "false");
    }
}
`,
  "dsa-longest-substring-without-repeating": `import java.util.*;
public class Main {
    static int solve(String s) {
        Map<Character, Integer> last = new HashMap<>();
        int best = 0, start = 0;
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (last.containsKey(c) && last.get(c) >= start) start = last.get(c) + 1;
            last.put(c, i);
            best = Math.max(best, i - start + 1);
        }
        return best;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        System.out.println(solve(all.strip()));
    }
}
`,
  "dsa-longest-palindromic-substring": `import java.util.*;
public class Main {
    static String expand(String s, int l, int r) {
        while (l >= 0 && r < s.length() && s.charAt(l) == s.charAt(r)) { l--; r++; }
        return s.substring(l + 1, r);
    }
    static String solve(String s) {
        if (s.isEmpty()) return "";
        String best = s.substring(0, 1);
        for (int i = 0; i < s.length(); i++) {
            String c1 = expand(s, i, i);
            String c2 = expand(s, i, i + 1);
            if (c1.length() > best.length()) best = c1;
            if (c2.length() > best.length()) best = c2;
        }
        return best;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        System.out.println(solve(all.strip()));
    }
}
`,
  "dsa-group-anagrams": `import java.util.*;
public class Main {
    static String fmtStrRows(List<List<String>> rows) {
        List<String> out = new ArrayList<>();
        for (List<String> r : rows) {
            if (r.isEmpty()) out.add("");
            else if (r.get(0).length() == 1) out.add(String.join("", r));
            else out.add(String.join(" ", r));
        }
        return String.join("\\n", out);
    }
    static List<List<String>> solve(String[] words) {
        Map<String, List<String>> groups = new LinkedHashMap<>();
        for (String w : words) {
            char[] ch = w.toCharArray();
            Arrays.sort(ch);
            String key = new String(ch);
            groups.computeIfAbsent(key, k -> new ArrayList<>()).add(w);
        }
        List<List<String>> out = new ArrayList<>(groups.values());
        for (List<String> g : out) Collections.sort(g);
        out.sort(Comparator.comparing((List<String> g) -> g.get(0)));
        return out;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int n = Integer.parseInt(t[0]);
        String[] words = new String[Math.min(n, t.length - 1)];
        for (int i = 0; i < words.length; i++) words[i] = t[1 + i];
        System.out.println(fmtStrRows(solve(words)));
    }
}
`,
  "dsa-valid-parentheses": `import java.util.*;
public class Main {
    static boolean solve(String s) {
        Deque<Character> stack = new ArrayDeque<>();
        Map<Character, Character> pairs = new HashMap<>();
        pairs.put(')', '('); pairs.put(']', '['); pairs.put('}', '{');
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (c == '(' || c == '[' || c == '{') stack.push(c);
            else {
                if (stack.isEmpty() || stack.pop() != pairs.get(c)) return false;
            }
        }
        return stack.isEmpty();
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        System.out.println(solve(all.strip()) ? "true" : "false");
    }
}
`,
  "dsa-string-to-integer-atoi": `import java.util.*;
public class Main {
    static long solve(String s) {
        int i = 0, n = s.length();
        while (i < n && s.charAt(i) == ' ') i++;
        int sign = 1;
        if (i < n && (s.charAt(i) == '+' || s.charAt(i) == '-')) {
            sign = s.charAt(i) == '-' ? -1 : 1;
            i++;
        }
        long num = 0;
        while (i < n && Character.isDigit(s.charAt(i))) {
            num = num * 10 + (s.charAt(i) - '0');
            if (num > 3000000000L) num = 3000000000L;
            i++;
        }
        num *= sign;
        return Math.max(-2147483648L, Math.min(2147483647L, num));
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        System.out.println(solve(all.strip()));
    }
}
`,
  "dsa-longest-common-prefix": `import java.util.*;
public class Main {
    static String solve(String[] words) {
        if (words.length == 0) return "";
        String prefix = words[0];
        for (int i = 1; i < words.length; i++) {
            while (!words[i].startsWith(prefix)) {
                prefix = prefix.substring(0, prefix.length() - 1);
                if (prefix.isEmpty()) return "";
            }
        }
        return prefix;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int n = Integer.parseInt(t[0]);
        String[] words = new String[Math.min(n, t.length - 1)];
        for (int i = 0; i < words.length; i++) words[i] = t[1 + i];
        System.out.println(solve(words));
    }
}
`,
  "dsa-reverse-words-in-string": `import java.util.*;
public class Main {
    static String solve(String s) {
        String[] w = s.strip().split("\\\\s+");
        List<String> list = new ArrayList<>(Arrays.asList(w));
        Collections.reverse(list);
        return String.join(" ", list);
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        System.out.println(solve(all.strip()));
    }
}
`,
  "dsa-implement-strstr": `import java.util.*;
import java.io.*;
public class Main {
    static int solve(String haystack, String needle) {
        return haystack.indexOf(needle);
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in, java.nio.charset.StandardCharsets.UTF_8));
        String s1 = br.readLine();
        String s2 = br.readLine();
        if (s1 == null) s1 = "";
        if (s2 == null) s2 = "";
        System.out.println(solve(s1.strip(), s2.strip()));
    }
}
`,
  "dsa-count-and-say": `import java.util.*;
public class Main {
    static String solve(int n) {
        String cur = "1";
        for (int k = 0; k < n - 1; k++) {
            StringBuilder nxt = new StringBuilder();
            int i = 0;
            while (i < cur.length()) {
                int j = i;
                while (j < cur.length() && cur.charAt(j) == cur.charAt(i)) j++;
                nxt.append(j - i);
                nxt.append(cur.charAt(i));
                i = j;
            }
            cur = nxt.toString();
        }
        return cur;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        System.out.println(solve(Integer.parseInt(t[0])));
    }
}
`,
  "dsa-zigzag-conversion": `import java.util.*;
import java.io.*;
public class Main {
    static String solve(String s, int k) {
        if (k == 1 || k >= s.length()) return s;
        String[] rows = new String[k];
        Arrays.fill(rows, "");
        int r = 0, step = 1;
        for (int i = 0; i < s.length(); i++) {
            rows[r] += s.charAt(i);
            if (r == 0) step = 1;
            else if (r == k - 1) step = -1;
            r += step;
        }
        StringBuilder sb = new StringBuilder();
        for (String row : rows) sb.append(row);
        return sb.toString();
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in, java.nio.charset.StandardCharsets.UTF_8));
        String s = br.readLine();
        String kLine = br.readLine();
        if (s == null) s = "";
        int k = (kLine == null || kLine.strip().isEmpty()) ? 0 : Integer.parseInt(kLine.strip());
        System.out.println(solve(s.strip(), k));
    }
}
`,
  "dsa-minimum-window-substring": `import java.util.*;
import java.io.*;
public class Main {
    static String solve(String s, String t) {
        Map<Character, Integer> need = new HashMap<>();
        for (int i = 0; i < t.length(); i++) need.put(t.charAt(i), need.getOrDefault(t.charAt(i), 0) + 1);
        int missing = t.length();
        int left = 0;
        String best = "";
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            if (need.getOrDefault(c, 0) > 0) missing--;
            need.put(c, need.getOrDefault(c, 0) - 1);
            while (missing == 0) {
                if (best.isEmpty() || right - left + 1 < best.length()) best = s.substring(left, right + 1);
                char lc = s.charAt(left);
                need.put(lc, need.get(lc) + 1);
                if (need.get(lc) > 0) missing++;
                left++;
            }
        }
        return best;
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in, java.nio.charset.StandardCharsets.UTF_8));
        String s1 = br.readLine();
        String s2 = br.readLine();
        if (s1 == null) s1 = "";
        if (s2 == null) s2 = "";
        System.out.println(solve(s1.strip(), s2.strip()));
    }
}
`,
  "dsa-longest-repeating-character-replacement": `import java.util.*;
import java.io.*;
public class Main {
    static int solve(String s, int k) {
        Map<Character, Integer> counts = new HashMap<>();
        int best = 0, left = 0;
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            counts.put(c, counts.getOrDefault(c, 0) + 1);
            int maxCount = 0;
            for (int v : counts.values()) maxCount = Math.max(maxCount, v);
            while ((right - left + 1) - maxCount > k) {
                counts.put(s.charAt(left), counts.get(s.charAt(left)) - 1);
                left++;
                maxCount = 0;
                for (int v : counts.values()) maxCount = Math.max(maxCount, v);
            }
            best = Math.max(best, right - left + 1);
        }
        return best;
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in, java.nio.charset.StandardCharsets.UTF_8));
        String s = br.readLine();
        String kLine = br.readLine();
        if (s == null) s = "";
        int k = (kLine == null || kLine.strip().isEmpty()) ? 0 : Integer.parseInt(kLine.strip());
        System.out.println(solve(s.strip(), k));
    }
}
`,
  "dsa-first-unique-character": `import java.util.*;
public class Main {
    static int solve(String s) {
        Map<Character, Integer> counts = new HashMap<>();
        for (int i = 0; i < s.length(); i++) counts.put(s.charAt(i), counts.getOrDefault(s.charAt(i), 0) + 1);
        for (int i = 0; i < s.length(); i++) if (counts.get(s.charAt(i)) == 1) return i;
        return -1;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        System.out.println(solve(all.strip()));
    }
}
`,
  "dsa-intersection-of-two-arrays": `import java.util.*;
public class Main {
    static String fmtI(int[] a) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(' '); sb.append(a[i]); }
        return sb.toString();
    }
    static int[] solve(int[] a, int[] b) {
        Set<Integer> sa = new HashSet<>();
        for (int x : a) sa.add(x);
        Set<Integer> sb = new HashSet<>();
        for (int x : b) sb.add(x);
        sa.retainAll(sb);
        int[] out = new int[sa.size()];
        int i = 0;
        for (int x : sa) out[i++] = x;
        Arrays.sort(out);
        return out;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int n = Integer.parseInt(t[0]);
        // Mirror Python's lenient slicing: a = data[1:1+n], m = data[1+n],
        // b = data[2+n:2+n+m]. (Test 1 declares n=4 but lists only 3 values,
        // so the count token is absorbed into a, exactly as in Python.)
        int aLen = Math.min(n, Math.max(0, t.length - 1));
        int[] a = new int[aLen];
        for (int i = 0; i < aLen; i++) a[i] = Integer.parseInt(t[1 + i]);
        int m = Integer.parseInt(t[1 + n]);
        int bStart = 2 + n;
        int bLen = Math.min(m, Math.max(0, t.length - bStart));
        int[] b = new int[bLen];
        for (int i = 0; i < bLen; i++) b[i] = Integer.parseInt(t[bStart + i]);
        System.out.println(fmtI(solve(a, b)));
    }
}
`,
  "dsa-happy-number": `import java.util.*;
public class Main {
    static boolean solve(int n) {
        Set<Integer> seen = new HashSet<>();
        while (n != 1 && !seen.contains(n)) {
            seen.add(n);
            int sum = 0;
            for (char d : String.valueOf(n).toCharArray()) {
                int digit = d - '0';
                sum += digit * digit;
            }
            n = sum;
        }
        return n == 1;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        System.out.println(solve(Integer.parseInt(t[0])) ? "true" : "false");
    }
}
`,
  "dsa-isomorphic-strings": `import java.util.*;
import java.io.*;
public class Main {
    static boolean solve(String s, String t) {
        if (s.length() != t.length()) return false;
        Map<Character, Character> m1 = new HashMap<>();
        Map<Character, Character> m2 = new HashMap<>();
        for (int i = 0; i < s.length(); i++) {
            char a = s.charAt(i), b = t.charAt(i);
            if (m1.getOrDefault(a, b) != b || m2.getOrDefault(b, a) != a) return false;
            m1.put(a, b);
            m2.put(b, a);
        }
        return true;
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in, java.nio.charset.StandardCharsets.UTF_8));
        String s1 = br.readLine();
        String s2 = br.readLine();
        if (s1 == null) s1 = "";
        if (s2 == null) s2 = "";
        System.out.println(solve(s1.strip(), s2.strip()) ? "true" : "false");
    }
}
`,
  "dsa-word-pattern": `import java.util.*;
import java.io.*;
public class Main {
    static boolean solve(String pattern, String s) {
        String[] words = s.isEmpty() ? new String[0] : s.split("\\\\s+");
        if (words.length != pattern.length()) return false;
        Map<Character, String> p2w = new HashMap<>();
        Map<String, Character> w2p = new HashMap<>();
        for (int i = 0; i < pattern.length(); i++) {
            char p = pattern.charAt(i);
            String w = words[i];
            if (!p2w.getOrDefault(p, w).equals(w) || w2p.getOrDefault(w, p) != p) return false;
            p2w.put(p, w);
            w2p.put(w, p);
        }
        return true;
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in, java.nio.charset.StandardCharsets.UTF_8));
        String s1 = br.readLine();
        String s2 = br.readLine();
        if (s1 == null) s1 = "";
        if (s2 == null) s2 = "";
        System.out.println(solve(s1.strip(), s2.strip()) ? "true" : "false");
    }
}
`,
  "dsa-ransom-note": `import java.util.*;
import java.io.*;
public class Main {
    static boolean solve(String note, String magazine) {
        Map<Character, Integer> need = new HashMap<>();
        for (int i = 0; i < note.length(); i++) need.put(note.charAt(i), need.getOrDefault(note.charAt(i), 0) + 1);
        Map<Character, Integer> have = new HashMap<>();
        for (int i = 0; i < magazine.length(); i++) have.put(magazine.charAt(i), have.getOrDefault(magazine.charAt(i), 0) + 1);
        for (Map.Entry<Character, Integer> e : need.entrySet()) {
            if (have.getOrDefault(e.getKey(), 0) < e.getValue()) return false;
        }
        return true;
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in, java.nio.charset.StandardCharsets.UTF_8));
        String s1 = br.readLine();
        String s2 = br.readLine();
        if (s1 == null) s1 = "";
        if (s2 == null) s2 = "";
        System.out.println(solve(s1.strip(), s2.strip()) ? "true" : "false");
    }
}
`,
  "dsa-longest-consecutive-sequence": `import java.util.*;
public class Main {
    static int solve(int[] nums) {
        Set<Integer> s = new HashSet<>();
        for (int x : nums) s.add(x);
        int best = 0;
        for (int x : s) {
            if (!s.contains(x - 1)) {
                int cur = x, length = 1;
                while (s.contains(cur + 1)) { cur++; length++; }
                best = Math.max(best, length);
            }
        }
        return best;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = Integer.parseInt(t[p++]);
        System.out.println(solve(nums));
    }
}
`,
  "dsa-top-k-frequent-elements": `import java.util.*;
public class Main {
    static String fmtI(int[] a) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(' '); sb.append(a[i]); }
        return sb.toString();
    }
    static int[] solve(int[] nums, int k) {
        Map<Integer, Integer> counts = new HashMap<>();
        for (int x : nums) counts.put(x, counts.getOrDefault(x, 0) + 1);
        List<Map.Entry<Integer, Integer>> ranked = new ArrayList<>(counts.entrySet());
        ranked.sort((a, b) -> {
            int c = Integer.compare(b.getValue(), a.getValue());
            if (c != 0) return c;
            return Integer.compare(b.getKey(), a.getKey());
        });
        int[] out = new int[Math.min(k, ranked.size())];
        for (int i = 0; i < out.length; i++) out[i] = ranked.get(i).getKey();
        return out;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = Integer.parseInt(t[p++]);
        int k = Integer.parseInt(t[p++]);
        System.out.println(fmtI(solve(nums, k)));
    }
}
`,
  "dsa-valid-sudoku": `import java.util.*;
import java.io.*;
public class Main {
    static boolean solve(char[][] grid) {
        Set<Character>[] rows = new Set[9];
        Set<Character>[] cols = new Set[9];
        Set<Character>[] boxes = new Set[9];
        for (int i = 0; i < 9; i++) { rows[i] = new HashSet<>(); cols[i] = new HashSet<>(); boxes[i] = new HashSet<>(); }
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                char v = grid[i][j];
                if (v == '.') continue;
                int b = (i / 3) * 3 + j / 3;
                if (rows[i].contains(v) || cols[j].contains(v) || boxes[b].contains(v)) return false;
                rows[i].add(v);
                cols[j].add(v);
                boxes[b].add(v);
            }
        }
        return true;
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in, java.nio.charset.StandardCharsets.UTF_8));
        List<String> lines = new ArrayList<>();
        String line;
        while ((line = br.readLine()) != null) lines.add(line);
        String[] first = lines.get(0).trim().split("\\\\s+");
        int r = Integer.parseInt(first[0]);
        int c = Integer.parseInt(first[1]);
        char[][] grid = new char[r][c];
        for (int i = 0; i < r; i++) {
            String row = lines.get(1 + i).strip().replace(" ", "");
            for (int j = 0; j < c && j < row.length(); j++) grid[i][j] = row.charAt(j);
        }
        System.out.println(solve(grid) ? "true" : "false");
    }
}
`,
  "dsa-contains-duplicate-ii": `import java.util.*;
public class Main {
    static boolean solve(int[] nums, int k) {
        Map<Integer, Integer> last = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            if (last.containsKey(nums[i]) && i - last.get(nums[i]) <= k) return true;
            last.put(nums[i], i);
        }
        return false;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = Integer.parseInt(t[p++]);
        int k = Integer.parseInt(t[p++]);
        System.out.println(solve(nums, k) ? "true" : "false");
    }
}
`,
  "dsa-subarray-sum-divisible-by-k": `import java.util.*;
public class Main {
    static int solve(int[] nums, int k) {
        Map<Integer, Integer> counts = new HashMap<>();
        counts.put(0, 1);
        int prefix = 0, ans = 0;
        for (int x : nums) {
            prefix = Math.floorMod(prefix + x, k);
            ans += counts.getOrDefault(prefix, 0);
            counts.put(prefix, counts.getOrDefault(prefix, 0) + 1);
        }
        return ans;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = Integer.parseInt(t[p++]);
        int k = Integer.parseInt(t[p++]);
        System.out.println(solve(nums, k));
    }
}
`,
  "dsa-find-all-anagrams-in-string": `import java.util.*;
import java.io.*;
public class Main {
    static String fmtL(List<Integer> a) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < a.size(); i++) { if (i > 0) sb.append(' '); sb.append(a.get(i)); }
        return sb.toString();
    }
    static void bump(Map<Character, Integer> m, char c, int d) {
        int v = m.getOrDefault(c, 0) + d;
        if (v == 0) m.remove(c);
        else m.put(c, v);
    }
    static List<Integer> solve(String s, String p) {
        Map<Character, Integer> need = new HashMap<>();
        for (int i = 0; i < p.length(); i++) bump(need, p.charAt(i), 1);
        Map<Character, Integer> window = new HashMap<>();
        List<Integer> out = new ArrayList<>();
        for (int i = 0; i < s.length(); i++) {
            bump(window, s.charAt(i), 1);
            if (i >= p.length()) bump(window, s.charAt(i - p.length()), -1);
            if (window.equals(need)) out.add(i - p.length() + 1);
        }
        return out;
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in, java.nio.charset.StandardCharsets.UTF_8));
        String s1 = br.readLine();
        String s2 = br.readLine();
        if (s1 == null) s1 = "";
        if (s2 == null) s2 = "";
        System.out.println(fmtL(solve(s1.strip(), s2.strip())));
    }
}
`,
  "dsa-two-sum-ii": `import java.util.*;
public class Main {
    static String fmtI(int[] a) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(' '); sb.append(a[i]); }
        return sb.toString();
    }
    static int[] solve(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        while (left < right) {
            int total = nums[left] + nums[right];
            if (total == target) return new int[]{left + 1, right + 1};
            if (total < target) left++;
            else right--;
        }
        return new int[]{-1, -1};
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = Integer.parseInt(t[p++]);
        int target = Integer.parseInt(t[p++]);
        System.out.println(fmtI(solve(nums, target)));
    }
}
`,
  "dsa-container-with-most-water": `import java.util.*;
public class Main {
    static int solve(int[] height) {
        int left = 0, right = height.length - 1, best = 0;
        while (left < right) {
            int area = Math.min(height[left], height[right]) * (right - left);
            best = Math.max(best, area);
            if (height[left] < height[right]) left++;
            else right--;
        }
        return best;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = Integer.parseInt(t[p++]);
        System.out.println(solve(nums));
    }
}
`,
  "dsa-three-sum": `import java.util.*;
public class Main {
    static String fmtRows(List<List<Integer>> rows) {
        List<String> out = new ArrayList<>();
        for (List<Integer> r : rows) {
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < r.size(); i++) { if (i > 0) sb.append(' '); sb.append(r.get(i)); }
            out.add(sb.toString());
        }
        return String.join("\\n", out);
    }
    static List<List<Integer>> solve(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> out = new ArrayList<>();
        int n = nums.length;
        for (int i = 0; i < n - 2; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            int left = i + 1, right = n - 1;
            while (left < right) {
                int total = nums[i] + nums[left] + nums[right];
                if (total == 0) {
                    out.add(Arrays.asList(nums[i], nums[left], nums[right]));
                    left++;
                    right--;
                    while (left < right && nums[left] == nums[left - 1]) left++;
                    while (left < right && nums[right] == nums[right + 1]) right--;
                } else if (total < 0) left++;
                else right--;
            }
        }
        return out;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = Integer.parseInt(t[p++]);
        System.out.println(fmtRows(solve(nums)));
    }
}
`,
  "dsa-remove-duplicates-sorted": `import java.util.*;
public class Main {
    static String fmtI(int[] a) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(' '); sb.append(a[i]); }
        return sb.toString();
    }
    static int[] solve(int[] nums) {
        if (nums.length == 0) return nums;
        int write = 1;
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] != nums[write - 1]) { nums[write] = nums[i]; write++; }
        }
        return Arrays.copyOf(nums, write);
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = Integer.parseInt(t[p++]);
        System.out.println(fmtI(solve(nums)));
    }
}
`,
  "dsa-squares-of-sorted-array": `import java.util.*;
public class Main {
    static String fmtI(int[] a) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(' '); sb.append(a[i]); }
        return sb.toString();
    }
    static int[] solve(int[] nums) {
        int n = nums.length;
        int[] out = new int[n];
        int left = 0, right = n - 1, pos = n - 1;
        while (left <= right) {
            if (Math.abs(nums[left]) > Math.abs(nums[right])) { out[pos] = nums[left] * nums[left]; left++; }
            else { out[pos] = nums[right] * nums[right]; right--; }
            pos--;
        }
        return out;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = Integer.parseInt(t[p++]);
        System.out.println(fmtI(solve(nums)));
    }
}
`,
  "dsa-valid-palindrome-ii": `import java.util.*;
public class Main {
    static boolean isPal(String s, int l, int r) {
        while (l < r) {
            if (s.charAt(l) != s.charAt(r)) return false;
            l++; r--;
        }
        return true;
    }
    static boolean solve(String s) {
        int left = 0, right = s.length() - 1;
        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) return isPal(s, left + 1, right) || isPal(s, left, right - 1);
            left++; right--;
        }
        return true;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        System.out.println(solve(all.strip()) ? "true" : "false");
    }
}
`,
  "dsa-three-sum-closest": `import java.util.*;
public class Main {
    static int solve(int[] nums, int target) {
        Arrays.sort(nums);
        int best = nums[0] + nums[1] + nums[2];
        int n = nums.length;
        for (int i = 0; i < n - 2; i++) {
            int left = i + 1, right = n - 1;
            while (left < right) {
                int total = nums[i] + nums[left] + nums[right];
                if (Math.abs(total - target) < Math.abs(best - target)) best = total;
                if (total < target) left++;
                else if (total > target) right--;
                else return total;
            }
        }
        return best;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = Integer.parseInt(t[p++]);
        int target = Integer.parseInt(t[p++]);
        System.out.println(solve(nums, target));
    }
}
`,
  "dsa-four-sum": `import java.util.*;
public class Main {
    static String fmtRows(List<List<Integer>> rows) {
        List<String> out = new ArrayList<>();
        for (List<Integer> r : rows) {
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < r.size(); i++) { if (i > 0) sb.append(' '); sb.append(r.get(i)); }
            out.add(sb.toString());
        }
        return String.join("\\n", out);
    }
    static List<List<Integer>> solve(int[] nums, int target) {
        Arrays.sort(nums);
        List<List<Integer>> out = new ArrayList<>();
        int n = nums.length;
        for (int i = 0; i < n - 3; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            for (int j = i + 1; j < n - 2; j++) {
                if (j > i + 1 && nums[j] == nums[j - 1]) continue;
                int left = j + 1, right = n - 1;
                while (left < right) {
                    int total = nums[i] + nums[j] + nums[left] + nums[right];
                    if (total == target) {
                        out.add(Arrays.asList(nums[i], nums[j], nums[left], nums[right]));
                        left++;
                        right--;
                        while (left < right && nums[left] == nums[left - 1]) left++;
                        while (left < right && nums[right] == nums[right + 1]) right--;
                    } else if (total < target) left++;
                    else right--;
                }
            }
        }
        return out;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = Integer.parseInt(t[p++]);
        int target = Integer.parseInt(t[p++]);
        System.out.println(fmtRows(solve(nums, target)));
    }
}
`,
  "dsa-sort-array-by-parity": `import java.util.*;
public class Main {
    static String fmtI(int[] a) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(' '); sb.append(a[i]); }
        return sb.toString();
    }
    static int[] solve(int[] nums) {
        List<Integer> evens = new ArrayList<>();
        List<Integer> odds = new ArrayList<>();
        for (int x : nums) {
            if (x % 2 == 0) evens.add(x);
            else odds.add(x);
        }
        int[] out = new int[nums.length];
        int i = 0;
        for (int x : evens) out[i++] = x;
        for (int x : odds) out[i++] = x;
        return out;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = Integer.parseInt(t[p++]);
        System.out.println(fmtI(solve(nums)));
    }
}
`,
  "dsa-remove-element": `import java.util.*;
public class Main {
    static String fmtI(int[] a) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(' '); sb.append(a[i]); }
        return sb.toString();
    }
    static int[] solve(int[] nums, int val) {
        int write = 0;
        for (int x : nums) {
            if (x != val) { nums[write] = x; write++; }
        }
        return Arrays.copyOf(nums, write);
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = Integer.parseInt(t[p++]);
        int k = Integer.parseInt(t[p++]);
        System.out.println(fmtI(solve(nums, k)));
    }
}
`,
  "dsa-max-sum-subarray-size-k": `import java.util.*;
public class Main {
    static int solve(int[] nums, int k) {
        int window = 0;
        for (int i = 0; i < k; i++) window += nums[i];
        int best = window;
        for (int i = k; i < nums.length; i++) {
            window += nums[i] - nums[i - k];
            best = Math.max(best, window);
        }
        return best;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = Integer.parseInt(t[p++]);
        int k = Integer.parseInt(t[p++]);
        System.out.println(solve(nums, k));
    }
}
`,
  "dsa-longest-substring-k-distinct": `import java.util.*;
import java.io.*;
public class Main {
    static int solve(String s, int k) {
        Map<Character, Integer> counts = new HashMap<>();
        int best = 0, left = 0;
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            counts.put(c, counts.getOrDefault(c, 0) + 1);
            while (counts.size() > k) {
                char lc = s.charAt(left);
                int v = counts.get(lc) - 1;
                if (v == 0) counts.remove(lc);
                else counts.put(lc, v);
                left++;
            }
            best = Math.max(best, right - left + 1);
        }
        return best;
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in, java.nio.charset.StandardCharsets.UTF_8));
        String s = br.readLine();
        String kLine = br.readLine();
        if (s == null) s = "";
        int k = (kLine == null || kLine.strip().isEmpty()) ? 0 : Integer.parseInt(kLine.strip());
        System.out.println(solve(s.strip(), k));
    }
}
`,
  "dsa-minimum-size-subarray-sum": `import java.util.*;
public class Main {
    static int solve(int[] nums, int target) {
        int best = Integer.MAX_VALUE;
        int left = 0, total = 0;
        for (int right = 0; right < nums.length; right++) {
            total += nums[right];
            while (total >= target) {
                best = Math.min(best, right - left + 1);
                total -= nums[left];
                left++;
            }
        }
        return best == Integer.MAX_VALUE ? 0 : best;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = Integer.parseInt(t[p++]);
        int target = Integer.parseInt(t[p++]);
        System.out.println(solve(nums, target));
    }
}
`,
  "dsa-permutation-in-string": `import java.util.*;
import java.io.*;
public class Main {
    static void bump(Map<Character, Integer> m, char c, int d) {
        int v = m.getOrDefault(c, 0) + d;
        if (v == 0) m.remove(c);
        else m.put(c, v);
    }
    static boolean solve(String s1, String s2) {
        Map<Character, Integer> need = new HashMap<>();
        for (int i = 0; i < s1.length(); i++) bump(need, s1.charAt(i), 1);
        Map<Character, Integer> window = new HashMap<>();
        int k = s1.length();
        for (int i = 0; i < s2.length(); i++) {
            bump(window, s2.charAt(i), 1);
            if (i >= k) bump(window, s2.charAt(i - k), -1);
            if (window.equals(need)) return true;
        }
        return false;
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in, java.nio.charset.StandardCharsets.UTF_8));
        String s1 = br.readLine();
        String s2 = br.readLine();
        if (s1 == null) s1 = "";
        if (s2 == null) s2 = "";
        System.out.println(solve(s1.strip(), s2.strip()) ? "true" : "false");
    }
}
`,
  "dsa-fruits-into-baskets": `import java.util.*;
public class Main {
    static int solve(int[] fruits) {
        Map<Integer, Integer> counts = new HashMap<>();
        int best = 0, left = 0;
        for (int right = 0; right < fruits.length; right++) {
            counts.put(fruits[right], counts.getOrDefault(fruits[right], 0) + 1);
            while (counts.size() > 2) {
                int v = counts.get(fruits[left]) - 1;
                if (v == 0) counts.remove(fruits[left]);
                else counts.put(fruits[left], v);
                left++;
            }
            best = Math.max(best, right - left + 1);
        }
        return best;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = Integer.parseInt(t[p++]);
        System.out.println(solve(nums));
    }
}
`,
  "dsa-maximum-vowels-in-substring": `import java.util.*;
import java.io.*;
public class Main {
    static boolean isVowel(char c) {
        return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u';
    }
    static int solve(String s, int k) {
        int window = 0;
        for (int i = 0; i < Math.min(k, s.length()); i++) if (isVowel(s.charAt(i))) window++;
        int best = window;
        for (int i = k; i < s.length(); i++) {
            if (isVowel(s.charAt(i))) window++;
            if (isVowel(s.charAt(i - k))) window--;
            best = Math.max(best, window);
        }
        return best;
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in, java.nio.charset.StandardCharsets.UTF_8));
        String s = br.readLine();
        String kLine = br.readLine();
        if (s == null) s = "";
        int k = (kLine == null || kLine.strip().isEmpty()) ? 0 : Integer.parseInt(kLine.strip());
        System.out.println(solve(s.strip(), k));
    }
}
`,
  "dsa-sliding-window-maximum": `import java.util.*;
public class Main {
    static String fmtI(int[] a) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(' '); sb.append(a[i]); }
        return sb.toString();
    }
    static int[] solve(int[] nums, int k) {
        Deque<Integer> dq = new ArrayDeque<>();
        List<Integer> out = new ArrayList<>();
        for (int i = 0; i < nums.length; i++) {
            while (!dq.isEmpty() && nums[dq.peekLast()] <= nums[i]) dq.pollLast();
            dq.addLast(i);
            if (dq.peekFirst() <= i - k) dq.pollFirst();
            if (i >= k - 1) out.add(nums[dq.peekFirst()]);
        }
        int[] res = new int[out.size()];
        for (int i = 0; i < res.length; i++) res[i] = out.get(i);
        return res;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = Integer.parseInt(t[p++]);
        int k = Integer.parseInt(t[p++]);
        System.out.println(fmtI(solve(nums, k)));
    }
}
`,
  "dsa-binary-subarrays-with-sum": `import java.util.*;
public class Main {
    static int solve(int[] nums, int goal) {
        Map<Integer, Integer> counts = new HashMap<>();
        counts.put(0, 1);
        int prefix = 0, ans = 0;
        for (int x : nums) {
            prefix += x;
            ans += counts.getOrDefault(prefix - goal, 0);
            counts.put(prefix, counts.getOrDefault(prefix, 0) + 1);
        }
        return ans;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = Integer.parseInt(t[p++]);
        int k = Integer.parseInt(t[p++]);
        System.out.println(solve(nums, k));
    }
}
`,
  "dsa-longest-subarray-of-ones-after-deleting-one": `import java.util.*;
public class Main {
    static int solve(int[] nums) {
        int best = 0, left = 0, zeros = 0;
        for (int right = 0; right < nums.length; right++) {
            if (nums[right] == 0) zeros++;
            while (zeros > 1) {
                if (nums[left] == 0) zeros--;
                left++;
            }
            best = Math.max(best, right - left);
        }
        return best;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = Integer.parseInt(t[p++]);
        System.out.println(solve(nums));
    }
}
`,
  "dsa-max-consecutive-ones-iii": `import java.util.*;
public class Main {
    static int solve(int[] nums, int k) {
        int best = 0, left = 0, zeros = 0;
        for (int right = 0; right < nums.length; right++) {
            if (nums[right] == 0) zeros++;
            while (zeros > k) {
                if (nums[left] == 0) zeros--;
                left++;
            }
            best = Math.max(best, right - left + 1);
        }
        return best;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = Integer.parseInt(t[p++]);
        int k = Integer.parseInt(t[p++]);
        System.out.println(solve(nums, k));
    }
}
`,
  "dsa-evaluate-reverse-polish-notation": `import java.util.*;
public class Main {
    static int solve(String[] tokens) {
        Deque<Integer> stack = new ArrayDeque<>();
        for (String t : tokens) {
            if (t.length() == 1 && "+-*/".contains(t)) {
                int b = stack.pop();
                int a = stack.pop();
                if (t.equals("+")) stack.push(a + b);
                else if (t.equals("-")) stack.push(a - b);
                else if (t.equals("*")) stack.push(a * b);
                else stack.push(a / b);
            } else {
                stack.push(Integer.parseInt(t));
            }
        }
        return stack.peek();
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int n = Integer.parseInt(t[0]);
        String[] words = new String[Math.min(n, t.length - 1)];
        for (int i = 0; i < words.length; i++) words[i] = t[1 + i];
        System.out.println(solve(words));
    }
}
`,
  "dsa-daily-temperatures": `import java.util.*;
public class Main {
    static String fmtI(int[] a) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(' '); sb.append(a[i]); }
        return sb.toString();
    }
    static int[] solve(int[] temps) {
        int n = temps.length;
        int[] out = new int[n];
        Deque<Integer> stack = new ArrayDeque<>();
        for (int i = 0; i < n; i++) {
            while (!stack.isEmpty() && temps[stack.peek()] < temps[i]) {
                int j = stack.pop();
                out[j] = i - j;
            }
            stack.push(i);
        }
        return out;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = Integer.parseInt(t[p++]);
        System.out.println(fmtI(solve(nums)));
    }
}
`,
  "dsa-next-greater-element-i": `import java.util.*;
public class Main {
    static String fmtI(int[] a) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(' '); sb.append(a[i]); }
        return sb.toString();
    }
    static int[] solve(int[] a, int[] b) {
        Map<Integer, Integer> nxt = new HashMap<>();
        Deque<Integer> stack = new ArrayDeque<>();
        for (int x : b) {
            while (!stack.isEmpty() && stack.peek() < x) nxt.put(stack.pop(), x);
            stack.push(x);
        }
        while (!stack.isEmpty()) nxt.put(stack.pop(), -1);
        int[] out = new int[a.length];
        for (int i = 0; i < a.length; i++) out[i] = nxt.get(a[i]);
        return out;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = Integer.parseInt(t[p++]);
        int m = Integer.parseInt(t[p++]);
        int[] b = new int[m];
        for (int i = 0; i < m; i++) b[i] = Integer.parseInt(t[p++]);
        System.out.println(fmtI(solve(a, b)));
    }
}
`,
  "dsa-largest-rectangle-in-histogram": `import java.util.*;
public class Main {
    static int solve(int[] heights) {
        Deque<Integer> stack = new ArrayDeque<>();
        int best = 0;
        int n = heights.length;
        int[] h = Arrays.copyOf(heights, n + 1);
        h[n] = 0;
        for (int i = 0; i <= n; i++) {
            while (!stack.isEmpty() && h[stack.peek()] > h[i]) {
                int height = h[stack.pop()];
                int left = stack.isEmpty() ? -1 : stack.peek();
                best = Math.max(best, height * (i - left - 1));
            }
            stack.push(i);
        }
        return best;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = Integer.parseInt(t[p++]);
        System.out.println(solve(nums));
    }
}
`,
  "dsa-simplify-path": `import java.util.*;
public class Main {
    static String solve(String path) {
        Deque<String> stack = new ArrayDeque<>();
        for (String part : path.split("/")) {
            if (part.isEmpty() || part.equals(".")) continue;
            if (part.equals("..")) {
                if (!stack.isEmpty()) stack.pop();
            } else stack.push(part);
        }
        List<String> parts = new ArrayList<>(stack);
        Collections.reverse(parts);
        return "/" + String.join("/", parts);
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        System.out.println(solve(all.strip()));
    }
}
`,
  "dsa-decode-string": `import java.util.*;
public class Main {
    static String solve(String s) {
        Deque<Object[]> stack = new ArrayDeque<>();
        String cur = "";
        int num = 0;
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (Character.isDigit(c)) num = num * 10 + (c - '0');
            else if (c == '[') {
                stack.push(new Object[]{cur, num});
                cur = "";
                num = 0;
            } else if (c == ']') {
                Object[] prev = stack.pop();
                String p = (String) prev[0];
                int k = (Integer) prev[1];
                StringBuilder sb = new StringBuilder(p);
                for (int j = 0; j < k; j++) sb.append(cur);
                cur = sb.toString();
            } else cur += c;
        }
        return cur;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        System.out.println(solve(all.strip()));
    }
}
`,
  "dsa-remove-duplicate-letters": `import java.util.*;
public class Main {
    static String solve(String s) {
        Map<Character, Integer> remaining = new HashMap<>();
        for (int i = 0; i < s.length(); i++) remaining.put(s.charAt(i), remaining.getOrDefault(s.charAt(i), 0) + 1);
        Deque<Character> stack = new ArrayDeque<>();
        Set<Character> inStack = new HashSet<>();
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            remaining.put(c, remaining.get(c) - 1);
            if (inStack.contains(c)) continue;
            while (!stack.isEmpty() && stack.peek() > c && remaining.getOrDefault(stack.peek(), 0) > 0) {
                inStack.remove(stack.pop());
            }
            stack.push(c);
            inStack.add(c);
        }
        StringBuilder sb = new StringBuilder();
        List<Character> chars = new ArrayList<>(stack);
        Collections.reverse(chars);
        for (char c : chars) sb.append(c);
        return sb.toString();
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        System.out.println(solve(all.strip()));
    }
}
`,
  "dsa-asteroid-collision": `import java.util.*;
public class Main {
    static String fmtI(int[] a) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(' '); sb.append(a[i]); }
        return sb.toString();
    }
    static int[] solve(int[] asteroids) {
        Deque<Integer> stack = new ArrayDeque<>();
        for (int a : asteroids) {
            boolean alive = true;
            while (alive && a < 0 && !stack.isEmpty() && stack.peek() > 0) {
                if (stack.peek() < -a) stack.pop();
                else if (stack.peek() == -a) { stack.pop(); alive = false; }
                else alive = false;
            }
            if (alive) stack.push(a);
        }
        int[] out = new int[stack.size()];
        List<Integer> list = new ArrayList<>(stack);
        Collections.reverse(list);
        for (int i = 0; i < out.length; i++) out[i] = list.get(i);
        return out;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = Integer.parseInt(t[p++]);
        System.out.println(fmtI(solve(nums)));
    }
}
`,
  "dsa-rotting-oranges": `import java.util.*;
public class Main {
    static int solve(int[][] grid) {
        int m = grid.length;
        int n = grid[0].length;
        Deque<int[]> q = new ArrayDeque<>();
        int fresh = 0;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 2) q.addLast(new int[]{i, j, 0});
                else if (grid[i][j] == 1) fresh++;
            }
        }
        int minutes = 0;
        int[][] dirs = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
        while (!q.isEmpty()) {
            int[] cur = q.pollFirst();
            int i = cur[0], j = cur[1], t = cur[2];
            minutes = Math.max(minutes, t);
            for (int[] d : dirs) {
                int ni = i + d[0], nj = j + d[1];
                if (ni >= 0 && ni < m && nj >= 0 && nj < n && grid[ni][nj] == 1) {
                    grid[ni][nj] = 2;
                    fresh--;
                    q.addLast(new int[]{ni, nj, t + 1});
                }
            }
        }
        return fresh == 0 ? minutes : -1;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int r = Integer.parseInt(t[0]);
        int c = Integer.parseInt(t[1]);
        int[][] grid = new int[r][c];
        int p = 2;
        for (int i = 0; i < r; i++) {
            for (int j = 0; j < c; j++) grid[i][j] = Integer.parseInt(t[p++]);
        }
        System.out.println(solve(grid));
    }
}
`,
  "dsa-design-circular-queue": `import java.util.*;
import java.io.*;
public class Main {
    static List<String> solve(List<String> ops) {
        int k = Integer.parseInt(ops.get(0));
        int[] q = new int[k];
        int head = 0, size = 0;
        List<String> out = new ArrayList<>();
        for (int oi = 1; oi < ops.size(); oi++) {
            String[] parts = ops.get(oi).split("\\\\s+");
            String cmd = parts[0];
            if (cmd.equals("enQueue")) {
                if (size == k) out.add("false");
                else { q[(head + size) % k] = Integer.parseInt(parts[1]); size++; out.add("true"); }
            } else if (cmd.equals("deQueue")) {
                if (size == 0) out.add("false");
                else { head = (head + 1) % k; size--; out.add("true"); }
            } else if (cmd.equals("Front")) {
                out.add(size > 0 ? String.valueOf(q[head]) : "-1");
            } else if (cmd.equals("Rear")) {
                out.add(size > 0 ? String.valueOf(q[(head + size - 1) % k]) : "-1");
            } else if (cmd.equals("isEmpty")) {
                out.add(size == 0 ? "true" : "false");
            } else if (cmd.equals("isFull")) {
                out.add(size == k ? "true" : "false");
            }
        }
        return out;
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in, java.nio.charset.StandardCharsets.UTF_8));
        List<String> ops = new ArrayList<>();
        String line;
        while ((line = br.readLine()) != null) {
            if (!line.strip().isEmpty()) ops.add(line.strip());
        }
        System.out.println(String.join("\\n", solve(ops)));
    }
}
`,
  "dsa-reveal-cards-in-increasing-order": `import java.util.*;
public class Main {
    static String fmtI(int[] a) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(' '); sb.append(a[i]); }
        return sb.toString();
    }
    static int[] solve(int[] deck) {
        Arrays.sort(deck);
        Deque<Integer> q = new ArrayDeque<>();
        for (int i = 0; i < deck.length; i++) q.addLast(i);
        int[] out = new int[deck.length];
        for (int v : deck) {
            int i = q.pollFirst();
            out[i] = v;
            if (!q.isEmpty()) q.addLast(q.pollFirst());
        }
        return out;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = Integer.parseInt(t[p++]);
        System.out.println(fmtI(solve(nums)));
    }
}
`,
  "dsa-time-needed-to-buy-tickets": `import java.util.*;
public class Main {
    static int solve(int[] tickets, int k) {
        int total = 0;
        for (int i = 0; i < tickets.length; i++) {
            if (i <= k) total += Math.min(tickets[i], tickets[k]);
            else total += Math.min(tickets[i], tickets[k] - 1);
        }
        return total;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = Integer.parseInt(t[p++]);
        int k = Integer.parseInt(t[p++]);
        System.out.println(solve(nums, k));
    }
}
`,
  "dsa-dota2-senate": `import java.util.*;
public class Main {
    static String solve(String senate) {
        Deque<Integer> radiant = new ArrayDeque<>();
        Deque<Integer> dire = new ArrayDeque<>();
        int n = senate.length();
        for (int i = 0; i < n; i++) {
            if (senate.charAt(i) == 'R') radiant.addLast(i);
            else dire.addLast(i);
        }
        while (!radiant.isEmpty() && !dire.isEmpty()) {
            int r = radiant.pollFirst();
            int d = dire.pollFirst();
            if (r < d) radiant.addLast(r + n);
            else dire.addLast(d + n);
        }
        return radiant.isEmpty() ? "Dire" : "Radiant";
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        System.out.println(solve(all.strip()));
    }
}
`,
  "dsa-number-of-students-unable-to-eat-lunch": `import java.util.*;
public class Main {
    static int solve(int[] students, int[] sandwiches) {
        Map<Integer, Integer> counts = new HashMap<>();
        Deque<Integer> q = new ArrayDeque<>();
        for (int s : students) { counts.put(s, counts.getOrDefault(s, 0) + 1); q.addLast(s); }
        for (int s : sandwiches) {
            if (counts.getOrDefault(s, 0) == 0) break;
            while (q.peekFirst() != s) q.addLast(q.pollFirst());
            q.pollFirst();
            counts.put(s, counts.get(s) - 1);
        }
        return q.size();
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = Integer.parseInt(t[p++]);
        int m = Integer.parseInt(t[p++]);
        int[] b = new int[m];
        for (int i = 0; i < m; i++) b[i] = Integer.parseInt(t[p++]);
        System.out.println(solve(a, b));
    }
}
`,
  "dsa-reverse-linked-list": `import java.util.*;
public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int v) { val = v; }
    }
    static ListNode buildList(int[] vals) {
        if (vals.length == 0) return null;
        ListNode head = new ListNode(vals[0]);
        ListNode cur = head;
        for (int i = 1; i < vals.length; i++) { cur.next = new ListNode(vals[i]); cur = cur.next; }
        return head;
    }
    static String fmtList(ListNode head) {
        StringBuilder sb = new StringBuilder();
        ListNode cur = head;
        while (cur != null) {
            if (sb.length() > 0) sb.append(' ');
            sb.append(cur.val);
            cur = cur.next;
        }
        return sb.toString();
    }
    static ListNode solve(ListNode head) {
        ListNode prev = null, cur = head;
        while (cur != null) {
            ListNode nxt = cur.next;
            cur.next = prev;
            prev = cur;
            cur = nxt;
        }
        return prev;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int n = Integer.parseInt(t[0]);
        int[] vals = new int[n];
        for (int i = 0; i < n; i++) vals[i] = Integer.parseInt(t[1 + i]);
        System.out.println(fmtList(solve(buildList(vals))));
    }
}
`,
  "dsa-merge-two-sorted-lists": `import java.util.*;
public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int v) { val = v; }
    }
    static ListNode buildList(int[] vals) {
        if (vals.length == 0) return null;
        ListNode head = new ListNode(vals[0]);
        ListNode cur = head;
        for (int i = 1; i < vals.length; i++) { cur.next = new ListNode(vals[i]); cur = cur.next; }
        return head;
    }
    static String fmtList(ListNode head) {
        StringBuilder sb = new StringBuilder();
        ListNode cur = head;
        while (cur != null) {
            if (sb.length() > 0) sb.append(' ');
            sb.append(cur.val);
            cur = cur.next;
        }
        return sb.toString();
    }
    static ListNode solve(ListNode h1, ListNode h2) {
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;
        while (h1 != null && h2 != null) {
            if (h1.val <= h2.val) { tail.next = h1; h1 = h1.next; }
            else { tail.next = h2; h2 = h2.next; }
            tail = tail.next;
        }
        tail.next = h1 != null ? h1 : h2;
        return dummy.next;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = Integer.parseInt(t[p++]);
        int m = Integer.parseInt(t[p++]);
        int[] b = new int[m];
        for (int i = 0; i < m; i++) b[i] = Integer.parseInt(t[p++]);
        System.out.println(fmtList(solve(buildList(a), buildList(b))));
    }
}
`,
  "dsa-linked-list-cycle": `import java.util.*;
public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int v) { val = v; }
    }
    static ListNode buildList(int[] vals) {
        if (vals.length == 0) return null;
        ListNode head = new ListNode(vals[0]);
        ListNode cur = head;
        for (int i = 1; i < vals.length; i++) { cur.next = new ListNode(vals[i]); cur = cur.next; }
        return head;
    }
    static boolean solve(ListNode head, int pos) {
        if (pos < 0 || head == null) return false;
        ListNode tail = head;
        while (tail != null && tail.next != null) tail = tail.next;
        ListNode target = head;
        for (int i = 0; i < pos; i++) target = target.next;
        tail.next = target;
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) return true;
        }
        return false;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int pos = Integer.parseInt(t[t.length - 1]);
        int n = Integer.parseInt(t[0]);
        int[] vals = new int[n];
        for (int i = 0; i < n; i++) vals[i] = Integer.parseInt(t[1 + i]);
        System.out.println(solve(buildList(vals), pos) ? "true" : "false");
    }
}
`,
  "dsa-remove-nth-node-from-end": `import java.util.*;
public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int v) { val = v; }
        ListNode(int v, ListNode n) { val = v; next = n; }
    }
    static ListNode buildList(int[] vals) {
        if (vals.length == 0) return null;
        ListNode head = new ListNode(vals[0]);
        ListNode cur = head;
        for (int i = 1; i < vals.length; i++) { cur.next = new ListNode(vals[i]); cur = cur.next; }
        return head;
    }
    static String fmtList(ListNode head) {
        StringBuilder sb = new StringBuilder();
        ListNode cur = head;
        while (cur != null) {
            if (sb.length() > 0) sb.append(' ');
            sb.append(cur.val);
            cur = cur.next;
        }
        return sb.toString();
    }
    static ListNode solve(ListNode head, int k) {
        ListNode dummy = new ListNode(0, head);
        ListNode fast = dummy, slow = dummy;
        for (int i = 0; i < k + 1; i++) fast = fast.next;
        while (fast != null) { fast = fast.next; slow = slow.next; }
        slow.next = slow.next.next;
        return dummy.next;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int k = Integer.parseInt(t[t.length - 1]);
        int n = Integer.parseInt(t[0]);
        int[] vals = new int[n];
        for (int i = 0; i < n; i++) vals[i] = Integer.parseInt(t[1 + i]);
        System.out.println(fmtList(solve(buildList(vals), k)));
    }
}
`,
  "dsa-middle-of-linked-list": `import java.util.*;
public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int v) { val = v; }
    }
    static ListNode buildList(int[] vals) {
        if (vals.length == 0) return null;
        ListNode head = new ListNode(vals[0]);
        ListNode cur = head;
        for (int i = 1; i < vals.length; i++) { cur.next = new ListNode(vals[i]); cur = cur.next; }
        return head;
    }
    static int solve(ListNode head) {
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow.val;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int n = Integer.parseInt(t[0]);
        int[] vals = new int[n];
        for (int i = 0; i < n; i++) vals[i] = Integer.parseInt(t[1 + i]);
        System.out.println(solve(buildList(vals)));
    }
}
`,
  "dsa-palindrome-linked-list": `import java.util.*;
public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int v) { val = v; }
    }
    static ListNode buildList(int[] vals) {
        if (vals.length == 0) return null;
        ListNode head = new ListNode(vals[0]);
        ListNode cur = head;
        for (int i = 1; i < vals.length; i++) { cur.next = new ListNode(vals[i]); cur = cur.next; }
        return head;
    }
    static boolean solve(ListNode head) {
        List<Integer> vals = new ArrayList<>();
        ListNode cur = head;
        while (cur != null) { vals.add(cur.val); cur = cur.next; }
        List<Integer> rev = new ArrayList<>(vals);
        Collections.reverse(rev);
        return vals.equals(rev);
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int n = Integer.parseInt(t[0]);
        int[] vals = new int[n];
        for (int i = 0; i < n; i++) vals[i] = Integer.parseInt(t[1 + i]);
        System.out.println(solve(buildList(vals)) ? "true" : "false");
    }
}
`,
  "dsa-add-two-numbers": `import java.util.*;
public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int v) { val = v; }
    }
    static ListNode buildList(int[] vals) {
        if (vals.length == 0) return null;
        ListNode head = new ListNode(vals[0]);
        ListNode cur = head;
        for (int i = 1; i < vals.length; i++) { cur.next = new ListNode(vals[i]); cur = cur.next; }
        return head;
    }
    static String fmtList(ListNode head) {
        StringBuilder sb = new StringBuilder();
        ListNode cur = head;
        while (cur != null) {
            if (sb.length() > 0) sb.append(' ');
            sb.append(cur.val);
            cur = cur.next;
        }
        return sb.toString();
    }
    static ListNode solve(ListNode h1, ListNode h2) {
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;
        int carry = 0;
        while (h1 != null || h2 != null || carry != 0) {
            int v1 = h1 != null ? h1.val : 0;
            int v2 = h2 != null ? h2.val : 0;
            int total = v1 + v2 + carry;
            carry = total / 10;
            tail.next = new ListNode(total % 10);
            tail = tail.next;
            h1 = h1 != null ? h1.next : null;
            h2 = h2 != null ? h2.next : null;
        }
        return dummy.next;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = Integer.parseInt(t[p++]);
        int m = Integer.parseInt(t[p++]);
        int[] b = new int[m];
        for (int i = 0; i < m; i++) b[i] = Integer.parseInt(t[p++]);
        System.out.println(fmtList(solve(buildList(a), buildList(b))));
    }
}
`,
  "dsa-intersection-of-two-linked-lists": `import java.util.*;
public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int v) { val = v; }
    }
    static ListNode buildList(int[] vals) {
        if (vals.length == 0) return null;
        ListNode head = new ListNode(vals[0]);
        ListNode cur = head;
        for (int i = 1; i < vals.length; i++) { cur.next = new ListNode(vals[i]); cur = cur.next; }
        return head;
    }
    static int solve(ListNode h1, ListNode h2) {
        Set<Integer> vals = new HashSet<>();
        ListNode cur = h1;
        while (cur != null) { vals.add(cur.val); cur = cur.next; }
        cur = h2;
        while (cur != null) {
            if (vals.contains(cur.val)) return cur.val;
            cur = cur.next;
        }
        return -1;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = Integer.parseInt(t[p++]);
        int m = Integer.parseInt(t[p++]);
        int[] b = new int[m];
        for (int i = 0; i < m; i++) b[i] = Integer.parseInt(t[p++]);
        System.out.println(solve(buildList(a), buildList(b)));
    }
}
`,
  "dsa-remove-duplicates-from-sorted-list": `import java.util.*;
public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int v) { val = v; }
    }
    static ListNode buildList(int[] vals) {
        if (vals.length == 0) return null;
        ListNode head = new ListNode(vals[0]);
        ListNode cur = head;
        for (int i = 1; i < vals.length; i++) { cur.next = new ListNode(vals[i]); cur = cur.next; }
        return head;
    }
    static String fmtList(ListNode head) {
        StringBuilder sb = new StringBuilder();
        ListNode cur = head;
        while (cur != null) {
            if (sb.length() > 0) sb.append(' ');
            sb.append(cur.val);
            cur = cur.next;
        }
        return sb.toString();
    }
    static ListNode solve(ListNode head) {
        ListNode cur = head;
        while (cur != null && cur.next != null) {
            if (cur.val == cur.next.val) cur.next = cur.next.next;
            else cur = cur.next;
        }
        return head;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int n = Integer.parseInt(t[0]);
        int[] vals = new int[n];
        for (int i = 0; i < n; i++) vals[i] = Integer.parseInt(t[1 + i]);
        System.out.println(fmtList(solve(buildList(vals))));
    }
}
`,
  "dsa-reorder-list": `import java.util.*;
public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int v) { val = v; }
    }
    static ListNode buildList(int[] vals) {
        if (vals.length == 0) return null;
        ListNode head = new ListNode(vals[0]);
        ListNode cur = head;
        for (int i = 1; i < vals.length; i++) { cur.next = new ListNode(vals[i]); cur = cur.next; }
        return head;
    }
    static String fmtList(ListNode head) {
        StringBuilder sb = new StringBuilder();
        ListNode cur = head;
        while (cur != null) {
            if (sb.length() > 0) sb.append(' ');
            sb.append(cur.val);
            cur = cur.next;
        }
        return sb.toString();
    }
    static ListNode solve(ListNode head) {
        if (head == null || head.next == null) return head;
        ListNode slow = head, fast = head;
        while (fast.next != null && fast.next.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        ListNode second = slow.next;
        slow.next = null;
        ListNode prev = null;
        while (second != null) {
            ListNode nxt = second.next;
            second.next = prev;
            prev = second;
            second = nxt;
        }
        ListNode first = head;
        second = prev;
        while (second != null) {
            ListNode tmp1 = first.next;
            ListNode tmp2 = second.next;
            first.next = second;
            second.next = tmp1;
            first = tmp1;
            second = tmp2;
        }
        return head;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int n = Integer.parseInt(t[0]);
        int[] vals = new int[n];
        for (int i = 0; i < n; i++) vals[i] = Integer.parseInt(t[1 + i]);
        System.out.println(fmtList(solve(buildList(vals))));
    }
}
`,
  "dsa-swap-nodes-in-pairs": `import java.util.*;
public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int v) { val = v; }
        ListNode(int v, ListNode n) { val = v; next = n; }
    }
    static ListNode buildList(int[] vals) {
        if (vals.length == 0) return null;
        ListNode head = new ListNode(vals[0]);
        ListNode cur = head;
        for (int i = 1; i < vals.length; i++) { cur.next = new ListNode(vals[i]); cur = cur.next; }
        return head;
    }
    static String fmtList(ListNode head) {
        StringBuilder sb = new StringBuilder();
        ListNode cur = head;
        while (cur != null) {
            if (sb.length() > 0) sb.append(' ');
            sb.append(cur.val);
            cur = cur.next;
        }
        return sb.toString();
    }
    static ListNode solve(ListNode head) {
        ListNode dummy = new ListNode(0, head);
        ListNode prev = dummy;
        while (prev.next != null && prev.next.next != null) {
            ListNode a = prev.next;
            ListNode b = a.next;
            a.next = b.next;
            b.next = a;
            prev.next = b;
            prev = a;
        }
        return dummy.next;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int n = Integer.parseInt(t[0]);
        int[] vals = new int[n];
        for (int i = 0; i < n; i++) vals[i] = Integer.parseInt(t[1 + i]);
        System.out.println(fmtList(solve(buildList(vals))));
    }
}
`,
  "dsa-odd-even-linked-list": `import java.util.*;
public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int v) { val = v; }
    }
    static ListNode buildList(int[] vals) {
        if (vals.length == 0) return null;
        ListNode head = new ListNode(vals[0]);
        ListNode cur = head;
        for (int i = 1; i < vals.length; i++) { cur.next = new ListNode(vals[i]); cur = cur.next; }
        return head;
    }
    static String fmtList(ListNode head) {
        StringBuilder sb = new StringBuilder();
        ListNode cur = head;
        while (cur != null) {
            if (sb.length() > 0) sb.append(' ');
            sb.append(cur.val);
            cur = cur.next;
        }
        return sb.toString();
    }
    static ListNode solve(ListNode head) {
        if (head == null || head.next == null) return head;
        ListNode odd = head;
        ListNode even = head.next;
        ListNode evenHead = even;
        while (even != null && even.next != null) {
            odd.next = even.next;
            odd = odd.next;
            even.next = odd.next;
            even = even.next;
        }
        odd.next = evenHead;
        return head;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int n = Integer.parseInt(t[0]);
        int[] vals = new int[n];
        for (int i = 0; i < n; i++) vals[i] = Integer.parseInt(t[1 + i]);
        System.out.println(fmtList(solve(buildList(vals))));
    }
}
`,
  "dsa-binary-search": `import java.util.*;
public class Main {
    static int solve(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        while (left <= right) {
            int mid = (left + right) / 2;
            if (nums[mid] == target) return mid;
            if (nums[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = Integer.parseInt(t[p++]);
        int target = Integer.parseInt(t[p++]);
        System.out.println(solve(nums, target));
    }
}
`,
  "dsa-search-insert-position": `import java.util.*;
public class Main {
    static int solve(int[] nums, int target) {
        int left = 0, right = nums.length;
        while (left < right) {
            int mid = (left + right) / 2;
            if (nums[mid] < target) left = mid + 1;
            else right = mid;
        }
        return left;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = Integer.parseInt(t[p++]);
        int target = Integer.parseInt(t[p++]);
        System.out.println(solve(nums, target));
    }
}
`,
  "dsa-find-first-and-last-position": `import java.util.*;
public class Main {
    static String fmtI(int[] a) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(' '); sb.append(a[i]); }
        return sb.toString();
    }
    static int bound(int[] nums, int target, boolean first) {
        int left = 0, right = nums.length;
        while (left < right) {
            int mid = (left + right) / 2;
            if (nums[mid] > target || (first && nums[mid] == target)) right = mid;
            else left = mid + 1;
        }
        return left;
    }
    static int[] solve(int[] nums, int target) {
        int lo = bound(nums, target, true);
        if (lo == nums.length || nums[lo] != target) return new int[]{-1, -1};
        return new int[]{lo, bound(nums, target, false) - 1};
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = Integer.parseInt(t[p++]);
        int target = Integer.parseInt(t[p++]);
        System.out.println(fmtI(solve(nums, target)));
    }
}
`,
  "dsa-search-in-rotated-sorted-array": `import java.util.*;
public class Main {
    static int solve(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        while (left <= right) {
            int mid = (left + right) / 2;
            if (nums[mid] == target) return mid;
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
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = Integer.parseInt(t[p++]);
        int target = Integer.parseInt(t[p++]);
        System.out.println(solve(nums, target));
    }
}
`,
  "dsa-find-minimum-in-rotated-sorted-array": `import java.util.*;
public class Main {
    static int solve(int[] nums) {
        int left = 0, right = nums.length - 1;
        while (left < right) {
            int mid = (left + right) / 2;
            if (nums[mid] > nums[right]) left = mid + 1;
            else right = mid;
        }
        return nums[left];
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = Integer.parseInt(t[p++]);
        System.out.println(solve(nums));
    }
}
`,
  "dsa-peak-element": `import java.util.*;
public class Main {
    static int solve(int[] nums) {
        int left = 0, right = nums.length - 1;
        while (left < right) {
            int mid = (left + right) / 2;
            if (nums[mid] > nums[mid + 1]) right = mid;
            else left = mid + 1;
        }
        return left;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = Integer.parseInt(t[p++]);
        System.out.println(solve(nums));
    }
}
`,
  "dsa-sqrt-x": `import java.util.*;
public class Main {
    static int solve(int x) {
        if (x < 2) return x;
        int left = 1, right = x / 2, ans = 1;
        while (left <= right) {
            int mid = (left + right) / 2;
            long sq = (long) mid * mid;
            if (sq == x) return mid;
            if (sq < x) { ans = mid; left = mid + 1; }
            else right = mid - 1;
        }
        return ans;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        System.out.println(solve(Integer.parseInt(t[0])));
    }
}
`,
  "dsa-koko-eating-bananas": `import java.util.*;
public class Main {
    static int solve(int[] piles, int h) {
        int left = 1, right = 0;
        for (int p : piles) right = Math.max(right, p);
        while (left < right) {
            int mid = (left + right) / 2;
            long hours = 0;
            for (int p : piles) hours += (p + mid - 1) / mid;
            if (hours <= h) right = mid;
            else left = mid + 1;
        }
        return left;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = Integer.parseInt(t[p++]);
        int k = Integer.parseInt(t[p++]);
        System.out.println(solve(nums, k));
    }
}
`,
  "dsa-capacity-to-ship-packages": `import java.util.*;
public class Main {
    static boolean can(int[] weights, long cap, int days) {
        int used = 1;
        long load = 0;
        for (int w : weights) {
            if (load + w > cap) { used++; load = w; }
            else load += w;
        }
        return used <= days;
    }
    static long solve(int[] weights, int days) {
        long left = 0, right = 0;
        for (int w : weights) { left = Math.max(left, w); right += w; }
        while (left < right) {
            long mid = (left + right) / 2;
            if (can(weights, mid, days)) right = mid;
            else left = mid + 1;
        }
        return left;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = Integer.parseInt(t[p++]);
        int k = Integer.parseInt(t[p++]);
        System.out.println(solve(nums, k));
    }
}
`,
  "dsa-single-element-in-sorted-array": `import java.util.*;
public class Main {
    static int solve(int[] nums) {
        int left = 0, right = nums.length - 1;
        while (left < right) {
            int mid = (left + right) / 2;
            if (mid % 2 == 1) mid -= 1;
            if (nums[mid] == nums[mid + 1]) left = mid + 2;
            else right = mid;
        }
        return nums[left];
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = Integer.parseInt(t[p++]);
        System.out.println(solve(nums));
    }
}
`,
  "dsa-maximum-depth-of-binary-tree": `import java.util.*;
public class Main {
    static class TreeNode {
        int val;
        TreeNode left, right;
        TreeNode(int v) { val = v; }
    }
    static TreeNode buildTree(String[] tokens) {
        if (tokens.length == 0 || tokens[0].equals("null")) return null;
        TreeNode root = new TreeNode(Integer.parseInt(tokens[0]));
        Queue<TreeNode> q = new ArrayDeque<>();
        q.add(root);
        int i = 1;
        while (!q.isEmpty() && i < tokens.length) {
            TreeNode node = q.poll();
            if (i < tokens.length && !tokens[i].equals("null")) { node.left = new TreeNode(Integer.parseInt(tokens[i])); q.add(node.left); }
            i++;
            if (i < tokens.length && !tokens[i].equals("null")) { node.right = new TreeNode(Integer.parseInt(tokens[i])); q.add(node.right); }
            i++;
        }
        return root;
    }
    static int solve(TreeNode root) {
        if (root == null) return 0;
        return 1 + Math.max(solve(root.left), solve(root.right));
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        System.out.println(solve(buildTree(t)));
    }
}
`,
  "dsa-invert-binary-tree": `import java.util.*;
public class Main {
    static class TreeNode {
        int val;
        TreeNode left, right;
        TreeNode(int v) { val = v; }
    }
    static TreeNode buildTree(String[] tokens) {
        if (tokens.length == 0 || tokens[0].equals("null")) return null;
        TreeNode root = new TreeNode(Integer.parseInt(tokens[0]));
        Queue<TreeNode> q = new ArrayDeque<>();
        q.add(root);
        int i = 1;
        while (!q.isEmpty() && i < tokens.length) {
            TreeNode node = q.poll();
            if (i < tokens.length && !tokens[i].equals("null")) { node.left = new TreeNode(Integer.parseInt(tokens[i])); q.add(node.left); }
            i++;
            if (i < tokens.length && !tokens[i].equals("null")) { node.right = new TreeNode(Integer.parseInt(tokens[i])); q.add(node.right); }
            i++;
        }
        return root;
    }
    static String fmtTree(TreeNode x) {
        if (x == null) return "";
        List<String> out = new ArrayList<>();
        Queue<TreeNode> q = new LinkedList<>();
        q.add(x);
        while (!q.isEmpty()) {
            TreeNode node = q.poll();
            if (node == null) out.add("null");
            else {
                out.add(String.valueOf(node.val));
                q.add(node.left);
                q.add(node.right);
            }
        }
        while (!out.isEmpty() && out.get(out.size() - 1).equals("null")) out.remove(out.size() - 1);
        return String.join(" ", out);
    }
    static TreeNode solve(TreeNode root) {
        if (root == null) return null;
        TreeNode l = solve(root.right);
        TreeNode r = solve(root.left);
        root.left = l;
        root.right = r;
        return root;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        System.out.println(fmtTree(solve(buildTree(t))));
    }
}
`,
  "dsa-same-tree": `import java.util.*;
public class Main {
    static class TreeNode {
        int val;
        TreeNode left, right;
        TreeNode(int v) { val = v; }
    }
    static TreeNode buildTree(String[] tokens) {
        if (tokens.length == 0 || tokens[0].equals("null")) return null;
        TreeNode root = new TreeNode(Integer.parseInt(tokens[0]));
        Queue<TreeNode> q = new ArrayDeque<>();
        q.add(root);
        int i = 1;
        while (!q.isEmpty() && i < tokens.length) {
            TreeNode node = q.poll();
            if (i < tokens.length && !tokens[i].equals("null")) { node.left = new TreeNode(Integer.parseInt(tokens[i])); q.add(node.left); }
            i++;
            if (i < tokens.length && !tokens[i].equals("null")) { node.right = new TreeNode(Integer.parseInt(tokens[i])); q.add(node.right); }
            i++;
        }
        return root;
    }
    static boolean solve(TreeNode a, TreeNode b) {
        if (a == null && b == null) return true;
        if (a == null || b == null) return false;
        return a.val == b.val && solve(a.left, b.left) && solve(a.right, b.right);
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int n1 = Integer.parseInt(t[0]);
        String[] t1 = Arrays.copyOfRange(t, 1, 1 + n1);
        int n2 = Integer.parseInt(t[1 + n1]);
        String[] t2 = Arrays.copyOfRange(t, 2 + n1, 2 + n1 + n2);
        System.out.println(solve(buildTree(t1), buildTree(t2)) ? "true" : "false");
    }
}
`,
  "dsa-symmetric-tree": `import java.util.*;
public class Main {
    static class TreeNode {
        int val;
        TreeNode left, right;
        TreeNode(int v) { val = v; }
    }
    static TreeNode buildTree(String[] tokens) {
        if (tokens.length == 0 || tokens[0].equals("null")) return null;
        TreeNode root = new TreeNode(Integer.parseInt(tokens[0]));
        Queue<TreeNode> q = new ArrayDeque<>();
        q.add(root);
        int i = 1;
        while (!q.isEmpty() && i < tokens.length) {
            TreeNode node = q.poll();
            if (i < tokens.length && !tokens[i].equals("null")) { node.left = new TreeNode(Integer.parseInt(tokens[i])); q.add(node.left); }
            i++;
            if (i < tokens.length && !tokens[i].equals("null")) { node.right = new TreeNode(Integer.parseInt(tokens[i])); q.add(node.right); }
            i++;
        }
        return root;
    }
    static boolean mirror(TreeNode a, TreeNode b) {
        if (a == null && b == null) return true;
        if (a == null || b == null) return false;
        return a.val == b.val && mirror(a.left, b.right) && mirror(a.right, b.left);
    }
    static boolean solve(TreeNode root) {
        if (root == null) return true;
        return mirror(root.left, root.right);
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        System.out.println(solve(buildTree(t)) ? "true" : "false");
    }
}
`,
  "dsa-binary-tree-level-order-traversal": `import java.util.*;
public class Main {
    static class TreeNode {
        int val;
        TreeNode left, right;
        TreeNode(int v) { val = v; }
    }
    static TreeNode buildTree(String[] tokens) {
        if (tokens.length == 0 || tokens[0].equals("null")) return null;
        TreeNode root = new TreeNode(Integer.parseInt(tokens[0]));
        Queue<TreeNode> q = new ArrayDeque<>();
        q.add(root);
        int i = 1;
        while (!q.isEmpty() && i < tokens.length) {
            TreeNode node = q.poll();
            if (i < tokens.length && !tokens[i].equals("null")) { node.left = new TreeNode(Integer.parseInt(tokens[i])); q.add(node.left); }
            i++;
            if (i < tokens.length && !tokens[i].equals("null")) { node.right = new TreeNode(Integer.parseInt(tokens[i])); q.add(node.right); }
            i++;
        }
        return root;
    }
    static String fmtRows(List<List<Integer>> rows) {
        List<String> out = new ArrayList<>();
        for (List<Integer> r : rows) {
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < r.size(); i++) { if (i > 0) sb.append(' '); sb.append(r.get(i)); }
            out.add(sb.toString());
        }
        return String.join("\\n", out);
    }
    static List<List<Integer>> solve(TreeNode root) {
        List<List<Integer>> out = new ArrayList<>();
        if (root == null) return out;
        List<TreeNode> level = new ArrayList<>();
        level.add(root);
        while (!level.isEmpty()) {
            List<Integer> vals = new ArrayList<>();
            for (TreeNode n : level) vals.add(n.val);
            out.add(vals);
            List<TreeNode> nxt = new ArrayList<>();
            for (TreeNode n : level) {
                if (n.left != null) nxt.add(n.left);
                if (n.right != null) nxt.add(n.right);
            }
            level = nxt;
        }
        return out;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        System.out.println(fmtRows(solve(buildTree(t))));
    }
}
`,
  "dsa-validate-binary-search-tree": `import java.util.*;
public class Main {
    static class TreeNode {
        int val;
        TreeNode left, right;
        TreeNode(int v) { val = v; }
    }
    static TreeNode buildTree(String[] tokens) {
        if (tokens.length == 0 || tokens[0].equals("null")) return null;
        TreeNode root = new TreeNode(Integer.parseInt(tokens[0]));
        Queue<TreeNode> q = new ArrayDeque<>();
        q.add(root);
        int i = 1;
        while (!q.isEmpty() && i < tokens.length) {
            TreeNode node = q.poll();
            if (i < tokens.length && !tokens[i].equals("null")) { node.left = new TreeNode(Integer.parseInt(tokens[i])); q.add(node.left); }
            i++;
            if (i < tokens.length && !tokens[i].equals("null")) { node.right = new TreeNode(Integer.parseInt(tokens[i])); q.add(node.right); }
            i++;
        }
        return root;
    }
    static boolean valid(TreeNode node, long low, long high) {
        if (node == null) return true;
        if (node.val <= low || node.val >= high) return false;
        return valid(node.left, low, node.val) && valid(node.right, node.val, high);
    }
    static boolean solve(TreeNode root) {
        return valid(root, Long.MIN_VALUE, Long.MAX_VALUE);
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        System.out.println(solve(buildTree(t)) ? "true" : "false");
    }
}
`,
  "dsa-lowest-common-ancestor": `import java.util.*;
public class Main {
    static class TreeNode {
        int val;
        TreeNode left, right;
        TreeNode(int v) { val = v; }
    }
    static TreeNode buildTree(String[] tokens) {
        if (tokens.length == 0 || tokens[0].equals("null")) return null;
        TreeNode root = new TreeNode(Integer.parseInt(tokens[0]));
        Queue<TreeNode> q = new ArrayDeque<>();
        q.add(root);
        int i = 1;
        while (!q.isEmpty() && i < tokens.length) {
            TreeNode node = q.poll();
            if (i < tokens.length && !tokens[i].equals("null")) { node.left = new TreeNode(Integer.parseInt(tokens[i])); q.add(node.left); }
            i++;
            if (i < tokens.length && !tokens[i].equals("null")) { node.right = new TreeNode(Integer.parseInt(tokens[i])); q.add(node.right); }
            i++;
        }
        return root;
    }
    static int solve(TreeNode root, int p, int q) {
        if (root == null) return -1;
        if (root.val == p || root.val == q) return root.val;
        Integer left = null, right = null;
        if (root.left != null) {
            int lv = solve(root.left, p, q);
            if (lv != -1) left = lv;
        }
        if (root.right != null) {
            int rv = solve(root.right, p, q);
            if (rv != -1) right = rv;
        }
        if (left != null && right != null) return root.val;
        return left != null ? left : (right != null ? right : -1);
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = Integer.parseInt(t[t.length - 2]);
        int q = Integer.parseInt(t[t.length - 1]);
        String[] treeTokens = Arrays.copyOfRange(t, 0, t.length - 2);
        System.out.println(solve(buildTree(treeTokens), p, q));
    }
}
`,
  "dsa-diameter-of-binary-tree": `import java.util.*;
public class Main {
    static class TreeNode {
        int val;
        TreeNode left, right;
        TreeNode(int v) { val = v; }
    }
    static TreeNode buildTree(String[] tokens) {
        if (tokens.length == 0 || tokens[0].equals("null")) return null;
        TreeNode root = new TreeNode(Integer.parseInt(tokens[0]));
        Queue<TreeNode> q = new ArrayDeque<>();
        q.add(root);
        int i = 1;
        while (!q.isEmpty() && i < tokens.length) {
            TreeNode node = q.poll();
            if (i < tokens.length && !tokens[i].equals("null")) { node.left = new TreeNode(Integer.parseInt(tokens[i])); q.add(node.left); }
            i++;
            if (i < tokens.length && !tokens[i].equals("null")) { node.right = new TreeNode(Integer.parseInt(tokens[i])); q.add(node.right); }
            i++;
        }
        return root;
    }
    static int best;
    static int depth(TreeNode node) {
        if (node == null) return 0;
        int l = depth(node.left);
        int r = depth(node.right);
        best = Math.max(best, l + r);
        return 1 + Math.max(l, r);
    }
    static int solve(TreeNode root) {
        best = 0;
        depth(root);
        return best;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        System.out.println(solve(buildTree(t)));
    }
}
`,
  "dsa-path-sum": `import java.util.*;
public class Main {
    static class TreeNode {
        int val;
        TreeNode left, right;
        TreeNode(int v) { val = v; }
    }
    static TreeNode buildTree(String[] tokens) {
        if (tokens.length == 0 || tokens[0].equals("null")) return null;
        TreeNode root = new TreeNode(Integer.parseInt(tokens[0]));
        Queue<TreeNode> q = new ArrayDeque<>();
        q.add(root);
        int i = 1;
        while (!q.isEmpty() && i < tokens.length) {
            TreeNode node = q.poll();
            if (i < tokens.length && !tokens[i].equals("null")) { node.left = new TreeNode(Integer.parseInt(tokens[i])); q.add(node.left); }
            i++;
            if (i < tokens.length && !tokens[i].equals("null")) { node.right = new TreeNode(Integer.parseInt(tokens[i])); q.add(node.right); }
            i++;
        }
        return root;
    }
    static boolean solve(TreeNode root, int target) {
        if (root == null) return false;
        if (root.left == null && root.right == null) return root.val == target;
        return solve(root.left, target - root.val) || solve(root.right, target - root.val);
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int target = Integer.parseInt(t[t.length - 1]);
        String[] treeTokens = Arrays.copyOfRange(t, 0, t.length - 1);
        System.out.println(solve(buildTree(treeTokens), target) ? "true" : "false");
    }
}
`,
  "dsa-kth-smallest-in-bst": `import java.util.*;
public class Main {
    static class TreeNode {
        int val;
        TreeNode left, right;
        TreeNode(int v) { val = v; }
    }
    static TreeNode buildTree(String[] tokens) {
        if (tokens.length == 0 || tokens[0].equals("null")) return null;
        TreeNode root = new TreeNode(Integer.parseInt(tokens[0]));
        Queue<TreeNode> q = new ArrayDeque<>();
        q.add(root);
        int i = 1;
        while (!q.isEmpty() && i < tokens.length) {
            TreeNode node = q.poll();
            if (i < tokens.length && !tokens[i].equals("null")) { node.left = new TreeNode(Integer.parseInt(tokens[i])); q.add(node.left); }
            i++;
            if (i < tokens.length && !tokens[i].equals("null")) { node.right = new TreeNode(Integer.parseInt(tokens[i])); q.add(node.right); }
            i++;
        }
        return root;
    }
    static int solve(TreeNode root, int k) {
        Deque<TreeNode> stack = new ArrayDeque<>();
        TreeNode cur = root;
        while (!stack.isEmpty() || cur != null) {
            while (cur != null) { stack.push(cur); cur = cur.left; }
            cur = stack.pop();
            k--;
            if (k == 0) return cur.val;
            cur = cur.right;
        }
        return -1;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int k = Integer.parseInt(t[t.length - 1]);
        String[] treeTokens = Arrays.copyOfRange(t, 0, t.length - 1);
        System.out.println(solve(buildTree(treeTokens), k));
    }
}
`,
  "dsa-binary-tree-right-side-view": `import java.util.*;
public class Main {
    static class TreeNode {
        int val;
        TreeNode left, right;
        TreeNode(int v) { val = v; }
    }
    static TreeNode buildTree(String[] tokens) {
        if (tokens.length == 0 || tokens[0].equals("null")) return null;
        TreeNode root = new TreeNode(Integer.parseInt(tokens[0]));
        Queue<TreeNode> q = new ArrayDeque<>();
        q.add(root);
        int i = 1;
        while (!q.isEmpty() && i < tokens.length) {
            TreeNode node = q.poll();
            if (i < tokens.length && !tokens[i].equals("null")) { node.left = new TreeNode(Integer.parseInt(tokens[i])); q.add(node.left); }
            i++;
            if (i < tokens.length && !tokens[i].equals("null")) { node.right = new TreeNode(Integer.parseInt(tokens[i])); q.add(node.right); }
            i++;
        }
        return root;
    }
    static String fmtI(int[] a) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(' '); sb.append(a[i]); }
        return sb.toString();
    }
    static int[] solve(TreeNode root) {
        List<Integer> out = new ArrayList<>();
        if (root == null) return new int[0];
        List<TreeNode> level = new ArrayList<>();
        level.add(root);
        while (!level.isEmpty()) {
            out.add(level.get(level.size() - 1).val);
            List<TreeNode> nxt = new ArrayList<>();
            for (TreeNode n : level) {
                if (n.left != null) nxt.add(n.left);
                if (n.right != null) nxt.add(n.right);
            }
            level = nxt;
        }
        int[] res = new int[out.size()];
        for (int i = 0; i < res.length; i++) res[i] = out.get(i);
        return res;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        System.out.println(fmtI(solve(buildTree(t))));
    }
}
`,
  "dsa-construct-binary-tree-from-preorder-inorder": `import java.util.*;
public class Main {
    static class TreeNode {
        int val;
        TreeNode left, right;
        TreeNode(int v) { val = v; }
    }
    static String fmtTree(TreeNode x) {
        if (x == null) return "";
        List<String> out = new ArrayList<>();
        Queue<TreeNode> q = new LinkedList<>();
        q.add(x);
        while (!q.isEmpty()) {
            TreeNode node = q.poll();
            if (node == null) out.add("null");
            else {
                out.add(String.valueOf(node.val));
                q.add(node.left);
                q.add(node.right);
            }
        }
        while (!out.isEmpty() && out.get(out.size() - 1).equals("null")) out.remove(out.size() - 1);
        return String.join(" ", out);
    }
    static int[] preorder;
    static Map<Integer, Integer> pos;
    static int[] idx;
    static TreeNode build(int lo, int hi) {
        if (lo > hi) return null;
        int val = preorder[idx[0]++];
        TreeNode node = new TreeNode(val);
        int mid = pos.get(val);
        node.left = build(lo, mid - 1);
        node.right = build(mid + 1, hi);
        return node;
    }
    static TreeNode solve(int[] pre, int[] in) {
        preorder = pre;
        pos = new HashMap<>();
        for (int i = 0; i < in.length; i++) pos.put(in[i], i);
        idx = new int[]{0};
        return build(0, in.length - 1);
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = Integer.parseInt(t[p++]);
        int m = Integer.parseInt(t[p++]);
        int[] b = new int[m];
        for (int i = 0; i < m; i++) b[i] = Integer.parseInt(t[p++]);
        System.out.println(fmtTree(solve(a, b)));
    }
}
`,
  "dsa-sum-of-left-leaves": `import java.util.*;
public class Main {
    static class TreeNode {
        int val;
        TreeNode left, right;
        TreeNode(int v) { val = v; }
    }
    static TreeNode buildTree(String[] tokens) {
        if (tokens.length == 0 || tokens[0].equals("null")) return null;
        TreeNode root = new TreeNode(Integer.parseInt(tokens[0]));
        Queue<TreeNode> q = new ArrayDeque<>();
        q.add(root);
        int i = 1;
        while (!q.isEmpty() && i < tokens.length) {
            TreeNode node = q.poll();
            if (i < tokens.length && !tokens[i].equals("null")) { node.left = new TreeNode(Integer.parseInt(tokens[i])); q.add(node.left); }
            i++;
            if (i < tokens.length && !tokens[i].equals("null")) { node.right = new TreeNode(Integer.parseInt(tokens[i])); q.add(node.right); }
            i++;
        }
        return root;
    }
    static int solve(TreeNode root) {
        if (root == null) return 0;
        int total = 0;
        if (root.left != null && root.left.left == null && root.left.right == null) total += root.left.val;
        return total + solve(root.left) + solve(root.right);
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        System.out.println(solve(buildTree(t)));
    }
}
`,
  "dsa-binary-tree-maximum-path-sum": `import java.util.*;
public class Main {
    static class TreeNode {
        int val;
        TreeNode left, right;
        TreeNode(int v) { val = v; }
    }
    static TreeNode buildTree(String[] tokens) {
        if (tokens.length == 0 || tokens[0].equals("null")) return null;
        TreeNode root = new TreeNode(Integer.parseInt(tokens[0]));
        Queue<TreeNode> q = new ArrayDeque<>();
        q.add(root);
        int i = 1;
        while (!q.isEmpty() && i < tokens.length) {
            TreeNode node = q.poll();
            if (i < tokens.length && !tokens[i].equals("null")) { node.left = new TreeNode(Integer.parseInt(tokens[i])); q.add(node.left); }
            i++;
            if (i < tokens.length && !tokens[i].equals("null")) { node.right = new TreeNode(Integer.parseInt(tokens[i])); q.add(node.right); }
            i++;
        }
        return root;
    }
    static int best;
    static int gain(TreeNode node) {
        if (node == null) return 0;
        int left = Math.max(gain(node.left), 0);
        int right = Math.max(gain(node.right), 0);
        best = Math.max(best, node.val + left + right);
        return node.val + Math.max(left, right);
    }
    static int solve(TreeNode root) {
        best = Integer.MIN_VALUE;
        gain(root);
        return best;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        System.out.println(solve(buildTree(t)));
    }
}
`,
  "dsa-number-of-islands": `import java.util.*;
import java.io.*;
public class Main {
    static void dfs(char[][] grid, int i, int j, int m, int n) {
        if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] != '1') return;
        grid[i][j] = '0';
        dfs(grid, i + 1, j, m, n);
        dfs(grid, i - 1, j, m, n);
        dfs(grid, i, j + 1, m, n);
        dfs(grid, i, j - 1, m, n);
    }
    static int solve(char[][] grid) {
        int m = grid.length;
        int n = grid[0].length;
        int count = 0;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == '1') { count++; dfs(grid, i, j, m, n); }
            }
        }
        return count;
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in, java.nio.charset.StandardCharsets.UTF_8));
        List<String> lines = new ArrayList<>();
        String line;
        while ((line = br.readLine()) != null) lines.add(line);
        String[] first = lines.get(0).trim().split("\\\\s+");
        int r = Integer.parseInt(first[0]);
        int c = Integer.parseInt(first[1]);
        char[][] grid = new char[r][c];
        for (int i = 0; i < r; i++) {
            String row = lines.get(1 + i).strip().replace(" ", "");
            for (int j = 0; j < c && j < row.length(); j++) grid[i][j] = row.charAt(j);
        }
        System.out.println(solve(grid));
    }
}
`,
  "dsa-flood-fill": `import java.util.*;
public class Main {
    static String fmtIntRows(int[][] grid) {
        List<String> out = new ArrayList<>();
        for (int[] row : grid) {
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < row.length; i++) { if (i > 0) sb.append(' '); sb.append(row[i]); }
            out.add(sb.toString());
        }
        return String.join("\\n", out);
    }
    static void dfs(int[][] grid, int i, int j, int m, int n, int old, int color) {
        if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] != old) return;
        grid[i][j] = color;
        dfs(grid, i + 1, j, m, n, old, color);
        dfs(grid, i - 1, j, m, n, old, color);
        dfs(grid, i, j + 1, m, n, old, color);
        dfs(grid, i, j - 1, m, n, old, color);
    }
    static int[][] solve(int[][] grid, int sr, int sc, int color) {
        int old = grid[sr][sc];
        if (old == color) return grid;
        dfs(grid, sr, sc, grid.length, grid[0].length, old, color);
        return grid;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int r = Integer.parseInt(t[0]);
        int c = Integer.parseInt(t[1]);
        int[][] grid = new int[r][c];
        int p = 2;
        for (int i = 0; i < r; i++) {
            for (int j = 0; j < c; j++) grid[i][j] = Integer.parseInt(t[p++]);
        }
        int sr = Integer.parseInt(t[p++]);
        int sc = Integer.parseInt(t[p++]);
        int color = Integer.parseInt(t[p++]);
        System.out.println(fmtIntRows(solve(grid, sr, sc, color)));
    }
}
`,
  "dsa-course-schedule": `import java.util.*;
public class Main {
    static boolean solve(int n, int[][] edges) {
        List<List<Integer>> graph = new ArrayList<>();
        for (int i = 0; i < n; i++) graph.add(new ArrayList<>());
        int[] indeg = new int[n];
        for (int[] e : edges) {
            graph.get(e[1]).add(e[0]);
            indeg[e[0]]++;
        }
        Deque<Integer> q = new ArrayDeque<>();
        for (int i = 0; i < n; i++) if (indeg[i] == 0) q.addLast(i);
        int done = 0;
        while (!q.isEmpty()) {
            int u = q.pollFirst();
            done++;
            for (int v : graph.get(u)) {
                indeg[v]--;
                if (indeg[v] == 0) q.addLast(v);
            }
        }
        return done == n;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int n = Integer.parseInt(t[0]);
        int m = Integer.parseInt(t[1]);
        int[][] edges = new int[m][2];
        for (int i = 0; i < m; i++) {
            edges[i][0] = Integer.parseInt(t[2 + 2 * i]);
            edges[i][1] = Integer.parseInt(t[3 + 2 * i]);
        }
        System.out.println(solve(n, edges) ? "true" : "false");
    }
}
`,
  "dsa-course-schedule-ii": `import java.util.*;
public class Main {
    static String fmtI(int[] a) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(' '); sb.append(a[i]); }
        return sb.toString();
    }
    static int[] solve(int n, int[][] edges) {
        List<List<Integer>> graph = new ArrayList<>();
        for (int i = 0; i < n; i++) graph.add(new ArrayList<>());
        int[] indeg = new int[n];
        for (int[] e : edges) {
            graph.get(e[1]).add(e[0]);
            indeg[e[0]]++;
        }
        Deque<Integer> q = new ArrayDeque<>();
        for (int i = 0; i < n; i++) if (indeg[i] == 0) q.addLast(i);
        List<Integer> order = new ArrayList<>();
        while (!q.isEmpty()) {
            int u = q.pollFirst();
            order.add(u);
            for (int v : graph.get(u)) {
                indeg[v]--;
                if (indeg[v] == 0) q.addLast(v);
            }
        }
        if (order.size() != n) return new int[]{-1};
        int[] res = new int[order.size()];
        for (int i = 0; i < res.length; i++) res[i] = order.get(i);
        return res;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int n = Integer.parseInt(t[0]);
        int m = Integer.parseInt(t[1]);
        int[][] edges = new int[m][2];
        for (int i = 0; i < m; i++) {
            edges[i][0] = Integer.parseInt(t[2 + 2 * i]);
            edges[i][1] = Integer.parseInt(t[3 + 2 * i]);
        }
        System.out.println(fmtI(solve(n, edges)));
    }
}
`,
  "dsa-pacific-atlantic-water-flow": `import java.util.*;
public class Main {
    static String fmtRows(List<List<Integer>> rows) {
        List<String> out = new ArrayList<>();
        for (List<Integer> r : rows) {
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < r.size(); i++) { if (i > 0) sb.append(' '); sb.append(r.get(i)); }
            out.add(sb.toString());
        }
        return String.join("\\n", out);
    }
    static void dfs(int[][] grid, int i, int j, int m, int n, boolean[][] seen) {
        seen[i][j] = true;
        int[][] dirs = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
        for (int[] d : dirs) {
            int ni = i + d[0], nj = j + d[1];
            if (ni >= 0 && ni < m && nj >= 0 && nj < n && !seen[ni][nj] && grid[ni][nj] >= grid[i][j]) dfs(grid, ni, nj, m, n, seen);
        }
    }
    static List<List<Integer>> solve(int[][] grid) {
        int m = grid.length;
        int n = grid[0].length;
        boolean[][] pac = new boolean[m][n];
        boolean[][] atl = new boolean[m][n];
        for (int i = 0; i < m; i++) { dfs(grid, i, 0, m, n, pac); dfs(grid, i, n - 1, m, n, atl); }
        for (int j = 0; j < n; j++) { dfs(grid, 0, j, m, n, pac); dfs(grid, m - 1, j, m, n, atl); }
        List<List<Integer>> out = new ArrayList<>();
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (pac[i][j] && atl[i][j]) out.add(Arrays.asList(i, j));
            }
        }
        return out;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int r = Integer.parseInt(t[0]);
        int c = Integer.parseInt(t[1]);
        int[][] grid = new int[r][c];
        int p = 2;
        for (int i = 0; i < r; i++) {
            for (int j = 0; j < c; j++) grid[i][j] = Integer.parseInt(t[p++]);
        }
        System.out.println(fmtRows(solve(grid)));
    }
}
`,
  "dsa-number-of-provinces": `import java.util.*;
public class Main {
    static void dfs(int[][] grid, int i, boolean[] seen, int n) {
        seen[i] = true;
        for (int j = 0; j < n; j++) {
            if (grid[i][j] == 1 && !seen[j]) dfs(grid, j, seen, n);
        }
    }
    static int solve(int[][] grid) {
        int n = grid.length;
        boolean[] seen = new boolean[n];
        int count = 0;
        for (int i = 0; i < n; i++) {
            if (!seen[i]) { count++; dfs(grid, i, seen, n); }
        }
        return count;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int r = Integer.parseInt(t[0]);
        int c = Integer.parseInt(t[1]);
        int[][] grid = new int[r][c];
        int p = 2;
        for (int i = 0; i < r; i++) {
            for (int j = 0; j < c; j++) grid[i][j] = Integer.parseInt(t[p++]);
        }
        System.out.println(solve(grid));
    }
}
`,
  "dsa-word-ladder": `import java.util.*;
import java.io.*;
public class Main {
    static int solve(String begin, String end, List<String> words) {
        Set<String> wordSet = new HashSet<>(words);
        if (!wordSet.contains(end)) return 0;
        Deque<Object[]> q = new ArrayDeque<>();
        q.addLast(new Object[]{begin, 1});
        Set<String> seen = new HashSet<>();
        seen.add(begin);
        while (!q.isEmpty()) {
            Object[] cur = q.pollFirst();
            String word = (String) cur[0];
            int steps = (Integer) cur[1];
            if (word.equals(end)) return steps;
            for (int i = 0; i < word.length(); i++) {
                for (char c = 'a'; c <= 'z'; c++) {
                    String nxt = word.substring(0, i) + c + word.substring(i + 1);
                    if (wordSet.contains(nxt) && !seen.contains(nxt)) {
                        seen.add(nxt);
                        q.addLast(new Object[]{nxt, steps + 1});
                    }
                }
            }
        }
        return 0;
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in, java.nio.charset.StandardCharsets.UTF_8));
        String begin = br.readLine();
        String end = br.readLine();
        String nLine = br.readLine();
        if (begin == null) begin = "";
        if (end == null) end = "";
        int n = (nLine == null || nLine.strip().isEmpty()) ? 0 : Integer.parseInt(nLine.strip());
        List<String> words = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            String w = br.readLine();
            words.add(w == null ? "" : w.strip());
        }
        System.out.println(solve(begin.strip(), end.strip(), words));
    }
}
`,
  "dsa-keys-and-rooms": `import java.util.*;
import java.io.*;
public class Main {
    static boolean solve(List<List<Integer>> rooms) {
        Set<Integer> seen = new HashSet<>();
        seen.add(0);
        Deque<Integer> stack = new ArrayDeque<>();
        stack.push(0);
        while (!stack.isEmpty()) {
            int r = stack.pop();
            for (int k : rooms.get(r)) {
                if (!seen.contains(k)) { seen.add(k); stack.push(k); }
            }
        }
        return seen.size() == rooms.size();
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in, java.nio.charset.StandardCharsets.UTF_8));
        List<String> lines = new ArrayList<>();
        String line;
        while ((line = br.readLine()) != null) lines.add(line);
        int n = Integer.parseInt(lines.get(0).trim());
        List<List<Integer>> rooms = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            String l = lines.get(1 + i).trim();
            List<Integer> room = new ArrayList<>();
            if (!l.isEmpty()) {
                String[] parts = l.split("\\\\s+");
                int cnt = Integer.parseInt(parts[0]);
                for (int j = 1; j <= cnt && j < parts.length; j++) room.add(Integer.parseInt(parts[j]));
            }
            rooms.add(room);
        }
        System.out.println(solve(rooms) ? "true" : "false");
    }
}
`,
  "dsa-shortest-path-in-binary-matrix": `import java.util.*;
import java.io.*;
public class Main {
    static int solve(char[][] grid) {
        int n = grid.length;
        if (grid[0][0] == '1' || grid[n - 1][n - 1] == '1') return -1;
        Deque<int[]> q = new ArrayDeque<>();
        q.addLast(new int[]{0, 0, 1});
        grid[0][0] = '1';
        while (!q.isEmpty()) {
            int[] cur = q.pollFirst();
            int i = cur[0], j = cur[1], d = cur[2];
            if (i == n - 1 && j == n - 1) return d;
            for (int di = -1; di <= 1; di++) {
                for (int dj = -1; dj <= 1; dj++) {
                    if (di == 0 && dj == 0) continue;
                    int ni = i + di, nj = j + dj;
                    if (ni >= 0 && ni < n && nj >= 0 && nj < n && grid[ni][nj] == '0') {
                        grid[ni][nj] = '1';
                        q.addLast(new int[]{ni, nj, d + 1});
                    }
                }
            }
        }
        return -1;
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in, java.nio.charset.StandardCharsets.UTF_8));
        List<String> lines = new ArrayList<>();
        String line;
        while ((line = br.readLine()) != null) lines.add(line);
        String[] first = lines.get(0).trim().split("\\\\s+");
        int r = Integer.parseInt(first[0]);
        int c = Integer.parseInt(first[1]);
        char[][] grid = new char[r][c];
        for (int i = 0; i < r; i++) {
            String row = lines.get(1 + i).strip().replace(" ", "");
            for (int j = 0; j < c && j < row.length(); j++) grid[i][j] = row.charAt(j);
        }
        System.out.println(solve(grid));
    }
}
`,
  "dsa-surrounded-regions": `import java.util.*;
import java.io.*;
public class Main {
    static void dfs(char[][] grid, int i, int j, int m, int n) {
        if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] != 'O') return;
        grid[i][j] = 'S';
        dfs(grid, i + 1, j, m, n);
        dfs(grid, i - 1, j, m, n);
        dfs(grid, i, j + 1, m, n);
        dfs(grid, i, j - 1, m, n);
    }
    static char[][] solve(char[][] grid) {
        int m = grid.length;
        int n = grid[0].length;
        for (int i = 0; i < m; i++) { dfs(grid, i, 0, m, n); dfs(grid, i, n - 1, m, n); }
        for (int j = 0; j < n; j++) { dfs(grid, 0, j, m, n); dfs(grid, m - 1, j, m, n); }
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 'O') grid[i][j] = 'X';
                else if (grid[i][j] == 'S') grid[i][j] = 'O';
            }
        }
        return grid;
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in, java.nio.charset.StandardCharsets.UTF_8));
        List<String> lines = new ArrayList<>();
        String line;
        while ((line = br.readLine()) != null) lines.add(line);
        String[] first = lines.get(0).trim().split("\\\\s+");
        int r = Integer.parseInt(first[0]);
        int c = Integer.parseInt(first[1]);
        char[][] grid = new char[r][c];
        for (int i = 0; i < r; i++) {
            String row = lines.get(1 + i).strip().replace(" ", "");
            for (int j = 0; j < c && j < row.length(); j++) grid[i][j] = row.charAt(j);
        }
        char[][] res = solve(grid);
        List<String> out = new ArrayList<>();
        for (char[] row : res) out.add(new String(row));
        System.out.println(String.join("\\n", out));
    }
}
`,
  "dsa-graph-valid-tree": `import java.util.*;
public class Main {
    static int find(int[] parent, int x) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }
    static boolean solve(int n, int[][] edges) {
        if (edges.length != n - 1) return false;
        int[] parent = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;
        for (int[] e : edges) {
            int ra = find(parent, e[0]);
            int rb = find(parent, e[1]);
            if (ra == rb) return false;
            parent[ra] = rb;
        }
        return true;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int n = Integer.parseInt(t[0]);
        int m = Integer.parseInt(t[1]);
        int[][] edges = new int[m][2];
        for (int i = 0; i < m; i++) {
            edges[i][0] = Integer.parseInt(t[2 + 2 * i]);
            edges[i][1] = Integer.parseInt(t[3 + 2 * i]);
        }
        System.out.println(solve(n, edges) ? "true" : "false");
    }
}
`,
  "dsa-cheapest-flights-within-k-stops": `import java.util.*;
public class Main {
    static long solve(int n, int[][] edges, int src, int dst, int k) {
        long INF = Long.MAX_VALUE / 4;
        long[] dist = new long[n];
        Arrays.fill(dist, INF);
        dist[src] = 0;
        for (int s = 0; s < k + 1; s++) {
            long[] nxt = Arrays.copyOf(dist, n);
            for (int[] e : edges) {
                int u = e[0], v = e[1], w = e[2];
                if (dist[u] != INF && dist[u] + w < nxt[v]) nxt[v] = dist[u] + w;
            }
            dist = nxt;
        }
        return dist[dst] == INF ? -1 : dist[dst];
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int n = Integer.parseInt(t[0]);
        int m = Integer.parseInt(t[1]);
        int[][] edges = new int[m][3];
        for (int i = 0; i < m; i++) {
            edges[i][0] = Integer.parseInt(t[2 + 3 * i]);
            edges[i][1] = Integer.parseInt(t[3 + 3 * i]);
            edges[i][2] = Integer.parseInt(t[4 + 3 * i]);
        }
        int src = Integer.parseInt(t[2 + 3 * m]);
        int dst = Integer.parseInt(t[3 + 3 * m]);
        int k = Integer.parseInt(t[4 + 3 * m]);
        System.out.println(solve(n, edges, src, dst, k));
    }
}
`,
  "dsa-climbing-stairs": `import java.util.*;
public class Main {
    static int solve(int n) {
        int a = 1, b = 1;
        for (int i = 0; i < n - 1; i++) {
            int tmp = a + b;
            a = b;
            b = tmp;
        }
        return b;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        System.out.println(solve(Integer.parseInt(t[0])));
    }
}
`,
  "dsa-house-robber": `import java.util.*;
public class Main {
    static int solve(int[] nums) {
        int prev2 = 0, prev1 = 0;
        for (int x : nums) {
            int cur = Math.max(prev1, prev2 + x);
            prev2 = prev1;
            prev1 = cur;
        }
        return prev1;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = Integer.parseInt(t[p++]);
        System.out.println(solve(nums));
    }
}
`,
  "dsa-house-robber-ii": `import java.util.*;
public class Main {
    static int robRange(int[] arr) {
        int prev2 = 0, prev1 = 0;
        for (int x : arr) {
            int cur = Math.max(prev1, prev2 + x);
            prev2 = prev1;
            prev1 = cur;
        }
        return prev1;
    }
    static int solve(int[] nums) {
        if (nums.length == 1) return nums[0];
        return Math.max(robRange(Arrays.copyOfRange(nums, 0, nums.length - 1)), robRange(Arrays.copyOfRange(nums, 1, nums.length)));
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = Integer.parseInt(t[p++]);
        System.out.println(solve(nums));
    }
}
`,
  "dsa-coin-change": `import java.util.*;
public class Main {
    static int solve(int[] coins, int amount) {
        int INF = amount + 1;
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, INF);
        dp[0] = 0;
        for (int a = 1; a <= amount; a++) {
            for (int c : coins) {
                if (c <= a) dp[a] = Math.min(dp[a], dp[a - c] + 1);
            }
        }
        return dp[amount] == INF ? -1 : dp[amount];
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = Integer.parseInt(t[p++]);
        int target = Integer.parseInt(t[p++]);
        System.out.println(solve(nums, target));
    }
}
`,
  "dsa-coin-change-ii": `import java.util.*;
public class Main {
    static int solve(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        dp[0] = 1;
        for (int c : coins) {
            for (int a = c; a <= amount; a++) dp[a] += dp[a - c];
        }
        return dp[amount];
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = Integer.parseInt(t[p++]);
        int target = Integer.parseInt(t[p++]);
        System.out.println(solve(nums, target));
    }
}
`,
  "dsa-longest-increasing-subsequence": `import java.util.*;
public class Main {
    static int solve(int[] nums) {
        List<Integer> tails = new ArrayList<>();
        for (int x : nums) {
            int i = Collections.binarySearch(tails, x);
            if (i < 0) i = -i - 1;
            if (i == tails.size()) tails.add(x);
            else tails.set(i, x);
        }
        return tails.size();
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = Integer.parseInt(t[p++]);
        System.out.println(solve(nums));
    }
}
`,
  "dsa-edit-distance": `import java.util.*;
import java.io.*;
public class Main {
    static int solve(String w1, String w2) {
        int m = w1.length(), n = w2.length();
        int[][] dp = new int[m + 1][n + 1];
        for (int i = 0; i <= m; i++) dp[i][0] = i;
        for (int j = 0; j <= n; j++) dp[0][j] = j;
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (w1.charAt(i - 1) == w2.charAt(j - 1)) dp[i][j] = dp[i - 1][j - 1];
                else dp[i][j] = 1 + Math.min(dp[i - 1][j], Math.min(dp[i][j - 1], dp[i - 1][j - 1]));
            }
        }
        return dp[m][n];
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in, java.nio.charset.StandardCharsets.UTF_8));
        String s1 = br.readLine();
        String s2 = br.readLine();
        if (s1 == null) s1 = "";
        if (s2 == null) s2 = "";
        System.out.println(solve(s1.strip(), s2.strip()));
    }
}
`,
  "dsa-longest-common-subsequence": `import java.util.*;
import java.io.*;
public class Main {
    static int solve(String t1, String t2) {
        int m = t1.length(), n = t2.length();
        int[][] dp = new int[m + 1][n + 1];
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (t1.charAt(i - 1) == t2.charAt(j - 1)) dp[i][j] = dp[i - 1][j - 1] + 1;
                else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
        return dp[m][n];
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in, java.nio.charset.StandardCharsets.UTF_8));
        String s1 = br.readLine();
        String s2 = br.readLine();
        if (s1 == null) s1 = "";
        if (s2 == null) s2 = "";
        System.out.println(solve(s1.strip(), s2.strip()));
    }
}
`,
  "dsa-unique-paths": `import java.util.*;
public class Main {
    static long solve(int m, int n) {
        long[] dp = new long[n];
        Arrays.fill(dp, 1L);
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) dp[j] += dp[j - 1];
        }
        return dp[n - 1];
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int a = Integer.parseInt(t[0]);
        int b = Integer.parseInt(t[1]);
        System.out.println(solve(a, b));
    }
}
`,
  "dsa-unique-paths-ii": `import java.util.*;
public class Main {
    static long solve(int[][] grid) {
        int m = grid.length;
        int n = grid[0].length;
        if (grid[0][0] == 1 || grid[m - 1][n - 1] == 1) return 0;
        long[][] dp = new long[m][n];
        dp[0][0] = 1;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 1) { dp[i][j] = 0; continue; }
                if (i > 0) dp[i][j] += dp[i - 1][j];
                if (j > 0) dp[i][j] += dp[i][j - 1];
            }
        }
        return dp[m - 1][n - 1];
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int r = Integer.parseInt(t[0]);
        int c = Integer.parseInt(t[1]);
        int[][] grid = new int[r][c];
        int p = 2;
        for (int i = 0; i < r; i++) {
            for (int j = 0; j < c; j++) grid[i][j] = Integer.parseInt(t[p++]);
        }
        System.out.println(solve(grid));
    }
}
`,
  "dsa-word-break": `import java.util.*;
import java.io.*;
public class Main {
    static boolean solve(String s, List<String> words) {
        Set<String> wordSet = new HashSet<>(words);
        boolean[] dp = new boolean[s.length() + 1];
        dp[0] = true;
        for (int i = 1; i <= s.length(); i++) {
            for (int j = 0; j < i; j++) {
                if (dp[j] && wordSet.contains(s.substring(j, i))) { dp[i] = true; break; }
            }
        }
        return dp[s.length()];
    }
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in, java.nio.charset.StandardCharsets.UTF_8));
        String s = br.readLine();
        String nLine = br.readLine();
        if (s == null) s = "";
        int n = (nLine == null || nLine.strip().isEmpty()) ? 0 : Integer.parseInt(nLine.strip());
        List<String> words = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            String w = br.readLine();
            words.add(w == null ? "" : w.strip());
        }
        System.out.println(solve(s.strip(), words) ? "true" : "false");
    }
}
`,
  "dsa-decode-ways": `import java.util.*;
public class Main {
    static int solve(String s) {
        if (s.isEmpty() || s.charAt(0) == '0') return 0;
        int prev2 = 1, prev1 = 1;
        for (int i = 1; i < s.length(); i++) {
            int cur = 0;
            if (s.charAt(i) != '0') cur += prev1;
            int two = Integer.parseInt(s.substring(i - 1, i + 1));
            if (two >= 10 && two <= 26) cur += prev2;
            prev2 = prev1;
            prev1 = cur;
        }
        return prev1;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        System.out.println(solve(all.strip()));
    }
}
`,
  "dsa-partition-equal-subset-sum": `import java.util.*;
public class Main {
    static boolean solve(int[] nums) {
        int total = 0;
        for (int x : nums) total += x;
        if (total % 2 == 1) return false;
        int target = total / 2;
        boolean[] dp = new boolean[target + 1];
        dp[0] = true;
        for (int x : nums) {
            for (int s = target; s >= x; s--) dp[s] = dp[s] || dp[s - x];
        }
        return dp[target];
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = Integer.parseInt(t[p++]);
        System.out.println(solve(nums) ? "true" : "false");
    }
}
`,
  "dsa-longest-palindromic-subsequence": `import java.util.*;
public class Main {
    static int solve(String s) {
        int n = s.length();
        if (n == 0) return 0;
        int[][] dp = new int[n][n];
        for (int i = 0; i < n; i++) dp[i][i] = 1;
        for (int length = 2; length <= n; length++) {
            for (int i = 0; i + length - 1 < n; i++) {
                int j = i + length - 1;
                if (s.charAt(i) == s.charAt(j)) dp[i][j] = length == 2 ? 2 : dp[i + 1][j - 1] + 2;
                else dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
            }
        }
        return dp[0][n - 1];
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        System.out.println(solve(all.strip()));
    }
}
`,
  "dsa-best-time-to-buy-sell-stock-ii": `import java.util.*;
public class Main {
    static int solve(int[] prices) {
        int profit = 0;
        for (int i = 1; i < prices.length; i++) {
            if (prices[i] > prices[i - 1]) profit += prices[i] - prices[i - 1];
        }
        return profit;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = Integer.parseInt(t[p++]);
        System.out.println(solve(nums));
    }
}
`,
  "dsa-gas-station": `import java.util.*;
public class Main {
    static int solve(int[] gas, int[] cost) {
        int total = 0, tank = 0, start = 0;
        for (int i = 0; i < gas.length; i++) {
            int diff = gas[i] - cost[i];
            total += diff;
            tank += diff;
            if (tank < 0) { start = i + 1; tank = 0; }
        }
        return total >= 0 ? start : -1;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = Integer.parseInt(t[p++]);
        int m = Integer.parseInt(t[p++]);
        int[] b = new int[m];
        for (int i = 0; i < m; i++) b[i] = Integer.parseInt(t[p++]);
        System.out.println(solve(a, b));
    }
}
`,
  "dsa-assign-cookies": `import java.util.*;
public class Main {
    static int solve(int[] g, int[] s) {
        Arrays.sort(g);
        Arrays.sort(s);
        int child = 0, cookie = 0;
        while (child < g.length && cookie < s.length) {
            if (s[cookie] >= g[child]) child++;
            cookie++;
        }
        return child;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = Integer.parseInt(t[p++]);
        int m = Integer.parseInt(t[p++]);
        int[] b = new int[m];
        for (int i = 0; i < m; i++) b[i] = Integer.parseInt(t[p++]);
        System.out.println(solve(a, b));
    }
}
`,
  "dsa-non-overlapping-intervals": `import java.util.*;
public class Main {
    static int solve(int[][] intervals) {
        Arrays.sort(intervals, Comparator.comparingInt(a -> a[1]));
        int kept = 0;
        long end = Long.MIN_VALUE;
        for (int[] iv : intervals) {
            if (iv[0] >= end) { kept++; end = iv[1]; }
        }
        return intervals.length - kept;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int n = Integer.parseInt(t[0]);
        int[][] intervals = new int[n][2];
        for (int i = 0; i < n; i++) {
            intervals[i][0] = Integer.parseInt(t[1 + 2 * i]);
            intervals[i][1] = Integer.parseInt(t[2 + 2 * i]);
        }
        System.out.println(solve(intervals));
    }
}
`,
  "dsa-partition-labels": `import java.util.*;
public class Main {
    static String fmtI(int[] a) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(' '); sb.append(a[i]); }
        return sb.toString();
    }
    static int[] solve(String s) {
        Map<Character, Integer> last = new HashMap<>();
        for (int i = 0; i < s.length(); i++) last.put(s.charAt(i), i);
        List<Integer> out = new ArrayList<>();
        int start = 0, end = 0;
        for (int i = 0; i < s.length(); i++) {
            end = Math.max(end, last.get(s.charAt(i)));
            if (i == end) { out.add(end - start + 1); start = i + 1; }
        }
        int[] res = new int[out.size()];
        for (int i = 0; i < res.length; i++) res[i] = out.get(i);
        return res;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        System.out.println(fmtI(solve(all.strip())));
    }
}
`,
  "dsa-lemonade-change": `import java.util.*;
public class Main {
    static boolean solve(int[] bills) {
        int fives = 0, tens = 0;
        for (int b : bills) {
            if (b == 5) fives++;
            else if (b == 10) {
                if (fives == 0) return false;
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
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = Integer.parseInt(t[p++]);
        System.out.println(solve(nums) ? "true" : "false");
    }
}
`,
  "dsa-subsets": `import java.util.*;
public class Main {
    static String fmtRows(List<List<Integer>> rows) {
        List<String> out = new ArrayList<>();
        for (List<Integer> r : rows) {
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < r.size(); i++) { if (i > 0) sb.append(' '); sb.append(r.get(i)); }
            out.add(sb.toString());
        }
        return String.join("\\n", out);
    }
    static List<List<Integer>> out;
    static int[] nums;
    static void backtrack(int i, List<Integer> cur) {
        if (i == nums.length) { out.add(new ArrayList<>(cur)); return; }
        backtrack(i + 1, cur);
        cur.add(nums[i]);
        backtrack(i + 1, cur);
        cur.remove(cur.size() - 1);
    }
    static List<List<Integer>> solve(int[] a) {
        nums = a;
        out = new ArrayList<>();
        backtrack(0, new ArrayList<>());
        return out;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) arr[i] = Integer.parseInt(t[p++]);
        System.out.println(fmtRows(solve(arr)));
    }
}
`,
  "dsa-permutations": `import java.util.*;
public class Main {
    static String fmtRows(List<List<Integer>> rows) {
        List<String> out = new ArrayList<>();
        for (List<Integer> r : rows) {
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < r.size(); i++) { if (i > 0) sb.append(' '); sb.append(r.get(i)); }
            out.add(sb.toString());
        }
        return String.join("\\n", out);
    }
    static List<List<Integer>> out;
    static int[] nums;
    static void backtrack(List<Integer> cur, boolean[] used) {
        if (cur.size() == nums.length) { out.add(new ArrayList<>(cur)); return; }
        for (int i = 0; i < nums.length; i++) {
            if (used[i]) continue;
            used[i] = true;
            cur.add(nums[i]);
            backtrack(cur, used);
            cur.remove(cur.size() - 1);
            used[i] = false;
        }
    }
    static List<List<Integer>> solve(int[] a) {
        nums = a;
        out = new ArrayList<>();
        backtrack(new ArrayList<>(), new boolean[nums.length]);
        return out;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) arr[i] = Integer.parseInt(t[p++]);
        System.out.println(fmtRows(solve(arr)));
    }
}
`,
  "dsa-combination-sum": `import java.util.*;
public class Main {
    static String fmtRows(List<List<Integer>> rows) {
        List<String> out = new ArrayList<>();
        for (List<Integer> r : rows) {
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < r.size(); i++) { if (i > 0) sb.append(' '); sb.append(r.get(i)); }
            out.add(sb.toString());
        }
        return String.join("\\n", out);
    }
    static List<List<Integer>> out;
    static int[] candidates;
    static void backtrack(int start, int remaining, List<Integer> cur) {
        if (remaining == 0) { out.add(new ArrayList<>(cur)); return; }
        for (int i = start; i < candidates.length; i++) {
            if (candidates[i] > remaining) break;
            cur.add(candidates[i]);
            backtrack(i, remaining - candidates[i], cur);
            cur.remove(cur.size() - 1);
        }
    }
    static List<List<Integer>> solve(int[] a, int target) {
        candidates = Arrays.copyOf(a, a.length);
        Arrays.sort(candidates);
        out = new ArrayList<>();
        backtrack(0, target, new ArrayList<>());
        return out;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        int p = 0;
        int n = Integer.parseInt(t[p++]);
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = Integer.parseInt(t[p++]);
        int target = Integer.parseInt(t[p++]);
        System.out.println(fmtRows(solve(nums, target)));
    }
}
`,
  "dsa-generate-parentheses": `import java.util.*;
public class Main {
    static String fmtStrRows(List<List<String>> rows) {
        List<String> out = new ArrayList<>();
        for (List<String> r : rows) {
            if (r.isEmpty()) out.add("");
            else if (r.get(0).length() == 1) out.add(String.join("", r));
            else out.add(String.join(" ", r));
        }
        return String.join("\\n", out);
    }
    static List<String> out;
    static int n;
    static void backtrack(List<Character> cur, int open, int close) {
        if (cur.size() == 2 * n) {
            StringBuilder sb = new StringBuilder();
            for (char c : cur) sb.append(c);
            out.add(sb.toString());
            return;
        }
        if (open < n) { cur.add('('); backtrack(cur, open + 1, close); cur.remove(cur.size() - 1); }
        if (close < open) { cur.add(')'); backtrack(cur, open, close + 1); cur.remove(cur.size() - 1); }
    }
    static List<List<String>> solve(int k) {
        n = k;
        out = new ArrayList<>();
        backtrack(new ArrayList<>(), 0, 0);
        List<List<String>> rows = new ArrayList<>();
        for (String s : out) rows.add(Collections.singletonList(s));
        return rows;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        System.out.println(fmtStrRows(solve(Integer.parseInt(t[0]))));
    }
}
`,
  "dsa-letter-combinations-of-phone-number": `import java.util.*;
public class Main {
    static List<String> out;
    static String digits;
    static Map<Character, String> mapping;
    static void backtrack(int i, StringBuilder cur) {
        if (i == digits.length()) { out.add(cur.toString()); return; }
        for (char c : mapping.get(digits.charAt(i)).toCharArray()) {
            cur.append(c);
            backtrack(i + 1, cur);
            cur.deleteCharAt(cur.length() - 1);
        }
    }
    static List<String> solve(String d) {
        digits = d;
        if (digits.isEmpty()) return new ArrayList<>();
        mapping = new HashMap<>();
        mapping.put('2', "abc"); mapping.put('3', "def"); mapping.put('4', "ghi");
        mapping.put('5', "jkl"); mapping.put('6', "mno"); mapping.put('7', "pqrs");
        mapping.put('8', "tuv"); mapping.put('9', "wxyz");
        out = new ArrayList<>();
        backtrack(0, new StringBuilder());
        return out;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        System.out.println(String.join(" ", solve(all.strip())));
    }
}
`,
  "dsa-n-queens-count": `import java.util.*;
public class Main {
    static int count;
    static int n;
    static Set<Integer> cols;
    static Set<Integer> diag1;
    static Set<Integer> diag2;
    static void backtrack(int row) {
        if (row == n) { count++; return; }
        for (int col = 0; col < n; col++) {
            if (cols.contains(col) || diag1.contains(row - col) || diag2.contains(row + col)) continue;
            cols.add(col);
            diag1.add(row - col);
            diag2.add(row + col);
            backtrack(row + 1);
            cols.remove(col);
            diag1.remove(row - col);
            diag2.remove(row + col);
        }
    }
    static int solve(int k) {
        n = k;
        count = 0;
        cols = new HashSet<>();
        diag1 = new HashSet<>();
        diag2 = new HashSet<>();
        backtrack(0);
        return count;
    }
    public static void main(String[] args) throws Exception {
        String all = new String(System.in.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
        String[] t = all.trim().isEmpty() ? new String[0] : all.trim().split("\\\\s+");
        if (t.length == 0) return;
        System.out.println(solve(Integer.parseInt(t[0])));
    }
}
`,
};
