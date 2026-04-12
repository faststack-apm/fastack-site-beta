import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFoundPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-transparent text-center space-y-6">
      <div className="space-y-2">
        <h1 className="text-6xl font-bold text-gradient">404</h1>
        <h2 className="text-2xl font-semibold">Page Not Found</h2>
        <p className="text-muted-foreground max-w-sm mx-auto">
          The page you are looking for doesn't exist or has been removed as part of the project purge.
        </p>
      </div>
      
      <Link 
        href="/" 
        className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
      >
        <Home className="w-4 h-4" />
        Return Home
      </Link>
    </main>
  );
}

