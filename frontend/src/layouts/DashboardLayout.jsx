import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, PenTool, Users, LogOut, Sparkles, GraduationCap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Courses', to: '/courses', icon: BookOpen },
  { label: 'Quizzes', to: '/quiz', icon: PenTool },
  { label: 'Students', to: '/students', icon: Users },
];

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <aside className="flex w-72 flex-col justify-between border-r border-slate-800 bg-slate-950 px-6 py-8">
        <div>
          <div className="mb-8 flex items-center gap-3">
            <div className="rounded-2xl bg-cyan-500/15 p-3 text-cyan-400">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">EduInsight</p>
              <h2 className="text-lg font-semibold">Learning Analytics</h2>
            </div>
          </div>

          <nav className="space-y-2">
            {navItems.map(({ label, to, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    isActive ? 'bg-cyan-500/15 text-cyan-300' : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                  }`
                }
              >
                <Icon className="h-5 w-5" />
                {label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="space-y-4">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-4">
            <div className="mb-3 flex items-center gap-2 text-sm text-slate-400">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              Signed in as
            </div>
            <p className="font-semibold text-white">{user?.name}</p>
            <p className="text-sm capitalize text-slate-400">{user?.role}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-rose-500/40 hover:text-rose-300"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top_left,_rgba(6,182,212,0.12),_transparent_40%)] p-6 sm:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
