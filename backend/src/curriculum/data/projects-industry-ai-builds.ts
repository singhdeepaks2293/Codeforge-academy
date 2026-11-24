// AI-build projects — step-by-step builds from five public sources
// (structure only; all copy is CodeForge's own wording, nothing copied
// verbatim). Sources, linked as further reading in each description:
//   1. Build Your Own GPT — Karpathy, "Let's build GPT: from scratch, in
//      code, spelled out" (https://www.youtube.com/watch?v=kCc8FmEb1nY)
//   2. RAG — freeCodeCamp/LangChain, "Learn RAG From Scratch"
//      (https://www.youtube.com/watch?v=sVcwVQRHIc8)
//   3. Agents — Anthropic, "Building effective agents"
//      (https://www.anthropic.com/engineering/building-effective-agents)
//   4. MCP server — Model Context Protocol docs, "Build an MCP server"
//      (https://modelcontextprotocol.io/docs/develop/build-server)
//   5. Evals — Hamel, "Your AI Product Needs Evals"
//      (https://hamel.dev/blog/posts/evals/)
// Honest-execution rules for these projects (CodeForge is offline/local,
// no hosted LLM): GPT trains a tiny CPU-only model for real; RAG retrieval
// runs for real offline and generation goes through a pluggable model the
// user supplies (never faked); agents run against a pluggable model with a
// clearly-labelled deterministic stand-in offline; the MCP server is a real
// stdio JSON-RPC server; evals are real pytest/scorer work. Auto-wired by
// the projects-industry-* glob in backend/src/db/seed.ts.
//
// Provisioning (see backend/src/services/provisioning.ts, python entry, and
// backend/Dockerfile): numpy + CPU-only torch (GPT), mcp + pytest + uv
// (MCP/evals) are baked into the Docker image; local installs use
// pip install torch --index-url https://download.pytorch.org/whl/cpu
// plus pip install mcp pytest numpy uv.
import type { Project } from '../types.js';

export const PROJECTS_INDUSTRY: Project[] = [
{
    "id": "proj-ai-gpt",
    "slug": "ai-build-your-own-gpt",
    "level": 4,
    "title": "Build Your Own GPT",
    "description": "AI build project: build a working GPT language model from first principles, in plain PyTorch, on your own CPU. You start with raw text and a character-level tokenizer, then grow the model piece by piece — a bigram baseline, self-attention built up from simple averaging, positional encoding, a full transformer block, and finally the training loop that turns it into a model that generates real text. Everything runs on a tiny character-level model and a small corpus, so training is genuinely runnable on a laptop CPU in minutes, not a cloud bill. Done means you have trained a small GPT yourself and watched it generate text character by character, and you understand every line of the code that makes it work.\n\nFurther reading: https://www.youtube.com/watch?v=kCc8FmEb1nY",
    "skills": ["AI engineering", "LLM", "PyTorch", "Transformers", "Self-attention", "Tokenization", "Training loops", "Python", "Deep learning"],
    "language": "python",
    "functionalRequirements": [
      "Load a small text corpus and build a character-level vocabulary with encode/decode functions",
      "Split the corpus into train and validation sets and build a batch data loader",
      "Implement a bigram language model that predicts the next character and reports loss",
      "Generate text by sampling from the model's next-character distribution",
      "Implement self-attention from scratch: averaging, then weighted averaging with matrix multiplication, then softmax, then full query/key/value attention",
      "Add positional encodings so the model knows where each token sits in the sequence",
      "Build a transformer block with multi-head self-attention, a feed-forward network, residual connections and layer normalisation",
      "Implement the full training loop with AdamW, a learning-rate schedule and loss logging",
      "Train a tiny GPT on CPU end to end and generate coherent-looking text from a prompt",
      "Finetune the trained tiny model on a second small corpus and compare its output before and after"
    ],
    "nonFunctionalRequirements": [
      "The model is tiny and CPU-only: character-level, a small corpus, a few layers — it must train on a laptop CPU in minutes",
      "Every milestone ends with runnable code and a test that proves the increment works",
      "No hosted LLM, cloud GPU or paid service is required at any point",
      "Training progress (loss) must be visible in the terminal so the learner can see learning happening",
      "Generated text is real model output from the trained weights, never canned or hand-written text passed off as generated"
    ],
    "architecture": "A single-file-first design that grows into a small package: data.py owns the corpus, vocabulary and batch loader; model.py starts as the bigram baseline and grows into the full GPT class (token embedding, positional embedding, a stack of transformer blocks, and a final layer norm with a language-model head); train.py owns the optimisation loop with AdamW and a cosine learning-rate decay; generate.py loads a checkpoint and samples text with temperature. Each milestone keeps the previous version working, so the model is always runnable — you replace one piece at a time and re-measure the loss after each change.",
    "databaseSchema": "",
    "apis": [
      "CLI: python train.py --steps 500 --block-size 64",
      "CLI: python generate.py --prompt 'Once upon' --max-tokens 200 --temperature 0.8",
      "CLI: python evaluate.py --checkpoint checkpoints/tiny-gpt.pt",
      "PyTorch CPU: torch.nn, torch.optim.AdamW, torch.nn.functional"
    ],
    "fileStructure": "build-your-own-gpt/\n  data/\n    input.txt\n    input_finetune.txt\n  src/\n    data.py\n    model.py\n    train.py\n    generate.py\n    evaluate.py\n  checkpoints/\n    tiny-gpt.pt\n  tests/\n    test_tokenizer.py\n    test_attention.py\n    test_model.py\n  requirements.txt\n  README.md",
    "taskBreakdown": [
      "Prepare the corpus, tokenizer and train/validation split with a batch loader",
      "Build the bigram baseline and get text generation working",
      "Grow self-attention from averaging to full query/key/value attention",
      "Add positional encoding and the transformer block",
      "Scale up, add dropout and wire the full training loop",
      "Train the tiny CPU model end to end and generate text",
      "Finetune on a second corpus and compare the results"
    ],
    "milestones": [
      {
        "id": "proj-ai-gpt-m1",
        "order": 1,
        "title": "Data, tokenization and the batch loader",
        "objectives": ["Build a character-level vocabulary and encode/decode", "Split the corpus into train and validation sets", "Write a batch data loader that yields (x, y) training pairs"],
        "instructions": "Pick a small public-domain text corpus (a few hundred kilobytes of plain text is plenty — a Shakespeare collection or any plain-text book works) and save it as data/input.txt. Write data.py: read the text, collect the sorted set of unique characters as the vocabulary, and implement encode (string to list of integer ids) and decode (ids back to string), checking that decode(encode(s)) returns s exactly. Split the encoded data 90/10 into train and validation tensors, then write get_batch, which samples a batch of random contiguous chunks of length block_size and returns input x and target y (the same chunk shifted one step forward). Finish by printing the vocabulary size, the train/val sizes, and one sample batch with its decoded text, so you can see with your own eyes that the loader feeds the model the right thing.",
        "concepts": ["Character-level tokenization", "Vocabulary and encode/decode", "Train/validation split", "Batching and context windows"],
        "hints": ["A character vocabulary is tiny (often under 100 symbols) — that is the point; it keeps the model small.", "y is always x shifted by one: the model learns to predict the next character.", "Start with a short block size (32 or 64) while you are debugging."],
        "acceptanceCriteria": ["encode and decode round-trip exactly on a test string", "Train and validation sets cover the whole corpus with no overlap", "get_batch returns tensors of the expected shape", "A decoded sample batch shows real text from the corpus"],
        "tests": ["Run python -m tests.test_tokenizer and confirm the round-trip passes", "Run python src/data.py and check the printed vocabulary size and batch shapes", "Decode one batch by hand and confirm it reads as corpus text"]
      },
      {
        "id": "proj-ai-gpt-m2",
        "order": 2,
        "title": "Bigram baseline and first generated text",
        "objectives": ["Implement a bigram language model", "Train it with cross-entropy loss", "Generate text by sampling from the model"],
        "instructions": "Write model.py with a BigramLanguageModel: a single embedding table of shape (vocab_size, vocab_size) where row i holds the logits for the character that follows character i. The forward pass takes a batch of token ids and returns logits plus, when targets are supplied, the cross-entropy loss — flatten the batch and time dimensions before computing the loss, and print the initial loss (it should start near ln(vocab_size), which is what random guessing costs). Write train.py with a short loop using AdamW that runs a few hundred steps and prints train and validation loss every 50 steps, then write generate.py: start from a single token (or a short prompt), repeatedly take the model's next-token logits, apply softmax, sample one token, append it, and stop after max_tokens. Run it and read the output — it will look like plausible letter-soup, which is exactly right at this stage: the model only knows which character tends to follow which.",
        "concepts": ["Bigram model", "Logits and softmax", "Cross-entropy loss", "Sampling and temperature"],
        "hints": ["Initial loss near ln(vocab_size) is a great sanity check — if it is far off, the loss is wrong.", "Sampling (not argmax) is what makes generation varied; argmax loops into repetition.", "Keep the training loop short here; the point is the pipeline, not the loss value."],
        "acceptanceCriteria": ["The bigram model trains and its loss decreases from the random-guessing level", "Validation loss is reported alongside train loss", "generate.py produces text of the requested length", "Sampling with a higher temperature produces more varied output than greedy decoding"],
        "tests": ["Run python train.py and confirm loss decreases over the first 200 steps", "Run python generate.py --max-tokens 200 and confirm it prints 200 characters", "Generate twice with temperature 0.5 and 1.5 and compare the variety"]
      },
      {
        "id": "proj-ai-gpt-m3",
        "order": 3,
        "title": "Self-attention, built up from averaging",
        "objectives": ["Build attention as weighted averaging over past tokens", "Implement the query/key/value formulation", "Verify attention works with a focused unit test"],
        "instructions": "Do not jump to the finished attention formula — build it in steps inside a scratch module (attention_lab.py) and keep each step runnable. Step one: for each position, average the embeddings of all previous tokens (a lower-triangular mask enforces 'past only') and confirm the output at position t is the mean of tokens 0..t. Step two: replace the uniform average with weights computed by a matrix multiplication between token vectors, so tokens can prefer some predecessors over others. Step three: apply softmax to those weights so they sum to one. Step four: introduce separate query, key and value projections — a token's query is compared against other tokens' keys to decide how much to attend, and the result is a weighted sum of their values — and add the 1/sqrt(head_size) scale that keeps the softmax inputs in a healthy range. At each step, run a tiny hand-built example (a sequence of three or four tokens with known vectors) and check the numbers by hand. End by wrapping the result as a single-head SelfAttention module in model.py that takes (batch, time, channels) and returns the same shape.",
        "concepts": ["Attention as weighted averaging", "Causal masking", "Query, key and value", "Scaled dot-product attention", "Softmax"],
        "hints": ["The triangular mask is the whole trick that makes attention causal — check it is applied before the softmax.", "The scale factor matters: without it the softmax saturates and gradients die.", "A 3-token hand example catches more bugs than a 100-token run."],
        "acceptanceCriteria": ["Each intermediate step produces the expected output on a hand-checked example", "The causal mask prevents any token attending to future tokens", "The final module preserves the input shape (batch, time, channels)", "Attention weights for each position sum to one"],
        "tests": ["Run the hand-built 3-token example and compare attention weights against the hand calculation", "Feed a random tensor through SelfAttention and assert the output shape matches the input shape", "Assert each row of the attention weights sums to 1.0 within tolerance"]
      },
      {
        "id": "proj-ai-gpt-m4",
        "order": 4,
        "title": "Positional encoding and the transformer block",
        "objectives": ["Add positional embeddings", "Build multi-head self-attention", "Assemble the transformer block with residual connections and layer norm"],
        "instructions": "Attention alone cannot tell where a token sits — a shuffled sentence looks the same to it — so add a positional embedding table of shape (block_size, embedding_size) and add it to the token embedding at the input. Then generalise the single head into multi-head attention: split the embedding into several heads, run attention in each head in parallel, and concatenate the results back through a final projection. Now assemble the Block: multi-head attention followed by a position-wise feed-forward network (expand to 4x the width, apply a non-linearity, project back), with a residual connection and a layer norm around each sub-layer — the residual path is what lets gradients flow through a deep stack, and the norm is what keeps activations stable. Wire a small stack of these blocks into the GPT model class, keeping the bigram model's generate() and loss interface unchanged so train.py and generate.py keep working. Train briefly and confirm the loss is already lower than the bigram baseline at the same step count — the model can now use context, not just the previous character.",
        "concepts": ["Positional embeddings", "Multi-head attention", "Feed-forward networks", "Residual connections", "Layer normalisation"],
        "hints": ["Residual connections go around the sub-layer, norm goes before it — getting this order right matters.", "Multi-head is just several small attentions side by side; the head size is embedding_size divided by the number of heads.", "If loss is worse than the bigram model, check the residual wiring first."],
        "acceptanceCriteria": ["The model with positional embeddings beats the bigram loss at the same step count", "Multi-head attention output shape matches the input shape", "Removing the positional embedding measurably hurts the loss (the model needs position)", "train.py and generate.py still run unchanged against the new model"],
        "tests": ["Run python train.py for 200 steps and compare loss with the bigram baseline", "Run the model with positional embeddings disabled and confirm loss is worse", "Run python generate.py and confirm output is more structured than the bigram output"]
      },
      {
        "id": "proj-ai-gpt-m5",
        "order": 5,
        "title": "Scaling up, dropout and the real training loop",
        "objectives": ["Scale the model to a small GPT configuration", "Add dropout for regularisation", "Build the full training loop with a learning-rate schedule and checkpoints"],
        "instructions": "Scale the configuration up to a genuinely small GPT: embedding size around 128–192, 4–6 heads, 4–6 blocks, a context length of 128–256 — still tiny, still CPU-trainable, but now with real capacity. Add dropout after the attention and feed-forward sub-layers (and on the embeddings) so the model regularises instead of memorising the small corpus. Then harden train.py into the real loop: AdamW with a sensible weight decay, a warmup followed by cosine decay of the learning rate, periodic evaluation on the validation set, loss logging every few dozen steps, and checkpoint saving so a run can be resumed or its weights loaded for generation. Add a --resume flag and a simple estimate_loss helper that averages the loss over a handful of batches instead of trusting a single noisy batch. Run a short training session and watch the validation loss: it should fall steadily and then flatten, which is the signal that the model has learned what this small corpus can teach it.",
        "concepts": ["Model scaling", "Dropout", "AdamW and weight decay", "Learning-rate warmup and cosine decay", "Checkpoints and resuming"],
        "hints": ["Dropout must be disabled at generation time — model.eval() handles that.", "A single batch's loss is noisy; average over 10+ batches before judging.", "Save checkpoints regularly; a crashed run should cost you minutes, not hours."],
        "acceptanceCriteria": ["The scaled model trains stably with the LR schedule and no loss spikes", "Validation loss improves over the smaller model", "A checkpoint can be saved and resumed without changing the loss trajectory", "Dropout is active in training and inactive in evaluation mode"],
        "tests": ["Run python train.py --steps 500 and confirm train and validation loss both decrease", "Save a checkpoint, resume with --resume, and confirm loss continues from the same level", "Run evaluate.py on a checkpoint and confirm the reported loss matches the training log"]
      },
      {
        "id": "proj-ai-gpt-m6",
        "order": 6,
        "title": "Train the tiny model end to end on CPU",
        "objectives": ["Run a full CPU training session", "Generate text from the trained checkpoint", "Assess the model's output honestly"],
        "instructions": "Now run the full session: train the small GPT for a few thousand steps on CPU (this should take minutes to tens of minutes on a modern laptop — if it is taking hours, shrink the model or the step count rather than giving up). While it trains, note the loss curve: it should drop from the random-guessing level to a fraction of it, and the validation loss should track the training loss without diverging sharply. When it finishes, load the checkpoint in generate.py and sample a few hundred characters from several prompts — a seed from the training corpus and a seed the model has never seen. Read the output critically and write a short assessment in the README: what the model does well (local spelling, common words, repeated patterns from the corpus), what it fails at (long-range coherence, facts, anything beyond its tiny context), and why those limits follow directly from its size and training data. This honest assessment is part of the deliverable — a tiny model that generates fluent-looking nonsense in places is working correctly, not broken.",
        "concepts": ["End-to-end training", "CPU training budgets", "Sampling and temperature", "Honest model evaluation"],
        "hints": ["If training is too slow, cut block_size or n_layer first — those dominate the cost.", "Temperature around 0.8 is a good default; 0.2 is safe and dull, 1.5 is creative and chaotic.", "Compare output from a training-corpus prompt and a novel prompt — the difference shows memorisation vs generalisation."],
        "acceptanceCriteria": ["A full training run completes on CPU and produces a saved checkpoint", "Generated text from the checkpoint is visibly more coherent than the bigram output", "The README contains an honest assessment of the model's strengths and limits", "Loss curves for train and validation are recorded (even as pasted log lines)"],
        "tests": ["Run the full training command and confirm it completes with a checkpoint file on disk", "Run python generate.py from the checkpoint with two different prompts and inspect both outputs", "Run generate.py with temperature 0.2 and 1.2 and confirm the outputs differ in variety"]
      },
      {
        "id": "proj-ai-gpt-m7",
        "order": 7,
        "title": "Pretraining vs finetuning on a second corpus",
        "objectives": ["Explain pretraining vs finetuning", "Finetune the tiny model on a second small corpus", "Compare output before and after finetuning"],
        "instructions": "This is the milestone that makes the whole project click: the model you trained in milestone 6 is a pretrained model, and now you will finetune it. Prepare a second small corpus in a clearly different style — if the first was Shakespeare, make the second modern prose, or code comments, or song lyrics — and save it as data/input_finetune.txt. Generate 200 characters from the pretrained checkpoint on a prompt in the new style and save the output. Then finetune: load the same checkpoint, train on the new corpus with a lower learning rate (about a tenth of the pretraining rate) for a few hundred steps, and save a second checkpoint. Generate from the finetuned checkpoint with the same prompt and compare the two outputs side by side, then write up the comparison: which vocabulary, spellings and rhythms moved toward the new corpus, what the model kept from pretraining, and where a few hundred steps of finetuning was not enough. Finish by summarising in the README the general pattern you have just demonstrated — pretrain once on a large corpus, finetune cheaply on a small one — and why it is the standard way real language models are built.",
        "concepts": ["Pretraining", "Finetuning", "Catastrophic forgetting", "Lower learning rates for finetuning", "Domain adaptation"],
        "hints": ["A lower learning rate for finetuning protects what the model already knows.", "A few hundred steps is enough to see the style shift — do not overtrain or it will just memorise the small corpus.", "Keep both checkpoints so the before/after comparison is reproducible."],
        "acceptanceCriteria": ["The finetuned checkpoint generates text measurably closer in style to the second corpus", "The before/after comparison is saved and written up in the README", "The pretrained checkpoint is preserved untouched", "The write-up explains pretraining vs finetuning in the learner's own words"],
        "tests": ["Generate from the pretrained checkpoint and save the output", "Finetune, generate from the new checkpoint with the same prompt, and diff the two outputs", "Check the pretrained checkpoint file is unchanged (compare its hash before and after finetuning)"]
      }
    ],
    "reviewChecklist": [
      "The tokenizer round-trips exactly and the data loader feeds correct (x, y) pairs",
      "Self-attention was built up step by step and verified on a hand-checked example",
      "The transformer block has multi-head attention, a feed-forward network, residuals and layer norm",
      "The tiny model trains on CPU and generates real text from its trained weights",
      "Finetuning demonstrably shifts the model's style toward the second corpus",
      "The README honestly states the model's limits and what it cannot do"
    ],
    "finalAssessment": [
      "Explain, without looking at the code, how attention decides which past tokens matter for the next prediction",
      "Show the loss curve from the full training run and explain what each phase of it means",
      "Generate text from the pretrained and the finetuned checkpoints and explain the differences",
      "Point to the line where the causal mask is applied and explain what breaks if it is removed",
      "Describe what you would change to make the model better, and what each change would cost in training time"
    ]
  },
  {
    "id": "proj-ai-rag",
    "slug": "ai-rag-system-from-scratch",
    "level": 3,
    "title": "Build a RAG System From Scratch",
    "description": "AI build project: build a complete retrieval-augmented generation (RAG) system from scratch, in Python, running fully offline for everything except the final generation step. You start by indexing a local document set — chunking it and retrieving with TF-IDF and cosine similarity — then make retrieval better with top-k tuning and evaluation, teach the system to rewrite and decompose queries, route queries and apply structured filters, and finally add the advanced patterns: multi-representation indexing, summary-based retrieval, late-interaction ranking, and corrective loops that check their own answers. The retrieval pipeline runs for real, offline, against your own documents. Generation needs a language model, which you supply yourself (an API key or a local model) through a pluggable model interface — CodeForge never fakes LLM output with canned text, so if no model is configured, generation is honestly reported as unavailable rather than simulated.\n\nFurther reading: https://www.youtube.com/watch?v=sVcwVQRHIc8",
    "skills": ["AI engineering", "LLM", "RAG", "Information retrieval", "TF-IDF", "Query translation", "Python", "Evaluation"],
    "language": "python",
    "functionalRequirements": [
      "Chunk a local document set into overlapping passages with metadata (source, section, chunk id)",
      "Index the chunks with TF-IDF and retrieve the top-k most similar chunks for a query using cosine similarity",
      "Report retrieval scores and evaluate retrieval quality against a small hand-labelled question set",
      "Rewrite queries with multi-query expansion, RAG fusion, decomposition, step-back prompting and HyDE",
      "Route queries to the right retrieval strategy or document subset, and apply structured filters (source, date, section)",
      "Build multi-representation indexing (a short summary per chunk used for retrieval, full chunk used for generation)",
      "Implement a simplified local version of RAPTOR-style summary trees and ColBERT-style late interaction, clearly labelled as simplified",
      "Add corrective retrieval (CRAG) and adaptive retrieval loops that self-grade retrieved chunks and re-retrieve when they are insufficient",
      "Wire the full pipeline — retrieve, rerank, build the prompt, generate, cite sources — behind one CLI",
      "Evaluate the end-to-end system on a question set and report retrieval accuracy and answer quality honestly"
    ],
    "nonFunctionalRequirements": [
      "The retrieval pipeline (indexing, retrieval, query translation, routing, evaluation) runs fully offline against local documents — no network or API key needed",
      "Generation needs a language model the user supplies (API key or a local model) through a pluggable model interface; CodeForge never fakes LLM output with canned text",
      "If no model is configured, the system must report generation as unavailable and still return the retrieved chunks and scores",
      "Every retrieved answer must cite the source chunk it came from",
      "No claim of vector embeddings: retrieval uses TF-IDF/cosine unless a local embedding model is actually available and configured, in which case that must be stated explicitly",
      "Advanced techniques implemented as simplified local versions (RAPTOR summaries, ColBERT-style late interaction) must be labelled as simplified in the code and the README"
    ],
    "architecture": "A pipeline of small modules with clean seams: ingest.py loads documents and chunks them; index.py builds the TF-IDF index and answers top-k queries with cosine scores; query.py owns query translation (multi-query, fusion, decomposition, step-back, HyDE); router.py routes queries and applies structured filters; advanced.py holds the multi-representation index, the simplified summary-tree retrieval and the late-interaction reranker; corrective.py owns the self-grading and re-retrieval loops; llm.py is the pluggable model interface (one method, generate(prompt) -> text) with a local-model and an API-backed implementation and an explicit 'no model configured' state; app.py wires it all into a single ask() function and a CLI. The seams matter: each stage can be tested and swapped independently, and the LLM is a replaceable plug, never baked into the retrieval logic.",
    "databaseSchema": "",
    "apis": [
      "CLI: python ingest.py --docs data/docs --out data/index",
      "CLI: python ask.py --question '...' --top-k 5",
      "CLI: python evaluate.py --questions data/eval_questions.json",
      "LLM interface: llm.generate(prompt: str) -> str (pluggable; API-backed or local model)"
    ],
    "fileStructure": "rag-from-scratch/\n  data/\n    docs/\n    eval_questions.json\n  src/\n    ingest.py\n    index.py\n    query.py\n    router.py\n    advanced.py\n    corrective.py\n    llm.py\n    app.py\n    ask.py\n    evaluate.py\n  tests/\n    test_chunking.py\n    test_retrieval.py\n    test_query.py\n  README.md",
    "taskBreakdown": [
      "Build the document indexer: chunking plus TF-IDF/cosine retrieval",
      "Measure retrieval quality with top-k, scores and a labelled question set",
      "Add query translation: multi-query, fusion, decomposition, step-back and HyDE",
      "Add routing and structured query construction with filters",
      "Add advanced indexing: multi-representation, summary trees, late interaction, CRAG and Adaptive RAG",
      "Wire the end-to-end system and evaluate its answers"
    ],
    "milestones": [
      {
        "id": "proj-ai-rag-m1",
        "order": 1,
        "title": "Indexing: chunking and TF-IDF retrieval",
        "objectives": ["Chunk a local document set into passages", "Build a TF-IDF index over the chunks", "Retrieve the top-k chunks for a query with cosine similarity"],
        "instructions": "Collect a small local document set — ten to twenty plain-text or Markdown files on a single topic you know well (your own notes work best, because you can judge whether retrieval is right). Write ingest.py to split each document into overlapping chunks of roughly 300–500 characters with a 50-character overlap, keeping metadata on every chunk: source file, section heading if there is one, and a chunk id. Then write index.py: build a TF-IDF vector for every chunk (use scikit-learn's TfidfVectorizer, or write a small one yourself if you prefer), and implement retrieve(query, k) to vectorise the query the same way, compute cosine similarity against every chunk, and return the top-k chunks with their scores. Finish with a small REPL or CLI: type a question, see the top chunks with their scores and sources printed. Try questions you know the answer to and check by hand whether the right chunk comes first.",
        "concepts": ["Chunking and overlap", "TF-IDF", "Cosine similarity", "Top-k retrieval", "Retrieval metadata"],
        "hints": ["Overlap between chunks stops answers being cut in half at a boundary.", "Start with plain TF-IDF — it is honest, offline and surprisingly strong on a small corpus.", "Your own notes make the best test corpus because you can judge the results."],
        "acceptanceCriteria": ["Every document is chunked with metadata intact", "retrieve() returns k chunks ranked by cosine score", "A question about a known fact returns the chunk containing that fact in the top 3", "Scores are printed alongside each retrieved chunk"],
        "tests": ["Run the chunker and count chunks per document", "Ask three questions with known answers and confirm the right chunk is in the top 3", "Run python -m tests.test_retrieval and confirm the ranking test passes"]
      },
      {
        "id": "proj-ai-rag-m2",
        "order": 2,
        "title": "Retrieval quality: top-k, scores and evaluation",
        "objectives": ["Build a labelled evaluation question set", "Measure retrieval quality at several values of k", "Tune chunk size and top-k from the measurements"],
        "instructions": "Write data/eval_questions.json: 15–20 questions about your document set, each labelled with the chunk id(s) that contain the answer — you are the judge, so write questions whose answers you can verify by reading the documents. Write evaluate.py to run every question through retrieve(), record whether a correct chunk appears in the top 1, top 3 and top 5, and report recall@1, recall@3 and recall@5 plus the average score of the top hit. Then run the experiment: try k = 1, 3, 5 and 10, and re-chunk the corpus at two different chunk sizes, and record the numbers in a small results table in the README. Use the numbers to pick your defaults — and write down why you picked them, including the trade-off you observed (larger k catches more answers but dilutes the context the generator will see). This is the first time the system is measured rather than eyeballed, and the numbers now drive the decisions.",
        "concepts": ["Recall@k", "Evaluation question sets", "Chunk-size trade-offs", "Top-k tuning"],
        "hints": ["A question set you wrote yourself is only as honest as your labelling — label from the documents, not from memory.", "Recall@1 is strict; recall@5 is forgiving; report both.", "If recall is low everywhere, the chunking is usually the problem, not the ranking."],
        "acceptanceCriteria": ["An evaluation set of at least 15 labelled questions exists", "recall@1, recall@3 and recall@5 are reported", "Chunk size and top-k were chosen from measured results, not guessed", "The results table and the reasoning are recorded in the README"],
        "tests": ["Run python evaluate.py and confirm recall numbers are printed", "Re-run evaluation after changing chunk size and confirm the numbers change", "Check that a deliberately wrong label lowers the score (the evaluation is actually sensitive)"]
      },
      {
        "id": "proj-ai-rag-m3",
        "order": 3,
        "title": "Query translation: multi-query, fusion, decomposition, step-back and HyDE",
        "objectives": ["Generate multiple query variants from one question", "Fuse ranked results from several queries", "Decompose complex questions and step back to general principles", "Implement HyDE with a clearly labelled stand-in document"],
        "instructions": "One query is rarely the best query, so build query.py as a set of translators, each a pure function from a question to one or more queries. Multi-query: produce three rewordings of the question and retrieve for each. RAG fusion: combine the ranked lists with reciprocal rank fusion so a chunk ranked highly by several variants rises to the top. Decomposition: split a multi-part question into sub-questions, retrieve for each, and merge the results. Step-back: restate the question at a higher level of generality (the principle behind the specific question) and retrieve on that too. HyDE: write a short hypothetical answer to the question and retrieve on that text — and here be honest about the seam: HyDE normally needs an LLM to write the hypothetical document, so in this offline pipeline it takes a pluggable generator (the same llm.py interface from the final system) and, when no model is configured, falls back to a clearly labelled template-based hypothetical built from the question's own keywords, with the README stating that this is a stand-in and what a real HyDE pass would do differently. Measure each technique on your evaluation set and record which ones actually helped and which did not — not every technique helps on every corpus, and the numbers are the answer.",
        "concepts": ["Query expansion", "Reciprocal rank fusion", "Question decomposition", "Step-back prompting", "HyDE (hypothetical document embeddings)"],
        "hints": ["Reciprocal rank fusion is a few lines and beats naive score averaging across queries.", "Decomposition only helps on genuinely multi-part questions — test it on one.", "Label the HyDE fallback as a stand-in in the code, not just the README."],
        "acceptanceCriteria": ["Each translator is implemented and independently callable", "RAG fusion combines multiple ranked lists into one", "The HyDE stand-in is labelled as such wherever it appears", "Evaluation shows which techniques helped on this corpus and which did not"],
        "tests": ["Run evaluate.py with multi-query enabled and compare recall@5 with the baseline", "Run evaluate.py with fusion enabled and confirm the fused list differs from any single list", "Run a multi-part question through decomposition and check each sub-question retrieves its own chunk"]
      },
      {
        "id": "proj-ai-rag-m4",
        "order": 4,
        "title": "Routing and structured query construction",
        "objectives": ["Route questions to the right retrieval strategy or document subset", "Apply structured filters (source, section, date)", "Build a query-construction step that separates filters from free text"],
        "instructions": "Not every question should search the whole corpus the same way, so build router.py. First, logical routing: classify each question into a category (for example, factual lookup, how-to, or comparison) with a small rule-based classifier over keywords and question shape, and route each category to a different strategy — factual lookups use the plain top-k retrieval, how-to questions use the multi-query expansion from milestone 3, comparisons retrieve once per compared item. Second, semantic routing: pick the document subset the question is about (by matching the question against per-document descriptions you write) and search only that subset. Third, structured query construction: parse explicit filters out of the question before retrieval — a named source, a section, or a date range — and apply them as hard filters on chunk metadata so a question about 'the 2024 guide' never returns chunks from the 2023 one. Keep the router honest: log every routing decision and filter applied, and add a fallback that searches everything when the classifier is unsure. Measure the routing on your evaluation set: report how often the router picked the right subset and whether filtered retrieval beat unfiltered retrieval on the questions that carry filters.",
        "concepts": ["Logical routing", "Semantic routing", "Structured filters", "Query construction", "Fallback behaviour"],
        "hints": ["A small rule-based router you can inspect beats a clever one you cannot debug.", "Log the routing decision — silent routing is untestable routing.", "Hard filters on metadata are exact; use them for source and date, not for meaning."],
        "acceptanceCriteria": ["The router classifies questions and picks a strategy per category", "Semantic routing restricts search to the right document subset", "Structured filters are parsed from questions and applied as metadata filters", "An uncertain classification falls back to searching the whole corpus, and the fallback is logged"],
        "tests": ["Run evaluate.py with routing on and compare recall with the unrouted baseline", "Ask a question naming a specific source and confirm no chunk from another source is returned", "Feed an ambiguous question and confirm the log shows the fallback"]
      },
      {
        "id": "proj-ai-rag-m5",
        "order": 5,
        "title": "Advanced indexing: multi-representation, summaries, late interaction and corrective loops",
        "objectives": ["Build multi-representation indexing", "Implement a simplified RAPTOR-style summary tree", "Implement a simplified ColBERT-style late-interaction reranker", "Add CRAG corrective retrieval and Adaptive RAG self-grading"],
        "instructions": "This milestone adds the advanced patterns, each as an honest simplified local version — label every one as simplified in the code and the README, with a note on what the full version does differently. Multi-representation: for each chunk, store a short summary alongside the full text, index the summaries for retrieval, and return the full chunk for generation — summaries match queries better because they strip detail. RAPTOR-style: cluster the chunk summaries, write a short summary of each cluster (using the same pluggable model interface, or a keyword-extractive summary when no model is configured, labelled as such), and build a two-level tree so a broad question can retrieve a cluster summary and a specific one can drill down to chunks. ColBERT-style late interaction: keep per-term scores instead of a single document vector — score a query against a chunk by taking, for each query term, the best-matching chunk term — and use it as a reranker over the top 20 TF-IDF results. Then the corrective loops: CRAG — after retrieval, grade each chunk's relevance to the question with a simple scorer (term overlap plus a threshold, or the pluggable model when one is configured), discard chunks that fail, and re-retrieve with a rewritten query if too few survive; Adaptive RAG — let the grader decide the strategy per question (simple question: one retrieval pass; hard question: the full corrective loop). Measure each addition on the evaluation set and keep only what measurably helps — an advanced technique that does not improve recall on your corpus is a documented negative result, not a failure.",
        "concepts": ["Multi-representation indexing", "RAPTOR summary trees", "Late interaction (ColBERT)", "CRAG corrective retrieval", "Adaptive RAG", "Self-grading"],
        "hints": ["Summaries for retrieval, full text for generation — that separation is the whole idea.", "Late interaction as a reranker over 20 candidates is cheap; over the whole corpus it is not.", "The grader's threshold is a tuning knob — measure it, don't guess it."],
        "acceptanceCriteria": ["Multi-representation retrieval returns full chunks found via their summaries", "The summary tree has at least two levels and is labelled simplified", "The late-interaction reranker reorders the top 20 and is labelled simplified", "CRAG discards irrelevant chunks and re-retrieves when too few survive", "Adaptive RAG picks different strategies for easy vs hard questions", "Each technique's measured effect on recall is recorded"],
        "tests": ["Run evaluate.py with multi-representation on and compare recall@5 with the baseline", "Ask a broad question and confirm a cluster summary is retrieved", "Inject an irrelevant chunk into the top results and confirm CRAG discards it", "Run an easy and a hard question and confirm the logs show different strategies"]
      },
      {
        "id": "proj-ai-rag-m6",
        "order": 6,
        "title": "End-to-end system and honest evaluation",
        "objectives": ["Wire the full pipeline behind one CLI", "Plug in a real model for generation with a clear no-model state", "Evaluate the end-to-end system and write up the results"],
        "instructions": "Wire everything into app.py: ask(question) runs routing, query translation, retrieval, reranking, corrective loops and then generation, and returns the answer with the cited chunk ids and their scores. Build llm.py as the pluggable model interface — a single generate(prompt) method — with two implementations: one that calls a chat API using a key from an environment variable, and one that shells out to a local model the user has installed. The no-model state is a first-class outcome: if neither is configured, ask() returns the retrieved chunks, their scores and a clear message that generation is unavailable because no model is configured — it never invents an answer and never prints canned text as if a model wrote it. Then run the full evaluation: extend evaluate.py to score end-to-end answers on your question set — retrieval recall plus, for each answer, whether it is grounded in the cited chunks (check by hand: does the answer's key claim appear in a cited chunk?) — and record the results in the README with the honest caveats: what the system answers well, where retrieval fails, and where generation would help or hurt. Finish with a short README section on what you would change next (for example, real embeddings if a local model is available, or a larger evaluation set) and why.",
        "concepts": ["End-to-end RAG pipeline", "Pluggable model interfaces", "Grounded answers and citations", "Answer evaluation", "Honest failure modes"],
        "hints": ["Citations are the feature: an answer without a source is a claim, not a retrieval result.", "Grounding checks are manual at this scale — read five answers and judge them yourself.", "The no-model path must be tested, not just written — run ask.py with no key set and read what it prints."],
        "acceptanceCriteria": ["ask.py runs the full pipeline from one command", "With a model configured, answers are generated and cite their source chunks", "With no model configured, ask.py reports generation unavailable and still returns the retrieved chunks", "End-to-end evaluation reports retrieval recall and grounded-answer rate", "The README records the results, the caveats and the next steps"],
        "tests": ["Run python ask.py --question '...' with no model configured and confirm the honest unavailable message and the retrieved chunks", "Run python ask.py with a model configured and confirm the answer cites a chunk id", "Run python evaluate.py end to end and confirm recall and grounded-answer rates are printed"]
      }
    ],
    "reviewChecklist": [
      "The retrieval pipeline runs fully offline with no API key",
      "Retrieval quality is measured with recall@k on a labelled question set",
      "Query translation, routing and filters are each independently testable",
      "Advanced techniques are labelled as simplified local versions where they are",
      "Generation goes through the pluggable model interface and is never faked",
      "Every answer cites the chunk it came from"
    ],
    "finalAssessment": [
      "Ask a question and trace it through routing, translation, retrieval, reranking and generation, naming each stage's output",
      "Show the recall@k table and explain which tuning choice mattered most and why",
      "Run ask.py with no model configured and explain exactly what happens and why",
      "Explain the difference between multi-representation retrieval and plain chunk retrieval, with an example",
      "Describe a question the system answers badly, diagnose which stage fails, and say how you would fix it"
    ]
  },
{
    "id": "proj-ai-agents-effective",
    "slug": "ai-agents-effective",
    "level": 4,
    "title": "Build Effective AI Agents",
    "description": "AI build project: Build a working agent harness in Python from first principles — a tool-use loop over a pluggable model interface, plus the classic workflow patterns (prompt chaining, routing, parallelization, orchestrator-workers, evaluator-optimizer) implemented as plain code you can run and inspect. Each milestone ends with a working increment, and the guiding rule throughout is to start with the simplest solution that could work and only add complexity when a concrete failure demands it. The harness runs end to end offline with a clearly-labelled deterministic stand-in model: the stand-in is a local stub, NOT a real LLM, and its output must never be presented as a real model's reasoning. To get real generation, plug in an LLM the user supplies (their own API key or local model); generation needs a real model and is not faked here.\n\nFurther reading: https://www.anthropic.com/engineering/building-effective-agents",
    "skills": ["AI engineering", "LLM", "Agent design", "Tool use", "Prompt chaining", "Routing", "Parallelization", "Orchestrator-workers", "Evaluator-optimizer", "Python", "API design"],
    "language": "python",
    "functionalRequirements": [
      "Provide a pluggable model interface so any model backend (or the labelled stand-in) can be swapped in without touching the harness",
      "Implement an augmented LLM loop: model call, tool selection, real tool execution, result fed back into the next call",
      "Implement prompt chaining: decompose a task into ordered steps with a gate between steps that can stop or retry",
      "Implement routing: classify an incoming request and dispatch it to a specialised prompt and tool set",
      "Implement parallelization: split work into independent sections run together, and run the same step several times and vote on the result",
      "Implement orchestrator-workers: a planner that breaks a task down and fans work out to worker calls, then synthesises the results",
      "Implement an evaluator-optimizer loop: generate, evaluate against a checklist, and refine until the evaluation passes or a limit is hit",
      "Implement a full agent loop: tool-use with environment ground truth, checkpoints that can resume after a failure, and stopping conditions",
      "Record a trace of every model call, tool call and decision so any run can be replayed and inspected"
    ],
    "nonFunctionalRequirements": [
      "Start with the simplest solution: use LLM APIs directly before reaching for any agent framework, and add patterns only when a concrete failure requires them",
      "The deterministic stand-in model is a local stub, NOT a real LLM; its output is never presented as a real model's reasoning or knowledge",
      "Real generation requires an LLM supplied by the user; the project never pretends the stand-in generated real language-model output",
      "Every tool executes for real against local data or local computation — no tool fakes a result",
      "Checkpoints make a run resumable: an interrupted agent run can be resumed from its last checkpoint",
      "Stopping conditions (step limit, token budget, explicit finish signal) always bound a run so it cannot loop forever"
    ],
    "architecture": "A thin harness sits between a model interface and a tool registry. The model interface is a single protocol — one method that takes messages and returns a response, optionally naming a tool to call — with two implementations: a deterministic stand-in used offline for testing the harness logic, and a real-model adapter the user wires to their own LLM. Each workflow pattern (chaining, routing, parallelization, orchestrator-workers, evaluator-optimizer) is a small function over that interface, not a framework: it calls the model, runs tools for real, and records every step in a trace log. The full agent adds an environment that supplies ground-truth feedback (real checks against local data, such as whether a file was created or a calculation is correct), a checkpoint store that snapshots state after each step, and stopping conditions checked before every iteration.",
    "databaseSchema": "",
    "apis": [
      "Model interface: class Model with a complete(messages) method returning text and an optional tool call",
      "Tool registry: register(name, description, function) and call(name, arguments) with real execution",
      "CLI: python agent.py run --task '<task>', python agent.py run --pattern chain --task '<task>', python agent.py replay --trace <file>",
      "Trace log: JSON lines file recording every model call, tool call, result and decision"
    ],
    "fileStructure": "ai-agents/\n  src/\n    model.py\n    standin.py\n    real_model.py\n    tools.py\n    harness.py\n    patterns.py\n    agent.py\n    checkpoints.py\n    trace.py\n  tasks/\n    research_task.json\n    triage_task.json\n  traces/\n  tests/\n    test_harness.py\n    test_patterns.py\n    test_agent.py\n  README.md",
    "taskBreakdown": [
      "Define the model interface and the deterministic stand-in, clearly labelled as a stub",
      "Build the tool registry with real local tools and the augmented LLM loop",
      "Implement prompt chaining with gates between steps",
      "Implement routing and parallelization (sectioning and voting)",
      "Implement orchestrator-workers and the evaluator-optimizer loop",
      "Assemble the full agent with ground truth, checkpoints and stopping conditions",
      "Run every pattern against the same task and compare the traces",
      "Document when each pattern earns its complexity and when the simple loop is enough"
    ],
    "milestones": [
      {
        "id": "proj-ai-agents-effective-m1",
        "order": 1,
        "title": "Augmented LLM: the simplest working loop",
        "objectives": ["Define the pluggable model interface", "Build a tool registry with real local tools", "Run the first model-tool-model loop end to end"],
        "instructions": "Start with the smallest thing that works. Define a Model protocol with one method: it takes a list of messages and returns text plus, optionally, a tool call naming a tool and its arguments. Implement two backends behind it: a deterministic stand-in that follows simple rules (for example, it calls the calculator tool when it sees an arithmetic expression, and the file-search tool when it sees a filename) and a real-model adapter that calls an LLM API the user supplies — leave the adapter unconfigured by default and document exactly what the user must supply. Build the tool registry with three tools that do real local work: a calculator, a local file search over a sample directory, and a local note store (read/write a JSON file). Then write the augmented LLM loop: send the task to the model, run any tool it requests for real, feed the result back, and repeat until the model answers in plain text or a step limit is hit. Run it with the stand-in on a task like 'add 12 and 30, then save the answer to notes' and read the trace to confirm the tool really ran and the note file really changed.",
        "concepts": ["Augmented LLM", "Tool-use loop", "Pluggable model interface", "Deterministic stand-in"],
        "hints": ["The stand-in is a stub for testing the harness, not a model — label it everywhere it appears.", "One method on the model interface keeps every pattern simple.", "Read the trace after every run; it is the only honest record of what happened."],
        "acceptanceCriteria": ["The model interface has exactly one call path used by every pattern", "The stand-in is labelled as a stub in code, output and docs", "A run executes the calculator and note tools for real and the note file contains the correct answer", "The loop stops on a plain-text answer and also stops at the step limit", "The trace records every model call and tool call"],
        "tests": ["Run the loop on an arithmetic task and check the note file", "Run a task needing no tool and confirm no tool is called", "Set the step limit to 1 and confirm the run stops instead of looping", "Swap the stand-in for a mock model and confirm the harness is unchanged"]
      },
      {
        "id": "proj-ai-agents-effective-m2",
        "order": 2,
        "title": "Prompt chaining: ordered steps with gates",
        "objectives": ["Decompose a task into ordered LLM calls", "Add a gate between steps that can stop or retry", "Show a chain beating a single call on a multi-part task"],
        "instructions": "Pick a task that fails as one big call — for example, summarising a long local document in three steps: extract the key facts, draft a summary from those facts, then check the draft against the facts. Implement a chain runner: a list of steps, each with its own prompt template and its own output contract, where each step receives the previous step's output. Add a gate after each step: a small deterministic check (for example, every cited fact must appear in the source text) that either passes the output on, retries the step once with a correction note, or stops the chain with a clear failure. Run the chain with the stand-in first to prove the plumbing, then with a real model if one is available, and compare the result against a single-call attempt on the same document. Record which failure the chain fixed — a missing fact, a hallucinated detail, a skipped step — and write it down; that failure is the justification for the extra complexity.",
        "concepts": ["Prompt chaining", "Decomposition", "Gates and validation", "Retry with feedback"],
        "hints": ["A gate must be a real check, not a second model call that nods along.", "One retry, then stop — endless retries hide a bad step.", "If the single call already works, the chain has not earned its place."],
        "acceptanceCriteria": ["The chain runs three distinct steps in order, each with its own prompt", "A gate catches a deliberately bad intermediate output and retries or stops", "The chained result is measurably better than the single-call result on the same document", "The failure that justified the chain is written in the README"],
        "tests": ["Run the chain end to end and inspect each step's output", "Inject a bad fact into a step and confirm the gate catches it", "Run the single-call version and compare the two outputs side by side"]
      },
      {
        "id": "proj-ai-agents-effective-m3",
        "order": 3,
        "title": "Routing: classify, then dispatch",
        "objectives": ["Build a classifier that routes requests by type", "Give each route its own prompt and tool set", "Handle the unknown case safely"],
        "instructions": "Build a router for a small support-desk task set with three kinds of request: a calculation question, a question about a local document, and a request to update the note store. Implement the classifier first as deterministic rules (keywords and patterns) behind the same model interface, so routing works offline; then add an optional model-based classifier as a second implementation. Each route gets its own prompt and only the tools it needs — the calculation route sees the calculator, the document route sees file search, the update route sees the note store. An input that matches no route must go to a fallback that asks a clarifying question instead of guessing a route. Run ten sample requests through the router, including two ambiguous ones, and log which route each took and why.",
        "concepts": ["Routing", "Classification", "Least-privilege tool sets", "Fallback handling"],
        "hints": ["A route that sees tools it does not need will eventually misuse them.", "Ambiguous input is a normal case — design the fallback first.", "Log the reason for each routing decision, not just the decision."],
        "acceptanceCriteria": ["Ten sample requests are routed to the correct route or the fallback", "Each route can only call its own tools", "Ambiguous requests reach the clarifying fallback, never a guessed route", "Both the rule-based and model-based classifiers work behind the same interface"],
        "tests": ["Run the ten-request set and check the routing log", "Ask a document question through the calculation route's tool set and confirm it cannot answer", "Send a nonsense request and confirm the fallback responds"]
      },
      {
        "id": "proj-ai-agents-effective-m4",
        "order": 4,
        "title": "Parallelization: sectioning and voting",
        "objectives": ["Split work into independent sections run together", "Run the same step several times and vote", "Measure when parallelism helps and when it hurts"],
        "instructions": "Implement two parallel patterns. First, sectioning: take a long local document, split it into sections, run the same extraction step over each section concurrently (use a thread pool with a fixed worker count), then combine the section results with a single synthesis step. Second, voting: run the same classification or extraction step three times with the stand-in configured to vary its deterministic answers (or with a real model at a non-zero temperature) and take the majority result, logging the disagreement. Time both against the sequential version on the same document and the same task, and record the results: sectioning should win on long documents, voting should win on borderline calls, and both cost more calls. Write the trade-off into the README with the numbers you measured.",
        "concepts": ["Parallelization", "Sectioning", "Self-consistency voting", "Cost vs latency trade-offs"],
        "hints": ["Sections must be independent — if one needs another's output, it is a chain, not a section.", "Voting only helps when the runs genuinely differ.", "Measure the wall-clock time; do not guess whether it was faster."],
        "acceptanceCriteria": ["Sectioning produces the same combined result as the sequential run on a short document", "Voting picks the majority answer and logs the dissenting runs", "Timings for sequential vs parallel are recorded with real numbers", "The README states when each pattern is worth its extra calls"],
        "tests": ["Run sectioning and sequential on the same document and diff the combined output", "Force a 2-1 vote split and confirm the majority wins", "Time both approaches and check the recorded numbers match a fresh run"]
      },
      {
        "id": "proj-ai-agents-effective-m5",
        "order": 5,
        "title": "Orchestrator-workers and evaluator-optimizer",
        "objectives": ["Build an orchestrator that plans and fans out work", "Build an evaluator-optimizer loop with a real checklist", "Cap the loop so it always terminates"],
        "instructions": "Build the orchestrator-workers pattern: an orchestrator call (or deterministic planner, when running offline with the stand-in) breaks a research task into sub-questions, dispatches each to a worker that uses the document-search tool, then synthesises the worker outputs into one answer with a source list. Then build the evaluator-optimizer loop: a generator drafts an answer, an evaluator scores it against a written checklist (every claim cited, no claim without a source, answer under a length limit), and if the score fails the optimizer rewrites the draft using the evaluator's specific feedback. Cap the loop at three iterations and stop early on a pass. Run both patterns on the same research task over the local document set, and compare the evaluator's scores across iterations — the loop has only earned its place if iteration two scores higher than iteration one on a real checklist, not on vibes.",
        "concepts": ["Orchestrator-workers", "Evaluator-optimizer", "Checklist evaluation", "Bounded iteration"],
        "hints": ["The evaluator's checklist is the whole pattern — write it before the generator.", "An optimizer that only rephrases is not improving; check the score moved.", "Three iterations maximum, then ship the best draft and say so."],
        "acceptanceCriteria": ["The orchestrator fans out at least three sub-questions and synthesises their results", "The evaluator scores drafts against a written checklist with per-item results", "A failing draft is rewritten from the evaluator's feedback and re-scored", "The loop stops at the iteration cap with the best draft kept", "Scores across iterations are logged and show whether the loop improved anything"],
        "tests": ["Run the orchestrator and check every sub-question produced a worker result", "Feed the evaluator a draft with an uncited claim and confirm it fails that item", "Run the loop on a draft that already passes and confirm it stops after one iteration"]
      },
      {
        "id": "proj-ai-agents-effective-m6",
        "order": 6,
        "title": "Full agent: ground truth, checkpoints, stopping conditions",
        "objectives": ["Assemble the full tool-use agent loop", "Add environment ground truth checks", "Add checkpoints and stopping conditions"],
        "instructions": "Assemble the full agent from everything so far. The agent receives a goal (for example, 'reconcile the expense notes: compute the totals, check them against the receipts file, and write a corrected summary'), then loops: model call, tool call, real tool execution, environment feedback. The environment supplies ground truth after each tool result — real checks against local data, such as 'the summary file exists', 'the total equals the sum in the receipts file', 'no number in the summary is uncited'. Add checkpoints: after each step, snapshot the full state (messages, tool results, files written) to a JSON file so a crashed or interrupted run can be resumed with python agent.py resume --checkpoint <file>. Add stopping conditions checked before every iteration: a maximum step count, a token/call budget, an explicit finish signal from the model, and a ground-truth success signal. Run the agent end to end with the stand-in, then interrupt a run mid-way (kill the process), resume it from the checkpoint, and confirm it finishes without repeating completed work. Finish by writing the README guidance: which pattern to reach for first for each kind of task, and the rule that a new pattern is added only when a recorded failure demands it.",
        "concepts": ["Full agent loop", "Environment ground truth", "Checkpoints and resume", "Stopping conditions"],
        "hints": ["Ground truth is a check against real data, not the model grading itself.", "A checkpoint must contain everything needed to resume — test it by actually killing a run.", "The finish signal is only trusted when ground truth agrees with it."],
        "acceptanceCriteria": ["The agent completes the reconciliation goal with a correct summary file", "Ground truth catches a wrong total and the agent corrects it", "An interrupted run resumes from its checkpoint without redoing completed steps", "The run stops at the step limit when the goal cannot be reached", "The README maps task kinds to the simplest pattern that handles them"],
        "tests": ["Run the agent end to end and verify the summary against the receipts file by hand", "Interrupt a run and resume it from the checkpoint", "Set the step limit to 2 on a hard goal and confirm it stops cleanly", "Replay a saved trace and confirm it reproduces the same tool calls"]
      }
    ],
    "reviewChecklist": [
      "The harness uses LLM APIs directly; no agent framework was pulled in",
      "The stand-in is labelled as a stub everywhere and never presented as a real model",
      "Every pattern ends with a working increment and a recorded reason it was added",
      "Tools execute for real; no tool result is faked",
      "Ground truth comes from real checks against local data",
      "Checkpoints resume a killed run without repeating completed work",
      "Stopping conditions bound every run"
    ],
    "finalAssessment": [
      "Run the full agent on a new goal and explain each step in the trace",
      "Show a task where the simple loop suffices and one where a pattern was genuinely needed",
      "Kill a run mid-way and resume it from the checkpoint",
      "Point to the ground-truth check that caught a wrong answer and explain what it checked",
      "Explain why the stand-in's output is not a real model's reasoning"
    ]
  },
  {
    "id": "proj-ai-mcp-server",
    "slug": "ai-mcp-server",
    "level": 3,
    "title": "Build an MCP Server",
    "description": "AI build project: Build a genuine Model Context Protocol server in Python with the MCP Python SDK (2.0+) — a real stdio JSON-RPC server that exposes tools, resources and prompts, runs under uv, and can be tested locally with a client harness and a Claude for Desktop config file. Everything runs fully offline and for real: the server speaks real MCP over stdio, the tools do real local work against a bundled local dataset and local computation (no fake external API, no pretend weather service — the example tool computes statistics from a local CSV and looks up entries in a local dataset), and the client harness proves the round trip with real protocol messages.\n\nFurther reading: https://modelcontextprotocol.io/docs/develop/build-server",
    "skills": ["AI engineering", "LLM", "Model Context Protocol", "MCP SDK", "JSON-RPC", "stdio transport", "HTTP transport", "Python", "uv", "Tool design"],
    "language": "python",
    "functionalRequirements": [
      "Serve a real MCP server over stdio using the MCP Python SDK (2.0+) with uv as the runner",
      "Expose at least three tools defined with Python type hints and docstrings, each doing real local work",
      "Expose at least two resources (local data served through MCP resource URIs) and one prompt template",
      "Support both stdio and HTTP (streamable HTTP) transports behind a single server definition",
      "Never write anything but protocol messages to stdout on the stdio transport (logs go to stderr)",
      "Provide a local client harness that lists tools, calls a tool, reads a resource and renders a prompt over real protocol messages",
      "Ship a Claude for Desktop config file that points at the local server",
      "Handle malformed requests and unknown tools with proper JSON-RPC errors, not crashes"
    ],
    "nonFunctionalRequirements": [
      "Fully real and fully offline: the server is a genuine stdio JSON-RPC server testable locally, with no fake external API calls",
      "Tools do real local work only — local computation and a bundled local dataset, never a fabricated API response",
      "On stdio, stdout carries protocol messages only; any logging goes to stderr",
      "The server starts with one uv command and shuts down cleanly on EOF",
      "All dependencies are pinned and the project runs without network access after the first install"
    ],
    "architecture": "A single server module built on the MCP Python SDK defines the server once and serves it over two transports. Tools are plain Python functions decorated with the SDK's tool decorator: type hints become the tool's input schema and docstrings become its description, so the schema is derived from the code rather than written by hand. The example tools work on a bundled local dataset (a CSV of monthly rainfall and temperature readings for a small set of cities, shipped in the repo) — one tool computes real statistics over the CSV, one looks up a city's recorded readings, and one converts units — so every result is a genuine computation over real local data. Resources expose the raw dataset and a generated summary through MCP resource URIs; a prompt template renders a data-analysis prompt with the caller's arguments filled in. The stdio transport reads JSON-RPC from stdin and writes it to stdout with nothing else on that stream; the HTTP transport wraps the same server. A separate client harness uses the SDK's client to drive the server over a real connection.",
    "databaseSchema": "",
    "apis": [
      "MCP tools: get_city_readings(city), dataset_stats(metric, city?), convert_temperature(value, from_unit, to_unit)",
      "MCP resources: data://cities (dataset index), data://cities/<city> (city readings), data://summary (generated summary)",
      "MCP prompt: analyse-city with arguments city and focus",
      "CLI: uv run server.py (stdio), uv run server.py --transport http, python client_harness.py"
    ],
    "fileStructure": "mcp-server/\n  data/\n    city_readings.csv\n  src/\n    server.py\n    dataset.py\n    tools.py\n  client_harness.py\n  claude_desktop_config.json\n  pyproject.toml\n  README.md\n  tests/\n    test_tools.py\n    test_protocol.py",
    "taskBreakdown": [
      "Set up the project with uv and the MCP Python SDK 2.0+",
      "Build the first stdio server and prove it answers a handshake",
      "Write the tools with type hints and docstrings over the local dataset",
      "Add resources and a prompt template",
      "Add the HTTP transport and the stdout discipline for stdio",
      "Build the client harness and the Claude for Desktop config",
      "Test error handling and shutdown behaviour",
      "Document the protocol flow and how to add a new tool"
    ],
    "milestones": [
      {
        "id": "proj-ai-mcp-server-m1",
        "order": 1,
        "title": "Project setup and the first stdio server",
        "objectives": ["Set up the project with uv and the MCP Python SDK", "Run a minimal stdio server", "Prove the handshake works"],
        "instructions": "Create the project with uv init and add the MCP Python SDK (version 2.0 or later) as a dependency in pyproject.toml, pinning the version you installed. Write src/server.py with the smallest possible server: a name, a version, and no tools yet. Run it with uv run and confirm it starts and waits on stdin rather than exiting or printing anything to stdout — a stdio MCP server's stdout is reserved for protocol messages, so even a startup banner would corrupt the stream. Prove the handshake by piping a real JSON-RPC initialize request into the server's stdin and reading the initialize result back, then sending the initialized notification. Log progress to stderr only, so you can watch the server work without touching stdout.",
        "concepts": ["Model Context Protocol", "stdio transport", "JSON-RPC handshake", "uv project setup"],
        "hints": ["If anything appears on stdout before the handshake, it is a bug — find it and move it to stderr.", "Pin the SDK version so a later install behaves the same.", "The handshake is two messages: initialize, then initialized."],
        "acceptanceCriteria": ["uv run starts the server and it stays alive waiting on stdin", "A piped initialize request returns a valid initialize result with the server name and version", "Nothing but protocol JSON appears on stdout", "Logs appear on stderr only"],
        "tests": ["Pipe an initialize request in and inspect the response", "Start the server with stdout captured and confirm it is empty before any request", "Send an invalid JSON line and confirm the server replies with an error, not a crash"]
      },
      {
        "id": "proj-ai-mcp-server-m2",
        "order": 2,
        "title": "Tools with type hints and docstrings over real local data",
        "objectives": ["Ship a bundled local dataset", "Define tools from typed functions", "Prove each tool computes real results"],
        "instructions": "Create data/city_readings.csv with real, hand-written monthly rainfall and temperature readings for at least five cities over twelve months — these are your local data, written into the repo, not fetched from anywhere. Then define three tools in the server using the SDK's decorator, with full Python type hints and a docstring on each: get_city_readings(city) returns that city's recorded monthly readings from the CSV; dataset_stats(metric, city=None) computes a real mean, minimum, maximum and count over the CSV (optionally filtered to one city); convert_temperature(value, from_unit, to_unit) converts between Celsius and Fahrenheit with real arithmetic. The type hints must generate the tool schemas — check the tools/list response and confirm the schema for each tool matches its function signature. Test each tool through the protocol (not by importing the function) and verify one result by hand against the CSV with a calculator.",
        "concepts": ["Tool definitions", "Type hints as schema", "Docstrings as descriptions", "Local datasets"],
        "hints": ["The schema comes from the hints — a missing hint is a missing parameter.", "Verify one statistic by hand; a wrong mean means a wrong tool.", "No external API is involved anywhere — say so in the README."],
        "acceptanceCriteria": ["The CSV ships in the repo with at least five cities and twelve months each", "tools/list returns three tools with schemas matching their signatures", "Each tool's result matches a hand-checked computation over the CSV", "An unknown city returns a clean error, not a fabricated reading"],
        "tests": ["Call dataset_stats through the protocol and recompute the mean by hand", "Call get_city_readings for a city in the CSV and one that is not", "List tools and compare each schema against its function signature"]
      },
      {
        "id": "proj-ai-mcp-server-m3",
        "order": 3,
        "title": "Resources and prompts",
        "objectives": ["Expose the dataset as MCP resources", "Add a prompt template with arguments", "Prove resources and prompts work over the protocol"],
        "instructions": "Add resources that serve the same local data in a different shape: a data://cities resource listing the cities in the dataset, a data://cities/<city> resource returning that city's readings as JSON, and a data://summary resource generated on demand (city count, month count, overall means). Then add a prompt template called analyse-city taking a city argument and a focus argument (rainfall or temperature), which renders a ready-to-use analysis prompt with the city's real summary numbers filled in — the numbers come from the dataset, not from a model. Test all three through the protocol: list resources, read one city resource and check it against the CSV, get the prompt with arguments and confirm the rendered text contains the correct numbers for that city.",
        "concepts": ["MCP resources", "Resource URIs", "Prompt templates", "Server-generated content"],
        "hints": ["Resources are read-only views of data the server already has.", "A prompt template is text with slots — the slots must be filled from real data.", "Read a resource and diff it against the CSV before trusting it."],
        "acceptanceCriteria": ["resources/list returns the three resources", "Reading a city resource returns data matching the CSV", "The summary resource is generated from the dataset, not hardcoded", "The prompt renders with the correct city numbers for the requested arguments"],
        "tests": ["Read data://cities/<city> and compare it to the CSV row by hand", "Get the analyse-city prompt for two different cities and check the numbers differ correctly", "Request a resource for an unknown city and confirm a clean error"]
      },
      {
        "id": "proj-ai-mcp-server-m4",
        "order": 4,
        "title": "Transports: stdio discipline and HTTP",
        "objectives": ["Add the HTTP transport beside stdio", "Enforce stdout discipline on stdio", "Run the server under uv in both modes"],
        "instructions": "Refactor server.py so the server is defined once and the transport is chosen by a command-line flag: the default is stdio, and --transport http starts the streamable HTTP transport on a local port. For stdio, audit every print and logging call: route all logging to stderr and add a test that starts the server, sends an initialize, and asserts stdout parses as clean JSON-RPC with no stray lines. For HTTP, start the server, call the tools/list endpoint over HTTP with curl, and confirm the same three tools appear. Document the difference in the README: stdio is for a local host process that spawns the server (like a desktop app), HTTP is for a server another process reaches over the network, and the tools, resources and prompts are identical in both. Also document that the server never writes to stdout on stdio, with the test that enforces it.",
        "concepts": ["stdio vs HTTP transports", "Streamable HTTP", "stdout discipline", "One server, many transports"],
        "hints": ["One server definition, two transports — never duplicate the tool code.", "A stray print on stdio breaks the client; the test must catch it.", "Check the HTTP response contains the same tools as the stdio listing."],
        "acceptanceCriteria": ["Both transports serve the identical tool, resource and prompt set", "On stdio, stdout contains only valid JSON-RPC messages", "The HTTP server answers tools/list over curl", "The README explains when to use each transport"],
        "tests": ["Start in stdio mode, send an initialize, and parse every stdout line as JSON", "Start in HTTP mode and curl the tools list", "Add a deliberate print to stdout, run the discipline test, and confirm it fails"]
      },
      {
        "id": "proj-ai-mcp-server-m5",
        "order": 5,
        "title": "Client harness and Claude for Desktop config",
        "objectives": ["Build a local client harness", "Drive the server through real protocol messages", "Ship a working Claude for Desktop config"],
        "instructions": "Write client_harness.py using the SDK's client: it spawns the server over stdio as a subprocess, runs the initialize handshake, lists tools, calls dataset_stats for a real metric, reads a city resource, gets the analyse-city prompt, and prints a short report of what it did and what came back — then shuts the server down cleanly. Every step must go over the real protocol; the harness must not import the server's tool functions. Then write claude_desktop_config.json with an mcpServers entry that launches this server with uv run, using an absolute path to the project, and document the exact steps to install it (where the file lives on each OS, restart the app, and how to confirm the tools appear). Finally, run the harness against both transports where the client supports it, and test the failure paths: call an unknown tool, send a bad argument type, and kill the server mid-session to confirm the harness reports the failure cleanly instead of hanging.",
        "concepts": ["MCP clients", "Client harness", "Claude for Desktop configuration", "Graceful failure"],
        "hints": ["The harness proves the server from the outside — importing the tools would prove nothing.", "Use an absolute path in the config; a relative one breaks when the app launches it.", "A hanging harness is a bug — add timeouts to every client call."],
        "acceptanceCriteria": ["The harness completes the full handshake-to-tool-call flow over real protocol messages", "The Claude for Desktop config launches the server with uv run from an absolute path", "Unknown tools and bad arguments produce clean JSON-RPC errors in the harness report", "The server shuts down cleanly when the harness exits"],
        "tests": ["Run the harness end to end and read its report", "Call an unknown tool through the harness and check the error", "Send a string where a number is expected and confirm a validation error, not a crash"]
      }
    ],
    "reviewChecklist": [
      "The server is a genuine stdio JSON-RPC server, proven with real protocol messages",
      "Tools do real local work over the bundled dataset — no fake external API",
      "Tool schemas are derived from type hints and docstrings",
      "Stdout carries protocol messages only on the stdio transport",
      "Both transports expose the identical server",
      "The client harness drives the server from the outside, never by importing it",
      "The Claude for Desktop config uses an absolute path and uv run"
    ],
    "finalAssessment": [
      "Run the client harness end to end and explain each protocol step it performs",
      "Add a fourth tool of your own and show it appearing in tools/list with the right schema",
      "Show what happens on stdout if a print statement leaks into stdio mode, and how the test catches it",
      "Explain the difference between the stdio and HTTP transports and when to use each",
      "Walk through the Claude for Desktop config and explain each field"
    ]
  },
  {
    "id": "proj-ai-evals-product",
    "slug": "ai-evals-product",
    "level": 3,
    "title": "Evals for Your AI Product",
    "description": "AI build project: Build a real, fully offline evaluation setup for an AI feature in Python — scoped unit tests with pytest, a scorer and an eval harness with a run log, human and model review of traces, and A/B testing two behaviours on the same eval set. The example feature is a local text classifier and summariser that runs entirely on deterministic rules and local data (no hosted model, no network), so every eval in this project is a genuine pytest assertion over real code, every score is a real computation, and every run is tracked in a log you can re-read. Generation with a real LLM is out of scope here; the evals measure the local feature as it is, honestly.\n\nFurther reading: https://hamel.dev/blog/posts/evals/",
    "skills": ["AI engineering", "LLM", "Evaluation", "pytest", "Scorers", "Eval harnesses", "Trace logging", "A/B testing", "Python", "Test design"],
    "language": "python",
    "functionalRequirements": [
      "Ship a small local AI feature to evaluate: a deterministic text classifier and extractive summariser over local documents",
      "Write scoped unit tests for the feature with pytest, each test naming the behaviour it pins down",
      "Build a scorer that grades outputs against expected answers and returns a numeric score with per-case reasons",
      "Build an eval harness that runs a case set through the feature, scores every case, and appends the results to a run log",
      "Log a trace for every eval run: input, output, score, latency and the feature version",
      "Support human review of traces: a readable trace report that a person can read to find failures",
      "Support model-based review as an optional, clearly-labelled step using a model the user supplies (never the local stub presented as a judge)",
      "Run A/B tests: two behaviours evaluated on the same case set, with the difference reported per case and in aggregate"
    ],
    "nonFunctionalRequirements": [
      "Fully offline and real: pytest assertions, scorers and run tracking are genuine and runnable with no network and no hosted model",
      "Every score is a computed value with a visible reason, never a hand-waved judgement",
      "The run log is append-only and every run is reproducible from the logged feature version and case set",
      "A failing eval is a signal to investigate, not something to delete or re-run until it passes",
      "No eval result is ever presented as a measurement of a real LLM unless a real model was actually run"
    ],
    "architecture": "The project has three layers. The feature layer is a small deterministic text classifier and extractive summariser: it classifies a document into one of a fixed set of topics by keyword scoring and summarises by selecting the highest-scoring sentences — real code over local documents, with no model behind it, which is exactly what makes it honestly evaluable offline. The eval layer is a scorer (exact-match and overlap functions that return a numeric score plus a reason per case), a case set (a JSON file of inputs with expected outputs, versioned alongside the code), and a harness that runs every case, scores it, and appends one JSON record per run to an append-only run log. The review layer renders traces into a readable report for human review and can optionally send failing traces to a user-supplied model for a second opinion, labelled as such. A/B testing is the same harness run twice — once per behaviour variant — over the identical case set, with a diff report.",
    "databaseSchema": "",
    "apis": [
      "Feature: classify(text) -> topic, summarise(text, max_sentences) -> summary",
      "Scorer: score_case(case, output) -> {score, reasons}",
      "CLI: pytest, python eval.py run --cases cases/v1.json, python eval.py report --run <id>, python eval.py ab --a v1 --b v2"
    ],
    "fileStructure": "ai-evals/\n  src/\n    feature.py\n    scorer.py\n    harness.py\n    traces.py\n    report.py\n  cases/\n    v1.json\n    v2.json\n  runs/\n    run_log.jsonl\n  tests/\n    test_feature.py\n    test_scorer.py\n    test_harness.py\n  README.md",
    "taskBreakdown": [
      "Build the local feature (classifier + summariser) and its case sets",
      "Write scoped pytest unit tests for the feature",
      "Build the scorer and the eval harness with a run log",
      "Add trace logging and a human-readable trace report",
      "Add optional model-based review, clearly labelled",
      "Run an A/B test between two behaviour variants",
      "Run two full iterate loops and document what changed and why",
      "Write the eval discipline guide: when to add cases, when to trust a score"
    ],
    "milestones": [
      {
        "id": "proj-ai-evals-product-m1",
        "order": 1,
        "title": "Level 1: scoped unit tests with pytest",
        "objectives": ["Build the local feature", "Write a versioned case set", "Pin behaviours down with scoped pytest tests"],
        "instructions": "Build the feature first: src/feature.py with classify(text), which scores a document against a small keyword map and returns the best topic, and summarise(text, max_sentences), which scores sentences by keyword overlap with the document's topic words and returns the top ones in original order. Keep it deterministic — the same input must always give the same output. Then write cases/v1.json: twenty short documents, each with its expected topic and the key sentence its summary must contain. Now write the pytest suite, one test per behaviour, each scoped to a single claim: the classifier picks the right topic for each of the five topics, the summariser keeps sentences in document order, an empty document returns a defined empty result, and a document about two topics picks the stronger one. Run pytest and keep every test green before moving on — these unit tests are the first eval level, and a feature that cannot pass them is not ready to be evaluated at a higher level.",
        "concepts": ["Scoped unit tests", "Deterministic features", "Versioned case sets", "pytest"],
        "hints": ["One test, one claim — a test that checks five things tells you nothing when it fails.", "Version the case set; a changed case set is a changed eval.", "Determinism is what makes the scores reproducible."],
        "acceptanceCriteria": ["The classifier and summariser are deterministic across repeated runs", "The case set has twenty documents covering all five topics", "pytest passes with one scoped test per behaviour", "An empty document has a defined, tested result"],
        "tests": ["Run pytest and confirm all tests pass", "Run classify twice on the same input and diff the outputs", "Add a document about two topics and confirm the stronger topic wins"]
      },
      {
        "id": "proj-ai-evals-product-m2",
        "order": 2,
        "title": "Scorer and eval harness with a run log",
        "objectives": ["Write a scorer with reasons per case", "Build the harness that runs a case set", "Record every run in an append-only log"],
        "instructions": "Write src/scorer.py: score_case takes a case and the feature's output and returns a score from 0 to 1 plus a list of reasons — for classification, 1 for the right topic and 0 otherwise, with the reason naming the expected and actual topics; for summarisation, the fraction of the case's required key sentences present in the summary, with each missing sentence named. Then write src/harness.py: it loads a case set, runs every case through the feature, scores each one, and prints an aggregate (mean score, pass rate at a threshold you choose, and the list of failing cases) while appending one JSON record per run to runs/run_log.jsonl with the timestamp, the case-set version, the feature version (a string you bump when the feature changes), and the per-case scores. Run the harness on cases/v1.json twice and confirm the two runs produce identical scores — if they do not, the feature or the scorer is non-deterministic and that must be fixed before anything else. Commit the run log so the history is visible.",
        "concepts": ["Scorers", "Eval harness", "Run logs", "Reproducibility"],
        "hints": ["A score without a reason is not debuggable — every case gets its reasons.", "The feature version in the log is what makes old runs comparable.", "Identical scores across runs is the first thing to check."],
        "acceptanceCriteria": ["Every case gets a numeric score and a human-readable reason", "The harness prints a mean score, a pass rate and the failing cases", "Each run appends one JSON record to the run log with case-set and feature versions", "Two runs of the same version produce identical scores"],
        "tests": ["Run the harness twice and diff the per-case scores", "Feed the scorer a wrong topic and confirm the reason names both topics", "Read the run log and confirm each record has the version fields"]
      },
      {
        "id": "proj-ai-evals-product-m3",
        "order": 3,
        "title": "Level 2: human and model review of traces",
        "objectives": ["Log a full trace per eval run", "Build a readable trace report for human review", "Add optional model review, clearly labelled"],
        "instructions": "Extend the harness so every case also writes a trace: input text, the feature's output, the score and reasons, and the time taken. Then build the trace report: python eval.py report --run <id> renders the failing cases first, each showing the input, what the feature produced, what was expected, and the scorer's reason — in a form a person can read in a few minutes without opening the raw JSON. Now do the human review properly: read the report for the latest run, pick the three most interesting failures, and for each one write down whether the bug is in the feature (wrong logic), the case (wrong expected answer), or the scorer (wrong grading rule) — the fix is different in each case, so the diagnosis matters. Finally, add the optional model-review step: a script that sends a failing trace to a model the user supplies and asks for a failure diagnosis, with the output labelled as model-generated and stored separately from the real scores. The model review must never change a score; it only suggests where to look. If no model is available, the step is skipped and the report says so plainly.",
        "concepts": ["Trace logging", "Human review", "Failure diagnosis", "Model as reviewer, not judge"],
        "hints": ["Failing cases first — passing cases teach you nothing in review.", "Feature bug, case bug, scorer bug: name it before you fix it.", "A model suggestion is a hint, never a score."],
        "acceptanceCriteria": ["Every run writes a full trace per case", "The report shows failing cases first with input, output, expected and reason", "Three failures are diagnosed in writing as feature, case or scorer bugs", "Model review, if used, is labelled and never changes a score"],
        "tests": ["Run the report and confirm the failing cases appear first", "Check that a trace contains the input, output, score and timing", "Confirm the run log scores are unchanged after running model review"]
      },
      {
        "id": "proj-ai-evals-product-m4",
        "order": 4,
        "title": "Level 3: A/B testing two behaviours",
        "objectives": ["Create a second behaviour variant", "Run both variants on the same case set", "Report the difference per case and in aggregate"],
        "instructions": "Create a second variant of the feature — for example, a summariser that weights the first sentence of each paragraph more heavily, or a classifier with an expanded keyword map — behind a --variant flag, bumping the feature version for the new variant. Run the harness twice over the identical case set, once per variant, and build the A/B report: the mean score and pass rate for each variant, the per-case difference (which cases improved, which regressed, which stayed the same), and a verdict that names the winner only if the difference is bigger than the noise — with twenty cases, a one-case difference is not a win, so set a threshold in advance (for example, three cases) and stick to it. Then add five new cases to a v2 case set, targeted at the cases where the variants disagreed, and re-run both variants on v2 to check whether the verdict holds on fresh data. Write the verdict and the threshold into the README with the numbers.",
        "concepts": ["A/B testing", "Same case set", "Per-case diffs", "Significance thresholds"],
        "hints": ["Same case set, same scorer — anything else makes the comparison meaningless.", "A regression on one case can matter more than a win on three; read the per-case diff.", "Fresh cases check whether the win was real or fitted to the old set."],
        "acceptanceCriteria": ["Both variants run on the identical case set with identical scoring", "The report shows aggregate scores and the per-case diff", "A verdict threshold was set in advance and applied", "The verdict is re-checked on a fresh v2 case set", "The losing variant's regressions are listed by case"],
        "tests": ["Run both variants and confirm the case lists are identical", "Check the per-case diff names every case that changed", "Re-run on the v2 case set and confirm the verdict is re-evaluated, not assumed"]
      },
      {
        "id": "proj-ai-evals-product-m5",
        "order": 5,
        "title": "The iterate loop: evaluate, debug, change, re-evaluate",
        "objectives": ["Run two full iterate loops on a real example", "Fix a real failure found by the evals", "Document the loop as a repeatable practice"],
        "instructions": "Pick the worst failing case from the A/B work and run two full iterate loops on it. Loop one: evaluate (run the harness and record the baseline score in the run log), debug (read the trace and diagnose the failure as a feature, case or scorer bug), change (make exactly one change — for example, add the missing keywords that caused a misclassification, or fix a wrong expected answer in the case set), re-evaluate (bump the feature or case-set version, run the harness again, and record the new score). Loop two: repeat the same four steps on the next-worst failure, or on a regression the first change introduced — check the full case set each time, because a fix that helps one case and breaks two others is not a fix. At the end, write the iterate-loop guide in the README: the four steps, the rule of one change per loop, the requirement to record both scores in the run log, and the signs that the eval itself needs work (scores that never move, cases that everyone passes, a scorer that disagrees with human review). The finished artefact is not just a good score — it is the run log showing the score moving across versions and the written reasoning behind each change.",
        "concepts": ["Iterate loop", "One change per loop", "Regression checking", "Eval maintenance"],
        "hints": ["One change per loop — two changes and you cannot tell which one worked.", "Always re-run the full case set; a local fix can be a global regression.", "The run log is the proof the loop happened."],
        "acceptanceCriteria": ["Two full loops are recorded in the run log with before and after scores", "Each loop changed exactly one thing, named in the log or README", "The full case set was re-run after each change with no silent regressions", "The README documents the four-step loop and when the eval itself needs fixing"],
        "tests": ["Read the run log and confirm two before/after pairs exist", "Check that a fix for one case did not regress any previously passing case", "Re-run the final version and confirm the scores match the logged ones"]
      }
    ],
    "reviewChecklist": [
      "Every eval is a real pytest assertion or a computed score — nothing is hand-waved",
      "The case sets are versioned and the run log records the version used",
      "Two runs of the same version produce identical scores",
      "Failures are diagnosed as feature, case or scorer bugs before being fixed",
      "Model review, if used, is labelled and never changes a score",
      "A/B comparisons use the same case set and a pre-set verdict threshold",
      "Each iterate loop changed one thing and re-ran the full case set"
    ],
    "finalAssessment": [
      "Run the harness and explain the mean score, the pass rate and the worst failing case",
      "Diagnose a failing trace as a feature, case or scorer bug and defend the diagnosis",
      "Run an A/B test and explain the verdict, including the threshold and the per-case diff",
      "Show two iterate loops in the run log and explain what each change did",
      "Explain when the eval set itself needs new cases or a better scorer"
    ]
  }
];
