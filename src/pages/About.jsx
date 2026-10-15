import { Lightbulb, Wrench, Users, TrendingUp, AlertTriangle, Rocket } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';

const BLOCKS = [
  {
    icon: Lightbulb,
    title: 'The problem faced by local athletes',
    text: 'Many students have talent and motivation but no regular way to measure progress, no structured beginner plan, and little information about trials or local events. Commercial performance tools are often too expensive for schools.',
  },
  {
    icon: Wrench,
    title: 'How the platform addresses it',
    text: 'The platform turns a few repeatable, low-cost measurements into clear charts. It pairs them with safe, beginner-level training ideas and a searchable list of opportunities so students can act on what they learn.',
  },
  {
    icon: TrendingUp,
    title: 'Working with low-cost devices or manual entry',
    text: 'No special device is needed. A stopwatch, a measured track, a tape measure and a count of push-ups and squats are enough. Results are typed in by hand, and the charts show whether they are moving in the right direction over time.',
  },
  {
    icon: Users,
    title: 'How schools and communities could benefit',
    text: 'Sports teachers could use repeated test data to plan groups and spot students who need support. Community clubs could share a simple, consistent way to track beginners without buying equipment.',
  },
];

export default function About() {
  return (
    <div className="space-y-10 animate-fadeUp">
      <SectionHeader
        eyebrow="About the project"
        title="Khelo Performance: a student innovation"
        subtitle="A Class 11 Science project inspired by the goals of the Khelo India initiative. It is an independent prototype and is not an official government or Khelo India platform."
      />

      <section aria-labelledby="innovation-title">
        <h2 id="innovation-title" className="sr-only">Innovation and impact</h2>
        <div className="grid gap-5 md:grid-cols-2">
          {BLOCKS.map(({ icon: Icon, title, text }) => (
            <article key={title} className="card hover:-translate-y-0.5 hover:shadow-md transition">
              <div className="grid place-items-center h-11 w-11 rounded-xl bg-navy-900 text-saffron-300">
                <Icon size={20} aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-navy-900">{title}</h3>
              <p className="mt-2 text-navy-600 leading-relaxed">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="science-title" className="card">
        <h2 id="science-title" className="text-xl font-semibold text-navy-900">The science behind it</h2>
        <ul className="mt-4 space-y-3 text-navy-700 leading-relaxed list-disc list-inside">
          <li>Repeated tests under the same conditions help separate real improvement from day-to-day variation.</li>
          <li>Plotting results over time makes trends visible, which is the basis of simple data analysis.</li>
          <li>Percentage change and first-versus-latest comparisons are shown with their formulas so students can check the maths.</li>
          <li>Training consistency is measured as the share of recent weeks with at least one logged session.</li>
        </ul>
      </section>

      <div className="grid gap-5 lg:grid-cols-2">
        <section aria-labelledby="limits-title" className="card border-rose-100">
          <div className="flex items-center gap-2">
            <AlertTriangle size={20} className="text-rose-500" aria-hidden="true" />
            <h2 id="limits-title" className="text-lg font-semibold text-navy-900">Current limitations</h2>
          </div>
          <ul className="mt-4 space-y-2 text-navy-600 list-disc list-inside">
            <li>Runs as a frontend prototype. Data stays in one browser and is not shared.</li>
            <li>Sample events are not real. A live version needs verified data sources.</li>
            <li>Basic measurements cannot show full athletic ability, technique or health.</li>
            <li>Manual entry depends on the accuracy of the person measuring.</li>
            <li>No login or real coach-access controls yet.</li>
          </ul>
        </section>

        <section aria-labelledby="future-title" className="card border-emerald-100">
          <div className="flex items-center gap-2">
            <Rocket size={20} className="text-emerald-600" aria-hidden="true" />
            <h2 id="future-title" className="text-lg font-semibold text-navy-900">Future improvements</h2>
          </div>
          <ul className="mt-4 space-y-2 text-navy-600 list-disc list-inside">
            <li>A secure backend (Node.js, Express, MongoDB) with real accounts and parental consent flows.</li>
            <li>Coach dashboard with permission-based access to team records.</li>
            <li>Verified event feeds with links to official sources.</li>
            <li>Printable or PDF progress reports.</li>
            <li>Optional sensor support, such as phone-based timing, tested for accuracy first.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
