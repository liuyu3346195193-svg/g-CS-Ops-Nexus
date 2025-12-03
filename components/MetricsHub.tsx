import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { analyzeSentiment } from '../services/gemini';
import { TrendingUp, MessageCircle, Sparkles, Loader2, FileText } from 'lucide-react';

// Markdown Renderer Component (Customized for Dark Theme in AI Section)
const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  const parseBold = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-semibold text-slate-100">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  const lines = content.split('\n');

  return (
    <div className="space-y-2 text-slate-300 text-sm leading-relaxed font-sans">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={idx} className="h-2" />;
        
        // Headings
        if (trimmed.startsWith('### ')) {
          return <h3 key={idx} className="text-base font-bold text-white mt-4 mb-2 flex items-center"><span className="w-1 h-4 bg-brand-500 mr-2 rounded-full"></span>{parseBold(trimmed.slice(4))}</h3>;
        }
        if (trimmed.startsWith('## ')) {
          return <h2 key={idx} className="text-lg font-bold text-white mt-5 mb-3 border-b border-slate-700 pb-1">{parseBold(trimmed.slice(3))}</h2>;
        }
        
        // Bullet points
        if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
          return (
            <div key={idx} className="flex items-start pl-1">
               <div className="min-w-[4px] h-1 w-1 bg-brand-400 rounded-full mt-2 mr-3 flex-shrink-0" />
               <span>{parseBold(trimmed.slice(2))}</span>
            </div>
          );
        }
        
        // Numbered list
         if (/^\d+\.\s/.test(trimmed)) {
             const match = trimmed.match(/^(\d+\.)\s(.*)/);
             if (match) {
                 return (
                     <div key={idx} className="flex items-start pl-1">
                         <span className="font-semibold text-brand-400 mr-2">{match[1]}</span>
                         <span>{parseBold(match[2])}</span>
                     </div>
                 )
             }
         }

        // Standard paragraph
        return <p key={idx}>{parseBold(trimmed)}</p>;
      })}
    </div>
  );
};

const onboardingData = [
  { name: '五月', time: 5.2 },
  { name: '六月', time: 4.8 },
  { name: '七月', time: 4.1 },
  { name: '八月', time: 3.8 },
  { name: '九月', time: 3.5 },
  { name: '十月', time: 3.2 }, 
];

const csatData = [
  { name: '第一周', score: 4.5 },
  { name: '第二周', score: 4.6 },
  { name: '第三周', score: 4.8 },
  { name: '第四周', score: 4.9 },
];

export const MetricsHub: React.FC = () => {
  const [analysis, setAnalysis] = useState<string>("");
  const [loading, setLoading] = useState(false);
  
  const feedbackSamples = [
    "费率很有竞争力，但是上传企业文档的入口太难找了，卡了很久。",
    "API 文档写得很棒，开发者友好，集成测试只用了半天。",
    "希望能增加更多本地化的支付方式，目前的选择对东南亚市场不够友好。",
    "客服响应速度很快，但是有些技术问题客服无法直接解决，需要转接技术。"
  ];

  const runAnalysis = async () => {
    setLoading(true);
    // Combine samples for analysis to simulate a real report generation
    const combinedFeedback = feedbackSamples.join(" ");
    const report = await analyzeSentiment(combinedFeedback);
    setAnalysis(report);
    setLoading(false);
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
       <div>
          <h2 className="text-2xl font-bold text-slate-900">数据分析与洞察</h2>
          <p className="text-slate-500">监控核心 KPI 并利用 AI 提炼非结构化反馈中的业务机会。</p>
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Onboarding Efficiency */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-6 flex items-center justify-between">
            <div className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-brand-600" />
                <span>入驻时长趋势 (天)</span>
            </div>
            <span className="text-xs font-normal bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-1 rounded">目标：&lt; 3.0 天</span>
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={onboardingData}>
                <defs>
                  <linearGradient id="colorTime" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                    itemStyle={{color: '#0284c7'}}
                />
                <Area type="monotone" dataKey="time" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorTime)" strokeWidth={2} activeDot={{r: 6}} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: CSAT Score */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
           <h3 className="font-semibold text-slate-800 mb-6 flex items-center">
             <MessageCircle className="w-5 h-5 mr-2 text-indigo-500" />
             客户满意度 (CSAT)
           </h3>
           <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={csatData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis domain={[0, 5]} axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                    cursor={{fill: '#f1f5f9'}}
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="score" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* AI Analysis Section - Improved UI */}
      <div className="flex-1 bg-slate-900 text-slate-200 rounded-xl p-0 shadow-xl overflow-hidden flex flex-col border border-slate-800">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
          <div>
            <h3 className="font-bold text-white text-lg flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-brand-400" />
              AI 智能反馈洞察
            </h3>
            <p className="text-slate-400 text-sm mt-1">自动分析来自各个渠道的客户原声，提炼关键痛点与改进机会。</p>
          </div>
          <button 
            onClick={runAnalysis}
            disabled={loading}
            className="bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 rounded-lg transition-all font-medium flex items-center disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-brand-500/20"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <FileText className="w-4 h-4 mr-2" />}
            {loading ? '分析中...' : '生成月度报告'}
          </button>
        </div>
        
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-0">
          {/* Left Panel: Data Source */}
          <div className="md:col-span-4 bg-slate-800/50 p-6 border-r border-slate-800">
            <h4 className="text-xs text-brand-400 uppercase font-bold mb-4 tracking-wider flex items-center">
              <span className="w-2 h-2 rounded-full bg-brand-400 mr-2 animate-pulse"></span>
              本月反馈采样 (Data Source)
            </h4>
            <div className="space-y-3">
              {feedbackSamples.map((sample, idx) => (
                <div key={idx} className="bg-slate-800 p-3 rounded border border-slate-700/50 text-xs text-slate-300 italic relative pl-6">
                   <span className="absolute left-2 top-3 text-slate-600">"</span>
                   {sample}
                </div>
              ))}
              <div className="text-center mt-4">
                 <span className="text-xs text-slate-500">...以及其他 128 条记录</span>
              </div>
            </div>
          </div>
          
          {/* Right Panel: AI Output */}
          <div className="md:col-span-8 p-6 bg-slate-900 min-h-[300px] max-h-[500px] overflow-y-auto custom-scrollbar">
             <h4 className="text-xs text-emerald-400 uppercase font-bold mb-4 tracking-wider">
              AI 分析报告 (Analysis Report)
            </h4>
            {analysis ? (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                 <MarkdownRenderer content={analysis} />
                 <div className="mt-8 pt-4 border-t border-slate-800 text-xs text-slate-500 flex justify-between">
                    <span>生成模型: Gemini 2.5 Flash</span>
                    <span>置信度: 98%</span>
                 </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-4">
                <div className="p-4 bg-slate-800/50 rounded-full">
                  <Sparkles className="w-8 h-8 opacity-20" />
                </div>
                <p className="text-sm">点击右上角按钮，开始深度挖掘业务数据价值。</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};