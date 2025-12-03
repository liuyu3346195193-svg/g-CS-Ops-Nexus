import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { TeamOps } from './components/TeamOps';
import { OnboardingTracker } from './components/OnboardingTracker';
import { SmartKnowledgeBase } from './components/SmartKnowledgeBase';
import { MetricsHub } from './components/MetricsHub';
import { UserManual } from './components/UserManual';
import { ViewState } from './types';
import { LayoutDashboard, Users, BookOpen, BarChart3, Settings, LogOut, Zap, HelpCircle, Command } from 'lucide-react';

const SidebarItem: React.FC<{ 
  icon: React.ReactNode; 
  label: string; 
  active: boolean; 
  onClick: () => void 
}> = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors mb-1 ${
      active 
        ? 'bg-brand-50 text-brand-700 font-medium' 
        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.DASHBOARD);

  const renderContent = () => {
    switch (currentView) {
      case ViewState.DASHBOARD:
        return <Dashboard onChangeView={setCurrentView} />;
      case ViewState.TEAM_OPS:
        return <TeamOps />;
      case ViewState.ONBOARDING:
        return <OnboardingTracker />;
      case ViewState.KNOWLEDGE_BASE:
        return <SmartKnowledgeBase />;
      case ViewState.ANALYTICS:
        return <MetricsHub />;
      case ViewState.USER_MANUAL:
        return <UserManual />;
      default:
        return <Dashboard onChangeView={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 fixed h-full z-10 hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-100 flex items-center space-x-3">
          <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white shadow-sm shrink-0">
            <Command size={20} strokeWidth={3} />
          </div>
          <span className="text-lg font-bold text-slate-800 tracking-tight leading-tight">CS Ops Nexus</span>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="mb-6">
            <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">概览</p>
            <SidebarItem 
              icon={<LayoutDashboard size={20} />} 
              label="仪表板" 
              active={currentView === ViewState.DASHBOARD}
              onClick={() => setCurrentView(ViewState.DASHBOARD)}
            />
          </div>

          <div className="mb-6">
            <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">运营</p>
            <SidebarItem 
              icon={<Users size={20} />} 
              label="团队运营 & SOP" 
              active={currentView === ViewState.TEAM_OPS}
              onClick={() => setCurrentView(ViewState.TEAM_OPS)}
            />
            <SidebarItem 
              icon={<Zap size={20} />} 
              label="商户入驻管道" 
              active={currentView === ViewState.ONBOARDING}
              onClick={() => setCurrentView(ViewState.ONBOARDING)}
            />
          </div>

          <div className="mb-6">
            <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">支持与数据</p>
            <SidebarItem 
              icon={<BookOpen size={20} />} 
              label="知识库 (AI)" 
              active={currentView === ViewState.KNOWLEDGE_BASE}
              onClick={() => setCurrentView(ViewState.KNOWLEDGE_BASE)}
            />
            <SidebarItem 
              icon={<BarChart3 size={20} />} 
              label="分析中心" 
              active={currentView === ViewState.ANALYTICS}
              onClick={() => setCurrentView(ViewState.ANALYTICS)}
            />
          </div>
          
          <div className="mb-6">
            <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">系统</p>
            <SidebarItem 
              icon={<HelpCircle size={20} />} 
              label="使用指南" 
              active={currentView === ViewState.USER_MANUAL}
              onClick={() => setCurrentView(ViewState.USER_MANUAL)}
            />
          </div>
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="bg-brand-50 rounded-lg p-3 flex items-center space-x-3 mb-2">
             <div className="w-8 h-8 rounded-full bg-brand-200 flex items-center justify-center text-brand-700 font-bold text-xs">
               JD
             </div>
             <div className="overflow-hidden">
               <p className="text-sm font-medium text-slate-900 truncate">候选人</p>
               <p className="text-xs text-slate-500 truncate">CCO 助理</p>
             </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 min-h-screen">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-20 px-8 py-4 flex justify-between items-center md:hidden">
           <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white shadow-sm">
              <Command size={20} strokeWidth={3} />
            </div>
            <span className="text-lg font-bold text-slate-800 tracking-tight">CS Ops Nexus</span>
          </div>
        </header>
        
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;