const Docs = () => {
  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8">
        <h1 className="text-3xl font-semibold text-white">EduInsight Documentation</h1>
        <p className="mt-4 text-slate-400">
          This guide explains how the project is built and how the frontend, backend, and database work together.
        </p>
      </div>

      <section className="space-y-4 rounded-3xl border border-slate-800 bg-slate-900/80 p-8">
        <h2 className="text-2xl font-semibold text-white">1. Project Structure</h2>
        <div className="space-y-3 text-slate-300">
          <p><strong>frontend/</strong> contains the React app, pages, layout, and API client.</p>
          <p><strong>backend/</strong> contains the Express server, routes, controllers, models, and seed data.</p>
          <p><strong>README.md</strong> explains running the project locally and deployment.</p>
        </div>
      </section>

      <section className="space-y-4 rounded-3xl border border-slate-800 bg-slate-900/80 p-8">
        <h2 className="text-2xl font-semibold text-white">2. Backend Overview</h2>
        <div className="space-y-3 text-slate-300">
          <p><strong>server.js</strong> initializes Express, loads environment variables, sets CORS, connects to MongoDB, and installs routes.</p>
          <p><strong>routes/authRoutes.js</strong> defines authentication endpoints for register and login.</p>
          <p><strong>controllers/authController.js</strong> handles user creation, login, JWT creation, and password verification.</p>
          <p><strong>models/User.js</strong> defines the user schema and hashes passwords before saving.</p>
          <p><strong>seed.js</strong> populates the database with sample users, courses, quizzes, and results.</p>
        </div>
      </section>

      <section className="space-y-4 rounded-3xl border border-slate-800 bg-slate-900/80 p-8">
        <h2 className="text-2xl font-semibold text-white">3. Frontend Overview</h2>
        <div className="space-y-3 text-slate-300">
          <p><strong>src/context/api.js</strong> creates an Axios instance pointing to the backend API using <code>VITE_API_URL</code>.</p>
          <p><strong>src/context/AuthContext.jsx</strong> manages authentication state, login, register, and localStorage persistence.</p>
          <p><strong>src/layouts/DashboardLayout.jsx</strong> renders the sidebar navigation and main content area for authenticated pages.</p>
          <p><strong>src/pages/</strong> includes pages like <code>Dashboard</code>, <code>Courses</code>, <code>Quiz</code>, <code>Students</code>, and the new <code>Docs</code> page.</p>
        </div>
      </section>

      <section className="space-y-4 rounded-3xl border border-slate-800 bg-slate-900/80 p-8">
        <h2 className="text-2xl font-semibold text-white">4. Deployment Notes</h2>
        <div className="space-y-3 text-slate-300">
          <p>On Vercel, configure <code>VITE_API_URL</code> to your backend URL like <code>https://eduinsight-1-m1xu.onrender.com/api</code>.</p>
          <p>On Render, set <code>MONGO_URI</code>, <code>JWT_SECRET</code>, and <code>CORS_ORIGIN</code> as environment variables.</p>
          <p>For MongoDB Atlas, use the <code>eduinsight</code> database and make sure the deployed service can access it.</p>
        </div>
      </section>
    </div>
  );
};

export default Docs;
