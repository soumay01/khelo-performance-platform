import { useMemo, useState } from 'react';
import { Search, Bookmark, BookmarkCheck, ExternalLink, CalendarDays, MapPin, Info, FilterX } from 'lucide-react';
import { useApp } from '../lib/AppContext';
import { DEMO_EVENTS, OFFICIAL_LINKS, SPORTS, AGE_GROUPS } from '../data/demoData';
import { formatDate } from '../lib/analytics';
import SectionHeader from '../components/SectionHeader';
import EmptyState from '../components/EmptyState';

const AGE_RANGE = { '10-12': [10, 12], '13-15': [13, 15], '14-16': [14, 16], '16-18': [16, 18], '18+': [18, 99] };

export default function Opportunities() {
  const { savedEvents, toggleSavedEvent } = useApp();
  const [query, setQuery] = useState('');
  const [sport, setSport] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const [after, setAfter] = useState('');
  const [location, setLocation] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const loc = location.trim().toLowerCase();
    const range = AGE_RANGE[ageGroup];
    return DEMO_EVENTS.filter((e) => {
      if (q && !`${e.name} ${e.type}`.toLowerCase().includes(q)) return false;
      if (sport && e.sport !== sport) return false;
      if (loc && !e.location.toLowerCase().includes(loc)) return false;
      if (after && e.date < after) return false;
      if (range && (e.maxAge < range[0] || e.minAge > range[1])) return false;
      return true;
    }).sort((a, b) => a.date.localeCompare(b.date));
  }, [query, sport, ageGroup, after, location]);

  const hasFilters = query || sport || ageGroup || after || location;
  const clearFilters = () => { setQuery(''); setSport(''); setAgeGroup(''); setAfter(''); setLocation(''); };

  return (
    <div className="space-y-8 animate-fadeUp">
      <SectionHeader
        eyebrow="Sports opportunities"
        title="Find events and programs"
        subtitle="All events below are labelled sample data for this prototype. Always confirm dates and eligibility on official sources before you register."
      />

      <div role="note" className="flex gap-3 rounded-xl border border-saffron-200 bg-saffron-50 p-4 text-sm text-saffron-900">
        <Info size={18} className="shrink-0 mt-0.5" aria-hidden="true" />
        <div>
          <p className="font-semibold">Sample events only</p>
          <p>No real selection dates, eligibility rules or government announcements are shown here. A live version would connect to verified sources.</p>
        </div>
      </div>

      <section aria-label="Filters" className="card">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5 items-end">
          <div className="md:col-span-2 xl:col-span-2">
            <label htmlFor="q" className="label">Search</label>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-400" aria-hidden="true" />
              <input id="q" type="search" className="input pl-9" placeholder="Event name or type" value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
          </div>
          <div>
            <label htmlFor="sport" className="label">Sport</label>
            <select id="sport" className="input" value={sport} onChange={(e) => setSport(e.target.value)}>
              <option value="">All sports</option>
              {SPORTS.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="age" className="label">Age group</label>
            <select id="age" className="input" value={ageGroup} onChange={(e) => setAgeGroup(e.target.value)}>
              <option value="">Any age</option>
              {AGE_GROUPS.map((a) => <option key={a}>{a}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="after" className="label">Event on or after</label>
            <input id="after" type="date" className="input" value={after} onChange={(e) => setAfter(e.target.value)} />
          </div>
          <div className="md:col-span-2 xl:col-span-3">
            <label htmlFor="loc" className="label">Location contains</label>
            <input id="loc" className="input" placeholder="e.g. Sample City" value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>
          <div className="flex items-end">
            {hasFilters && (
              <button type="button" onClick={clearFilters} className="btn-secondary w-full">
                <FilterX size={16} aria-hidden="true" /> Clear filters
              </button>
            )}
          </div>
        </div>
      </section>

      <p className="text-sm text-navy-600" aria-live="polite">{results.length} sample {results.length === 1 ? 'event' : 'events'} found</p>

      {results.length === 0 ? (
        <EmptyState icon={Search} title="No events match your filters" text="Try a different sport, age group or date, or clear the filters." action={<button className="btn-secondary" onClick={clearFilters}>Clear filters</button>} />
      ) : (
        <ul className="grid gap-5 md:grid-cols-2">
          {results.map((e) => {
            const saved = savedEvents.includes(e.id);
            return (
              <li key={e.id} className="card flex flex-col gap-4 hover:-translate-y-0.5 hover:shadow-md transition">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="inline-block rounded-full bg-navy-900 px-2.5 py-0.5 text-xs font-semibold text-white">{e.sport}</span>
                    <span className="ml-2 inline-block rounded-full bg-saffron-100 px-2.5 py-0.5 text-xs font-semibold text-saffron-800">{e.type}</span>
                  </div>
                  <span className="text-xs font-semibold text-navy-400 uppercase tracking-wide">Sample</span>
                </div>
                <h3 className="text-lg font-semibold text-navy-900">{e.name}</h3>
                <dl className="grid grid-cols-2 gap-2 text-sm text-navy-600">
                  <div className="flex items-center gap-1.5"><CalendarDays size={15} aria-hidden="true" /><dd>{formatDate(e.date)}</dd></div>
                  <div className="flex items-center gap-1.5"><MapPin size={15} aria-hidden="true" /><dd>{e.location}</dd></div>
                  <div className="col-span-2"><dt className="sr-only">Age eligibility</dt><dd>Eligibility (sample): ages {e.minAge} to {e.maxAge}</dd></div>
                </dl>
                <div className="mt-auto flex flex-wrap gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => toggleSavedEvent(e.id)}
                    aria-pressed={saved}
                    className={saved ? 'btn-secondary !border-saffron-400 !text-saffron-800 !bg-saffron-50' : 'btn-secondary'}
                  >
                    {saved ? <BookmarkCheck size={16} aria-hidden="true" /> : <Bookmark size={16} aria-hidden="true" />}
                    {saved ? 'Saved' : 'Save event'}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <section aria-labelledby="official-title" className="card">
        <h2 id="official-title" className="text-lg font-semibold text-navy-900">Verify on official sources</h2>
        <p className="mt-1 text-sm text-navy-600">Check event details, eligibility, and announcements directly on these websites.</p>
        <ul className="mt-4 flex flex-wrap gap-3">
          {OFFICIAL_LINKS.map((l) => (
            <li key={l.url}>
              <a href={l.url} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                {l.label} <ExternalLink size={15} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
