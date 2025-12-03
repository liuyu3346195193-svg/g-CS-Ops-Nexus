import React, { Component, ErrorInfo, ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// 定义错误边界组件，用于捕获整个应用的崩溃错误
interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6 font-sans">
          <div className="bg-white p-8 rounded-xl shadow-lg border border-red-100 max-w-lg w-full">
            <div className="flex items-center mb-4 text-red-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
              <h1 className="text-xl font-bold">应用启动失败</h1>
            </div>
            <p className="text-slate-600 mb-4 text-sm leading-relaxed">
              应用程序在初始化时遇到错误。这通常是因为缺少必要的环境变量配置（如 API Key）。
            </p>
            <div className="bg-slate-100 p-4 rounded-lg overflow-x-auto mb-6">
              <code className="text-xs font-mono text-slate-800 break-words">
                {this.state.error?.message || "Unknown Error"}
              </code>
            </div>
            <div className="text-sm text-slate-500 space-y-2 border-t border-slate-100 pt-4">
              <p className="font-semibold text-slate-700">如何修复：</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>前往 Vercel 项目控制台。</li>
                <li>进入 <strong>Settings</strong> &gt; <strong>Environment Variables</strong>。</li>
                <li>添加 Key: <code>API_KEY</code>，Value: 您的 Gemini API 密钥。</li>
                <li>保存后，点击 <strong>Deployments</strong> &gt; <strong>Redeploy</strong>。</li>
              </ol>
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="mt-6 w-full bg-slate-900 text-white py-2.5 rounded-lg hover:bg-slate-800 transition-colors font-medium text-sm"
            >
              已修复配置，刷新页面
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);