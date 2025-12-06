// Sri Lankan School Constants
export const GRADES = {
  PRIMARY: [1, 2, 3, 4, 5],
  JUNIOR_SECONDARY: [6, 7, 8, 9],
  O_LEVEL: [10, 11],
  A_LEVEL: [12, 13],
  ALL: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
};

export const SECTIONS = {
  PRIMARY: 'Primary',
  JUNIOR_SECONDARY: 'Junior Secondary',
  O_LEVEL: 'O/L Section',
  A_LEVEL: 'A/L Section'
};

export const MEDIUMS = ['Sinhala', 'Tamil', 'English'];

export const A_LEVEL_STREAMS = ['Science', 'Commerce', 'Arts', 'Technology'];

export const TERMS = [1, 2, 3];

export const GRADES_SCHEME = {
  A: { min: 75, max: 100, description: 'Distinction' },
  B: { min: 65, max: 74, description: 'Very Good' },
  C: { min: 50, max: 64, description: 'Credit' },
  S: { min: 35, max: 49, description: 'Satisfactory' },
  F: { min: 0, max: 34, description: 'Fail' }
};

// Sri Lankan Subjects by Grade
export const SUBJECTS_BY_GRADE = {
  1: ['Sinhala', 'Tamil', 'English', 'Mathematics', 'Environmental Studies', 'Religion', 'Aesthetics'],
  2: ['Sinhala', 'Tamil', 'English', 'Mathematics', 'Environmental Studies', 'Religion', 'Aesthetics'],
  3: ['Sinhala', 'Tamil', 'English', 'Mathematics', 'Environmental Studies', 'Religion', 'Aesthetics'],
  4: ['Sinhala', 'Tamil', 'English', 'Mathematics', 'Science', 'History', 'Geography', 'Religion', 'Aesthetics'],
  5: ['Sinhala', 'Tamil', 'English', 'Mathematics', 'Science', 'History', 'Geography', 'Religion', 'Aesthetics'],
  // Grade 6-9 (Junior Secondary)
  6: ['Sinhala', 'Tamil', 'English', 'Mathematics', 'Science', 'History', 'Geography', 'Religion', 'Aesthetics', 'ICT'],
  7: ['Sinhala', 'Tamil', 'English', 'Mathematics', 'Science', 'History', 'Geography', 'Religion', 'Aesthetics', 'ICT'],
  8: ['Sinhala', 'Tamil', 'English', 'Mathematics', 'Science', 'History', 'Geography', 'Religion', 'Aesthetics', 'ICT'],
  9: ['Sinhala', 'Tamil', 'English', 'Mathematics', 'Science', 'History', 'Geography', 'Religion', 'Aesthetics', 'ICT', 'Commerce'],
  // Grade 10-11 (O/L)
  10: ['Sinhala', 'Tamil', 'English', 'Mathematics', 'Science', 'History', 'Geography', 'Religion', 'Aesthetics', 'ICT', 'Commerce', 'Health'],
  11: ['Sinhala', 'Tamil', 'English', 'Mathematics', 'Science', 'History', 'Geography', 'Religion', 'Aesthetics', 'ICT', 'Commerce', 'Health'],
  // Grade 12-13 (A/L - varies by stream)
  12: {
    Science: ['Combined Mathematics', 'Physics', 'Chemistry', 'Biology', 'General English', 'General Knowledge'],
    Commerce: ['Business Studies', 'Accounting', 'Economics', 'General English', 'General Knowledge', 'ICT'],
    Arts: ['Sinhala', 'History', 'Geography', 'Economics', 'General English', 'General Knowledge'],
    Technology: ['Engineering Technology', 'Biosystems Technology', 'Science for Technology', 'General English', 'General Knowledge']
  },
  13: {
    Science: ['Combined Mathematics', 'Physics', 'Chemistry', 'Biology', 'General English', 'General Knowledge'],
    Commerce: ['Business Studies', 'Accounting', 'Economics', 'General English', 'General Knowledge', 'ICT'],
    Arts: ['Sinhala', 'History', 'Geography', 'Economics', 'General English', 'General Knowledge'],
    Technology: ['Engineering Technology', 'Biosystems Technology', 'Science for Technology', 'General English', 'General Knowledge']
  }
};

export const ROLES = {
  ADMIN: 'admin',
  TEACHER: 'teacher',
  STUDENT: 'student',
  PARENT: 'parent'
};

