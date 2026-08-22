// Static fallback/seed source for Testimonial content.

export type TestimonialSeed = {
  parentName: string;
  studentInfo: string;
  quote: string;
  rating: number;
  order: number;
};

export const testimonials: TestimonialSeed[] = [
  {
    parentName: "Priya Nair",
    studentInfo: "Parent of a Class 8 student",
    quote:
      "My son used to put off homework every single evening. Within a month of the routine-building sessions, he was managing his own schedule. It's been a relief for the whole house.",
    rating: 5,
    order: 1,
  },
  {
    parentName: "Rakesh Menon",
    studentInfo: "Parent of a Class 10 student",
    quote:
      "The board exam prep gave her an actual plan instead of just more pressure. Her confidence going into the exams was completely different this year.",
    rating: 5,
    order: 2,
  },
  {
    parentName: "Anjali Verma",
    studentInfo: "Parent of a Class 12 student",
    quote:
      "We were stuck between three different career paths and honestly just guessing. The counseling session gave us a clear, honest way to think it through — not a sales pitch.",
    rating: 5,
    order: 3,
  },
];
