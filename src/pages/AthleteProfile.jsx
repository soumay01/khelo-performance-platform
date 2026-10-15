import { useState, useEffect } from 'react';
import { Save, ShieldCheck } from 'lucide-react';
import { useApp } from '../lib/AppContext';
import { validateProfile } from '../lib/validation';
import { SPORTS, EXPERIENCE_LEVELS, AGE_GROUPS, GOALS } from '../data/demoData';
import SectionHeader from '../components/SectionHeader';

export default function AthleteProfile() {
  const { athlete, updateAthlete } = useApp();
  const [form, setForm] = useState(athlete);
  const [errors, setErrors] = useState({});

  useEffect(() => { setForm(athlete); }, [athlete]);

  const toggleGoal = (g) => {
    setForm((f) => {
      const has = f.goals.includes(g);
      return { ...f, goals: has ? f.goals.filter((x) => x !== g) : [...f.goals, g] };
    });
    setErrors((e) => ({ ...e, goals: undefined }));
  };

  const submit = (e) => {
    e.preventDefault();
    const found = validateProfile(form);
    setErrors(found);
    if (Object.keys(found).length) return;
    updateAthlete({
      name: form.name.trim(),
      ageGroup: form.ageGroup,
      sport: form.sport,
      experience: form.experience,
      goals: form.goals,
      school: form.school?.trim() || '',
    });
  };

  return (
    <div className="space-y-8 animate-fadeUp">
      <SectionHeader
        eyebrow="Athlete profile"
        title="Your profile"
        subtitle="Keep only what you need. A display name is enough; you do not need to add your full name, address or contact details."
      />

      <form onSubmit={submit} noValidate className="grid gap-6 lg:grid-cols-3">
        <div className="card lg:col-span-2 space-y-5">
          <div>
            <label htmlFor="name" className="label">Display name</label>
            <input id="name" className="input" maxLength={40} value={form.name} onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors((er) => ({ ...er, name: undefined })); }} aria-invalid={!!errors.name} aria-describedby="name-help" />
            <p id="name-help" className={`mt-1 text-xs ${errors.name ? 'text-rose-600' : 'text-navy-500'}`}>{errors.name || 'Use a nickname or first name only.'}</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="ageGroup" className="label">Age group</label>
              <select id="ageGroup" className="input" value={form.ageGroup} onChange={(e) => setForm({ ...form, ageGroup: e.target.value })}>
                {AGE_GROUPS.map((a) => <option key={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="school" className="label">School (optional)</label>
              <input id="school" className="input" maxLength={60} value={form.school || ''} onChange={(e) => setForm({ ...form, school: e.target.value })} />
            </div>
            <div>
              <label htmlFor="sport" className="label">Preferred sport</label>
              <select id="sport" className="input" value={form.sport} onChange={(e) => { setForm({ ...form, sport: e.target.value }); setErrors((er) => ({ ...er, sport: undefined })); }} aria-invalid={!!errors.sport}>
                <option value="">Select a sport</option>
                {SPORTS.map((s) => <option key={s}>{s}</option>)}
              </select>
              {errors.sport && <p className="mt-1 text-xs text-rose-600">{errors.sport}</p>}
            </div>
            <div>
              <label htmlFor="experience" className="label">Experience level</label>
              <select id="experience" className="input" value={form.experience} onChange={(e) => { setForm({ ...form, experience: e.target.value }); setErrors((er) => ({ ...er, experience: undefined })); }} aria-invalid={!!errors.experience}>
                <option value="">Select a level</option>
                {EXPERIENCE_LEVELS.map((x) => <option key={x}>{x}</option>)}
              </select>
              {errors.experience && <p className="mt-1 text-xs text-rose-600">{errors.experience}</p>}
            </div>
          </div>

          <fieldset>
            <legend className="label">Fitness goals</legend>
            <div className="flex flex-wrap gap-2">
              {GOALS.map((g) => {
                const on = form.goals.includes(g);
                return (
                  <button
                    key={g}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggleGoal(g)}
                    className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${on ? 'border-saffron-500 bg-saffron-100 text-saffron-900' : 'border-navy-200 bg-white text-navy-700 hover:border-navy-400'}`}
                  >
                    {g}
                  </button>
                );
              })}
            </div>
            {errors.goals && <p className="mt-2 text-xs text-rose-600">{errors.goals}</p>}
          </fieldset>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button type="submit" className="btn-primary"><Save size={16} aria-hidden="true" /> Save profile</button>
            <button type="button" className="btn-secondary" onClick={() => { setForm(athlete); setErrors({}); }}>Discard changes</button>
          </div>
        </div>

        <aside className="card self-start space-y-3">
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-emerald-600" aria-hidden="true" />
            <h2 className="font-semibold text-navy-900">Privacy and consent</h2>
          </div>
          <ul className="space-y-2 text-sm text-navy-600 list-disc list-inside">
            <li>Data is stored only in this browser on your device.</li>
            <li>No real personal data is needed for the demo.</li>
            <li>Under 18: a parent or guardian should agree before a student creates a profile.</li>
            <li>Coach access to records would need separate permission in a real system.</li>
          </ul>
        </aside>
      </form>
    </div>
  );
}
