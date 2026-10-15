import { Link } from 'react-router-dom';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from 'recharts';
import { Timer, Footprints, Flame, CalendarCheck, Medal, ArrowRight, Activity, Trophy } from 'lucide-react';
import { useApp } from '../lib/AppContext';
import { compareTests, trainingConsistency, weeklyMinutes, formatDate } from '../lib/analytics';
import StatCard from '../components/StatCard';
import SectionHeader from '../components/SectionHeader';
import EmptyState from '../components/EmptyState';
import { DEMO_EVENTS } from '../data/demoData';

export default function Dashboard() {
  const { athlete, tests, sessions, savedEvents } = useApp();
  const latest = tests[tests.length - 1];
  const comparison = compareTests(tests);
  const consistency = trainingConsistency(sessions);
  const week = weeklyMinutes(sessions);
  const weekTotal = week.reduce((s, d) => s + d.minutes, 0);
  const upcoming = DEMO_EVENTS.filter((e) => savedEvents.includes(e.id)).sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="space-y-8 animate-fadeUp">
      <SectionHeader
        eyebrow="Athlete dashboard"
        title={`Welcome back, ${athlete.name.replace(' (Demo)', '')}`}
        subtitle={`${athlete.sport} · ${athlete.experience} · Age group ${athlete.ageGroup}${athlete.school ? ` · ${athlete.school}` : ''}`}
        action={<Link to="/tracker" className="btn-primary">Log a fitness test <ArrowRight size={16} aria-hidden="true" /></Link>}
      />

      {!latest ? (
        <EmptyState
          icon={Activity}
          title="No fitness tests yet"
          text="Record your first test in the Fitness Tracker to see your progress here."
          action={<Link to="/tracker" className="btn-primary">Go to Fitness Tracker</Link>}
        />
      ) : (
        <>
          <section aria-label="Latest results" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Latest sprint time" value={latest.sprintTime.toFixed(1)} unit="sec"
              hint={comparison ? `${comparison.sprint.improved ? 'Faster' : 'Slower'} by ${Math.abs(comparison.sprint.change).toFixed(1)} s since first test` : 'Need two tests to compare'}
              trend={comparison ? (comparison.sprint.improved ? 'up' : 'down') : null} />
            <StatCard label="Latest run distance" value={latest.runDistance.toFixed(1)} unit="km"
              hint={comparison ? `${comparison.distance.change >= 0 ? '+' : ''}${comparison.distance.change.toFixed(1)} km since first test` : null}
              trend={comparison ? (comparison.distance.improved ? 'up' : 'down') : null} />
            <StatCard label="Push-ups (latest)" value={latest.pushups} unit="reps"
              hint={comparison ? `${comparison.pushups.change >= 0 ? '+' : ''}${comparison.pushups.change} since first test` : null}
              trend={comparison ? (comparison.pushups.improved ? 'up' : 'down') : null} />
            <StatCard label="Training consistency" value={`${consistency.percent}%`}
              hint={`Active in ${consistency.activeWeeks} of the last ${consistency.totalWeeks} weeks`} trend={consistency.percent >= 75 ? 'up' : null} />
          </section>

          <section className="grid gap-6 lg:grid-cols-3">
            <div className="card lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-navy-900">Sprint time trend</h2>
                  <p className="text-sm text-navy-500">Lower is better. Sample data.</p>
                </div>
                <Timer className="text-saffron-500" size={22} aria-hidden="true" />
              </div>
              <div className="h-64" role="img" aria-label="Line chart of sprint time across recorded tests">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={tests}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#dce5f2" />
                    <XAxis dataKey="date" tickFormatter={(d) => formatDate(d).slice(0, 6)} stroke="#5b82bb" fontSize={12} />
                    <YAxis domain={['dataMin - 0.5', 'dataMax + 0.5']} stroke="#5b82bb" fontSize={12} />
                    <Tooltip labelFormatter={formatDate} formatter={(v) => [`${v} s`, 'Sprint']} />
                    <Line type="monotone" dataKey="sprintTime" stroke="#f79009" strokeWidth={3} dot={{ r: 4, fill: '#0e2244' }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-navy-900">This week</h2>
                  <p className="text-sm text-navy-500">{weekTotal} minutes trained</p>
                </div>
                <Flame className="text-saffron-500" size={22} aria-hidden="true" />
              </div>
              <div className="h-64" role="img" aria-label="Bar chart of training minutes for the last seven days">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={week}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#dce5f2" vertical={false} />
                    <XAxis dataKey="label" stroke="#5b82bb" fontSize={12} />
                    <YAxis stroke="#5b82bb" fontSize={12} />
                    <Tooltip formatter={(v) => [`${v} min`, 'Training']} />
                    <Bar dataKey="minutes" fill="#0e2244" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <div className="card">
              <h2 className="text-lg font-semibold text-navy-900 mb-4">Performance trend: push-ups and squats</h2>
              <div className="h-64" role="img" aria-label="Line chart of push-ups and squats across tests">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={tests}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#dce5f2" />
                    <XAxis dataKey="date" tickFormatter={(d) => formatDate(d).slice(0, 6)} stroke="#5b82bb" fontSize={12} />
                    <YAxis stroke="#5b82bb" fontSize={12} />
                    <Tooltip labelFormatter={formatDate} />
                    <Line type="monotone" dataKey="pushups" name="Push-ups" stroke="#0e2244" strokeWidth={2.5} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="squats" name="Squats" stroke="#f79009" strokeWidth={2.5} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-navy-900">Saved sports events</h2>
                <Trophy className="text-saffron-500" size={22} aria-hidden="true" />
              </div>
              {upcoming.length === 0 ? (
                <EmptyState
                  icon={Medal}
                  title="No saved events"
                  text="Save sample events from the Opportunities page and they will appear here."
                  action={<Link to="/opportunities" className="btn-secondary">Browse opportunities</Link>}
                />
              ) : (
                <ul className="space-y-3">
                  {upcoming.map((e) => (
                    <li key={e.id} className="flex items-center justify-between rounded-xl border border-navy-100 p-4 hover:border-saffron-300 transition">
                      <div>
                        <p className="font-semibold text-navy-900">{e.name}</p>
                        <p className="text-sm text-navy-500">{formatDate(e.date)} · {e.location}</p>
                      </div>
                      <span className="rounded-full bg-saffron-100 px-2.5 py-1 text-xs font-semibold text-saffron-800">{e.sport}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>

          {comparison && (
            <section className="card">
              <h2 className="text-lg font-semibold text-navy-900 mb-1">First vs. latest test</h2>
              <p className="text-sm text-navy-500 mb-5">These numbers come from a few basic measurements and do not describe overall athletic ability.</p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: 'Sprint', good: comparison.sprint.improved, text: `${comparison.sprint.change.toFixed(1)} s`, sub: 'lower is better' },
                  { label: 'Distance', good: comparison.distance.improved, text: `${comparison.distance.change.toFixed(1)} km`, sub: 'higher is better' },
                  { label: 'Push-ups', good: comparison.pushups.improved, text: `${comparison.pushups.change > 0 ? '+' : ''}${comparison.pushups.change}`, sub: 'reps' },
                  { label: 'Squats', good: comparison.squats.improved, text: `${comparison.squats.change > 0 ? '+' : ''}${comparison.squats.change}`, sub: 'reps' },
                ].map((c) => (
                  <div key={c.label} className="rounded-xl bg-navy-50 p-4">
                    <p className="text-sm font-medium text-navy-600">{c.label}</p>
                    <p className={`mt-1 text-2xl font-bold ${c.good ? 'text-emerald-600' : 'text-rose-600'}`}>{c.text}</p>
                    <p className="text-xs text-navy-500">{c.sub}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
