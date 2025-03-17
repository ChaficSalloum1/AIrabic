
export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  examples: string[];
  nextLessonId?: string;
}

export const lessons: Lesson[] = [
  {
    id: "1",
    title: "Basic Sentence Structure",
    description: "Learn how to form simple sentences in Lebanese Arabic",
    content: "Lebanese Arabic follows Subject-Verb-Object (SVO) order, similar to English. For example: أنا (I) بحب (love) القهوة (coffee).",
    examples: [
      "أنا بحب القهوة - Ana bḥeb l-ahwe (I love coffee)",
      "هوي بيشتغل هون - Huwwe byeshteghel hawn (He works here)"
    ],
    nextLessonId: "2"
  },
  {
    id: "2",
    title: "Present Tense Conjugation",
    description: "Master the present tense verb conjugation",
    content: "Present tense verbs in Lebanese Arabic use prefixes: b- (I/you/we), bi- (he), bt- (she/you).",
    examples: [
      "بكتب - bektob (I write)",
      "بتكتب - btektob (you write)",
      "بيكتب - byektob (he writes)"
    ],
    nextLessonId: "3"
  },
  {
    id: "3",
    title: "Negation (ma...š)",
    description: "Learn to make negative sentences",
    content: "Negation in Lebanese Arabic uses ma- before the verb and -š after it.",
    examples: [
      "ما بحبش - ma bḥebbesh (I don't love)",
      "ما بعرفش - ma ba'refsh (I don't know)"
    ],
    nextLessonId: "4"
  },
  {
    id: "4",
    title: "Question Formation",
    description: "Learn to form questions in Lebanese Arabic",
    content: "Questions can be formed by using question words or changing intonation.",
    examples: [
      "شو بتحب؟ - Shu btḥebb? (What do you like?)",
      "وين رايح؟ - Wayn rayeḥ? (Where are you going?)"
    ],
    nextLessonId: "5"
  },
  {
    id: "5",
    title: "Past Tense",
    description: "Learn to use verbs in the past tense",
    content: "Past tense in Lebanese Arabic uses suffixes instead of prefixes.",
    examples: [
      "كتبت - katabt (I wrote)",
      "كتبنا - katabna (we wrote)"
    ]
  }
];

export const getLessonById = (id: string): Lesson | undefined => {
  return lessons.find(lesson => lesson.id === id);
};
