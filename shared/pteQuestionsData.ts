/**
 * PTE Practice Questions Data
 * Sample questions for Reading and Writing sections
 * These will be seeded into the database and expanded weekly
 */

export const pteReadingQuestions = [
  // Multiple Choice - Single Answer (Week 1)
  {
    questionId: "read-mc-single-001",
    section: "reading",
    questionType: "multiple-choice-single",
    difficulty: "easy",
    weekNumber: 1,
    content: "What is the primary purpose of the passage?\n\nThe Industrial Revolution transformed manufacturing through the introduction of mechanized production. Factories replaced cottage industries, and workers moved from rural areas to cities. This shift created new social challenges but also increased productivity and economic growth.",
    options: [
      { id: "a", text: "To explain the causes of urbanization" },
      { id: "b", text: "To describe how the Industrial Revolution changed manufacturing" },
      { id: "c", text: "To argue against factory work" },
      { id: "d", text: "To compare rural and urban economies" }
    ],
    correctAnswer: "b",
    correctAnswerExplanation: "The passage primarily focuses on how the Industrial Revolution transformed manufacturing through mechanization and its effects on society and economy."
  },
  {
    questionId: "read-mc-single-002",
    section: "reading",
    questionType: "multiple-choice-single",
    difficulty: "medium",
    weekNumber: 1,
    content: "According to the passage, what was a consequence of the Industrial Revolution?\n\nClimate change poses unprecedented challenges to global ecosystems. Rising temperatures affect wildlife migration patterns, alter precipitation cycles, and threaten biodiversity. Scientists warn that without immediate action, many species face extinction.",
    options: [
      { id: "a", text: "Increased wildlife migration" },
      { id: "b", text: "Improved precipitation patterns" },
      { id: "c", text: "Threats to biodiversity" },
      { id: "d", text: "Stabilized global temperatures" }
    ],
    correctAnswer: "c",
    correctAnswerExplanation: "The passage states that rising temperatures threaten biodiversity, with many species facing extinction."
  },

  // Multiple Choice - Multiple Answers (Week 1)
  {
    questionId: "read-mc-multi-001",
    section: "reading",
    questionType: "multiple-choice-multiple",
    difficulty: "medium",
    weekNumber: 1,
    content: "Which of the following statements are true according to the passage?\n\nRenewable energy sources like solar and wind power have become increasingly cost-effective. Many countries are investing heavily in renewable infrastructure. However, the transition from fossil fuels requires significant technological advancement and policy changes.",
    options: [
      { id: "a", text: "Renewable energy is now cheaper than fossil fuels" },
      { id: "b", text: "Countries are investing in renewable energy infrastructure" },
      { id: "c", text: "The transition requires technological advancement and policy changes" },
      { id: "d", text: "Fossil fuels are no longer used anywhere" }
    ],
    correctAnswer: ["b", "c"],
    correctAnswerExplanation: "The passage confirms that countries are investing in renewable infrastructure (B) and that the transition requires technological advancement and policy changes (C). Options A and D are not supported by the passage."
  },

  // Re-order Paragraphs (Week 1)
  {
    questionId: "read-reorder-001",
    section: "reading",
    questionType: "reorder-paragraphs",
    difficulty: "medium",
    weekNumber: 1,
    content: "Arrange the following sentences in the correct order:\n\nA) The discovery of antibiotics revolutionized medicine in the 20th century.\nB) However, the overuse of antibiotics has led to the development of resistant bacteria.\nC) Penicillin, discovered by Alexander Fleming, became the first widely used antibiotic.\nD) Today, antibiotic resistance poses a serious threat to public health.",
    options: [
      { id: "1", text: "A, C, B, D" },
      { id: "2", text: "C, A, B, D" },
      { id: "3", text: "A, B, C, D" },
      { id: "4", text: "C, B, A, D" }
    ],
    correctAnswer: "1",
    correctAnswerExplanation: "The correct order is A (general statement about antibiotics), C (specific example), B (consequence), D (current situation). This follows a logical progression from general to specific to consequence to present-day impact."
  },

  // Fill in the Blanks (Week 1)
  {
    questionId: "read-fill-001",
    section: "reading",
    questionType: "fill-in-blanks",
    difficulty: "easy",
    weekNumber: 1,
    content: "Complete the sentence with the most appropriate word:\n\nThe _____ of the new technology was evident in how quickly it was adopted by consumers.",
    options: [
      { id: "a", text: "success" },
      { id: "b", text: "failure" },
      { id: "c", text: "complexity" },
      { id: "d", text: "cost" }
    ],
    correctAnswer: "a",
    correctAnswerExplanation: "The word 'success' fits the context because rapid adoption by consumers indicates the technology was well-received and successful."
  },

  // Writing - Summarize Written Text (Week 2)
  {
    questionId: "write-summarize-001",
    section: "writing",
    questionType: "summarize-written-text",
    difficulty: "medium",
    weekNumber: 2,
    content: "Read the passage and summarize it in ONE sentence (maximum 75 words):\n\nArtificial intelligence has become increasingly integrated into various aspects of modern life. From healthcare diagnostics to autonomous vehicles, AI applications are transforming industries. However, concerns about privacy, job displacement, and ethical implications remain significant challenges that society must address.",
    options: null,
    correctAnswer: null,
    correctAnswerExplanation: "A good summary should mention: AI integration in modern life, its applications, and the challenges it presents. Example: 'While AI is transforming industries through applications in healthcare and transportation, society faces significant challenges regarding privacy, employment, and ethics.'"
  },

  // Writing - Essay (Week 2)
  {
    questionId: "write-essay-001",
    section: "writing",
    questionType: "essay",
    difficulty: "hard",
    weekNumber: 2,
    content: "Write an essay (200-300 words) on the following topic:\n\n'Technology has both positive and negative impacts on society. Discuss both views and give your own opinion.'",
    options: null,
    correctAnswer: null,
    correctAnswerExplanation: "A strong essay should: (1) Introduce the topic, (2) Discuss positive impacts with examples, (3) Discuss negative impacts with examples, (4) Present your opinion, (5) Conclude. Look for clear structure, varied vocabulary, correct grammar, and relevant examples."
  }
];

export const pteWritingQuestions = [
  {
    questionId: "write-summarize-002",
    section: "writing",
    questionType: "summarize-written-text",
    difficulty: "medium",
    weekNumber: 2,
    content: "Read the passage and summarize it in ONE sentence (maximum 75 words):\n\nThe human brain is a complex organ with approximately 86 billion neurons. These neurons communicate through synapses, forming intricate networks that enable thinking, memory, and consciousness. Recent research has revealed that the brain maintains plasticity throughout life, meaning it can form new neural connections and adapt to new experiences.",
    options: null,
    correctAnswer: null,
    correctAnswerExplanation: "A good summary should capture: brain structure (neurons), function (communication/networks), and key finding (neuroplasticity). Example: 'The brain contains billions of neurons that communicate through synapses, enabling cognition and consciousness, and research shows it maintains plasticity to form new connections throughout life.'"
  },

  {
    questionId: "write-essay-002",
    section: "writing",
    questionType: "essay",
    difficulty: "hard",
    weekNumber: 2,
    content: "Write an essay (200-300 words) on the following topic:\n\n'Some people believe that education should focus on practical skills, while others think it should emphasize theoretical knowledge. Discuss both perspectives and provide your opinion.'",
    options: null,
    correctAnswer: null,
    correctAnswerExplanation: "Structure: Introduction (state the issue), Paragraph 1 (practical skills benefits), Paragraph 2 (theoretical knowledge benefits), Paragraph 3 (your opinion/balanced view), Conclusion. Use examples and maintain formal tone."
  }
];

export type PteQuestion = typeof pteReadingQuestions[0];
