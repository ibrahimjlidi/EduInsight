const Docs = () => {
  return (
    <div className="space-y-10">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8">
        <h1 className="text-3xl font-semibold text-white">EduInsight Detailed Learning Guide</h1>
        <p className="mt-4 text-slate-400">
          This documentation is designed to teach students how to build a full-stack React + Express project by walking through this codebase step by step.
        </p>
      </div>

      <section className="space-y-5 rounded-3xl border border-slate-800 bg-slate-900/80 p-8">
        <h2 className="text-2xl font-semibold text-white">1. Project Structure</h2>
        <div className="space-y-4 text-slate-300">
          <p>The project is divided into two folders:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li><strong>backend/</strong> contains the server, API, database models, and seed data.</li>
            <li><strong>frontend/</strong> contains the React application, routes, pages, and auth logic.</li>
          </ul>
          <p>The backend is responsible for data storage, authentication, and business logic. The frontend is responsible for user interaction and displaying data.</p>
        </div>
      </section>

      <section className="space-y-6 rounded-3xl border border-slate-800 bg-slate-900/80 p-8">
        <h2 className="text-2xl font-semibold text-white">2. Backend: Express Project Explained</h2>
        <div className="space-y-4 text-slate-300">
          <h3 className="text-xl font-semibold text-white">2.1 server.js — entry point</h3>
          <p>Open <code>backend/server.js</code>. It does three main things:</p>
          <ol className="list-decimal space-y-3 pl-5">
            <li>
              <strong>Load dependencies:</strong> imports Express, dotenv, cors, mongoose, and route modules.
            </li>
            <li>
              <strong>Configure middleware:</strong> uses <code>cors()</code> for cross-origin requests and <code>express.json()</code> to parse JSON bodies.
            </li>
            <li>
              <strong>Connect to MongoDB:</strong> calls <code>mongoose.connect()</code> with <code>process.env.MONGO_URI</code>.
            </li>
          </ol>
          <p>Because <code>dotenv.config()</code> runs at the top, all <code>process.env</code> values come from <code>backend/.env</code> or Render environment variables.</p>

          <h3 className="text-xl font-semibold text-white">2.2 routes/authRoutes.js</h3>
          <p>This file maps API paths to controller functions:</p>
          <pre className="rounded-xl bg-slate-950 p-4 text-sm text-slate-300">{`import express from 'express';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

export default router;`}</pre>
          <p>When the frontend calls <code>/api/auth/login</code>, Express passes the request to <code>login</code> in the controller.</p>

          <h3 className="text-xl font-semibold text-white">2.3 controllers/authController.js</h3>
          <p>Read this file line by line:</p>
          <ol className="list-decimal space-y-3 pl-5">
            <li>
              <strong>generateToken:</strong> creates a JWT using <code>jwt.sign()</code> with user ID and role.
            </li>
            <li>
              <strong>register function:</strong> checks that name, email, and password are present, verifies the email is unique, creates the user, and returns a token.
            </li>
            <li>
              <strong>login function:</strong> finds the user by email, compares the password using <code>user.matchPassword()</code>, and returns a token if valid.
            </li>
          </ol>
          <p>Notice how errors are handled with <code>res.status(400)</code> and <code>res.status(500)</code>.</p>

          <h3 className="text-xl font-semibold text-white">2.4 models/User.js</h3>
          <p>This file defines the user schema and encrypts passwords:</p>
          <pre className="rounded-xl bg-slate-950 p-4 text-sm text-slate-300">{`const userSchema = new mongoose.Schema({
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
};`}</pre>
          <p>This means passwords are hashed before they are stored, and raw passwords are never saved in the database.</p>

          <h3 className="text-xl font-semibold text-white">2.5 seed.js</h3>
          <p>The seed script is a teaching tool. It shows how to insert data into MongoDB using Mongoose models.</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>It connects to MongoDB with <code>mongoose.connect(MONGO)</code>.</li>
            <li>It deletes existing users and courses with <code>deleteMany()</code>.</li>
            <li>It creates sample users, courses, quizzes, and results.</li>
          </ul>
          <p>Run it with <code>node seed.js</code> after setting <code>MONGO_URI</code>.</p>
        </div>
      </section>

      <section className="space-y-6 rounded-3xl border border-slate-800 bg-slate-900/80 p-8">
        <h2 className="text-2xl font-semibold text-white">3. Frontend: React Step by Step</h2>
        <div className="space-y-4 text-slate-300">
          <h3 className="text-xl font-semibold text-white">3.1 src/App.jsx</h3>
          <p>This file defines the frontend routes and which pages are protected:</p>
          <pre className="rounded-xl bg-slate-950 p-4 text-sm text-slate-300">{`import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';`}</pre>
          <p>The protected routes are wrapped in <code>ProtectedRoute</code>. If the user is not authenticated, the app redirects to login.</p>

          <h3 className="text-xl font-semibold text-white">3.2 src/context/api.js</h3>
          <p>This is the API client. It makes backend requests easier:</p>
          <pre className="rounded-xl bg-slate-950 p-4 text-sm text-slate-300">{`const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});`}</pre>
          <p>The <code>baseURL</code> uses the environment variable from Vercel or the local default.</p>
          <p>Requests include the JWT token automatically when the user is signed in.</p>

          <h3 className="text-xl font-semibold text-white">3.3 src/context/AuthContext.jsx</h3>
          <p>This file organizes authentication for the whole app:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Loads the user from <code>localStorage</code> on app start.</li>
            <li>Provides <code>login()</code>, <code>register()</code>, and <code>logout()</code>.</li>
            <li>Saves the auth payload to <code>localStorage</code>.</li>
            <li>Exposes <code>authError</code> so pages can show error messages.</li>
          </ul>
          <p>This is a good example of using React Context to share state across the app.</p>

          <h3 className="text-xl font-semibold text-white">3.4 src/pages/Login.jsx</h3>
          <p>This page contains the login/register form and calls the auth context:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Renders fields for email and password.</li>
            <li>Uses state to update the input values.</li>
            <li>Calls <code>login(email, password)</code> on submit.</li>
            <li>Shows validation errors returned from the backend.</li>
          </ul>
          <p>It is a practical example of React form handling and conditional rendering.</p>

          <h3 className="text-xl font-semibold text-white">3.5 src/layouts/DashboardLayout.jsx</h3>
          <p>This file builds the protected dashboard layout:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Contains the left sidebar and main content area.</li>
            <li>Defines navigation items and active styles.</li>
            <li>Displays the signed-in user and a logout button.</li>
          </ul>

          <h3 className="text-xl font-semibold text-white">3.6 What students should change</h3>
          <p>To practice, add a new page and route:</p>
          <ol className="list-decimal space-y-3 pl-5">
            <li>Create <code>frontend/src/pages/Reports.jsx</code>.</li>
            <li>Add a route in <code>App.jsx</code> like <code>&lt;Route path="/reports" element=&lt;Reports /&gt; /&gt;</code>.</li>
            <li>Add a nav item in <code>DashboardLayout.jsx</code>.</li>
            <li>Call a new backend route from the page using <code>api.get('/admin/reports')</code> or similar.</li>
          </ol>
        </div>
      </section>

      <section className="space-y-6 rounded-3xl border border-slate-800 bg-slate-900/80 p-8">
        <h2 className="text-2xl font-semibold text-white">4. Full workflow for this project</h2>
        <div className="space-y-4 text-slate-300">
          <h3 className="text-xl font-semibold text-white">4.1 Start the project locally</h3>
          <ol className="list-decimal space-y-3 pl-5">
            <li>Run <code>npm install</code> in both <code>backend/</code> and <code>frontend/</code>.</li>
            <li>Create <code>backend/.env</code> with <code>MONGO_URI</code>, <code>JWT_SECRET</code>, and <code>CORS_ORIGIN</code>.</li>
            <li>Start the backend with <code>node server.js</code> or <code>npm run dev</code>.</li>
            <li>Start the frontend with <code>npm run dev</code>.</li>
          </ol>

          <h3 className="text-xl font-semibold text-white">4.2 Request flow from login to dashboard</h3>
          <p>When a student logs in:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>The login form sends a POST request to <code>/api/auth/login</code>.</li>
            <li>The backend checks the email and password using Mongoose.</li>
            <li>If valid, the backend returns a JWT token and user info.</li>
            <li>The frontend saves the token and redirects to the dashboard.</li>
          </ul>

          <h3 className="text-xl font-semibold text-white">4.3 Data flow for protected pages</h3>
          <p>Once logged in:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>The frontend includes the token in API requests.</li>
            <li>The backend verifies the token on protected routes.</li>
            <li>Protected dashboard pages can request data like courses and results.</li>
          </ul>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 text-slate-300">
        <h2 className="text-2xl font-semibold text-white">5. Practice exercises</h2>
        <ol className="list-decimal space-y-3 pl-5">
          <li>Add a new backend route for reporting user counts.</li>
          <li>Create a new frontend page that displays that report.</li>
          <li>Add validation for registration to require a stronger password.</li>
          <li>Implement a password reset workflow using email simulation.</li>
        </ol>
      </section>
    </div>
  );
};

export default Docs;
