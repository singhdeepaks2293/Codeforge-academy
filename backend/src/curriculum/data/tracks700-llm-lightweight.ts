// Lightweight LLM in Python — build a tiny language model from scratch in
// pure Python + NumPy (no PyTorch, no downloads, no GPU). 12 lessons in
// 3 modules x 4: tokens/embeddings, attention in depth, the transformer
// block and training. The tiny model (14-char vocab, d_model 8, 2 heads,
// 1 pre-norm block, tied output head) trains in under a second on CPU.
// Uses buildCourse + buildShortAssessment (not expandTracks) because the
// track has 12 lessons, not 10.
import { buildCourse, buildShortAssessment } from '../builder.js';
import type { CourseSpec, ExerciseSpec } from '../builder.js';
import type { AssessmentQuestion, Course, MasteryAssessment } from '../types.js';

const COURSE_SPEC: CourseSpec = {
  "id": "llm-lightweight-python",
  "slug": "llm-lightweight-python",
  "language": "python",
  "category": "data-ai",
  "title": "Lightweight LLM in Python",
  "description": "Build a tiny language model from scratch in pure Python and NumPy: tokenizers, embeddings, positional encoding, attention in depth, the transformer block, loss, optimizer, training and generation — no PyTorch, no downloads, no GPU.",
  "difficulty": "Intermediate",
  "estimatedHours": 12,
  "skills": [
    "Tokenizers",
    "Embeddings",
    "Positional encoding",
    "Attention",
    "Multi-head attention",
    "Transformer blocks",
    "Cross-entropy loss",
    "Adam optimizer",
    "Text generation",
    "Perplexity"
  ],
  "prerequisites": [
    "Python Programming"
  ],
  "modules": [
    {
      "id": "llm-lightweight-python-m1",
      "title": "How a Tiny Language Model Works",
      "description": "Tokens, next-token prediction, tokenizers, embeddings and positional encoding — the inputs a language model sees.",
      "level": "beginner",
      "order": 1,
      "lessons": [
        {
          "id": "llm-lightweight-python-m1-l1",
          "slug": "llm-lightweight-python-m1-l1",
          "title": "What a Small Language Model Is",
          "objectives": [
            "Explain what a language model does in one sentence",
            "Turn token counts into next-token probabilities",
            "Explain why a model outputs a distribution, not a single word"
          ],
          "introduction": "What a Small Language Model Is is a core skill in this track. In this lesson you will learn what a small language model is, see it predict the next token on a tiny corpus, and practise it yourself.",
          "concept": "A language model predicts the next token by assigning a probability to every token in the vocabulary. Given the text so far, it scores each possible continuation and the highest-scoring tokens are the most likely next words. A bigram model is the simplest version: it counts how often each token follows each other token in a corpus and turns those counts into probabilities. Real models learn the same idea from data instead of counting, but the job is identical: predict what comes next.",
          "syntax": "probs = counts[token] / total\nnext_token = max(probs, key=probs.get)",
          "analogy": "A language model is like a weather forecast for words: it does not know what will happen next, but it can tell you which outcomes are most likely.",
          "exampleCode": "text = \"the cat sat the dog sat the cat\"\ntokens = text.split()\ncounts = {}\nfor a, b in zip(tokens, tokens[1:]):\n    counts.setdefault(a, {})\n    counts[a][b] = counts[a].get(b, 0) + 1\nquery = \"the\"\ntotal = sum(counts[query].values())\nfor nxt, c in sorted(counts[query].items(), key=lambda kv: (-kv[1], kv[0])):\n    print(f\"{nxt} {c / total:.3f}\")",
          "exampleLanguage": "python",
          "walkthrough": [
            "First, split the corpus into tokens and count every adjacent pair.",
            "Next, look up the counts for the query token only.",
            "Then, divide each count by the total number of continuations to get probabilities.",
            "Finally, print the next tokens sorted from most likely to least likely."
          ],
          "commonMistakes": [
            "Dividing by the total number of tokens in the corpus instead of the number of continuations of the query token.",
            "Forgetting that probabilities must add up to 1 over the continuations of one token.",
            "Treating the model's most likely token as a certainty instead of a probability."
          ],
          "debugging": {
            "prompt": "The program below should print the next-token probabilities after 'a', but it prints the wrong numbers. Find and fix the bug.",
            "buggyCode": "tokens = \"a b a c a b\".split()\ncounts = {}\nfor a, b in zip(tokens, tokens[1:]):\n    counts.setdefault(a, {})\n    counts[a][b] = counts[a].get(b, 0) + 1\ntotal = len(tokens)\nfor nxt, c in counts[\"a\"].items():\n    print(f\"{nxt} {c / total:.3f}\")",
            "fixedCode": "tokens = \"a b a c a b\".split()\ncounts = {}\nfor a, b in zip(tokens, tokens[1:]):\n    counts.setdefault(a, {})\n    counts[a][b] = counts[a].get(b, 0) + 1\ntotal = sum(counts[\"a\"].values())\nfor nxt, c in counts[\"a\"].items():\n    print(f\"{nxt} {c / total:.3f}\")",
            "explanation": "Probabilities must add up to 1 over the continuations of 'a', so divide by the number of times 'a' is followed by something (3), not by the length of the whole corpus (6)."
          },
          "miniChallenge": "Change the corpus so that 'a' is followed by 'b' three times and by 'c' once, then predict the printed probabilities before you run it.",
          "summary": "What a Small Language Model Is: a language model predicts the next token as a probability distribution — count continuations, divide by the total, and the most likely token wins.",
          "quiz": [
            {
              "question": "What is the main purpose of a language model?",
              "options": [
                "To predict the next token by assigning a probability to every token in the vocabulary",
                "It raises an error and prints nothing.",
                "It prints nothing at all.",
                "It prints the raw input values unchanged."
              ],
              "answer": 0,
              "explanation": "A language model predicts the next token by assigning a probability to every token in the vocabulary."
            },
            {
              "question": "What does this code print?\ntext = \"the cat sat the dog sat the cat\"\ntokens = text.split()\ncounts = {}\nfor a, b in zip(tokens, tokens[1:]):\n    counts.setdefault(a, {})\n    counts[a][b] = counts[a].get(b, 0) + 1\nquery = \"the\"\ntotal = sum(counts[query].values())\nfor nxt, c in sorted(counts[query].items(), key=lambda kv: (-kv[1], kv[0])):\n    print(f\"{nxt} {c / total:.3f}\")",
              "options": [
                "It prints the raw input values unchanged.",
                "cat 0.667\ndog 0.333",
                "It raises an error and prints nothing.",
                "It prints nothing at all."
              ],
              "answer": 1,
              "explanation": "The code counts what follows 'the' (cat twice, dog once) and prints the probabilities: cat 0.667, dog 0.333."
            }
          ],
          "exercise": {
            "id": "llm-lightweight-python-m1-l1-e1",
            "title": "Bigram next-token probabilities",
            "type": "write-code",
            "instructions": "Write a program that reads two lines: a space-separated token sequence, then a query token. Print each distinct token that follows the query, one per line, as '<token> <probability>' with the probability rounded to 3 decimals, sorted by probability from highest to lowest (ties: alphabetical).",
            "starterCode": "tokens = input().split()\nquery = input().strip()\n# TODO: count what follows `query` and print each next token with its probability.\n",
            "solution": "tokens = input().split()\nquery = input().strip()\nnxt = {}\nfor a, b in zip(tokens, tokens[1:]):\n    if a == query:\n        nxt[b] = nxt.get(b, 0) + 1\ntotal = sum(nxt.values())\nfor t in sorted(nxt, key=lambda t: (-nxt[t], t)):\n    print(f\"{t} {nxt[t] / total:.3f}\")",
            "solutionExplanation": "Count how often each token follows the query, divide each count by the total number of continuations, and print the probabilities sorted from highest to lowest.",
            "complexity": "Easy",
            "tests": [
              {
                "name": "Example input",
                "stdin": "a b a c a b\na\n",
                "expectedStdout": "b 0.667\nc 0.333",
                "hidden": false
              },
              {
                "name": "Second input",
                "stdin": "the cat sat the dog sat the cat\nthe\n",
                "expectedStdout": "cat 0.667\ndog 0.333",
                "hidden": true
              }
            ],
            "hintNotes": {
              "concept": "A language model predicts the next token: count how often each token follows the query, then divide by the total number of continuations.",
              "approach": "Build a dictionary of next-token counts for the query token only, then sort by count descending and print probabilities.",
              "structure": "Read both lines, count continuations of the query, sort, print each token with its probability rounded to 3 decimals."
            }
          }
        },
        {
          "id": "llm-lightweight-python-m1-l2",
          "slug": "llm-lightweight-python-m1-l2",
          "title": "Tokenizer from Scratch",
          "objectives": [
            "Explain why a model needs token ids instead of raw text",
            "Build a character-level vocabulary from a corpus",
            "Encode text to ids and decode ids back to text"
          ],
          "introduction": "Tokenizer from Scratch is a core skill in this track. In this lesson you will learn what a tokenizer does, build a character-level vocabulary, and practise encoding and decoding yourself.",
          "concept": "A tokenizer turns text into a list of integer token ids that a model can look up in an embedding table. A character-level tokenizer builds its vocabulary from the sorted unique characters of the training text, so each character gets a fixed id. Decoding is the reverse step: ids back to characters. The vocabulary must be built from the training text and frozen, because changing it later shifts every id.",
          "syntax": "vocab = sorted(set(text))\nids = [vocab.index(ch) for ch in text]",
          "analogy": "A tokenizer is like a codebook for a spy: every character has a number, and the same codebook must be used to write and to read the message.",
          "exampleCode": "text = \"hello\"\nvocab = sorted(set(text))\nids = [vocab.index(ch) for ch in text]\nprint(\"vocab:\", vocab)\nprint(\"ids:\", ids)\nprint(\"decoded:\", \"\".join(vocab[i] for i in ids))",
          "exampleLanguage": "python",
          "walkthrough": [
            "First, collect the sorted unique characters of the text as the vocabulary.",
            "Next, turn each character into its index in that vocabulary.",
            "Then, print the vocabulary, the ids, and the decoded text.",
            "Finally, check that decoding the ids gives back the original text."
          ],
          "commonMistakes": [
            "Building the vocabulary from the text you are testing on instead of the training text, which shifts every token id.",
            "Sorting the vocabulary in a different order at encode and decode time.",
            "Forgetting that the vocabulary must include every character the model will ever see, including spaces and punctuation."
          ],
          "debugging": {
            "prompt": "The program below should encode 'hello' as 1 0 2 2 3, but it prints the wrong ids. Find and fix the bug.",
            "buggyCode": "text = \"hello\"\nvocab = sorted(set(text), reverse=True)\nids = [vocab.index(ch) for ch in text]\nprint(\" \".join(str(i) for i in ids))",
            "fixedCode": "text = \"hello\"\nvocab = sorted(set(text))\nids = [vocab.index(ch) for ch in text]\nprint(\" \".join(str(i) for i in ids))",
            "explanation": "The vocabulary order defines the ids: sorting in reverse gives 'o' id 0 and 'e' id 3, so every id is wrong. Sort the unique characters in normal order."
          },
          "miniChallenge": "Encode the word 'banana' with the same vocabulary rule, then predict the ids before you run it.",
          "summary": "Tokenizer from Scratch: a tokenizer maps text to integer ids with a frozen vocabulary — sorted unique characters, each with a fixed id, decoded by looking the ids back up.",
          "quiz": [
            {
              "question": "What is the main purpose of a tokenizer?",
              "options": [
                "It prints the raw input values unchanged.",
                "To turn text into a list of integer token ids that a model can look up",
                "It raises an error and prints nothing.",
                "It prints nothing at all."
              ],
              "answer": 1,
              "explanation": "A tokenizer turns text into a list of integer token ids that a model can look up in an embedding table."
            },
            {
              "question": "What does this code print?\ntext = \"hello\"\nvocab = sorted(set(text))\nids = [vocab.index(ch) for ch in text]\nprint(\"vocab:\", vocab)\nprint(\"ids:\", ids)\nprint(\"decoded:\", \"\".join(vocab[i] for i in ids))",
              "options": [
                "It prints nothing at all.",
                "It prints the raw input values unchanged.",
                "vocab: ['e', 'h', 'l', 'o']\nids: [1, 0, 2, 2, 3]\ndecoded: hello",
                "It raises an error and prints nothing."
              ],
              "answer": 2,
              "explanation": "The vocabulary is the sorted unique characters of 'hello', so h=1, e=0, l=2, o=3 and the ids are 1 0 2 2 3."
            }
          ],
          "exercise": {
            "id": "llm-lightweight-python-m1-l2-e1",
            "title": "Encode text as token ids",
            "type": "write-code",
            "instructions": "Write a program that reads one line of text and prints its token ids space-separated. The vocabulary is the sorted list of unique characters in the text, so the first character alphabetically gets id 0.",
            "starterCode": "text = input()\n# TODO: build the vocabulary and print the token ids.\n",
            "solution": "text = input()\nvocab = sorted(set(text))\nprint(\" \".join(str(vocab.index(ch)) for ch in text))",
            "solutionExplanation": "The vocabulary is the sorted unique characters; each character's id is its index in that list.",
            "complexity": "Easy",
            "tests": [
              {
                "name": "Example input",
                "stdin": "hello\n",
                "expectedStdout": "1 0 2 2 3",
                "hidden": false
              },
              {
                "name": "Second input",
                "stdin": "banana\n",
                "expectedStdout": "1 0 2 0 2 0",
                "hidden": true
              }
            ],
            "hintNotes": {
              "concept": "A tokenizer turns text into integer ids: the vocabulary is the sorted unique characters, and each character's id is its position in that list.",
              "approach": "Build the sorted unique-character list, then print the index of each character of the input.",
              "structure": "Read the line, build the vocabulary, join the ids with spaces and print them."
            }
          }
        },
        {
          "id": "llm-lightweight-python-m1-l3",
          "slug": "llm-lightweight-python-m1-l3",
          "title": "Embeddings: Token and Position",
          "objectives": [
            "Explain what a token embedding is",
            "Add token and position embeddings to form the model input",
            "Explain tied vs untied output heads"
          ],
          "introduction": "Embeddings: Token and Position is a core skill in this track. In this lesson you will learn how tokens become vectors, why position matters, and practise adding the two embeddings yourself.",
          "concept": "An embedding is a learned vector for each token, and the model adds a position embedding so it can tell tokens apart by where they sit. The token embedding table has one row per vocabulary item and the position table has one row per position; the model input is the sum of the two rows. In a tied model the output head reuses the token embedding table transposed instead of learning a separate matrix, which saves parameters and ties input and output meanings together.",
          "syntax": "x = E_tok[token_ids] + E_pos[position_ids]",
          "analogy": "An embedding is like a name tag plus a seat number: the name tag says who a token is, the seat number says where it sits, and the model reads both at once.",
          "exampleCode": "import numpy as np\nE_tok = np.random.default_rng(7).normal(0, 0.5, (4, 3))\nE_pos = np.random.default_rng(8).normal(0, 0.5, (8, 3))\nids, pos = [1, 2, 0], [0, 1, 2]\nx = E_tok[ids] + E_pos[pos]\nfor row in x:\n    print(\" \".join(f\"{v:.3f}\" for v in row))",
          "exampleLanguage": "python",
          "walkthrough": [
            "First, build the token table and the position table with fixed seeds.",
            "Next, look up the row for each token id and each position id.",
            "Then, add the two rows together for each position.",
            "Finally, print each summed vector with values rounded to 3 decimals."
          ],
          "commonMistakes": [
            "Adding the position id number to the embedding instead of adding the position embedding vector, which mixes a count into a learned representation.",
            "Using the same table for tokens and positions, so a token and a position share one meaning.",
            "Forgetting that the position table must be long enough for the longest sequence the model will see."
          ],
          "debugging": {
            "prompt": "The program below should add token and position embeddings, but the output is wrong. Find and fix the bug.",
            "buggyCode": "import numpy as np\nE_tok = np.random.default_rng(7).normal(0, 0.5, (4, 3))\nE_pos = np.random.default_rng(8).normal(0, 0.5, (8, 3))\nids, pos = [1, 2, 0], [0, 1, 2]\nx = E_tok[ids] + pos\nfor row in x:\n    print(\" \".join(f\"{v:.3f}\" for v in row))",
            "fixedCode": "import numpy as np\nE_tok = np.random.default_rng(7).normal(0, 0.5, (4, 3))\nE_pos = np.random.default_rng(8).normal(0, 0.5, (8, 3))\nids, pos = [1, 2, 0], [0, 1, 2]\nx = E_tok[ids] + E_pos[pos]\nfor row in x:\n    print(\" \".join(f\"{v:.3f}\" for v in row))",
            "explanation": "Positions must be looked up in the position table: adding the raw position numbers 0, 1, 2 to the vectors corrupts them, while E_pos[pos] adds the learned position vectors."
          },
          "miniChallenge": "Change the position ids to [2, 3, 4] and predict how the first row changes before you run it.",
          "summary": "Embeddings: Token and Position — the model input is the sum of a token embedding and a position embedding; tied models reuse the token table as the output head.",
          "quiz": [
            {
              "question": "What is the main purpose of adding a position embedding?",
              "options": [
                "It prints nothing at all.",
                "It prints the raw input values unchanged.",
                "So the model can tell tokens apart by where they sit in the sequence",
                "It raises an error and prints nothing."
              ],
              "answer": 2,
              "explanation": "An embedding is a learned vector for each token, and the model adds a position embedding so it can tell tokens apart by where they sit."
            },
            {
              "question": "What does this code print?\nimport numpy as np\nE_tok = np.random.default_rng(7).normal(0, 0.5, (4, 3))\nE_pos = np.random.default_rng(8).normal(0, 0.5, (8, 3))\nids, pos = [1, 2, 0], [0, 1, 2]\nx = E_tok[ids] + E_pos[pos]\nfor row in x:\n    print(\" \".join(f\"{v:.3f}\" for v in row))",
              "options": [
                "It raises an error and prints nothing.",
                "It prints nothing at all.",
                "It prints the raw input values unchanged.",
                "-1.314 -0.896 -1.176\n-0.146 -0.486 -0.341\n-0.478 0.596 0.341"
              ],
              "answer": 3,
              "explanation": "Each printed row is the token embedding plus the position embedding for that position."
            }
          ],
          "exercise": {
            "id": "llm-lightweight-python-m1-l3-e1",
            "title": "Add token and position embeddings",
            "type": "write-code",
            "instructions": "The token table E_tok (4 rows x 3 columns) is built with np.random.default_rng(7).normal(0, 0.5, (4, 3)) and the position table E_pos (8 x 3) with np.random.default_rng(8).normal(0, 0.5, (8, 3)). Read two lines: token ids, then position ids. Print one line per token: the token embedding plus the position embedding, values rounded to 3 decimals.",
            "starterCode": "import numpy as np\nE_tok = np.random.default_rng(7).normal(0, 0.5, (4, 3))\nE_pos = np.random.default_rng(8).normal(0, 0.5, (8, 3))\nids = [int(v) for v in input().split()]\npos = [int(v) for v in input().split()]\n# TODO: print the token embedding plus the position embedding for each token.\n",
            "solution": "import numpy as np\nE_tok = np.random.default_rng(7).normal(0, 0.5, (4, 3))\nE_pos = np.random.default_rng(8).normal(0, 0.5, (8, 3))\nids = [int(v) for v in input().split()]\npos = [int(v) for v in input().split()]\nx = E_tok[ids] + E_pos[pos]\nfor row in x:\n    print(\" \".join(f\"{v:.3f}\" for v in row))",
            "solutionExplanation": "Look up each token id in the token table and each position id in the position table, add the two rows, and print them.",
            "complexity": "Easy",
            "tests": [
              {
                "name": "Example input",
                "stdin": "1 2 0\n0 1 2\n",
                "expectedStdout": "-1.314 -0.896 -1.176\n-0.146 -0.486 -0.341\n-0.478 0.596 0.341",
                "hidden": false
              },
              {
                "name": "Second input",
                "stdin": "3 0\n2 3\n",
                "expectedStdout": "-0.789 0.692 0.657\n0.697 0.533 -0.164",
                "hidden": true
              }
            ],
            "hintNotes": {
              "concept": "The model input is the sum of a token embedding and a position embedding: look each id up in its own table and add the rows.",
              "approach": "Index both tables with the id lists, add the results, and print each row formatted to 3 decimals.",
              "structure": "Read the two id lists, add E_tok[ids] and E_pos[pos], print one row per token."
            }
          }
        },
        {
          "id": "llm-lightweight-python-m1-l4",
          "slug": "llm-lightweight-python-m1-l4",
          "title": "Positional Encoding",
          "objectives": [
            "Explain why attention alone cannot see word order",
            "Compute sinusoidal positional encodings by hand",
            "Explain why sine and cosine at many frequencies give unique positions"
          ],
          "introduction": "Positional Encoding is a core skill in this track. In this lesson you will learn how the model knows word order, compute the sinusoidal encoding yourself, and practise it in code.",
          "concept": "Sinusoidal positional encoding gives each position a unique vector built from sines and cosines at different frequencies. Even dimensions use sin(pos / 10000^(2i/d)) and odd dimensions use cos of the same angle, so nearby positions get similar vectors and the pattern extends to positions longer than any seen in training. Without it, attention treats the input as an unordered set and the model cannot tell 'dog bites man' from 'man bites dog'.",
          "syntax": "PE(pos, 2i) = sin(pos / 10000^(2i/d))\nPE(pos, 2i+1) = cos(pos / 10000^(2i/d))",
          "analogy": "Positional encoding is like the page numbers in a book: the words are the same either way, but the numbers tell you which order to read them in.",
          "exampleCode": "import numpy as np\ndef pe(pos, d):\n    out = np.zeros(d)\n    for i in range(d):\n        div = 10000 ** ((2 * (i // 2)) / d)\n        out[i] = np.sin(pos / div) if i % 2 == 0 else np.cos(pos / div)\n    return out\nfor pos in range(3):\n    print(pos, \" \".join(f\"{v:.4f}\" for v in pe(pos, 4)))",
          "exampleLanguage": "python",
          "walkthrough": [
            "First, write the encoding function: even dimensions use sin, odd dimensions use cos.",
            "Next, compute the divisor 10000^(2*(i//2)/d) for each dimension pair.",
            "Then, print the encoding rows for positions 0, 1 and 2.",
            "Finally, notice how position 0 is all zeros and ones, and how the higher dimensions change slowly."
          ],
          "commonMistakes": [
            "Using the same positional vector for every position, which gives the model no information about word order.",
            "Using the dimension index instead of the position in the sine and cosine, so every position gets the same row.",
            "Forgetting that the encoding is added to the embedding, not concatenated with it."
          ],
          "debugging": {
            "prompt": "The program below should compute the sinusoidal encoding, but every position prints the same row. Find and fix the bug.",
            "buggyCode": "import numpy as np\ndef pe(pos, d):\n    out = np.zeros(d)\n    for i in range(d):\n        div = 10000 ** ((2 * (i // 2)) / d)\n        out[i] = np.sin(i / div) if i % 2 == 0 else np.cos(i / div)\n    return out\nfor pos in range(3):\n    print(pos, \" \".join(f\"{v:.4f}\" for v in pe(pos, 4)))",
            "fixedCode": "import numpy as np\ndef pe(pos, d):\n    out = np.zeros(d)\n    for i in range(d):\n        div = 10000 ** ((2 * (i // 2)) / d)\n        out[i] = np.sin(pos / div) if i % 2 == 0 else np.cos(pos / div)\n    return out\nfor pos in range(3):\n    print(pos, \" \".join(f\"{v:.4f}\" for v in pe(pos, 4)))",
            "explanation": "The angle must depend on the position: using the dimension index i makes the row identical for every position, so the model gets no word-order information."
          },
          "miniChallenge": "Compute the encoding row for position 10 with width 4 by hand, then run the code to check.",
          "summary": "Positional Encoding: sines and cosines at different frequencies give each position a unique vector, so the model can tell word order apart.",
          "quiz": [
            {
              "question": "What is the main purpose of positional encoding?",
              "options": [
                "It raises an error and prints nothing.",
                "It prints nothing at all.",
                "It prints the raw input values unchanged.",
                "To give each position a unique vector so the model knows word order"
              ],
              "answer": 3,
              "explanation": "Sinusoidal positional encoding gives each position a unique vector built from sines and cosines at different frequencies."
            },
            {
              "question": "What does this code print?\nimport numpy as np\ndef pe(pos, d):\n    out = np.zeros(d)\n    for i in range(d):\n        div = 10000 ** ((2 * (i // 2)) / d)\n        out[i] = np.sin(pos / div) if i % 2 == 0 else np.cos(pos / div)\n    return out\nfor pos in range(3):\n    print(pos, \" \".join(f\"{v:.4f}\" for v in pe(pos, 4)))",
              "options": [
                "0 0.0000 1.0000 0.0000 1.0000\n1 0.8415 0.5403 0.0100 1.0000\n2 0.9093 -0.4161 0.0200 0.9998",
                "It raises an error and prints nothing.",
                "It prints nothing at all.",
                "It prints the raw input values unchanged."
              ],
              "answer": 0,
              "explanation": "Position 0 is 0.0000 1.0000 0.0000 1.0000, and positions 1 and 2 follow the sine and cosine pattern."
            }
          ],
          "exercise": {
            "id": "llm-lightweight-python-m1-l4-e1",
            "title": "Compute one positional encoding row",
            "type": "write-code",
            "instructions": "Write a program that reads two integers — a position and a model width d — and prints the sinusoidal positional encoding row for that position, values rounded to 4 decimals, space-separated. Even dimensions use sin, odd dimensions use cos, with divisor 10000^(2*(i//2)/d).",
            "starterCode": "import numpy as np\npos, d = [int(v) for v in input().split()]\n# TODO: print the encoding row for this position.\n",
            "solution": "import numpy as np\npos, d = [int(v) for v in input().split()]\nout = np.zeros(d)\nfor i in range(d):\n    div = 10000 ** ((2 * (i // 2)) / d)\n    out[i] = np.sin(pos / div) if i % 2 == 0 else np.cos(pos / div)\nprint(\" \".join(f\"{v:.4f}\" for v in out))",
            "solutionExplanation": "For each dimension, compute the divisor from the dimension pair and take sin for even dimensions and cos for odd ones.",
            "complexity": "Easy",
            "tests": [
              {
                "name": "Example input",
                "stdin": "2 8\n",
                "expectedStdout": "0.9093 -0.4161 0.1987 0.9801 0.0200 0.9998 0.0020 1.0000",
                "hidden": false
              },
              {
                "name": "Second input",
                "stdin": "5 4\n",
                "expectedStdout": "-0.9589 0.2837 0.0500 0.9988",
                "hidden": true
              }
            ],
            "hintNotes": {
              "concept": "Sinusoidal positional encoding: even dimensions use sin, odd dimensions use cos, with divisor 10000^(2*(i//2)/d).",
              "approach": "Loop over the dimensions, compute each divisor from the dimension pair, and take sin or cos of position divided by it.",
              "structure": "Read position and width, build the row, print the values rounded to 4 decimals."
            }
          }
        }
      ]
    },
    {
      "id": "llm-lightweight-python-m2",
      "title": "Attention, in Depth",
      "description": "Q, K and V, scaled dot-product attention, causal masking and multi-head attention — the mechanism at the heart of the transformer.",
      "level": "intermediate",
      "order": 2,
      "lessons": [
        {
          "id": "llm-lightweight-python-m2-l5",
          "slug": "llm-lightweight-python-m2-l5",
          "title": "Q, K, and V Projections",
          "objectives": [
            "Explain what queries, keys and values are",
            "Compute Q, K and V from an input matrix",
            "Explain why the three projections must be different"
          ],
          "introduction": "Q, K, and V Projections is a core skill in this track. In this lesson you will learn the three roles inside attention, compute them with NumPy, and practise them yourself.",
          "concept": "Q, K and V are three different linear projections of the same input, so queries, keys and values can play different roles. The query is what a token is looking for, the key is what a token offers, and the value is the content a token contributes when it is attended to. Because the three projections are learned separately, the model can make a token ask about one thing while advertising something else.",
          "syntax": "Q = X @ Wq\nK = X @ Wk\nV = X @ Wv",
          "analogy": "Q, K and V are like a library search: the query is the question you ask, the key is the title on each book's spine, and the value is the book itself.",
          "exampleCode": "import numpy as np\nX = np.array([[1, 0, 2], [0, 1, 1]], dtype=float)\nWq = np.array([[1, 2, 0], [0, 1, 1], [1, 0, 1]], dtype=float)\nWk = np.array([[1, 0, 1], [0, 2, 0], [1, 1, 0]], dtype=float)\nWv = np.array([[2, 0, 1], [0, 1, 0], [1, 0, 2]], dtype=float)\nfor name, M in [(\"Q\", X @ Wq), (\"K\", X @ Wk), (\"V\", X @ Wv)]:\n    print(name + \":\")\n    for row in M:\n        print(\" \".join(f\"{v:.3f}\" for v in row))",
          "exampleLanguage": "python",
          "walkthrough": [
            "First, set up the input matrix and the three projection matrices.",
            "Next, multiply the input by each matrix to get Q, K and V.",
            "Then, print each matrix with its label.",
            "Finally, check that Q, K and V differ — if two are identical, a matrix was reused by mistake."
          ],
          "commonMistakes": [
            "Using the same weight matrix for Q, K and V, which stops the model from distinguishing what a token asks for from what it offers.",
            "Multiplying in the wrong order, which fails when the matrices are not square.",
            "Forgetting that Q, K and V are all computed from the same input X."
          ],
          "debugging": {
            "prompt": "The program below should print Q, K and V, but K is identical to Q. Find and fix the bug.",
            "buggyCode": "import numpy as np\nX = np.array([[1, 0, 2], [0, 1, 1]], dtype=float)\nWq = np.array([[1, 2, 0], [0, 1, 1], [1, 0, 1]], dtype=float)\nWk = np.array([[1, 0, 1], [0, 2, 0], [1, 1, 0]], dtype=float)\nK = X @ Wq\nprint(\"K:\")\nfor row in K:\n    print(\" \".join(f\"{v:.3f}\" for v in row))",
            "fixedCode": "import numpy as np\nX = np.array([[1, 0, 2], [0, 1, 1]], dtype=float)\nWq = np.array([[1, 2, 0], [0, 1, 1], [1, 0, 1]], dtype=float)\nWk = np.array([[1, 0, 1], [0, 2, 0], [1, 1, 0]], dtype=float)\nK = X @ Wk\nprint(\"K:\")\nfor row in K:\n    print(\" \".join(f\"{v:.3f}\" for v in row))",
            "explanation": "Each projection needs its own matrix: K was computed with Wq by mistake, so the keys equal the queries and the model cannot distinguish asking from offering."
          },
          "miniChallenge": "Change one entry of Wv and predict which output matrix changes before you run it.",
          "summary": "Q, K, and V Projections: three separate linear maps turn one input into a query, a key and a value — what a token asks for, what it offers, and what it contributes.",
          "quiz": [
            {
              "question": "What is the main purpose of having separate Q, K and V projections?",
              "options": [
                "So queries, keys and values can play different roles",
                "It raises an error and prints nothing.",
                "It prints nothing at all.",
                "It prints the raw input values unchanged."
              ],
              "answer": 0,
              "explanation": "Q, K and V are three different linear projections of the same input, so queries, keys and values can play different roles."
            },
            {
              "question": "What does this code print?\nimport numpy as np\nX = np.array([[1, 0, 2], [0, 1, 1]], dtype=float)\nWq = np.array([[1, 2, 0], [0, 1, 1], [1, 0, 1]], dtype=float)\nWk = np.array([[1, 0, 1], [0, 2, 0], [1, 1, 0]], dtype=float)\nWv = np.array([[2, 0, 1], [0, 1, 0], [1, 0, 2]], dtype=float)\nfor name, M in [(\"Q\", X @ Wq), (\"K\", X @ Wk), (\"V\", X @ Wv)]:\n    print(name + \":\")\n    for row in M:\n        print(\" \".join(f\"{v:.3f}\" for v in row))",
              "options": [
                "It prints the raw input values unchanged.",
                "Q:\n3.000 2.000 2.000\n1.000 1.000 2.000\nK:\n3.000 2.000 1.000\n1.000 3.000 0.000\nV:\n4.000 0.000 5.000\n1.000 1.000 2.000",
                "It raises an error and prints nothing.",
                "It prints nothing at all."
              ],
              "answer": 1,
              "explanation": "Q, K and V are X multiplied by Wq, Wk and Wv, printed with their labels."
            }
          ],
          "exercise": {
            "id": "llm-lightweight-python-m2-l5-e1",
            "title": "Compute Q, K and V",
            "type": "write-code",
            "instructions": "The projection matrices are fixed in the starter code. Read two lines of 3 numbers each — the input matrix X (2 rows x 3 columns). Print Q, K and V, each preceded by its label line, values rounded to 3 decimals.",
            "starterCode": "import numpy as np\nWq = np.array([[1, 2, 0], [0, 1, 1], [1, 0, 1]], dtype=float)\nWk = np.array([[1, 0, 1], [0, 2, 0], [1, 1, 0]], dtype=float)\nWv = np.array([[2, 0, 1], [0, 1, 0], [1, 0, 2]], dtype=float)\nX = np.array([[float(v) for v in input().split()] for _ in range(2)])\n# TODO: print Q, K and V, each with its label line.\n",
            "solution": "import numpy as np\nWq = np.array([[1, 2, 0], [0, 1, 1], [1, 0, 1]], dtype=float)\nWk = np.array([[1, 0, 1], [0, 2, 0], [1, 1, 0]], dtype=float)\nWv = np.array([[2, 0, 1], [0, 1, 0], [1, 0, 2]], dtype=float)\nX = np.array([[float(v) for v in input().split()] for _ in range(2)])\n# TODO: print Q, K and V, each with its label line.\nfor name, M in [(\"Q\", X @ Wq), (\"K\", X @ Wk), (\"V\", X @ Wv)]:\n    print(name + \":\")\n    for row in M:\n        print(\" \".join(f\"{v:.3f}\" for v in row))",
            "solutionExplanation": "Multiply X by each projection matrix in turn and print the results with their labels.",
            "complexity": "Easy",
            "tests": [
              {
                "name": "Example input",
                "stdin": "1 0 2\n0 1 1\n",
                "expectedStdout": "Q:\n3.000 2.000 2.000\n1.000 1.000 2.000\nK:\n3.000 2.000 1.000\n1.000 3.000 0.000\nV:\n4.000 0.000 5.000\n1.000 1.000 2.000",
                "hidden": false
              },
              {
                "name": "Second input",
                "stdin": "2 1 0\n1 0 3\n",
                "expectedStdout": "Q:\n2.000 5.000 1.000\n4.000 2.000 3.000\nK:\n2.000 2.000 2.000\n4.000 3.000 1.000\nV:\n4.000 1.000 2.000\n5.000 0.000 7.000",
                "hidden": true
              }
            ],
            "hintNotes": {
              "concept": "Q, K and V are three different linear projections of the same input: Q = X @ Wq, K = X @ Wk, V = X @ Wv.",
              "approach": "Multiply the input by each matrix in turn and print each result with its label.",
              "structure": "Read the two rows of X, compute the three products, print each with its label line."
            }
          }
        },
        {
          "id": "llm-lightweight-python-m2-l6",
          "slug": "llm-lightweight-python-m2-l6",
          "title": "Scaled Dot-Product Attention",
          "objectives": [
            "Explain how attention scores become weights",
            "Compute scaled dot-product attention by hand",
            "Explain why the scores are divided by the square root of the key size"
          ],
          "introduction": "Scaled Dot-Product Attention is a core skill in this track. In this lesson you will learn the heart of the transformer, compute attention weights and outputs, and practise them yourself.",
          "concept": "Scaled dot-product attention scores each key against a query, turns the scores into weights with a softmax, and returns a weighted sum of the values. The score is the dot product of the query and key, divided by the square root of the key size: without that scaling, dot products grow with dimension, the softmax saturates, and gradients vanish. Each output row is a mix of the value rows, weighted by how well each key matched the query.",
          "syntax": "scores = Q @ K.T / sqrt(d_k)\nweights = softmax(scores)\noutput = weights @ V",
          "analogy": "Attention is like a spotlight in a theatre: the query decides where to point it, the keys are the actors, and the values are what each actor says when the light hits them.",
          "exampleCode": "import numpy as np\nQ = np.array([[1, 0], [0, 1]], dtype=float)\nK = np.array([[1, 0], [0, 1]], dtype=float)\nV = np.array([[1, 2], [3, 4]], dtype=float)\nscores = Q @ K.T / np.sqrt(K.shape[1])\nw = np.exp(scores - scores.max(axis=1, keepdims=True))\nw = w / w.sum(axis=1, keepdims=True)\nprint(\"Weights:\")\nfor row in w:\n    print(\" \".join(f\"{v:.3f}\" for v in row))\nprint(\"Output:\")\nfor row in w @ V:\n    print(\" \".join(f\"{v:.3f}\" for v in row))",
          "exampleLanguage": "python",
          "walkthrough": [
            "First, compute the scores as Q times K transposed, divided by the square root of the key size.",
            "Next, turn each row of scores into weights with a numerically stable softmax.",
            "Then, multiply the weights by V to get the output.",
            "Finally, check that each weight row adds up to 1."
          ],
          "commonMistakes": [
            "Forgetting to divide the scores by the square root of the key size, so the softmax saturates and the model stops learning.",
            "Applying the softmax down the columns instead of across each row.",
            "Forgetting to subtract the row maximum before the exponential, which can overflow."
          ],
          "debugging": {
            "prompt": "The program below should print attention weights of about 0.67 and 0.33, but it prints 0.88 and 0.12. Find and fix the bug.",
            "buggyCode": "import numpy as np\nQ = np.array([[1, 0], [0, 1]], dtype=float)\nK = np.array([[1, 0], [0, 1]], dtype=float)\nscores = Q @ K.T\nw = np.exp(scores - scores.max(axis=1, keepdims=True))\nw = w / w.sum(axis=1, keepdims=True)\nfor row in w:\n    print(\" \".join(f\"{v:.3f}\" for v in row))",
            "fixedCode": "import numpy as np\nQ = np.array([[1, 0], [0, 1]], dtype=float)\nK = np.array([[1, 0], [0, 1]], dtype=float)\nscores = Q @ K.T / np.sqrt(K.shape[1])\nw = np.exp(scores - scores.max(axis=1, keepdims=True))\nw = w / w.sum(axis=1, keepdims=True)\nfor row in w:\n    print(\" \".join(f\"{v:.3f}\" for v in row))",
            "explanation": "Without the scale the scores are too large, so the softmax becomes overconfident: 0.88 and 0.12 instead of 0.67 and 0.33. Dividing by the square root of the key size keeps the scores in a range the softmax can use."
          },
          "miniChallenge": "Set V to the identity matrix and predict the output before you run it — what does the output equal then?",
          "summary": "Scaled Dot-Product Attention: scores are query-key dot products scaled by the square root of the key size, softened into weights, and used to mix the values.",
          "quiz": [
            {
              "question": "What is the main purpose of dividing attention scores by the square root of the key size?",
              "options": [
                "It prints the raw input values unchanged.",
                "To stop the softmax from saturating so gradients keep flowing",
                "It raises an error and prints nothing.",
                "It prints nothing at all."
              ],
              "answer": 1,
              "explanation": "Scaled dot-product attention scores each key against a query, turns the scores into weights with a softmax, and returns a weighted sum of the values — the scaling keeps the softmax from saturating."
            },
            {
              "question": "What does this code print?\nimport numpy as np\nQ = np.array([[1, 0], [0, 1]], dtype=float)\nK = np.array([[1, 0], [0, 1]], dtype=float)\nV = np.array([[1, 2], [3, 4]], dtype=float)\nscores = Q @ K.T / np.sqrt(K.shape[1])\nw = np.exp(scores - scores.max(axis=1, keepdims=True))\nw = w / w.sum(axis=1, keepdims=True)\nprint(\"Weights:\")\nfor row in w:\n    print(\" \".join(f\"{v:.3f}\" for v in row))\nprint(\"Output:\")\nfor row in w @ V:\n    print(\" \".join(f\"{v:.3f}\" for v in row))",
              "options": [
                "It prints nothing at all.",
                "It prints the raw input values unchanged.",
                "Weights:\n0.670 0.330\n0.330 0.670\nOutput:\n1.660 2.660\n2.340 3.340",
                "It raises an error and prints nothing."
              ],
              "answer": 2,
              "explanation": "The weights are the softmax of the scaled scores, and the output is the weights times V."
            }
          ],
          "exercise": {
            "id": "llm-lightweight-python-m2-l6-e1",
            "title": "Compute attention weights and output",
            "type": "write-code",
            "instructions": "Read 6 lines: 2 rows of Q, 2 rows of K, 2 rows of V (each row has 2 numbers). Compute scaled dot-product attention and print 'Weights:' followed by the 2x2 weight matrix, then 'Output:' followed by the 2x2 output, values rounded to 3 decimals.",
            "starterCode": "import numpy as np\nQ = np.array([[float(v) for v in input().split()] for _ in range(2)])\nK = np.array([[float(v) for v in input().split()] for _ in range(2)])\nV = np.array([[float(v) for v in input().split()] for _ in range(2)])\n# TODO: compute the attention weights and output, then print them.\n",
            "solution": "import numpy as np\nQ = np.array([[float(v) for v in input().split()] for _ in range(2)])\nK = np.array([[float(v) for v in input().split()] for _ in range(2)])\nV = np.array([[float(v) for v in input().split()] for _ in range(2)])\n# TODO: compute the attention weights and output, then print them.\nscores = Q @ K.T / np.sqrt(K.shape[1])\nw = np.exp(scores - scores.max(axis=1, keepdims=True))\nw = w / w.sum(axis=1, keepdims=True)\nprint(\"Weights:\")\nfor row in w:\n    print(\" \".join(f\"{v:.3f}\" for v in row))\nprint(\"Output:\")\nfor row in w @ V:\n    print(\" \".join(f\"{v:.3f}\" for v in row))",
            "solutionExplanation": "Scale the query-key scores, softmax each row, and multiply the weights by V.",
            "complexity": "Medium",
            "tests": [
              {
                "name": "Example input",
                "stdin": "1 0\n0 1\n1 0\n0 1\n1 2\n3 4\n",
                "expectedStdout": "Weights:\n0.670 0.330\n0.330 0.670\nOutput:\n1.660 2.660\n2.340 3.340",
                "hidden": false
              },
              {
                "name": "Second input",
                "stdin": "2 1\n0 1\n1 2\n2 0\n5 6\n7 8\n",
                "expectedStdout": "Weights:\n0.500 0.500\n0.804 0.196\nOutput:\n6.000 7.000\n5.391 6.391",
                "hidden": true
              }
            ],
            "hintNotes": {
              "concept": "Scaled dot-product attention: scores are Q @ K.T divided by the square root of the key size, softened with a softmax, then multiplied by V.",
              "approach": "Compute the scaled scores, apply a row-wise softmax with the max subtracted first, then multiply by V.",
              "structure": "Read Q, K and V, compute scores and weights, print the weights and the output with labels."
            }
          }
        },
        {
          "id": "llm-lightweight-python-m2-l7",
          "slug": "llm-lightweight-python-m2-l7",
          "title": "Causal Masking",
          "objectives": [
            "Explain why a language model must not see the future",
            "Apply a causal mask to attention scores",
            "Explain why masking happens before the softmax, not after"
          ],
          "introduction": "Causal Masking is a core skill in this track. In this lesson you will learn how the model is stopped from peeking at the future, apply the mask yourself, and practise it in code.",
          "concept": "A causal mask hides future positions from each token by setting their attention scores to negative infinity before the softmax. After the softmax those weights become exactly zero, so a token can only mix information from itself and earlier tokens. This is what makes the model a valid next-token predictor: without it the model could peek at the answer during training and would learn nothing useful.",
          "syntax": "scores = where(mask, -1e9, scores)\nweights = softmax(scores)",
          "analogy": "A causal mask is like an exam with the answers on the next page: the model may read everything up to the current question, but the future pages are sealed.",
          "exampleCode": "import numpy as np\nscores = np.array([[0, 1, 2], [1, 0, 1], [2, 1, 0]], dtype=float)\nmask = np.triu(np.ones_like(scores, dtype=bool), k=1)\nscores = np.where(mask, -1e9, scores)\nw = np.exp(scores - scores.max(axis=1, keepdims=True))\nw = w / w.sum(axis=1, keepdims=True)\nfor row in w:\n    print(\" \".join(f\"{v:.3f}\" for v in row))",
          "exampleLanguage": "python",
          "walkthrough": [
            "First, build the mask: the upper triangle above the diagonal is True.",
            "Next, replace the masked scores with -1e9.",
            "Then, apply a row-wise softmax.",
            "Finally, check that every row has zeros after the diagonal."
          ],
          "commonMistakes": [
            "Masking after the softmax instead of before it, which leaves the future weights non-zero because the mask no longer changes the normalized values.",
            "Masking with 0 instead of a large negative number, which leaves real scores in the future positions.",
            "Masking the diagonal as well, so a token cannot attend to itself."
          ],
          "debugging": {
            "prompt": "The program below should print a first row of 1.000 0.000 0.000, but the first row is 0.090 0.245 0.665. Find and fix the bug.",
            "buggyCode": "import numpy as np\nscores = np.array([[0, 1, 2], [1, 0, 1], [2, 1, 0]], dtype=float)\nmask = np.triu(np.ones_like(scores, dtype=bool), k=1)\nscores = np.where(mask, 0, scores)\nw = np.exp(scores - scores.max(axis=1, keepdims=True))\nw = w / w.sum(axis=1, keepdims=True)\nfor row in w:\n    print(\" \".join(f\"{v:.3f}\" for v in row))",
            "fixedCode": "import numpy as np\nscores = np.array([[0, 1, 2], [1, 0, 1], [2, 1, 0]], dtype=float)\nmask = np.triu(np.ones_like(scores, dtype=bool), k=1)\nscores = np.where(mask, -1e9, scores)\nw = np.exp(scores - scores.max(axis=1, keepdims=True))\nw = w / w.sum(axis=1, keepdims=True)\nfor row in w:\n    print(\" \".join(f\"{v:.3f}\" for v in row))",
            "explanation": "Masking with 0 leaves the real future scores in place, so the softmax still gives them weight. Only a very negative value like -1e9 makes the future weights exactly zero."
          },
          "miniChallenge": "Change the score matrix so the second row is [0, 0, 0] and predict the second row of weights before you run it.",
          "summary": "Causal Masking: future scores are set to negative infinity before the softmax, so each token can only attend to itself and the past.",
          "quiz": [
            {
              "question": "What is the main purpose of a causal mask?",
              "options": [
                "It prints nothing at all.",
                "It prints the raw input values unchanged.",
                "To hide future positions so the model cannot peek at the answer",
                "It raises an error and prints nothing."
              ],
              "answer": 2,
              "explanation": "A causal mask hides future positions from each token by setting their attention scores to negative infinity before the softmax."
            },
            {
              "question": "What does this code print?\nimport numpy as np\nscores = np.array([[0, 1, 2], [1, 0, 1], [2, 1, 0]], dtype=float)\nmask = np.triu(np.ones_like(scores, dtype=bool), k=1)\nscores = np.where(mask, -1e9, scores)\nw = np.exp(scores - scores.max(axis=1, keepdims=True))\nw = w / w.sum(axis=1, keepdims=True)\nfor row in w:\n    print(\" \".join(f\"{v:.3f}\" for v in row))",
              "options": [
                "It raises an error and prints nothing.",
                "It prints nothing at all.",
                "It prints the raw input values unchanged.",
                "1.000 0.000 0.000\n0.731 0.269 0.000\n0.665 0.245 0.090"
              ],
              "answer": 3,
              "explanation": "The mask zeroes the future weights, so each row only mixes the past: 1.000 0.000 0.000, then 0.731 0.269 0.000, then 0.665 0.245 0.090."
            }
          ],
          "exercise": {
            "id": "llm-lightweight-python-m2-l7-e1",
            "title": "Apply a causal mask and softmax",
            "type": "write-code",
            "instructions": "Read 3 lines of 3 numbers each — an attention score matrix. Apply a causal mask (positions above the diagonal become -1e9) and a row-wise softmax, then print the 3x3 weight matrix, values rounded to 3 decimals.",
            "starterCode": "import numpy as np\nscores = np.array([[float(v) for v in input().split()] for _ in range(3)])\n# TODO: mask the future, softmax each row, and print the weights.\n",
            "solution": "import numpy as np\nscores = np.array([[float(v) for v in input().split()] for _ in range(3)])\n# TODO: mask the future, softmax each row, and print the weights.\nmask = np.triu(np.ones_like(scores, dtype=bool), k=1)\nscores = np.where(mask, -1e9, scores)\nw = np.exp(scores - scores.max(axis=1, keepdims=True))\nw = w / w.sum(axis=1, keepdims=True)\nfor row in w:\n    print(\" \".join(f\"{v:.3f}\" for v in row))",
            "solutionExplanation": "Build the upper-triangle mask, replace masked scores with -1e9, then softmax each row.",
            "complexity": "Easy",
            "tests": [
              {
                "name": "Example input",
                "stdin": "0 1 2\n1 0 1\n2 1 0\n",
                "expectedStdout": "1.000 0.000 0.000\n0.731 0.269 0.000\n0.665 0.245 0.090",
                "hidden": false
              },
              {
                "name": "Second input",
                "stdin": "1 2 0\n0 1 3\n2 0 1\n",
                "expectedStdout": "1.000 0.000 0.000\n0.269 0.731 0.000\n0.665 0.090 0.245",
                "hidden": true
              }
            ],
            "hintNotes": {
              "concept": "A causal mask sets future scores to -1e9 before the softmax, so the future weights become exactly zero.",
              "approach": "Build the upper-triangle mask with np.triu, replace masked scores, then apply a row-wise softmax.",
              "structure": "Read the 3x3 score matrix, mask it, softmax it, print the weights."
            }
          }
        },
        {
          "id": "llm-lightweight-python-m2-l8",
          "slug": "llm-lightweight-python-m2-l8",
          "title": "Multi-Head Attention",
          "objectives": [
            "Explain why attention is split into several heads",
            "Compute two-head attention by hand",
            "Explain what the final output projection does"
          ],
          "introduction": "Multi-Head Attention is a core skill in this track. In this lesson you will learn why heads split the work, run two heads in parallel, and practise it yourself.",
          "concept": "Multi-head attention splits the model width into several smaller attention heads that run in parallel and are concatenated back together. Each head gets its own slice of Q, K and V, so different heads can learn different relations — one might track the previous word while another tracks the subject of the sentence. The concatenated heads pass through one final output projection that mixes what the heads found.",
          "syntax": "head_h = attention(Q_h, K_h, V_h)\noutput = concat(heads) @ Wo",
          "analogy": "Multi-head attention is like a team of editors reading the same draft: each one looks for something different, and the final version combines what they all found.",
          "exampleCode": "import numpy as np\nX = np.array([[2, 0, 1, 1], [1, 2, 0, 1]], dtype=float)\nrng = np.random.default_rng(12)\nWq = rng.integers(-1, 2, size=(4, 4)).astype(float)\nWk = rng.integers(-1, 2, size=(4, 4)).astype(float)\nWv = rng.integers(-1, 2, size=(4, 4)).astype(float)\nWo = rng.integers(-1, 2, size=(4, 4)).astype(float)\nQ, K, V = X @ Wq, X @ Wk, X @ Wv\nouts = []\nfor h in range(2):\n    q, k, v = Q[:, h*2:(h+1)*2], K[:, h*2:(h+1)*2], V[:, h*2:(h+1)*2]\n    s = q @ k.T / np.sqrt(2)\n    w = np.exp(s - s.max(axis=1, keepdims=True))\n    w = w / w.sum(axis=1, keepdims=True)\n    outs.append(w @ v)\nconcat = np.concatenate(outs, axis=1)\nprint(\"Heads:\")\nfor row in concat:\n    print(\" \".join(f\"{v:.3f}\" for v in row))\nprint(\"Output:\")\nfor row in concat @ Wo:\n    print(\" \".join(f\"{v:.3f}\" for v in row))",
          "exampleLanguage": "python",
          "walkthrough": [
            "First, compute Q, K and V from the input with the four projection matrices.",
            "Next, split each of them into two heads of width 2.",
            "Then, run scaled dot-product attention inside each head and concatenate the results.",
            "Finally, apply the output projection Wo and print the heads and the output."
          ],
          "commonMistakes": [
            "Concatenating the heads but forgetting the final output projection, so the heads' findings are never mixed back into the model width.",
            "Splitting the heads along the wrong axis, which mixes rows instead of columns.",
            "Giving every head the same slice of Q, K and V, so the heads all learn the same thing."
          ],
          "debugging": {
            "prompt": "The program below should print a 2x4 output that depends on Wo, but the output is the same no matter what Wo is. Find and fix the bug.",
            "buggyCode": "import numpy as np\nrng = np.random.default_rng(12)\nWq = rng.integers(-1, 2, size=(4, 4)).astype(float)\nWk = rng.integers(-1, 2, size=(4, 4)).astype(float)\nWv = rng.integers(-1, 2, size=(4, 4)).astype(float)\nWo = rng.integers(-1, 2, size=(4, 4)).astype(float)\nconcat = np.array([[-0.887, -0.915, 3.0, 2.0], [0.321, -0.009, 3.0, 2.0]])\nout = concat\nfor row in out:\n    print(\" \".join(f\"{v:.3f}\" for v in row))",
            "fixedCode": "import numpy as np\nrng = np.random.default_rng(12)\nWq = rng.integers(-1, 2, size=(4, 4)).astype(float)\nWk = rng.integers(-1, 2, size=(4, 4)).astype(float)\nWv = rng.integers(-1, 2, size=(4, 4)).astype(float)\nWo = rng.integers(-1, 2, size=(4, 4)).astype(float)\nconcat = np.array([[-0.887, -0.915, 3.0, 2.0], [0.321, -0.009, 3.0, 2.0]])\nout = concat @ Wo\nfor row in out:\n    print(\" \".join(f\"{v:.3f}\" for v in row))",
            "explanation": "The concatenated heads must pass through the output projection Wo: without it the block returns the raw head outputs and Wo has no effect at all."
          },
          "miniChallenge": "Change one entry of Wo and predict which output values change before you run it.",
          "summary": "Multi-Head Attention: the model width is split into heads that attend in parallel, then concatenated and mixed back together by one output projection.",
          "quiz": [
            {
              "question": "What is the main purpose of multi-head attention?",
              "options": [
                "It raises an error and prints nothing.",
                "It prints nothing at all.",
                "It prints the raw input values unchanged.",
                "To let different heads learn different relations in parallel"
              ],
              "answer": 3,
              "explanation": "Multi-head attention splits the model width into several smaller attention heads that run in parallel and are concatenated back together."
            },
            {
              "question": "What does this code print?\nimport numpy as np\nX = np.array([[2, 0, 1, 1], [1, 2, 0, 1]], dtype=float)\nrng = np.random.default_rng(12)\nWq = rng.integers(-1, 2, size=(4, 4)).astype(float)\nWk = rng.integers(-1, 2, size=(4, 4)).astype(float)\nWv = rng.integers(-1, 2, size=(4, 4)).astype(float)\nWo = rng.integers(-1, 2, size=(4, 4)).astype(float)\nQ, K, V = X @ Wq, X @ Wk, X @ Wv\nouts = []\nfor h in range(2):\n    q, k, v = Q[:, h*2:(h+1)*2], K[:, h*2:(h+1)*2], V[:, h*2:(h+1)*2]\n    s = q @ k.T / np.sqrt(2)\n    w = np.exp(s - s.max(axis=1, keepdims=True))\n    w = w / w.sum(axis=1, keepdims=True)\n    outs.append(w @ v)\nconcat = np.concatenate(outs, axis=1)\nprint(\"Heads:\")\nfor row in concat:\n    print(\" \".join(f\"{v:.3f}\" for v in row))\nprint(\"Output:\")\nfor row in concat @ Wo:\n    print(\" \".join(f\"{v:.3f}\" for v in row))",
              "options": [
                "Heads:\n-0.887 -0.915 3.000 2.000\n0.321 -0.009 3.000 2.000\nOutput:\n6.802 2.887 5.028 -4.802\n4.688 1.679 5.330 -2.688",
                "It raises an error and prints nothing.",
                "It prints nothing at all.",
                "It prints the raw input values unchanged."
              ],
              "answer": 0,
              "explanation": "The two heads are concatenated and then mixed by the output projection Wo."
            }
          ],
          "exercise": {
            "id": "llm-lightweight-python-m2-l8-e1",
            "title": "Compute two-head attention",
            "type": "write-code",
            "instructions": "The four projection matrices are fixed in the starter code (seed 12). Read two lines of 4 numbers each — the input matrix X (2 rows x 4 columns). Split Q, K and V into 2 heads of width 2, run scaled dot-product attention in each head (no mask), concatenate the head outputs and apply the output projection Wo. Print 'Heads:' followed by the concatenated 2x4 matrix, then 'Output:' followed by the projected 2x4 matrix, values rounded to 3 decimals.",
            "starterCode": "import numpy as np\nrng = np.random.default_rng(12)\nWq = rng.integers(-1, 2, size=(4, 4)).astype(float)\nWk = rng.integers(-1, 2, size=(4, 4)).astype(float)\nWv = rng.integers(-1, 2, size=(4, 4)).astype(float)\nWo = rng.integers(-1, 2, size=(4, 4)).astype(float)\nX = np.array([[float(v) for v in input().split()] for _ in range(2)])\n# TODO: run two-head attention, then print the heads and the output.\n",
            "solution": "import numpy as np\nrng = np.random.default_rng(12)\nWq = rng.integers(-1, 2, size=(4, 4)).astype(float)\nWk = rng.integers(-1, 2, size=(4, 4)).astype(float)\nWv = rng.integers(-1, 2, size=(4, 4)).astype(float)\nWo = rng.integers(-1, 2, size=(4, 4)).astype(float)\nX = np.array([[float(v) for v in input().split()] for _ in range(2)])\n# TODO: run two-head attention, then print the heads and the output.\nQ, K, V = X @ Wq, X @ Wk, X @ Wv\nouts = []\nfor h in range(2):\n    q, k, v = Q[:, h*2:(h+1)*2], K[:, h*2:(h+1)*2], V[:, h*2:(h+1)*2]\n    s = q @ k.T / np.sqrt(2)\n    w = np.exp(s - s.max(axis=1, keepdims=True))\n    w = w / w.sum(axis=1, keepdims=True)\n    outs.append(w @ v)\nconcat = np.concatenate(outs, axis=1)\nprint(\"Heads:\")\nfor row in concat:\n    print(\" \".join(f\"{v:.3f}\" for v in row))\nprint(\"Output:\")\nfor row in concat @ Wo:\n    print(\" \".join(f\"{v:.3f}\" for v in row))",
            "solutionExplanation": "Split Q, K and V into two heads, run attention in each, concatenate the results and apply Wo.",
            "complexity": "Medium",
            "tests": [
              {
                "name": "Example input",
                "stdin": "2 0 1 1\n1 2 0 1\n",
                "expectedStdout": "Heads:\n-0.887 -0.915 3.000 2.000\n0.321 -0.009 3.000 2.000\nOutput:\n6.802 2.887 5.028 -4.802\n4.688 1.679 5.330 -2.688",
                "hidden": false
              },
              {
                "name": "Second input",
                "stdin": "0 2 1 1\n1 0 2 2\n",
                "expectedStdout": "Heads:\n1.679 2.679 4.413 4.022\n-0.777 0.223 2.991 1.651\nOutput:\n4.077 2.343 7.435 -0.055\n5.195 2.428 3.642 -3.544",
                "hidden": true
              }
            ],
            "hintNotes": {
              "concept": "Multi-head attention: split Q, K and V into heads, run attention in each, concatenate, then apply the output projection Wo.",
              "approach": "Loop over the two heads, slicing columns h*2:(h+1)*2, run scaled dot-product attention, then concatenate and multiply by Wo.",
              "structure": "Read X, compute Q/K/V, run each head, print 'Heads:' and 'Output:' with the matrices."
            }
          }
        }
      ]
    },
    {
      "id": "llm-lightweight-python-m3",
      "title": "The Transformer Block and Training",
      "description": "Layer norm, residuals, the feed-forward network, the output head, loss, the optimizer and the training loop that ties it all together.",
      "level": "intermediate",
      "order": 3,
      "lessons": [
        {
          "id": "llm-lightweight-python-m3-l9",
          "slug": "llm-lightweight-python-m3-l9",
          "title": "The Transformer Block",
          "objectives": [
            "Explain layer normalization",
            "Explain why residual connections matter",
            "Run the feed-forward half of a transformer block"
          ],
          "introduction": "The Transformer Block is a core skill in this track. In this lesson you will learn how a block refines its input, run layer norm and the feed-forward network, and practise them yourself.",
          "concept": "A transformer block applies layer normalization, attention or a feed-forward network, and adds the result back to its input through a residual connection. The residual connection is what lets gradients flow through many layers without vanishing, and layer normalization keeps the activations on a stable scale so training does not diverge. The feed-forward network — two linear layers with a ReLU between them — is where most of the model's parameters live and where it stores what it has learned.",
          "syntax": "h = layernorm(x)\nffn = relu(h @ W1 + b1) @ W2 + b2\ny = x + ffn",
          "analogy": "A transformer block is like editing a draft with track changes: the block proposes changes, and the residual connection keeps the original text underneath so nothing is ever lost.",
          "exampleCode": "import numpy as np\nx = np.array([1, 2, 3, 4], dtype=float)\nrng = np.random.default_rng(11)\nW1 = rng.integers(-1, 2, size=(4, 8)).astype(float)\nb1 = rng.integers(-1, 2, size=8).astype(float)\nW2 = rng.integers(-1, 2, size=(8, 4)).astype(float)\nb2 = rng.integers(-1, 2, size=4).astype(float)\nmu, var = x.mean(), x.var()\nh = (x - mu) / np.sqrt(var + 1e-5)\ny = x + np.maximum(0, h @ W1 + b1) @ W2 + b2\nprint(\" \".join(f\"{v:.3f}\" for v in y))",
          "exampleLanguage": "python",
          "walkthrough": [
            "First, layer-normalize the input: subtract the mean and divide by the standard deviation.",
            "Next, run the normalized vector through the feed-forward network: linear, ReLU, linear.",
            "Then, add the result back to the original input through the residual connection.",
            "Finally, print the refined vector with values rounded to 3 decimals."
          ],
          "commonMistakes": [
            "Forgetting the residual connection and returning only the feed-forward output, which throws away the input the block was meant to refine.",
            "Normalizing across the batch instead of across the features of one token.",
            "Applying the ReLU after the second linear layer instead of between the two layers."
          ],
          "debugging": {
            "prompt": "The program below should print a result close to the input plus a small correction, but the output is far from the input. Find and fix the bug.",
            "buggyCode": "import numpy as np\nx = np.array([1, 2, 3, 4], dtype=float)\nrng = np.random.default_rng(11)\nW1 = rng.integers(-1, 2, size=(4, 8)).astype(float)\nb1 = rng.integers(-1, 2, size=8).astype(float)\nW2 = rng.integers(-1, 2, size=(8, 4)).astype(float)\nb2 = rng.integers(-1, 2, size=4).astype(float)\nmu, var = x.mean(), x.var()\nh = (x - mu) / np.sqrt(var + 1e-5)\ny = np.maximum(0, h @ W1 + b1) @ W2 + b2\nprint(\" \".join(f\"{v:.3f}\" for v in y))",
            "fixedCode": "import numpy as np\nx = np.array([1, 2, 3, 4], dtype=float)\nrng = np.random.default_rng(11)\nW1 = rng.integers(-1, 2, size=(4, 8)).astype(float)\nb1 = rng.integers(-1, 2, size=8).astype(float)\nW2 = rng.integers(-1, 2, size=(8, 4)).astype(float)\nb2 = rng.integers(-1, 2, size=4).astype(float)\nmu, var = x.mean(), x.var()\nh = (x - mu) / np.sqrt(var + 1e-5)\ny = x + np.maximum(0, h @ W1 + b1) @ W2 + b2\nprint(\" \".join(f\"{v:.3f}\" for v in y))",
            "explanation": "Without adding x back, the block replaces its input instead of refining it: the residual connection is what keeps the original information and lets gradients flow."
          },
          "miniChallenge": "Set W1 and W2 to zeros and predict the output before you run it — what does the residual connection give you then?",
          "summary": "The Transformer Block: layer norm, a sub-layer, and a residual connection that adds the result back to the input — the feed-forward network is where most parameters live.",
          "quiz": [
            {
              "question": "What is the main purpose of a residual connection?",
              "options": [
                "To let gradients flow through many layers and keep the original input",
                "It raises an error and prints nothing.",
                "It prints nothing at all.",
                "It prints the raw input values unchanged."
              ],
              "answer": 0,
              "explanation": "A transformer block applies layer normalization, attention or a feed-forward network, and adds the result back to its input through a residual connection."
            },
            {
              "question": "What does this code print?\nimport numpy as np\nx = np.array([1, 2, 3, 4], dtype=float)\nrng = np.random.default_rng(11)\nW1 = rng.integers(-1, 2, size=(4, 8)).astype(float)\nb1 = rng.integers(-1, 2, size=8).astype(float)\nW2 = rng.integers(-1, 2, size=(8, 4)).astype(float)\nb2 = rng.integers(-1, 2, size=4).astype(float)\nmu, var = x.mean(), x.var()\nh = (x - mu) / np.sqrt(var + 1e-5)\ny = x + np.maximum(0, h @ W1 + b1) @ W2 + b2\nprint(\" \".join(f\"{v:.3f}\" for v in y))",
              "options": [
                "It prints the raw input values unchanged.",
                "-0.236 6.578 4.658 -3.814",
                "It raises an error and prints nothing.",
                "It prints nothing at all."
              ],
              "answer": 1,
              "explanation": "The input is layer-normalized, passed through the feed-forward network, and added back to the input."
            }
          ],
          "exercise": {
            "id": "llm-lightweight-python-m3-l9-e1",
            "title": "Run the feed-forward half of a transformer block",
            "type": "write-code",
            "instructions": "The weights are fixed in the starter code (seed 11). Read one line of 4 numbers — the input vector x. Layer-normalize x, run it through the feed-forward network (ReLU between the two linear layers), add the residual connection, and print the result, values rounded to 3 decimals.",
            "starterCode": "import numpy as np\nrng = np.random.default_rng(11)\nW1 = rng.integers(-1, 2, size=(4, 8)).astype(float)\nb1 = rng.integers(-1, 2, size=8).astype(float)\nW2 = rng.integers(-1, 2, size=(8, 4)).astype(float)\nb2 = rng.integers(-1, 2, size=4).astype(float)\nx = np.array([float(v) for v in input().split()])\n# TODO: layer-normalize x, run the feed-forward network, add the residual.\n",
            "solution": "import numpy as np\nrng = np.random.default_rng(11)\nW1 = rng.integers(-1, 2, size=(4, 8)).astype(float)\nb1 = rng.integers(-1, 2, size=8).astype(float)\nW2 = rng.integers(-1, 2, size=(8, 4)).astype(float)\nb2 = rng.integers(-1, 2, size=4).astype(float)\nx = np.array([float(v) for v in input().split()])\n# TODO: layer-normalize x, run the feed-forward network, add the residual.\nmu, var = x.mean(), x.var()\nh = (x - mu) / np.sqrt(var + 1e-5)\ny = x + np.maximum(0, h @ W1 + b1) @ W2 + b2\nprint(\" \".join(f\"{v:.3f}\" for v in y))",
            "solutionExplanation": "Normalize the input, apply the two linear layers with a ReLU between them, and add the result back to the input.",
            "complexity": "Medium",
            "tests": [
              {
                "name": "Example input",
                "stdin": "1 2 3 4\n",
                "expectedStdout": "-0.236 6.578 4.658 -3.814",
                "hidden": false
              },
              {
                "name": "Second input",
                "stdin": "0 1 -1 2\n",
                "expectedStdout": "-1.236 1.106 -0.447 0.553",
                "hidden": true
              }
            ],
            "hintNotes": {
              "concept": "A transformer block: layer-normalize the input, run it through the feed-forward network, and add the result back with the residual connection.",
              "approach": "Compute the mean and variance of x, normalize, apply ReLU between the two linear layers, then add x.",
              "structure": "Read x, layer-normalize it, run the feed-forward network, add the residual and print."
            }
          }
        },
        {
          "id": "llm-lightweight-python-m3-l10",
          "slug": "llm-lightweight-python-m3-l10",
          "title": "The Output Head and Softmax",
          "objectives": [
            "Explain how hidden states become next-token probabilities",
            "Compute logits and a softmax by hand",
            "Explain tied vs untied output heads"
          ],
          "introduction": "The Output Head and Softmax is a core skill in this track. In this lesson you will learn how the model turns its final hidden state into a prediction, compute it yourself, and practise it in code.",
          "concept": "The output head turns the final hidden state into one logit per vocabulary token, and a softmax turns those logits into probabilities. In a tied model the head is just the token embedding table transposed, so the same vectors that represent tokens on the way in score them on the way out. The next token is the argmax of the probabilities for greedy decoding, or a sample from the distribution when you want varied text.",
          "syntax": "logits = h @ W_out\nprobs = softmax(logits)\nnext = argmax(probs)",
          "analogy": "The output head is like a voting booth: every token in the vocabulary casts a score, the softmax turns the scores into vote shares, and greedy decoding picks the winner.",
          "exampleCode": "import numpy as np\nh = np.array([1, 0, 2, 1], dtype=float)\nWo = np.random.default_rng(13).normal(0, 0.5, (4, 5))\nlogits = h @ Wo\np = np.exp(logits - logits.max())\np = p / p.sum()\nprint(\"Probabilities:\", \" \".join(f\"{v:.3f}\" for v in p))\nprint(\"Next token:\", int(np.argmax(p)))",
          "exampleLanguage": "python",
          "walkthrough": [
            "First, multiply the hidden state by the output matrix to get one logit per token.",
            "Next, apply a numerically stable softmax: subtract the maximum logit first.",
            "Then, print the probabilities and the argmax.",
            "Finally, check that the probabilities add up to 1."
          ],
          "commonMistakes": [
            "Calling softmax without subtracting the maximum logit first, which can overflow to infinity when the logits are large.",
            "Forgetting that the logits have one entry per vocabulary token, not per position.",
            "Using the raw logits as probabilities without the softmax."
          ],
          "debugging": {
            "prompt": "The program below should print probabilities that sum to 1, but it prints nan values. Find and fix the bug.",
            "buggyCode": "import numpy as np\nlogits = np.array([1000.0, 1001.0, 999.0, 1002.0, 998.0])\np = np.exp(logits) / np.exp(logits).sum()\nprint(\"Probabilities:\", \" \".join(f\"{v:.3f}\" for v in p))\nprint(\"Next token:\", int(np.argmax(p)))",
            "fixedCode": "import numpy as np\nlogits = np.array([1000.0, 1001.0, 999.0, 1002.0, 998.0])\np = np.exp(logits - logits.max())\np = p / p.sum()\nprint(\"Probabilities:\", \" \".join(f\"{v:.3f}\" for v in p))\nprint(\"Next token:\", int(np.argmax(p)))",
            "explanation": "exp of a large number overflows to infinity, so the probabilities become nan. Subtracting the maximum logit first keeps the largest exponent at 0 and leaves the ratios unchanged."
          },
          "miniChallenge": "Set all logits equal and predict the probabilities before you run it.",
          "summary": "The Output Head and Softmax: the hidden state becomes one logit per token, the softmax turns logits into probabilities, and the argmax is the greedy next token.",
          "quiz": [
            {
              "question": "What is the main purpose of the output head?",
              "options": [
                "It prints the raw input values unchanged.",
                "To turn the final hidden state into one logit per vocabulary token",
                "It raises an error and prints nothing.",
                "It prints nothing at all."
              ],
              "answer": 1,
              "explanation": "The output head turns the final hidden state into one logit per vocabulary token, and a softmax turns those logits into probabilities."
            },
            {
              "question": "What does this code print?\nimport numpy as np\nh = np.array([1, 0, 2, 1], dtype=float)\nWo = np.random.default_rng(13).normal(0, 0.5, (4, 5))\nlogits = h @ Wo\np = np.exp(logits - logits.max())\np = p / p.sum()\nprint(\"Probabilities:\", \" \".join(f\"{v:.3f}\" for v in p))\nprint(\"Next token:\", int(np.argmax(p)))",
              "options": [
                "It prints nothing at all.",
                "It prints the raw input values unchanged.",
                "Probabilities: 0.249 0.010 0.042 0.408 0.290\nNext token: 3",
                "It raises an error and prints nothing."
              ],
              "answer": 2,
              "explanation": "The logits are softened into probabilities, and token 3 has the highest probability."
            }
          ],
          "exercise": {
            "id": "llm-lightweight-python-m3-l10-e1",
            "title": "Turn a hidden state into next-token probabilities",
            "type": "write-code",
            "instructions": "The output matrix is fixed in the starter code (seed 13, shape 4x5). Read one line of 4 numbers — the hidden state h. Compute logits = h @ W_out, apply a numerically stable softmax, and print 'Probabilities: ' followed by the 5 probabilities rounded to 3 decimals, then 'Next token: ' followed by the argmax.",
            "starterCode": "import numpy as np\nW_out = np.random.default_rng(13).normal(0, 0.5, (4, 5))\nh = np.array([float(v) for v in input().split()])\n# TODO: compute the logits, softmax them, and print the probabilities and the next token.\n",
            "solution": "import numpy as np\nW_out = np.random.default_rng(13).normal(0, 0.5, (4, 5))\nh = np.array([float(v) for v in input().split()])\n# TODO: compute the logits, softmax them, and print the probabilities and the next token.\nlogits = h @ W_out\np = np.exp(logits - logits.max())\np = p / p.sum()\nprint(\"Probabilities:\", \" \".join(f\"{v:.3f}\" for v in p))\nprint(\"Next token:\", int(np.argmax(p)))",
            "solutionExplanation": "Multiply h by the output matrix, softmax the logits with the max subtracted first, and take the argmax.",
            "complexity": "Easy",
            "tests": [
              {
                "name": "Example input",
                "stdin": "1 0 2 1\n",
                "expectedStdout": "Probabilities: 0.249 0.010 0.042 0.408 0.290\nNext token: 3",
                "hidden": false
              },
              {
                "name": "Second input",
                "stdin": "0 1 1 2\n",
                "expectedStdout": "Probabilities: 0.092 0.145 0.015 0.596 0.152\nNext token: 3",
                "hidden": true
              }
            ],
            "hintNotes": {
              "concept": "The output head turns a hidden state into logits, and a softmax turns logits into probabilities: subtract the maximum logit first for stability.",
              "approach": "Compute logits = h @ W_out, subtract the max, exponentiate, normalize, and take the argmax.",
              "structure": "Read h, compute the logits, softmax them, print the probabilities and the next token."
            }
          }
        },
        {
          "id": "llm-lightweight-python-m3-l11",
          "slug": "llm-lightweight-python-m3-l11",
          "title": "Cross-Entropy Loss and the Optimizer",
          "objectives": [
            "Explain what cross-entropy loss measures",
            "Compute the gradient of the loss with respect to the logits",
            "Take one optimizer step by hand"
          ],
          "introduction": "Cross-Entropy Loss and the Optimizer is a core skill in this track. In this lesson you will learn how the model is scored and how its weights actually move, compute one update yourself, and practise it in code.",
          "concept": "Cross-entropy loss is the negative log probability the model assigns to the correct next token, and its gradient with respect to the logits is the predicted probabilities minus a one-hot vector. That gradient is what the optimizer uses: each weight moves a small step against its gradient, so the correct token becomes more likely and the others less likely. Adam improves on plain SGD by giving every parameter its own adaptive step size from running averages of the gradient and its square.",
          "syntax": "loss = -log(p[target])\ngrad = p - onehot(target)\nweights -= lr * grad",
          "analogy": "The loss is like a scoreboard and the optimizer is the coach: the scoreboard says how wrong the last play was, and the coach moves every player a small step in the direction that would have scored.",
          "exampleCode": "import numpy as np\nlogits = np.array([2.0, 1.0, 0.5, 0.2, 0.1])\ntarget, lr = 0, 0.1\np = np.exp(logits - logits.max())\np = p / p.sum()\nloss = -np.log(p[target])\ngrad = p.copy()\ngrad[target] -= 1.0\nprint(f\"Loss: {loss:.4f}\")\nprint(\"Gradient:\", \" \".join(f\"{v:.4f}\" for v in grad))\nprint(\"Updated logits:\", \" \".join(f\"{v:.4f}\" for v in logits - lr * grad))",
          "exampleLanguage": "python",
          "walkthrough": [
            "First, turn the logits into probabilities with a stable softmax.",
            "Next, take the negative log of the probability of the correct token: that is the loss.",
            "Then, build the gradient: the probabilities, minus 1 at the target position.",
            "Finally, subtract the learning rate times the gradient from the logits and print everything."
          ],
          "commonMistakes": [
            "Using the probabilities themselves as the gradient and forgetting to subtract 1 at the target position, so the correct token never gets pushed up.",
            "Averaging the loss over all tokens instead of scoring only the correct token.",
            "Using a learning rate so large that the weights jump past the minimum and the loss grows."
          ],
          "debugging": {
            "prompt": "The program below should print a loss of about 0.6449, but it prints 1.3863. Find and fix the bug.",
            "buggyCode": "import numpy as np\nlogits = np.array([2.0, 1.0, 0.5, 0.2, 0.1])\ntarget = 0\np = np.exp(logits - logits.max())\np = p / p.sum()\nloss = -np.log(p).mean()\nprint(f\"Loss: {loss:.4f}\")",
            "fixedCode": "import numpy as np\nlogits = np.array([2.0, 1.0, 0.5, 0.2, 0.1])\ntarget = 0\np = np.exp(logits - logits.max())\np = p / p.sum()\nloss = -np.log(p[target])\nprint(f\"Loss: {loss:.4f}\")",
            "explanation": "Cross-entropy only scores the correct token: averaging the negative log probabilities over all five tokens gives 1.3863 instead of the true loss of 0.6449."
          },
          "miniChallenge": "Set the target to the token with the highest probability and predict whether the loss is large or small before you run it.",
          "summary": "Cross-Entropy Loss and the Optimizer: the loss is the negative log probability of the correct token, its gradient is probabilities minus one-hot, and the optimizer steps the weights against that gradient.",
          "quiz": [
            {
              "question": "What is the main purpose of cross-entropy loss?",
              "options": [
                "It prints nothing at all.",
                "It prints the raw input values unchanged.",
                "To measure how much probability the model gives the correct next token",
                "It raises an error and prints nothing."
              ],
              "answer": 2,
              "explanation": "Cross-entropy loss is the negative log probability the model assigns to the correct next token."
            },
            {
              "question": "What does this code print?\nimport numpy as np\nlogits = np.array([2.0, 1.0, 0.5, 0.2, 0.1])\ntarget, lr = 0, 0.1\np = np.exp(logits - logits.max())\np = p / p.sum()\nloss = -np.log(p[target])\ngrad = p.copy()\ngrad[target] -= 1.0\nprint(f\"Loss: {loss:.4f}\")\nprint(\"Gradient:\", \" \".join(f\"{v:.4f}\" for v in grad))\nprint(\"Updated logits:\", \" \".join(f\"{v:.4f}\" for v in logits - lr * grad))",
              "options": [
                "It raises an error and prints nothing.",
                "It prints nothing at all.",
                "It prints the raw input values unchanged.",
                "Loss: 0.6449\nGradient: -0.4753 0.1930 0.1171 0.0867 0.0785\nUpdated logits: 2.0475 0.9807 0.4883 0.1913 0.0922"
              ],
              "answer": 3,
              "explanation": "The loss is the negative log probability of token 0, the gradient is the probabilities minus one-hot, and the logits move one SGD step."
            }
          ],
          "exercise": {
            "id": "llm-lightweight-python-m3-l11-e1",
            "title": "Compute the loss, the gradient, and one optimizer step",
            "type": "write-code",
            "instructions": "Read three lines: 5 logits, the target token id, and a learning rate. Compute the softmax probabilities, the cross-entropy loss, the gradient of the loss with respect to the logits, and the logits after one SGD step. Print 'Loss: ' with 4 decimals, 'Gradient: ' with 4 decimals, and 'Updated logits: ' with 4 decimals.",
            "starterCode": "import numpy as np\nlogits = np.array([float(v) for v in input().split()])\ntarget = int(input())\nlr = float(input())\n# TODO: compute the loss, the gradient, and one SGD step, then print them.\n",
            "solution": "import numpy as np\nlogits = np.array([float(v) for v in input().split()])\ntarget = int(input())\nlr = float(input())\n# TODO: compute the loss, the gradient, and one SGD step, then print them.\np = np.exp(logits - logits.max())\np = p / p.sum()\nloss = -np.log(p[target])\ngrad = p.copy()\ngrad[target] -= 1.0\nprint(f\"Loss: {loss:.4f}\")\nprint(\"Gradient:\", \" \".join(f\"{v:.4f}\" for v in grad))\nprint(\"Updated logits:\", \" \".join(f\"{v:.4f}\" for v in logits - lr * grad))",
            "solutionExplanation": "Softmax the logits, take the negative log probability of the target, build the gradient as probabilities minus one-hot, and step the logits.",
            "complexity": "Medium",
            "tests": [
              {
                "name": "Example input",
                "stdin": "2.0 1.0 0.5 0.2 0.1\n0\n0.1\n",
                "expectedStdout": "Loss: 0.6449\nGradient: -0.4753 0.1930 0.1171 0.0867 0.0785\nUpdated logits: 2.0475 0.9807 0.4883 0.1913 0.0922",
                "hidden": false
              },
              {
                "name": "Second input",
                "stdin": "0.5 2.0 1.0 0.1 0.3\n1\n0.5\n",
                "expectedStdout": "Loss: 0.6540\nGradient: 0.1160 -0.4800 0.1913 0.0778 0.0950\nUpdated logits: 0.4420 2.2400 0.9044 0.0611 0.2525",
                "hidden": true
              }
            ],
            "hintNotes": {
              "concept": "Cross-entropy loss is the negative log probability of the correct token, and its gradient is the probabilities minus a one-hot vector at the target.",
              "approach": "Softmax the logits, take -log(p[target]), build the gradient, then subtract lr times the gradient from the logits.",
              "structure": "Read the logits, target and learning rate, compute loss and gradient, print all three lines."
            }
          }
        },
        {
          "id": "llm-lightweight-python-m3-l12",
          "slug": "llm-lightweight-python-m3-l12",
          "title": "The Training Loop and Generation",
          "objectives": [
            "Explain how a training loop drives the model",
            "Train the tiny model until the loss falls",
            "Generate text greedily and measure it with perplexity"
          ],
          "introduction": "The Training Loop and Generation is a core skill in this track. In this lesson you will tie everything together: train the tiny transformer on a real corpus, generate text from it, and measure what it learned.",
          "concept": "A training loop repeatedly samples a batch, computes the loss, backpropagates the gradients, and updates the weights with an optimizer until the loss falls. The batch is a few short windows cut from the corpus, the targets are the same windows shifted by one token, and every step makes the model slightly better at predicting what comes next. Once trained, the model generates by feeding its own output back in: greedy decoding always picks the most likely token, while temperature sampling draws from the distribution for more varied text. Perplexity is exp(loss) — the average number of tokens the model is effectively choosing between.",
          "syntax": "for step in range(steps):\n    loss, grads = loss_and_grad(params, batch)\n    params = adam_update(params, grads)\ntext = generate(params, seed)",
          "analogy": "A training loop is like practising a song: each repetition is one batch, the loss is how out of tune it sounded, and the optimizer is the practice that makes the next repetition slightly better.",
          "exampleCode": "\"\"\"L12 exercise solution (standalone): train the tiny transformer, then generate.\nReads the number of training steps from stdin. Fixed seeds: fully deterministic.\n\"\"\"\nimport numpy as np\n\nCORPUS = \"the cat sat on the mat. the dog sat on the log.\"\nCHARS = sorted(set(CORPUS))\nVOCAB = len(CHARS)\nCTOI = {c: i for i, c in enumerate(CHARS)}\nD, H, DH, T, FF, MAX_POS = 8, 2, 4, 8, 16, 32\n\n\ndef init_params(seed=0):\n    rng = np.random.default_rng(seed)\n    s = 0.5\n    return {\n        \"E_tok\": rng.normal(0, s, (VOCAB, D)),\n        \"E_pos\": rng.normal(0, s, (MAX_POS, D)),\n        \"Wq\": rng.normal(0, s, (D, D)),\n        \"Wk\": rng.normal(0, s, (D, D)),\n        \"Wv\": rng.normal(0, s, (D, D)),\n        \"Wo\": rng.normal(0, s, (D, D)),\n        \"g1\": np.ones(D), \"b1\": np.zeros(D),\n        \"W1\": rng.normal(0, s, (D, FF)),\n        \"bb1\": np.zeros(FF),\n        \"W2\": rng.normal(0, s, (FF, D)),\n        \"bb2\": np.zeros(D),\n        \"g2\": np.ones(D), \"b2\": np.zeros(D),\n    }\n\n\ndef softmax(x, axis=-1):\n    x = x - x.max(axis=axis, keepdims=True)\n    e = np.exp(x)\n    return e / e.sum(axis=axis, keepdims=True)\n\n\ndef ln_forward(x, g, b, eps=1e-5):\n    mu = x.mean(axis=-1, keepdims=True)\n    var = ((x - mu) ** 2).mean(axis=-1, keepdims=True)\n    std = np.sqrt(var + eps)\n    return g * ((x - mu) / std) + b, ((x - mu) / std, std, g)\n\n\ndef ln_backward(dy, cache):\n    xhat, std, g = cache\n    dg = (dy * xhat).sum(axis=tuple(range(dy.ndim - 1)))\n    db = dy.sum(axis=tuple(range(dy.ndim - 1)))\n    dxhat = dy * g\n    dx = (1.0 / std) * (dxhat - dxhat.mean(axis=-1, keepdims=True)\n                        - xhat * (dxhat * xhat).mean(axis=-1, keepdims=True))\n    return dx, dg, db\n\n\ndef forward(p, ids):\n    B, T = ids.shape\n    x = p[\"E_tok\"][ids] + p[\"E_pos\"][:T][None, :, :]\n    h, c1 = ln_forward(x, p[\"g1\"], p[\"b1\"])\n    Q, K, V = h @ p[\"Wq\"], h @ p[\"Wk\"], h @ p[\"Wv\"]\n    Qh = Q.reshape(B, T, H, DH).transpose(0, 2, 1, 3)\n    Kh = K.reshape(B, T, H, DH).transpose(0, 2, 1, 3)\n    Vh = V.reshape(B, T, H, DH).transpose(0, 2, 1, 3)\n    scores = Qh @ Kh.transpose(0, 1, 3, 2) / np.sqrt(DH)\n    mask = np.triu(np.ones((T, T), dtype=bool), k=1)\n    scores = np.where(mask, -1e9, scores)\n    w = softmax(scores, axis=-1)\n    att = w @ Vh\n    att_c = att.transpose(0, 2, 1, 3).reshape(B, T, D)\n    att_out = att_c @ p[\"Wo\"]\n    x = x + att_out\n    h2, c2 = ln_forward(x, p[\"g2\"], p[\"b2\"])\n    f1 = h2 @ p[\"W1\"] + p[\"bb1\"]\n    relu = np.maximum(0, f1)\n    ffn = relu @ p[\"W2\"] + p[\"bb2\"]\n    x = x + ffn\n    logits = x @ p[\"E_tok\"].T\n    cache = dict(ids=ids, h=h, c1=c1, Q=Q, K=K, V=V, Qh=Qh, Kh=Kh, Vh=Vh,\n                 w=w, att=att, att_c=att_c, h2=h2, c2=c2, f1=f1, relu=relu,\n                 x=x, logits=logits)\n    return logits, cache\n\n\ndef loss_and_grad(p, ids):\n    B, T = ids.shape\n    logits, cache = forward(p, ids)\n    lg = logits[:, :-1, :]\n    tgt = ids[:, 1:]\n    N = tgt.size\n    probs = softmax(lg.reshape(-1, VOCAB), axis=-1).reshape(B, T - 1, VOCAB)\n    loss = -np.log(probs[np.arange(B)[:, None], np.arange(T - 1)[None, :], tgt] + 1e-12).mean()\n    dlogits = probs.copy()\n    dlogits[np.arange(B)[:, None], np.arange(T - 1)[None, :], tgt] -= 1.0\n    dlogits /= N\n    dlog = np.zeros_like(logits)\n    dlog[:, :-1, :] = dlogits\n    g = {k: np.zeros_like(v) for k, v in p.items()}\n    x = cache[\"x\"]\n    g[\"E_tok\"] += np.einsum(\"btv,btc->vc\", dlog, x)\n    dx = dlog @ p[\"E_tok\"]\n    dffn = dx\n    drelu = dffn @ p[\"W2\"].T\n    g[\"W2\"] += cache[\"relu\"].reshape(-1, FF).T @ dffn.reshape(-1, D)\n    g[\"bb2\"] += dffn.sum(axis=(0, 1))\n    df1 = drelu * (cache[\"f1\"] > 0)\n    g[\"W1\"] += cache[\"h2\"].reshape(-1, D).T @ df1.reshape(-1, FF)\n    g[\"bb1\"] += df1.sum(axis=(0, 1))\n    dh2 = df1 @ p[\"W1\"].T\n    dx_prev, dg2, db2 = ln_backward(dh2, cache[\"c2\"])\n    g[\"g2\"] += dg2\n    g[\"b2\"] += db2\n    dx = dx + dx_prev\n    datt_out = dx\n    g[\"Wo\"] += cache[\"att_c\"].reshape(-1, D).T @ datt_out.reshape(-1, D)\n    datt_c = datt_out @ p[\"Wo\"].T\n    datt = datt_c.reshape(B, T, H, DH).transpose(0, 2, 1, 3)\n    w, Vh = cache[\"w\"], cache[\"Vh\"]\n    dweights = datt @ Vh.transpose(0, 1, 3, 2)\n    dVh = w.transpose(0, 1, 3, 2) @ datt\n    dscores = w * (dweights - (dweights * w).sum(axis=-1, keepdims=True))\n    dscores = dscores / np.sqrt(DH)\n    dQh = dscores @ cache[\"Kh\"]\n    dKh = dscores.transpose(0, 1, 3, 2) @ cache[\"Qh\"]\n    dQ = dQh.transpose(0, 2, 1, 3).reshape(B, T, D)\n    dK = dKh.transpose(0, 2, 1, 3).reshape(B, T, D)\n    dV = dVh.transpose(0, 2, 1, 3).reshape(B, T, D)\n    h = cache[\"h\"]\n    g[\"Wq\"] += h.reshape(-1, D).T @ dQ.reshape(-1, D)\n    g[\"Wk\"] += h.reshape(-1, D).T @ dK.reshape(-1, D)\n    g[\"Wv\"] += h.reshape(-1, D).T @ dV.reshape(-1, D)\n    dh = dQ @ p[\"Wq\"].T + dK @ p[\"Wk\"].T + dV @ p[\"Wv\"].T\n    dx0, dg1, db1 = ln_backward(dh, cache[\"c1\"])\n    g[\"g1\"] += dg1\n    g[\"b1\"] += db1\n    dx0_full = dx + dx0\n    np.add.at(g[\"E_tok\"], ids.reshape(-1), dx0_full.reshape(-1, D))\n    g[\"E_pos\"][:T] += dx0_full.sum(axis=0)\n    return loss, g\n\n\ndef main():\n    steps = 60\n    p = init_params(0)\n    rng = np.random.default_rng(0)\n    data = np.array([CTOI[c] for c in CORPUS], dtype=np.int64)\n    m = {k: np.zeros_like(v) for k, v in p.items()}\n    v = {k: np.zeros_like(v) for k, v in p.items()}\n    lr, b1_, b2_, eps = 0.05, 0.9, 0.999, 1e-8\n    first = None\n    for step in range(1, steps + 1):\n        starts = rng.integers(0, len(data) - T, size=4)\n        ids = np.stack([data[s:s + T + 1] for s in starts])\n        loss, g = loss_and_grad(p, ids)\n        if first is None:\n            first = loss\n        for k in p:\n            m[k] = b1_ * m[k] + (1 - b1_) * g[k]\n            v[k] = b2_ * v[k] + (1 - b2_) * (g[k] ** 2)\n            mh = m[k] / (1 - b1_ ** step)\n            vh = v[k] / (1 - b2_ ** step)\n            p[k] -= lr * mh / (np.sqrt(vh) + eps)\n    print(f\"First loss: {first:.4f}\")\n    print(f\"Final loss: {loss:.4f}\")\n    ids = np.array([[CTOI[\"t\"]]], dtype=np.int64)\n    gen = [\"t\"]\n    for _ in range(12):\n        logits, _ = forward(p, ids)\n        nxt = int(np.argmax(logits[0, -1]))\n        gen.append(CHARS[nxt])\n        ids = np.concatenate([ids, [[nxt]]], axis=1)[:, -T:]\n    print(f\"Generated: {''.join(gen)}\")\n\n\nif __name__ == \"__main__\":\n    main()\n",
          "exampleLanguage": "python",
          "walkthrough": [
            "First, cut a batch of short windows from the corpus; the targets are the same windows shifted by one token.",
            "Next, run the forward and backward pass to get the loss and the gradients.",
            "Then, update every parameter with Adam and repeat for the requested number of steps.",
            "Finally, generate text greedily from a seed character and print the first and final loss."
          ],
          "commonMistakes": [
            "Training on unshifted targets, so the model learns to copy its input instead of predicting the next token.",
            "Sampling the same batch every step, so the model memorizes four windows instead of learning the corpus.",
            "Forgetting to feed the generated token back in, so generation repeats the seed forever."
          ],
          "debugging": {
            "prompt": "The program below prepares training data, but the model trained on it never gets below a loss of 2.6. Find and fix the bug.",
            "buggyCode": "import numpy as np\n# ids is a batch of token windows, shape (4, 9)\nids = np.array([[1, 2, 3, 4, 5, 6, 7, 8, 9]] * 4)\ninputs = ids[:, :-1]\ntargets = ids[:, :-1]\nprint(\"targets equal inputs:\", bool((targets == inputs).all()))",
            "fixedCode": "import numpy as np\n# ids is a batch of token windows, shape (4, 9)\nids = np.array([[1, 2, 3, 4, 5, 6, 7, 8, 9]] * 4)\ninputs = ids[:, :-1]\ntargets = ids[:, 1:]\nprint(\"targets equal inputs:\", bool((targets == inputs).all()))",
            "explanation": "The target for each position must be the NEXT token: training against the current token teaches the model to copy its input, so the loss never falls. Shifting the targets by one makes the model predict what comes next."
          },
          "miniChallenge": "Train for 100 steps instead of 60 and check whether the final loss keeps falling — then generate from 'd' instead of 't'.",
          "summary": "The Training Loop and Generation: sample a batch, compute the loss, backpropagate, update with Adam, repeat — then generate by feeding the model's own output back in, and measure it with perplexity.",
          "quiz": [
            {
              "question": "What is the main purpose of the training loop?",
              "options": [
                "To tokenize the training text into ids",
                "To mask future positions during generation",
                "To split attention into several heads",
                "To repeatedly sample a batch, compute the loss, and update the weights until the loss falls"
              ],
              "answer": 3,
              "explanation": "A training loop repeatedly samples a batch, computes the loss, backpropagates the gradients, and updates the weights with an optimizer until the loss falls."
            },
            {
              "question": "After 60 training steps, what does the tiny model print?",
              "options": [
                "First loss: 5.9853\nFinal loss: 0.8699\nGenerated: t sathe sathe",
                "First loss: 0.8699\nFinal loss: 5.9853\nGenerated: the cat sat",
                "It raises an error and prints nothing.",
                "It prints nothing at all."
              ],
              "answer": 0,
              "explanation": "Sixty Adam steps bring the loss from 5.9853 to 0.8699, and greedy generation from 't' produces 't sathe sathe'."
            }
          ],
          "exercise": {
            "id": "llm-lightweight-python-m3-l12-e1",
            "title": "Train the tiny model and generate text",
            "type": "write-code",
            "instructions": "The tiny transformer (tokenizer, embeddings, attention, block, loss and gradients) is provided in the starter code. Read the number of training steps from stdin. Train with Adam (learning rate 0.05) on batches of 4 windows from the corpus, then print 'First loss: ' and 'Final loss: ' with 4 decimals, and 'Generated: ' followed by 12 greedily generated characters starting from 't'.",
            "starterCode": "\"\"\"L12 exercise solution (standalone): train the tiny transformer, then generate.\nReads the number of training steps from stdin. Fixed seeds: fully deterministic.\n\"\"\"\nimport numpy as np\n\nCORPUS = \"the cat sat on the mat. the dog sat on the log.\"\nCHARS = sorted(set(CORPUS))\nVOCAB = len(CHARS)\nCTOI = {c: i for i, c in enumerate(CHARS)}\nD, H, DH, T, FF, MAX_POS = 8, 2, 4, 8, 16, 32\n\n\ndef init_params(seed=0):\n    rng = np.random.default_rng(seed)\n    s = 0.5\n    return {\n        \"E_tok\": rng.normal(0, s, (VOCAB, D)),\n        \"E_pos\": rng.normal(0, s, (MAX_POS, D)),\n        \"Wq\": rng.normal(0, s, (D, D)),\n        \"Wk\": rng.normal(0, s, (D, D)),\n        \"Wv\": rng.normal(0, s, (D, D)),\n        \"Wo\": rng.normal(0, s, (D, D)),\n        \"g1\": np.ones(D), \"b1\": np.zeros(D),\n        \"W1\": rng.normal(0, s, (D, FF)),\n        \"bb1\": np.zeros(FF),\n        \"W2\": rng.normal(0, s, (FF, D)),\n        \"bb2\": np.zeros(D),\n        \"g2\": np.ones(D), \"b2\": np.zeros(D),\n    }\n\n\ndef softmax(x, axis=-1):\n    x = x - x.max(axis=axis, keepdims=True)\n    e = np.exp(x)\n    return e / e.sum(axis=axis, keepdims=True)\n\n\ndef ln_forward(x, g, b, eps=1e-5):\n    mu = x.mean(axis=-1, keepdims=True)\n    var = ((x - mu) ** 2).mean(axis=-1, keepdims=True)\n    std = np.sqrt(var + eps)\n    return g * ((x - mu) / std) + b, ((x - mu) / std, std, g)\n\n\ndef ln_backward(dy, cache):\n    xhat, std, g = cache\n    dg = (dy * xhat).sum(axis=tuple(range(dy.ndim - 1)))\n    db = dy.sum(axis=tuple(range(dy.ndim - 1)))\n    dxhat = dy * g\n    dx = (1.0 / std) * (dxhat - dxhat.mean(axis=-1, keepdims=True)\n                        - xhat * (dxhat * xhat).mean(axis=-1, keepdims=True))\n    return dx, dg, db\n\n\ndef forward(p, ids):\n    B, T = ids.shape\n    x = p[\"E_tok\"][ids] + p[\"E_pos\"][:T][None, :, :]\n    h, c1 = ln_forward(x, p[\"g1\"], p[\"b1\"])\n    Q, K, V = h @ p[\"Wq\"], h @ p[\"Wk\"], h @ p[\"Wv\"]\n    Qh = Q.reshape(B, T, H, DH).transpose(0, 2, 1, 3)\n    Kh = K.reshape(B, T, H, DH).transpose(0, 2, 1, 3)\n    Vh = V.reshape(B, T, H, DH).transpose(0, 2, 1, 3)\n    scores = Qh @ Kh.transpose(0, 1, 3, 2) / np.sqrt(DH)\n    mask = np.triu(np.ones((T, T), dtype=bool), k=1)\n    scores = np.where(mask, -1e9, scores)\n    w = softmax(scores, axis=-1)\n    att = w @ Vh\n    att_c = att.transpose(0, 2, 1, 3).reshape(B, T, D)\n    att_out = att_c @ p[\"Wo\"]\n    x = x + att_out\n    h2, c2 = ln_forward(x, p[\"g2\"], p[\"b2\"])\n    f1 = h2 @ p[\"W1\"] + p[\"bb1\"]\n    relu = np.maximum(0, f1)\n    ffn = relu @ p[\"W2\"] + p[\"bb2\"]\n    x = x + ffn\n    logits = x @ p[\"E_tok\"].T\n    cache = dict(ids=ids, h=h, c1=c1, Q=Q, K=K, V=V, Qh=Qh, Kh=Kh, Vh=Vh,\n                 w=w, att=att, att_c=att_c, h2=h2, c2=c2, f1=f1, relu=relu,\n                 x=x, logits=logits)\n    return logits, cache\n\n\ndef loss_and_grad(p, ids):\n    B, T = ids.shape\n    logits, cache = forward(p, ids)\n    lg = logits[:, :-1, :]\n    tgt = ids[:, 1:]\n    N = tgt.size\n    probs = softmax(lg.reshape(-1, VOCAB), axis=-1).reshape(B, T - 1, VOCAB)\n    loss = -np.log(probs[np.arange(B)[:, None], np.arange(T - 1)[None, :], tgt] + 1e-12).mean()\n    dlogits = probs.copy()\n    dlogits[np.arange(B)[:, None], np.arange(T - 1)[None, :], tgt] -= 1.0\n    dlogits /= N\n    dlog = np.zeros_like(logits)\n    dlog[:, :-1, :] = dlogits\n    g = {k: np.zeros_like(v) for k, v in p.items()}\n    x = cache[\"x\"]\n    g[\"E_tok\"] += np.einsum(\"btv,btc->vc\", dlog, x)\n    dx = dlog @ p[\"E_tok\"]\n    dffn = dx\n    drelu = dffn @ p[\"W2\"].T\n    g[\"W2\"] += cache[\"relu\"].reshape(-1, FF).T @ dffn.reshape(-1, D)\n    g[\"bb2\"] += dffn.sum(axis=(0, 1))\n    df1 = drelu * (cache[\"f1\"] > 0)\n    g[\"W1\"] += cache[\"h2\"].reshape(-1, D).T @ df1.reshape(-1, FF)\n    g[\"bb1\"] += df1.sum(axis=(0, 1))\n    dh2 = df1 @ p[\"W1\"].T\n    dx_prev, dg2, db2 = ln_backward(dh2, cache[\"c2\"])\n    g[\"g2\"] += dg2\n    g[\"b2\"] += db2\n    dx = dx + dx_prev\n    datt_out = dx\n    g[\"Wo\"] += cache[\"att_c\"].reshape(-1, D).T @ datt_out.reshape(-1, D)\n    datt_c = datt_out @ p[\"Wo\"].T\n    datt = datt_c.reshape(B, T, H, DH).transpose(0, 2, 1, 3)\n    w, Vh = cache[\"w\"], cache[\"Vh\"]\n    dweights = datt @ Vh.transpose(0, 1, 3, 2)\n    dVh = w.transpose(0, 1, 3, 2) @ datt\n    dscores = w * (dweights - (dweights * w).sum(axis=-1, keepdims=True))\n    dscores = dscores / np.sqrt(DH)\n    dQh = dscores @ cache[\"Kh\"]\n    dKh = dscores.transpose(0, 1, 3, 2) @ cache[\"Qh\"]\n    dQ = dQh.transpose(0, 2, 1, 3).reshape(B, T, D)\n    dK = dKh.transpose(0, 2, 1, 3).reshape(B, T, D)\n    dV = dVh.transpose(0, 2, 1, 3).reshape(B, T, D)\n    h = cache[\"h\"]\n    g[\"Wq\"] += h.reshape(-1, D).T @ dQ.reshape(-1, D)\n    g[\"Wk\"] += h.reshape(-1, D).T @ dK.reshape(-1, D)\n    g[\"Wv\"] += h.reshape(-1, D).T @ dV.reshape(-1, D)\n    dh = dQ @ p[\"Wq\"].T + dK @ p[\"Wk\"].T + dV @ p[\"Wv\"].T\n    dx0, dg1, db1 = ln_backward(dh, cache[\"c1\"])\n    g[\"g1\"] += dg1\n    g[\"b1\"] += db1\n    dx0_full = dx + dx0\n    np.add.at(g[\"E_tok\"], ids.reshape(-1), dx0_full.reshape(-1, D))\n    g[\"E_pos\"][:T] += dx0_full.sum(axis=0)\n    return loss, g\n\n\ndef main():\n    steps = int(input())\n    p = init_params(0)\n    rng = np.random.default_rng(0)\n    data = np.array([CTOI[c] for c in CORPUS], dtype=np.int64)\n    m = {k: np.zeros_like(v) for k, v in p.items()}\n    v = {k: np.zeros_like(v) for k, v in p.items()}\n    lr, b1_, b2_, eps = 0.05, 0.9, 0.999, 1e-8\n    # TODO: train the model with Adam for `steps` steps:\n    #   - sample 4 windows of length T + 1 from `data`\n    #   - call loss_and_grad(p, ids) to get the loss and gradients\n    #   - update m, v and the parameters p with the Adam rule\n    #   - remember the loss of the first step in `first`\n    # TODO: print the first loss and the final loss, each with 4 decimals\n    # TODO: generate 12 characters greedily, starting from \"t\":\n    #   feed each new token back in and print them after \"Generated: \"\n\n\nif __name__ == \"__main__\":\n    main()\n",
            "solution": "\"\"\"L12 exercise solution (standalone): train the tiny transformer, then generate.\nReads the number of training steps from stdin. Fixed seeds: fully deterministic.\n\"\"\"\nimport numpy as np\n\nCORPUS = \"the cat sat on the mat. the dog sat on the log.\"\nCHARS = sorted(set(CORPUS))\nVOCAB = len(CHARS)\nCTOI = {c: i for i, c in enumerate(CHARS)}\nD, H, DH, T, FF, MAX_POS = 8, 2, 4, 8, 16, 32\n\n\ndef init_params(seed=0):\n    rng = np.random.default_rng(seed)\n    s = 0.5\n    return {\n        \"E_tok\": rng.normal(0, s, (VOCAB, D)),\n        \"E_pos\": rng.normal(0, s, (MAX_POS, D)),\n        \"Wq\": rng.normal(0, s, (D, D)),\n        \"Wk\": rng.normal(0, s, (D, D)),\n        \"Wv\": rng.normal(0, s, (D, D)),\n        \"Wo\": rng.normal(0, s, (D, D)),\n        \"g1\": np.ones(D), \"b1\": np.zeros(D),\n        \"W1\": rng.normal(0, s, (D, FF)),\n        \"bb1\": np.zeros(FF),\n        \"W2\": rng.normal(0, s, (FF, D)),\n        \"bb2\": np.zeros(D),\n        \"g2\": np.ones(D), \"b2\": np.zeros(D),\n    }\n\n\ndef softmax(x, axis=-1):\n    x = x - x.max(axis=axis, keepdims=True)\n    e = np.exp(x)\n    return e / e.sum(axis=axis, keepdims=True)\n\n\ndef ln_forward(x, g, b, eps=1e-5):\n    mu = x.mean(axis=-1, keepdims=True)\n    var = ((x - mu) ** 2).mean(axis=-1, keepdims=True)\n    std = np.sqrt(var + eps)\n    return g * ((x - mu) / std) + b, ((x - mu) / std, std, g)\n\n\ndef ln_backward(dy, cache):\n    xhat, std, g = cache\n    dg = (dy * xhat).sum(axis=tuple(range(dy.ndim - 1)))\n    db = dy.sum(axis=tuple(range(dy.ndim - 1)))\n    dxhat = dy * g\n    dx = (1.0 / std) * (dxhat - dxhat.mean(axis=-1, keepdims=True)\n                        - xhat * (dxhat * xhat).mean(axis=-1, keepdims=True))\n    return dx, dg, db\n\n\ndef forward(p, ids):\n    B, T = ids.shape\n    x = p[\"E_tok\"][ids] + p[\"E_pos\"][:T][None, :, :]\n    h, c1 = ln_forward(x, p[\"g1\"], p[\"b1\"])\n    Q, K, V = h @ p[\"Wq\"], h @ p[\"Wk\"], h @ p[\"Wv\"]\n    Qh = Q.reshape(B, T, H, DH).transpose(0, 2, 1, 3)\n    Kh = K.reshape(B, T, H, DH).transpose(0, 2, 1, 3)\n    Vh = V.reshape(B, T, H, DH).transpose(0, 2, 1, 3)\n    scores = Qh @ Kh.transpose(0, 1, 3, 2) / np.sqrt(DH)\n    mask = np.triu(np.ones((T, T), dtype=bool), k=1)\n    scores = np.where(mask, -1e9, scores)\n    w = softmax(scores, axis=-1)\n    att = w @ Vh\n    att_c = att.transpose(0, 2, 1, 3).reshape(B, T, D)\n    att_out = att_c @ p[\"Wo\"]\n    x = x + att_out\n    h2, c2 = ln_forward(x, p[\"g2\"], p[\"b2\"])\n    f1 = h2 @ p[\"W1\"] + p[\"bb1\"]\n    relu = np.maximum(0, f1)\n    ffn = relu @ p[\"W2\"] + p[\"bb2\"]\n    x = x + ffn\n    logits = x @ p[\"E_tok\"].T\n    cache = dict(ids=ids, h=h, c1=c1, Q=Q, K=K, V=V, Qh=Qh, Kh=Kh, Vh=Vh,\n                 w=w, att=att, att_c=att_c, h2=h2, c2=c2, f1=f1, relu=relu,\n                 x=x, logits=logits)\n    return logits, cache\n\n\ndef loss_and_grad(p, ids):\n    B, T = ids.shape\n    logits, cache = forward(p, ids)\n    lg = logits[:, :-1, :]\n    tgt = ids[:, 1:]\n    N = tgt.size\n    probs = softmax(lg.reshape(-1, VOCAB), axis=-1).reshape(B, T - 1, VOCAB)\n    loss = -np.log(probs[np.arange(B)[:, None], np.arange(T - 1)[None, :], tgt] + 1e-12).mean()\n    dlogits = probs.copy()\n    dlogits[np.arange(B)[:, None], np.arange(T - 1)[None, :], tgt] -= 1.0\n    dlogits /= N\n    dlog = np.zeros_like(logits)\n    dlog[:, :-1, :] = dlogits\n    g = {k: np.zeros_like(v) for k, v in p.items()}\n    x = cache[\"x\"]\n    g[\"E_tok\"] += np.einsum(\"btv,btc->vc\", dlog, x)\n    dx = dlog @ p[\"E_tok\"]\n    dffn = dx\n    drelu = dffn @ p[\"W2\"].T\n    g[\"W2\"] += cache[\"relu\"].reshape(-1, FF).T @ dffn.reshape(-1, D)\n    g[\"bb2\"] += dffn.sum(axis=(0, 1))\n    df1 = drelu * (cache[\"f1\"] > 0)\n    g[\"W1\"] += cache[\"h2\"].reshape(-1, D).T @ df1.reshape(-1, FF)\n    g[\"bb1\"] += df1.sum(axis=(0, 1))\n    dh2 = df1 @ p[\"W1\"].T\n    dx_prev, dg2, db2 = ln_backward(dh2, cache[\"c2\"])\n    g[\"g2\"] += dg2\n    g[\"b2\"] += db2\n    dx = dx + dx_prev\n    datt_out = dx\n    g[\"Wo\"] += cache[\"att_c\"].reshape(-1, D).T @ datt_out.reshape(-1, D)\n    datt_c = datt_out @ p[\"Wo\"].T\n    datt = datt_c.reshape(B, T, H, DH).transpose(0, 2, 1, 3)\n    w, Vh = cache[\"w\"], cache[\"Vh\"]\n    dweights = datt @ Vh.transpose(0, 1, 3, 2)\n    dVh = w.transpose(0, 1, 3, 2) @ datt\n    dscores = w * (dweights - (dweights * w).sum(axis=-1, keepdims=True))\n    dscores = dscores / np.sqrt(DH)\n    dQh = dscores @ cache[\"Kh\"]\n    dKh = dscores.transpose(0, 1, 3, 2) @ cache[\"Qh\"]\n    dQ = dQh.transpose(0, 2, 1, 3).reshape(B, T, D)\n    dK = dKh.transpose(0, 2, 1, 3).reshape(B, T, D)\n    dV = dVh.transpose(0, 2, 1, 3).reshape(B, T, D)\n    h = cache[\"h\"]\n    g[\"Wq\"] += h.reshape(-1, D).T @ dQ.reshape(-1, D)\n    g[\"Wk\"] += h.reshape(-1, D).T @ dK.reshape(-1, D)\n    g[\"Wv\"] += h.reshape(-1, D).T @ dV.reshape(-1, D)\n    dh = dQ @ p[\"Wq\"].T + dK @ p[\"Wk\"].T + dV @ p[\"Wv\"].T\n    dx0, dg1, db1 = ln_backward(dh, cache[\"c1\"])\n    g[\"g1\"] += dg1\n    g[\"b1\"] += db1\n    dx0_full = dx + dx0\n    np.add.at(g[\"E_tok\"], ids.reshape(-1), dx0_full.reshape(-1, D))\n    g[\"E_pos\"][:T] += dx0_full.sum(axis=0)\n    return loss, g\n\n\ndef main():\n    steps = int(input())\n    p = init_params(0)\n    rng = np.random.default_rng(0)\n    data = np.array([CTOI[c] for c in CORPUS], dtype=np.int64)\n    m = {k: np.zeros_like(v) for k, v in p.items()}\n    v = {k: np.zeros_like(v) for k, v in p.items()}\n    lr, b1_, b2_, eps = 0.05, 0.9, 0.999, 1e-8\n    first = None\n    for step in range(1, steps + 1):\n        starts = rng.integers(0, len(data) - T, size=4)\n        ids = np.stack([data[s:s + T + 1] for s in starts])\n        loss, g = loss_and_grad(p, ids)\n        if first is None:\n            first = loss\n        for k in p:\n            m[k] = b1_ * m[k] + (1 - b1_) * g[k]\n            v[k] = b2_ * v[k] + (1 - b2_) * (g[k] ** 2)\n            mh = m[k] / (1 - b1_ ** step)\n            vh = v[k] / (1 - b2_ ** step)\n            p[k] -= lr * mh / (np.sqrt(vh) + eps)\n    print(f\"First loss: {first:.4f}\")\n    print(f\"Final loss: {loss:.4f}\")\n    ids = np.array([[CTOI[\"t\"]]], dtype=np.int64)\n    gen = [\"t\"]\n    for _ in range(12):\n        logits, _ = forward(p, ids)\n        nxt = int(np.argmax(logits[0, -1]))\n        gen.append(CHARS[nxt])\n        ids = np.concatenate([ids, [[nxt]]], axis=1)[:, -T:]\n    print(f\"Generated: {''.join(gen)}\")\n\n\nif __name__ == \"__main__\":\n    main()\n",
            "solutionExplanation": "Sample batches of 4 windows, call loss_and_grad for the loss and gradients, update the parameters with Adam, then generate greedily from 't' by feeding each new token back in.",
            "complexity": "Hard",
            "tests": [
              {
                "name": "Example input",
                "stdin": "40\n",
                "expectedStdout": "First loss: 5.9853\nFinal loss: 1.1369\nGenerated: the g matthe",
                "hidden": false
              },
              {
                "name": "Second input",
                "stdin": "35\n",
                "expectedStdout": "First loss: 5.9853\nFinal loss: 1.5310\nGenerated: the n  nt the",
                "hidden": true
              }
            ],
            "hintNotes": {
              "concept": "A training loop samples a batch, computes the loss and gradients, updates the weights with Adam, and repeats; generation feeds the model's own output back in.",
              "approach": "Loop for the requested steps: sample 4 windows, call loss_and_grad, apply the Adam update with bias correction, then generate greedily from 't'.",
              "structure": "Read the step count, set up the Adam state, train, print the first and final loss, then generate 12 characters."
            }
          }
        }
      ]
    }
  ]
};;

const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    "id": "llm-lightweight-python-aq1",
    "kind": "conceptual",
    "topic": "What a Small Language Model Is",
    "question": "Which statement about What a Small Language Model Is is correct?",
    "options": [
      "A language model predicts the next token by assigning a probability to every token in the vocabulary.",
      "A language model stores the entire training text and looks the next word up from it.",
      "A language model always outputs exactly one word with no uncertainty.",
      "A language model can only be trained on text written in English."
    ],
    "answer": 0,
    "explanation": "A language model predicts the next token by assigning a probability to every token in the vocabulary."
  },
  {
    "id": "llm-lightweight-python-aq2",
    "kind": "conceptual",
    "topic": "Embeddings: Token and Position",
    "question": "Which statement about Embeddings: Token and Position is correct?",
    "options": [
      "The model input is the token embedding minus the position embedding.",
      "An embedding is a learned vector for each token, and the model adds a position embedding so it can tell tokens apart by where they sit.",
      "Token embeddings are random numbers that are never updated during training.",
      "Position embeddings are only used for images, never for text."
    ],
    "answer": 1,
    "explanation": "An embedding is a learned vector for each token, and the model adds a position embedding so it can tell tokens apart by where they sit."
  },
  {
    "id": "llm-lightweight-python-aq3",
    "kind": "conceptual",
    "topic": "Q, K, and V Projections",
    "question": "Which statement about Q, K, and V Projections is correct?",
    "options": [
      "The query is the output of the model and the key is the input text.",
      "The value is the vocabulary size and never changes during training.",
      "Q, K and V are three different linear projections of the same input, so queries, keys and values can play different roles.",
      "Q, K and V are always the same matrix, copied three times."
    ],
    "answer": 2,
    "explanation": "Q, K and V are three different linear projections of the same input, so queries, keys and values can play different roles."
  },
  {
    "id": "llm-lightweight-python-aq4",
    "kind": "conceptual",
    "topic": "Causal Masking",
    "question": "Which statement about Causal Masking is correct?",
    "options": [
      "A causal mask hides past positions so the model can only see the future.",
      "A causal mask is applied after the softmax, so it changes the normalized weights.",
      "A causal mask removes the need for positional encoding entirely.",
      "A causal mask hides future positions from each token by setting their attention scores to negative infinity before the softmax."
    ],
    "answer": 3,
    "explanation": "A causal mask hides future positions from each token by setting their attention scores to negative infinity before the softmax."
  },
  {
    "id": "llm-lightweight-python-aq5",
    "kind": "conceptual",
    "topic": "The Transformer Block",
    "question": "Which statement about The Transformer Block is correct?",
    "options": [
      "A transformer block applies layer normalization, attention or a feed-forward network, and adds the result back to its input through a residual connection.",
      "A transformer block deletes its input and returns only the feed-forward output.",
      "Layer normalization removes the need for any training data.",
      "The feed-forward network is where the vocabulary is stored."
    ],
    "answer": 0,
    "explanation": "A transformer block applies layer normalization, attention or a feed-forward network, and adds the result back to its input through a residual connection."
  },
  {
    "id": "llm-lightweight-python-aq6",
    "kind": "code-reading",
    "topic": "Tokenizer from Scratch",
    "question": "What does this program print when the input is 'hello'?",
    "code": "text = input()\nvocab = sorted(set(text))\nprint(\" \".join(str(vocab.index(ch)) for ch in text))",
    "options": [
      "It raises an error and prints nothing.",
      "1 0 2 2 3",
      "0 1 2 2 3",
      "hello"
    ],
    "answer": 1,
    "explanation": "The vocabulary is the sorted unique characters of 'hello', so the ids are 1 0 2 2 3."
  },
  {
    "id": "llm-lightweight-python-aq7",
    "kind": "code-reading",
    "topic": "Scaled Dot-Product Attention",
    "question": "What does this program print for the visible example inputs (Q and K are the 2x2 identity, V is [[1, 2], [3, 4]])?",
    "code": "import numpy as np\nQ = np.array([[float(v) for v in input().split()] for _ in range(2)])\nK = np.array([[float(v) for v in input().split()] for _ in range(2)])\nV = np.array([[float(v) for v in input().split()] for _ in range(2)])\n# TODO: compute the attention weights and output, then print them.\nscores = Q @ K.T / np.sqrt(K.shape[1])\nw = np.exp(scores - scores.max(axis=1, keepdims=True))\nw = w / w.sum(axis=1, keepdims=True)\nprint(\"Weights:\")\nfor row in w:\n    print(\" \".join(f\"{v:.3f}\" for v in row))\nprint(\"Output:\")\nfor row in w @ V:\n    print(\" \".join(f\"{v:.3f}\" for v in row))",
    "options": [
      "Weights:\n0.500 0.500\n0.500 0.500\nOutput:\n2.000 3.000\n2.000 3.000",
      "It raises an error and prints nothing.",
      "Weights:\n0.670 0.330\n0.330 0.670\nOutput:\n1.660 2.660\n2.340 3.340",
      "Weights:\n0.731 0.269\n0.269 0.731\nOutput:\n1.538 2.538\n2.462 3.462"
    ],
    "answer": 2,
    "explanation": "The scaled scores give weights 0.670 and 0.330, and the output is the weights times V: 1.660 2.660 and 2.340 3.340."
  },
  {
    "id": "llm-lightweight-python-aq8",
    "kind": "code-reading",
    "topic": "The Training Loop and Generation",
    "question": "What does this program print when the input is 40?",
    "code": "\"\"\"L12 exercise solution (standalone): train the tiny transformer, then generate.\nReads the number of training steps from stdin. Fixed seeds: fully deterministic.\n\"\"\"\nimport numpy as np\n\nCORPUS = \"the cat sat on the mat. the dog sat on the log.\"\nCHARS = sorted(set(CORPUS))\nVOCAB = len(CHARS)\nCTOI = {c: i for i, c in enumerate(CHARS)}\nD, H, DH, T, FF, MAX_POS = 8, 2, 4, 8, 16, 32\n\n\ndef init_params(seed=0):\n    rng = np.random.default_rng(seed)\n    s = 0.5\n    return {\n        \"E_tok\": rng.normal(0, s, (VOCAB, D)),\n        \"E_pos\": rng.normal(0, s, (MAX_POS, D)),\n        \"Wq\": rng.normal(0, s, (D, D)),\n        \"Wk\": rng.normal(0, s, (D, D)),\n        \"Wv\": rng.normal(0, s, (D, D)),\n        \"Wo\": rng.normal(0, s, (D, D)),\n        \"g1\": np.ones(D), \"b1\": np.zeros(D),\n        \"W1\": rng.normal(0, s, (D, FF)),\n        \"bb1\": np.zeros(FF),\n        \"W2\": rng.normal(0, s, (FF, D)),\n        \"bb2\": np.zeros(D),\n        \"g2\": np.ones(D), \"b2\": np.zeros(D),\n    }\n\n\ndef softmax(x, axis=-1):\n    x = x - x.max(axis=axis, keepdims=True)\n    e = np.exp(x)\n    return e / e.sum(axis=axis, keepdims=True)\n\n\ndef ln_forward(x, g, b, eps=1e-5):\n    mu = x.mean(axis=-1, keepdims=True)\n    var = ((x - mu) ** 2).mean(axis=-1, keepdims=True)\n    std = np.sqrt(var + eps)\n    return g * ((x - mu) / std) + b, ((x - mu) / std, std, g)\n\n\ndef ln_backward(dy, cache):\n    xhat, std, g = cache\n    dg = (dy * xhat).sum(axis=tuple(range(dy.ndim - 1)))\n    db = dy.sum(axis=tuple(range(dy.ndim - 1)))\n    dxhat = dy * g\n    dx = (1.0 / std) * (dxhat - dxhat.mean(axis=-1, keepdims=True)\n                        - xhat * (dxhat * xhat).mean(axis=-1, keepdims=True))\n    return dx, dg, db\n\n\ndef forward(p, ids):\n    B, T = ids.shape\n    x = p[\"E_tok\"][ids] + p[\"E_pos\"][:T][None, :, :]\n    h, c1 = ln_forward(x, p[\"g1\"], p[\"b1\"])\n    Q, K, V = h @ p[\"Wq\"], h @ p[\"Wk\"], h @ p[\"Wv\"]\n    Qh = Q.reshape(B, T, H, DH).transpose(0, 2, 1, 3)\n    Kh = K.reshape(B, T, H, DH).transpose(0, 2, 1, 3)\n    Vh = V.reshape(B, T, H, DH).transpose(0, 2, 1, 3)\n    scores = Qh @ Kh.transpose(0, 1, 3, 2) / np.sqrt(DH)\n    mask = np.triu(np.ones((T, T), dtype=bool), k=1)\n    scores = np.where(mask, -1e9, scores)\n    w = softmax(scores, axis=-1)\n    att = w @ Vh\n    att_c = att.transpose(0, 2, 1, 3).reshape(B, T, D)\n    att_out = att_c @ p[\"Wo\"]\n    x = x + att_out\n    h2, c2 = ln_forward(x, p[\"g2\"], p[\"b2\"])\n    f1 = h2 @ p[\"W1\"] + p[\"bb1\"]\n    relu = np.maximum(0, f1)\n    ffn = relu @ p[\"W2\"] + p[\"bb2\"]\n    x = x + ffn\n    logits = x @ p[\"E_tok\"].T\n    cache = dict(ids=ids, h=h, c1=c1, Q=Q, K=K, V=V, Qh=Qh, Kh=Kh, Vh=Vh,\n                 w=w, att=att, att_c=att_c, h2=h2, c2=c2, f1=f1, relu=relu,\n                 x=x, logits=logits)\n    return logits, cache\n\n\ndef loss_and_grad(p, ids):\n    B, T = ids.shape\n    logits, cache = forward(p, ids)\n    lg = logits[:, :-1, :]\n    tgt = ids[:, 1:]\n    N = tgt.size\n    probs = softmax(lg.reshape(-1, VOCAB), axis=-1).reshape(B, T - 1, VOCAB)\n    loss = -np.log(probs[np.arange(B)[:, None], np.arange(T - 1)[None, :], tgt] + 1e-12).mean()\n    dlogits = probs.copy()\n    dlogits[np.arange(B)[:, None], np.arange(T - 1)[None, :], tgt] -= 1.0\n    dlogits /= N\n    dlog = np.zeros_like(logits)\n    dlog[:, :-1, :] = dlogits\n    g = {k: np.zeros_like(v) for k, v in p.items()}\n    x = cache[\"x\"]\n    g[\"E_tok\"] += np.einsum(\"btv,btc->vc\", dlog, x)\n    dx = dlog @ p[\"E_tok\"]\n    dffn = dx\n    drelu = dffn @ p[\"W2\"].T\n    g[\"W2\"] += cache[\"relu\"].reshape(-1, FF).T @ dffn.reshape(-1, D)\n    g[\"bb2\"] += dffn.sum(axis=(0, 1))\n    df1 = drelu * (cache[\"f1\"] > 0)\n    g[\"W1\"] += cache[\"h2\"].reshape(-1, D).T @ df1.reshape(-1, FF)\n    g[\"bb1\"] += df1.sum(axis=(0, 1))\n    dh2 = df1 @ p[\"W1\"].T\n    dx_prev, dg2, db2 = ln_backward(dh2, cache[\"c2\"])\n    g[\"g2\"] += dg2\n    g[\"b2\"] += db2\n    dx = dx + dx_prev\n    datt_out = dx\n    g[\"Wo\"] += cache[\"att_c\"].reshape(-1, D).T @ datt_out.reshape(-1, D)\n    datt_c = datt_out @ p[\"Wo\"].T\n    datt = datt_c.reshape(B, T, H, DH).transpose(0, 2, 1, 3)\n    w, Vh = cache[\"w\"], cache[\"Vh\"]\n    dweights = datt @ Vh.transpose(0, 1, 3, 2)\n    dVh = w.transpose(0, 1, 3, 2) @ datt\n    dscores = w * (dweights - (dweights * w).sum(axis=-1, keepdims=True))\n    dscores = dscores / np.sqrt(DH)\n    dQh = dscores @ cache[\"Kh\"]\n    dKh = dscores.transpose(0, 1, 3, 2) @ cache[\"Qh\"]\n    dQ = dQh.transpose(0, 2, 1, 3).reshape(B, T, D)\n    dK = dKh.transpose(0, 2, 1, 3).reshape(B, T, D)\n    dV = dVh.transpose(0, 2, 1, 3).reshape(B, T, D)\n    h = cache[\"h\"]\n    g[\"Wq\"] += h.reshape(-1, D).T @ dQ.reshape(-1, D)\n    g[\"Wk\"] += h.reshape(-1, D).T @ dK.reshape(-1, D)\n    g[\"Wv\"] += h.reshape(-1, D).T @ dV.reshape(-1, D)\n    dh = dQ @ p[\"Wq\"].T + dK @ p[\"Wk\"].T + dV @ p[\"Wv\"].T\n    dx0, dg1, db1 = ln_backward(dh, cache[\"c1\"])\n    g[\"g1\"] += dg1\n    g[\"b1\"] += db1\n    dx0_full = dx + dx0\n    np.add.at(g[\"E_tok\"], ids.reshape(-1), dx0_full.reshape(-1, D))\n    g[\"E_pos\"][:T] += dx0_full.sum(axis=0)\n    return loss, g\n\n\ndef main():\n    steps = int(input())\n    p = init_params(0)\n    rng = np.random.default_rng(0)\n    data = np.array([CTOI[c] for c in CORPUS], dtype=np.int64)\n    m = {k: np.zeros_like(v) for k, v in p.items()}\n    v = {k: np.zeros_like(v) for k, v in p.items()}\n    lr, b1_, b2_, eps = 0.05, 0.9, 0.999, 1e-8\n    first = None\n    for step in range(1, steps + 1):\n        starts = rng.integers(0, len(data) - T, size=4)\n        ids = np.stack([data[s:s + T + 1] for s in starts])\n        loss, g = loss_and_grad(p, ids)\n        if first is None:\n            first = loss\n        for k in p:\n            m[k] = b1_ * m[k] + (1 - b1_) * g[k]\n            v[k] = b2_ * v[k] + (1 - b2_) * (g[k] ** 2)\n            mh = m[k] / (1 - b1_ ** step)\n            vh = v[k] / (1 - b2_ ** step)\n            p[k] -= lr * mh / (np.sqrt(vh) + eps)\n    print(f\"First loss: {first:.4f}\")\n    print(f\"Final loss: {loss:.4f}\")\n    ids = np.array([[CTOI[\"t\"]]], dtype=np.int64)\n    gen = [\"t\"]\n    for _ in range(12):\n        logits, _ = forward(p, ids)\n        nxt = int(np.argmax(logits[0, -1]))\n        gen.append(CHARS[nxt])\n        ids = np.concatenate([ids, [[nxt]]], axis=1)[:, -T:]\n    print(f\"Generated: {''.join(gen)}\")\n\n\nif __name__ == \"__main__\":\n    main()\n",
    "options": [
      "First loss: 5.9853\nFinal loss: 1.5310\nGenerated: the n  nt the",
      "First loss: 5.9853\nFinal loss: 0.8699\nGenerated: t sathe sathe",
      "It raises an error and prints nothing.",
      "First loss: 5.9853\nFinal loss: 1.1369\nGenerated: the g matthe"
    ],
    "answer": 3,
    "explanation": "Forty Adam steps bring the loss from 5.9853 to 1.1369, and greedy generation from 't' produces 'the g matthe'."
  },
  {
    "id": "llm-lightweight-python-aq9",
    "kind": "debugging",
    "topic": "Positional Encoding",
    "question": "The program below should compute the sinusoidal encoding, but every position prints the same row. What is the bug?",
    "code": "import numpy as np\ndef pe(pos, d):\n    out = np.zeros(d)\n    for i in range(d):\n        div = 10000 ** ((2 * (i // 2)) / d)\n        out[i] = np.sin(i / div) if i % 2 == 0 else np.cos(i / div)\n    return out\nfor pos in range(3):\n    print(pos, \" \".join(f\"{v:.4f}\" for v in pe(pos, 4)))",
    "options": [
      "The angle must depend on the position: using the dimension index i makes the row identical for every position, so the model gets no word-order information.",
      "The divisor 10000 is too large, so all the angles round to zero.",
      "The encoding should use tanh instead of sin and cos.",
      "The width d should be doubled for every position."
    ],
    "answer": 0,
    "explanation": "The angle must depend on the position: using the dimension index i makes the row identical for every position, so the model gets no word-order information."
  },
  {
    "id": "llm-lightweight-python-aq10",
    "kind": "debugging",
    "topic": "Multi-Head Attention",
    "question": "The program below should print a 2x4 output that depends on Wo, but the output is the same no matter what Wo is. What is the bug?",
    "code": "import numpy as np\nrng = np.random.default_rng(12)\nWq = rng.integers(-1, 2, size=(4, 4)).astype(float)\nWk = rng.integers(-1, 2, size=(4, 4)).astype(float)\nWv = rng.integers(-1, 2, size=(4, 4)).astype(float)\nWo = rng.integers(-1, 2, size=(4, 4)).astype(float)\nconcat = np.array([[-0.887, -0.915, 3.0, 2.0], [0.321, -0.009, 3.0, 2.0]])\nout = concat\nfor row in out:\n    print(\" \".join(f\"{v:.3f}\" for v in row))",
    "options": [
      "The causal mask was applied to the wrong positions.",
      "The concatenated heads must pass through the output projection Wo: without it the block returns the raw head outputs and Wo has no effect at all.",
      "The heads were split along the wrong axis, so each head sees the wrong slice.",
      "The attention weights were computed without the scaling factor."
    ],
    "answer": 1,
    "explanation": "The concatenated heads must pass through the output projection Wo: without it the block returns the raw head outputs and Wo has no effect at all."
  }
];;

const PROGRAMMING: ExerciseSpec = {
  "id": "llm-lightweight-python-cap-e1",
  "title": "Train the tiny model end to end",
  "type": "write-code",
  "instructions": "The tiny transformer (tokenizer, embeddings, attention, block, loss and gradients) is provided in the starter code. Read the number of training steps from stdin. Train with Adam (learning rate 0.05) on batches of 4 windows from the corpus, then print 'Final loss: ' with 4 decimals, 'Perplexity: ' with 2 decimals, and 'Generated: ' followed by 12 greedily generated characters starting from 'c'.",
  "starterCode": "\"\"\"L12 exercise solution (standalone): train the tiny transformer, then generate.\nReads the number of training steps from stdin. Fixed seeds: fully deterministic.\n\"\"\"\nimport math\nimport numpy as np\n\nCORPUS = \"the cat sat on the mat. the dog sat on the log.\"\nCHARS = sorted(set(CORPUS))\nVOCAB = len(CHARS)\nCTOI = {c: i for i, c in enumerate(CHARS)}\nD, H, DH, T, FF, MAX_POS = 8, 2, 4, 8, 16, 32\n\n\ndef init_params(seed=0):\n    rng = np.random.default_rng(seed)\n    s = 0.5\n    return {\n        \"E_tok\": rng.normal(0, s, (VOCAB, D)),\n        \"E_pos\": rng.normal(0, s, (MAX_POS, D)),\n        \"Wq\": rng.normal(0, s, (D, D)),\n        \"Wk\": rng.normal(0, s, (D, D)),\n        \"Wv\": rng.normal(0, s, (D, D)),\n        \"Wo\": rng.normal(0, s, (D, D)),\n        \"g1\": np.ones(D), \"b1\": np.zeros(D),\n        \"W1\": rng.normal(0, s, (D, FF)),\n        \"bb1\": np.zeros(FF),\n        \"W2\": rng.normal(0, s, (FF, D)),\n        \"bb2\": np.zeros(D),\n        \"g2\": np.ones(D), \"b2\": np.zeros(D),\n    }\n\n\ndef softmax(x, axis=-1):\n    x = x - x.max(axis=axis, keepdims=True)\n    e = np.exp(x)\n    return e / e.sum(axis=axis, keepdims=True)\n\n\ndef ln_forward(x, g, b, eps=1e-5):\n    mu = x.mean(axis=-1, keepdims=True)\n    var = ((x - mu) ** 2).mean(axis=-1, keepdims=True)\n    std = np.sqrt(var + eps)\n    return g * ((x - mu) / std) + b, ((x - mu) / std, std, g)\n\n\ndef ln_backward(dy, cache):\n    xhat, std, g = cache\n    dg = (dy * xhat).sum(axis=tuple(range(dy.ndim - 1)))\n    db = dy.sum(axis=tuple(range(dy.ndim - 1)))\n    dxhat = dy * g\n    dx = (1.0 / std) * (dxhat - dxhat.mean(axis=-1, keepdims=True)\n                        - xhat * (dxhat * xhat).mean(axis=-1, keepdims=True))\n    return dx, dg, db\n\n\ndef forward(p, ids):\n    B, T = ids.shape\n    x = p[\"E_tok\"][ids] + p[\"E_pos\"][:T][None, :, :]\n    h, c1 = ln_forward(x, p[\"g1\"], p[\"b1\"])\n    Q, K, V = h @ p[\"Wq\"], h @ p[\"Wk\"], h @ p[\"Wv\"]\n    Qh = Q.reshape(B, T, H, DH).transpose(0, 2, 1, 3)\n    Kh = K.reshape(B, T, H, DH).transpose(0, 2, 1, 3)\n    Vh = V.reshape(B, T, H, DH).transpose(0, 2, 1, 3)\n    scores = Qh @ Kh.transpose(0, 1, 3, 2) / np.sqrt(DH)\n    mask = np.triu(np.ones((T, T), dtype=bool), k=1)\n    scores = np.where(mask, -1e9, scores)\n    w = softmax(scores, axis=-1)\n    att = w @ Vh\n    att_c = att.transpose(0, 2, 1, 3).reshape(B, T, D)\n    att_out = att_c @ p[\"Wo\"]\n    x = x + att_out\n    h2, c2 = ln_forward(x, p[\"g2\"], p[\"b2\"])\n    f1 = h2 @ p[\"W1\"] + p[\"bb1\"]\n    relu = np.maximum(0, f1)\n    ffn = relu @ p[\"W2\"] + p[\"bb2\"]\n    x = x + ffn\n    logits = x @ p[\"E_tok\"].T\n    cache = dict(ids=ids, h=h, c1=c1, Q=Q, K=K, V=V, Qh=Qh, Kh=Kh, Vh=Vh,\n                 w=w, att=att, att_c=att_c, h2=h2, c2=c2, f1=f1, relu=relu,\n                 x=x, logits=logits)\n    return logits, cache\n\n\ndef loss_and_grad(p, ids):\n    B, T = ids.shape\n    logits, cache = forward(p, ids)\n    lg = logits[:, :-1, :]\n    tgt = ids[:, 1:]\n    N = tgt.size\n    probs = softmax(lg.reshape(-1, VOCAB), axis=-1).reshape(B, T - 1, VOCAB)\n    loss = -np.log(probs[np.arange(B)[:, None], np.arange(T - 1)[None, :], tgt] + 1e-12).mean()\n    dlogits = probs.copy()\n    dlogits[np.arange(B)[:, None], np.arange(T - 1)[None, :], tgt] -= 1.0\n    dlogits /= N\n    dlog = np.zeros_like(logits)\n    dlog[:, :-1, :] = dlogits\n    g = {k: np.zeros_like(v) for k, v in p.items()}\n    x = cache[\"x\"]\n    g[\"E_tok\"] += np.einsum(\"btv,btc->vc\", dlog, x)\n    dx = dlog @ p[\"E_tok\"]\n    dffn = dx\n    drelu = dffn @ p[\"W2\"].T\n    g[\"W2\"] += cache[\"relu\"].reshape(-1, FF).T @ dffn.reshape(-1, D)\n    g[\"bb2\"] += dffn.sum(axis=(0, 1))\n    df1 = drelu * (cache[\"f1\"] > 0)\n    g[\"W1\"] += cache[\"h2\"].reshape(-1, D).T @ df1.reshape(-1, FF)\n    g[\"bb1\"] += df1.sum(axis=(0, 1))\n    dh2 = df1 @ p[\"W1\"].T\n    dx_prev, dg2, db2 = ln_backward(dh2, cache[\"c2\"])\n    g[\"g2\"] += dg2\n    g[\"b2\"] += db2\n    dx = dx + dx_prev\n    datt_out = dx\n    g[\"Wo\"] += cache[\"att_c\"].reshape(-1, D).T @ datt_out.reshape(-1, D)\n    datt_c = datt_out @ p[\"Wo\"].T\n    datt = datt_c.reshape(B, T, H, DH).transpose(0, 2, 1, 3)\n    w, Vh = cache[\"w\"], cache[\"Vh\"]\n    dweights = datt @ Vh.transpose(0, 1, 3, 2)\n    dVh = w.transpose(0, 1, 3, 2) @ datt\n    dscores = w * (dweights - (dweights * w).sum(axis=-1, keepdims=True))\n    dscores = dscores / np.sqrt(DH)\n    dQh = dscores @ cache[\"Kh\"]\n    dKh = dscores.transpose(0, 1, 3, 2) @ cache[\"Qh\"]\n    dQ = dQh.transpose(0, 2, 1, 3).reshape(B, T, D)\n    dK = dKh.transpose(0, 2, 1, 3).reshape(B, T, D)\n    dV = dVh.transpose(0, 2, 1, 3).reshape(B, T, D)\n    h = cache[\"h\"]\n    g[\"Wq\"] += h.reshape(-1, D).T @ dQ.reshape(-1, D)\n    g[\"Wk\"] += h.reshape(-1, D).T @ dK.reshape(-1, D)\n    g[\"Wv\"] += h.reshape(-1, D).T @ dV.reshape(-1, D)\n    dh = dQ @ p[\"Wq\"].T + dK @ p[\"Wk\"].T + dV @ p[\"Wv\"].T\n    dx0, dg1, db1 = ln_backward(dh, cache[\"c1\"])\n    g[\"g1\"] += dg1\n    g[\"b1\"] += db1\n    dx0_full = dx + dx0\n    np.add.at(g[\"E_tok\"], ids.reshape(-1), dx0_full.reshape(-1, D))\n    g[\"E_pos\"][:T] += dx0_full.sum(axis=0)\n    return loss, g\n\n\ndef main():\n    steps = int(input())\n    p = init_params(0)\n    rng = np.random.default_rng(0)\n    data = np.array([CTOI[c] for c in CORPUS], dtype=np.int64)\n    m = {k: np.zeros_like(v) for k, v in p.items()}\n    v = {k: np.zeros_like(v) for k, v in p.items()}\n    lr, b1_, b2_, eps = 0.05, 0.9, 0.999, 1e-8\n    # TODO: train the model with Adam for `steps` steps (learning rate 0.05):\n    #   - sample 4 windows of length T + 1 from `data`\n    #   - call loss_and_grad(p, ids) to get the loss and gradients\n    #   - update m, v and the parameters p with the Adam rule\n    # TODO: print the final loss (4 decimals) and the perplexity, exp(loss),\n    #   with 2 decimals\n    # TODO: generate 12 characters greedily, starting from \"c\":\n    #   feed each new token back in and print them after \"Generated: \"\n\n\nif __name__ == \"__main__\":\n    main()\n",
  "solution": "\"\"\"L12 exercise solution (standalone): train the tiny transformer, then generate.\nReads the number of training steps from stdin. Fixed seeds: fully deterministic.\n\"\"\"\nimport math\nimport numpy as np\n\nCORPUS = \"the cat sat on the mat. the dog sat on the log.\"\nCHARS = sorted(set(CORPUS))\nVOCAB = len(CHARS)\nCTOI = {c: i for i, c in enumerate(CHARS)}\nD, H, DH, T, FF, MAX_POS = 8, 2, 4, 8, 16, 32\n\n\ndef init_params(seed=0):\n    rng = np.random.default_rng(seed)\n    s = 0.5\n    return {\n        \"E_tok\": rng.normal(0, s, (VOCAB, D)),\n        \"E_pos\": rng.normal(0, s, (MAX_POS, D)),\n        \"Wq\": rng.normal(0, s, (D, D)),\n        \"Wk\": rng.normal(0, s, (D, D)),\n        \"Wv\": rng.normal(0, s, (D, D)),\n        \"Wo\": rng.normal(0, s, (D, D)),\n        \"g1\": np.ones(D), \"b1\": np.zeros(D),\n        \"W1\": rng.normal(0, s, (D, FF)),\n        \"bb1\": np.zeros(FF),\n        \"W2\": rng.normal(0, s, (FF, D)),\n        \"bb2\": np.zeros(D),\n        \"g2\": np.ones(D), \"b2\": np.zeros(D),\n    }\n\n\ndef softmax(x, axis=-1):\n    x = x - x.max(axis=axis, keepdims=True)\n    e = np.exp(x)\n    return e / e.sum(axis=axis, keepdims=True)\n\n\ndef ln_forward(x, g, b, eps=1e-5):\n    mu = x.mean(axis=-1, keepdims=True)\n    var = ((x - mu) ** 2).mean(axis=-1, keepdims=True)\n    std = np.sqrt(var + eps)\n    return g * ((x - mu) / std) + b, ((x - mu) / std, std, g)\n\n\ndef ln_backward(dy, cache):\n    xhat, std, g = cache\n    dg = (dy * xhat).sum(axis=tuple(range(dy.ndim - 1)))\n    db = dy.sum(axis=tuple(range(dy.ndim - 1)))\n    dxhat = dy * g\n    dx = (1.0 / std) * (dxhat - dxhat.mean(axis=-1, keepdims=True)\n                        - xhat * (dxhat * xhat).mean(axis=-1, keepdims=True))\n    return dx, dg, db\n\n\ndef forward(p, ids):\n    B, T = ids.shape\n    x = p[\"E_tok\"][ids] + p[\"E_pos\"][:T][None, :, :]\n    h, c1 = ln_forward(x, p[\"g1\"], p[\"b1\"])\n    Q, K, V = h @ p[\"Wq\"], h @ p[\"Wk\"], h @ p[\"Wv\"]\n    Qh = Q.reshape(B, T, H, DH).transpose(0, 2, 1, 3)\n    Kh = K.reshape(B, T, H, DH).transpose(0, 2, 1, 3)\n    Vh = V.reshape(B, T, H, DH).transpose(0, 2, 1, 3)\n    scores = Qh @ Kh.transpose(0, 1, 3, 2) / np.sqrt(DH)\n    mask = np.triu(np.ones((T, T), dtype=bool), k=1)\n    scores = np.where(mask, -1e9, scores)\n    w = softmax(scores, axis=-1)\n    att = w @ Vh\n    att_c = att.transpose(0, 2, 1, 3).reshape(B, T, D)\n    att_out = att_c @ p[\"Wo\"]\n    x = x + att_out\n    h2, c2 = ln_forward(x, p[\"g2\"], p[\"b2\"])\n    f1 = h2 @ p[\"W1\"] + p[\"bb1\"]\n    relu = np.maximum(0, f1)\n    ffn = relu @ p[\"W2\"] + p[\"bb2\"]\n    x = x + ffn\n    logits = x @ p[\"E_tok\"].T\n    cache = dict(ids=ids, h=h, c1=c1, Q=Q, K=K, V=V, Qh=Qh, Kh=Kh, Vh=Vh,\n                 w=w, att=att, att_c=att_c, h2=h2, c2=c2, f1=f1, relu=relu,\n                 x=x, logits=logits)\n    return logits, cache\n\n\ndef loss_and_grad(p, ids):\n    B, T = ids.shape\n    logits, cache = forward(p, ids)\n    lg = logits[:, :-1, :]\n    tgt = ids[:, 1:]\n    N = tgt.size\n    probs = softmax(lg.reshape(-1, VOCAB), axis=-1).reshape(B, T - 1, VOCAB)\n    loss = -np.log(probs[np.arange(B)[:, None], np.arange(T - 1)[None, :], tgt] + 1e-12).mean()\n    dlogits = probs.copy()\n    dlogits[np.arange(B)[:, None], np.arange(T - 1)[None, :], tgt] -= 1.0\n    dlogits /= N\n    dlog = np.zeros_like(logits)\n    dlog[:, :-1, :] = dlogits\n    g = {k: np.zeros_like(v) for k, v in p.items()}\n    x = cache[\"x\"]\n    g[\"E_tok\"] += np.einsum(\"btv,btc->vc\", dlog, x)\n    dx = dlog @ p[\"E_tok\"]\n    dffn = dx\n    drelu = dffn @ p[\"W2\"].T\n    g[\"W2\"] += cache[\"relu\"].reshape(-1, FF).T @ dffn.reshape(-1, D)\n    g[\"bb2\"] += dffn.sum(axis=(0, 1))\n    df1 = drelu * (cache[\"f1\"] > 0)\n    g[\"W1\"] += cache[\"h2\"].reshape(-1, D).T @ df1.reshape(-1, FF)\n    g[\"bb1\"] += df1.sum(axis=(0, 1))\n    dh2 = df1 @ p[\"W1\"].T\n    dx_prev, dg2, db2 = ln_backward(dh2, cache[\"c2\"])\n    g[\"g2\"] += dg2\n    g[\"b2\"] += db2\n    dx = dx + dx_prev\n    datt_out = dx\n    g[\"Wo\"] += cache[\"att_c\"].reshape(-1, D).T @ datt_out.reshape(-1, D)\n    datt_c = datt_out @ p[\"Wo\"].T\n    datt = datt_c.reshape(B, T, H, DH).transpose(0, 2, 1, 3)\n    w, Vh = cache[\"w\"], cache[\"Vh\"]\n    dweights = datt @ Vh.transpose(0, 1, 3, 2)\n    dVh = w.transpose(0, 1, 3, 2) @ datt\n    dscores = w * (dweights - (dweights * w).sum(axis=-1, keepdims=True))\n    dscores = dscores / np.sqrt(DH)\n    dQh = dscores @ cache[\"Kh\"]\n    dKh = dscores.transpose(0, 1, 3, 2) @ cache[\"Qh\"]\n    dQ = dQh.transpose(0, 2, 1, 3).reshape(B, T, D)\n    dK = dKh.transpose(0, 2, 1, 3).reshape(B, T, D)\n    dV = dVh.transpose(0, 2, 1, 3).reshape(B, T, D)\n    h = cache[\"h\"]\n    g[\"Wq\"] += h.reshape(-1, D).T @ dQ.reshape(-1, D)\n    g[\"Wk\"] += h.reshape(-1, D).T @ dK.reshape(-1, D)\n    g[\"Wv\"] += h.reshape(-1, D).T @ dV.reshape(-1, D)\n    dh = dQ @ p[\"Wq\"].T + dK @ p[\"Wk\"].T + dV @ p[\"Wv\"].T\n    dx0, dg1, db1 = ln_backward(dh, cache[\"c1\"])\n    g[\"g1\"] += dg1\n    g[\"b1\"] += db1\n    dx0_full = dx + dx0\n    np.add.at(g[\"E_tok\"], ids.reshape(-1), dx0_full.reshape(-1, D))\n    g[\"E_pos\"][:T] += dx0_full.sum(axis=0)\n    return loss, g\n\n\ndef main():\n    steps = int(input())\n    p = init_params(0)\n    rng = np.random.default_rng(0)\n    data = np.array([CTOI[c] for c in CORPUS], dtype=np.int64)\n    m = {k: np.zeros_like(v) for k, v in p.items()}\n    v = {k: np.zeros_like(v) for k, v in p.items()}\n    lr, b1_, b2_, eps = 0.05, 0.9, 0.999, 1e-8\n    first = None\n    for step in range(1, steps + 1):\n        starts = rng.integers(0, len(data) - T, size=4)\n        ids = np.stack([data[s:s + T + 1] for s in starts])\n        loss, g = loss_and_grad(p, ids)\n        if first is None:\n            first = loss\n        for k in p:\n            m[k] = b1_ * m[k] + (1 - b1_) * g[k]\n            v[k] = b2_ * v[k] + (1 - b2_) * (g[k] ** 2)\n            mh = m[k] / (1 - b1_ ** step)\n            vh = v[k] / (1 - b2_ ** step)\n            p[k] -= lr * mh / (np.sqrt(vh) + eps)\n    print(f\"Final loss: {loss:.4f}\")\n    print(f\"Perplexity: {math.exp(loss):.2f}\")\n    ids = np.array([[CTOI[\"c\"]]], dtype=np.int64)\n    gen = [\"c\"]\n    for _ in range(12):\n        logits, _ = forward(p, ids)\n        nxt = int(np.argmax(logits[0, -1]))\n        gen.append(CHARS[nxt])\n        ids = np.concatenate([ids, [[nxt]]], axis=1)[:, -T:]\n    print(f\"Generated: {''.join(gen)}\")\n\n\nif __name__ == \"__main__\":\n    main()\n",
  "solutionExplanation": "Sample batches of 4 windows, call loss_and_grad for the loss and gradients, update the parameters with Adam, then report the final loss and perplexity and generate greedily from 'c'.",
  "complexity": "Hard",
  "tests": [
    {
      "name": "Example input",
      "stdin": "25\n",
      "expectedStdout": "Final loss: 1.8971\nPerplexity: 6.67\nGenerated: cat   he oog",
      "hidden": false
    },
    {
      "name": "Second input",
      "stdin": "10\n",
      "expectedStdout": "Final loss: 2.1468\nPerplexity: 8.56\nGenerated: cattttt",
      "hidden": true
    }
  ],
  "hintNotes": {
    "concept": "A training loop samples a batch, computes the loss and gradients, updates the weights with Adam, and repeats; perplexity is exp(loss).",
    "approach": "Loop for the requested steps: sample 4 windows, call loss_and_grad, apply the Adam update with bias correction, then compute exp(loss) and generate greedily from 'c'.",
    "structure": "Read the step count, set up the Adam state, train, print the final loss and perplexity, then generate 12 characters."
  },
  "language": "python"
};;

const CAPSTONE: MasteryAssessment['capstone'] = {
  "title": "Train your tiny LLM end to end",
  "description": "Train the tiny transformer on the corpus until the loss falls below 2.0, generate readable text, and measure it with perplexity.",
  "requirements": [
    "The training loss falls from about 6 to below 2.0",
    "Greedy generation produces readable fragments from the corpus",
    "Perplexity is reported and explained",
    "The model can be saved and reloaded"
  ],
  "rubric": [
    "Loss falls clearly across the training run",
    "Generated text shows learned patterns, not random characters",
    "Perplexity is computed correctly from the loss",
    "The approach is explained, including what would improve with scale"
  ]
};;

export const TRACKS_700: Course[] = [buildCourse(COURSE_SPEC)];
export const SHORT_ASSESSMENTS_700: MasteryAssessment[] = [
  buildShortAssessment('llm-lightweight-python', ASSESSMENT_QUESTIONS, PROGRAMMING, CAPSTONE),
];
