import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Button } from '@cloudflare/kumo';
import { WarningCircle, ArrowClockwise } from '@phosphor-icons/react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="rounded-lg border border-kumo-danger/30 bg-kumo-danger-tint p-6 text-center">
          <WarningCircle size={48} weight="fill" className="mx-auto mb-4 text-kumo-danger" />
          <h3 className="mb-2 text-lg font-semibold text-kumo-strong">
            Something went wrong
          </h3>
          <p className="mb-4 text-sm text-kumo-subtle">
            We encountered an error while loading this component. This might be a temporary issue.
          </p>
          {import.meta.env.DEV && this.state.error && (
            <details className="mb-4 rounded border border-kumo-line bg-kumo-recessed p-3 text-left">
              <summary className="mb-2 cursor-pointer font-medium text-kumo-strong">
                Error Details (Development)
              </summary>
              <pre className="whitespace-pre-wrap font-mono text-xs text-kumo-subtle">
                {this.state.error.message}
                {'\n\n'}
                {this.state.error.stack}
              </pre>
            </details>
          )}
          <Button variant="danger" onClick={this.handleRetry} icon={ArrowClockwise}>
            Try Again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;