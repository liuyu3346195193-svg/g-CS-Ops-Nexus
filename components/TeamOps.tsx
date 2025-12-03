import React, { useState } from 'react';
import { generateSOPDraft } from '../services/gemini';
import { FileText, Plus, Loader2, CheckCircle2, Copy, Check, Info, Save, ArrowRight } from 'lucide-react';

// Simple Markdown Renderer Component to format AI output nicely without external libraries
const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  const parseBold = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-semibold text-slate-900">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  const lines = content.split('\n');

  return (
    <div className="space-y-3 text-slate-700 text-sm leading-relaxed font-sans">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={idx} className="h-2" />;
        
        // Headings
        if (trimmed.startsWith('### ')) {
          return <h3 key={idx} className="text-base font-bold text-slate-900 mt-4 mb-2">{parseBold(trimmed.slice(4))}</h3>;
        }
        if (trimmed.startsWith('## ')) {
          return <h2 key={idx} className="text-lg font-bold text-slate-900 mt-6 mb-3 pb-2 border-b border-slate-200">{parseBold(trimmed.slice(3))}</h2>;
        }
        if (trimmed.startsWith('# ')) {
           return <h1 key={idx} className="text-xl font-bold text-slate-900 mt-2 mb-4">{parseBold(trimmed.slice(2))}</h1>;
        }
        
        // Bullet points
        if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
          return (
            <div key={idx} className="flex items-start pl-2">
               <div className="min-w-[6px] h-1.5 w-1.5 bg-brand-500 rounded-full mt-2 mr-3 flex-shrink-0" />
               <span>{parseBold(trimmed.slice(2))}</span>
            </div>
          );
        }
        
        // Numbered list (e.g., "1. ")
         if (/^\d+\.\s/.test(trimmed)) {
             const match = trimmed.match(/^(\d+\.)\s(.*)/);
             if (match) {
                 return (
                     <div key={idx} className="flex items-start pl-1">
                         <span className="font-semibold text-brand-700 mr-2 min-w-[24px]">{match[1]}</span>
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

interface Project {
  title: string;
  status: string;
  completion: number;
  date: string;
  isNew?: boolean;
}

export const TeamOps: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [generatedSOP, setGeneratedSOP] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  
  const [projects, setProjects] = useState<Project[]>([
    { title: "商户入驻流程 v2.0", status: "审核中", completion: 80, date: "截止：10月25日" },
    { title: "CS Intercom 回复模板", status: "已启用", completion: 100, date: "已完成" },
    { title: "跨部门 API 事故处理协议", status: "起草中", completion: 30, date: "截止：11月01日" },
    { title: "季度业务回顾 (QBR) PPT", status: "计划中", completion: 0, date: "截止：11月15日" },
  ]);

  const handleGenerate = async () => {
    if (!topic) return;
    setLoading(true);
    setSaved(false);
    const result = await generateSOPDraft(topic);
    setGeneratedSOP(result);
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedSOP);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveToProject = () => {
    if (!topic) return;
    
    const newProject: Project = {
      title: topic,
      status: "起草中",
      completion: 20, // AI draft done = ~20% progress
      date: `创建于：${new Date().toLocaleDateString('zh-CN', { month: 'long', day: 'numeric' })}`,
      isNew: true
    };

    setProjects(prev => [newProject, ...prev]);
    setSaved(true);
    
    // Reset saved state but keep the SOP visible so they can read/copy it
    setTimeout(() => setSaved(false), 3000);
  };

  // Helper to interpret progress as a business phase
  const getPhaseDescription = (percent: number, status: string) => {
    if (status === '计划中') return '待启动';
    if (percent === 100) return '全员推广与执行';
    if (percent >= 80) return '管理层终审 & 签署';
    if (percent >= 60) return '跨部门反馈收集';
    if (percent >= 30) return '初稿撰写与修订';
    if (percent >= 10) return 'AI 初稿生成'; // Specific for new drafts
    return '需求调研';
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">团队运营与标准化</h2>
          <p className="text-slate-500">搭建客户成功团队的服务体系。</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* SOP Generator */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-[600px]">
          <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-lg flex items-center text-slate-800">
                <FileText className="w-5 h-5 mr-2 text-brand-600" />
                AI SOP 生成器
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                快速创建标准化流程文档，确保团队执行一致性。
              </p>
            </div>
            {generatedSOP && (
              <div className="flex gap-2">
                 <button 
                  onClick={handleSaveToProject}
                  disabled={saved}
                  className={`flex items-center text-sm px-3 py-1.5 border rounded-lg shadow-sm transition-all ${
                    saved 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                    : 'bg-brand-600 text-white border-transparent hover:bg-brand-700'
                  }`}
                >
                  {saved ? <Check className="w-4 h-4 mr-1.5" /> : <Save className="w-4 h-4 mr-1.5" />}
                  {saved ? '已加入项目' : '保存为项目'}
                </button>
                <button 
                  onClick={handleCopy}
                  className="text-slate-500 hover:text-brand-600 flex items-center text-sm px-3 py-1.5 bg-white border border-slate-200 rounded-lg shadow-sm transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 mr-1.5" /> : <Copy className="w-4 h-4 mr-1.5" />}
                  {copied ? '已复制' : '复制'}
                </button>
              </div>
            )}
          </div>
          
          <div className="p-6 flex-1 flex flex-col">
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-1">流程主题</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="例如：商户 KYB 升级流程"
                  className="flex-1 rounded-lg border-slate-300 border px-4 py-2 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                />
                <button 
                  onClick={handleGenerate}
                  disabled={loading || !topic}
                  className="bg-brand-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
                  生成
                </button>
              </div>
            </div>

            <div className="flex-1 bg-slate-50 rounded-lg border border-slate-200 p-6 min-h-[400px]">
              {generatedSOP ? (
                <div className="max-w-none overflow-y-auto">
                  <MarkdownRenderer content={generatedSOP} />
                </div>
              ) : (
                <div className="h-full py-20 flex flex-col items-center justify-center text-slate-400">
                  <FileText className="w-16 h-16 mb-4 opacity-10" />
                  <p className="text-center max-w-xs">
                    输入主题（如“新员工入职指引”），AI 将为您自动起草包含目标、步骤和 KPI 的完整 SOP 文档。
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Existing Workflows / OKR Tracking */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sticky top-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-lg text-slate-800">进行中的标准化项目</h3>
            <div className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-full font-medium">{projects.length}</div>
          </div>
          
          <div className="space-y-8">
            {projects.map((project, idx) => (
              <div key={idx} className={`group ${project.isNew ? 'animate-in slide-in-from-left-4 duration-700' : ''}`}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium text-slate-800 group-hover:text-brand-600 transition-colors cursor-pointer flex items-center">
                      {project.title}
                      {project.isNew && <span className="ml-2 text-[10px] bg-brand-100 text-brand-700 px-1.5 py-0.5 rounded-full uppercase font-bold tracking-wider">New</span>}
                    </h4>
                    <span className="text-xs text-slate-400">{project.date}</span>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    project.status === '已完成' || project.status === '已启用' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                    project.status === '审核中' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                    project.status === '起草中' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                    'bg-slate-50 text-slate-600 border border-slate-100'
                  }`}>
                    {project.status}
                  </span>
                </div>
                
                {/* Enhanced Progress Bar */}
                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-500 font-medium flex items-center">
                      <Info className="w-3 h-3 mr-1 text-slate-400" />
                      {getPhaseDescription(project.completion, project.status)}
                    </span>
                    <span className="font-bold text-slate-700">{project.completion}%</span>
                  </div>
                  
                  <div className="relative w-full bg-slate-100 h-3 rounded-full overflow-hidden shadow-inner">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 relative ${
                        project.completion === 100 
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-400' 
                          : 'bg-gradient-to-r from-blue-500 to-brand-400'
                      }`}
                      style={{ width: `${project.completion}%` }}
                    >
                      {/* Animated shine effect for active projects */}
                      {project.completion < 100 && project.completion > 0 && (
                        <div className="absolute inset-0 bg-white/30 w-full animate-[shimmer_2s_infinite] -translate-x-full transform skew-x-12 origin-left" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-blue-50 p-5 rounded-xl border border-blue-100">
            <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
              <CheckCircle2 className="w-5 h-5 mr-2 text-blue-600" />
              岗位价值体现
            </h4>
            <p className="text-sm text-blue-800 leading-relaxed">
              通过标准化这些工作流程，CCO 助理将新员工的入驻适应时间缩短了 <span className="font-bold">40%</span>，不仅提升了团队效率，更确保了 StablePay 向客户承诺的“5 分钟集成”体验能在后端得到强有力的运营支撑。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};