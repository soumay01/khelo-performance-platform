// All data in this file is DEMONSTRATION data, invented for the prototype.
// It does not describe any real athlete, school, or official event.

export const DEMO_ATHLETE = {
  name: 'Aarav (Demo)',
  ageGroup: '14-16',
  sport: 'Athletics',
  experience: 'Beginner',
  goals: ['Improve sprint speed', 'Build endurance'],
  school: 'Demo Public School',
  isDemo: true,
};

export const DEMO_TESTS = [
  { id: 't1', date: '2026-07-01', sprintTime: 17.8, runDistance: 1.2, pushups: 12, squats: 25, duration: 40 },
  { id: 't2', date: '2026-07-22', sprintTime: 17.4, runDistance: 1.4, pushups: 15, squats: 30, duration: 45 },
  { id: 't3', date: '2026-08-12', sprintTime: 17.1, runDistance: 1.5, pushups: 18, squats: 34, duration: 45 },
  { id: 't4', date: '2026-09-02', sprintTime: 16.9, runDistance: 1.7, pushups: 20, squats: 38, duration: 50 },
  { id: 't5', date: '2026-09-23', sprintTime: 16.6, runDistance: 1.8, pushups: 22, squats: 40, duration: 50 },
  { id: 't6', date: '2026-10-08', sprintTime: 16.4, runDistance: 1.9, pushups: 24, squats: 44, duration: 55 },
];

export const DEMO_SESSIONS = [
  { id: 's1', date: '2026-10-05', minutes: 45, type: 'Strength' },
  { id: 's2', date: '2026-10-06', minutes: 30, type: 'Sprints' },
  { id: 's3', date: '2026-10-08', minutes: 55, type: 'Endurance' },
  { id: 's4', date: '2026-10-09', minutes: 25, type: 'Mobility' },
  { id: 's5', date: '2026-10-11', minutes: 40, type: 'Sprints' },
  { id: 's6', date: '2026-10-13', minutes: 50, type: 'Strength' },
];

export const DEMO_EVENTS = [
  { id: 'e1', name: 'Sample: School Inter-House Athletics Meet', sport: 'Athletics', location: 'Sample City (school ground)', minAge: 13, maxAge: 16, date: '2026-11-20', type: 'School tournament' },
  { id: 'e2', name: 'Sample: District Sprint Trials', sport: 'Athletics', location: 'Sample City (district stadium)', minAge: 14, maxAge: 17, date: '2026-12-05', type: 'Trial / selection' },
  { id: 'e3', name: 'Sample: Community Football Coaching Camp', sport: 'Football', location: 'Sample City (community ground)', minAge: 12, maxAge: 16, date: '2026-11-02', type: 'Coaching program' },
  { id: 'e4', name: 'Sample: Inter-School Badminton Cup', sport: 'Badminton', location: 'Sample City (sports hall)', minAge: 13, maxAge: 17, date: '2026-12-15', type: 'Competition' },
];

export const OFFICIAL_LINKS = [
  { label: 'Khelo India (official portal)', url: 'https://kheloindia.gov.in' },
  { label: 'Sports Authority of India', url: 'https://sai.gov.in' },
];

export const SPORTS = ['Athletics', 'Football', 'Badminton', 'Cricket', 'Kabaddi', 'Basketball', 'Swimming', 'Other'];
export const EXPERIENCE_LEVELS = ['Beginner', 'Intermediate', 'Advanced'];
export const AGE_GROUPS = ['10-12', '13-15', '14-16', '16-18', '18+'];
export const GOALS = [
  'Improve sprint speed',
  'Build endurance',
  'Increase strength',
  'Improve flexibility',
  'Stay active and healthy',
  'Prepare for school trials',
];
