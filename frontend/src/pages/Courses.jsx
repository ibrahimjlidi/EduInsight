import { useMemo, useState } from 'react';
import { PlusCircle, Search, BookMarked } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const initialCourses = [
  {
    id: 1,
    title: 'AI Automation Foundations',
    category: 'Automation',
    lessons: 12,
    level: 'Intermediate',
    description: 'Design practical automation flows and evaluate intelligent decision-making patterns.',
  },
  {
    id: 2,
    title: 'Modern Web Development',
    category: 'Web Development',
    lessons: 16,
    level: 'Advanced',
    description: 'Create resilient frontends with reusable component systems and state architecture.',
  },
  {
    id: 3,
    title: 'Embedded Systems Design',
    category: 'Engineering',
    lessons: 10,
    level: 'Beginner',
    description: 'Understand hardware logic and embedded data pipelines through guided labs.',
  },
];

const categories = ['All', 'Automation', 'Web Development', 'Engineering'];

const Courses = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState(initialCourses);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ title: '', category: 'Automation', lessons: '', level: 'Beginner', description: '' });

  const visibleCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesCategory = activeCategory === 'All' || course.category === activeCategory;
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [courses, activeCategory, searchTerm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCourse = {
      id: Date.now(),
      title: formData.title,
      category: formData.category,
      lessons: Number(formData.lessons),
      level: formData.level,
      description: formData.description,
    };
    setCourses((prev) => [newCourse, ...prev]);
    setShowModal(false);
    setFormData({ title: '', category: 'Automation', lessons: '', level: 'Beginner', description: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Course catalog</p>
          <h1 className="text-3xl font-semibold text-white">Syllabus management</h1>
        </div>
        {user?.role === 'teacher' ? (
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 rounded-2xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            <PlusCircle className="h-4 w-4" />
            Add course
          </button>
        ) : null}
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search course or topic"
              className="w-full bg-transparent outline-none sm:w-64"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  activeCategory === category ? 'bg-cyan-500 text-slate-950' : 'bg-slate-950/70 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        {visibleCourses.map((course) => (
          <div key={course.id} className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg shadow-slate-950/30">
            <div className="mb-4 flex items-center justify-between">
              <div className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm text-cyan-300">{course.category}</div>
              <div className="rounded-full bg-slate-950/70 px-3 py-1 text-sm text-slate-300">{course.level}</div>
            </div>
            <div className="mb-4 flex items-center gap-2 text-slate-400">
              <BookMarked className="h-4 w-4" />
              {course.lessons} lessons
            </div>
            <h2 className="mb-2 text-xl font-semibold text-white">{course.title}</h2>
            <p className="text-sm leading-7 text-slate-400">{course.description}</p>
          </div>
        ))}
      </div>

      {showModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4">
          <div className="w-full max-w-2xl rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Create new syllabus</p>
                <h3 className="text-2xl font-semibold text-white">Add course module</h3>
              </div>
              <button onClick={() => setShowModal(false)} className="text-sm text-slate-400 hover:text-white">
                Close
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="mb-2 block text-sm text-slate-300">Title</label>
                <input
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 outline-none"
                  required
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-slate-300">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                    className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 outline-none"
                  >
                    {categories.filter((cat) => cat !== 'All').map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm text-slate-300">Lessons</label>
                  <input
                    type="number"
                    value={formData.lessons}
                    onChange={(e) => setFormData((prev) => ({ ...prev, lessons: e.target.value }))}
                    className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300">Level</label>
                <select
                  value={formData.level}
                  onChange={(e) => setFormData((prev) => ({ ...prev, level: e.target.value }))}
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 outline-none"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  rows="4"
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="rounded-2xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Save course
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Courses;
