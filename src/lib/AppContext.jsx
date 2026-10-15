import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { loadState, saveState, clearAllState } from './storage';
import { DEMO_ATHLETE, DEMO_TESTS, DEMO_SESSIONS } from '../data/demoData';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [athlete, setAthlete] = useState(() => loadState('athlete', DEMO_ATHLETE));
  const [tests, setTests] = useState(() => loadState('tests', DEMO_TESTS));
  const [sessions, setSessions] = useState(() => loadState('sessions', DEMO_SESSIONS));
  const [savedEvents, setSavedEvents] = useState(() => loadState('savedEvents', []));
  const [toast, setToast] = useState(null);

  useEffect(() => { saveState('athlete', athlete); }, [athlete]);
  useEffect(() => { saveState('tests', tests); }, [tests]);
  useEffect(() => { saveState('sessions', sessions); }, [sessions]);
  useEffect(() => { saveState('savedEvents', savedEvents); }, [savedEvents]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const notify = useCallback((message, type = 'success') => setToast({ message, type, id: Date.now() }), []);

  const addTest = useCallback((entry) => {
    const record = { id: `t-${Date.now()}`, ...entry };
    setTests((prev) => [...prev, record].sort((a, b) => a.date.localeCompare(b.date)));
    notify('Fitness test saved.');
  }, [notify]);

  const deleteTest = useCallback((id) => {
    setTests((prev) => prev.filter((t) => t.id !== id));
    notify('Test record removed.', 'info');
  }, [notify]);

  const addSession = useCallback((entry) => {
    setSessions((prev) => [...prev, { id: `s-${Date.now()}`, ...entry }]);
    notify('Training session logged.');
  }, [notify]);

  const updateAthlete = useCallback((patch) => {
    setAthlete((prev) => ({ ...prev, ...patch, isDemo: false }));
    notify('Profile saved.');
  }, [notify]);

  const toggleSavedEvent = useCallback((id) => {
    setSavedEvents((prev) => {
      const isSaved = prev.includes(id);
      notify(isSaved ? 'Removed from saved events.' : 'Event saved to your dashboard.', 'info');
      return isSaved ? prev.filter((e) => e !== id) : [...prev, id];
    });
  }, [notify]);

  const resetDemo = useCallback(() => {
    clearAllState();
    setAthlete(DEMO_ATHLETE);
    setTests(DEMO_TESTS);
    setSessions(DEMO_SESSIONS);
    setSavedEvents([]);
    notify('Demo data has been reset.', 'info');
  }, [notify]);

  const value = useMemo(() => ({
    athlete, tests, sessions, savedEvents, toast,
    addTest, deleteTest, addSession, updateAthlete, toggleSavedEvent, resetDemo, notify,
  }), [athlete, tests, sessions, savedEvents, toast, addTest, deleteTest, addSession, updateAthlete, toggleSavedEvent, resetDemo, notify]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
