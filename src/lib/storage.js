// Thin wrapper around localStorage. Every call is guarded because
// storage can be disabled or full.
const PREFIX = 'khelo-demo:';

export function loadState(key, fallback) {
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (err) {
    console.warn('Could not read saved data:', err);
    return fallback;
  }
}

export function saveState(key, value) {
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
    return true;
  } catch (err) {
    console.warn('Could not save data:', err);
    return false;
  }
}

export function clearAllState() {
  try {
    Object.keys(window.localStorage)
      .filter((k) => k.startsWith(PREFIX))
      .forEach((k) => window.localStorage.removeItem(k));
    return true;
  } catch {
    return false;
  }
}
