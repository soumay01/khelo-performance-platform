import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Trophy, LayoutDashboard, Activity, Dumbbell, Medal, UserRound, Info, Menu, X, Home } from 'lucide-react';
import Toast from './Toast';
import DemoBanner from './DemoBanner';

const NAV = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/tracker', label: 'Fitness Tracker', icon: Activity },
  { to: '/training', label: 'Training Guidance', icon: Dumbbell },
  { to: '/opportunities', label: 'Opportunities', icon: Medal },
  { to: '/profile', label: 'Athlete Profile', icon: UserRound },
  { to: '/about', label: 'About the Project', icon: Info },
];

export default function Layout() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 bg-navy-900/95 backdrop-blur border-b border-navy-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2 text-white font-bold">
            <span className="grid place-items-center h-9 w-9 rounded-xl bg-saffron-500 text-navy-950">
              <Trophy size={18} aria-hidden="true" />
            </span>
            <span className="leading-tight">
              Khelo Performance<span className="block text-[11px] font-medium text-saffron-300">Student Innovation Demo</span>
            </span>
          </NavLink>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Main">
            {NAV.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition ${
                    isActive ? 'bg-saffron-500 text-navy-950' : 'text-navy-100 hover:bg-navy-800'
                  }`
                }
              >
                <Icon size={15} aria-hidden="true" />
                {label}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            className="lg:hidden text-white p-2 rounded-lg hover:bg-navy-800"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {open && (
          <nav id="mobile-nav" className="lg:hidden border-t border-navy-800 bg-navy-900 px-4 py-3 grid gap-1" aria-label="Mobile">
            {NAV.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium ${
                    isActive ? 'bg-saffron-500 text-navy-950' : 'text-navy-100 hover:bg-navy-800'
                  }`
                }
              >
                <Icon size={16} aria-hidden="true" />
                {label}
              </NavLink>
            ))}
          </nav>
        )}
      </header>

      <DemoBanner />

      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 py-8">
        <Outlet />
      </main>

      <footer className="border-t border-navy-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 text-sm text-navy-600 flex flex-col sm:flex-row gap-2 justify-between">
          <p>An independent student innovation prototype. Not an official Khelo India or government platform.</p>
          <p>Built for learning and demonstration. Sample data only.</p>
        </div>
      </footer>

      <Toast />
    </div>
  );
}
