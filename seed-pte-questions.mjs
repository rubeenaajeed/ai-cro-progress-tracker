import mysql from 'mysql2/promise';
import { nanoid } from 'nanoid';

const dbUrl = process.env.DATABASE_URL || '';
const urlParts = dbUrl.match(/mysql:\/\/([^:]+):([^@]+)@([^/]+)\/(.+)/);
const [, user, password, host, database] = urlParts || ['', 'root', '', 'localhost', 'test'];

const pool = mysql.createPool({
  connectionLimit: 1,
  host,
  user,
  password,
  database,
});

const writingQuestions = [
  // Summarize Written Text Questions (15 questions)
  {
    questionType: 'summarize-written-text',
    difficulty: 'easy',
    weekNumber: 1,
    content: 'Read the passage and summarize it in ONE sentence (maximum 75 words):\n\nSolar energy is a renewable resource that comes directly from the sun. It can be converted into thermal energy or electricity. Solar panels are becoming increasingly affordable and efficient, making solar power a viable alternative to fossil fuels for many households and businesses.',
    correctAnswerExplanation: 'A good summary should mention: solar energy source, conversion methods, and growing viability. Example: "Solar energy from the sun can be converted to thermal energy or electricity, and increasingly affordable solar panels make it a viable alternative to fossil fuels."'
  },
  {
    questionType: 'summarize-written-text',
    difficulty: 'easy',
    weekNumber: 1,
    content: 'Read the passage and summarize it in ONE sentence (maximum 75 words):\n\nWater pollution is a critical environmental issue affecting millions of people worldwide. Industrial waste, agricultural runoff, and plastic debris contaminate rivers, lakes, and oceans. This pollution threatens aquatic life and makes water unsafe for human consumption and recreation.',
    correctAnswerExplanation: 'A good summary should capture: types of water pollution, sources, and consequences. Example: "Water pollution from industrial waste, agricultural runoff, and plastic debris contaminates water bodies, threatening aquatic life and making water unsafe for human use."'
  },
  {
    questionType: 'summarize-written-text',
    difficulty: 'medium',
    weekNumber: 1,
    content: 'Read the passage and summarize it in ONE sentence (maximum 75 words):\n\nThe gig economy has transformed employment patterns in recent years. Workers now have flexibility to choose their own hours and projects through platforms like Uber, Fiverr, and Upwork. However, this flexibility comes with challenges such as lack of job security, limited benefits, and income unpredictability.',
    correctAnswerExplanation: 'A good summary should mention: gig economy definition, flexibility benefits, and associated challenges. Example: "The gig economy offers workers flexibility through platforms like Uber and Fiverr, but lacks job security, benefits, and income stability."'
  },
  {
    questionType: 'summarize-written-text',
    difficulty: 'medium',
    weekNumber: 1,
    content: 'Read the passage and summarize it in ONE sentence (maximum 75 words):\n\nMental health awareness has increased significantly in recent years. Schools, workplaces, and healthcare providers now recognize the importance of addressing anxiety, depression, and stress. This shift has led to better support systems and reduced stigma around seeking professional help.',
    correctAnswerExplanation: 'A good summary should capture: increased awareness, recognition in various sectors, and positive outcomes. Example: "Increased mental health awareness in schools, workplaces, and healthcare has improved support systems and reduced stigma around seeking help."'
  },
  {
    questionType: 'summarize-written-text',
    difficulty: 'medium',
    weekNumber: 1,
    content: 'Read the passage and summarize it in ONE sentence (maximum 75 words):\n\nRemote work has become mainstream following the global pandemic. Many companies now offer flexible work arrangements, allowing employees to work from home or hybrid schedules. This shift has improved work-life balance for many but has also created challenges in team collaboration and company culture.',
    correctAnswerExplanation: 'A good summary should mention: remote work prevalence, benefits, and challenges. Example: "Remote work has become mainstream, improving work-life balance but creating challenges in team collaboration and company culture."'
  },
  {
    questionType: 'summarize-written-text',
    difficulty: 'hard',
    weekNumber: 2,
    content: 'Read the passage and summarize it in ONE sentence (maximum 75 words):\n\nBlockchain technology, originally developed for cryptocurrency, has applications beyond finance. It enables secure, transparent transactions and record-keeping across various industries including healthcare, supply chain management, and voting systems. However, widespread adoption faces obstacles such as scalability issues, regulatory uncertainty, and the need for technical expertise.',
    correctAnswerExplanation: 'A good summary should capture: blockchain applications, benefits, and adoption challenges. Example: "Blockchain technology enables secure transactions across finance, healthcare, and supply chain, but faces scalability, regulatory, and technical expertise challenges."'
  },
  {
    questionType: 'summarize-written-text',
    difficulty: 'hard',
    weekNumber: 2,
    content: 'Read the passage and summarize it in ONE sentence (maximum 75 words):\n\nGlobalization has created interconnected economies where goods, services, and capital flow across borders. While this has increased economic growth and consumer choice, it has also led to job displacement in developed nations, environmental concerns, and cultural homogenization. The benefits and drawbacks of globalization remain hotly debated.',
    correctAnswerExplanation: 'A good summary should mention: globalization definition, benefits, drawbacks, and ongoing debate. Example: "Globalization increases economic growth and consumer choice but causes job displacement, environmental concerns, and cultural homogenization, with ongoing debate about its overall impact."'
  },
  {
    questionType: 'summarize-written-text',
    difficulty: 'hard',
    weekNumber: 2,
    content: 'Read the passage and summarize it in ONE sentence (maximum 75 words):\n\nClimate change is accelerating faster than previously predicted. Rising temperatures are causing more frequent extreme weather events, melting polar ice, and rising sea levels. Scientists emphasize that immediate action is needed to reduce greenhouse gas emissions and transition to renewable energy sources.',
    correctAnswerExplanation: 'A good summary should capture: climate change acceleration, consequences, and required actions. Example: "Climate change is accelerating, causing extreme weather, polar ice melting, and sea level rise, requiring immediate action to reduce emissions and transition to renewables."'
  },
  {
    questionType: 'summarize-written-text',
    difficulty: 'hard',
    weekNumber: 2,
    content: 'Read the passage and summarize it in ONE sentence (maximum 75 words):\n\nArtificial intelligence is revolutionizing healthcare through diagnostic tools, personalized treatment plans, and drug discovery. AI algorithms can analyze medical images faster and more accurately than human radiologists. However, concerns about data privacy, algorithm bias, and the need for human oversight remain critical considerations.',
    correctAnswerExplanation: 'A good summary should mention: AI applications in healthcare, advantages, and concerns. Example: "AI revolutionizes healthcare through diagnostics and personalized treatment, analyzing images faster than radiologists, but raises concerns about privacy, bias, and need for human oversight."'
  },
  {
    questionType: 'summarize-written-text',
    difficulty: 'hard',
    weekNumber: 2,
    content: 'Read the passage and summarize it in ONE sentence (maximum 75 words):\n\nThe rise of social media has transformed communication and information sharing. While it enables instant global connectivity and democratizes content creation, it has also facilitated misinformation spread, cyberbullying, and addiction. Platforms face increasing pressure to balance free speech with responsibility.',
    correctAnswerExplanation: 'A good summary should capture: social media impact on communication, benefits, drawbacks, and platform challenges. Example: "Social media enables instant global connectivity and content creation but facilitates misinformation, cyberbullying, and addiction, forcing platforms to balance free speech with responsibility."'
  },
  {
    questionType: 'summarize-written-text',
    difficulty: 'hard',
    weekNumber: 2,
    content: 'Read the passage and summarize it in ONE sentence (maximum 75 words):\n\nUrbanization is accelerating worldwide as people migrate from rural to urban areas seeking better employment and services. Cities offer economic opportunities but face challenges including overcrowding, pollution, inadequate housing, and strain on infrastructure. Sustainable urban planning is essential for managing this growth.',
    correctAnswerExplanation: 'A good summary should mention: urbanization trend, opportunities, challenges, and solutions. Example: "Urbanization accelerates as people seek better employment and services, but cities face overcrowding, pollution, and infrastructure strain, requiring sustainable planning."'
  },
  {
    questionType: 'summarize-written-text',
    difficulty: 'hard',
    weekNumber: 2,
    content: 'Read the passage and summarize it in ONE sentence (maximum 75 words):\n\nGenetic engineering offers potential solutions to disease prevention and food security. Scientists can modify genes to create disease-resistant crops and develop treatments for genetic disorders. However, ethical concerns about genetic modification, unintended ecological consequences, and equitable access to these technologies require careful consideration.',
    correctAnswerExplanation: 'A good summary should capture: genetic engineering applications, benefits, and ethical concerns. Example: "Genetic engineering can prevent diseases and improve food security through gene modification, but raises ethical concerns about ecological consequences and equitable access."'
  },
  {
    questionType: 'summarize-written-text',
    difficulty: 'hard',
    weekNumber: 2,
    content: 'Read the passage and summarize it in ONE sentence (maximum 75 words):\n\nThe sharing economy has disrupted traditional business models through platforms like Airbnb and TaskRabbit. It enables individuals to monetize underutilized assets and provides consumers with affordable alternatives. However, it raises concerns about labor rights, tax compliance, and impact on traditional industries.',
    correctAnswerExplanation: 'A good summary should mention: sharing economy definition, benefits, and concerns. Example: "The sharing economy enables monetization of assets and affordable alternatives through platforms like Airbnb, but raises concerns about labor rights, taxes, and industry impact."'
  },
  {
    questionType: 'summarize-written-text',
    difficulty: 'hard',
    weekNumber: 2,
    content: 'Read the passage and summarize it in ONE sentence (maximum 75 words):\n\nCybersecurity threats are increasing as digital transformation accelerates. Hackers target businesses, governments, and individuals through phishing, ransomware, and data breaches. Organizations must invest in robust security measures, employee training, and incident response plans to protect sensitive information.',
    correctAnswerExplanation: 'A good summary should capture: cybersecurity threats, examples, and required protections. Example: "Cybersecurity threats like phishing and ransomware target businesses and individuals, requiring investment in security measures, training, and incident response plans."'
  },
  {
    questionType: 'summarize-written-text',
    difficulty: 'hard',
    weekNumber: 2,
    content: 'Read the passage and summarize it in ONE sentence (maximum 75 words):\n\nVirtual reality technology is transforming entertainment, education, and training. VR enables immersive experiences for gaming, medical training, and architectural visualization. As the technology becomes more affordable and accessible, adoption is expected to increase significantly across various sectors.',
    correctAnswerExplanation: 'A good summary should mention: VR applications, benefits, and growth prospects. Example: "Virtual reality transforms entertainment, education, and training through immersive experiences, and as technology becomes more affordable, adoption is expected to increase across sectors."'
  },

  // Essay Questions (15 questions)
  {
    questionType: 'essay',
    difficulty: 'medium',
    weekNumber: 1,
    content: 'Write an essay (200-300 words) on the following topic:\n\n"Should universities focus more on practical skills or theoretical knowledge? Discuss both views and give your opinion."',
    correctAnswerExplanation: 'Structure: Introduction (state the debate), Paragraph 1 (practical skills benefits with examples), Paragraph 2 (theoretical knowledge benefits with examples), Paragraph 3 (your balanced opinion), Conclusion. Use formal tone, varied vocabulary, and clear transitions.'
  },
  {
    questionType: 'essay',
    difficulty: 'medium',
    weekNumber: 1,
    content: 'Write an essay (200-300 words) on the following topic:\n\n"Is it better to work for a large company or a small startup? Discuss the advantages and disadvantages of each."',
    correctAnswerExplanation: 'Structure: Introduction (present the choice), Paragraph 1 (large company advantages/disadvantages), Paragraph 2 (startup advantages/disadvantages), Paragraph 3 (your preference with reasoning), Conclusion. Provide specific examples and maintain coherent argument.'
  },
  {
    questionType: 'essay',
    difficulty: 'medium',
    weekNumber: 1,
    content: 'Write an essay (200-300 words) on the following topic:\n\n"How has social media changed the way people communicate? Discuss both positive and negative effects."',
    correctAnswerExplanation: 'Structure: Introduction (social media impact overview), Paragraph 1 (positive effects with examples), Paragraph 2 (negative effects with examples), Paragraph 3 (balanced conclusion), Conclusion. Use specific examples and maintain formal academic tone.'
  },
  {
    questionType: 'essay',
    difficulty: 'medium',
    weekNumber: 1,
    content: 'Write an essay (200-300 words) on the following topic:\n\n"Is remote work better than working in an office? Discuss both perspectives."',
    correctAnswerExplanation: 'Structure: Introduction (present the debate), Paragraph 1 (remote work benefits), Paragraph 2 (office work benefits), Paragraph 3 (your opinion or balanced view), Conclusion. Use clear examples and maintain logical flow.'
  },
  {
    questionType: 'essay',
    difficulty: 'medium',
    weekNumber: 1,
    content: 'Write an essay (200-300 words) on the following topic:\n\n"Should governments invest more in public transportation or encourage private vehicles? Discuss both options."',
    correctAnswerExplanation: 'Structure: Introduction (present the choice), Paragraph 1 (public transportation benefits), Paragraph 2 (private vehicle benefits), Paragraph 3 (your recommendation with reasoning), Conclusion. Include specific examples and maintain coherent argument.'
  },
  {
    questionType: 'essay',
    difficulty: 'hard',
    weekNumber: 2,
    content: 'Write an essay (200-300 words) on the following topic:\n\n"Technology has both positive and negative impacts on education. Discuss both views and give your own opinion."',
    correctAnswerExplanation: 'Structure: Introduction (technology in education), Paragraph 1 (positive impacts with examples), Paragraph 2 (negative impacts with examples), Paragraph 3 (your balanced opinion), Conclusion. Use academic language, varied sentence structures, and clear transitions.'
  },
  {
    questionType: 'essay',
    difficulty: 'hard',
    weekNumber: 2,
    content: 'Write an essay (200-300 words) on the following topic:\n\n"Is it more important to protect the environment or promote economic growth? Discuss both perspectives."',
    correctAnswerExplanation: 'Structure: Introduction (present the dilemma), Paragraph 1 (environmental protection importance), Paragraph 2 (economic growth importance), Paragraph 3 (your balanced view or solution), Conclusion. Demonstrate critical thinking and use relevant examples.'
  },
  {
    questionType: 'essay',
    difficulty: 'hard',
    weekNumber: 2,
    content: 'Write an essay (200-300 words) on the following topic:\n\n"Should artificial intelligence be regulated by governments? Discuss the arguments for and against regulation."',
    correctAnswerExplanation: 'Structure: Introduction (AI regulation debate), Paragraph 1 (arguments for regulation), Paragraph 2 (arguments against regulation), Paragraph 3 (your opinion with reasoning), Conclusion. Show understanding of the topic and use specific examples.'
  },
  {
    questionType: 'essay',
    difficulty: 'hard',
    weekNumber: 2,
    content: 'Write an essay (200-300 words) on the following topic:\n\n"Is globalization beneficial or harmful to developing countries? Discuss both perspectives."',
    correctAnswerExplanation: 'Structure: Introduction (globalization and developing countries), Paragraph 1 (benefits of globalization), Paragraph 2 (harms of globalization), Paragraph 3 (your nuanced opinion), Conclusion. Use examples and maintain academic tone throughout.'
  },
  {
    questionType: 'essay',
    difficulty: 'hard',
    weekNumber: 2,
    content: 'Write an essay (200-300 words) on the following topic:\n\n"Should universities be free for all students? Discuss the advantages and disadvantages."',
    correctAnswerExplanation: 'Structure: Introduction (free university debate), Paragraph 1 (advantages of free education), Paragraph 2 (disadvantages and challenges), Paragraph 3 (your opinion with reasoning), Conclusion. Provide specific examples and maintain logical argument flow.'
  },
  {
    questionType: 'essay',
    difficulty: 'hard',
    weekNumber: 2,
    content: 'Write an essay (200-300 words) on the following topic:\n\n"How should society balance individual privacy with national security? Discuss both considerations."',
    correctAnswerExplanation: 'Structure: Introduction (privacy vs security), Paragraph 1 (privacy importance), Paragraph 2 (security importance), Paragraph 3 (your balanced perspective), Conclusion. Demonstrate critical thinking and use relevant examples.'
  },
  {
    questionType: 'essay',
    difficulty: 'hard',
    weekNumber: 2,
    content: 'Write an essay (200-300 words) on the following topic:\n\n"Should companies prioritize profit or corporate social responsibility? Discuss both perspectives."',
    correctAnswerExplanation: 'Structure: Introduction (profit vs CSR), Paragraph 1 (profit maximization arguments), Paragraph 2 (CSR importance), Paragraph 3 (your balanced view), Conclusion. Use business examples and maintain formal tone.'
  },
  {
    questionType: 'essay',
    difficulty: 'hard',
    weekNumber: 2,
    content: 'Write an essay (200-300 words) on the following topic:\n\n"Is immigration beneficial for host countries? Discuss both positive and negative effects."',
    correctAnswerExplanation: 'Structure: Introduction (immigration impact), Paragraph 1 (benefits of immigration), Paragraph 2 (challenges and concerns), Paragraph 3 (your balanced opinion), Conclusion. Use specific examples and maintain objective tone.'
  },
  {
    questionType: 'essay',
    difficulty: 'hard',
    weekNumber: 2,
    content: 'Write an essay (200-300 words) on the following topic:\n\n"Should social media platforms be held responsible for user-generated content? Discuss both sides."',
    correctAnswerExplanation: 'Structure: Introduction (platform responsibility debate), Paragraph 1 (arguments for platform responsibility), Paragraph 2 (arguments against responsibility), Paragraph 3 (your opinion with reasoning), Conclusion. Show understanding of digital media issues.'
  },
  {
    questionType: 'essay',
    difficulty: 'hard',
    weekNumber: 2,
    content: 'Write an essay (200-300 words) on the following topic:\n\n"How can cities address the challenges of rapid urbanization? Discuss potential solutions."',
    correctAnswerExplanation: 'Structure: Introduction (urbanization challenges), Paragraph 1 (infrastructure solutions), Paragraph 2 (social and environmental solutions), Paragraph 3 (your recommended approach), Conclusion. Provide specific examples and demonstrate problem-solving thinking.'
  }
];

async function seedQuestions() {
  const connection = await pool.getConnection();
  try {
    console.log('Database Config:', { host, user, database });
    console.log('Starting to seed PTE writing questions...');
    
    for (const question of writingQuestions) {
      const questionId = `write-${question.questionType === 'essay' ? 'essay' : 'summarize'}-${nanoid(6)}`;
      
      const query = `
        INSERT INTO pte_questions (
          id, section, questionType, difficulty, weekNumber, content, 
          options, correctAnswer, correctAnswerExplanation, createdAt, updatedAt
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
      `;
      
      const [result] = await connection.execute(query, [
        questionId,
        'writing',
        question.questionType,
        question.difficulty,
        question.weekNumber,
        question.content,
        null,
        null,
        question.correctAnswerExplanation
      ]);
      
      console.log(`✓ Created: ${questionId}`);
    }
    
    console.log('\n✅ Successfully seeded 30 PTE writing questions!');
    const [countRows] = await connection.execute('SELECT COUNT(*) as count FROM pte_questions WHERE section = "writing"');
    console.log(`Total writing questions in database: ${countRows[0].count}`);
    
  } catch (error) {
    console.error('Error seeding questions:', error);
    process.exit(1);
  } finally {
    await connection.release();
    await pool.end();
  }
}

seedQuestions();
