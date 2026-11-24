// C++ (C++20, g++) starters for every CodeForge Academy DSA problem.
// Each value is a complete, self-contained, runnable C++ program: it reads
// the same stdin format as the Python starter for its problem and prints the
// same stdout byte-for-byte. Keyed by problem id; 152 entries.
export const DSA_STARTERS_CPP: Record<string, string> = {
  "dsa-two-sum": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

string fmtVec(const vector<ll>& v) {
    string s;
    for (size_t i = 0; i < v.size(); i++) { if (i) s += ' '; s += to_string(v[i]); }
    return s;
}

vector<ll> solve(vector<ll> nums, ll target) {
    unordered_map<ll, int> seen;
    for (int i = 0; i < (int)nums.size(); i++) {
        ll need = target - nums[i];
        auto it = seen.find(need);
        if (it != seen.end()) return {(ll)it->second, (ll)i};
        seen[nums[i]] = i;
    }
    return {-1, -1};
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> nums;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) nums.push_back(stoll(toks[1 + i]));
    ll target = stoll(toks[1 + n]);
    cout << fmtVec(solve(nums, target)) << '\\n';
    return 0;
}
`,
  "dsa-best-time-to-buy-sell-stock": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

ll solve(vector<ll> prices) {
    if (prices.empty()) return 0;
    ll best = 0, low = prices[0];
    for (size_t i = 1; i < prices.size(); i++) {
        best = max(best, prices[i] - low);
        low = min(low, prices[i]);
    }
    return best;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> nums;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) nums.push_back(stoll(toks[1 + i]));
    cout << solve(nums) << '\\n';
    return 0;
}
`,
  "dsa-maximum-subarray": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

ll solve(vector<ll> nums) {
    if (nums.empty()) return 0;
    ll best = nums[0], cur = nums[0];
    for (size_t i = 1; i < nums.size(); i++) {
        cur = max(nums[i], cur + nums[i]);
        best = max(best, cur);
    }
    return best;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> nums;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) nums.push_back(stoll(toks[1 + i]));
    cout << solve(nums) << '\\n';
    return 0;
}
`,
  "dsa-contains-duplicate": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

bool solve(vector<ll> nums) {
    unordered_set<ll> s(nums.begin(), nums.end());
    return s.size() != nums.size();
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> nums;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) nums.push_back(stoll(toks[1 + i]));
    cout << (solve(nums) ? "true" : "false") << '\\n';
    return 0;
}
`,
  "dsa-product-of-array-except-self": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

string fmtVec(const vector<ll>& v) {
    string s;
    for (size_t i = 0; i < v.size(); i++) { if (i) s += ' '; s += to_string(v[i]); }
    return s;
}

vector<ll> solve(vector<ll> nums) {
    int n = (int)nums.size();
    vector<ll> out(n, 1);
    ll left = 1;
    for (int i = 0; i < n; i++) { out[i] = left; left *= nums[i]; }
    ll right = 1;
    for (int i = n - 1; i >= 0; i--) { out[i] *= right; right *= nums[i]; }
    return out;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> nums;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) nums.push_back(stoll(toks[1 + i]));
    cout << fmtVec(solve(nums)) << '\\n';
    return 0;
}
`,
  "dsa-rotate-array": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

string fmtVec(const vector<ll>& v) {
    string s;
    for (size_t i = 0; i < v.size(); i++) { if (i) s += ' '; s += to_string(v[i]); }
    return s;
}

vector<ll> solve(vector<ll> nums, ll k) {
    int n = (int)nums.size();
    if (n == 0) return nums;
    k %= n;
    if (k == 0) return nums;
    vector<ll> out;
    out.insert(out.end(), nums.end() - k, nums.end());
    out.insert(out.end(), nums.begin(), nums.end() - k);
    return out;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> nums;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) nums.push_back(stoll(toks[1 + i]));
    ll k = stoll(toks[1 + n]);
    cout << fmtVec(solve(nums, k)) << '\\n';
    return 0;
}
`,
  "dsa-move-zeroes": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

string fmtVec(const vector<ll>& v) {
    string s;
    for (size_t i = 0; i < v.size(); i++) { if (i) s += ' '; s += to_string(v[i]); }
    return s;
}

vector<ll> solve(vector<ll> nums) {
    int pos = 0;
    for (ll x : nums) if (x != 0) nums[pos++] = x;
    for (int i = pos; i < (int)nums.size(); i++) nums[i] = 0;
    return nums;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> nums;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) nums.push_back(stoll(toks[1 + i]));
    cout << fmtVec(solve(nums)) << '\\n';
    return 0;
}
`,
  "dsa-majority-element": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

ll solve(vector<ll> nums) {
    ll cand = 0;
    int count = 0;
    for (ll x : nums) {
        if (count == 0) { cand = x; count = 1; }
        else if (x == cand) count++;
        else count--;
    }
    return cand;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> nums;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) nums.push_back(stoll(toks[1 + i]));
    if (nums.empty()) { cout << '\\n'; return 0; }
    cout << solve(nums) << '\\n';
    return 0;
}
`,
  "dsa-missing-number": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

ll solve(vector<ll> nums) {
    ll n = (ll)nums.size();
    ll sum = 0;
    for (ll x : nums) sum += x;
    return n * (n + 1) / 2 - sum;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> nums;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) nums.push_back(stoll(toks[1 + i]));
    cout << solve(nums) << '\\n';
    return 0;
}
`,
  "dsa-find-duplicate-number": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

ll solve(vector<ll> nums) {
    int slow = (int)nums[0], fast = (int)nums[0];
    while (true) {
        slow = (int)nums[slow];
        fast = (int)nums[(int)nums[fast]];
        if (slow == fast) break;
    }
    slow = (int)nums[0];
    while (slow != fast) {
        slow = (int)nums[slow];
        fast = (int)nums[fast];
    }
    return slow;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> nums;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) nums.push_back(stoll(toks[1 + i]));
    cout << solve(nums) << '\\n';
    return 0;
}
`,
  "dsa-merge-sorted-array": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

string fmtVec(const vector<ll>& v) {
    string s;
    for (size_t i = 0; i < v.size(); i++) { if (i) s += ' '; s += to_string(v[i]); }
    return s;
}

vector<ll> solve(vector<ll> a, vector<ll> b) {
    vector<ll> out;
    size_t i = 0, j = 0;
    while (i < a.size() && j < b.size()) {
        if (a[i] <= b[j]) out.push_back(a[i++]);
        else out.push_back(b[j++]);
    }
    out.insert(out.end(), a.begin() + (long)i, a.end());
    out.insert(out.end(), b.begin() + (long)j, b.end());
    return out;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> a;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) a.push_back(stoll(toks[1 + i]));
    int m = stoi(toks[1 + n]);
    vector<ll> b;
    for (int i = 0; i < m && 2 + n + i < (int)toks.size(); i++) b.push_back(stoll(toks[2 + n + i]));
    cout << fmtVec(solve(a, b)) << '\\n';
    return 0;
}
`,
  "dsa-maximum-product-subarray": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

ll solve(vector<ll> nums) {
    ll best = nums[0], curMax = nums[0], curMin = nums[0];
    for (size_t i = 1; i < nums.size(); i++) {
        ll x = nums[i];
        if (x < 0) swap(curMax, curMin);
        curMax = max(x, curMax * x);
        curMin = min(x, curMin * x);
        best = max(best, curMax);
    }
    return best;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> nums;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) nums.push_back(stoll(toks[1 + i]));
    cout << solve(nums) << '\\n';
    return 0;
}
`,
  "dsa-trapping-rain-water": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

ll solve(vector<ll> height) {
    int left = 0, right = (int)height.size() - 1;
    ll leftMax = 0, rightMax = 0, water = 0;
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

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> nums;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) nums.push_back(stoll(toks[1 + i]));
    cout << solve(nums) << '\\n';
    return 0;
}
`,
  "dsa-jump-game": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

bool solve(vector<ll> nums) {
    ll reach = 0;
    for (int i = 0; i < (int)nums.size(); i++) {
        if (i > reach) return false;
        reach = max(reach, (ll)i + nums[i]);
    }
    return true;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> nums;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) nums.push_back(stoll(toks[1 + i]));
    cout << (solve(nums) ? "true" : "false") << '\\n';
    return 0;
}
`,
  "dsa-jump-game-ii": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

ll solve(vector<ll> nums) {
    ll jumps = 0, curEnd = 0, farthest = 0;
    for (int i = 0; i < (int)nums.size() - 1; i++) {
        farthest = max(farthest, (ll)i + nums[i]);
        if (i == curEnd) { jumps++; curEnd = farthest; }
    }
    return jumps;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> nums;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) nums.push_back(stoll(toks[1 + i]));
    cout << solve(nums) << '\\n';
    return 0;
}
`,
  "dsa-subarray-sum-equals-k": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

ll solve(vector<ll> nums, ll k) {
    unordered_map<ll, ll> counts;
    counts[0] = 1;
    ll prefix = 0, ans = 0;
    for (ll x : nums) {
        prefix += x;
        auto it = counts.find(prefix - k);
        if (it != counts.end()) ans += it->second;
        counts[prefix]++;
    }
    return ans;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> nums;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) nums.push_back(stoll(toks[1 + i]));
    ll k = stoll(toks[1 + n]);
    cout << solve(nums, k) << '\\n';
    return 0;
}
`,
  "dsa-sort-colors": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

string fmtVec(const vector<ll>& v) {
    string s;
    for (size_t i = 0; i < v.size(); i++) { if (i) s += ' '; s += to_string(v[i]); }
    return s;
}

vector<ll> solve(vector<ll> nums) {
    int low = 0, mid = 0, high = (int)nums.size() - 1;
    while (mid <= high) {
        if (nums[mid] == 0) { swap(nums[low], nums[mid]); low++; mid++; }
        else if (nums[mid] == 1) mid++;
        else { swap(nums[mid], nums[high]); high--; }
    }
    return nums;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> nums;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) nums.push_back(stoll(toks[1 + i]));
    cout << fmtVec(solve(nums)) << '\\n';
    return 0;
}
`,
  "dsa-first-missing-positive": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

ll solve(vector<ll> nums) {
    int n = (int)nums.size();
    for (int i = 0; i < n; i++) {
        while (nums[i] >= 1 && nums[i] <= n && nums[(int)nums[i] - 1] != nums[i])
            swap(nums[(int)nums[i] - 1], nums[i]);
    }
    for (int i = 0; i < n; i++) if (nums[i] != i + 1) return i + 1;
    return n + 1;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> nums;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) nums.push_back(stoll(toks[1 + i]));
    cout << solve(nums) << '\\n';
    return 0;
}
`,
  "dsa-valid-palindrome": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;

string trimStr(const string& s) {
    size_t a = s.find_first_not_of(" \\t\\r\\n\\f\\v");
    if (a == string::npos) return "";
    size_t b = s.find_last_not_of(" \\t\\r\\n\\f\\v");
    return s.substr(a, b - a + 1);
}

bool solve(const string& s) {
    string chars;
    for (unsigned char c : s)
        if (isalnum(c)) chars += (char)tolower(c);
    string rev = chars;
    reverse(rev.begin(), rev.end());
    return chars == rev;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string raw((istreambuf_iterator<char>(cin)), istreambuf_iterator<char>());
    string s = trimStr(raw);
    cout << (solve(s) ? "true" : "false") << '\\n';
    return 0;
}
`,
  "dsa-valid-anagram": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;

string trimStr(const string& s) {
    size_t a = s.find_first_not_of(" \\t\\r\\n\\f\\v");
    if (a == string::npos) return "";
    size_t b = s.find_last_not_of(" \\t\\r\\n\\f\\v");
    return s.substr(a, b - a + 1);
}

bool solve(string s, string t) {
    sort(s.begin(), s.end());
    sort(t.begin(), t.end());
    return s == t;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> lines;
    string line;
    while (getline(cin, line)) lines.push_back(line);
    string s1 = lines.size() > 0 ? trimStr(lines[0]) : "";
    string s2 = lines.size() > 1 ? trimStr(lines[1]) : "";
    cout << (solve(s1, s2) ? "true" : "false") << '\\n';
    return 0;
}
`,
  "dsa-longest-substring-without-repeating": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;

string trimStr(const string& s) {
    size_t a = s.find_first_not_of(" \\t\\r\\n\\f\\v");
    if (a == string::npos) return "";
    size_t b = s.find_last_not_of(" \\t\\r\\n\\f\\v");
    return s.substr(a, b - a + 1);
}

int solve(const string& s) {
    unordered_map<char, int> last;
    int best = 0, start = 0;
    for (int i = 0; i < (int)s.size(); i++) {
        auto it = last.find(s[i]);
        if (it != last.end() && it->second >= start) start = it->second + 1;
        last[s[i]] = i;
        best = max(best, i - start + 1);
    }
    return best;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string raw((istreambuf_iterator<char>(cin)), istreambuf_iterator<char>());
    string s = trimStr(raw);
    cout << solve(s) << '\\n';
    return 0;
}
`,
  "dsa-longest-palindromic-substring": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;

string trimStr(const string& s) {
    size_t a = s.find_first_not_of(" \\t\\r\\n\\f\\v");
    if (a == string::npos) return "";
    size_t b = s.find_last_not_of(" \\t\\r\\n\\f\\v");
    return s.substr(a, b - a + 1);
}

string expandStr(const string& s, int l, int r) {
    while (l >= 0 && r < (int)s.size() && s[l] == s[r]) { l--; r++; }
    return s.substr(l + 1, r - l - 1);
}

string solve(const string& s) {
    if (s.empty()) return "";
    string best = s.substr(0, 1);
    for (int i = 0; i < (int)s.size(); i++) {
        for (const string& cand : {expandStr(s, i, i), expandStr(s, i, i + 1)})
            if (cand.size() > best.size()) best = cand;
    }
    return best;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string raw((istreambuf_iterator<char>(cin)), istreambuf_iterator<char>());
    string s = trimStr(raw);
    cout << solve(s) << '\\n';
    return 0;
}
`,
  "dsa-group-anagrams": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;

string fmtRowsStr(const vector<vector<string>>& rows) {
    string s;
    for (size_t i = 0; i < rows.size(); i++) {
        if (i) s += '\\n';
        const auto& r = rows[i];
        if (r.empty()) continue;
        if (r[0].size() == 1) { for (const auto& w : r) s += w; }
        else { for (size_t j = 0; j < r.size(); j++) { if (j) s += ' '; s += r[j]; } }
    }
    return s;
}

vector<vector<string>> solve(vector<string> words) {
    vector<vector<string>> groups;
    unordered_map<string, int> idx;
    for (const string& w : words) {
        string key = w;
        sort(key.begin(), key.end());
        auto it = idx.find(key);
        if (it == idx.end()) {
            idx[key] = (int)groups.size();
            groups.push_back({w});
        } else groups[it->second].push_back(w);
    }
    for (auto& g : groups) sort(g.begin(), g.end());
    sort(groups.begin(), groups.end(), [](const vector<string>& a, const vector<string>& b) {
        return a[0] < b[0];
    });
    return groups;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<string> words;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) words.push_back(toks[1 + i]);
    cout << fmtRowsStr(solve(words)) << '\\n';
    return 0;
}
`,
  "dsa-valid-parentheses": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;

string trimStr(const string& s) {
    size_t a = s.find_first_not_of(" \\t\\r\\n\\f\\v");
    if (a == string::npos) return "";
    size_t b = s.find_last_not_of(" \\t\\r\\n\\f\\v");
    return s.substr(a, b - a + 1);
}

bool solve(const string& s) {
    unordered_map<char, char> pairs = {{')', '('}, {']', '['}, {'}', '{'}};
    vector<char> st;
    for (char c : s) {
        if (c == '(' || c == '[' || c == '{') st.push_back(c);
        else {
            auto it = pairs.find(c);
            if (it == pairs.end()) return false;
            if (st.empty() || st.back() != it->second) return false;
            st.pop_back();
        }
    }
    return st.empty();
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string raw((istreambuf_iterator<char>(cin)), istreambuf_iterator<char>());
    string s = trimStr(raw);
    cout << (solve(s) ? "true" : "false") << '\\n';
    return 0;
}
`,
  "dsa-string-to-integer-atoi": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

string trimStr(const string& s) {
    size_t a = s.find_first_not_of(" \\t\\r\\n\\f\\v");
    if (a == string::npos) return "";
    size_t b = s.find_last_not_of(" \\t\\r\\n\\f\\v");
    return s.substr(a, b - a + 1);
}

ll solve(const string& s) {
    size_t i = 0, n = s.size();
    while (i < n && s[i] == ' ') i++;
    ll sign = 1;
    if (i < n && (s[i] == '+' || s[i] == '-')) { sign = (s[i] == '-') ? -1 : 1; i++; }
    ll num = 0;
    while (i < n && isdigit((unsigned char)s[i])) {
        if (num > (LLONG_MAX - 9) / 10) { num = LLONG_MAX; break; }
        num = num * 10 + (s[i] - '0');
        i++;
    }
    num *= sign;
    return max((ll)INT32_MIN, min((ll)INT32_MAX, num));
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string raw((istreambuf_iterator<char>(cin)), istreambuf_iterator<char>());
    string s = trimStr(raw);
    cout << solve(s) << '\\n';
    return 0;
}
`,
  "dsa-longest-common-prefix": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;

string solve(vector<string> words) {
    if (words.empty()) return "";
    string prefix = words[0];
    for (size_t i = 1; i < words.size(); i++) {
        while (words[i].compare(0, prefix.size(), prefix) != 0) {
            prefix.pop_back();
            if (prefix.empty()) return "";
        }
    }
    return prefix;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<string> words;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) words.push_back(toks[1 + i]);
    cout << solve(words) << '\\n';
    return 0;
}
`,
  "dsa-reverse-words-in-string": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;

string trimStr(const string& s) {
    size_t a = s.find_first_not_of(" \\t\\r\\n\\f\\v");
    if (a == string::npos) return "";
    size_t b = s.find_last_not_of(" \\t\\r\\n\\f\\v");
    return s.substr(a, b - a + 1);
}

string solve(const string& s) {
    vector<string> words;
    stringstream ss(s);
    string w;
    while (ss >> w) words.push_back(w);
    reverse(words.begin(), words.end());
    string out;
    for (size_t i = 0; i < words.size(); i++) { if (i) out += ' '; out += words[i]; }
    return out;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string raw((istreambuf_iterator<char>(cin)), istreambuf_iterator<char>());
    string s = trimStr(raw);
    cout << solve(s) << '\\n';
    return 0;
}
`,
  "dsa-implement-strstr": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;

string trimStr(const string& s) {
    size_t a = s.find_first_not_of(" \\t\\r\\n\\f\\v");
    if (a == string::npos) return "";
    size_t b = s.find_last_not_of(" \\t\\r\\n\\f\\v");
    return s.substr(a, b - a + 1);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> lines;
    string line;
    while (getline(cin, line)) lines.push_back(line);
    string s1 = lines.size() > 0 ? trimStr(lines[0]) : "";
    string s2 = lines.size() > 1 ? trimStr(lines[1]) : "";
    size_t pos = s1.find(s2);
    cout << (pos == string::npos ? -1 : (int)pos) << '\\n';
    return 0;
}
`,
  "dsa-count-and-say": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;

string solve(int n) {
    string cur = "1";
    for (int k = 0; k < n - 1; k++) {
        string nxt;
        size_t i = 0;
        while (i < cur.size()) {
            size_t j = i;
            while (j < cur.size() && cur[j] == cur[i]) j++;
            nxt += to_string(j - i);
            nxt += cur[i];
            i = j;
        }
        cur = nxt;
    }
    return cur;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    cout << solve(n) << '\\n';
    return 0;
}
`,
  "dsa-zigzag-conversion": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;

string trimStr(const string& s) {
    size_t a = s.find_first_not_of(" \\t\\r\\n\\f\\v");
    if (a == string::npos) return "";
    size_t b = s.find_last_not_of(" \\t\\r\\n\\f\\v");
    return s.substr(a, b - a + 1);
}

string solve(const string& s, int k) {
    if (k <= 1 || k >= (int)s.size()) return s;
    vector<string> rows(k);
    int r = 0, step = 1;
    for (char c : s) {
        rows[r] += c;
        if (r == 0) step = 1;
        else if (r == k - 1) step = -1;
        r += step;
    }
    string out;
    for (auto& row : rows) out += row;
    return out;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> lines;
    string line;
    while (getline(cin, line)) lines.push_back(line);
    string s = lines.size() > 0 ? trimStr(lines[0]) : "";
    int k = lines.size() > 1 ? stoi(trimStr(lines[1])) : 0;
    cout << solve(s, k) << '\\n';
    return 0;
}
`,
  "dsa-minimum-window-substring": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;

string trimStr(const string& s) {
    size_t a = s.find_first_not_of(" \\t\\r\\n\\f\\v");
    if (a == string::npos) return "";
    size_t b = s.find_last_not_of(" \\t\\r\\n\\f\\v");
    return s.substr(a, b - a + 1);
}

string solve(const string& s, const string& t) {
    unordered_map<char, int> need;
    for (char c : t) need[c]++;
    int missing = (int)t.size(), left = 0;
    string best;
    for (int right = 0; right < (int)s.size(); right++) {
        char c = s[right];
        if (need[c] > 0) missing--;
        need[c]--;
        while (missing == 0) {
            if (best.empty() || right - left + 1 < (int)best.size())
                best = s.substr(left, right - left + 1);
            need[s[left]]++;
            if (need[s[left]] > 0) missing++;
            left++;
        }
    }
    return best;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> lines;
    string line;
    while (getline(cin, line)) lines.push_back(line);
    string s1 = lines.size() > 0 ? trimStr(lines[0]) : "";
    string s2 = lines.size() > 1 ? trimStr(lines[1]) : "";
    cout << solve(s1, s2) << '\\n';
    return 0;
}
`,
  "dsa-longest-repeating-character-replacement": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;

string trimStr(const string& s) {
    size_t a = s.find_first_not_of(" \\t\\r\\n\\f\\v");
    if (a == string::npos) return "";
    size_t b = s.find_last_not_of(" \\t\\r\\n\\f\\v");
    return s.substr(a, b - a + 1);
}

int solve(const string& s, int k) {
    unordered_map<char, int> counts;
    int best = 0, left = 0;
    for (int right = 0; right < (int)s.size(); right++) {
        counts[s[right]]++;
        auto maxFreq = [&]() {
            int m = 0;
            for (auto& kv : counts) m = max(m, kv.second);
            return m;
        };
        while ((right - left + 1) - maxFreq() > k) {
            counts[s[left]]--;
            left++;
        }
        best = max(best, right - left + 1);
    }
    return best;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> lines;
    string line;
    while (getline(cin, line)) lines.push_back(line);
    string s = lines.size() > 0 ? trimStr(lines[0]) : "";
    int k = lines.size() > 1 ? stoi(trimStr(lines[1])) : 0;
    cout << solve(s, k) << '\\n';
    return 0;
}
`,
  "dsa-first-unique-character": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;

string trimStr(const string& s) {
    size_t a = s.find_first_not_of(" \\t\\r\\n\\f\\v");
    if (a == string::npos) return "";
    size_t b = s.find_last_not_of(" \\t\\r\\n\\f\\v");
    return s.substr(a, b - a + 1);
}

int solve(const string& s) {
    unordered_map<char, int> counts;
    for (char c : s) counts[c]++;
    for (int i = 0; i < (int)s.size(); i++)
        if (counts[s[i]] == 1) return i;
    return -1;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string raw((istreambuf_iterator<char>(cin)), istreambuf_iterator<char>());
    string s = trimStr(raw);
    cout << solve(s) << '\\n';
    return 0;
}
`,
  "dsa-intersection-of-two-arrays": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

string fmtVec(const vector<ll>& v) {
    string s;
    for (size_t i = 0; i < v.size(); i++) { if (i) s += ' '; s += to_string(v[i]); }
    return s;
}

vector<ll> solve(vector<ll> a, vector<ll> b) {
    unordered_set<ll> sa(a.begin(), a.end()), sb(b.begin(), b.end());
    vector<ll> out;
    for (ll x : sa) if (sb.count(x)) out.push_back(x);
    sort(out.begin(), out.end());
    return out;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> a;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) a.push_back(stoll(toks[1 + i]));
    int m = stoi(toks[1 + n]);
    vector<ll> b;
    for (int i = 0; i < m && 2 + n + i < (int)toks.size(); i++) b.push_back(stoll(toks[2 + n + i]));
    cout << fmtVec(solve(a, b)) << '\\n';
    return 0;
}
`,
  "dsa-happy-number": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

bool solve(ll n) {
    unordered_set<ll> seen;
    while (n != 1 && !seen.count(n)) {
        seen.insert(n);
        ll sum = 0;
        for (char d : to_string(n)) { ll x = d - '0'; sum += x * x; }
        n = sum;
    }
    return n == 1;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    ll n = stoll(toks[0]);
    cout << (solve(n) ? "true" : "false") << '\\n';
    return 0;
}
`,
  "dsa-isomorphic-strings": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;

string trimStr(const string& s) {
    size_t a = s.find_first_not_of(" \\t\\r\\n\\f\\v");
    if (a == string::npos) return "";
    size_t b = s.find_last_not_of(" \\t\\r\\n\\f\\v");
    return s.substr(a, b - a + 1);
}

bool solve(const string& s, const string& t) {
    if (s.size() != t.size()) return false;
    unordered_map<char, char> m1, m2;
    for (size_t i = 0; i < s.size(); i++) {
        char a = s[i], b = t[i];
        auto it1 = m1.find(a);
        if (it1 != m1.end() && it1->second != b) return false;
        auto it2 = m2.find(b);
        if (it2 != m2.end() && it2->second != a) return false;
        m1[a] = b;
        m2[b] = a;
    }
    return true;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> lines;
    string line;
    while (getline(cin, line)) lines.push_back(line);
    string s1 = lines.size() > 0 ? trimStr(lines[0]) : "";
    string s2 = lines.size() > 1 ? trimStr(lines[1]) : "";
    cout << (solve(s1, s2) ? "true" : "false") << '\\n';
    return 0;
}
`,
  "dsa-word-pattern": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;

string trimStr(const string& s) {
    size_t a = s.find_first_not_of(" \\t\\r\\n\\f\\v");
    if (a == string::npos) return "";
    size_t b = s.find_last_not_of(" \\t\\r\\n\\f\\v");
    return s.substr(a, b - a + 1);
}

bool solve(const string& pattern, const string& s) {
    vector<string> words;
    stringstream ss(s);
    string w;
    while (ss >> w) words.push_back(w);
    if (words.size() != pattern.size()) return false;
    unordered_map<char, string> p2w;
    unordered_map<string, char> w2p;
    for (size_t i = 0; i < pattern.size(); i++) {
        char p = pattern[i];
        const string& word = words[i];
        auto it1 = p2w.find(p);
        if (it1 != p2w.end() && it1->second != word) return false;
        auto it2 = w2p.find(word);
        if (it2 != w2p.end() && it2->second != p) return false;
        p2w[p] = word;
        w2p[word] = p;
    }
    return true;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> lines;
    string line;
    while (getline(cin, line)) lines.push_back(line);
    string s1 = lines.size() > 0 ? trimStr(lines[0]) : "";
    string s2 = lines.size() > 1 ? trimStr(lines[1]) : "";
    cout << (solve(s1, s2) ? "true" : "false") << '\\n';
    return 0;
}
`,
  "dsa-ransom-note": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;

string trimStr(const string& s) {
    size_t a = s.find_first_not_of(" \\t\\r\\n\\f\\v");
    if (a == string::npos) return "";
    size_t b = s.find_last_not_of(" \\t\\r\\n\\f\\v");
    return s.substr(a, b - a + 1);
}

bool solve(const string& note, const string& magazine) {
    unordered_map<char, int> need, have;
    for (char c : note) need[c]++;
    for (char c : magazine) have[c]++;
    for (auto& kv : need) if (have[kv.first] < kv.second) return false;
    return true;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> lines;
    string line;
    while (getline(cin, line)) lines.push_back(line);
    string s1 = lines.size() > 0 ? trimStr(lines[0]) : "";
    string s2 = lines.size() > 1 ? trimStr(lines[1]) : "";
    cout << (solve(s1, s2) ? "true" : "false") << '\\n';
    return 0;
}
`,
  "dsa-longest-consecutive-sequence": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

int solve(vector<ll> nums) {
    unordered_set<ll> s(nums.begin(), nums.end());
    int best = 0;
    for (ll x : s) {
        if (!s.count(x - 1)) {
            ll cur = x;
            int length = 1;
            while (s.count(cur + 1)) { cur++; length++; }
            best = max(best, length);
        }
    }
    return best;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> nums;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) nums.push_back(stoll(toks[1 + i]));
    cout << solve(nums) << '\\n';
    return 0;
}
`,
  "dsa-top-k-frequent-elements": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

string fmtVec(const vector<ll>& v) {
    string s;
    for (size_t i = 0; i < v.size(); i++) { if (i) s += ' '; s += to_string(v[i]); }
    return s;
}

vector<ll> solve(vector<ll> nums, int k) {
    unordered_map<ll, int> counts;
    for (ll x : nums) counts[x]++;
    vector<pair<ll, int>> ranked(counts.begin(), counts.end());
    sort(ranked.begin(), ranked.end(), [](const pair<ll, int>& a, const pair<ll, int>& b) {
        if (a.second != b.second) return a.second > b.second;
        return a.first > b.first;
    });
    vector<ll> out;
    for (int i = 0; i < k && i < (int)ranked.size(); i++) out.push_back(ranked[i].first);
    return out;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> nums;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) nums.push_back(stoll(toks[1 + i]));
    int k = stoi(toks[1 + n]);
    cout << fmtVec(solve(nums, k)) << '\\n';
    return 0;
}
`,
  "dsa-valid-sudoku": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;

string trimStr(const string& s) {
    size_t a = s.find_first_not_of(" \\t\\r\\n\\f\\v");
    if (a == string::npos) return "";
    size_t b = s.find_last_not_of(" \\t\\r\\n\\f\\v");
    return s.substr(a, b - a + 1);
}

bool solve(const vector<string>& grid) {
    bool rows[9][9] = {}, cols[9][9] = {}, boxes[9][9] = {};
    for (int i = 0; i < 9; i++) {
        for (int j = 0; j < 9; j++) {
            char v = grid[i][j];
            if (v == '.') continue;
            int d = v - '1';
            int b = (i / 3) * 3 + j / 3;
            if (rows[i][d] || cols[j][d] || boxes[b][d]) return false;
            rows[i][d] = cols[j][d] = boxes[b][d] = true;
        }
    }
    return true;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> lines;
    string line;
    while (getline(cin, line)) lines.push_back(line);
    int r = 9, c = 9;
    if (!lines.empty()) { stringstream ss(lines[0]); ss >> r >> c; }
    vector<string> grid;
    for (int i = 0; i < r && 1 + i < (int)lines.size(); i++) {
        string row;
        for (char ch : lines[1 + i]) if (ch != ' ') row += ch;
        grid.push_back(row);
    }
    cout << (solve(grid) ? "true" : "false") << '\\n';
    return 0;
}
`,
  "dsa-contains-duplicate-ii": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

bool solve(vector<ll> nums, ll k) {
    unordered_map<ll, int> last;
    for (int i = 0; i < (int)nums.size(); i++) {
        auto it = last.find(nums[i]);
        if (it != last.end() && i - it->second <= k) return true;
        last[nums[i]] = i;
    }
    return false;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> nums;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) nums.push_back(stoll(toks[1 + i]));
    ll k = stoll(toks[1 + n]);
    cout << (solve(nums, k) ? "true" : "false") << '\\n';
    return 0;
}
`,
  "dsa-subarray-sum-divisible-by-k": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

ll solve(vector<ll> nums, ll k) {
    unordered_map<ll, ll> counts;
    counts[0] = 1;
    ll prefix = 0, ans = 0;
    for (ll x : nums) {
        prefix = ((prefix + x) % k + k) % k;
        auto it = counts.find(prefix);
        if (it != counts.end()) ans += it->second;
        counts[prefix]++;
    }
    return ans;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> nums;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) nums.push_back(stoll(toks[1 + i]));
    ll k = stoll(toks[1 + n]);
    cout << solve(nums, k) << '\\n';
    return 0;
}
`,
  "dsa-find-all-anagrams-in-string": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

string trimStr(const string& s) {
    size_t a = s.find_first_not_of(" \\t\\r\\n\\f\\v");
    if (a == string::npos) return "";
    size_t b = s.find_last_not_of(" \\t\\r\\n\\f\\v");
    return s.substr(a, b - a + 1);
}

string fmtVec(const vector<ll>& v) {
    string s;
    for (size_t i = 0; i < v.size(); i++) { if (i) s += ' '; s += to_string(v[i]); }
    return s;
}

vector<ll> solve(const string& s, const string& p) {
    unordered_map<char, int> need, window;
    for (char c : p) need[c]++;
    vector<ll> out;
    int m = (int)p.size();
    for (int i = 0; i < (int)s.size(); i++) {
        char c = s[i];
        window[c]++;
        if (i >= m) {
            char left = s[i - m];
            if (--window[left] == 0) window.erase(left);
        }
        if (window == need) out.push_back(i - m + 1);
    }
    return out;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> lines;
    string line;
    while (getline(cin, line)) lines.push_back(line);
    string s1 = lines.size() > 0 ? trimStr(lines[0]) : "";
    string s2 = lines.size() > 1 ? trimStr(lines[1]) : "";
    cout << fmtVec(solve(s1, s2)) << '\\n';
    return 0;
}
`,
  "dsa-two-sum-ii": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

string fmtVec(const vector<ll>& v) {
    string s;
    for (size_t i = 0; i < v.size(); i++) { if (i) s += ' '; s += to_string(v[i]); }
    return s;
}

vector<ll> solve(vector<ll> nums, ll target) {
    int left = 0, right = (int)nums.size() - 1;
    while (left < right) {
        ll total = nums[left] + nums[right];
        if (total == target) return {left + 1, right + 1};
        if (total < target) left++;
        else right--;
    }
    return {-1, -1};
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> nums;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) nums.push_back(stoll(toks[1 + i]));
    ll target = stoll(toks[1 + n]);
    cout << fmtVec(solve(nums, target)) << '\\n';
    return 0;
}
`,
  "dsa-container-with-most-water": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

ll solve(vector<ll> height) {
    int left = 0, right = (int)height.size() - 1;
    ll best = 0;
    while (left < right) {
        ll area = min(height[left], height[right]) * (right - left);
        best = max(best, area);
        if (height[left] < height[right]) left++;
        else right--;
    }
    return best;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> nums;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) nums.push_back(stoll(toks[1 + i]));
    cout << solve(nums) << '\\n';
    return 0;
}
`,
  "dsa-three-sum": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

string fmtRows(const vector<vector<ll>>& rows) {
    string s;
    for (size_t i = 0; i < rows.size(); i++) {
        if (i) s += '\\n';
        for (size_t j = 0; j < rows[i].size(); j++) { if (j) s += ' '; s += to_string(rows[i][j]); }
    }
    return s;
}

vector<vector<ll>> solve(vector<ll> nums) {
    sort(nums.begin(), nums.end());
    vector<vector<ll>> out;
    int n = (int)nums.size();
    for (int i = 0; i < n - 2; i++) {
        if (i > 0 && nums[i] == nums[i - 1]) continue;
        int left = i + 1, right = n - 1;
        while (left < right) {
            ll total = nums[i] + nums[left] + nums[right];
            if (total == 0) {
                out.push_back({nums[i], nums[left], nums[right]});
                left++; right--;
                while (left < right && nums[left] == nums[left - 1]) left++;
                while (left < right && nums[right] == nums[right + 1]) right--;
            } else if (total < 0) left++;
            else right--;
        }
    }
    return out;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> nums;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) nums.push_back(stoll(toks[1 + i]));
    cout << fmtRows(solve(nums)) << '\\n';
    return 0;
}
`,
  "dsa-remove-duplicates-sorted": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

string fmtVec(const vector<ll>& v) {
    string s;
    for (size_t i = 0; i < v.size(); i++) { if (i) s += ' '; s += to_string(v[i]); }
    return s;
}

vector<ll> solve(vector<ll> nums) {
    if (nums.empty()) return nums;
    int write = 1;
    for (int i = 1; i < (int)nums.size(); i++) {
        if (nums[i] != nums[write - 1]) { nums[write] = nums[i]; write++; }
    }
    nums.resize(write);
    return nums;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> nums;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) nums.push_back(stoll(toks[1 + i]));
    cout << fmtVec(solve(nums)) << '\\n';
    return 0;
}
`,
  "dsa-squares-of-sorted-array": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

string fmtVec(const vector<ll>& v) {
    string s;
    for (size_t i = 0; i < v.size(); i++) { if (i) s += ' '; s += to_string(v[i]); }
    return s;
}

vector<ll> solve(vector<ll> nums) {
    int n = (int)nums.size();
    vector<ll> out(n, 0);
    int left = 0, right = n - 1, pos = n - 1;
    while (left <= right) {
        if (llabs(nums[left]) > llabs(nums[right])) { out[pos] = nums[left] * nums[left]; left++; }
        else { out[pos] = nums[right] * nums[right]; right--; }
        pos--;
    }
    return out;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> nums;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) nums.push_back(stoll(toks[1 + i]));
    cout << fmtVec(solve(nums)) << '\\n';
    return 0;
}
`,
  "dsa-valid-palindrome-ii": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;

string trimStr(const string& s) {
    size_t a = s.find_first_not_of(" \\t\\r\\n\\f\\v");
    if (a == string::npos) return "";
    size_t b = s.find_last_not_of(" \\t\\r\\n\\f\\v");
    return s.substr(a, b - a + 1);
}

bool isPal(const string& s, int l, int r) {
    while (l < r) {
        if (s[l] != s[r]) return false;
        l++; r--;
    }
    return true;
}

bool solve(const string& s) {
    int left = 0, right = (int)s.size() - 1;
    while (left < right) {
        if (s[left] != s[right])
            return isPal(s, left + 1, right) || isPal(s, left, right - 1);
        left++; right--;
    }
    return true;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string raw((istreambuf_iterator<char>(cin)), istreambuf_iterator<char>());
    string s = trimStr(raw);
    cout << (solve(s) ? "true" : "false") << '\\n';
    return 0;
}
`,
  "dsa-three-sum-closest": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

ll solve(vector<ll> nums, ll target) {
    sort(nums.begin(), nums.end());
    ll best = nums[0] + nums[1] + nums[2];
    int n = (int)nums.size();
    for (int i = 0; i < n - 2; i++) {
        int left = i + 1, right = n - 1;
        while (left < right) {
            ll total = nums[i] + nums[left] + nums[right];
            if (llabs(total - target) < llabs(best - target)) best = total;
            if (total < target) left++;
            else if (total > target) right--;
            else return total;
        }
    }
    return best;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> nums;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) nums.push_back(stoll(toks[1 + i]));
    ll target = stoll(toks[1 + n]);
    cout << solve(nums, target) << '\\n';
    return 0;
}
`,
  "dsa-four-sum": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

string fmtRows(const vector<vector<ll>>& rows) {
    string s;
    for (size_t i = 0; i < rows.size(); i++) {
        if (i) s += '\\n';
        for (size_t j = 0; j < rows[i].size(); j++) { if (j) s += ' '; s += to_string(rows[i][j]); }
    }
    return s;
}

vector<vector<ll>> solve(vector<ll> nums, ll target) {
    sort(nums.begin(), nums.end());
    vector<vector<ll>> out;
    int n = (int)nums.size();
    for (int i = 0; i < n - 3; i++) {
        if (i > 0 && nums[i] == nums[i - 1]) continue;
        for (int j = i + 1; j < n - 2; j++) {
            if (j > i + 1 && nums[j] == nums[j - 1]) continue;
            int left = j + 1, right = n - 1;
            while (left < right) {
                ll total = nums[i] + nums[j] + nums[left] + nums[right];
                if (total == target) {
                    out.push_back({nums[i], nums[j], nums[left], nums[right]});
                    left++; right--;
                    while (left < right && nums[left] == nums[left - 1]) left++;
                    while (left < right && nums[right] == nums[right + 1]) right--;
                } else if (total < target) left++;
                else right--;
            }
        }
    }
    return out;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> nums;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) nums.push_back(stoll(toks[1 + i]));
    ll target = stoll(toks[1 + n]);
    cout << fmtRows(solve(nums, target)) << '\\n';
    return 0;
}
`,
  "dsa-sort-array-by-parity": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

string fmtVec(const vector<ll>& v) {
    string s;
    for (size_t i = 0; i < v.size(); i++) { if (i) s += ' '; s += to_string(v[i]); }
    return s;
}

vector<ll> solve(vector<ll> nums) {
    vector<ll> evens, odds;
    for (ll x : nums) (x % 2 == 0 ? evens : odds).push_back(x);
    evens.insert(evens.end(), odds.begin(), odds.end());
    return evens;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> nums;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) nums.push_back(stoll(toks[1 + i]));
    cout << fmtVec(solve(nums)) << '\\n';
    return 0;
}
`,
  "dsa-remove-element": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

string fmtVec(const vector<ll>& v) {
    string s;
    for (size_t i = 0; i < v.size(); i++) { if (i) s += ' '; s += to_string(v[i]); }
    return s;
}

vector<ll> solve(vector<ll> nums, ll val) {
    int write = 0;
    for (ll x : nums) if (x != val) nums[write++] = x;
    nums.resize(write);
    return nums;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> nums;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) nums.push_back(stoll(toks[1 + i]));
    ll k = stoll(toks[1 + n]);
    cout << fmtVec(solve(nums, k)) << '\\n';
    return 0;
}
`,
  "dsa-max-sum-subarray-size-k": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

ll solve(vector<ll> nums, int k) {
    ll window = 0;
    for (int i = 0; i < k && i < (int)nums.size(); i++) window += nums[i];
    ll best = window;
    for (int i = k; i < (int)nums.size(); i++) {
        window += nums[i] - nums[i - k];
        best = max(best, window);
    }
    return best;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> nums;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) nums.push_back(stoll(toks[1 + i]));
    int k = stoi(toks[1 + n]);
    cout << solve(nums, k) << '\\n';
    return 0;
}
`,
  "dsa-longest-substring-k-distinct": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;

string trimStr(const string& s) {
    size_t a = s.find_first_not_of(" \\t\\r\\n\\f\\v");
    if (a == string::npos) return "";
    size_t b = s.find_last_not_of(" \\t\\r\\n\\f\\v");
    return s.substr(a, b - a + 1);
}

int solve(const string& s, int k) {
    unordered_map<char, int> counts;
    int best = 0, left = 0;
    for (int right = 0; right < (int)s.size(); right++) {
        counts[s[right]]++;
        while ((int)counts.size() > k) {
            if (--counts[s[left]] == 0) counts.erase(s[left]);
            left++;
        }
        best = max(best, right - left + 1);
    }
    return best;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> lines;
    string line;
    while (getline(cin, line)) lines.push_back(line);
    string s = lines.size() > 0 ? trimStr(lines[0]) : "";
    int k = lines.size() > 1 ? stoi(trimStr(lines[1])) : 0;
    cout << solve(s, k) << '\\n';
    return 0;
}
`,
  "dsa-minimum-size-subarray-sum": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

ll solve(vector<ll> nums, ll target) {
    ll best = LLONG_MAX;
    int left = 0;
    ll total = 0;
    for (int right = 0; right < (int)nums.size(); right++) {
        total += nums[right];
        while (total >= target) {
            best = min(best, (ll)(right - left + 1));
            total -= nums[left];
            left++;
        }
    }
    return best == LLONG_MAX ? 0 : best;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> nums;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) nums.push_back(stoll(toks[1 + i]));
    ll target = stoll(toks[1 + n]);
    cout << solve(nums, target) << '\\n';
    return 0;
}
`,
  "dsa-permutation-in-string": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;

string trimStr(const string& s) {
    size_t a = s.find_first_not_of(" \\t\\r\\n\\f\\v");
    if (a == string::npos) return "";
    size_t b = s.find_last_not_of(" \\t\\r\\n\\f\\v");
    return s.substr(a, b - a + 1);
}

bool solve(const string& s1, const string& s2) {
    unordered_map<char, int> need, window;
    for (char c : s1) need[c]++;
    int k = (int)s1.size();
    for (int i = 0; i < (int)s2.size(); i++) {
        char c = s2[i];
        window[c]++;
        if (i >= k) {
            char left = s2[i - k];
            if (--window[left] == 0) window.erase(left);
        }
        if (window == need) return true;
    }
    return false;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> lines;
    string line;
    while (getline(cin, line)) lines.push_back(line);
    string s1 = lines.size() > 0 ? trimStr(lines[0]) : "";
    string s2 = lines.size() > 1 ? trimStr(lines[1]) : "";
    cout << (solve(s1, s2) ? "true" : "false") << '\\n';
    return 0;
}
`,
  "dsa-fruits-into-baskets": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

int solve(vector<ll> fruits) {
    unordered_map<ll, int> counts;
    int best = 0, left = 0;
    for (int right = 0; right < (int)fruits.size(); right++) {
        counts[fruits[right]]++;
        while (counts.size() > 2) {
            if (--counts[fruits[left]] == 0) counts.erase(fruits[left]);
            left++;
        }
        best = max(best, right - left + 1);
    }
    return best;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> nums;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) nums.push_back(stoll(toks[1 + i]));
    cout << solve(nums) << '\\n';
    return 0;
}
`,
  "dsa-maximum-vowels-in-substring": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;

string trimStr(const string& s) {
    size_t a = s.find_first_not_of(" \\t\\r\\n\\f\\v");
    if (a == string::npos) return "";
    size_t b = s.find_last_not_of(" \\t\\r\\n\\f\\v");
    return s.substr(a, b - a + 1);
}

bool isVowel(char c) {
    return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u';
}

int solve(const string& s, int k) {
    int n = (int)s.size();
    int window = 0;
    for (int i = 0; i < k && i < n; i++) if (isVowel(s[i])) window++;
    int best = window;
    for (int i = k; i < n; i++) {
        if (isVowel(s[i])) window++;
        if (isVowel(s[i - k])) window--;
        best = max(best, window);
    }
    return best;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> lines;
    string line;
    while (getline(cin, line)) lines.push_back(line);
    string s = lines.size() > 0 ? trimStr(lines[0]) : "";
    int k = lines.size() > 1 ? stoi(trimStr(lines[1])) : 0;
    cout << solve(s, k) << '\\n';
    return 0;
}
`,
  "dsa-sliding-window-maximum": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

string fmtVec(const vector<ll>& v) {
    string s;
    for (size_t i = 0; i < v.size(); i++) { if (i) s += ' '; s += to_string(v[i]); }
    return s;
}

vector<ll> solve(vector<ll> nums, int k) {
    deque<int> dq;
    vector<ll> out;
    for (int i = 0; i < (int)nums.size(); i++) {
        while (!dq.empty() && nums[dq.back()] <= nums[i]) dq.pop_back();
        dq.push_back(i);
        if (dq.front() <= i - k) dq.pop_front();
        if (i >= k - 1) out.push_back(nums[dq.front()]);
    }
    return out;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> nums;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) nums.push_back(stoll(toks[1 + i]));
    int k = stoi(toks[1 + n]);
    cout << fmtVec(solve(nums, k)) << '\\n';
    return 0;
}
`,
  "dsa-binary-subarrays-with-sum": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

ll solve(vector<ll> nums, ll goal) {
    unordered_map<ll, ll> counts;
    counts[0] = 1;
    ll prefix = 0, ans = 0;
    for (ll x : nums) {
        prefix += x;
        auto it = counts.find(prefix - goal);
        if (it != counts.end()) ans += it->second;
        counts[prefix]++;
    }
    return ans;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> nums;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) nums.push_back(stoll(toks[1 + i]));
    ll k = stoll(toks[1 + n]);
    cout << solve(nums, k) << '\\n';
    return 0;
}
`,
  "dsa-longest-subarray-of-ones-after-deleting-one": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

int solve(vector<ll> nums) {
    int best = 0, left = 0, zeros = 0;
    for (int right = 0; right < (int)nums.size(); right++) {
        if (nums[right] == 0) zeros++;
        while (zeros > 1) {
            if (nums[left] == 0) zeros--;
            left++;
        }
        best = max(best, right - left);
    }
    return best;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> nums;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) nums.push_back(stoll(toks[1 + i]));
    cout << solve(nums) << '\\n';
    return 0;
}
`,
  "dsa-max-consecutive-ones-iii": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

int solve(vector<ll> nums, int k) {
    int best = 0, left = 0, zeros = 0;
    for (int right = 0; right < (int)nums.size(); right++) {
        if (nums[right] == 0) zeros++;
        while (zeros > k) {
            if (nums[left] == 0) zeros--;
            left++;
        }
        best = max(best, right - left + 1);
    }
    return best;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> nums;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) nums.push_back(stoll(toks[1 + i]));
    int k = stoi(toks[1 + n]);
    cout << solve(nums, k) << '\\n';
    return 0;
}
`,
  "dsa-evaluate-reverse-polish-notation": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

ll solve(vector<string> tokens) {
    vector<ll> st;
    for (const string& t : tokens) {
        if (t.size() == 1 && (t[0] == '+' || t[0] == '-' || t[0] == '*' || t[0] == '/')) {
            ll b = st.back(); st.pop_back();
            ll a = st.back(); st.pop_back();
            if (t[0] == '+') st.push_back(a + b);
            else if (t[0] == '-') st.push_back(a - b);
            else if (t[0] == '*') st.push_back(a * b);
            else st.push_back(a / b);
        } else {
            st.push_back(stoll(t));
        }
    }
    return st[0];
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<string> words;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) words.push_back(toks[1 + i]);
    cout << solve(words) << '\\n';
    return 0;
}
`,
  "dsa-daily-temperatures": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

string fmtVec(const vector<ll>& v) {
    string s;
    for (size_t i = 0; i < v.size(); i++) { if (i) s += ' '; s += to_string(v[i]); }
    return s;
}

vector<ll> solve(vector<ll> temps) {
    int n = (int)temps.size();
    vector<ll> out(n, 0);
    vector<int> st;
    for (int i = 0; i < n; i++) {
        while (!st.empty() && temps[st.back()] < temps[i]) {
            int j = st.back(); st.pop_back();
            out[j] = i - j;
        }
        st.push_back(i);
    }
    return out;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> nums;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) nums.push_back(stoll(toks[1 + i]));
    cout << fmtVec(solve(nums)) << '\\n';
    return 0;
}
`,
  "dsa-next-greater-element-i": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

string fmtVec(const vector<ll>& v) {
    string s;
    for (size_t i = 0; i < v.size(); i++) { if (i) s += ' '; s += to_string(v[i]); }
    return s;
}

vector<ll> solve(vector<ll> a, vector<ll> b) {
    unordered_map<ll, ll> nxt;
    vector<ll> st;
    for (ll x : b) {
        while (!st.empty() && st.back() < x) { nxt[st.back()] = x; st.pop_back(); }
        st.push_back(x);
    }
    while (!st.empty()) { nxt[st.back()] = -1; st.pop_back(); }
    vector<ll> out;
    for (ll x : a) out.push_back(nxt[x]);
    return out;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> a;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) a.push_back(stoll(toks[1 + i]));
    int m = stoi(toks[1 + n]);
    vector<ll> b;
    for (int i = 0; i < m && 2 + n + i < (int)toks.size(); i++) b.push_back(stoll(toks[2 + n + i]));
    cout << fmtVec(solve(a, b)) << '\\n';
    return 0;
}
`,
  "dsa-largest-rectangle-in-histogram": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

ll solve(vector<ll> heights) {
    vector<int> st;
    ll best = 0;
    vector<ll> h = heights;
    h.push_back(0);
    for (int i = 0; i < (int)h.size(); i++) {
        while (!st.empty() && h[st.back()] > h[i]) {
            ll height = h[st.back()]; st.pop_back();
            int left = st.empty() ? -1 : st.back();
            best = max(best, height * (i - left - 1));
        }
        st.push_back(i);
    }
    return best;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> nums;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) nums.push_back(stoll(toks[1 + i]));
    cout << solve(nums) << '\\n';
    return 0;
}
`,
  "dsa-simplify-path": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;

string trimStr(const string& s) {
    size_t a = s.find_first_not_of(" \\t\\r\\n\\f\\v");
    if (a == string::npos) return "";
    size_t b = s.find_last_not_of(" \\t\\r\\n\\f\\v");
    return s.substr(a, b - a + 1);
}

string solve(const string& path) {
    vector<string> st;
    stringstream ss(path);
    string part;
    while (getline(ss, part, '/')) {
        if (part.empty() || part == ".") continue;
        if (part == "..") { if (!st.empty()) st.pop_back(); }
        else st.push_back(part);
    }
    string out = "/";
    for (size_t i = 0; i < st.size(); i++) { if (i) out += '/'; out += st[i]; }
    return out;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string raw((istreambuf_iterator<char>(cin)), istreambuf_iterator<char>());
    string s = trimStr(raw);
    cout << solve(s) << '\\n';
    return 0;
}
`,
  "dsa-decode-string": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;

string trimStr(const string& s) {
    size_t a = s.find_first_not_of(" \\t\\r\\n\\f\\v");
    if (a == string::npos) return "";
    size_t b = s.find_last_not_of(" \\t\\r\\n\\f\\v");
    return s.substr(a, b - a + 1);
}

string solve(const string& s) {
    vector<pair<string, int>> st;
    string cur;
    int num = 0;
    for (char c : s) {
        if (isdigit((unsigned char)c)) num = num * 10 + (c - '0');
        else if (c == '[') { st.push_back({cur, num}); cur.clear(); num = 0; }
        else if (c == ']') {
            auto [prev, k] = st.back(); st.pop_back();
            string rep;
            for (int i = 0; i < k; i++) rep += cur;
            cur = prev + rep;
        } else cur += c;
    }
    return cur;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string raw((istreambuf_iterator<char>(cin)), istreambuf_iterator<char>());
    string s = trimStr(raw);
    cout << solve(s) << '\\n';
    return 0;
}
`,
  "dsa-remove-duplicate-letters": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;

string trimStr(const string& s) {
    size_t a = s.find_first_not_of(" \\t\\r\\n\\f\\v");
    if (a == string::npos) return "";
    size_t b = s.find_last_not_of(" \\t\\r\\n\\f\\v");
    return s.substr(a, b - a + 1);
}

string solve(const string& s) {
    unordered_map<char, int> remaining;
    for (char c : s) remaining[c]++;
    vector<char> st;
    unordered_set<char> inStack;
    for (char c : s) {
        remaining[c]--;
        if (inStack.count(c)) continue;
        while (!st.empty() && st.back() > c && remaining[st.back()] > 0) {
            inStack.erase(st.back());
            st.pop_back();
        }
        st.push_back(c);
        inStack.insert(c);
    }
    return string(st.begin(), st.end());
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string raw((istreambuf_iterator<char>(cin)), istreambuf_iterator<char>());
    string s = trimStr(raw);
    cout << solve(s) << '\\n';
    return 0;
}
`,
  "dsa-asteroid-collision": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

string fmtVec(const vector<ll>& v) {
    string s;
    for (size_t i = 0; i < v.size(); i++) { if (i) s += ' '; s += to_string(v[i]); }
    return s;
}

vector<ll> solve(vector<ll> asteroids) {
    vector<ll> st;
    for (ll a : asteroids) {
        bool alive = true;
        while (alive && a < 0 && !st.empty() && st.back() > 0) {
            if (st.back() < -a) st.pop_back();
            else if (st.back() == -a) { st.pop_back(); alive = false; }
            else alive = false;
        }
        if (alive) st.push_back(a);
    }
    return st;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> nums;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) nums.push_back(stoll(toks[1 + i]));
    cout << fmtVec(solve(nums)) << '\\n';
    return 0;
}
`,
  "dsa-rotting-oranges": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

int solve(vector<vector<ll>> grid) {
    int m = (int)grid.size();
    int n = (int)grid[0].size();
    queue<tuple<int, int, int>> q;
    int fresh = 0;
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++) {
            if (grid[i][j] == 2) q.push({i, j, 0});
            else if (grid[i][j] == 1) fresh++;
        }
    int minutes = 0;
    const int dirs[4][2] = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
    while (!q.empty()) {
        auto [i, j, t] = q.front(); q.pop();
        minutes = max(minutes, t);
        for (auto& d : dirs) {
            int ni = i + d[0], nj = j + d[1];
            if (ni >= 0 && ni < m && nj >= 0 && nj < n && grid[ni][nj] == 1) {
                grid[ni][nj] = 2;
                fresh--;
                q.push({ni, nj, t + 1});
            }
        }
    }
    return fresh == 0 ? minutes : -1;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int r = stoi(toks[0]), c = stoi(toks[1]);
    vector<ll> vals;
    for (size_t i = 2; i < toks.size(); i++) vals.push_back(stoll(toks[i]));
    vector<vector<ll>> grid;
    for (int i = 0; i < r; i++) {
        vector<ll> row;
        for (int j = 0; j < c; j++) row.push_back(vals[i * c + j]);
        grid.push_back(row);
    }
    cout << solve(grid) << '\\n';
    return 0;
}
`,
  "dsa-design-circular-queue": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;

string trimStr(const string& s) {
    size_t a = s.find_first_not_of(" \\t\\r\\n\\f\\v");
    if (a == string::npos) return "";
    size_t b = s.find_last_not_of(" \\t\\r\\n\\f\\v");
    return s.substr(a, b - a + 1);
}

vector<string> solve(const vector<string>& ops) {
    if (ops.empty()) return {};
    int k = stoi(ops[0]);
    int cap = max(k, 1);
    vector<long long> q(cap, 0);
    int head = 0, size = 0;
    vector<string> out;
    for (size_t oi = 1; oi < ops.size(); oi++) {
        stringstream ss(ops[oi]);
        string cmd;
        ss >> cmd;
        if (cmd == "enQueue") {
            long long v; ss >> v;
            if (size == k) out.push_back("false");
            else { q[(head + size) % cap] = v; size++; out.push_back("true"); }
        } else if (cmd == "deQueue") {
            if (size == 0) out.push_back("false");
            else { head = (head + 1) % cap; size--; out.push_back("true"); }
        } else if (cmd == "Front") {
            out.push_back(size ? to_string(q[head]) : "-1");
        } else if (cmd == "Rear") {
            out.push_back(size ? to_string(q[(head + size - 1) % cap]) : "-1");
        } else if (cmd == "isEmpty") {
            out.push_back(size == 0 ? "true" : "false");
        } else if (cmd == "isFull") {
            out.push_back(size == k ? "true" : "false");
        }
    }
    return out;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> lines, ops;
    string line;
    while (getline(cin, line)) lines.push_back(line);
    for (auto& l : lines) {
        string t = trimStr(l);
        if (!t.empty()) ops.push_back(t);
    }
    vector<string> out = solve(ops);
    for (size_t i = 0; i < out.size(); i++) {
        if (i) cout << '\\n';
        cout << out[i];
    }
    cout << '\\n';
    return 0;
}
`,
  "dsa-reveal-cards-in-increasing-order": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

string fmtVec(const vector<ll>& v) {
    string s;
    for (size_t i = 0; i < v.size(); i++) { if (i) s += ' '; s += to_string(v[i]); }
    return s;
}

vector<ll> solve(vector<ll> deck) {
    sort(deck.begin(), deck.end());
    queue<int> q;
    for (int i = 0; i < (int)deck.size(); i++) q.push(i);
    vector<ll> out(deck.size(), 0);
    for (ll v : deck) {
        int i = q.front(); q.pop();
        out[i] = v;
        if (!q.empty()) { q.push(q.front()); q.pop(); }
    }
    return out;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> nums;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) nums.push_back(stoll(toks[1 + i]));
    cout << fmtVec(solve(nums)) << '\\n';
    return 0;
}
`,
  "dsa-time-needed-to-buy-tickets": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

ll solve(vector<ll> tickets, int k) {
    ll total = 0;
    for (int i = 0; i < (int)tickets.size(); i++) {
        if (i <= k) total += min(tickets[i], tickets[k]);
        else total += min(tickets[i], tickets[k] - 1);
    }
    return total;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> nums;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) nums.push_back(stoll(toks[1 + i]));
    int k = stoi(toks[1 + n]);
    cout << solve(nums, k) << '\\n';
    return 0;
}
`,
  "dsa-dota2-senate": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;

string trimStr(const string& s) {
    size_t a = s.find_first_not_of(" \\t\\r\\n\\f\\v");
    if (a == string::npos) return "";
    size_t b = s.find_last_not_of(" \\t\\r\\n\\f\\v");
    return s.substr(a, b - a + 1);
}

string solve(const string& senate) {
    queue<int> radiant, dire;
    int n = (int)senate.size();
    for (int i = 0; i < n; i++) {
        if (senate[i] == 'R') radiant.push(i);
        else dire.push(i);
    }
    while (!radiant.empty() && !dire.empty()) {
        int r = radiant.front(); radiant.pop();
        int d = dire.front(); dire.pop();
        if (r < d) radiant.push(r + n);
        else dire.push(d + n);
    }
    return radiant.empty() ? "Dire" : "Radiant";
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string raw((istreambuf_iterator<char>(cin)), istreambuf_iterator<char>());
    string s = trimStr(raw);
    cout << solve(s) << '\\n';
    return 0;
}
`,
  "dsa-number-of-students-unable-to-eat-lunch": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

int solve(vector<ll> students, vector<ll> sandwiches) {
    unordered_map<ll, int> counts;
    for (ll s : students) counts[s]++;
    queue<ll> q;
    for (ll s : students) q.push(s);
    for (ll s : sandwiches) {
        if (counts[s] == 0) break;
        while (q.front() != s) { q.push(q.front()); q.pop(); }
        q.pop();
        counts[s]--;
    }
    return (int)q.size();
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> a;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) a.push_back(stoll(toks[1 + i]));
    int m = stoi(toks[1 + n]);
    vector<ll> b;
    for (int i = 0; i < m && 2 + n + i < (int)toks.size(); i++) b.push_back(stoll(toks[2 + n + i]));
    cout << solve(a, b) << '\\n';
    return 0;
}
`,
  "dsa-reverse-linked-list": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

struct ListNode {
    ll val;
    ListNode* next;
    ListNode(ll v = 0, ListNode* n = nullptr) : val(v), next(n) {}
};

ListNode* buildList(const vector<ll>& vals) {
    if (vals.empty()) return nullptr;
    ListNode* head = new ListNode(vals[0]);
    ListNode* cur = head;
    for (size_t i = 1; i < vals.size(); i++) { cur->next = new ListNode(vals[i]); cur = cur->next; }
    return head;
}

string fmtList(ListNode* head) {
    string s;
    for (ListNode* cur = head; cur; cur = cur->next) {
        if (!s.empty()) s += ' ';
        s += to_string(cur->val);
    }
    return s;
}

ListNode* solve(ListNode* head) {
    ListNode* prev = nullptr;
    ListNode* cur = head;
    while (cur) {
        ListNode* nxt = cur->next;
        cur->next = prev;
        prev = cur;
        cur = nxt;
    }
    return prev;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> vals;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) vals.push_back(stoll(toks[1 + i]));
    ListNode* head = buildList(vals);
    cout << fmtList(solve(head)) << '\\n';
    return 0;
}
`,
  "dsa-merge-two-sorted-lists": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

struct ListNode {
    ll val;
    ListNode* next;
    ListNode(ll v = 0, ListNode* n = nullptr) : val(v), next(n) {}
};

ListNode* buildList(const vector<ll>& vals) {
    if (vals.empty()) return nullptr;
    ListNode* head = new ListNode(vals[0]);
    ListNode* cur = head;
    for (size_t i = 1; i < vals.size(); i++) { cur->next = new ListNode(vals[i]); cur = cur->next; }
    return head;
}

string fmtList(ListNode* head) {
    string s;
    for (ListNode* cur = head; cur; cur = cur->next) {
        if (!s.empty()) s += ' ';
        s += to_string(cur->val);
    }
    return s;
}

ListNode* solve(ListNode* head1, ListNode* head2) {
    ListNode dummy(0);
    ListNode* tail = &dummy;
    while (head1 && head2) {
        if (head1->val <= head2->val) { tail->next = head1; head1 = head1->next; }
        else { tail->next = head2; head2 = head2->next; }
        tail = tail->next;
    }
    tail->next = head1 ? head1 : head2;
    return dummy.next;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> a;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) a.push_back(stoll(toks[1 + i]));
    int m = stoi(toks[1 + n]);
    vector<ll> b;
    for (int i = 0; i < m && 2 + n + i < (int)toks.size(); i++) b.push_back(stoll(toks[2 + n + i]));
    ListNode* head1 = buildList(a);
    ListNode* head2 = buildList(b);
    cout << fmtList(solve(head1, head2)) << '\\n';
    return 0;
}
`,
  "dsa-linked-list-cycle": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

struct ListNode {
    ll val;
    ListNode* next;
    ListNode(ll v = 0, ListNode* n = nullptr) : val(v), next(n) {}
};

ListNode* buildList(const vector<ll>& vals) {
    if (vals.empty()) return nullptr;
    ListNode* head = new ListNode(vals[0]);
    ListNode* cur = head;
    for (size_t i = 1; i < vals.size(); i++) { cur->next = new ListNode(vals[i]); cur = cur->next; }
    return head;
}

bool solve(ListNode* head, int pos) {
    if (pos < 0 || !head) return false;
    ListNode* tail = head;
    while (tail && tail->next) tail = tail->next;
    ListNode* target = head;
    for (int i = 0; i < pos && target; i++) target = target->next;
    if (tail) tail->next = target;
    ListNode* slow = head;
    ListNode* fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    return false;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int pos = stoi(toks.back());
    int n = stoi(toks[0]);
    vector<ll> vals;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) vals.push_back(stoll(toks[1 + i]));
    ListNode* head = buildList(vals);
    cout << (solve(head, pos) ? "true" : "false") << '\\n';
    return 0;
}
`,
  "dsa-remove-nth-node-from-end": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

struct ListNode {
    ll val;
    ListNode* next;
    ListNode(ll v = 0, ListNode* n = nullptr) : val(v), next(n) {}
};

ListNode* buildList(const vector<ll>& vals) {
    if (vals.empty()) return nullptr;
    ListNode* head = new ListNode(vals[0]);
    ListNode* cur = head;
    for (size_t i = 1; i < vals.size(); i++) { cur->next = new ListNode(vals[i]); cur = cur->next; }
    return head;
}

string fmtList(ListNode* head) {
    string s;
    for (ListNode* cur = head; cur; cur = cur->next) {
        if (!s.empty()) s += ' ';
        s += to_string(cur->val);
    }
    return s;
}

ListNode* solve(ListNode* head, int k) {
    ListNode dummy(0, head);
    ListNode* fast = &dummy;
    ListNode* slow = &dummy;
    for (int i = 0; i < k + 1; i++) fast = fast->next;
    while (fast) { fast = fast->next; slow = slow->next; }
    slow->next = slow->next->next;
    return dummy.next;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int k = stoi(toks.back());
    int n = stoi(toks[0]);
    vector<ll> vals;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) vals.push_back(stoll(toks[1 + i]));
    ListNode* head = buildList(vals);
    cout << fmtList(solve(head, k)) << '\\n';
    return 0;
}
`,
  "dsa-middle-of-linked-list": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

struct ListNode {
    ll val;
    ListNode* next;
    ListNode(ll v = 0, ListNode* n = nullptr) : val(v), next(n) {}
};

ListNode* buildList(const vector<ll>& vals) {
    if (vals.empty()) return nullptr;
    ListNode* head = new ListNode(vals[0]);
    ListNode* cur = head;
    for (size_t i = 1; i < vals.size(); i++) { cur->next = new ListNode(vals[i]); cur = cur->next; }
    return head;
}

ll solve(ListNode* head) {
    if (!head) return 0;
    ListNode* slow = head;
    ListNode* fast = head;
    while (fast && fast->next) { slow = slow->next; fast = fast->next->next; }
    return slow->val;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> vals;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) vals.push_back(stoll(toks[1 + i]));
    ListNode* head = buildList(vals);
    cout << solve(head) << '\\n';
    return 0;
}
`,
  "dsa-palindrome-linked-list": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

struct ListNode {
    ll val;
    ListNode* next;
    ListNode(ll v = 0, ListNode* n = nullptr) : val(v), next(n) {}
};

ListNode* buildList(const vector<ll>& vals) {
    if (vals.empty()) return nullptr;
    ListNode* head = new ListNode(vals[0]);
    ListNode* cur = head;
    for (size_t i = 1; i < vals.size(); i++) { cur->next = new ListNode(vals[i]); cur = cur->next; }
    return head;
}

bool solve(ListNode* head) {
    vector<ll> vals;
    for (ListNode* cur = head; cur; cur = cur->next) vals.push_back(cur->val);
    vector<ll> rev = vals;
    reverse(rev.begin(), rev.end());
    return vals == rev;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> vals;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) vals.push_back(stoll(toks[1 + i]));
    ListNode* head = buildList(vals);
    cout << (solve(head) ? "true" : "false") << '\\n';
    return 0;
}
`,
  "dsa-add-two-numbers": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

struct ListNode {
    ll val;
    ListNode* next;
    ListNode(ll v = 0, ListNode* n = nullptr) : val(v), next(n) {}
};

ListNode* buildList(const vector<ll>& vals) {
    if (vals.empty()) return nullptr;
    ListNode* head = new ListNode(vals[0]);
    ListNode* cur = head;
    for (size_t i = 1; i < vals.size(); i++) { cur->next = new ListNode(vals[i]); cur = cur->next; }
    return head;
}

string fmtList(ListNode* head) {
    string s;
    for (ListNode* cur = head; cur; cur = cur->next) {
        if (!s.empty()) s += ' ';
        s += to_string(cur->val);
    }
    return s;
}

ListNode* solve(ListNode* head1, ListNode* head2) {
    ListNode dummy(0);
    ListNode* tail = &dummy;
    ll carry = 0;
    while (head1 || head2 || carry) {
        ll v1 = head1 ? head1->val : 0;
        ll v2 = head2 ? head2->val : 0;
        ll total = v1 + v2 + carry;
        carry = total / 10;
        tail->next = new ListNode(total % 10);
        tail = tail->next;
        head1 = head1 ? head1->next : nullptr;
        head2 = head2 ? head2->next : nullptr;
    }
    return dummy.next;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> a;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) a.push_back(stoll(toks[1 + i]));
    int m = stoi(toks[1 + n]);
    vector<ll> b;
    for (int i = 0; i < m && 2 + n + i < (int)toks.size(); i++) b.push_back(stoll(toks[2 + n + i]));
    ListNode* head1 = buildList(a);
    ListNode* head2 = buildList(b);
    cout << fmtList(solve(head1, head2)) << '\\n';
    return 0;
}
`,
  "dsa-intersection-of-two-linked-lists": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

struct ListNode {
    ll val;
    ListNode* next;
    ListNode(ll v = 0, ListNode* n = nullptr) : val(v), next(n) {}
};

ListNode* buildList(const vector<ll>& vals) {
    if (vals.empty()) return nullptr;
    ListNode* head = new ListNode(vals[0]);
    ListNode* cur = head;
    for (size_t i = 1; i < vals.size(); i++) { cur->next = new ListNode(vals[i]); cur = cur->next; }
    return head;
}

ll solve(ListNode* head1, ListNode* head2) {
    unordered_set<ll> vals;
    for (ListNode* cur = head1; cur; cur = cur->next) vals.insert(cur->val);
    for (ListNode* cur = head2; cur; cur = cur->next)
        if (vals.count(cur->val)) return cur->val;
    return -1;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> a;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) a.push_back(stoll(toks[1 + i]));
    int m = stoi(toks[1 + n]);
    vector<ll> b;
    for (int i = 0; i < m && 2 + n + i < (int)toks.size(); i++) b.push_back(stoll(toks[2 + n + i]));
    ListNode* head1 = buildList(a);
    ListNode* head2 = buildList(b);
    cout << solve(head1, head2) << '\\n';
    return 0;
}
`,
  "dsa-remove-duplicates-from-sorted-list": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

struct ListNode {
    ll val;
    ListNode* next;
    ListNode(ll v = 0, ListNode* n = nullptr) : val(v), next(n) {}
};

ListNode* buildList(const vector<ll>& vals) {
    if (vals.empty()) return nullptr;
    ListNode* head = new ListNode(vals[0]);
    ListNode* cur = head;
    for (size_t i = 1; i < vals.size(); i++) { cur->next = new ListNode(vals[i]); cur = cur->next; }
    return head;
}

string fmtList(ListNode* head) {
    string s;
    for (ListNode* cur = head; cur; cur = cur->next) {
        if (!s.empty()) s += ' ';
        s += to_string(cur->val);
    }
    return s;
}

ListNode* solve(ListNode* head) {
    ListNode* cur = head;
    while (cur && cur->next) {
        if (cur->val == cur->next->val) cur->next = cur->next->next;
        else cur = cur->next;
    }
    return head;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> vals;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) vals.push_back(stoll(toks[1 + i]));
    ListNode* head = buildList(vals);
    cout << fmtList(solve(head)) << '\\n';
    return 0;
}
`,
  "dsa-reorder-list": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

struct ListNode {
    ll val;
    ListNode* next;
    ListNode(ll v = 0, ListNode* n = nullptr) : val(v), next(n) {}
};

ListNode* buildList(const vector<ll>& vals) {
    if (vals.empty()) return nullptr;
    ListNode* head = new ListNode(vals[0]);
    ListNode* cur = head;
    for (size_t i = 1; i < vals.size(); i++) { cur->next = new ListNode(vals[i]); cur = cur->next; }
    return head;
}

string fmtList(ListNode* head) {
    string s;
    for (ListNode* cur = head; cur; cur = cur->next) {
        if (!s.empty()) s += ' ';
        s += to_string(cur->val);
    }
    return s;
}

ListNode* solve(ListNode* head) {
    if (!head || !head->next) return head;
    ListNode* slow = head;
    ListNode* fast = head;
    while (fast->next && fast->next->next) { slow = slow->next; fast = fast->next->next; }
    ListNode* second = slow->next;
    slow->next = nullptr;
    ListNode* prev = nullptr;
    while (second) {
        ListNode* nxt = second->next;
        second->next = prev;
        prev = second;
        second = nxt;
    }
    ListNode* first = head;
    second = prev;
    while (second) {
        ListNode* tmp1 = first->next;
        ListNode* tmp2 = second->next;
        first->next = second;
        second->next = tmp1;
        first = tmp1;
        second = tmp2;
    }
    return head;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> vals;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) vals.push_back(stoll(toks[1 + i]));
    ListNode* head = buildList(vals);
    cout << fmtList(solve(head)) << '\\n';
    return 0;
}
`,
  "dsa-swap-nodes-in-pairs": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

struct ListNode {
    ll val;
    ListNode* next;
    ListNode(ll v = 0, ListNode* n = nullptr) : val(v), next(n) {}
};

ListNode* buildList(const vector<ll>& vals) {
    if (vals.empty()) return nullptr;
    ListNode* head = new ListNode(vals[0]);
    ListNode* cur = head;
    for (size_t i = 1; i < vals.size(); i++) { cur->next = new ListNode(vals[i]); cur = cur->next; }
    return head;
}

string fmtList(ListNode* head) {
    string s;
    for (ListNode* cur = head; cur; cur = cur->next) {
        if (!s.empty()) s += ' ';
        s += to_string(cur->val);
    }
    return s;
}

ListNode* solve(ListNode* head) {
    ListNode dummy(0, head);
    ListNode* prev = &dummy;
    while (prev->next && prev->next->next) {
        ListNode* a = prev->next;
        ListNode* b = a->next;
        a->next = b->next;
        b->next = a;
        prev->next = b;
        prev = a;
    }
    return dummy.next;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> vals;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) vals.push_back(stoll(toks[1 + i]));
    ListNode* head = buildList(vals);
    cout << fmtList(solve(head)) << '\\n';
    return 0;
}
`,
  "dsa-odd-even-linked-list": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

struct ListNode {
    ll val;
    ListNode* next;
    ListNode(ll v = 0, ListNode* n = nullptr) : val(v), next(n) {}
};

ListNode* buildList(const vector<ll>& vals) {
    if (vals.empty()) return nullptr;
    ListNode* head = new ListNode(vals[0]);
    ListNode* cur = head;
    for (size_t i = 1; i < vals.size(); i++) { cur->next = new ListNode(vals[i]); cur = cur->next; }
    return head;
}

string fmtList(ListNode* head) {
    string s;
    for (ListNode* cur = head; cur; cur = cur->next) {
        if (!s.empty()) s += ' ';
        s += to_string(cur->val);
    }
    return s;
}

ListNode* solve(ListNode* head) {
    if (!head || !head->next) return head;
    ListNode* odd = head;
    ListNode* even = head->next;
    ListNode* evenHead = even;
    while (even && even->next) {
        odd->next = even->next;
        odd = odd->next;
        even->next = odd->next;
        even = even->next;
    }
    odd->next = evenHead;
    return head;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> vals;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) vals.push_back(stoll(toks[1 + i]));
    ListNode* head = buildList(vals);
    cout << fmtList(solve(head)) << '\\n';
    return 0;
}
`,
  "dsa-binary-search": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

int solve(vector<ll> nums, ll target) {
    int left = 0, right = (int)nums.size() - 1;
    while (left <= right) {
        int mid = (left + right) / 2;
        if (nums[mid] == target) return mid;
        if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> nums;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) nums.push_back(stoll(toks[1 + i]));
    ll target = stoll(toks[1 + n]);
    cout << solve(nums, target) << '\\n';
    return 0;
}
`,
  "dsa-search-insert-position": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

int solve(vector<ll> nums, ll target) {
    int left = 0, right = (int)nums.size();
    while (left < right) {
        int mid = (left + right) / 2;
        if (nums[mid] < target) left = mid + 1;
        else right = mid;
    }
    return left;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> nums;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) nums.push_back(stoll(toks[1 + i]));
    ll target = stoll(toks[1 + n]);
    cout << solve(nums, target) << '\\n';
    return 0;
}
`,
  "dsa-find-first-and-last-position": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

string fmtVec(const vector<ll>& v) {
    string s;
    for (size_t i = 0; i < v.size(); i++) { if (i) s += ' '; s += to_string(v[i]); }
    return s;
}

vector<ll> solve(vector<ll> nums, ll target) {
    auto bound = [&](bool first) {
        int left = 0, right = (int)nums.size();
        while (left < right) {
            int mid = (left + right) / 2;
            if (nums[mid] > target || (first && nums[mid] == target)) right = mid;
            else left = mid + 1;
        }
        return left;
    };
    int lo = bound(true);
    if (lo == (int)nums.size() || nums[lo] != target) return {-1, -1};
    return {lo, bound(false) - 1};
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> nums;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) nums.push_back(stoll(toks[1 + i]));
    ll target = stoll(toks[1 + n]);
    cout << fmtVec(solve(nums, target)) << '\\n';
    return 0;
}
`,
  "dsa-search-in-rotated-sorted-array": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

int solve(vector<ll> nums, ll target) {
    int left = 0, right = (int)nums.size() - 1;
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

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> nums;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) nums.push_back(stoll(toks[1 + i]));
    ll target = stoll(toks[1 + n]);
    cout << solve(nums, target) << '\\n';
    return 0;
}
`,
  "dsa-find-minimum-in-rotated-sorted-array": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

ll solve(vector<ll> nums) {
    int left = 0, right = (int)nums.size() - 1;
    while (left < right) {
        int mid = (left + right) / 2;
        if (nums[mid] > nums[right]) left = mid + 1;
        else right = mid;
    }
    return nums[left];
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> nums;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) nums.push_back(stoll(toks[1 + i]));
    cout << solve(nums) << '\\n';
    return 0;
}
`,
  "dsa-peak-element": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

int solve(vector<ll> nums) {
    int left = 0, right = (int)nums.size() - 1;
    while (left < right) {
        int mid = (left + right) / 2;
        if (nums[mid] > nums[mid + 1]) right = mid;
        else left = mid + 1;
    }
    return left;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> nums;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) nums.push_back(stoll(toks[1 + i]));
    cout << solve(nums) << '\\n';
    return 0;
}
`,
  "dsa-sqrt-x": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

ll solve(ll x) {
    if (x < 2) return x;
    ll left = 1, right = x / 2, ans = 1;
    while (left <= right) {
        ll mid = (left + right) / 2;
        if (mid * mid == x) return mid;
        if (mid * mid < x) { ans = mid; left = mid + 1; }
        else right = mid - 1;
    }
    return ans;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    ll n = stoll(toks[0]);
    cout << solve(n) << '\\n';
    return 0;
}
`,
  "dsa-koko-eating-bananas": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

ll solve(vector<ll> piles, ll h) {
    ll left = 1, right = *max_element(piles.begin(), piles.end());
    while (left < right) {
        ll mid = (left + right) / 2;
        ll hours = 0;
        for (ll p : piles) hours += (p + mid - 1) / mid;
        if (hours <= h) right = mid;
        else left = mid + 1;
    }
    return left;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> nums;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) nums.push_back(stoll(toks[1 + i]));
    ll k = stoll(toks[1 + n]);
    cout << solve(nums, k) << '\\n';
    return 0;
}
`,
  "dsa-capacity-to-ship-packages": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

ll solve(vector<ll> weights, ll days) {
    auto can = [&](ll cap) {
        ll used = 1, load = 0;
        for (ll w : weights) {
            if (load + w > cap) { used++; load = w; }
            else load += w;
        }
        return used <= days;
    };
    ll left = *max_element(weights.begin(), weights.end());
    ll right = 0;
    for (ll w : weights) right += w;
    while (left < right) {
        ll mid = (left + right) / 2;
        if (can(mid)) right = mid;
        else left = mid + 1;
    }
    return left;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> nums;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) nums.push_back(stoll(toks[1 + i]));
    ll k = stoll(toks[1 + n]);
    cout << solve(nums, k) << '\\n';
    return 0;
}
`,
  "dsa-single-element-in-sorted-array": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

ll solve(vector<ll> nums) {
    int left = 0, right = (int)nums.size() - 1;
    while (left < right) {
        int mid = (left + right) / 2;
        if (mid % 2 == 1) mid--;
        if (nums[mid] == nums[mid + 1]) left = mid + 2;
        else right = mid;
    }
    return nums[left];
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> nums;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) nums.push_back(stoll(toks[1 + i]));
    cout << solve(nums) << '\\n';
    return 0;
}
`,
  "dsa-maximum-depth-of-binary-tree": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

struct TreeNode {
    ll val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(ll v = 0, TreeNode* l = nullptr, TreeNode* r = nullptr) : val(v), left(l), right(r) {}
};

TreeNode* buildTree(const vector<string>& tokens) {
    if (tokens.empty() || tokens[0] == "null") return nullptr;
    TreeNode* root = new TreeNode(stoll(tokens[0]));
    queue<TreeNode*> q;
    q.push(root);
    size_t i = 1;
    while (!q.empty() && i < tokens.size()) {
        TreeNode* node = q.front(); q.pop();
        if (i < tokens.size() && tokens[i] != "null") { node->left = new TreeNode(stoll(tokens[i])); q.push(node->left); }
        i++;
        if (i < tokens.size() && tokens[i] != "null") { node->right = new TreeNode(stoll(tokens[i])); q.push(node->right); }
        i++;
    }
    return root;
}

int solve(TreeNode* root) {
    if (!root) return 0;
    return 1 + max(solve(root->left), solve(root->right));
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    TreeNode* root = buildTree(toks);
    cout << solve(root) << '\\n';
    return 0;
}
`,
  "dsa-invert-binary-tree": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

struct TreeNode {
    ll val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(ll v = 0, TreeNode* l = nullptr, TreeNode* r = nullptr) : val(v), left(l), right(r) {}
};

TreeNode* buildTree(const vector<string>& tokens) {
    if (tokens.empty() || tokens[0] == "null") return nullptr;
    TreeNode* root = new TreeNode(stoll(tokens[0]));
    queue<TreeNode*> q;
    q.push(root);
    size_t i = 1;
    while (!q.empty() && i < tokens.size()) {
        TreeNode* node = q.front(); q.pop();
        if (i < tokens.size() && tokens[i] != "null") { node->left = new TreeNode(stoll(tokens[i])); q.push(node->left); }
        i++;
        if (i < tokens.size() && tokens[i] != "null") { node->right = new TreeNode(stoll(tokens[i])); q.push(node->right); }
        i++;
    }
    return root;
}

string fmtTree(TreeNode* root) {
    if (!root) return "";
    vector<string> out;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        TreeNode* node = q.front(); q.pop();
        if (!node) out.push_back("null");
        else { out.push_back(to_string(node->val)); q.push(node->left); q.push(node->right); }
    }
    while (!out.empty() && out.back() == "null") out.pop_back();
    string s;
    for (size_t i = 0; i < out.size(); i++) { if (i) s += ' '; s += out[i]; }
    return s;
}

TreeNode* solve(TreeNode* root) {
    if (!root) return nullptr;
    TreeNode* l = solve(root->right);
    TreeNode* r = solve(root->left);
    root->left = l;
    root->right = r;
    return root;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    TreeNode* root = buildTree(toks);
    cout << fmtTree(solve(root)) << '\\n';
    return 0;
}
`,
  "dsa-same-tree": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

struct TreeNode {
    ll val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(ll v = 0, TreeNode* l = nullptr, TreeNode* r = nullptr) : val(v), left(l), right(r) {}
};

TreeNode* buildTree(const vector<string>& tokens) {
    if (tokens.empty() || tokens[0] == "null") return nullptr;
    TreeNode* root = new TreeNode(stoll(tokens[0]));
    queue<TreeNode*> q;
    q.push(root);
    size_t i = 1;
    while (!q.empty() && i < tokens.size()) {
        TreeNode* node = q.front(); q.pop();
        if (i < tokens.size() && tokens[i] != "null") { node->left = new TreeNode(stoll(tokens[i])); q.push(node->left); }
        i++;
        if (i < tokens.size() && tokens[i] != "null") { node->right = new TreeNode(stoll(tokens[i])); q.push(node->right); }
        i++;
    }
    return root;
}

bool solve(TreeNode* a, TreeNode* b) {
    if (!a && !b) return true;
    if (!a || !b) return false;
    return a->val == b->val && solve(a->left, b->left) && solve(a->right, b->right);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n1 = stoi(toks[0]);
    vector<string> t1;
    for (int i = 0; i < n1 && 1 + i < (int)toks.size(); i++) t1.push_back(toks[1 + i]);
    int n2 = stoi(toks[1 + n1]);
    vector<string> t2;
    for (int i = 0; i < n2 && 2 + n1 + i < (int)toks.size(); i++) t2.push_back(toks[2 + n1 + i]);
    TreeNode* root1 = buildTree(t1);
    TreeNode* root2 = buildTree(t2);
    cout << (solve(root1, root2) ? "true" : "false") << '\\n';
    return 0;
}
`,
  "dsa-symmetric-tree": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

struct TreeNode {
    ll val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(ll v = 0, TreeNode* l = nullptr, TreeNode* r = nullptr) : val(v), left(l), right(r) {}
};

TreeNode* buildTree(const vector<string>& tokens) {
    if (tokens.empty() || tokens[0] == "null") return nullptr;
    TreeNode* root = new TreeNode(stoll(tokens[0]));
    queue<TreeNode*> q;
    q.push(root);
    size_t i = 1;
    while (!q.empty() && i < tokens.size()) {
        TreeNode* node = q.front(); q.pop();
        if (i < tokens.size() && tokens[i] != "null") { node->left = new TreeNode(stoll(tokens[i])); q.push(node->left); }
        i++;
        if (i < tokens.size() && tokens[i] != "null") { node->right = new TreeNode(stoll(tokens[i])); q.push(node->right); }
        i++;
    }
    return root;
}

bool mirror(TreeNode* a, TreeNode* b) {
    if (!a && !b) return true;
    if (!a || !b) return false;
    return a->val == b->val && mirror(a->left, b->right) && mirror(a->right, b->left);
}

bool solve(TreeNode* root) {
    if (!root) return true;
    return mirror(root->left, root->right);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    TreeNode* root = buildTree(toks);
    cout << (solve(root) ? "true" : "false") << '\\n';
    return 0;
}
`,
  "dsa-binary-tree-level-order-traversal": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

struct TreeNode {
    ll val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(ll v = 0, TreeNode* l = nullptr, TreeNode* r = nullptr) : val(v), left(l), right(r) {}
};

TreeNode* buildTree(const vector<string>& tokens) {
    if (tokens.empty() || tokens[0] == "null") return nullptr;
    TreeNode* root = new TreeNode(stoll(tokens[0]));
    queue<TreeNode*> q;
    q.push(root);
    size_t i = 1;
    while (!q.empty() && i < tokens.size()) {
        TreeNode* node = q.front(); q.pop();
        if (i < tokens.size() && tokens[i] != "null") { node->left = new TreeNode(stoll(tokens[i])); q.push(node->left); }
        i++;
        if (i < tokens.size() && tokens[i] != "null") { node->right = new TreeNode(stoll(tokens[i])); q.push(node->right); }
        i++;
    }
    return root;
}

string fmtRows(const vector<vector<ll>>& rows) {
    string s;
    for (size_t i = 0; i < rows.size(); i++) {
        if (i) s += '\\n';
        for (size_t j = 0; j < rows[i].size(); j++) { if (j) s += ' '; s += to_string(rows[i][j]); }
    }
    return s;
}

vector<vector<ll>> solve(TreeNode* root) {
    if (!root) return {};
    vector<vector<ll>> out;
    vector<TreeNode*> level = {root};
    while (!level.empty()) {
        vector<ll> row;
        for (TreeNode* n : level) row.push_back(n->val);
        out.push_back(row);
        vector<TreeNode*> nxt;
        for (TreeNode* n : level) {
            if (n->left) nxt.push_back(n->left);
            if (n->right) nxt.push_back(n->right);
        }
        level = nxt;
    }
    return out;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    TreeNode* root = buildTree(toks);
    cout << fmtRows(solve(root)) << '\\n';
    return 0;
}
`,
  "dsa-validate-binary-search-tree": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

struct TreeNode {
    ll val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(ll v = 0, TreeNode* l = nullptr, TreeNode* r = nullptr) : val(v), left(l), right(r) {}
};

TreeNode* buildTree(const vector<string>& tokens) {
    if (tokens.empty() || tokens[0] == "null") return nullptr;
    TreeNode* root = new TreeNode(stoll(tokens[0]));
    queue<TreeNode*> q;
    q.push(root);
    size_t i = 1;
    while (!q.empty() && i < tokens.size()) {
        TreeNode* node = q.front(); q.pop();
        if (i < tokens.size() && tokens[i] != "null") { node->left = new TreeNode(stoll(tokens[i])); q.push(node->left); }
        i++;
        if (i < tokens.size() && tokens[i] != "null") { node->right = new TreeNode(stoll(tokens[i])); q.push(node->right); }
        i++;
    }
    return root;
}

bool valid(TreeNode* node, ll low, ll high) {
    if (!node) return true;
    if (node->val <= low || node->val >= high) return false;
    return valid(node->left, low, node->val) && valid(node->right, node->val, high);
}

bool solve(TreeNode* root) {
    return valid(root, LLONG_MIN, LLONG_MAX);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    TreeNode* root = buildTree(toks);
    cout << (solve(root) ? "true" : "false") << '\\n';
    return 0;
}
`,
  "dsa-lowest-common-ancestor": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

struct TreeNode {
    ll val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(ll v = 0, TreeNode* l = nullptr, TreeNode* r = nullptr) : val(v), left(l), right(r) {}
};

TreeNode* buildTree(const vector<string>& tokens) {
    if (tokens.empty() || tokens[0] == "null") return nullptr;
    TreeNode* root = new TreeNode(stoll(tokens[0]));
    queue<TreeNode*> q;
    q.push(root);
    size_t i = 1;
    while (!q.empty() && i < tokens.size()) {
        TreeNode* node = q.front(); q.pop();
        if (i < tokens.size() && tokens[i] != "null") { node->left = new TreeNode(stoll(tokens[i])); q.push(node->left); }
        i++;
        if (i < tokens.size() && tokens[i] != "null") { node->right = new TreeNode(stoll(tokens[i])); q.push(node->right); }
        i++;
    }
    return root;
}

// Faithful port of the Python value-based LCA, including its -1 "not found"
// sentinel (a found value of -1 is treated as not found, exactly as in Python).
ll solve(TreeNode* root, ll p, ll q) {
    if (!root || root->val == p || root->val == q) return root ? root->val : -1;
    ll left = -1, right = -1;
    bool hasLeft = false, hasRight = false;
    if (root->left) {
        ll lv = solve(root->left, p, q);
        if (lv != -1) { left = lv; hasLeft = true; }
    }
    if (root->right) {
        ll rv = solve(root->right, p, q);
        if (rv != -1) { right = rv; hasRight = true; }
    }
    if (hasLeft && hasRight) return root->val;
    if (hasLeft) return left;
    if (hasRight) return right;
    return -1;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.size() < 2) return 0;
    ll p = stoll(toks[toks.size() - 2]);
    ll q = stoll(toks[toks.size() - 1]);
    vector<string> treeToks(toks.begin(), toks.end() - 2);
    TreeNode* root = buildTree(treeToks);
    cout << solve(root, p, q) << '\\n';
    return 0;
}
`,
  "dsa-diameter-of-binary-tree": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

struct TreeNode {
    ll val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(ll v = 0, TreeNode* l = nullptr, TreeNode* r = nullptr) : val(v), left(l), right(r) {}
};

TreeNode* buildTree(const vector<string>& tokens) {
    if (tokens.empty() || tokens[0] == "null") return nullptr;
    TreeNode* root = new TreeNode(stoll(tokens[0]));
    queue<TreeNode*> q;
    q.push(root);
    size_t i = 1;
    while (!q.empty() && i < tokens.size()) {
        TreeNode* node = q.front(); q.pop();
        if (i < tokens.size() && tokens[i] != "null") { node->left = new TreeNode(stoll(tokens[i])); q.push(node->left); }
        i++;
        if (i < tokens.size() && tokens[i] != "null") { node->right = new TreeNode(stoll(tokens[i])); q.push(node->right); }
        i++;
    }
    return root;
}

int solve(TreeNode* root) {
    int best = 0;
    function<int(TreeNode*)> depth = [&](TreeNode* node) -> int {
        if (!node) return 0;
        int l = depth(node->left);
        int r = depth(node->right);
        best = max(best, l + r);
        return 1 + max(l, r);
    };
    depth(root);
    return best;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    TreeNode* root = buildTree(toks);
    cout << solve(root) << '\\n';
    return 0;
}
`,
  "dsa-path-sum": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

struct TreeNode {
    ll val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(ll v = 0, TreeNode* l = nullptr, TreeNode* r = nullptr) : val(v), left(l), right(r) {}
};

TreeNode* buildTree(const vector<string>& tokens) {
    if (tokens.empty() || tokens[0] == "null") return nullptr;
    TreeNode* root = new TreeNode(stoll(tokens[0]));
    queue<TreeNode*> q;
    q.push(root);
    size_t i = 1;
    while (!q.empty() && i < tokens.size()) {
        TreeNode* node = q.front(); q.pop();
        if (i < tokens.size() && tokens[i] != "null") { node->left = new TreeNode(stoll(tokens[i])); q.push(node->left); }
        i++;
        if (i < tokens.size() && tokens[i] != "null") { node->right = new TreeNode(stoll(tokens[i])); q.push(node->right); }
        i++;
    }
    return root;
}

bool solve(TreeNode* root, ll target) {
    if (!root) return false;
    if (!root->left && !root->right) return root->val == target;
    return solve(root->left, target - root->val) || solve(root->right, target - root->val);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    ll target = stoll(toks.back());
    vector<string> treeToks(toks.begin(), toks.end() - 1);
    TreeNode* root = buildTree(treeToks);
    cout << (solve(root, target) ? "true" : "false") << '\\n';
    return 0;
}
`,
  "dsa-kth-smallest-in-bst": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

struct TreeNode {
    ll val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(ll v = 0, TreeNode* l = nullptr, TreeNode* r = nullptr) : val(v), left(l), right(r) {}
};

TreeNode* buildTree(const vector<string>& tokens) {
    if (tokens.empty() || tokens[0] == "null") return nullptr;
    TreeNode* root = new TreeNode(stoll(tokens[0]));
    queue<TreeNode*> q;
    q.push(root);
    size_t i = 1;
    while (!q.empty() && i < tokens.size()) {
        TreeNode* node = q.front(); q.pop();
        if (i < tokens.size() && tokens[i] != "null") { node->left = new TreeNode(stoll(tokens[i])); q.push(node->left); }
        i++;
        if (i < tokens.size() && tokens[i] != "null") { node->right = new TreeNode(stoll(tokens[i])); q.push(node->right); }
        i++;
    }
    return root;
}

ll solve(TreeNode* root, ll k) {
    vector<TreeNode*> st;
    TreeNode* cur = root;
    while (!st.empty() || cur) {
        while (cur) { st.push_back(cur); cur = cur->left; }
        cur = st.back(); st.pop_back();
        k--;
        if (k == 0) return cur->val;
        cur = cur->right;
    }
    return -1;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    ll k = stoll(toks.back());
    vector<string> treeToks(toks.begin(), toks.end() - 1);
    TreeNode* root = buildTree(treeToks);
    cout << solve(root, k) << '\\n';
    return 0;
}
`,
  "dsa-binary-tree-right-side-view": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

struct TreeNode {
    ll val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(ll v = 0, TreeNode* l = nullptr, TreeNode* r = nullptr) : val(v), left(l), right(r) {}
};

TreeNode* buildTree(const vector<string>& tokens) {
    if (tokens.empty() || tokens[0] == "null") return nullptr;
    TreeNode* root = new TreeNode(stoll(tokens[0]));
    queue<TreeNode*> q;
    q.push(root);
    size_t i = 1;
    while (!q.empty() && i < tokens.size()) {
        TreeNode* node = q.front(); q.pop();
        if (i < tokens.size() && tokens[i] != "null") { node->left = new TreeNode(stoll(tokens[i])); q.push(node->left); }
        i++;
        if (i < tokens.size() && tokens[i] != "null") { node->right = new TreeNode(stoll(tokens[i])); q.push(node->right); }
        i++;
    }
    return root;
}

string fmtVec(const vector<ll>& v) {
    string s;
    for (size_t i = 0; i < v.size(); i++) { if (i) s += ' '; s += to_string(v[i]); }
    return s;
}

vector<ll> solve(TreeNode* root) {
    if (!root) return {};
    vector<ll> out;
    vector<TreeNode*> level = {root};
    while (!level.empty()) {
        out.push_back(level.back()->val);
        vector<TreeNode*> nxt;
        for (TreeNode* n : level) {
            if (n->left) nxt.push_back(n->left);
            if (n->right) nxt.push_back(n->right);
        }
        level = nxt;
    }
    return out;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    TreeNode* root = buildTree(toks);
    cout << fmtVec(solve(root)) << '\\n';
    return 0;
}
`,
  "dsa-construct-binary-tree-from-preorder-inorder": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

struct TreeNode {
    ll val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(ll v = 0, TreeNode* l = nullptr, TreeNode* r = nullptr) : val(v), left(l), right(r) {}
};

string fmtTree(TreeNode* root) {
    if (!root) return "";
    vector<string> out;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        TreeNode* node = q.front(); q.pop();
        if (!node) out.push_back("null");
        else { out.push_back(to_string(node->val)); q.push(node->left); q.push(node->right); }
    }
    while (!out.empty() && out.back() == "null") out.pop_back();
    string s;
    for (size_t i = 0; i < out.size(); i++) { if (i) s += ' '; s += out[i]; }
    return s;
}

TreeNode* solve(const vector<ll>& preorder, const vector<ll>& inorder) {
    unordered_map<ll, int> pos;
    for (int i = 0; i < (int)inorder.size(); i++) pos[inorder[i]] = i;
    int idx = 0;
    function<TreeNode*(int, int)> build = [&](int lo, int hi) -> TreeNode* {
        if (lo > hi) return nullptr;
        ll val = preorder[idx++];
        TreeNode* node = new TreeNode(val);
        int mid = pos[val];
        node->left = build(lo, mid - 1);
        node->right = build(mid + 1, hi);
        return node;
    };
    return build(0, (int)inorder.size() - 1);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> a;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) a.push_back(stoll(toks[1 + i]));
    int m = stoi(toks[1 + n]);
    vector<ll> b;
    for (int i = 0; i < m && 2 + n + i < (int)toks.size(); i++) b.push_back(stoll(toks[2 + n + i]));
    cout << fmtTree(solve(a, b)) << '\\n';
    return 0;
}
`,
  "dsa-sum-of-left-leaves": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

struct TreeNode {
    ll val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(ll v = 0, TreeNode* l = nullptr, TreeNode* r = nullptr) : val(v), left(l), right(r) {}
};

TreeNode* buildTree(const vector<string>& tokens) {
    if (tokens.empty() || tokens[0] == "null") return nullptr;
    TreeNode* root = new TreeNode(stoll(tokens[0]));
    queue<TreeNode*> q;
    q.push(root);
    size_t i = 1;
    while (!q.empty() && i < tokens.size()) {
        TreeNode* node = q.front(); q.pop();
        if (i < tokens.size() && tokens[i] != "null") { node->left = new TreeNode(stoll(tokens[i])); q.push(node->left); }
        i++;
        if (i < tokens.size() && tokens[i] != "null") { node->right = new TreeNode(stoll(tokens[i])); q.push(node->right); }
        i++;
    }
    return root;
}

ll solve(TreeNode* root) {
    if (!root) return 0;
    ll total = 0;
    if (root->left && !root->left->left && !root->left->right) total += root->left->val;
    return total + solve(root->left) + solve(root->right);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    TreeNode* root = buildTree(toks);
    cout << solve(root) << '\\n';
    return 0;
}
`,
  "dsa-binary-tree-maximum-path-sum": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

struct TreeNode {
    ll val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(ll v = 0, TreeNode* l = nullptr, TreeNode* r = nullptr) : val(v), left(l), right(r) {}
};

TreeNode* buildTree(const vector<string>& tokens) {
    if (tokens.empty() || tokens[0] == "null") return nullptr;
    TreeNode* root = new TreeNode(stoll(tokens[0]));
    queue<TreeNode*> q;
    q.push(root);
    size_t i = 1;
    while (!q.empty() && i < tokens.size()) {
        TreeNode* node = q.front(); q.pop();
        if (i < tokens.size() && tokens[i] != "null") { node->left = new TreeNode(stoll(tokens[i])); q.push(node->left); }
        i++;
        if (i < tokens.size() && tokens[i] != "null") { node->right = new TreeNode(stoll(tokens[i])); q.push(node->right); }
        i++;
    }
    return root;
}

ll solve(TreeNode* root) {
    ll best = LLONG_MIN;
    function<ll(TreeNode*)> gain = [&](TreeNode* node) -> ll {
        if (!node) return 0;
        ll left = max(gain(node->left), 0LL);
        ll right = max(gain(node->right), 0LL);
        best = max(best, node->val + left + right);
        return node->val + max(left, right);
    };
    gain(root);
    return best;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    TreeNode* root = buildTree(toks);
    if (!root) { cout << "-inf\\n"; return 0; }
    cout << solve(root) << '\\n';
    return 0;
}
`,
  "dsa-number-of-islands": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;

int solve(vector<string> grid) {
    int m = (int)grid.size();
    int n = (int)grid[0].size();
    int count = 0;
    function<void(int, int)> dfs = [&](int i, int j) {
        if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] != '1') return;
        grid[i][j] = '0';
        dfs(i + 1, j);
        dfs(i - 1, j);
        dfs(i, j + 1);
        dfs(i, j - 1);
    };
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++)
            if (grid[i][j] == '1') { count++; dfs(i, j); }
    return count;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> lines;
    string line;
    while (getline(cin, line)) lines.push_back(line);
    int r = 0, c = 0;
    if (!lines.empty()) { stringstream ss(lines[0]); ss >> r >> c; }
    vector<string> grid;
    for (int i = 0; i < r && 1 + i < (int)lines.size(); i++) {
        string row;
        for (char ch : lines[1 + i]) if (ch != ' ') row += ch;
        grid.push_back(row);
    }
    cout << solve(grid) << '\\n';
    return 0;
}
`,
  "dsa-flood-fill": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

string fmtRows(const vector<vector<ll>>& rows) {
    string s;
    for (size_t i = 0; i < rows.size(); i++) {
        if (i) s += '\\n';
        for (size_t j = 0; j < rows[i].size(); j++) { if (j) s += ' '; s += to_string(rows[i][j]); }
    }
    return s;
}

vector<vector<ll>> solve(vector<vector<ll>> grid, int sr, int sc, ll color) {
    ll old = grid[sr][sc];
    if (old == color) return grid;
    int m = (int)grid.size();
    int n = (int)grid[0].size();
    function<void(int, int)> dfs = [&](int i, int j) {
        if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] != old) return;
        grid[i][j] = color;
        dfs(i + 1, j);
        dfs(i - 1, j);
        dfs(i, j + 1);
        dfs(i, j - 1);
    };
    dfs(sr, sc);
    return grid;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int r = stoi(toks[0]), c = stoi(toks[1]);
    vector<ll> vals;
    for (size_t i = 2; i < 2 + (size_t)r * c && i < toks.size(); i++) vals.push_back(stoll(toks[i]));
    vector<vector<ll>> grid;
    for (int i = 0; i < r; i++) {
        vector<ll> row;
        for (int j = 0; j < c; j++) row.push_back(vals[i * c + j]);
        grid.push_back(row);
    }
    int sr = stoi(toks[2 + r * c]);
    int sc = stoi(toks[3 + r * c]);
    ll color = stoll(toks[4 + r * c]);
    cout << fmtRows(solve(grid, sr, sc, color)) << '\\n';
    return 0;
}
`,
  "dsa-course-schedule": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

bool solve(int n, const vector<pair<int, int>>& edges) {
    vector<vector<int>> graph(n);
    vector<int> indeg(n, 0);
    for (auto& e : edges) { graph[e.second].push_back(e.first); indeg[e.first]++; }
    queue<int> q;
    for (int i = 0; i < n; i++) if (indeg[i] == 0) q.push(i);
    int done = 0;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        done++;
        for (int v : graph[u]) if (--indeg[v] == 0) q.push(v);
    }
    return done == n;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]), m = stoi(toks[1]);
    vector<pair<int, int>> edges;
    for (int i = 0; i < m; i++)
        edges.push_back({stoi(toks[2 + 2 * i]), stoi(toks[3 + 2 * i])});
    cout << (solve(n, edges) ? "true" : "false") << '\\n';
    return 0;
}
`,
  "dsa-course-schedule-ii": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

string fmtVec(const vector<ll>& v) {
    string s;
    for (size_t i = 0; i < v.size(); i++) { if (i) s += ' '; s += to_string(v[i]); }
    return s;
}

vector<ll> solve(int n, const vector<pair<int, int>>& edges) {
    vector<vector<int>> graph(n);
    vector<int> indeg(n, 0);
    for (auto& e : edges) { graph[e.second].push_back(e.first); indeg[e.first]++; }
    queue<int> q;
    for (int i = 0; i < n; i++) if (indeg[i] == 0) q.push(i);
    vector<ll> order;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        order.push_back(u);
        for (int v : graph[u]) if (--indeg[v] == 0) q.push(v);
    }
    if ((int)order.size() != n) return {-1};
    return order;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]), m = stoi(toks[1]);
    vector<pair<int, int>> edges;
    for (int i = 0; i < m; i++)
        edges.push_back({stoi(toks[2 + 2 * i]), stoi(toks[3 + 2 * i])});
    cout << fmtVec(solve(n, edges)) << '\\n';
    return 0;
}
`,
  "dsa-pacific-atlantic-water-flow": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

string fmtRows(const vector<vector<ll>>& rows) {
    string s;
    for (size_t i = 0; i < rows.size(); i++) {
        if (i) s += '\\n';
        for (size_t j = 0; j < rows[i].size(); j++) { if (j) s += ' '; s += to_string(rows[i][j]); }
    }
    return s;
}

vector<vector<ll>> solve(const vector<vector<ll>>& grid) {
    int m = (int)grid.size();
    int n = (int)grid[0].size();
    vector<vector<bool>> pac(m, vector<bool>(n, false)), atl(m, vector<bool>(n, false));
    const int dirs[4][2] = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
    function<void(int, int, vector<vector<bool>>&)> dfs = [&](int i, int j, vector<vector<bool>>& seen) {
        seen[i][j] = true;
        for (auto& d : dirs) {
            int ni = i + d[0], nj = j + d[1];
            if (ni >= 0 && ni < m && nj >= 0 && nj < n && !seen[ni][nj] && grid[ni][nj] >= grid[i][j])
                dfs(ni, nj, seen);
        }
    };
    for (int i = 0; i < m; i++) { dfs(i, 0, pac); dfs(i, n - 1, atl); }
    for (int j = 0; j < n; j++) { dfs(0, j, pac); dfs(m - 1, j, atl); }
    vector<vector<ll>> out;
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++)
            if (pac[i][j] && atl[i][j]) out.push_back({i, j});
    return out;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int r = stoi(toks[0]), c = stoi(toks[1]);
    vector<ll> vals;
    for (size_t i = 2; i < toks.size(); i++) vals.push_back(stoll(toks[i]));
    vector<vector<ll>> grid;
    for (int i = 0; i < r; i++) {
        vector<ll> row;
        for (int j = 0; j < c; j++) row.push_back(vals[i * c + j]);
        grid.push_back(row);
    }
    cout << fmtRows(solve(grid)) << '\\n';
    return 0;
}
`,
  "dsa-number-of-provinces": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

int solve(const vector<vector<ll>>& grid) {
    int n = (int)grid.size();
    vector<bool> seen(n, false);
    function<void(int)> dfs = [&](int i) {
        seen[i] = true;
        for (int j = 0; j < n; j++)
            if (grid[i][j] == 1 && !seen[j]) dfs(j);
    };
    int count = 0;
    for (int i = 0; i < n; i++)
        if (!seen[i]) { count++; dfs(i); }
    return count;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int r = stoi(toks[0]), c = stoi(toks[1]);
    vector<ll> vals;
    for (size_t i = 2; i < toks.size(); i++) vals.push_back(stoll(toks[i]));
    vector<vector<ll>> grid;
    for (int i = 0; i < r; i++) {
        vector<ll> row;
        for (int j = 0; j < c; j++) row.push_back(vals[i * c + j]);
        grid.push_back(row);
    }
    cout << solve(grid) << '\\n';
    return 0;
}
`,
  "dsa-word-ladder": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;

string trimStr(const string& s) {
    size_t a = s.find_first_not_of(" \\t\\r\\n\\f\\v");
    if (a == string::npos) return "";
    size_t b = s.find_last_not_of(" \\t\\r\\n\\f\\v");
    return s.substr(a, b - a + 1);
}

int solve(const string& begin, const string& end, const vector<string>& words) {
    unordered_set<string> wordSet(words.begin(), words.end());
    if (!wordSet.count(end)) return 0;
    queue<pair<string, int>> q;
    q.push({begin, 1});
    unordered_set<string> seen = {begin};
    while (!q.empty()) {
        auto [word, steps] = q.front(); q.pop();
        if (word == end) return steps;
        for (size_t i = 0; i < word.size(); i++) {
            for (char c = 'a'; c <= 'z'; c++) {
                string nxt = word;
                nxt[i] = c;
                if (wordSet.count(nxt) && !seen.count(nxt)) {
                    seen.insert(nxt);
                    q.push({nxt, steps + 1});
                }
            }
        }
    }
    return 0;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> lines;
    string line;
    while (getline(cin, line)) lines.push_back(line);
    string begin = lines.size() > 0 ? trimStr(lines[0]) : "";
    string end = lines.size() > 1 ? trimStr(lines[1]) : "";
    int n = lines.size() > 2 ? stoi(trimStr(lines[2])) : 0;
    vector<string> words;
    for (int i = 0; i < n && 3 + i < (int)lines.size(); i++) words.push_back(trimStr(lines[3 + i]));
    cout << solve(begin, end, words) << '\\n';
    return 0;
}
`,
  "dsa-keys-and-rooms": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;

bool solve(const vector<vector<int>>& rooms) {
    unordered_set<int> seen = {0};
    vector<int> st = {0};
    while (!st.empty()) {
        int r = st.back(); st.pop_back();
        for (int k : rooms[r]) {
            if (!seen.count(k)) { seen.insert(k); st.push_back(k); }
        }
    }
    return seen.size() == rooms.size();
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> lines;
    string line;
    while (getline(cin, line)) lines.push_back(line);
    int n = lines.empty() ? 0 : stoi(lines[0]);
    vector<vector<int>> rooms;
    for (int i = 0; i < n; i++) {
        vector<int> parts;
        if (1 + i < (int)lines.size()) {
            stringstream ss(lines[1 + i]);
            int v;
            while (ss >> v) parts.push_back(v);
        }
        vector<int> room;
        if (!parts.empty()) {
            int cnt = parts[0];
            for (int j = 0; j < cnt && 1 + j < (int)parts.size(); j++) room.push_back(parts[1 + j]);
        }
        rooms.push_back(room);
    }
    cout << (solve(rooms) ? "true" : "false") << '\\n';
    return 0;
}
`,
  "dsa-shortest-path-in-binary-matrix": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;

int solve(vector<string> grid) {
    int n = (int)grid.size();
    if (n == 0) return -1;
    if (grid[0][0] == '1' || grid[n - 1][n - 1] == '1') return -1;
    queue<tuple<int, int, int>> q;
    q.push({0, 0, 1});
    grid[0][0] = '1';
    while (!q.empty()) {
        auto [i, j, d] = q.front(); q.pop();
        if (i == n - 1 && j == n - 1) return d;
        for (int di = -1; di <= 1; di++) {
            for (int dj = -1; dj <= 1; dj++) {
                if (di == 0 && dj == 0) continue;
                int ni = i + di, nj = j + dj;
                if (ni >= 0 && ni < n && nj >= 0 && nj < n && grid[ni][nj] == '0') {
                    grid[ni][nj] = '1';
                    q.push({ni, nj, d + 1});
                }
            }
        }
    }
    return -1;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> lines;
    string line;
    while (getline(cin, line)) lines.push_back(line);
    int r = 0, c = 0;
    if (!lines.empty()) { stringstream ss(lines[0]); ss >> r >> c; }
    vector<string> grid;
    for (int i = 0; i < r && 1 + i < (int)lines.size(); i++) {
        string row;
        for (char ch : lines[1 + i]) if (ch != ' ') row += ch;
        grid.push_back(row);
    }
    cout << solve(grid) << '\\n';
    return 0;
}
`,
  "dsa-surrounded-regions": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;

string fmtCharRows(const vector<string>& rows) {
    string s;
    for (size_t i = 0; i < rows.size(); i++) { if (i) s += '\\n'; s += rows[i]; }
    return s;
}

vector<string> solve(vector<string> grid) {
    int m = (int)grid.size();
    int n = (int)grid[0].size();
    function<void(int, int)> dfs = [&](int i, int j) {
        if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] != 'O') return;
        grid[i][j] = 'S';
        dfs(i + 1, j);
        dfs(i - 1, j);
        dfs(i, j + 1);
        dfs(i, j - 1);
    };
    for (int i = 0; i < m; i++) { dfs(i, 0); dfs(i, n - 1); }
    for (int j = 0; j < n; j++) { dfs(0, j); dfs(m - 1, j); }
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++) {
            if (grid[i][j] == 'O') grid[i][j] = 'X';
            else if (grid[i][j] == 'S') grid[i][j] = 'O';
        }
    return grid;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> lines;
    string line;
    while (getline(cin, line)) lines.push_back(line);
    int r = 0, c = 0;
    if (!lines.empty()) { stringstream ss(lines[0]); ss >> r >> c; }
    vector<string> grid;
    for (int i = 0; i < r && 1 + i < (int)lines.size(); i++) {
        string row;
        for (char ch : lines[1 + i]) if (ch != ' ') row += ch;
        grid.push_back(row);
    }
    cout << fmtCharRows(solve(grid)) << '\\n';
    return 0;
}
`,
  "dsa-graph-valid-tree": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;

bool solve(int n, const vector<pair<int, int>>& edges) {
    if ((int)edges.size() != n - 1) return false;
    vector<int> parent(n);
    iota(parent.begin(), parent.end(), 0);
    function<int(int)> find = [&](int x) {
        while (parent[x] != x) { parent[x] = parent[parent[x]]; x = parent[x]; }
        return x;
    };
    for (auto& e : edges) {
        int ra = find(e.first), rb = find(e.second);
        if (ra == rb) return false;
        parent[ra] = rb;
    }
    return true;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]), m = stoi(toks[1]);
    vector<pair<int, int>> edges;
    for (int i = 0; i < m; i++)
        edges.push_back({stoi(toks[2 + 2 * i]), stoi(toks[3 + 2 * i])});
    cout << (solve(n, edges) ? "true" : "false") << '\\n';
    return 0;
}
`,
  "dsa-cheapest-flights-within-k-stops": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

ll solve(int n, const vector<tuple<int, int, ll>>& edges, int src, int dst, int k) {
    const ll INF = (ll)4e18;
    vector<ll> dist(n, INF);
    dist[src] = 0;
    for (int round = 0; round < k + 1; round++) {
        vector<ll> nxt = dist;
        for (auto& e : edges) {
            int u, v;
            ll w;
            tie(u, v, w) = e;
            if (dist[u] != INF && dist[u] + w < nxt[v]) nxt[v] = dist[u] + w;
        }
        dist = nxt;
    }
    return dist[dst] == INF ? -1 : dist[dst];
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]), m = stoi(toks[1]);
    vector<tuple<int, int, ll>> edges;
    for (int i = 0; i < m; i++)
        edges.push_back({stoi(toks[2 + 3 * i]), stoi(toks[3 + 3 * i]), stoll(toks[4 + 3 * i])});
    int src = stoi(toks[2 + 3 * m]);
    int dst = stoi(toks[3 + 3 * m]);
    int k = stoi(toks[4 + 3 * m]);
    cout << solve(n, edges, src, dst, k) << '\\n';
    return 0;
}
`,
  "dsa-climbing-stairs": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

ll solve(ll n) {
    ll a = 1, b = 1;
    for (ll i = 0; i < n - 1; i++) {
        ll tmp = b;
        b = a + b;
        a = tmp;
    }
    return b;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    ll n = stoll(toks[0]);
    cout << solve(n) << '\\n';
    return 0;
}
`,
  "dsa-house-robber": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

ll solve(vector<ll> nums) {
    ll prev2 = 0, prev1 = 0;
    for (ll x : nums) {
        ll tmp = prev1;
        prev1 = max(prev1, prev2 + x);
        prev2 = tmp;
    }
    return prev1;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> nums;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) nums.push_back(stoll(toks[1 + i]));
    cout << solve(nums) << '\\n';
    return 0;
}
`,
  "dsa-house-robber-ii": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

ll robRange(const vector<ll>& arr) {
    ll prev2 = 0, prev1 = 0;
    for (ll x : arr) {
        ll tmp = prev1;
        prev1 = max(prev1, prev2 + x);
        prev2 = tmp;
    }
    return prev1;
}

ll solve(vector<ll> nums) {
    if (nums.size() == 1) return nums[0];
    vector<ll> a(nums.begin(), nums.end() - 1);
    vector<ll> b(nums.begin() + 1, nums.end());
    return max(robRange(a), robRange(b));
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> nums;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) nums.push_back(stoll(toks[1 + i]));
    cout << solve(nums) << '\\n';
    return 0;
}
`,
  "dsa-coin-change": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

ll solve(vector<ll> coins, ll amount) {
    ll INF = amount + 1;
    vector<ll> dp(amount + 1, INF);
    dp[0] = 0;
    for (ll a = 1; a <= amount; a++)
        for (ll c : coins)
            if (c <= a) dp[a] = min(dp[a], dp[a - c] + 1);
    return dp[amount] == INF ? -1 : dp[amount];
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> nums;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) nums.push_back(stoll(toks[1 + i]));
    ll target = stoll(toks[1 + n]);
    cout << solve(nums, target) << '\\n';
    return 0;
}
`,
  "dsa-coin-change-ii": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

ll solve(vector<ll> coins, ll amount) {
    vector<ll> dp(amount + 1, 0);
    dp[0] = 1;
    for (ll c : coins)
        for (ll a = c; a <= amount; a++)
            dp[a] += dp[a - c];
    return dp[amount];
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> nums;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) nums.push_back(stoll(toks[1 + i]));
    ll target = stoll(toks[1 + n]);
    cout << solve(nums, target) << '\\n';
    return 0;
}
`,
  "dsa-longest-increasing-subsequence": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

int solve(vector<ll> nums) {
    vector<ll> tails;
    for (ll x : nums) {
        auto it = lower_bound(tails.begin(), tails.end(), x);
        if (it == tails.end()) tails.push_back(x);
        else *it = x;
    }
    return (int)tails.size();
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> nums;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) nums.push_back(stoll(toks[1 + i]));
    cout << solve(nums) << '\\n';
    return 0;
}
`,
  "dsa-edit-distance": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;

string trimStr(const string& s) {
    size_t a = s.find_first_not_of(" \\t\\r\\n\\f\\v");
    if (a == string::npos) return "";
    size_t b = s.find_last_not_of(" \\t\\r\\n\\f\\v");
    return s.substr(a, b - a + 1);
}

int solve(const string& w1, const string& w2) {
    int m = (int)w1.size(), n = (int)w2.size();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
    for (int i = 0; i <= m; i++) dp[i][0] = i;
    for (int j = 0; j <= n; j++) dp[0][j] = j;
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (w1[i - 1] == w2[j - 1]) dp[i][j] = dp[i - 1][j - 1];
            else dp[i][j] = 1 + min({dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]});
        }
    }
    return dp[m][n];
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> lines;
    string line;
    while (getline(cin, line)) lines.push_back(line);
    string s1 = lines.size() > 0 ? trimStr(lines[0]) : "";
    string s2 = lines.size() > 1 ? trimStr(lines[1]) : "";
    cout << solve(s1, s2) << '\\n';
    return 0;
}
`,
  "dsa-longest-common-subsequence": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;

string trimStr(const string& s) {
    size_t a = s.find_first_not_of(" \\t\\r\\n\\f\\v");
    if (a == string::npos) return "";
    size_t b = s.find_last_not_of(" \\t\\r\\n\\f\\v");
    return s.substr(a, b - a + 1);
}

int solve(const string& t1, const string& t2) {
    int m = (int)t1.size(), n = (int)t2.size();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (t1[i - 1] == t2[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
            else dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
        }
    }
    return dp[m][n];
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> lines;
    string line;
    while (getline(cin, line)) lines.push_back(line);
    string s1 = lines.size() > 0 ? trimStr(lines[0]) : "";
    string s2 = lines.size() > 1 ? trimStr(lines[1]) : "";
    cout << solve(s1, s2) << '\\n';
    return 0;
}
`,
  "dsa-unique-paths": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

ll solve(int m, int n) {
    vector<ll> dp(n, 1);
    for (int i = 1; i < m; i++)
        for (int j = 1; j < n; j++)
            dp[j] += dp[j - 1];
    return dp[n - 1];
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.size() < 2) return 0;
    int a = stoi(toks[0]), b = stoi(toks[1]);
    cout << solve(a, b) << '\\n';
    return 0;
}
`,
  "dsa-unique-paths-ii": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

ll solve(const vector<vector<ll>>& grid) {
    int m = (int)grid.size();
    int n = (int)grid[0].size();
    if (grid[0][0] == 1 || grid[m - 1][n - 1] == 1) return 0;
    vector<vector<ll>> dp(m, vector<ll>(n, 0));
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

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int r = stoi(toks[0]), c = stoi(toks[1]);
    vector<ll> vals;
    for (size_t i = 2; i < toks.size(); i++) vals.push_back(stoll(toks[i]));
    vector<vector<ll>> grid;
    for (int i = 0; i < r; i++) {
        vector<ll> row;
        for (int j = 0; j < c; j++) row.push_back(vals[i * c + j]);
        grid.push_back(row);
    }
    cout << solve(grid) << '\\n';
    return 0;
}
`,
  "dsa-word-break": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;

string trimStr(const string& s) {
    size_t a = s.find_first_not_of(" \\t\\r\\n\\f\\v");
    if (a == string::npos) return "";
    size_t b = s.find_last_not_of(" \\t\\r\\n\\f\\v");
    return s.substr(a, b - a + 1);
}

bool solve(const string& s, const vector<string>& words) {
    unordered_set<string> wordSet(words.begin(), words.end());
    vector<bool> dp(s.size() + 1, false);
    dp[0] = true;
    for (size_t i = 1; i <= s.size(); i++) {
        for (size_t j = 0; j < i; j++) {
            if (dp[j] && wordSet.count(s.substr(j, i - j))) { dp[i] = true; break; }
        }
    }
    return dp[s.size()];
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> lines;
    string line;
    while (getline(cin, line)) lines.push_back(line);
    string s = lines.size() > 0 ? trimStr(lines[0]) : "";
    int n = lines.size() > 1 ? stoi(trimStr(lines[1])) : 0;
    vector<string> words;
    for (int i = 0; i < n && 2 + i < (int)lines.size(); i++) words.push_back(trimStr(lines[2 + i]));
    cout << (solve(s, words) ? "true" : "false") << '\\n';
    return 0;
}
`,
  "dsa-decode-ways": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;

string trimStr(const string& s) {
    size_t a = s.find_first_not_of(" \\t\\r\\n\\f\\v");
    if (a == string::npos) return "";
    size_t b = s.find_last_not_of(" \\t\\r\\n\\f\\v");
    return s.substr(a, b - a + 1);
}

int solve(const string& s) {
    if (s.empty() || s[0] == '0') return 0;
    int prev2 = 1, prev1 = 1;
    for (size_t i = 1; i < s.size(); i++) {
        int cur = 0;
        if (s[i] != '0') cur += prev1;
        int two = stoi(s.substr(i - 1, 2));
        if (two >= 10 && two <= 26) cur += prev2;
        prev2 = prev1;
        prev1 = cur;
    }
    return prev1;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string raw((istreambuf_iterator<char>(cin)), istreambuf_iterator<char>());
    string s = trimStr(raw);
    cout << solve(s) << '\\n';
    return 0;
}
`,
  "dsa-partition-equal-subset-sum": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

bool solve(vector<ll> nums) {
    ll total = 0;
    for (ll x : nums) total += x;
    if (total % 2 != 0) return false;
    ll target = total / 2;
    vector<bool> dp(target + 1, false);
    dp[0] = true;
    for (ll x : nums)
        for (ll s = target; s >= x; s--)
            dp[s] = dp[s] || dp[s - x];
    return dp[target];
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> nums;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) nums.push_back(stoll(toks[1 + i]));
    cout << (solve(nums) ? "true" : "false") << '\\n';
    return 0;
}
`,
  "dsa-longest-palindromic-subsequence": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;

string trimStr(const string& s) {
    size_t a = s.find_first_not_of(" \\t\\r\\n\\f\\v");
    if (a == string::npos) return "";
    size_t b = s.find_last_not_of(" \\t\\r\\n\\f\\v");
    return s.substr(a, b - a + 1);
}

int solve(const string& s) {
    int n = (int)s.size();
    if (n == 0) return 0;
    vector<vector<int>> dp(n, vector<int>(n, 0));
    for (int i = 0; i < n; i++) dp[i][i] = 1;
    for (int length = 2; length <= n; length++) {
        for (int i = 0; i + length - 1 < n; i++) {
            int j = i + length - 1;
            if (s[i] == s[j]) dp[i][j] = (length == 2) ? 2 : dp[i + 1][j - 1] + 2;
            else dp[i][j] = max(dp[i + 1][j], dp[i][j - 1]);
        }
    }
    return dp[0][n - 1];
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string raw((istreambuf_iterator<char>(cin)), istreambuf_iterator<char>());
    string s = trimStr(raw);
    cout << solve(s) << '\\n';
    return 0;
}
`,
  "dsa-best-time-to-buy-sell-stock-ii": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

ll solve(vector<ll> prices) {
    ll profit = 0;
    for (size_t i = 1; i < prices.size(); i++)
        if (prices[i] > prices[i - 1]) profit += prices[i] - prices[i - 1];
    return profit;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> nums;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) nums.push_back(stoll(toks[1 + i]));
    cout << solve(nums) << '\\n';
    return 0;
}
`,
  "dsa-gas-station": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

ll solve(vector<ll> gas, vector<ll> cost) {
    ll total = 0, tank = 0;
    int start = 0;
    for (size_t i = 0; i < gas.size(); i++) {
        ll diff = gas[i] - cost[i];
        total += diff;
        tank += diff;
        if (tank < 0) { start = (int)i + 1; tank = 0; }
    }
    return total >= 0 ? start : -1;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> a;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) a.push_back(stoll(toks[1 + i]));
    int m = stoi(toks[1 + n]);
    vector<ll> b;
    for (int i = 0; i < m && 2 + n + i < (int)toks.size(); i++) b.push_back(stoll(toks[2 + n + i]));
    cout << solve(a, b) << '\\n';
    return 0;
}
`,
  "dsa-assign-cookies": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

int solve(vector<ll> g, vector<ll> s) {
    sort(g.begin(), g.end());
    sort(s.begin(), s.end());
    size_t child = 0, cookie = 0;
    while (child < g.size() && cookie < s.size()) {
        if (s[cookie] >= g[child]) child++;
        cookie++;
    }
    return (int)child;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> a;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) a.push_back(stoll(toks[1 + i]));
    int m = stoi(toks[1 + n]);
    vector<ll> b;
    for (int i = 0; i < m && 2 + n + i < (int)toks.size(); i++) b.push_back(stoll(toks[2 + n + i]));
    cout << solve(a, b) << '\\n';
    return 0;
}
`,
  "dsa-non-overlapping-intervals": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

int solve(vector<pair<ll, ll>> intervals) {
    sort(intervals.begin(), intervals.end(), [](const pair<ll, ll>& a, const pair<ll, ll>& b) {
        return a.second < b.second;
    });
    int kept = 0;
    ll end = LLONG_MIN;
    for (auto& iv : intervals) {
        if (iv.first >= end) { kept++; end = iv.second; }
    }
    return (int)intervals.size() - kept;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<pair<ll, ll>> intervals;
    for (int i = 0; i < n; i++)
        intervals.push_back({stoll(toks[1 + 2 * i]), stoll(toks[2 + 2 * i])});
    cout << solve(intervals) << '\\n';
    return 0;
}
`,
  "dsa-partition-labels": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;

string trimStr(const string& s) {
    size_t a = s.find_first_not_of(" \\t\\r\\n\\f\\v");
    if (a == string::npos) return "";
    size_t b = s.find_last_not_of(" \\t\\r\\n\\f\\v");
    return s.substr(a, b - a + 1);
}

string fmtVec(const vector<int>& v) {
    string s;
    for (size_t i = 0; i < v.size(); i++) { if (i) s += ' '; s += to_string(v[i]); }
    return s;
}

vector<int> solve(const string& s) {
    unordered_map<char, int> last;
    for (int i = 0; i < (int)s.size(); i++) last[s[i]] = i;
    vector<int> out;
    int start = 0, end = 0;
    for (int i = 0; i < (int)s.size(); i++) {
        end = max(end, last[s[i]]);
        if (i == end) { out.push_back(end - start + 1); start = i + 1; }
    }
    return out;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string raw((istreambuf_iterator<char>(cin)), istreambuf_iterator<char>());
    string s = trimStr(raw);
    cout << fmtVec(solve(s)) << '\\n';
    return 0;
}
`,
  "dsa-lemonade-change": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

bool solve(vector<ll> bills) {
    int fives = 0, tens = 0;
    for (ll b : bills) {
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

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> nums;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) nums.push_back(stoll(toks[1 + i]));
    cout << (solve(nums) ? "true" : "false") << '\\n';
    return 0;
}
`,
  "dsa-subsets": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

string fmtRows(const vector<vector<ll>>& rows) {
    string s;
    for (size_t i = 0; i < rows.size(); i++) {
        if (i) s += '\\n';
        for (size_t j = 0; j < rows[i].size(); j++) { if (j) s += ' '; s += to_string(rows[i][j]); }
    }
    return s;
}

vector<vector<ll>> solve(const vector<ll>& nums) {
    vector<vector<ll>> out;
    vector<ll> cur;
    function<void(int)> backtrack = [&](int i) {
        if (i == (int)nums.size()) { out.push_back(cur); return; }
        backtrack(i + 1);
        cur.push_back(nums[i]);
        backtrack(i + 1);
        cur.pop_back();
    };
    backtrack(0);
    return out;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> nums;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) nums.push_back(stoll(toks[1 + i]));
    cout << fmtRows(solve(nums)) << '\\n';
    return 0;
}
`,
  "dsa-permutations": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

string fmtRows(const vector<vector<ll>>& rows) {
    string s;
    for (size_t i = 0; i < rows.size(); i++) {
        if (i) s += '\\n';
        for (size_t j = 0; j < rows[i].size(); j++) { if (j) s += ' '; s += to_string(rows[i][j]); }
    }
    return s;
}

vector<vector<ll>> solve(const vector<ll>& nums) {
    vector<vector<ll>> out;
    vector<ll> cur;
    vector<bool> used(nums.size(), false);
    function<void()> backtrack = [&]() {
        if (cur.size() == nums.size()) { out.push_back(cur); return; }
        for (size_t i = 0; i < nums.size(); i++) {
            if (used[i]) continue;
            used[i] = true;
            cur.push_back(nums[i]);
            backtrack();
            cur.pop_back();
            used[i] = false;
        }
    };
    backtrack();
    return out;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> nums;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) nums.push_back(stoll(toks[1 + i]));
    cout << fmtRows(solve(nums)) << '\\n';
    return 0;
}
`,
  "dsa-combination-sum": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;
using ll = long long;

string fmtRows(const vector<vector<ll>>& rows) {
    string s;
    for (size_t i = 0; i < rows.size(); i++) {
        if (i) s += '\\n';
        for (size_t j = 0; j < rows[i].size(); j++) { if (j) s += ' '; s += to_string(rows[i][j]); }
    }
    return s;
}

vector<vector<ll>> solve(vector<ll> candidates, ll target) {
    sort(candidates.begin(), candidates.end());
    vector<vector<ll>> out;
    vector<ll> cur;
    function<void(int, ll)> backtrack = [&](int start, ll remaining) {
        if (remaining == 0) { out.push_back(cur); return; }
        for (int i = start; i < (int)candidates.size(); i++) {
            if (candidates[i] > remaining) break;
            cur.push_back(candidates[i]);
            backtrack(i, remaining - candidates[i]);
            cur.pop_back();
        }
    };
    backtrack(0, target);
    return out;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<ll> nums;
    for (int i = 0; i < n && 1 + i < (int)toks.size(); i++) nums.push_back(stoll(toks[1 + i]));
    ll target = stoll(toks[1 + n]);
    cout << fmtRows(solve(nums, target)) << '\\n';
    return 0;
}
`,
  "dsa-generate-parentheses": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;

vector<string> solve(int n) {
    vector<string> out;
    string cur;
    function<void(int, int)> backtrack = [&](int openCount, int closeCount) {
        if ((int)cur.size() == 2 * n) { out.push_back(cur); return; }
        if (openCount < n) { cur.push_back('('); backtrack(openCount + 1, closeCount); cur.pop_back(); }
        if (closeCount < openCount) { cur.push_back(')'); backtrack(openCount, closeCount + 1); cur.pop_back(); }
    };
    backtrack(0, 0);
    return out;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    vector<string> out = solve(n);
    for (size_t i = 0; i < out.size(); i++) {
        if (i) cout << '\\n';
        cout << out[i];
    }
    cout << '\\n';
    return 0;
}
`,
  "dsa-letter-combinations-of-phone-number": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;

string trimStr(const string& s) {
    size_t a = s.find_first_not_of(" \\t\\r\\n\\f\\v");
    if (a == string::npos) return "";
    size_t b = s.find_last_not_of(" \\t\\r\\n\\f\\v");
    return s.substr(a, b - a + 1);
}

string fmtVecStr(const vector<string>& v) {
    string s;
    for (size_t i = 0; i < v.size(); i++) { if (i) s += ' '; s += v[i]; }
    return s;
}

vector<string> solve(const string& digits) {
    if (digits.empty()) return {};
    unordered_map<char, string> mapping = {
        {'2', "abc"}, {'3', "def"}, {'4', "ghi"}, {'5', "jkl"},
        {'6', "mno"}, {'7', "pqrs"}, {'8', "tuv"}, {'9', "wxyz"}};
    vector<string> out;
    string cur;
    function<void(int)> backtrack = [&](int i) {
        if (i == (int)digits.size()) { out.push_back(cur); return; }
        for (char c : mapping[digits[i]]) {
            cur.push_back(c);
            backtrack(i + 1);
            cur.pop_back();
        }
    };
    backtrack(0);
    return out;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    string raw((istreambuf_iterator<char>(cin)), istreambuf_iterator<char>());
    string s = trimStr(raw);
    cout << fmtVecStr(solve(s)) << '\\n';
    return 0;
}
`,
  "dsa-n-queens-count": `#include <algorithm>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;

int solve(int n) {
    int count = 0;
    unordered_set<int> cols, diag1, diag2;
    function<void(int)> backtrack = [&](int row) {
        if (row == n) { count++; return; }
        for (int col = 0; col < n; col++) {
            if (cols.count(col) || diag1.count(row - col) || diag2.count(row + col)) continue;
            cols.insert(col);
            diag1.insert(row - col);
            diag2.insert(row + col);
            backtrack(row + 1);
            cols.erase(col);
            diag1.erase(row - col);
            diag2.erase(row + col);
        }
    };
    backtrack(0);
    return count;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    vector<string> toks;
    string t;
    while (cin >> t) toks.push_back(t);
    if (toks.empty()) return 0;
    int n = stoi(toks[0]);
    cout << solve(n) << '\\n';
    return 0;
}
`,
};
