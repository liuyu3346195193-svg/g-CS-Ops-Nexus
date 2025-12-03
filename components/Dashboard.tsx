import React from 'react';
import { ViewState } from '../types';
import { Activity, Users, ShieldCheck, Zap } from 'lucide-react';

interface DashboardProps {
  onChangeView: (view: ViewState) => void;
}

const StatCard: React.FC<{ title: string; value: string; trend: string; icon: React.ReactNode; color: string }> = ({ title, value, trend, icon, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
      </div>
      <div className={`p-3 rounded-lg ${color} text-white`}>
        {icon}
      </div>
    </div>
    <p className="text-xs font-medium text-emerald-600 mt-4 flex items-center">
      <span className="bg-emerald-100 px-1.5 py-0.5 rounded mr-2">+{trend}</span>
      相比上月
    </p>
  </div>
);

export const Dashboard: React.FC<DashboardProps> = ({ onChangeView }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-brand-900 to-brand-700 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">客户运营中枢 CS Ops Nexus</h1>
          <p className="text-brand-100 max-w-2xl mb-6">
            连接 Web3 与传统商业。管理运营，简化商户入驻，确保全球支付合规。
          </p>
          <div className="flex space-x-4">
            <button 
              onClick={() => onChangeView(ViewState.ONBOARDING)}
              className="bg-white text-brand-900 px-5 py-2.5 rounded-lg font-semibold hover:bg-brand-50 transition-colors flex items-center shadow-lg"
            >
              <Zap className="w-4 h-4 mr-2" />
              管理商户入驻
            </button>
            <button 
               onClick={() => onChangeView(ViewState.TEAM_OPS)}
               className="bg-brand-800 text-white border border-brand-600 px-5 py-2.5 rounded-lg font-semibold hover:bg-brand-700 transition-colors flex items-center"
            >
              <ShieldCheck className="w-4 h-4 mr-2" />
              标准化 SOP
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="活跃商户" 
          value="1,248" 
          trend="12%" 
          icon={<Users className="w-5 h-5" />} 
          color="bg-blue-500"
        />
        <StatCard 
          title="平均入驻时间" 
          value="3.2 天" 
          trend="15%" 
          icon={<Zap className="w-5 h-5" />} 
          color="bg-amber-500"
        />
        <StatCard 
          title="客户满意度 (CSAT)" 
          value="4.9/5.0" 
          trend="0.2" 
          icon={<ShieldCheck className="w-5 h-5" />} 
          color="bg-emerald-500"
        />
        <StatCard 
          title="日交易量 (USDT)" 
          value="$4.2M" 
          trend="8%" 
          icon={<Activity className="w-5 h-5" />} 
          color="bg-indigo-500"
        />
      </div>

      {/* Corporate Alignment - OKR Only */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-4 flex items-center">
          <Activity className="w-5 h-5 mr-2 text-brand-600" />
          战略重点 (OKR 对齐)
        </h3>
        <div className="space-y-4">
          {[
            { title: "降低集成阻力", progress: 75, desc: "目标：API 集成时间 < 5 分钟" },
            { title: "知识库覆盖率", progress: 92, desc: "目标：前 50 个客户常见问题 100% 覆盖" },
            { title: "跨部门协同", progress: 60, desc: "标准化销售与技术之间的交接" }
          ].map((item, idx) => (
            <div key={idx}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-slate-700">{item.title}</span>
                <span className="text-slate-500">{item.progress}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div 
                  className="bg-brand-600 h-2 rounded-full transition-all duration-1000" 
                  style={{ width: `${item.progress}%` }}
                ></div>
              </div>
              <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};