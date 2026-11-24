// Network Knowledge Assistant from Cisco PDFs — one step-by-step project.
// The applied companion to proj-ai-rag: instead of a toy document set, the
// learner builds a system that answers networking questions from real
// documentation PDFs, learning PDF extraction and OCR along the way.
//
// NO vendor PDFs ship with this project (copyright): the learner works on
// PDFs they supply themselves, plus a small sample document they generate
// with a script in milestone 1. That sample document is deliberately TOUGH
// for OCR — mixed digital-text and scanned-image pages, multi-column
// layouts, tables, diagrams with small labels, small fonts, and
// low-contrast, slightly rotated scanned-style pages — so preprocessing and
// quality measurement actually matter: raw OCR fails visibly on the tough
// pages and improves measurably after the right preprocessing.
//
// Honest-execution rules (see also proj-ai-rag): extraction and OCR run
// for real, locally, offline — PyMuPDF for digital text, Tesseract 5 for
// OCR (both baked into the Docker image; see backend/Dockerfile and
// docs/DOCKER.md). Retrieval is real TF-IDF/cosine, offline. Generation
// goes through a pluggable llm.generate() interface and needs a model the
// user supplies (a local model or an API key); with no model configured the
// system returns the retrieved passages with citations and an explicit
// "generation unavailable" message — it never fakes an answer.
//
// All networking text in the sample document is fresh-written original
// wording on OSPF / BGP / VLAN basics; nothing is copied from any vendor
// document. Auto-wired by the projects-industry-* glob in
// backend/src/db/seed.ts.
//
// Provisioning (see backend/src/services/provisioning.ts, python entry,
// and backend/Dockerfile): tesseract-ocr (apt) + PyMuPDF and pytesseract
// (pip) are baked into the Docker image; local installs use
// `apt install tesseract-ocr` (or brew/choco) plus
// `pip install PyMuPDF pytesseract`. Validated in the build sandbox:
// tesseract 5.3.4, PyMuPDF 2.1, pytesseract 0.3.13.
import type { Project } from '../types.js';

export const PROJECTS_INDUSTRY: Project[] = [
{
    "id": "proj-ai-net-knowledge",
    "slug": "ai-network-knowledge-from-cisco-pdfs",
    "level": 3,
    "title": "Network Knowledge Assistant from Cisco PDFs",
    "description": "AI build project: build a system that answers networking questions from real documentation PDFs — and learn the document tooling that makes it possible. You start by extracting text from digital PDFs and discovering the pages that have no text at all, then you bring in OCR: Tesseract, image preprocessing, and honest quality measurement, so you can see raw OCR fail on hard pages and improve after the right preprocessing. Then you build the retrieval side — chunking, TF-IDF indexing, reranking — and wire it into an answering step where every answer cites the exact PDF page it came from. The last milestone is evaluation: is each answer actually grounded in the documents it cites, and where does the system fail? Extraction, OCR and retrieval all run for real, locally and offline. Generation needs a language model you supply yourself through a pluggable interface — with no model configured the system returns the retrieved passages and says so plainly, never inventing an answer.\n\nA note on documents: no vendor PDFs ship with this project. You work on PDFs you supply yourself (your own Cisco documentation), plus a small sample document you generate in milestone 1. That sample is deliberately tough for OCR — mixed digital and scanned pages, two-column layouts, tables, small-label diagrams, low-contrast rotated scans — because a test document that OCR reads perfectly teaches nothing about OCR.",
    "skills": ["AI engineering", "RAG", "OCR", "Tesseract", "PDF processing", "PyMuPDF", "Information retrieval", "TF-IDF", "Reranking", "Evaluation", "Python", "Networking", "OSPF", "BGP", "VLAN"],
    "language": "python",
    "functionalRequirements": [
      "Extract text from digital PDF pages with PyMuPDF and report per-page coverage",
      "Detect pages with no extractable text (scanned-image pages) and route them to OCR",
      "Run Tesseract OCR on scanned pages and measure character error rate (CER) against known ground truth",
      "Improve OCR with preprocessing (grayscale, upscaling, contrast stretch, adaptive thresholding, page-segmentation modes) and pick the best configuration per page from measured CER",
      "Handle multi-column scanned pages by OCR-ing each column separately, in reading order",
      "Generate a deliberately tough sample PDF (digital + scanned pages, tables, diagrams, small fonts, low contrast, rotation) with a ground-truth file for CER measurement",
      "Chunk the extracted and OCR text into overlapping passages with metadata (page number, digital or OCR source)",
      "Index the chunks with TF-IDF and retrieve the top-k passages for a question using cosine similarity",
      "Rerank the top results and return answers with citations to the exact source page",
      "Provide a pluggable llm.generate() interface with an explicit no-model state that returns retrieved passages instead of a faked answer",
      "Evaluate the system on a labelled question set: recall@1/3/5, citation coverage, and a groundedness score for each answer",
      "Record the failures honestly in the README: which questions fail, which stage fails, and what would fix it"
    ],
    "nonFunctionalRequirements": [
      "Extraction, OCR and retrieval run fully offline against local documents — no network or API key needed",
      "Generation needs a language model the user supplies (API key or a local model) through a pluggable model interface; CodeForge never fakes LLM output with canned text",
      "If no model is configured, the system must report generation as unavailable and still return the retrieved passages with citations",
      "Every retrieved answer must cite the source page it came from",
      "OCR quality is measured, not assumed: every preprocessing choice is justified by a CER number, and a preprocessing step that makes a page worse is recorded as a negative result, not hidden",
      "The sample document's text is fresh-written original wording on OSPF/BGP/VLAN basics — no vendor text is copied into the project",
      "No vendor PDF is bundled with the project; the learner supplies their own documents"
    ],
    "architecture": "A pipeline of small modules with clean seams, extending the proj-ai-rag design with a document front end: gen_sample_pdf.py generates the tough test document and its ground-truth file (PyMuPDF for the digital pages, Pillow for the scanned-style pages); extract.py opens a PDF with PyMuPDF, reports per-page extractable text, and classifies each page as digital or scanned; ocr.py wraps Tesseract through pytesseract, owns the preprocessing variants (grayscale, 2x upscale, contrast stretch, adaptive threshold, Otsu binarisation) and the page-segmentation modes, and measures CER against ground truth; ingest.py chunks extracted and OCR text into overlapping passages with page/source metadata; index.py builds the stdlib TF-IDF index and answers top-k queries with cosine scores; rerank.py re-scores the top results with term overlap; llm.py is the pluggable model interface (one method, generate(prompt) -> text) with an explicit 'no model configured' state; app.py wires it all into a single ask() function and a CLI that prints the answer (or the honest unavailable message) with citations; evaluate.py runs the labelled question set and reports recall@k, citation coverage and groundedness. The seams matter: each stage can be tested and swapped independently, and the LLM is a replaceable plug, never baked into the retrieval logic.",
    "databaseSchema": "",
    "apis": [
      "CLI: python gen_sample_pdf.py --out data/sample-network-docs.pdf",
      "CLI: python extract.py --pdf data/sample-network-docs.pdf",
      "CLI: python ocr.py --pdf data/sample-network-docs.pdf --page 5 --config stretch-psm6",
      "CLI: python ask.py --question '...' --top-k 5",
      "CLI: python evaluate.py --questions data/eval_questions.json",
      "OCR: pytesseract.image_to_string(image, config='--psm 6')",
      "PDF: fitz.open(path) (PyMuPDF); page.get_text(), page.get_pixmap(dpi=300)",
      "LLM interface: llm.generate(prompt: str) -> str (pluggable; API-backed or local model)"
    ],
    "fileStructure": "network-knowledge-assistant/\n  data/\n    sample-network-docs.pdf\n    ground_truth.json\n    eval_questions.json\n  src/\n    gen_sample_pdf.py\n    extract.py\n    ocr.py\n    ingest.py\n    index.py\n    rerank.py\n    llm.py\n    app.py\n    ask.py\n    evaluate.py\n  tests/\n    test_extract.py\n    test_ocr.py\n    test_retrieval.py\n  requirements.txt\n  README.md",
    "taskBreakdown": [
      "Generate the tough sample PDF and its ground truth, and extract text from the digital pages",
      "Run OCR on the scanned pages, measure CER, and find the preprocessing that actually helps each page",
      "Chunk the corpus and build the TF-IDF index",
      "Retrieve and rerank, and measure recall on the labelled question set",
      "Wire the answering step with citations and the pluggable model (with its honest no-model state)",
      "Evaluate groundedness end to end and write up the results and the failures"
    ],
    "milestones": [
      {
        "id": "proj-ai-net-knowledge-m1",
        "order": 1,
        "title": "PDF text extraction — and the pages that have no text",
        "objectives": ["Extract text from digital PDF pages with PyMuPDF", "Report per-page coverage and classify pages as digital or scanned", "Generate a deliberately tough sample PDF with ground truth"],
        "instructions": "Install the document tooling first: Tesseract OCR plus the Python libraries — `apt install tesseract-ocr` (or `brew install tesseract` / `choco install tesseract`) and `pip install PyMuPDF pytesseract` — and confirm them with `tesseract --version` and `python3 -c \"import fitz, pytesseract\"`. (In the Docker image both are already baked in.) Then write gen_sample_pdf.py, the script that builds your test document, data/sample-network-docs.pdf — nine A4 pages of fresh-written networking text (your own wording on OSPF, BGP and VLAN basics; nothing copied from any vendor document), laid out to be genuinely hard for OCR: page 1, digital single-column OSPF fundamentals; page 2, digital two-column BGP path selection; page 3, digital reference tables (OSPF area types, BGP attributes); page 4, a digital topology diagram drawn with vector shapes and small 7pt labels; pages 5-8, scanned-style pages rendered as images and embedded in the PDF — page 5 a single-column VLAN text at small size, low contrast, rotated 2.5 degrees with noise; page 6 a two-column OSPF troubleshooting text, low contrast, rotated -2 degrees; page 7 a BGP decision table as an image; page 8 a BGP peering diagram with tiny 8-10pt labels, low contrast, rotated 1.5 degrees; page 9, digital VLAN trunking summary. Save a ground_truth.json alongside it holding the exact text drawn on each scanned page — you need it in milestone 2 to measure OCR quality. Then write extract.py: open the PDF with fitz, print the extractable character count per page, and classify each page as digital (more than 50 extractable characters) or scanned (near zero). Your report should show 5 digital pages and 4 scanned pages, with the digital pages yielding real text and the scanned pages yielding nothing — that gap is the whole reason the next milestone exists.",
        "concepts": ["PDF text layer vs scanned images", "PyMuPDF page text extraction", "Per-page coverage reporting", "Test-corpus design", "Ground truth"],
        "hints": ["A PDF page can look full of text and contain no text at all — if the page is a picture of text, get_text() returns nothing.", "Write the sample document's text yourself; copying vendor documentation into the project is not an option.", "Keep the ground truth next to the PDF — without it you cannot measure OCR, only eyeball it.", "Render scanned-style pages with Pillow at ~150 dpi, small fonts, grey-on-grey text, a little rotation and noise: that is what real scans look like."],
        "acceptanceCriteria": ["extract.py reports per-page character counts for all 9 pages", "Exactly 5 pages classify as digital and 4 as scanned", "The sample PDF contains a two-column page, two tables and two diagrams", "ground_truth.json holds the exact text of all 4 scanned pages"],
        "tests": ["Run python extract.py and confirm the digital/scanned split is 5/4", "Open the PDF and confirm pages 5-8 show text as images, not selectable text", "Check ground_truth.json covers pages 5, 6, 7 and 8"]
      },
      {
        "id": "proj-ai-net-knowledge-m2",
        "order": 2,
        "title": "OCR for scanned pages — measure first, then improve",
        "objectives": ["Run Tesseract OCR on the scanned pages", "Measure character error rate (CER) against ground truth", "Find the preprocessing that helps each page — and record the ones that hurt"],
        "instructions": "Write ocr.py around pytesseract. Start by rendering each scanned page to an image at 300 dpi (page.get_pixmap) and running Tesseract with no preprocessing at all — the default page-segmentation mode — and measure the character error rate against ground truth: CER is the Levenshtein edit distance between the OCR output and the truth, divided by the length of the truth, after normalising whitespace and case. Write the number down for each page before you touch anything else; on this tough document the raw run is bad — the mean CER across the four scanned pages is around 0.43 (page 5: 0.40, page 6: 0.61, page 7: 0.12, page 8: 0.59), and that bad number is the point: it proves the test document is doing its job. Then build the preprocessing menu in ocr.py — every variant starts from grayscale and a 2x upscale, then one of: contrast stretch (autocontrast), adaptive thresholding (each pixel compared against its blurred neighbourhood), or Otsu global binarisation — and try each with page-segmentation modes 6 (uniform block) and 11 (sparse text). Measure CER for every combination on every page and keep the best per page: the mean CER falls to around 0.20 (page 5: 0.027 with Otsu binarisation with psm 6, page 6: 0.081 with column-split OCR (each column separately, contrast stretch + psm 6), page 7: 0.12 with raw OCR with no preprocessing at all (psm 3), page 8: 0.56 with Otsu binarisation with psm 11 (sparse text)). Three lessons are hiding in those numbers, so write them in the README: first, the two-column page is the worst raw page not because characters are misread but because Tesseract reads across the columns and scrambles the reading order — the fix is layout-aware OCR, cropping each column and OCR-ing it separately in order, which takes it from 0.61 to 0.081; second, the table page is the one where preprocessing hurts: raw OCR is already its best result (0.12), contrast stretch destroys it completely (CER 15.56 — autocontrast amplifies the scan noise into hallucinated text, and a CER above 1.0 means more errors than there are characters in the truth), adaptive thresholding hurts too (1.31), and Otsu is only slightly worse than raw (0.17) — preprocessing is a per-page decision, and the CER table is how you make it; third, the diagram page stays hard no matter what you try (0.59 raw, 0.56 best): tiny labels mixed with vector lines confuse the segmenter, and no preprocessing rescues it — that is an honest limit of OCR, and the right response is to say so and to rely on the diagram's caption and the surrounding text, not to pretend the labels were read. End the milestone with a small report command in ocr.py that prints, for each scanned page, the raw CER, the best CER, and the winning configuration.",
        "concepts": ["Tesseract OCR and page-segmentation modes", "Character error rate (CER)", "Grayscale, upscaling and contrast stretch", "Adaptive vs global (Otsu) thresholding", "Layout-aware OCR and column splitting", "Reading order"],
        "hints": ["Always measure the raw run first — without a baseline, 'improved' means nothing.", "psm 11 (sparse text) is the right mode for diagrams with scattered labels; psm 6 is the right mode for a uniform block of text.", "A global threshold is the wrong tool for faint text — it deletes the strokes you are trying to read.", "If a preprocessing step makes a page worse, that is a result: record it, do not hide it."],
        "acceptanceCriteria": ["Raw OCR CER is measured and reported for all 4 scanned pages", "At least three preprocessing variants are tried on every scanned page", "The best per-page configuration is chosen from measured CER, not guessed", "The two-column page is OCR-ed column by column, in reading order", "The README records which preprocessing helps which page type and which one hurts the table page"],
        "tests": ["Run python ocr.py --report and confirm raw and best CER are printed per page", "Confirm the mean best CER (0.20) is less than half the mean raw CER (0.43)", "Run the two-column page with and without column splitting and confirm the split version scores better", "Run contrast stretch on the table page and confirm the CER explodes above 1.0 (and that this is recorded as a negative result)"]
      },
      {
        "id": "proj-ai-net-knowledge-m3",
        "order": 3,
        "title": "Chunking and indexing — TF-IDF over the whole document set",
        "objectives": ["Chunk extracted and OCR text into overlapping passages", "Build a TF-IDF index with page/source metadata", "Retrieve the top-k passages for a question with cosine similarity"],
        "instructions": "Write ingest.py to build the corpus: for each digital page, take the extracted text; for each scanned page, take the OCR text produced with that page's best configuration from milestone 2 (not the raw output — the index is only as good as the text you feed it). Split each page's text into overlapping chunks of roughly 400 characters with a 50-character overlap, and keep metadata on every chunk: page number, whether the source is digital text or OCR, and a chunk id. Then write index.py: a small TF-IDF implementation in the standard library (term frequencies, inverse document frequencies, cosine similarity — no new dependency), with retrieve(query, k) returning the top-k chunks with their scores. Finish with a REPL or CLI: type a question, see the top chunks with scores, page numbers and sources. Try questions you know the answer to and check by hand whether the right page comes first — and notice which answers come from OCR pages: those are the answers that only exist because milestone 2 worked.",
        "concepts": ["Chunking and overlap", "TF-IDF and cosine similarity", "Chunk metadata (page, source)", "Top-k retrieval", "OCR text as index input"],
        "hints": ["Use each scanned page's best OCR configuration — indexing raw OCR text bakes the errors in.", "Overlap stops answers being cut in half at a chunk boundary.", "Keep the source (digital vs OCR) in the metadata: when an answer looks wrong, the first question is whether the OCR was wrong.", "Plain TF-IDF is honest, offline and strong on a small corpus — it is the right baseline before any embeddings."],
        "acceptanceCriteria": ["Every page contributes chunks with page and source metadata intact", "retrieve() returns k chunks ranked by cosine score", "A question about a known fact returns the chunk containing that fact in the top 3", "Chunks from OCR pages are present in the index and retrievable"],
        "tests": ["Count chunks per page and confirm all 9 pages are represented", "Ask three questions with known answers and confirm the right chunk is in the top 3", "Ask a question whose answer only exists on a scanned page and confirm an OCR chunk is retrieved"]
      },
      {
        "id": "proj-ai-net-knowledge-m4",
        "order": 4,
        "title": "Retrieval and reranking — finding the right page",
        "objectives": ["Build a labelled evaluation question set", "Measure recall@1, recall@3 and recall@5", "Rerank the top results and measure the difference"],
        "instructions": "Write data/eval_questions.json: 12 questions about the sample document, each labelled with the page(s) that contain the answer — label from the documents, not from memory. Cover the whole document: OSPF map-building and link cost (pages 1, 4), hello-timer and area questions (pages 1, 6), stub areas (page 3), BGP attribute order and MED (pages 2, 7), access vs trunk ports and native VLAN (pages 5, 9), router on a stick (page 9), and the BGP peering diagram (page 8). Write evaluate.py to run every question through retrieve() and report recall@1, recall@3 and recall@5. On this corpus the baseline should be strong — recall@1 12/12, recall@3 12/12, recall@5 12/12 — because the document is small and the vocabulary is distinctive; write down why that is, and that recall on a 9-page corpus is a smoke test, not a proof of scale. Then add rerank.py: take the top 10 TF-IDF results and re-score them by blending the TF-IDF score with plain term overlap against the question, and measure recall@3 again (12/12). Record whether reranking helped, hurt, or changed nothing — on this corpus it changes little, and a reranker that changes nothing on a small corpus is a documented negative result, not a failure. Also record which questions, if any, fail at recall@1 and diagnose them: is the answer split across a chunk boundary, or did OCR garble the key term?",
        "concepts": ["Recall@k", "Labelled evaluation sets", "Reranking with term overlap", "Negative results", "Failure diagnosis"],
        "hints": ["Label from the documents, not from memory — a wrong label makes the evaluation lie.", "Recall on nine pages is a smoke test; say so in the README instead of overselling it.", "If a question fails, check the chunk first: boundary splits and OCR errors are the usual causes.", "A reranker that does not help on this corpus may still help on a larger one — record the number, not the hope."],
        "acceptanceCriteria": ["An evaluation set of 12 labelled questions exists, covering all 9 pages", "recall@1, recall@3 and recall@5 are reported", "Reranking is implemented and its recall@3 is measured against the baseline", "Any failing question is diagnosed by stage (chunking, OCR, ranking)"],
        "tests": ["Run python evaluate.py and confirm recall numbers are printed", "Check that a deliberately wrong label lowers the score (the evaluation is actually sensitive)", "Ask the diagram question and confirm the cited page is page 8"]
      },
      {
        "id": "proj-ai-net-knowledge-m5",
        "order": 5,
        "title": "Answering with citations — the pluggable model",
        "objectives": ["Wire retrieve, rerank and generation behind one ask() function", "Plug in a real model through llm.generate() with a clear no-model state", "Return every answer with citations to the exact source page"],
        "instructions": "Wire everything into app.py: ask(question) runs retrieval, reranking, then generation, and returns the answer with the cited page numbers and their scores. Build llm.py as the pluggable model interface — a single generate(prompt) method — with two implementations: one that calls a chat API using a key from an environment variable, and one that shells out to a local model the user has installed. The no-model state is a first-class outcome: if neither is configured, ask() returns the retrieved passages, their scores and page citations, plus a clear message that generation is unavailable because no model is configured — it never invents an answer and never prints canned text as if a model wrote it. Test that path deliberately: run ask.py with no key set and read what it prints. Then, with a model configured (your own key or local model), run the same questions and compare: the generated answer should say the same thing the retrieved passages say, and every factual claim in it should trace to a cited page. If the model adds a fact no cited passage contains, that is a hallucination — note it, because milestone 6 measures exactly that.",
        "concepts": ["End-to-end RAG pipeline", "Pluggable model interfaces", "Citations to source pages", "The honest no-model state", "Extractive fallback answers"],
        "hints": ["Citations are the feature: an answer without a source page is a claim, not a retrieval result.", "The no-model path must be tested, not just written — run ask.py with no key set and read what it prints.", "An extractive answer (the retrieved passages themselves) is a legitimate answer when no model is configured.", "If the model adds facts no passage contains, say so — that is what the next milestone scores."],
        "acceptanceCriteria": ["ask.py runs the full pipeline from one command", "With a model configured, answers are generated and cite their source pages", "With no model configured, ask.py reports generation unavailable and still returns the retrieved passages with citations", "Citation coverage is 100% — every answer carries at least one cited page"],
        "tests": ["Run python ask.py --question '...' with no model configured and confirm the honest unavailable message and the retrieved passages", "Run python ask.py with a model configured and confirm the answer cites a page number", "Confirm every answer in a 12-question run carries at least one citation"]
      },
      {
        "id": "proj-ai-net-knowledge-m6",
        "order": 6,
        "title": "Evaluation — groundedness, citation coverage, and the failure log",
        "objectives": ["Score every answer for groundedness against its cited pages", "Report citation coverage and recall together", "Write up the results and the failures honestly"],
        "instructions": "Extend evaluate.py to score end-to-end answers, not just retrieval. For each of the 12 questions, run ask() and score the answer on three numbers: recall (is a correct page in the retrieved set?), citation coverage (does the answer cite at least one page?), and groundedness — for each substantive claim in the answer, does the claim's key terms appear in a cited passage? Report the mean groundedness (0.84, lowest 0.58) and the citation coverage (100%). On this corpus the reference run scores recall@3 12/12, citation coverage 100% and mean groundedness around 0.84 — the groundedness number is a keyword-overlap proxy, not a judge, and the README must say that plainly: it catches unsupported claims, it does not understand meaning. Then write the failure log: the questions that score worst, the stage that failed (OCR garble, chunk boundary, ranking, or generation adding facts), and what you would change next — for example, real embeddings if a local model is available, a larger evaluation set, or a better table parser for the scanned tables. Finish with a short README section on running the same pipeline on your own Cisco PDFs: drop them in data/docs, re-run extraction and OCR, and re-measure — the pipeline is the deliverable, the sample document is only the test.",
        "concepts": ["Groundedness scoring", "Citation coverage", "Keyword-overlap proxies and their limits", "Failure logs", "Evaluation write-ups"],
        "hints": ["Groundedness by keyword overlap is a proxy — say so, and read five answers by hand as well.", "A failure log is the most useful part of the evaluation: it says what to fix next.", "The pipeline is the deliverable; the sample document is only the test — the README should say how to point it at real PDFs.", "If generation is unavailable, evaluate the extractive answers — retrieval quality is measurable without a model."],
        "acceptanceCriteria": ["End-to-end evaluation reports recall, citation coverage and groundedness", "The groundedness method and its limits are stated in the README", "A failure log names the worst questions, the failing stage, and the fix", "The README explains how to run the pipeline on the learner's own PDFs"],
        "tests": ["Run python evaluate.py end to end and confirm recall, citation coverage and groundedness are printed", "Read five answers by hand and confirm the groundedness score agrees with your judgement", "Point the pipeline at a second PDF and confirm the per-page report still works"]
      }
    ],
    "reviewChecklist": [
      "The sample PDF is genuinely tough for OCR: mixed digital/scanned pages, two-column layouts, tables, small-label diagrams, low-contrast rotated scans",
      "OCR quality is measured with CER against ground truth, raw and per preprocessing variant",
      "A preprocessing step that makes a page worse is recorded, not hidden",
      "Retrieval runs fully offline with no API key; recall is measured on a labelled question set",
      "Generation goes through the pluggable model interface and is never faked",
      "Every answer cites the source page it came from",
      "No vendor PDF or vendor text is bundled with the project"
    ],
    "finalAssessment": [
      "Point at a scanned page and explain why raw OCR fails on it, using the CER numbers",
      "Show the CER table and explain which preprocessing helps which page type and why Otsu hurts the faint table",
      "Ask a question whose answer only exists on a scanned page and trace it from OCR through chunking, retrieval and citation",
      "Run ask.py with no model configured and explain exactly what happens and why",
      "Describe a question the system answers badly, diagnose which stage fails, and say how you would fix it"
    ]
  }
];
