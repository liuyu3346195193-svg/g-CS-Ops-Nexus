import React, { useState } from 'react';
import { generateSmartResponse } from '../services/gemini';
import { Search, MessageSquare, BookOpen, Send, Copy, Check, Save, Plus } from 'lucide-react';

// Markdown Renderer Component to format AI output nicely
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

// Component to highlight search terms within text
const HighlightedText: React.FC<{ text: string; highlight: string }> = ({ text, highlight }) => {
  if (!highlight.trim()) {
    return <span className="text-slate-700 font-medium group-hover:text-brand-700 transition-colors">{text}</span>;
  }
  const regex = new RegExp(`(${highlight})`, 'gi');
  const parts = text.split(regex);
  return (
    <span className="text-slate-700 font-medium group-hover:text-brand-700 transition-colors">
      {parts.map((part, index) =>
        regex.test(part) ? (
          <span key={index} className="bg-yellow-200 text-slate-900 rounded-[2px] px-0.5 shadow-sm">
            {part}
          </span>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </span>
  );
};

interface FAQItem {
  id: string;
  q: string;
  a?: string;
  cat: string;
  isNew?: boolean;
}

export const SmartKnowledgeBase: React.FC = () => {
  const [query, setQuery] = useState('');
  const [context, setContext] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // FAQ Management State
  const [searchTerm, setSearchTerm] = useState('');
  const [savedToFAQ, setSavedToFAQ] = useState(false);
  const [faqs, setFaqs] = useState<FAQItem[]>([
    { id: '1', q: "如何生成 API 密钥？", cat: "技术" },
    { id: '2', q: "USDT 提现的手续费是多少？", cat: "计费" },
    { id: '3', q: "沙箱环境必须进行 KYB 吗？", cat: "入驻" },
    { id: '4', q: "支持的公链列表？", cat: "产品" },
    { id: '5', q: "争议退款政策", cat: "政策" },
  ]);

  const handleDraft = async () => {
    if (!query) return;
    setLoading(true);
    setCopied(false);
    setSavedToFAQ(false);
    const result = await generateSmartResponse(query, context);
    setResponse(result);
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddToFAQ = () => {
    if (!query || !response) return;
    
    const newFAQ: FAQItem = {
      id: Date.now().toString(),
      q: query,
      a: response,
      cat: "AI 归档",
      isNew: true
    };
    
    setFaqs(prev => [newFAQ, ...prev]);
    setSavedToFAQ(true);
    setTimeout(() => setSavedToFAQ(false), 3000);
  };

  const filteredFaqs = faqs.filter(faq => 
    faq.q.toLowerCase().includes(searchTerm.toLowerCase()) || 
    faq.cat.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
      {/* Search & Tool Section */}
      <div className="lg:col-span-2 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">智能知识库与支持</h2>
          <p className="text-slate-500">AI 驱动的回复起草，保持高质量、一致的服务体验。</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-800 mb-4 flex items-center">
            <MessageSquare className="w-5 h-5 mr-2 text-brand-600" />
            工单回复起草助手
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">商户咨询 / 问题</label>
              <textarea 
                className="w-full rounded-lg border-slate-300 border p-3 focus:ring-2 focus:ring-brand-500 outline-none h-24 resize-none transition-all focus:border-brand-500"
                placeholder="粘贴商户的邮件或问题..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">上下文背景 (可选)</label>
              <input 
                type="text"
                className="w-full rounded-lg border-slate-300 border p-3 focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                placeholder="例如：API v2 更新，维护窗口，入驻阶段"
                value={context}
                onChange={(e) => setContext(e.target.value)}
              />
            </div>

            <button 
              onClick={handleDraft}
              disabled={loading || !query}
              className="w-full bg-brand-600 text-white py-2.5 rounded-lg font-medium hover:bg-brand-700 transition-colors flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed shadow-sm hover:shadow"
            >
              {loading ? (
                <span className="flex items-center">思考中...</span>
              ) : (
                <span className="flex items-center"><Send className="w-4 h-4 mr-2" /> 生成回复</span>
              )}
            </button>
          </div>

          {response && (
            <div className="mt-6 border-t border-slate-100 pt-6 animate-in fade-in slide-in-from-top-2">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-slate-600">起草的回复：</span>
                <div className="flex gap-2">
                   <button 
                    onClick={handleAddToFAQ}
                    disabled={savedToFAQ}
                    className={`flex items-center text-xs px-2.5 py-1.5 border rounded-md shadow-sm transition-all ${
                      savedToFAQ 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                      : 'bg-white text-slate-600 border-slate-200 hover:text-brand-600 hover:border-brand-200'
                    }`}
                  >
                    {savedToFAQ ? <Check className="w-3.5 h-3.5 mr-1.5" /> : <Plus className="w-3.5 h-3.5 mr-1.5" />}
                    {savedToFAQ ? '已保存' : '存入 FAQ'}
                  </button>
                  <button 
                    onClick={handleCopy} 
                    className="flex items-center text-xs px-2.5 py-1.5 bg-white border border-slate-200 rounded-md text-slate-600 hover:text-brand-600 hover:border-brand-200 transition-all shadow-sm"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 mr-1.5" /> : <Copy className="w-3.5 h-3.5 mr-1.5" />}
                    {copied ? '已复制' : '复制文本'}
                  </button>
                </div>
              </div>
              <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 max-h-[400px] overflow-y-auto">
                <MarkdownRenderer content={response} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FAQ Library */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col h-full max-h-[700px]">
        <div className="p-6 border-b border-slate-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-slate-800 flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-brand-600" />
              热门常见问题
            </h3>
            <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{filteredFaqs.length}</span>
          </div>
          <div className="relative group">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
            <input 
              type="text" 
              placeholder="搜索知识库 (例如: API, 提现)..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => (
              <div 
                key={faq.id} 
                className={`p-3 hover:bg-slate-50 rounded-lg cursor-pointer transition-all duration-300 group border border-transparent hover:border-slate-100 ${faq.isNew ? 'animate-in slide-in-from-right-2 bg-brand-50/30' : ''}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <p className="text-sm pr-2 leading-relaxed">
                    <HighlightedText text={faq.q} highlight={searchTerm} />
                  </p>
                  {faq.isNew && (
                    <span className="shrink-0 text-[10px] font-bold text-brand-600 bg-brand-100 px-1.5 py-0.5 rounded uppercase tracking-wider">
                      New
                    </span>
                  )}
                </div>
                <div className="flex items-center mt-1">
                  <span className={`text-[10px] px-1.5 py-0.5 rounded border ${
                    faq.cat === 'AI 归档' 
                      ? 'bg-indigo-50 text-indigo-600 border-indigo-100'
                      : 'bg-slate-100 text-slate-500 border-slate-200'
                  }`}>
                    <HighlightedText text={faq.cat} highlight={searchTerm} />
                  </span>
                </div>
              </div>
            ))
          ) : (
             <div className="flex flex-col items-center justify-center h-40 text-slate-400">
               <Search className="w-8 h-8 mb-2 opacity-20" />
               <p className="text-sm">未找到相关问题</p>
             </div>
          )}
        </div>
        
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-center">
          <p className="text-xs text-slate-500">
            由 CCO 助理维护。最后更新：刚刚。
          </p>
        </div>
      </div>
    </div>
  );
};