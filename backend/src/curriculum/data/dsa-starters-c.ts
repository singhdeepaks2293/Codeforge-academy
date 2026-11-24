export const DSA_STARTERS_C: Record<string, string> = {
  "dsa-two-sum": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

/* open-addressing hash map: long long key -> long long value */
typedef struct { long long key, val; int used; } MapEnt;
typedef struct { MapEnt *t; int cap; } LLMap;
static unsigned long long lhash(long long x) {
    unsigned long long z = (unsigned long long)x + 0x9e3779b97f4a7c15ULL;
    z = (z ^ (z >> 30)) * 0xbf58476d1ce4e5b9ULL;
    z = (z ^ (z >> 27)) * 0x94d049bb133111ebULL;
    return z ^ (z >> 31);
}
static void map_init(LLMap *m, int n) {
    int c = 16; while (c < n * 4) c *= 2;
    m->cap = c; m->t = calloc((size_t)c, sizeof(MapEnt));
}
static MapEnt *map_slot(LLMap *m, long long k) {
    int i = (int)(lhash(k) & (unsigned long long)(m->cap - 1));
    while (m->t[i].used && m->t[i].key != k) i = (i + 1) & (m->cap - 1);
    return &m->t[i];
}
static int map_get(LLMap *m, long long k, long long *v) {
    MapEnt *e = map_slot(m, k);
    if (!e->used) return 0;
    *v = e->val; return 1;
}
static void map_put(LLMap *m, long long k, long long v) {
    MapEnt *e = map_slot(m, k);
    e->key = k; e->val = v; e->used = 1;
}

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long *nums = malloc(sizeof(long long) * (n > 0 ? n : 1));
    for (int i = 0; i < n; i++) nums[i] = next_ll();
    long long target = next_ll();
    LLMap seen; map_init(&seen, n);
    long long a = -1, b = -1;
    for (int i = 0; i < n; i++) {
        long long prev;
        if (map_get(&seen, target - nums[i], &prev)) { a = prev; b = i; break; }
        map_put(&seen, nums[i], i);
    }
    printf("%lld %lld\\n", a, b);
    return 0;
}
`,
  "dsa-best-time-to-buy-sell-stock": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long best = 0, low = 0;
    for (int i = 0; i < n; i++) {
        long long p = next_ll();
        if (i == 0) { low = p; continue; }
        if (p - low > best) best = p - low;
        if (p < low) low = p;
    }
    printf("%lld\\n", best);
    return 0;
}
`,
  "dsa-maximum-subarray": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long best = 0, cur = 0;
    for (int i = 0; i < n; i++) {
        long long x = next_ll();
        if (i == 0) { best = cur = x; continue; }
        cur = x > cur + x ? x : cur + x;
        if (cur > best) best = cur;
    }
    printf("%lld\\n", best);
    return 0;
}
`,
  "dsa-contains-duplicate": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

/* open-addressing set of long long */
typedef struct { long long key; int used; } SetEnt;
static unsigned long long lhash(long long x) {
    unsigned long long z = (unsigned long long)x + 0x9e3779b97f4a7c15ULL;
    z = (z ^ (z >> 30)) * 0xbf58476d1ce4e5b9ULL;
    z = (z ^ (z >> 27)) * 0x94d049bb133111ebULL;
    return z ^ (z >> 31);
}

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    int cap = 16; while (cap < n * 4) cap *= 2;
    SetEnt *set = calloc((size_t)cap, sizeof(SetEnt));
    bool dup = false;
    for (int i = 0; i < n; i++) {
        long long x = next_ll();
        int idx = (int)(lhash(x) & (unsigned long long)(cap - 1));
        while (set[idx].used && set[idx].key != x) idx = (idx + 1) & (cap - 1);
        if (set[idx].used) { dup = true; break; }
        set[idx].key = x; set[idx].used = 1;
    }
    printf("%s\\n", dup ? "true" : "false");
    return 0;
}
`,
  "dsa-product-of-array-except-self": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long *nums = malloc(sizeof(long long) * (n > 0 ? n : 1));
    long long *out = malloc(sizeof(long long) * (n > 0 ? n : 1));
    for (int i = 0; i < n; i++) nums[i] = next_ll();
    long long left = 1;
    for (int i = 0; i < n; i++) { out[i] = left; left *= nums[i]; }
    long long right = 1;
    for (int i = n - 1; i >= 0; i--) { out[i] *= right; right *= nums[i]; }
    for (int i = 0; i < n; i++) { if (i) printf(" "); printf("%lld", out[i]); }
    printf("\\n");
    return 0;
}
`,
  "dsa-rotate-array": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long *nums = malloc(sizeof(long long) * (n > 0 ? n : 1));
    for (int i = 0; i < n; i++) nums[i] = next_ll();
    long long k = next_ll();
    if (n > 0) {
        k %= n;
        /* reverse-based rotation, same result as nums[-k:] + nums[:-k] */
        long long *out = malloc(sizeof(long long) * (size_t)n);
        for (int i = 0; i < n; i++) out[(i + k) % n] = nums[i];
        for (int i = 0; i < n; i++) nums[i] = out[i];
        free(out);
    }
    for (int i = 0; i < n; i++) { if (i) printf(" "); printf("%lld", nums[i]); }
    printf("\\n");
    return 0;
}
`,
  "dsa-move-zeroes": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long *nums = malloc(sizeof(long long) * (n > 0 ? n : 1));
    for (int i = 0; i < n; i++) nums[i] = next_ll();
    int pos = 0;
    for (int i = 0; i < n; i++) if (nums[i] != 0) nums[pos++] = nums[i];
    for (int i = pos; i < n; i++) nums[i] = 0;
    for (int i = 0; i < n; i++) { if (i) printf(" "); printf("%lld", nums[i]); }
    printf("\\n");
    return 0;
}
`,
  "dsa-majority-element": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long cand = 0;
    long long count = 0;
    for (int i = 0; i < n; i++) {
        long long x = next_ll();
        if (count == 0) { cand = x; count = 1; }
        else if (x == cand) count++;
        else count--;
    }
    printf("%lld\\n", cand);
    return 0;
}
`,
  "dsa-missing-number": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long sum = 0;
    for (int i = 0; i < n; i++) sum += next_ll();
    printf("%lld\\n", (long long)n * (n + 1) / 2 - sum);
    return 0;
}
`,
  "dsa-find-duplicate-number": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long *nums = malloc(sizeof(long long) * (n > 0 ? n : 1));
    for (int i = 0; i < n; i++) nums[i] = next_ll();
    /* Floyd's cycle detection, exactly as in the Python starter */
    long long slow = nums[0], fast = nums[0];
    for (;;) {
        slow = nums[slow];
        fast = nums[nums[fast]];
        if (slow == fast) break;
    }
    slow = nums[0];
    while (slow != fast) { slow = nums[slow]; fast = nums[fast]; }
    printf("%lld\\n", slow);
    return 0;
}
`,
  "dsa-merge-sorted-array": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long *a = malloc(sizeof(long long) * (n > 0 ? n : 1));
    for (int i = 0; i < n; i++) a[i] = next_ll();
    int m = (int)next_ll();
    long long *b = malloc(sizeof(long long) * (m > 0 ? m : 1));
    for (int i = 0; i < m; i++) b[i] = next_ll();
    int i = 0, j = 0, first = 1;
    while (i < n && j < m) {
        long long v;
        if (a[i] <= b[j]) v = a[i++];
        else v = b[j++];
        if (!first) printf(" ");
        printf("%lld", v);
        first = 0;
    }
    while (i < n) { if (!first) printf(" "); printf("%lld", a[i++]); first = 0; }
    while (j < m) { if (!first) printf(" "); printf("%lld", b[j++]); first = 0; }
    printf("\\n");
    return 0;
}
`,
  "dsa-maximum-product-subarray": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long best = 0, cur_max = 0, cur_min = 0;
    for (int i = 0; i < n; i++) {
        long long x = next_ll();
        if (i == 0) { best = cur_max = cur_min = x; continue; }
        if (x < 0) { long long t = cur_max; cur_max = cur_min; cur_min = t; }
        long long a = cur_max * x, b = cur_min * x;
        cur_max = x > a ? x : a;
        cur_min = x < b ? x : b;
        if (cur_max > best) best = cur_max;
    }
    printf("%lld\\n", best);
    return 0;
}
`,
  "dsa-trapping-rain-water": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long *h = malloc(sizeof(long long) * (n > 0 ? n : 1));
    for (int i = 0; i < n; i++) h[i] = next_ll();
    int left = 0, right = n - 1;
    long long left_max = 0, right_max = 0, water = 0;
    while (left < right) {
        if (h[left] < h[right]) {
            if (h[left] >= left_max) left_max = h[left];
            else water += left_max - h[left];
            left++;
        } else {
            if (h[right] >= right_max) right_max = h[right];
            else water += right_max - h[right];
            right--;
        }
    }
    printf("%lld\\n", water);
    return 0;
}
`,
  "dsa-jump-game": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long reach = 0;
    bool ok = true;
    for (int i = 0; i < n; i++) {
        long long x = next_ll();
        if (i > reach) { ok = false; }
        if (i + x > reach) reach = i + x;
    }
    printf("%s\\n", ok ? "true" : "false");
    return 0;
}
`,
  "dsa-jump-game-ii": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long jumps = 0, cur_end = 0, farthest = 0;
    for (int i = 0; i < n; i++) {
        long long x = next_ll();
        if (i < n - 1) {
            if (i + x > farthest) farthest = i + x;
            if (i == cur_end) { jumps++; cur_end = farthest; }
        }
    }
    printf("%lld\\n", jumps);
    return 0;
}
`,
  "dsa-subarray-sum-equals-k": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

typedef struct { long long key, val; int used; } MapEnt;
typedef struct { MapEnt *t; int cap; } LLMap;
static unsigned long long lhash(long long x) {
    unsigned long long z = (unsigned long long)x + 0x9e3779b97f4a7c15ULL;
    z = (z ^ (z >> 30)) * 0xbf58476d1ce4e5b9ULL;
    z = (z ^ (z >> 27)) * 0x94d049bb133111ebULL;
    return z ^ (z >> 31);
}
static void map_init(LLMap *m, int n) {
    int c = 16; while (c < n * 4) c *= 2;
    m->cap = c; m->t = calloc((size_t)c, sizeof(MapEnt));
}
static MapEnt *map_slot(LLMap *m, long long k) {
    int i = (int)(lhash(k) & (unsigned long long)(m->cap - 1));
    while (m->t[i].used && m->t[i].key != k) i = (i + 1) & (m->cap - 1);
    return &m->t[i];
}
static void map_inc(LLMap *m, long long k, long long d) {
    MapEnt *e = map_slot(m, k);
    if (!e->used) { e->key = k; e->val = 0; e->used = 1; }
    e->val += d;
}
static long long map_get_or0(LLMap *m, long long k) {
    MapEnt *e = map_slot(m, k);
    return e->used ? e->val : 0;
}

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long *nums = malloc(sizeof(long long) * (n > 0 ? n : 1));
    for (int i = 0; i < n; i++) nums[i] = next_ll();
    long long k = next_ll();
    LLMap counts; map_init(&counts, n + 1);
    map_inc(&counts, 0, 1);
    long long prefix = 0, ans = 0;
    for (int i = 0; i < n; i++) {
        prefix += nums[i];
        ans += map_get_or0(&counts, prefix - k);
        map_inc(&counts, prefix, 1);
    }
    printf("%lld\\n", ans);
    return 0;
}
`,
  "dsa-sort-colors": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long *nums = malloc(sizeof(long long) * (n > 0 ? n : 1));
    for (int i = 0; i < n; i++) nums[i] = next_ll();
    /* Dutch national flag, exactly as in the Python starter */
    int low = 0, mid = 0, high = n - 1;
    while (mid <= high) {
        if (nums[mid] == 0) {
            long long t = nums[low]; nums[low] = nums[mid]; nums[mid] = t;
            low++; mid++;
        } else if (nums[mid] == 1) {
            mid++;
        } else {
            long long t = nums[mid]; nums[mid] = nums[high]; nums[high] = t;
            high--;
        }
    }
    for (int i = 0; i < n; i++) { if (i) printf(" "); printf("%lld", nums[i]); }
    printf("\\n");
    return 0;
}
`,
  "dsa-first-missing-positive": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long *nums = malloc(sizeof(long long) * (n > 0 ? n : 1));
    for (int i = 0; i < n; i++) nums[i] = next_ll();
    for (int i = 0; i < n; i++) {
        while (nums[i] >= 1 && nums[i] <= n && nums[nums[i] - 1] != nums[i]) {
            long long t = nums[nums[i] - 1];
            nums[nums[i] - 1] = nums[i];
            nums[i] = t;
        }
    }
    int ans = n + 1;
    for (int i = 0; i < n; i++) {
        if (nums[i] != i + 1) { ans = i + 1; break; }
    }
    printf("%d\\n", ans);
    return 0;
}
`,
  "dsa-valid-palindrome": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <ctype.h>

static char *read_raw(void) {
    size_t cap = 1 << 16, len = 0;
    char *b = malloc(cap); size_t r;
    while ((r = fread(b + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; b = realloc(b, cap); }
    }
    b = realloc(b, len + 1); b[len] = '\\0';
    size_t s = 0;
    while (s < len && isspace((unsigned char)b[s])) s++;
    while (len > s && isspace((unsigned char)b[len - 1])) len--;
    b[len] = '\\0';
    memmove(b, b + s, len - s + 1);
    return b;
}

int main(void) {
    char *s = read_raw();
    size_t n = strlen(s);
    char *chars = malloc(n + 1);
    size_t m = 0;
    for (size_t i = 0; i < n; i++) {
        if (isalnum((unsigned char)s[i])) chars[m++] = (char)tolower((unsigned char)s[i]);
    }
    bool ok = true;
    for (size_t i = 0; i < m / 2; i++) {
        if (chars[i] != chars[m - 1 - i]) { ok = false; break; }
    }
    printf("%s\\n", ok ? "true" : "false");
    return 0;
}
`,
  "dsa-valid-anagram": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <ctype.h>

/* line reader: preserves empty lines, strips leading/trailing whitespace per line */
static char *g_buf; static char **g_lines; static int g_nlines;
static char *trim(char *s) {
    while (*s && isspace((unsigned char)*s)) s++;
    size_t n = strlen(s);
    while (n && isspace((unsigned char)s[n - 1])) s[--n] = '\\0';
    return s;
}
static void read_lines(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_lines = malloc(sizeof(char *) * (len + 2));
    size_t st = 0;
    for (size_t i = 0; i <= len; i++) {
        if (i == len || g_buf[i] == '\\n') {
            if (i == len && st == len) break;
            g_buf[i] = '\\0';
            g_lines[g_nlines++] = trim(g_buf + st);
            st = i + 1;
        }
    }
}
static const char *line_at(int i) { return i < g_nlines ? g_lines[i] : ""; }

int main(void) {
    read_lines();
    const char *s1 = line_at(0), *s2 = line_at(1);
    long counts[256] = {0};
    for (const unsigned char *p = (const unsigned char *)s1; *p; p++) counts[*p]++;
    for (const unsigned char *p = (const unsigned char *)s2; *p; p++) counts[*p]--;
    bool ok = true;
    for (int i = 0; i < 256; i++) if (counts[i] != 0) { ok = false; break; }
    printf("%s\\n", ok ? "true" : "false");
    return 0;
}
`,
  "dsa-longest-substring-without-repeating": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <ctype.h>

static char *read_raw(void) {
    size_t cap = 1 << 16, len = 0;
    char *b = malloc(cap); size_t r;
    while ((r = fread(b + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; b = realloc(b, cap); }
    }
    b = realloc(b, len + 1); b[len] = '\\0';
    size_t s = 0;
    while (s < len && isspace((unsigned char)b[s])) s++;
    while (len > s && isspace((unsigned char)b[len - 1])) len--;
    b[len] = '\\0';
    memmove(b, b + s, len - s + 1);
    return b;
}

int main(void) {
    char *s = read_raw();
    int last[256];
    for (int i = 0; i < 256; i++) last[i] = -1;
    int best = 0, start = 0;
    for (int i = 0; s[i]; i++) {
        unsigned char c = (unsigned char)s[i];
        if (last[c] >= start) start = last[c] + 1;
        last[c] = i;
        if (i - start + 1 > best) best = i - start + 1;
    }
    printf("%d\\n", best);
    return 0;
}
`,
  "dsa-longest-palindromic-substring": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <ctype.h>

static char *read_raw(void) {
    size_t cap = 1 << 16, len = 0;
    char *b = malloc(cap); size_t r;
    while ((r = fread(b + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; b = realloc(b, cap); }
    }
    b = realloc(b, len + 1); b[len] = '\\0';
    size_t s = 0;
    while (s < len && isspace((unsigned char)b[s])) s++;
    while (len > s && isspace((unsigned char)b[len - 1])) len--;
    b[len] = '\\0';
    memmove(b, b + s, len - s + 1);
    return b;
}

int main(void) {
    char *s = read_raw();
    int n = (int)strlen(s);
    if (n == 0) { printf("\\n"); return 0; }
    int best_start = 0, best_len = 1;
    for (int i = 0; i < n; i++) {
        /* expand around (i, i) and (i, i+1), in that order, keeping the
           first longest found -- exactly like the Python starter */
        for (int kind = 0; kind < 2; kind++) {
            int l = i, r = i + kind;
            while (l >= 0 && r < n && s[l] == s[r]) { l--; r++; }
            int len = r - l - 1;
            if (len > best_len) { best_len = len; best_start = l + 1; }
        }
    }
    printf("%.*s\\n", best_len, s + best_start);
    return 0;
}
`,
  "dsa-group-anagrams": `#define _POSIX_C_SOURCE 200809L
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }
static const char *next_str(void) { return g_pos < g_ntok ? g_tok[g_pos++] : ""; }

static int cmp_str(const void *a, const void *b) { return strcmp(*(char *const *)a, *(char *const *)b); }
static int cmp_char(const void *a, const void *b) { return *(const char *)a - *(const char *)b; }

typedef struct { char *sig; char **words; int n, cap; } Group;

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    if (n > g_ntok - g_pos) n = g_ntok - g_pos;
    char **words = malloc(sizeof(char *) * (n > 0 ? n : 1));
    for (int i = 0; i < n; i++) words[i] = (char *)next_str();
    /* words inside a group are sorted alphabetically, and groups are
       sorted by their first word: sort all words first, then group by
       the sorted-characters signature, preserving that order. */
    qsort(words, (size_t)n, sizeof(char *), cmp_str);
    Group *groups = malloc(sizeof(Group) * (n > 0 ? n : 1));
    int ng = 0;
    for (int i = 0; i < n; i++) {
        char *sig = strdup(words[i]);
        qsort(sig, strlen(sig), 1, cmp_char);
        int gi = -1;
        for (int g = 0; g < ng; g++) if (!strcmp(groups[g].sig, sig)) { gi = g; break; }
        if (gi < 0) {
            gi = ng++;
            groups[gi].sig = sig;
            groups[gi].words = NULL; groups[gi].n = 0; groups[gi].cap = 0;
        } else free(sig);
        Group *gr = &groups[gi];
        if (gr->n == gr->cap) { gr->cap = gr->cap ? gr->cap * 2 : 4; gr->words = realloc(gr->words, sizeof(char *) * (size_t)gr->cap); }
        gr->words[gr->n++] = words[i];
    }
    if (ng == 0) { printf("\\n"); return 0; }
    for (int g = 0; g < ng; g++) {
        /* fmt() joins a row of single-character strings with no separator;
           multi-character words are space-separated. Replicate that. */
        int nospace = groups[g].n > 0 && strlen(groups[g].words[0]) == 1;
        for (int i = 0; i < groups[g].n; i++) {
            if (i && !nospace) printf(" ");
            printf("%s", groups[g].words[i]);
        }
        printf("\\n");
    }
    return 0;
}
`,
  "dsa-valid-parentheses": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <ctype.h>

static char *read_raw(void) {
    size_t cap = 1 << 16, len = 0;
    char *b = malloc(cap); size_t r;
    while ((r = fread(b + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; b = realloc(b, cap); }
    }
    b = realloc(b, len + 1); b[len] = '\\0';
    size_t s = 0;
    while (s < len && isspace((unsigned char)b[s])) s++;
    while (len > s && isspace((unsigned char)b[len - 1])) len--;
    b[len] = '\\0';
    memmove(b, b + s, len - s + 1);
    return b;
}

int main(void) {
    char *s = read_raw();
    size_t n = strlen(s);
    char *stack = malloc(n + 1);
    int top = 0;
    bool ok = true;
    for (size_t i = 0; i < n && ok; i++) {
        char c = s[i];
        if (c == '(' || c == '[' || c == '{') stack[top++] = c;
        else {
            char want = c == ')' ? '(' : c == ']' ? '[' : '{';
            if (top == 0 || stack[--top] != want) ok = false;
        }
    }
    if (top != 0) ok = false;
    printf("%s\\n", ok ? "true" : "false");
    return 0;
}
`,
  "dsa-string-to-integer-atoi": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <ctype.h>
#include <limits.h>

static char *read_raw(void) {
    size_t cap = 1 << 16, len = 0;
    char *b = malloc(cap); size_t r;
    while ((r = fread(b + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; b = realloc(b, cap); }
    }
    b = realloc(b, len + 1); b[len] = '\\0';
    size_t s = 0;
    while (s < len && isspace((unsigned char)b[s])) s++;
    while (len > s && isspace((unsigned char)b[len - 1])) len--;
    b[len] = '\\0';
    memmove(b, b + s, len - s + 1);
    return b;
}

int main(void) {
    char *s = read_raw();
    size_t n = strlen(s), i = 0;
    while (i < n && s[i] == ' ') i++;
    int sign = 1;
    if (i < n && (s[i] == '+' || s[i] == '-')) {
        sign = s[i] == '-' ? -1 : 1;
        i++;
    }
    /* accumulate with a cap so very long digit strings cannot overflow;
       the final clamp makes the cap invisible in the result */
    long long num = 0;
    while (i < n && isdigit((unsigned char)s[i])) {
        if (num < 4000000000LL) num = num * 10 + (s[i] - '0');
        i++;
    }
    num *= sign;
    if (num < INT_MIN) num = INT_MIN;
    if (num > INT_MAX) num = INT_MAX;
    printf("%lld\\n", num);
    return 0;
}
`,
  "dsa-longest-common-prefix": `#define _POSIX_C_SOURCE 200809L
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }
static const char *next_str(void) { return g_pos < g_ntok ? g_tok[g_pos++] : ""; }

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    if (n > g_ntok - g_pos) n = g_ntok - g_pos;
    if (n == 0) { printf("\\n"); return 0; }
    char *prefix = strdup(next_str());
    for (int i = 1; i < n; i++) {
        const char *w = next_str();
        while (strncmp(w, prefix, strlen(prefix)) != 0) {
            size_t L = strlen(prefix);
            if (L == 0) break;
            prefix[L - 1] = '\\0';
            if (strlen(prefix) == 0) break;
        }
        if (strlen(prefix) == 0) break;
    }
    printf("%s\\n", prefix);
    return 0;
}
`,
  "dsa-reverse-words-in-string": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <ctype.h>

static char *read_raw(void) {
    size_t cap = 1 << 16, len = 0;
    char *b = malloc(cap); size_t r;
    while ((r = fread(b + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; b = realloc(b, cap); }
    }
    b = realloc(b, len + 1); b[len] = '\\0';
    size_t s = 0;
    while (s < len && isspace((unsigned char)b[s])) s++;
    while (len > s && isspace((unsigned char)b[len - 1])) len--;
    b[len] = '\\0';
    memmove(b, b + s, len - s + 1);
    return b;
}

int main(void) {
    char *s = read_raw();
    /* split into words (Python str.split() semantics: any whitespace run) */
    char **words = NULL;
    int nw = 0, cap = 0;
    char *p = s;
    while (*p) {
        while (*p && isspace((unsigned char)*p)) p++;
        if (!*p) break;
        char *st = p;
        while (*p && !isspace((unsigned char)*p)) p++;
        if (*p) *p++ = '\\0';
        if (nw == cap) { cap = cap ? cap * 2 : 8; words = realloc(words, sizeof(char *) * (size_t)cap); }
        words[nw++] = st;
    }
    for (int i = nw - 1; i >= 0; i--) {
        if (i != nw - 1) printf(" ");
        printf("%s", words[i]);
    }
    printf("\\n");
    return 0;
}
`,
  "dsa-implement-strstr": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <ctype.h>

static char *g_buf; static char **g_lines; static int g_nlines;
static char *trim(char *s) {
    while (*s && isspace((unsigned char)*s)) s++;
    size_t n = strlen(s);
    while (n && isspace((unsigned char)s[n - 1])) s[--n] = '\\0';
    return s;
}
static void read_lines(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_lines = malloc(sizeof(char *) * (len + 2));
    size_t st = 0;
    for (size_t i = 0; i <= len; i++) {
        if (i == len || g_buf[i] == '\\n') {
            if (i == len && st == len) break;
            g_buf[i] = '\\0';
            g_lines[g_nlines++] = trim(g_buf + st);
            st = i + 1;
        }
    }
}
static const char *line_at(int i) { return i < g_nlines ? g_lines[i] : ""; }

int main(void) {
    read_lines();
    const char *hay = line_at(0), *needle = line_at(1);
    const char *p = strstr(hay, needle);
    printf("%d\\n", p ? (int)(p - hay) : -1);
    return 0;
}
`,
  "dsa-count-and-say": `#define _POSIX_C_SOURCE 200809L
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    char *cur = strdup("1");
    for (int step = 1; step < n; step++) {
        size_t len = strlen(cur);
        size_t cap = len * 2 + 16;
        char *nxt = malloc(cap);
        size_t o = 0, i = 0;
        while (i < len) {
            size_t j = i;
            while (j < len && cur[j] == cur[i]) j++;
            /* counts here are single digits in practice; use %zu to be safe */
            o += (size_t)snprintf(nxt + o, cap - o, "%zu%c", j - i, cur[i]);
            i = j;
        }
        nxt[o] = '\\0';
        free(cur);
        cur = nxt;
    }
    printf("%s\\n", cur);
    return 0;
}
`,
  "dsa-zigzag-conversion": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <ctype.h>

static char *g_buf; static char **g_lines; static int g_nlines;
static char *trim(char *s) {
    while (*s && isspace((unsigned char)*s)) s++;
    size_t n = strlen(s);
    while (n && isspace((unsigned char)s[n - 1])) s[--n] = '\\0';
    return s;
}
static void read_lines(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_lines = malloc(sizeof(char *) * (len + 2));
    size_t st = 0;
    for (size_t i = 0; i <= len; i++) {
        if (i == len || g_buf[i] == '\\n') {
            if (i == len && st == len) break;
            g_buf[i] = '\\0';
            g_lines[g_nlines++] = trim(g_buf + st);
            st = i + 1;
        }
    }
}
static const char *line_at(int i) { return i < g_nlines ? g_lines[i] : ""; }

int main(void) {
    read_lines();
    const char *s = line_at(0);
    int k = g_nlines > 1 ? atoi(g_lines[1]) : 0;
    int n = (int)strlen(s);
    if (k <= 1 || k >= n) { printf("%s\\n", s); return 0; }
    char **rows = malloc(sizeof(char *) * (size_t)k);
    size_t *lens = calloc((size_t)k, sizeof(size_t));
    size_t *caps = calloc((size_t)k, sizeof(size_t));
    for (int i = 0; i < k; i++) { caps[i] = 16; rows[i] = malloc(16); rows[i][0] = '\\0'; }
    int r = 0, step = 1;
    for (int i = 0; i < n; i++) {
        if (lens[r] + 2 > caps[r]) { caps[r] *= 2; rows[r] = realloc(rows[r], caps[r]); }
        rows[r][lens[r]++] = s[i];
        rows[r][lens[r]] = '\\0';
        if (r == 0) step = 1;
        else if (r == k - 1) step = -1;
        r += step;
    }
    for (int i = 0; i < k; i++) printf("%s", rows[i]);
    printf("\\n");
    return 0;
}
`,
  "dsa-minimum-window-substring": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <ctype.h>

static char *g_buf; static char **g_lines; static int g_nlines;
static char *trim(char *s) {
    while (*s && isspace((unsigned char)*s)) s++;
    size_t n = strlen(s);
    while (n && isspace((unsigned char)s[n - 1])) s[--n] = '\\0';
    return s;
}
static void read_lines(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_lines = malloc(sizeof(char *) * (len + 2));
    size_t st = 0;
    for (size_t i = 0; i <= len; i++) {
        if (i == len || g_buf[i] == '\\n') {
            if (i == len && st == len) break;
            g_buf[i] = '\\0';
            g_lines[g_nlines++] = trim(g_buf + st);
            st = i + 1;
        }
    }
}
static const char *line_at(int i) { return i < g_nlines ? g_lines[i] : ""; }

int main(void) {
    read_lines();
    const char *s = line_at(0), *t = line_at(1);
    int need[256] = {0};
    for (const unsigned char *p = (const unsigned char *)t; *p; p++) need[*p]++;
    int missing = (int)strlen(t);
    int left = 0, best_start = 0, best_len = 0;
    int n = (int)strlen(s);
    for (int right = 0; right < n; right++) {
        unsigned char c = (unsigned char)s[right];
        if (need[c] > 0) missing--;
        need[c]--;
        while (missing == 0) {
            if (best_len == 0 || right - left + 1 < best_len) {
                best_len = right - left + 1;
                best_start = left;
            }
            unsigned char lc = (unsigned char)s[left];
            need[lc]++;
            if (need[lc] > 0) missing++;
            left++;
        }
    }
    if (best_len == 0) printf("\\n");
    else printf("%.*s\\n", best_len, s + best_start);
    return 0;
}
`,
  "dsa-longest-repeating-character-replacement": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <ctype.h>

static char *g_buf; static char **g_lines; static int g_nlines;
static char *trim(char *s) {
    while (*s && isspace((unsigned char)*s)) s++;
    size_t n = strlen(s);
    while (n && isspace((unsigned char)s[n - 1])) s[--n] = '\\0';
    return s;
}
static void read_lines(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_lines = malloc(sizeof(char *) * (len + 2));
    size_t st = 0;
    for (size_t i = 0; i <= len; i++) {
        if (i == len || g_buf[i] == '\\n') {
            if (i == len && st == len) break;
            g_buf[i] = '\\0';
            g_lines[g_nlines++] = trim(g_buf + st);
            st = i + 1;
        }
    }
}
static const char *line_at(int i) { return i < g_nlines ? g_lines[i] : ""; }

int main(void) {
    read_lines();
    const char *s = line_at(0);
    int k = g_nlines > 1 ? atoi(g_lines[1]) : 0;
    int counts[256] = {0};
    int best = 0, left = 0;
    int n = (int)strlen(s);
    for (int right = 0; right < n; right++) {
        counts[(unsigned char)s[right]]++;
        for (;;) {
            int mx = 0;
            for (int i = 0; i < 256; i++) if (counts[i] > mx) mx = counts[i];
            if ((right - left + 1) - mx <= k) break;
            counts[(unsigned char)s[left]]--;
            left++;
        }
        if (right - left + 1 > best) best = right - left + 1;
    }
    printf("%d\\n", best);
    return 0;
}
`,
  "dsa-first-unique-character": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <ctype.h>

static char *read_raw(void) {
    size_t cap = 1 << 16, len = 0;
    char *b = malloc(cap); size_t r;
    while ((r = fread(b + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; b = realloc(b, cap); }
    }
    b = realloc(b, len + 1); b[len] = '\\0';
    size_t s = 0;
    while (s < len && isspace((unsigned char)b[s])) s++;
    while (len > s && isspace((unsigned char)b[len - 1])) len--;
    b[len] = '\\0';
    memmove(b, b + s, len - s + 1);
    return b;
}

int main(void) {
    char *s = read_raw();
    int counts[256] = {0};
    for (const unsigned char *p = (const unsigned char *)s; *p; p++) counts[*p]++;
    int ans = -1;
    for (int i = 0; s[i]; i++) {
        if (counts[(unsigned char)s[i]] == 1) { ans = i; break; }
    }
    printf("%d\\n", ans);
    return 0;
}
`,
  "dsa-intersection-of-two-arrays": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }
static int cmp_ll(const void *a, const void *b) {
    long long x = *(const long long *)a, y = *(const long long *)b;
    return (x > y) - (x < y);
}

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long *a = malloc(sizeof(long long) * (n > 0 ? n : 1));
    for (int i = 0; i < n; i++) a[i] = next_ll();
    int m = (int)next_ll();
    long long *b = malloc(sizeof(long long) * (m > 0 ? m : 1));
    for (int i = 0; i < m; i++) b[i] = next_ll();
    qsort(a, (size_t)n, sizeof(long long), cmp_ll);
    qsort(b, (size_t)m, sizeof(long long), cmp_ll);
    /* sorted(set(a) & set(b)): merge the sorted deduped arrays */
    int i = 0, j = 0, first = 1;
    while (i < n && j < m) {
        if (a[i] == b[j]) {
            if (!first) printf(" ");
            printf("%lld", a[i]);
            first = 0;
            long long v = a[i];
            while (i < n && a[i] == v) i++;
            while (j < m && b[j] == v) j++;
        } else if (a[i] < b[j]) {
            long long v = a[i];
            while (i < n && a[i] == v) i++;
        } else {
            long long v = b[j];
            while (j < m && b[j] == v) j++;
        }
    }
    printf("\\n");
    return 0;
}
`,
  "dsa-happy-number": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    long long n = next_ll();
    long long seen[4096];
    int nseen = 0;
    while (n != 1) {
        bool found = false;
        for (int i = 0; i < nseen; i++) if (seen[i] == n) { found = true; break; }
        if (found) break;
        if (nseen < 4096) seen[nseen++] = n;
        long long s = 0, x = n;
        if (x < 0) x = -x;
        while (x > 0) { long long d = x % 10; s += d * d; x /= 10; }
        n = s;
    }
    printf("%s\\n", n == 1 ? "true" : "false");
    return 0;
}
`,
  "dsa-isomorphic-strings": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <ctype.h>

static char *g_buf; static char **g_lines; static int g_nlines;
static char *trim(char *s) {
    while (*s && isspace((unsigned char)*s)) s++;
    size_t n = strlen(s);
    while (n && isspace((unsigned char)s[n - 1])) s[--n] = '\\0';
    return s;
}
static void read_lines(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_lines = malloc(sizeof(char *) * (len + 2));
    size_t st = 0;
    for (size_t i = 0; i <= len; i++) {
        if (i == len || g_buf[i] == '\\n') {
            if (i == len && st == len) break;
            g_buf[i] = '\\0';
            g_lines[g_nlines++] = trim(g_buf + st);
            st = i + 1;
        }
    }
}
static const char *line_at(int i) { return i < g_nlines ? g_lines[i] : ""; }

int main(void) {
    read_lines();
    const char *s = line_at(0), *t = line_at(1);
    bool ok = true;
    if (strlen(s) != strlen(t)) ok = false;
    else {
        int m1[256], m2[256];
        for (int i = 0; i < 256; i++) m1[i] = m2[i] = -1;
        for (size_t i = 0; s[i] && ok; i++) {
            unsigned char a = (unsigned char)s[i], b = (unsigned char)t[i];
            if ((m1[a] != -1 && m1[a] != b) || (m2[b] != -1 && m2[b] != a)) ok = false;
            m1[a] = b;
            m2[b] = a;
        }
    }
    printf("%s\\n", ok ? "true" : "false");
    return 0;
}
`,
  "dsa-word-pattern": `#define _POSIX_C_SOURCE 200809L
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <ctype.h>

static char *g_buf; static char **g_lines; static int g_nlines;
static char *trim(char *s) {
    while (*s && isspace((unsigned char)*s)) s++;
    size_t n = strlen(s);
    while (n && isspace((unsigned char)s[n - 1])) s[--n] = '\\0';
    return s;
}
static void read_lines(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_lines = malloc(sizeof(char *) * (len + 2));
    size_t st = 0;
    for (size_t i = 0; i <= len; i++) {
        if (i == len || g_buf[i] == '\\n') {
            if (i == len && st == len) break;
            g_buf[i] = '\\0';
            g_lines[g_nlines++] = trim(g_buf + st);
            st = i + 1;
        }
    }
}
static const char *line_at(int i) { return i < g_nlines ? g_lines[i] : ""; }

int main(void) {
    read_lines();
    const char *pattern = line_at(0);
    char *s = strdup(line_at(1));
    /* split the second line into words */
    char **words = NULL;
    int nw = 0, cap = 0;
    for (char *tok = strtok(s, " \\t"); tok; tok = strtok(NULL, " \\t")) {
        if (nw == cap) { cap = cap ? cap * 2 : 8; words = realloc(words, sizeof(char *) * (size_t)cap); }
        words[nw++] = tok;
    }
    bool ok = true;
    int plen = (int)strlen(pattern);
    if (nw != plen) ok = false;
    else {
        char *p2w[256] = {0};
        char **w2p_words = malloc(sizeof(char *) * (size_t)(nw > 0 ? nw : 1));
        char *w2p_pat = malloc(sizeof(char) * (size_t)(nw > 0 ? nw : 1));
        int nw2p = 0;
        for (int i = 0; i < plen && ok; i++) {
            unsigned char p = (unsigned char)pattern[i];
            char *w = words[i];
            if (p2w[p] && strcmp(p2w[p], w) != 0) ok = false;
            int found = -1;
            for (int j = 0; j < nw2p; j++) if (!strcmp(w2p_words[j], w)) { found = j; break; }
            if (found >= 0 && w2p_pat[found] != pattern[i]) ok = false;
            if (!p2w[p]) p2w[p] = w;
            if (found < 0) { w2p_words[nw2p] = w; w2p_pat[nw2p] = pattern[i]; nw2p++; }
        }
    }
    printf("%s\\n", ok ? "true" : "false");
    return 0;
}
`,
  "dsa-ransom-note": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <ctype.h>

static char *g_buf; static char **g_lines; static int g_nlines;
static char *trim(char *s) {
    while (*s && isspace((unsigned char)*s)) s++;
    size_t n = strlen(s);
    while (n && isspace((unsigned char)s[n - 1])) s[--n] = '\\0';
    return s;
}
static void read_lines(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_lines = malloc(sizeof(char *) * (len + 2));
    size_t st = 0;
    for (size_t i = 0; i <= len; i++) {
        if (i == len || g_buf[i] == '\\n') {
            if (i == len && st == len) break;
            g_buf[i] = '\\0';
            g_lines[g_nlines++] = trim(g_buf + st);
            st = i + 1;
        }
    }
}
static const char *line_at(int i) { return i < g_nlines ? g_lines[i] : ""; }

int main(void) {
    read_lines();
    const char *note = line_at(0), *mag = line_at(1);
    int need[256] = {0}, have[256] = {0};
    for (const unsigned char *p = (const unsigned char *)note; *p; p++) need[*p]++;
    for (const unsigned char *p = (const unsigned char *)mag; *p; p++) have[*p]++;
    bool ok = true;
    for (int i = 0; i < 256; i++) if (have[i] < need[i]) { ok = false; break; }
    printf("%s\\n", ok ? "true" : "false");
    return 0;
}
`,
  "dsa-longest-consecutive-sequence": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

typedef struct { long long key; int used; } SetEnt;
static unsigned long long lhash(long long x) {
    unsigned long long z = (unsigned long long)x + 0x9e3779b97f4a7c15ULL;
    z = (z ^ (z >> 30)) * 0xbf58476d1ce4e5b9ULL;
    z = (z ^ (z >> 27)) * 0x94d049bb133111ebULL;
    return z ^ (z >> 31);
}
static int set_contains(SetEnt *set, int cap, long long x) {
    int i = (int)(lhash(x) & (unsigned long long)(cap - 1));
    while (set[i].used && set[i].key != x) i = (i + 1) & (cap - 1);
    return set[i].used;
}

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long *nums = malloc(sizeof(long long) * (n > 0 ? n : 1));
    for (int i = 0; i < n; i++) nums[i] = next_ll();
    int cap = 16; while (cap < n * 4) cap *= 2;
    SetEnt *set = calloc((size_t)cap, sizeof(SetEnt));
    for (int i = 0; i < n; i++) {
        long long x = nums[i];
        int idx = (int)(lhash(x) & (unsigned long long)(cap - 1));
        while (set[idx].used && set[idx].key != x) idx = (idx + 1) & (cap - 1);
        set[idx].key = x; set[idx].used = 1;
    }
    long long best = 0;
    for (int i = 0; i < n; i++) {
        long long x = nums[i];
        if (!set_contains(set, cap, x - 1)) {
            long long cur = x, len = 1;
            while (set_contains(set, cap, cur + 1)) { cur++; len++; }
            if (len > best) best = len;
        }
    }
    printf("%lld\\n", best);
    return 0;
}
`,
  "dsa-top-k-frequent-elements": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }
static int cmp_ll(const void *a, const void *b) {
    long long x = *(const long long *)a, y = *(const long long *)b;
    return (x > y) - (x < y);
}
typedef struct { long long val; long long count; } Pair;
static int cmp_pair(const void *a, const void *b) {
    const Pair *x = a, *y = b;
    if (x->count != y->count) return x->count < y->count ? 1 : -1; /* count desc */
    if (x->val != y->val) return x->val < y->val ? 1 : -1;         /* value desc */
    return 0;
}

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long *nums = malloc(sizeof(long long) * (n > 0 ? n : 1));
    for (int i = 0; i < n; i++) nums[i] = next_ll();
    long long k = next_ll();
    qsort(nums, (size_t)n, sizeof(long long), cmp_ll);
    Pair *pairs = malloc(sizeof(Pair) * (n > 0 ? n : 1));
    int np = 0;
    for (int i = 0; i < n;) {
        int j = i;
        while (j < n && nums[j] == nums[i]) j++;
        pairs[np].val = nums[i];
        pairs[np].count = j - i;
        np++;
        i = j;
    }
    qsort(pairs, (size_t)np, sizeof(Pair), cmp_pair);
    long long out = k < np ? k : np;
    for (long long i = 0; i < out; i++) {
        if (i) printf(" ");
        printf("%lld", pairs[i].val);
    }
    printf("\\n");
    return 0;
}
`,
  "dsa-valid-sudoku": `#define _POSIX_C_SOURCE 200809L
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <ctype.h>

static char *g_buf; static char **g_lines; static int g_nlines;
static char *trim(char *s) {
    while (*s && isspace((unsigned char)*s)) s++;
    size_t n = strlen(s);
    while (n && isspace((unsigned char)s[n - 1])) s[--n] = '\\0';
    return s;
}
static void read_lines(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_lines = malloc(sizeof(char *) * (len + 2));
    size_t st = 0;
    for (size_t i = 0; i <= len; i++) {
        if (i == len || g_buf[i] == '\\n') {
            if (i == len && st == len) break;
            g_buf[i] = '\\0';
            g_lines[g_nlines++] = trim(g_buf + st);
            st = i + 1;
        }
    }
}
static const char *line_at(int i) { return i < g_nlines ? g_lines[i] : ""; }

int main(void) {
    read_lines();
    int r = 9, c = 9;
    if (g_nlines > 0) sscanf(g_lines[0], "%d %d", &r, &c);
    bool rows[9][10] = {{0}}, cols[9][10] = {{0}}, boxes[9][10] = {{0}};
    bool ok = true;
    for (int i = 0; i < r && ok; i++) {
        const char *line = line_at(1 + i);
        int j = 0;
        for (const char *p = line; *p && j < c; p++) {
            if (*p == ' ') continue;
            char v = *p;
            if (v == '.') { j++; continue; }
            int d = v - '0';
            int b = (i / 3) * 3 + j / 3;
            if (d < 1 || d > 9 || rows[i][d] || cols[j][d] || boxes[b][d]) { ok = false; break; }
            rows[i][d] = cols[j][d] = boxes[b][d] = true;
            j++;
        }
    }
    printf("%s\\n", ok ? "true" : "false");
    return 0;
}
`,
  "dsa-contains-duplicate-ii": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

typedef struct { long long key, val; int used; } MapEnt;
typedef struct { MapEnt *t; int cap; } LLMap;
static unsigned long long lhash(long long x) {
    unsigned long long z = (unsigned long long)x + 0x9e3779b97f4a7c15ULL;
    z = (z ^ (z >> 30)) * 0xbf58476d1ce4e5b9ULL;
    z = (z ^ (z >> 27)) * 0x94d049bb133111ebULL;
    return z ^ (z >> 31);
}
static void map_init(LLMap *m, int n) {
    int c = 16; while (c < n * 4) c *= 2;
    m->cap = c; m->t = calloc((size_t)c, sizeof(MapEnt));
}
static MapEnt *map_slot(LLMap *m, long long k) {
    int i = (int)(lhash(k) & (unsigned long long)(m->cap - 1));
    while (m->t[i].used && m->t[i].key != k) i = (i + 1) & (m->cap - 1);
    return &m->t[i];
}

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long *nums = malloc(sizeof(long long) * (n > 0 ? n : 1));
    for (int i = 0; i < n; i++) nums[i] = next_ll();
    long long k = next_ll();
    LLMap last; map_init(&last, n);
    bool ok = false;
    for (int i = 0; i < n && !ok; i++) {
        MapEnt *e = map_slot(&last, nums[i]);
        if (e->used && i - e->val <= k) ok = true;
        e->key = nums[i]; e->val = i; e->used = 1;
    }
    printf("%s\\n", ok ? "true" : "false");
    return 0;
}
`,
  "dsa-subarray-sum-divisible-by-k": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

typedef struct { long long key, val; int used; } MapEnt;
typedef struct { MapEnt *t; int cap; } LLMap;
static unsigned long long lhash(long long x) {
    unsigned long long z = (unsigned long long)x + 0x9e3779b97f4a7c15ULL;
    z = (z ^ (z >> 30)) * 0xbf58476d1ce4e5b9ULL;
    z = (z ^ (z >> 27)) * 0x94d049bb133111ebULL;
    return z ^ (z >> 31);
}
static void map_init(LLMap *m, int n) {
    int c = 16; while (c < n * 4) c *= 2;
    m->cap = c; m->t = calloc((size_t)c, sizeof(MapEnt));
}
static MapEnt *map_slot(LLMap *m, long long k) {
    int i = (int)(lhash(k) & (unsigned long long)(m->cap - 1));
    while (m->t[i].used && m->t[i].key != k) i = (i + 1) & (m->cap - 1);
    return &m->t[i];
}
static void map_inc(LLMap *m, long long k, long long d) {
    MapEnt *e = map_slot(m, k);
    if (!e->used) { e->key = k; e->val = 0; e->used = 1; }
    e->val += d;
}
static long long map_get_or0(LLMap *m, long long k) {
    MapEnt *e = map_slot(m, k);
    return e->used ? e->val : 0;
}

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long *nums = malloc(sizeof(long long) * (n > 0 ? n : 1));
    for (int i = 0; i < n; i++) nums[i] = next_ll();
    long long k = next_ll();
    if (k == 0) { printf("0\\n"); return 0; } /* Python would raise; no test does this */
    LLMap counts; map_init(&counts, n + 1);
    map_inc(&counts, 0, 1);
    long long prefix = 0, ans = 0;
    for (int i = 0; i < n; i++) {
        /* Python % yields a non-negative remainder for positive k */
        prefix = ((prefix + nums[i]) % k + k) % k;
        ans += map_get_or0(&counts, prefix);
        map_inc(&counts, prefix, 1);
    }
    printf("%lld\\n", ans);
    return 0;
}
`,
  "dsa-find-all-anagrams-in-string": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <ctype.h>

static char *g_buf; static char **g_lines; static int g_nlines;
static char *trim(char *s) {
    while (*s && isspace((unsigned char)*s)) s++;
    size_t n = strlen(s);
    while (n && isspace((unsigned char)s[n - 1])) s[--n] = '\\0';
    return s;
}
static void read_lines(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_lines = malloc(sizeof(char *) * (len + 2));
    size_t st = 0;
    for (size_t i = 0; i <= len; i++) {
        if (i == len || g_buf[i] == '\\n') {
            if (i == len && st == len) break;
            g_buf[i] = '\\0';
            g_lines[g_nlines++] = trim(g_buf + st);
            st = i + 1;
        }
    }
}
static const char *line_at(int i) { return i < g_nlines ? g_lines[i] : ""; }

int main(void) {
    read_lines();
    const char *s = line_at(0), *p = line_at(1);
    int need[256] = {0}, window[256] = {0};
    for (const unsigned char *q = (const unsigned char *)p; *q; q++) need[*q]++;
    int m = (int)strlen(p), n = (int)strlen(s);
    int first = 1;
    for (int i = 0; i < n; i++) {
        window[(unsigned char)s[i]]++;
        if (i >= m) {
            unsigned char left = (unsigned char)s[i - m];
            window[left]--;
        }
        if (memcmp(window, need, sizeof need) == 0) {
            if (!first) printf(" ");
            printf("%d", i - m + 1);
            first = 0;
        }
    }
    printf("\\n");
    return 0;
}
`,
  "dsa-two-sum-ii": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long *nums = malloc(sizeof(long long) * (n > 0 ? n : 1));
    for (int i = 0; i < n; i++) nums[i] = next_ll();
    long long target = next_ll();
    int left = 0, right = n - 1, a = -1, b = -1;
    while (left < right) {
        long long total = nums[left] + nums[right];
        if (total == target) { a = left + 1; b = right + 1; break; }
        if (total < target) left++;
        else right--;
    }
    printf("%d %d\\n", a, b);
    return 0;
}
`,
  "dsa-container-with-most-water": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long *h = malloc(sizeof(long long) * (n > 0 ? n : 1));
    for (int i = 0; i < n; i++) h[i] = next_ll();
    int left = 0, right = n - 1;
    long long best = 0;
    while (left < right) {
        long long mn = h[left] < h[right] ? h[left] : h[right];
        long long area = mn * (right - left);
        if (area > best) best = area;
        if (h[left] < h[right]) left++;
        else right--;
    }
    printf("%lld\\n", best);
    return 0;
}
`,
  "dsa-three-sum": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }
static int cmp_ll(const void *a, const void *b) {
    long long x = *(const long long *)a, y = *(const long long *)b;
    return (x > y) - (x < y);
}

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long *nums = malloc(sizeof(long long) * (n > 0 ? n : 1));
    for (int i = 0; i < n; i++) nums[i] = next_ll();
    qsort(nums, (size_t)n, sizeof(long long), cmp_ll);
    int any = 0;
    for (int i = 0; i < n - 2; i++) {
        if (i > 0 && nums[i] == nums[i - 1]) continue;
        int left = i + 1, right = n - 1;
        while (left < right) {
            long long total = nums[i] + nums[left] + nums[right];
            if (total == 0) {
                printf("%lld %lld %lld\\n", nums[i], nums[left], nums[right]);
                any = 1;
                left++; right--;
                while (left < right && nums[left] == nums[left - 1]) left++;
                while (left < right && nums[right] == nums[right + 1]) right--;
            } else if (total < 0) left++;
            else right--;
        }
    }
    if (!any) printf("\\n");
    return 0;
}
`,
  "dsa-remove-duplicates-sorted": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long *nums = malloc(sizeof(long long) * (n > 0 ? n : 1));
    for (int i = 0; i < n; i++) nums[i] = next_ll();
    int write = 0;
    if (n > 0) {
        write = 1;
        for (int i = 1; i < n; i++) {
            if (nums[i] != nums[write - 1]) nums[write++] = nums[i];
        }
    }
    for (int i = 0; i < write; i++) { if (i) printf(" "); printf("%lld", nums[i]); }
    printf("\\n");
    return 0;
}
`,
  "dsa-squares-of-sorted-array": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long *nums = malloc(sizeof(long long) * (n > 0 ? n : 1));
    long long *out = malloc(sizeof(long long) * (n > 0 ? n : 1));
    for (int i = 0; i < n; i++) nums[i] = next_ll();
    int left = 0, right = n - 1, pos = n - 1;
    while (left <= right) {
        long long al = nums[left] < 0 ? -nums[left] : nums[left];
        long long ar = nums[right] < 0 ? -nums[right] : nums[right];
        if (al > ar) { out[pos] = nums[left] * nums[left]; left++; }
        else { out[pos] = nums[right] * nums[right]; right--; }
        pos--;
    }
    for (int i = 0; i < n; i++) { if (i) printf(" "); printf("%lld", out[i]); }
    printf("\\n");
    return 0;
}
`,
  "dsa-valid-palindrome-ii": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <ctype.h>

static char *read_raw(void) {
    size_t cap = 1 << 16, len = 0;
    char *b = malloc(cap); size_t r;
    while ((r = fread(b + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; b = realloc(b, cap); }
    }
    b = realloc(b, len + 1); b[len] = '\\0';
    size_t s = 0;
    while (s < len && isspace((unsigned char)b[s])) s++;
    while (len > s && isspace((unsigned char)b[len - 1])) len--;
    b[len] = '\\0';
    memmove(b, b + s, len - s + 1);
    return b;
}

static bool is_pal(const char *s, int l, int r) {
    while (l < r) {
        if (s[l] != s[r]) return false;
        l++; r--;
    }
    return true;
}

int main(void) {
    char *s = read_raw();
    int left = 0, right = (int)strlen(s) - 1;
    bool ok = true;
    while (left < right) {
        if (s[left] != s[right]) {
            ok = is_pal(s, left + 1, right) || is_pal(s, left, right - 1);
            break;
        }
        left++; right--;
    }
    printf("%s\\n", ok ? "true" : "false");
    return 0;
}
`,
  "dsa-three-sum-closest": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }
static int cmp_ll(const void *a, const void *b) {
    long long x = *(const long long *)a, y = *(const long long *)b;
    return (x > y) - (x < y);
}
static long long llabs2(long long x) { return x < 0 ? -x : x; }

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long *nums = malloc(sizeof(long long) * (n > 0 ? n : 1));
    for (int i = 0; i < n; i++) nums[i] = next_ll();
    long long target = next_ll();
    qsort(nums, (size_t)n, sizeof(long long), cmp_ll);
    long long best = nums[0] + nums[1] + nums[2];
    for (int i = 0; i < n - 2; i++) {
        int left = i + 1, right = n - 1;
        while (left < right) {
            long long total = nums[i] + nums[left] + nums[right];
            if (llabs2(total - target) < llabs2(best - target)) best = total;
            if (total < target) left++;
            else if (total > target) right--;
            else { printf("%lld\\n", total); return 0; }
        }
    }
    printf("%lld\\n", best);
    return 0;
}
`,
  "dsa-four-sum": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }
static int cmp_ll(const void *a, const void *b) {
    long long x = *(const long long *)a, y = *(const long long *)b;
    return (x > y) - (x < y);
}

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long *nums = malloc(sizeof(long long) * (n > 0 ? n : 1));
    for (int i = 0; i < n; i++) nums[i] = next_ll();
    long long target = next_ll();
    qsort(nums, (size_t)n, sizeof(long long), cmp_ll);
    int any = 0;
    for (int i = 0; i < n - 3; i++) {
        if (i > 0 && nums[i] == nums[i - 1]) continue;
        for (int j = i + 1; j < n - 2; j++) {
            if (j > i + 1 && nums[j] == nums[j - 1]) continue;
            int left = j + 1, right = n - 1;
            while (left < right) {
                long long total = nums[i] + nums[j] + nums[left] + nums[right];
                if (total == target) {
                    printf("%lld %lld %lld %lld\\n", nums[i], nums[j], nums[left], nums[right]);
                    any = 1;
                    left++; right--;
                    while (left < right && nums[left] == nums[left - 1]) left++;
                    while (left < right && nums[right] == nums[right + 1]) right--;
                } else if (total < target) left++;
                else right--;
            }
        }
    }
    if (!any) printf("\\n");
    return 0;
}
`,
  "dsa-sort-array-by-parity": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long *nums = malloc(sizeof(long long) * (n > 0 ? n : 1));
    for (int i = 0; i < n; i++) nums[i] = next_ll();
    /* Python: x % 2 == 1 is True for negative odds too (-3 % 2 == 1 in
       Python), so oddness must be tested as x % 2 != 0 in C. */
    int first = 1;
    for (int i = 0; i < n; i++) {
        if (nums[i] % 2 == 0) { if (!first) printf(" "); printf("%lld", nums[i]); first = 0; }
    }
    for (int i = 0; i < n; i++) {
        if (nums[i] % 2 != 0) { if (!first) printf(" "); printf("%lld", nums[i]); first = 0; }
    }
    printf("\\n");
    return 0;
}
`,
  "dsa-remove-element": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long *nums = malloc(sizeof(long long) * (n > 0 ? n : 1));
    for (int i = 0; i < n; i++) nums[i] = next_ll();
    long long val = next_ll();
    int write = 0;
    for (int i = 0; i < n; i++) {
        if (nums[i] != val) nums[write++] = nums[i];
    }
    for (int i = 0; i < write; i++) { if (i) printf(" "); printf("%lld", nums[i]); }
    printf("\\n");
    return 0;
}
`,
  "dsa-max-sum-subarray-size-k": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long *nums = malloc(sizeof(long long) * (n > 0 ? n : 1));
    for (int i = 0; i < n; i++) nums[i] = next_ll();
    int k = (int)next_ll();
    int kk = k < n ? k : n;
    if (kk < 0) kk = 0;
    long long window = 0;
    for (int i = 0; i < kk; i++) window += nums[i];
    long long best = window;
    for (int i = kk; i < n; i++) {
        window += nums[i] - nums[i - kk];
        if (window > best) best = window;
    }
    printf("%lld\\n", best);
    return 0;
}
`,
  "dsa-longest-substring-k-distinct": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <ctype.h>

static char *g_buf; static char **g_lines; static int g_nlines;
static char *trim(char *s) {
    while (*s && isspace((unsigned char)*s)) s++;
    size_t n = strlen(s);
    while (n && isspace((unsigned char)s[n - 1])) s[--n] = '\\0';
    return s;
}
static void read_lines(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_lines = malloc(sizeof(char *) * (len + 2));
    size_t st = 0;
    for (size_t i = 0; i <= len; i++) {
        if (i == len || g_buf[i] == '\\n') {
            if (i == len && st == len) break;
            g_buf[i] = '\\0';
            g_lines[g_nlines++] = trim(g_buf + st);
            st = i + 1;
        }
    }
}
static const char *line_at(int i) { return i < g_nlines ? g_lines[i] : ""; }

int main(void) {
    read_lines();
    const char *s = line_at(0);
    int k = g_nlines > 1 ? atoi(g_lines[1]) : 0;
    int counts[256] = {0};
    int distinct = 0, best = 0, left = 0;
    int n = (int)strlen(s);
    for (int right = 0; right < n; right++) {
        unsigned char c = (unsigned char)s[right];
        if (counts[c] == 0) distinct++;
        counts[c]++;
        while (distinct > k) {
            unsigned char lc = (unsigned char)s[left];
            counts[lc]--;
            if (counts[lc] == 0) distinct--;
            left++;
        }
        if (right - left + 1 > best) best = right - left + 1;
    }
    printf("%d\\n", best);
    return 0;
}
`,
  "dsa-minimum-size-subarray-sum": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long *nums = malloc(sizeof(long long) * (n > 0 ? n : 1));
    for (int i = 0; i < n; i++) nums[i] = next_ll();
    long long target = next_ll();
    long long best = LLONG_MAX / 4;
    int left = 0;
    long long total = 0;
    for (int right = 0; right < n; right++) {
        total += nums[right];
        while (total >= target) {
            if (right - left + 1 < best) best = right - left + 1;
            total -= nums[left];
            left++;
        }
    }
    printf("%lld\\n", best == LLONG_MAX / 4 ? 0 : best);
    return 0;
}
`,
  "dsa-permutation-in-string": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <ctype.h>

static char *g_buf; static char **g_lines; static int g_nlines;
static char *trim(char *s) {
    while (*s && isspace((unsigned char)*s)) s++;
    size_t n = strlen(s);
    while (n && isspace((unsigned char)s[n - 1])) s[--n] = '\\0';
    return s;
}
static void read_lines(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_lines = malloc(sizeof(char *) * (len + 2));
    size_t st = 0;
    for (size_t i = 0; i <= len; i++) {
        if (i == len || g_buf[i] == '\\n') {
            if (i == len && st == len) break;
            g_buf[i] = '\\0';
            g_lines[g_nlines++] = trim(g_buf + st);
            st = i + 1;
        }
    }
}
static const char *line_at(int i) { return i < g_nlines ? g_lines[i] : ""; }

int main(void) {
    read_lines();
    const char *s1 = line_at(0), *s2 = line_at(1);
    int need[256] = {0}, window[256] = {0};
    for (const unsigned char *p = (const unsigned char *)s1; *p; p++) need[*p]++;
    int k = (int)strlen(s1), n = (int)strlen(s2);
    bool ok = false;
    for (int i = 0; i < n && !ok; i++) {
        window[(unsigned char)s2[i]]++;
        if (i >= k) {
            unsigned char left = (unsigned char)s2[i - k];
            window[left]--;
        }
        if (memcmp(window, need, sizeof need) == 0) ok = true;
    }
    printf("%s\\n", ok ? "true" : "false");
    return 0;
}
`,
  "dsa-fruits-into-baskets": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

typedef struct { long long key, val; int used; } MapEnt;
typedef struct { MapEnt *t; int cap; } LLMap;
static unsigned long long lhash(long long x) {
    unsigned long long z = (unsigned long long)x + 0x9e3779b97f4a7c15ULL;
    z = (z ^ (z >> 30)) * 0xbf58476d1ce4e5b9ULL;
    z = (z ^ (z >> 27)) * 0x94d049bb133111ebULL;
    return z ^ (z >> 31);
}
static void map_init(LLMap *m, int n) {
    int c = 16; while (c < n * 4) c *= 2;
    m->cap = c; m->t = calloc((size_t)c, sizeof(MapEnt));
}
static MapEnt *map_slot(LLMap *m, long long k) {
    int i = (int)(lhash(k) & (unsigned long long)(m->cap - 1));
    while (m->t[i].used && m->t[i].key != k) i = (i + 1) & (m->cap - 1);
    return &m->t[i];
}
/* add d to the count for k; returns the new count (0 counts stay in the
   table so open-addressing probes are never broken by deletion) */
static long long map_add(LLMap *m, long long k, long long d) {
    MapEnt *e = map_slot(m, k);
    if (!e->used) { e->key = k; e->val = 0; e->used = 1; }
    e->val += d;
    return e->val;
}

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long *nums = malloc(sizeof(long long) * (n > 0 ? n : 1));
    for (int i = 0; i < n; i++) nums[i] = next_ll();
    LLMap counts; map_init(&counts, n);
    int distinct = 0, best = 0, left = 0;
    for (int right = 0; right < n; right++) {
        if (map_add(&counts, nums[right], 1) == 1) distinct++;
        while (distinct > 2) {
            if (map_add(&counts, nums[left], -1) == 0) distinct--;
            left++;
        }
        if (right - left + 1 > best) best = right - left + 1;
    }
    printf("%d\\n", best);
    return 0;
}
`,
  "dsa-maximum-vowels-in-substring": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <ctype.h>

static char *g_buf; static char **g_lines; static int g_nlines;
static char *trim(char *s) {
    while (*s && isspace((unsigned char)*s)) s++;
    size_t n = strlen(s);
    while (n && isspace((unsigned char)s[n - 1])) s[--n] = '\\0';
    return s;
}
static void read_lines(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_lines = malloc(sizeof(char *) * (len + 2));
    size_t st = 0;
    for (size_t i = 0; i <= len; i++) {
        if (i == len || g_buf[i] == '\\n') {
            if (i == len && st == len) break;
            g_buf[i] = '\\0';
            g_lines[g_nlines++] = trim(g_buf + st);
            st = i + 1;
        }
    }
}
static const char *line_at(int i) { return i < g_nlines ? g_lines[i] : ""; }
static int is_vowel(char c) {
    return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u';
}

int main(void) {
    read_lines();
    const char *s = line_at(0);
    int k = g_nlines > 1 ? atoi(g_lines[1]) : 0;
    int n = (int)strlen(s);
    int kk = k < n ? k : n;
    int window = 0;
    for (int i = 0; i < kk; i++) if (is_vowel(s[i])) window++;
    int best = window;
    for (int i = k; i < n; i++) {
        if (is_vowel(s[i])) window++;
        if (is_vowel(s[i - k])) window--;
        if (window > best) best = window;
    }
    printf("%d\\n", best);
    return 0;
}
`,
  "dsa-sliding-window-maximum": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long *nums = malloc(sizeof(long long) * (n > 0 ? n : 1));
    for (int i = 0; i < n; i++) nums[i] = next_ll();
    int k = (int)next_ll();
    if (k <= 0 || k > n) { printf("\\n"); return 0; }
    /* deque of indices, monotonic decreasing by value */
    int *dq = malloc(sizeof(int) * (size_t)(n + 1));
    int head = 0, tail = 0; /* [head, tail) holds indices, front at head */
    int first = 1;
    for (int i = 0; i < n; i++) {
        while (tail > head && nums[dq[tail - 1]] <= nums[i]) tail--;
        dq[tail++] = i;
        if (dq[head] <= i - k) head++;
        if (i >= k - 1) {
            if (!first) printf(" ");
            printf("%lld", nums[dq[head]]);
            first = 0;
        }
    }
    printf("\\n");
    return 0;
}
`,
  "dsa-binary-subarrays-with-sum": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

typedef struct { long long key, val; int used; } MapEnt;
typedef struct { MapEnt *t; int cap; } LLMap;
static unsigned long long lhash(long long x) {
    unsigned long long z = (unsigned long long)x + 0x9e3779b97f4a7c15ULL;
    z = (z ^ (z >> 30)) * 0xbf58476d1ce4e5b9ULL;
    z = (z ^ (z >> 27)) * 0x94d049bb133111ebULL;
    return z ^ (z >> 31);
}
static void map_init(LLMap *m, int n) {
    int c = 16; while (c < n * 4) c *= 2;
    m->cap = c; m->t = calloc((size_t)c, sizeof(MapEnt));
}
static MapEnt *map_slot(LLMap *m, long long k) {
    int i = (int)(lhash(k) & (unsigned long long)(m->cap - 1));
    while (m->t[i].used && m->t[i].key != k) i = (i + 1) & (m->cap - 1);
    return &m->t[i];
}
static void map_inc(LLMap *m, long long k, long long d) {
    MapEnt *e = map_slot(m, k);
    if (!e->used) { e->key = k; e->val = 0; e->used = 1; }
    e->val += d;
}
static long long map_get_or0(LLMap *m, long long k) {
    MapEnt *e = map_slot(m, k);
    return e->used ? e->val : 0;
}

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long *nums = malloc(sizeof(long long) * (n > 0 ? n : 1));
    for (int i = 0; i < n; i++) nums[i] = next_ll();
    long long goal = next_ll();
    LLMap counts; map_init(&counts, n + 1);
    map_inc(&counts, 0, 1);
    long long prefix = 0, ans = 0;
    for (int i = 0; i < n; i++) {
        prefix += nums[i];
        ans += map_get_or0(&counts, prefix - goal);
        map_inc(&counts, prefix, 1);
    }
    printf("%lld\\n", ans);
    return 0;
}
`,
  "dsa-longest-subarray-of-ones-after-deleting-one": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long *nums = malloc(sizeof(long long) * (n > 0 ? n : 1));
    for (int i = 0; i < n; i++) nums[i] = next_ll();
    int best = 0, left = 0, zeros = 0;
    for (int right = 0; right < n; right++) {
        if (nums[right] == 0) zeros++;
        while (zeros > 1) {
            if (nums[left] == 0) zeros--;
            left++;
        }
        /* one element must be deleted, so the length is right-left, not +1 */
        if (right - left > best) best = right - left;
    }
    printf("%d\\n", best);
    return 0;
}
`,
  "dsa-max-consecutive-ones-iii": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long *nums = malloc(sizeof(long long) * (n > 0 ? n : 1));
    for (int i = 0; i < n; i++) nums[i] = next_ll();
    long long k = next_ll();
    int best = 0, left = 0, zeros = 0;
    for (int right = 0; right < n; right++) {
        if (nums[right] == 0) zeros++;
        while (zeros > k) {
            if (nums[left] == 0) zeros--;
            left++;
        }
        if (right - left + 1 > best) best = right - left + 1;
    }
    printf("%d\\n", best);
    return 0;
}
`,
  "dsa-evaluate-reverse-polish-notation": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }
static const char *next_str(void) { return g_pos < g_ntok ? g_tok[g_pos++] : ""; }

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long *stack = malloc(sizeof(long long) * (n > 0 ? n : 1));
    int top = 0;
    for (int i = 0; i < n; i++) {
        const char *t = next_str();
        if (strlen(t) == 1 && (t[0] == '+' || t[0] == '-' || t[0] == '*' || t[0] == '/')) {
            long long b = stack[--top];
            long long a = stack[--top];
            long long v = 0;
            if (t[0] == '+') v = a + b;
            else if (t[0] == '-') v = a - b;
            else if (t[0] == '*') v = a * b;
            else v = a / b; /* C integer division truncates toward zero, like int(a/b) */
            stack[top++] = v;
        } else {
            stack[top++] = strtoll(t, NULL, 10);
        }
    }
    printf("%lld\\n", top > 0 ? stack[0] : 0);
    return 0;
}
`,
  "dsa-daily-temperatures": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long *temps = malloc(sizeof(long long) * (n > 0 ? n : 1));
    long long *out = calloc((size_t)(n > 0 ? n : 1), sizeof(long long));
    for (int i = 0; i < n; i++) temps[i] = next_ll();
    int *stack = malloc(sizeof(int) * (n > 0 ? n : 1));
    int top = 0;
    for (int i = 0; i < n; i++) {
        while (top > 0 && temps[stack[top - 1]] < temps[i]) {
            int j = stack[--top];
            out[j] = i - j;
        }
        stack[top++] = i;
    }
    for (int i = 0; i < n; i++) { if (i) printf(" "); printf("%lld", out[i]); }
    printf("\\n");
    return 0;
}
`,
  "dsa-next-greater-element-i": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

typedef struct { long long key, val; int used; } MapEnt;
typedef struct { MapEnt *t; int cap; } LLMap;
static unsigned long long lhash(long long x) {
    unsigned long long z = (unsigned long long)x + 0x9e3779b97f4a7c15ULL;
    z = (z ^ (z >> 30)) * 0xbf58476d1ce4e5b9ULL;
    z = (z ^ (z >> 27)) * 0x94d049bb133111ebULL;
    return z ^ (z >> 31);
}
static void map_init(LLMap *m, int n) {
    int c = 16; while (c < n * 4) c *= 2;
    m->cap = c; m->t = calloc((size_t)c, sizeof(MapEnt));
}
static MapEnt *map_slot(LLMap *m, long long k) {
    int i = (int)(lhash(k) & (unsigned long long)(m->cap - 1));
    while (m->t[i].used && m->t[i].key != k) i = (i + 1) & (m->cap - 1);
    return &m->t[i];
}
static void map_put(LLMap *m, long long k, long long v) {
    MapEnt *e = map_slot(m, k);
    e->key = k; e->val = v; e->used = 1;
}
static long long map_get_or(LLMap *m, long long k, long long dflt) {
    MapEnt *e = map_slot(m, k);
    return e->used ? e->val : dflt;
}

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long *a = malloc(sizeof(long long) * (n > 0 ? n : 1));
    for (int i = 0; i < n; i++) a[i] = next_ll();
    int m = (int)next_ll();
    long long *b = malloc(sizeof(long long) * (m > 0 ? m : 1));
    for (int i = 0; i < m; i++) b[i] = next_ll();
    LLMap nxt; map_init(&nxt, m);
    long long *stack = malloc(sizeof(long long) * (m > 0 ? m : 1));
    int top = 0;
    for (int i = 0; i < m; i++) {
        long long x = b[i];
        while (top > 0 && stack[top - 1] < x) map_put(&nxt, stack[--top], x);
        stack[top++] = x;
    }
    while (top > 0) map_put(&nxt, stack[--top], -1);
    for (int i = 0; i < n; i++) {
        if (i) printf(" ");
        printf("%lld", map_get_or(&nxt, a[i], -1));
    }
    printf("\\n");
    return 0;
}
`,
  "dsa-largest-rectangle-in-histogram": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long *h = malloc(sizeof(long long) * (n + 1 > 0 ? n + 1 : 1));
    for (int i = 0; i < n; i++) h[i] = next_ll();
    h[n] = 0; /* sentinel, as in heights + [0] in the Python starter */
    int *stack = malloc(sizeof(int) * (n + 1 > 0 ? n + 1 : 1));
    int top = 0;
    long long best = 0;
    for (int i = 0; i <= n; i++) {
        while (top > 0 && h[stack[top - 1]] > h[i]) {
            long long height = h[stack[--top]];
            int left = top > 0 ? stack[top - 1] : -1;
            long long area = height * (i - left - 1);
            if (area > best) best = area;
        }
        stack[top++] = i;
    }
    printf("%lld\\n", best);
    return 0;
}
`,
  "dsa-simplify-path": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <ctype.h>

static char *read_raw(void) {
    size_t cap = 1 << 16, len = 0;
    char *b = malloc(cap); size_t r;
    while ((r = fread(b + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; b = realloc(b, cap); }
    }
    b = realloc(b, len + 1); b[len] = '\\0';
    size_t s = 0;
    while (s < len && isspace((unsigned char)b[s])) s++;
    while (len > s && isspace((unsigned char)b[len - 1])) len--;
    b[len] = '\\0';
    memmove(b, b + s, len - s + 1);
    return b;
}

int main(void) {
    char *path = read_raw();
    /* split on '/', pushing component pointers onto a stack */
    char **stack = malloc(sizeof(char *) * (strlen(path) + 2));
    int top = 0;
    char *p = path;
    while (*p) {
        while (*p == '/') p++;
        if (!*p) break;
        char *st = p;
        while (*p && *p != '/') p++;
        if (*p) *p++ = '\\0';
        if (!strcmp(st, ".")) continue;
        if (!strcmp(st, "..")) { if (top > 0) top--; }
        else stack[top++] = st;
    }
    for (int i = 0; i < top; i++) printf("/%s", stack[i]);
    if (top == 0) printf("/");
    printf("\\n");
    return 0;
}
`,
  "dsa-decode-string": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <ctype.h>

static char *read_raw(void) {
    size_t cap = 1 << 16, len = 0;
    char *b = malloc(cap); size_t r;
    while ((r = fread(b + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; b = realloc(b, cap); }
    }
    b = realloc(b, len + 1); b[len] = '\\0';
    size_t s = 0;
    while (s < len && isspace((unsigned char)b[s])) s++;
    while (len > s && isspace((unsigned char)b[len - 1])) len--;
    b[len] = '\\0';
    memmove(b, b + s, len - s + 1);
    return b;
}

typedef struct { char *s; size_t len, cap; } Str;
static void str_init(Str *x) { x->cap = 16; x->len = 0; x->s = malloc(x->cap); x->s[0] = '\\0'; }
static void str_reserve(Str *x, size_t extra) {
    if (x->len + extra + 1 > x->cap) {
        while (x->len + extra + 1 > x->cap) x->cap *= 2;
        x->s = realloc(x->s, x->cap);
    }
}
static void str_addc(Str *x, char c) {
    str_reserve(x, 1);
    x->s[x->len++] = c;
    x->s[x->len] = '\\0';
}
static void str_addn(Str *x, const char *s, size_t n) {
    str_reserve(x, n);
    memcpy(x->s + x->len, s, n);
    x->len += n;
    x->s[x->len] = '\\0';
}

int main(void) {
    char *s = read_raw();
    size_t n = strlen(s);
    Str cur; str_init(&cur);
    /* stack of (previous string, repeat count) */
    Str *prevs = malloc(sizeof(Str) * (n + 1));
    int *ks = malloc(sizeof(int) * (n + 1));
    int top = 0, num = 0;
    for (size_t i = 0; i < n; i++) {
        char c = s[i];
        if (isdigit((unsigned char)c)) num = num * 10 + (c - '0');
        else if (c == '[') {
            prevs[top] = cur;
            ks[top] = num;
            top++;
            str_init(&cur);
            num = 0;
        } else if (c == ']') {
            top--;
            Str prev = prevs[top];
            int k = ks[top];
            for (int r = 0; r < k; r++) str_addn(&prev, cur.s, cur.len);
            free(cur.s);
            cur = prev;
        } else {
            str_addc(&cur, c);
        }
    }
    printf("%s\\n", cur.s);
    return 0;
}
`,
  "dsa-remove-duplicate-letters": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <ctype.h>

static char *read_raw(void) {
    size_t cap = 1 << 16, len = 0;
    char *b = malloc(cap); size_t r;
    while ((r = fread(b + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; b = realloc(b, cap); }
    }
    b = realloc(b, len + 1); b[len] = '\\0';
    size_t s = 0;
    while (s < len && isspace((unsigned char)b[s])) s++;
    while (len > s && isspace((unsigned char)b[len - 1])) len--;
    b[len] = '\\0';
    memmove(b, b + s, len - s + 1);
    return b;
}

int main(void) {
    char *s = read_raw();
    int remaining[256] = {0};
    for (const unsigned char *p = (const unsigned char *)s; *p; p++) remaining[*p]++;
    char *stack = malloc(strlen(s) + 1);
    int top = 0;
    bool in_stack[256] = {0};
    for (size_t i = 0; s[i]; i++) {
        unsigned char c = (unsigned char)s[i];
        remaining[c]--;
        if (in_stack[c]) continue;
        while (top > 0 && (unsigned char)stack[top - 1] > c &&
               remaining[(unsigned char)stack[top - 1]] > 0) {
            in_stack[(unsigned char)stack[top - 1]] = false;
            top--;
        }
        stack[top++] = (char)c;
        in_stack[c] = true;
    }
    stack[top] = '\\0';
    printf("%s\\n", stack);
    return 0;
}
`,
  "dsa-asteroid-collision": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long *stack = malloc(sizeof(long long) * (n > 0 ? n : 1));
    int top = 0;
    for (int i = 0; i < n; i++) {
        long long a = next_ll();
        bool alive = true;
        while (alive && a < 0 && top > 0 && stack[top - 1] > 0) {
            if (stack[top - 1] < -a) top--;
            else if (stack[top - 1] == -a) { top--; alive = false; }
            else alive = false;
        }
        if (alive) stack[top++] = a;
    }
    for (int i = 0; i < top; i++) { if (i) printf(" "); printf("%lld", stack[i]); }
    printf("\\n");
    return 0;
}
`,
  "dsa-rotting-oranges": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int r = (int)next_ll(), c = (int)next_ll();
    int m = r, n = c;
    int *grid = malloc(sizeof(int) * (m * n > 0 ? m * n : 1));
    for (int i = 0; i < m * n; i++) grid[i] = (int)next_ll();
    int *qi = malloc(sizeof(int) * (m * n > 0 ? m * n : 1));
    int *qj = malloc(sizeof(int) * (m * n > 0 ? m * n : 1));
    int *qt = malloc(sizeof(int) * (m * n > 0 ? m * n : 1));
    int qh = 0, qt2 = 0, fresh = 0, minutes = 0;
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (grid[i * n + j] == 2) { qi[qt2] = i; qj[qt2] = j; qt[qt2] = 0; qt2++; }
            else if (grid[i * n + j] == 1) fresh++;
        }
    }
    static const int di[4] = {1, -1, 0, 0};
    static const int dj[4] = {0, 0, 1, -1};
    while (qh < qt2) {
        int i = qi[qh], j = qj[qh], t = qt[qh];
        qh++;
        if (t > minutes) minutes = t;
        for (int d = 0; d < 4; d++) {
            int ni = i + di[d], nj = j + dj[d];
            if (ni >= 0 && ni < m && nj >= 0 && nj < n && grid[ni * n + nj] == 1) {
                grid[ni * n + nj] = 2;
                fresh--;
                qi[qt2] = ni; qj[qt2] = nj; qt[qt2] = t + 1; qt2++;
            }
        }
    }
    printf("%d\\n", fresh == 0 ? minutes : -1);
    return 0;
}
`,
  "dsa-design-circular-queue": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <ctype.h>

static char *g_buf; static char **g_lines; static int g_nlines;
static char *trim(char *s) {
    while (*s && isspace((unsigned char)*s)) s++;
    size_t n = strlen(s);
    while (n && isspace((unsigned char)s[n - 1])) s[--n] = '\\0';
    return s;
}
static void read_lines(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_lines = malloc(sizeof(char *) * (len + 2));
    size_t st = 0;
    for (size_t i = 0; i <= len; i++) {
        if (i == len || g_buf[i] == '\\n') {
            if (i == len && st == len) break;
            g_buf[i] = '\\0';
            g_lines[g_nlines++] = trim(g_buf + st);
            st = i + 1;
        }
    }
}

int main(void) {
    read_lines();
    /* drop empty lines, as the Python starter does */
    char **ops = malloc(sizeof(char *) * (g_nlines > 0 ? g_nlines : 1));
    int nops = 0;
    for (int i = 0; i < g_nlines; i++) {
        if (g_lines[i][0] != '\\0') ops[nops++] = g_lines[i];
    }
    if (nops == 0) { printf("\\n"); return 0; }
    int k = atoi(ops[0]);
    if (k <= 0) { printf("\\n"); return 0; }
    int *q = calloc((size_t)k, sizeof(int));
    int head = 0, size = 0;
    for (int oi = 1; oi < nops; oi++) {
        char cmd[32];
        int val = 0;
        sscanf(ops[oi], "%31s %d", cmd, &val);
        if (!strcmp(cmd, "enQueue")) {
            if (size == k) printf("false\\n");
            else {
                q[(head + size) % k] = val;
                size++;
                printf("true\\n");
            }
        } else if (!strcmp(cmd, "deQueue")) {
            if (size == 0) printf("false\\n");
            else {
                head = (head + 1) % k;
                size--;
                printf("true\\n");
            }
        } else if (!strcmp(cmd, "Front")) {
            printf("%d\\n", size ? q[head] : -1);
        } else if (!strcmp(cmd, "Rear")) {
            printf("%d\\n", size ? q[(head + size - 1) % k] : -1);
        } else if (!strcmp(cmd, "isEmpty")) {
            printf("%s\\n", size == 0 ? "true" : "false");
        } else if (!strcmp(cmd, "isFull")) {
            printf("%s\\n", size == k ? "true" : "false");
        }
    }
    return 0;
}
`,
  "dsa-reveal-cards-in-increasing-order": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }
static int cmp_ll(const void *a, const void *b) {
    long long x = *(const long long *)a, y = *(const long long *)b;
    return (x > y) - (x < y);
}

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long *deck = malloc(sizeof(long long) * (n > 0 ? n : 1));
    for (int i = 0; i < n; i++) deck[i] = next_ll();
    qsort(deck, (size_t)n, sizeof(long long), cmp_ll);
    /* queue of positions 0..n-1 */
    int *qq = malloc(sizeof(int) * (n > 0 ? n : 1));
    int qh = 0, qt = 0;
    for (int i = 0; i < n; i++) qq[qt++] = i;
    long long *out = calloc((size_t)(n > 0 ? n : 1), sizeof(long long));
    /* simulate with a simple array queue: pop front, then move next front to back */
    int *buf = malloc(sizeof(int) * (2 * n + 2 > 0 ? 2 * n + 2 : 2));
    int bh = 0, bt = 0;
    for (int i = 0; i < n; i++) buf[bt++] = i;
    (void)qq; (void)qh; (void)qt;
    for (int vi = 0; vi < n; vi++) {
        int idx = buf[bh++];
        out[idx] = deck[vi];
        if (bh < bt) {
            buf[bt++] = buf[bh++];
        }
    }
    for (int i = 0; i < n; i++) { if (i) printf(" "); printf("%lld", out[i]); }
    printf("\\n");
    return 0;
}
`,
  "dsa-time-needed-to-buy-tickets": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long *tickets = malloc(sizeof(long long) * (n > 0 ? n : 1));
    for (int i = 0; i < n; i++) tickets[i] = next_ll();
    int k = (int)next_ll();
    long long total = 0;
    for (int i = 0; i < n; i++) {
        if (i <= k) total += tickets[i] < tickets[k] ? tickets[i] : tickets[k];
        else {
            long long lim = tickets[k] - 1;
            total += tickets[i] < lim ? tickets[i] : lim;
        }
    }
    printf("%lld\\n", total);
    return 0;
}
`,
  "dsa-dota2-senate": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <ctype.h>

static char *read_raw(void) {
    size_t cap = 1 << 16, len = 0;
    char *b = malloc(cap); size_t r;
    while ((r = fread(b + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; b = realloc(b, cap); }
    }
    b = realloc(b, len + 1); b[len] = '\\0';
    size_t s = 0;
    while (s < len && isspace((unsigned char)b[s])) s++;
    while (len > s && isspace((unsigned char)b[len - 1])) len--;
    b[len] = '\\0';
    memmove(b, b + s, len - s + 1);
    return b;
}

/* simple growable int queue */
typedef struct { int *a; size_t head, tail, cap; } Queue;
static void q_init(Queue *q, size_t cap) {
    q->cap = cap > 0 ? cap : 4;
    q->a = malloc(sizeof(int) * q->cap);
    q->head = q->tail = 0;
}
static int q_empty(Queue *q) { return q->head == q->tail; }
static void q_push(Queue *q, int v) {
    if (q->tail == q->cap) {
        if (q->head > 0) {
            memmove(q->a, q->a + q->head, (q->tail - q->head) * sizeof(int));
            q->tail -= q->head;
            q->head = 0;
        } else {
            q->cap *= 2;
            q->a = realloc(q->a, sizeof(int) * q->cap);
        }
    }
    q->a[q->tail++] = v;
}
static int q_pop(Queue *q) { return q->a[q->head++]; }

int main(void) {
    char *senate = read_raw();
    int n = (int)strlen(senate);
    Queue radiant, dire;
    q_init(&radiant, (size_t)n + 1);
    q_init(&dire, (size_t)n + 1);
    for (int i = 0; i < n; i++) {
        if (senate[i] == 'R') q_push(&radiant, i);
        else q_push(&dire, i);
    }
    while (!q_empty(&radiant) && !q_empty(&dire)) {
        int r = q_pop(&radiant);
        int d = q_pop(&dire);
        if (r < d) q_push(&radiant, r + n);
        else q_push(&dire, d + n);
    }
    printf("%s\\n", !q_empty(&radiant) ? "Radiant" : "Dire");
    return 0;
}
`,
  "dsa-number-of-students-unable-to-eat-lunch": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long *students = malloc(sizeof(long long) * (n > 0 ? n : 1));
    for (int i = 0; i < n; i++) students[i] = next_ll();
    int m = (int)next_ll();
    long long *sandwiches = malloc(sizeof(long long) * (m > 0 ? m : 1));
    for (int i = 0; i < m; i++) sandwiches[i] = next_ll();
    long long counts[2] = {0, 0};
    for (int i = 0; i < n; i++) {
        if (students[i] == 0 || students[i] == 1) counts[students[i]]++;
    }
    /* queue of students; rotate the front to the back until it matches */
    int cap = 4 * n + 4 * m + 16;
    long long *q = malloc(sizeof(long long) * (size_t)cap);
    int qh = 0, qt = 0;
    for (int i = 0; i < n; i++) q[qt++] = students[i];
    for (int si = 0; si < m; si++) {
        long long s = sandwiches[si];
        if (s < 0 || s > 1 || counts[s] == 0) break;
        while (qt > qh && q[qh] != s) {
            long long v = q[qh++];
            if (qt == cap) { cap *= 2; q = realloc(q, sizeof(long long) * (size_t)cap); }
            q[qt++] = v;
        }
        if (qt > qh) { qh++; counts[s]--; }
    }
    printf("%d\\n", qt - qh);
    return 0;
}
`,
  "dsa-reverse-linked-list": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

typedef struct ListNode { long long val; struct ListNode *next; } ListNode;
static ListNode *ln_new(long long v) {
    ListNode *nd = malloc(sizeof(ListNode));
    nd->val = v; nd->next = NULL;
    return nd;
}
static ListNode *build_list(long long *a, int n) {
    ListNode *h = NULL, **t = &h;
    for (int i = 0; i < n; i++) { *t = ln_new(a[i]); t = &(*t)->next; }
    return h;
}
static void print_list(ListNode *h) {
    int first = 1;
    for (ListNode *c = h; c; c = c->next) {
        if (!first) printf(" ");
        printf("%lld", c->val);
        first = 0;
    }
    printf("\\n");
}

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long *vals = malloc(sizeof(long long) * (n > 0 ? n : 1));
    for (int i = 0; i < n; i++) vals[i] = next_ll();
    ListNode *head = build_list(vals, n);
    ListNode *prev = NULL, *cur = head;
    while (cur) {
        ListNode *nxt = cur->next;
        cur->next = prev;
        prev = cur;
        cur = nxt;
    }
    print_list(prev);
    return 0;
}
`,
  "dsa-merge-two-sorted-lists": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

typedef struct ListNode { long long val; struct ListNode *next; } ListNode;
static ListNode *ln_new(long long v) {
    ListNode *nd = malloc(sizeof(ListNode));
    nd->val = v; nd->next = NULL;
    return nd;
}
static ListNode *build_list(long long *a, int n) {
    ListNode *h = NULL, **t = &h;
    for (int i = 0; i < n; i++) { *t = ln_new(a[i]); t = &(*t)->next; }
    return h;
}
static void print_list(ListNode *h) {
    int first = 1;
    for (ListNode *c = h; c; c = c->next) {
        if (!first) printf(" ");
        printf("%lld", c->val);
        first = 0;
    }
    printf("\\n");
}

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long *a = malloc(sizeof(long long) * (n > 0 ? n : 1));
    for (int i = 0; i < n; i++) a[i] = next_ll();
    int m = (int)next_ll();
    long long *b = malloc(sizeof(long long) * (m > 0 ? m : 1));
    for (int i = 0; i < m; i++) b[i] = next_ll();
    ListNode *h1 = build_list(a, n), *h2 = build_list(b, m);
    ListNode dummy;
    dummy.val = 0; dummy.next = NULL;
    ListNode *tail = &dummy;
    while (h1 && h2) {
        if (h1->val <= h2->val) { tail->next = h1; h1 = h1->next; }
        else { tail->next = h2; h2 = h2->next; }
        tail = tail->next;
    }
    tail->next = h1 ? h1 : h2;
    print_list(dummy.next);
    return 0;
}
`,
  "dsa-linked-list-cycle": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}

typedef struct ListNode { long long val; struct ListNode *next; } ListNode;
static ListNode *ln_new(long long v) {
    ListNode *nd = malloc(sizeof(ListNode));
    nd->val = v; nd->next = NULL;
    return nd;
}
static ListNode *build_list(long long *a, int n) {
    ListNode *h = NULL, **t = &h;
    for (int i = 0; i < n; i++) { *t = ln_new(a[i]); t = &(*t)->next; }
    return h;
}

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    /* keep all tokens: pos is the LAST token, n is the first */
    int total = g_ntok;
    long long *all = malloc(sizeof(long long) * (size_t)total);
    for (int i = 0; i < total; i++) all[i] = strtoll(g_tok[i], NULL, 10);
    long long pos = all[total - 1];
    int n = (int)all[0];
    ListNode *head = build_list(all + 1, n);
    bool cycle = false;
    if (pos >= 0 && head) {
        ListNode *tail = head;
        while (tail->next) tail = tail->next;
        ListNode *target = head;
        for (long long i = 0; i < pos && target; i++) target = target->next;
        if (target) {
            tail->next = target;
            ListNode *slow = head, *fast = head;
            while (fast && fast->next) {
                slow = slow->next;
                fast = fast->next->next;
                if (slow == fast) { cycle = true; break; }
            }
        }
    }
    printf("%s\\n", cycle ? "true" : "false");
    return 0;
}
`,
  "dsa-remove-nth-node-from-end": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}

typedef struct ListNode { long long val; struct ListNode *next; } ListNode;
static ListNode *ln_new(long long v) {
    ListNode *nd = malloc(sizeof(ListNode));
    nd->val = v; nd->next = NULL;
    return nd;
}
static ListNode *build_list(long long *a, int n) {
    ListNode *h = NULL, **t = &h;
    for (int i = 0; i < n; i++) { *t = ln_new(a[i]); t = &(*t)->next; }
    return h;
}
static void print_list(ListNode *h) {
    int first = 1;
    for (ListNode *c = h; c; c = c->next) {
        if (!first) printf(" ");
        printf("%lld", c->val);
        first = 0;
    }
    printf("\\n");
}

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int total = g_ntok;
    long long *all = malloc(sizeof(long long) * (size_t)total);
    for (int i = 0; i < total; i++) all[i] = strtoll(g_tok[i], NULL, 10);
    long long k = all[total - 1];
    int n = (int)all[0];
    ListNode *head = build_list(all + 1, n);
    ListNode dummy;
    dummy.val = 0; dummy.next = head;
    ListNode *fast = &dummy, *slow = &dummy;
    for (long long i = 0; i < k + 1 && fast; i++) fast = fast->next;
    while (fast) { fast = fast->next; slow = slow->next; }
    if (slow->next) slow->next = slow->next->next;
    print_list(dummy.next);
    return 0;
}
`,
  "dsa-middle-of-linked-list": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

typedef struct ListNode { long long val; struct ListNode *next; } ListNode;
static ListNode *ln_new(long long v) {
    ListNode *nd = malloc(sizeof(ListNode));
    nd->val = v; nd->next = NULL;
    return nd;
}
static ListNode *build_list(long long *a, int n) {
    ListNode *h = NULL, **t = &h;
    for (int i = 0; i < n; i++) { *t = ln_new(a[i]); t = &(*t)->next; }
    return h;
}

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long *vals = malloc(sizeof(long long) * (n > 0 ? n : 1));
    for (int i = 0; i < n; i++) vals[i] = next_ll();
    ListNode *head = build_list(vals, n);
    if (!head) { printf("\\n"); return 0; } /* Python would crash; no test has this */
    ListNode *slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    printf("%lld\\n", slow->val);
    return 0;
}
`,
  "dsa-palindrome-linked-list": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

typedef struct ListNode { long long val; struct ListNode *next; } ListNode;
static ListNode *ln_new(long long v) {
    ListNode *nd = malloc(sizeof(ListNode));
    nd->val = v; nd->next = NULL;
    return nd;
}
static ListNode *build_list(long long *a, int n) {
    ListNode *h = NULL, **t = &h;
    for (int i = 0; i < n; i++) { *t = ln_new(a[i]); t = &(*t)->next; }
    return h;
}

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long *vals = malloc(sizeof(long long) * (n > 0 ? n : 1));
    for (int i = 0; i < n; i++) vals[i] = next_ll();
    ListNode *head = build_list(vals, n);
    long long *arr = malloc(sizeof(long long) * (n > 0 ? n : 1));
    int m = 0;
    for (ListNode *c = head; c; c = c->next) arr[m++] = c->val;
    bool ok = true;
    for (int i = 0; i < m / 2; i++) {
        if (arr[i] != arr[m - 1 - i]) { ok = false; break; }
    }
    printf("%s\\n", ok ? "true" : "false");
    return 0;
}
`,
  "dsa-add-two-numbers": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

typedef struct ListNode { long long val; struct ListNode *next; } ListNode;
static ListNode *ln_new(long long v) {
    ListNode *nd = malloc(sizeof(ListNode));
    nd->val = v; nd->next = NULL;
    return nd;
}
static ListNode *build_list(long long *a, int n) {
    ListNode *h = NULL, **t = &h;
    for (int i = 0; i < n; i++) { *t = ln_new(a[i]); t = &(*t)->next; }
    return h;
}
static void print_list(ListNode *h) {
    int first = 1;
    for (ListNode *c = h; c; c = c->next) {
        if (!first) printf(" ");
        printf("%lld", c->val);
        first = 0;
    }
    printf("\\n");
}

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long *a = malloc(sizeof(long long) * (n > 0 ? n : 1));
    for (int i = 0; i < n; i++) a[i] = next_ll();
    int m = (int)next_ll();
    long long *b = malloc(sizeof(long long) * (m > 0 ? m : 1));
    for (int i = 0; i < m; i++) b[i] = next_ll();
    ListNode *h1 = build_list(a, n), *h2 = build_list(b, m);
    ListNode dummy;
    dummy.val = 0; dummy.next = NULL;
    ListNode *tail = &dummy;
    long long carry = 0;
    while (h1 || h2 || carry) {
        long long v1 = h1 ? h1->val : 0;
        long long v2 = h2 ? h2->val : 0;
        long long total = v1 + v2 + carry;
        carry = total / 10;
        tail->next = ln_new(total % 10);
        tail = tail->next;
        h1 = h1 ? h1->next : NULL;
        h2 = h2 ? h2->next : NULL;
    }
    print_list(dummy.next);
    return 0;
}
`,
  "dsa-intersection-of-two-linked-lists": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

typedef struct ListNode { long long val; struct ListNode *next; } ListNode;
static ListNode *ln_new(long long v) {
    ListNode *nd = malloc(sizeof(ListNode));
    nd->val = v; nd->next = NULL;
    return nd;
}
static ListNode *build_list(long long *a, int n) {
    ListNode *h = NULL, **t = &h;
    for (int i = 0; i < n; i++) { *t = ln_new(a[i]); t = &(*t)->next; }
    return h;
}

/* NOTE: the Python starter compares VALUES, not node identity: it returns
   the first value of the second list that also appears in the first. */
typedef struct { long long key; int used; } SetEnt;
static unsigned long long lhash(long long x) {
    unsigned long long z = (unsigned long long)x + 0x9e3779b97f4a7c15ULL;
    z = (z ^ (z >> 30)) * 0xbf58476d1ce4e5b9ULL;
    z = (z ^ (z >> 27)) * 0x94d049bb133111ebULL;
    return z ^ (z >> 31);
}

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long *a = malloc(sizeof(long long) * (n > 0 ? n : 1));
    for (int i = 0; i < n; i++) a[i] = next_ll();
    int m = (int)next_ll();
    long long *b = malloc(sizeof(long long) * (m > 0 ? m : 1));
    for (int i = 0; i < m; i++) b[i] = next_ll();
    ListNode *h1 = build_list(a, n), *h2 = build_list(b, m);
    int cap = 16; while (cap < n * 4) cap *= 2;
    SetEnt *set = calloc((size_t)cap, sizeof(SetEnt));
    for (ListNode *c = h1; c; c = c->next) {
        int idx = (int)(lhash(c->val) & (unsigned long long)(cap - 1));
        while (set[idx].used && set[idx].key != c->val) idx = (idx + 1) & (cap - 1);
        set[idx].key = c->val; set[idx].used = 1;
    }
    long long ans = -1;
    for (ListNode *c = h2; c; c = c->next) {
        int idx = (int)(lhash(c->val) & (unsigned long long)(cap - 1));
        while (set[idx].used && set[idx].key != c->val) idx = (idx + 1) & (cap - 1);
        if (set[idx].used) { ans = c->val; break; }
    }
    printf("%lld\\n", ans);
    return 0;
}
`,
  "dsa-remove-duplicates-from-sorted-list": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

typedef struct ListNode { long long val; struct ListNode *next; } ListNode;
static ListNode *ln_new(long long v) {
    ListNode *nd = malloc(sizeof(ListNode));
    nd->val = v; nd->next = NULL;
    return nd;
}
static ListNode *build_list(long long *a, int n) {
    ListNode *h = NULL, **t = &h;
    for (int i = 0; i < n; i++) { *t = ln_new(a[i]); t = &(*t)->next; }
    return h;
}
static void print_list(ListNode *h) {
    int first = 1;
    for (ListNode *c = h; c; c = c->next) {
        if (!first) printf(" ");
        printf("%lld", c->val);
        first = 0;
    }
    printf("\\n");
}

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long *vals = malloc(sizeof(long long) * (n > 0 ? n : 1));
    for (int i = 0; i < n; i++) vals[i] = next_ll();
    ListNode *head = build_list(vals, n);
    ListNode *cur = head;
    while (cur && cur->next) {
        if (cur->val == cur->next->val) cur->next = cur->next->next;
        else cur = cur->next;
    }
    print_list(head);
    return 0;
}
`,
  "dsa-reorder-list": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

typedef struct ListNode { long long val; struct ListNode *next; } ListNode;
static ListNode *ln_new(long long v) {
    ListNode *nd = malloc(sizeof(ListNode));
    nd->val = v; nd->next = NULL;
    return nd;
}
static ListNode *build_list(long long *a, int n) {
    ListNode *h = NULL, **t = &h;
    for (int i = 0; i < n; i++) { *t = ln_new(a[i]); t = &(*t)->next; }
    return h;
}
static void print_list(ListNode *h) {
    int first = 1;
    for (ListNode *c = h; c; c = c->next) {
        if (!first) printf(" ");
        printf("%lld", c->val);
        first = 0;
    }
    printf("\\n");
}

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long *vals = malloc(sizeof(long long) * (n > 0 ? n : 1));
    for (int i = 0; i < n; i++) vals[i] = next_ll();
    ListNode *head = build_list(vals, n);
    if (head && head->next) {
        ListNode *slow = head, *fast = head;
        while (fast->next && fast->next->next) {
            slow = slow->next;
            fast = fast->next->next;
        }
        ListNode *second = slow->next;
        slow->next = NULL;
        ListNode *prev = NULL;
        while (second) {
            ListNode *nxt = second->next;
            second->next = prev;
            prev = second;
            second = nxt;
        }
        ListNode *first = head;
        second = prev;
        while (second) {
            ListNode *tmp1 = first->next;
            ListNode *tmp2 = second->next;
            first->next = second;
            second->next = tmp1;
            first = tmp1;
            second = tmp2;
        }
    }
    print_list(head);
    return 0;
}
`,
  "dsa-swap-nodes-in-pairs": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

typedef struct ListNode { long long val; struct ListNode *next; } ListNode;
static ListNode *ln_new(long long v) {
    ListNode *nd = malloc(sizeof(ListNode));
    nd->val = v; nd->next = NULL;
    return nd;
}
static ListNode *build_list(long long *a, int n) {
    ListNode *h = NULL, **t = &h;
    for (int i = 0; i < n; i++) { *t = ln_new(a[i]); t = &(*t)->next; }
    return h;
}
static void print_list(ListNode *h) {
    int first = 1;
    for (ListNode *c = h; c; c = c->next) {
        if (!first) printf(" ");
        printf("%lld", c->val);
        first = 0;
    }
    printf("\\n");
}

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long *vals = malloc(sizeof(long long) * (n > 0 ? n : 1));
    for (int i = 0; i < n; i++) vals[i] = next_ll();
    ListNode *head = build_list(vals, n);
    ListNode dummy;
    dummy.val = 0; dummy.next = head;
    ListNode *prev = &dummy;
    while (prev->next && prev->next->next) {
        ListNode *a = prev->next;
        ListNode *b = a->next;
        a->next = b->next;
        b->next = a;
        prev->next = b;
        prev = a;
    }
    print_list(dummy.next);
    return 0;
}
`,
  "dsa-odd-even-linked-list": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

typedef struct ListNode { long long val; struct ListNode *next; } ListNode;
static ListNode *ln_new(long long v) {
    ListNode *nd = malloc(sizeof(ListNode));
    nd->val = v; nd->next = NULL;
    return nd;
}
static ListNode *build_list(long long *a, int n) {
    ListNode *h = NULL, **t = &h;
    for (int i = 0; i < n; i++) { *t = ln_new(a[i]); t = &(*t)->next; }
    return h;
}
static void print_list(ListNode *h) {
    int first = 1;
    for (ListNode *c = h; c; c = c->next) {
        if (!first) printf(" ");
        printf("%lld", c->val);
        first = 0;
    }
    printf("\\n");
}

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long *vals = malloc(sizeof(long long) * (n > 0 ? n : 1));
    for (int i = 0; i < n; i++) vals[i] = next_ll();
    ListNode *head = build_list(vals, n);
    if (head && head->next) {
        ListNode *odd = head, *even = head->next, *even_head = even;
        while (even && even->next) {
            odd->next = even->next;
            odd = odd->next;
            even->next = odd->next;
            even = even->next;
        }
        odd->next = even_head;
    }
    print_list(head);
    return 0;
}
`,
  "dsa-binary-search": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long *nums = malloc(sizeof(long long) * (n > 0 ? n : 1));
    for (int i = 0; i < n; i++) nums[i] = next_ll();
    long long target = next_ll();
    int left = 0, right = n - 1, ans = -1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) { ans = mid; break; }
        if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    printf("%d\\n", ans);
    return 0;
}
`,
  "dsa-search-insert-position": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long *nums = malloc(sizeof(long long) * (n > 0 ? n : 1));
    for (int i = 0; i < n; i++) nums[i] = next_ll();
    long long target = next_ll();
    int left = 0, right = n;
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] < target) left = mid + 1;
        else right = mid;
    }
    printf("%d\\n", left);
    return 0;
}
`,
  "dsa-find-first-and-last-position": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

static long long *g_nums;
static int g_n;
static long long g_target;

/* bound(first): first lower bound of target, else upper bound */
static int bound(int first) {
    int left = 0, right = g_n;
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (g_nums[mid] > g_target || (first && g_nums[mid] == g_target)) right = mid;
        else left = mid + 1;
    }
    return left;
}

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    g_n = (int)next_ll();
    g_nums = malloc(sizeof(long long) * (g_n > 0 ? g_n : 1));
    for (int i = 0; i < g_n; i++) g_nums[i] = next_ll();
    g_target = next_ll();
    int lo = bound(1);
    if (lo == g_n || g_nums[lo] != g_target) {
        printf("-1 -1\\n");
        return 0;
    }
    printf("%d %d\\n", lo, bound(0) - 1);
    return 0;
}
`,
  "dsa-search-in-rotated-sorted-array": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long *nums = malloc(sizeof(long long) * (n > 0 ? n : 1));
    for (int i = 0; i < n; i++) nums[i] = next_ll();
    long long target = next_ll();
    int left = 0, right = n - 1, ans = -1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) { ans = mid; break; }
        if (nums[left] <= nums[mid]) {
            if (nums[left] <= target && target < nums[mid]) right = mid - 1;
            else left = mid + 1;
        } else {
            if (nums[mid] < target && target <= nums[right]) left = mid + 1;
            else right = mid - 1;
        }
    }
    printf("%d\\n", ans);
    return 0;
}
`,
  "dsa-find-minimum-in-rotated-sorted-array": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long *nums = malloc(sizeof(long long) * (n > 0 ? n : 1));
    for (int i = 0; i < n; i++) nums[i] = next_ll();
    int left = 0, right = n - 1;
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] > nums[right]) left = mid + 1;
        else right = mid;
    }
    printf("%lld\\n", n > 0 ? nums[left] : 0);
    return 0;
}
`,
  "dsa-peak-element": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long *nums = malloc(sizeof(long long) * (n > 0 ? n : 1));
    for (int i = 0; i < n; i++) nums[i] = next_ll();
    int left = 0, right = n - 1;
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] > nums[mid + 1]) right = mid;
        else left = mid + 1;
    }
    printf("%d\\n", left);
    return 0;
}
`,
  "dsa-sqrt-x": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    long long x = next_ll();
    if (x < 2) { printf("%lld\\n", x); return 0; }
    long long left = 1, right = x / 2, ans = 1;
    while (left <= right) {
        long long mid = left + (right - left) / 2;
        long long sq = mid * mid;
        if (sq == x) { printf("%lld\\n", mid); return 0; }
        if (sq < x) { ans = mid; left = mid + 1; }
        else right = mid - 1;
    }
    printf("%lld\\n", ans);
    return 0;
}
`,
  "dsa-koko-eating-bananas": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long *piles = malloc(sizeof(long long) * (n > 0 ? n : 1));
    long long mx = 0;
    for (int i = 0; i < n; i++) { piles[i] = next_ll(); if (piles[i] > mx) mx = piles[i]; }
    long long h = next_ll();
    long long left = 1, right = mx;
    while (left < right) {
        long long mid = left + (right - left) / 2;
        long long hours = 0;
        for (int i = 0; i < n; i++) hours += (piles[i] + mid - 1) / mid;
        if (hours <= h) right = mid;
        else left = mid + 1;
    }
    printf("%lld\\n", left);
    return 0;
}
`,
  "dsa-capacity-to-ship-packages": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

static long long *g_w;
static int g_n;
static long long g_days;

static int can(long long cap) {
    long long used = 1, load = 0;
    for (int i = 0; i < g_n; i++) {
        if (load + g_w[i] > cap) { used++; load = g_w[i]; }
        else load += g_w[i];
    }
    return used <= g_days;
}

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    g_n = (int)next_ll();
    g_w = malloc(sizeof(long long) * (g_n > 0 ? g_n : 1));
    long long mx = 0, sum = 0;
    for (int i = 0; i < g_n; i++) {
        g_w[i] = next_ll();
        if (g_w[i] > mx) mx = g_w[i];
        sum += g_w[i];
    }
    g_days = next_ll();
    long long left = mx, right = sum;
    while (left < right) {
        long long mid = left + (right - left) / 2;
        if (can(mid)) right = mid;
        else left = mid + 1;
    }
    printf("%lld\\n", left);
    return 0;
}
`,
  "dsa-single-element-in-sorted-array": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long *nums = malloc(sizeof(long long) * (n > 0 ? n : 1));
    for (int i = 0; i < n; i++) nums[i] = next_ll();
    int left = 0, right = n - 1;
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (mid % 2 == 1) mid -= 1;
        if (nums[mid] == nums[mid + 1]) left = mid + 2;
        else right = mid;
    }
    printf("%lld\\n", nums[left]);
    return 0;
}
`,
  "dsa-maximum-depth-of-binary-tree": `#define _POSIX_C_SOURCE 200809L
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}

typedef struct TreeNode { long long val; struct TreeNode *left, *right; } TreeNode;
static TreeNode *tn_new(long long v) {
    TreeNode *nd = malloc(sizeof(TreeNode));
    nd->val = v; nd->left = nd->right = NULL;
    return nd;
}
/* level-order build, 'null' tokens for missing children, as in the Python starter */
static TreeNode *build_tree(char **tok, int n) {
    if (n == 0 || !strcmp(tok[0], "null")) return NULL;
    TreeNode *root = tn_new(strtoll(tok[0], NULL, 10));
    TreeNode **q = malloc(sizeof(TreeNode *) * (n + 2));
    int qh = 0, qt = 0;
    q[qt++] = root;
    int i = 1;
    while (qh < qt && i < n) {
        TreeNode *node = q[qh++];
        if (i < n && strcmp(tok[i], "null")) { node->left = tn_new(strtoll(tok[i], NULL, 10)); q[qt++] = node->left; }
        i++;
        if (i < n && strcmp(tok[i], "null")) { node->right = tn_new(strtoll(tok[i], NULL, 10)); q[qt++] = node->right; }
        i++;
    }
    free(q);
    return root;
}

static int depth(TreeNode *root) {
    if (!root) return 0;
    int l = depth(root->left), r = depth(root->right);
    return 1 + (l > r ? l : r);
}

int main(void) {
    read_tokens();
    TreeNode *root = build_tree(g_tok, g_ntok);
    printf("%d\\n", depth(root));
    return 0;
}
`,
  "dsa-invert-binary-tree": `#define _POSIX_C_SOURCE 200809L
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}

typedef struct TreeNode { long long val; struct TreeNode *left, *right; } TreeNode;
static TreeNode *tn_new(long long v) {
    TreeNode *nd = malloc(sizeof(TreeNode));
    nd->val = v; nd->left = nd->right = NULL;
    return nd;
}
static TreeNode *build_tree(char **tok, int n) {
    if (n == 0 || !strcmp(tok[0], "null")) return NULL;
    TreeNode *root = tn_new(strtoll(tok[0], NULL, 10));
    TreeNode **q = malloc(sizeof(TreeNode *) * (n + 2));
    int qh = 0, qt = 0;
    q[qt++] = root;
    int i = 1;
    while (qh < qt && i < n) {
        TreeNode *node = q[qh++];
        if (i < n && strcmp(tok[i], "null")) { node->left = tn_new(strtoll(tok[i], NULL, 10)); q[qt++] = node->left; }
        i++;
        if (i < n && strcmp(tok[i], "null")) { node->right = tn_new(strtoll(tok[i], NULL, 10)); q[qt++] = node->right; }
        i++;
    }
    free(q);
    return root;
}
/* level-order print with 'null' tokens, trailing 'null's trimmed (fmt) */
static void print_tree(TreeNode *root) {
    if (!root) { printf("\\n"); return; }
    int cap = 64, qt = 0, qh = 0;
    TreeNode **q = malloc(sizeof(TreeNode *) * (size_t)cap);
    char **out = malloc(sizeof(char *) * (size_t)cap);
    int sz = 0;
    q[qt++] = root;
    while (qh < qt) {
        if (sz == cap || qt + 2 >= cap) {
            cap *= 2;
            q = realloc(q, sizeof(TreeNode *) * (size_t)cap);
            out = realloc(out, sizeof(char *) * (size_t)cap);
        }
        TreeNode *node = q[qh++];
        if (!node) {
            out[sz++] = strdup("null");
        } else {
            char b[32];
            snprintf(b, sizeof b, "%lld", node->val);
            out[sz++] = strdup(b);
            q[qt++] = node->left;
            q[qt++] = node->right;
        }
    }
    while (sz > 0 && !strcmp(out[sz - 1], "null")) sz--;
    for (int i = 0; i < sz; i++) { if (i) printf(" "); printf("%s", out[i]); }
    printf("\\n");
}

static TreeNode *invert(TreeNode *root) {
    if (!root) return NULL;
    TreeNode *l = invert(root->left);
    TreeNode *r = invert(root->right);
    root->left = r;
    root->right = l;
    return root;
}

int main(void) {
    read_tokens();
    TreeNode *root = build_tree(g_tok, g_ntok);
    print_tree(invert(root));
    return 0;
}
`,
  "dsa-same-tree": `#define _POSIX_C_SOURCE 200809L
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

typedef struct TreeNode { long long val; struct TreeNode *left, *right; } TreeNode;
static TreeNode *tn_new(long long v) {
    TreeNode *nd = malloc(sizeof(TreeNode));
    nd->val = v; nd->left = nd->right = NULL;
    return nd;
}
static TreeNode *build_tree(char **tok, int n) {
    if (n == 0 || !strcmp(tok[0], "null")) return NULL;
    TreeNode *root = tn_new(strtoll(tok[0], NULL, 10));
    TreeNode **q = malloc(sizeof(TreeNode *) * (n + 2));
    int qh = 0, qt = 0;
    q[qt++] = root;
    int i = 1;
    while (qh < qt && i < n) {
        TreeNode *node = q[qh++];
        if (i < n && strcmp(tok[i], "null")) { node->left = tn_new(strtoll(tok[i], NULL, 10)); q[qt++] = node->left; }
        i++;
        if (i < n && strcmp(tok[i], "null")) { node->right = tn_new(strtoll(tok[i], NULL, 10)); q[qt++] = node->right; }
        i++;
    }
    free(q);
    return root;
}

static int same(TreeNode *a, TreeNode *b) {
    if (!a && !b) return 1;
    if (!a || !b) return 0;
    return a->val == b->val && same(a->left, b->left) && same(a->right, b->right);
}

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n1 = (int)next_ll();
    char **t1 = malloc(sizeof(char *) * (n1 > 0 ? n1 : 1));
    for (int i = 0; i < n1; i++) t1[i] = g_pos < g_ntok ? g_tok[g_pos++] : "";
    int n2 = (int)next_ll();
    char **t2 = malloc(sizeof(char *) * (n2 > 0 ? n2 : 1));
    for (int i = 0; i < n2; i++) t2[i] = g_pos < g_ntok ? g_tok[g_pos++] : "";
    TreeNode *r1 = build_tree(t1, n1);
    TreeNode *r2 = build_tree(t2, n2);
    printf("%s\\n", same(r1, r2) ? "true" : "false");
    return 0;
}
`,
  "dsa-symmetric-tree": `#define _POSIX_C_SOURCE 200809L
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}

typedef struct TreeNode { long long val; struct TreeNode *left, *right; } TreeNode;
static TreeNode *tn_new(long long v) {
    TreeNode *nd = malloc(sizeof(TreeNode));
    nd->val = v; nd->left = nd->right = NULL;
    return nd;
}
static TreeNode *build_tree(char **tok, int n) {
    if (n == 0 || !strcmp(tok[0], "null")) return NULL;
    TreeNode *root = tn_new(strtoll(tok[0], NULL, 10));
    TreeNode **q = malloc(sizeof(TreeNode *) * (n + 2));
    int qh = 0, qt = 0;
    q[qt++] = root;
    int i = 1;
    while (qh < qt && i < n) {
        TreeNode *node = q[qh++];
        if (i < n && strcmp(tok[i], "null")) { node->left = tn_new(strtoll(tok[i], NULL, 10)); q[qt++] = node->left; }
        i++;
        if (i < n && strcmp(tok[i], "null")) { node->right = tn_new(strtoll(tok[i], NULL, 10)); q[qt++] = node->right; }
        i++;
    }
    free(q);
    return root;
}

static int mirror(TreeNode *a, TreeNode *b) {
    if (!a && !b) return 1;
    if (!a || !b) return 0;
    return a->val == b->val && mirror(a->left, b->right) && mirror(a->right, b->left);
}

int main(void) {
    read_tokens();
    TreeNode *root = build_tree(g_tok, g_ntok);
    int ok = 1;
    if (root) ok = mirror(root->left, root->right);
    printf("%s\\n", ok ? "true" : "false");
    return 0;
}
`,
  "dsa-binary-tree-level-order-traversal": `#define _POSIX_C_SOURCE 200809L
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}

typedef struct TreeNode { long long val; struct TreeNode *left, *right; } TreeNode;
static TreeNode *tn_new(long long v) {
    TreeNode *nd = malloc(sizeof(TreeNode));
    nd->val = v; nd->left = nd->right = NULL;
    return nd;
}
static TreeNode *build_tree(char **tok, int n) {
    if (n == 0 || !strcmp(tok[0], "null")) return NULL;
    TreeNode *root = tn_new(strtoll(tok[0], NULL, 10));
    TreeNode **q = malloc(sizeof(TreeNode *) * (n + 2));
    int qh = 0, qt = 0;
    q[qt++] = root;
    int i = 1;
    while (qh < qt && i < n) {
        TreeNode *node = q[qh++];
        if (i < n && strcmp(tok[i], "null")) { node->left = tn_new(strtoll(tok[i], NULL, 10)); q[qt++] = node->left; }
        i++;
        if (i < n && strcmp(tok[i], "null")) { node->right = tn_new(strtoll(tok[i], NULL, 10)); q[qt++] = node->right; }
        i++;
    }
    free(q);
    return root;
}

int main(void) {
    read_tokens();
    TreeNode *root = build_tree(g_tok, g_ntok);
    if (!root) { printf("\\n"); return 0; }
    int cap = 64, qh = 0, qt = 0;
    TreeNode **q = malloc(sizeof(TreeNode *) * (size_t)cap);
    q[qt++] = root;
    while (qh < qt) {
        int level_size = qt - qh;
        for (int i = 0; i < level_size; i++) {
            TreeNode *node = q[qh++];
            if (i) printf(" ");
            printf("%lld", node->val);
            if (qt + 2 >= cap) {
                cap *= 2;
                q = realloc(q, sizeof(TreeNode *) * (size_t)cap);
            }
            if (node->left) q[qt++] = node->left;
            if (node->right) q[qt++] = node->right;
        }
        printf("\\n");
    }
    return 0;
}
`,
  "dsa-validate-binary-search-tree": `#define _POSIX_C_SOURCE 200809L
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}

typedef struct TreeNode { long long val; struct TreeNode *left, *right; } TreeNode;
static TreeNode *tn_new(long long v) {
    TreeNode *nd = malloc(sizeof(TreeNode));
    nd->val = v; nd->left = nd->right = NULL;
    return nd;
}
static TreeNode *build_tree(char **tok, int n) {
    if (n == 0 || !strcmp(tok[0], "null")) return NULL;
    TreeNode *root = tn_new(strtoll(tok[0], NULL, 10));
    TreeNode **q = malloc(sizeof(TreeNode *) * (n + 2));
    int qh = 0, qt = 0;
    q[qt++] = root;
    int i = 1;
    while (qh < qt && i < n) {
        TreeNode *node = q[qh++];
        if (i < n && strcmp(tok[i], "null")) { node->left = tn_new(strtoll(tok[i], NULL, 10)); q[qt++] = node->left; }
        i++;
        if (i < n && strcmp(tok[i], "null")) { node->right = tn_new(strtoll(tok[i], NULL, 10)); q[qt++] = node->right; }
        i++;
    }
    free(q);
    return root;
}

/* bounds are -inf/+inf in Python; has_low/has_high track that here */
static int valid(TreeNode *node, long long low, long long high, int has_low, int has_high) {
    if (!node) return 1;
    if ((has_low && node->val <= low) || (has_high && node->val >= high)) return 0;
    return valid(node->left, low, node->val, has_low, 1) &&
           valid(node->right, node->val, high, 1, has_high);
}

int main(void) {
    read_tokens();
    TreeNode *root = build_tree(g_tok, g_ntok);
    printf("%s\\n", valid(root, 0, 0, 0, 0) ? "true" : "false");
    return 0;
}
`,
  "dsa-lowest-common-ancestor": `#define _POSIX_C_SOURCE 200809L
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}

typedef struct TreeNode { long long val; struct TreeNode *left, *right; } TreeNode;
static TreeNode *tn_new(long long v) {
    TreeNode *nd = malloc(sizeof(TreeNode));
    nd->val = v; nd->left = nd->right = NULL;
    return nd;
}
static TreeNode *build_tree(char **tok, int n) {
    if (n == 0 || !strcmp(tok[0], "null")) return NULL;
    TreeNode *root = tn_new(strtoll(tok[0], NULL, 10));
    TreeNode **q = malloc(sizeof(TreeNode *) * (n + 2));
    int qh = 0, qt = 0;
    q[qt++] = root;
    int i = 1;
    while (qh < qt && i < n) {
        TreeNode *node = q[qh++];
        if (i < n && strcmp(tok[i], "null")) { node->left = tn_new(strtoll(tok[i], NULL, 10)); q[qt++] = node->left; }
        i++;
        if (i < n && strcmp(tok[i], "null")) { node->right = tn_new(strtoll(tok[i], NULL, 10)); q[qt++] = node->right; }
        i++;
    }
    free(q);
    return root;
}

/* Faithful to the Python starter, including its -1 "not found" sentinel:
   a subtree that does not contain p or q reports -1. */
static long long lca(TreeNode *root, long long p, long long q) {
    if (!root) return -1;
    if (root->val == p || root->val == q) return root->val;
    long long left = -1, right = -1;
    int has_left = 0, has_right = 0;
    if (root->left) {
        long long lv = lca(root->left, p, q);
        if (lv != -1) { left = lv; has_left = 1; }
    }
    if (root->right) {
        long long rv = lca(root->right, p, q);
        if (rv != -1) { right = rv; has_right = 1; }
    }
    if (has_left && has_right) return root->val;
    if (has_left) return left;
    if (has_right) return right;
    return -1;
}

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    long long p = strtoll(g_tok[g_ntok - 2], NULL, 10);
    long long q = strtoll(g_tok[g_ntok - 1], NULL, 10);
    TreeNode *root = build_tree(g_tok, g_ntok - 2);
    printf("%lld\\n", lca(root, p, q));
    return 0;
}
`,
  "dsa-diameter-of-binary-tree": `#define _POSIX_C_SOURCE 200809L
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}

typedef struct TreeNode { long long val; struct TreeNode *left, *right; } TreeNode;
static TreeNode *tn_new(long long v) {
    TreeNode *nd = malloc(sizeof(TreeNode));
    nd->val = v; nd->left = nd->right = NULL;
    return nd;
}
static TreeNode *build_tree(char **tok, int n) {
    if (n == 0 || !strcmp(tok[0], "null")) return NULL;
    TreeNode *root = tn_new(strtoll(tok[0], NULL, 10));
    TreeNode **q = malloc(sizeof(TreeNode *) * (n + 2));
    int qh = 0, qt = 0;
    q[qt++] = root;
    int i = 1;
    while (qh < qt && i < n) {
        TreeNode *node = q[qh++];
        if (i < n && strcmp(tok[i], "null")) { node->left = tn_new(strtoll(tok[i], NULL, 10)); q[qt++] = node->left; }
        i++;
        if (i < n && strcmp(tok[i], "null")) { node->right = tn_new(strtoll(tok[i], NULL, 10)); q[qt++] = node->right; }
        i++;
    }
    free(q);
    return root;
}

static int g_best;
static int depth(TreeNode *node) {
    if (!node) return 0;
    int l = depth(node->left), r = depth(node->right);
    if (l + r > g_best) g_best = l + r;
    return 1 + (l > r ? l : r);
}

int main(void) {
    read_tokens();
    TreeNode *root = build_tree(g_tok, g_ntok);
    g_best = 0;
    depth(root);
    printf("%d\\n", g_best);
    return 0;
}
`,
  "dsa-path-sum": `#define _POSIX_C_SOURCE 200809L
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}

typedef struct TreeNode { long long val; struct TreeNode *left, *right; } TreeNode;
static TreeNode *tn_new(long long v) {
    TreeNode *nd = malloc(sizeof(TreeNode));
    nd->val = v; nd->left = nd->right = NULL;
    return nd;
}
static TreeNode *build_tree(char **tok, int n) {
    if (n == 0 || !strcmp(tok[0], "null")) return NULL;
    TreeNode *root = tn_new(strtoll(tok[0], NULL, 10));
    TreeNode **q = malloc(sizeof(TreeNode *) * (n + 2));
    int qh = 0, qt = 0;
    q[qt++] = root;
    int i = 1;
    while (qh < qt && i < n) {
        TreeNode *node = q[qh++];
        if (i < n && strcmp(tok[i], "null")) { node->left = tn_new(strtoll(tok[i], NULL, 10)); q[qt++] = node->left; }
        i++;
        if (i < n && strcmp(tok[i], "null")) { node->right = tn_new(strtoll(tok[i], NULL, 10)); q[qt++] = node->right; }
        i++;
    }
    free(q);
    return root;
}

static int has_path(TreeNode *root, long long target) {
    if (!root) return 0;
    if (!root->left && !root->right) return root->val == target;
    return has_path(root->left, target - root->val) ||
           has_path(root->right, target - root->val);
}

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    long long target = strtoll(g_tok[g_ntok - 1], NULL, 10);
    TreeNode *root = build_tree(g_tok, g_ntok - 1);
    printf("%s\\n", has_path(root, target) ? "true" : "false");
    return 0;
}
`,
  "dsa-kth-smallest-in-bst": `#define _POSIX_C_SOURCE 200809L
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}

typedef struct TreeNode { long long val; struct TreeNode *left, *right; } TreeNode;
static TreeNode *tn_new(long long v) {
    TreeNode *nd = malloc(sizeof(TreeNode));
    nd->val = v; nd->left = nd->right = NULL;
    return nd;
}
static TreeNode *build_tree(char **tok, int n) {
    if (n == 0 || !strcmp(tok[0], "null")) return NULL;
    TreeNode *root = tn_new(strtoll(tok[0], NULL, 10));
    TreeNode **q = malloc(sizeof(TreeNode *) * (n + 2));
    int qh = 0, qt = 0;
    q[qt++] = root;
    int i = 1;
    while (qh < qt && i < n) {
        TreeNode *node = q[qh++];
        if (i < n && strcmp(tok[i], "null")) { node->left = tn_new(strtoll(tok[i], NULL, 10)); q[qt++] = node->left; }
        i++;
        if (i < n && strcmp(tok[i], "null")) { node->right = tn_new(strtoll(tok[i], NULL, 10)); q[qt++] = node->right; }
        i++;
    }
    free(q);
    return root;
}

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    long long k = strtoll(g_tok[g_ntok - 1], NULL, 10);
    TreeNode *root = build_tree(g_tok, g_ntok - 1);
    /* iterative inorder traversal */
    int cap = 64, top = 0;
    TreeNode **stack = malloc(sizeof(TreeNode *) * (size_t)cap);
    TreeNode *cur = root;
    long long ans = -1;
    while (top > 0 || cur) {
        while (cur) {
            if (top == cap) { cap *= 2; stack = realloc(stack, sizeof(TreeNode *) * (size_t)cap); }
            stack[top++] = cur;
            cur = cur->left;
        }
        cur = stack[--top];
        if (--k == 0) { ans = cur->val; break; }
        cur = cur->right;
    }
    printf("%lld\\n", ans);
    return 0;
}
`,
  "dsa-binary-tree-right-side-view": `#define _POSIX_C_SOURCE 200809L
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}

typedef struct TreeNode { long long val; struct TreeNode *left, *right; } TreeNode;
static TreeNode *tn_new(long long v) {
    TreeNode *nd = malloc(sizeof(TreeNode));
    nd->val = v; nd->left = nd->right = NULL;
    return nd;
}
static TreeNode *build_tree(char **tok, int n) {
    if (n == 0 || !strcmp(tok[0], "null")) return NULL;
    TreeNode *root = tn_new(strtoll(tok[0], NULL, 10));
    TreeNode **q = malloc(sizeof(TreeNode *) * (n + 2));
    int qh = 0, qt = 0;
    q[qt++] = root;
    int i = 1;
    while (qh < qt && i < n) {
        TreeNode *node = q[qh++];
        if (i < n && strcmp(tok[i], "null")) { node->left = tn_new(strtoll(tok[i], NULL, 10)); q[qt++] = node->left; }
        i++;
        if (i < n && strcmp(tok[i], "null")) { node->right = tn_new(strtoll(tok[i], NULL, 10)); q[qt++] = node->right; }
        i++;
    }
    free(q);
    return root;
}

int main(void) {
    read_tokens();
    TreeNode *root = build_tree(g_tok, g_ntok);
    if (!root) { printf("\\n"); return 0; }
    int cap = 64, qh = 0, qt = 0;
    TreeNode **q = malloc(sizeof(TreeNode *) * (size_t)cap);
    q[qt++] = root;
    int first = 1;
    while (qh < qt) {
        int level_size = qt - qh;
        TreeNode *last = NULL;
        for (int i = 0; i < level_size; i++) {
            TreeNode *node = q[qh++];
            last = node;
            if (qt + 2 >= cap) {
                cap *= 2;
                q = realloc(q, sizeof(TreeNode *) * (size_t)cap);
            }
            if (node->left) q[qt++] = node->left;
            if (node->right) q[qt++] = node->right;
        }
        if (!first) printf(" ");
        printf("%lld", last->val);
        first = 0;
    }
    printf("\\n");
    return 0;
}
`,
  "dsa-construct-binary-tree-from-preorder-inorder": `#define _POSIX_C_SOURCE 200809L
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

typedef struct TreeNode { long long val; struct TreeNode *left, *right; } TreeNode;
static TreeNode *tn_new(long long v) {
    TreeNode *nd = malloc(sizeof(TreeNode));
    nd->val = v; nd->left = nd->right = NULL;
    return nd;
}
static void print_tree(TreeNode *root) {
    if (!root) { printf("\\n"); return; }
    int cap = 64, qt = 0, qh = 0;
    TreeNode **q = malloc(sizeof(TreeNode *) * (size_t)cap);
    char **out = malloc(sizeof(char *) * (size_t)cap);
    int sz = 0;
    q[qt++] = root;
    while (qh < qt) {
        if (sz == cap || qt + 2 >= cap) {
            cap *= 2;
            q = realloc(q, sizeof(TreeNode *) * (size_t)cap);
            out = realloc(out, sizeof(char *) * (size_t)cap);
        }
        TreeNode *node = q[qh++];
        if (!node) {
            out[sz++] = strdup("null");
        } else {
            char b[32];
            snprintf(b, sizeof b, "%lld", node->val);
            out[sz++] = strdup(b);
            q[qt++] = node->left;
            q[qt++] = node->right;
        }
    }
    while (sz > 0 && !strcmp(out[sz - 1], "null")) sz--;
    for (int i = 0; i < sz; i++) { if (i) printf(" "); printf("%s", out[i]); }
    printf("\\n");
}

typedef struct { long long val; int idx; } ValIdx;
static int cmp_vi(const void *a, const void *b) {
    long long x = ((const ValIdx *)a)->val, y = ((const ValIdx *)b)->val;
    return (x > y) - (x < y);
}
static long long *g_pre;
static ValIdx *g_pos_sorted;
static int g_npos, g_pre_idx;

static int find_pos(long long v) {
    int lo = 0, hi = g_npos - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (g_pos_sorted[mid].val == v) return g_pos_sorted[mid].idx;
        if (g_pos_sorted[mid].val < v) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}
static TreeNode *build(int lo, int hi) {
    if (lo > hi) return NULL;
    long long val = g_pre[g_pre_idx++];
    TreeNode *node = tn_new(val);
    int mid = find_pos(val);
    node->left = build(lo, mid - 1);
    node->right = build(mid + 1, hi);
    return node;
}

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    g_pre = malloc(sizeof(long long) * (n > 0 ? n : 1));
    for (int i = 0; i < n; i++) g_pre[i] = next_ll();
    int m = (int)next_ll();
    long long *inorder = malloc(sizeof(long long) * (m > 0 ? m : 1));
    for (int i = 0; i < m; i++) inorder[i] = next_ll();
    g_npos = m;
    g_pos_sorted = malloc(sizeof(ValIdx) * (m > 0 ? m : 1));
    for (int i = 0; i < m; i++) { g_pos_sorted[i].val = inorder[i]; g_pos_sorted[i].idx = i; }
    qsort(g_pos_sorted, (size_t)m, sizeof(ValIdx), cmp_vi);
    g_pre_idx = 0;
    TreeNode *root = build(0, m - 1);
    print_tree(root);
    return 0;
}
`,
  "dsa-sum-of-left-leaves": `#define _POSIX_C_SOURCE 200809L
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}

typedef struct TreeNode { long long val; struct TreeNode *left, *right; } TreeNode;
static TreeNode *tn_new(long long v) {
    TreeNode *nd = malloc(sizeof(TreeNode));
    nd->val = v; nd->left = nd->right = NULL;
    return nd;
}
static TreeNode *build_tree(char **tok, int n) {
    if (n == 0 || !strcmp(tok[0], "null")) return NULL;
    TreeNode *root = tn_new(strtoll(tok[0], NULL, 10));
    TreeNode **q = malloc(sizeof(TreeNode *) * (n + 2));
    int qh = 0, qt = 0;
    q[qt++] = root;
    int i = 1;
    while (qh < qt && i < n) {
        TreeNode *node = q[qh++];
        if (i < n && strcmp(tok[i], "null")) { node->left = tn_new(strtoll(tok[i], NULL, 10)); q[qt++] = node->left; }
        i++;
        if (i < n && strcmp(tok[i], "null")) { node->right = tn_new(strtoll(tok[i], NULL, 10)); q[qt++] = node->right; }
        i++;
    }
    free(q);
    return root;
}

static long long sum_left(TreeNode *root) {
    if (!root) return 0;
    long long total = 0;
    if (root->left && !root->left->left && !root->left->right) total += root->left->val;
    return total + sum_left(root->left) + sum_left(root->right);
}

int main(void) {
    read_tokens();
    TreeNode *root = build_tree(g_tok, g_ntok);
    printf("%lld\\n", sum_left(root));
    return 0;
}
`,
  "dsa-binary-tree-maximum-path-sum": `#define _POSIX_C_SOURCE 200809L
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}

typedef struct TreeNode { long long val; struct TreeNode *left, *right; } TreeNode;
static TreeNode *tn_new(long long v) {
    TreeNode *nd = malloc(sizeof(TreeNode));
    nd->val = v; nd->left = nd->right = NULL;
    return nd;
}
static TreeNode *build_tree(char **tok, int n) {
    if (n == 0 || !strcmp(tok[0], "null")) return NULL;
    TreeNode *root = tn_new(strtoll(tok[0], NULL, 10));
    TreeNode **q = malloc(sizeof(TreeNode *) * (n + 2));
    int qh = 0, qt = 0;
    q[qt++] = root;
    int i = 1;
    while (qh < qt && i < n) {
        TreeNode *node = q[qh++];
        if (i < n && strcmp(tok[i], "null")) { node->left = tn_new(strtoll(tok[i], NULL, 10)); q[qt++] = node->left; }
        i++;
        if (i < n && strcmp(tok[i], "null")) { node->right = tn_new(strtoll(tok[i], NULL, 10)); q[qt++] = node->right; }
        i++;
    }
    free(q);
    return root;
}

static long long g_best;
static long long gain(TreeNode *node) {
    if (!node) return 0;
    long long l = gain(node->left);
    long long r = gain(node->right);
    if (l < 0) l = 0;
    if (r < 0) r = 0;
    long long through = node->val + l + r;
    if (through > g_best) g_best = through;
    return node->val + (l > r ? l : r);
}

int main(void) {
    read_tokens();
    TreeNode *root = build_tree(g_tok, g_ntok);
    if (!root) { printf("-inf\\n"); return 0; } /* Python fmt(float('-inf')) */
    g_best = LLONG_MIN;
    gain(root);
    printf("%lld\\n", g_best);
    return 0;
}
`,
  "dsa-number-of-islands": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <ctype.h>

static char *g_buf; static char **g_lines; static int g_nlines;
static char *trim(char *s) {
    while (*s && isspace((unsigned char)*s)) s++;
    size_t n = strlen(s);
    while (n && isspace((unsigned char)s[n - 1])) s[--n] = '\\0';
    return s;
}
static void read_lines(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_lines = malloc(sizeof(char *) * (len + 2));
    size_t st = 0;
    for (size_t i = 0; i <= len; i++) {
        if (i == len || g_buf[i] == '\\n') {
            if (i == len && st == len) break;
            g_buf[i] = '\\0';
            g_lines[g_nlines++] = trim(g_buf + st);
            st = i + 1;
        }
    }
}
static const char *line_at(int i) { return i < g_nlines ? g_lines[i] : ""; }

static int g_m, g_n;
static char *g_grid;

static void dfs(int i, int j) {
    if (i < 0 || i >= g_m || j < 0 || j >= g_n || g_grid[i * g_n + j] != '1') return;
    g_grid[i * g_n + j] = '0';
    dfs(i + 1, j);
    dfs(i - 1, j);
    dfs(i, j + 1);
    dfs(i, j - 1);
}

int main(void) {
    read_lines();
    if (g_nlines == 0) { printf("0\\n"); return 0; }
    sscanf(g_lines[0], "%d %d", &g_m, &g_n);
    g_grid = malloc(sizeof(char) * (g_m * g_n > 0 ? g_m * g_n : 1));
    for (int i = 0; i < g_m; i++) {
        const char *line = line_at(1 + i);
        int j = 0;
        for (const char *p = line; *p && j < g_n; p++) {
            if (*p == ' ') continue;
            g_grid[i * g_n + j++] = *p;
        }
        while (j < g_n) g_grid[i * g_n + j++] = '0';
    }
    int count = 0;
    for (int i = 0; i < g_m; i++) {
        for (int j = 0; j < g_n; j++) {
            if (g_grid[i * g_n + j] == '1') { count++; dfs(i, j); }
        }
    }
    printf("%d\\n", count);
    return 0;
}
`,
  "dsa-flood-fill": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

static int g_m, g_n;
static long long *g_grid;
static long long g_old, g_color;

static void dfs(int i, int j) {
    if (i < 0 || i >= g_m || j < 0 || j >= g_n || g_grid[i * g_n + j] != g_old) return;
    g_grid[i * g_n + j] = g_color;
    dfs(i + 1, j);
    dfs(i - 1, j);
    dfs(i, j + 1);
    dfs(i, j - 1);
}

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    g_m = (int)next_ll();
    g_n = (int)next_ll();
    g_grid = malloc(sizeof(long long) * (g_m * g_n > 0 ? g_m * g_n : 1));
    for (int i = 0; i < g_m * g_n; i++) g_grid[i] = next_ll();
    int sr = (int)next_ll(), sc = (int)next_ll();
    g_color = next_ll();
    if (g_m > 0 && g_n > 0) {
        g_old = g_grid[sr * g_n + sc];
        if (g_old != g_color) dfs(sr, sc);
    }
    for (int i = 0; i < g_m; i++) {
        for (int j = 0; j < g_n; j++) {
            if (j) printf(" ");
            printf("%lld", g_grid[i * g_n + j]);
        }
        printf("\\n");
    }
    return 0;
}
`,
  "dsa-course-schedule": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    int m = (int)next_ll();
    /* adjacency lists graph[b] = [a...], indegree of a */
    int **adj = calloc((size_t)(n > 0 ? n : 1), sizeof(int *));
    int *asz = calloc((size_t)(n > 0 ? n : 1), sizeof(int));
    int *acap = calloc((size_t)(n > 0 ? n : 1), sizeof(int));
    int *indeg = calloc((size_t)(n > 0 ? n : 1), sizeof(int));
    for (int e = 0; e < m; e++) {
        int a = (int)next_ll(), b = (int)next_ll();
        if (b < 0 || b >= n || a < 0 || a >= n) continue;
        if (asz[b] == acap[b]) { acap[b] = acap[b] ? acap[b] * 2 : 4; adj[b] = realloc(adj[b], sizeof(int) * (size_t)acap[b]); }
        adj[b][asz[b]++] = a;
        indeg[a]++;
    }
    int *q = malloc(sizeof(int) * (n > 0 ? n : 1));
    int qh = 0, qt = 0, done = 0;
    for (int i = 0; i < n; i++) if (indeg[i] == 0) q[qt++] = i;
    while (qh < qt) {
        int u = q[qh++];
        done++;
        for (int i = 0; i < asz[u]; i++) {
            int v = adj[u][i];
            if (--indeg[v] == 0) q[qt++] = v;
        }
    }
    printf("%s\\n", done == n ? "true" : "false");
    return 0;
}
`,
  "dsa-course-schedule-ii": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    int m = (int)next_ll();
    int **adj = calloc((size_t)(n > 0 ? n : 1), sizeof(int *));
    int *asz = calloc((size_t)(n > 0 ? n : 1), sizeof(int));
    int *acap = calloc((size_t)(n > 0 ? n : 1), sizeof(int));
    int *indeg = calloc((size_t)(n > 0 ? n : 1), sizeof(int));
    for (int e = 0; e < m; e++) {
        int a = (int)next_ll(), b = (int)next_ll();
        if (b < 0 || b >= n || a < 0 || a >= n) continue;
        if (asz[b] == acap[b]) { acap[b] = acap[b] ? acap[b] * 2 : 4; adj[b] = realloc(adj[b], sizeof(int) * (size_t)acap[b]); }
        adj[b][asz[b]++] = a;
        indeg[a]++;
    }
    int *q = malloc(sizeof(int) * (n > 0 ? n : 1));
    int qh = 0, qt = 0;
    for (int i = 0; i < n; i++) if (indeg[i] == 0) q[qt++] = i;
    int *order = malloc(sizeof(int) * (n > 0 ? n : 1));
    int no = 0;
    while (qh < qt) {
        int u = q[qh++];
        order[no++] = u;
        for (int i = 0; i < asz[u]; i++) {
            int v = adj[u][i];
            if (--indeg[v] == 0) q[qt++] = v;
        }
    }
    if (no != n) { printf("-1\\n"); return 0; }
    for (int i = 0; i < no; i++) { if (i) printf(" "); printf("%d", order[i]); }
    printf("\\n");
    return 0;
}
`,
  "dsa-pacific-atlantic-water-flow": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

static int g_m, g_n;
static long long *g_grid;

static void dfs(int i, int j, bool *seen) {
    seen[i * g_n + j] = true;
    static const int di[4] = {1, -1, 0, 0};
    static const int dj[4] = {0, 0, 1, -1};
    for (int d = 0; d < 4; d++) {
        int ni = i + di[d], nj = j + dj[d];
        if (ni >= 0 && ni < g_m && nj >= 0 && nj < g_n && !seen[ni * g_n + nj] &&
            g_grid[ni * g_n + nj] >= g_grid[i * g_n + j]) {
            dfs(ni, nj, seen);
        }
    }
}

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    g_m = (int)next_ll();
    g_n = (int)next_ll();
    g_grid = malloc(sizeof(long long) * (g_m * g_n > 0 ? g_m * g_n : 1));
    for (int i = 0; i < g_m * g_n; i++) g_grid[i] = next_ll();
    bool *pac = calloc((size_t)(g_m * g_n > 0 ? g_m * g_n : 1), sizeof(bool));
    bool *atl = calloc((size_t)(g_m * g_n > 0 ? g_m * g_n : 1), sizeof(bool));
    for (int i = 0; i < g_m; i++) { dfs(i, 0, pac); dfs(i, g_n - 1, atl); }
    for (int j = 0; j < g_n; j++) { dfs(0, j, pac); dfs(g_m - 1, j, atl); }
    int any = 0;
    for (int i = 0; i < g_m; i++) {
        for (int j = 0; j < g_n; j++) {
            if (pac[i * g_n + j] && atl[i * g_n + j]) {
                printf("%d %d\\n", i, j);
                any = 1;
            }
        }
    }
    if (!any) printf("\\n");
    return 0;
}
`,
  "dsa-number-of-provinces": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

static int g_n;
static long long *g_grid;
static bool *g_seen;

static void dfs(int i) {
    g_seen[i] = true;
    for (int j = 0; j < g_n; j++) {
        if (g_grid[i * g_n + j] == 1 && !g_seen[j]) dfs(j);
    }
}

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int r = (int)next_ll();
    int c = (int)next_ll();
    g_n = r;
    g_grid = malloc(sizeof(long long) * (r * c > 0 ? r * c : 1));
    for (int i = 0; i < r * c; i++) g_grid[i] = next_ll();
    g_seen = calloc((size_t)(g_n > 0 ? g_n : 1), sizeof(bool));
    int count = 0;
    for (int i = 0; i < g_n; i++) {
        if (!g_seen[i]) { count++; dfs(i); }
    }
    printf("%d\\n", count);
    return 0;
}
`,
  "dsa-word-ladder": `#define _POSIX_C_SOURCE 200809L
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <ctype.h>

static char *g_buf; static char **g_lines; static int g_nlines;
static char *trim(char *s) {
    while (*s && isspace((unsigned char)*s)) s++;
    size_t n = strlen(s);
    while (n && isspace((unsigned char)s[n - 1])) s[--n] = '\\0';
    return s;
}
static void read_lines(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_lines = malloc(sizeof(char *) * (len + 2));
    size_t st = 0;
    for (size_t i = 0; i <= len; i++) {
        if (i == len || g_buf[i] == '\\n') {
            if (i == len && st == len) break;
            g_buf[i] = '\\0';
            g_lines[g_nlines++] = trim(g_buf + st);
            st = i + 1;
        }
    }
}
static const char *line_at(int i) { return i < g_nlines ? g_lines[i] : ""; }

static int cmp_str(const void *a, const void *b) { return strcmp(*(char *const *)a, *(char *const *)b); }
static char **g_words;
static int g_nwords;
static int in_set(const char *w) {
    return bsearch(&w, g_words, (size_t)g_nwords, sizeof(char *), cmp_str) != NULL;
}

int main(void) {
    read_lines();
    const char *begin = line_at(0), *end = line_at(1);
    int n = g_nlines > 2 ? atoi(g_lines[2]) : 0;
    g_nwords = n;
    g_words = malloc(sizeof(char *) * (n > 0 ? n : 1));
    for (int i = 0; i < n; i++) g_words[i] = (char *)line_at(3 + i);
    qsort(g_words, (size_t)n, sizeof(char *), cmp_str);
    if (!in_set(end)) { printf("0\\n"); return 0; }
    /* BFS queue of (word, steps); seen list */
    int qcap = 64, qh = 0, qt = 0;
    char **qw = malloc(sizeof(char *) * (size_t)qcap);
    int *qs = malloc(sizeof(int) * (size_t)qcap);
    char **seen = malloc(sizeof(char *) * (size_t)qcap);
    int nseen = 0, seen_cap = qcap;
    qw[qt] = strdup(begin); qs[qt] = 1; qt++;
    seen[nseen++] = strdup(begin);
    int ans = 0;
    size_t wl = strlen(begin);
    char *cand = malloc(wl + 1);
    while (qh < qt) {
        char *word = qw[qh];
        int steps = qs[qh];
        qh++;
        if (!strcmp(word, end)) { ans = steps; break; }
        for (size_t i = 0; i < wl; i++) {
            char orig = word[i];
            for (char c = 'a'; c <= 'z'; c++) {
                if (c == orig) continue;
                strcpy(cand, word);
                cand[i] = c;
                if (!in_set(cand)) continue;
                int was_seen = 0;
                for (int s = 0; s < nseen; s++) if (!strcmp(seen[s], cand)) { was_seen = 1; break; }
                if (was_seen) continue;
                if (nseen == seen_cap) { seen_cap *= 2; seen = realloc(seen, sizeof(char *) * (size_t)seen_cap); }
                seen[nseen++] = strdup(cand);
                if (qt == qcap) {
                    qcap *= 2;
                    qw = realloc(qw, sizeof(char *) * (size_t)qcap);
                    qs = realloc(qs, sizeof(int) * (size_t)qcap);
                }
                qw[qt] = strdup(cand); qs[qt] = steps + 1; qt++;
            }
        }
    }
    printf("%d\\n", ans);
    return 0;
}
`,
  "dsa-keys-and-rooms": `#define _POSIX_C_SOURCE 200809L
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <ctype.h>

static char *g_buf; static char **g_lines; static int g_nlines;
static char *trim(char *s) {
    while (*s && isspace((unsigned char)*s)) s++;
    size_t n = strlen(s);
    while (n && isspace((unsigned char)s[n - 1])) s[--n] = '\\0';
    return s;
}
static void read_lines(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_lines = malloc(sizeof(char *) * (len + 2));
    size_t st = 0;
    for (size_t i = 0; i <= len; i++) {
        if (i == len || g_buf[i] == '\\n') {
            if (i == len && st == len) break;
            g_buf[i] = '\\0';
            g_lines[g_nlines++] = trim(g_buf + st);
            st = i + 1;
        }
    }
}
static const char *line_at(int i) { return i < g_nlines ? g_lines[i] : ""; }

/* parse space-separated ints from a line into out; returns count */
static int parse_lls(char *s, long long *out) {
    int n = 0;
    char *p = s;
    while (*p) {
        while (*p && isspace((unsigned char)*p)) p++;
        if (!*p) break;
        out[n++] = strtoll(p, &p, 10);
    }
    return n;
}

int main(void) {
    read_lines();
    if (g_nlines == 0) { printf("false\\n"); return 0; }
    int n = atoi(g_lines[0]);
    /* rooms[i]: array of keys */
    int **rooms = malloc(sizeof(int *) * (n > 0 ? n : 1));
    int *rsize = calloc((size_t)(n > 0 ? n : 1), sizeof(int));
    for (int i = 0; i < n; i++) {
        char *line = strdup(line_at(1 + i));
        long long *parts = malloc(sizeof(long long) * (strlen(line) / 2 + 2));
        int np = parse_lls(line, parts);
        int cnt = np > 0 ? (int)parts[0] : 0;
        if (cnt > np - 1) cnt = np - 1;
        if (cnt < 0) cnt = 0;
        rooms[i] = malloc(sizeof(int) * (cnt > 0 ? cnt : 1));
        for (int j = 0; j < cnt; j++) rooms[i][j] = (int)parts[1 + j];
        rsize[i] = cnt;
        free(parts);
        free(line);
    }
    bool *seen = calloc((size_t)(n > 0 ? n : 1), sizeof(bool));
    int *stack = malloc(sizeof(int) * (n > 0 ? n : 1));
    int top = 0, nseen = 0;
    if (n > 0) { seen[0] = true; nseen = 1; stack[top++] = 0; }
    while (top > 0) {
        int r = stack[--top];
        for (int i = 0; i < rsize[r]; i++) {
            int k = rooms[r][i];
            if (k >= 0 && k < n && !seen[k]) {
                seen[k] = true;
                nseen++;
                stack[top++] = k;
            }
        }
    }
    printf("%s\\n", nseen == n ? "true" : "false");
    return 0;
}
`,
  "dsa-shortest-path-in-binary-matrix": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <ctype.h>

static char *g_buf; static char **g_lines; static int g_nlines;
static char *trim(char *s) {
    while (*s && isspace((unsigned char)*s)) s++;
    size_t n = strlen(s);
    while (n && isspace((unsigned char)s[n - 1])) s[--n] = '\\0';
    return s;
}
static void read_lines(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_lines = malloc(sizeof(char *) * (len + 2));
    size_t st = 0;
    for (size_t i = 0; i <= len; i++) {
        if (i == len || g_buf[i] == '\\n') {
            if (i == len && st == len) break;
            g_buf[i] = '\\0';
            g_lines[g_nlines++] = trim(g_buf + st);
            st = i + 1;
        }
    }
}
static const char *line_at(int i) { return i < g_nlines ? g_lines[i] : ""; }

int main(void) {
    read_lines();
    if (g_nlines == 0) { printf("-1\\n"); return 0; }
    int r = 0, c = 0;
    sscanf(g_lines[0], "%d %d", &r, &c);
    int n = r; /* Python uses n = len(grid) for both dimensions */
    char *grid = malloc(sizeof(char) * (r * c > 0 ? r * c : 1));
    for (int i = 0; i < r; i++) {
        const char *line = line_at(1 + i);
        int j = 0;
        for (const char *p = line; *p && j < c; p++) {
            if (*p == ' ') continue;
            grid[i * c + j++] = *p;
        }
        while (j < c) grid[i * c + j++] = '0';
    }
    if (r == 0 || c == 0 || grid[0] == '1' || grid[(n - 1) * c + (n - 1)] == '1') {
        printf("-1\\n");
        return 0;
    }
    int *qi = malloc(sizeof(int) * (r * c > 0 ? r * c : 1));
    int *qj = malloc(sizeof(int) * (r * c > 0 ? r * c : 1));
    int *qd = malloc(sizeof(int) * (r * c > 0 ? r * c : 1));
    int qh = 0, qt = 0;
    qi[qt] = 0; qj[qt] = 0; qd[qt] = 1; qt++;
    grid[0] = '1';
    int ans = -1;
    while (qh < qt) {
        int i = qi[qh], j = qj[qh], d = qd[qh];
        qh++;
        if (i == n - 1 && j == n - 1) { ans = d; break; }
        for (int di = -1; di <= 1; di++) {
            for (int dj = -1; dj <= 1; dj++) {
                if (di == 0 && dj == 0) continue;
                int ni = i + di, nj = j + dj;
                if (ni >= 0 && ni < n && nj >= 0 && nj < n && grid[ni * c + nj] == '0') {
                    grid[ni * c + nj] = '1';
                    qi[qt] = ni; qj[qt] = nj; qd[qt] = d + 1; qt++;
                }
            }
        }
    }
    printf("%d\\n", ans);
    return 0;
}
`,
  "dsa-surrounded-regions": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <ctype.h>

static char *g_buf; static char **g_lines; static int g_nlines;
static char *trim(char *s) {
    while (*s && isspace((unsigned char)*s)) s++;
    size_t n = strlen(s);
    while (n && isspace((unsigned char)s[n - 1])) s[--n] = '\\0';
    return s;
}
static void read_lines(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_lines = malloc(sizeof(char *) * (len + 2));
    size_t st = 0;
    for (size_t i = 0; i <= len; i++) {
        if (i == len || g_buf[i] == '\\n') {
            if (i == len && st == len) break;
            g_buf[i] = '\\0';
            g_lines[g_nlines++] = trim(g_buf + st);
            st = i + 1;
        }
    }
}
static const char *line_at(int i) { return i < g_nlines ? g_lines[i] : ""; }

static int g_m, g_n;
static char *g_grid;

static void dfs(int i, int j) {
    if (i < 0 || i >= g_m || j < 0 || j >= g_n || g_grid[i * g_n + j] != 'O') return;
    g_grid[i * g_n + j] = 'S';
    dfs(i + 1, j);
    dfs(i - 1, j);
    dfs(i, j + 1);
    dfs(i, j - 1);
}

int main(void) {
    read_lines();
    if (g_nlines == 0) return 0;
    sscanf(g_lines[0], "%d %d", &g_m, &g_n);
    g_grid = malloc(sizeof(char) * (g_m * g_n > 0 ? g_m * g_n : 1));
    for (int i = 0; i < g_m; i++) {
        const char *line = line_at(1 + i);
        int j = 0;
        for (const char *p = line; *p && j < g_n; p++) {
            if (*p == ' ') continue;
            g_grid[i * g_n + j++] = *p;
        }
        while (j < g_n) g_grid[i * g_n + j++] = 'X';
    }
    for (int i = 0; i < g_m; i++) { dfs(i, 0); dfs(i, g_n - 1); }
    for (int j = 0; j < g_n; j++) { dfs(0, j); dfs(g_m - 1, j); }
    for (int i = 0; i < g_m; i++) {
        for (int j = 0; j < g_n; j++) {
            char v = g_grid[i * g_n + j];
            putchar(v == 'O' ? 'X' : v == 'S' ? 'O' : v);
        }
        printf("\\n");
    }
    return 0;
}
`,
  "dsa-graph-valid-tree": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

static int *g_parent;
static int find(int x) {
    while (g_parent[x] != x) {
        g_parent[x] = g_parent[g_parent[x]];
        x = g_parent[x];
    }
    return x;
}

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    int m = (int)next_ll();
    if (m != n - 1) { printf("false\\n"); return 0; }
    g_parent = malloc(sizeof(int) * (n > 0 ? n : 1));
    for (int i = 0; i < n; i++) g_parent[i] = i;
    bool ok = true;
    for (int e = 0; e < m && ok; e++) {
        int a = (int)next_ll(), b = (int)next_ll();
        int ra = find(a), rb = find(b);
        if (ra == rb) ok = false;
        else g_parent[ra] = rb;
    }
    printf("%s\\n", ok ? "true" : "false");
    return 0;
}
`,
  "dsa-cheapest-flights-within-k-stops": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    int m = (int)next_ll();
    long long *eu = malloc(sizeof(long long) * (m > 0 ? m : 1));
    long long *ev = malloc(sizeof(long long) * (m > 0 ? m : 1));
    long long *ew = malloc(sizeof(long long) * (m > 0 ? m : 1));
    for (int i = 0; i < m; i++) {
        eu[i] = next_ll(); ev[i] = next_ll(); ew[i] = next_ll();
    }
    int src = (int)next_ll(), dst = (int)next_ll(), k = (int)next_ll();
    const long long INF = LLONG_MAX / 4;
    long long *dist = malloc(sizeof(long long) * (n > 0 ? n : 1));
    long long *nxt = malloc(sizeof(long long) * (n > 0 ? n : 1));
    for (int i = 0; i < n; i++) dist[i] = INF;
    if (src >= 0 && src < n) dist[src] = 0;
    for (int round = 0; round < k + 1; round++) {
        memcpy(nxt, dist, sizeof(long long) * (size_t)n);
        for (int i = 0; i < m; i++) {
            int u = (int)eu[i], v = (int)ev[i];
            if (u >= 0 && u < n && v >= 0 && v < n && dist[u] != INF &&
                dist[u] + ew[i] < nxt[v]) {
                nxt[v] = dist[u] + ew[i];
            }
        }
        memcpy(dist, nxt, sizeof(long long) * (size_t)n);
    }
    long long ans = (dst >= 0 && dst < n) ? dist[dst] : INF;
    printf("%lld\\n", ans != INF ? ans : -1);
    return 0;
}
`,
  "dsa-climbing-stairs": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    long long n = next_ll();
    long long a = 1, b = 1;
    for (long long i = 0; i < n - 1; i++) {
        long long t = a + b;
        a = b;
        b = t;
    }
    printf("%lld\\n", b);
    return 0;
}
`,
  "dsa-house-robber": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long prev2 = 0, prev1 = 0;
    for (int i = 0; i < n; i++) {
        long long x = next_ll();
        long long nv = prev1 > prev2 + x ? prev1 : prev2 + x;
        prev2 = prev1;
        prev1 = nv;
    }
    printf("%lld\\n", prev1);
    return 0;
}
`,
  "dsa-house-robber-ii": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

static long long rob_range(long long *arr, int n) {
    long long prev2 = 0, prev1 = 0;
    for (int i = 0; i < n; i++) {
        long long nv = prev1 > prev2 + arr[i] ? prev1 : prev2 + arr[i];
        prev2 = prev1;
        prev1 = nv;
    }
    return prev1;
}

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long *nums = malloc(sizeof(long long) * (n > 0 ? n : 1));
    for (int i = 0; i < n; i++) nums[i] = next_ll();
    long long ans;
    if (n == 1) ans = nums[0];
    else {
        long long a = rob_range(nums, n - 1);
        long long b = rob_range(nums + 1, n - 1);
        ans = a > b ? a : b;
    }
    printf("%lld\\n", ans);
    return 0;
}
`,
  "dsa-coin-change": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long *coins = malloc(sizeof(long long) * (n > 0 ? n : 1));
    for (int i = 0; i < n; i++) coins[i] = next_ll();
    int amount = (int)next_ll();
    int INF = amount + 1;
    int *dp = malloc(sizeof(int) * (amount + 1 > 0 ? amount + 1 : 1));
    for (int a = 0; a <= amount; a++) dp[a] = INF;
    dp[0] = 0;
    for (int a = 1; a <= amount; a++) {
        for (int i = 0; i < n; i++) {
            if (coins[i] <= a && dp[a - (int)coins[i]] + 1 < dp[a]) dp[a] = dp[a - (int)coins[i]] + 1;
        }
    }
    printf("%d\\n", dp[amount] != INF ? dp[amount] : -1);
    return 0;
}
`,
  "dsa-coin-change-ii": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long *coins = malloc(sizeof(long long) * (n > 0 ? n : 1));
    for (int i = 0; i < n; i++) coins[i] = next_ll();
    int amount = (int)next_ll();
    long long *dp = calloc((size_t)(amount + 1 > 0 ? amount + 1 : 1), sizeof(long long));
    dp[0] = 1;
    for (int i = 0; i < n; i++) {
        for (int a = (int)coins[i]; a <= amount; a++) dp[a] += dp[a - (int)coins[i]];
    }
    printf("%lld\\n", dp[amount]);
    return 0;
}
`,
  "dsa-longest-increasing-subsequence": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long *tails = malloc(sizeof(long long) * (n > 0 ? n : 1));
    int len = 0;
    for (int i = 0; i < n; i++) {
        long long x = next_ll();
        /* bisect_left(tails, x) */
        int lo = 0, hi = len;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (tails[mid] < x) lo = mid + 1;
            else hi = mid;
        }
        if (lo == len) tails[len++] = x;
        else tails[lo] = x;
    }
    printf("%d\\n", len);
    return 0;
}
`,
  "dsa-edit-distance": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <ctype.h>

static char *g_buf; static char **g_lines; static int g_nlines;
static char *trim(char *s) {
    while (*s && isspace((unsigned char)*s)) s++;
    size_t n = strlen(s);
    while (n && isspace((unsigned char)s[n - 1])) s[--n] = '\\0';
    return s;
}
static void read_lines(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_lines = malloc(sizeof(char *) * (len + 2));
    size_t st = 0;
    for (size_t i = 0; i <= len; i++) {
        if (i == len || g_buf[i] == '\\n') {
            if (i == len && st == len) break;
            g_buf[i] = '\\0';
            g_lines[g_nlines++] = trim(g_buf + st);
            st = i + 1;
        }
    }
}
static const char *line_at(int i) { return i < g_nlines ? g_lines[i] : ""; }

int main(void) {
    read_lines();
    const char *w1 = line_at(0), *w2 = line_at(1);
    int m = (int)strlen(w1), n = (int)strlen(w2);
    int *dp = malloc(sizeof(int) * (size_t)(m + 1) * (n + 1));
    for (int i = 0; i <= m; i++) dp[i * (n + 1) + 0] = i;
    for (int j = 0; j <= n; j++) dp[0 * (n + 1) + j] = j;
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (w1[i - 1] == w2[j - 1]) dp[i * (n + 1) + j] = dp[(i - 1) * (n + 1) + (j - 1)];
            else {
                int a = dp[(i - 1) * (n + 1) + j];
                int b = dp[i * (n + 1) + (j - 1)];
                int c = dp[(i - 1) * (n + 1) + (j - 1)];
                int mn = a < b ? a : b;
                if (c < mn) mn = c;
                dp[i * (n + 1) + j] = 1 + mn;
            }
        }
    }
    printf("%d\\n", dp[m * (n + 1) + n]);
    return 0;
}
`,
  "dsa-longest-common-subsequence": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <ctype.h>

static char *g_buf; static char **g_lines; static int g_nlines;
static char *trim(char *s) {
    while (*s && isspace((unsigned char)*s)) s++;
    size_t n = strlen(s);
    while (n && isspace((unsigned char)s[n - 1])) s[--n] = '\\0';
    return s;
}
static void read_lines(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_lines = malloc(sizeof(char *) * (len + 2));
    size_t st = 0;
    for (size_t i = 0; i <= len; i++) {
        if (i == len || g_buf[i] == '\\n') {
            if (i == len && st == len) break;
            g_buf[i] = '\\0';
            g_lines[g_nlines++] = trim(g_buf + st);
            st = i + 1;
        }
    }
}
static const char *line_at(int i) { return i < g_nlines ? g_lines[i] : ""; }

int main(void) {
    read_lines();
    const char *t1 = line_at(0), *t2 = line_at(1);
    int m = (int)strlen(t1), n = (int)strlen(t2);
    int *dp = calloc((size_t)(m + 1) * (n + 1), sizeof(int));
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (t1[i - 1] == t2[j - 1]) dp[i * (n + 1) + j] = dp[(i - 1) * (n + 1) + (j - 1)] + 1;
            else {
                int a = dp[(i - 1) * (n + 1) + j];
                int b = dp[i * (n + 1) + (j - 1)];
                dp[i * (n + 1) + j] = a > b ? a : b;
            }
        }
    }
    printf("%d\\n", dp[m * (n + 1) + n]);
    return 0;
}
`,
  "dsa-unique-paths": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int m = (int)next_ll();
    int n = (int)next_ll();
    long long *dp = malloc(sizeof(long long) * (n > 0 ? n : 1));
    for (int j = 0; j < n; j++) dp[j] = 1;
    for (int i = 1; i < m; i++) {
        for (int j = 1; j < n; j++) dp[j] += dp[j - 1];
    }
    printf("%lld\\n", n > 0 ? dp[n - 1] : 0);
    return 0;
}
`,
  "dsa-unique-paths-ii": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int m = (int)next_ll();
    int n = (int)next_ll();
    long long *grid = malloc(sizeof(long long) * (m * n > 0 ? m * n : 1));
    for (int i = 0; i < m * n; i++) grid[i] = next_ll();
    if (m == 0 || n == 0 || grid[0] == 1 || grid[(m - 1) * n + (n - 1)] == 1) {
        printf("0\\n");
        return 0;
    }
    long long *dp = calloc((size_t)(m * n > 0 ? m * n : 1), sizeof(long long));
    dp[0] = 1;
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (grid[i * n + j] == 1) { dp[i * n + j] = 0; continue; }
            if (i > 0) dp[i * n + j] += dp[(i - 1) * n + j];
            if (j > 0) dp[i * n + j] += dp[i * n + j - 1];
        }
    }
    printf("%lld\\n", dp[(m - 1) * n + (n - 1)]);
    return 0;
}
`,
  "dsa-word-break": `#define _POSIX_C_SOURCE 200809L
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <ctype.h>

static char *g_buf; static char **g_lines; static int g_nlines;
static char *trim(char *s) {
    while (*s && isspace((unsigned char)*s)) s++;
    size_t n = strlen(s);
    while (n && isspace((unsigned char)s[n - 1])) s[--n] = '\\0';
    return s;
}
static void read_lines(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_lines = malloc(sizeof(char *) * (len + 2));
    size_t st = 0;
    for (size_t i = 0; i <= len; i++) {
        if (i == len || g_buf[i] == '\\n') {
            if (i == len && st == len) break;
            g_buf[i] = '\\0';
            g_lines[g_nlines++] = trim(g_buf + st);
            st = i + 1;
        }
    }
}
static const char *line_at(int i) { return i < g_nlines ? g_lines[i] : ""; }

static int cmp_str(const void *a, const void *b) { return strcmp(*(char *const *)a, *(char *const *)b); }

int main(void) {
    read_lines();
    const char *s = line_at(0);
    int n = g_nlines > 1 ? atoi(g_lines[1]) : 0;
    char **words = malloc(sizeof(char *) * (n > 0 ? n : 1));
    for (int i = 0; i < n; i++) words[i] = (char *)line_at(2 + i);
    qsort(words, (size_t)n, sizeof(char *), cmp_str);
    int len = (int)strlen(s);
    bool *dp = calloc((size_t)(len + 1), sizeof(bool));
    dp[0] = true;
    char *sub = malloc((size_t)len + 1);
    for (int i = 1; i <= len; i++) {
        for (int j = 0; j < i; j++) {
            if (!dp[j]) continue;
            memcpy(sub, s + j, (size_t)(i - j));
            sub[i - j] = '\\0';
            char *key = sub;
            if (bsearch(&key, words, (size_t)n, sizeof(char *), cmp_str)) {
                dp[i] = true;
                break;
            }
        }
    }
    printf("%s\\n", dp[len] ? "true" : "false");
    return 0;
}
`,
  "dsa-decode-ways": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <ctype.h>

static char *read_raw(void) {
    size_t cap = 1 << 16, len = 0;
    char *b = malloc(cap); size_t r;
    while ((r = fread(b + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; b = realloc(b, cap); }
    }
    b = realloc(b, len + 1); b[len] = '\\0';
    size_t s = 0;
    while (s < len && isspace((unsigned char)b[s])) s++;
    while (len > s && isspace((unsigned char)b[len - 1])) len--;
    b[len] = '\\0';
    memmove(b, b + s, len - s + 1);
    return b;
}

int main(void) {
    char *s = read_raw();
    int n = (int)strlen(s);
    if (n == 0 || s[0] == '0') { printf("0\\n"); return 0; }
    long long prev2 = 1, prev1 = 1;
    for (int i = 1; i < n; i++) {
        long long cur = 0;
        if (s[i] != '0') cur += prev1;
        int two = (s[i - 1] - '0') * 10 + (s[i] - '0');
        if (two >= 10 && two <= 26) cur += prev2;
        prev2 = prev1;
        prev1 = cur;
    }
    printf("%lld\\n", prev1);
    return 0;
}
`,
  "dsa-partition-equal-subset-sum": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long *nums = malloc(sizeof(long long) * (n > 0 ? n : 1));
    long long total = 0;
    for (int i = 0; i < n; i++) { nums[i] = next_ll(); total += nums[i]; }
    if (total % 2 == 1) { printf("false\\n"); return 0; }
    int target = (int)(total / 2);
    bool *dp = calloc((size_t)(target + 1), sizeof(bool));
    dp[0] = true;
    for (int i = 0; i < n; i++) {
        int x = (int)nums[i];
        for (int s = target; s >= x; s--) dp[s] = dp[s] || dp[s - x];
    }
    printf("%s\\n", dp[target] ? "true" : "false");
    return 0;
}
`,
  "dsa-longest-palindromic-subsequence": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <ctype.h>

static char *read_raw(void) {
    size_t cap = 1 << 16, len = 0;
    char *b = malloc(cap); size_t r;
    while ((r = fread(b + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; b = realloc(b, cap); }
    }
    b = realloc(b, len + 1); b[len] = '\\0';
    size_t s = 0;
    while (s < len && isspace((unsigned char)b[s])) s++;
    while (len > s && isspace((unsigned char)b[len - 1])) len--;
    b[len] = '\\0';
    memmove(b, b + s, len - s + 1);
    return b;
}

int main(void) {
    char *s = read_raw();
    int n = (int)strlen(s);
    if (n == 0) { printf("0\\n"); return 0; } /* Python would crash; no test has this */
    int *dp = calloc((size_t)n * n, sizeof(int));
    for (int i = 0; i < n; i++) dp[i * n + i] = 1;
    for (int length = 2; length <= n; length++) {
        for (int i = 0; i + length - 1 < n; i++) {
            int j = i + length - 1;
            if (s[i] == s[j]) {
                dp[i * n + j] = length == 2 ? 2 : dp[(i + 1) * n + (j - 1)] + 2;
            } else {
                int a = dp[(i + 1) * n + j];
                int b = dp[i * n + (j - 1)];
                dp[i * n + j] = a > b ? a : b;
            }
        }
    }
    printf("%d\\n", dp[0 * n + (n - 1)]);
    return 0;
}
`,
  "dsa-best-time-to-buy-sell-stock-ii": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long profit = 0, prev = 0;
    for (int i = 0; i < n; i++) {
        long long p = next_ll();
        if (i > 0 && p > prev) profit += p - prev;
        prev = p;
    }
    printf("%lld\\n", profit);
    return 0;
}
`,
  "dsa-gas-station": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long *gas = malloc(sizeof(long long) * (n > 0 ? n : 1));
    for (int i = 0; i < n; i++) gas[i] = next_ll();
    int m = (int)next_ll();
    long long *cost = malloc(sizeof(long long) * (m > 0 ? m : 1));
    for (int i = 0; i < m; i++) cost[i] = next_ll();
    long long total = 0, tank = 0;
    int start = 0;
    for (int i = 0; i < n; i++) {
        long long diff = gas[i] - cost[i];
        total += diff;
        tank += diff;
        if (tank < 0) { start = i + 1; tank = 0; }
    }
    printf("%d\\n", total >= 0 ? start : -1);
    return 0;
}
`,
  "dsa-assign-cookies": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }
static int cmp_ll(const void *a, const void *b) {
    long long x = *(const long long *)a, y = *(const long long *)b;
    return (x > y) - (x < y);
}

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long *g = malloc(sizeof(long long) * (n > 0 ? n : 1));
    for (int i = 0; i < n; i++) g[i] = next_ll();
    int m = (int)next_ll();
    long long *s = malloc(sizeof(long long) * (m > 0 ? m : 1));
    for (int i = 0; i < m; i++) s[i] = next_ll();
    qsort(g, (size_t)n, sizeof(long long), cmp_ll);
    qsort(s, (size_t)m, sizeof(long long), cmp_ll);
    int child = 0, cookie = 0;
    while (child < n && cookie < m) {
        if (s[cookie] >= g[child]) child++;
        cookie++;
    }
    printf("%d\\n", child);
    return 0;
}
`,
  "dsa-non-overlapping-intervals": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

typedef struct { long long s, e; } Interval;
static int cmp_iv(const void *a, const void *b) {
    const Interval *x = a, *y = b;
    if (x->e != y->e) return x->e < y->e ? -1 : 1;
    if (x->s != y->s) return x->s < y->s ? -1 : 1;
    return 0;
}

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    Interval *iv = malloc(sizeof(Interval) * (n > 0 ? n : 1));
    for (int i = 0; i < n; i++) { iv[i].s = next_ll(); iv[i].e = next_ll(); }
    qsort(iv, (size_t)n, sizeof(Interval), cmp_iv);
    int kept = 0;
    long long end = LLONG_MIN; /* Python uses float('-inf'); same effect */
    for (int i = 0; i < n; i++) {
        if (iv[i].s >= end) { kept++; end = iv[i].e; }
    }
    printf("%d\\n", n - kept);
    return 0;
}
`,
  "dsa-partition-labels": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <ctype.h>

static char *read_raw(void) {
    size_t cap = 1 << 16, len = 0;
    char *b = malloc(cap); size_t r;
    while ((r = fread(b + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; b = realloc(b, cap); }
    }
    b = realloc(b, len + 1); b[len] = '\\0';
    size_t s = 0;
    while (s < len && isspace((unsigned char)b[s])) s++;
    while (len > s && isspace((unsigned char)b[len - 1])) len--;
    b[len] = '\\0';
    memmove(b, b + s, len - s + 1);
    return b;
}

int main(void) {
    char *s = read_raw();
    int n = (int)strlen(s);
    int last[256];
    for (int i = 0; i < 256; i++) last[i] = -1;
    for (int i = 0; i < n; i++) last[(unsigned char)s[i]] = i;
    int start = 0, end = 0, first = 1;
    for (int i = 0; i < n; i++) {
        int e = last[(unsigned char)s[i]];
        if (e > end) end = e;
        if (i == end) {
            if (!first) printf(" ");
            printf("%d", end - start + 1);
            first = 0;
            start = i + 1;
        }
    }
    printf("\\n");
    return 0;
}
`,
  "dsa-lemonade-change": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    int n = (int)next_ll();
    long long fives = 0, tens = 0;
    bool ok = true;
    for (int i = 0; i < n && ok; i++) {
        long long b = next_ll();
        if (b == 5) fives++;
        else if (b == 10) {
            if (fives == 0) ok = false;
            else { fives--; tens++; }
        } else {
            if (tens > 0 && fives > 0) { tens--; fives--; }
            else if (fives >= 3) fives -= 3;
            else ok = false;
        }
    }
    printf("%s\\n", ok ? "true" : "false");
    return 0;
}
`,
  "dsa-subsets": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

static long long *g_nums;
static int g_n;
static long long *g_cur;
static int g_cur_len;

/* depth-first include-or-exclude walk, exclude branch first, exactly as
   in the Python starter: this fixes the subset print order */
static void backtrack(int i) {
    if (i == g_n) {
        for (int j = 0; j < g_cur_len; j++) {
            if (j) printf(" ");
            printf("%lld", g_cur[j]);
        }
        printf("\\n");
        return;
    }
    backtrack(i + 1);
    g_cur[g_cur_len++] = g_nums[i];
    backtrack(i + 1);
    g_cur_len--;
}

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    g_n = (int)next_ll();
    g_nums = malloc(sizeof(long long) * (g_n > 0 ? g_n : 1));
    for (int i = 0; i < g_n; i++) g_nums[i] = next_ll();
    g_cur = malloc(sizeof(long long) * (g_n > 0 ? g_n : 1));
    g_cur_len = 0;
    backtrack(0);
    return 0;
}
`,
  "dsa-permutations": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

static long long *g_nums;
static int g_n;
static long long *g_cur;
static bool *g_used;

static void backtrack(int depth) {
    if (depth == g_n) {
        for (int j = 0; j < g_n; j++) {
            if (j) printf(" ");
            printf("%lld", g_cur[j]);
        }
        printf("\\n");
        return;
    }
    for (int i = 0; i < g_n; i++) {
        if (g_used[i]) continue;
        g_used[i] = true;
        g_cur[depth] = g_nums[i];
        backtrack(depth + 1);
        g_used[i] = false;
    }
}

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    g_n = (int)next_ll();
    g_nums = malloc(sizeof(long long) * (g_n > 0 ? g_n : 1));
    for (int i = 0; i < g_n; i++) g_nums[i] = next_ll();
    g_cur = malloc(sizeof(long long) * (g_n > 0 ? g_n : 1));
    g_used = calloc((size_t)(g_n > 0 ? g_n : 1), sizeof(bool));
    backtrack(0);
    return 0;
}
`,
  "dsa-combination-sum": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }
static int cmp_ll(const void *a, const void *b) {
    long long x = *(const long long *)a, y = *(const long long *)b;
    return (x > y) - (x < y);
}

static long long *g_cand;
static int g_n;
static long long *g_cur;
static int g_cur_len;
static int g_any;

static void backtrack(int start, long long remaining) {
    if (remaining == 0) {
        for (int j = 0; j < g_cur_len; j++) {
            if (j) printf(" ");
            printf("%lld", g_cur[j]);
        }
        printf("\\n");
        g_any = 1;
        return;
    }
    for (int i = start; i < g_n; i++) {
        if (g_cand[i] > remaining) break;
        g_cur[g_cur_len++] = g_cand[i];
        backtrack(i, remaining - g_cand[i]);
        g_cur_len--;
    }
}

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    g_n = (int)next_ll();
    g_cand = malloc(sizeof(long long) * (g_n > 0 ? g_n : 1));
    for (int i = 0; i < g_n; i++) g_cand[i] = next_ll();
    long long target = next_ll();
    qsort(g_cand, (size_t)g_n, sizeof(long long), cmp_ll);
    g_cur = malloc(sizeof(long long) * (target > 0 ? (size_t)target + 1 : 1));
    g_cur_len = 0;
    g_any = 0;
    backtrack(0, target);
    if (!g_any) printf("\\n");
    return 0;
}
`,
  "dsa-generate-parentheses": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

static int g_n;
static char *g_cur;

static void backtrack(int len, int open_count, int close_count) {
    if (len == 2 * g_n) {
        g_cur[len] = '\\0';
        printf("%s\\n", g_cur);
        return;
    }
    if (open_count < g_n) {
        g_cur[len] = '(';
        backtrack(len + 1, open_count + 1, close_count);
    }
    if (close_count < open_count) {
        g_cur[len] = ')';
        backtrack(len + 1, open_count, close_count + 1);
    }
}

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    g_n = (int)next_ll();
    g_cur = malloc(sizeof(char) * (2 * g_n + 1 > 0 ? 2 * g_n + 1 : 1));
    backtrack(0, 0, 0);
    return 0;
}
`,
  "dsa-letter-combinations-of-phone-number": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <ctype.h>

static char *read_raw(void) {
    size_t cap = 1 << 16, len = 0;
    char *b = malloc(cap); size_t r;
    while ((r = fread(b + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; b = realloc(b, cap); }
    }
    b = realloc(b, len + 1); b[len] = '\\0';
    size_t s = 0;
    while (s < len && isspace((unsigned char)b[s])) s++;
    while (len > s && isspace((unsigned char)b[len - 1])) len--;
    b[len] = '\\0';
    memmove(b, b + s, len - s + 1);
    return b;
}

static const char *g_map[10] = {
    "", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"
};
static const char *g_digits;
static char *g_cur;
static int g_first;

static void backtrack(int i) {
    if (g_digits[i] == '\\0') {
        if (!g_first) printf(" ");
        printf("%s", g_cur);
        g_first = 0;
        return;
    }
    int d = g_digits[i] - '0';
    if (d < 2 || d > 9) return; /* Python would KeyError; no test has this */
    for (const char *p = g_map[d]; *p; p++) {
        g_cur[i] = *p;
        backtrack(i + 1);
    }
}

int main(void) {
    char *digits = read_raw();
    if (digits[0] == '\\0') { printf("\\n"); return 0; }
    g_digits = digits;
    int n = (int)strlen(digits);
    g_cur = malloc((size_t)n + 1);
    g_cur[n] = '\\0';
    g_first = 1;
    backtrack(0);
    printf("\\n");
    return 0;
}
`,
  "dsa-n-queens-count": `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <limits.h>

static char *g_buf; static char **g_tok; static int g_ntok, g_pos;
static void read_tokens(void) {
    size_t cap = 1 << 16, len = 0;
    g_buf = malloc(cap); size_t r;
    while ((r = fread(g_buf + len, 1, cap - len, stdin)) > 0) {
        len += r;
        if (len == cap) { cap *= 2; g_buf = realloc(g_buf, cap); }
    }
    g_buf = realloc(g_buf, len + 1); g_buf[len] = '\\0';
    g_tok = malloc(sizeof(char *) * (len / 2 + 2));
    int in = 0;
    for (size_t i = 0; i < len; i++) {
        char c = g_buf[i];
        if (c == ' ' || c == '\\n' || c == '\\t' || c == '\\r') { if (in) { g_buf[i] = '\\0'; in = 0; } }
        else if (!in) { g_tok[g_ntok++] = g_buf + i; in = 1; }
    }
}
static long long next_ll(void) { return g_pos < g_ntok ? strtoll(g_tok[g_pos++], NULL, 10) : 0; }

static int g_n;
static long long g_count;
static bool *g_cols, *g_d1, *g_d2;

static void backtrack(int row) {
    if (row == g_n) { g_count++; return; }
    for (int col = 0; col < g_n; col++) {
        int d1 = row - col + g_n - 1;
        int d2 = row + col;
        if (g_cols[col] || g_d1[d1] || g_d2[d2]) continue;
        g_cols[col] = g_d1[d1] = g_d2[d2] = true;
        backtrack(row + 1);
        g_cols[col] = g_d1[d1] = g_d2[d2] = false;
    }
}

int main(void) {
    read_tokens();
    if (!g_ntok) return 0;
    g_n = (int)next_ll();
    g_cols = calloc((size_t)(g_n > 0 ? g_n : 1), sizeof(bool));
    g_d1 = calloc((size_t)(2 * g_n > 0 ? 2 * g_n : 1), sizeof(bool));
    g_d2 = calloc((size_t)(2 * g_n > 0 ? 2 * g_n : 1), sizeof(bool));
    g_count = 0;
    backtrack(0);
    printf("%lld\\n", g_count);
    return 0;
}
`,
};
