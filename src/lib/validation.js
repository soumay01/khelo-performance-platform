// Validation for fitness entries. Ranges are generous for a school setting.
export function validateTest(form) {
  const errors = {};
  const num = (v) => (v === '' || v === null || v === undefined ? NaN : Number(v));

  if (!form.date) errors.date = 'Please pick a test date.';
  else if (new Date(form.date) > new Date()) errors.date = 'The date cannot be in the future.';

  const sprint = num(form.sprintTime);
  if (Number.isNaN(sprint)) errors.sprintTime = 'Enter your sprint time in seconds.';
  else if (sprint < 8 || sprint > 60) errors.sprintTime = 'Sprint time should be between 8 and 60 seconds.';

  const dist = num(form.runDistance);
  if (Number.isNaN(dist)) errors.runDistance = 'Enter the distance in kilometres.';
  else if (dist <= 0 || dist > 42) errors.runDistance = 'Distance should be between 0.1 and 42 km.';

  const pushups = num(form.pushups);
  if (Number.isNaN(pushups)) errors.pushups = 'Enter a number of push-ups.';
  else if (!Number.isInteger(pushups) || pushups < 0 || pushups > 500) errors.pushups = 'Use a whole number from 0 to 500.';

  const squats = num(form.squats);
  if (Number.isNaN(squats)) errors.squats = 'Enter a number of squats.';
  else if (!Number.isInteger(squats) || squats < 0 || squats > 500) errors.squats = 'Use a whole number from 0 to 500.';

  const duration = num(form.duration);
  if (Number.isNaN(duration)) errors.duration = 'Enter the session length in minutes.';
  else if (duration <= 0 || duration > 300) errors.duration = 'Duration should be between 1 and 300 minutes.';

  return errors;
}

export function validateProfile(form) {
  const errors = {};
  const name = (form.name || '').trim();
  if (!name) errors.name = 'Please enter a display name.';
  else if (name.length > 40) errors.name = 'Keep the name under 40 characters.';
  if (!form.sport) errors.sport = 'Choose a sport.';
  if (!form.experience) errors.experience = 'Choose an experience level.';
  if (!form.goals || form.goals.length === 0) errors.goals = 'Pick at least one goal.';
  return errors;
}
