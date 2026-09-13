import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { RefreshCw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, info: ErrorInfo): void {
    console.error('MilPrep crashed:', error, info.componentStack);
  }

  handleReload = (): void => {
    window.location.reload();
  };

  render(): ReactNode {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <div className="flex min-h-screen min-h-[100dvh] flex-col items-center justify-center gap-4 bg-offwhite px-6 text-center">
        <p className="text-lg font-bold text-military">Ơ, có gì đó bị lỗi rồi!</p>
        <p className="text-charcoal/70">
          Dữ liệu bạn đã tích vẫn được lưu lại. Thử tải lại trang nhé.
        </p>
        <button
          type="button"
          onClick={this.handleReload}
          className="flex min-h-[44px] items-center gap-2 rounded-xl bg-military px-6 py-3 font-bold text-white"
        >
          <RefreshCw size={18} />
          Tải lại trang
        </button>
      </div>
    );
  }
}
