import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render(): JSX.Element | ReactNode {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '50px' }}>
          <h1>Sorry.. there was an error</h1>
        </div>
      );
    }

    return this.props.children;
  }
}
