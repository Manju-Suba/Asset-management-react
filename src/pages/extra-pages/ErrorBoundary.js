/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    // You can also log error messages to an error reporting service here
  }

  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <div className="error-handling-box">
          <h2>
            <span>
              <ReportProblemIcon className="error-icon" />
            </span>
            Oops! Error occurred!
          </h2>
          <details style={{ whiteSpace: 'pre-wrap' }} className="error-toggle-btn">
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}

export default ErrorBoundary;
