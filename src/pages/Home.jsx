import { Link } from 'react-router-dom';
import { Activity, LineChart, Dumbbell, Medal, ArrowRight, AlertCircle, School, Users, Target } from 'lucide-react';

const FEATURES = [
  { icon: Activity, title: 'Fitness Tracking', text: 'Record sprint times, distances, push-ups, squats and session length with simple manual entry.' },
  { icon: LineChart, title: 'Performance Analytics', text: 'See your results over time with clear charts and before-and-after comparisons.' },
  { icon: Dumbbell, title: 'Training Guidance', text: 'Beginner-friendly weekly plans, warm-ups, rest days and safety reminders.' },
  { icon: Medal, title: 'Sports Opportunities', text: 'Browse sample events, filter by sport, age and date, and save the ones you like.' },
];

export default function Home() {
  return (
    <div className="space-y-20">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 text-white px-6 py-16 sm:px-12 sm:py-24 animate-fadeUp">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-saffron-500/20 blur-3xl" aria-hidden="true" />
        <div className="relative max-w-3xl">
          <p className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide text-saffron-200">
            Student innovation prototype · Sample data
          </p>
          <h1 className="mt-5 text-4xl sm:text-6xl font-extrabold leading-tight">
            Track Your Progress. <span className="text-saffron-400">Unlock Your Potential.</span>
          </h1>
          <p className="mt-6 text-lg text-navy-100 max-w-2xl">
            A simple, low-cost platform that helps young athletes record fitness tests, follow beginner training plans, and discover local sports opportunities, using only a stopwatch, a tape measure and a notebook.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link to="/dashboard" className="btn-primary">Get Started <ArrowRight size={18} aria-hidden="true" /></Link>
            <a href="#features" className="btn-secondary !bg-transparent !text-white !border-white/30 hover:!bg-white/10">Explore Features</a>
          </div>
        </div>
      </section>

      <section id="features" aria-labelledby="features-title" className="scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-saffron-600">Features</p>
          <h2 id="features-title" className="mt-1 text-3xl font-bold text-navy-900">Everything a young athlete needs to start</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ icon: Icon, title, text }) => (
            <div key={title} className="card group hover:-translate-y-1 hover:shadow-lg hover:border-saffron-300 transition">
              <div className="grid place-items-center h-12 w-12 rounded-xl bg-navy-900 text-saffron-300 group-hover:bg-saffron-500 group-hover:text-navy-950 transition">
                <Icon size={22} aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-navy-900">{title}</h3>
              <p className="mt-2 text-sm text-navy-600 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="problem-title" className="grid gap-8 lg:grid-cols-2 items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-saffron-600">The problem</p>
          <h2 id="problem-title" className="mt-1 text-3xl font-bold text-navy-900">Many young athletes train without data or guidance</h2>
          <p className="mt-4 text-navy-600 leading-relaxed">
            In many schools and local communities, performance tracking tools and trained coaches are expensive or hard to reach. Students often do not know whether they are improving, which training is safe for their age, or which competitions they can enter.
          </p>
          <div className="mt-6 space-y-3">
            <div className="flex gap-3 rounded-xl bg-white p-4 border border-navy-100">
              <AlertCircle className="text-rose-500 shrink-0 mt-0.5" size={20} aria-hidden="true" />
              <p className="text-sm text-navy-700">No record of progress, so improvement is hard to see or prove.</p>
            </div>
            <div className="flex gap-3 rounded-xl bg-white p-4 border border-navy-100">
              <AlertCircle className="text-rose-500 shrink-0 mt-0.5" size={20} aria-hidden="true" />
              <p className="text-sm text-navy-700">Information about trials and local events is scattered or missed.</p>
            </div>
          </div>
        </div>
        <div className="card bg-gradient-to-br from-saffron-50 to-white border-saffron-200">
          <p className="text-xs font-semibold uppercase tracking-wider text-saffron-700">Our proposed solution</p>
          <h3 className="mt-2 text-2xl font-bold text-navy-900">Simple measurements, clear progress</h3>
          <ul className="mt-5 space-y-3 text-navy-700">
            <li className="flex gap-3"><Target size={18} className="text-saffron-600 shrink-0 mt-0.5" aria-hidden="true" /> Repeatable tests done with basic tools</li>
            <li className="flex gap-3"><Target size={18} className="text-saffron-600 shrink-0 mt-0.5" aria-hidden="true" /> Charts that show trends over weeks and months</li>
            <li className="flex gap-3"><Target size={18} className="text-saffron-600 shrink-0 mt-0.5" aria-hidden="true" /> Beginner-safe training ideas and reminders</li>
          </ul>
        </div>
      </section>

      <section aria-labelledby="impact-title" className="grid gap-5 md:grid-cols-2">
        <div className="card">
          <School className="text-navy-700" size={26} aria-hidden="true" />
          <h3 className="mt-3 text-xl font-semibold text-navy-900">For school athletes</h3>
          <p className="mt-2 text-navy-600 text-sm leading-relaxed">
            Students can track their own progress during sports periods, bring clear records to a teacher, and plan for inter-house or district trials.
          </p>
        </div>
        <div className="card">
          <Users className="text-navy-700" size={26} aria-hidden="true" />
          <h3 className="mt-3 text-xl font-semibold text-navy-900">For coaches and communities</h3>
          <p className="mt-2 text-navy-600 text-sm leading-relaxed">
            Local sports teachers and community groups can use repeat test data to see who is improving and where extra support is needed.
          </p>
        </div>
      </section>

      <section className="rounded-2xl bg-navy-900 text-white p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold">Ready to see it in action?</h2>
          <p className="mt-1 text-navy-200">Explore the dashboard with demonstration data, then add your own records.</p>
        </div>
        <Link to="/dashboard" className="btn-primary">Open the dashboard <ArrowRight size={18} aria-hidden="true" /></Link>
      </section>
    </div>
  );
}
