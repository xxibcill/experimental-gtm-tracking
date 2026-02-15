'use client';

import { Component, ReactNode } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <Alert variant="error" className="max-w-lg">
            <AlertTitle>Something went wrong</AlertTitle>
            <AlertDescription>
              <p className="mb-4">
                {this.state.error?.message || 'An unexpected error occurred.'}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Reload Page
              </button>
            </AlertDescription>
          </Alert>
        </div>
      );
    }

    return this.props.children;
  }
}