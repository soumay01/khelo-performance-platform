// Run with: npm test   (uses Node's built-in test runner, no extra dependencies)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { percentChange } from './analytics.js';
import { validateTest, validateProfile } from './validation.js';

test('percentChange computes change relative to the first value', () => {
  assert.equal(percentChange(10, 15), 50);
  assert.equal(percentChange(20, 10), -50);
  assert.equal(percentChange(0, 5), null);
});

test('validateTest rejects missing and out-of-range values', () => {
  const errs = validateTest({ date: '2026-01-01', sprintTime: '', runDistance: '1', pushups: '5', squats: '5', duration: '20' });
  assert.ok(errs.sprintTime);
  const bad = validateTest({ date: '2026-01-01', sprintTime: '2', runDistance: '1', pushups: '5.5', squats: '5', duration: '20' });
  assert.ok(bad.sprintTime);
  assert.ok(bad.pushups);
});

test('validateTest accepts a correct entry', () => {
  const ok = validateTest({ date: '2026-01-01', sprintTime: '16.5', runDistance: '1.5', pushups: '10', squats: '20', duration: '40' });
  assert.deepEqual(ok, {});
});

test('validateProfile requires name, sport, level and at least one goal', () => {
  const errs = validateProfile({ name: '  ', sport: '', experience: '', goals: [] });
  assert.ok(errs.name && errs.sport && errs.experience && errs.goals);
  assert.deepEqual(validateProfile({ name: 'Ria', sport: 'Kabaddi', experience: 'Beginner', goals: ['Build endurance'] }), {});
});
