import { expandTracks } from '../compact.js';

const { courses, assessments } = expandTracks([
  {
    "id": "linear-algebra-ml",
    "slug": "linear-algebra-ml",
    "language": "python",
    "category": "data-ai",
    "title": "Linear Algebra for Machine Learning",
    "description": "Vectors, matrices, and eigenvalues in pure Python: the linear algebra every machine learning model is built on.",
    "difficulty": "Beginner",
    "estimatedHours": 10,
    "skills": [
      "Vectors",
      "Dot products",
      "Vector norms",
      "Matrix multiplication",
      "Matrix transpose",
      "Identity matrices",
      "Eigenvalues",
      "Power iteration"
    ],
    "prerequisites": [],
    "analogy": "Learning {topic} is like learning to read a map: once you can follow directions and measure distances, you can navigate any model.",
    "modules": [
      {
        "id": "linear-algebra-ml-m1",
        "title": "Linear Algebra for Machine Learning Foundations",
        "level": "beginner",
        "lessons": [
          {
            "id": "linear-algebra-ml-m1-l1",
            "slug": "linear-algebra-ml-m1-l1",
            "title": "Vectors as Lists of Numbers",
            "concept": "A vector is an ordered list of numbers that represents a point or a direction in space, and in Python it is naturally stored as a list. Each entry is one coordinate, so a vector of length three describes a point in three-dimensional space. Machine learning turns every example, such as a house or an email, into a vector of features.",
            "syntax": "v = [1.0, 2.0, 3.0]",
            "exampleCode": "v = [1.0, 2.0, 3.0]\nprint(v[0])\nprint(len(v))",
            "exampleLanguage": "python",
            "mistake": "Forgetting that vector entries must line up by position, so adding vectors of different lengths silently gives a wrong answer.",
            "bug": {
              "prompt": "Find the bug: this program should print the vector length 3, but it prints 1.",
              "buggyCode": "v = [1.0, 2.0, 3.0]\nprint(len([v]))",
              "fixedCode": "v = [1.0, 2.0, 3.0]\nprint(len(v))",
              "explanation": "Wrapping v in another list makes a list of length 1 that contains the vector, instead of measuring the vector itself."
            },
            "exercise": {
              "title": "Add two vectors",
              "type": "write-code",
              "instructions": "Read two lines, each a vector of three numbers, and print their element-wise sum as space-separated numbers with four decimal places.",
              "starterCode": "import sys\n\n# TODO: read two vectors and print their sum\n",
              "solution": "import sys\nlines = sys.stdin.read().strip().splitlines()\na = [float(x) for x in lines[0].split()]\nb = [float(x) for x in lines[1].split()]\nprint(\" \".join(f\"{x + y:.4f}\" for x, y in zip(a, b)))",
              "solutionExplanation": "Adding vectors means adding the entries that sit in the same position, so the result keeps the same length as the inputs.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "1 2 3\n4 5 6",
                  "expectedStdout": "5.0000 7.0000 9.0000\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "0.5 -1 2\n2 2 2",
                  "expectedStdout": "2.5000 1.0000 4.0000\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Add two vectors from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "linear-algebra-ml-m1-l2",
            "slug": "linear-algebra-ml-m1-l2",
            "title": "Vector Addition and Scalar Multiplication",
            "concept": "Adding vectors adds their matching entries, and multiplying a vector by a scalar multiplies every entry by that number. Scalar multiplication stretches or shrinks a vector without changing its direction, unless the scalar is negative, which flips it. These two operations are the building blocks of every linear combination in machine learning.",
            "syntax": "w = [2 * x for x in v]",
            "exampleCode": "v = [1.0, 2.0, 3.0]\nprint([2 * x for x in v])",
            "exampleLanguage": "python",
            "mistake": "Multiplying only the first entry of a vector by the scalar and leaving the rest unchanged.",
            "bug": {
              "prompt": "Find the bug: this program should print [3.0, 6.0, 9.0], but it prints [3.0, 2.0, 3.0].",
              "buggyCode": "v = [1.0, 2.0, 3.0]\nv[0] = v[0] * 3\nprint(v)",
              "fixedCode": "v = [1.0, 2.0, 3.0]\nv = [3 * x for x in v]\nprint(v)",
              "explanation": "Scalar multiplication must touch every entry of the vector, not just the first one."
            },
            "exercise": {
              "title": "Scale a vector",
              "type": "write-code",
              "instructions": "Read a scalar on the first line and a vector on the second line, then print the scaled vector as space-separated numbers with four decimal places.",
              "starterCode": "import sys\n\n# TODO: read the scalar and vector, print the scaled vector\n",
              "solution": "import sys\nlines = sys.stdin.read().strip().splitlines()\ns = float(lines[0])\nv = [float(x) for x in lines[1].split()]\nprint(\" \".join(f\"{s * x:.4f}\" for x in v))",
              "solutionExplanation": "Each entry of the vector is multiplied by the same scalar, so the whole vector is stretched by that factor.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "3\n1 2 3",
                  "expectedStdout": "3.0000 6.0000 9.0000\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "0.5\n2 4 6",
                  "expectedStdout": "1.0000 2.0000 3.0000\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Scale a vector from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "linear-algebra-ml-m1-l3",
            "slug": "linear-algebra-ml-m1-l3",
            "title": "Dot Products and Similarity",
            "concept": "The dot product multiplies matching entries of two vectors and adds the results, giving a single number that measures how much the vectors agree. A large positive dot product means the vectors point in a similar direction, zero means they are perpendicular, and a negative value means they point in opposite directions. Search engines and recommender systems use dot products to score how similar two items are.",
            "syntax": "dot = sum(a * b for a, b in zip(u, v))",
            "exampleCode": "u = [1.0, 2.0]\nv = [3.0, 4.0]\nprint(sum(a * b for a, b in zip(u, v)))",
            "exampleLanguage": "python",
            "mistake": "Adding the vectors first and then multiplying, which is not the dot product and gives a different number.",
            "bug": {
              "prompt": "Find the bug: this program should print 11.0, but it prints 21.0.",
              "buggyCode": "u = [1.0, 2.0]\nv = [3.0, 4.0]\nprint(sum(u) * sum(v))",
              "fixedCode": "u = [1.0, 2.0]\nv = [3.0, 4.0]\nprint(sum(a * b for a, b in zip(u, v)))",
              "explanation": "The dot product multiplies matching entries before adding, while sum(u) * sum(v) multiplies the two totals instead."
            },
            "exercise": {
              "title": "Check your understanding: dot products",
              "type": "multiple-choice",
              "instructions": "Which statement about the dot product is correct?",
              "starterCode": "",
              "solution": "The dot product multiplies matching entries of two vectors and adds the results into a single number.",
              "solutionExplanation": "The dot product multiplies matching entries of two vectors and adds the results into a single number. The other options contradict the lesson.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "The dot product multiplies matching entries of two vectors and adds the results into a single number.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Check your understanding: dot products from the lesson: which statement is actually true?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true in general."
              },
              "options": [
                "The dot product of two vectors is always another vector of the same length.",
                "The dot product multiplies matching entries of two vectors and adds the results into a single number.",
                "The dot product is only defined for vectors of length one.",
                "The dot product of two vectors is always zero."
              ],
              "answerIndex": 1
            }
          },
          {
            "id": "linear-algebra-ml-m1-l4",
            "slug": "linear-algebra-ml-m1-l4",
            "title": "Vector Norms and Unit Vectors",
            "concept": "The norm of a vector is its length, and the Euclidean norm is the square root of the sum of the squared entries. Dividing a vector by its own norm produces a unit vector of length one that points in exactly the same direction. Normalising vectors this way lets models compare directions without being fooled by size.",
            "syntax": "norm = sum(x * x for x in v) ** 0.5",
            "exampleCode": "v = [3.0, 4.0]\nnorm = sum(x * x for x in v) ** 0.5\nprint(norm)",
            "exampleLanguage": "python",
            "mistake": "Forgetting the square root and reporting the sum of squares as the norm.",
            "bug": {
              "prompt": "Find the bug: this program should print 5.0, but it prints 25.0.",
              "buggyCode": "v = [3.0, 4.0]\nprint(sum(x * x for x in v))",
              "fixedCode": "v = [3.0, 4.0]\nprint(sum(x * x for x in v) ** 0.5)",
              "explanation": "The norm is the square root of the sum of squares, so the ** 0.5 step must not be left out."
            },
            "exercise": {
              "title": "Dot product of two vectors",
              "type": "write-code",
              "instructions": "Read two lines, each a vector of three numbers, and print their dot product with four decimal places.",
              "starterCode": "import sys\n\n# TODO: read two vectors and print their dot product\n",
              "solution": "import sys\nlines = sys.stdin.read().strip().splitlines()\na = [float(x) for x in lines[0].split()]\nb = [float(x) for x in lines[1].split()]\nprint(f\"{sum(x * y for x, y in zip(a, b)):.4f}\")",
              "solutionExplanation": "Multiply each pair of matching entries and add the products; that single number is the dot product.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "1 2 3\n4 5 6",
                  "expectedStdout": "32.0000\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "2 0 -1\n3 1 4",
                  "expectedStdout": "2.0000\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Dot product of two vectors from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "linear-algebra-ml-m1-l5",
            "slug": "linear-algebra-ml-m1-l5",
            "title": "Matrices as Lists of Rows",
            "concept": "A matrix is a rectangular grid of numbers, stored in Python as a list of rows where each row is itself a list. The shape of a matrix is its number of rows and columns, written like 2 by 3, and every row must have the same length. Datasets are matrices: each row is one example and each column is one feature.",
            "syntax": "m = [[1, 2, 3], [4, 5, 6]]",
            "exampleCode": "m = [[1, 2, 3], [4, 5, 6]]\nprint(len(m), len(m[0]))\nprint(m[1][2])",
            "exampleLanguage": "python",
            "mistake": "Treating m[0] as the first column instead of the first row, so the indexing is transposed by mistake.",
            "bug": {
              "prompt": "Find the bug: this program should print 6, but it prints 4.",
              "buggyCode": "m = [[1, 2, 3], [4, 5, 6]]\nprint(m[0][1])",
              "fixedCode": "m = [[1, 2, 3], [4, 5, 6]]\nprint(m[1][2])",
              "explanation": "Rows come first in m[row][column], so the bottom-right entry is m[1][2], not m[0][1]."
            },
            "exercise": {
              "title": "Check your understanding: matrices",
              "type": "multiple-choice",
              "instructions": "Which statement about matrices in Python is correct?",
              "starterCode": "",
              "solution": "A matrix is stored as a list of rows, where each row is a list and every row has the same length.",
              "solutionExplanation": "A matrix is stored as a list of rows, where each row is a list and every row has the same length. The other options contradict the lesson.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "A matrix is stored as a list of rows, where each row is a list and every row has the same length.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Check your understanding: matrices from the lesson: which statement is actually true?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true in general."
              },
              "options": [
                "A matrix in Python must always be square, with the same number of rows and columns.",
                "In a list of rows, m[0] gives the first column of the matrix.",
                "A matrix is stored as a list of rows, where each row is a list and every row has the same length.",
                "Matrices cannot be stored in Python without installing a special library."
              ],
              "answerIndex": 2
            }
          }
        ]
      },
      {
        "id": "linear-algebra-ml-m2",
        "title": "Linear Algebra for Machine Learning in Depth",
        "level": "beginner",
        "lessons": [
          {
            "id": "linear-algebra-ml-m2-l1",
            "slug": "linear-algebra-ml-m2-l1",
            "title": "Matrix-Vector Multiplication",
            "concept": "Multiplying a matrix by a vector takes the dot product of each row of the matrix with the vector, producing one number per row. The result is a new vector whose length equals the number of rows, and the vector must have as many entries as the matrix has columns. A linear layer in a neural network is exactly this operation plus a bias.",
            "syntax": "out = [sum(a * b for a, b in zip(row, v)) for row in m]",
            "exampleCode": "m = [[1, 2], [3, 4]]\nv = [5, 6]\nprint([sum(a * b for a, b in zip(row, v)) for row in m])",
            "exampleLanguage": "python",
            "mistake": "Multiplying each row by the vector entry by entry and keeping a matrix, instead of taking a dot product per row.",
            "bug": {
              "prompt": "Find the bug: this program should print [17, 39], but it prints [[5, 12], [15, 24]].",
              "buggyCode": "m = [[1, 2], [3, 4]]\nv = [5, 6]\nprint([[a * b for a, b in zip(row, v)] for row in m])",
              "fixedCode": "m = [[1, 2], [3, 4]]\nv = [5, 6]\nprint([sum(a * b for a, b in zip(row, v)) for row in m])",
              "explanation": "Each row must be reduced to a single number with a dot product, not kept as a list of products."
            },
            "exercise": {
              "title": "Multiply a matrix by a vector",
              "type": "write-code",
              "instructions": "Read the number of rows and columns, then the matrix entries row by row, then the vector, and print the resulting vector as space-separated numbers with four decimal places.",
              "starterCode": "import sys\n\n# TODO: read the matrix and vector, print their product\n",
              "solution": "import sys\ntoks = sys.stdin.read().strip().split()\nr, c = int(toks[0]), int(toks[1])\nvals = [float(x) for x in toks[2:]]\nm = [vals[i * c:(i + 1) * c] for i in range(r)]\nv = vals[r * c:]\nout = [sum(a * b for a, b in zip(row, v)) for row in m]\nprint(\" \".join(f\"{x:.4f}\" for x in out))",
              "solutionExplanation": "Each output entry is the dot product of one matrix row with the input vector.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "2 2\n1 2 3 4\n5 6",
                  "expectedStdout": "17.0000 39.0000\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "2 3\n1 0 2 0 1 0\n1 2 3",
                  "expectedStdout": "7.0000 2.0000\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Multiply a matrix by a vector from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "linear-algebra-ml-m2-l2",
            "slug": "linear-algebra-ml-m2-l2",
            "title": "Matrix Multiplication",
            "concept": "Multiplying two matrices combines every row of the first with every column of the second using dot products. The inner dimensions must match: an m by n matrix times an n by p matrix gives an m by p result. Matrix multiplication chains linear transformations, which is how deep networks stack layers.",
            "syntax": "c[i][j] = sum(a[i][k] * b[k][j] for k in range(n))",
            "exampleCode": "a = [[1, 2], [3, 4]]\nb = [[5, 6], [7, 8]]\nprint([[sum(a[i][k] * b[k][j] for k in range(2)) for j in range(2)] for i in range(2)])",
            "exampleLanguage": "python",
            "mistake": "Multiplying matching entries of the two matrices instead of taking row-by-column dot products.",
            "bug": {
              "prompt": "Find the bug: this program should print [[19, 22], [43, 50]], but it prints [[5, 12], [21, 32]].",
              "buggyCode": "a = [[1, 2], [3, 4]]\nb = [[5, 6], [7, 8]]\nprint([[a[i][j] * b[i][j] for j in range(2)] for i in range(2)])",
              "fixedCode": "a = [[1, 2], [3, 4]]\nb = [[5, 6], [7, 8]]\nprint([[sum(a[i][k] * b[k][j] for k in range(2)) for j in range(2)] for i in range(2)])",
              "explanation": "Matrix multiplication pairs each row of the first matrix with each column of the second, not matching positions."
            },
            "exercise": {
              "title": "Multiply two 2x2 matrices",
              "type": "write-code",
              "instructions": "Read two lines, each with four numbers giving a 2x2 matrix row by row, and print the product as two lines of space-separated numbers with four decimal places.",
              "starterCode": "import sys\n\n# TODO: read two 2x2 matrices and print their product\n",
              "solution": "import sys\nlines = sys.stdin.read().strip().splitlines()\na = [float(x) for x in lines[0].split()]\nb = [float(x) for x in lines[1].split()]\nA = [a[0:2], a[2:4]]\nB = [b[0:2], b[2:4]]\nC = [[sum(A[i][k] * B[k][j] for k in range(2)) for j in range(2)] for i in range(2)]\nfor row in C:\n    print(\" \".join(f\"{x:.4f}\" for x in row))",
              "solutionExplanation": "Each entry of the product is the dot product of a row of the first matrix with a column of the second.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "1 2 3 4\n5 6 7 8",
                  "expectedStdout": "19.0000 22.0000\n43.0000 50.0000\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "2 0 1 2\n1 2 3 4",
                  "expectedStdout": "2.0000 4.0000\n7.0000 10.0000\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Multiply two 2x2 matrices from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "linear-algebra-ml-m2-l3",
            "slug": "linear-algebra-ml-m2-l3",
            "title": "Transpose and Symmetry",
            "concept": "The transpose of a matrix flips it over its diagonal, turning rows into columns, so the entry at row i column j moves to row j column i. A matrix is symmetric when it equals its own transpose, which happens for covariance matrices and many other matrices in statistics. Transposing twice returns the original matrix.",
            "syntax": "t = [[m[j][i] for j in range(rows)] for i in range(cols)]",
            "exampleCode": "m = [[1, 2, 3], [4, 5, 6]]\nprint([[m[j][i] for j in range(2)] for i in range(3)])",
            "exampleLanguage": "python",
            "mistake": "Forgetting to swap the loop ranges, so the transposed matrix has the wrong shape.",
            "bug": {
              "prompt": "Find the bug: this program should print three rows, but it prints two.",
              "buggyCode": "m = [[1, 2, 3], [4, 5, 6]]\nprint([[m[j][i] for j in range(3)] for i in range(2)])",
              "fixedCode": "m = [[1, 2, 3], [4, 5, 6]]\nprint([[m[j][i] for j in range(2)] for i in range(3)])",
              "explanation": "The transpose of a 2 by 3 matrix is 3 by 2, so the outer loop must run over the three columns."
            },
            "exercise": {
              "title": "Check your understanding: transpose",
              "type": "multiple-choice",
              "instructions": "Which statement about the transpose of a matrix is correct?",
              "starterCode": "",
              "solution": "The transpose flips a matrix over its diagonal, turning rows into columns, so the entry at row i column j moves to row j column i.",
              "solutionExplanation": "The transpose flips a matrix over its diagonal, turning rows into columns, so the entry at row i column j moves to row j column i. The other options contradict the lesson.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "The transpose flips a matrix over its diagonal, turning rows into columns, so the entry at row i column j moves to row j column i.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Check your understanding: transpose from the lesson: which statement is actually true?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true in general."
              },
              "options": [
                "The transpose of a matrix always makes it square.",
                "Transposing a matrix changes the values of its entries.",
                "The transpose of a matrix is the same as its inverse.",
                "The transpose flips a matrix over its diagonal, turning rows into columns, so the entry at row i column j moves to row j column i."
              ],
              "answerIndex": 3
            }
          },
          {
            "id": "linear-algebra-ml-m2-l4",
            "slug": "linear-algebra-ml-m2-l4",
            "title": "Identity Matrices and Inverses",
            "concept": "The identity matrix has ones on its diagonal and zeros elsewhere, and multiplying any matrix by it leaves the matrix unchanged. The inverse of a square matrix undoes it: multiplying a matrix by its inverse gives the identity. Not every matrix has an inverse, and a matrix with a zero determinant cannot be inverted.",
            "syntax": "I = [[1 if i == j else 0 for j in range(n)] for i in range(n)]",
            "exampleCode": "n = 3\nprint([[1 if i == j else 0 for j in range(n)] for i in range(n)])",
            "exampleLanguage": "python",
            "mistake": "Building the identity with ones everywhere instead of only on the diagonal.",
            "bug": {
              "prompt": "Find the bug: this program should print [[1, 0], [0, 1]], but it prints [[1, 1], [1, 1]].",
              "buggyCode": "n = 2\nprint([[1 for j in range(n)] for i in range(n)])",
              "fixedCode": "n = 2\nprint([[1 if i == j else 0 for j in range(n)] for i in range(n)])",
              "explanation": "Only the diagonal entries of the identity are one; every off-diagonal entry must be zero."
            },
            "exercise": {
              "title": "Print an identity matrix",
              "type": "write-code",
              "instructions": "Read an integer n and print the n by n identity matrix as n lines of space-separated 0s and 1s.",
              "starterCode": "import sys\n\n# TODO: read n and print the identity matrix\n",
              "solution": "import sys\nn = int(sys.stdin.read())\nfor i in range(n):\n    print(' '.join('1' if i == j else '0' for j in range(n)))",
              "solutionExplanation": "Only the diagonal entries are one; every off-diagonal entry is zero.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "2",
                  "expectedStdout": "1 0\n0 1\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "3",
                  "expectedStdout": "1 0 0\n0 1 0\n0 0 1\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Print an identity matrix from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "linear-algebra-ml-m2-l5",
            "slug": "linear-algebra-ml-m2-l5",
            "title": "Eigenvectors and Eigenvalues Intuition",
            "concept": "An eigenvector of a matrix is a direction the matrix only stretches, and the eigenvalue is how much it stretches it. For a 2 by 2 matrix the eigenvalues come from the trace and the determinant, using the quadratic formula. Eigenvectors reveal the axes along which data varies most, which is the idea behind PCA.",
            "syntax": "trace = a + d; det = a * d - b * c",
            "exampleCode": "a, b, c, d = 4, 1, 2, 3\ntrace = a + d\ndet = a * d - b * c\ndisc = (trace * trace - 4 * det) ** 0.5\nprint((trace + disc) / 2, (trace - disc) / 2)",
            "exampleLanguage": "python",
            "mistake": "Using the determinant where the trace belongs, which scrambles both eigenvalues.",
            "bug": {
              "prompt": "Find the bug: this program should print 5.0 and 2.0, but it prints 6.5 and 3.5.",
              "buggyCode": "a, b, c, d = 4, 1, 2, 3\ntrace = a * d - b * c\ndet = a * d - b * c\ndisc = (trace * trace - 4 * det) ** 0.5\nprint((trace + disc) / 2, (trace - disc) / 2)",
              "fixedCode": "a, b, c, d = 4, 1, 2, 3\ntrace = a + d\ndet = a * d - b * c\ndisc = (trace * trace - 4 * det) ** 0.5\nprint((trace + disc) / 2, (trace - disc) / 2)",
              "explanation": "The trace is the sum of the diagonal entries a + d, while the determinant is a * d - b * c."
            },
            "exercise": {
              "title": "Eigenvalues of a 2x2 matrix",
              "type": "write-code",
              "instructions": "Read four numbers giving a 2x2 matrix row by row, and print its two eigenvalues, larger first, each with four decimal places.",
              "starterCode": "import sys\n\n# TODO: read the matrix and print its eigenvalues\n",
              "solution": "import sys\na, b, c, d = [float(x) for x in sys.stdin.read().split()]\ntrace = a + d\ndet = a * d - b * c\ndisc = (trace * trace - 4 * det) ** 0.5\nprint(f\"{(trace + disc) / 2:.4f} {(trace - disc) / 2:.4f}\")",
              "solutionExplanation": "The eigenvalues solve lambda squared minus trace times lambda plus determinant equals zero, so the quadratic formula gives them directly.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "4 1 2 3",
                  "expectedStdout": "5.0000 2.0000\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "2 1 1 2",
                  "expectedStdout": "3.0000 1.0000\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Eigenvalues of a 2x2 matrix from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Vector and matrix toolkit",
      "type": "write-code",
      "instructions": "Read the number of rows and columns, then a matrix row by row, then a vector. Print the matrix-vector product on the first line and its Euclidean norm on the second line, each number with four decimal places.",
      "starterCode": "import sys\n\n# TODO: multiply the matrix by the vector and print the result and its norm\n",
      "solution": "import sys\ntoks = sys.stdin.read().strip().split()\nr, c = int(toks[0]), int(toks[1])\nvals = [float(x) for x in toks[2:]]\nm = [vals[i * c:(i + 1) * c] for i in range(r)]\nv = vals[r * c:]\nout = [sum(a * b for a, b in zip(row, v)) for row in m]\nnorm = sum(x * x for x in out) ** 0.5\nprint(\" \".join(f\"{x:.4f}\" for x in out))\nprint(f\"{norm:.4f}\")",
      "solutionExplanation": "Each output entry is a row dot product with the vector, and the norm is the square root of the sum of squared outputs.",
      "tests": [
        {
          "name": "Visible test",
          "stdin": "2 2\n1 2 3 4\n5 6",
          "expectedStdout": "17.0000 39.0000\n42.5441\n",
          "hidden": false
        },
        {
          "name": "Hidden test",
          "stdin": "2 2\n2 0 0 2\n3 4",
          "expectedStdout": "6.0000 8.0000\n10.0000\n",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "Recall the core idea of Vector and matrix toolkit from the lesson: what quantity must the program compute?",
        "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
        "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
      }
    },
    "capstone": {
      "title": "Linear Algebra Toolkit Capstone",
      "description": "Build a small pure-Python toolkit that multiplies a matrix by a vector and measures the length of the result.",
      "requirements": [
        "Read a matrix and a vector from stdin in the format rows, columns, matrix entries, vector entries.",
        "Compute the matrix-vector product using one dot product per row.",
        "Compute the Euclidean norm of the product vector.",
        "Print the product on one line and the norm on the next, with four decimal places."
      ],
      "rubric": [
        "The program runs and prints the correct product and norm for both test inputs.",
        "Each output entry is a genuine row dot product, not element-wise multiplication.",
        "The norm uses the square root of the sum of squares.",
        "The code is organised into clear steps and works for any 2 by 2 input."
      ]
    }
  },
  {
    "id": "probability-statistics-ml",
    "slug": "probability-statistics-ml",
    "language": "python",
    "category": "data-ai",
    "title": "Probability & Statistics for ML",
    "description": "Probability, distributions, and estimation in pure Python: the statistics that lets models reason under uncertainty.",
    "difficulty": "Beginner",
    "estimatedHours": 12,
    "skills": [
      "Probability",
      "Bayes' rule",
      "Expectation",
      "Variance",
      "Binomial distribution",
      "Normal distribution",
      "Correlation",
      "Bayesian updating"
    ],
    "prerequisites": [
      "linear-algebra-ml"
    ],
    "analogy": "Learning {topic} is like learning to forecast the weather: you never know the exact outcome, but you can measure how likely each one is.",
    "modules": [
      {
        "id": "probability-statistics-ml-m1",
        "title": "Probability & Statistics for ML Foundations",
        "level": "beginner",
        "lessons": [
          {
            "id": "probability-statistics-ml-m1-l1",
            "slug": "probability-statistics-ml-m1-l1",
            "title": "Probability Basics and Sample Spaces",
            "concept": "Probability measures how likely an outcome is, as a number between zero and one, computed as favourable outcomes divided by total outcomes. The sample space is the set of all possible outcomes, and probabilities of all outcomes in a sample space add up to one. Every classifier output is a probability over possible labels.",
            "syntax": "p = favourable / total",
            "exampleCode": "print(3 / 12)",
            "exampleLanguage": "python",
            "mistake": "Reporting a probability larger than one, which is impossible because favourable outcomes cannot exceed total outcomes.",
            "bug": {
              "prompt": "Find the bug: this program should print 0.25, but it prints 4.0.",
              "buggyCode": "print(12 / 3)",
              "fixedCode": "print(3 / 12)",
              "explanation": "Probability is favourable divided by total, not the other way round."
            },
            "exercise": {
              "title": "Probability of an event",
              "type": "write-code",
              "instructions": "Read two integers, the number of favourable outcomes and the total number of outcomes, and print the probability with four decimal places.",
              "starterCode": "import sys\n\n# TODO: read favourable and total, print the probability\n",
              "solution": "import sys\nfav, total = [int(x) for x in sys.stdin.read().split()]\nprint(f\"{fav / total:.4f}\")",
              "solutionExplanation": "Divide the favourable count by the total count to get a probability between zero and one.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "3 12",
                  "expectedStdout": "0.2500\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "7 20",
                  "expectedStdout": "0.3500\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Probability of an event from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "probability-statistics-ml-m1-l2",
            "slug": "probability-statistics-ml-m1-l2",
            "title": "Conditional Probability and Bayes' Rule",
            "concept": "Conditional probability asks how likely an event is given that another event happened, and Bayes' rule flips the conditioning around. It combines a prior belief with new evidence: posterior equals likelihood times prior divided by the evidence. Spam filters and medical tests both run on Bayes' rule.",
            "syntax": "posterior = likelihood * prior / evidence",
            "exampleCode": "prior, sens, fpr = 0.01, 0.9, 0.05\nprint(sens * prior / (sens * prior + fpr * (1 - prior)))",
            "exampleLanguage": "python",
            "mistake": "Forgetting the false-positive term in the denominator, which makes the posterior far too high.",
            "bug": {
              "prompt": "Find the bug: this program should print about 0.1538, but it prints 0.9.",
              "buggyCode": "prior, sens, fpr = 0.01, 0.9, 0.05\nprint(sens * prior / (sens * prior))",
              "fixedCode": "prior, sens, fpr = 0.01, 0.9, 0.05\nprint(sens * prior / (sens * prior + fpr * (1 - prior)))",
              "explanation": "The evidence term must include the false positives from healthy cases, fpr times one minus the prior."
            },
            "exercise": {
              "title": "Bayes' rule for a test",
              "type": "write-code",
              "instructions": "Read three numbers: the prior probability, the true-positive rate, and the false-positive rate. Print the posterior probability with four decimal places.",
              "starterCode": "import sys\n\n# TODO: apply Bayes' rule and print the posterior\n",
              "solution": "import sys\nprior, sens, fpr = [float(x) for x in sys.stdin.read().split()]\nnum = sens * prior\nden = num + fpr * (1 - prior)\nprint(f\"{num / den:.4f}\")",
              "solutionExplanation": "The numerator is sensitivity times prior; the denominator adds the false-positive contribution.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "0.01 0.9 0.05",
                  "expectedStdout": "0.1538\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "0.2 0.8 0.1",
                  "expectedStdout": "0.6667\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Bayes' rule for a test from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "probability-statistics-ml-m1-l3",
            "slug": "probability-statistics-ml-m1-l3",
            "title": "Random Variables and Expectation",
            "concept": "A random variable is a number whose value depends on a random outcome, like the number of heads in three coin flips. Its expectation is the long-run average value, computed by weighting each possible value by its probability. The expectation of a fair six-sided die is 3.5, even though 3.5 can never be rolled.",
            "syntax": "E[X] = sum(x * p(x) for x, p in outcomes)",
            "exampleCode": "outcomes = [(1, 0.5), (2, 0.5)]\nprint(sum(x * p for x, p in outcomes))",
            "exampleLanguage": "python",
            "mistake": "Averaging the values without weighting by their probabilities, which is only right when all outcomes are equally likely.",
            "bug": {
              "prompt": "Find the bug: this program should print 1.8, but it prints 1.5.",
              "buggyCode": "outcomes = [(1, 0.2), (2, 0.8)]\nprint(sum(x for x, p in outcomes) / len(outcomes))",
              "fixedCode": "outcomes = [(1, 0.2), (2, 0.8)]\nprint(sum(x * p for x, p in outcomes))",
              "explanation": "Expectation weights each value by its probability, so the 0.8 outcome must count four times as much as the 0.2 one."
            },
            "exercise": {
              "title": "Check your understanding: expectation",
              "type": "multiple-choice",
              "instructions": "Which statement about expectation is correct?",
              "starterCode": "",
              "solution": "The expectation of a random variable is the probability-weighted average of its possible values.",
              "solutionExplanation": "The expectation of a random variable is the probability-weighted average of its possible values. The other options contradict the lesson.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "The expectation of a random variable is the probability-weighted average of its possible values.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Check your understanding: expectation from the lesson: which statement is actually true?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true in general."
              },
              "options": [
                "The expectation of a random variable is the probability-weighted average of its possible values.",
                "The expectation is always one of the values the variable can actually take.",
                "The expectation of any random variable is always zero.",
                "Expectation is only defined for variables with exactly two outcomes."
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "probability-statistics-ml-m1-l4",
            "slug": "probability-statistics-ml-m1-l4",
            "title": "Variance and Standard Deviation",
            "concept": "Variance measures how spread out a random variable is, as the average squared distance from its mean. The standard deviation is the square root of the variance, which brings the spread back into the original units. A model with high variance fits training noise and fails on new data, which is why variance is central to machine learning.",
            "syntax": "var = sum((x - mean) ** 2 for x in xs) / len(xs)",
            "exampleCode": "xs = [2, 4, 4, 4, 5, 5, 7, 9]\nmean = sum(xs) / len(xs)\nprint(sum((x - mean) ** 2 for x in xs) / len(xs))",
            "exampleLanguage": "python",
            "mistake": "Dividing by len(xs) - 1 when the population variance was asked for, or forgetting to square the deviations.",
            "bug": {
              "prompt": "Find the bug: this program should print 4.0, but it prints 32.0.",
              "buggyCode": "xs = [2, 4, 4, 4, 5, 5, 7, 9]\nmean = sum(xs) / len(xs)\nprint(sum((x - mean) ** 2 for x in xs))",
              "fixedCode": "xs = [2, 4, 4, 4, 5, 5, 7, 9]\nmean = sum(xs) / len(xs)\nprint(sum((x - mean) ** 2 for x in xs) / len(xs))",
              "explanation": "Variance is the average of the squared deviations, so the sum must be divided by the number of values."
            },
            "exercise": {
              "title": "Population variance",
              "type": "write-code",
              "instructions": "Read a line of numbers and print their population variance with four decimal places.",
              "starterCode": "import sys\n\n# TODO: read the numbers and print their population variance\n",
              "solution": "import sys\nxs = [float(x) for x in sys.stdin.read().split()]\nmean = sum(xs) / len(xs)\nprint(f\"{sum((x - mean) ** 2 for x in xs) / len(xs):.4f}\")",
              "solutionExplanation": "First find the mean, then average the squared distances from it.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "2 4 4 4 5 5 7 9",
                  "expectedStdout": "4.0000\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "1 2 3 4 5",
                  "expectedStdout": "2.0000\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Population variance from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "probability-statistics-ml-m1-l5",
            "slug": "probability-statistics-ml-m1-l5",
            "title": "Common Distributions: Bernoulli and Binomial",
            "concept": "A Bernoulli trial has two outcomes, success or failure, with one success probability p. A binomial random variable counts the successes in n independent Bernoulli trials, and its probability uses the binomial coefficient. Flipping a coin ten times and counting heads is binomial with n equal to ten and p equal to one half.",
            "syntax": "P(X = k) = C(n, k) * p ** k * (1 - p) ** (n - k)",
            "exampleCode": "import math\nprint(math.comb(5, 2) * 0.5 ** 2 * 0.5 ** 3)",
            "exampleLanguage": "python",
            "mistake": "Using p to the power n instead of p to the power k, which mixes up successes and trials.",
            "bug": {
              "prompt": "Find the bug: this program should print 0.3125, but it prints 0.0781.",
              "buggyCode": "import math\nprint(math.comb(5, 2) * 0.5 ** 5 * 0.5 ** 3)",
              "fixedCode": "import math\nprint(math.comb(5, 2) * 0.5 ** 2 * 0.5 ** 3)",
              "explanation": "The success probability is raised to the number of successes k, and the failure probability to the remaining n minus k trials."
            },
            "exercise": {
              "title": "Check your understanding: binomial distribution",
              "type": "multiple-choice",
              "instructions": "Which statement about the binomial distribution is correct?",
              "starterCode": "",
              "solution": "A binomial variable counts the successes in a fixed number of independent trials that each have the same success probability.",
              "solutionExplanation": "A binomial variable counts the successes in a fixed number of independent trials that each have the same success probability. The other options contradict the lesson.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "A binomial variable counts the successes in a fixed number of independent trials that each have the same success probability.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Check your understanding: binomial distribution from the lesson: which statement is actually true?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true in general."
              },
              "options": [
                "A binomial variable counts successes when each trial has a different success probability.",
                "A binomial variable counts the successes in a fixed number of independent trials that each have the same success probability.",
                "The binomial distribution describes a single trial with two outcomes.",
                "Binomial probabilities do not depend on the number of trials."
              ],
              "answerIndex": 1
            }
          }
        ]
      },
      {
        "id": "probability-statistics-ml-m2",
        "title": "Probability & Statistics for ML in Depth",
        "level": "beginner",
        "lessons": [
          {
            "id": "probability-statistics-ml-m2-l1",
            "slug": "probability-statistics-ml-m2-l1",
            "title": "The Normal Distribution",
            "concept": "The normal distribution is the bell curve defined by a mean and a standard deviation, and it describes many natural measurements. About 68 percent of its values fall within one standard deviation of the mean, and about 95 percent within two. The central limit theorem says averages of many small random effects tend to look normal.",
            "syntax": "pdf = exp(-(x - mu) ** 2 / (2 * sigma ** 2)) / (sigma * sqrt(2 * pi))",
            "exampleCode": "import math\nprint(math.exp(0) / (1 * math.sqrt(2 * math.pi)))",
            "exampleLanguage": "python",
            "mistake": "Forgetting the normalising constant, so the curve does not integrate to one.",
            "bug": {
              "prompt": "Find the bug: this program should print about 0.3989, but it prints 1.0.",
              "buggyCode": "import math\nprint(math.exp(-(0 - 0) ** 2 / (2 * 1 ** 2)))",
              "fixedCode": "import math\nprint(math.exp(-(0 - 0) ** 2 / (2 * 1 ** 2)) / (1 * math.sqrt(2 * math.pi)))",
              "explanation": "The density must be divided by sigma times the square root of two pi, otherwise it is not a valid probability density."
            },
            "exercise": {
              "title": "Binomial probability",
              "type": "write-code",
              "instructions": "Read three numbers n, k and p, and print the binomial probability P(X = k) with four decimal places.",
              "starterCode": "import sys, math\n\n# TODO: read n, k, p and print the binomial probability\n",
              "solution": "import sys, math\nn, k, p = sys.stdin.read().split()\nn = int(n); k = int(k); p = float(p)\nprint(f\"{math.comb(n, k) * p ** k * (1 - p) ** (n - k):.4f}\")",
              "solutionExplanation": "Multiply the binomial coefficient by p to the power k and one minus p to the power n minus k.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "5 2 0.5",
                  "expectedStdout": "0.3125\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "4 1 0.25",
                  "expectedStdout": "0.4219\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Binomial probability from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "probability-statistics-ml-m2-l2",
            "slug": "probability-statistics-ml-m2-l2",
            "title": "Sampling and the Law of Large Numbers",
            "concept": "Sampling means drawing a few values from a population to learn about the whole, and the sample mean estimates the population mean. The law of large numbers says the sample mean converges to the true mean as the sample grows. This is why models trained on more data usually generalise better.",
            "syntax": "sample_mean = sum(sample) / len(sample)",
            "exampleCode": "xs = [3, 5, 4, 6, 5, 4]\nprint(sum(xs) / len(xs))",
            "exampleLanguage": "python",
            "mistake": "Using a single sample to claim certainty about the population, ignoring that small samples vary a lot.",
            "bug": {
              "prompt": "Find the bug: this program should print the mean of all six numbers, but it prints the mean of three.",
              "buggyCode": "xs = [3, 5, 4, 6, 5, 4]\nprint(sum(xs[:3]) / 3)",
              "fixedCode": "xs = [3, 5, 4, 6, 5, 4]\nprint(sum(xs) / len(xs))",
              "explanation": "The sample mean must use every sampled value, not just the first few."
            },
            "exercise": {
              "title": "Normal density",
              "type": "write-code",
              "instructions": "Read three numbers x, mu and sigma, and print the normal probability density at x with four decimal places.",
              "starterCode": "import sys, math\n\n# TODO: read x, mu, sigma and print the normal density\n",
              "solution": "import sys, math\nx, mu, sigma = [float(v) for v in sys.stdin.read().split()]\nprint(f\"{math.exp(-(x - mu) ** 2 / (2 * sigma ** 2)) / (sigma * math.sqrt(2 * math.pi)):.4f}\")",
              "solutionExplanation": "Plug x, mu and sigma into the bell-curve formula, including the normalising constant.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "0 0 1",
                  "expectedStdout": "0.3989\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "1 0 1",
                  "expectedStdout": "0.2420\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Normal density from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "probability-statistics-ml-m2-l3",
            "slug": "probability-statistics-ml-m2-l3",
            "title": "Covariance and Correlation",
            "concept": "Covariance measures whether two variables move together: positive when they rise together, negative when one rises as the other falls. Correlation divides covariance by the two standard deviations, giving a standardised number between minus one and one. Correlation is not causation, but it is the first thing a data scientist checks between features.",
            "syntax": "corr = cov / (std_x * std_y)",
            "exampleCode": "x = [1, 2, 3]\ny = [1, 2, 3]\nmx = sum(x) / 3\nmy = sum(y) / 3\ncov = sum((a - mx) * (b - my) for a, b in zip(x, y)) / 3\nprint(cov)",
            "exampleLanguage": "python",
            "mistake": "Dividing by the wrong count, or forgetting to centre the variables before multiplying.",
            "bug": {
              "prompt": "Find the bug: this program should print 0.6667, but it prints 2.0.",
              "buggyCode": "x = [1, 2, 3]\ny = [1, 2, 3]\nmx = sum(x) / 3\nmy = sum(y) / 3\nprint(sum((a - mx) * (b - my) for a, b in zip(x, y)))",
              "fixedCode": "x = [1, 2, 3]\ny = [1, 2, 3]\nmx = sum(x) / 3\nmy = sum(y) / 3\nprint(sum((a - mx) * (b - my) for a, b in zip(x, y)) / 3)",
              "explanation": "Covariance is the average of the products of centred values, so the sum must be divided by the count."
            },
            "exercise": {
              "title": "Check your understanding: covariance and correlation",
              "type": "multiple-choice",
              "instructions": "Which statement about covariance and correlation is correct?",
              "starterCode": "",
              "solution": "Covariance measures whether two variables move together, and correlation divides it by the two standard deviations to give a number between minus one and one.",
              "solutionExplanation": "Covariance measures whether two variables move together, and correlation divides it by the two standard deviations to give a number between minus one and one. The other options contradict the lesson.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Covariance measures whether two variables move together, and correlation divides it by the two standard deviations to give a number between minus one and one.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Check your understanding: covariance and correlation from the lesson: which statement is actually true?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true in general."
              },
              "options": [
                "Covariance is always between minus one and one, whatever the variables.",
                "Correlation is the covariance multiplied by the two standard deviations.",
                "Covariance measures whether two variables move together, and correlation divides it by the two standard deviations to give a number between minus one and one.",
                "Covariance and correlation are only defined for a single variable."
              ],
              "answerIndex": 2
            }
          },
          {
            "id": "probability-statistics-ml-m2-l4",
            "slug": "probability-statistics-ml-m2-l4",
            "title": "Maximum Likelihood Estimation Intuition",
            "concept": "Maximum likelihood estimation picks the parameter value that makes the observed data most probable. For a normal distribution the maximum likelihood mean is simply the sample mean, and for a coin the estimate is the fraction of heads. Most machine learning training is maximum likelihood in disguise: minimising a loss maximises a likelihood.",
            "syntax": "mean_mle = sum(xs) / len(xs)",
            "exampleCode": "xs = [2.1, 1.9, 2.0, 2.2]\nprint(sum(xs) / len(xs))",
            "exampleLanguage": "python",
            "mistake": "Choosing the parameter that makes the data least likely, by maximising the loss instead of minimising it.",
            "bug": {
              "prompt": "Find the bug: this program should print about 2.05, but it prints 8.2.",
              "buggyCode": "xs = [2.1, 1.9, 2.0, 2.2]\nprint(sum(xs))",
              "fixedCode": "xs = [2.1, 1.9, 2.0, 2.2]\nprint(sum(xs) / len(xs))",
              "explanation": "The maximum likelihood mean is the average of the observations, not their total."
            },
            "exercise": {
              "title": "Maximum likelihood mean",
              "type": "write-code",
              "instructions": "Read a line of numbers and print their mean (the maximum likelihood estimate of a normal mean) with four decimal places.",
              "starterCode": "import sys\n\n# TODO: read the numbers and print their mean\n",
              "solution": "import sys\nxs = [float(x) for x in sys.stdin.read().split()]\nprint(f\"{sum(xs) / len(xs):.4f}\")",
              "solutionExplanation": "The maximum likelihood mean is the sample mean: add the observations and divide by how many there are.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "2.1 1.9 2.0 2.2",
                  "expectedStdout": "2.0500\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "1 2 3 4 5",
                  "expectedStdout": "3.0000\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Maximum likelihood mean from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "probability-statistics-ml-m2-l5",
            "slug": "probability-statistics-ml-m2-l5",
            "title": "Bayesian Thinking: Priors and Posteriors",
            "concept": "Bayesian thinking starts with a prior belief, updates it with data through the likelihood, and ends with a posterior belief. With a Beta prior and coin-flip data, the posterior is another Beta whose mean shifts toward the observed fraction of successes. As more data arrives, the data overwhelms the prior and different priors converge.",
            "syntax": "posterior_mean = (alpha + successes) / (alpha + beta + n)",
            "exampleCode": "alpha, beta, s, n = 2, 2, 3, 4\nprint((alpha + s) / (alpha + beta + n))",
            "exampleLanguage": "python",
            "mistake": "Forgetting to add the prior counts to the denominator, so the posterior mean is too extreme.",
            "bug": {
              "prompt": "Find the bug: this program should print 0.625, but it prints 1.25.",
              "buggyCode": "alpha, beta, s, n = 2, 2, 3, 4\nprint((alpha + s) / n)",
              "fixedCode": "alpha, beta, s, n = 2, 2, 3, 4\nprint((alpha + s) / (alpha + beta + n))",
              "explanation": "The posterior mean divides the updated successes by the updated total count, prior counts included."
            },
            "exercise": {
              "title": "Beta posterior mean",
              "type": "write-code",
              "instructions": "Read four numbers: prior alpha, prior beta, observed successes and observed failures. Print the posterior mean with four decimal places.",
              "starterCode": "import sys\n\n# TODO: read alpha, beta, successes, failures and print the posterior mean\n",
              "solution": "import sys\nalpha, beta, s, f = [float(x) for x in sys.stdin.read().split()]\nprint(f\"{(alpha + s) / (alpha + beta + s + f):.4f}\")",
              "solutionExplanation": "Add the successes to alpha and the failures to beta, then divide the new alpha by the new total.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "2 2 3 1",
                  "expectedStdout": "0.6250\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "1 1 0 0",
                  "expectedStdout": "0.5000\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Beta posterior mean from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Bayes plus sample statistics",
      "type": "write-code",
      "instructions": "Read three numbers on the first line: prior, true-positive rate, false-positive rate. Read a sample of numbers on the second line. Print the posterior probability, the sample mean, and the sample population variance, each on its own line with four decimal places.",
      "starterCode": "import sys\n\n# TODO: compute the posterior, mean and variance\n",
      "solution": "import sys\nlines = sys.stdin.read().strip().splitlines()\nprior, sens, fpr = [float(x) for x in lines[0].split()]\nxs = [float(x) for x in lines[1].split()]\nnum = sens * prior\nprint(f\"{num / (num + fpr * (1 - prior)):.4f}\")\nmean = sum(xs) / len(xs)\nprint(f\"{mean:.4f}\")\nprint(f\"{sum((x - mean) ** 2 for x in xs) / len(xs):.4f}\")",
      "solutionExplanation": "Bayes' rule gives the posterior, and the sample mean and population variance summarise the sample.",
      "tests": [
        {
          "name": "Visible test",
          "stdin": "0.01 0.9 0.05\n2 4 4 4 5 5 7 9",
          "expectedStdout": "0.1538\n5.0000\n4.0000\n",
          "hidden": false
        },
        {
          "name": "Hidden test",
          "stdin": "0.2 0.8 0.1\n1 2 3 4 5",
          "expectedStdout": "0.6667\n3.0000\n2.0000\n",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "Recall the core idea of Bayes plus sample statistics from the lesson: what quantity must the program compute?",
        "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
        "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
      }
    },
    "capstone": {
      "title": "Probability and Statistics Capstone",
      "description": "Combine Bayes' rule with sample statistics: update a belief from a test result and summarise a sample.",
      "requirements": [
        "Read a prior, sensitivity and false-positive rate, plus a sample of numbers.",
        "Compute the posterior probability with Bayes' rule.",
        "Compute the sample mean and population variance.",
        "Print the three results, one per line, with four decimal places."
      ],
      "rubric": [
        "The program runs and prints the correct posterior, mean and variance for both test inputs.",
        "The Bayes denominator includes the false-positive term.",
        "The variance divides by the sample size, not by one less.",
        "The code is organised into clear steps with the three outputs labelled by position."
      ]
    }
  },
  {
    "id": "linear-regression-scratch",
    "slug": "linear-regression-scratch",
    "language": "python",
    "category": "data-ai",
    "title": "Linear Regression from Scratch",
    "description": "Fit lines to data by hand in pure Python: least squares, gradient descent, regularisation, and honest regression evaluation.",
    "difficulty": "Intermediate",
    "estimatedHours": 14,
    "skills": [
      "Least squares",
      "Closed-form regression",
      "Gradient descent",
      "Feature scaling",
      "Ridge regression",
      "Lasso regression",
      "R-squared",
      "Residual diagnostics"
    ],
    "prerequisites": [
      "probability-statistics-ml"
    ],
    "analogy": "Learning {topic} is like learning to draw the straightest possible line through a scatter of points: every new point tests how good your line really is.",
    "modules": [
      {
        "id": "linear-regression-scratch-m1",
        "title": "Linear Regression from Scratch Foundations",
        "level": "intermediate",
        "lessons": [
          {
            "id": "linear-regression-scratch-m1-l1",
            "slug": "linear-regression-scratch-m1-l1",
            "title": "The Regression Problem and Least Squares",
            "concept": "Regression predicts a number from features, and least squares picks the line that minimises the sum of squared errors between predictions and true values. Squaring the errors punishes large mistakes much more than small ones. The best line balances the errors so no other line has a smaller total.",
            "syntax": "SSE = sum((y - prediction) ** 2 for y, prediction in zip(ys, preds))",
            "exampleCode": "ys = [2, 4, 6]\npreds = [2.1, 3.9, 6.2]\nprint(sum((y - p) ** 2 for y, p in zip(ys, preds)))",
            "exampleLanguage": "python",
            "mistake": "Using absolute errors when the method asked for squared errors, which changes which line is best.",
            "bug": {
              "prompt": "Find the bug: this program should print 0.06, but it prints 0.4.",
              "buggyCode": "ys = [2, 4, 6]\npreds = [2.1, 3.9, 6.2]\nprint(sum(abs(y - p) for y, p in zip(ys, preds)))",
              "fixedCode": "ys = [2, 4, 6]\npreds = [2.1, 3.9, 6.2]\nprint(sum((y - p) ** 2 for y, p in zip(ys, preds)))",
              "explanation": "Squared error squares each difference before adding, so small errors shrink and large ones grow."
            },
            "exercise": {
              "title": "Sum of squared errors",
              "type": "write-code",
              "instructions": "Read a line of true values and a line of predictions, and print the sum of squared errors with four decimal places.",
              "starterCode": "import sys\n\n# TODO: read true values and predictions, print the SSE\n",
              "solution": "import sys\nlines = sys.stdin.read().strip().splitlines()\nys = [float(x) for x in lines[0].split()]\nps = [float(x) for x in lines[1].split()]\nprint(f\"{sum((y - p) ** 2 for y, p in zip(ys, ps)):.4f}\")",
              "solutionExplanation": "Subtract each prediction from its true value, square the difference, and add them all up.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "2 4 6\n2.1 3.9 6.2",
                  "expectedStdout": "0.0600\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "1 2 3\n1 3 2",
                  "expectedStdout": "2.0000\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Sum of squared errors from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "linear-regression-scratch-m1-l2",
            "slug": "linear-regression-scratch-m1-l2",
            "title": "Simple Linear Regression: Closed Form",
            "concept": "For one feature, the least-squares slope is the covariance of x and y divided by the variance of x, and the intercept puts the line through the means of x and y. This closed form gives the exact best line with no iteration. A slope of two means y rises by two for every unit x rises.",
            "syntax": "slope = cov(x, y) / var(x); intercept = mean(y) - slope * mean(x)",
            "exampleCode": "xs = [1, 2, 3]\nys = [2, 4, 6]\nmx = sum(xs) / 3\nmy = sum(ys) / 3\nslope = sum((x - mx) * (y - my) for x, y in zip(xs, ys)) / sum((x - mx) ** 2 for x in xs)\nprint(slope, my - slope * mx)",
            "exampleLanguage": "python",
            "mistake": "Forgetting the intercept and forcing the line through the origin when the data does not pass through zero.",
            "bug": {
              "prompt": "Find the bug: this program should print slope 2.0 and intercept 1.0, but it prints slope 2.0 and intercept 0.0.",
              "buggyCode": "xs = [1, 2, 3]\nys = [3, 5, 7]\nmx = sum(xs) / 3\nmy = sum(ys) / 3\nslope = sum((x - mx) * (y - my) for x, y in zip(xs, ys)) / sum((x - mx) ** 2 for x in xs)\nprint(slope, 0.0)",
              "fixedCode": "xs = [1, 2, 3]\nys = [3, 5, 7]\nmx = sum(xs) / 3\nmy = sum(ys) / 3\nslope = sum((x - mx) * (y - my) for x, y in zip(xs, ys)) / sum((x - mx) ** 2 for x in xs)\nprint(slope, my - slope * mx)",
              "explanation": "The intercept is mean(y) minus slope times mean(x); hard-coding zero only works when the line passes through the origin."
            },
            "exercise": {
              "title": "Closed-form simple regression",
              "type": "write-code",
              "instructions": "Read a line of x values and a line of y values, and print the slope and intercept with four decimal places, separated by a space.",
              "starterCode": "import sys\n\n# TODO: read x and y, print slope and intercept\n",
              "solution": "import sys\nlines = sys.stdin.read().strip().splitlines()\nxs = [float(x) for x in lines[0].split()]\nys = [float(x) for x in lines[1].split()]\nmx = sum(xs) / len(xs)\nmy = sum(ys) / len(ys)\nslope = sum((x - mx) * (y - my) for x, y in zip(xs, ys)) / sum((x - mx) ** 2 for x in xs)\nprint(f\"{slope:.4f} {my - slope * mx:.4f}\")",
              "solutionExplanation": "The slope is covariance over variance of x, and the intercept makes the line pass through the point of means.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "1 2 3\n3 5 7",
                  "expectedStdout": "2.0000 1.0000\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "0 1 2 3\n1 3 4 6",
                  "expectedStdout": "1.6000 1.1000\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Closed-form simple regression from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "linear-regression-scratch-m1-l3",
            "slug": "linear-regression-scratch-m1-l3",
            "title": "Multiple Linear Regression",
            "concept": "Multiple regression uses several features at once, with one weight per feature plus an intercept, so the prediction is a weighted sum. Each weight measures the effect of its feature while the others are held fixed. Adding features can improve the fit but also invites overfitting.",
            "syntax": "y = w1 * x1 + w2 * x2 + b",
            "exampleCode": "w1, w2, b = 2.0, 3.0, 1.0\nprint(w1 * 2 + w2 * 4 + b)",
            "exampleLanguage": "python",
            "mistake": "Reading the weight of one feature as its importance without checking the feature scales.",
            "bug": {
              "prompt": "Find the bug: this program should print 17.0, but it prints 14.0.",
              "buggyCode": "w1, w2, b = 2.0, 3.0, 1.0\nprint(w1 * 2 + w2 * 4)",
              "fixedCode": "w1, w2, b = 2.0, 3.0, 1.0\nprint(w1 * 2 + w2 * 4 + b)",
              "explanation": "The intercept b is part of the prediction and must be added, not dropped."
            },
            "exercise": {
              "title": "Check your understanding: multiple regression",
              "type": "multiple-choice",
              "instructions": "Which statement about multiple linear regression is correct?",
              "starterCode": "",
              "solution": "Each weight measures the effect of its feature on the prediction while the other features are held fixed.",
              "solutionExplanation": "Each weight measures the effect of its feature on the prediction while the other features are held fixed. The other options contradict the lesson.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Each weight measures the effect of its feature on the prediction while the other features are held fixed.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Check your understanding: multiple regression from the lesson: which statement is actually true?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true in general."
              },
              "options": [
                "Adding more features always makes the model better on new data.",
                "Multiple regression can only use one feature at a time.",
                "The intercept must always be zero in multiple regression.",
                "Each weight measures the effect of its feature on the prediction while the other features are held fixed."
              ],
              "answerIndex": 3
            }
          },
          {
            "id": "linear-regression-scratch-m1-l4",
            "slug": "linear-regression-scratch-m1-l4",
            "title": "Gradient Descent for Regression",
            "concept": "Gradient descent fits regression weights by starting from a guess and repeatedly stepping against the gradient of the squared-error loss. The gradient for a weight is minus two times the feature times the error, so a prediction that is too low pushes the weight up. Small learning rates converge slowly and large ones can diverge.",
            "syntax": "w = w - lr * (-2 * x * (y - prediction))",
            "exampleCode": "w, b, lr = 0.0, 0.0, 0.1\nx, y = 2.0, 4.0\npred = w * x + b\nw = w - lr * (-2 * x * (y - pred))\nb = b - lr * (-2 * (y - pred))\nprint(w, b)",
            "exampleLanguage": "python",
            "mistake": "Adding the gradient instead of subtracting it, which climbs the loss instead of descending it.",
            "bug": {
              "prompt": "Find the bug: this program should print w 1.6 and b 0.8, but it prints w -1.6 and b -0.8.",
              "buggyCode": "w, b, lr = 0.0, 0.0, 0.1\nx, y = 2.0, 4.0\npred = w * x + b\nw = w + lr * (-2 * x * (y - pred))\nb = b + lr * (-2 * (y - pred))\nprint(w, b)",
              "fixedCode": "w, b, lr = 0.0, 0.0, 0.1\nx, y = 2.0, 4.0\npred = w * x + b\nw = w - lr * (-2 * x * (y - pred))\nb = b - lr * (-2 * (y - pred))\nprint(w, b)",
              "explanation": "Gradient descent subtracts the scaled gradient; adding it moves the weights uphill and the loss grows."
            },
            "exercise": {
              "title": "One gradient descent step",
              "type": "write-code",
              "instructions": "Read w, b, learning rate, x and y on one line. Take one gradient descent step on squared error and print the new w and b with four decimal places, separated by a space.",
              "starterCode": "import sys\n\n# TODO: read the values and take one gradient step\n",
              "solution": "import sys\nw, b, lr, x, y = [float(v) for v in sys.stdin.read().split()]\npred = w * x + b\nerr = y - pred\nw = w - lr * (-2 * x * err)\nb = b - lr * (-2 * err)\nprint(f\"{w:.4f} {b:.4f}\")",
              "solutionExplanation": "The gradients are minus two times x times the error for w and minus two times the error for b; subtract each scaled by the learning rate.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "0 0 0.1 2 4",
                  "expectedStdout": "1.6000 0.8000\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "1 0 0.05 3 5",
                  "expectedStdout": "1.6000 0.2000\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of One gradient descent step from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "linear-regression-scratch-m1-l5",
            "slug": "linear-regression-scratch-m1-l5",
            "title": "Feature Scaling and Normalisation",
            "concept": "Feature scaling puts features on a common scale so that gradient descent converges faster and regularisation treats features fairly. Standardisation subtracts the mean and divides by the standard deviation, while min-max scaling maps values into zero to one. Tree models do not need scaling, but linear models and k-nearest neighbours do.",
            "syntax": "z = (x - mean) / std",
            "exampleCode": "xs = [10, 20, 30]\nmean = sum(xs) / 3\nstd = (sum((x - mean) ** 2 for x in xs) / 3) ** 0.5\nprint([(x - mean) / std for x in xs])",
            "exampleLanguage": "python",
            "mistake": "Scaling the test set with its own mean and standard deviation instead of the training set's statistics.",
            "bug": {
              "prompt": "Find the bug: this program should print about [-1.2247, 0.0, 1.2247], but it prints [-1.0, 0.0, 1.0].",
              "buggyCode": "xs = [10, 20, 30]\nmean = sum(xs) / 3\nprint([(x - mean) / 10 for x in xs])",
              "fixedCode": "xs = [10, 20, 30]\nmean = sum(xs) / 3\nstd = (sum((x - mean) ** 2 for x in xs) / 3) ** 0.5\nprint([(x - mean) / std for x in xs])",
              "explanation": "Standardisation divides by the standard deviation of the data, not by an arbitrary number like ten."
            },
            "exercise": {
              "title": "Check your understanding: feature scaling",
              "type": "multiple-choice",
              "instructions": "Which statement about feature scaling is correct?",
              "starterCode": "",
              "solution": "Standardisation subtracts the mean and divides by the standard deviation so features share a common scale.",
              "solutionExplanation": "Standardisation subtracts the mean and divides by the standard deviation so features share a common scale. The other options contradict the lesson.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Standardisation subtracts the mean and divides by the standard deviation so features share a common scale.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Check your understanding: feature scaling from the lesson: which statement is actually true?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true in general."
              },
              "options": [
                "Standardisation subtracts the mean and divides by the standard deviation so features share a common scale.",
                "Feature scaling changes the predictions of a decision tree.",
                "Scaling is only needed when the target variable is large.",
                "Min-max scaling always produces values between minus one and one."
              ],
              "answerIndex": 0
            }
          }
        ]
      },
      {
        "id": "linear-regression-scratch-m2",
        "title": "Linear Regression from Scratch in Depth",
        "level": "intermediate",
        "lessons": [
          {
            "id": "linear-regression-scratch-m2-l1",
            "slug": "linear-regression-scratch-m2-l1",
            "title": "Polynomial Features and Overfitting",
            "concept": "Polynomial features add powers of x, like x squared, so a linear model can fit curves. A high-degree polynomial can pass through every training point yet swing wildly between them, which is overfitting. The right degree is found by checking error on held-out data, not training data.",
            "syntax": "y = w0 + w1 * x + w2 * x ** 2",
            "exampleCode": "w0, w1, w2, x = 1.0, 2.0, 0.5, 3.0\nprint(w0 + w1 * x + w2 * x ** 2)",
            "exampleLanguage": "python",
            "mistake": "Choosing the polynomial degree by training error alone, which always favours the highest degree.",
            "bug": {
              "prompt": "Find the bug: this program should print 11.5, but it prints 7.0.",
              "buggyCode": "w0, w1, w2, x = 1.0, 2.0, 0.5, 3.0\nprint(w0 + w1 * x + w2 * x)",
              "fixedCode": "w0, w1, w2, x = 1.0, 2.0, 0.5, 3.0\nprint(w0 + w1 * x + w2 * x ** 2)",
              "explanation": "The quadratic term squares x; using plain x turns it into another linear term and the curve disappears."
            },
            "exercise": {
              "title": "Quadratic prediction",
              "type": "write-code",
              "instructions": "Read w0, w1, w2 and x on one line, and print the quadratic prediction w0 + w1*x + w2*x^2 with four decimal places.",
              "starterCode": "import sys\n\n# TODO: read the weights and x, print the prediction\n",
              "solution": "import sys\nw0, w1, w2, x = [float(v) for v in sys.stdin.read().split()]\nprint(f\"{w0 + w1 * x + w2 * x ** 2:.4f}\")",
              "solutionExplanation": "Multiply w1 by x and w2 by x squared, then add w0.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "1 2 0.5 3",
                  "expectedStdout": "11.5000\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "0 1 1 2",
                  "expectedStdout": "6.0000\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Quadratic prediction from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "linear-regression-scratch-m2-l2",
            "slug": "linear-regression-scratch-m2-l2",
            "title": "Ridge Regression (L2)",
            "concept": "Ridge regression adds a penalty on the squared weights to the loss, which shrinks large weights toward zero and stabilises the fit. The penalty strength lambda controls the trade-off: zero is ordinary least squares and a huge lambda flattens the model. For a single weight with no intercept, the ridge solution is the sum of x times y divided by the sum of x squared plus lambda.",
            "syntax": "w = sum(x * y) / (sum(x ** 2) + lambda)",
            "exampleCode": "xs = [1, 2, 3]\nys = [2, 4, 6]\nlam = 1.0\nprint(sum(x * y for x, y in zip(xs, ys)) / (sum(x * x for x in xs) + lam))",
            "exampleLanguage": "python",
            "mistake": "Adding lambda to the numerator instead of the denominator, which barely changes the weight.",
            "bug": {
              "prompt": "Find the bug: this program should print about 1.8667, but it prints 2.0.",
              "buggyCode": "xs = [1, 2, 3]\nys = [2, 4, 6]\nlam = 1.0\nprint((sum(x * y for x, y in zip(xs, ys)) + lam) / sum(x * x for x in xs))",
              "fixedCode": "xs = [1, 2, 3]\nys = [2, 4, 6]\nlam = 1.0\nprint(sum(x * y for x, y in zip(xs, ys)) / (sum(x * x for x in xs) + lam))",
              "explanation": "Lambda belongs in the denominator, added to the sum of squared x values, where it shrinks the weight."
            },
            "exercise": {
              "title": "Ridge weight, one feature",
              "type": "write-code",
              "instructions": "Read lambda on the first line, a line of x values, and a line of y values. Print the ridge weight with four decimal places.",
              "starterCode": "import sys\n\n# TODO: read lambda, x and y, print the ridge weight\n",
              "solution": "import sys\nlines = sys.stdin.read().strip().splitlines()\nlam = float(lines[0])\nxs = [float(v) for v in lines[1].split()]\nys = [float(v) for v in lines[2].split()]\nprint(f\"{sum(x * y for x, y in zip(xs, ys)) / (sum(x * x for x in xs) + lam):.4f}\")",
              "solutionExplanation": "Divide the sum of x times y by the sum of x squared plus lambda.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "1\n1 2 3\n2 4 6",
                  "expectedStdout": "1.8667\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "0\n1 2 3\n2 4 6",
                  "expectedStdout": "2.0000\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Ridge weight, one feature from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "linear-regression-scratch-m2-l3",
            "slug": "linear-regression-scratch-m2-l3",
            "title": "Lasso Regression (L1) Intuition",
            "concept": "Lasso adds a penalty on the absolute values of the weights, which can shrink some weights to exactly zero and thereby select features. Unlike ridge, which only shrinks, lasso performs automatic feature selection. Lasso is preferred when you suspect only a few features truly matter.",
            "syntax": "lasso penalty = lambda * sum(abs(w))",
            "exampleCode": "ws = [2.0, -0.5, 0.0]\nlam = 0.5\nprint(lam * sum(abs(w) for w in ws))",
            "exampleLanguage": "python",
            "mistake": "Expecting lasso to keep all features with small weights, like ridge does.",
            "bug": {
              "prompt": "Find the bug: this program should print 1.25, but it prints 2.5.",
              "buggyCode": "ws = [2.0, -0.5, 0.0]\nlam = 0.5\nprint(sum(abs(w) for w in ws))",
              "fixedCode": "ws = [2.0, -0.5, 0.0]\nlam = 0.5\nprint(lam * sum(abs(w) for w in ws))",
              "explanation": "The penalty is lambda times the sum of absolute weights; leaving lambda out doubles the reported penalty here."
            },
            "exercise": {
              "title": "Check your understanding: lasso",
              "type": "multiple-choice",
              "instructions": "Which statement about lasso regression is correct?",
              "starterCode": "",
              "solution": "Lasso can shrink some weights to exactly zero, which performs automatic feature selection.",
              "solutionExplanation": "Lasso can shrink some weights to exactly zero, which performs automatic feature selection. The other options contradict the lesson.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Lasso can shrink some weights to exactly zero, which performs automatic feature selection.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Check your understanding: lasso from the lesson: which statement is actually true?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true in general."
              },
              "options": [
                "Lasso can only be used with exactly one feature.",
                "Lasso can shrink some weights to exactly zero, which performs automatic feature selection.",
                "Lasso never removes any feature from the model.",
                "Lasso penalises the squared weights, exactly like ridge."
              ],
              "answerIndex": 1
            }
          },
          {
            "id": "linear-regression-scratch-m2-l4",
            "slug": "linear-regression-scratch-m2-l4",
            "title": "Evaluating Regression: R2, MAE, RMSE",
            "concept": "R-squared measures the fraction of the target's variance that the model explains, with one meaning a perfect fit and zero meaning no better than predicting the mean. MAE reports the average absolute error in the target's units, and RMSE is the square root of the mean squared error, which punishes large mistakes. Together they show both fit quality and error size.",
            "syntax": "R2 = 1 - SSE / SST",
            "exampleCode": "ys = [2, 4, 6]\npreds = [2.1, 3.9, 6.2]\nmean = sum(ys) / 3\nsse = sum((y - p) ** 2 for y, p in zip(ys, preds))\nsst = sum((y - mean) ** 2 for y in ys)\nprint(1 - sse / sst)",
            "exampleLanguage": "python",
            "mistake": "Reporting R-squared on training data only and claiming the model generalises.",
            "bug": {
              "prompt": "Find the bug: this program should print about 0.9925, but it prints 0.0075.",
              "buggyCode": "ys = [2, 4, 6]\npreds = [2.1, 3.9, 6.2]\nmean = sum(ys) / 3\nsse = sum((y - p) ** 2 for y, p in zip(ys, preds))\nsst = sum((y - mean) ** 2 for y in ys)\nprint(sse / sst)",
              "fixedCode": "ys = [2, 4, 6]\npreds = [2.1, 3.9, 6.2]\nmean = sum(ys) / 3\nsse = sum((y - p) ** 2 for y, p in zip(ys, preds))\nsst = sum((y - mean) ** 2 for y in ys)\nprint(1 - sse / sst)",
              "explanation": "R-squared is one minus the ratio of squared error to total variance, not the ratio itself."
            },
            "exercise": {
              "title": "Root mean squared error",
              "type": "write-code",
              "instructions": "Read a line of true values and a line of predictions, and print the RMSE with four decimal places.",
              "starterCode": "import sys\n\n# TODO: read true values and predictions, print the RMSE\n",
              "solution": "import sys\nlines = sys.stdin.read().strip().splitlines()\nys = [float(x) for x in lines[0].split()]\nps = [float(x) for x in lines[1].split()]\nprint(f\"{(sum((y - p) ** 2 for y, p in zip(ys, ps)) / len(ys)) ** 0.5:.4f}\")",
              "solutionExplanation": "Square each error, average them, and take the square root.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "2 4 6\n2.1 3.9 6.2",
                  "expectedStdout": "0.1414\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "1 2 3\n1 3 2",
                  "expectedStdout": "0.8165\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Root mean squared error from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "linear-regression-scratch-m2-l5",
            "slug": "linear-regression-scratch-m2-l5",
            "title": "Regression Diagnostics: Residual Plots",
            "concept": "A residual is the true value minus the prediction, and plotting residuals against predictions reveals what the model missed. Random scatter around zero means the linear fit is adequate, while a curve or a funnel shape means the model is missing structure or the variance is not constant. Diagnostics turn a single score into an understanding of the failure.",
            "syntax": "residual = y - prediction",
            "exampleCode": "ys = [2, 4, 6]\npreds = [2.1, 3.9, 6.2]\nprint([round(y - p, 2) for y, p in zip(ys, preds)])",
            "exampleLanguage": "python",
            "mistake": "Computing residuals as prediction minus true value, which flips every sign.",
            "bug": {
              "prompt": "Find the bug: this program should print [-0.1, 0.1, -0.2], but it prints [0.1, -0.1, 0.2].",
              "buggyCode": "ys = [2, 4, 6]\npreds = [2.1, 3.9, 6.2]\nprint([round(p - y, 2) for y, p in zip(ys, preds)])",
              "fixedCode": "ys = [2, 4, 6]\npreds = [2.1, 3.9, 6.2]\nprint([round(y - p, 2) for y, p in zip(ys, preds)])",
              "explanation": "A residual is the true value minus the prediction, so the subtraction order is y minus p."
            },
            "exercise": {
              "title": "Residuals of a regression",
              "type": "write-code",
              "instructions": "Read a line of true values and a line of predictions, and print the residuals (true minus predicted) as space-separated numbers with four decimal places.",
              "starterCode": "import sys\n\n# TODO: read true values and predictions, print the residuals\n",
              "solution": "import sys\nlines = sys.stdin.read().strip().splitlines()\nys = [float(x) for x in lines[0].split()]\nps = [float(x) for x in lines[1].split()]\nprint(\" \".join(f\"{y - p:.4f}\" for y, p in zip(ys, ps)))",
              "solutionExplanation": "Each residual is the true value minus the prediction for the same example.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "2 4 6\n2.1 3.9 6.2",
                  "expectedStdout": "-0.1000 0.1000 -0.2000\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "1 2 3\n1.5 2.5 2.0",
                  "expectedStdout": "-0.5000 -0.5000 1.0000\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Residuals of a regression from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Fit, predict and evaluate a regression",
      "type": "write-code",
      "instructions": "Read a line of x values, a line of y values, and a new x on the last line. Fit the least-squares line, print the slope and intercept on the first line, the prediction for the new x on the second line, and the RMSE on the training data on the third line, each with four decimal places.",
      "starterCode": "import sys\n\n# TODO: fit the line, predict, and evaluate\n",
      "solution": "import sys\nlines = sys.stdin.read().strip().splitlines()\nxs = [float(v) for v in lines[0].split()]\nys = [float(v) for v in lines[1].split()]\nx_new = float(lines[2])\nmx = sum(xs) / len(xs)\nmy = sum(ys) / len(ys)\nslope = sum((x - mx) * (y - my) for x, y in zip(xs, ys)) / sum((x - mx) ** 2 for x in xs)\ninter = my - slope * mx\nprint(f\"{slope:.4f} {inter:.4f}\")\nprint(f\"{slope * x_new + inter:.4f}\")\nrmse = (sum((y - (slope * x + inter)) ** 2 for x, y in zip(xs, ys)) / len(xs)) ** 0.5\nprint(f\"{rmse:.4f}\")",
      "solutionExplanation": "Fit the closed-form line from the means and covariance, evaluate it at the new x, and compute the training RMSE.",
      "tests": [
        {
          "name": "Visible test",
          "stdin": "1 2 3\n2 4 6\n4",
          "expectedStdout": "2.0000 0.0000\n8.0000\n0.0000\n",
          "hidden": false
        },
        {
          "name": "Hidden test",
          "stdin": "0 1 2\n1 3 5\n3",
          "expectedStdout": "2.0000 1.0000\n7.0000\n0.0000\n",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "Recall the core idea of Fit, predict and evaluate a regression from the lesson: what quantity must the program compute?",
        "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
        "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
      }
    },
    "capstone": {
      "title": "Linear Regression Capstone",
      "description": "Build a complete least-squares regression in pure Python: fit the line, predict a new value, and report the error.",
      "requirements": [
        "Read training x and y values plus a new x to predict.",
        "Fit the slope and intercept with the closed-form least-squares formulas.",
        "Predict the target for the new x.",
        "Compute and print the training RMSE alongside the fit."
      ],
      "rubric": [
        "The program runs and prints the correct slope, intercept, prediction and RMSE for both test inputs.",
        "The slope divides covariance by the variance of x, not of y.",
        "The prediction uses the fitted line, not the training mean.",
        "The RMSE is computed from the fitted predictions, not from the raw targets."
      ]
    }
  },
  {
    "id": "logistic-regression-scratch",
    "slug": "logistic-regression-scratch",
    "language": "python",
    "category": "data-ai",
    "title": "Logistic Regression from Scratch",
    "description": "Turn a linear score into a probability in pure Python: the sigmoid, cross-entropy, gradient descent, and classifier evaluation.",
    "difficulty": "Intermediate",
    "estimatedHours": 14,
    "skills": [
      "Sigmoid function",
      "Log-odds",
      "Cross-entropy loss",
      "Logistic gradient descent",
      "Softmax",
      "Confusion matrix",
      "Precision and recall",
      "F1 score"
    ],
    "prerequisites": [
      "linear-regression-scratch"
    ],
    "analogy": "Learning {topic} is like learning to call a close election: you turn evidence into a probability, then decide where to draw the line.",
    "modules": [
      {
        "id": "logistic-regression-scratch-m1",
        "title": "Logistic Regression from Scratch Foundations",
        "level": "intermediate",
        "lessons": [
          {
            "id": "logistic-regression-scratch-m1-l1",
            "slug": "logistic-regression-scratch-m1-l1",
            "title": "Classification vs Regression",
            "concept": "Classification predicts a category while regression predicts a number, and the two need different outputs and different losses. A classifier should output a probability over classes, not a raw number that can fall outside zero and one. Logistic regression is the bridge: it fits a linear model and squashes the output into a probability.",
            "syntax": "classification -> label; regression -> number",
            "exampleCode": "print('spam' if 0.8 >= 0.5 else 'not spam')",
            "exampleLanguage": "python",
            "mistake": "Using squared error to train a classifier, which punishes confident correct predictions.",
            "bug": {
              "prompt": "Find the bug: this program should print 'spam', but it prints 'not spam'.",
              "buggyCode": "p = 0.8\nprint('spam' if p < 0.5 else 'not spam')",
              "fixedCode": "p = 0.8\nprint('spam' if p >= 0.5 else 'not spam')",
              "explanation": "The positive class is predicted when the probability is at least 0.5, not when it is below it."
            },
            "exercise": {
              "title": "Classify by threshold",
              "type": "write-code",
              "instructions": "Read a line of probabilities and print 'spam' or 'ham' for each, using a 0.5 threshold, one label per line.",
              "starterCode": "import sys\n\n# TODO: read probabilities and classify each one\n",
              "solution": "import sys\nps = [float(x) for x in sys.stdin.read().split()]\nfor p in ps:\n    print('spam' if p >= 0.5 else 'ham')",
              "solutionExplanation": "Each probability at or above 0.5 is the positive class; below it is the negative class.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "0.8 0.3 0.6",
                  "expectedStdout": "spam\nham\nspam\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "0.1 0.9",
                  "expectedStdout": "ham\nspam\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Classify by threshold from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "logistic-regression-scratch-m1-l2",
            "slug": "logistic-regression-scratch-m1-l2",
            "title": "The Sigmoid Function",
            "concept": "The sigmoid squashes any real number into the range zero to one, so a linear score becomes a probability. It outputs 0.5 at zero, approaches one for large positive inputs, and approaches zero for large negative inputs. Its smooth S-shape also makes it differentiable, which gradient descent needs.",
            "syntax": "sigmoid(x) = 1 / (1 + exp(-x))",
            "exampleCode": "import math\nprint(1 / (1 + math.exp(-2)))",
            "exampleLanguage": "python",
            "mistake": "Forgetting the minus sign in the exponent, which flips the curve upside down.",
            "bug": {
              "prompt": "Find the bug: this program should print about 0.8808, but it prints about 0.1192.",
              "buggyCode": "import math\nprint(1 / (1 + math.exp(2)))",
              "fixedCode": "import math\nprint(1 / (1 + math.exp(-2)))",
              "explanation": "The sigmoid uses exp(-x); with exp(x) the curve is mirrored and large inputs map near zero."
            },
            "exercise": {
              "title": "Sigmoid values",
              "type": "write-code",
              "instructions": "Read a line of scores and print the sigmoid of each with four decimal places, space-separated.",
              "starterCode": "import sys, math\n\n# TODO: read scores and print their sigmoids\n",
              "solution": "import sys, math\nxs = [float(v) for v in sys.stdin.read().split()]\nprint(\" \".join(f\"{1 / (1 + math.exp(-x)):.4f}\" for x in xs))",
              "solutionExplanation": "Apply one over one plus exp of minus x to each score.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "0 2 -1",
                  "expectedStdout": "0.5000 0.8808 0.2689\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "1 -2 0.5",
                  "expectedStdout": "0.7311 0.1192 0.6225\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Sigmoid values from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "logistic-regression-scratch-m1-l3",
            "slug": "logistic-regression-scratch-m1-l3",
            "title": "The Log-Odds and Decision Boundary",
            "concept": "The log-odds, or logit, is the logarithm of the odds p over one minus p, and the sigmoid is its inverse. Logistic regression models the log-odds as a linear function, so a weight of 0.7 means one unit of the feature multiplies the odds by exp(0.7). The decision boundary is where the linear score is zero and the probability is exactly one half.",
            "syntax": "logit(p) = log(p / (1 - p))",
            "exampleCode": "import math\nprint(math.log(0.8 / 0.2))",
            "exampleLanguage": "python",
            "mistake": "Reading a probability of 0.8 as odds of 0.8, when the odds are actually four to one.",
            "bug": {
              "prompt": "Find the bug: this program should print about 1.3863, but it prints -0.2231.",
              "buggyCode": "import math\nprint(math.log(0.8))",
              "fixedCode": "import math\nprint(math.log(0.8 / 0.2))",
              "explanation": "The log-odds takes the log of the odds p over one minus p, not the log of p itself."
            },
            "exercise": {
              "title": "Check your understanding: log-odds",
              "type": "multiple-choice",
              "instructions": "Which statement about log-odds is correct?",
              "starterCode": "",
              "solution": "The log-odds is the logarithm of p over one minus p, and logistic regression models it as a linear function.",
              "solutionExplanation": "The log-odds is the logarithm of p over one minus p, and logistic regression models it as a linear function. The other options contradict the lesson.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "The log-odds is the logarithm of p over one minus p, and logistic regression models it as a linear function.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Check your understanding: log-odds from the lesson: which statement is actually true?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true in general."
              },
              "options": [
                "The log-odds of a probability is always the probability itself.",
                "Log-odds are only defined for probabilities above 0.9.",
                "The log-odds is the logarithm of p over one minus p, and logistic regression models it as a linear function.",
                "The decision boundary of logistic regression is where the probability is zero."
              ],
              "answerIndex": 2
            }
          },
          {
            "id": "logistic-regression-scratch-m1-l4",
            "slug": "logistic-regression-scratch-m1-l4",
            "title": "Binary Cross-Entropy Loss",
            "concept": "Binary cross-entropy measures how badly a predicted probability matches a true label: minus log(p) when the label is one, and minus log(1 - p) when it is zero. Confident wrong predictions are punished far more than uncertain ones. Averaging this loss over the data gives the objective logistic regression minimises.",
            "syntax": "loss = -(y * log(p) + (1 - y) * log(1 - p))",
            "exampleCode": "import math\ny, p = 1, 0.8\nprint(-(y * math.log(p) + (1 - y) * math.log(1 - p)))",
            "exampleLanguage": "python",
            "mistake": "Using the loss for the wrong label, so confident correct predictions look terrible.",
            "bug": {
              "prompt": "Find the bug: this program should print about 0.2231, but it prints about 1.6094.",
              "buggyCode": "import math\ny, p = 1, 0.8\nprint(-((1 - y) * math.log(p) + y * math.log(1 - p)))",
              "fixedCode": "import math\ny, p = 1, 0.8\nprint(-(y * math.log(p) + (1 - y) * math.log(1 - p)))",
              "explanation": "When the label is one, only the log(p) term counts; swapping the terms charges the loss for the wrong class."
            },
            "exercise": {
              "title": "Binary cross-entropy",
              "type": "write-code",
              "instructions": "Read a label y (0 or 1) and a predicted probability p on one line, and print the binary cross-entropy loss with four decimal places.",
              "starterCode": "import sys, math\n\n# TODO: read y and p, print the loss\n",
              "solution": "import sys, math\ny, p = [float(v) for v in sys.stdin.read().split()]\nprint(f\"{-(y * math.log(p) + (1 - y) * math.log(1 - p)):.4f}\")",
              "solutionExplanation": "Use minus log(p) for label one and minus log(1 - p) for label zero.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "1 0.8",
                  "expectedStdout": "0.2231\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "0 0.2",
                  "expectedStdout": "0.2231\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Binary cross-entropy from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "logistic-regression-scratch-m1-l5",
            "slug": "logistic-regression-scratch-m1-l5",
            "title": "Gradient Descent for Logistic Regression",
            "concept": "The gradient of the cross-entropy loss with respect to a weight is simply the feature times the error (prediction minus label), which is beautifully simple. One gradient step moves the weight by the learning rate times that product, in the direction that reduces the loss. This is the same shape as the linear regression update, with a different prediction function.",
            "syntax": "w = w - lr * x * (p - y)",
            "exampleCode": "w, lr, x, y, p = 0.0, 0.5, 2.0, 1, 0.5\nw = w - lr * x * (p - y)\nprint(w)",
            "exampleLanguage": "python",
            "mistake": "Using the raw linear score as the prediction in the gradient, instead of the sigmoid probability.",
            "bug": {
              "prompt": "Find the bug: this program should print 0.5, but it prints 1.0.",
              "buggyCode": "w, lr, x, y, p = 0.0, 0.5, 2.0, 1, 0.5\nw = w - lr * x * (1 - y)\nprint(w)",
              "fixedCode": "w, lr, x, y, p = 0.0, 0.5, 2.0, 1, 0.5\nw = w - lr * x * (p - y)\nprint(w)",
              "explanation": "The error is the predicted probability minus the label, p minus y, not one minus y."
            },
            "exercise": {
              "title": "Check your understanding: logistic gradient",
              "type": "multiple-choice",
              "instructions": "Which statement about the logistic regression gradient is correct?",
              "starterCode": "",
              "solution": "The gradient for a weight is the feature times the error, prediction minus label.",
              "solutionExplanation": "The gradient for a weight is the feature times the error, prediction minus label. The other options contradict the lesson.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "The gradient for a weight is the feature times the error, prediction minus label.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Check your understanding: logistic gradient from the lesson: which statement is actually true?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true in general."
              },
              "options": [
                "The gradient for a weight is the feature times the label only.",
                "The gradient of logistic regression does not depend on the prediction.",
                "The gradient is always zero once training starts.",
                "The gradient for a weight is the feature times the error, prediction minus label."
              ],
              "answerIndex": 3
            }
          }
        ]
      },
      {
        "id": "logistic-regression-scratch-m2",
        "title": "Logistic Regression from Scratch in Depth",
        "level": "intermediate",
        "lessons": [
          {
            "id": "logistic-regression-scratch-m2-l1",
            "slug": "logistic-regression-scratch-m2-l1",
            "title": "Multiclass Logistic Regression (Softmax)",
            "concept": "Softmax turns a vector of scores into a probability distribution by exponentiating each score and dividing by the total. The class with the highest score gets the highest probability, and the probabilities sum to one. Subtracting the maximum score before exponentiating keeps the computation numerically stable.",
            "syntax": "softmax(z)_i = exp(z_i) / sum(exp(z_j))",
            "exampleCode": "import math\nz = [2.0, 1.0, 0.0]\nprint([math.exp(v) / sum(math.exp(x) for x in z) for v in z])",
            "exampleLanguage": "python",
            "mistake": "Forgetting to normalise, so the outputs do not sum to one and are not probabilities.",
            "bug": {
              "prompt": "Find the bug: this program should print numbers summing to 1.0, but it prints [7.39, 2.72, 1.0].",
              "buggyCode": "import math\nz = [2.0, 1.0, 0.0]\nprint([math.exp(v) for v in z])",
              "fixedCode": "import math\nz = [2.0, 1.0, 0.0]\nprint([math.exp(v) / sum(math.exp(x) for x in z) for v in z])",
              "explanation": "Softmax divides each exponential by the sum of all exponentials, which is what makes the outputs a probability distribution."
            },
            "exercise": {
              "title": "Softmax probabilities",
              "type": "write-code",
              "instructions": "Read a line of scores and print the softmax probabilities with four decimal places, space-separated.",
              "starterCode": "import sys, math\n\n# TODO: read scores and print softmax probabilities\n",
              "solution": "import sys, math\nz = [float(v) for v in sys.stdin.read().split()]\nm = max(z)\nexps = [math.exp(v - m) for v in z]\ntot = sum(exps)\nprint(\" \".join(f\"{e / tot:.4f}\" for e in exps))",
              "solutionExplanation": "Exponentiate each score after subtracting the maximum, then divide by the total.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "2 1 0",
                  "expectedStdout": "0.6652 0.2447 0.0900\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "1 1 1",
                  "expectedStdout": "0.3333 0.3333 0.3333\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Softmax probabilities from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "logistic-regression-scratch-m2-l2",
            "slug": "logistic-regression-scratch-m2-l2",
            "title": "Regularisation in Logistic Regression",
            "concept": "Regularisation adds a penalty on the size of the weights to the cross-entropy loss, which keeps the model from becoming overconfident on the training data. Stronger regularisation shrinks the weights and smooths the decision boundary. The strength is chosen by validation, not by guessing.",
            "syntax": "loss = cross-entropy + lambda * sum(w ** 2)",
            "exampleCode": "ws = [1.0, -2.0]\nlam = 0.1\nprint(lam * sum(w * w for w in ws))",
            "exampleLanguage": "python",
            "mistake": "Regularising the bias term as well as the weights, which shifts the decision threshold for no benefit.",
            "bug": {
              "prompt": "Find the bug: this program should print 0.5, but it prints 0.6.",
              "buggyCode": "ws = [1.0, -2.0]\nlam = 0.1\nprint(lam * sum(w * w for w in ws) + lam * 1.0)",
              "fixedCode": "ws = [1.0, -2.0]\nlam = 0.1\nprint(lam * sum(w * w for w in ws))",
              "explanation": "The penalty applies to the weights only; adding a term for the bias inflates the penalty for no reason."
            },
            "exercise": {
              "title": "L2 penalty of logistic weights",
              "type": "write-code",
              "instructions": "Read weights on the first line and lambda on the second line, and print the L2 penalty lambda times the sum of squared weights with four decimal places.",
              "starterCode": "import sys\n\n# TODO: read the weights and lambda, print the L2 penalty\n",
              "solution": "import sys\nlines = sys.stdin.read().strip().splitlines()\nws = [float(v) for v in lines[0].split()]\nlam = float(lines[1])\nprint(f\"{lam * sum(w * w for w in ws):.4f}\")",
              "solutionExplanation": "Square each weight, add them up, and multiply by lambda.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "1 -2\n0.1",
                  "expectedStdout": "0.5000\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "2 0 1\n0.5",
                  "expectedStdout": "2.5000\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of L2 penalty of logistic weights from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "logistic-regression-scratch-m2-l3",
            "slug": "logistic-regression-scratch-m2-l3",
            "title": "Class Imbalance and Thresholds",
            "concept": "When one class is rare, the default 0.5 threshold can be a bad choice: a model can reach 99 percent accuracy by always predicting the common class. Lowering the threshold catches more of the rare class at the cost of more false alarms. The right threshold depends on the cost of each kind of mistake.",
            "syntax": "lower threshold -> more positives, more false alarms",
            "exampleCode": "ps = [0.3, 0.6, 0.2, 0.9]\nprint([1 if p >= 0.4 else 0 for p in ps])",
            "exampleLanguage": "python",
            "mistake": "Judging an imbalanced classifier by accuracy alone, which hides that it never predicts the rare class.",
            "bug": {
              "prompt": "Find the bug: this program should print [0, 1, 0, 1], but it prints [0, 0, 0, 0].",
              "buggyCode": "ps = [0.3, 0.6, 0.2, 0.9]\nprint([1 if p >= 1.5 else 0 for p in ps])",
              "fixedCode": "ps = [0.3, 0.6, 0.2, 0.9]\nprint([1 if p >= 0.4 else 0 for p in ps])",
              "explanation": "A threshold above one can never be reached by a probability, so every prediction becomes negative."
            },
            "exercise": {
              "title": "Check your understanding: class imbalance",
              "type": "multiple-choice",
              "instructions": "Which statement about class imbalance is correct?",
              "starterCode": "",
              "solution": "When one class is rare, the default 0.5 threshold can be a bad choice, and the right threshold depends on the cost of each kind of mistake.",
              "solutionExplanation": "When one class is rare, the default 0.5 threshold can be a bad choice, and the right threshold depends on the cost of each kind of mistake. The other options contradict the lesson.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "When one class is rare, the default 0.5 threshold can be a bad choice, and the right threshold depends on the cost of each kind of mistake.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Check your understanding: class imbalance from the lesson: which statement is actually true?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true in general."
              },
              "options": [
                "When one class is rare, the default 0.5 threshold can be a bad choice, and the right threshold depends on the cost of each kind of mistake.",
                "Accuracy alone is always the right metric for imbalanced classes.",
                "Lowering the threshold always reduces false alarms as well as missed cases.",
                "The threshold must always stay at 0.5, whatever the class balance."
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "logistic-regression-scratch-m2-l4",
            "slug": "logistic-regression-scratch-m2-l4",
            "title": "Evaluating Classifiers: Confusion Matrix",
            "concept": "A confusion matrix counts true positives, false positives, true negatives and false negatives, which together describe every kind of mistake. Accuracy alone hides the difference between missing a disease and raising a false alarm. Every other classification metric is computed from these four counts.",
            "syntax": "TP: predicted 1, true 1; FP: predicted 1, true 0",
            "exampleCode": "pred = [1, 0, 1, 1]\ntrue = [1, 0, 0, 1]\ntp = sum(1 for p, t in zip(pred, true) if p == 1 and t == 1)\nprint(tp)",
            "exampleLanguage": "python",
            "mistake": "Counting a false positive as a true positive, which inflates precision.",
            "bug": {
              "prompt": "Find the bug: this program should print TP 2, but it prints TP 3.",
              "buggyCode": "pred = [1, 0, 1, 1]\ntrue = [1, 0, 0, 1]\nprint(sum(1 for p in pred if p == 1))",
              "fixedCode": "pred = [1, 0, 1, 1]\ntrue = [1, 0, 0, 1]\nprint(sum(1 for p, t in zip(pred, true) if p == 1 and t == 1))",
              "explanation": "A true positive needs both the prediction and the truth to be one; counting predictions alone includes false positives."
            },
            "exercise": {
              "title": "Confusion matrix counts",
              "type": "write-code",
              "instructions": "Read a line of predictions and a line of true labels (0s and 1s), and print TP, FP, TN, FN as space-separated integers.",
              "starterCode": "import sys\n\n# TODO: read predictions and labels, print TP FP TN FN\n",
              "solution": "import sys\nlines = sys.stdin.read().strip().splitlines()\npred = [int(x) for x in lines[0].split()]\ntrue = [int(x) for x in lines[1].split()]\ntp = sum(1 for p, t in zip(pred, true) if p == 1 and t == 1)\nfp = sum(1 for p, t in zip(pred, true) if p == 1 and t == 0)\ntn = sum(1 for p, t in zip(pred, true) if p == 0 and t == 0)\nfn = sum(1 for p, t in zip(pred, true) if p == 0 and t == 1)\nprint(f\"{tp} {fp} {tn} {fn}\")",
              "solutionExplanation": "Compare each prediction with its true label and tally the four combinations.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "1 0 1 1\n1 0 0 1",
                  "expectedStdout": "2 1 1 0\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "1 1 0 0\n1 0 1 0",
                  "expectedStdout": "1 1 1 1\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Confusion matrix counts from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "logistic-regression-scratch-m2-l5",
            "slug": "logistic-regression-scratch-m2-l5",
            "title": "Precision, Recall and F1 Score",
            "concept": "Precision is the fraction of predicted positives that are truly positive, and recall is the fraction of true positives the model found. The F1 score is their harmonic mean, which punishes a model that is good at one and terrible at the other. High precision with low recall means the model is cautious; the reverse means it is trigger-happy.",
            "syntax": "precision = TP / (TP + FP); recall = TP / (TP + FN)",
            "exampleCode": "tp, fp, fn = 2, 1, 1\nprint(tp / (tp + fp), tp / (tp + fn))",
            "exampleLanguage": "python",
            "mistake": "Using accuracy when the question is really about how many of the found cases are real.",
            "bug": {
              "prompt": "Find the bug: this program should print precision 0.6667, but it prints 0.5.",
              "buggyCode": "tp, fp, fn = 2, 1, 1\nprint(tp / (tp + fp + fn))",
              "fixedCode": "tp, fp, fn = 2, 1, 1\nprint(tp / (tp + fp))",
              "explanation": "Precision divides by predicted positives only, TP plus FP; adding FN turns it into something else entirely."
            },
            "exercise": {
              "title": "Precision, recall and F1",
              "type": "write-code",
              "instructions": "Read TP, FP and FN on one line, and print precision, recall and F1 with four decimal places, space-separated.",
              "starterCode": "import sys\n\n# TODO: read TP FP FN, print precision recall F1\n",
              "solution": "import sys\ntp, fp, fn = [float(x) for x in sys.stdin.read().split()]\nprec = tp / (tp + fp)\nrec = tp / (tp + fn)\nf1 = 2 * prec * rec / (prec + rec)\nprint(f\"{prec:.4f} {rec:.4f} {f1:.4f}\")",
              "solutionExplanation": "Precision is TP over TP plus FP, recall is TP over TP plus FN, and F1 is their harmonic mean.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "2 1 1",
                  "expectedStdout": "0.6667 0.6667 0.6667\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "4 1 3",
                  "expectedStdout": "0.8000 0.5714 0.6667\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Precision, recall and F1 from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Logistic regression step and evaluation",
      "type": "write-code",
      "instructions": "Read w, b, learning rate, one feature x and its label y on the first line, then a line of predictions and a line of true labels. On line one print the updated w and b after one logistic gradient step with four decimals; on line two print TP, FP, TN, FN for the predictions.",
      "starterCode": "import sys, math\n\n# TODO: take one logistic step, then score the predictions\n",
      "solution": "import sys, math\nlines = sys.stdin.read().strip().splitlines()\nw, b, lr, x, y = [float(v) for v in lines[0].split()]\np = 1 / (1 + math.exp(-(w * x + b)))\nw = w - lr * x * (p - y)\nb = b - lr * (p - y)\nprint(f\"{w:.4f} {b:.4f}\")\npred = [int(v) for v in lines[1].split()]\ntrue = [int(v) for v in lines[2].split()]\ntp = sum(1 for a, t in zip(pred, true) if a == 1 and t == 1)\nfp = sum(1 for a, t in zip(pred, true) if a == 1 and t == 0)\ntn = sum(1 for a, t in zip(pred, true) if a == 0 and t == 0)\nfn = sum(1 for a, t in zip(pred, true) if a == 0 and t == 1)\nprint(f\"{tp} {fp} {tn} {fn}\")",
      "solutionExplanation": "The sigmoid gives the predicted probability, the gradient is the feature times prediction minus label, and the confusion counts come from pairing predictions with truths.",
      "tests": [
        {
          "name": "Visible test",
          "stdin": "0 0 0.5 2 1\n1 0 1 1\n1 0 0 1",
          "expectedStdout": "0.5000 0.2500\n2 1 1 0\n",
          "hidden": false
        },
        {
          "name": "Hidden test",
          "stdin": "0 0 0.5 1 0\n1 1 0 0\n1 0 1 0",
          "expectedStdout": "-0.2500 -0.2500\n1 1 1 1\n",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "Recall the core idea of Logistic regression step and evaluation from the lesson: what quantity must the program compute?",
        "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
        "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
      }
    },
    "capstone": {
      "title": "Logistic Regression Capstone",
      "description": "Build a complete logistic regression step in pure Python: update the weights with gradient descent and evaluate the classifier.",
      "requirements": [
        "Read weights, learning rate, one training example and its label.",
        "Compute the sigmoid probability and take one gradient descent step.",
        "Read predictions and true labels and build the confusion matrix.",
        "Print the updated weights and the TP, FP, TN, FN counts."
      ],
      "rubric": [
        "The program runs and prints the correct updated weights and confusion counts for both test inputs.",
        "The gradient uses the sigmoid probability minus the label.",
        "The weights move in the direction that reduces the loss.",
        "True positives require both prediction and truth to be one."
      ]
    }
  },
  {
    "id": "decision-trees-scratch",
    "slug": "decision-trees-scratch",
    "language": "python",
    "category": "data-ai",
    "title": "Decision Trees from Scratch",
    "description": "Grow trees by hand in pure Python: entropy, Gini impurity, recursive splitting, pruning, random forests and boosting.",
    "difficulty": "Intermediate",
    "estimatedHours": 16,
    "skills": [
      "Entropy",
      "Information gain",
      "Gini impurity",
      "Recursive splitting",
      "Tree pruning",
      "Random forests",
      "Feature importance",
      "Gradient boosting"
    ],
    "prerequisites": [
      "logistic-regression-scratch"
    ],
    "analogy": "Learning {topic} is like learning to play twenty questions: each question splits the possibilities until only one answer is left.",
    "modules": [
      {
        "id": "decision-trees-scratch-m1",
        "title": "Decision Trees from Scratch Foundations",
        "level": "intermediate",
        "lessons": [
          {
            "id": "decision-trees-scratch-m1-l1",
            "slug": "decision-trees-scratch-m1-l1",
            "title": "How Decision Trees Split Data",
            "concept": "A decision tree asks a yes-or-no question about one feature at each node, sending examples left or right until they reach a leaf that predicts a label. The tree is built by choosing, at each node, the split that best separates the labels. A shallow tree is easy to read but may miss patterns, while a deep tree can memorise noise.",
            "syntax": "each node splits on one feature and threshold",
            "exampleCode": "labels = ['cat', 'cat', 'dog']\nprint(max(set(labels), key=labels.count))",
            "exampleLanguage": "python",
            "mistake": "Splitting on a feature that has nothing to do with the label, which only adds noise.",
            "bug": {
              "prompt": "Find the bug: this program should print the majority label 'cat', but it prints 'dog'.",
              "buggyCode": "labels = ['cat', 'cat', 'dog']\nprint(min(set(labels), key=labels.count))",
              "fixedCode": "labels = ['cat', 'cat', 'dog']\nprint(max(set(labels), key=labels.count))",
              "explanation": "A leaf predicts the most common label, so the count must be maximised, not minimised."
            },
            "exercise": {
              "title": "Majority label of a node",
              "type": "write-code",
              "instructions": "Read a line of labels and print the majority label. If two labels tie, print the one that appears first.",
              "starterCode": "import sys\n\n# TODO: read labels and print the majority label\n",
              "solution": "import sys\nlabels = sys.stdin.read().split()\ncounts = {}\nfirst = {}\nfor i, lab in enumerate(labels):\n    counts[lab] = counts.get(lab, 0) + 1\n    if lab not in first:\n        first[lab] = i\nprint(max(counts, key=lambda lab: (counts[lab], -first[lab])))",
              "solutionExplanation": "Count each label, remember first appearances for ties, and pick the label with the highest count.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "cat cat dog",
                  "expectedStdout": "cat\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "a b b a c",
                  "expectedStdout": "a\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Majority label of a node from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "decision-trees-scratch-m1-l2",
            "slug": "decision-trees-scratch-m1-l2",
            "title": "Entropy and Information Gain",
            "concept": "Entropy measures the disorder of a set of labels: zero when every label is the same, and one when a binary split is perfectly even. Information gain is the drop in entropy caused by a split, weighted by the size of each side. The best split is the one with the largest information gain.",
            "syntax": "entropy = -sum(p * log2(p))",
            "exampleCode": "import math\nps = [0.5, 0.5]\nprint(-sum(p * math.log2(p) for p in ps))",
            "exampleLanguage": "python",
            "mistake": "Computing entropy from raw counts instead of probabilities, which gives a meaningless number.",
            "bug": {
              "prompt": "Find the bug: this program should print 1.0, but it prints -2.0.",
              "buggyCode": "import math\ncounts = [2, 2]\nprint(-sum(c * math.log2(c) for c in counts))",
              "fixedCode": "import math\ncounts = [2, 2]\ntotal = sum(counts)\nprint(-sum((c / total) * math.log2(c / total) for c in counts))",
              "explanation": "Entropy needs probabilities, so each count must be divided by the total before taking the log."
            },
            "exercise": {
              "title": "Entropy of a label set",
              "type": "write-code",
              "instructions": "Read a line of labels and print the entropy in bits with four decimal places.",
              "starterCode": "import sys, math\n\n# TODO: read labels and print the entropy\n",
              "solution": "import sys, math\nlabels = sys.stdin.read().split()\ncounts = {}\nfor lab in labels:\n    counts[lab] = counts.get(lab, 0) + 1\ntotal = len(labels)\nprint(f\"{-sum((c / total) * math.log2(c / total) for c in counts.values()):.4f}\")",
              "solutionExplanation": "Convert the label counts into probabilities and apply minus the sum of p log2 p.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "cat cat dog dog",
                  "expectedStdout": "1.0000\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "a a a b",
                  "expectedStdout": "0.8113\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Entropy of a label set from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "decision-trees-scratch-m1-l3",
            "slug": "decision-trees-scratch-m1-l3",
            "title": "Gini Impurity",
            "concept": "Gini impurity is the probability that a randomly chosen example is mislabelled if you label it at random according to the class proportions. It is one minus the sum of squared class probabilities: zero for a pure node and 0.5 for a perfectly even binary node. Gini is faster to compute than entropy and is the default in many tree libraries.",
            "syntax": "gini = 1 - sum(p ** 2)",
            "exampleCode": "ps = [0.5, 0.5]\nprint(1 - sum(p * p for p in ps))",
            "exampleLanguage": "python",
            "mistake": "Forgetting the one minus, which reports purity instead of impurity.",
            "bug": {
              "prompt": "Find the bug: this program should print 0.375, but it prints 0.625.",
              "buggyCode": "ps = [0.75, 0.25]\nprint(sum(p * p for p in ps))",
              "fixedCode": "ps = [0.75, 0.25]\nprint(1 - sum(p * p for p in ps))",
              "explanation": "Gini impurity is one minus the sum of squared probabilities; the sum alone is the purity, not the impurity."
            },
            "exercise": {
              "title": "Check your understanding: Gini impurity",
              "type": "multiple-choice",
              "instructions": "Which statement about Gini impurity is correct?",
              "starterCode": "",
              "solution": "Gini impurity is one minus the sum of squared class probabilities, and it is zero for a pure node.",
              "solutionExplanation": "Gini impurity is one minus the sum of squared class probabilities, and it is zero for a pure node. The other options contradict the lesson.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Gini impurity is one minus the sum of squared class probabilities, and it is zero for a pure node.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Check your understanding: Gini impurity from the lesson: which statement is actually true?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true in general."
              },
              "options": [
                "Gini impurity is one for a pure node and zero for a mixed node.",
                "Gini impurity is one minus the sum of squared class probabilities, and it is zero for a pure node.",
                "Gini impurity is only defined for nodes with exactly two examples.",
                "Gini impurity increases when a split makes the children purer."
              ],
              "answerIndex": 1
            }
          },
          {
            "id": "decision-trees-scratch-m1-l4",
            "slug": "decision-trees-scratch-m1-l4",
            "title": "Building a Tree Recursively",
            "concept": "A tree is built recursively: at each node, try every split, pick the best, and recurse on the two children. The recursion stops when a node is pure, when it has too few examples, or when a maximum depth is reached. Each leaf then predicts the majority label of its examples.",
            "syntax": "build(node): if stop, make a leaf; else split and recurse",
            "exampleCode": "print('split -> left leaf, right leaf')",
            "exampleLanguage": "python",
            "mistake": "Recursing forever because there is no stopping condition for pure nodes.",
            "bug": {
              "prompt": "Find the bug: this program should stop splitting a pure node, but it keeps splitting.",
              "buggyCode": "labels = ['cat', 'cat']\nprint('split' if len(labels) > 0 else 'leaf')",
              "fixedCode": "labels = ['cat', 'cat']\nprint('leaf' if len(set(labels)) == 1 else 'split')",
              "explanation": "A pure node has only one distinct label, so the stop condition must check the number of distinct labels, not the number of examples."
            },
            "exercise": {
              "title": "Gini impurity of a node",
              "type": "write-code",
              "instructions": "Read a line of labels and print the Gini impurity with four decimal places.",
              "starterCode": "import sys\n\n# TODO: read labels and print the Gini impurity\n",
              "solution": "import sys\nlabels = sys.stdin.read().split()\ncounts = {}\nfor lab in labels:\n    counts[lab] = counts.get(lab, 0) + 1\ntotal = len(labels)\nprint(f\"{1 - sum((c / total) ** 2 for c in counts.values()):.4f}\")",
              "solutionExplanation": "Turn the counts into probabilities, square and sum them, and subtract from one.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "cat cat dog dog",
                  "expectedStdout": "0.5000\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "a a a b",
                  "expectedStdout": "0.3750\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Gini impurity of a node from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "decision-trees-scratch-m1-l5",
            "slug": "decision-trees-scratch-m1-l5",
            "title": "Handling Continuous Features",
            "concept": "Continuous features are split by a threshold: examples with the feature below the threshold go left, the rest go right. The best threshold is usually found by sorting the unique values and trying the midpoints between neighbours. A threshold that puts all examples on one side is useless.",
            "syntax": "split: x <= threshold goes left, else right",
            "exampleCode": "xs = [1, 2, 3, 4]\nprint([x <= 2.5 for x in xs])",
            "exampleLanguage": "python",
            "mistake": "Trying thresholds outside the range of the data, which creates an empty child.",
            "bug": {
              "prompt": "Find the bug: this program should print [True, True, False, False], but it prints [True, True, True, True].",
              "buggyCode": "xs = [1, 2, 3, 4]\nprint([x <= 10 for x in xs])",
              "fixedCode": "xs = [1, 2, 3, 4]\nprint([x <= 2.5 for x in xs])",
              "explanation": "The threshold must sit between data values to split the examples; a threshold above every value sends everything left."
            },
            "exercise": {
              "title": "Check your understanding: continuous splits",
              "type": "multiple-choice",
              "instructions": "Which statement about splitting a continuous feature is correct?",
              "starterCode": "",
              "solution": "A threshold sends examples below it to one child and the rest to the other, and good thresholds sit between observed values.",
              "solutionExplanation": "A threshold sends examples below it to one child and the rest to the other, and good thresholds sit between observed values. The other options contradict the lesson.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "A threshold sends examples below it to one child and the rest to the other, and good thresholds sit between observed values.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Check your understanding: continuous splits from the lesson: which statement is actually true?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true in general."
              },
              "options": [
                "A threshold must always be zero for continuous features.",
                "Continuous features cannot be used in decision trees at all.",
                "A threshold sends examples below it to one child and the rest to the other, and good thresholds sit between observed values.",
                "The best threshold is always the largest value in the data."
              ],
              "answerIndex": 2
            }
          }
        ]
      },
      {
        "id": "decision-trees-scratch-m2",
        "title": "Decision Trees from Scratch in Depth",
        "level": "intermediate",
        "lessons": [
          {
            "id": "decision-trees-scratch-m2-l1",
            "slug": "decision-trees-scratch-m2-l1",
            "title": "Pruning and Max Depth",
            "concept": "Pruning cuts back a fully grown tree by removing splits that do not improve validation accuracy, which trades a little training accuracy for much better generalisation. Limiting the maximum depth is a simpler form of the same idea: it stops the tree before it can memorise noise. Both are checked on held-out data, never on training data.",
            "syntax": "pruning removes splits that do not help validation accuracy",
            "exampleCode": "print('max_depth = 3 limits the tree to three levels of splits')",
            "exampleLanguage": "python",
            "mistake": "Pruning based on training accuracy, which never improves because every split helps training accuracy.",
            "bug": {
              "prompt": "Find the bug: this program should count the leaves of a pruned tree, but it counts the leaves of the full tree.",
              "buggyCode": "leaves_full, leaves_removed = 8, 3\nprint(leaves_full)",
              "fixedCode": "leaves_full, leaves_removed = 8, 3\nprint(leaves_full - leaves_removed)",
              "explanation": "Pruning removes leaves, so the pruned count is the full count minus the removed ones."
            },
            "exercise": {
              "title": "Count examples on each side of a threshold",
              "type": "write-code",
              "instructions": "Read a threshold on the first line and feature values on the second line, and print the number of values at or below the threshold and the number above it, separated by a space.",
              "starterCode": "import sys\n\n# TODO: read the threshold and values, print the two counts\n",
              "solution": "import sys\nlines = sys.stdin.read().strip().splitlines()\nt = float(lines[0])\nxs = [float(v) for v in lines[1].split()]\nleft = sum(1 for x in xs if x <= t)\nprint(f\"{left} {len(xs) - left}\")",
              "solutionExplanation": "Count the values at or below the threshold; the rest go to the other side.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "2.5\n1 2 3 4",
                  "expectedStdout": "2 2\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "5\n3 7 5 9",
                  "expectedStdout": "2 2\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Count examples on each side of a threshold from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "decision-trees-scratch-m2-l2",
            "slug": "decision-trees-scratch-m2-l2",
            "title": "Overfitting in Trees",
            "concept": "A tree that grows until every leaf is pure memorises the training data, including its noise, and fails on new examples. The symptom is training accuracy near one hundred percent with much lower test accuracy. Depth limits, minimum leaf sizes and pruning all fight this overfitting.",
            "syntax": "deep tree: train accuracy high, test accuracy low",
            "exampleCode": "train_acc, test_acc = 1.0, 0.62\nprint(f'gap: {train_acc - test_acc:.2f}')",
            "exampleLanguage": "python",
            "mistake": "Growing the tree deeper to fix a large train-test gap, which makes the gap worse.",
            "bug": {
              "prompt": "Find the bug: this program should print the train-test gap 0.38, but it prints -0.38.",
              "buggyCode": "train_acc, test_acc = 1.0, 0.62\nprint(f'{test_acc - train_acc:.2f}')",
              "fixedCode": "train_acc, test_acc = 1.0, 0.62\nprint(f'{train_acc - test_acc:.2f}')",
              "explanation": "The gap is training accuracy minus test accuracy, so the subtraction order matters."
            },
            "exercise": {
              "title": "Train-test accuracy gap",
              "type": "write-code",
              "instructions": "Read the training accuracy and test accuracy on one line, and print the gap (train minus test) with four decimal places.",
              "starterCode": "import sys\n\n# TODO: read the two accuracies and print the gap\n",
              "solution": "import sys\ntrain_acc, test_acc = [float(v) for v in sys.stdin.read().split()]\nprint(f\"{train_acc - test_acc:.4f}\")",
              "solutionExplanation": "Subtract the test accuracy from the training accuracy.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "1.0 0.62",
                  "expectedStdout": "0.3800\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "0.95 0.9",
                  "expectedStdout": "0.0500\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Train-test accuracy gap from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "decision-trees-scratch-m2-l3",
            "slug": "decision-trees-scratch-m2-l3",
            "title": "Random Forests: Bagging",
            "concept": "A random forest grows many trees on bootstrap samples of the data, each tree seeing only a random subset of features at each split, and averages their votes. Bagging reduces variance because the trees make partly independent errors. The forest is more accurate than any single tree and far less prone to overfitting.",
            "syntax": "forest prediction = majority vote of the trees",
            "exampleCode": "votes = [1, 0, 1, 1, 0]\nprint(1 if sum(votes) / len(votes) >= 0.5 else 0)",
            "exampleLanguage": "python",
            "mistake": "Growing all trees on the same data with the same features, which makes them identical and defeats bagging.",
            "bug": {
              "prompt": "Find the bug: this program should print the majority vote 1, but it prints 0.",
              "buggyCode": "votes = [1, 0, 1, 1, 0]\nprint(votes[0] if sum(votes) == 0 else 0)",
              "fixedCode": "votes = [1, 0, 1, 1, 0]\nprint(1 if sum(votes) / len(votes) >= 0.5 else 0)",
              "explanation": "The forest predicts the majority vote, so the votes must be averaged and thresholded at one half."
            },
            "exercise": {
              "title": "Check your understanding: random forests",
              "type": "multiple-choice",
              "instructions": "Which statement about random forests is correct?",
              "starterCode": "",
              "solution": "A random forest averages the votes of many trees grown on bootstrap samples with random feature subsets.",
              "solutionExplanation": "A random forest averages the votes of many trees grown on bootstrap samples with random feature subsets. The other options contradict the lesson.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "A random forest averages the votes of many trees grown on bootstrap samples with random feature subsets.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Check your understanding: random forests from the lesson: which statement is actually true?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true in general."
              },
              "options": [
                "A random forest is a single decision tree grown very deep.",
                "Random forests use the same data and features for every tree.",
                "Random forests always predict the label of the first tree.",
                "A random forest averages the votes of many trees grown on bootstrap samples with random feature subsets."
              ],
              "answerIndex": 3
            }
          },
          {
            "id": "decision-trees-scratch-m2-l4",
            "slug": "decision-trees-scratch-m2-l4",
            "title": "Feature Importance from Trees",
            "concept": "Feature importance measures how much each feature reduces impurity across all the splits that use it, averaged over the forest. Features that appear in many high-gain splits get high importance. Importance scores sum to one, so they show the relative contribution of each feature.",
            "syntax": "importance = total impurity reduction per feature, normalised",
            "exampleCode": "gains = [0.6, 0.3, 0.1]\nprint([g / sum(gains) for g in gains])",
            "exampleLanguage": "python",
            "mistake": "Reading raw gain totals as importances without normalising, so they do not sum to one.",
            "bug": {
              "prompt": "Find the bug: this program should print importances summing to 1.0, but it prints [0.6, 0.3, 0.1] unnormalised.",
              "buggyCode": "gains = [6.0, 3.0, 1.0]\nprint(gains)",
              "fixedCode": "gains = [6.0, 3.0, 1.0]\nprint([g / sum(gains) for g in gains])",
              "explanation": "Importances are the gains divided by their total, so that they sum to one and can be compared."
            },
            "exercise": {
              "title": "Normalise feature importances",
              "type": "write-code",
              "instructions": "Read a line of raw impurity gains and print the normalised importances with four decimal places, space-separated.",
              "starterCode": "import sys\n\n# TODO: read gains and print normalised importances\n",
              "solution": "import sys\ngains = [float(v) for v in sys.stdin.read().split()]\ntot = sum(gains)\nprint(\" \".join(f\"{g / tot:.4f}\" for g in gains))",
              "solutionExplanation": "Divide each gain by the sum of all gains so the importances add up to one.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "6 3 1",
                  "expectedStdout": "0.6000 0.3000 0.1000\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "0.6 0.3 0.1",
                  "expectedStdout": "0.6000 0.3000 0.1000\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Normalise feature importances from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "decision-trees-scratch-m2-l5",
            "slug": "decision-trees-scratch-m2-l5",
            "title": "Gradient Boosting Intuition",
            "concept": "Gradient boosting builds trees one after another, with each new tree fitting the residuals, the errors left by the trees so far. The predictions are updated by adding the new tree's output times a small learning rate. Small steps over many trees generalise better than one big tree.",
            "syntax": "prediction = prediction + lr * residual_tree_output",
            "exampleCode": "pred, lr, resid = 2.0, 0.1, 4.0\nprint(pred + lr * resid)",
            "exampleLanguage": "python",
            "mistake": "Adding the full residual with a learning rate of one, which overshoots and oscillates.",
            "bug": {
              "prompt": "Find the bug: this program should print 2.4, but it prints 6.0.",
              "buggyCode": "pred, lr, resid = 2.0, 0.1, 4.0\nprint(pred + resid)",
              "fixedCode": "pred, lr, resid = 2.0, 0.1, 4.0\nprint(pred + lr * resid)",
              "explanation": "The residual contribution is scaled by the learning rate; adding it unscaled overshoots the target."
            },
            "exercise": {
              "title": "Boosting update",
              "type": "write-code",
              "instructions": "Read the current prediction, the learning rate and the new tree's output on one line, and print the updated prediction with four decimal places.",
              "starterCode": "import sys\n\n# TODO: read pred, lr and tree output, print the update\n",
              "solution": "import sys\npred, lr, out = [float(v) for v in sys.stdin.read().split()]\nprint(f\"{pred + lr * out:.4f}\")",
              "solutionExplanation": "Add the learning rate times the tree output to the current prediction.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "2.0 0.1 4.0",
                  "expectedStdout": "2.4000\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "1.0 0.3 2.0",
                  "expectedStdout": "1.6000\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Boosting update from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Entropy, Gini and majority vote",
      "type": "write-code",
      "instructions": "Read a line of labels, then a line of tree votes (0s and 1s). On the first line print the entropy in bits with four decimals; on the second line print the Gini impurity with four decimals; on the third line print the majority vote (0 or 1).",
      "starterCode": "import sys, math\n\n# TODO: compute entropy, Gini and the majority vote\n",
      "solution": "import sys, math\nlines = sys.stdin.read().strip().splitlines()\nlabels = lines[0].split()\ncounts = {}\nfor lab in labels:\n    counts[lab] = counts.get(lab, 0) + 1\ntotal = len(labels)\nent = -sum((c / total) * math.log2(c / total) for c in counts.values())\ngini = 1 - sum((c / total) ** 2 for c in counts.values())\nprint(f\"{ent:.4f}\")\nprint(f\"{gini:.4f}\")\nvotes = [int(v) for v in lines[1].split()]\nprint(1 if sum(votes) / len(votes) >= 0.5 else 0)",
      "solutionExplanation": "Entropy and Gini come from the label proportions, and the forest prediction is the majority of the votes.",
      "tests": [
        {
          "name": "Visible test",
          "stdin": "cat cat dog dog\n1 0 1 1 0",
          "expectedStdout": "1.0000\n0.5000\n1\n",
          "hidden": false
        },
        {
          "name": "Hidden test",
          "stdin": "a a a b\n0 0 1",
          "expectedStdout": "0.8113\n0.3750\n0\n",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "Recall the core idea of Entropy, Gini and majority vote from the lesson: what quantity must the program compute?",
        "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
        "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
      }
    },
    "capstone": {
      "title": "Decision Tree Capstone",
      "description": "Build a small decision-tree toolkit in pure Python: measure impurity, split data, and combine trees into a forest vote.",
      "requirements": [
        "Read a set of labels and compute their entropy and Gini impurity.",
        "Read tree votes and take the majority as the forest prediction.",
        "Show that a pure node has zero entropy and zero Gini impurity.",
        "Print all three results in the required format."
      ],
      "rubric": [
        "The program runs and prints the correct entropy, Gini and majority vote for both test inputs.",
        "Entropy uses probabilities, not raw counts.",
        "Gini is one minus the sum of squared probabilities.",
        "The majority vote thresholds the average vote at one half."
      ]
    }
  },
  {
    "id": "knn-scratch",
    "slug": "knn-scratch",
    "language": "python",
    "category": "data-ai",
    "title": "k-Nearest Neighbours from Scratch",
    "description": "Classify and predict by similarity in pure Python: distance metrics, choosing k, weighted voting, and the curse of dimensionality.",
    "difficulty": "Intermediate",
    "estimatedHours": 12,
    "skills": [
      "Lazy learning",
      "Euclidean distance",
      "Manhattan distance",
      "Majority vote",
      "kNN regression",
      "Weighted kNN",
      "Curse of dimensionality",
      "Neighbour search"
    ],
    "prerequisites": [
      "decision-trees-scratch"
    ],
    "analogy": "Learning {topic} is like learning to judge a new neighbour by the people who already live on the street: the closest ones tell you the most.",
    "modules": [
      {
        "id": "knn-scratch-m1",
        "title": "k-Nearest Neighbours from Scratch Foundations",
        "level": "intermediate",
        "lessons": [
          {
            "id": "knn-scratch-m1-l1",
            "slug": "knn-scratch-m1-l1",
            "title": "The kNN Idea: Lazy Learning",
            "concept": "k-nearest neighbours makes no model during training: it simply stores every example and answers a new query by looking at the k closest stored points. This is called lazy learning, because all the work happens at prediction time. It works well when similar inputs really do have similar outputs.",
            "syntax": "prediction = label of the nearest stored points",
            "exampleCode": "print('kNN stores the data and decides at query time')",
            "exampleLanguage": "python",
            "mistake": "Training a kNN model by fitting weights, when there is nothing to fit.",
            "bug": {
              "prompt": "Find the bug: this program should print the label of the nearest point, but it prints the label of the farthest point.",
              "buggyCode": "import math\nquery = [0, 0]\npoints = [([1, 1], 'cat'), ([5, 5], 'dog')]\nprint(max(points, key=lambda p: math.dist(query, p[0]))[1])",
              "fixedCode": "import math\nquery = [0, 0]\npoints = [([1, 1], 'cat'), ([5, 5], 'dog')]\nprint(min(points, key=lambda p: math.dist(query, p[0]))[1])",
              "explanation": "Nearest means the smallest distance, so the selection must use min, not max."
            },
            "exercise": {
              "title": "Distance between two points",
              "type": "write-code",
              "instructions": "Read two lines, each a point as space-separated numbers, and print the Euclidean distance with four decimal places.",
              "starterCode": "import sys, math\n\n# TODO: read two points and print their distance\n",
              "solution": "import sys, math\nlines = sys.stdin.read().strip().splitlines()\na = [float(x) for x in lines[0].split()]\nb = [float(x) for x in lines[1].split()]\nprint(f\"{math.dist(a, b):.4f}\")",
              "solutionExplanation": "The Euclidean distance is the square root of the sum of squared coordinate differences.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "0 0\n3 4",
                  "expectedStdout": "5.0000\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "1 1\n4 5",
                  "expectedStdout": "5.0000\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Distance between two points from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "knn-scratch-m1-l2",
            "slug": "knn-scratch-m1-l2",
            "title": "Distance Metrics: Euclidean and Manhattan",
            "concept": "Euclidean distance is the straight-line distance, while Manhattan distance adds the absolute differences along each axis, like walking city blocks. The two metrics rank neighbours differently when features have different scales or outliers. Choosing the metric is part of designing a kNN model.",
            "syntax": "manhattan = sum(abs(a - b))",
            "exampleCode": "a, b = [0, 0], [3, 4]\nprint(sum(abs(x - y) for x, y in zip(a, b)))",
            "exampleLanguage": "python",
            "mistake": "Using Euclidean distance when the problem says Manhattan, which changes the neighbour order.",
            "bug": {
              "prompt": "Find the bug: this program should print the Manhattan distance 7, but it prints 5.0.",
              "buggyCode": "import math\na, b = [0, 0], [3, 4]\nprint(math.dist(a, b))",
              "fixedCode": "a, b = [0, 0], [3, 4]\nprint(sum(abs(x - y) for x, y in zip(a, b)))",
              "explanation": "Manhattan distance sums the absolute differences, while math.dist computes the straight-line Euclidean distance."
            },
            "exercise": {
              "title": "Manhattan distance",
              "type": "write-code",
              "instructions": "Read two lines, each a point as space-separated numbers, and print the Manhattan distance with four decimal places.",
              "starterCode": "import sys\n\n# TODO: read two points and print their Manhattan distance\n",
              "solution": "import sys\nlines = sys.stdin.read().strip().splitlines()\na = [float(x) for x in lines[0].split()]\nb = [float(x) for x in lines[1].split()]\nprint(f\"{sum(abs(x - y) for x, y in zip(a, b)):.4f}\")",
              "solutionExplanation": "Add the absolute differences of the matching coordinates.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "0 0\n3 4",
                  "expectedStdout": "7.0000\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "2 3\n5 9",
                  "expectedStdout": "9.0000\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Manhattan distance from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "knn-scratch-m1-l3",
            "slug": "knn-scratch-m1-l3",
            "title": "Choosing k",
            "concept": "The number k controls the smoothness of a kNN model: k equal to one follows every noisy point, while a large k smooths the boundary but can wash out real structure. Odd values of k avoid ties in binary classification. The best k is found by cross-validation, not by guessing.",
            "syntax": "small k: flexible, noisy; large k: smooth, biased",
            "exampleCode": "print('k = 1 follows noise; k = 15 smooths the boundary')",
            "exampleLanguage": "python",
            "mistake": "Always using k equal to one because it fits the training data perfectly.",
            "bug": {
              "prompt": "Find the bug: this program should say a large k smooths the boundary, but it says the opposite.",
              "buggyCode": "k = 15\nprint('flexible and noisy' if k > 5 else 'smooth')",
              "fixedCode": "k = 15\nprint('smooth' if k > 5 else 'flexible and noisy')",
              "explanation": "A large k averages many neighbours, which smooths the decision boundary; a small k follows local noise."
            },
            "exercise": {
              "title": "Check your understanding: choosing k",
              "type": "multiple-choice",
              "instructions": "Which statement about choosing k in kNN is correct?",
              "starterCode": "",
              "solution": "A small k makes a flexible model that follows noise, while a large k smooths the decision boundary.",
              "solutionExplanation": "A small k makes a flexible model that follows noise, while a large k smooths the decision boundary. The other options contradict the lesson.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "A small k makes a flexible model that follows noise, while a large k smooths the decision boundary.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Check your understanding: choosing k from the lesson: which statement is actually true?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true in general."
              },
              "options": [
                "A small k makes a flexible model that follows noise, while a large k smooths the decision boundary.",
                "A larger k always gives higher accuracy on new data.",
                "k must always be exactly one for kNN to work.",
                "The value of k has no effect on the predictions."
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "knn-scratch-m1-l4",
            "slug": "knn-scratch-m1-l4",
            "title": "Majority Vote and Ties",
            "concept": "For classification, kNN takes the majority label among the k nearest neighbours, which is a vote. Ties happen when k is even or classes split evenly, and they are broken by the nearest neighbour, by the earliest label, or by using an odd k. A tie broken badly flips the prediction.",
            "syntax": "prediction = most common label among the k neighbours",
            "exampleCode": "votes = ['cat', 'dog', 'cat']\nprint(max(set(votes), key=votes.count))",
            "exampleLanguage": "python",
            "mistake": "Counting the votes of all training points instead of only the k nearest ones.",
            "bug": {
              "prompt": "Find the bug: this program should print 'cat', but it prints 'dog'.",
              "buggyCode": "votes = ['cat', 'dog', 'cat']\nprint(min(set(votes), key=votes.count))",
              "fixedCode": "votes = ['cat', 'dog', 'cat']\nprint(max(set(votes), key=votes.count))",
              "explanation": "The majority label is the one with the highest count, so the selection must maximise the count."
            },
            "exercise": {
              "title": "Majority vote with first-appearance tie-break",
              "type": "write-code",
              "instructions": "Read a line of labels (the k nearest neighbours' labels) and print the majority label. Break ties by earliest appearance.",
              "starterCode": "import sys\n\n# TODO: read labels and print the majority label\n",
              "solution": "import sys\nlabels = sys.stdin.read().split()\ncounts = {}\nfirst = {}\nfor i, lab in enumerate(labels):\n    counts[lab] = counts.get(lab, 0) + 1\n    if lab not in first:\n        first[lab] = i\nprint(max(counts, key=lambda lab: (counts[lab], -first[lab])))",
              "solutionExplanation": "Count each label and pick the most frequent, using earliest appearance to break ties.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "cat dog cat",
                  "expectedStdout": "cat\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "a b a b",
                  "expectedStdout": "a\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Majority vote with first-appearance tie-break from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "knn-scratch-m1-l5",
            "slug": "knn-scratch-m1-l5",
            "title": "Feature Scaling for kNN",
            "concept": "kNN compares distances, so a feature measured in thousands will swamp a feature measured in fractions, even if the small feature matters more. Standardising or min-max scaling every feature to a common range fixes this. Scaling must use the training set's statistics for both training and test data.",
            "syntax": "scale every feature before measuring distance",
            "exampleCode": "print('an unscaled income feature swamps a 0-to-1 age feature')",
            "exampleLanguage": "python",
            "mistake": "Scaling the test set with its own statistics instead of the training set's.",
            "bug": {
              "prompt": "Find the bug: this program should standardise with the training mean, but it uses the test mean.",
              "buggyCode": "train_mean, test_mean = 50.0, 70.0\nx = 60.0\nprint((x - test_mean) / 10)",
              "fixedCode": "train_mean, test_mean = 50.0, 70.0\nx = 60.0\nprint((x - train_mean) / 10)",
              "explanation": "Test data must be scaled with the training statistics, otherwise training and test points live on different scales."
            },
            "exercise": {
              "title": "Check your understanding: scaling for kNN",
              "type": "multiple-choice",
              "instructions": "Which statement about feature scaling for kNN is correct?",
              "starterCode": "",
              "solution": "Features must be scaled to a common range, or the feature with the largest numbers will dominate every distance.",
              "solutionExplanation": "Features must be scaled to a common range, or the feature with the largest numbers will dominate every distance. The other options contradict the lesson.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Features must be scaled to a common range, or the feature with the largest numbers will dominate every distance.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Check your understanding: scaling for kNN from the lesson: which statement is actually true?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true in general."
              },
              "options": [
                "kNN works best when features are left on wildly different scales.",
                "Features must be scaled to a common range, or the feature with the largest numbers will dominate every distance.",
                "Scaling only matters for the target variable, not the features.",
                "Standardising features changes the majority vote but not the distances."
              ],
              "answerIndex": 1
            }
          }
        ]
      },
      {
        "id": "knn-scratch-m2",
        "title": "k-Nearest Neighbours from Scratch in Depth",
        "level": "intermediate",
        "lessons": [
          {
            "id": "knn-scratch-m2-l1",
            "slug": "knn-scratch-m2-l1",
            "title": "kNN for Regression",
            "concept": "For regression, kNN predicts the average of the k nearest neighbours' target values instead of taking a vote. A small k follows local variation and a large k smooths it out. The same distance and scaling rules apply as in classification.",
            "syntax": "prediction = mean of the k nearest targets",
            "exampleCode": "values = [10, 20, 30]\nprint(sum(values) / len(values))",
            "exampleLanguage": "python",
            "mistake": "Averaging all training targets instead of only the k nearest ones.",
            "bug": {
              "prompt": "Find the bug: this program should average the three nearest values, but it averages four.",
              "buggyCode": "values = [10, 20, 30, 40]\nprint(sum(values) / len(values))",
              "fixedCode": "values = [10, 20, 30, 40]\nprint(sum(values[:3]) / 3)",
              "explanation": "Only the k nearest values count; including extra values pulls the prediction toward the global mean."
            },
            "exercise": {
              "title": "kNN regression prediction",
              "type": "write-code",
              "instructions": "Read k on the first line and the neighbour target values on the second line (already sorted nearest first). Print the mean of the first k values with four decimal places.",
              "starterCode": "import sys\n\n# TODO: read k and the values, print the mean of the first k\n",
              "solution": "import sys\nlines = sys.stdin.read().strip().splitlines()\nk = int(lines[0])\nvals = [float(v) for v in lines[1].split()]\nprint(f\"{sum(vals[:k]) / k:.4f}\")",
              "solutionExplanation": "Take the first k neighbour values and average them.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "3\n10 20 30 40",
                  "expectedStdout": "20.0000\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "2\n5 7 9",
                  "expectedStdout": "6.0000\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of kNN regression prediction from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "knn-scratch-m2-l2",
            "slug": "knn-scratch-m2-l2",
            "title": "Weighted kNN",
            "concept": "Weighted kNN gives closer neighbours more influence by weighting each vote or value by one over its distance. A neighbour at distance one counts twice as much as one at distance two. This softens the effect of the exact choice of k, since far neighbours barely matter.",
            "syntax": "weight = 1 / distance",
            "exampleCode": "dists = [1.0, 2.0, 4.0]\nprint([1 / d for d in dists])",
            "exampleLanguage": "python",
            "mistake": "Weighting by the distance itself, which gives far neighbours more influence instead of less.",
            "bug": {
              "prompt": "Find the bug: this program should print weights [1.0, 0.5, 0.25], but it prints [1.0, 2.0, 4.0].",
              "buggyCode": "dists = [1.0, 2.0, 4.0]\nprint(dists)",
              "fixedCode": "dists = [1.0, 2.0, 4.0]\nprint([1 / d for d in dists])",
              "explanation": "The weight is one over the distance, so closer neighbours get larger weights."
            },
            "exercise": {
              "title": "Inverse-distance weighted average",
              "type": "write-code",
              "instructions": "Read a line of neighbour values and a line of their distances, and print the inverse-distance weighted average with four decimal places.",
              "starterCode": "import sys\n\n# TODO: read values and distances, print the weighted average\n",
              "solution": "import sys\nlines = sys.stdin.read().strip().splitlines()\nvals = [float(v) for v in lines[0].split()]\ndists = [float(v) for v in lines[1].split()]\nweights = [1 / d for d in dists]\nprint(f\"{sum(v * w for v, w in zip(vals, weights)) / sum(weights):.4f}\")",
              "solutionExplanation": "Weight each value by one over its distance, then divide the weighted sum by the total weight.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "10 20 30\n1 2 4",
                  "expectedStdout": "15.7143\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "5 15\n1 1",
                  "expectedStdout": "10.0000\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Inverse-distance weighted average from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "knn-scratch-m2-l3",
            "slug": "knn-scratch-m2-l3",
            "title": "The Curse of Dimensionality",
            "concept": "As the number of dimensions grows, all points become roughly equally far apart, so the idea of a nearest neighbour stops being meaningful. Distances concentrate, and exponentially more data is needed to fill the space. Feature selection and dimensionality reduction are the usual escapes.",
            "syntax": "in high dimensions, distances concentrate and neighbours lose meaning",
            "exampleCode": "print('with 1000 features, every point is far from every other')",
            "exampleLanguage": "python",
            "mistake": "Adding hundreds of irrelevant features and expecting kNN to ignore them.",
            "bug": {
              "prompt": "Find the bug: this program should warn that distances concentrate in high dimensions, but it claims the opposite.",
              "buggyCode": "dims = 1000\nprint('neighbours stay meaningful' if dims > 100 else 'distances concentrate')",
              "fixedCode": "dims = 1000\nprint('distances concentrate' if dims > 100 else 'neighbours stay meaningful')",
              "explanation": "In high dimensions distances concentrate, so the nearest neighbour is barely nearer than the farthest point."
            },
            "exercise": {
              "title": "Check your understanding: curse of dimensionality",
              "type": "multiple-choice",
              "instructions": "Which statement about the curse of dimensionality is correct?",
              "starterCode": "",
              "solution": "In high dimensions all points become roughly equally far apart, so nearest neighbours stop being meaningful.",
              "solutionExplanation": "In high dimensions all points become roughly equally far apart, so nearest neighbours stop being meaningful. The other options contradict the lesson.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "In high dimensions all points become roughly equally far apart, so nearest neighbours stop being meaningful.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Check your understanding: curse of dimensionality from the lesson: which statement is actually true?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true in general."
              },
              "options": [
                "Adding dimensions always makes nearest neighbours easier to find.",
                "The curse of dimensionality only affects decision trees, not kNN.",
                "In high dimensions all points become roughly equally far apart, so nearest neighbours stop being meaningful.",
                "High dimensions make distances more spread out and informative."
              ],
              "answerIndex": 2
            }
          },
          {
            "id": "knn-scratch-m2-l4",
            "slug": "knn-scratch-m2-l4",
            "title": "Efficient Neighbour Search Intuition (KD-Trees)",
            "concept": "A naive neighbour search compares the query with every stored point, which is slow for large data. A KD-tree splits the space into boxes, so whole boxes far from the query can be skipped. The tree is built by repeatedly splitting on the median of one dimension at a time.",
            "syntax": "KD-tree: split space into boxes, skip boxes far from the query",
            "exampleCode": "print('a KD-tree prunes whole regions instead of checking every point')",
            "exampleLanguage": "python",
            "mistake": "Assuming a KD-tree always beats brute force, even in very high dimensions where it degrades.",
            "bug": {
              "prompt": "Find the bug: this program should count points within the radius, but it counts points outside it.",
              "buggyCode": "import math\nquery, r = [0, 0], 5.0\npoints = [[3, 4], [6, 0], [1, 1]]\nprint(sum(1 for p in points if math.dist(query, p) > r))",
              "fixedCode": "import math\nquery, r = [0, 0], 5.0\npoints = [[3, 4], [6, 0], [1, 1]]\nprint(sum(1 for p in points if math.dist(query, p) <= r))",
              "explanation": "Points within the radius satisfy distance less than or equal to r; using greater than counts the points outside."
            },
            "exercise": {
              "title": "Count neighbours within a radius",
              "type": "write-code",
              "instructions": "Read the query point on the first line, the radius on the second line, then points one per line. Print how many points lie within the radius (distance at most the radius).",
              "starterCode": "import sys, math\n\n# TODO: read the query, radius and points, count those within range\n",
              "solution": "import sys, math\nlines = [line.split() for line in sys.stdin if line.strip()]\nquery = [float(v) for v in lines[0]]\nr = float(lines[1][0])\npoints = [[float(v) for v in l] for l in lines[2:]]\nprint(sum(1 for p in points if math.dist(query, p) <= r))",
              "solutionExplanation": "Measure the distance from the query to each point and count those at most the radius away.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "0 0\n5\n3 4\n6 0\n1 1",
                  "expectedStdout": "2\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "1 1\n2\n1 2\n5 5\n2 1",
                  "expectedStdout": "2\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Count neighbours within a radius from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "knn-scratch-m2-l5",
            "slug": "knn-scratch-m2-l5",
            "title": "When kNN Works and When It Fails",
            "concept": "kNN shines on small, clean, low-dimensional data with a meaningful distance, such as handwritten digit shapes. It fails on high-dimensional sparse data like raw text, on noisy labels, and on large data where every prediction scans the whole training set. Knowing when not to use a model is part of knowing the model.",
            "syntax": "kNN: great for small clean data, poor for high-dimensional sparse data",
            "exampleCode": "print('kNN works when similarity in feature space matches similarity in labels')",
            "exampleLanguage": "python",
            "mistake": "Using kNN on a million-row dataset with a thousand features and expecting fast predictions.",
            "bug": {
              "prompt": "Find the bug: this program should pick the nearest of three points, but it picks the second nearest.",
              "buggyCode": "import math\nquery = [0, 0]\npoints = [([1, 1], 'cat'), ([5, 5], 'dog'), ([2, 0], 'cat')]\nnearest = sorted(points, key=lambda p: math.dist(query, p[0]))\nprint(nearest[1][1])",
              "fixedCode": "import math\nquery = [0, 0]\npoints = [([1, 1], 'cat'), ([5, 5], 'dog'), ([2, 0], 'cat')]\nnearest = sorted(points, key=lambda p: math.dist(query, p[0]))\nprint(nearest[0][1])",
              "explanation": "After sorting by distance, the nearest point is at index zero, not index one."
            },
            "exercise": {
              "title": "3-NN classification",
              "type": "write-code",
              "instructions": "Read the query point on the first line, then three training points, each as numbers followed by a label. Print the majority label among the three (nearest first ordering is already the input order).",
              "starterCode": "import sys\n\n# TODO: read the query and points, print the majority label\n",
              "solution": "import sys, math\nlines = [line.split() for line in sys.stdin if line.strip()]\nquery = [float(v) for v in lines[0]]\npts = []\nfor l in lines[1:]:\n    pts.append(([float(v) for v in l[:-1]], l[-1]))\nnearest = sorted(pts, key=lambda p: math.dist(query, p[0]))[:3]\nlabels = [p[1] for p in nearest]\nprint(max(set(labels), key=labels.count))",
              "solutionExplanation": "Sort the training points by distance to the query, take the three nearest, and return their majority label.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "0 0\n1 1 cat\n5 5 dog\n2 0 cat",
                  "expectedStdout": "cat\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "9 9\n1 1 cat\n8 8 dog\n10 10 dog",
                  "expectedStdout": "dog\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of 3-NN classification from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "kNN toolkit: distances, vote and regression",
      "type": "write-code",
      "instructions": "Read the query point on the first line, then three training points, each as numbers, a target value and a label. On the first line print the three Euclidean distances with four decimals; on the second line print the majority label of the two nearest points; on the third line print the mean target of the two nearest points with four decimals.",
      "starterCode": "import sys, math\n\n# TODO: compute distances, vote and regression from the two nearest\n",
      "solution": "import sys, math\nlines = [line.split() for line in sys.stdin if line.strip()]\nquery = [float(v) for v in lines[0]]\npts = []\nfor l in lines[1:]:\n    nums = [float(v) for v in l[:-1]]\n    pts.append((nums[:-1], nums[-1], l[-1]))\ndists = [math.dist(query, p) for p, val, lab in pts]\nprint(\" \".join(f\"{d:.4f}\" for d in dists))\nnearest = sorted(pts, key=lambda p: math.dist(query, p[0]))[:2]\nlabels = [p[2] for p in nearest]\nprint(max(set(labels), key=labels.count))\nprint(f\"{sum(p[1] for p in nearest) / 2:.4f}\")",
      "solutionExplanation": "Distances come from the query to each point, the vote and the mean use only the two nearest points.",
      "tests": [
        {
          "name": "Visible test",
          "stdin": "0 0\n1 1 10 cat\n5 5 20 dog\n2 0 30 cat",
          "expectedStdout": "1.4142 7.0711 2.0000\ncat\n20.0000\n",
          "hidden": false
        },
        {
          "name": "Hidden test",
          "stdin": "9 9\n1 1 10 cat\n8 8 20 dog\n10 10 30 dog",
          "expectedStdout": "11.3137 1.4142 1.4142\ndog\n25.0000\n",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "Recall the core idea of kNN toolkit: distances, vote and regression from the lesson: what quantity must the program compute?",
        "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
        "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
      }
    },
    "capstone": {
      "title": "k-Nearest Neighbours Capstone",
      "description": "Build a small kNN toolkit in pure Python: measure distances, vote among neighbours, and average their targets.",
      "requirements": [
        "Read a query point and training points with a target value and a label each.",
        "Compute the Euclidean distance from the query to every training point.",
        "Take the majority label of the two nearest points.",
        "Average the target values of the two nearest points."
      ],
      "rubric": [
        "The program runs and prints the correct distances, vote and average for both test inputs.",
        "Distances are measured from the query, not between training points.",
        "The vote uses only the two nearest points, not all of them.",
        "The regression average uses the same two nearest points as the vote."
      ]
    }
  },
  {
    "id": "kmeans-clustering-scratch",
    "slug": "kmeans-clustering-scratch",
    "language": "python",
    "category": "data-ai",
    "title": "k-Means Clustering from Scratch",
    "description": "Find groups in unlabelled data in pure Python: Lloyd's algorithm, initialisation, choosing k, and evaluating clusters.",
    "difficulty": "Intermediate",
    "estimatedHours": 12,
    "skills": [
      "Unsupervised learning",
      "k-means objective",
      "Lloyd's algorithm",
      "k-means++ initialisation",
      "Elbow method",
      "Cluster inertia",
      "Hierarchical clustering",
      "DBSCAN"
    ],
    "prerequisites": [
      "knn-scratch"
    ],
    "analogy": "Learning {topic} is like learning to sort marbles into jars by colour without anyone naming the colours first: you group what looks alike.",
    "modules": [
      {
        "id": "kmeans-clustering-scratch-m1",
        "title": "k-Means Clustering from Scratch Foundations",
        "level": "intermediate",
        "lessons": [
          {
            "id": "kmeans-clustering-scratch-m1-l1",
            "slug": "kmeans-clustering-scratch-m1-l1",
            "title": "Clustering and Unsupervised Learning",
            "concept": "Clustering finds groups in data that has no labels, so the algorithm must decide what counts as similar. Unlike classification, there is no correct answer to check against, only structure that is useful or not. Customer segmentation and image compression both start with clustering.",
            "syntax": "clustering groups unlabelled points by similarity",
            "exampleCode": "points = [(0, 0), (1, 0), (10, 10)]\nprint('two groups: near the origin, and far away')",
            "exampleLanguage": "python",
            "mistake": "Treating cluster numbers as meaningful labels, when they are just arbitrary group ids.",
            "bug": {
              "prompt": "Find the bug: this program should assign each point to its nearest centroid, but it assigns every point to centroid 1.",
              "buggyCode": "import math\ncentroids = [(0, 0), (10, 0)]\npoints = [(1, 0), (9, 0)]\nprint([1 for p in points])",
              "fixedCode": "import math\ncentroids = [(0, 0), (10, 0)]\npoints = [(1, 0), (9, 0)]\nprint([min(range(2), key=lambda c: math.dist(p, centroids[c])) for p in points])",
              "explanation": "Each point needs its own nearest-centroid check; hard-coding the index ignores the distances."
            },
            "exercise": {
              "title": "Assign points to the nearest centroid",
              "type": "write-code",
              "instructions": "Read two centroid lines ('x y'), then points one per line. Print the index of the nearest centroid for each point, space-separated.",
              "starterCode": "import sys, math\n\n# TODO: read centroids and points, print the nearest index per point\n",
              "solution": "import sys, math\nlines = [line.split() for line in sys.stdin if line.strip()]\ncentroids = [[float(v) for v in lines[0]], [float(v) for v in lines[1]]]\npoints = [[float(v) for v in l] for l in lines[2:]]\nprint(' '.join(str(min(range(2), key=lambda c: math.dist(p, centroids[c]))) for p in points))",
              "solutionExplanation": "For each point, compare the distance to both centroids and keep the smaller index on ties.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "0 0\n10 0\n2 0\n8 0",
                  "expectedStdout": "0 1\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "0 0\n0 10\n0 3\n0 8",
                  "expectedStdout": "0 1\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Assign points to the nearest centroid from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "kmeans-clustering-scratch-m1-l2",
            "slug": "kmeans-clustering-scratch-m1-l2",
            "title": "The k-Means Objective",
            "concept": "k-means minimises the within-cluster sum of squares: the total squared distance from each point to its own cluster centroid. A smaller value means tighter clusters, but the value always falls as k grows, so it cannot be compared across different k. The centroid is the mean because the mean minimises squared distance.",
            "syntax": "WCSS = sum of squared distances to the cluster centroid",
            "exampleCode": "import math\ncentroid = [0, 0]\npoints = [[3, 0], [0, 4]]\nprint(sum(sum((a - b) ** 2 for a, b in zip(p, centroid)) for p in points))",
            "exampleLanguage": "python",
            "mistake": "Measuring distance to the origin instead of to the centroid.",
            "bug": {
              "prompt": "Find the bug: this program should print 5.0, but it prints 15.0.",
              "buggyCode": "centroid = [1, 1]\npoints = [[2, 1], [1, 3]]\nprint(sum(sum((a - 0) ** 2 for a in p) for p in points))",
              "fixedCode": "centroid = [1, 1]\npoints = [[2, 1], [1, 3]]\nprint(sum(sum((a - b) ** 2 for a, b in zip(p, centroid)) for p in points))",
              "explanation": "WCSS measures distance to the cluster centroid, not to the origin; subtracting zero instead of the centroid inflates the total."
            },
            "exercise": {
              "title": "Within-cluster sum of squares",
              "type": "write-code",
              "instructions": "Read a centroid on the first line, then points one per line. Print the WCSS with four decimal places.",
              "starterCode": "import sys\n\n# TODO: read the centroid and points, print the WCSS\n",
              "solution": "import sys\nlines = [line.split() for line in sys.stdin if line.strip()]\ncentroid = [float(v) for v in lines[0]]\npoints = [[float(v) for v in l] for l in lines[1:]]\nprint(f\"{sum(sum((a - b) ** 2 for a, b in zip(p, centroid)) for p in points):.4f}\")",
              "solutionExplanation": "For each point, sum the squared differences to the centroid across dimensions, then add the points up.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "1 1\n2 1\n1 3\n0 1",
                  "expectedStdout": "6.0000\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "0 0\n3 0\n0 4",
                  "expectedStdout": "25.0000\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Within-cluster sum of squares from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "kmeans-clustering-scratch-m1-l3",
            "slug": "kmeans-clustering-scratch-m1-l3",
            "title": "Lloyd's Algorithm Step by Step",
            "concept": "Lloyd's algorithm alternates two steps: assign each point to its nearest centroid, then move each centroid to the mean of its assigned points. Each step can only reduce the objective, so the algorithm converges to a local optimum. It stops when the assignments stop changing.",
            "syntax": "assign, then update; repeat until assignments stop changing",
            "exampleCode": "print('assign points, move centroids, repeat until stable')",
            "exampleLanguage": "python",
            "mistake": "Running only the assignment step and never moving the centroids.",
            "bug": {
              "prompt": "Find the bug: this program should move the centroid to the mean of its points, but it leaves it at the origin.",
              "buggyCode": "points = [[1, 2], [3, 4]]\ncentroid = [0, 0]\nprint(centroid)",
              "fixedCode": "points = [[1, 2], [3, 4]]\ncentroid = [sum(p[d] for p in points) / len(points) for d in range(2)]\nprint(centroid)",
              "explanation": "The update step replaces the centroid with the mean of its assigned points; skipping it freezes the algorithm."
            },
            "exercise": {
              "title": "Check your understanding: Lloyd's algorithm",
              "type": "multiple-choice",
              "instructions": "Which statement about Lloyd's algorithm is correct?",
              "starterCode": "",
              "solution": "It alternates assigning points to the nearest centroid and moving each centroid to the mean of its points, until the assignments stop changing.",
              "solutionExplanation": "It alternates assigning points to the nearest centroid and moving each centroid to the mean of its points, until the assignments stop changing. The other options contradict the lesson.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "It alternates assigning points to the nearest centroid and moving each centroid to the mean of its points, until the assignments stop changing.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Check your understanding: Lloyd's algorithm from the lesson: which statement is actually true?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true in general."
              },
              "options": [
                "It assigns points once and never moves the centroids.",
                "It moves centroids first and assigns points only at the end.",
                "It stops after exactly one assignment step, whatever happens.",
                "It alternates assigning points to the nearest centroid and moving each centroid to the mean of its points, until the assignments stop changing."
              ],
              "answerIndex": 3
            }
          },
          {
            "id": "kmeans-clustering-scratch-m1-l4",
            "slug": "kmeans-clustering-scratch-m1-l4",
            "title": "Initialisation: Random vs k-Means++",
            "concept": "k-means can fall into a bad local optimum if the starting centroids are poor, so initialisation matters. k-means++ picks the first centroid at random, then picks each next centroid with probability proportional to its squared distance from the nearest existing centroid. This spreads the starting centroids out and usually converges faster and better.",
            "syntax": "k-means++ picks new centroids far from the existing ones",
            "exampleCode": "print('spread-out starting centroids avoid bad local optima')",
            "exampleLanguage": "python",
            "mistake": "Starting all centroids at the same point, so several clusters collapse into one.",
            "bug": {
              "prompt": "Find the bug: this program should report the squared distance to the nearest centroid, but it reports the distance to the farthest.",
              "buggyCode": "import math\ncentroids = [(0, 0), (10, 0)]\npoint = [3, 0]\nprint(max(math.dist(point, c) ** 2 for c in centroids))",
              "fixedCode": "import math\ncentroids = [(0, 0), (10, 0)]\npoint = [3, 0]\nprint(min(math.dist(point, c) ** 2 for c in centroids))",
              "explanation": "k-means++ uses the distance to the nearest existing centroid, so the minimum squared distance is the right quantity."
            },
            "exercise": {
              "title": "Squared distance to the nearest centroid",
              "type": "write-code",
              "instructions": "Read one centroid line, then points one per line. Print the squared distance from each point to the centroid with four decimal places, space-separated.",
              "starterCode": "import sys, math\n\n# TODO: read the centroid and points, print squared distances\n",
              "solution": "import sys, math\nlines = [line.split() for line in sys.stdin if line.strip()]\ncentroid = [float(v) for v in lines[0]]\npoints = [[float(v) for v in l] for l in lines[1:]]\nprint(' '.join(f\"{math.dist(p, centroid) ** 2:.4f}\" for p in points))",
              "solutionExplanation": "Square the Euclidean distance from each point to the centroid.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "0 0\n3 4\n6 0\n1 1",
                  "expectedStdout": "25.0000 36.0000 2.0000\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "1 1\n1 1\n4 5\n2 1",
                  "expectedStdout": "0.0000 25.0000 1.0000\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Squared distance to the nearest centroid from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "kmeans-clustering-scratch-m1-l5",
            "slug": "kmeans-clustering-scratch-m1-l5",
            "title": "Choosing k: The Elbow Method",
            "concept": "The elbow method runs k-means for several values of k and plots the within-cluster sum of squares, which always falls as k grows. The elbow is the k where adding another cluster stops buying much improvement. It is a judgement call, and sometimes there is no clear elbow at all.",
            "syntax": "elbow: the k where WCSS stops falling fast",
            "exampleCode": "wcss = {1: 100, 2: 40, 3: 30, 4: 28}\nprint('elbow near k = 2')",
            "exampleLanguage": "python",
            "mistake": "Always picking the largest k because its WCSS is the smallest.",
            "bug": {
              "prompt": "Find the bug: this program should pick the k with the smallest WCSS, but it picks the largest.",
              "buggyCode": "wcss = {1: 100, 2: 40, 3: 30}\nprint(max(wcss, key=wcss.get))",
              "fixedCode": "wcss = {1: 100, 2: 40, 3: 30}\nprint(min(wcss, key=wcss.get))",
              "explanation": "The best fit for a fixed k has the smallest WCSS, so the choice must use min, not max."
            },
            "exercise": {
              "title": "Check your understanding: elbow method",
              "type": "multiple-choice",
              "instructions": "Which statement about the elbow method is correct?",
              "starterCode": "",
              "solution": "It plots within-cluster sum of squares against k and picks the k where the improvement levels off.",
              "solutionExplanation": "It plots within-cluster sum of squares against k and picks the k where the improvement levels off. The other options contradict the lesson.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "It plots within-cluster sum of squares against k and picks the k where the improvement levels off.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Check your understanding: elbow method from the lesson: which statement is actually true?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true in general."
              },
              "options": [
                "It plots within-cluster sum of squares against k and picks the k where the improvement levels off.",
                "It always picks the largest k because its WCSS is smallest.",
                "It picks k by looking at the training accuracy.",
                "It works by counting how many points fall in each cluster."
              ],
              "answerIndex": 0
            }
          }
        ]
      },
      {
        "id": "kmeans-clustering-scratch-m2",
        "title": "k-Means Clustering from Scratch in Depth",
        "level": "intermediate",
        "lessons": [
          {
            "id": "kmeans-clustering-scratch-m2-l1",
            "slug": "kmeans-clustering-scratch-m2-l1",
            "title": "Evaluating Clusters: Inertia and Silhouette",
            "concept": "Inertia is the within-cluster sum of squares, and lower is tighter, but it always improves with more clusters. The silhouette score compares each point's distance to its own cluster with its distance to the nearest other cluster, ranging from minus one to one. High silhouette means dense, well-separated clusters.",
            "syntax": "silhouette near 1: dense, well-separated clusters",
            "exampleCode": "print('silhouette = (b - a) / max(a, b), where a is within-cluster distance and b is nearest-other distance')",
            "exampleLanguage": "python",
            "mistake": "Comparing inertia across different values of k to claim the larger k is better.",
            "bug": {
              "prompt": "Find the bug: this program should compute the silhouette for a point, but it divides by the wrong value.",
              "buggyCode": "a, b = 1.0, 4.0\nprint((b - a) / a)",
              "fixedCode": "a, b = 1.0, 4.0\nprint((b - a) / max(a, b))",
              "explanation": "The silhouette divides by the larger of a and b, which keeps the score between minus one and one."
            },
            "exercise": {
              "title": "WCSS for k=1 and k=2",
              "type": "write-code",
              "instructions": "Read one line of sorted numbers (points on a line). Split them into two equal halves for k=2. Print the WCSS for k=1 and for k=2 with four decimal places, separated by a space.",
              "starterCode": "import sys\n\n# TODO: read the points, print WCSS for k=1 and k=2\n",
              "solution": "import sys\nxs = [float(v) for v in sys.stdin.read().split()]\nmean = sum(xs) / len(xs)\nw1 = sum((x - mean) ** 2 for x in xs)\nhalf = len(xs) // 2\na, b = xs[:half], xs[half:]\nma = sum(a) / len(a)\nmb = sum(b) / len(b)\nw2 = sum((x - ma) ** 2 for x in a) + sum((x - mb) ** 2 for x in b)\nprint(f\"{w1:.4f} {w2:.4f}\")",
              "solutionExplanation": "For k=1 use the overall mean; for k=2 use the mean of each half, then add the two sums.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "0 1 9 10",
                  "expectedStdout": "82.0000 1.0000\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "0 2 8 10",
                  "expectedStdout": "68.0000 4.0000\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of WCSS for k=1 and k=2 from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "kmeans-clustering-scratch-m2-l2",
            "slug": "kmeans-clustering-scratch-m2-l2",
            "title": "Empty Clusters and Convergence",
            "concept": "A cluster can lose all its points during the assignment step, leaving a centroid with no mean to move to. The usual fixes are to re-initialise the empty centroid to a random point, or to the point farthest from its centroid. Convergence is declared when the assignments stop changing or the centroids stop moving.",
            "syntax": "an empty cluster has no points to average, so re-initialise it",
            "exampleCode": "print('a cluster with zero points has no mean; pick a new centroid')",
            "exampleLanguage": "python",
            "mistake": "Dividing by zero when recomputing an empty cluster's centroid.",
            "bug": {
              "prompt": "Find the bug: this program should handle an empty cluster, but it crashes.",
              "buggyCode": "points = []\nprint(sum(p[0] for p in points) / len(points))",
              "fixedCode": "points = []\nprint('empty cluster: re-initialise the centroid' if len(points) == 0 else sum(p[0] for p in points) / len(points))",
              "explanation": "An empty cluster has no points to average, so the code must check for zero points before dividing."
            },
            "exercise": {
              "title": "Recompute a centroid",
              "type": "write-code",
              "instructions": "Read points, one per line as 'x y'. Print the centroid (the mean of each coordinate) with four decimal places, space-separated.",
              "starterCode": "import sys\n\n# TODO: read the points and print their mean\n",
              "solution": "import sys\npoints = [[float(v) for v in line.split()] for line in sys.stdin if line.strip()]\nprint(' '.join(f\"{sum(p[d] for p in points) / len(points):.4f}\" for d in range(len(points[0]))))",
              "solutionExplanation": "Sum each coordinate across the points and divide by the number of points.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "1 2\n3 4\n5 6",
                  "expectedStdout": "3.0000 4.0000\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "0 0\n2 2",
                  "expectedStdout": "1.0000 1.0000\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Recompute a centroid from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "kmeans-clustering-scratch-m2-l3",
            "slug": "kmeans-clustering-scratch-m2-l3",
            "title": "k-Means on Real Shapes: Limitations",
            "concept": "k-means assumes clusters are round and roughly equal in size, because it measures distance to a centre. It fails on long thin clusters, rings, and moons, where points in the same cluster are far apart. Density-based or spectral methods handle those shapes better.",
            "syntax": "k-means assumes round, equal-sized clusters",
            "exampleCode": "print('k-means splits a ring into wedges instead of finding the ring')",
            "exampleLanguage": "python",
            "mistake": "Using k-means on moon-shaped clusters and trusting the result.",
            "bug": {
              "prompt": "Find the bug: this program should say k-means fails on rings, but it says it succeeds.",
              "buggyCode": "shape = 'ring'\nprint('k-means works' if shape == 'ring' else 'k-means fails')",
              "fixedCode": "shape = 'ring'\nprint('k-means fails' if shape == 'ring' else 'k-means works')",
              "explanation": "A ring is not round around a single centre, so k-means chops it into wedges instead of finding the ring."
            },
            "exercise": {
              "title": "Check your understanding: k-means limitations",
              "type": "multiple-choice",
              "instructions": "Which statement about the limitations of k-means is correct?",
              "starterCode": "",
              "solution": "k-means assumes clusters are round and similar in size, so it fails on rings, moons and long thin shapes.",
              "solutionExplanation": "k-means assumes clusters are round and similar in size, so it fails on rings, moons and long thin shapes. The other options contradict the lesson.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "k-means assumes clusters are round and similar in size, so it fails on rings, moons and long thin shapes.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Check your understanding: k-means limitations from the lesson: which statement is actually true?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true in general."
              },
              "options": [
                "k-means handles rings and moons better than any other method.",
                "k-means assumes clusters are round and similar in size, so it fails on rings, moons and long thin shapes.",
                "k-means works perfectly on clusters of any shape.",
                "k-means never needs the number of clusters to be chosen."
              ],
              "answerIndex": 1
            }
          },
          {
            "id": "kmeans-clustering-scratch-m2-l4",
            "slug": "kmeans-clustering-scratch-m2-l4",
            "title": "Hierarchical Clustering Intuition",
            "concept": "Hierarchical clustering builds a tree of merges: start with every point alone, repeatedly merge the two closest clusters, and stop at the desired number of clusters. Single linkage merges by the closest pair across clusters, while complete linkage uses the farthest pair. The dendrogram shows the whole merge history.",
            "syntax": "merge the two closest clusters, again and again",
            "exampleCode": "print('single linkage: distance between clusters is the closest pair')",
            "exampleLanguage": "python",
            "mistake": "Reading the number of clusters from the dendrogram height without choosing a cut.",
            "bug": {
              "prompt": "Find the bug: this program should compute the single-linkage distance, but it uses the farthest pair.",
              "buggyCode": "a = [0, 1]\nb = [4, 6]\nprint(max(abs(x - y) for x in a for y in b))",
              "fixedCode": "a = [0, 1]\nb = [4, 6]\nprint(min(abs(x - y) for x in a for y in b))",
              "explanation": "Single linkage is the minimum distance between any pair across the two clusters, not the maximum."
            },
            "exercise": {
              "title": "Single-linkage distance",
              "type": "write-code",
              "instructions": "Read two lines, each a cluster as space-separated numbers on a line. Print the single-linkage distance (the smallest absolute difference between any pair) with four decimal places.",
              "starterCode": "import sys\n\n# TODO: read two clusters, print their single-linkage distance\n",
              "solution": "import sys\nlines = sys.stdin.read().strip().splitlines()\na = [float(v) for v in lines[0].split()]\nb = [float(v) for v in lines[1].split()]\nprint(f\"{min(abs(x - y) for x in a for y in b):.4f}\")",
              "solutionExplanation": "Check every pair across the two clusters and keep the smallest absolute difference.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "0 1\n4 6",
                  "expectedStdout": "3.0000\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "0 2\n5 9",
                  "expectedStdout": "3.0000\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Single-linkage distance from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "kmeans-clustering-scratch-m2-l5",
            "slug": "kmeans-clustering-scratch-m2-l5",
            "title": "DBSCAN Intuition: Density Clustering",
            "concept": "DBSCAN groups points that are densely packed: a point with enough neighbours within a radius eps is a core point, and core points linked by overlapping neighbourhoods form a cluster. Points in sparse regions are labelled noise. Unlike k-means, DBSCAN finds odd shapes and does not need k in advance.",
            "syntax": "DBSCAN: dense regions are clusters, sparse points are noise",
            "exampleCode": "print('a core point has at least min_samples neighbours within eps')",
            "exampleLanguage": "python",
            "mistake": "Setting eps so large that everything merges into one cluster.",
            "bug": {
              "prompt": "Find the bug: this program should count neighbours within eps, but it counts neighbours outside eps.",
              "buggyCode": "import math\nquery, eps = [0, 0], 1.5\npoints = [[1, 0], [0, 1], [5, 5]]\nprint(sum(1 for p in points if math.dist(query, p) > eps))",
              "fixedCode": "import math\nquery, eps = [0, 0], 1.5\npoints = [[1, 0], [0, 1], [5, 5]]\nprint(sum(1 for p in points if math.dist(query, p) <= eps))",
              "explanation": "A neighbour is within eps when its distance is at most eps; using greater than counts the far points instead."
            },
            "exercise": {
              "title": "Count neighbours within eps",
              "type": "write-code",
              "instructions": "Read eps on the first line, the query point on the second line, then points one per line. Print how many points lie within eps of the query.",
              "starterCode": "import sys, math\n\n# TODO: read eps, query and points, count neighbours\n",
              "solution": "import sys, math\nlines = [line.split() for line in sys.stdin if line.strip()]\neps = float(lines[0][0])\nquery = [float(v) for v in lines[1]]\npoints = [[float(v) for v in l] for l in lines[2:]]\nprint(sum(1 for p in points if math.dist(query, p) <= eps))",
              "solutionExplanation": "Measure the distance from the query to each point and count those at most eps away.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "1.5\n0 0\n1 0\n0 1\n5 5",
                  "expectedStdout": "2\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "2\n1 1\n2 1\n1 3\n4 4",
                  "expectedStdout": "2\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Count neighbours within eps from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "One full k-means iteration",
      "type": "write-code",
      "instructions": "Read two centroid lines, then points one per line. Assign each point to its nearest centroid and print the assignments space-separated on the first line. Then print the new centroid of cluster 0 and of cluster 1, each on its own line with four decimal places. If a cluster is empty, print 'empty' for it.",
      "starterCode": "import sys, math\n\n# TODO: assign points, recompute centroids, print results\n",
      "solution": "import sys, math\nlines = [line.split() for line in sys.stdin if line.strip()]\ncentroids = [[float(v) for v in lines[0]], [float(v) for v in lines[1]]]\npoints = [[float(v) for v in l] for l in lines[2:]]\nassign = [min(range(2), key=lambda c: math.dist(p, centroids[c])) for p in points]\nprint(' '.join(str(a) for a in assign))\nfor c in range(2):\n    members = [p for p, a in zip(points, assign) if a == c]\n    if not members:\n        print('empty')\n    else:\n        print(' '.join(f\"{sum(p[d] for p in members) / len(members):.4f}\" for d in range(len(members[0]))))",
      "solutionExplanation": "Assign each point to its nearest centroid, then average the members of each cluster to get the new centroids.",
      "tests": [
        {
          "name": "Visible test",
          "stdin": "0 0\n10 0\n1 0\n2 0\n9 0",
          "expectedStdout": "0 0 1\n1.5000 0.0000\n9.0000 0.0000\n",
          "hidden": false
        },
        {
          "name": "Hidden test",
          "stdin": "0 0\n0 10\n0 1\n0 2\n0 9",
          "expectedStdout": "0 0 1\n0.0000 1.5000\n0.0000 9.0000\n",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "Recall the core idea of One full k-means iteration from the lesson: what quantity must the program compute?",
        "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
        "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
      }
    },
    "capstone": {
      "title": "k-Means Clustering Capstone",
      "description": "Run one full k-means iteration in pure Python: assign points to centroids and move the centroids to the cluster means.",
      "requirements": [
        "Read two starting centroids and a set of points.",
        "Assign every point to its nearest centroid.",
        "Recompute each centroid as the mean of its assigned points.",
        "Print the assignments and the new centroids, handling an empty cluster."
      ],
      "rubric": [
        "The program runs and prints the correct assignments and centroids for both test inputs.",
        "Assignments use the nearest centroid for each point individually.",
        "Each new centroid is the mean of its own cluster members only.",
        "An empty cluster is reported instead of crashing on a division by zero."
      ]
    }
  },
  {
    "id": "pca-dimensionality-scratch",
    "slug": "pca-dimensionality-scratch",
    "language": "python",
    "category": "data-ai",
    "title": "PCA & Dimensionality Reduction from Scratch",
    "description": "Shrink data without losing its shape in pure Python: covariance, eigenvectors, projections, and explained variance.",
    "difficulty": "Intermediate",
    "estimatedHours": 16,
    "skills": [
      "Covariance matrix",
      "Eigenvectors",
      "Principal components",
      "Projections",
      "Explained variance",
      "Power iteration",
      "Whitening",
      "Reconstruction"
    ],
    "prerequisites": [
      "kmeans-clustering-scratch"
    ],
    "analogy": "Learning {topic} is like learning to photograph a sculpture: you pick the angle that shows the most shape with the fewest pictures.",
    "modules": [
      {
        "id": "pca-dimensionality-scratch-m1",
        "title": "PCA & Dimensionality Reduction from Scratch Foundations",
        "level": "intermediate",
        "lessons": [
          {
            "id": "pca-dimensionality-scratch-m1-l1",
            "slug": "pca-dimensionality-scratch-m1-l1",
            "title": "Why Reduce Dimensions?",
            "concept": "High-dimensional data is hard to visualise, slow to process, and full of redundant features that carry the same information. Dimensionality reduction keeps the directions where the data varies most and drops the rest. Fewer dimensions mean faster models, clearer plots, and often less overfitting.",
            "syntax": "keep the directions of greatest variance, drop the rest",
            "exampleCode": "print('100 features with 95 percent redundant information -> keep a few components')",
            "exampleLanguage": "python",
            "mistake": "Dropping dimensions before checking how much variance they carry.",
            "bug": {
              "prompt": "Find the bug: this program should report the variance of the data, but it reports the mean.",
              "buggyCode": "xs = [2, 4, 4, 4, 5, 5, 7, 9]\nprint(sum(xs) / len(xs))",
              "fixedCode": "xs = [2, 4, 4, 4, 5, 5, 7, 9]\nmean = sum(xs) / len(xs)\nprint(sum((x - mean) ** 2 for x in xs) / len(xs))",
              "explanation": "Variance is the average squared distance from the mean, not the mean itself."
            },
            "exercise": {
              "title": "Variance of a feature",
              "type": "write-code",
              "instructions": "Read a line of numbers and print their population variance with four decimal places.",
              "starterCode": "import sys\n\n# TODO: read the numbers and print their variance\n",
              "solution": "import sys\nxs = [float(x) for x in sys.stdin.read().split()]\nmean = sum(xs) / len(xs)\nprint(f\"{sum((x - mean) ** 2 for x in xs) / len(xs):.4f}\")",
              "solutionExplanation": "Find the mean, then average the squared distances from it.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "2 4 4 4 5 5 7 9",
                  "expectedStdout": "4.0000\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "1 2 3 4 5",
                  "expectedStdout": "2.0000\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Variance of a feature from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "pca-dimensionality-scratch-m1-l2",
            "slug": "pca-dimensionality-scratch-m1-l2",
            "title": "Variance and the Covariance Matrix",
            "concept": "The covariance matrix summarises how every pair of features varies together: variances on the diagonal, covariances off it. A large positive covariance means the two features rise together. PCA works on this matrix, so computing it correctly is the foundation of everything that follows.",
            "syntax": "cov(X, Y) = mean((X - mean_X) * (Y - mean_Y))",
            "exampleCode": "x = [1, 2, 3]\ny = [2, 4, 6]\nmx, my = 2.0, 4.0\nprint(sum((a - mx) * (b - my) for a, b in zip(x, y)) / 3)",
            "exampleLanguage": "python",
            "mistake": "Forgetting to centre the variables before multiplying, which mixes the means into the covariance.",
            "bug": {
              "prompt": "Find the bug: this program should print 1.3333, but it prints 4.6667.",
              "buggyCode": "x = [1, 2, 3]\ny = [2, 4, 6]\nprint(sum(a * b for a, b in zip(x, y)) / 3)",
              "fixedCode": "x = [1, 2, 3]\ny = [2, 4, 6]\nmx, my = 2.0, 4.0\nprint(sum((a - mx) * (b - my) for a, b in zip(x, y)) / 3)",
              "explanation": "Covariance multiplies centred values; using raw values adds the product of the means to the result."
            },
            "exercise": {
              "title": "Covariance of two features",
              "type": "write-code",
              "instructions": "Read two lines, each a feature's values, and print their covariance with four decimal places.",
              "starterCode": "import sys\n\n# TODO: read two features and print their covariance\n",
              "solution": "import sys\nlines = sys.stdin.read().strip().splitlines()\nx = [float(v) for v in lines[0].split()]\ny = [float(v) for v in lines[1].split()]\nmx = sum(x) / len(x)\nmy = sum(y) / len(y)\nprint(f\"{sum((a - mx) * (b - my) for a, b in zip(x, y)) / len(x):.4f}\")",
              "solutionExplanation": "Centre both features, multiply the centred values pairwise, and average.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "1 2 3\n2 4 6",
                  "expectedStdout": "1.3333\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "1 2 3 4\n4 3 2 1",
                  "expectedStdout": "-1.2500\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Covariance of two features from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "pca-dimensionality-scratch-m1-l3",
            "slug": "pca-dimensionality-scratch-m1-l3",
            "title": "Eigenvectors of the Covariance Matrix",
            "concept": "The eigenvectors of the covariance matrix are the principal directions: the axes along which the data varies most. The first eigenvector points along the greatest variance, and its eigenvalue says how much variance lies along it. For a 2 by 2 matrix the eigenvalues come from the trace and determinant.",
            "syntax": "eigenvectors of the covariance matrix are the principal directions",
            "exampleCode": "a, b, c, d = 5, 2, 2, 5\ntrace = a + d\ndet = a * d - b * c\ndisc = (trace * trace - 4 * det) ** 0.5\nprint((trace + disc) / 2, (trace - disc) / 2)",
            "exampleLanguage": "python",
            "mistake": "Using the determinant where the trace belongs, which scrambles both eigenvalues.",
            "bug": {
              "prompt": "Find the bug: this program should print 7.0 and 3.0, but it prints 8.0 and 2.0.",
              "buggyCode": "a, b, c, d = 5, 2, 2, 5\ntrace = a * d - b * c\ndet = a * d - b * c\ndisc = (trace * trace - 4 * det) ** 0.5\nprint((trace + disc) / 2, (trace - disc) / 2)",
              "fixedCode": "a, b, c, d = 5, 2, 2, 5\ntrace = a + d\ndet = a * d - b * c\ndisc = (trace * trace - 4 * det) ** 0.5\nprint((trace + disc) / 2, (trace - disc) / 2)",
              "explanation": "The trace is the sum of the diagonal entries, while the determinant is a times d minus b times c."
            },
            "exercise": {
              "title": "Check your understanding: eigenvectors of covariance",
              "type": "multiple-choice",
              "instructions": "Which statement about the eigenvectors of the covariance matrix is correct?",
              "starterCode": "",
              "solution": "They are the principal directions, and the first one points along the greatest variance in the data.",
              "solutionExplanation": "They are the principal directions, and the first one points along the greatest variance in the data. The other options contradict the lesson.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "They are the principal directions, and the first one points along the greatest variance in the data.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Check your understanding: eigenvectors of covariance from the lesson: which statement is actually true?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true in general."
              },
              "options": [
                "They always point along the coordinate axes, whatever the data looks like.",
                "They are the directions of least variance in the data.",
                "They are the principal directions, and the first one points along the greatest variance in the data.",
                "The covariance matrix has no eigenvectors at all."
              ],
              "answerIndex": 2
            }
          },
          {
            "id": "pca-dimensionality-scratch-m1-l4",
            "slug": "pca-dimensionality-scratch-m1-l4",
            "title": "Projecting Data onto Principal Components",
            "concept": "Projecting a point onto a principal component takes the dot product of the point with the component's unit vector, giving one coordinate in the new space. A point's coordinates along the top components are its reduced representation. Projection is a dot product, nothing more.",
            "syntax": "projection = dot(point, component)",
            "exampleCode": "x, u = [3.0, 4.0], [0.6, 0.8]\nprint(sum(a * b for a, b in zip(x, u)))",
            "exampleLanguage": "python",
            "mistake": "Projecting onto a vector that is not a unit vector, which scales the coordinate by the vector's length.",
            "bug": {
              "prompt": "Find the bug: this program should print 5.0, but it prints 10.0.",
              "buggyCode": "x, u = [3.0, 4.0], [1.2, 1.6]\nprint(sum(a * b for a, b in zip(x, u)))",
              "fixedCode": "x, u = [3.0, 4.0], [0.6, 0.8]\nprint(sum(a * b for a, b in zip(x, u)))",
              "explanation": "The component must be a unit vector of length one, or the projection is scaled by its length."
            },
            "exercise": {
              "title": "Project a point onto a component",
              "type": "write-code",
              "instructions": "Read a unit vector on the first line and a point on the second line, and print their dot product with four decimal places.",
              "starterCode": "import sys\n\n# TODO: read the component and the point, print the projection\n",
              "solution": "import sys\nlines = sys.stdin.read().strip().splitlines()\nu = [float(v) for v in lines[0].split()]\nx = [float(v) for v in lines[1].split()]\nprint(f\"{sum(a * b for a, b in zip(x, u)):.4f}\")",
              "solutionExplanation": "The projection is the dot product of the point with the unit component vector.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "0.6 0.8\n3 4",
                  "expectedStdout": "5.0000\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "0.6 0.8\n1 2",
                  "expectedStdout": "2.2000\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Project a point onto a component from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "pca-dimensionality-scratch-m1-l5",
            "slug": "pca-dimensionality-scratch-m1-l5",
            "title": "Explained Variance and Choosing Components",
            "concept": "Each eigenvalue divided by the sum of all eigenvalues gives the share of variance its component explains. Keeping components until the cumulative share passes a threshold like 95 percent is a common rule. A sharp drop after a few components means the data is nearly low-dimensional.",
            "syntax": "share = eigenvalue / sum of all eigenvalues",
            "exampleCode": "eigs = [4, 3, 2, 1]\nprint(f\"{eigs[0] / sum(eigs):.2f}\")",
            "exampleLanguage": "python",
            "mistake": "Keeping components with tiny eigenvalues because more components feels safer.",
            "bug": {
              "prompt": "Find the bug: this program should print 0.4, but it prints 1.0.",
              "buggyCode": "eigs = [4, 3, 2, 1]\nprint(f\"{eigs[0] / max(eigs):.2f}\")",
              "fixedCode": "eigs = [4, 3, 2, 1]\nprint(f\"{eigs[0] / sum(eigs):.2f}\")",
              "explanation": "The share divides by the sum of all eigenvalues, not by the largest one."
            },
            "exercise": {
              "title": "Check your understanding: explained variance",
              "type": "multiple-choice",
              "instructions": "Which statement about explained variance is correct?",
              "starterCode": "",
              "solution": "Each component explains a share of the total variance equal to its eigenvalue divided by the sum of all eigenvalues.",
              "solutionExplanation": "Each component explains a share of the total variance equal to its eigenvalue divided by the sum of all eigenvalues. The other options contradict the lesson.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Each component explains a share of the total variance equal to its eigenvalue divided by the sum of all eigenvalues.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Check your understanding: explained variance from the lesson: which statement is actually true?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true in general."
              },
              "options": [
                "The first component always explains all of the variance.",
                "Explained variance is only defined for two components.",
                "The shares of all components always add up to the largest eigenvalue.",
                "Each component explains a share of the total variance equal to its eigenvalue divided by the sum of all eigenvalues."
              ],
              "answerIndex": 3
            }
          }
        ]
      },
      {
        "id": "pca-dimensionality-scratch-m2",
        "title": "PCA & Dimensionality Reduction from Scratch in Depth",
        "level": "intermediate",
        "lessons": [
          {
            "id": "pca-dimensionality-scratch-m2-l1",
            "slug": "pca-dimensionality-scratch-m2-l1",
            "title": "PCA via Power Iteration",
            "concept": "Power iteration finds the top eigenvector by repeatedly multiplying a vector by the matrix and normalising it. Each step stretches the vector toward the dominant eigendirection, and after enough steps it converges. It is the simplest way to compute a principal component without a full eigendecomposition.",
            "syntax": "repeat: v = A v / ||A v|| until v stops changing",
            "exampleCode": "A = [[4, 1], [2, 3]]\nv = [1.0, 0.0]\nAv = [sum(a * b for a, b in zip(row, v)) for row in A]\nnorm = sum(x * x for x in Av) ** 0.5\nprint([x / norm for x in Av])",
            "exampleLanguage": "python",
            "mistake": "Forgetting to normalise after each multiplication, so the vector grows or shrinks out of control.",
            "bug": {
              "prompt": "Find the bug: this program should print a unit vector, but it prints [4.0, 2.0].",
              "buggyCode": "A = [[4, 1], [2, 3]]\nv = [1.0, 0.0]\nprint([sum(a * b for a, b in zip(row, v)) for row in A])",
              "fixedCode": "A = [[4, 1], [2, 3]]\nv = [1.0, 0.0]\nAv = [sum(a * b for a, b in zip(row, v)) for row in A]\nnorm = sum(x * x for x in Av) ** 0.5\nprint([x / norm for x in Av])",
              "explanation": "Power iteration must divide by the norm after every multiplication, or the vector is not a unit vector."
            },
            "exercise": {
              "title": "One power iteration step",
              "type": "write-code",
              "instructions": "Read a 2x2 matrix on the first line (four numbers) and a starting vector on the second line. Print the vector after one power iteration step (multiply, then normalise) with four decimal places, space-separated.",
              "starterCode": "import sys\n\n# TODO: read the matrix and vector, do one power iteration step\n",
              "solution": "import sys\nlines = sys.stdin.read().strip().splitlines()\na = [float(v) for v in lines[0].split()]\nA = [a[0:2], a[2:4]]\nv = [float(x) for x in lines[1].split()]\nAv = [sum(x * y for x, y in zip(row, v)) for row in A]\nnorm = sum(x * x for x in Av) ** 0.5\nprint(\" \".join(f\"{x / norm:.4f}\" for x in Av))",
              "solutionExplanation": "Multiply the matrix by the vector, then divide every entry by the result's length.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "4 1 2 3\n1 0",
                  "expectedStdout": "0.8944 0.4472\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "2 1 1 2\n1 1",
                  "expectedStdout": "0.7071 0.7071\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of One power iteration step from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "pca-dimensionality-scratch-m2-l2",
            "slug": "pca-dimensionality-scratch-m2-l2",
            "title": "Whitening and Scaling Before PCA",
            "concept": "PCA follows variance, so a feature measured in thousands will dominate the components even if it carries no more information. Standardising every feature first gives each one an equal say. Whitening goes further and rescales the components themselves to unit variance, which decorrelates the data completely.",
            "syntax": "standardise features before PCA, or the largest-scale feature wins",
            "exampleCode": "print('PCA on raw income and age lets income dominate the first component')",
            "exampleLanguage": "python",
            "mistake": "Running PCA on raw features with wildly different scales and trusting the components.",
            "bug": {
              "prompt": "Find the bug: this program should standardise a value, but it divides by the variance instead of the standard deviation.",
              "buggyCode": "x, mean, var = 30.0, 20.0, 100.0\nprint((x - mean) / var)",
              "fixedCode": "x, mean, var = 30.0, 20.0, 100.0\nprint((x - mean) / var ** 0.5)",
              "explanation": "Standardisation divides by the standard deviation, the square root of the variance, not by the variance itself."
            },
            "exercise": {
              "title": "Standardise values",
              "type": "write-code",
              "instructions": "Read a line of numbers and print them standardised (subtract the mean, divide by the population standard deviation) with four decimal places, space-separated.",
              "starterCode": "import sys\n\n# TODO: read the numbers and print them standardised\n",
              "solution": "import sys\nxs = [float(x) for x in sys.stdin.read().split()]\nmean = sum(xs) / len(xs)\nstd = (sum((x - mean) ** 2 for x in xs) / len(xs)) ** 0.5\nprint(\" \".join(f\"{(x - mean) / std:.4f}\" for x in xs))",
              "solutionExplanation": "Subtract the mean from each value and divide by the standard deviation.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "10 20 30",
                  "expectedStdout": "-1.2247 0.0000 1.2247\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "2 4 6 8",
                  "expectedStdout": "-1.3416 -0.4472 0.4472 1.3416\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Standardise values from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "pca-dimensionality-scratch-m2-l3",
            "slug": "pca-dimensionality-scratch-m2-l3",
            "title": "PCA for Visualisation",
            "concept": "Plotting data on its first two principal components shows the structure that matters most, with clusters and outliers visible in a single picture. The axes are the directions of greatest variance, not the original features. A good two-dimensional PCA plot often reveals what tables of numbers hide.",
            "syntax": "plot points on their first two principal components",
            "exampleCode": "print('PC1 vs PC2 plot: clusters appear where the variance is')",
            "exampleLanguage": "python",
            "mistake": "Labelling the PCA axes with original feature names, when they are mixtures of features.",
            "bug": {
              "prompt": "Find the bug: this program should project points onto the component, but it uses the wrong vector.",
              "buggyCode": "u, x = [0.8, 0.6], [3.0, 4.0]\nprint(sum(a * b for a, b in zip(x, [0.6, 0.8])))",
              "fixedCode": "u, x = [0.8, 0.6], [3.0, 4.0]\nprint(sum(a * b for a, b in zip(x, u)))",
              "explanation": "The projection must use the component vector itself, not a different vector with swapped entries."
            },
            "exercise": {
              "title": "Check your understanding: PCA visualisation",
              "type": "multiple-choice",
              "instructions": "Which statement about PCA for visualisation is correct?",
              "starterCode": "",
              "solution": "Plotting data on its first two principal components shows the structure that matters most, with clusters and outliers visible in a single picture.",
              "solutionExplanation": "Plotting data on its first two principal components shows the structure that matters most, with clusters and outliers visible in a single picture. The other options contradict the lesson.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Plotting data on its first two principal components shows the structure that matters most, with clusters and outliers visible in a single picture.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Check your understanding: PCA visualisation from the lesson: which statement is actually true?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true in general."
              },
              "options": [
                "Plotting data on its first two principal components shows the structure that matters most, with clusters and outliers visible in a single picture.",
                "The PCA axes are the original features, just renamed.",
                "A two-dimensional PCA plot shows all of the variance in the data.",
                "PCA visualisation only works when the data has exactly two features."
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "pca-dimensionality-scratch-m2-l4",
            "slug": "pca-dimensionality-scratch-m2-l4",
            "title": "PCA for Denoising and Compression",
            "concept": "Keeping only the top components and reconstructing the data from them drops the low-variance directions, which are often noise. The reconstruction is the projection times the component vector, summed over the kept components. The reconstruction error measures how much information was lost.",
            "syntax": "reconstruction = sum(projection_i * component_i)",
            "exampleCode": "x, u = [2.0, 2.0], [0.6, 0.8]\nproj = sum(a * b for a, b in zip(x, u))\nprint([proj * c for c in u])",
            "exampleLanguage": "python",
            "mistake": "Reconstructing with all components and claiming the data was compressed.",
            "bug": {
              "prompt": "Find the bug: this program should reconstruct from one component, but it returns the original point unchanged.",
              "buggyCode": "x = [2.0, 2.0]\nprint(x)",
              "fixedCode": "x, u = [2.0, 2.0], [0.6, 0.8]\nproj = sum(a * b for a, b in zip(x, u))\nprint([proj * c for c in u])",
              "explanation": "Reconstruction multiplies the projection by the component vector; returning the original point skips the compression entirely."
            },
            "exercise": {
              "title": "Reconstruct from one component",
              "type": "write-code",
              "instructions": "Read a unit component vector on the first line and a point on the second line. Print the reconstruction (projection times the component) with four decimal places, space-separated.",
              "starterCode": "import sys\n\n# TODO: read the component and point, print the reconstruction\n",
              "solution": "import sys\nlines = sys.stdin.read().strip().splitlines()\nu = [float(v) for v in lines[0].split()]\nx = [float(v) for v in lines[1].split()]\nproj = sum(a * b for a, b in zip(x, u))\nprint(\" \".join(f\"{proj * c:.4f}\" for c in u))",
              "solutionExplanation": "Project the point onto the component, then multiply the projection back by the component vector.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "0.6 0.8\n2 2",
                  "expectedStdout": "1.6800 2.2400\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "0.6 0.8\n4 3",
                  "expectedStdout": "2.8800 3.8400\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Reconstruct from one component from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "pca-dimensionality-scratch-m2-l5",
            "slug": "pca-dimensionality-scratch-m2-l5",
            "title": "Limits of PCA: Nonlinear Structure",
            "concept": "PCA is linear: it can only find straight directions, so it fails on curved manifolds like a Swiss roll or two concentric rings. The first components of a ring capture almost nothing useful. Nonlinear methods such as kernel PCA or autoencoders are needed for curved structure.",
            "syntax": "PCA only finds straight directions; curved structure needs nonlinear methods",
            "exampleCode": "print('a ring has no good straight direction: PCA flattens it badly')",
            "exampleLanguage": "python",
            "mistake": "Using PCA on a Swiss roll and expecting the unrolled shape to appear.",
            "bug": {
              "prompt": "Find the bug: this program should say PCA fails on rings, but it says it succeeds.",
              "buggyCode": "shape = 'ring'\nprint('PCA works' if shape == 'ring' else 'PCA fails')",
              "fixedCode": "shape = 'ring'\nprint('PCA fails' if shape == 'ring' else 'PCA works')",
              "explanation": "A ring is curved, and a linear method cannot follow the curve, so PCA cannot represent it well."
            },
            "exercise": {
              "title": "Reconstruction error",
              "type": "write-code",
              "instructions": "Read a point on the first line and its reconstruction on the second line, and print the squared reconstruction error (the sum of squared differences) with four decimal places.",
              "starterCode": "import sys\n\n# TODO: read the point and its reconstruction, print the squared error\n",
              "solution": "import sys\nlines = sys.stdin.read().strip().splitlines()\nx = [float(v) for v in lines[0].split()]\nr = [float(v) for v in lines[1].split()]\nprint(f\"{sum((a - b) ** 2 for a, b in zip(x, r)):.4f}\")",
              "solutionExplanation": "Subtract each reconstructed coordinate from the original, square the differences, and add them up.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "3 4\n3 3",
                  "expectedStdout": "1.0000\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "2 5\n2 3",
                  "expectedStdout": "4.0000\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Reconstruction error from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "PCA toolkit: covariance, projection, reconstruction",
      "type": "write-code",
      "instructions": "Read two lines, each a feature's values, then a unit component vector on the third line and a point on the fourth line. On the first line print the covariance of the two features with four decimals; on the second line print the point's projection onto the component with four decimals; on the third line print the reconstruction with four decimals, space-separated.",
      "starterCode": "import sys\n\n# TODO: compute covariance, projection and reconstruction\n",
      "solution": "import sys\nlines = sys.stdin.read().strip().splitlines()\nx = [float(v) for v in lines[0].split()]\ny = [float(v) for v in lines[1].split()]\nu = [float(v) for v in lines[2].split()]\np = [float(v) for v in lines[3].split()]\nmx = sum(x) / len(x)\nmy = sum(y) / len(y)\nprint(f\"{sum((a - mx) * (b - my) for a, b in zip(x, y)) / len(x):.4f}\")\nproj = sum(a * b for a, b in zip(p, u))\nprint(f\"{proj:.4f}\")\nprint(\" \".join(f\"{proj * c:.4f}\" for c in u))",
      "solutionExplanation": "Covariance centres both features first; the projection is a dot product, and the reconstruction scales the component by it.",
      "tests": [
        {
          "name": "Visible test",
          "stdin": "1 2 3\n2 4 6\n0.6 0.8\n3 4",
          "expectedStdout": "1.3333\n5.0000\n3.0000 4.0000\n",
          "hidden": false
        },
        {
          "name": "Hidden test",
          "stdin": "1 2 3 4\n4 3 2 1\n1 0\n2 3",
          "expectedStdout": "-1.2500\n2.0000\n2.0000 0.0000\n",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "Recall the core idea of PCA toolkit: covariance, projection, reconstruction from the lesson: what quantity must the program compute?",
        "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
        "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
      }
    },
    "capstone": {
      "title": "PCA Capstone",
      "description": "Build a small PCA toolkit in pure Python: covariance, projection onto a component, and reconstruction from it.",
      "requirements": [
        "Read two features and compute their covariance.",
        "Project a point onto a unit component vector.",
        "Reconstruct the point from its projection.",
        "Print all three results with four decimal places."
      ],
      "rubric": [
        "The program runs and prints the correct covariance, projection and reconstruction for both test inputs.",
        "Covariance uses centred values, not raw ones.",
        "The projection is the dot product with the unit component.",
        "The reconstruction multiplies the projection by the component vector."
      ]
    }
  },
  {
    "id": "gradient-descent-optimisation",
    "slug": "gradient-descent-optimisation",
    "language": "python",
    "category": "data-ai",
    "title": "Gradient Descent & Optimisation",
    "description": "Climb down the loss landscape in pure Python: batch, stochastic and mini-batch descent, momentum, Adam, and learning rate schedules.",
    "difficulty": "Intermediate",
    "estimatedHours": 16,
    "skills": [
      "Loss landscapes",
      "Batch gradient descent",
      "Stochastic gradient descent",
      "Mini-batch descent",
      "Learning rates",
      "Momentum",
      "Adam",
      "Learning rate schedules"
    ],
    "prerequisites": [
      "pca-dimensionality-scratch"
    ],
    "analogy": "Learning {topic} is like learning to hike down a mountain in fog: you feel the slope under your feet and take a step downhill, again and again.",
    "modules": [
      {
        "id": "gradient-descent-optimisation-m1",
        "title": "Gradient Descent & Optimisation Foundations",
        "level": "intermediate",
        "lessons": [
          {
            "id": "gradient-descent-optimisation-m1-l1",
            "slug": "gradient-descent-optimisation-m1-l1",
            "title": "Loss Landscapes and Minima",
            "concept": "The loss landscape is a surface where every point is a set of weights and the height is the loss. Training is the search for the lowest point, and a good minimum generalises to new data. Convex landscapes have one minimum, while neural networks have many minima and saddle points.",
            "syntax": "loss = mean squared error over the data",
            "exampleCode": "ys = [2, 4, 6]\npreds = [2.1, 3.9, 6.2]\nprint(sum((y - p) ** 2 for y, p in zip(ys, preds)) / 3)",
            "exampleLanguage": "python",
            "mistake": "Judging a model by its loss on the training data alone.",
            "bug": {
              "prompt": "Find the bug: this program should print the mean squared error 0.02, but it prints 0.06.",
              "buggyCode": "ys = [2, 4, 6]\npreds = [2.1, 3.9, 6.2]\nprint(sum((y - p) ** 2 for y, p in zip(ys, preds)))",
              "fixedCode": "ys = [2, 4, 6]\npreds = [2.1, 3.9, 6.2]\nprint(sum((y - p) ** 2 for y, p in zip(ys, preds)) / 3)",
              "explanation": "Mean squared error divides the sum of squared errors by the number of examples; the sum alone is not the mean."
            },
            "exercise": {
              "title": "Mean squared error",
              "type": "write-code",
              "instructions": "Read a line of true values and a line of predictions, and print the mean squared error with four decimal places.",
              "starterCode": "import sys\n\n# TODO: read true values and predictions, print the MSE\n",
              "solution": "import sys\nlines = sys.stdin.read().strip().splitlines()\nys = [float(x) for x in lines[0].split()]\nps = [float(x) for x in lines[1].split()]\nprint(f\"{sum((y - p) ** 2 for y, p in zip(ys, ps)) / len(ys):.4f}\")",
              "solutionExplanation": "Square each error, add them up, and divide by the number of examples.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "2 4 6\n2.1 3.9 6.2",
                  "expectedStdout": "0.0200\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "1 2 3\n1 3 2",
                  "expectedStdout": "0.6667\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Mean squared error from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "gradient-descent-optimisation-m1-l2",
            "slug": "gradient-descent-optimisation-m1-l2",
            "title": "Batch Gradient Descent",
            "concept": "Batch gradient descent computes the gradient over the whole dataset before taking a single step, so each step is accurate but slow on large data. The gradient for a weight is the average over all examples of minus two times the feature times the error. Full-batch steps are stable and easy to reason about.",
            "syntax": "gradient = average over all examples of -2 * x * error",
            "exampleCode": "print('batch: one careful step per pass over the data')",
            "exampleLanguage": "python",
            "mistake": "Averaging the gradients but forgetting to divide by the number of examples.",
            "bug": {
              "prompt": "Find the bug: this program should print the mean gradient -10.0, but it prints -20.0.",
              "buggyCode": "grads = [-4.0, -16.0]\nprint(sum(grads))",
              "fixedCode": "grads = [-4.0, -16.0]\nprint(sum(grads) / len(grads))",
              "explanation": "The batch gradient is the average of the per-example gradients, so the sum must be divided by the count."
            },
            "exercise": {
              "title": "One batch gradient step",
              "type": "write-code",
              "instructions": "Read w, b and learning rate on the first line, then two examples as 'x y' lines. Take one batch gradient descent step on squared error and print the new w and b with four decimal places, separated by a space.",
              "starterCode": "import sys\n\n# TODO: read w, b, lr and two examples, take one batch step\n",
              "solution": "import sys\nlines = [line.split() for line in sys.stdin if line.strip()]\nw, b, lr = [float(v) for v in lines[0]]\nexs = [[float(v) for v in l] for l in lines[1:]]\ngw = sum(-2 * x * (y - (w * x + b)) for x, y in exs) / len(exs)\ngb = sum(-2 * (y - (w * x + b)) for x, y in exs) / len(exs)\nprint(f\"{w - lr * gw:.4f} {b - lr * gb:.4f}\")",
              "solutionExplanation": "Average the per-example gradients over the batch, then subtract each scaled by the learning rate.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "0 0 0.1\n1 2\n2 4",
                  "expectedStdout": "1.0000 0.6000\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "0 0 0.1\n1 1\n3 3",
                  "expectedStdout": "1.0000 0.4000\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of One batch gradient step from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "gradient-descent-optimisation-m1-l3",
            "slug": "gradient-descent-optimisation-m1-l3",
            "title": "Stochastic Gradient Descent",
            "concept": "Stochastic gradient descent updates the weights after every single example, so it takes many noisy steps instead of a few careful ones. The noise can help escape shallow local minima, and the updates are fast because each one is cheap. The loss jumps around, so the learning rate is usually annealed down over time.",
            "syntax": "one example -> one noisy update",
            "exampleCode": "print('SGD: many cheap noisy steps instead of few careful ones')",
            "exampleLanguage": "python",
            "mistake": "Using a fixed large learning rate with SGD, which never settles near the minimum.",
            "bug": {
              "prompt": "Find the bug: this program should take one SGD step, but it takes a step in the wrong direction.",
              "buggyCode": "w, lr, x, y = 0.0, 0.1, 2.0, 4.0\npred = w * x\ngrad = -2 * x * (y - pred)\nw = w + lr * grad\nprint(w)",
              "fixedCode": "w, lr, x, y = 0.0, 0.1, 2.0, 4.0\npred = w * x\ngrad = -2 * x * (y - pred)\nw = w - lr * grad\nprint(w)",
              "explanation": "Gradient descent subtracts the scaled gradient; adding it climbs the loss."
            },
            "exercise": {
              "title": "Check your understanding: stochastic gradient descent",
              "type": "multiple-choice",
              "instructions": "Which statement about stochastic gradient descent is correct?",
              "starterCode": "",
              "solution": "Stochastic gradient descent updates the weights after every single example, so it takes many noisy steps instead of a few careful ones.",
              "solutionExplanation": "Stochastic gradient descent updates the weights after every single example, so it takes many noisy steps instead of a few careful ones. The other options contradict the lesson.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Stochastic gradient descent updates the weights after every single example, so it takes many noisy steps instead of a few careful ones.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Check your understanding: stochastic gradient descent from the lesson: which statement is actually true?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true in general."
              },
              "options": [
                "Stochastic gradient descent computes the gradient over the whole dataset before each step.",
                "Stochastic gradient descent updates the weights after every single example, so it takes many noisy steps instead of a few careful ones.",
                "Stochastic gradient descent never uses a learning rate.",
                "The loss under stochastic gradient descent never jumps around."
              ],
              "answerIndex": 1
            }
          },
          {
            "id": "gradient-descent-optimisation-m1-l4",
            "slug": "gradient-descent-optimisation-m1-l4",
            "title": "Mini-Batch Gradient Descent",
            "concept": "Mini-batch gradient descent splits the data into small batches and updates once per batch, balancing the stability of full-batch descent with the speed of SGD. Batch sizes of 32 or 64 are common, and the batches are shuffled each epoch. This is the standard way neural networks are trained.",
            "syntax": "update once per small batch of examples",
            "exampleCode": "print('mini-batch: 32 examples per step is the usual compromise')",
            "exampleLanguage": "python",
            "mistake": "Using the whole dataset as one batch and calling it mini-batch.",
            "bug": {
              "prompt": "Find the bug: this program should average the gradients over a batch of two, but it averages over four.",
              "buggyCode": "grads = [-4.0, -16.0, -1.0, -9.0]\nprint(sum(grads[:2]) / 4)",
              "fixedCode": "grads = [-4.0, -16.0, -1.0, -9.0]\nprint(sum(grads[:2]) / 2)",
              "explanation": "The mean of a batch divides by the batch size, two here, not by the size of the whole dataset."
            },
            "exercise": {
              "title": "Mean gradient over a mini-batch",
              "type": "write-code",
              "instructions": "Read a line of per-example gradients and print their mean with four decimal places.",
              "starterCode": "import sys\n\n# TODO: read the gradients and print their mean\n",
              "solution": "import sys\ngrads = [float(v) for v in sys.stdin.read().split()]\nprint(f\"{sum(grads) / len(grads):.4f}\")",
              "solutionExplanation": "Add the per-example gradients and divide by the batch size.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "-4 -16",
                  "expectedStdout": "-10.0000\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "-1 -9",
                  "expectedStdout": "-5.0000\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Mean gradient over a mini-batch from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "gradient-descent-optimisation-m1-l5",
            "slug": "gradient-descent-optimisation-m1-l5",
            "title": "Learning Rates and Divergence",
            "concept": "The learning rate scales every step: too small and training crawls, too large and the steps overshoot the minimum and the loss explodes. Divergence shows up as a loss that grows instead of shrinking. A learning rate that works is usually found by trying a few values on a log scale.",
            "syntax": "too large a step overshoots the minimum and diverges",
            "exampleCode": "print('lr 0.1 converges; lr 1.5 overshoots and the loss explodes')",
            "exampleLanguage": "python",
            "mistake": "Raising the learning rate when the loss is already exploding.",
            "bug": {
              "prompt": "Find the bug: this program should show a step that overshoots, but it shows a sensible step.",
              "buggyCode": "w, grad, lr = 1.0, 2.0, 0.1\nprint(w - lr * grad)",
              "fixedCode": "w, grad, lr = 1.0, 2.0, 1.5\nprint(w - lr * grad)",
              "explanation": "A learning rate of 1.5 with a gradient of 2 moves the weight from 1 to minus 2, overshooting the minimum at zero."
            },
            "exercise": {
              "title": "Check your understanding: learning rates",
              "type": "multiple-choice",
              "instructions": "Which statement about learning rates is correct?",
              "starterCode": "",
              "solution": "Too small a learning rate trains very slowly, while too large a rate overshoots the minimum and makes the loss explode.",
              "solutionExplanation": "Too small a learning rate trains very slowly, while too large a rate overshoots the minimum and makes the loss explode. The other options contradict the lesson.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Too small a learning rate trains very slowly, while too large a rate overshoots the minimum and makes the loss explode.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Check your understanding: learning rates from the lesson: which statement is actually true?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true in general."
              },
              "options": [
                "A larger learning rate always converges faster and more reliably.",
                "The learning rate has no effect on whether training converges.",
                "Too small a learning rate trains very slowly, while too large a rate overshoots the minimum and makes the loss explode.",
                "Divergence is fixed by raising the learning rate further."
              ],
              "answerIndex": 2
            }
          }
        ]
      },
      {
        "id": "gradient-descent-optimisation-m2",
        "title": "Gradient Descent & Optimisation in Depth",
        "level": "intermediate",
        "lessons": [
          {
            "id": "gradient-descent-optimisation-m2-l1",
            "slug": "gradient-descent-optimisation-m2-l1",
            "title": "Momentum",
            "concept": "Momentum keeps a running average of past gradients, called velocity, and adds it to the current gradient, so the optimiser accelerates along consistent directions and damps oscillations. The velocity is beta times the old velocity plus the new gradient, with beta usually 0.9. Momentum is like a ball rolling downhill: it picks up speed on long slopes.",
            "syntax": "velocity = beta * velocity + gradient; w = w - lr * velocity",
            "exampleCode": "v, beta, grad, lr = 0.5, 0.9, 2.0, 0.1\nv = beta * v + grad\nprint(1.0 - lr * v, v)",
            "exampleLanguage": "python",
            "mistake": "Setting beta to zero, which turns momentum back into plain gradient descent.",
            "bug": {
              "prompt": "Find the bug: this program should update the velocity with beta 0.9, but it forgets the old velocity.",
              "buggyCode": "v, beta, grad = 0.5, 0.9, 2.0\nprint(grad)",
              "fixedCode": "v, beta, grad = 0.5, 0.9, 2.0\nprint(beta * v + grad)",
              "explanation": "Momentum adds the decayed old velocity to the new gradient; using the gradient alone discards the history."
            },
            "exercise": {
              "title": "Momentum update",
              "type": "write-code",
              "instructions": "Read w, velocity, gradient, beta and learning rate on one line. Print the new w and the new velocity with four decimal places, separated by a space.",
              "starterCode": "import sys\n\n# TODO: read the values and apply the momentum update\n",
              "solution": "import sys\nw, v, grad, beta, lr = [float(v) for v in sys.stdin.read().split()]\nv = beta * v + grad\nw = w - lr * v\nprint(f\"{w:.4f} {v:.4f}\")",
              "solutionExplanation": "The new velocity is beta times the old velocity plus the gradient, and the weight moves against it.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "1 0.5 2 0.9 0.1",
                  "expectedStdout": "0.7550 2.4500\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "0 0 4 0.9 0.1",
                  "expectedStdout": "-0.4000 4.0000\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Momentum update from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "gradient-descent-optimisation-m2-l2",
            "slug": "gradient-descent-optimisation-m2-l2",
            "title": "AdaGrad and RMSProp",
            "concept": "AdaGrad scales the learning rate per parameter by the accumulated squared gradients, so rare features get larger steps. RMSProp fixes AdaGrad's tendency to shrink the rate to zero by using an exponentially decaying average of squared gradients instead. Both adapt the step size to the history of each parameter.",
            "syntax": "per-parameter step size from the history of squared gradients",
            "exampleCode": "print('AdaGrad accumulates all past squared gradients; RMSProp decays the average')",
            "exampleLanguage": "python",
            "mistake": "Using one global learning rate for a sparse problem where per-parameter rates help.",
            "bug": {
              "prompt": "Find the bug: this program should compute the RMSProp average, but it uses the plain sum.",
              "buggyCode": "sq, beta = 4.0, 0.9\ngrad = 2.0\nprint(sq + grad * grad)",
              "fixedCode": "sq, beta = 4.0, 0.9\ngrad = 2.0\nprint(beta * sq + (1 - beta) * grad * grad)",
              "explanation": "RMSProp keeps a decaying average of squared gradients, so the old value is multiplied by beta and the new square by one minus beta."
            },
            "exercise": {
              "title": "RMSProp running average",
              "type": "write-code",
              "instructions": "Read the current average of squared gradients, beta and the new gradient on one line, and print the updated average with four decimal places.",
              "starterCode": "import sys\n\n# TODO: read the average, beta and gradient, print the new average\n",
              "solution": "import sys\nsq, beta, grad = [float(v) for v in sys.stdin.read().split()]\nprint(f\"{beta * sq + (1 - beta) * grad * grad:.4f}\")",
              "solutionExplanation": "The new average is beta times the old average plus one minus beta times the squared gradient.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "4 0.9 2",
                  "expectedStdout": "4.0000\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "1 0.9 3",
                  "expectedStdout": "1.8000\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of RMSProp running average from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "gradient-descent-optimisation-m2-l3",
            "slug": "gradient-descent-optimisation-m2-l3",
            "title": "Adam",
            "concept": "Adam combines momentum with per-parameter adaptive rates: it keeps a decaying average of gradients and of squared gradients, corrects both for their bias toward zero at the start, and divides the first by the square root of the second. With default betas 0.9 and 0.999 and a learning rate around 0.001, Adam is the default optimiser for most neural networks.",
            "syntax": "m = beta1 * m + (1 - beta1) * grad; v = beta2 * v + (1 - beta2) * grad ** 2",
            "exampleCode": "print('Adam: momentum plus adaptive rates, with bias correction')",
            "exampleLanguage": "python",
            "mistake": "Forgetting the bias correction, which makes the first steps far too small.",
            "bug": {
              "prompt": "Find the bug: this program should bias-correct the first moment, but it uses the raw value.",
              "buggyCode": "m, beta1, t = 0.2, 0.9, 1\nprint(m)",
              "fixedCode": "m, beta1, t = 0.2, 0.9, 1\nprint(m / (1 - beta1 ** t))",
              "explanation": "The bias-corrected moment divides by one minus beta1 to the power t, which matters most at the first step."
            },
            "exercise": {
              "title": "Check your understanding: Adam",
              "type": "multiple-choice",
              "instructions": "Which statement about Adam is correct?",
              "starterCode": "",
              "solution": "Adam combines momentum with per-parameter adaptive rates, keeping a decaying average of gradients and of squared gradients, with bias correction.",
              "solutionExplanation": "Adam combines momentum with per-parameter adaptive rates, keeping a decaying average of gradients and of squared gradients, with bias correction. The other options contradict the lesson.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Adam combines momentum with per-parameter adaptive rates, keeping a decaying average of gradients and of squared gradients, with bias correction.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Check your understanding: Adam from the lesson: which statement is actually true?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true in general."
              },
              "options": [
                "Adam uses the same fixed step size for every parameter forever.",
                "Adam ignores the gradients entirely and steps at random.",
                "Adam never needs a learning rate.",
                "Adam combines momentum with per-parameter adaptive rates, keeping a decaying average of gradients and of squared gradients, with bias correction."
              ],
              "answerIndex": 3
            }
          },
          {
            "id": "gradient-descent-optimisation-m2-l4",
            "slug": "gradient-descent-optimisation-m2-l4",
            "title": "Learning Rate Schedules",
            "concept": "A learning rate schedule lowers the learning rate as training progresses, so early steps explore and late steps settle. Exponential decay multiplies the rate by a factor each step, and step decay drops it at fixed milestones. A schedule usually beats any single fixed rate.",
            "syntax": "lr = lr0 * decay ** step",
            "exampleCode": "lr0, decay, step = 0.1, 0.9, 5\nprint(lr0 * decay ** step)",
            "exampleLanguage": "python",
            "mistake": "Keeping the learning rate high forever, so the weights keep bouncing around the minimum.",
            "bug": {
              "prompt": "Find the bug: this program should decay the rate over five steps, but it never decays.",
              "buggyCode": "lr0, decay, step = 0.1, 0.9, 5\nprint(lr0)",
              "fixedCode": "lr0, decay, step = 0.1, 0.9, 5\nprint(lr0 * decay ** step)",
              "explanation": "Exponential decay raises the decay factor to the step number; without the exponent the rate never changes."
            },
            "exercise": {
              "title": "Exponential learning rate decay",
              "type": "write-code",
              "instructions": "Read the initial learning rate, the decay factor and the step number on one line, and print the decayed learning rate with four decimal places.",
              "starterCode": "import sys\n\n# TODO: read lr0, decay and step, print the decayed rate\n",
              "solution": "import sys\nlr0, decay, step = [float(v) for v in sys.stdin.read().split()]\nprint(f\"{lr0 * decay ** int(step):.4f}\")",
              "solutionExplanation": "Multiply the initial rate by the decay factor raised to the step number.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "0.1 0.9 5",
                  "expectedStdout": "0.0590\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "0.2 0.5 3",
                  "expectedStdout": "0.0250\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Exponential learning rate decay from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "gradient-descent-optimisation-m2-l5",
            "slug": "gradient-descent-optimisation-m2-l5",
            "title": "Convex vs Non-Convex Optimisation",
            "concept": "A convex function has a single global minimum, so gradient descent from anywhere converges to it. Neural network losses are non-convex, with many minima and saddle points, yet gradient descent still finds good solutions in practice. The shape of the landscape decides how much the starting point matters.",
            "syntax": "convex: one minimum; non-convex: many minima and saddles",
            "exampleCode": "print('convex loss: any start converges to the same minimum')",
            "exampleLanguage": "python",
            "mistake": "Assuming a non-convex loss has a single minimum just because gradient descent converged.",
            "bug": {
              "prompt": "Find the bug: this program should say a convex function has one minimum, but it says it has many.",
              "buggyCode": "shape = 'convex'\nprint('many minima' if shape == 'convex' else 'one minimum')",
              "fixedCode": "shape = 'convex'\nprint('one minimum' if shape == 'convex' else 'many minima')",
              "explanation": "Convexity means exactly one global minimum; many minima is the definition of non-convex."
            },
            "exercise": {
              "title": "Minimum of a convex quadratic",
              "type": "write-code",
              "instructions": "Read a, b and c for f(x) = a*x^2 + b*x + c with a > 0 on one line. Print the minimiser x* = -b / (2a) and the minimum value f(x*) with four decimal places, separated by a space.",
              "starterCode": "import sys\n\n# TODO: read a, b, c and print the minimiser and minimum value\n",
              "solution": "import sys\na, b, c = [float(v) for v in sys.stdin.read().split()]\nx = -b / (2 * a)\nprint(f\"{x:.4f} {a * x * x + b * x + c:.4f}\")",
              "solutionExplanation": "The minimum of a convex quadratic is at minus b over two a; plug it back in for the value.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "1 -4 4",
                  "expectedStdout": "2.0000 0.0000\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "2 4 1",
                  "expectedStdout": "-1.0000 -1.0000\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Minimum of a convex quadratic from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "SGD step plus learning rate decay",
      "type": "write-code",
      "instructions": "Read w, b, learning rate, x and y on the first line, and the decay factor and step number on the second line. Take one SGD step on squared error, then print the new w and b on the first line and the decayed learning rate on the second line, each with four decimal places.",
      "starterCode": "import sys\n\n# TODO: take one SGD step, then decay the learning rate\n",
      "solution": "import sys\nlines = sys.stdin.read().strip().splitlines()\nw, b, lr, x, y = [float(v) for v in lines[0].split()]\ndecay, step = [float(v) for v in lines[1].split()]\npred = w * x + b\nerr = y - pred\nw = w - lr * (-2 * x * err)\nb = b - lr * (-2 * err)\nprint(f\"{w:.4f} {b:.4f}\")\nprint(f\"{lr * decay ** int(step):.4f}\")",
      "solutionExplanation": "The SGD update uses the per-example gradients, and the rate decays exponentially with the step number.",
      "tests": [
        {
          "name": "Visible test",
          "stdin": "0 0 0.1 2 4\n0.9 5",
          "expectedStdout": "1.6000 0.8000\n0.0590\n",
          "hidden": false
        },
        {
          "name": "Hidden test",
          "stdin": "1 1 0.2 1 3\n0.5 3",
          "expectedStdout": "1.4000 1.4000\n0.0250\n",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "Recall the core idea of SGD step plus learning rate decay from the lesson: what quantity must the program compute?",
        "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
        "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
      }
    },
    "capstone": {
      "title": "Optimisation Capstone",
      "description": "Build a small optimiser in pure Python: take a stochastic gradient step and decay the learning rate on a schedule.",
      "requirements": [
        "Read weights, learning rate and one training example.",
        "Take one SGD step on squared error.",
        "Apply exponential learning rate decay for the given step.",
        "Print the new weights and the decayed learning rate."
      ],
      "rubric": [
        "The program runs and prints the correct weights and learning rate for both test inputs.",
        "The gradients use the error of the single example, not a batch average.",
        "The weights move against the gradient, scaled by the learning rate.",
        "The decayed rate raises the decay factor to the step number."
      ]
    }
  },
  {
    "id": "backpropagation-scratch",
    "slug": "backpropagation-scratch",
    "language": "python",
    "category": "data-ai",
    "title": "Backpropagation from Scratch",
    "description": "Learn how neural networks really learn in pure Python: computational graphs, the chain rule, and gradients through every layer.",
    "difficulty": "Advanced",
    "estimatedHours": 18,
    "skills": [
      "Computational graphs",
      "Chain rule",
      "Forward and backward passes",
      "Activation gradients",
      "Linear layer gradients",
      "Gradient checking",
      "Vanishing gradients",
      "Two-layer backprop"
    ],
    "prerequisites": [
      "gradient-descent-optimisation"
    ],
    "analogy": "Learning {topic} is like learning to trace a river back to its source: you follow each tributary of the gradient until you know what fed the loss.",
    "modules": [
      {
        "id": "backpropagation-scratch-m1",
        "title": "Backpropagation from Scratch Foundations",
        "level": "intermediate",
        "lessons": [
          {
            "id": "backpropagation-scratch-m1-l1",
            "slug": "backpropagation-scratch-m1-l1",
            "title": "Computational Graphs",
            "concept": "A computational graph breaks a function into small operations, each a node with inputs and an output, and the loss is the final node. The forward pass computes every node's value, and the backward pass sends gradients back along the edges. Every neural network is a computational graph.",
            "syntax": "each operation is a node; the loss is the final node",
            "exampleCode": "a, b, c = 2.0, 3.0, 4.0\nprint((a + b) * c)",
            "exampleLanguage": "python",
            "mistake": "Trying to differentiate a function without decomposing it into operations.",
            "bug": {
              "prompt": "Find the bug: this program should compute (a + b) * c = 20, but it prints 14.",
              "buggyCode": "a, b, c = 2.0, 3.0, 4.0\nprint(a + b * c)",
              "fixedCode": "a, b, c = 2.0, 3.0, 4.0\nprint((a + b) * c)",
              "explanation": "The graph groups the addition first, so the parentheses matter: a plus b times c is a different graph."
            },
            "exercise": {
              "title": "Forward value of a small graph",
              "type": "write-code",
              "instructions": "Read a, b and c on one line, and print (a + b) * c with four decimal places.",
              "starterCode": "import sys\n\n# TODO: read a, b, c and print (a + b) * c\n",
              "solution": "import sys\na, b, c = [float(v) for v in sys.stdin.read().split()]\nprint(f\"{(a + b) * c:.4f}\")",
              "solutionExplanation": "Add a and b first, then multiply by c.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "2 3 4",
                  "expectedStdout": "20.0000\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "1 1 5",
                  "expectedStdout": "10.0000\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Forward value of a small graph from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "backpropagation-scratch-m1-l2",
            "slug": "backpropagation-scratch-m1-l2",
            "title": "The Chain Rule",
            "concept": "The chain rule says the derivative of a composition is the product of the derivatives of its parts: if y depends on u and u depends on x, then dy over dx equals dy over du times du over dx. Backpropagation is the chain rule applied to every node of the graph, one edge at a time. It turns a hard derivative into a sequence of easy ones.",
            "syntax": "dy/dx = dy/du * du/dx",
            "exampleCode": "x = 2.0\nu = 3 * x + 1\nprint(2 * u * 3)",
            "exampleLanguage": "python",
            "mistake": "Multiplying by the wrong local derivative, which breaks the whole chain.",
            "bug": {
              "prompt": "Find the bug: this program should print 42.0, but it prints 14.0.",
              "buggyCode": "x = 2.0\nu = 3 * x + 1\nprint(2 * u)",
              "fixedCode": "x = 2.0\nu = 3 * x + 1\nprint(2 * u * 3)",
              "explanation": "The chain needs both factors: dy over du is two u, and du over dx is three."
            },
            "exercise": {
              "title": "Chain rule derivative",
              "type": "write-code",
              "instructions": "Read x, a, b and n on one line for y = u^n with u = a*x + b, and print dy/dx with four decimal places.",
              "starterCode": "import sys\n\n# TODO: read x, a, b, n and print dy/dx\n",
              "solution": "import sys\nx, a, b, n = [float(v) for v in sys.stdin.read().split()]\nu = a * x + b\nprint(f\"{n * u ** (n - 1) * a:.4f}\")",
              "solutionExplanation": "Differentiate the outer power, then multiply by the derivative of the inner linear function.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "2 3 1 2",
                  "expectedStdout": "42.0000\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "1 2 1 3",
                  "expectedStdout": "54.0000\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Chain rule derivative from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "backpropagation-scratch-m1-l3",
            "slug": "backpropagation-scratch-m1-l3",
            "title": "Forward Pass, Backward Pass",
            "concept": "The forward pass runs the graph from inputs to loss, storing every intermediate value. The backward pass starts with a gradient of one at the loss and walks back, multiplying by each operation's local gradient. The values stored in the forward pass are exactly what the backward pass needs.",
            "syntax": "forward stores values; backward multiplies local gradients",
            "exampleCode": "print('forward: compute and store; backward: chain the gradients back')",
            "exampleLanguage": "python",
            "mistake": "Running the backward pass without the stored forward values, so local gradients cannot be computed.",
            "bug": {
              "prompt": "Find the bug: this program should say the backward pass needs stored values, but it says it does not.",
              "buggyCode": "stored = True\nprint('backward works without stored values' if stored else 'backward needs stored values')",
              "fixedCode": "stored = True\nprint('backward needs stored values' if stored else 'backward works without stored values')",
              "explanation": "The backward pass multiplies by local gradients that depend on the forward values, so they must be stored."
            },
            "exercise": {
              "title": "Check your understanding: forward and backward passes",
              "type": "multiple-choice",
              "instructions": "Which statement about the forward and backward passes is correct?",
              "starterCode": "",
              "solution": "The forward pass computes and stores every value, and the backward pass chains local gradients back from the loss.",
              "solutionExplanation": "The forward pass computes and stores every value, and the backward pass chains local gradients back from the loss. The other options contradict the lesson.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "The forward pass computes and stores every value, and the backward pass chains local gradients back from the loss.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Check your understanding: forward and backward passes from the lesson: which statement is actually true?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true in general."
              },
              "options": [
                "The forward pass computes and stores every value, and the backward pass chains local gradients back from the loss.",
                "The backward pass runs before the forward pass.",
                "The forward pass needs no stored values at all.",
                "The backward pass starts with a gradient of zero at the loss."
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "backpropagation-scratch-m1-l4",
            "slug": "backpropagation-scratch-m1-l4",
            "title": "Gradients of Addition and Multiplication",
            "concept": "For addition, the gradient flows unchanged to both inputs, because the derivative of a sum with respect to either input is one. For multiplication, each input gets the gradient times the other input. These two rules are the whole local-gradient vocabulary for most graphs.",
            "syntax": "addition: gradient passes through; multiplication: gradient times the other input",
            "exampleCode": "x, y, w = 2.0, 3.0, 4.0\nprint(w, w, x + y)",
            "exampleLanguage": "python",
            "mistake": "Giving the multiplication node the same gradient as the addition node.",
            "bug": {
              "prompt": "Find the bug: this program should print the gradients 4, 4 and 5, but it prints 1, 1 and 5.",
              "buggyCode": "x, y, w = 2.0, 3.0, 4.0\nprint(1, 1, x + y)",
              "fixedCode": "x, y, w = 2.0, 3.0, 4.0\nprint(w, w, x + y)",
              "explanation": "For z equal to (x + y) times w, the gradients to x and y are w, and the gradient to w is x plus y."
            },
            "exercise": {
              "title": "Gradients through add then multiply",
              "type": "write-code",
              "instructions": "Read x, y and w on one line for z = (x + y) * w, and print dz/dx, dz/dy and dz/dw with four decimal places, space-separated.",
              "starterCode": "import sys\n\n# TODO: read x, y, w and print the three gradients\n",
              "solution": "import sys\nx, y, w = [float(v) for v in sys.stdin.read().split()]\nprint(f\"{w:.4f} {w:.4f} {x + y:.4f}\")",
              "solutionExplanation": "The gradients to x and y are w, and the gradient to w is x plus y.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "2 3 4",
                  "expectedStdout": "4.0000 4.0000 5.0000\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "1 1 2",
                  "expectedStdout": "2.0000 2.0000 2.0000\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Gradients through add then multiply from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "backpropagation-scratch-m1-l5",
            "slug": "backpropagation-scratch-m1-l5",
            "title": "Backprop Through Activation Functions",
            "concept": "An activation's backward pass multiplies the incoming gradient by the activation's local derivative. The sigmoid's derivative is p times one minus p, where p is the sigmoid output, so it is largest at zero and vanishes for large inputs. ReLU passes the gradient through unchanged for positive inputs and blocks it for negative ones.",
            "syntax": "sigmoid derivative = p * (1 - p)",
            "exampleCode": "p = 0.8\nprint(p * (1 - p))",
            "exampleLanguage": "python",
            "mistake": "Using the sigmoid output itself as its derivative, which overstates the gradient.",
            "bug": {
              "prompt": "Find the bug: this program should print 0.16, but it prints 0.8.",
              "buggyCode": "p = 0.8\nprint(p)",
              "fixedCode": "p = 0.8\nprint(p * (1 - p))",
              "explanation": "The derivative of the sigmoid is p times one minus p, not p itself."
            },
            "exercise": {
              "title": "Check your understanding: activation gradients",
              "type": "multiple-choice",
              "instructions": "Which statement about backprop through the sigmoid is correct?",
              "starterCode": "",
              "solution": "The local gradient is p times one minus p, where p is the sigmoid output.",
              "solutionExplanation": "The local gradient is p times one minus p, where p is the sigmoid output. The other options contradict the lesson.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "The local gradient is p times one minus p, where p is the sigmoid output.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Check your understanding: activation gradients from the lesson: which statement is actually true?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true in general."
              },
              "options": [
                "The local gradient of the sigmoid is always one.",
                "The local gradient is p times one minus p, where p is the sigmoid output.",
                "The sigmoid blocks all gradients, like a wall.",
                "The sigmoid derivative is largest for very large inputs."
              ],
              "answerIndex": 1
            }
          }
        ]
      },
      {
        "id": "backpropagation-scratch-m2",
        "title": "Backpropagation from Scratch in Depth",
        "level": "advanced",
        "lessons": [
          {
            "id": "backpropagation-scratch-m2-l1",
            "slug": "backpropagation-scratch-m2-l1",
            "title": "Backprop Through a Linear Layer",
            "concept": "For a linear layer y equal to w times x plus b, the gradient to w is the incoming gradient times x, the gradient to b is the incoming gradient, and the gradient to x is the incoming gradient times w. The weight gradient is an outer product in the vector case, which is why shapes matter. These three formulas drive almost all of deep learning.",
            "syntax": "dL/dw = dL/dy * x; dL/db = dL/dy; dL/dx = dL/dy * w",
            "exampleCode": "dLdy, x, w = 2.0, 3.0, 4.0\nprint(dLdy * x, dLdy, dLdy * w)",
            "exampleLanguage": "python",
            "mistake": "Forgetting to multiply by x when computing the weight gradient.",
            "bug": {
              "prompt": "Find the bug: this program should print 6, 2 and 8, but it prints 2, 2 and 8.",
              "buggyCode": "dLdy, x, w = 2.0, 3.0, 4.0\nprint(dLdy, dLdy, dLdy * w)",
              "fixedCode": "dLdy, x, w = 2.0, 3.0, 4.0\nprint(dLdy * x, dLdy, dLdy * w)",
              "explanation": "The weight gradient is the incoming gradient times the input x; the bias gradient is the incoming gradient alone."
            },
            "exercise": {
              "title": "Gradients of a linear layer",
              "type": "write-code",
              "instructions": "Read the incoming gradient dL/dy, the input x and the weight w on one line, and print dL/dw, dL/db and dL/dx with four decimal places, space-separated.",
              "starterCode": "import sys\n\n# TODO: read dL/dy, x, w and print the three gradients\n",
              "solution": "import sys\ndLdy, x, w = [float(v) for v in sys.stdin.read().split()]\nprint(f\"{dLdy * x:.4f} {dLdy:.4f} {dLdy * w:.4f}\")",
              "solutionExplanation": "Multiply the incoming gradient by x for the weight, keep it for the bias, and multiply by w for the input.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "2 3 4",
                  "expectedStdout": "6.0000 2.0000 8.0000\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "0.5 2 -1",
                  "expectedStdout": "1.0000 0.5000 -0.5000\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Gradients of a linear layer from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "backpropagation-scratch-m2-l2",
            "slug": "backpropagation-scratch-m2-l2",
            "title": "Vectorised Backprop with Matrices",
            "concept": "In a vectorised layer the weight gradient is the outer product of the incoming gradient and the input, and the input gradient is the weight matrix transposed times the incoming gradient. Getting the transpose right is the difference between a working network and a shape error. Matrix backprop is the same three scalar rules, written in bulk.",
            "syntax": "dL/dW = outer(dL/dy, x); dL/dx = W^T dL/dy",
            "exampleCode": "print('weight gradient: outer product; input gradient: transpose times incoming gradient')",
            "exampleLanguage": "python",
            "mistake": "Multiplying by W instead of W transposed when computing the input gradient.",
            "bug": {
              "prompt": "Find the bug: this program should transpose the weight matrix, but it uses it as it is.",
              "buggyCode": "W = [[1, 2], [3, 4]]\nprint(W)",
              "fixedCode": "W = [[1, 2], [3, 4]]\nprint([[W[j][i] for j in range(2)] for i in range(2)])",
              "explanation": "The input gradient needs W transposed, so rows and columns must be swapped."
            },
            "exercise": {
              "title": "Transpose a 2x2 matrix",
              "type": "write-code",
              "instructions": "Read four numbers giving a 2x2 matrix row by row, and print the transposed matrix as two lines of space-separated numbers with four decimal places.",
              "starterCode": "import sys\n\n# TODO: read the matrix and print its transpose\n",
              "solution": "import sys\nvals = [float(v) for v in sys.stdin.read().split()]\nprint(f\"{vals[0]:.4f} {vals[2]:.4f}\")\nprint(f\"{vals[1]:.4f} {vals[3]:.4f}\")",
              "solutionExplanation": "The transpose swaps rows and columns, so the new rows are the old columns.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "1 2 3 4",
                  "expectedStdout": "1.0000 3.0000\n2.0000 4.0000\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "5 6 7 8",
                  "expectedStdout": "5.0000 7.0000\n6.0000 8.0000\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Transpose a 2x2 matrix from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "backpropagation-scratch-m2-l3",
            "slug": "backpropagation-scratch-m2-l3",
            "title": "Numerical Gradient Checking",
            "concept": "Gradient checking compares the analytic gradient with a numerical one from the central difference: f(x + eps) minus f(x - eps), divided by two eps. If they agree to several decimal places, the backprop is right. It is a debugging tool for small models, far too slow for training.",
            "syntax": "numerical gradient = (f(x + eps) - f(x - eps)) / (2 * eps)",
            "exampleCode": "f = lambda x: x * x\nx, eps = 3.0, 0.001\nprint((f(x + eps) - f(x - eps)) / (2 * eps))",
            "exampleLanguage": "python",
            "mistake": "Using a forward difference with a large eps, which is inaccurate and hides real bugs.",
            "bug": {
              "prompt": "Find the bug: this program should use the central difference, but it uses the forward difference.",
              "buggyCode": "f = lambda x: x * x\nx, eps = 3.0, 0.001\nprint((f(x + eps) - f(x)) / eps)",
              "fixedCode": "f = lambda x: x * x\nx, eps = 3.0, 0.001\nprint((f(x + eps) - f(x - eps)) / (2 * eps))",
              "explanation": "The central difference subtracts f(x - eps) and divides by two eps, which cancels the first-order error."
            },
            "exercise": {
              "title": "Check your understanding: gradient checking",
              "type": "multiple-choice",
              "instructions": "Which statement about gradient checking is correct?",
              "starterCode": "",
              "solution": "Gradient checking compares the analytic gradient with a numerical one from the central difference, and agreement to several decimals means the backprop is right.",
              "solutionExplanation": "Gradient checking compares the analytic gradient with a numerical one from the central difference, and agreement to several decimals means the backprop is right. The other options contradict the lesson.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Gradient checking compares the analytic gradient with a numerical one from the central difference, and agreement to several decimals means the backprop is right.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Check your understanding: gradient checking from the lesson: which statement is actually true?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true in general."
              },
              "options": [
                "Gradient checking replaces backprop during training because it is faster.",
                "Gradient checking uses a forward difference with a large step for accuracy.",
                "Gradient checking compares the analytic gradient with a numerical one from the central difference, and agreement to several decimals means the backprop is right.",
                "Gradient checking is only used on models with millions of parameters."
              ],
              "answerIndex": 2
            }
          },
          {
            "id": "backpropagation-scratch-m2-l4",
            "slug": "backpropagation-scratch-m2-l4",
            "title": "Vanishing and Exploding Gradients",
            "concept": "Gradients are multiplied layer by layer on the way back, so in a deep network they can shrink toward zero or blow up exponentially. Sigmoid activations and bad initialisation make vanishing worse, while large weights make exploding worse. ReLU, careful initialisation and normalisation keep gradients in a healthy range.",
            "syntax": "gradients multiply across layers: they can vanish or explode",
            "exampleCode": "print('ten layers of 0.5 multiply the gradient by about 0.001')",
            "exampleLanguage": "python",
            "mistake": "Adding more layers to fix a vanishing gradient, which makes it worse.",
            "bug": {
              "prompt": "Find the bug: this program should show the gradient shrinking, but it shows it growing.",
              "buggyCode": "grad = 1.0\nfor _ in range(10):\n    grad *= 2.0\nprint(grad)",
              "fixedCode": "grad = 1.0\nfor _ in range(10):\n    grad *= 0.5\nprint(grad)",
              "explanation": "Multiplying by one half ten times shrinks the gradient toward zero; multiplying by two grows it."
            },
            "exercise": {
              "title": "Gradient after n layers",
              "type": "write-code",
              "instructions": "Read the initial gradient, the per-layer factor and the number of layers on one line, and print the gradient after n layers with four decimal places.",
              "starterCode": "import sys\n\n# TODO: read grad, factor and n, print the scaled gradient\n",
              "solution": "import sys\ngrad, factor, n = [float(v) for v in sys.stdin.read().split()]\nprint(f\"{grad * factor ** int(n):.4f}\")",
              "solutionExplanation": "Multiply the gradient by the per-layer factor raised to the number of layers.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "1 0.5 10",
                  "expectedStdout": "0.0010\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "1 2 5",
                  "expectedStdout": "32.0000\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Gradient after n layers from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "backpropagation-scratch-m2-l5",
            "slug": "backpropagation-scratch-m2-l5",
            "title": "Backprop in a Two-Layer Network",
            "concept": "A two-layer network chains everything together: the output gradient flows into the second layer's weights, then through the activation into the first layer's weights. Each step is one of the small local rules from earlier lessons. Working one tiny network by hand is the best way to make backprop concrete.",
            "syntax": "output gradient -> layer 2 weights -> activation -> layer 1 weights",
            "exampleCode": "print('dL/dw2, then dL/dh, then dL/dw1: one chain, three steps')",
            "exampleLanguage": "python",
            "mistake": "Stopping the backward pass at the hidden layer and never updating the first layer.",
            "bug": {
              "prompt": "Find the bug: this program should pass the gradient through the sigmoid, but it passes it unchanged.",
              "buggyCode": "h = 0.6225\ndLdh = 0.5\nprint(dLdh)",
              "fixedCode": "h = 0.6225\ndLdh = 0.5\nprint(dLdh * h * (1 - h))",
              "explanation": "The hidden gradient must be multiplied by the sigmoid derivative h times one minus h."
            },
            "exercise": {
              "title": "Gradients of a tiny two-layer network",
              "type": "write-code",
              "instructions": "Read x, w1, w2 and target t on one line for a network h = sigmoid(w1*x), y = w2*h, with loss 0.5*(y - t)^2. Print dL/dw1 and dL/dw2 with four decimal places, separated by a space.",
              "starterCode": "import sys, math\n\n# TODO: read x, w1, w2, t and print the two gradients\n",
              "solution": "import sys, math\nx, w1, w2, t = [float(v) for v in sys.stdin.read().split()]\nh = 1 / (1 + math.exp(-w1 * x))\ny = w2 * h\ndLdy = y - t\ndLdw2 = dLdy * h\ndLdh = dLdy * w2\ndLdz1 = dLdh * h * (1 - h)\ndLdw1 = dLdz1 * x\nprint(f\"{dLdw1:.4f} {dLdw2:.4f}\")",
              "solutionExplanation": "Chain the gradients back: output, then the second weight, then the hidden unit, then the first weight.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "1 0.5 2 1",
                  "expectedStdout": "0.1151 0.1525\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "2 0.5 1 0.5",
                  "expectedStdout": "0.0909 0.1689\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Gradients of a tiny two-layer network from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Backprop through a linear layer and sigmoid",
      "type": "write-code",
      "instructions": "Read x, w, b and target t on one line for z = w*x + b, p = sigmoid(z), with loss 0.5*(p - t)^2. Print dL/dw and dL/db with four decimal places, separated by a space.",
      "starterCode": "import sys, math\n\n# TODO: read x, w, b, t and print the two gradients\n",
      "solution": "import sys, math\nx, w, b, t = [float(v) for v in sys.stdin.read().split()]\nz = w * x + b\np = 1 / (1 + math.exp(-z))\ndLdz = (p - t) * p * (1 - p)\nprint(f\"{dLdz * x:.4f} {dLdz:.4f}\")",
      "solutionExplanation": "The sigmoid derivative is p times one minus p, and the loss derivative is p minus t.",
      "tests": [
        {
          "name": "Visible test",
          "stdin": "1 0.5 0 1",
          "expectedStdout": "-0.0887 -0.0887\n",
          "hidden": false
        },
        {
          "name": "Hidden test",
          "stdin": "2 1 0 0",
          "expectedStdout": "0.1850 0.0925\n",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "Recall the core idea of Backprop through a linear layer and sigmoid from the lesson: what quantity must the program compute?",
        "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
        "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
      }
    },
    "capstone": {
      "title": "Backpropagation Capstone",
      "description": "Build a complete backward pass in pure Python: differentiate a linear layer followed by a sigmoid.",
      "requirements": [
        "Read an input, a weight, a bias and a target.",
        "Run the forward pass through the linear layer and the sigmoid.",
        "Apply the chain rule to get the gradients of the loss.",
        "Print dL/dw and dL/db with four decimal places."
      ],
      "rubric": [
        "The program runs and prints the correct gradients for both test inputs.",
        "The sigmoid derivative uses p times one minus p.",
        "The loss derivative is the prediction minus the target.",
        "The weight gradient multiplies by the input; the bias gradient does not."
      ]
    }
  },
  {
    "id": "mlp-neural-networks-scratch",
    "slug": "mlp-neural-networks-scratch",
    "language": "python",
    "category": "data-ai",
    "title": "MLPs — Neural Networks from Scratch",
    "description": "Build and train multilayer perceptrons in pure Python: perceptrons, activations, forward passes, initialisation, dropout and tuning.",
    "difficulty": "Advanced",
    "estimatedHours": 20,
    "skills": [
      "Perceptrons",
      "Activation functions",
      "MLP forward pass",
      "Weight initialisation",
      "Dropout",
      "Early stopping",
      "Hyperparameter tuning",
      "Training MLPs"
    ],
    "prerequisites": [
      "backpropagation-scratch"
    ],
    "analogy": "Learning {topic} is like learning to run a relay race: each layer passes its baton to the next, and the whole team only wins if every handoff works.",
    "modules": [
      {
        "id": "mlp-neural-networks-scratch-m1",
        "title": "MLPs — Neural Networks from Scratch Foundations",
        "level": "intermediate",
        "lessons": [
          {
            "id": "mlp-neural-networks-scratch-m1-l1",
            "slug": "mlp-neural-networks-scratch-m1-l1",
            "title": "Perceptrons and Linear Separability",
            "concept": "A perceptron computes a weighted sum plus a bias and fires one when the sum is at least zero, drawing a straight decision boundary. It can only separate data that is linearly separable, so it fails on problems like XOR where no single line works. Stacking perceptrons into layers is what overcomes this limit.",
            "syntax": "perceptron: output 1 when w.x + b >= 0, else 0",
            "exampleCode": "w, b, x = [1.0, -1.0], 0.5, [2.0, 1.0]\nprint(1 if sum(a * b for a, b in zip(w, x)) + b >= 0 else 0)",
            "exampleLanguage": "python",
            "mistake": "Expecting a single perceptron to solve XOR.",
            "bug": {
              "prompt": "Find the bug: this program should print 1, but it prints 0.",
              "buggyCode": "w, b, x = [1.0, -1.0], 0.5, [2.0, 1.0]\nprint(1 if sum(a * b for a, b in zip(w, x)) + b > 2 else 0)",
              "fixedCode": "w, b, x = [1.0, -1.0], 0.5, [2.0, 1.0]\nprint(1 if sum(a * b for a, b in zip(w, x)) + b >= 0 else 0)",
              "explanation": "The perceptron fires when the weighted sum plus bias reaches zero, not when it exceeds two."
            },
            "exercise": {
              "title": "Perceptron output",
              "type": "write-code",
              "instructions": "Read weights on the first line, the bias on the second line, and the input on the third line. Print 1 if the weighted sum plus bias is at least zero, else 0.",
              "starterCode": "import sys\n\n# TODO: read weights, bias and input, print the perceptron output\n",
              "solution": "import sys\nlines = sys.stdin.read().strip().splitlines()\nw = [float(v) for v in lines[0].split()]\nb = float(lines[1])\nx = [float(v) for v in lines[2].split()]\nprint(1 if sum(a * c for a, c in zip(w, x)) + b >= 0 else 0)",
              "solutionExplanation": "Compute the weighted sum, add the bias, and threshold at zero.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "1 -1\n0.5\n2 1",
                  "expectedStdout": "1\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "1 -1\n0.5\n0 2",
                  "expectedStdout": "0\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Perceptron output from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "mlp-neural-networks-scratch-m1-l2",
            "slug": "mlp-neural-networks-scratch-m1-l2",
            "title": "Activation Functions: Sigmoid, Tanh, ReLU",
            "concept": "Activations add the nonlinearity that lets networks fit curves: sigmoid squashes to zero-one, tanh to minus-one-one, and ReLU passes positive values through and zeroes negatives. ReLU is the modern default for hidden layers because its gradient does not vanish for positive inputs. Without activations, a deep network is just a linear model.",
            "syntax": "ReLU(x) = max(0, x); sigmoid and tanh squash smoothly",
            "exampleCode": "xs = [-2.0, 0.0, 3.0]\nprint([max(0, x) for x in xs])",
            "exampleLanguage": "python",
            "mistake": "Using a sigmoid in a deep hidden layer and wondering why training stalls.",
            "bug": {
              "prompt": "Find the bug: this program should print [0.0, 0.0, 3.0], but it prints [-2.0, 0.0, 3.0].",
              "buggyCode": "xs = [-2.0, 0.0, 3.0]\nprint(xs)",
              "fixedCode": "xs = [-2.0, 0.0, 3.0]\nprint([max(0, x) for x in xs])",
              "explanation": "ReLU replaces every negative value with zero and leaves the rest unchanged."
            },
            "exercise": {
              "title": "ReLU activation",
              "type": "write-code",
              "instructions": "Read a line of numbers and print the ReLU of each with four decimal places, space-separated.",
              "starterCode": "import sys\n\n# TODO: read numbers and print their ReLU values\n",
              "solution": "import sys\nxs = [float(v) for v in sys.stdin.read().split()]\nprint(\" \".join(f\"{max(0, x):.4f}\" for x in xs))",
              "solutionExplanation": "Each output is the maximum of zero and the input.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "-2 0 3",
                  "expectedStdout": "0.0000 0.0000 3.0000\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "-1 2",
                  "expectedStdout": "0.0000 2.0000\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of ReLU activation from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "mlp-neural-networks-scratch-m1-l3",
            "slug": "mlp-neural-networks-scratch-m1-l3",
            "title": "Building an MLP Forward Pass",
            "concept": "An MLP forward pass applies a linear layer, then an activation, then the next linear layer, until the output. Each hidden unit is a weighted sum of the previous layer passed through an activation. The shapes must line up: the weight matrix of a layer has one row per output unit and one column per input.",
            "syntax": "hidden = activation(W1 x + b1); out = W2 hidden + b2",
            "exampleCode": "import math\nx = [1.0, 2.0]\nW1 = [[0.5, 0.2], [0.3, 0.4]]\nh = [1 / (1 + math.exp(-sum(a * b for a, b in zip(row, x)))) for row in W1]\nprint(sum(a * b for a, b in zip([1.0, 2.0], h)))",
            "exampleLanguage": "python",
            "mistake": "Forgetting the activation between layers, which collapses the network to a linear model.",
            "bug": {
              "prompt": "Find the bug: this program should apply the sigmoid to the hidden units, but it skips it.",
              "buggyCode": "import math\nx = [1.0, 2.0]\nW1 = [[0.5, 0.2], [0.3, 0.4]]\nh = [sum(a * b for a, b in zip(row, x)) for row in W1]\nprint(h)",
              "fixedCode": "import math\nx = [1.0, 2.0]\nW1 = [[0.5, 0.2], [0.3, 0.4]]\nh = [1 / (1 + math.exp(-sum(a * b for a, b in zip(row, x)))) for row in W1]\nprint(h)",
              "explanation": "The hidden units pass through the sigmoid; without it the network is a single linear layer."
            },
            "exercise": {
              "title": "Check your understanding: MLP forward pass",
              "type": "multiple-choice",
              "instructions": "Which statement about an MLP forward pass is correct?",
              "starterCode": "",
              "solution": "Each layer applies a linear transformation followed by a nonlinear activation, feeding the next layer.",
              "solutionExplanation": "Each layer applies a linear transformation followed by a nonlinear activation, feeding the next layer. The other options contradict the lesson.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Each layer applies a linear transformation followed by a nonlinear activation, feeding the next layer.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Check your understanding: MLP forward pass from the lesson: which statement is actually true?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true in general."
              },
              "options": [
                "An MLP applies only one linear transformation, whatever its depth.",
                "Activations are optional and change nothing about what the network can learn.",
                "The output layer always uses a sigmoid, even for regression.",
                "Each layer applies a linear transformation followed by a nonlinear activation, feeding the next layer."
              ],
              "answerIndex": 3
            }
          },
          {
            "id": "mlp-neural-networks-scratch-m1-l4",
            "slug": "mlp-neural-networks-scratch-m1-l4",
            "title": "Training an MLP with Backprop",
            "concept": "Training an MLP runs the forward pass, computes the loss, backpropagates the gradients to every weight, and steps the weights with an optimiser. The gradients for early layers pass through every later layer, which is why they can vanish. Training is judged on a validation set, not on the training loss alone.",
            "syntax": "forward, loss, backward, step; repeat",
            "exampleCode": "print('one epoch: forward, loss, backward, update, then check validation')",
            "exampleLanguage": "python",
            "mistake": "Training until the training loss is zero and calling the model done.",
            "bug": {
              "prompt": "Find the bug: this program should update the weight with the gradient, but it leaves the weight unchanged.",
              "buggyCode": "w, lr, grad = 1.0, 0.1, 0.5\nprint(w)",
              "fixedCode": "w, lr, grad = 1.0, 0.1, 0.5\nprint(w - lr * grad)",
              "explanation": "The update subtracts the learning rate times the gradient; printing the weight unchanged means no learning happened."
            },
            "exercise": {
              "title": "MLP forward pass, two hidden units",
              "type": "write-code",
              "instructions": "Read the input on the first line (two numbers), the first weight matrix on the second line (four numbers, row by row), and the output weights on the third line (two numbers). Hidden units use the sigmoid; the output is a plain weighted sum. Print the output with four decimal places.",
              "starterCode": "import sys, math\n\n# TODO: read the input and weights, run the forward pass\n",
              "solution": "import sys, math\nlines = sys.stdin.read().strip().splitlines()\nx = [float(v) for v in lines[0].split()]\nw1 = [float(v) for v in lines[1].split()]\nW1 = [w1[0:2], w1[2:4]]\nw2 = [float(v) for v in lines[2].split()]\nh = [1 / (1 + math.exp(-sum(a * b for a, b in zip(row, x)))) for row in W1]\nprint(f\"{sum(a * b for a, b in zip(w2, h)):.4f}\")",
              "solutionExplanation": "Each hidden unit is the sigmoid of its row dot product with the input; the output weights them.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "1 2\n0.5 0.2 0.3 0.4\n1 2",
                  "expectedStdout": "2.2115\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "0 1\n0.5 0.2 0.3 0.4\n1 2",
                  "expectedStdout": "1.7472\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of MLP forward pass, two hidden units from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "mlp-neural-networks-scratch-m1-l5",
            "slug": "mlp-neural-networks-scratch-m1-l5",
            "title": "Weight Initialisation",
            "concept": "Weights must start small but not too small: zeros make every unit identical, huge values saturate activations, and the right scale keeps signals flowing. Xavier initialisation draws weights with variance two over fan-in plus fan-out for sigmoid and tanh, and He initialisation uses two over fan-in for ReLU. Good initialisation is often the difference between training and not training.",
            "syntax": "Xavier limit = sqrt(6 / (fan_in + fan_out))",
            "exampleCode": "import math\nprint(math.sqrt(6 / (4 + 3)))",
            "exampleLanguage": "python",
            "mistake": "Initialising all weights to zero, so every hidden unit learns the same thing.",
            "bug": {
              "prompt": "Find the bug: this program should compute the Xavier limit, but it divides by the wrong sum.",
              "buggyCode": "import math\nprint(math.sqrt(6 / (4 * 3)))",
              "fixedCode": "import math\nprint(math.sqrt(6 / (4 + 3)))",
              "explanation": "The Xavier limit uses the sum of fan-in and fan-out in the denominator, not their product."
            },
            "exercise": {
              "title": "Check your understanding: weight initialisation",
              "type": "multiple-choice",
              "instructions": "Which statement about weight initialisation is correct?",
              "starterCode": "",
              "solution": "Weights must start at a small random scale matched to the layer size, or signals vanish or explode.",
              "solutionExplanation": "Weights must start at a small random scale matched to the layer size, or signals vanish or explode. The other options contradict the lesson.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Weights must start at a small random scale matched to the layer size, or signals vanish or explode.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Check your understanding: weight initialisation from the lesson: which statement is actually true?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true in general."
              },
              "options": [
                "Weights must start at a small random scale matched to the layer size, or signals vanish or explode.",
                "All weights should start at exactly zero for symmetry.",
                "Initialisation does not matter because training fixes any start.",
                "Weights should always start as large as possible."
              ],
              "answerIndex": 0
            }
          }
        ]
      },
      {
        "id": "mlp-neural-networks-scratch-m2",
        "title": "MLPs — Neural Networks from Scratch in Depth",
        "level": "advanced",
        "lessons": [
          {
            "id": "mlp-neural-networks-scratch-m2-l1",
            "slug": "mlp-neural-networks-scratch-m2-l1",
            "title": "Overfitting in Neural Networks",
            "concept": "A large MLP can memorise its training set, reaching near-perfect training accuracy while failing on new data. The gap between training and validation accuracy is the warning sign. More data, smaller models, weight decay, dropout and early stopping all fight overfitting.",
            "syntax": "big network + small data = memorisation",
            "exampleCode": "train_acc, val_acc = 0.99, 0.61\nprint(f'gap: {train_acc - val_acc:.2f}')",
            "exampleLanguage": "python",
            "mistake": "Adding more hidden units to fix a large train-validation gap.",
            "bug": {
              "prompt": "Find the bug: this program should print the gap 0.38, but it prints -0.38.",
              "buggyCode": "train_acc, val_acc = 0.99, 0.61\nprint(f'{val_acc - train_acc:.2f}')",
              "fixedCode": "train_acc, val_acc = 0.99, 0.61\nprint(f'{train_acc - val_acc:.2f}')",
              "explanation": "The overfitting gap is training accuracy minus validation accuracy."
            },
            "exercise": {
              "title": "Xavier initialisation limit",
              "type": "write-code",
              "instructions": "Read fan-in and fan-out on one line, and print the Xavier limit sqrt(6 / (fan_in + fan_out)) with four decimal places.",
              "starterCode": "import sys, math\n\n# TODO: read fan-in and fan-out, print the Xavier limit\n",
              "solution": "import sys, math\nfan_in, fan_out = [float(v) for v in sys.stdin.read().split()]\nprint(f\"{math.sqrt(6 / (fan_in + fan_out)):.4f}\")",
              "solutionExplanation": "Divide six by the sum of fan-in and fan-out, then take the square root.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "4 3",
                  "expectedStdout": "0.9258\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "2 2",
                  "expectedStdout": "1.2247\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Xavier initialisation limit from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "mlp-neural-networks-scratch-m2-l2",
            "slug": "mlp-neural-networks-scratch-m2-l2",
            "title": "Dropout",
            "concept": "Dropout randomly zeroes a fraction of hidden units during training, so the network cannot rely on any single unit and must learn redundant representations. At test time all units are used, with their outputs scaled to match the training-time expectation. Dropout is a cheap and effective regulariser.",
            "syntax": "training: drop units at random; test: use all, scaled",
            "exampleCode": "acts = [2.0, 4.0, 6.0]\nmask = [1, 0, 1]\nprint([a * m / 0.5 for a, m in zip(acts, mask)])",
            "exampleLanguage": "python",
            "mistake": "Applying dropout at test time, which makes predictions randomly worse.",
            "bug": {
              "prompt": "Find the bug: this program should scale the kept units by one over the keep probability, but it does not scale them.",
              "buggyCode": "acts = [2.0, 4.0, 6.0]\nmask = [1, 0, 1]\nprint([a * m for a, m in zip(acts, mask)])",
              "fixedCode": "acts = [2.0, 4.0, 6.0]\nmask = [1, 0, 1]\nprint([a * m / 0.5 for a, m in zip(acts, mask)])",
              "explanation": "Kept units are divided by the keep probability so their expected size stays the same during training."
            },
            "exercise": {
              "title": "Apply a dropout mask",
              "type": "write-code",
              "instructions": "Read activations on the first line, a 0/1 mask on the second line, and the keep probability on the third line. Print the dropped-out activations (masked, divided by the keep probability) with four decimal places, space-separated.",
              "starterCode": "import sys\n\n# TODO: read activations, mask and keep probability, apply dropout\n",
              "solution": "import sys\nlines = sys.stdin.read().strip().splitlines()\nacts = [float(v) for v in lines[0].split()]\nmask = [int(v) for v in lines[1].split()]\nkeep = float(lines[2])\nprint(\" \".join(f\"{a * m / keep:.4f}\" for a, m in zip(acts, mask)))",
              "solutionExplanation": "Multiply each activation by its mask entry, then divide by the keep probability.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "2 4 6\n1 0 1\n0.5",
                  "expectedStdout": "4.0000 0.0000 12.0000\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "1 2\n0 1\n0.5",
                  "expectedStdout": "0.0000 4.0000\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Apply a dropout mask from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "mlp-neural-networks-scratch-m2-l3",
            "slug": "mlp-neural-networks-scratch-m2-l3",
            "title": "Early Stopping and Validation",
            "concept": "Early stopping watches the validation loss during training and stops when it stops improving, keeping the best weights seen so far. It is the simplest regulariser and costs nothing but a validation split. The best epoch is the one with the lowest validation loss, not the last epoch.",
            "syntax": "stop when validation loss stops improving; keep the best weights",
            "exampleCode": "losses = [0.5, 0.4, 0.35, 0.38, 0.42]\nprint(losses.index(min(losses)) + 1)",
            "exampleLanguage": "python",
            "mistake": "Picking the last epoch as the best because training ran longest.",
            "bug": {
              "prompt": "Find the bug: this program should find the best epoch, but it returns the worst one.",
              "buggyCode": "losses = [0.5, 0.4, 0.35, 0.38, 0.42]\nprint(losses.index(max(losses)) + 1)",
              "fixedCode": "losses = [0.5, 0.4, 0.35, 0.38, 0.42]\nprint(losses.index(min(losses)) + 1)",
              "explanation": "The best epoch has the lowest validation loss, so the search must use min, not max."
            },
            "exercise": {
              "title": "Check your understanding: early stopping",
              "type": "multiple-choice",
              "instructions": "Which statement about early stopping is correct?",
              "starterCode": "",
              "solution": "Training stops when the validation loss stops improving, and the best weights seen so far are kept.",
              "solutionExplanation": "Training stops when the validation loss stops improving, and the best weights seen so far are kept. The other options contradict the lesson.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Training stops when the validation loss stops improving, and the best weights seen so far are kept.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Check your understanding: early stopping from the lesson: which statement is actually true?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true in general."
              },
              "options": [
                "Training should always run for a fixed number of epochs, whatever the validation loss does.",
                "Training stops when the validation loss stops improving, and the best weights seen so far are kept.",
                "Early stopping keeps the weights from the final epoch, not the best one.",
                "Early stopping is decided by the training loss, never the validation loss."
              ],
              "answerIndex": 1
            }
          },
          {
            "id": "mlp-neural-networks-scratch-m2-l4",
            "slug": "mlp-neural-networks-scratch-m2-l4",
            "title": "Hyperparameter Tuning for MLPs",
            "concept": "Hyperparameters like the learning rate, hidden size, batch size and dropout rate are chosen by search, not by theory. Random search over a few dozen trials usually beats a careful grid, because only a few hyperparameters matter much. Every trial is judged on the validation set, and the test set is touched once at the end.",
            "syntax": "random search over hyperparameters, judged on validation data",
            "exampleCode": "print('try a few dozen random settings; keep the best on validation')",
            "exampleLanguage": "python",
            "mistake": "Tuning hyperparameters on the test set and reporting the best test score.",
            "bug": {
              "prompt": "Find the bug: this program should pick the best validation score, but it picks the worst.",
              "buggyCode": "scores = [0.7, 0.85, 0.8]\nprint(min(scores))",
              "fixedCode": "scores = [0.7, 0.85, 0.8]\nprint(max(scores))",
              "explanation": "The best hyperparameter setting has the highest validation score, so the choice must use max."
            },
            "exercise": {
              "title": "Best epoch from validation losses",
              "type": "write-code",
              "instructions": "Read a line of validation losses, one per epoch, and print the best epoch number (1-based, lowest loss) as an integer.",
              "starterCode": "import sys\n\n# TODO: read the losses and print the best epoch\n",
              "solution": "import sys\nlosses = [float(v) for v in sys.stdin.read().split()]\nprint(losses.index(min(losses)) + 1)",
              "solutionExplanation": "Find the smallest loss and report its position, counting epochs from one.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "0.5 0.4 0.35 0.38 0.42",
                  "expectedStdout": "3\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "0.9 0.8 0.85",
                  "expectedStdout": "2\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Best epoch from validation losses from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "mlp-neural-networks-scratch-m2-l5",
            "slug": "mlp-neural-networks-scratch-m2-l5",
            "title": "MLPs on a Real Dataset",
            "concept": "A real MLP pipeline standardises the features, splits the data, trains with mini-batches, and reports test accuracy. Small tabular datasets like the iris flowers are a good first target: four features, three classes, and a network with one hidden layer already does well. The same pipeline scales to much bigger problems.",
            "syntax": "standardise, split, train, evaluate",
            "exampleCode": "print('iris: 4 features, 3 classes, one hidden layer is enough')",
            "exampleLanguage": "python",
            "mistake": "Feeding raw unscaled features into an MLP and expecting fast convergence.",
            "bug": {
              "prompt": "Find the bug: this program should standardise the feature, but it uses the raw value.",
              "buggyCode": "x, mean, std = 5.1, 5.8, 0.8\nprint(x)",
              "fixedCode": "x, mean, std = 5.1, 5.8, 0.8\nprint((x - mean) / std)",
              "explanation": "Standardising subtracts the mean and divides by the standard deviation; the raw value keeps the wrong scale."
            },
            "exercise": {
              "title": "MLP forward pass on new data",
              "type": "write-code",
              "instructions": "Read the input on the first line (two numbers), the first weight matrix on the second line (four numbers, row by row), and the output weights on the third line (two numbers). Hidden units use the sigmoid; the output is a plain weighted sum. Print the output with four decimal places.",
              "starterCode": "import sys, math\n\n# TODO: read the input and weights, run the forward pass\n",
              "solution": "import sys, math\nlines = sys.stdin.read().strip().splitlines()\nx = [float(v) for v in lines[0].split()]\nw1 = [float(v) for v in lines[1].split()]\nW1 = [w1[0:2], w1[2:4]]\nw2 = [float(v) for v in lines[2].split()]\nh = [1 / (1 + math.exp(-sum(a * b for a, b in zip(row, x)))) for row in W1]\nprint(f\"{sum(a * b for a, b in zip(w2, h)):.4f}\")",
              "solutionExplanation": "Each hidden unit is the sigmoid of its row dot product with the input; the output weights them.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "0.5 -0.5\n1 0 0 1\n2 1",
                  "expectedStdout": "1.6225\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "1 1\n1 0 0 1\n2 1",
                  "expectedStdout": "2.1932\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of MLP forward pass on new data from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "MLP forward pass with hidden activations",
      "type": "write-code",
      "instructions": "Read the input on the first line (two numbers), the first weight matrix on the second line (four numbers, row by row), and the output weights on the third line (two numbers). Print the two hidden activations on the first line and the output on the second line, each with four decimal places.",
      "starterCode": "import sys, math\n\n# TODO: run the forward pass and print hidden units and output\n",
      "solution": "import sys, math\nlines = sys.stdin.read().strip().splitlines()\nx = [float(v) for v in lines[0].split()]\nw1 = [float(v) for v in lines[1].split()]\nW1 = [w1[0:2], w1[2:4]]\nw2 = [float(v) for v in lines[2].split()]\nh = [1 / (1 + math.exp(-sum(a * b for a, b in zip(row, x)))) for row in W1]\nprint(\" \".join(f\"{v:.4f}\" for v in h))\nprint(f\"{sum(a * b for a, b in zip(w2, h)):.4f}\")",
      "solutionExplanation": "The hidden units are sigmoids of the row dot products, and the output is their weighted sum.",
      "tests": [
        {
          "name": "Visible test",
          "stdin": "1 2\n0.5 0.2 0.3 0.4\n1 2",
          "expectedStdout": "0.7109 0.7503\n2.2115\n",
          "hidden": false
        },
        {
          "name": "Hidden test",
          "stdin": "0 1\n0.5 0.2 0.3 0.4\n1 2",
          "expectedStdout": "0.5498 0.5987\n1.7472\n",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "Recall the core idea of MLP forward pass with hidden activations from the lesson: what quantity must the program compute?",
        "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
        "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
      }
    },
    "capstone": {
      "title": "MLP Capstone",
      "description": "Build a complete MLP forward pass in pure Python: linear layer, sigmoid hidden units, and a linear output.",
      "requirements": [
        "Read an input, a first-layer weight matrix and output weights.",
        "Compute the two hidden activations with the sigmoid.",
        "Compute the output as a weighted sum of the hidden units.",
        "Print the hidden activations and the output."
      ],
      "rubric": [
        "The program runs and prints the correct hidden units and output for both test inputs.",
        "Hidden units pass through the sigmoid, not a plain linear sum.",
        "Each hidden unit uses its own row of the weight matrix.",
        "The output is the weighted sum of the hidden activations."
      ]
    }
  },
  {
    "id": "cnn-convolutions-scratch",
    "slug": "cnn-convolutions-scratch",
    "language": "python",
    "category": "data-ai",
    "title": "CNNs — Convolutions from Scratch",
    "description": "See images as numbers in pure Python: convolution, padding, pooling, small CNN forward passes, and transfer learning.",
    "difficulty": "Advanced",
    "estimatedHours": 20,
    "skills": [
      "Image grids",
      "Convolution",
      "Padding and stride",
      "Feature maps",
      "Max pooling",
      "CNN forward pass",
      "Data augmentation",
      "Transfer learning"
    ],
    "prerequisites": [
      "mlp-neural-networks-scratch"
    ],
    "analogy": "Learning {topic} is like learning to read a picture through a small moving window: each glance catches one pattern, and together they reveal the scene.",
    "modules": [
      {
        "id": "cnn-convolutions-scratch-m1",
        "title": "CNNs — Convolutions from Scratch Foundations",
        "level": "intermediate",
        "lessons": [
          {
            "id": "cnn-convolutions-scratch-m1-l1",
            "slug": "cnn-convolutions-scratch-m1-l1",
            "title": "Images as Grids of Numbers",
            "concept": "A greyscale image is a grid of numbers from zero for black to 255 for white, and a colour image is three such grids, one per channel. Normalising pixels by dividing by 255 puts them in the range zero to one, which keeps gradients healthy. Every image operation in deep learning starts from this grid view.",
            "syntax": "pixel in [0, 255]; normalised = pixel / 255",
            "exampleCode": "pixels = [0, 128, 255]\nprint([p / 255 for p in pixels])",
            "exampleLanguage": "python",
            "mistake": "Feeding raw 0-255 pixels into a network without normalising.",
            "bug": {
              "prompt": "Find the bug: this program should print normalised values up to 1.0, but it prints values up to 255.",
              "buggyCode": "pixels = [0, 128, 255]\nprint(pixels)",
              "fixedCode": "pixels = [0, 128, 255]\nprint([p / 255 for p in pixels])",
              "explanation": "Normalising divides every pixel by 255; printing the raw values skips that step."
            },
            "exercise": {
              "title": "Normalise pixel values",
              "type": "write-code",
              "instructions": "Read a line of pixel values (0-255) and print them divided by 255 with four decimal places, space-separated.",
              "starterCode": "import sys\n\n# TODO: read pixels and print them normalised\n",
              "solution": "import sys\npx = [float(v) for v in sys.stdin.read().split()]\nprint(\" \".join(f\"{p / 255:.4f}\" for p in px))",
              "solutionExplanation": "Divide each pixel by 255 to map it into the range zero to one.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "0 128 255",
                  "expectedStdout": "0.0000 0.5020 1.0000\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "64 192",
                  "expectedStdout": "0.2510 0.7529\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Normalise pixel values from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "cnn-convolutions-scratch-m1-l2",
            "slug": "cnn-convolutions-scratch-m1-l2",
            "title": "Convolution: Sliding a Kernel",
            "concept": "Convolution slides a small kernel over the image and, at each position, takes the dot product of the kernel with the patch underneath. The result is a feature map that lights up where the image matches the kernel's pattern. A 3 by 3 image with a 2 by 2 kernel produces a 2 by 2 feature map.",
            "syntax": "feature_map[i][j] = sum of kernel * patch",
            "exampleCode": "img = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]\nk = [[1, 0], [0, 1]]\nprint([[sum(k[a][b] * img[i + a][j + b] for a in range(2) for b in range(2)) for j in range(2)] for i in range(2)])",
            "exampleLanguage": "python",
            "mistake": "Flipping the kernel when the lesson's convention does not flip it, which mirrors the output.",
            "bug": {
              "prompt": "Find the bug: this program should print 6 for the top-left output, but it prints 8.",
              "buggyCode": "img = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]\nk = [[1, 0], [0, 1]]\nprint(k[0][0] * img[0][1] + k[1][1] * img[1][0])",
              "fixedCode": "img = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]\nk = [[1, 0], [0, 1]]\nprint(k[0][0] * img[0][0] + k[1][1] * img[1][1])",
              "explanation": "The top-left output pairs the kernel with the top-left patch, img[0][0] and img[1][1], not the shifted entries."
            },
            "exercise": {
              "title": "2x2 convolution on a 3x3 image",
              "type": "write-code",
              "instructions": "Read nine image numbers on the first line (row by row) and four kernel numbers on the second line. Print the 2x2 feature map as two lines of space-separated numbers with four decimal places.",
              "starterCode": "import sys\n\n# TODO: read the image and kernel, print the feature map\n",
              "solution": "import sys\nlines = sys.stdin.read().strip().splitlines()\nimg = [float(v) for v in lines[0].split()]\nI = [img[0:3], img[3:6], img[6:9]]\nk = [float(v) for v in lines[1].split()]\nK = [k[0:2], k[2:4]]\nfor i in range(2):\n    print(\" \".join(f\"{sum(K[a][b] * I[i + a][j + b] for a in range(2) for b in range(2)):.4f}\" for j in range(2)))",
              "solutionExplanation": "At each output position, take the dot product of the kernel with the image patch underneath it.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "1 2 3 4 5 6 7 8 9\n1 0 0 1",
                  "expectedStdout": "6.0000 8.0000\n12.0000 14.0000\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "0 1 2 3 4 5 6 7 8\n1 1 1 1",
                  "expectedStdout": "8.0000 12.0000\n20.0000 24.0000\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of 2x2 convolution on a 3x3 image from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "cnn-convolutions-scratch-m1-l3",
            "slug": "cnn-convolutions-scratch-m1-l3",
            "title": "Padding and Stride",
            "concept": "Padding adds a border of zeros so the output keeps the input's size, and stride controls how far the kernel jumps between positions. The output size is the floor of (n plus twice padding minus kernel size) over stride, plus one. Same padding with stride one preserves the spatial size exactly.",
            "syntax": "out = floor((n + 2p - k) / s) + 1",
            "exampleCode": "n, k, p, s = 28, 3, 1, 1\nprint((n + 2 * p - k) // s + 1)",
            "exampleLanguage": "python",
            "mistake": "Forgetting the plus one, which reports an output one smaller than the real one.",
            "bug": {
              "prompt": "Find the bug: this program should print 28, but it prints 27.",
              "buggyCode": "n, k, p, s = 28, 3, 1, 1\nprint((n + 2 * p - k) // s)",
              "fixedCode": "n, k, p, s = 28, 3, 1, 1\nprint((n + 2 * p - k) // s + 1)",
              "explanation": "The output size formula ends with plus one; leaving it out undercounts by exactly one."
            },
            "exercise": {
              "title": "Check your understanding: padding and stride",
              "type": "multiple-choice",
              "instructions": "Which statement about padding and stride is correct?",
              "starterCode": "",
              "solution": "Padding adds a zero border that preserves size, and stride sets how far the kernel jumps between positions.",
              "solutionExplanation": "Padding adds a zero border that preserves size, and stride sets how far the kernel jumps between positions. The other options contradict the lesson.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Padding adds a zero border that preserves size, and stride sets how far the kernel jumps between positions.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Check your understanding: padding and stride from the lesson: which statement is actually true?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true in general."
              },
              "options": [
                "Padding always shrinks the output, whatever its size.",
                "Stride one means the kernel never moves at all.",
                "Padding adds a zero border that preserves size, and stride sets how far the kernel jumps between positions.",
                "The output size never depends on the kernel size."
              ],
              "answerIndex": 2
            }
          },
          {
            "id": "cnn-convolutions-scratch-m1-l4",
            "slug": "cnn-convolutions-scratch-m1-l4",
            "title": "Feature Maps and Filters",
            "concept": "Each filter produces one feature map, and a layer with 32 filters produces 32 feature maps, each detecting a different pattern. Early filters detect edges and textures, while deeper filters detect parts and objects. The number of filters is a design choice that sets the layer's capacity.",
            "syntax": "one filter -> one feature map",
            "exampleCode": "print('32 filters produce 32 feature maps')",
            "exampleLanguage": "python",
            "mistake": "Using one filter and expecting the network to detect many different patterns.",
            "bug": {
              "prompt": "Find the bug: this program should report 32 feature maps, but it reports 1.",
              "buggyCode": "filters = 32\nprint(1)",
              "fixedCode": "filters = 32\nprint(filters)",
              "explanation": "Each filter makes its own feature map, so the count of maps equals the count of filters."
            },
            "exercise": {
              "title": "Convolution output size",
              "type": "write-code",
              "instructions": "Read n, kernel size, padding and stride on one line, and print the output size as an integer.",
              "starterCode": "import sys\n\n# TODO: read n, k, p, s and print the output size\n",
              "solution": "import sys\nn, k, p, s = [int(v) for v in sys.stdin.read().split()]\nprint((n + 2 * p - k) // s + 1)",
              "solutionExplanation": "Apply the output size formula: floor of (n plus twice padding minus k) over stride, plus one.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "28 3 1 1",
                  "expectedStdout": "28\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "32 5 0 2",
                  "expectedStdout": "14\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Convolution output size from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "cnn-convolutions-scratch-m1-l5",
            "slug": "cnn-convolutions-scratch-m1-l5",
            "title": "Pooling: Max and Average",
            "concept": "Pooling downsamples a feature map by summarising each small window: max pooling keeps the strongest activation, average pooling keeps the mean. A 2 by 2 pool with stride two halves each spatial dimension. Pooling adds translation invariance, because a feature slightly shifted still wins its window.",
            "syntax": "max pool: keep the largest value in each window",
            "exampleCode": "img = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]]\nprint([[max(img[2 * i + a][2 * j + b] for a in range(2) for b in range(2)) for j in range(2)] for i in range(2)])",
            "exampleLanguage": "python",
            "mistake": "Pooling with stride one, which barely shrinks the map at all.",
            "bug": {
              "prompt": "Find the bug: this program should print [[6, 8], [14, 16]], but it prints the whole image.",
              "buggyCode": "img = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]]\nprint(img)",
              "fixedCode": "img = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]]\nprint([[max(img[2 * i + a][2 * j + b] for a in range(2) for b in range(2)) for j in range(2)] for i in range(2)])",
              "explanation": "Max pooling takes the largest value in each 2 by 2 window; printing the image skips the pooling entirely."
            },
            "exercise": {
              "title": "Check your understanding: pooling",
              "type": "multiple-choice",
              "instructions": "Which statement about max pooling is correct?",
              "starterCode": "",
              "solution": "Max pooling keeps the largest activation in each window, which downsamples the map and adds translation invariance.",
              "solutionExplanation": "Max pooling keeps the largest activation in each window, which downsamples the map and adds translation invariance. The other options contradict the lesson.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Max pooling keeps the largest activation in each window, which downsamples the map and adds translation invariance.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Check your understanding: pooling from the lesson: which statement is actually true?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true in general."
              },
              "options": [
                "Max pooling increases the size of the feature map.",
                "Max pooling keeps the smallest activation in each window.",
                "Pooling is only used on the input image, never on feature maps.",
                "Max pooling keeps the largest activation in each window, which downsamples the map and adds translation invariance."
              ],
              "answerIndex": 3
            }
          }
        ]
      },
      {
        "id": "cnn-convolutions-scratch-m2",
        "title": "CNNs — Convolutions from Scratch in Depth",
        "level": "advanced",
        "lessons": [
          {
            "id": "cnn-convolutions-scratch-m2-l1",
            "slug": "cnn-convolutions-scratch-m2-l1",
            "title": "Backprop Through Convolution",
            "concept": "Backprop through a convolution flips the kernel and convolves the incoming gradient to get the input gradient, and the weight gradient is the convolution of the input with the incoming gradient. Pooling routes the gradient only to the winning position in max pooling. The same sliding-window idea runs backwards.",
            "syntax": "input gradient: convolve the error with the flipped kernel",
            "exampleCode": "print('max pooling sends the gradient only to the winning position')",
            "exampleLanguage": "python",
            "mistake": "Sending the pooling gradient to every position in the window instead of only the max.",
            "bug": {
              "prompt": "Find the bug: this program should route the gradient to the max position only, but it spreads it everywhere.",
              "buggyCode": "window = [1, 6, 3, 4]\ngrad = 2.0\nprint([grad for _ in window])",
              "fixedCode": "window = [1, 6, 3, 4]\ngrad = 2.0\nprint([grad if v == max(window) else 0 for v in window])",
              "explanation": "Max pooling backprop gives the whole gradient to the position that was largest in the forward pass, and zero to the rest."
            },
            "exercise": {
              "title": "2x2 max pooling on a 4x4 image",
              "type": "write-code",
              "instructions": "Read sixteen image numbers row by row on one line, and print the 2x2 max-pooled result as two lines of space-separated numbers with four decimal places.",
              "starterCode": "import sys\n\n# TODO: read the image and print the max-pooled result\n",
              "solution": "import sys\nvals = [float(v) for v in sys.stdin.read().split()]\nI = [vals[0:4], vals[4:8], vals[8:12], vals[12:16]]\nfor i in range(2):\n    print(\" \".join(f\"{max(I[2 * i + a][2 * j + b] for a in range(2) for b in range(2)):.4f}\" for j in range(2)))",
              "solutionExplanation": "Take the largest value in each non-overlapping 2 by 2 window.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16",
                  "expectedStdout": "6.0000 8.0000\n14.0000 16.0000\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1",
                  "expectedStdout": "16.0000 14.0000\n8.0000 6.0000\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of 2x2 max pooling on a 4x4 image from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "cnn-convolutions-scratch-m2-l2",
            "slug": "cnn-convolutions-scratch-m2-l2",
            "title": "Building a Small CNN Forward Pass",
            "concept": "A small CNN stacks convolution, activation, and pooling: the convolution finds patterns, ReLU keeps the positive responses, and pooling shrinks the map. The final pooled map is flattened into a vector for a dense classifier. Even a tiny CNN can learn to tell simple shapes apart.",
            "syntax": "conv -> ReLU -> pool -> flatten -> dense",
            "exampleCode": "print('convolution finds patterns, ReLU keeps positives, pooling shrinks')",
            "exampleLanguage": "python",
            "mistake": "Flattening the feature map before pooling, which throws away the spatial structure pooling needs.",
            "bug": {
              "prompt": "Find the bug: this program should apply ReLU before pooling, but it pools the raw convolution output.",
              "buggyCode": "conv = [[-1, 2], [3, -4]]\nprint(max(v for row in conv for v in row))",
              "fixedCode": "conv = [[-1, 2], [3, -4]]\nrelu = [[max(0, v) for v in row] for row in conv]\nprint(max(v for row in relu for v in row))",
              "explanation": "ReLU must run before pooling so negative responses are zeroed first; pooling the raw values keeps a negative maximum out of the picture."
            },
            "exercise": {
              "title": "Feature map size after convolution and pooling",
              "type": "write-code",
              "instructions": "Read n, kernel size, padding and stride on one line. Print the convolution output size and the size after 2x2 max pooling with stride 2, as integers separated by a space.",
              "starterCode": "import sys\n\n# TODO: read n, k, p, s and print the conv and pooled sizes\n",
              "solution": "import sys\nn, k, p, s = [int(v) for v in sys.stdin.read().split()]\nconv = (n + 2 * p - k) // s + 1\nprint(f\"{conv} {conv // 2}\")",
              "solutionExplanation": "Apply the output size formula for the convolution, then halve it for the 2 by 2 pooling.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "28 3 1 1",
                  "expectedStdout": "28 14\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "10 3 0 1",
                  "expectedStdout": "8 4\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Feature map size after convolution and pooling from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "cnn-convolutions-scratch-m2-l3",
            "slug": "cnn-convolutions-scratch-m2-l3",
            "title": "Data Augmentation for Images",
            "concept": "Data augmentation creates new training images by flipping, cropping, rotating, and shifting the originals, which teaches the network that a cat is a cat from any angle. It multiplies the effective dataset size without collecting new images. Augmentation is applied to training data only, never to the test set.",
            "syntax": "augmentation: flips, crops, rotations of training images",
            "exampleCode": "print('a flipped cat is still a cat: augmentation teaches invariance')",
            "exampleLanguage": "python",
            "mistake": "Augmenting the test set, which changes what the model is evaluated on.",
            "bug": {
              "prompt": "Find the bug: this program should count the augmented dataset size, but it forgets the originals.",
              "buggyCode": "n, copies = 100, 4\nprint(n * copies)",
              "fixedCode": "n, copies = 100, 4\nprint(n * (copies + 1))",
              "explanation": "Augmentation adds copies to the original images, so the total is the originals plus the copies, not just the copies."
            },
            "exercise": {
              "title": "Check your understanding: data augmentation",
              "type": "multiple-choice",
              "instructions": "Which statement about data augmentation is correct?",
              "starterCode": "",
              "solution": "Data augmentation creates new training images by flipping, cropping and rotating the originals, which teaches the network that an object is the same from any angle.",
              "solutionExplanation": "Data augmentation creates new training images by flipping, cropping and rotating the originals, which teaches the network that an object is the same from any angle. The other options contradict the lesson.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Data augmentation creates new training images by flipping, cropping and rotating the originals, which teaches the network that an object is the same from any angle.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Check your understanding: data augmentation from the lesson: which statement is actually true?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true in general."
              },
              "options": [
                "Data augmentation creates new training images by flipping, cropping and rotating the originals, which teaches the network that an object is the same from any angle.",
                "Data augmentation is applied to the test set so the model is evaluated on harder images.",
                "Augmentation replaces the need to collect any training images at all.",
                "A flipped image is a different class from the original, so augmentation needs new labels."
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "cnn-convolutions-scratch-m2-l4",
            "slug": "cnn-convolutions-scratch-m2-l4",
            "title": "Transfer Learning Intuition",
            "concept": "Transfer learning starts from a network trained on a huge dataset and reuses its early layers, which already detect edges and textures, while retraining only the later layers for the new task. Freezing most of the network means far fewer parameters to train and much less data needed. It is how small teams build strong image models.",
            "syntax": "reuse early layers, retrain the last layers",
            "exampleCode": "print('early layers detect edges; later layers are task-specific')",
            "exampleLanguage": "python",
            "mistake": "Retraining the whole network from scratch on a tiny dataset and expecting it to work.",
            "bug": {
              "prompt": "Find the bug: this program should report the trainable parameters, but it reports the total.",
              "buggyCode": "total, frozen = 1000000, 900000\nprint(total)",
              "fixedCode": "total, frozen = 1000000, 900000\nprint(total - frozen)",
              "explanation": "Trainable parameters are the total minus the frozen ones; reporting the total counts layers that never change."
            },
            "exercise": {
              "title": "Trainable parameters after freezing",
              "type": "write-code",
              "instructions": "Read the total parameter count and the frozen parameter count on one line. Print the trainable count as an integer and the trainable percentage with four decimal places, separated by a space.",
              "starterCode": "import sys\n\n# TODO: read total and frozen, print trainable count and percent\n",
              "solution": "import sys\ntotal, frozen = [float(v) for v in sys.stdin.read().split()]\ntrainable = total - frozen\nprint(f\"{int(trainable)} {100 * trainable / total:.4f}\")",
              "solutionExplanation": "Subtract the frozen parameters from the total, then divide by the total for the percentage.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "1000000 900000",
                  "expectedStdout": "100000 10.0000\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "500000 400000",
                  "expectedStdout": "100000 20.0000\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Trainable parameters after freezing from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "cnn-convolutions-scratch-m2-l5",
            "slug": "cnn-convolutions-scratch-m2-l5",
            "title": "CNN Architectures: From LeNet to ResNet",
            "concept": "LeNet showed that convolution plus pooling could read digits, AlexNet scaled it up with GPUs and ReLU, VGG stacked small 3 by 3 filters, and ResNet added skip connections so very deep networks could train. Each generation kept the same ingredients and changed how they are stacked. Skip connections let gradients flow past layers that would otherwise block them.",
            "syntax": "LeNet -> AlexNet -> VGG -> ResNet: deeper, with skip connections",
            "exampleCode": "print('ResNet skip connections let gradients flow through very deep networks')",
            "exampleLanguage": "python",
            "mistake": "Believing deeper is always better, even without skip connections.",
            "bug": {
              "prompt": "Find the bug: this program should say skip connections help deep networks, but it says they hurt.",
              "buggyCode": "arch = 'ResNet'\nprint('skip connections hurt training' if arch == 'ResNet' else 'skip connections help')",
              "fixedCode": "arch = 'ResNet'\nprint('skip connections help training' if arch == 'ResNet' else 'skip connections hurt')",
              "explanation": "ResNet's skip connections let gradients bypass layers, which is what makes very deep networks trainable."
            },
            "exercise": {
              "title": "Parameters of a convolution layer",
              "type": "write-code",
              "instructions": "Read the input channels, output channels and kernel size on one line, and print the number of parameters (weights plus one bias per filter) as an integer.",
              "starterCode": "import sys\n\n# TODO: read in/out channels and kernel size, print the parameter count\n",
              "solution": "import sys\ncin, cout, k = [int(v) for v in sys.stdin.read().split()]\nprint(cout * (cin * k * k + 1))",
              "solutionExplanation": "Each filter has in-channels times kernel-squared weights plus one bias, times the number of filters.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "3 32 3",
                  "expectedStdout": "896\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "16 32 3",
                  "expectedStdout": "4640\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Parameters of a convolution layer from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Tiny CNN: convolve, ReLU, pool",
      "type": "write-code",
      "instructions": "Read nine image numbers on the first line and four kernel numbers on the second line. Print the 2x2 convolution output as two lines, then the max-pooled value on a third line, each with four decimal places. Apply ReLU before pooling.",
      "starterCode": "import sys\n\n# TODO: convolve, ReLU, pool, print the map and the pooled value\n",
      "solution": "import sys\nlines = sys.stdin.read().strip().splitlines()\nimg = [float(v) for v in lines[0].split()]\nI = [img[0:3], img[3:6], img[6:9]]\nk = [float(v) for v in lines[1].split()]\nK = [k[0:2], k[2:4]]\nconv = [[sum(K[a][b] * I[i + a][j + b] for a in range(2) for b in range(2)) for j in range(2)] for i in range(2)]\nrelu = [[max(0, v) for v in row] for row in conv]\nfor row in relu:\n    print(\" \".join(f\"{v:.4f}\" for v in row))\nprint(f\"{max(v for row in relu for v in row):.4f}\")",
      "solutionExplanation": "Convolve the kernel over the image, zero the negatives, then take the maximum as the pooled value.",
      "tests": [
        {
          "name": "Visible test",
          "stdin": "2 0 1 1 3 2 0 1 4\n1 1 0 1",
          "expectedStdout": "5.0000 3.0000\n5.0000 9.0000\n9.0000\n",
          "hidden": false
        },
        {
          "name": "Hidden test",
          "stdin": "1 1 1 1 1 1 1 1 1\n1 0 0 1",
          "expectedStdout": "2.0000 2.0000\n2.0000 2.0000\n2.0000\n",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "Recall the core idea of Tiny CNN: convolve, ReLU, pool from the lesson: what quantity must the program compute?",
        "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
        "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
      }
    },
    "capstone": {
      "title": "CNN Capstone",
      "description": "Build a tiny CNN forward pass in pure Python: convolution, ReLU, and max pooling on a small image.",
      "requirements": [
        "Read a 3x3 image and a 2x2 kernel.",
        "Compute the 2x2 convolution output.",
        "Apply ReLU to the feature map.",
        "Max-pool the result to a single number and print everything."
      ],
      "rubric": [
        "The program runs and prints the correct feature map and pooled value for both test inputs.",
        "Each output is the dot product of the kernel with the matching patch.",
        "ReLU zeroes negative values before pooling.",
        "The pooled value is the maximum of the rectified map."
      ]
    }
  },
  {
    "id": "rnn-lstm-sequence-models",
    "slug": "rnn-lstm-sequence-models",
    "language": "python",
    "category": "data-ai",
    "title": "RNNs, LSTMs & Sequence Models",
    "description": "Model sequences in pure Python: recurrent steps, backprop through time, LSTM gates, and sequence evaluation.",
    "difficulty": "Advanced",
    "estimatedHours": 20,
    "skills": [
      "Sequences",
      "Recurrent steps",
      "Backprop through time",
      "Vanishing gradients",
      "LSTM gates",
      "GRUs",
      "Sequence-to-sequence",
      "Perplexity"
    ],
    "prerequisites": [
      "cnn-convolutions-scratch"
    ],
    "analogy": "Learning {topic} is like learning to follow a story: each sentence only makes sense if you remember the ones before it.",
    "modules": [
      {
        "id": "rnn-lstm-sequence-models-m1",
        "title": "RNNs, LSTMs & Sequence Models Foundations",
        "level": "intermediate",
        "lessons": [
          {
            "id": "rnn-lstm-sequence-models-m1-l1",
            "slug": "rnn-lstm-sequence-models-m1-l1",
            "title": "Sequences and Time Steps",
            "concept": "A sequence is an ordered list where position matters: words in a sentence, prices over days, notes in a melody. Sequence models process one step at a time and carry information forward, so the prediction at step t can use everything before it. Shifting a sequence by one gives the classic next-step prediction task.",
            "syntax": "sequence: order matters; step t predicts step t + 1",
            "exampleCode": "seq = [1, 2, 3, 4]\nprint(seq[1:])",
            "exampleLanguage": "python",
            "mistake": "Shuffling a sequence before training and expecting the model to learn the order.",
            "bug": {
              "prompt": "Find the bug: this program should print the next-step targets, but it prints the inputs again.",
              "buggyCode": "seq = [1, 2, 3, 4]\nprint(seq[:-1])",
              "fixedCode": "seq = [1, 2, 3, 4]\nprint(seq[1:])",
              "explanation": "The targets are the sequence shifted by one, which is seq[1:], not the inputs seq[:-1]."
            },
            "exercise": {
              "title": "Next-step targets",
              "type": "write-code",
              "instructions": "Read a line of numbers (a sequence) and print the sequence shifted by one (drop the first element), space-separated.",
              "starterCode": "import sys\n\n# TODO: read the sequence and print it shifted by one\n",
              "solution": "import sys\nseq = sys.stdin.read().split()\nprint(' '.join(seq[1:]))",
              "solutionExplanation": "The target at each step is the next element, so drop the first element of the sequence.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "1 2 3 4",
                  "expectedStdout": "2 3 4\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "5 6 7",
                  "expectedStdout": "6 7\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Next-step targets from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "rnn-lstm-sequence-models-m1-l2",
            "slug": "rnn-lstm-sequence-models-m1-l2",
            "title": "Recurrent Connections and Hidden State",
            "concept": "A recurrent network keeps a hidden state that is updated at every step from the current input and the previous state: h_t equals tanh of W_x times x_t plus W_h times h_{t-1} plus b. The hidden state is the network's memory. The same weights are reused at every step, which is why an RNN can handle sequences of any length.",
            "syntax": "h_t = tanh(W_x * x_t + W_h * h_{t-1} + b)",
            "exampleCode": "import math\nx, h_prev, Wx, Wh, b = 1.0, 0.5, 0.8, 0.5, 0.0\nprint(math.tanh(Wx * x + Wh * h_prev + b))",
            "exampleLanguage": "python",
            "mistake": "Using the current hidden state instead of the previous one, which breaks the recurrence.",
            "bug": {
              "prompt": "Find the bug: this program should use the previous hidden state, but it uses the current input twice.",
              "buggyCode": "import math\nx, h_prev, Wx, Wh, b = 1.0, 0.5, 0.8, 0.5, 0.0\nprint(math.tanh(Wx * x + Wh * x + b))",
              "fixedCode": "import math\nx, h_prev, Wx, Wh, b = 1.0, 0.5, 0.8, 0.5, 0.0\nprint(math.tanh(Wx * x + Wh * h_prev + b))",
              "explanation": "The recurrent term multiplies the previous hidden state h_{t-1}, not the current input x."
            },
            "exercise": {
              "title": "One RNN step",
              "type": "write-code",
              "instructions": "Read x, previous hidden state, W_x, W_h and b on one line, and print the new hidden state tanh(W_x*x + W_h*h_prev + b) with four decimal places.",
              "starterCode": "import sys, math\n\n# TODO: read the values and compute the new hidden state\n",
              "solution": "import sys, math\nx, h_prev, Wx, Wh, b = [float(v) for v in sys.stdin.read().split()]\nprint(f\"{math.tanh(Wx * x + Wh * h_prev + b):.4f}\")",
              "solutionExplanation": "Combine the input term and the recurrent term, add the bias, and apply tanh.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "1 0.5 0.8 0.5 0",
                  "expectedStdout": "0.7818\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "0 1 0.8 0.5 0",
                  "expectedStdout": "0.4621\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of One RNN step from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "rnn-lstm-sequence-models-m1-l3",
            "slug": "rnn-lstm-sequence-models-m1-l3",
            "title": "Backpropagation Through Time",
            "concept": "Backpropagation through time unrolls the RNN into a deep feedforward network, one layer per step, and applies the chain rule backwards through the steps. The gradient at an early step passes through every later step, which is why it can vanish. Gradients from all steps are summed for the shared weights.",
            "syntax": "unroll the RNN, backprop through the steps, sum the gradients",
            "exampleCode": "print('BPTT: unroll, chain backwards, sum gradients over steps')",
            "exampleLanguage": "python",
            "mistake": "Updating the weights separately per step instead of summing the gradients for the shared weights.",
            "bug": {
              "prompt": "Find the bug: this program should sum the gradients over steps, but it uses only the last one.",
              "buggyCode": "grads = [0.1, 0.2, 0.3]\nprint(grads[-1])",
              "fixedCode": "grads = [0.1, 0.2, 0.3]\nprint(sum(grads))",
              "explanation": "The weights are shared across steps, so their gradient is the sum of the per-step gradients."
            },
            "exercise": {
              "title": "Check your understanding: backprop through time",
              "type": "multiple-choice",
              "instructions": "Which statement about backpropagation through time is correct?",
              "starterCode": "",
              "solution": "It unrolls the RNN into one layer per step, chains gradients backwards, and sums them for the shared weights.",
              "solutionExplanation": "It unrolls the RNN into one layer per step, chains gradients backwards, and sums them for the shared weights. The other options contradict the lesson.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "It unrolls the RNN into one layer per step, chains gradients backwards, and sums them for the shared weights.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Check your understanding: backprop through time from the lesson: which statement is actually true?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true in general."
              },
              "options": [
                "It updates each step's weights separately, with no sharing.",
                "It unrolls the RNN into one layer per step, chains gradients backwards, and sums them for the shared weights.",
                "It only backpropagates through the final step.",
                "It never needs gradients from earlier steps."
              ],
              "answerIndex": 1
            }
          },
          {
            "id": "rnn-lstm-sequence-models-m1-l4",
            "slug": "rnn-lstm-sequence-models-m1-l4",
            "title": "Vanishing Gradients in RNNs",
            "concept": "In an RNN the gradient is multiplied by the recurrent weight at every step it travels back, so after n steps it is scaled by W_h to the power n. With W_h below one the gradient vanishes and the network forgets long-range dependencies; above one it explodes. This is why plain RNNs struggle with long sequences.",
            "syntax": "gradient after n steps is scaled by W_h ** n",
            "exampleCode": "print(0.5 ** 10)",
            "exampleLanguage": "python",
            "mistake": "Expecting a plain RNN to remember information from a hundred steps ago.",
            "bug": {
              "prompt": "Find the bug: this program should show the gradient shrinking over ten steps, but it shows it growing.",
              "buggyCode": "print(1.5 ** 10)",
              "fixedCode": "print(0.5 ** 10)",
              "explanation": "A recurrent weight of 0.5 shrinks the gradient by half each step; 1.5 grows it instead."
            },
            "exercise": {
              "title": "Gradient scale after n steps",
              "type": "write-code",
              "instructions": "Read the initial gradient, the recurrent weight and the number of steps on one line, and print the gradient after n steps with four decimal places.",
              "starterCode": "import sys\n\n# TODO: read grad, W_h, n and print the scaled gradient\n",
              "solution": "import sys\ngrad, Wh, n = [float(v) for v in sys.stdin.read().split()]\nprint(f\"{grad * Wh ** int(n):.4f}\")",
              "solutionExplanation": "Multiply the gradient by the recurrent weight raised to the number of steps.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "1 0.5 10",
                  "expectedStdout": "0.0010\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "1 1.5 5",
                  "expectedStdout": "7.5938\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Gradient scale after n steps from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "rnn-lstm-sequence-models-m1-l5",
            "slug": "rnn-lstm-sequence-models-m1-l5",
            "title": "LSTMs: Gates and Cell State",
            "concept": "An LSTM adds a cell state, a conveyor belt that carries information across steps, guarded by three gates. The forget gate decides what to erase, the input gate what to add, and the output gate what to reveal. The cell update is the forget gate times the old cell plus the input gate times the new candidate.",
            "syntax": "C_t = f * C_{t-1} + i * C_tilde",
            "exampleCode": "f, C_prev, i, C_tilde = 0.8, 2.0, 0.5, 1.0\nprint(f * C_prev + i * C_tilde)",
            "exampleLanguage": "python",
            "mistake": "Forgetting the forget gate and adding the candidate to the full old cell every step.",
            "bug": {
              "prompt": "Find the bug: this program should print 2.1, but it prints 2.5.",
              "buggyCode": "f, C_prev, i, C_tilde = 0.8, 2.0, 0.5, 1.0\nprint(C_prev + i * C_tilde)",
              "fixedCode": "f, C_prev, i, C_tilde = 0.8, 2.0, 0.5, 1.0\nprint(f * C_prev + i * C_tilde)",
              "explanation": "The old cell is first scaled by the forget gate; adding the candidate to the unscaled cell keeps information that should have been erased."
            },
            "exercise": {
              "title": "Check your understanding: LSTM cell state",
              "type": "multiple-choice",
              "instructions": "Which statement about the LSTM cell state is correct?",
              "starterCode": "",
              "solution": "The new cell is the forget gate times the old cell plus the input gate times the candidate.",
              "solutionExplanation": "The new cell is the forget gate times the old cell plus the input gate times the candidate. The other options contradict the lesson.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "The new cell is the forget gate times the old cell plus the input gate times the candidate.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Check your understanding: LSTM cell state from the lesson: which statement is actually true?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true in general."
              },
              "options": [
                "The cell state is completely replaced at every step.",
                "The forget gate adds information and the input gate erases it.",
                "The new cell is the forget gate times the old cell plus the input gate times the candidate.",
                "LSTMs have no cell state at all, only a hidden state."
              ],
              "answerIndex": 2
            }
          }
        ]
      },
      {
        "id": "rnn-lstm-sequence-models-m2",
        "title": "RNNs, LSTMs & Sequence Models in Depth",
        "level": "advanced",
        "lessons": [
          {
            "id": "rnn-lstm-sequence-models-m2-l1",
            "slug": "rnn-lstm-sequence-models-m2-l1",
            "title": "GRUs",
            "concept": "A GRU is a simpler gated unit with two gates: the update gate decides how much of the old state to keep, and the reset gate decides how much of it to use for the new candidate. It has no separate cell state, so it is cheaper than an LSTM and often performs just as well. Fewer gates mean fewer parameters to train.",
            "syntax": "update gate: how much to keep; reset gate: how much to use",
            "exampleCode": "print('GRU: two gates, no separate cell state')",
            "exampleLanguage": "python",
            "mistake": "Treating a GRU as identical to an LSTM with the same number of parameters.",
            "bug": {
              "prompt": "Find the bug: this program should say a GRU has two gates, but it says three.",
              "buggyCode": "gates = 'update, reset, output'\nprint(len(gates.split(', ')))",
              "fixedCode": "gates = 'update, reset'\nprint(len(gates.split(', ')))",
              "explanation": "A GRU has an update gate and a reset gate only; the output gate belongs to the LSTM."
            },
            "exercise": {
              "title": "LSTM cell update",
              "type": "write-code",
              "instructions": "Read the forget gate f, the old cell state, the input gate i and the candidate cell on one line, and print the new cell state with four decimal places.",
              "starterCode": "import sys\n\n# TODO: read f, C_prev, i, C_tilde and print the new cell state\n",
              "solution": "import sys\nf, C_prev, i, C_tilde = [float(v) for v in sys.stdin.read().split()]\nprint(f\"{f * C_prev + i * C_tilde:.4f}\")",
              "solutionExplanation": "Scale the old cell by the forget gate, scale the candidate by the input gate, and add them.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "0.8 2 0.5 1",
                  "expectedStdout": "2.1000\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "0.1 5 0.9 -1",
                  "expectedStdout": "-0.4000\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of LSTM cell update from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "rnn-lstm-sequence-models-m2-l2",
            "slug": "rnn-lstm-sequence-models-m2-l2",
            "title": "Sequence-to-Sequence Models",
            "concept": "A sequence-to-sequence model has an encoder that reads the input and compresses it into a final state, and a decoder that generates the output one step at a time from that state. Translation and summarisation both fit this shape. The encoder's final hidden state is the summary the decoder works from.",
            "syntax": "encoder reads the input; decoder generates the output",
            "exampleCode": "print('encoder final state is the summary the decoder starts from')",
            "exampleLanguage": "python",
            "mistake": "Feeding the decoder the raw input instead of the encoder's summary.",
            "bug": {
              "prompt": "Find the bug: this program should summarise the sequence with tanh of the sum, but it returns the sum raw.",
              "buggyCode": "import math\nseq = [1.0, 2.0, 3.0]\nprint(sum(seq))",
              "fixedCode": "import math\nseq = [1.0, 2.0, 3.0]\nprint(math.tanh(sum(seq)))",
              "explanation": "The toy encoder squashes the summed inputs through tanh to make the final state; the raw sum is not a bounded state."
            },
            "exercise": {
              "title": "Toy encoder final state",
              "type": "write-code",
              "instructions": "Read a line of numbers (a source sequence) and print tanh of their sum with four decimal places.",
              "starterCode": "import sys, math\n\n# TODO: read the sequence and print tanh of its sum\n",
              "solution": "import sys, math\nseq = [float(v) for v in sys.stdin.read().split()]\nprint(f\"{math.tanh(sum(seq)):.4f}\")",
              "solutionExplanation": "Add the sequence elements and squash the total through tanh.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "1 2 3",
                  "expectedStdout": "1.0000\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "0.5 0.5 1",
                  "expectedStdout": "0.9640\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Toy encoder final state from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "rnn-lstm-sequence-models-m2-l3",
            "slug": "rnn-lstm-sequence-models-m2-l3",
            "title": "Teacher Forcing and Autoregressive Decoding",
            "concept": "Teacher forcing trains the decoder by feeding it the true previous token instead of its own prediction, which makes training fast and stable. At inference time the model must feed its own predictions back, which is autoregressive decoding. The mismatch between the two is called exposure bias.",
            "syntax": "training: true previous token; inference: own previous prediction",
            "exampleCode": "print('teacher forcing trains fast; autoregressive decoding runs at inference')",
            "exampleLanguage": "python",
            "mistake": "Using teacher forcing at inference time, when there is no true token to feed.",
            "bug": {
              "prompt": "Find the bug: this program should feed the model's own prediction back, but it feeds the true token.",
              "buggyCode": "true_token, predicted = 'cat', 'dog'\nprint('next input:', true_token)",
              "fixedCode": "true_token, predicted = 'cat', 'dog'\nprint('next input:', predicted)",
              "explanation": "Autoregressive decoding has no ground truth at inference time, so the next input must be the model's own prediction."
            },
            "exercise": {
              "title": "Check your understanding: teacher forcing",
              "type": "multiple-choice",
              "instructions": "Which statement about teacher forcing is correct?",
              "starterCode": "",
              "solution": "It feeds the true previous token during training, while inference must feed the model's own predictions back.",
              "solutionExplanation": "It feeds the true previous token during training, while inference must feed the model's own predictions back. The other options contradict the lesson.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "It feeds the true previous token during training, while inference must feed the model's own predictions back.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Check your understanding: teacher forcing from the lesson: which statement is actually true?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true in general."
              },
              "options": [
                "Teacher forcing is used at inference time, not training time.",
                "Teacher forcing feeds the model's own wrong predictions during training.",
                "Autoregressive decoding never feeds anything back.",
                "It feeds the true previous token during training, while inference must feed the model's own predictions back."
              ],
              "answerIndex": 3
            }
          },
          {
            "id": "rnn-lstm-sequence-models-m2-l4",
            "slug": "rnn-lstm-sequence-models-m2-l4",
            "title": "Text as Sequences: Embeddings",
            "concept": "Words become vectors through an embedding table: each token id looks up one row, and similar words end up with similar vectors. A sentence is a sequence of these vectors, and averaging them gives a simple sentence representation. Embeddings are learned during training, not fixed in advance.",
            "syntax": "embedding: token id -> vector row",
            "exampleCode": "table = [[0.5, 0.5], [1.0, 0.0], [0.0, 1.0], [1.0, 1.0]]\nids = [0, 1]\nprint([sum(table[i][d] for i in ids) / len(ids) for d in range(2)])",
            "exampleLanguage": "python",
            "mistake": "Averaging one-hot vectors instead of learned embeddings, which carries no meaning.",
            "bug": {
              "prompt": "Find the bug: this program should look up the embedding rows, but it uses the token ids as the vectors.",
              "buggyCode": "ids = [0, 1]\nprint(ids)",
              "fixedCode": "table = [[0.5, 0.5], [1.0, 0.0], [0.0, 1.0], [1.0, 1.0]]\nids = [0, 1]\nprint([sum(table[i][d] for i in ids) / len(ids) for d in range(2)])",
              "explanation": "Each token id must look up its row in the embedding table; the ids themselves are indices, not vectors."
            },
            "exercise": {
              "title": "Mean embedding of a token sequence",
              "type": "write-code",
              "instructions": "Read a line of token ids. The embedding table is [[0.5, 0.5], [1, 0], [0, 1], [1, 1]]. Print the mean embedding vector with four decimal places, space-separated.",
              "starterCode": "import sys\n\n# TODO: read token ids and print their mean embedding\n",
              "solution": "import sys\ntable = [[0.5, 0.5], [1.0, 0.0], [0.0, 1.0], [1.0, 1.0]]\nids = [int(v) for v in sys.stdin.read().split()]\nprint(\" \".join(f\"{sum(table[i][d] for i in ids) / len(ids):.4f}\" for d in range(2)))",
              "solutionExplanation": "Look up each token's embedding row and average the rows coordinate by coordinate.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "0 1",
                  "expectedStdout": "0.7500 0.2500\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "2 3",
                  "expectedStdout": "0.5000 1.0000\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Mean embedding of a token sequence from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "rnn-lstm-sequence-models-m2-l5",
            "slug": "rnn-lstm-sequence-models-m2-l5",
            "title": "Evaluating Sequence Models",
            "concept": "Sequence models are evaluated by the probability they assign to held-out sequences. Perplexity is the exponential of the mean negative log-likelihood: a perplexity of ten means the model is as surprised as if it chose among ten equally likely options at each step. Lower perplexity means a better language model.",
            "syntax": "perplexity = exp(mean negative log-likelihood)",
            "exampleCode": "import math\nnlls = [0.5, 1.0, 1.5]\nprint(math.exp(sum(nlls) / len(nlls)))",
            "exampleLanguage": "python",
            "mistake": "Reporting accuracy on next-token prediction as if it were classification accuracy.",
            "bug": {
              "prompt": "Find the bug: this program should print the perplexity, but it prints the mean log-likelihood.",
              "buggyCode": "import math\nnlls = [0.5, 1.0, 1.5]\nprint(sum(nlls) / len(nlls))",
              "fixedCode": "import math\nnlls = [0.5, 1.0, 1.5]\nprint(math.exp(sum(nlls) / len(nlls)))",
              "explanation": "Perplexity exponentiates the mean negative log-likelihood; the mean alone is not a perplexity."
            },
            "exercise": {
              "title": "Perplexity from negative log-likelihoods",
              "type": "write-code",
              "instructions": "Read a line of negative log-likelihoods (one per token) and print the perplexity with four decimal places.",
              "starterCode": "import sys, math\n\n# TODO: read the NLLs and print the perplexity\n",
              "solution": "import sys, math\nnlls = [float(v) for v in sys.stdin.read().split()]\nprint(f\"{math.exp(sum(nlls) / len(nlls)):.4f}\")",
              "solutionExplanation": "Average the negative log-likelihoods and exponentiate the result.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "0.5 1.0 1.5",
                  "expectedStdout": "2.7183\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "0.1 0.2",
                  "expectedStdout": "1.1618\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Perplexity from negative log-likelihoods from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Run an RNN over a short sequence",
      "type": "write-code",
      "instructions": "Read a line of inputs, then W_x, W_h and b on the second line. Starting from hidden state zero, run one RNN step per input (h = tanh(W_x*x + W_h*h_prev + b)) and print all hidden states with four decimal places, space-separated.",
      "starterCode": "import sys, math\n\n# TODO: read the inputs and weights, run the RNN\n",
      "solution": "import sys, math\nlines = sys.stdin.read().strip().splitlines()\ninputs = [float(v) for v in lines[0].split()]\nWx, Wh, b = [float(v) for v in lines[1].split()]\nh = 0.0\nouts = []\nfor x in inputs:\n    h = math.tanh(Wx * x + Wh * h + b)\n    outs.append(h)\nprint(\" \".join(f\"{v:.4f}\" for v in outs))",
      "solutionExplanation": "Each step combines the new input with the previous hidden state through tanh.",
      "tests": [
        {
          "name": "Visible test",
          "stdin": "1 0 1\n0.8 0.5 0",
          "expectedStdout": "0.6640 0.3203 0.7444\n",
          "hidden": false
        },
        {
          "name": "Hidden test",
          "stdin": "0 1 0\n0.8 0.5 0",
          "expectedStdout": "0.0000 0.6640 0.3203\n",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "Recall the core idea of Run an RNN over a short sequence from the lesson: what quantity must the program compute?",
        "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
        "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
      }
    },
    "capstone": {
      "title": "RNN Capstone",
      "description": "Run a recurrent network over a short sequence in pure Python: one tanh step per input, carrying the hidden state forward.",
      "requirements": [
        "Read a sequence of inputs and the RNN weights.",
        "Start from a hidden state of zero.",
        "Update the hidden state once per input with tanh.",
        "Print every hidden state with four decimal places."
      ],
      "rubric": [
        "The program runs and prints the correct hidden states for both test inputs.",
        "Each step uses the previous hidden state, not the current input twice.",
        "The tanh nonlinearity is applied at every step.",
        "The weights are shared across all steps."
      ]
    }
  },
  {
    "id": "transformers-attention",
    "slug": "transformers-attention",
    "language": "python",
    "category": "data-ai",
    "title": "Transformers & Attention",
    "description": "Attention is all you need in pure Python: scaled dot-product attention, multi-head attention, positional encoding, and the transformer block.",
    "difficulty": "Advanced",
    "estimatedHours": 22,
    "skills": [
      "Attention scores",
      "Scaled dot-product attention",
      "Multi-head attention",
      "Positional encoding",
      "Transformer encoder",
      "Masked attention",
      "Learning rate warmup",
      "Pretraining"
    ],
    "prerequisites": [
      "rnn-lstm-sequence-models"
    ],
    "analogy": "Learning {topic} is like learning to read a room at a glance: instead of listening to one person at a time, you weigh every voice at once.",
    "modules": [
      {
        "id": "transformers-attention-m1",
        "title": "Transformers & Attention Foundations",
        "level": "intermediate",
        "lessons": [
          {
            "id": "transformers-attention-m1-l1",
            "slug": "transformers-attention-m1-l1",
            "title": "The Limits of Recurrence",
            "concept": "Recurrence forces a sequence model to process one step at a time, so a hundred-token sentence needs a hundred sequential steps and distant words fade through the hidden state. Attention removes the recurrence: every position looks at every other position directly, in parallel. That parallelism is why transformers train so much faster than RNNs.",
            "syntax": "recurrence: n sequential steps; attention: all pairs at once",
            "exampleCode": "print('an RNN needs n steps for n tokens; attention does it in one parallel pass')",
            "exampleLanguage": "python",
            "mistake": "Stacking more RNN layers to fix the sequential bottleneck.",
            "bug": {
              "prompt": "Find the bug: this program should say attention needs one parallel step, but it says n.",
              "buggyCode": "n = 100\nprint(f'attention steps: {n}')",
              "fixedCode": "n = 100\nprint('attention steps: 1')",
              "explanation": "Attention computes all pairwise interactions in parallel, so it needs one parallel step, not n sequential ones."
            },
            "exercise": {
              "title": "Sequential vs parallel steps",
              "type": "write-code",
              "instructions": "Read a sequence length n and print the number of sequential steps an RNN needs and the number of parallel steps attention needs, separated by a space.",
              "starterCode": "import sys\n\n# TODO: read n and print the two step counts\n",
              "solution": "import sys\nn = int(sys.stdin.read())\nprint(f\"{n} 1\")",
              "solutionExplanation": "An RNN needs one sequential step per token; attention needs a single parallel pass.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "10",
                  "expectedStdout": "10 1\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "100",
                  "expectedStdout": "100 1\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Sequential vs parallel steps from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "transformers-attention-m1-l2",
            "slug": "transformers-attention-m1-l2",
            "title": "Attention: Queries, Keys and Values",
            "concept": "Attention compares a query vector with every key vector using a dot product: a high score means that key is relevant to this query. The scores weight the value vectors, so the output is a weighted mix of the values. Queries ask, keys advertise, and values carry the content.",
            "syntax": "score = dot(query, key); output = weighted sum of values",
            "exampleCode": "q, k = [1.0, 2.0], [3.0, 4.0]\nprint(sum(a * b for a, b in zip(q, k)))",
            "exampleLanguage": "python",
            "mistake": "Using the value vectors as the queries, which mixes up what is being asked with what is being offered.",
            "bug": {
              "prompt": "Find the bug: this program should compute the dot product of q and k, but it adds them instead.",
              "buggyCode": "q, k = [1.0, 2.0], [3.0, 4.0]\nprint(sum(a + b for a, b in zip(q, k)))",
              "fixedCode": "q, k = [1.0, 2.0], [3.0, 4.0]\nprint(sum(a * b for a, b in zip(q, k)))",
              "explanation": "An attention score is a dot product, multiplying matching entries, not adding them."
            },
            "exercise": {
              "title": "Attention score",
              "type": "write-code",
              "instructions": "Read a query vector on the first line and a key vector on the second line, and print their dot product with four decimal places.",
              "starterCode": "import sys\n\n# TODO: read the query and key, print their dot product\n",
              "solution": "import sys\nlines = sys.stdin.read().strip().splitlines()\nq = [float(v) for v in lines[0].split()]\nk = [float(v) for v in lines[1].split()]\nprint(f\"{sum(a * b for a, b in zip(q, k)):.4f}\")",
              "solutionExplanation": "Multiply the matching entries of the query and the key, then add the products.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "1 2\n3 4",
                  "expectedStdout": "11.0000\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "0 1\n2 3",
                  "expectedStdout": "3.0000\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Attention score from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "transformers-attention-m1-l3",
            "slug": "transformers-attention-m1-l3",
            "title": "Scaled Dot-Product Attention",
            "concept": "Scaled dot-product attention divides the query-key scores by the square root of the key dimension before the softmax, which keeps the scores from growing so large that the softmax saturates. The softmax turns the scores into weights that sum to one, and the output is the weighted sum of the values. The scaling is a small detail with a large effect on training.",
            "syntax": "attention = softmax(Q K^T / sqrt(d)) V",
            "exampleCode": "print('divide scores by sqrt(d) before the softmax')",
            "exampleLanguage": "python",
            "mistake": "Skipping the scaling, so the softmax saturates and gradients vanish.",
            "bug": {
              "prompt": "Find the bug: this program should divide the score by sqrt(2), but it divides by 2.",
              "buggyCode": "import math\nscore, d = 1.0, 2\nprint(score / d)",
              "fixedCode": "import math\nscore, d = 1.0, 2\nprint(score / math.sqrt(d))",
              "explanation": "The scale factor is the square root of the key dimension, not the dimension itself."
            },
            "exercise": {
              "title": "Check your understanding: scaled dot-product attention",
              "type": "multiple-choice",
              "instructions": "Which statement about scaled dot-product attention is correct?",
              "starterCode": "",
              "solution": "Scores are divided by the square root of the key dimension before the softmax, then used to weight the values.",
              "solutionExplanation": "Scores are divided by the square root of the key dimension before the softmax, then used to weight the values. The other options contradict the lesson.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Scores are divided by the square root of the key dimension before the softmax, then used to weight the values.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Check your understanding: scaled dot-product attention from the lesson: which statement is actually true?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true in general."
              },
              "options": [
                "Scores are divided by the square root of the key dimension before the softmax, then used to weight the values.",
                "Scores are divided by the key dimension itself, not its square root.",
                "The softmax comes before the query-key scores are computed.",
                "The output is an unweighted sum of the values."
              ],
              "answerIndex": 0
            }
          },
          {
            "id": "transformers-attention-m1-l4",
            "slug": "transformers-attention-m1-l4",
            "title": "Multi-Head Attention",
            "concept": "Multi-head attention runs several attention heads in parallel, each with its own learned query, key and value projections, then concatenates their outputs. Different heads can attend to different relationships: one to the previous word, one to the subject, one to the object. More heads mean more kinds of relationship at once.",
            "syntax": "several attention heads in parallel, outputs concatenated",
            "exampleCode": "print('8 heads: each learns a different kind of relationship')",
            "exampleLanguage": "python",
            "mistake": "Using one head and expecting it to track every kind of relationship.",
            "bug": {
              "prompt": "Find the bug: this program should report the concatenated size of four heads of dimension two, but it reports two.",
              "buggyCode": "heads, d = 4, 2\nprint(d)",
              "fixedCode": "heads, d = 4, 2\nprint(heads * d)",
              "explanation": "Concatenating four heads of dimension two gives eight dimensions, not two."
            },
            "exercise": {
              "title": "Scaled dot-product attention, one query",
              "type": "write-code",
              "instructions": "Read the query on line 1, two key rows on lines 2-3, and two value rows on lines 4-5 (all two-dimensional). Print the attention output with four decimal places, space-separated.",
              "starterCode": "import sys, math\n\n# TODO: read q, K, V and compute the attention output\n",
              "solution": "import sys, math\nlines = sys.stdin.read().strip().splitlines()\nq = [float(v) for v in lines[0].split()]\nK = [[float(v) for v in l.split()] for l in lines[1:3]]\nV = [[float(v) for v in l.split()] for l in lines[3:5]]\nd = len(q)\nscores = [sum(a * b for a, b in zip(q, k)) / math.sqrt(d) for k in K]\nm = max(scores)\nexps = [math.exp(s - m) for s in scores]\ntot = sum(exps)\nw = [e / tot for e in exps]\nout = [sum(wi * v[j] for wi, v in zip(w, V)) for j in range(len(V[0]))]\nprint(\" \".join(f\"{v:.4f}\" for v in out))",
              "solutionExplanation": "Score the query against each key, scale, softmax, and mix the values by the weights.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "1 0\n1 0\n0 1\n1 2\n3 4",
                  "expectedStdout": "1.6605 2.6605\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "0 1\n1 0\n0 1\n1 2\n3 4",
                  "expectedStdout": "2.3395 3.3395\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Scaled dot-product attention, one query from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "transformers-attention-m1-l5",
            "slug": "transformers-attention-m1-l5",
            "title": "Positional Encoding",
            "concept": "Attention has no sense of order, so transformers add a positional encoding to each token's embedding. The original encoding uses sines and cosines of different frequencies: even dimensions use sine, odd dimensions use cosine, and the frequencies shrink with dimension. The model can then tell first from fifth.",
            "syntax": "PE(pos, 2i) = sin(pos / 10000 ** (2i / d)); PE(pos, 2i + 1) = cos(...)",
            "exampleCode": "import math\npos = 1\nprint([math.sin(pos), math.cos(pos), math.sin(pos / 100), math.cos(pos / 100)])",
            "exampleLanguage": "python",
            "mistake": "Giving every position the same encoding, which erases all order information.",
            "bug": {
              "prompt": "Find the bug: this program should encode position one, but it encodes position zero.",
              "buggyCode": "import math\npos = 0\nprint([math.sin(pos), math.cos(pos)])",
              "fixedCode": "import math\npos = 1\nprint([math.sin(pos), math.cos(pos)])",
              "explanation": "The encoding depends on the position, so using zero for every token makes all positions identical."
            },
            "exercise": {
              "title": "Check your understanding: positional encoding",
              "type": "multiple-choice",
              "instructions": "Which statement about positional encoding is correct?",
              "starterCode": "",
              "solution": "It adds sine and cosine signals of different frequencies so the model can tell token positions apart.",
              "solutionExplanation": "It adds sine and cosine signals of different frequencies so the model can tell token positions apart. The other options contradict the lesson.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "It adds sine and cosine signals of different frequencies so the model can tell token positions apart.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Check your understanding: positional encoding from the lesson: which statement is actually true?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true in general."
              },
              "options": [
                "Attention already knows the order of tokens, so no encoding is needed.",
                "It adds sine and cosine signals of different frequencies so the model can tell token positions apart.",
                "Every position gets the same encoding, which is the point.",
                "Positional encoding replaces the token embeddings entirely."
              ],
              "answerIndex": 1
            }
          }
        ]
      },
      {
        "id": "transformers-attention-m2",
        "title": "Transformers & Attention in Depth",
        "level": "advanced",
        "lessons": [
          {
            "id": "transformers-attention-m2-l1",
            "slug": "transformers-attention-m2-l1",
            "title": "The Transformer Encoder Block",
            "concept": "An encoder block has multi-head self-attention, then a feedforward network, each wrapped in a residual connection and layer normalisation. The residual connection adds the input back to the output, which lets gradients flow, and normalisation keeps activations stable. Stacking a dozen of these blocks makes a transformer encoder.",
            "syntax": "attention -> add and norm -> feedforward -> add and norm",
            "exampleCode": "print('residual: output = input + sublayer(input), then normalise')",
            "exampleLanguage": "python",
            "mistake": "Dropping the residual connections, which makes deep stacks hard to train.",
            "bug": {
              "prompt": "Find the bug: this program should add the residual, but it returns the sublayer output alone.",
              "buggyCode": "x, sub = [1.0, 2.0], [0.5, 0.5]\nprint(sub)",
              "fixedCode": "x, sub = [1.0, 2.0], [0.5, 0.5]\nprint([a + b for a, b in zip(x, sub)])",
              "explanation": "A residual connection adds the block input back to the sublayer output; without it the gradient path is lost."
            },
            "exercise": {
              "title": "Positional encoding for one position",
              "type": "write-code",
              "instructions": "Read a position (integer) on one line and print its four-dimensional positional encoding [sin(pos), cos(pos), sin(pos/100), cos(pos/100)] with four decimal places, space-separated.",
              "starterCode": "import sys, math\n\n# TODO: read the position and print its encoding\n",
              "solution": "import sys, math\npos = int(sys.stdin.read())\nprint(\" \".join(f\"{v:.4f}\" for v in [math.sin(pos), math.cos(pos), math.sin(pos / 100), math.cos(pos / 100)]))",
              "solutionExplanation": "Even dimensions use sine and odd dimensions use cosine, with frequencies shrinking by dimension.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "1",
                  "expectedStdout": "0.8415 0.5403 0.0100 1.0000\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "0",
                  "expectedStdout": "0.0000 1.0000 0.0000 1.0000\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Positional encoding for one position from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "transformers-attention-m2-l2",
            "slug": "transformers-attention-m2-l2",
            "title": "The Transformer Decoder and Masked Attention",
            "concept": "The decoder adds masked self-attention, where each position may only attend to earlier positions, so the model cannot peek at the future it is trying to predict. A second cross-attention layer lets the decoder look at the encoder's output. Masking is what makes autoregressive generation honest.",
            "syntax": "masked attention: a position attends only to earlier positions",
            "exampleCode": "print('the mask hides future tokens from each position')",
            "exampleLanguage": "python",
            "mistake": "Forgetting the mask, so the decoder cheats by looking at future tokens.",
            "bug": {
              "prompt": "Find the bug: this program should attend only to the first two scores, but it attends to all three.",
              "buggyCode": "import math\nscores = [2.0, 1.0, 3.0]\nprint([math.exp(s) / sum(math.exp(x) for x in scores) for s in scores])",
              "fixedCode": "import math\nscores = [2.0, 1.0]\nprint([math.exp(s) / sum(math.exp(x) for x in scores) for s in scores])",
              "explanation": "Masked attention at position one only sees scores zero and one; the future score must be excluded from the softmax."
            },
            "exercise": {
              "title": "Allowed and masked positions",
              "type": "write-code",
              "instructions": "Read the sequence length n and the query position on one line. Print how many positions the query may attend to and how many are masked, separated by a space.",
              "starterCode": "import sys\n\n# TODO: read n and position, print allowed and masked counts\n",
              "solution": "import sys\nn, pos = [int(v) for v in sys.stdin.read().split()]\nprint(f\"{pos + 1} {n - pos - 1}\")",
              "solutionExplanation": "The query attends to itself and all earlier positions; the rest are masked.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "5 2",
                  "expectedStdout": "3 2\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "8 0",
                  "expectedStdout": "1 7\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Allowed and masked positions from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "transformers-attention-m2-l3",
            "slug": "transformers-attention-m2-l3",
            "title": "Training Transformers: Optimiser and Schedule",
            "concept": "Transformers train with Adam and a warmup schedule: the learning rate rises linearly for a few thousand steps, then decays. The warmup protects the randomly initialised model from large early steps. The original formula scales with the model dimension to the power minus one half.",
            "syntax": "warmup: lr rises, then decays with step ** -0.5",
            "exampleCode": "print('warmup protects the random start; decay settles the end')",
            "exampleLanguage": "python",
            "mistake": "Starting with a high learning rate and no warmup, which destabilises early training.",
            "bug": {
              "prompt": "Find the bug: this program should rise during warmup, but it starts at the peak rate.",
              "buggyCode": "warmup, step = 4000, 1000\nprint('peak rate' if step < warmup else 'decayed rate')",
              "fixedCode": "warmup, step = 4000, 1000\nprint('rising rate' if step < warmup else 'decayed rate')",
              "explanation": "During warmup the rate is still rising toward its peak; it only decays after the warmup steps are done."
            },
            "exercise": {
              "title": "Check your understanding: training transformers",
              "type": "multiple-choice",
              "instructions": "Which statement about training transformers is correct?",
              "starterCode": "",
              "solution": "Transformers train with Adam and a warmup schedule: the learning rate rises linearly for a few thousand steps, then decays.",
              "solutionExplanation": "Transformers train with Adam and a warmup schedule: the learning rate rises linearly for a few thousand steps, then decays. The other options contradict the lesson.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Transformers train with Adam and a warmup schedule: the learning rate rises linearly for a few thousand steps, then decays.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Check your understanding: training transformers from the lesson: which statement is actually true?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true in general."
              },
              "options": [
                "Transformers train best with a high fixed learning rate and no warmup.",
                "Warmup means the learning rate starts at its peak and only falls.",
                "Transformers train with Adam and a warmup schedule: the learning rate rises linearly for a few thousand steps, then decays.",
                "Transformers are trained with plain gradient descent and no optimiser."
              ],
              "answerIndex": 2
            }
          },
          {
            "id": "transformers-attention-m2-l4",
            "slug": "transformers-attention-m2-l4",
            "title": "Tokenisation and Embeddings",
            "concept": "Tokenisation splits text into pieces the model knows, from whole words down to subword units, and each token gets an embedding vector. Subword tokenisation handles rare words by breaking them into known pieces. The vocabulary size and the embedding dimension are key design choices.",
            "syntax": "text -> tokens -> embedding vectors",
            "exampleCode": "words = 'the cat sat on the mat'.split()\nprint(len(words), len(set(words)))",
            "exampleLanguage": "python",
            "mistake": "Counting characters instead of tokens, which inflates the sequence length.",
            "bug": {
              "prompt": "Find the bug: this program should count six tokens, but it counts 22 characters.",
              "buggyCode": "text = 'the cat sat on the mat'\nprint(len(text))",
              "fixedCode": "text = 'the cat sat on the mat'\nprint(len(text.split()))",
              "explanation": "Tokens are words here, so the count is the number of split pieces, not the number of characters."
            },
            "exercise": {
              "title": "Token count and unique tokens",
              "type": "write-code",
              "instructions": "Read a sentence on one line and print the number of tokens (words) and the number of unique tokens, separated by a space.",
              "starterCode": "import sys\n\n# TODO: read the sentence and print token counts\n",
              "solution": "import sys\nwords = sys.stdin.read().split()\nprint(f\"{len(words)} {len(set(words))}\")",
              "solutionExplanation": "Split the sentence into words, count them, and count the distinct ones.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "the cat sat on the mat",
                  "expectedStdout": "6 5\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "a a a b",
                  "expectedStdout": "4 2\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Token count and unique tokens from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "transformers-attention-m2-l5",
            "slug": "transformers-attention-m2-l5",
            "title": "From BERT to GPT: Pretraining and Fine-Tuning",
            "concept": "BERT pretraining masks random tokens and learns to fill them in, which builds a bidirectional understanding used for classification. GPT pretraining predicts the next token, which builds a generator used for writing. Both are fine-tuned on small labelled datasets for the final task, which is why pretraining on huge text pays off.",
            "syntax": "BERT: fill in masked tokens; GPT: predict the next token",
            "exampleCode": "print('pretrain on huge text, fine-tune on a small labelled set')",
            "exampleLanguage": "python",
            "mistake": "Fine-tuning on the pretraining data itself and calling it a new task.",
            "bug": {
              "prompt": "Find the bug: this program should say BERT masks tokens, but it says BERT predicts the next token.",
              "buggyCode": "model = 'BERT'\nprint('predicts the next token' if model == 'BERT' else 'fills in masked tokens')",
              "fixedCode": "model = 'BERT'\nprint('fills in masked tokens' if model == 'BERT' else 'predicts the next token')",
              "explanation": "BERT's pretraining task is masked-token prediction, while next-token prediction is GPT's task."
            },
            "exercise": {
              "title": "Masked tokens count",
              "type": "write-code",
              "instructions": "Read the total number of tokens and the mask fraction on one line, and print how many tokens are masked (rounded down) as an integer.",
              "starterCode": "import sys\n\n# TODO: read the token count and fraction, print the masked count\n",
              "solution": "import sys\nn, frac = sys.stdin.read().split()\nprint(int(int(n) * float(frac)))",
              "solutionExplanation": "Multiply the token count by the mask fraction and round down.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "100 0.15",
                  "expectedStdout": "15\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "512 0.15",
                  "expectedStdout": "76\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Masked tokens count from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Scaled dot-product attention, new numbers",
      "type": "write-code",
      "instructions": "Read the query on line 1, two key rows on lines 2-3, and two value rows on lines 4-5 (all two-dimensional). Print the attention output with four decimal places, space-separated.",
      "starterCode": "import sys, math\n\n# TODO: read q, K, V and compute the attention output\n",
      "solution": "import sys, math\nlines = sys.stdin.read().strip().splitlines()\nq = [float(v) for v in lines[0].split()]\nK = [[float(v) for v in l.split()] for l in lines[1:3]]\nV = [[float(v) for v in l.split()] for l in lines[3:5]]\nd = len(q)\nscores = [sum(a * b for a, b in zip(q, k)) / math.sqrt(d) for k in K]\nm = max(scores)\nexps = [math.exp(s - m) for s in scores]\ntot = sum(exps)\nw = [e / tot for e in exps]\nout = [sum(wi * v[j] for wi, v in zip(w, V)) for j in range(len(V[0]))]\nprint(\" \".join(f\"{v:.4f}\" for v in out))",
      "solutionExplanation": "Score the query against each key, scale by the root of the dimension, softmax, and mix the values.",
      "tests": [
        {
          "name": "Visible test",
          "stdin": "1 1\n1 0\n0 1\n2 0\n0 2",
          "expectedStdout": "1.0000 1.0000\n",
          "hidden": false
        },
        {
          "name": "Hidden test",
          "stdin": "2 0\n1 0\n0 1\n2 0\n0 2",
          "expectedStdout": "1.6089 0.3911\n",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "Recall the core idea of Scaled dot-product attention, new numbers from the lesson: what quantity must the program compute?",
        "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
        "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
      }
    },
    "capstone": {
      "title": "Transformers Capstone",
      "description": "Build scaled dot-product attention in pure Python: score, scale, softmax, and mix the values.",
      "requirements": [
        "Read a query, two keys and two values.",
        "Compute the query-key scores scaled by the root of the key dimension.",
        "Turn the scores into weights with a softmax.",
        "Print the weighted sum of the values."
      ],
      "rubric": [
        "The program runs and prints the correct attention output for both test inputs.",
        "Scores are divided by the square root of the key dimension.",
        "The softmax weights sum to one.",
        "The output is the weighted sum of the value vectors."
      ]
    }
  },
  {
    "id": "model-evaluation-feature-engineering",
    "slug": "model-evaluation-feature-engineering",
    "language": "python",
    "category": "data-ai",
    "title": "Model Evaluation, Cross-Validation & Feature Engineering",
    "description": "Judge models honestly and build better features in pure Python: splits, k-fold CV, bias-variance, imputation, encoding and leakage.",
    "difficulty": "Advanced",
    "estimatedHours": 18,
    "skills": [
      "Train/validation/test splits",
      "k-fold cross-validation",
      "Bias-variance tradeoff",
      "Grid search",
      "Mean imputation",
      "One-hot encoding",
      "Standardisation",
      "Feature selection"
    ],
    "prerequisites": [
      "transformers-attention"
    ],
    "analogy": "Learning {topic} is like learning to judge a cooking contest fairly: you taste blind, you compare on the same dishes, and you never let the recipe leak the answers.",
    "modules": [
      {
        "id": "model-evaluation-feature-engineering-m1",
        "title": "Model Evaluation, Cross-Validation & Feature Engineering Foundations",
        "level": "intermediate",
        "lessons": [
          {
            "id": "model-evaluation-feature-engineering-m1-l1",
            "slug": "model-evaluation-feature-engineering-m1-l1",
            "title": "Training, Validation and Test Splits",
            "concept": "The training set fits the model, the validation set picks hyperparameters, and the test set is touched once at the end for an honest score. Using the test set for decisions leaks information into it and the score stops meaning anything. A common split is 70 percent train, 15 percent validation, 15 percent test.",
            "syntax": "train fits, validation picks, test judges once",
            "exampleCode": "print('70 train, 15 validation, 15 test')",
            "exampleLanguage": "python",
            "mistake": "Tuning on the test set and reporting the tuned score as the final result.",
            "bug": {
              "prompt": "Find the bug: this program should split 100 examples into 70, 15 and 15, but it puts everything in training.",
              "buggyCode": "n = 100\nprint(n, 0, 0)",
              "fixedCode": "n = 100\nprint(70, 15, 15)",
              "explanation": "The split reserves 15 for validation and 15 for test; putting all 100 in training leaves nothing to judge with."
            },
            "exercise": {
              "title": "Split sizes",
              "type": "write-code",
              "instructions": "Read n, the train fraction and the validation fraction on one line. Print the train, validation and test counts as integers, with the test count taking the remainder.",
              "starterCode": "import sys\n\n# TODO: read n and fractions, print the three counts\n",
              "solution": "import sys\nn, train_f, val_f = [float(v) for v in sys.stdin.read().split()]\nn = int(n)\ntr = int(n * train_f)\nva = int(n * val_f)\nprint(f\"{tr} {va} {n - tr - va}\")",
              "solutionExplanation": "Multiply n by each fraction and truncate; the test set gets whatever remains.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "100 0.7 0.15",
                  "expectedStdout": "70 15 15\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "200 0.6 0.2",
                  "expectedStdout": "120 40 40\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Split sizes from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "model-evaluation-feature-engineering-m1-l2",
            "slug": "model-evaluation-feature-engineering-m1-l2",
            "title": "k-Fold Cross-Validation",
            "concept": "k-fold cross-validation splits the data into k folds, trains k times with each fold held out once, and averages the scores. Every example is tested exactly once, so the score is less luck-dependent than a single split. Stratified folds keep the class balance the same in every fold.",
            "syntax": "train k times, each fold held out once, average the scores",
            "exampleCode": "n, k = 10, 3\nbase, extra = n // k, n % k\nprint([base + 1 if i < extra else base for i in range(k)])",
            "exampleLanguage": "python",
            "mistake": "Using the same fold for training and testing in one round.",
            "bug": {
              "prompt": "Find the bug: this program should split 10 items into folds of 4, 3 and 3, but the sizes add up to 9.",
              "buggyCode": "n, k = 10, 3\nprint([n // k] * k)",
              "fixedCode": "n, k = 10, 3\nbase, extra = n // k, n % k\nprint([base + 1 if i < extra else base for i in range(k)])",
              "explanation": "Integer division drops the remainder, so the leftover items must be handed out one each to the first folds."
            },
            "exercise": {
              "title": "k-fold sizes",
              "type": "write-code",
              "instructions": "Read n (items) and k (folds) on one line and print the size of each fold, space-separated, giving the first folds one extra item when n does not divide evenly.",
              "starterCode": "import sys\n\n# TODO: read n and k, print the fold sizes\n",
              "solution": "import sys\nn, k = [int(v) for v in sys.stdin.read().split()]\nbase, extra = n // k, n % k\nprint(' '.join(str(base + 1 if i < extra else base) for i in range(k)))",
              "solutionExplanation": "Divide n by k for the base size, take the remainder, and add one to each of the first remainder folds.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "10 3",
                  "expectedStdout": "4 3 3\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "7 2",
                  "expectedStdout": "4 3\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of k-fold sizes from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "model-evaluation-feature-engineering-m1-l3",
            "slug": "model-evaluation-feature-engineering-m1-l3",
            "title": "Bias-Variance Tradeoff",
            "concept": "Bias is error from a model that is too simple to capture the pattern, and variance is error from a model that is too sensitive to the training sample. Total error is bias squared plus variance plus irreducible noise. Simple models have high bias and low variance; complex models have the reverse, and the best model balances the two.",
            "syntax": "error = bias^2 + variance + noise",
            "exampleCode": "print('simple: high bias, low variance; complex: low bias, high variance')",
            "exampleLanguage": "python",
            "mistake": "Adding complexity to fix high bias when the problem is actually high variance.",
            "bug": {
              "prompt": "Find the bug: this program should say a simple model has high bias, but it says the opposite.",
              "buggyCode": "complexity = 'low'\nprint('low bias' if complexity == 'low' else 'high bias')",
              "fixedCode": "complexity = 'low'\nprint('high bias' if complexity == 'low' else 'low bias')",
              "explanation": "A simple model cannot capture the pattern, so its error is mostly bias, not variance."
            },
            "exercise": {
              "title": "Check your understanding: bias-variance tradeoff",
              "type": "multiple-choice",
              "instructions": "Which statement about the bias-variance tradeoff is correct?",
              "starterCode": "",
              "solution": "Total error is bias squared plus variance plus irreducible noise, and simple models trade bias against variance.",
              "solutionExplanation": "Total error is bias squared plus variance plus irreducible noise, and simple models trade bias against variance. The other options contradict the lesson.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Total error is bias squared plus variance plus irreducible noise, and simple models trade bias against variance.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Check your understanding: bias-variance tradeoff from the lesson: which statement is actually true?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true in general."
              },
              "options": [
                "Complex models always have both low bias and low variance.",
                "Bias and variance both fall as a model gets more complex.",
                "The tradeoff disappears once the dataset is large enough.",
                "Total error is bias squared plus variance plus irreducible noise, and simple models trade bias against variance."
              ],
              "answerIndex": 3
            }
          },
          {
            "id": "model-evaluation-feature-engineering-m1-l4",
            "slug": "model-evaluation-feature-engineering-m1-l4",
            "title": "Overfitting vs Underfitting",
            "concept": "Overfitting is high variance: the model fits training noise and fails on new data, shown by training accuracy far above test accuracy. Underfitting is high bias: the model is too simple and fails everywhere, shown by poor accuracy on both sets. The cure depends on the diagnosis, so the gap between the two accuracies is the first thing to check.",
            "syntax": "overfitting: train high, test low; underfitting: both low",
            "exampleCode": "train_acc, test_acc = 1.0, 0.62\nprint(f'gap: {train_acc - test_acc:.2f}')",
            "exampleLanguage": "python",
            "mistake": "Adding capacity to fix overfitting, which makes the gap worse.",
            "bug": {
              "prompt": "Find the bug: this program should print the gap 0.38, but it prints -0.38.",
              "buggyCode": "train_acc, test_acc = 1.0, 0.62\nprint(f'{test_acc - train_acc:.2f}')",
              "fixedCode": "train_acc, test_acc = 1.0, 0.62\nprint(f'{train_acc - test_acc:.2f}')",
              "explanation": "The gap is training accuracy minus test accuracy."
            },
            "exercise": {
              "title": "Train-test accuracy gap",
              "type": "write-code",
              "instructions": "Read the training accuracy and test accuracy on one line, and print the gap (train minus test) with four decimal places.",
              "starterCode": "import sys\n\n# TODO: read the two accuracies and print the gap\n",
              "solution": "import sys\ntrain_acc, test_acc = [float(v) for v in sys.stdin.read().split()]\nprint(f\"{train_acc - test_acc:.4f}\")",
              "solutionExplanation": "Subtract the test accuracy from the training accuracy.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "1.0 0.62",
                  "expectedStdout": "0.3800\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "0.95 0.9",
                  "expectedStdout": "0.0500\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Train-test accuracy gap from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "model-evaluation-feature-engineering-m1-l5",
            "slug": "model-evaluation-feature-engineering-m1-l5",
            "title": "Hyperparameter Search: Grid and Random",
            "concept": "Grid search tries every combination of the listed hyperparameter values, so its cost is the product of the option counts. Random search samples combinations at random and usually finds a good setting faster, because only a few hyperparameters matter much. Both are judged on the validation set.",
            "syntax": "grid cost = product of the option counts",
            "exampleCode": "print('3 x 4 x 2 options = 24 combinations')",
            "exampleLanguage": "python",
            "mistake": "Grid searching a huge space and running out of time before finishing.",
            "bug": {
              "prompt": "Find the bug: this program should print 24 combinations, but it prints 9.",
              "buggyCode": "counts = [3, 4, 2]\nprint(sum(counts))",
              "fixedCode": "counts = [3, 4, 2]\nresult = 1\nfor c in counts:\n    result *= c\nprint(result)",
              "explanation": "The number of combinations is the product of the option counts, not their sum."
            },
            "exercise": {
              "title": "Check your understanding: hyperparameter search",
              "type": "multiple-choice",
              "instructions": "Which statement about hyperparameter search is correct?",
              "starterCode": "",
              "solution": "Grid search tries every combination, so its cost is the product of the option counts, while random search samples combinations.",
              "solutionExplanation": "Grid search tries every combination, so its cost is the product of the option counts, while random search samples combinations. The other options contradict the lesson.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "Grid search tries every combination, so its cost is the product of the option counts, while random search samples combinations.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Check your understanding: hyperparameter search from the lesson: which statement is actually true?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true in general."
              },
              "options": [
                "Grid search tries every combination, so its cost is the product of the option counts, while random search samples combinations.",
                "Grid search cost is the sum of the option counts.",
                "Random search always tries every combination eventually.",
                "Hyperparameters should be tuned on the test set."
              ],
              "answerIndex": 0
            }
          }
        ]
      },
      {
        "id": "model-evaluation-feature-engineering-m2",
        "title": "Model Evaluation, Cross-Validation & Feature Engineering in Depth",
        "level": "advanced",
        "lessons": [
          {
            "id": "model-evaluation-feature-engineering-m2-l1",
            "slug": "model-evaluation-feature-engineering-m2-l1",
            "title": "Handling Missing Values",
            "concept": "Missing values must be handled, not ignored: mean imputation replaces a gap with the feature's mean, which keeps the row but pulls the distribution toward the centre. Imputation statistics must come from the training set only, or information leaks from the test set. Sometimes the fact that a value is missing is itself a useful feature.",
            "syntax": "impute with the training mean; never with the test mean",
            "exampleCode": "xs = [1, 2, 4]\nprint(sum(xs) / len(xs))",
            "exampleLanguage": "python",
            "mistake": "Filling missing values with zero, which invents a value the feature never takes.",
            "bug": {
              "prompt": "Find the bug: this program should compute the mean of the present values, but it divides by the wrong count.",
              "buggyCode": "xs = [1, 2, 4]\nprint(sum(xs) / 4)",
              "fixedCode": "xs = [1, 2, 4]\nprint(sum(xs) / len(xs))",
              "explanation": "The mean of the present values divides by how many are present, three here, not by the length including the missing one."
            },
            "exercise": {
              "title": "Mean imputation",
              "type": "write-code",
              "instructions": "Read a line of numbers where -1 marks a missing value. Print the list with each -1 replaced by the mean of the present values, with four decimal places, space-separated.",
              "starterCode": "import sys\n\n# TODO: read the values and impute the missing ones with the mean\n",
              "solution": "import sys\nxs = [float(v) for v in sys.stdin.read().split()]\npresent = [x for x in xs if x != -1]\nmean = sum(present) / len(present)\nprint(\" \".join(f\"{(mean if x == -1 else x):.4f}\" for x in xs))",
              "solutionExplanation": "Average the present values, then replace each missing marker with that mean.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "1 2 -1 4",
                  "expectedStdout": "1.0000 2.0000 2.3333 4.0000\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "5 -1 -1 7",
                  "expectedStdout": "5.0000 6.0000 6.0000 7.0000\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Mean imputation from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "model-evaluation-feature-engineering-m2-l2",
            "slug": "model-evaluation-feature-engineering-m2-l2",
            "title": "Encoding Categorical Features",
            "concept": "Categorical features must become numbers before a model can use them: one-hot encoding makes one binary column per category, so no false ordering is implied. Label encoding assigns integers, which wrongly suggests that red is less than blue. One-hot is the safe default for nominal categories.",
            "syntax": "one-hot: one binary column per category",
            "exampleCode": "cats = ['red', 'blue', 'green']\nprint([1 if c == 'blue' else 0 for c in cats])",
            "exampleLanguage": "python",
            "mistake": "Label encoding a nominal category, which invents an ordering that does not exist.",
            "bug": {
              "prompt": "Find the bug: this program should one-hot encode 'blue', but it encodes 'red'.",
              "buggyCode": "cats = ['red', 'blue', 'green']\nprint([1 if c == 'red' else 0 for c in cats])",
              "fixedCode": "cats = ['red', 'blue', 'green']\nprint([1 if c == 'blue' else 0 for c in cats])",
              "explanation": "One-hot encoding puts the one in the position of the actual value, blue here, not in the first position."
            },
            "exercise": {
              "title": "One-hot encode a value",
              "type": "write-code",
              "instructions": "Read the categories on the first line and a value on the second line. Print the one-hot encoding as space-separated 0s and 1s.",
              "starterCode": "import sys\n\n# TODO: read the categories and value, print the one-hot encoding\n",
              "solution": "import sys\nlines = sys.stdin.read().strip().splitlines()\ncats = lines[0].split()\nval = lines[1].strip()\nprint(' '.join('1' if c == val else '0' for c in cats))",
              "solutionExplanation": "Put a one in the position matching the value and zeros elsewhere.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "red blue green\nblue",
                  "expectedStdout": "0 1 0\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "a b c\nc",
                  "expectedStdout": "0 0 1\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of One-hot encode a value from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "model-evaluation-feature-engineering-m2-l3",
            "slug": "model-evaluation-feature-engineering-m2-l3",
            "title": "Feature Scaling and Pipelines",
            "concept": "A pipeline chains preprocessing and modelling so the same steps run on training and test data, with statistics fitted on training data only. Standardisation inside the pipeline cannot leak test information, because the pipeline is fitted on the training split alone. Pipelines also make cross-validation honest, since each fold refits the preprocessing.",
            "syntax": "pipeline: fit preprocessing on train, apply to train and test",
            "exampleCode": "print('a pipeline fits scaling on train and applies it everywhere')",
            "exampleLanguage": "python",
            "mistake": "Scaling the whole dataset before splitting, which leaks test statistics into training.",
            "bug": {
              "prompt": "Find the bug: this program should standardise with the training mean, but it uses the whole-data mean.",
              "buggyCode": "train_mean, all_mean = 50.0, 55.0\nx = 60.0\nprint((x - all_mean) / 10)",
              "fixedCode": "train_mean, all_mean = 50.0, 55.0\nx = 60.0\nprint((x - train_mean) / 10)",
              "explanation": "Preprocessing statistics must come from the training split alone, or test information leaks into training."
            },
            "exercise": {
              "title": "Check your understanding: pipelines",
              "type": "multiple-choice",
              "instructions": "Which statement about feature pipelines is correct?",
              "starterCode": "",
              "solution": "A pipeline fits preprocessing on the training data only, so test statistics cannot leak into training.",
              "solutionExplanation": "A pipeline fits preprocessing on the training data only, so test statistics cannot leak into training. The other options contradict the lesson.",
              "tests": [
                {
                  "name": "Correct answer",
                  "expectedContains": "A pipeline fits preprocessing on the training data only, so test statistics cannot leak into training.",
                  "hidden": false
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Check your understanding: pipelines from the lesson: which statement is actually true?",
                "approach": "Rule out the options that sound impossible or too extreme, then pick the one that matches the lesson.",
                "structure": "There is one correct option and three distractors; choose the statement that is true in general."
              },
              "options": [
                "Preprocessing should always be fitted on the whole dataset before splitting.",
                "A pipeline fits preprocessing on the training data only, so test statistics cannot leak into training.",
                "Pipelines make cross-validation dishonest by reusing statistics.",
                "Scaling inside a pipeline changes the model's predictions at random."
              ],
              "answerIndex": 1
            }
          },
          {
            "id": "model-evaluation-feature-engineering-m2-l4",
            "slug": "model-evaluation-feature-engineering-m2-l4",
            "title": "Feature Selection Methods",
            "concept": "Feature selection drops features that do not help: filter methods rank features by correlation with the target, wrapper methods try subsets, and embedded methods like lasso drop features during training. Fewer features mean faster models and less overfitting. Selection must happen inside each cross-validation fold, or it leaks.",
            "syntax": "keep features that correlate with the target; drop the rest",
            "exampleCode": "corrs = [0.2, -0.8, 0.5]\nprint(max(range(3), key=lambda i: abs(corrs[i])))",
            "exampleLanguage": "python",
            "mistake": "Selecting features on the whole dataset before cross-validation, which leaks information across folds.",
            "bug": {
              "prompt": "Find the bug: this program should pick the most correlated feature, but it picks the least.",
              "buggyCode": "corrs = [0.2, -0.8, 0.5]\nprint(min(range(3), key=lambda i: abs(corrs[i])))",
              "fixedCode": "corrs = [0.2, -0.8, 0.5]\nprint(max(range(3), key=lambda i: abs(corrs[i])))",
              "explanation": "The best feature has the largest absolute correlation, so the choice must maximise, not minimise."
            },
            "exercise": {
              "title": "Standardise a feature",
              "type": "write-code",
              "instructions": "Read a line of numbers and print them standardised (subtract the mean, divide by the population standard deviation) with four decimal places, space-separated.",
              "starterCode": "import sys\n\n# TODO: read the numbers and print them standardised\n",
              "solution": "import sys\nxs = [float(v) for v in sys.stdin.read().split()]\nmean = sum(xs) / len(xs)\nstd = (sum((x - mean) ** 2 for x in xs) / len(xs)) ** 0.5\nprint(\" \".join(f\"{(x - mean) / std:.4f}\" for x in xs))",
              "solutionExplanation": "Subtract the mean from each value and divide by the standard deviation.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "10 20 30",
                  "expectedStdout": "-1.2247 0.0000 1.2247\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "2 4 6 8",
                  "expectedStdout": "-1.3416 -0.4472 0.4472 1.3416\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Standardise a feature from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          },
          {
            "id": "model-evaluation-feature-engineering-m2-l5",
            "slug": "model-evaluation-feature-engineering-m2-l5",
            "title": "Data Leakage and How to Avoid It",
            "concept": "Data leakage is information from the target or the test set sneaking into training, which makes validation scores look far better than the model really is. Common leaks are scaling before splitting, selecting features on the whole dataset, and including a column derived from the target. The test set must stay untouched until the final evaluation.",
            "syntax": "leakage: target or test information in training",
            "exampleCode": "print('scaling before splitting leaks test statistics into training')",
            "exampleLanguage": "python",
            "mistake": "Including a column that is computed from the target and calling it a feature.",
            "bug": {
              "prompt": "Find the bug: this program should say scaling before splitting leaks, but it says it is safe.",
              "buggyCode": "order = 'scale then split'\nprint('safe' if order == 'scale then split' else 'leaks')",
              "fixedCode": "order = 'scale then split'\nprint('leaks' if order == 'scale then split' else 'safe')",
              "explanation": "Scaling before splitting uses test statistics to fit the preprocessing, which is leakage."
            },
            "exercise": {
              "title": "Best feature by absolute correlation",
              "type": "write-code",
              "instructions": "Read a line of correlation values (one per feature) and print the index (0-based) of the feature with the largest absolute correlation.",
              "starterCode": "import sys\n\n# TODO: read correlations and print the best feature index\n",
              "solution": "import sys\ncorrs = [float(v) for v in sys.stdin.read().split()]\nprint(max(range(len(corrs)), key=lambda i: abs(corrs[i])))",
              "solutionExplanation": "Compare the absolute values of the correlations and report the winning index.",
              "tests": [
                {
                  "name": "Visible test",
                  "stdin": "0.2 -0.8 0.5",
                  "expectedStdout": "1\n",
                  "hidden": false
                },
                {
                  "name": "Hidden test",
                  "stdin": "0.9 0.1 -0.3",
                  "expectedStdout": "0\n",
                  "hidden": true
                }
              ],
              "hintNotes": {
                "concept": "Recall the core idea of Best feature by absolute correlation from the lesson: what quantity must the program compute?",
                "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
                "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
              }
            }
          }
        ]
      }
    ],
    "capstoneExercise": {
      "title": "Evaluate a classifier and standardise a feature",
      "type": "write-code",
      "instructions": "Read predictions on the first line, true labels on the second line, and feature values on the third line. On the first line print the accuracy with four decimal places; on the second line print TP, FP, TN, FN; on the third line print the standardised feature values with four decimal places, space-separated.",
      "starterCode": "import sys\n\n# TODO: score the classifier and standardise the feature\n",
      "solution": "import sys\nlines = sys.stdin.read().strip().splitlines()\npred = [int(v) for v in lines[0].split()]\ntrue = [int(v) for v in lines[1].split()]\nxs = [float(v) for v in lines[2].split()]\nacc = sum(1 for p, t in zip(pred, true) if p == t) / len(true)\nprint(f\"{acc:.4f}\")\ntp = sum(1 for p, t in zip(pred, true) if p == 1 and t == 1)\nfp = sum(1 for p, t in zip(pred, true) if p == 1 and t == 0)\ntn = sum(1 for p, t in zip(pred, true) if p == 0 and t == 0)\nfn = sum(1 for p, t in zip(pred, true) if p == 0 and t == 1)\nprint(f\"{tp} {fp} {tn} {fn}\")\nmean = sum(xs) / len(xs)\nstd = (sum((x - mean) ** 2 for x in xs) / len(xs)) ** 0.5\nprint(\" \".join(f\"{(x - mean) / std:.4f}\" for x in xs))",
      "solutionExplanation": "Accuracy counts matching pairs, the confusion counts pair predictions with truths, and standardisation uses the training mean and standard deviation.",
      "tests": [
        {
          "name": "Visible test",
          "stdin": "1 0 1 1\n1 0 0 1\n10 20 30",
          "expectedStdout": "0.7500\n2 1 1 0\n-1.2247 0.0000 1.2247\n",
          "hidden": false
        },
        {
          "name": "Hidden test",
          "stdin": "1 1 0 0\n1 0 1 0\n2 4 6 8",
          "expectedStdout": "0.5000\n1 1 1 1\n-1.3416 -0.4472 0.4472 1.3416\n",
          "hidden": true
        }
      ],
      "hintNotes": {
        "concept": "Recall the core idea of Evaluate a classifier and standardise a feature from the lesson: what quantity must the program compute?",
        "approach": "Work the answer out on paper for the example input first, then translate each step into Python.",
        "structure": "Read the numbers from stdin, compute the result step by step, and print it in the required format."
      }
    },
    "capstone": {
      "title": "Model Evaluation Capstone",
      "description": "Build a complete evaluation in pure Python: score a classifier, build its confusion matrix, and standardise a feature.",
      "requirements": [
        "Read predictions, true labels and feature values.",
        "Compute the accuracy and the TP, FP, TN, FN counts.",
        "Standardise the feature values with the population standard deviation.",
        "Print all three results in the required format."
      ],
      "rubric": [
        "The program runs and prints the correct accuracy, confusion counts and standardised values for both test inputs.",
        "Accuracy divides the matches by the total number of examples.",
        "True positives require both prediction and truth to be one.",
        "Standardisation divides by the standard deviation, not the variance."
      ]
    }
  }
]);

export const TRACKS_700 = courses;
export const SHORT_ASSESSMENTS_700 = assessments;
