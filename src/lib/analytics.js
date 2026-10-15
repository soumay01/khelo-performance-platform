// Simple, transparent calculations. Each value is explained in the UI.

export function percentChange(first, last) {
  if (!first) return null;
  return ((last - first) / Math.abs(first)) * 100;
}

// Sprint: lower time is better. Other measures: higher is better.
export function compareTests(tests) {
  if (tests.length < 2) return null;
  const first = tests[0];
  const last = tests[tests.length - 1];
  return {
    sprint: { change: last.sprintTime - first.sprintTime, pct: percentChange(first.sprintTime, last.sprintTime), improved: last.sprintTime < first.sprintTime },
    distance: { change: last.runDistance - first.runDistance, pct: percentChange(first.runDistance, last.runDistance), improved: last.runDistance > first.runDistance },
    pushups: { change: last.pushups - first.pushups, pct: percentChange(first.pushups, last.pushups), improved: last.pushups > first.pushups },
    squats: { change: last.squats - first.squats, pct: percentChange(first.squats, last.squats), improved: last.squats > first.squats },
  };
}

const dayKey = (d) => d.toISOString().slice(0, 10);

// Consistency: how many of the last 4 weeks had at least one session.
export function trainingConsistency(sessions, today = new Date()) {
  const weeks = [0, 1, 2, 3].map((w) => {
    const end = new Date(today);
    end.setDate(today.getDate() - w * 7);
    const start = new Date(today);
    start.setDate(today.getDate() - (w + 1) * 7);
    return sessions.some((s) => {
      const d = new Date(s.date);
      return d > start && d <= end;
    });
  });
  const activeWeeks = weeks.filter(Boolean).length;
  return { activeWeeks, totalWeeks: 4, percent: Math.round((activeWeeks / 4) * 100) };
}

// Minutes per day for the last 7 days, oldest first.
export function weeklyMinutes(sessions, today = new Date()) {
  const buckets = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (6 - i));
    return { label: d.toLocaleDateString('en-IN', { weekday: 'short' }), key: dayKey(d), minutes: 0 };
  });
  sessions.forEach((s) => {
    const bucket = buckets.find((b) => b.key === s.date);
    if (bucket) bucket.minutes += Number(s.minutes) || 0;
  });
  return buckets;
}

export function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}
