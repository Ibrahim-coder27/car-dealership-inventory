import { Link } from "react-router-dom";
import { ROUTES } from "../routes/routePaths";

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 animate-fade-in-up">
      <div className="text-center">
        <div className="mb-6">
          <span className="text-8xl font-black bg-gradient-to-br from-primary-400 to-primary-700 bg-clip-text text-transparent">
            404
          </span>
        </div>
        <h1 className="text-2xl font-bold text-surface-800 mb-2">
          Page Not Found
        </h1>
        <p className="text-surface-400 mb-8 max-w-sm mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to={ROUTES.HOME}
          className="btn-primary inline-flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;