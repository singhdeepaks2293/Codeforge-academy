-- 100-track expansion: quiz-style exercises (multiple-choice / predict-output)
-- are graded by answer instead of by running code. Store the options JSON
-- and the correct answer index server-side (answer_index is never sent to
-- the client; see courses.ts lesson endpoint).
ALTER TABLE exercises ADD COLUMN options TEXT;
ALTER TABLE exercises ADD COLUMN answer_index INTEGER;
