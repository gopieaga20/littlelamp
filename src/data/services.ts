// Static fallback/seed source for Service content.
// Mirrors the `Service` + `ServiceFeature` Prisma models — used to seed Postgres
// and as a build-time fallback if the database isn't reachable (see src/lib/content.ts).

export type ServiceSeed = {
  slug: string;
  title: string;
  classRange: string;
  summary: string;
  description: string;
  icon: string; // lucide-react icon name
  features: string[];
  order: number;
};

export const services: ServiceSeed[] = [
  {
    slug: "habit-routine-building",
    title: "Habit & Routine Building",
    classRange: "Class 2–8",
    summary: "Building the study structure young learners don't have yet.",
    description:
      "For many families, the biggest blocker isn't ability — it's the absence of a study routine. We work with your child to build daily habits: a study schedule that fits their energy levels, focus techniques suited to their age, and simple systems for tracking homework and revision. Parents get a lightweight way to reinforce these habits at home without becoming the enforcer.",
    icon: "CalendarClock",
    features: [
      "Personalized daily/weekly study schedule",
      "Focus & time-management techniques for young learners",
      "Simple parent-friendly progress tracking",
    ],
    order: 1,
  },
  {
    slug: "board-exam-prep",
    title: "Study Skills & Board Prep",
    classRange: "Class 9–10",
    summary: "Turning board-exam anxiety into a clear, confident plan.",
    description:
      "Class 9 and 10 bring the first real exam pressure — and often the first real anxiety. We help your child build subject-wise study strategies, exam-taking techniques, and a revision plan mapped to the board syllabus and timeline, so results come from preparation, not panic.",
    icon: "BookOpenCheck",
    features: [
      "Subject-wise strategy for board exam syllabus",
      "Exam-taking techniques & time management",
      "Structured revision plan with milestones",
    ],
    order: 2,
  },
  {
    slug: "career-counseling",
    title: "Competitive Exam & Career Counseling",
    classRange: "Class 11–12",
    summary: "Clarity at the crossroads — stream, exams, and career direction.",
    description:
      "Class 11 and 12 come with high-stakes decisions: which stream, which competitive exams, which career path. Our counselors combine aptitude insights with honest conversation to help your child (and you) make sense of the options — JEE, NEET, CLAT, GRE, TOEFL, or otherwise — without outsourcing the decision to guesswork.",
    icon: "Compass",
    features: [
      "Aptitude-informed stream & career guidance",
      "Competitive exam planning (JEE/NEET/CLAT/GRE/TOEFL/other)",
      "One-on-one sessions with experienced counselors",
    ],
    order: 3,
  },
  {
    slug: "teacher-recommendations",
    title: "Personalized Teacher Recommendations",
    classRange: "All Classes",
    summary: "Vetted, subject-matched tutors — no trial-and-error hiring.",
    description:
      "Finding the right tutor is its own project. We maintain a vetted network of subject teachers and match them to your child's specific gaps, learning style, and schedule — so you skip the trial-and-error of hiring through word of mouth.",
    icon: "UserCheck",
    features: [
      "Vetted, subject-matched tutor network",
      "Matched to your child's learning style",
      "Ongoing check-ins to confirm fit",
    ],
    order: 4,
  },
];
