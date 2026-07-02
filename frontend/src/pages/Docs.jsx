const Docs = () => {
  return (
    <div className="space-y-10">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8">
        <h1 className="text-3xl font-semibold text-white">EduInsight Full Project Guide</h1>
        <p className="mt-4 text-slate-400">
          This documentation walks through the entire EduInsight project from scratch, covering the backend Express API, the React frontend, the database structure, and deployment.
        </p>
      </div>

      <section className="space-y-5 rounded-3xl border border-slate-800 bg-slate-900/80 p-8">
        <h2 className="text-2xl font-semibold text-white">1. Project Structure</h2>
        <div className="space-y-4 text-slate-300">
          <p>The project is split into two main parts:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li><strong>backend/</strong> - Express server, API logic, MongoDB models, routes, controllers, and seed script.</li>
            <li><strong>frontend/</strong> - React app, pages, layout, auth context, and API client.</li>
          </ul>
          <p>The backend handles data and authentication, while the frontend consumes that API and renders the dashboard.</p>
        </div>
      </section>

      <section className="space-y-5 rounded-3xl border border-slate-800 bg-slate-900/80 p-8">
        <h2 className="text-2xl font-semibold text-white">2. Backend: Express & MongoDB</h2>
        <div className="space-y-4 text-slate-300">
          <h3 className="text-xl font-semibold text-white">2.1 server.js</h3>
          <p>This file is the Express entry point:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Loads environment variables with <code>dotenv</code>.</li>
            <li>Sets up CORS for the frontend origin.</li>
            <li>Connects to MongoDB using <code>mongoose.connect()</code>.</li>
            <li>Registers API routes under <code>/api/auth</code> and <code>/api/admin</code>.</li>
          </ul>

          <h3 className="text-xl font-semibold text-white">2.2 User Model</h3>
          <p>The <code>User</code> model defines the data structure for users and secures passwords:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Fields: <code>name</code>, <code>email</code>, <code>password</code>, and <code>role</code>.</li>
            <li>Before saving, the password is hashed using <code>bcrypt</code>.</li>
            <li>The model adds a method to compare passwords during login.</li>
          </ul>

          <h3 className="text-xl font-semibold text-white">2.3 Authentication Flow</h3>
          <p>Authentication is handled in <code>controllers/authController.js</code>:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li><code>/api/auth/register</code> creates a new user with a hashed password.</li>
            <li><code>/api/auth/login</code> checks the email, validates the password, and returns a JWT.</li>
            <li>JWTs are signed using <code>JWT_SECRET</code> and expire after 24 hours.</li>
          </ul>

          <h3 className="text-xl font-semibold text-white">2.4 Seed Data</h3>
          <p>The <code>seed.js</code> file creates starter data for the app:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Deletes existing users and courses to reset the database.</li>
            <li>Creates teacher and student accounts.</li>
            <li>Creates sample courses, quizzes, and student results.</li>
          </ul>
          <p>Seed data helps students test the app immediately without manual data entry.</p>
        </div>
      </section>

      <section className="space-y-5 rounded-3xl border border-slate-800 bg-slate-900/80 p-8">
        <h2 className="text-2xl font-semibold text-white">3. Frontend: React & Routing</h2>
        <div className="space-y-4 text-slate-300">
          <h3 className="text-xl font-semibold text-white">3.1 App Routing</h3>
          <p>React Router defines frontend pages in <code>App.jsx</code>:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li><code>/login</code> is the public login page.</li>
            <li>Protected routes require authentication and use <code>DashboardLayout</code>.</li>
            <li>Routes include <code>/dashboard</code>, <code>/courses</code>, <code>/quiz</code>, <code>/students</code>, and <code>/docs</code>.</li>
          </ul>

          <h3 className="text-xl font-semibold text-white">3.2 Authentication Context</h3>
          <p>The auth flow is managed in <code>src/context/AuthContext.jsx</code>:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Stores the authenticated user in React state.</li>
            <li>Saves auth payload in <code>localStorage</code>.</li>
            <li>Handles login and registration API calls.</li>
            <li>Redirects unauthorized users to the login page.</li>
          </ul>

          <h3 className="text-xl font-semibold text-white">3.3 API Client</h3>
          <p>The Axios instance in <code>src/context/api.js</code> centralizes requests:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Uses <code>VITE_API_URL</code> for the backend base URL.</li>
            <li>Attaches the JWT token to requests automatically.</li>
            <li>Handles 401 responses by logging the user out.</li>
          </ul>

          <h3 className="text-xl font-semibold text-white">3.4 Sidebar and Navigation</h3>
          <p>The left nav is in <code>DashboardLayout.jsx</code>:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Contains links to each protected page.</li>
            <li>Highlights the active route.</li>
            <li>Displays the signed-in user and logout button.</li>
          </ul>
        </div>
      </section>

      <section className="space-y-5 rounded-3xl border border-slate-800 bg-slate-900/80 p-8">
        <h2 className="text-2xl font-semibold text-white">4. Step-by-Step Learning Path</h2>
        <div className="space-y-4 text-slate-300">
          <h3 className="text-xl font-semibold text-white">4.1 Start with the Backend</h3>
          <ol className="list-decimal space-y-3 pl-5">
            <li>Read <code>backend/server.js</code> to understand how Express is initialized and middleware is configured.</li>
            <li>Open <code>backend/models/User.js</code> and learn how MongoDB schemas and password hashing work.</li>
            <li>Inspect <code>backend/routes/authRoutes.js</code> and <code>backend/controllers/authController.js</code> to understand registration and login flow.</li>
            <li>Run <code>node seed.js</code> to populate the database with sample data.</li>
          </ol>

          <h3 className="text-xl font-semibold text-white">4.2 Learn the Frontend</h3>
          <ol className="list-decimal space-y-3 pl-5">
            <li>Open <code>frontend/src/App.jsx</code> to understand routing and protected pages.</li>
            <li>Study <code>frontend/src/context/AuthContext.jsx</code> to learn React context and auth state handling.</li>
            <li>Inspect <code>frontend/src/context/api.js</code> for API configuration and token handling.</li>
            <li>Explore page components like <code>frontend/src/pages/Login.jsx</code>, <code>Courses.jsx</code>, and <code>Dashboard.jsx</code>.</li>
          </ol>

          <h3 className="text-xl font-semibold text-white">4.3 Learn by Building</h3>
          <ol className="list-decimal space-y-3 pl-5">
            <li>Create a new page such as <code>/reports</code> or <code>/profile</code>.</li>
            <li>Add a new API route in the backend and a new frontend page to consume it.</li>
            <li>Use the existing auth flow to protect the new page.</li>
            <li>Practice deploying both frontend and backend again after the change.</li>
          </ol>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 text-slate-300">
        <h2 className="text-2xl font-semibold text-white">5. Deployment Checklist</h2>
        <ul className="list-disc space-y-3 pl-5">
          <li>Frontend: set <code>VITE_API_URL</code> in Vercel to the deployed backend URL.</li>
          <li>Backend: set <code>MONGO_URI</code>, <code>JWT_SECRET</code>, and <code>CORS_ORIGIN</code> in Render.</li>
          <li>Database: use MongoDB Atlas and make sure the backend can connect to the <code>eduinsight</code> database.</li>
          <li>Test login and protected pages after deployment.</li>
        </ul>
      </section>
    </div>
  );
};

export default Docs;
