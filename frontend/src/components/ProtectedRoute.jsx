import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LoaderCircle } from 'lucide-react';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-100">
        <div className="flex items-center gap-3 rounded-full border border-slate-800 bg-slate-900/80 px-5 py-3 shadow-lg shadow-slate-950/30">
          <LoaderCircle className="h-5 w-5 animate-spin" />
          <span className="text-sm font-medium">Preparing EduInsight workspace...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
