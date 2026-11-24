// Go starters for the DSA problems in dsa.ts.
// Each value is a complete runnable Go program (package main) that reads
// the same stdin format as the Python starter for its problem and prints
// byte-identical stdout. Generated from fragments in .cf-dsa-go/frag.
export const DSA_STARTERS_GO: Record<string, string> = {
  "dsa-two-sum": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func fmtInts(xs []int) string {
	parts := make([]string, len(xs))
	for i, v := range xs {
		parts[i] = strconv.Itoa(v)
	}
	return strings.Join(parts, " ")
}

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func solve(nums []int, target int) []int {
	seen := map[int]int{}
	for i, x := range nums {
		if j, ok := seen[target-x]; ok {
			return []int{j, i}
		}
		seen[x] = i
	}
	return []int{-1, -1}
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	nums := intsFrom(data, 1, n)
	target := atoi(data[1+n])
	fmt.Println(fmtInts(solve(nums, target)))
}
`,
  "dsa-best-time-to-buy-sell-stock": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func minInt(a, b int) int {
	if a < b {
		return a
	}
	return b
}

func maxInt(a, b int) int {
	if a > b {
		return a
	}
	return b
}

func solve(prices []int) int {
	best := 0
	low := prices[0]
	for _, p := range prices[1:] {
		best = maxInt(best, p-low)
		low = minInt(low, p)
	}
	return best
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	nums := intsFrom(data, 1, n)
	fmt.Println(solve(nums))
}
`,
  "dsa-maximum-subarray": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func maxInt(a, b int) int {
	if a > b {
		return a
	}
	return b
}

func solve(nums []int) int {
	best := nums[0]
	cur := nums[0]
	for _, x := range nums[1:] {
		cur = maxInt(x, cur+x)
		best = maxInt(best, cur)
	}
	return best
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	nums := intsFrom(data, 1, n)
	fmt.Println(solve(nums))
}
`,
  "dsa-contains-duplicate": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func fmtBool(b bool) string {
	if b {
		return "true"
	}
	return "false"
}

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func solve(nums []int) bool {
	seen := map[int]bool{}
	for _, x := range nums {
		if seen[x] {
			return true
		}
		seen[x] = true
	}
	return false
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	nums := intsFrom(data, 1, n)
	fmt.Println(fmtBool(solve(nums)))
}
`,
  "dsa-product-of-array-except-self": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func fmtInts(xs []int) string {
	parts := make([]string, len(xs))
	for i, v := range xs {
		parts[i] = strconv.Itoa(v)
	}
	return strings.Join(parts, " ")
}

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func solve(nums []int) []int {
	n := len(nums)
	out := make([]int, n)
	for i := range out {
		out[i] = 1
	}
	left := 1
	for i := 0; i < n; i++ {
		out[i] = left
		left *= nums[i]
	}
	right := 1
	for i := n - 1; i >= 0; i-- {
		out[i] *= right
		right *= nums[i]
	}
	return out
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	nums := intsFrom(data, 1, n)
	fmt.Println(fmtInts(solve(nums)))
}
`,
  "dsa-rotate-array": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func fmtInts(xs []int) string {
	parts := make([]string, len(xs))
	for i, v := range xs {
		parts[i] = strconv.Itoa(v)
	}
	return strings.Join(parts, " ")
}

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func solve(nums []int, k int) []int {
	n := len(nums)
	if n == 0 {
		return nums
	}
	k %= n
	if k != 0 {
		tmp := append(append([]int{}, nums[n-k:]...), nums[:n-k]...)
		copy(nums, tmp)
	}
	return nums
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	nums := intsFrom(data, 1, n)
	k := atoi(data[1+n])
	fmt.Println(fmtInts(solve(nums, k)))
}
`,
  "dsa-move-zeroes": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func fmtInts(xs []int) string {
	parts := make([]string, len(xs))
	for i, v := range xs {
		parts[i] = strconv.Itoa(v)
	}
	return strings.Join(parts, " ")
}

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func solve(nums []int) []int {
	pos := 0
	for _, x := range nums {
		if x != 0 {
			nums[pos] = x
			pos++
		}
	}
	for i := pos; i < len(nums); i++ {
		nums[i] = 0
	}
	return nums
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	nums := intsFrom(data, 1, n)
	fmt.Println(fmtInts(solve(nums)))
}
`,
  "dsa-majority-element": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func solve(nums []int) int {
	cand := 0
	count := 0
	for _, x := range nums {
		if count == 0 {
			cand = x
			count = 1
		} else if x == cand {
			count++
		} else {
			count--
		}
	}
	return cand
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	nums := intsFrom(data, 1, n)
	fmt.Println(solve(nums))
}
`,
  "dsa-missing-number": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func solve(nums []int) int {
	n := len(nums)
	sum := 0
	for _, x := range nums {
		sum += x
	}
	return n*(n+1)/2 - sum
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	nums := intsFrom(data, 1, n)
	fmt.Println(solve(nums))
}
`,
  "dsa-find-duplicate-number": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func solve(nums []int) int {
	slow := nums[0]
	fast := nums[0]
	for {
		slow = nums[slow]
		fast = nums[nums[fast]]
		if slow == fast {
			break
		}
	}
	slow = nums[0]
	for slow != fast {
		slow = nums[slow]
		fast = nums[fast]
	}
	return slow
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	nums := intsFrom(data, 1, n)
	fmt.Println(solve(nums))
}
`,
  "dsa-merge-sorted-array": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func fmtInts(xs []int) string {
	parts := make([]string, len(xs))
	for i, v := range xs {
		parts[i] = strconv.Itoa(v)
	}
	return strings.Join(parts, " ")
}

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func solve(a, b []int) []int {
	out := []int{}
	i, j := 0, 0
	for i < len(a) && j < len(b) {
		if a[i] <= b[j] {
			out = append(out, a[i])
			i++
		} else {
			out = append(out, b[j])
			j++
		}
	}
	out = append(out, a[i:]...)
	out = append(out, b[j:]...)
	return out
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	a := intsFrom(data, 1, n)
	m := atoi(data[1+n])
	b := intsFrom(data, 2+n, m)
	fmt.Println(fmtInts(solve(a, b)))
}
`,
  "dsa-maximum-product-subarray": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func minInt(a, b int) int {
	if a < b {
		return a
	}
	return b
}

func maxInt(a, b int) int {
	if a > b {
		return a
	}
	return b
}

func solve(nums []int) int {
	best := nums[0]
	curMax := nums[0]
	curMin := nums[0]
	for _, x := range nums[1:] {
		if x < 0 {
			curMax, curMin = curMin, curMax
		}
		curMax = maxInt(x, curMax*x)
		curMin = minInt(x, curMin*x)
		best = maxInt(best, curMax)
	}
	return best
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	nums := intsFrom(data, 1, n)
	fmt.Println(solve(nums))
}
`,
  "dsa-trapping-rain-water": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func solve(height []int) int {
	left := 0
	right := len(height) - 1
	leftMax := 0
	rightMax := 0
	water := 0
	for left < right {
		if height[left] < height[right] {
			if height[left] >= leftMax {
				leftMax = height[left]
			} else {
				water += leftMax - height[left]
			}
			left++
		} else {
			if height[right] >= rightMax {
				rightMax = height[right]
			} else {
				water += rightMax - height[right]
			}
			right--
		}
	}
	return water
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	nums := intsFrom(data, 1, n)
	fmt.Println(solve(nums))
}
`,
  "dsa-jump-game": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func fmtBool(b bool) string {
	if b {
		return "true"
	}
	return "false"
}

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func maxInt(a, b int) int {
	if a > b {
		return a
	}
	return b
}

func solve(nums []int) bool {
	reach := 0
	for i, x := range nums {
		if i > reach {
			return false
		}
		reach = maxInt(reach, i+x)
	}
	return true
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	nums := intsFrom(data, 1, n)
	fmt.Println(fmtBool(solve(nums)))
}
`,
  "dsa-jump-game-ii": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func maxInt(a, b int) int {
	if a > b {
		return a
	}
	return b
}

func solve(nums []int) int {
	jumps := 0
	curEnd := 0
	farthest := 0
	for i := 0; i < len(nums)-1; i++ {
		farthest = maxInt(farthest, i+nums[i])
		if i == curEnd {
			jumps++
			curEnd = farthest
		}
	}
	return jumps
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	nums := intsFrom(data, 1, n)
	fmt.Println(solve(nums))
}
`,
  "dsa-subarray-sum-equals-k": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func solve(nums []int, k int) int {
	counts := map[int]int{0: 1}
	prefix := 0
	ans := 0
	for _, x := range nums {
		prefix += x
		ans += counts[prefix-k]
		counts[prefix]++
	}
	return ans
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	nums := intsFrom(data, 1, n)
	k := atoi(data[1+n])
	fmt.Println(solve(nums, k))
}
`,
  "dsa-sort-colors": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func fmtInts(xs []int) string {
	parts := make([]string, len(xs))
	for i, v := range xs {
		parts[i] = strconv.Itoa(v)
	}
	return strings.Join(parts, " ")
}

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func solve(nums []int) []int {
	low := 0
	mid := 0
	high := len(nums) - 1
	for mid <= high {
		if nums[mid] == 0 {
			nums[low], nums[mid] = nums[mid], nums[low]
			low++
			mid++
		} else if nums[mid] == 1 {
			mid++
		} else {
			nums[mid], nums[high] = nums[high], nums[mid]
			high--
		}
	}
	return nums
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	nums := intsFrom(data, 1, n)
	fmt.Println(fmtInts(solve(nums)))
}
`,
  "dsa-first-missing-positive": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func solve(nums []int) int {
	n := len(nums)
	for i := 0; i < n; i++ {
		for nums[i] >= 1 && nums[i] <= n && nums[nums[i]-1] != nums[i] {
			nums[nums[i]-1], nums[i] = nums[i], nums[nums[i]-1]
		}
	}
	for i := 0; i < n; i++ {
		if nums[i] != i+1 {
			return i + 1
		}
	}
	return n + 1
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	nums := intsFrom(data, 1, n)
	fmt.Println(solve(nums))
}
`,
  "dsa-valid-palindrome": `package main

import (
	"fmt"
	"io"
	"os"
	"strings"
	"unicode"
)

func fmtBool(b bool) string {
	if b {
		return "true"
	}
	return "false"
}

func readRaw() string {
	data, _ := io.ReadAll(os.Stdin)
	return string(data)
}

func solve(s string) bool {
	var chars []rune
	for _, c := range s {
		if unicode.IsLetter(c) || unicode.IsDigit(c) {
			chars = append(chars, unicode.ToLower(c))
		}
	}
	for i, j := 0, len(chars)-1; i < j; i, j = i+1, j-1 {
		if chars[i] != chars[j] {
			return false
		}
	}
	return true
}

func main() {
	s := strings.TrimSpace(readRaw())
	fmt.Println(fmtBool(solve(s)))
}
`,
  "dsa-valid-anagram": `package main

import (
	"fmt"
	"io"
	"os"
	"strings"
)

func fmtBool(b bool) string {
	if b {
		return "true"
	}
	return "false"
}

func readLines() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Split(string(data), "\\n")
}

func solve(s, t string) bool {
	if len(s) != len(t) {
		return false
	}
	cs := map[rune]int{}
	ct := map[rune]int{}
	for _, c := range s {
		cs[c]++
	}
	for _, c := range t {
		ct[c]++
	}
	if len(cs) != len(ct) {
		return false
	}
	for k, v := range cs {
		if ct[k] != v {
			return false
		}
	}
	return true
}

func main() {
	lines := readLines()
	s1 := ""
	s2 := ""
	if len(lines) > 0 {
		s1 = strings.TrimSpace(lines[0])
	}
	if len(lines) > 1 {
		s2 = strings.TrimSpace(lines[1])
	}
	fmt.Println(fmtBool(solve(s1, s2)))
}
`,
  "dsa-longest-substring-without-repeating": `package main

import (
	"fmt"
	"io"
	"os"
	"strings"
)

func readRaw() string {
	data, _ := io.ReadAll(os.Stdin)
	return string(data)
}

func maxInt(a, b int) int {
	if a > b {
		return a
	}
	return b
}

func solve(s string) int {
	rs := []rune(s)
	last := map[rune]int{}
	best := 0
	start := 0
	for i, c := range rs {
		if j, ok := last[c]; ok && j >= start {
			start = j + 1
		}
		last[c] = i
		best = maxInt(best, i-start+1)
	}
	return best
}

func main() {
	s := strings.TrimSpace(readRaw())
	fmt.Println(solve(s))
}
`,
  "dsa-longest-palindromic-substring": `package main

import (
	"fmt"
	"io"
	"os"
	"strings"
)

func readRaw() string {
	data, _ := io.ReadAll(os.Stdin)
	return string(data)
}

func solve(s string) string {
	if len(s) == 0 {
		return ""
	}
	runes := []rune(s)
	best := string(runes[0])
	expand := func(l, r int) string {
		for l >= 0 && r < len(runes) && runes[l] == runes[r] {
			l--
			r++
		}
		return string(runes[l+1 : r])
	}
	for i := range runes {
		for _, cand := range []string{expand(i, i), expand(i, i+1)} {
			if len(cand) > len(best) {
				best = cand
			}
		}
	}
	return best
}

func main() {
	s := strings.TrimSpace(readRaw())
	fmt.Println(solve(s))
}
`,
  "dsa-group-anagrams": `package main

import (
	"fmt"
	"io"
	"os"
	"sort"
	"strconv"
	"strings"
)

func fmtStrRows(rows [][]string) string {
	lines := make([]string, len(rows))
	for i, r := range rows {
		if len(r) == 0 {
			lines[i] = ""
		} else if len(r[0]) == 1 {
			lines[i] = strings.Join(r, "")
		} else {
			lines[i] = strings.Join(r, " ")
		}
	}
	return strings.Join(lines, "\\n")
}

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func minInt(a, b int) int {
	if a < b {
		return a
	}
	return b
}

func solve(words []string) [][]string {
	groups := map[string][]string{}
	for _, w := range words {
		rs := []rune(w)
		sort.Slice(rs, func(i, j int) bool { return rs[i] < rs[j] })
		key := string(rs)
		groups[key] = append(groups[key], w)
	}
	out := [][]string{}
	for _, g := range groups {
		sort.Strings(g)
		out = append(out, g)
	}
	sort.Slice(out, func(i, j int) bool { return out[i][0] < out[j][0] })
	return out
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	words := []string{}
	if 1+n <= len(data) {
		words = data[1:minInt(1+n, len(data))]
	}
	fmt.Println(fmtStrRows(solve(words)))
}
`,
  "dsa-valid-parentheses": `package main

import (
	"fmt"
	"io"
	"os"
	"strings"
)

func fmtBool(b bool) string {
	if b {
		return "true"
	}
	return "false"
}

func readRaw() string {
	data, _ := io.ReadAll(os.Stdin)
	return string(data)
}

func solve(s string) bool {
	stack := []rune{}
	pairs := map[rune]rune{')': '(', ']': '[', '}': '{'}
	for _, c := range s {
		switch c {
		case '(', '[', '{':
			stack = append(stack, c)
		default:
			if len(stack) == 0 || stack[len(stack)-1] != pairs[c] {
				return false
			}
			stack = stack[:len(stack)-1]
		}
	}
	return len(stack) == 0
}

func main() {
	s := strings.TrimSpace(readRaw())
	fmt.Println(fmtBool(solve(s)))
}
`,
  "dsa-string-to-integer-atoi": `package main

import (
	"fmt"
	"io"
	"os"
	"strings"
)

func readRaw() string {
	data, _ := io.ReadAll(os.Stdin)
	return string(data)
}

func solve(s string) int {
	i := 0
	n := len(s)
	for i < n && s[i] == ' ' {
		i++
	}
	sign := int64(1)
	if i < n && (s[i] == '+' || s[i] == '-') {
		if s[i] == '-' {
			sign = -1
		}
		i++
	}
	var num int64
	for i < n && s[i] >= '0' && s[i] <= '9' {
		num = num*10 + int64(s[i]-'0')
		if num > 2147483648 {
			num = 2147483648
		}
		i++
	}
	num *= sign
	if num > 2147483647 {
		num = 2147483647
	}
	if num < -2147483648 {
		num = -2147483648
	}
	return int(num)
}

func main() {
	s := strings.TrimSpace(readRaw())
	fmt.Println(solve(s))
}
`,
  "dsa-longest-common-prefix": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func minInt(a, b int) int {
	if a < b {
		return a
	}
	return b
}

func solve(words []string) string {
	if len(words) == 0 {
		return ""
	}
	prefix := words[0]
	for _, w := range words[1:] {
		for !strings.HasPrefix(w, prefix) {
			prefix = prefix[:len(prefix)-1]
			if prefix == "" {
				return ""
			}
		}
	}
	return prefix
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	words := []string{}
	if 1+n <= len(data) {
		words = data[1:minInt(1+n, len(data))]
	}
	fmt.Println(solve(words))
}
`,
  "dsa-reverse-words-in-string": `package main

import (
	"fmt"
	"io"
	"os"
	"strings"
)

func readRaw() string {
	data, _ := io.ReadAll(os.Stdin)
	return string(data)
}

func solve(s string) string {
	words := strings.Fields(s)
	for i, j := 0, len(words)-1; i < j; i, j = i+1, j-1 {
		words[i], words[j] = words[j], words[i]
	}
	return strings.Join(words, " ")
}

func main() {
	s := strings.TrimSpace(readRaw())
	fmt.Println(solve(s))
}
`,
  "dsa-implement-strstr": `package main

import (
	"fmt"
	"io"
	"os"
	"strings"
)

func readLines() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Split(string(data), "\\n")
}

func solve(haystack, needle string) int {
	return strings.Index(haystack, needle)
}

func main() {
	lines := readLines()
	s1 := ""
	s2 := ""
	if len(lines) > 0 {
		s1 = strings.TrimSpace(lines[0])
	}
	if len(lines) > 1 {
		s2 = strings.TrimSpace(lines[1])
	}
	fmt.Println(solve(s1, s2))
}
`,
  "dsa-count-and-say": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func solve(n int) string {
	cur := "1"
	for range n - 1 {
		var nxt []string
		i := 0
		for i < len(cur) {
			j := i
			for j < len(cur) && cur[j] == cur[i] {
				j++
			}
			nxt = append(nxt, strconv.Itoa(j-i), string(cur[i]))
			i = j
		}
		cur = strings.Join(nxt, "")
	}
	return cur
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	fmt.Println(solve(n))
}
`,
  "dsa-zigzag-conversion": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func readLines() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Split(string(data), "\\n")
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func solve(s string, k int) string {
	if k == 1 || k >= len(s) {
		return s
	}
	rows := make([]string, k)
	r := 0
	step := 1
	for _, c := range s {
		rows[r] += string(c)
		if r == 0 {
			step = 1
		} else if r == k-1 {
			step = -1
		}
		r += step
	}
	return strings.Join(rows, "")
}

func main() {
	lines := readLines()
	s := ""
	k := 0
	if len(lines) > 0 {
		s = strings.TrimSpace(lines[0])
	}
	if len(lines) > 1 {
		k = atoi(lines[1])
	}
	fmt.Println(solve(s, k))
}
`,
  "dsa-minimum-window-substring": `package main

import (
	"fmt"
	"io"
	"os"
	"strings"
)

func readLines() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Split(string(data), "\\n")
}

func solve(s, t string) string {
	need := map[rune]int{}
	for _, c := range t {
		need[c]++
	}
	missing := len(t)
	left := 0
	best := ""
	rs := []rune(s)
	for right, c := range rs {
		if need[c] > 0 {
			missing--
		}
		need[c]--
		for missing == 0 {
			if best == "" || right-left+1 < len([]rune(best)) {
				best = string(rs[left : right+1])
			}
			need[rs[left]]++
			if need[rs[left]] > 0 {
				missing++
			}
			left++
		}
	}
	return best
}

func main() {
	lines := readLines()
	s1 := ""
	s2 := ""
	if len(lines) > 0 {
		s1 = strings.TrimSpace(lines[0])
	}
	if len(lines) > 1 {
		s2 = strings.TrimSpace(lines[1])
	}
	fmt.Println(solve(s1, s2))
}
`,
  "dsa-longest-repeating-character-replacement": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func readLines() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Split(string(data), "\\n")
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func maxInt(a, b int) int {
	if a > b {
		return a
	}
	return b
}

func solve(s string, k int) int {
	counts := map[rune]int{}
	best := 0
	left := 0
	rs := []rune(s)
	for right, c := range rs {
		counts[c]++
		for {
			mx := 0
			for _, v := range counts {
				if v > mx {
					mx = v
				}
			}
			if (right-left+1)-mx <= k {
				break
			}
			counts[rs[left]]--
			left++
		}
		best = maxInt(best, right-left+1)
	}
	return best
}

func main() {
	lines := readLines()
	s := ""
	k := 0
	if len(lines) > 0 {
		s = strings.TrimSpace(lines[0])
	}
	if len(lines) > 1 {
		k = atoi(lines[1])
	}
	fmt.Println(solve(s, k))
}
`,
  "dsa-first-unique-character": `package main

import (
	"fmt"
	"io"
	"os"
	"strings"
)

func readRaw() string {
	data, _ := io.ReadAll(os.Stdin)
	return string(data)
}

func solve(s string) int {
	counts := map[rune]int{}
	for _, c := range s {
		counts[c]++
	}
	rs := []rune(s)
	for i, c := range rs {
		if counts[c] == 1 {
			return i
		}
	}
	return -1
}

func main() {
	s := strings.TrimSpace(readRaw())
	fmt.Println(solve(s))
}
`,
  "dsa-intersection-of-two-arrays": `package main

import (
	"fmt"
	"io"
	"os"
	"sort"
	"strconv"
	"strings"
)

func fmtInts(xs []int) string {
	parts := make([]string, len(xs))
	for i, v := range xs {
		parts[i] = strconv.Itoa(v)
	}
	return strings.Join(parts, " ")
}

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func solve(a, b []int) []int {
	setA := map[int]bool{}
	for _, x := range a {
		setA[x] = true
	}
	seen := map[int]bool{}
	out := []int{}
	for _, x := range b {
		if setA[x] && !seen[x] {
			seen[x] = true
			out = append(out, x)
		}
	}
	sort.Ints(out)
	return out
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	a := intsFrom(data, 1, n)
	m := atoi(data[1+n])
	b := intsFrom(data, 2+n, m)
	fmt.Println(fmtInts(solve(a, b)))
}
`,
  "dsa-happy-number": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func fmtBool(b bool) string {
	if b {
		return "true"
	}
	return "false"
}

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func solve(n int) bool {
	seen := map[int]bool{}
	for n != 1 && !seen[n] {
		seen[n] = true
		sum := 0
		for m := n; m > 0; m /= 10 {
			d := m % 10
			sum += d * d
		}
		n = sum
	}
	return n == 1
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	fmt.Println(fmtBool(solve(n)))
}
`,
  "dsa-isomorphic-strings": `package main

import (
	"fmt"
	"io"
	"os"
	"strings"
)

func fmtBool(b bool) string {
	if b {
		return "true"
	}
	return "false"
}

func readLines() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Split(string(data), "\\n")
}

func solve(s, t string) bool {
	rs := []rune(s)
	rt := []rune(t)
	if len(rs) != len(rt) {
		return false
	}
	m1 := map[rune]rune{}
	m2 := map[rune]rune{}
	for i, a := range rs {
		b := rt[i]
		if v, ok := m1[a]; ok && v != b {
			return false
		}
		if v, ok := m2[b]; ok && v != a {
			return false
		}
		m1[a] = b
		m2[b] = a
	}
	return true
}

func main() {
	lines := readLines()
	s1 := ""
	s2 := ""
	if len(lines) > 0 {
		s1 = strings.TrimSpace(lines[0])
	}
	if len(lines) > 1 {
		s2 = strings.TrimSpace(lines[1])
	}
	fmt.Println(fmtBool(solve(s1, s2)))
}
`,
  "dsa-word-pattern": `package main

import (
	"fmt"
	"io"
	"os"
	"strings"
)

func fmtBool(b bool) string {
	if b {
		return "true"
	}
	return "false"
}

func readLines() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Split(string(data), "\\n")
}

func solve(pattern, s string) bool {
	words := strings.Fields(s)
	rp := []rune(pattern)
	if len(words) != len(rp) {
		return false
	}
	p2w := map[rune]string{}
	w2p := map[string]rune{}
	for i, p := range rp {
		w := words[i]
		if v, ok := p2w[p]; ok && v != w {
			return false
		}
		if v, ok := w2p[w]; ok && v != p {
			return false
		}
		p2w[p] = w
		w2p[w] = p
	}
	return true
}

func main() {
	lines := readLines()
	s1 := ""
	s2 := ""
	if len(lines) > 0 {
		s1 = strings.TrimSpace(lines[0])
	}
	if len(lines) > 1 {
		s2 = strings.TrimSpace(lines[1])
	}
	fmt.Println(fmtBool(solve(s1, s2)))
}
`,
  "dsa-ransom-note": `package main

import (
	"fmt"
	"io"
	"os"
	"strings"
)

func fmtBool(b bool) string {
	if b {
		return "true"
	}
	return "false"
}

func readLines() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Split(string(data), "\\n")
}

func solve(note, magazine string) bool {
	need := map[rune]int{}
	for _, c := range note {
		need[c]++
	}
	have := map[rune]int{}
	for _, c := range magazine {
		have[c]++
	}
	for c, k := range need {
		if have[c] < k {
			return false
		}
	}
	return true
}

func main() {
	lines := readLines()
	s1 := ""
	s2 := ""
	if len(lines) > 0 {
		s1 = strings.TrimSpace(lines[0])
	}
	if len(lines) > 1 {
		s2 = strings.TrimSpace(lines[1])
	}
	fmt.Println(fmtBool(solve(s1, s2)))
}
`,
  "dsa-longest-consecutive-sequence": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func maxInt(a, b int) int {
	if a > b {
		return a
	}
	return b
}

func solve(nums []int) int {
	s := map[int]bool{}
	for _, x := range nums {
		s[x] = true
	}
	best := 0
	for x := range s {
		if !s[x-1] {
			cur := x
			length := 1
			for s[cur+1] {
				cur++
				length++
			}
			best = maxInt(best, length)
		}
	}
	return best
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	nums := intsFrom(data, 1, n)
	fmt.Println(solve(nums))
}
`,
  "dsa-top-k-frequent-elements": `package main

import (
	"fmt"
	"io"
	"os"
	"sort"
	"strconv"
	"strings"
)

func fmtInts(xs []int) string {
	parts := make([]string, len(xs))
	for i, v := range xs {
		parts[i] = strconv.Itoa(v)
	}
	return strings.Join(parts, " ")
}

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func solve(nums []int, k int) []int {
	counts := map[int]int{}
	for _, x := range nums {
		counts[x]++
	}
	type kv struct {
		v, c int
	}
	ranked := []kv{}
	for v, c := range counts {
		ranked = append(ranked, kv{v, c})
	}
	sort.Slice(ranked, func(i, j int) bool {
		if ranked[i].c != ranked[j].c {
			return ranked[i].c > ranked[j].c
		}
		return ranked[i].v > ranked[j].v
	})
	out := []int{}
	for i := 0; i < k && i < len(ranked); i++ {
		out = append(out, ranked[i].v)
	}
	return out
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	nums := intsFrom(data, 1, n)
	k := atoi(data[1+n])
	fmt.Println(fmtInts(solve(nums, k)))
}
`,
  "dsa-valid-sudoku": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func fmtBool(b bool) string {
	if b {
		return "true"
	}
	return "false"
}

func readLines() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Split(string(data), "\\n")
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func solve(grid [][]string) bool {
	rows := make([]map[string]bool, 9)
	cols := make([]map[string]bool, 9)
	boxes := make([]map[string]bool, 9)
	for i := range rows {
		rows[i] = map[string]bool{}
		cols[i] = map[string]bool{}
		boxes[i] = map[string]bool{}
	}
	for i := 0; i < 9; i++ {
		for j := 0; j < 9; j++ {
			v := grid[i][j]
			if v == "." {
				continue
			}
			b := (i/3)*3 + j/3
			if rows[i][v] || cols[j][v] || boxes[b][v] {
				return false
			}
			rows[i][v] = true
			cols[j][v] = true
			boxes[b][v] = true
		}
	}
	return true
}

func main() {
	lines := readLines()
	r := 0
	c := 0
	if len(lines) > 0 {
		parts := strings.Fields(lines[0])
		if len(parts) >= 2 {
			r = atoi(parts[0])
			c = atoi(parts[1])
		}
	}
	grid := [][]string{}
	for i := 0; i < r && 1+i < len(lines); i++ {
		row := strings.ReplaceAll(strings.TrimSpace(lines[1+i]), " ", "")
		_ = c
		grid = append(grid, strings.Split(row, ""))
	}
	fmt.Println(fmtBool(solve(grid)))
}
`,
  "dsa-contains-duplicate-ii": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func fmtBool(b bool) string {
	if b {
		return "true"
	}
	return "false"
}

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func solve(nums []int, k int) bool {
	last := map[int]int{}
	for i, x := range nums {
		if j, ok := last[x]; ok && i-j <= k {
			return true
		}
		last[x] = i
	}
	return false
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	nums := intsFrom(data, 1, n)
	k := atoi(data[1+n])
	fmt.Println(fmtBool(solve(nums, k)))
}
`,
  "dsa-subarray-sum-divisible-by-k": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func solve(nums []int, k int) int {
	counts := map[int]int{0: 1}
	prefix := 0
	ans := 0
	for _, x := range nums {
		prefix = ((prefix+x)%k + k) % k
		ans += counts[prefix]
		counts[prefix]++
	}
	return ans
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	nums := intsFrom(data, 1, n)
	k := atoi(data[1+n])
	fmt.Println(solve(nums, k))
}
`,
  "dsa-find-all-anagrams-in-string": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func fmtInts(xs []int) string {
	parts := make([]string, len(xs))
	for i, v := range xs {
		parts[i] = strconv.Itoa(v)
	}
	return strings.Join(parts, " ")
}

func readLines() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Split(string(data), "\\n")
}

func counterEq(a, b map[rune]int) bool {
	if len(a) != len(b) {
		return false
	}
	for k, v := range a {
		if b[k] != v {
			return false
		}
	}
	return true
}

func solve(s, p string) []int {
	need := map[rune]int{}
	for _, c := range p {
		need[c]++
	}
	window := map[rune]int{}
	out := []int{}
	rs := []rune(s)
	for i, c := range rs {
		window[c]++
		if i >= len(p) {
			left := rs[i-len(p)]
			window[left]--
			if window[left] == 0 {
				delete(window, left)
			}
		}
		if counterEq(window, need) {
			out = append(out, i-len(p)+1)
		}
	}
	return out
}

func main() {
	lines := readLines()
	s1 := ""
	s2 := ""
	if len(lines) > 0 {
		s1 = strings.TrimSpace(lines[0])
	}
	if len(lines) > 1 {
		s2 = strings.TrimSpace(lines[1])
	}
	fmt.Println(fmtInts(solve(s1, s2)))
}
`,
  "dsa-two-sum-ii": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func fmtInts(xs []int) string {
	parts := make([]string, len(xs))
	for i, v := range xs {
		parts[i] = strconv.Itoa(v)
	}
	return strings.Join(parts, " ")
}

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func solve(nums []int, target int) []int {
	left := 0
	right := len(nums) - 1
	for left < right {
		total := nums[left] + nums[right]
		if total == target {
			return []int{left + 1, right + 1}
		}
		if total < target {
			left++
		} else {
			right--
		}
	}
	return []int{-1, -1}
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	nums := intsFrom(data, 1, n)
	target := atoi(data[1+n])
	fmt.Println(fmtInts(solve(nums, target)))
}
`,
  "dsa-container-with-most-water": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func minInt(a, b int) int {
	if a < b {
		return a
	}
	return b
}

func maxInt(a, b int) int {
	if a > b {
		return a
	}
	return b
}

func solve(height []int) int {
	left := 0
	right := len(height) - 1
	best := 0
	for left < right {
		area := minInt(height[left], height[right]) * (right - left)
		best = maxInt(best, area)
		if height[left] < height[right] {
			left++
		} else {
			right--
		}
	}
	return best
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	nums := intsFrom(data, 1, n)
	fmt.Println(solve(nums))
}
`,
  "dsa-three-sum": `package main

import (
	"fmt"
	"io"
	"os"
	"sort"
	"strconv"
	"strings"
)

func fmtInts(xs []int) string {
	parts := make([]string, len(xs))
	for i, v := range xs {
		parts[i] = strconv.Itoa(v)
	}
	return strings.Join(parts, " ")
}

func fmtIntRows(rows [][]int) string {
	lines := make([]string, len(rows))
	for i, r := range rows {
		lines[i] = fmtInts(r)
	}
	return strings.Join(lines, "\\n")
}

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func solve(nums []int) [][]int {
	sort.Ints(nums)
	out := [][]int{}
	n := len(nums)
	for i := 0; i < n-2; i++ {
		if i > 0 && nums[i] == nums[i-1] {
			continue
		}
		left := i + 1
		right := n - 1
		for left < right {
			total := nums[i] + nums[left] + nums[right]
			if total == 0 {
				out = append(out, []int{nums[i], nums[left], nums[right]})
				left++
				right--
				for left < right && nums[left] == nums[left-1] {
					left++
				}
				for left < right && nums[right] == nums[right+1] {
					right--
				}
			} else if total < 0 {
				left++
			} else {
				right--
			}
		}
	}
	return out
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	nums := intsFrom(data, 1, n)
	fmt.Println(fmtIntRows(solve(nums)))
}
`,
  "dsa-remove-duplicates-sorted": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func fmtInts(xs []int) string {
	parts := make([]string, len(xs))
	for i, v := range xs {
		parts[i] = strconv.Itoa(v)
	}
	return strings.Join(parts, " ")
}

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func solve(nums []int) []int {
	if len(nums) == 0 {
		return nums
	}
	write := 1
	for i := 1; i < len(nums); i++ {
		if nums[i] != nums[write-1] {
			nums[write] = nums[i]
			write++
		}
	}
	return nums[:write]
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	nums := intsFrom(data, 1, n)
	fmt.Println(fmtInts(solve(nums)))
}
`,
  "dsa-squares-of-sorted-array": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func fmtInts(xs []int) string {
	parts := make([]string, len(xs))
	for i, v := range xs {
		parts[i] = strconv.Itoa(v)
	}
	return strings.Join(parts, " ")
}

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func solve(nums []int) []int {
	n := len(nums)
	out := make([]int, n)
	left := 0
	right := n - 1
	pos := n - 1
	for left <= right {
		if absInt(nums[left]) > absInt(nums[right]) {
			out[pos] = nums[left] * nums[left]
			left++
		} else {
			out[pos] = nums[right] * nums[right]
			right--
		}
		pos--
	}
	return out
}

func absInt(x int) int {
	if x < 0 {
		return -x
	}
	return x
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	nums := intsFrom(data, 1, n)
	fmt.Println(fmtInts(solve(nums)))
}
`,
  "dsa-valid-palindrome-ii": `package main

import (
	"fmt"
	"io"
	"os"
	"strings"
)

func fmtBool(b bool) string {
	if b {
		return "true"
	}
	return "false"
}

func readRaw() string {
	data, _ := io.ReadAll(os.Stdin)
	return string(data)
}

func solve(s string) bool {
	rs := []rune(s)
	isPal := func(l, r int) bool {
		for l < r {
			if rs[l] != rs[r] {
				return false
			}
			l++
			r--
		}
		return true
	}
	left := 0
	right := len(rs) - 1
	for left < right {
		if rs[left] != rs[right] {
			return isPal(left+1, right) || isPal(left, right-1)
		}
		left++
		right--
	}
	return true
}

func main() {
	s := strings.TrimSpace(readRaw())
	fmt.Println(fmtBool(solve(s)))
}
`,
  "dsa-three-sum-closest": `package main

import (
	"fmt"
	"io"
	"os"
	"sort"
	"strconv"
	"strings"
)

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func solve(nums []int, target int) int {
	sort.Ints(nums)
	best := nums[0] + nums[1] + nums[2]
	n := len(nums)
	for i := 0; i < n-2; i++ {
		left := i + 1
		right := n - 1
		for left < right {
			total := nums[i] + nums[left] + nums[right]
			if absInt(total-target) < absInt(best-target) {
				best = total
			}
			if total < target {
				left++
			} else if total > target {
				right--
			} else {
				return total
			}
		}
	}
	return best
}

func absInt(x int) int {
	if x < 0 {
		return -x
	}
	return x
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	nums := intsFrom(data, 1, n)
	target := atoi(data[1+n])
	fmt.Println(solve(nums, target))
}
`,
  "dsa-four-sum": `package main

import (
	"fmt"
	"io"
	"os"
	"sort"
	"strconv"
	"strings"
)

func fmtInts(xs []int) string {
	parts := make([]string, len(xs))
	for i, v := range xs {
		parts[i] = strconv.Itoa(v)
	}
	return strings.Join(parts, " ")
}

func fmtIntRows(rows [][]int) string {
	lines := make([]string, len(rows))
	for i, r := range rows {
		lines[i] = fmtInts(r)
	}
	return strings.Join(lines, "\\n")
}

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func solve(nums []int, target int) [][]int {
	sort.Ints(nums)
	out := [][]int{}
	n := len(nums)
	for i := 0; i < n-3; i++ {
		if i > 0 && nums[i] == nums[i-1] {
			continue
		}
		for j := i + 1; j < n-2; j++ {
			if j > i+1 && nums[j] == nums[j-1] {
				continue
			}
			left := j + 1
			right := n - 1
			for left < right {
				total := nums[i] + nums[j] + nums[left] + nums[right]
				if total == target {
					out = append(out, []int{nums[i], nums[j], nums[left], nums[right]})
					left++
					right--
					for left < right && nums[left] == nums[left-1] {
						left++
					}
					for left < right && nums[right] == nums[right+1] {
						right--
					}
				} else if total < target {
					left++
				} else {
					right--
				}
			}
		}
	}
	return out
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	nums := intsFrom(data, 1, n)
	target := atoi(data[1+n])
	fmt.Println(fmtIntRows(solve(nums, target)))
}
`,
  "dsa-sort-array-by-parity": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func fmtInts(xs []int) string {
	parts := make([]string, len(xs))
	for i, v := range xs {
		parts[i] = strconv.Itoa(v)
	}
	return strings.Join(parts, " ")
}

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func solve(nums []int) []int {
	evens := []int{}
	odds := []int{}
	for _, x := range nums {
		if x%2 == 0 {
			evens = append(evens, x)
		} else {
			odds = append(odds, x)
		}
	}
	return append(evens, odds...)
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	nums := intsFrom(data, 1, n)
	fmt.Println(fmtInts(solve(nums)))
}
`,
  "dsa-remove-element": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func fmtInts(xs []int) string {
	parts := make([]string, len(xs))
	for i, v := range xs {
		parts[i] = strconv.Itoa(v)
	}
	return strings.Join(parts, " ")
}

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func solve(nums []int, val int) []int {
	write := 0
	for _, x := range nums {
		if x != val {
			nums[write] = x
			write++
		}
	}
	return nums[:write]
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	nums := intsFrom(data, 1, n)
	k := atoi(data[1+n])
	fmt.Println(fmtInts(solve(nums, k)))
}
`,
  "dsa-max-sum-subarray-size-k": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func maxInt(a, b int) int {
	if a > b {
		return a
	}
	return b
}

func solve(nums []int, k int) int {
	window := 0
	for _, x := range nums[:k] {
		window += x
	}
	best := window
	for i := k; i < len(nums); i++ {
		window += nums[i] - nums[i-k]
		best = maxInt(best, window)
	}
	return best
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	nums := intsFrom(data, 1, n)
	k := atoi(data[1+n])
	fmt.Println(solve(nums, k))
}
`,
  "dsa-longest-substring-k-distinct": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func readLines() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Split(string(data), "\\n")
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func maxInt(a, b int) int {
	if a > b {
		return a
	}
	return b
}

func solve(s string, k int) int {
	counts := map[rune]int{}
	best := 0
	left := 0
	rs := []rune(s)
	for right, c := range rs {
		counts[c]++
		for len(counts) > k {
			counts[rs[left]]--
			if counts[rs[left]] == 0 {
				delete(counts, rs[left])
			}
			left++
		}
		best = maxInt(best, right-left+1)
	}
	return best
}

func main() {
	lines := readLines()
	s := ""
	k := 0
	if len(lines) > 0 {
		s = strings.TrimSpace(lines[0])
	}
	if len(lines) > 1 {
		k = atoi(lines[1])
	}
	fmt.Println(solve(s, k))
}
`,
  "dsa-minimum-size-subarray-sum": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func solve(nums []int, target int) int {
	best := -1
	left := 0
	total := 0
	for right, x := range nums {
		total += x
		for total >= target {
			if best == -1 || right-left+1 < best {
				best = right - left + 1
			}
			total -= nums[left]
			left++
		}
	}
	if best == -1 {
		return 0
	}
	return best
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	nums := intsFrom(data, 1, n)
	target := atoi(data[1+n])
	fmt.Println(solve(nums, target))
}
`,
  "dsa-permutation-in-string": `package main

import (
	"fmt"
	"io"
	"os"
	"strings"
)

func fmtBool(b bool) string {
	if b {
		return "true"
	}
	return "false"
}

func readLines() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Split(string(data), "\\n")
}

func counterEq(a, b map[rune]int) bool {
	if len(a) != len(b) {
		return false
	}
	for k, v := range a {
		if b[k] != v {
			return false
		}
	}
	return true
}

func solve(s1, s2 string) bool {
	need := map[rune]int{}
	for _, c := range s1 {
		need[c]++
	}
	window := map[rune]int{}
	k := len([]rune(s1))
	rs := []rune(s2)
	for i, c := range rs {
		window[c]++
		if i >= k {
			left := rs[i-k]
			window[left]--
			if window[left] == 0 {
				delete(window, left)
			}
		}
		if counterEq(window, need) {
			return true
		}
	}
	return false
}

func main() {
	lines := readLines()
	s1 := ""
	s2 := ""
	if len(lines) > 0 {
		s1 = strings.TrimSpace(lines[0])
	}
	if len(lines) > 1 {
		s2 = strings.TrimSpace(lines[1])
	}
	fmt.Println(fmtBool(solve(s1, s2)))
}
`,
  "dsa-fruits-into-baskets": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func maxInt(a, b int) int {
	if a > b {
		return a
	}
	return b
}

func solve(fruits []int) int {
	counts := map[int]int{}
	best := 0
	left := 0
	for right, f := range fruits {
		counts[f]++
		for len(counts) > 2 {
			counts[fruits[left]]--
			if counts[fruits[left]] == 0 {
				delete(counts, fruits[left])
			}
			left++
		}
		best = maxInt(best, right-left+1)
	}
	return best
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	nums := intsFrom(data, 1, n)
	fmt.Println(solve(nums))
}
`,
  "dsa-maximum-vowels-in-substring": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func readLines() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Split(string(data), "\\n")
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func maxInt(a, b int) int {
	if a > b {
		return a
	}
	return b
}

func isVowel(c byte) bool {
	switch c {
	case 'a', 'e', 'i', 'o', 'u':
		return true
	}
	return false
}

func solve(s string, k int) int {
	window := 0
	for i := 0; i < k && i < len(s); i++ {
		if isVowel(s[i]) {
			window++
		}
	}
	best := window
	for i := k; i < len(s); i++ {
		if isVowel(s[i]) {
			window++
		}
		if isVowel(s[i-k]) {
			window--
		}
		best = maxInt(best, window)
	}
	return best
}

func main() {
	lines := readLines()
	s := ""
	k := 0
	if len(lines) > 0 {
		s = strings.TrimSpace(lines[0])
	}
	if len(lines) > 1 {
		k = atoi(lines[1])
	}
	fmt.Println(solve(s, k))
}
`,
  "dsa-sliding-window-maximum": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func fmtInts(xs []int) string {
	parts := make([]string, len(xs))
	for i, v := range xs {
		parts[i] = strconv.Itoa(v)
	}
	return strings.Join(parts, " ")
}

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func solve(nums []int, k int) []int {
	dq := []int{}
	out := []int{}
	for i, x := range nums {
		for len(dq) > 0 && nums[dq[len(dq)-1]] <= x {
			dq = dq[:len(dq)-1]
		}
		dq = append(dq, i)
		if dq[0] <= i-k {
			dq = dq[1:]
		}
		if i >= k-1 {
			out = append(out, nums[dq[0]])
		}
	}
	return out
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	nums := intsFrom(data, 1, n)
	k := atoi(data[1+n])
	fmt.Println(fmtInts(solve(nums, k)))
}
`,
  "dsa-binary-subarrays-with-sum": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func solve(nums []int, goal int) int {
	counts := map[int]int{0: 1}
	prefix := 0
	ans := 0
	for _, x := range nums {
		prefix += x
		ans += counts[prefix-goal]
		counts[prefix]++
	}
	return ans
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	nums := intsFrom(data, 1, n)
	k := atoi(data[1+n])
	fmt.Println(solve(nums, k))
}
`,
  "dsa-longest-subarray-of-ones-after-deleting-one": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func maxInt(a, b int) int {
	if a > b {
		return a
	}
	return b
}

func solve(nums []int) int {
	best := 0
	left := 0
	zeros := 0
	for right, x := range nums {
		if x == 0 {
			zeros++
		}
		for zeros > 1 {
			if nums[left] == 0 {
				zeros--
			}
			left++
		}
		best = maxInt(best, right-left)
	}
	return best
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	nums := intsFrom(data, 1, n)
	fmt.Println(solve(nums))
}
`,
  "dsa-max-consecutive-ones-iii": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func maxInt(a, b int) int {
	if a > b {
		return a
	}
	return b
}

func solve(nums []int, k int) int {
	best := 0
	left := 0
	zeros := 0
	for right, x := range nums {
		if x == 0 {
			zeros++
		}
		for zeros > k {
			if nums[left] == 0 {
				zeros--
			}
			left++
		}
		best = maxInt(best, right-left+1)
	}
	return best
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	nums := intsFrom(data, 1, n)
	k := atoi(data[1+n])
	fmt.Println(solve(nums, k))
}
`,
  "dsa-evaluate-reverse-polish-notation": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func minInt(a, b int) int {
	if a < b {
		return a
	}
	return b
}

func solve(tokens []string) int {
	stack := []int{}
	for _, t := range tokens {
		switch t {
		case "+", "-", "*", "/":
			b := stack[len(stack)-1]
			stack = stack[:len(stack)-1]
			a := stack[len(stack)-1]
			stack = stack[:len(stack)-1]
			switch t {
			case "+":
				stack = append(stack, a+b)
			case "-":
				stack = append(stack, a-b)
			case "*":
				stack = append(stack, a*b)
			case "/":
				stack = append(stack, a/b)
			}
		default:
			stack = append(stack, atoi(t))
		}
	}
	return stack[0]
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	words := data[1:minInt(1+n, len(data))]
	fmt.Println(solve(words))
}
`,
  "dsa-daily-temperatures": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func fmtInts(xs []int) string {
	parts := make([]string, len(xs))
	for i, v := range xs {
		parts[i] = strconv.Itoa(v)
	}
	return strings.Join(parts, " ")
}

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func solve(temps []int) []int {
	n := len(temps)
	out := make([]int, n)
	stack := []int{}
	for i, t := range temps {
		for len(stack) > 0 && temps[stack[len(stack)-1]] < t {
			j := stack[len(stack)-1]
			stack = stack[:len(stack)-1]
			out[j] = i - j
		}
		stack = append(stack, i)
	}
	return out
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	nums := intsFrom(data, 1, n)
	fmt.Println(fmtInts(solve(nums)))
}
`,
  "dsa-next-greater-element-i": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func fmtInts(xs []int) string {
	parts := make([]string, len(xs))
	for i, v := range xs {
		parts[i] = strconv.Itoa(v)
	}
	return strings.Join(parts, " ")
}

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func solve(a, b []int) []int {
	nxt := map[int]int{}
	stack := []int{}
	for _, x := range b {
		for len(stack) > 0 && stack[len(stack)-1] < x {
			nxt[stack[len(stack)-1]] = x
			stack = stack[:len(stack)-1]
		}
		stack = append(stack, x)
	}
	for len(stack) > 0 {
		nxt[stack[len(stack)-1]] = -1
		stack = stack[:len(stack)-1]
	}
	out := make([]int, len(a))
	for i, x := range a {
		out[i] = nxt[x]
	}
	return out
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	a := intsFrom(data, 1, n)
	m := atoi(data[1+n])
	b := intsFrom(data, 2+n, m)
	fmt.Println(fmtInts(solve(a, b)))
}
`,
  "dsa-largest-rectangle-in-histogram": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func maxInt(a, b int) int {
	if a > b {
		return a
	}
	return b
}

func solve(heights []int) int {
	stack := []int{}
	best := 0
	h := append(append([]int{}, heights...), 0)
	for i, x := range h {
		for len(stack) > 0 && h[stack[len(stack)-1]] > x {
			height := h[stack[len(stack)-1]]
			stack = stack[:len(stack)-1]
			left := -1
			if len(stack) > 0 {
				left = stack[len(stack)-1]
			}
			best = maxInt(best, height*(i-left-1))
		}
		stack = append(stack, i)
	}
	return best
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	nums := intsFrom(data, 1, n)
	fmt.Println(solve(nums))
}
`,
  "dsa-simplify-path": `package main

import (
	"fmt"
	"io"
	"os"
	"strings"
)

func readRaw() string {
	data, _ := io.ReadAll(os.Stdin)
	return string(data)
}

func solve(path string) string {
	stack := []string{}
	for _, part := range strings.Split(path, "/") {
		if part == "" || part == "." {
			continue
		}
		if part == ".." {
			if len(stack) > 0 {
				stack = stack[:len(stack)-1]
			}
		} else {
			stack = append(stack, part)
		}
	}
	return "/" + strings.Join(stack, "/")
}

func main() {
	s := strings.TrimSpace(readRaw())
	fmt.Println(solve(s))
}
`,
  "dsa-decode-string": `package main

import (
	"fmt"
	"io"
	"os"
	"strings"
)

func readRaw() string {
	data, _ := io.ReadAll(os.Stdin)
	return string(data)
}

func solve(s string) string {
	type frame struct {
		prev string
		k    int
	}
	stack := []frame{}
	cur := ""
	num := 0
	for _, c := range s {
		if c >= '0' && c <= '9' {
			num = num*10 + int(c-'0')
		} else if c == '[' {
			stack = append(stack, frame{cur, num})
			cur = ""
			num = 0
		} else if c == ']' {
			f := stack[len(stack)-1]
			stack = stack[:len(stack)-1]
			cur = f.prev + strings.Repeat(cur, f.k)
		} else {
			cur += string(c)
		}
	}
	return cur
}

func main() {
	s := strings.TrimSpace(readRaw())
	fmt.Println(solve(s))
}
`,
  "dsa-remove-duplicate-letters": `package main

import (
	"fmt"
	"io"
	"os"
	"strings"
)

func readRaw() string {
	data, _ := io.ReadAll(os.Stdin)
	return string(data)
}

func solve(s string) string {
	remaining := map[rune]int{}
	for _, c := range s {
		remaining[c]++
	}
	stack := []rune{}
	inStack := map[rune]bool{}
	for _, c := range s {
		remaining[c]--
		if inStack[c] {
			continue
		}
		for len(stack) > 0 && stack[len(stack)-1] > c && remaining[stack[len(stack)-1]] > 0 {
			inStack[stack[len(stack)-1]] = false
			stack = stack[:len(stack)-1]
		}
		stack = append(stack, c)
		inStack[c] = true
	}
	return string(stack)
}

func main() {
	s := strings.TrimSpace(readRaw())
	fmt.Println(solve(s))
}
`,
  "dsa-asteroid-collision": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func fmtInts(xs []int) string {
	parts := make([]string, len(xs))
	for i, v := range xs {
		parts[i] = strconv.Itoa(v)
	}
	return strings.Join(parts, " ")
}

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func solve(asteroids []int) []int {
	stack := []int{}
	for _, a := range asteroids {
		alive := true
		for alive && a < 0 && len(stack) > 0 && stack[len(stack)-1] > 0 {
			if stack[len(stack)-1] < -a {
				stack = stack[:len(stack)-1]
			} else if stack[len(stack)-1] == -a {
				stack = stack[:len(stack)-1]
				alive = false
			} else {
				alive = false
			}
		}
		if alive {
			stack = append(stack, a)
		}
	}
	return stack
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	nums := intsFrom(data, 1, n)
	fmt.Println(fmtInts(solve(nums)))
}
`,
  "dsa-rotting-oranges": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func maxInt(a, b int) int {
	if a > b {
		return a
	}
	return b
}

func solve(grid [][]int) int {
	m := len(grid)
	n := len(grid[0])
	type cell struct{ i, j, t int }
	q := []cell{}
	head := 0
	fresh := 0
	for i := 0; i < m; i++ {
		for j := 0; j < n; j++ {
			if grid[i][j] == 2 {
				q = append(q, cell{i, j, 0})
			} else if grid[i][j] == 1 {
				fresh++
			}
		}
	}
	minutes := 0
	dirs := [][2]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}}
	for head < len(q) {
		c := q[head]
		head++
		minutes = maxInt(minutes, c.t)
		for _, d := range dirs {
			ni, nj := c.i+d[0], c.j+d[1]
			if ni >= 0 && ni < m && nj >= 0 && nj < n && grid[ni][nj] == 1 {
				grid[ni][nj] = 2
				fresh--
				q = append(q, cell{ni, nj, c.t + 1})
			}
		}
	}
	if fresh == 0 {
		return minutes
	}
	return -1
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	r := atoi(data[0])
	c := atoi(data[1])
	vals := []int{}
	for _, t := range data[2:] {
		vals = append(vals, atoi(t))
	}
	grid := [][]int{}
	for i := 0; i < r; i++ {
		grid = append(grid, vals[i*c:(i+1)*c])
	}
	fmt.Println(solve(grid))
}
`,
  "dsa-design-circular-queue": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func fmtStrRows(rows [][]string) string {
	lines := make([]string, len(rows))
	for i, r := range rows {
		if len(r) == 0 {
			lines[i] = ""
		} else if len(r[0]) == 1 {
			lines[i] = strings.Join(r, "")
		} else {
			lines[i] = strings.Join(r, " ")
		}
	}
	return strings.Join(lines, "\\n")
}

func fmtBool(b bool) string {
	if b {
		return "true"
	}
	return "false"
}

func readLines() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Split(string(data), "\\n")
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func solve(ops []string) [][]string {
	k := atoi(ops[0])
	q := make([]int, k)
	head := 0
	size := 0
	out := [][]string{}
	for _, op := range ops[1:] {
		parts := strings.Fields(op)
		cmd := parts[0]
		switch cmd {
		case "enQueue":
			if size == k {
				out = append(out, []string{"false"})
			} else {
				q[(head+size)%k] = atoi(parts[1])
				size++
				out = append(out, []string{"true"})
			}
		case "deQueue":
			if size == 0 {
				out = append(out, []string{"false"})
			} else {
				head = (head + 1) % k
				size--
				out = append(out, []string{"true"})
			}
		case "Front":
			if size == 0 {
				out = append(out, []string{"-1"})
			} else {
				out = append(out, []string{strconv.Itoa(q[head])})
			}
		case "Rear":
			if size == 0 {
				out = append(out, []string{"-1"})
			} else {
				out = append(out, []string{strconv.Itoa(q[(head+size-1)%k])})
			}
		case "isEmpty":
			out = append(out, []string{fmtBool(size == 0)})
		case "isFull":
			out = append(out, []string{fmtBool(size == k)})
		}
	}
	return out
}

func main() {
	lines := readLines()
	ops := []string{}
	for _, line := range lines {
		if strings.TrimSpace(line) != "" {
			ops = append(ops, strings.TrimSpace(line))
		}
	}
	fmt.Println(fmtStrRows(solve(ops)))
}
`,
  "dsa-reveal-cards-in-increasing-order": `package main

import (
	"fmt"
	"io"
	"os"
	"sort"
	"strconv"
	"strings"
)

func fmtInts(xs []int) string {
	parts := make([]string, len(xs))
	for i, v := range xs {
		parts[i] = strconv.Itoa(v)
	}
	return strings.Join(parts, " ")
}

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func solve(deck []int) []int {
	sort.Ints(deck)
	q := []int{}
	for i := range deck {
		q = append(q, i)
	}
	head := 0
	out := make([]int, len(deck))
	for _, v := range deck {
		i := q[head]
		head++
		out[i] = v
		if head < len(q) {
			q = append(q, q[head])
			head++
		}
	}
	return out
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	nums := intsFrom(data, 1, n)
	fmt.Println(fmtInts(solve(nums)))
}
`,
  "dsa-time-needed-to-buy-tickets": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func minInt(a, b int) int {
	if a < b {
		return a
	}
	return b
}

func solve(tickets []int, k int) int {
	total := 0
	for i, t := range tickets {
		if i <= k {
			total += minInt(t, tickets[k])
		} else {
			total += minInt(t, tickets[k]-1)
		}
	}
	return total
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	nums := intsFrom(data, 1, n)
	k := atoi(data[1+n])
	fmt.Println(solve(nums, k))
}
`,
  "dsa-dota2-senate": `package main

import (
	"fmt"
	"io"
	"os"
	"strings"
)

func readRaw() string {
	data, _ := io.ReadAll(os.Stdin)
	return string(data)
}

func solve(senate string) string {
	radiant := []int{}
	dire := []int{}
	n := len(senate)
	for i, c := range senate {
		if c == 'R' {
			radiant = append(radiant, i)
		} else {
			dire = append(dire, i)
		}
	}
	rh, dh := 0, 0
	for rh < len(radiant) && dh < len(dire) {
		r := radiant[rh]
		rh++
		d := dire[dh]
		dh++
		if r < d {
			radiant = append(radiant, r+n)
		} else {
			dire = append(dire, d+n)
		}
	}
	if rh < len(radiant) {
		return "Radiant"
	}
	return "Dire"
}

func main() {
	s := strings.TrimSpace(readRaw())
	fmt.Println(solve(s))
}
`,
  "dsa-number-of-students-unable-to-eat-lunch": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func solve(students, sandwiches []int) int {
	counts := map[int]int{}
	for _, s := range students {
		counts[s]++
	}
	q := append([]int{}, students...)
	for _, s := range sandwiches {
		if counts[s] == 0 {
			break
		}
		for len(q) > 0 && q[0] != s {
			q = append(q[1:], q[0])
		}
		q = q[1:]
		counts[s]--
	}
	return len(q)
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	a := intsFrom(data, 1, n)
	m := atoi(data[1+n])
	b := intsFrom(data, 2+n, m)
	fmt.Println(solve(a, b))
}
`,
  "dsa-reverse-linked-list": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

type ListNode struct {
	Val  int
	Next *ListNode
}

func buildList(vals []int) *ListNode {
	if len(vals) == 0 {
		return nil
	}
	head := &ListNode{Val: vals[0]}
	cur := head
	for _, v := range vals[1:] {
		cur.Next = &ListNode{Val: v}
		cur = cur.Next
	}
	return head
}

func fmtList(head *ListNode) string {
	var parts []string
	for cur := head; cur != nil; cur = cur.Next {
		parts = append(parts, strconv.Itoa(cur.Val))
	}
	return strings.Join(parts, " ")
}

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func solve(head *ListNode) *ListNode {
	var prev *ListNode
	cur := head
	for cur != nil {
		nxt := cur.Next
		cur.Next = prev
		prev = cur
		cur = nxt
	}
	return prev
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	head := buildList(intsFrom(data, 1, n))
	fmt.Println(fmtList(solve(head)))
}
`,
  "dsa-merge-two-sorted-lists": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

type ListNode struct {
	Val  int
	Next *ListNode
}

func buildList(vals []int) *ListNode {
	if len(vals) == 0 {
		return nil
	}
	head := &ListNode{Val: vals[0]}
	cur := head
	for _, v := range vals[1:] {
		cur.Next = &ListNode{Val: v}
		cur = cur.Next
	}
	return head
}

func fmtList(head *ListNode) string {
	var parts []string
	for cur := head; cur != nil; cur = cur.Next {
		parts = append(parts, strconv.Itoa(cur.Val))
	}
	return strings.Join(parts, " ")
}

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func solve(head1, head2 *ListNode) *ListNode {
	dummy := &ListNode{Val: 0}
	tail := dummy
	for head1 != nil && head2 != nil {
		if head1.Val <= head2.Val {
			tail.Next = head1
			head1 = head1.Next
		} else {
			tail.Next = head2
			head2 = head2.Next
		}
		tail = tail.Next
	}
	if head1 != nil {
		tail.Next = head1
	} else {
		tail.Next = head2
	}
	return dummy.Next
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	a := intsFrom(data, 1, n)
	m := atoi(data[1+n])
	b := intsFrom(data, 2+n, m)
	head1 := buildList(a)
	head2 := buildList(b)
	fmt.Println(fmtList(solve(head1, head2)))
}
`,
  "dsa-linked-list-cycle": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

type ListNode struct {
	Val  int
	Next *ListNode
}

func buildList(vals []int) *ListNode {
	if len(vals) == 0 {
		return nil
	}
	head := &ListNode{Val: vals[0]}
	cur := head
	for _, v := range vals[1:] {
		cur.Next = &ListNode{Val: v}
		cur = cur.Next
	}
	return head
}

func fmtBool(b bool) string {
	if b {
		return "true"
	}
	return "false"
}

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func solve(head *ListNode, pos int) bool {
	if pos < 0 || head == nil {
		return false
	}
	tail := head
	for tail != nil && tail.Next != nil {
		tail = tail.Next
	}
	target := head
	for i := 0; i < pos; i++ {
		target = target.Next
	}
	tail.Next = target
	slow := head
	fast := head
	for fast != nil && fast.Next != nil {
		slow = slow.Next
		fast = fast.Next.Next
		if slow == fast {
			return true
		}
	}
	return false
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	pos := atoi(data[len(data)-1])
	n := atoi(data[0])
	head := buildList(intsFrom(data, 1, n))
	fmt.Println(fmtBool(solve(head, pos)))
}
`,
  "dsa-remove-nth-node-from-end": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

type ListNode struct {
	Val  int
	Next *ListNode
}

func buildList(vals []int) *ListNode {
	if len(vals) == 0 {
		return nil
	}
	head := &ListNode{Val: vals[0]}
	cur := head
	for _, v := range vals[1:] {
		cur.Next = &ListNode{Val: v}
		cur = cur.Next
	}
	return head
}

func fmtList(head *ListNode) string {
	var parts []string
	for cur := head; cur != nil; cur = cur.Next {
		parts = append(parts, strconv.Itoa(cur.Val))
	}
	return strings.Join(parts, " ")
}

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func solve(head *ListNode, k int) *ListNode {
	dummy := &ListNode{Val: 0, Next: head}
	fast := dummy
	slow := dummy
	for i := 0; i < k+1; i++ {
		fast = fast.Next
	}
	for fast != nil {
		fast = fast.Next
		slow = slow.Next
	}
	slow.Next = slow.Next.Next
	return dummy.Next
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	k := atoi(data[len(data)-1])
	n := atoi(data[0])
	head := buildList(intsFrom(data, 1, n))
	fmt.Println(fmtList(solve(head, k)))
}
`,
  "dsa-middle-of-linked-list": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

type ListNode struct {
	Val  int
	Next *ListNode
}

func buildList(vals []int) *ListNode {
	if len(vals) == 0 {
		return nil
	}
	head := &ListNode{Val: vals[0]}
	cur := head
	for _, v := range vals[1:] {
		cur.Next = &ListNode{Val: v}
		cur = cur.Next
	}
	return head
}

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func solve(head *ListNode) int {
	if head == nil {
		return 0
	}
	slow := head
	fast := head
	for fast != nil && fast.Next != nil {
		slow = slow.Next
		fast = fast.Next.Next
	}
	return slow.Val
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	head := buildList(intsFrom(data, 1, n))
	fmt.Println(solve(head))
}
`,
  "dsa-palindrome-linked-list": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

type ListNode struct {
	Val  int
	Next *ListNode
}

func buildList(vals []int) *ListNode {
	if len(vals) == 0 {
		return nil
	}
	head := &ListNode{Val: vals[0]}
	cur := head
	for _, v := range vals[1:] {
		cur.Next = &ListNode{Val: v}
		cur = cur.Next
	}
	return head
}

func fmtBool(b bool) string {
	if b {
		return "true"
	}
	return "false"
}

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func solve(head *ListNode) bool {
	vals := []int{}
	for cur := head; cur != nil; cur = cur.Next {
		vals = append(vals, cur.Val)
	}
	for i, j := 0, len(vals)-1; i < j; i, j = i+1, j-1 {
		if vals[i] != vals[j] {
			return false
		}
	}
	return true
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	head := buildList(intsFrom(data, 1, n))
	fmt.Println(fmtBool(solve(head)))
}
`,
  "dsa-add-two-numbers": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

type ListNode struct {
	Val  int
	Next *ListNode
}

func buildList(vals []int) *ListNode {
	if len(vals) == 0 {
		return nil
	}
	head := &ListNode{Val: vals[0]}
	cur := head
	for _, v := range vals[1:] {
		cur.Next = &ListNode{Val: v}
		cur = cur.Next
	}
	return head
}

func fmtList(head *ListNode) string {
	var parts []string
	for cur := head; cur != nil; cur = cur.Next {
		parts = append(parts, strconv.Itoa(cur.Val))
	}
	return strings.Join(parts, " ")
}

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func solve(head1, head2 *ListNode) *ListNode {
	dummy := &ListNode{Val: 0}
	tail := dummy
	carry := 0
	for head1 != nil || head2 != nil || carry != 0 {
		v1 := 0
		v2 := 0
		if head1 != nil {
			v1 = head1.Val
		}
		if head2 != nil {
			v2 = head2.Val
		}
		total := v1 + v2 + carry
		carry = total / 10
		tail.Next = &ListNode{Val: total % 10}
		tail = tail.Next
		if head1 != nil {
			head1 = head1.Next
		}
		if head2 != nil {
			head2 = head2.Next
		}
	}
	return dummy.Next
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	a := intsFrom(data, 1, n)
	m := atoi(data[1+n])
	b := intsFrom(data, 2+n, m)
	head1 := buildList(a)
	head2 := buildList(b)
	fmt.Println(fmtList(solve(head1, head2)))
}
`,
  "dsa-intersection-of-two-linked-lists": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

type ListNode struct {
	Val  int
	Next *ListNode
}

func buildList(vals []int) *ListNode {
	if len(vals) == 0 {
		return nil
	}
	head := &ListNode{Val: vals[0]}
	cur := head
	for _, v := range vals[1:] {
		cur.Next = &ListNode{Val: v}
		cur = cur.Next
	}
	return head
}

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func solve(head1, head2 *ListNode) int {
	vals := map[int]bool{}
	for cur := head1; cur != nil; cur = cur.Next {
		vals[cur.Val] = true
	}
	for cur := head2; cur != nil; cur = cur.Next {
		if vals[cur.Val] {
			return cur.Val
		}
	}
	return -1
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	a := intsFrom(data, 1, n)
	m := atoi(data[1+n])
	b := intsFrom(data, 2+n, m)
	head1 := buildList(a)
	head2 := buildList(b)
	fmt.Println(solve(head1, head2))
}
`,
  "dsa-remove-duplicates-from-sorted-list": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

type ListNode struct {
	Val  int
	Next *ListNode
}

func buildList(vals []int) *ListNode {
	if len(vals) == 0 {
		return nil
	}
	head := &ListNode{Val: vals[0]}
	cur := head
	for _, v := range vals[1:] {
		cur.Next = &ListNode{Val: v}
		cur = cur.Next
	}
	return head
}

func fmtList(head *ListNode) string {
	var parts []string
	for cur := head; cur != nil; cur = cur.Next {
		parts = append(parts, strconv.Itoa(cur.Val))
	}
	return strings.Join(parts, " ")
}

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func solve(head *ListNode) *ListNode {
	cur := head
	for cur != nil && cur.Next != nil {
		if cur.Val == cur.Next.Val {
			cur.Next = cur.Next.Next
		} else {
			cur = cur.Next
		}
	}
	return head
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	head := buildList(intsFrom(data, 1, n))
	fmt.Println(fmtList(solve(head)))
}
`,
  "dsa-reorder-list": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

type ListNode struct {
	Val  int
	Next *ListNode
}

func buildList(vals []int) *ListNode {
	if len(vals) == 0 {
		return nil
	}
	head := &ListNode{Val: vals[0]}
	cur := head
	for _, v := range vals[1:] {
		cur.Next = &ListNode{Val: v}
		cur = cur.Next
	}
	return head
}

func fmtList(head *ListNode) string {
	var parts []string
	for cur := head; cur != nil; cur = cur.Next {
		parts = append(parts, strconv.Itoa(cur.Val))
	}
	return strings.Join(parts, " ")
}

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func solve(head *ListNode) *ListNode {
	if head == nil || head.Next == nil {
		return head
	}
	slow := head
	fast := head
	for fast.Next != nil && fast.Next.Next != nil {
		slow = slow.Next
		fast = fast.Next.Next
	}
	second := slow.Next
	slow.Next = nil
	var prev *ListNode
	for second != nil {
		nxt := second.Next
		second.Next = prev
		prev = second
		second = nxt
	}
	first := head
	second = prev
	for second != nil {
		tmp1 := first.Next
		tmp2 := second.Next
		first.Next = second
		second.Next = tmp1
		first = tmp1
		second = tmp2
	}
	return head
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	head := buildList(intsFrom(data, 1, n))
	fmt.Println(fmtList(solve(head)))
}
`,
  "dsa-swap-nodes-in-pairs": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

type ListNode struct {
	Val  int
	Next *ListNode
}

func buildList(vals []int) *ListNode {
	if len(vals) == 0 {
		return nil
	}
	head := &ListNode{Val: vals[0]}
	cur := head
	for _, v := range vals[1:] {
		cur.Next = &ListNode{Val: v}
		cur = cur.Next
	}
	return head
}

func fmtList(head *ListNode) string {
	var parts []string
	for cur := head; cur != nil; cur = cur.Next {
		parts = append(parts, strconv.Itoa(cur.Val))
	}
	return strings.Join(parts, " ")
}

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func solve(head *ListNode) *ListNode {
	dummy := &ListNode{Val: 0, Next: head}
	prev := dummy
	for prev.Next != nil && prev.Next.Next != nil {
		a := prev.Next
		b := a.Next
		a.Next = b.Next
		b.Next = a
		prev.Next = b
		prev = a
	}
	return dummy.Next
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	head := buildList(intsFrom(data, 1, n))
	fmt.Println(fmtList(solve(head)))
}
`,
  "dsa-odd-even-linked-list": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

type ListNode struct {
	Val  int
	Next *ListNode
}

func buildList(vals []int) *ListNode {
	if len(vals) == 0 {
		return nil
	}
	head := &ListNode{Val: vals[0]}
	cur := head
	for _, v := range vals[1:] {
		cur.Next = &ListNode{Val: v}
		cur = cur.Next
	}
	return head
}

func fmtList(head *ListNode) string {
	var parts []string
	for cur := head; cur != nil; cur = cur.Next {
		parts = append(parts, strconv.Itoa(cur.Val))
	}
	return strings.Join(parts, " ")
}

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func solve(head *ListNode) *ListNode {
	if head == nil || head.Next == nil {
		return head
	}
	odd := head
	even := head.Next
	evenHead := even
	for even != nil && even.Next != nil {
		odd.Next = even.Next
		odd = odd.Next
		even.Next = odd.Next
		even = even.Next
	}
	odd.Next = evenHead
	return head
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	head := buildList(intsFrom(data, 1, n))
	fmt.Println(fmtList(solve(head)))
}
`,
  "dsa-binary-search": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func solve(nums []int, target int) int {
	left := 0
	right := len(nums) - 1
	for left <= right {
		mid := (left + right) / 2
		if nums[mid] == target {
			return mid
		}
		if nums[mid] < target {
			left = mid + 1
		} else {
			right = mid - 1
		}
	}
	return -1
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	nums := intsFrom(data, 1, n)
	target := atoi(data[1+n])
	fmt.Println(solve(nums, target))
}
`,
  "dsa-search-insert-position": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func solve(nums []int, target int) int {
	left := 0
	right := len(nums)
	for left < right {
		mid := (left + right) / 2
		if nums[mid] < target {
			left = mid + 1
		} else {
			right = mid
		}
	}
	return left
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	nums := intsFrom(data, 1, n)
	target := atoi(data[1+n])
	fmt.Println(solve(nums, target))
}
`,
  "dsa-find-first-and-last-position": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func fmtInts(xs []int) string {
	parts := make([]string, len(xs))
	for i, v := range xs {
		parts[i] = strconv.Itoa(v)
	}
	return strings.Join(parts, " ")
}

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func solve(nums []int, target int) []int {
	bound := func(first bool) int {
		left := 0
		right := len(nums)
		for left < right {
			mid := (left + right) / 2
			if nums[mid] > target || (first && nums[mid] == target) {
				right = mid
			} else {
				left = mid + 1
			}
		}
		return left
	}
	lo := bound(true)
	if lo == len(nums) || nums[lo] != target {
		return []int{-1, -1}
	}
	return []int{lo, bound(false) - 1}
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	nums := intsFrom(data, 1, n)
	target := atoi(data[1+n])
	fmt.Println(fmtInts(solve(nums, target)))
}
`,
  "dsa-search-in-rotated-sorted-array": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func solve(nums []int, target int) int {
	left := 0
	right := len(nums) - 1
	for left <= right {
		mid := (left + right) / 2
		if nums[mid] == target {
			return mid
		}
		if nums[left] <= nums[mid] {
			if nums[left] <= target && target < nums[mid] {
				right = mid - 1
			} else {
				left = mid + 1
			}
		} else {
			if nums[mid] < target && target <= nums[right] {
				left = mid + 1
			} else {
				right = mid - 1
			}
		}
	}
	return -1
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	nums := intsFrom(data, 1, n)
	target := atoi(data[1+n])
	fmt.Println(solve(nums, target))
}
`,
  "dsa-find-minimum-in-rotated-sorted-array": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func solve(nums []int) int {
	left := 0
	right := len(nums) - 1
	for left < right {
		mid := (left + right) / 2
		if nums[mid] > nums[right] {
			left = mid + 1
		} else {
			right = mid
		}
	}
	return nums[left]
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	nums := intsFrom(data, 1, n)
	fmt.Println(solve(nums))
}
`,
  "dsa-peak-element": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func solve(nums []int) int {
	left := 0
	right := len(nums) - 1
	for left < right {
		mid := (left + right) / 2
		if nums[mid] > nums[mid+1] {
			right = mid
		} else {
			left = mid + 1
		}
	}
	return left
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	nums := intsFrom(data, 1, n)
	fmt.Println(solve(nums))
}
`,
  "dsa-sqrt-x": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func solve(x int) int {
	if x < 2 {
		return x
	}
	left := 1
	right := x / 2
	ans := 1
	for left <= right {
		mid := (left + right) / 2
		if mid*mid == x {
			return mid
		}
		if mid*mid < x {
			ans = mid
			left = mid + 1
		} else {
			right = mid - 1
		}
	}
	return ans
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	fmt.Println(solve(n))
}
`,
  "dsa-koko-eating-bananas": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func solve(piles []int, h int) int {
	mx := piles[0]
	for _, p := range piles {
		if p > mx {
			mx = p
		}
	}
	left := 1
	right := mx
	for left < right {
		mid := (left + right) / 2
		hours := 0
		for _, p := range piles {
			hours += (p + mid - 1) / mid
		}
		if hours <= h {
			right = mid
		} else {
			left = mid + 1
		}
	}
	return left
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	nums := intsFrom(data, 1, n)
	k := atoi(data[1+n])
	fmt.Println(solve(nums, k))
}
`,
  "dsa-capacity-to-ship-packages": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func solve(weights []int, days int) int {
	can := func(cap int) bool {
		used := 1
		load := 0
		for _, w := range weights {
			if load+w > cap {
				used++
				load = w
			} else {
				load += w
			}
		}
		return used <= days
	}
	left := weights[0]
	right := 0
	for _, w := range weights {
		if w > left {
			left = w
		}
		right += w
	}
	for left < right {
		mid := (left + right) / 2
		if can(mid) {
			right = mid
		} else {
			left = mid + 1
		}
	}
	return left
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	nums := intsFrom(data, 1, n)
	k := atoi(data[1+n])
	fmt.Println(solve(nums, k))
}
`,
  "dsa-single-element-in-sorted-array": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func solve(nums []int) int {
	left := 0
	right := len(nums) - 1
	for left < right {
		mid := (left + right) / 2
		if mid%2 == 1 {
			mid--
		}
		if nums[mid] == nums[mid+1] {
			left = mid + 2
		} else {
			right = mid
		}
	}
	return nums[left]
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	nums := intsFrom(data, 1, n)
	fmt.Println(solve(nums))
}
`,
  "dsa-maximum-depth-of-binary-tree": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

type TreeNode struct {
	Val         int
	Left, Right *TreeNode
}

func buildTree(tokens []string) *TreeNode {
	if len(tokens) == 0 || tokens[0] == "null" {
		return nil
	}
	root := &TreeNode{Val: atoi(tokens[0])}
	queue := []*TreeNode{root}
	i := 1
	for len(queue) > 0 && i < len(tokens) {
		node := queue[0]
		queue = queue[1:]
		if i < len(tokens) && tokens[i] != "null" {
			node.Left = &TreeNode{Val: atoi(tokens[i])}
			queue = append(queue, node.Left)
		}
		i++
		if i < len(tokens) && tokens[i] != "null" {
			node.Right = &TreeNode{Val: atoi(tokens[i])}
			queue = append(queue, node.Right)
		}
		i++
	}
	return root
}

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func maxInt(a, b int) int {
	if a > b {
		return a
	}
	return b
}

func solve(root *TreeNode) int {
	if root == nil {
		return 0
	}
	return 1 + maxInt(solve(root.Left), solve(root.Right))
}

func main() {
	data := readTokens()
	root := buildTree(data)
	fmt.Println(solve(root))
}
`,
  "dsa-invert-binary-tree": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

type TreeNode struct {
	Val         int
	Left, Right *TreeNode
}

func buildTree(tokens []string) *TreeNode {
	if len(tokens) == 0 || tokens[0] == "null" {
		return nil
	}
	root := &TreeNode{Val: atoi(tokens[0])}
	queue := []*TreeNode{root}
	i := 1
	for len(queue) > 0 && i < len(tokens) {
		node := queue[0]
		queue = queue[1:]
		if i < len(tokens) && tokens[i] != "null" {
			node.Left = &TreeNode{Val: atoi(tokens[i])}
			queue = append(queue, node.Left)
		}
		i++
		if i < len(tokens) && tokens[i] != "null" {
			node.Right = &TreeNode{Val: atoi(tokens[i])}
			queue = append(queue, node.Right)
		}
		i++
	}
	return root
}

func fmtTree(root *TreeNode) string {
	if root == nil {
		return ""
	}
	var out []string
	queue := []*TreeNode{root}
	for len(queue) > 0 {
		node := queue[0]
		queue = queue[1:]
		if node == nil {
			out = append(out, "null")
		} else {
			out = append(out, strconv.Itoa(node.Val))
			queue = append(queue, node.Left, node.Right)
		}
	}
	for len(out) > 0 && out[len(out)-1] == "null" {
		out = out[:len(out)-1]
	}
	return strings.Join(out, " ")
}

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func solve(root *TreeNode) *TreeNode {
	if root == nil {
		return nil
	}
	root.Left, root.Right = solve(root.Right), solve(root.Left)
	return root
}

func main() {
	data := readTokens()
	root := buildTree(data)
	fmt.Println(fmtTree(solve(root)))
}
`,
  "dsa-same-tree": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

type TreeNode struct {
	Val         int
	Left, Right *TreeNode
}

func buildTree(tokens []string) *TreeNode {
	if len(tokens) == 0 || tokens[0] == "null" {
		return nil
	}
	root := &TreeNode{Val: atoi(tokens[0])}
	queue := []*TreeNode{root}
	i := 1
	for len(queue) > 0 && i < len(tokens) {
		node := queue[0]
		queue = queue[1:]
		if i < len(tokens) && tokens[i] != "null" {
			node.Left = &TreeNode{Val: atoi(tokens[i])}
			queue = append(queue, node.Left)
		}
		i++
		if i < len(tokens) && tokens[i] != "null" {
			node.Right = &TreeNode{Val: atoi(tokens[i])}
			queue = append(queue, node.Right)
		}
		i++
	}
	return root
}

func fmtBool(b bool) string {
	if b {
		return "true"
	}
	return "false"
}

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func minInt(a, b int) int {
	if a < b {
		return a
	}
	return b
}

func solve(root1, root2 *TreeNode) bool {
	if root1 == nil && root2 == nil {
		return true
	}
	if root1 == nil || root2 == nil {
		return false
	}
	return root1.Val == root2.Val && solve(root1.Left, root2.Left) && solve(root1.Right, root2.Right)
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n1 := atoi(data[0])
	t1 := data[1:minInt(1+n1, len(data))]
	n2 := atoi(data[1+n1])
	t2 := []string{}
	if 2+n1 < len(data) {
		t2 = data[2+n1 : minInt(2+n1+n2, len(data))]
	}
	root1 := buildTree(t1)
	root2 := buildTree(t2)
	fmt.Println(fmtBool(solve(root1, root2)))
}
`,
  "dsa-symmetric-tree": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

type TreeNode struct {
	Val         int
	Left, Right *TreeNode
}

func buildTree(tokens []string) *TreeNode {
	if len(tokens) == 0 || tokens[0] == "null" {
		return nil
	}
	root := &TreeNode{Val: atoi(tokens[0])}
	queue := []*TreeNode{root}
	i := 1
	for len(queue) > 0 && i < len(tokens) {
		node := queue[0]
		queue = queue[1:]
		if i < len(tokens) && tokens[i] != "null" {
			node.Left = &TreeNode{Val: atoi(tokens[i])}
			queue = append(queue, node.Left)
		}
		i++
		if i < len(tokens) && tokens[i] != "null" {
			node.Right = &TreeNode{Val: atoi(tokens[i])}
			queue = append(queue, node.Right)
		}
		i++
	}
	return root
}

func fmtBool(b bool) string {
	if b {
		return "true"
	}
	return "false"
}

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func mirror(a, b *TreeNode) bool {
	if a == nil && b == nil {
		return true
	}
	if a == nil || b == nil {
		return false
	}
	return a.Val == b.Val && mirror(a.Left, b.Right) && mirror(a.Right, b.Left)
}

func solve(root *TreeNode) bool {
	if root == nil {
		return true
	}
	return mirror(root.Left, root.Right)
}

func main() {
	data := readTokens()
	root := buildTree(data)
	fmt.Println(fmtBool(solve(root)))
}
`,
  "dsa-binary-tree-level-order-traversal": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

type TreeNode struct {
	Val         int
	Left, Right *TreeNode
}

func buildTree(tokens []string) *TreeNode {
	if len(tokens) == 0 || tokens[0] == "null" {
		return nil
	}
	root := &TreeNode{Val: atoi(tokens[0])}
	queue := []*TreeNode{root}
	i := 1
	for len(queue) > 0 && i < len(tokens) {
		node := queue[0]
		queue = queue[1:]
		if i < len(tokens) && tokens[i] != "null" {
			node.Left = &TreeNode{Val: atoi(tokens[i])}
			queue = append(queue, node.Left)
		}
		i++
		if i < len(tokens) && tokens[i] != "null" {
			node.Right = &TreeNode{Val: atoi(tokens[i])}
			queue = append(queue, node.Right)
		}
		i++
	}
	return root
}

func fmtInts(xs []int) string {
	parts := make([]string, len(xs))
	for i, v := range xs {
		parts[i] = strconv.Itoa(v)
	}
	return strings.Join(parts, " ")
}

func fmtIntRows(rows [][]int) string {
	lines := make([]string, len(rows))
	for i, r := range rows {
		lines[i] = fmtInts(r)
	}
	return strings.Join(lines, "\\n")
}

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func solve(root *TreeNode) [][]int {
	if root == nil {
		return [][]int{}
	}
	out := [][]int{}
	level := []*TreeNode{root}
	for len(level) > 0 {
		row := []int{}
		nxt := []*TreeNode{}
		for _, n := range level {
			row = append(row, n.Val)
			if n.Left != nil {
				nxt = append(nxt, n.Left)
			}
			if n.Right != nil {
				nxt = append(nxt, n.Right)
			}
		}
		out = append(out, row)
		level = nxt
	}
	return out
}

func main() {
	data := readTokens()
	root := buildTree(data)
	fmt.Println(fmtIntRows(solve(root)))
}
`,
  "dsa-validate-binary-search-tree": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

type TreeNode struct {
	Val         int
	Left, Right *TreeNode
}

func buildTree(tokens []string) *TreeNode {
	if len(tokens) == 0 || tokens[0] == "null" {
		return nil
	}
	root := &TreeNode{Val: atoi(tokens[0])}
	queue := []*TreeNode{root}
	i := 1
	for len(queue) > 0 && i < len(tokens) {
		node := queue[0]
		queue = queue[1:]
		if i < len(tokens) && tokens[i] != "null" {
			node.Left = &TreeNode{Val: atoi(tokens[i])}
			queue = append(queue, node.Left)
		}
		i++
		if i < len(tokens) && tokens[i] != "null" {
			node.Right = &TreeNode{Val: atoi(tokens[i])}
			queue = append(queue, node.Right)
		}
		i++
	}
	return root
}

func fmtBool(b bool) string {
	if b {
		return "true"
	}
	return "false"
}

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func valid(node *TreeNode, low, high *int) bool {
	if node == nil {
		return true
	}
	if (low != nil && node.Val <= *low) || (high != nil && node.Val >= *high) {
		return false
	}
	return valid(node.Left, low, &node.Val) && valid(node.Right, &node.Val, high)
}

func solve(root *TreeNode) bool {
	return valid(root, nil, nil)
}

func main() {
	data := readTokens()
	root := buildTree(data)
	fmt.Println(fmtBool(solve(root)))
}
`,
  "dsa-lowest-common-ancestor": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

type TreeNode struct {
	Val         int
	Left, Right *TreeNode
}

func buildTree(tokens []string) *TreeNode {
	if len(tokens) == 0 || tokens[0] == "null" {
		return nil
	}
	root := &TreeNode{Val: atoi(tokens[0])}
	queue := []*TreeNode{root}
	i := 1
	for len(queue) > 0 && i < len(tokens) {
		node := queue[0]
		queue = queue[1:]
		if i < len(tokens) && tokens[i] != "null" {
			node.Left = &TreeNode{Val: atoi(tokens[i])}
			queue = append(queue, node.Left)
		}
		i++
		if i < len(tokens) && tokens[i] != "null" {
			node.Right = &TreeNode{Val: atoi(tokens[i])}
			queue = append(queue, node.Right)
		}
		i++
	}
	return root
}

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func solve(root *TreeNode, p, q int) int {
	if root == nil {
		return -1
	}
	if root.Val == p || root.Val == q {
		return root.Val
	}
	left := solve(root.Left, p, q)
	right := solve(root.Right, p, q)
	if left != -1 && right != -1 {
		return root.Val
	}
	if left != -1 {
		return left
	}
	return right
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	p := atoi(data[len(data)-2])
	q := atoi(data[len(data)-1])
	root := buildTree(data[:len(data)-2])
	fmt.Println(solve(root, p, q))
}
`,
  "dsa-diameter-of-binary-tree": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

type TreeNode struct {
	Val         int
	Left, Right *TreeNode
}

func buildTree(tokens []string) *TreeNode {
	if len(tokens) == 0 || tokens[0] == "null" {
		return nil
	}
	root := &TreeNode{Val: atoi(tokens[0])}
	queue := []*TreeNode{root}
	i := 1
	for len(queue) > 0 && i < len(tokens) {
		node := queue[0]
		queue = queue[1:]
		if i < len(tokens) && tokens[i] != "null" {
			node.Left = &TreeNode{Val: atoi(tokens[i])}
			queue = append(queue, node.Left)
		}
		i++
		if i < len(tokens) && tokens[i] != "null" {
			node.Right = &TreeNode{Val: atoi(tokens[i])}
			queue = append(queue, node.Right)
		}
		i++
	}
	return root
}

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func maxInt(a, b int) int {
	if a > b {
		return a
	}
	return b
}

func solve(root *TreeNode) int {
	best := 0
	var depth func(node *TreeNode) int
	depth = func(node *TreeNode) int {
		if node == nil {
			return 0
		}
		l := depth(node.Left)
		r := depth(node.Right)
		best = maxInt(best, l+r)
		return 1 + maxInt(l, r)
	}
	depth(root)
	return best
}

func main() {
	data := readTokens()
	root := buildTree(data)
	fmt.Println(solve(root))
}
`,
  "dsa-path-sum": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

type TreeNode struct {
	Val         int
	Left, Right *TreeNode
}

func buildTree(tokens []string) *TreeNode {
	if len(tokens) == 0 || tokens[0] == "null" {
		return nil
	}
	root := &TreeNode{Val: atoi(tokens[0])}
	queue := []*TreeNode{root}
	i := 1
	for len(queue) > 0 && i < len(tokens) {
		node := queue[0]
		queue = queue[1:]
		if i < len(tokens) && tokens[i] != "null" {
			node.Left = &TreeNode{Val: atoi(tokens[i])}
			queue = append(queue, node.Left)
		}
		i++
		if i < len(tokens) && tokens[i] != "null" {
			node.Right = &TreeNode{Val: atoi(tokens[i])}
			queue = append(queue, node.Right)
		}
		i++
	}
	return root
}

func fmtBool(b bool) string {
	if b {
		return "true"
	}
	return "false"
}

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func solve(root *TreeNode, target int) bool {
	if root == nil {
		return false
	}
	if root.Left == nil && root.Right == nil {
		return root.Val == target
	}
	return solve(root.Left, target-root.Val) || solve(root.Right, target-root.Val)
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	target := atoi(data[len(data)-1])
	root := buildTree(data[:len(data)-1])
	fmt.Println(fmtBool(solve(root, target)))
}
`,
  "dsa-kth-smallest-in-bst": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

type TreeNode struct {
	Val         int
	Left, Right *TreeNode
}

func buildTree(tokens []string) *TreeNode {
	if len(tokens) == 0 || tokens[0] == "null" {
		return nil
	}
	root := &TreeNode{Val: atoi(tokens[0])}
	queue := []*TreeNode{root}
	i := 1
	for len(queue) > 0 && i < len(tokens) {
		node := queue[0]
		queue = queue[1:]
		if i < len(tokens) && tokens[i] != "null" {
			node.Left = &TreeNode{Val: atoi(tokens[i])}
			queue = append(queue, node.Left)
		}
		i++
		if i < len(tokens) && tokens[i] != "null" {
			node.Right = &TreeNode{Val: atoi(tokens[i])}
			queue = append(queue, node.Right)
		}
		i++
	}
	return root
}

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func solve(root *TreeNode, k int) int {
	stack := []*TreeNode{}
	cur := root
	for len(stack) > 0 || cur != nil {
		for cur != nil {
			stack = append(stack, cur)
			cur = cur.Left
		}
		cur = stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		k--
		if k == 0 {
			return cur.Val
		}
		cur = cur.Right
	}
	return -1
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	k := atoi(data[len(data)-1])
	root := buildTree(data[:len(data)-1])
	fmt.Println(solve(root, k))
}
`,
  "dsa-binary-tree-right-side-view": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

type TreeNode struct {
	Val         int
	Left, Right *TreeNode
}

func buildTree(tokens []string) *TreeNode {
	if len(tokens) == 0 || tokens[0] == "null" {
		return nil
	}
	root := &TreeNode{Val: atoi(tokens[0])}
	queue := []*TreeNode{root}
	i := 1
	for len(queue) > 0 && i < len(tokens) {
		node := queue[0]
		queue = queue[1:]
		if i < len(tokens) && tokens[i] != "null" {
			node.Left = &TreeNode{Val: atoi(tokens[i])}
			queue = append(queue, node.Left)
		}
		i++
		if i < len(tokens) && tokens[i] != "null" {
			node.Right = &TreeNode{Val: atoi(tokens[i])}
			queue = append(queue, node.Right)
		}
		i++
	}
	return root
}

func fmtInts(xs []int) string {
	parts := make([]string, len(xs))
	for i, v := range xs {
		parts[i] = strconv.Itoa(v)
	}
	return strings.Join(parts, " ")
}

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func solve(root *TreeNode) []int {
	if root == nil {
		return []int{}
	}
	out := []int{}
	level := []*TreeNode{root}
	for len(level) > 0 {
		out = append(out, level[len(level)-1].Val)
		nxt := []*TreeNode{}
		for _, n := range level {
			if n.Left != nil {
				nxt = append(nxt, n.Left)
			}
			if n.Right != nil {
				nxt = append(nxt, n.Right)
			}
		}
		level = nxt
	}
	return out
}

func main() {
	data := readTokens()
	root := buildTree(data)
	fmt.Println(fmtInts(solve(root)))
}
`,
  "dsa-construct-binary-tree-from-preorder-inorder": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

type TreeNode struct {
	Val         int
	Left, Right *TreeNode
}

func fmtTree(root *TreeNode) string {
	if root == nil {
		return ""
	}
	var out []string
	queue := []*TreeNode{root}
	for len(queue) > 0 {
		node := queue[0]
		queue = queue[1:]
		if node == nil {
			out = append(out, "null")
		} else {
			out = append(out, strconv.Itoa(node.Val))
			queue = append(queue, node.Left, node.Right)
		}
	}
	for len(out) > 0 && out[len(out)-1] == "null" {
		out = out[:len(out)-1]
	}
	return strings.Join(out, " ")
}

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func solve(preorder, inorder []int) *TreeNode {
	pos := map[int]int{}
	for i, v := range inorder {
		pos[v] = i
	}
	idx := 0
	var build func(lo, hi int) *TreeNode
	build = func(lo, hi int) *TreeNode {
		if lo > hi {
			return nil
		}
		val := preorder[idx]
		idx++
		node := &TreeNode{Val: val}
		mid := pos[val]
		node.Left = build(lo, mid-1)
		node.Right = build(mid+1, hi)
		return node
	}
	return build(0, len(inorder)-1)
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	a := intsFrom(data, 1, n)
	m := atoi(data[1+n])
	b := intsFrom(data, 2+n, m)
	fmt.Println(fmtTree(solve(a, b)))
}
`,
  "dsa-sum-of-left-leaves": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

type TreeNode struct {
	Val         int
	Left, Right *TreeNode
}

func buildTree(tokens []string) *TreeNode {
	if len(tokens) == 0 || tokens[0] == "null" {
		return nil
	}
	root := &TreeNode{Val: atoi(tokens[0])}
	queue := []*TreeNode{root}
	i := 1
	for len(queue) > 0 && i < len(tokens) {
		node := queue[0]
		queue = queue[1:]
		if i < len(tokens) && tokens[i] != "null" {
			node.Left = &TreeNode{Val: atoi(tokens[i])}
			queue = append(queue, node.Left)
		}
		i++
		if i < len(tokens) && tokens[i] != "null" {
			node.Right = &TreeNode{Val: atoi(tokens[i])}
			queue = append(queue, node.Right)
		}
		i++
	}
	return root
}

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func solve(root *TreeNode) int {
	if root == nil {
		return 0
	}
	total := 0
	if root.Left != nil && root.Left.Left == nil && root.Left.Right == nil {
		total += root.Left.Val
	}
	return total + solve(root.Left) + solve(root.Right)
}

func main() {
	data := readTokens()
	root := buildTree(data)
	fmt.Println(solve(root))
}
`,
  "dsa-binary-tree-maximum-path-sum": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

type TreeNode struct {
	Val         int
	Left, Right *TreeNode
}

func buildTree(tokens []string) *TreeNode {
	if len(tokens) == 0 || tokens[0] == "null" {
		return nil
	}
	root := &TreeNode{Val: atoi(tokens[0])}
	queue := []*TreeNode{root}
	i := 1
	for len(queue) > 0 && i < len(tokens) {
		node := queue[0]
		queue = queue[1:]
		if i < len(tokens) && tokens[i] != "null" {
			node.Left = &TreeNode{Val: atoi(tokens[i])}
			queue = append(queue, node.Left)
		}
		i++
		if i < len(tokens) && tokens[i] != "null" {
			node.Right = &TreeNode{Val: atoi(tokens[i])}
			queue = append(queue, node.Right)
		}
		i++
	}
	return root
}

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func maxInt(a, b int) int {
	if a > b {
		return a
	}
	return b
}

func solve(root *TreeNode) int {
	best := -1 << 60
	var gain func(node *TreeNode) int
	gain = func(node *TreeNode) int {
		if node == nil {
			return 0
		}
		left := maxInt(gain(node.Left), 0)
		right := maxInt(gain(node.Right), 0)
		best = maxInt(best, node.Val+left+right)
		return node.Val + maxInt(left, right)
	}
	gain(root)
	return best
}

func main() {
	data := readTokens()
	root := buildTree(data)
	fmt.Println(solve(root))
}
`,
  "dsa-number-of-islands": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func readLines() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Split(string(data), "\\n")
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func solve(grid [][]string) int {
	m := len(grid)
	n := len(grid[0])
	count := 0
	var dfs func(i, j int)
	dfs = func(i, j int) {
		if i < 0 || i >= m || j < 0 || j >= n || grid[i][j] != "1" {
			return
		}
		grid[i][j] = "0"
		dfs(i+1, j)
		dfs(i-1, j)
		dfs(i, j+1)
		dfs(i, j-1)
	}
	for i := 0; i < m; i++ {
		for j := 0; j < n; j++ {
			if grid[i][j] == "1" {
				count++
				dfs(i, j)
			}
		}
	}
	return count
}

func main() {
	lines := readLines()
	parts := strings.Fields(lines[0])
	r := atoi(parts[0])
	c := atoi(parts[1])
	_ = c
	grid := [][]string{}
	for i := 0; i < r && 1+i < len(lines); i++ {
		row := strings.ReplaceAll(strings.TrimSpace(lines[1+i]), " ", "")
		grid = append(grid, strings.Split(row, ""))
	}
	fmt.Println(solve(grid))
}
`,
  "dsa-flood-fill": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func fmtInts(xs []int) string {
	parts := make([]string, len(xs))
	for i, v := range xs {
		parts[i] = strconv.Itoa(v)
	}
	return strings.Join(parts, " ")
}

func fmtIntRows(rows [][]int) string {
	lines := make([]string, len(rows))
	for i, r := range rows {
		lines[i] = fmtInts(r)
	}
	return strings.Join(lines, "\\n")
}

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func solve(grid [][]int, sr, sc, color int) [][]int {
	old := grid[sr][sc]
	if old == color {
		return grid
	}
	m := len(grid)
	n := len(grid[0])
	var dfs func(i, j int)
	dfs = func(i, j int) {
		if i < 0 || i >= m || j < 0 || j >= n || grid[i][j] != old {
			return
		}
		grid[i][j] = color
		dfs(i+1, j)
		dfs(i-1, j)
		dfs(i, j+1)
		dfs(i, j-1)
	}
	dfs(sr, sc)
	return grid
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	r := atoi(data[0])
	c := atoi(data[1])
	vals := []int{}
	for _, t := range data[2:] {
		vals = append(vals, atoi(t))
	}
	grid := [][]int{}
	for i := 0; i < r; i++ {
		grid = append(grid, vals[i*c:(i+1)*c])
	}
	sr := atoi(data[2+r*c])
	sc := atoi(data[3+r*c])
	color := atoi(data[4+r*c])
	fmt.Println(fmtIntRows(solve(grid, sr, sc, color)))
}
`,
  "dsa-course-schedule": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func fmtBool(b bool) string {
	if b {
		return "true"
	}
	return "false"
}

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func solve(n int, edges [][2]int) bool {
	graph := map[int][]int{}
	indeg := make([]int, n)
	for _, e := range edges {
		a, b := e[0], e[1]
		graph[b] = append(graph[b], a)
		indeg[a]++
	}
	q := []int{}
	for i := 0; i < n; i++ {
		if indeg[i] == 0 {
			q = append(q, i)
		}
	}
	head := 0
	done := 0
	for head < len(q) {
		u := q[head]
		head++
		done++
		for _, v := range graph[u] {
			indeg[v]--
			if indeg[v] == 0 {
				q = append(q, v)
			}
		}
	}
	return done == n
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	m := atoi(data[1])
	edges := [][2]int{}
	for i := 0; i < m; i++ {
		edges = append(edges, [2]int{atoi(data[2+2*i]), atoi(data[3+2*i])})
	}
	fmt.Println(fmtBool(solve(n, edges)))
}
`,
  "dsa-course-schedule-ii": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func fmtInts(xs []int) string {
	parts := make([]string, len(xs))
	for i, v := range xs {
		parts[i] = strconv.Itoa(v)
	}
	return strings.Join(parts, " ")
}

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func solve(n int, edges [][2]int) []int {
	graph := map[int][]int{}
	indeg := make([]int, n)
	for _, e := range edges {
		a, b := e[0], e[1]
		graph[b] = append(graph[b], a)
		indeg[a]++
	}
	q := []int{}
	for i := 0; i < n; i++ {
		if indeg[i] == 0 {
			q = append(q, i)
		}
	}
	head := 0
	order := []int{}
	for head < len(q) {
		u := q[head]
		head++
		order = append(order, u)
		for _, v := range graph[u] {
			indeg[v]--
			if indeg[v] == 0 {
				q = append(q, v)
			}
		}
	}
	if len(order) == n {
		return order
	}
	return []int{-1}
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	m := atoi(data[1])
	edges := [][2]int{}
	for i := 0; i < m; i++ {
		edges = append(edges, [2]int{atoi(data[2+2*i]), atoi(data[3+2*i])})
	}
	fmt.Println(fmtInts(solve(n, edges)))
}
`,
  "dsa-pacific-atlantic-water-flow": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func fmtInts(xs []int) string {
	parts := make([]string, len(xs))
	for i, v := range xs {
		parts[i] = strconv.Itoa(v)
	}
	return strings.Join(parts, " ")
}

func fmtIntRows(rows [][]int) string {
	lines := make([]string, len(rows))
	for i, r := range rows {
		lines[i] = fmtInts(r)
	}
	return strings.Join(lines, "\\n")
}

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func solve(grid [][]int) [][]int {
	m := len(grid)
	n := len(grid[0])
	pac := make([][]bool, m)
	atl := make([][]bool, m)
	for i := range pac {
		pac[i] = make([]bool, n)
		atl[i] = make([]bool, n)
	}
	var dfs func(i, j int, seen [][]bool)
	dfs = func(i, j int, seen [][]bool) {
		seen[i][j] = true
		for _, d := range [][2]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}} {
			ni, nj := i+d[0], j+d[1]
			if ni >= 0 && ni < m && nj >= 0 && nj < n && !seen[ni][nj] && grid[ni][nj] >= grid[i][j] {
				dfs(ni, nj, seen)
			}
		}
	}
	for i := 0; i < m; i++ {
		dfs(i, 0, pac)
		dfs(i, n-1, atl)
	}
	for j := 0; j < n; j++ {
		dfs(0, j, pac)
		dfs(m-1, j, atl)
	}
	out := [][]int{}
	for i := 0; i < m; i++ {
		for j := 0; j < n; j++ {
			if pac[i][j] && atl[i][j] {
				out = append(out, []int{i, j})
			}
		}
	}
	return out
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	r := atoi(data[0])
	c := atoi(data[1])
	vals := []int{}
	for _, t := range data[2:] {
		vals = append(vals, atoi(t))
	}
	grid := [][]int{}
	for i := 0; i < r; i++ {
		grid = append(grid, vals[i*c:(i+1)*c])
	}
	fmt.Println(fmtIntRows(solve(grid)))
}
`,
  "dsa-number-of-provinces": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func solve(grid [][]int) int {
	n := len(grid)
	seen := make([]bool, n)
	var dfs func(i int)
	dfs = func(i int) {
		seen[i] = true
		for j := 0; j < n; j++ {
			if grid[i][j] == 1 && !seen[j] {
				dfs(j)
			}
		}
	}
	count := 0
	for i := 0; i < n; i++ {
		if !seen[i] {
			count++
			dfs(i)
		}
	}
	return count
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	r := atoi(data[0])
	c := atoi(data[1])
	vals := []int{}
	for _, t := range data[2:] {
		vals = append(vals, atoi(t))
	}
	grid := [][]int{}
	for i := 0; i < r; i++ {
		grid = append(grid, vals[i*c:(i+1)*c])
	}
	fmt.Println(solve(grid))
}
`,
  "dsa-word-ladder": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func readLines() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Split(string(data), "\\n")
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func solve(begin, end string, words []string) int {
	wordSet := map[string]bool{}
	for _, w := range words {
		wordSet[w] = true
	}
	if !wordSet[end] {
		return 0
	}
	type item struct {
		word  string
		steps int
	}
	q := []item{{begin, 1}}
	head := 0
	seen := map[string]bool{begin: true}
	for head < len(q) {
		cur := q[head]
		head++
		if cur.word == end {
			return cur.steps
		}
		rs := []rune(cur.word)
		for i := range rs {
			for c := 'a'; c <= 'z'; c++ {
				nxt := make([]rune, len(rs))
				copy(nxt, rs)
				nxt[i] = c
				ns := string(nxt)
				if wordSet[ns] && !seen[ns] {
					seen[ns] = true
					q = append(q, item{ns, cur.steps + 1})
				}
			}
		}
	}
	return 0
}

func main() {
	lines := readLines()
	begin := ""
	end := ""
	n := 0
	if len(lines) > 0 {
		begin = strings.TrimSpace(lines[0])
	}
	if len(lines) > 1 {
		end = strings.TrimSpace(lines[1])
	}
	if len(lines) > 2 {
		n = atoi(lines[2])
	}
	words := []string{}
	for i := 0; i < n && 3+i < len(lines); i++ {
		words = append(words, strings.TrimSpace(lines[3+i]))
	}
	fmt.Println(solve(begin, end, words))
}
`,
  "dsa-keys-and-rooms": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func fmtBool(b bool) string {
	if b {
		return "true"
	}
	return "false"
}

func readLines() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Split(string(data), "\\n")
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func solve(rooms [][]int) bool {
	seen := map[int]bool{0: true}
	stack := []int{0}
	for len(stack) > 0 {
		r := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		for _, k := range rooms[r] {
			if !seen[k] {
				seen[k] = true
				stack = append(stack, k)
			}
		}
	}
	return len(seen) == len(rooms)
}

func main() {
	lines := readLines()
	n := atoi(lines[0])
	rooms := [][]int{}
	idx := 1
	for i := 0; i < n && idx < len(lines); i++ {
		parts := strings.Fields(lines[idx])
		idx++
		nums := []int{}
		for _, p := range parts {
			nums = append(nums, atoi(p))
		}
		if len(nums) == 0 {
			rooms = append(rooms, []int{})
		} else {
			cnt := nums[0]
			room := []int{}
			for j := 1; j <= cnt && j < len(nums); j++ {
				room = append(room, nums[j])
			}
			rooms = append(rooms, room)
		}
	}
	fmt.Println(fmtBool(solve(rooms)))
}
`,
  "dsa-shortest-path-in-binary-matrix": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func readLines() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Split(string(data), "\\n")
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func solve(grid [][]string) int {
	n := len(grid)
	if grid[0][0] == "1" || grid[n-1][n-1] == "1" {
		return -1
	}
	type cell struct{ i, j, d int }
	q := []cell{{0, 0, 1}}
	head := 0
	grid[0][0] = "1"
	for head < len(q) {
		c := q[head]
		head++
		if c.i == n-1 && c.j == n-1 {
			return c.d
		}
		for di := -1; di <= 1; di++ {
			for dj := -1; dj <= 1; dj++ {
				if di == 0 && dj == 0 {
					continue
				}
				ni, nj := c.i+di, c.j+dj
				if ni >= 0 && ni < n && nj >= 0 && nj < n && grid[ni][nj] == "0" {
					grid[ni][nj] = "1"
					q = append(q, cell{ni, nj, c.d + 1})
				}
			}
		}
	}
	return -1
}

func main() {
	lines := readLines()
	parts := strings.Fields(lines[0])
	r := atoi(parts[0])
	grid := [][]string{}
	for i := 0; i < r && 1+i < len(lines); i++ {
		row := strings.ReplaceAll(strings.TrimSpace(lines[1+i]), " ", "")
		grid = append(grid, strings.Split(row, ""))
	}
	fmt.Println(solve(grid))
}
`,
  "dsa-surrounded-regions": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func fmtStrRows(rows [][]string) string {
	lines := make([]string, len(rows))
	for i, r := range rows {
		if len(r) == 0 {
			lines[i] = ""
		} else if len(r[0]) == 1 {
			lines[i] = strings.Join(r, "")
		} else {
			lines[i] = strings.Join(r, " ")
		}
	}
	return strings.Join(lines, "\\n")
}

func readLines() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Split(string(data), "\\n")
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func solve(grid [][]string) [][]string {
	m := len(grid)
	n := len(grid[0])
	var dfs func(i, j int)
	dfs = func(i, j int) {
		if i < 0 || i >= m || j < 0 || j >= n || grid[i][j] != "O" {
			return
		}
		grid[i][j] = "S"
		dfs(i+1, j)
		dfs(i-1, j)
		dfs(i, j+1)
		dfs(i, j-1)
	}
	for i := 0; i < m; i++ {
		dfs(i, 0)
		dfs(i, n-1)
	}
	for j := 0; j < n; j++ {
		dfs(0, j)
		dfs(m-1, j)
	}
	for i := 0; i < m; i++ {
		for j := 0; j < n; j++ {
			if grid[i][j] == "O" {
				grid[i][j] = "X"
			} else if grid[i][j] == "S" {
				grid[i][j] = "O"
			}
		}
	}
	return grid
}

func main() {
	lines := readLines()
	parts := strings.Fields(lines[0])
	r := atoi(parts[0])
	grid := [][]string{}
	for i := 0; i < r && 1+i < len(lines); i++ {
		row := strings.ReplaceAll(strings.TrimSpace(lines[1+i]), " ", "")
		grid = append(grid, strings.Split(row, ""))
	}
	fmt.Println(fmtStrRows(solve(grid)))
}
`,
  "dsa-graph-valid-tree": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func fmtBool(b bool) string {
	if b {
		return "true"
	}
	return "false"
}

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func solve(n int, edges [][2]int) bool {
	if len(edges) != n-1 {
		return false
	}
	parent := make([]int, n)
	for i := range parent {
		parent[i] = i
	}
	var find func(x int) int
	find = func(x int) int {
		for parent[x] != x {
			parent[x] = parent[parent[x]]
			x = parent[x]
		}
		return x
	}
	for _, e := range edges {
		ra, rb := find(e[0]), find(e[1])
		if ra == rb {
			return false
		}
		parent[ra] = rb
	}
	return true
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	m := atoi(data[1])
	edges := [][2]int{}
	for i := 0; i < m; i++ {
		edges = append(edges, [2]int{atoi(data[2+2*i]), atoi(data[3+2*i])})
	}
	fmt.Println(fmtBool(solve(n, edges)))
}
`,
  "dsa-cheapest-flights-within-k-stops": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func solve(n int, edges [][3]int, src, dst, k int) int {
	const inf = 1 << 60
	dist := make([]int, n)
	for i := range dist {
		dist[i] = inf
	}
	dist[src] = 0
	for range k + 1 {
		nxt := append([]int{}, dist...)
		for _, e := range edges {
			u, v, w := e[0], e[1], e[2]
			if dist[u] != inf && dist[u]+w < nxt[v] {
				nxt[v] = dist[u] + w
			}
		}
		dist = nxt
	}
	if dist[dst] == inf {
		return -1
	}
	return dist[dst]
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	m := atoi(data[1])
	edges := [][3]int{}
	for i := 0; i < m; i++ {
		edges = append(edges, [3]int{atoi(data[2+3*i]), atoi(data[3+3*i]), atoi(data[4+3*i])})
	}
	src := atoi(data[2+3*m])
	dst := atoi(data[3+3*m])
	k := atoi(data[4+3*m])
	fmt.Println(solve(n, edges, src, dst, k))
}
`,
  "dsa-climbing-stairs": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func solve(n int) int {
	a, b := 1, 1
	for range n - 1 {
		a, b = b, a+b
	}
	return b
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	fmt.Println(solve(n))
}
`,
  "dsa-house-robber": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func maxInt(a, b int) int {
	if a > b {
		return a
	}
	return b
}

func solve(nums []int) int {
	prev2 := 0
	prev1 := 0
	for _, x := range nums {
		prev2, prev1 = prev1, maxInt(prev1, prev2+x)
	}
	return prev1
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	nums := intsFrom(data, 1, n)
	fmt.Println(solve(nums))
}
`,
  "dsa-house-robber-ii": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func maxInt(a, b int) int {
	if a > b {
		return a
	}
	return b
}

func robRange(arr []int) int {
	prev2 := 0
	prev1 := 0
	for _, x := range arr {
		prev2, prev1 = prev1, maxInt(prev1, prev2+x)
	}
	return prev1
}

func solve(nums []int) int {
	if len(nums) == 1 {
		return nums[0]
	}
	return maxInt(robRange(nums[:len(nums)-1]), robRange(nums[1:]))
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	nums := intsFrom(data, 1, n)
	fmt.Println(solve(nums))
}
`,
  "dsa-coin-change": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func minInt(a, b int) int {
	if a < b {
		return a
	}
	return b
}

func solve(coins []int, amount int) int {
	inf := amount + 1
	dp := make([]int, amount+1)
	for i := range dp {
		dp[i] = inf
	}
	dp[0] = 0
	for a := 1; a <= amount; a++ {
		for _, c := range coins {
			if c <= a {
				dp[a] = minInt(dp[a], dp[a-c]+1)
			}
		}
	}
	if dp[amount] == inf {
		return -1
	}
	return dp[amount]
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	nums := intsFrom(data, 1, n)
	target := atoi(data[1+n])
	fmt.Println(solve(nums, target))
}
`,
  "dsa-coin-change-ii": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func solve(coins []int, amount int) int {
	dp := make([]int, amount+1)
	dp[0] = 1
	for _, c := range coins {
		for a := c; a <= amount; a++ {
			dp[a] += dp[a-c]
		}
	}
	return dp[amount]
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	nums := intsFrom(data, 1, n)
	target := atoi(data[1+n])
	fmt.Println(solve(nums, target))
}
`,
  "dsa-longest-increasing-subsequence": `package main

import (
	"fmt"
	"io"
	"os"
	"sort"
	"strconv"
	"strings"
)

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func solve(nums []int) int {
	tails := []int{}
	for _, x := range nums {
		i := sort.SearchInts(tails, x)
		if i == len(tails) {
			tails = append(tails, x)
		} else {
			tails[i] = x
		}
	}
	return len(tails)
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	nums := intsFrom(data, 1, n)
	fmt.Println(solve(nums))
}
`,
  "dsa-edit-distance": `package main

import (
	"fmt"
	"io"
	"os"
	"strings"
)

func readLines() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Split(string(data), "\\n")
}

func minInt(a, b int) int {
	if a < b {
		return a
	}
	return b
}

func solve(w1, w2 string) int {
	r1 := []rune(w1)
	r2 := []rune(w2)
	m := len(r1)
	n := len(r2)
	dp := make([][]int, m+1)
	for i := range dp {
		dp[i] = make([]int, n+1)
	}
	for i := 0; i <= m; i++ {
		dp[i][0] = i
	}
	for j := 0; j <= n; j++ {
		dp[0][j] = j
	}
	for i := 1; i <= m; i++ {
		for j := 1; j <= n; j++ {
			if r1[i-1] == r2[j-1] {
				dp[i][j] = dp[i-1][j-1]
			} else {
				dp[i][j] = 1 + minInt(dp[i-1][j], minInt(dp[i][j-1], dp[i-1][j-1]))
			}
		}
	}
	return dp[m][n]
}

func main() {
	lines := readLines()
	s1 := ""
	s2 := ""
	if len(lines) > 0 {
		s1 = strings.TrimSpace(lines[0])
	}
	if len(lines) > 1 {
		s2 = strings.TrimSpace(lines[1])
	}
	fmt.Println(solve(s1, s2))
}
`,
  "dsa-longest-common-subsequence": `package main

import (
	"fmt"
	"io"
	"os"
	"strings"
)

func readLines() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Split(string(data), "\\n")
}

func maxInt(a, b int) int {
	if a > b {
		return a
	}
	return b
}

func solve(t1, t2 string) int {
	r1 := []rune(t1)
	r2 := []rune(t2)
	m := len(r1)
	n := len(r2)
	dp := make([][]int, m+1)
	for i := range dp {
		dp[i] = make([]int, n+1)
	}
	for i := 1; i <= m; i++ {
		for j := 1; j <= n; j++ {
			if r1[i-1] == r2[j-1] {
				dp[i][j] = dp[i-1][j-1] + 1
			} else {
				dp[i][j] = maxInt(dp[i-1][j], dp[i][j-1])
			}
		}
	}
	return dp[m][n]
}

func main() {
	lines := readLines()
	s1 := ""
	s2 := ""
	if len(lines) > 0 {
		s1 = strings.TrimSpace(lines[0])
	}
	if len(lines) > 1 {
		s2 = strings.TrimSpace(lines[1])
	}
	fmt.Println(solve(s1, s2))
}
`,
  "dsa-unique-paths": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func solve(m, n int) int {
	dp := make([]int, n)
	for i := range dp {
		dp[i] = 1
	}
	for range m - 1 {
		for j := 1; j < n; j++ {
			dp[j] += dp[j-1]
		}
	}
	return dp[n-1]
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	a := atoi(data[0])
	b := atoi(data[1])
	fmt.Println(solve(a, b))
}
`,
  "dsa-unique-paths-ii": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func solve(grid [][]int) int {
	m := len(grid)
	n := len(grid[0])
	if grid[0][0] == 1 || grid[m-1][n-1] == 1 {
		return 0
	}
	dp := make([][]int, m)
	for i := range dp {
		dp[i] = make([]int, n)
	}
	dp[0][0] = 1
	for i := 0; i < m; i++ {
		for j := 0; j < n; j++ {
			if grid[i][j] == 1 {
				dp[i][j] = 0
				continue
			}
			if i > 0 {
				dp[i][j] += dp[i-1][j]
			}
			if j > 0 {
				dp[i][j] += dp[i][j-1]
			}
		}
	}
	return dp[m-1][n-1]
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	r := atoi(data[0])
	c := atoi(data[1])
	vals := []int{}
	for _, t := range data[2:] {
		vals = append(vals, atoi(t))
	}
	grid := [][]int{}
	for i := 0; i < r; i++ {
		grid = append(grid, vals[i*c:(i+1)*c])
	}
	fmt.Println(solve(grid))
}
`,
  "dsa-word-break": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func fmtBool(b bool) string {
	if b {
		return "true"
	}
	return "false"
}

func readLines() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Split(string(data), "\\n")
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func solve(s string, words []string) bool {
	wordSet := map[string]bool{}
	for _, w := range words {
		wordSet[w] = true
	}
	rs := []rune(s)
	dp := make([]bool, len(rs)+1)
	dp[0] = true
	for i := 1; i <= len(rs); i++ {
		for j := 0; j < i; j++ {
			if dp[j] && wordSet[string(rs[j:i])] {
				dp[i] = true
				break
			}
		}
	}
	return dp[len(rs)]
}

func main() {
	lines := readLines()
	s := ""
	n := 0
	if len(lines) > 0 {
		s = strings.TrimSpace(lines[0])
	}
	if len(lines) > 1 {
		n = atoi(lines[1])
	}
	words := []string{}
	for i := 0; i < n && 2+i < len(lines); i++ {
		words = append(words, strings.TrimSpace(lines[2+i]))
	}
	fmt.Println(fmtBool(solve(s, words)))
}
`,
  "dsa-decode-ways": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func readRaw() string {
	data, _ := io.ReadAll(os.Stdin)
	return string(data)
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func solve(s string) int {
	if len(s) == 0 || s[0] == '0' {
		return 0
	}
	prev2 := 1
	prev1 := 1
	for i := 1; i < len(s); i++ {
		cur := 0
		if s[i] != '0' {
			cur += prev1
		}
		two := atoi(s[i-1 : i+1])
		if two >= 10 && two <= 26 {
			cur += prev2
		}
		prev2, prev1 = prev1, cur
	}
	return prev1
}

func main() {
	s := strings.TrimSpace(readRaw())
	fmt.Println(solve(s))
}
`,
  "dsa-partition-equal-subset-sum": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func fmtBool(b bool) string {
	if b {
		return "true"
	}
	return "false"
}

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func solve(nums []int) bool {
	total := 0
	for _, x := range nums {
		total += x
	}
	if total%2 == 1 {
		return false
	}
	target := total / 2
	dp := make([]bool, target+1)
	dp[0] = true
	for _, x := range nums {
		for s := target; s >= x; s-- {
			dp[s] = dp[s] || dp[s-x]
		}
	}
	return dp[target]
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	nums := intsFrom(data, 1, n)
	fmt.Println(fmtBool(solve(nums)))
}
`,
  "dsa-longest-palindromic-subsequence": `package main

import (
	"fmt"
	"io"
	"os"
	"strings"
)

func readRaw() string {
	data, _ := io.ReadAll(os.Stdin)
	return string(data)
}

func maxInt(a, b int) int {
	if a > b {
		return a
	}
	return b
}

func solve(s string) int {
	rs := []rune(s)
	n := len(rs)
	if n == 0 {
		return 0
	}
	dp := make([][]int, n)
	for i := range dp {
		dp[i] = make([]int, n)
	}
	for i := 0; i < n; i++ {
		dp[i][i] = 1
	}
	for length := 2; length <= n; length++ {
		for i := 0; i+length-1 < n; i++ {
			j := i + length - 1
			if rs[i] == rs[j] {
				if length == 2 {
					dp[i][j] = 2
				} else {
					dp[i][j] = dp[i+1][j-1] + 2
				}
			} else {
				dp[i][j] = maxInt(dp[i+1][j], dp[i][j-1])
			}
		}
	}
	return dp[0][n-1]
}

func main() {
	s := strings.TrimSpace(readRaw())
	fmt.Println(solve(s))
}
`,
  "dsa-best-time-to-buy-sell-stock-ii": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func solve(prices []int) int {
	profit := 0
	for i := 1; i < len(prices); i++ {
		if prices[i] > prices[i-1] {
			profit += prices[i] - prices[i-1]
		}
	}
	return profit
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	nums := intsFrom(data, 1, n)
	fmt.Println(solve(nums))
}
`,
  "dsa-gas-station": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func solve(gas, cost []int) int {
	total := 0
	tank := 0
	start := 0
	for i := range gas {
		diff := gas[i] - cost[i]
		total += diff
		tank += diff
		if tank < 0 {
			start = i + 1
			tank = 0
		}
	}
	if total >= 0 {
		return start
	}
	return -1
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	a := intsFrom(data, 1, n)
	m := atoi(data[1+n])
	b := intsFrom(data, 2+n, m)
	fmt.Println(solve(a, b))
}
`,
  "dsa-assign-cookies": `package main

import (
	"fmt"
	"io"
	"os"
	"sort"
	"strconv"
	"strings"
)

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func solve(g, s []int) int {
	sort.Ints(g)
	sort.Ints(s)
	child := 0
	cookie := 0
	for child < len(g) && cookie < len(s) {
		if s[cookie] >= g[child] {
			child++
		}
		cookie++
	}
	return child
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	a := intsFrom(data, 1, n)
	m := atoi(data[1+n])
	b := intsFrom(data, 2+n, m)
	fmt.Println(solve(a, b))
}
`,
  "dsa-non-overlapping-intervals": `package main

import (
	"fmt"
	"io"
	"os"
	"sort"
	"strconv"
	"strings"
)

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func solve(intervals [][]int) int {
	sort.Slice(intervals, func(i, j int) bool { return intervals[i][1] < intervals[j][1] })
	kept := 0
	end := -1 << 60
	for _, iv := range intervals {
		if iv[0] >= end {
			kept++
			end = iv[1]
		}
	}
	return len(intervals) - kept
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	intervals := [][]int{}
	for i := 0; i < n; i++ {
		intervals = append(intervals, []int{atoi(data[1+2*i]), atoi(data[2+2*i])})
	}
	fmt.Println(solve(intervals))
}
`,
  "dsa-partition-labels": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func fmtInts(xs []int) string {
	parts := make([]string, len(xs))
	for i, v := range xs {
		parts[i] = strconv.Itoa(v)
	}
	return strings.Join(parts, " ")
}

func readRaw() string {
	data, _ := io.ReadAll(os.Stdin)
	return string(data)
}

func maxInt(a, b int) int {
	if a > b {
		return a
	}
	return b
}

func solve(s string) []int {
	last := map[rune]int{}
	rs := []rune(s)
	for i, c := range rs {
		last[c] = i
	}
	out := []int{}
	start := 0
	end := 0
	for i, c := range rs {
		end = maxInt(end, last[c])
		if i == end {
			out = append(out, end-start+1)
			start = i + 1
		}
	}
	return out
}

func main() {
	s := strings.TrimSpace(readRaw())
	fmt.Println(fmtInts(solve(s)))
}
`,
  "dsa-lemonade-change": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func fmtBool(b bool) string {
	if b {
		return "true"
	}
	return "false"
}

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func solve(bills []int) bool {
	fives := 0
	tens := 0
	for _, b := range bills {
		if b == 5 {
			fives++
		} else if b == 10 {
			if fives == 0 {
				return false
			}
			fives--
			tens++
		} else {
			if tens > 0 && fives > 0 {
				tens--
				fives--
			} else if fives >= 3 {
				fives -= 3
			} else {
				return false
			}
		}
	}
	return true
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	nums := intsFrom(data, 1, n)
	fmt.Println(fmtBool(solve(nums)))
}
`,
  "dsa-subsets": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func fmtInts(xs []int) string {
	parts := make([]string, len(xs))
	for i, v := range xs {
		parts[i] = strconv.Itoa(v)
	}
	return strings.Join(parts, " ")
}

func fmtIntRows(rows [][]int) string {
	lines := make([]string, len(rows))
	for i, r := range rows {
		lines[i] = fmtInts(r)
	}
	return strings.Join(lines, "\\n")
}

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func solve(nums []int) [][]int {
	out := [][]int{}
	var backtrack func(i int, cur []int)
	backtrack = func(i int, cur []int) {
		if i == len(nums) {
			out = append(out, append([]int{}, cur...))
			return
		}
		backtrack(i+1, cur)
		cur = append(cur, nums[i])
		backtrack(i+1, cur)
	}
	backtrack(0, []int{})
	return out
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	nums := intsFrom(data, 1, n)
	fmt.Println(fmtIntRows(solve(nums)))
}
`,
  "dsa-permutations": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func fmtInts(xs []int) string {
	parts := make([]string, len(xs))
	for i, v := range xs {
		parts[i] = strconv.Itoa(v)
	}
	return strings.Join(parts, " ")
}

func fmtIntRows(rows [][]int) string {
	lines := make([]string, len(rows))
	for i, r := range rows {
		lines[i] = fmtInts(r)
	}
	return strings.Join(lines, "\\n")
}

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func solve(nums []int) [][]int {
	out := [][]int{}
	var backtrack func(cur []int, used []bool)
	backtrack = func(cur []int, used []bool) {
		if len(cur) == len(nums) {
			out = append(out, append([]int{}, cur...))
			return
		}
		for i, x := range nums {
			if used[i] {
				continue
			}
			used[i] = true
			cur = append(cur, x)
			backtrack(cur, used)
			cur = cur[:len(cur)-1]
			used[i] = false
		}
	}
	backtrack([]int{}, make([]bool, len(nums)))
	return out
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	nums := intsFrom(data, 1, n)
	fmt.Println(fmtIntRows(solve(nums)))
}
`,
  "dsa-combination-sum": `package main

import (
	"fmt"
	"io"
	"os"
	"sort"
	"strconv"
	"strings"
)

func fmtInts(xs []int) string {
	parts := make([]string, len(xs))
	for i, v := range xs {
		parts[i] = strconv.Itoa(v)
	}
	return strings.Join(parts, " ")
}

func fmtIntRows(rows [][]int) string {
	lines := make([]string, len(rows))
	for i, r := range rows {
		lines[i] = fmtInts(r)
	}
	return strings.Join(lines, "\\n")
}

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func intsFrom(tokens []string, start, n int) []int {
	out := make([]int, 0, n)
	for i := 0; i < n && start+i < len(tokens); i++ {
		out = append(out, atoi(tokens[start+i]))
	}
	return out
}

func solve(candidates []int, target int) [][]int {
	sort.Ints(candidates)
	out := [][]int{}
	var backtrack func(start, remaining int, cur []int)
	backtrack = func(start, remaining int, cur []int) {
		if remaining == 0 {
			out = append(out, append([]int{}, cur...))
			return
		}
		for i := start; i < len(candidates); i++ {
			if candidates[i] > remaining {
				break
			}
			cur = append(cur, candidates[i])
			backtrack(i, remaining-candidates[i], cur)
			cur = cur[:len(cur)-1]
		}
	}
	backtrack(0, target, []int{})
	return out
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	nums := intsFrom(data, 1, n)
	target := atoi(data[1+n])
	fmt.Println(fmtIntRows(solve(nums, target)))
}
`,
  "dsa-generate-parentheses": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func fmtStrRows(rows [][]string) string {
	lines := make([]string, len(rows))
	for i, r := range rows {
		if len(r) == 0 {
			lines[i] = ""
		} else if len(r[0]) == 1 {
			lines[i] = strings.Join(r, "")
		} else {
			lines[i] = strings.Join(r, " ")
		}
	}
	return strings.Join(lines, "\\n")
}

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func solve(n int) [][]string {
	out := [][]string{}
	var backtrack func(cur []rune, openCount, closeCount int)
	backtrack = func(cur []rune, openCount, closeCount int) {
		if len(cur) == 2*n {
			out = append(out, []string{string(cur)})
			return
		}
		if openCount < n {
			cur = append(cur, '(')
			backtrack(cur, openCount+1, closeCount)
			cur = cur[:len(cur)-1]
		}
		if closeCount < openCount {
			cur = append(cur, ')')
			backtrack(cur, openCount, closeCount+1)
			cur = cur[:len(cur)-1]
		}
	}
	backtrack([]rune{}, 0, 0)
	return out
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	fmt.Println(fmtStrRows(solve(n)))
}
`,
  "dsa-letter-combinations-of-phone-number": `package main

import (
	"fmt"
	"io"
	"os"
	"strings"
)

func readRaw() string {
	data, _ := io.ReadAll(os.Stdin)
	return string(data)
}

func solve(digits string) []string {
	if len(digits) == 0 {
		return []string{}
	}
	mapping := map[rune]string{
		'2': "abc", '3': "def", '4': "ghi", '5': "jkl",
		'6': "mno", '7': "pqrs", '8': "tuv", '9': "wxyz",
	}
	out := []string{}
	var backtrack func(i int, cur []rune)
	backtrack = func(i int, cur []rune) {
		if i == len(digits) {
			out = append(out, string(cur))
			return
		}
		for _, c := range mapping[rune(digits[i])] {
			cur = append(cur, c)
			backtrack(i+1, cur)
			cur = cur[:len(cur)-1]
		}
	}
	backtrack(0, []rune{})
	return out
}

func main() {
	s := strings.TrimSpace(readRaw())
	fmt.Println(strings.Join(solve(s), " "))
}
`,
  "dsa-n-queens-count": `package main

import (
	"fmt"
	"io"
	"os"
	"strconv"
	"strings"
)

func readTokens() []string {
	data, _ := io.ReadAll(os.Stdin)
	return strings.Fields(string(data))
}

func atoi(s string) int {
	n, _ := strconv.Atoi(strings.TrimSpace(s))
	return n
}

func solve(n int) int {
	count := 0
	cols := map[int]bool{}
	diag1 := map[int]bool{}
	diag2 := map[int]bool{}
	var backtrack func(row int)
	backtrack = func(row int) {
		if row == n {
			count++
			return
		}
		for col := 0; col < n; col++ {
			if cols[col] || diag1[row-col] || diag2[row+col] {
				continue
			}
			cols[col] = true
			diag1[row-col] = true
			diag2[row+col] = true
			backtrack(row + 1)
			delete(cols, col)
			delete(diag1, row-col)
			delete(diag2, row+col)
		}
	}
	backtrack(0)
	return count
}

func main() {
	data := readTokens()
	if len(data) == 0 {
		return
	}
	n := atoi(data[0])
	fmt.Println(solve(n))
}
`,
};
