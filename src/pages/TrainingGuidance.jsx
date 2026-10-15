import { useState } from 'react';
import { Dumbbell, Droplets, Moon, ShieldAlert, Flame, Snowflake } from 'lucide-react';
import { useApp } from '../lib/AppContext';
import { PLANS, WARMUP, SAFETY_TIPS } from '../lib/trainingPlans';
import SectionHeader from '../components/SectionHeader';

const TIP_ICONS = { Hydration: Droplets, Sleep: Moon, 'Pain is a signal': ShieldAlert };

export default function TrainingGuidance() {
  const { athlete, updateAthlete } = useApp();
  const [goal, setGoal] = useState(athlete.goals?.[0] && PLANS[athlete.goals[0]] ? athlete.goals[0] : 'Improve sprint speed');
  const [level, setLevel] = useState(athlete.experience || 'Beginner');
  const plan = PLANS[goal];

  return (
    <div className="space-y-8 animate-fadeUp">
      <SectionHeader
        eyebrow="Training guidance"
        title="Beginner-friendly weekly plan"
        subtitle="General, low-to-moderate training ideas for school-age athletes. Check with your school sports teacher or a qualified coach before starting a new routine."
      />

      <div className="card grid gap-4 sm:grid-cols-3 items-end">
        <div>
          <label htmlFor="goal" className="label">Fitness goal</label>
          <select id="goal" className="input" value={goal} onChange={(e) => setGoal(e.target.value)}>
            {Object.keys(PLANS).map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="level" className="label">Experience level</label>
          <select id="level" className="input" value={level} onChange={(e) => { setLevel(e.target.value); }}>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>
        <div className="text-sm">
          <p className="text-navy-600">
            Sport: <span className="font-semibold text-navy-900">{athlete.sport}</span>
          </p>
          <button
            type="button"
            className="mt-1 text-saffron-700 font-semibold hover:underline"
            onClick={() => updateAthlete({ goals: [goal] })}
          >
            Save this goal to my profile
          </button>
        </div>
      </div>

      {level !== 'Beginner' && (
        <div role="note" className="rounded-xl border border-saffron-200 bg-saffron-50 p-4 text-sm text-saffron-900">
          The plan shown is designed for beginners. For intermediate or advanced training, please work with a qualified coach who can adjust the load safely.
        </div>
      )}

      <section aria-labelledby="plan-title" className="card">
        <div className="flex items-center gap-2 mb-1">
          <Dumbbell className="text-saffron-600" size={20} aria-hidden="true" />
          <h2 id="plan-title" className="text-xl font-semibold text-navy-900">{plan.title}</h2>
        </div>
        <p className="text-sm text-navy-500 mb-5">Start with 2 to 3 days in the first week, then build up gradually.</p>
        <ol className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {plan.weekly.map((d) => {
            const isRest = /rest/i.test(d.focus);
            return (
              <li key={d.day} className={`rounded-xl border p-4 transition hover:-translate-y-0.5 hover:shadow-sm ${isRest ? 'border-navy-100 bg-navy-50/50' : 'border-saffron-200 bg-white'}`}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-navy-900">{d.day}</span>
                  {isRest && <Snowflake size={14} className="text-navy-300" aria-hidden="true" />}
                </div>
                <p className="mt-1 font-semibold text-navy-800">{d.focus}</p>
                <p className="mt-1 text-sm text-navy-600 leading-relaxed">{d.detail}</p>
              </li>
            );
          })}
        </ol>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section aria-labelledby="warmup-title" className="card">
          <div className="flex items-center gap-2 mb-4">
            <Flame className="text-saffron-600" size={20} aria-hidden="true" />
            <h2 id="warmup-title" className="text-lg font-semibold text-navy-900">Warm-up before every session</h2>
          </div>
          <ol className="space-y-2.5 list-decimal list-inside text-navy-700">
            {WARMUP.map((w) => <li key={w}>{w}</li>)}
          </ol>
          <p className="mt-4 text-sm text-navy-500">Cool down with 5 minutes of easy walking and gentle stretching.</p>
        </section>

        <section aria-labelledby="safety-title" className="card">
          <h2 id="safety-title" className="text-lg font-semibold text-navy-900 mb-4">Safety reminders</h2>
          <ul className="space-y-3">
            {SAFETY_TIPS.map((tip) => {
              const Icon = TIP_ICONS[tip.title] || Moon;
              return (
                <li key={tip.title} className="flex gap-3 rounded-xl bg-navy-50 p-3.5">
                  <Icon size={18} className="text-navy-700 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-navy-900 text-sm">{tip.title}</p>
                    <p className="text-sm text-navy-600">{tip.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      <p className="text-xs text-navy-500">
        This page gives general fitness information only. It does not replace medical advice. If you feel unwell, dizzy, or have chest pain or unusual breathlessness during exercise, stop and tell an adult straight away.
      </p>
    </div>
  );
}
