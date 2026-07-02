const Docs = () => {
  return (
    <div className="min-h-screen bg-slate-100 py-10 text-slate-900">
      <div className="mx-auto max-w-6xl space-y-10 px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.3em] text-sky-500">EduInsight Docs</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">Readable project documentation with visuals</h1>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                A lighter, cleaner guide for students with screenshot previews and easy-to-scan sections for backend, frontend, and deployment.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="h-52 w-full overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm">
                <svg className="h-full w-full" viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Dashboard preview">
                  <rect width="100%" height="100%" fill="#eff6ff" />
                  <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#0f172a" fontSize="20">Dashboard Preview</text>
                </svg>
              </div>
              <div className="h-52 w-full overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm">
                <svg className="h-full w-full" viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Login preview">
                  <rect width="100%" height="100%" fill="#fff3ff" />
                  <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#0f172a" fontSize="20">Login Page Preview</text>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <section className="space-y-5 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-3xl font-semibold text-slate-900">1. Project Structure</h2>
            <span className="rounded-full bg-sky-50 px-4 py-2 text-sm font-medium text-sky-700">Overview</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="font-semibold text-slate-900">backend/</h3>
              <p className="mt-2 text-sm text-slate-600">Contains the server, API routes, controllers, models, and seed script.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="font-semibold text-slate-900">frontend/</h3>
              <p className="mt-2 text-sm text-slate-600">Contains the React app, auth context, pages, layout, and documentation page.</p>
            </div>
          </div>
        </section>

        <section className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-3xl font-semibold text-slate-900">2. Backend: Express Project Explained</h2>
            <span className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">API + data</span>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
            <div className="space-y-4 text-slate-700">
              <h3 className="text-2xl font-semibold text-slate-900">2.1 server.js — entry point</h3>
              <p>Open <code>backend/server.js</code>. It does three main things:</p>
              <ol className="list-decimal space-y-3 rounded-3xl border border-slate-200 bg-slate-50 p-5 text-slate-700">
                <li><strong>Load dependencies:</strong> imports Express, dotenv, cors, mongoose, and routes.</li>
                <li><strong>Configure middleware:</strong> uses <code>cors()</code> and <code>express.json()</code>.</li>
                <li><strong>Connect to MongoDB:</strong> uses <code>process.env.MONGO_URI</code>.</li>
              </ol>
              <p className="text-slate-600">Because <code>dotenv.config()</code> runs first, the app can read environment values from <code>backend/.env</code> or the production host.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Screenshot</p>
              <div className="mt-4 w-full overflow-hidden rounded-3xl border border-slate-200 bg-white">
                <svg className="w-full" viewBox="0 0 640 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="server flow">
                  <rect width="100%" height="100%" fill="#e0f2fe" />
                  <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#0f172a" fontSize="18">server.js flow</text>
                </svg>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4 text-slate-700">
              <h3 className="text-2xl font-semibold text-slate-900">2.2 routes/authRoutes.js</h3>
              <p>This file maps API paths to controller functions:</p>
                    <pre className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-900 overflow-auto">
{`import express from 'express';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

export default router;`}
              </pre>
            </div>
            <div className="space-y-4 text-slate-700">
              <h3 className="text-2xl font-semibold text-slate-900">2.3 controllers/authController.js</h3>
              <p>The controller handles registration, login, token creation, and error responses.</p>
              <ul className="list-disc space-y-2 pl-5 text-slate-600">
                <li><strong>register:</strong> validates input, creates a user, and returns a token.</li>
                <li><strong>login:</strong> checks the email and password, then returns a token when valid.</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4 text-slate-700">
            <h3 className="text-2xl font-semibold text-slate-900">2.4 models/User.js</h3>
            <p>This model defines the user schema and hashes passwords before saving:</p>
            <pre className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-900 overflow-auto">
{`const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'teacher'], default: 'student' },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};`}
            </pre>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-slate-700">
            <h3 className="font-semibold text-slate-900">Seed data guide</h3>
            <p className="mt-2 text-sm leading-6">
              Run <code>node seed.js</code> after setting <code>MONGO_URI</code> to populate the app with example users, courses, and quizzes.
            </p>
          </div>
        </section>

        <section className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-3xl font-semibold text-slate-900">3. Frontend: React Step by Step</h2>
            <span className="rounded-full bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700">UI + auth</span>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4 text-slate-700">
              <h3 className="text-2xl font-semibold text-slate-900">3.1 src/App.jsx</h3>
              <p>This file defines routing and protects dashboard pages with <code>ProtectedRoute</code>.</p>
              <pre className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-900">
{`import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';`}
              </pre>
            </div>
            <div className="space-y-4 text-slate-700">
              <h3 className="text-2xl font-semibold text-slate-900">3.2 src/context/api.js</h3>
              <p>The API helper uses <code>VITE_API_URL</code> so the frontend points to your deployed backend.</p>
              <pre className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-900">
{`const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});`}
              </pre>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4 text-slate-700">
              <h3 className="text-2xl font-semibold text-slate-900">3.3 AuthContext</h3>
              <p>This context manages auth state, saves the user in <code>localStorage</code>, and exposes login/register/logout methods.</p>
            </div>
            <div className="space-y-4 text-slate-700">
              <h3 className="text-2xl font-semibold text-slate-900">3.4 Login page</h3>
              <p>The login page toggles between sign-in and register modes and displays any backend validation errors.</p>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-slate-700">
            <h3 className="font-semibold text-slate-900">Design tip</h3>
            <p className="mt-2 text-sm leading-6">
              Use whitespace, clear headings, and simple cards to make documentation easy to scan.
            </p>
          </div>
        </section>

        <section className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-3xl font-semibold text-slate-900">4. Full workflow for this project</h2>
            <span className="rounded-full bg-violet-50 px-4 py-2 text-sm font-medium text-violet-700">Build steps</span>
          </div>

          <div className="space-y-4 text-slate-700">
            <h3 className="text-2xl font-semibold text-slate-900">4.1 Start locally</h3>
            <ol className="list-decimal space-y-3 pl-5 text-slate-600">
              <li>Run <code>npm install</code> in both <code>backend/</code> and <code>frontend/</code>.</li>
              <li>Create <code>backend/.env</code> with <code>MONGO_URI</code>, <code>JWT_SECRET</code>, and <code>CORS_ORIGIN</code>.</li>
              <li>Start the backend with <code>node server.js</code> or <code>npm run dev</code>.</li>
              <li>Start the frontend with <code>npm run dev</code>.</li>
            </ol>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4 text-slate-700">
              <h3 className="text-2xl font-semibold text-slate-900">4.2 Login flow</h3>
              <ul className="list-disc space-y-2 pl-5 text-slate-600">
                <li>The login form sends a POST request to <code>/api/auth/login</code>.</li>
                <li>The backend checks credentials and returns a JWT.</li>
                <li>The frontend saves the token and shows the dashboard.</li>
              </ul>
            </div>
            <div className="space-y-4 text-slate-700">
              <h3 className="text-2xl font-semibold text-slate-900">4.3 Protected data</h3>
              <ul className="list-disc space-y-2 pl-5 text-slate-600">
                <li>The frontend includes the token in API headers.</li>
                <li>The backend verifies the token before returning data.</li>
                <li>Only authenticated users can access dashboard content.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-3xl font-semibold text-slate-900">5. Practice exercises</h2>
          <ol className="list-decimal space-y-3 pl-5 text-slate-700">
            <li>Add a backend report route for student metrics.</li>
            <li>Create a new frontend page that displays that report.</li>
            <li>Add stronger password validation during registration.</li>
            <li>Implement a password reset flow with email simulation.</li>
          </ol>
        </section>
      </div>
    </div>
  );
};

export default Docs;
