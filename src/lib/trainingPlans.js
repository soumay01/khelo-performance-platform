// Beginner-friendly, general guidance. Not medical advice.
// Intensity stays low-to-moderate and is always paired with rest and coach input.

export const WARMUP = [
  '5 minutes of brisk walking or light jogging',
  '10 arm circles and 10 leg swings each side',
  '10 bodyweight squats at a comfortable pace',
  '2 easy build-up strides at about 50% effort',
];

export const PLANS = {
  'Improve sprint speed': {
    title: 'Speed Foundations',
    weekly: [
      { day: 'Mon', focus: 'Technique drills', detail: 'High knees, butt kicks, skips. 4 x 20 m, walk back to rest.' },
      { day: 'Tue', focus: 'Rest or light walk', detail: 'Easy walk or stretching.' },
      { day: 'Wed', focus: 'Short sprints', detail: '4 x 30 m at about 80% effort, full recovery between runs.' },
      { day: 'Thu', focus: 'Rest', detail: 'Sleep well and hydrate.' },
      { day: 'Fri', focus: 'Strength', detail: 'Bodyweight squats, glute bridges, calf raises. 2 sets of 10.' },
      { day: 'Sat', focus: 'Fun activity', detail: 'Play a light game you enjoy for 30 minutes.' },
      { day: 'Sun', focus: 'Rest', detail: 'Full rest day.' },
    ],
  },
  'Build endurance': {
    title: 'Steady Endurance',
    weekly: [
      { day: 'Mon', focus: 'Easy run/walk', detail: '15 minutes, alternate 2 min jog and 1 min walk.' },
      { day: 'Tue', focus: 'Rest', detail: 'Stretching or rest.' },
      { day: 'Wed', focus: 'Steady jog', detail: '20 minutes at a conversational pace.' },
      { day: 'Thu', focus: 'Rest', detail: 'Hydrate and sleep.' },
      { day: 'Fri', focus: 'Core and strength', detail: 'Plank (20 s x 3), push-ups (sets of 5 to 10).' },
      { day: 'Sat', focus: 'Longer easy session', detail: '25 minutes easy. Add time only when it feels comfortable.' },
      { day: 'Sun', focus: 'Rest', detail: 'Full rest day.' },
    ],
  },
  'Increase strength': {
    title: 'Body Strength Basics',
    weekly: [
      { day: 'Mon', focus: 'Upper body', detail: 'Knee push-ups or wall push-ups, 2 x 8.' },
      { day: 'Tue', focus: 'Rest', detail: 'Walk or stretch.' },
      { day: 'Wed', focus: 'Lower body', detail: 'Squats 2 x 10, lunges 2 x 6 each leg.' },
      { day: 'Thu', focus: 'Rest', detail: 'Full rest.' },
      { day: 'Fri', focus: 'Full body', detail: 'Circuit of 3 exercises, 2 rounds, rest 1 minute between.' },
      { day: 'Sat', focus: 'Sport practice', detail: 'Play your chosen sport lightly.' },
      { day: 'Sun', focus: 'Rest', detail: 'Full rest day.' },
    ],
  },
  'Improve flexibility': {
    title: 'Mobility and Flexibility',
    weekly: [
      { day: 'Mon', focus: 'Full-body stretch', detail: '15 minutes, hold each stretch 20 to 30 seconds, never into pain.' },
      { day: 'Tue', focus: 'Light walk', detail: '20 minutes easy walk.' },
      { day: 'Wed', focus: 'Stretch', detail: 'Hamstring and hip stretches, 15 minutes.' },
      { day: 'Thu', focus: 'Rest', detail: 'Rest day.' },
      { day: 'Fri', focus: 'Mobility flow', detail: 'Gentle cat-cow and child pose.' },
      { day: 'Sat', focus: 'Fun activity', detail: 'Light sport or dance for 30 minutes.' },
      { day: 'Sun', focus: 'Rest', detail: 'Full rest day.' },
    ],
  },
  'Stay active and healthy': {
    title: 'Active Everyday',
    weekly: [
      { day: 'Mon', focus: 'Walk', detail: '30 minutes brisk walk.' },
      { day: 'Tue', focus: 'Light movement', detail: '15 minutes stretching and 10 squats.' },
      { day: 'Wed', focus: 'Play', detail: '30 minutes of a game you enjoy.' },
      { day: 'Thu', focus: 'Walk', detail: '30 minutes walk.' },
      { day: 'Fri', focus: 'Rest', detail: 'Rest and hydrate.' },
      { day: 'Sat', focus: 'Sport or cycling', detail: '30 to 40 minutes, easy pace.' },
      { day: 'Sun', focus: 'Rest', detail: 'Full rest day.' },
    ],
  },
  'Prepare for school trials': {
    title: 'Trial Preparation',
    weekly: [
      { day: 'Mon', focus: 'Skill practice', detail: 'Sport-specific drills, 30 minutes, with your coach if possible.' },
      { day: 'Tue', focus: 'Conditioning', detail: '20 minutes easy cardio and mobility.' },
      { day: 'Wed', focus: 'Skill practice', detail: 'Match-style drills, 30 minutes.' },
      { day: 'Thu', focus: 'Rest', detail: 'Sleep and hydrate.' },
      { day: 'Fri', focus: 'Fitness check', detail: 'Repeat your fitness tests and log them in the tracker.' },
      { day: 'Sat', focus: 'Light practice', detail: 'Easy game or scrimmage.' },
      { day: 'Sun', focus: 'Rest', detail: 'Full rest day.' },
    ],
  },
};

export const SAFETY_TIPS = [
  { title: 'Hydration', text: 'Drink water before, during, and after activity. Pale yellow urine is a good sign.' },
  { title: 'Technique first', text: 'Move with good form at lower speed before adding speed or weight.' },
  { title: 'Sleep', text: 'Most school-age athletes need around 8 to 10 hours of sleep each night.' },
  { title: 'Pain is a signal', text: 'Sharp or lasting pain means stop and tell a parent, teacher, or doctor.' },
  { title: 'Ask a coach', text: 'A qualified coach or your school sports teacher can adjust any plan for you.' },
];
