import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, GraduationCap, LoaderCircle, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const initialState = {
  name: '',
  email: '',
  password: '',
  role: 'student',
};

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, register, authError } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isRegister) {
        await register(formData);
      } else {
        await login(formData.email, formData.password);
      }
      navigate('/dashboard');
    } catch (err) {
      const message = err.response?.data?.message || authError || 'An unexpected error occurred';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10 text-slate-100">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-900/80 shadow-2xl shadow-slate-950/40 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.2),_transparent_45%)] p-8 sm:p-10">
          <div className="absolute right-6 top-6 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-cyan-300">
            Smart education
          </div>
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div>
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-300">
                <GraduationCap className="h-7 w-7" />
              </div>
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Empower every learner with actionable insights.
              </h1>
              <p className="mt-4 max-w-xl text-lg leading-8 text-slate-400">
                Monitor course engagement, quiz outcomes, and student progress in a single polished workspace.
              </p>
            </div>
            <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-950/70 p-5">
              <div className="mb-3 flex items-center gap-2 text-cyan-300">
                <Sparkles className="h-4 w-4" />
                Why teams love EduInsight
              </div>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>• Real-time teaching analytics</li>
                <li>• Beautiful dashboards for instructors and students</li>
                <li>• Secure authentication and modern UI</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="p-8 sm:p-10">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-slate-400">Access Portal</p>
              <h2 className="text-3xl font-semibold text-white">{isRegister ? 'Create account' : 'Welcome back'}</h2>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-3 text-cyan-300">
              <BookOpen className="h-6 w-6" />
            </div>
          </div>

          {error || authError ? (
            <div className="mb-4 rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
              {error || authError}
            </div>
          ) : null}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {isRegister ? (
              <div>
                <label className="mb-2 block text-sm text-slate-300">Full Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 outline-none transition focus:border-cyan-400"
                  placeholder="Amara Benali"
                  required
                />
              </div>
            ) : null}

            <div>
              <label className="mb-2 block text-sm text-slate-300">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 outline-none transition focus:border-cyan-400"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 outline-none transition focus:border-cyan-400"
                placeholder="••••••••"
                required
              />
            </div>

            {isRegister ? (
              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                <p className="mb-3 text-sm font-medium text-slate-300">Choose your role</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {['student', 'teacher'].map((role) => (
                    <button
                      type="button"
                      key={role}
                      onClick={() => setFormData((prev) => ({ ...prev, role }))}
                      className={`rounded-2xl border px-4 py-3 text-left capitalize transition ${
                        formData.role === role
                          ? 'border-cyan-400 bg-cyan-500/10 text-cyan-300'
                          : 'border-slate-700 bg-slate-900 text-slate-300'
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? <LoaderCircle className="h-5 w-5 animate-spin" /> : null}
              {isRegister ? 'Create account' : 'Login'}
            </button>
          </form>

          <button
            type="button"
            onClick={() => {
              setIsRegister((prev) => !prev);
              setError('');
            }}
            className="mt-6 text-sm text-slate-400 transition hover:text-cyan-300"
          >
            {isRegister ? 'Already have an account? Sign in' : "Don't have an account? Create one"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
