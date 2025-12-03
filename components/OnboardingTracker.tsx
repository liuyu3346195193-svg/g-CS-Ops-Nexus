import React from 'react';
import { CheckCircle, Clock, AlertCircle, ChevronRight, Store } from 'lucide-react';
import { MerchantProfile } from '../types';

const PipelineStage: React.FC<{ 
  title: string; 
  count: number; 
  color: string;
  items: MerchantProfile[] 
}> = ({ title, count, color, items }) => (
  <div className="flex-1 bg-slate-50 rounded-xl p-4 min-w-[280px] border border-slate-200">
    <div className={`flex justify-between items-center mb-4 pb-3 border-b border-slate-200 ${color} border-opacity-50`}>
      <h3 className="font-semibold text-slate-700">{title}</h3>
      <span className="bg-white px-2 py-1 rounded-md text-sm font-bold shadow-sm">{count}</span>
    </div>
    <div className="space-y-3">
      {items.map(item => (
        <div key={item.id} className="bg-white p-3 rounded-lg shadow-sm border border-slate-100 hover:shadow-md transition-all cursor-pointer group">
          <div className="flex justify-between items-start mb-2">
            <span className="font-medium text-slate-800">{item.name}</span>
            <div className={`w-2 h-2 rounded-full mt-1.5 ${
              item.healthScore > 80 ? 'bg-emerald-500' : 
              item.healthScore > 50 ? 'bg-amber-500' : 'bg-red-500'
            }`} />
          </div>
          <div className="flex justify-between items-end">
            <span className="text-xs text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">{item.industry}</span>
            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-brand-500" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const OnboardingTracker: React.FC = () => {
  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">商户入驻流程管道</h2>
          <p className="text-slate-500">追踪并优化“5 分钟集成”旅程。</p>
        </div>
        <div className="flex gap-2 text-sm">
          <span className="flex items-center text-emerald-600 font-medium px-3 py-1 bg-emerald-50 rounded-full border border-emerald-100">
            <Clock className="w-3 h-3 mr-1" /> 平均时间：3.2 天
          </span>
          <span className="flex items-center text-brand-600 font-medium px-3 py-1 bg-brand-50 rounded-full border border-brand-100">
            <Store className="w-3 h-3 mr-1" /> 入驻中：12
          </span>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex gap-4 h-full min-h-[500px]">
          <PipelineStage 
            title="1. 注册与 KYB" 
            count={4} 
            color="border-l-4 border-l-slate-400"
            items={[
              { id: 'm1', name: '全球购有限公司', industry: '跨境电商', stage: 'KYB', healthScore: 90 },
              { id: 'm2', name: '艺数藏品坊', industry: 'Web3', stage: 'KYB', healthScore: 40 },
              { id: 'm3', name: '智云科技', industry: '企业服务', stage: 'Reg', healthScore: 85 },
              { id: 'm4', name: '跨境通支付', industry: '金融科技', stage: 'Reg', healthScore: 70 },
            ]}
          />
          <PipelineStage 
            title="2. 集成 (沙箱)" 
            count={3} 
            color="border-l-4 border-l-brand-500"
            items={[
              { id: 'm5', name: '链通金融', industry: 'Web3', stage: 'Sandbox', healthScore: 60 },
              { id: 'm6', name: '亚洲零售集团', industry: '新零售', stage: 'Sandbox', healthScore: 95 },
              { id: 'm7', name: '视界流媒体', industry: '数字娱乐', stage: 'Sandbox', healthScore: 88 },
            ]}
          />
          <PipelineStage 
            title="3. 测试与验证" 
            count={2} 
            color="border-l-4 border-l-indigo-500"
            items={[
              { id: 'm8', name: '优选商城', industry: '跨境电商', stage: 'Testing', healthScore: 30 },
              { id: 'm9', name: '安盾保全', industry: '网络安全', stage: 'Testing', healthScore: 92 },
            ]}
          />
          <PipelineStage 
            title="4. 正式上线" 
            count={3} 
            color="border-l-4 border-l-emerald-500"
            items={[
              { id: 'm10', name: '阿尔法量化', industry: '金融科技', stage: 'Live', healthScore: 100 },
              { id: 'm11', name: '元物科技', industry: 'Web3', stage: 'Live', healthScore: 98 },
              { id: 'm12', name: '云端动力', industry: '企业服务', stage: 'Live', healthScore: 95 },
            ]}
          />
        </div>
      </div>

      {/* Pain Point Solution Highlight */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex items-start gap-4">
        <div className="p-2 bg-brand-100 rounded-lg text-brand-600 mt-1">
           <AlertCircle className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-semibold text-slate-800">职位要求：流程优化</h4>
          <p className="text-sm text-slate-600 mt-1">
            “梳理并优化商户注册路径”。此仪表板可识别瓶颈（例如：商户“艺数藏品坊”卡在 KYB 阶段且健康分低）。
            CCO 助理将在此主动介入，为 CS 经理提供缺失的文档指导，推动商户顺利入驻。
          </p>
        </div>
      </div>
    </div>
  );
};