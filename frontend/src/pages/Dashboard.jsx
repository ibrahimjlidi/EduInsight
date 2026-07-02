import { useMemo, useState } from 'react';
import { RefreshCw, TrendingUp, BookOpen, Users, Sparkles, Activity } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const baseMetrics = [
  { name: 'Week 1', score: 74, engagement: 58 },
  { name: 'Week 2', score: 78, engagement: 63 },
  { name: 'Week 3', score: 82, engagement: 68 },
  { name: 'Week 4', score: 86, engagement: 72 },
  { name: 'Week 5', score: 89, engagement: 77 },
];

const Dashboard = () => {
  const [metrics, setMetrics] = useState(baseMetrics);
  const [refreshCount, setRefreshCount] = useState(0);

  const kpis = useMemo(
    () => [
      { title: 'Total Students', value: '1,248', icon: Users, accent: 'text-cyan-300' },
      { title: 'Active Courses', value: '36', icon: BookOpen, accent: 'text-violet-300' },
      { title: 'Average Quiz Scores', value: '86%', icon: TrendingUp, accent: 'text-emerald-300' },
      { title: 'Engagement Factor', value: '92%', icon: Activity, accent: 'text-amber-300' },
    ],
    []
  );

  const refreshData = () => {
    setMetrics((prev) =>
      prev.map((item, index) => ({
        ...item,
        score: Math.min(96, item.score + (index % 2 === 0 ? 1 : 0)),
        engagement: Math.min(90, item.engagement + (index % 2 === 0 ? 2 : 1)),
      }))
    );
    setRefreshCount((count) => count + 1);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Analytics overview</p>
          <h1 className="text-3xl font-semibold text-white">Performance dashboard</h1>
        </div>
        <button
          onClick={refreshData}
          className="flex items-center gap-2 rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-3 text-sm font-medium text-slate-100 transition hover:border-cyan-400/40"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh insights ({refreshCount})
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {kpis.map(({ title, value, icon: Icon, accent }) => (
          <div key={title} className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg shadow-slate-950/30">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm text-slate-400">{title}</p>
              <Icon className={`h-5 w-5 ${accent}`} />
            </div>
            <p className="text-3xl font-semibold text-white">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Academic velocity</p>
              <h2 className="text-xl font-semibold text-white">Quiz performance trajectory</h2>
            </div>
            <div className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm text-cyan-300">Live</div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={metrics}>
                <CartesianGrid stroke="#273449" strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#22d3ee" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Weekly activity</p>
              <h2 className="text-xl font-semibold text-white">Interaction heatmap</h2>
            </div>
            <div className="rounded-full bg-violet-500/10 px-3 py-1 text-sm text-violet-300">Updated</div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metrics}>
                <CartesianGrid stroke="#273449" strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Bar dataKey="engagement" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">Instruction focus</p>
            <h2 className="text-xl font-semibold text-white">Suggested next actions</h2>
          </div>
          <div className="flex items-center gap-2 text-cyan-300">
            <Sparkles className="h-4 w-4" />
            AI assisted
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl bg-slate-950/70 p-4 text-sm text-slate-300">
            Revisit automation labs for students below 80% mastery.
          </div>
          <div className="rounded-2xl bg-slate-950/70 p-4 text-sm text-slate-300">
            Increase project-based challenges in React foundations.
          </div>
          <div className="rounded-2xl bg-slate-950/70 p-4 text-sm text-slate-300">
            Invite high-engagement learners to peer tutoring sessions.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
