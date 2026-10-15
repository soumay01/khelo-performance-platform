import { useState } from 'react';
import { Plus, Trash2, Timer, Info } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useApp } from '../lib/AppContext';
import { validateTest } from '../lib/validation';
import { formatDate } from '../lib/analytics';
import SectionHeader from '../components/SectionHeader';
import EmptyState from '../components/EmptyState';

const today = () => new Date().toISOString().slice(0, 10);
const EMPTY = { date: today(), sprintTime: '', runDistance: '', pushups: '', squats: '', duration: '' };

function Field({ id, label, error, hint, ...props }) {
  return (
    <div>
      <label htmlFor={id} className="label">{label}</label>
      <input id={id} className="input" aria-invalid={!!error} aria-describedby={`${id}-help`} {...props} />
      <p id={`${id}-help`} className={`mt-1 text-xs ${error ? 'text-rose-600' : 'text-navy-500'}`}>{error || hint}</p>
    </div>
  );
}

export default function FitnessTracker() {
  const { tests, addTest, deleteTest } = useApp();
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [metric, setMetric] = useState('sprintTime');

  const update = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const submit = (e) => {
    e.preventDefault();
    const found = validateTest(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    addTest({
      date: form.date,
      sprintTime: Number(form.sprintTime),
      runDistance: Number(form.runDistance),
      pushups: Number(form.pushups),
      squats: Number(form.squats),
      duration: Number(form.duration),
    });
    setForm({ ...EMPTY, date: today() });
  };

  const metrics = {
    sprintTime: { label: 'Sprint time (s)', color: '#f79009' },
    runDistance: { label: 'Run distance (km)', color: '#0e2244' },
    pushups: { label: 'Push-ups', color: '#2b4f85' },
    squats: { label: 'Squats', color: '#dc6d04' },
  };

  return (
    <div className="space-y-8 animate-fadeUp">
      <SectionHeader
        eyebrow="Fitness tracker"
        title="Record and compare your tests"
        subtitle="Enter results from a stopwatch, a measured track or field, and a simple count. Repeat the same test under the same conditions for fair comparisons."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <form onSubmit={submit} noValidate className="card lg:col-span-1 space-y-4 self-start" aria-labelledby="log-title">
          <div className="flex items-center gap-2">
            <Plus size={18} className="text-saffron-600" aria-hidden="true" />
            <h2 id="log-title" className="text-lg font-semibold text-navy-900">Log a new test</h2>
          </div>

          <Field id="date" label="Test date" type="date" value={form.date} onChange={update('date')} error={errors.date} max={today()} />
          <Field id="sprintTime" label="Sprint time (seconds)" type="number" step="0.1" min="8" max="60" inputMode="decimal" placeholder="e.g. 16.5" value={form.sprintTime} onChange={update('sprintTime')} error={errors.sprintTime} hint="Time for a measured 50 m or 100 m run." />
          <Field id="runDistance" label="Run distance (km)" type="number" step="0.1" min="0.1" inputMode="decimal" placeholder="e.g. 1.5" value={form.runDistance} onChange={update('runDistance')} error={errors.runDistance} hint="Distance covered in a timed run." />
          <div className="grid grid-cols-2 gap-3">
            <Field id="pushups" label="Push-ups" type="number" min="0" inputMode="numeric" placeholder="0" value={form.pushups} onChange={update('pushups')} error={errors.pushups} />
            <Field id="squats" label="Squats" type="number" min="0" inputMode="numeric" placeholder="0" value={form.squats} onChange={update('squats')} error={errors.squats} />
          </div>
          <Field id="duration" label="Session length (min)" type="number" min="1" inputMode="numeric" placeholder="e.g. 45" value={form.duration} onChange={update('duration')} error={errors.duration} />

          <button type="submit" className="btn-primary w-full">Save test record</button>
        </form>

        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <Timer size={18} className="text-saffron-600" aria-hidden="true" />
                <h2 className="text-lg font-semibold text-navy-900">Progress chart</h2>
              </div>
              <div role="radiogroup" aria-label="Choose metric to chart" className="flex flex-wrap gap-1.5">
                {Object.entries(metrics).map(([key, m]) => (
                  <button
                    key={key}
                    type="button"
                    role="radio"
                    aria-checked={metric === key}
                    onClick={() => setMetric(key)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${metric === key ? 'bg-navy-900 text-white' : 'bg-navy-50 text-navy-700 hover:bg-navy-100'}`}
                  >
                    {m.label.split(' (')[0]}
                  </button>
                ))}
              </div>
            </div>

            {tests.length === 0 ? (
              <EmptyState icon={Timer} title="No records yet" text="Save your first test to see a chart." />
            ) : (
              <div className="h-72" role="img" aria-label={`Chart of ${metrics[metric].label} over time`}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={tests}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#dce5f2" />
                    <XAxis dataKey="date" tickFormatter={(d) => formatDate(d).slice(0, 6)} stroke="#5b82bb" fontSize={12} />
                    <YAxis stroke="#5b82bb" fontSize={12} domain={['auto', 'auto']} />
                    <Tooltip labelFormatter={formatDate} />
                    <Line type="monotone" dataKey={metric} name={metrics[metric].label} stroke={metrics[metric].color} strokeWidth={3} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
            <p className="mt-3 flex items-start gap-2 text-xs text-navy-500">
              <Info size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
              These are basic school-level measurements. They do not give a complete assessment of athletic ability.
            </p>
          </div>

          <div className="card overflow-x-auto p-0">
            <div className="p-5 pb-3">
              <h2 className="text-lg font-semibold text-navy-900">Test history</h2>
            </div>
            {tests.length === 0 ? (
              <p className="px-5 pb-5 text-sm text-navy-500">No history yet.</p>
            ) : (
              <table className="w-full text-sm">
                <caption className="sr-only">All recorded fitness tests, newest first</caption>
                <thead className="bg-navy-50 text-left text-navy-600">
                  <tr>
                    <th scope="col" className="px-4 py-2.5 font-semibold">Date</th>
                    <th scope="col" className="px-4 py-2.5 font-semibold">Sprint</th>
                    <th scope="col" className="px-4 py-2.5 font-semibold">Distance</th>
                    <th scope="col" className="px-4 py-2.5 font-semibold">Push-ups</th>
                    <th scope="col" className="px-4 py-2.5 font-semibold">Squats</th>
                    <th scope="col" className="px-4 py-2.5 font-semibold"><span className="sr-only">Actions</span></th>
                  </tr>
                </thead>
                <tbody>
                  {[...tests].reverse().map((t) => (
                    <tr key={t.id} className="border-t border-navy-100 hover:bg-saffron-50/50 transition">
                      <td className="px-4 py-3 font-medium text-navy-900">{formatDate(t.date)}</td>
                      <td className="px-4 py-3">{t.sprintTime.toFixed(1)} s</td>
                      <td className="px-4 py-3">{t.runDistance.toFixed(1)} km</td>
                      <td className="px-4 py-3">{t.pushups}</td>
                      <td className="px-4 py-3">{t.squats}</td>
                      <td className="px-4 py-3 text-right">
                        <button
                          type="button"
                          onClick={() => deleteTest(t.id)}
                          className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-rose-600 hover:bg-rose-50"
                          aria-label={`Delete test from ${formatDate(t.date)}`}
                        >
                          <Trash2 size={15} aria-hidden="true" /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
