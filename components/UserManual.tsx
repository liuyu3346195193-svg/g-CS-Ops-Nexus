import React from 'react';
import { Book, LayoutDashboard, Users, Zap, MessageSquare, BarChart3, ShieldCheck, Info, Target, GitMerge } from 'lucide-react';

const ManualSection: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
  <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm mb-6">
    <h3 className="text-lg font-bold text-slate-900 flex items-center mb-4 border-b border-slate-100 pb-3">
      <span className="bg-brand-50 p-2 rounded-lg text-brand-600 mr-3">{icon}</span>
      {title}
    </h3>
    <div className="text-slate-600 text-sm leading-relaxed space-y-4">
      {children}
    </div>
  </div>
);

export const UserManual: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-3">客户运营中枢 CS Ops Nexus · 产品白皮书</h1>
        <p className="text-slate-500 max-w-2xl mx-auto">
          本文档详细阐述了系统的设计背景、岗位关联性及各功能模块的操作指南，旨在帮助您快速理解并驾驭这一数字化管理工具。
        </p>
      </div>

      {/* Part 1: Context & Role */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 text-white shadow-lg mb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <Info className="w-5 h-5 mr-2 text-brand-400" />
          项目背景与岗位定位
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-semibold text-brand-200 mb-2">关于 StablePay</h4>
            <p className="text-sm text-slate-300 leading-relaxed opacity-90">
              一家领先的稳定币支付服务商，连接 Web3 与传统商业。核心理念是<span className="text-white font-medium">“API 优先，5分钟集成”</span>。我们致力于为跨境电商、SaaS 等企业提供成本最低、速度最快的支付网关。
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-brand-200 mb-2">CCO 助理岗位职责</h4>
            <div className="text-sm text-slate-300 leading-relaxed opacity-90">
              该系统专为您设计，以协助首席客户官管理：
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li><span className="text-white">流程标准化：</span>搭建 SOP 与客服体系。</li>
                <li><span className="text-white">商户入驻：</span>优化 Onboarding 路径，解决卡点。</li>
                <li><span className="text-white">跨部门协作：</span>连接产品、技术与销售。</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Part 2: System Architecture */}
      <h2 className="text-xl font-bold text-slate-900 mb-6 pl-2 border-l-4 border-brand-500">
        系统功能详解
      </h2>

      {/* 1. Dashboard */}
      <ManualSection title="1. 全局概览 (Dashboard) - 战略控制塔" icon={<LayoutDashboard className="w-5 h-5" />}>
        <p><strong className="text-slate-800">设计意图：</strong> 让您在每天开始工作时，能够立即掌握业务的健康状况和战略优先级。</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
           <div className="bg-slate-50 p-3 rounded border border-slate-100">
             <span className="font-semibold text-slate-700 block mb-1">关键指标 (KPI)</span>
             监控活跃商户数、CSAT（客户满意度）及核心指标“平均入驻时间”（目标 &lt; 3.5天）。
           </div>
           <div className="bg-slate-50 p-3 rounded border border-slate-100">
             <span className="font-semibold text-slate-700 block mb-1">OKR 对齐</span>
             可视化追踪年度战略目标（如“降低集成阻力”）的达成进度。
           </div>
        </div>
      </ManualSection>

      {/* 2. Team Ops */}
      <ManualSection title="2. 团队运营 (Team Ops) - 流程标准化引擎" icon={<Users className="w-5 h-5" />}>
        <p><strong className="text-slate-800">设计意图：</strong> 响应 JD 中“流程管理经验”和“文档输出功底”的要求，解决团队知识传承问题。</p>
        <div className="ml-1">
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong className="text-brand-600">AI SOP 生成器：</strong> 
              这是本模块的核心。您只需输入流程名称（如“商户 KYB 异常处理”），内置的 Gemini AI 会自动生成包含目标、步骤、KPI 的结构化 Markdown 文档。这极大地提高了文档输出效率。
            </li>
            <li>
              <strong className="text-brand-600">项目追踪：</strong> 
              管理跨部门协作任务（如 API 事故复盘、QBR 汇报），确保执行力。
            </li>
          </ul>
        </div>
      </ManualSection>

      {/* 3. Onboarding */}
      <ManualSection title="3. 入驻管道 (Onboarding) - 客户旅程视图" icon={<Zap className="w-5 h-5" />}>
        <p><strong className="text-slate-800">设计意图：</strong> 落实“梳理并优化商户注册路径”的职责。可视化每一位商户的状态。</p>
        <div className="ml-1">
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong className="text-brand-600">看板视图：</strong> 
              将入驻流程分为 注册/KYB -&gt; 集成(沙箱) -&gt; 测试 -&gt; 上线。卡片颜色代表健康度（红色代表急需干预）。
            </li>
            <li>
              <strong className="text-brand-600">主动干预：</strong> 
              系统会自动识别瓶颈（例如：某商户在 KYB 停留过久），并在底部提示您协调资源解决，体现“学习自驱力”和“解决问题能力”。
            </li>
          </ul>
        </div>
      </ManualSection>

      {/* 4. Knowledge Base */}
      <ManualSection title="4. 智能支持 (Knowledge Base) - 效率倍增器" icon={<MessageSquare className="w-5 h-5" />}>
        <p><strong className="text-slate-800">设计意图：</strong> 协助搭建客服体系，利用 AI 确保对外服务的一致性和专业性。</p>
        <div className="p-3 bg-blue-50 rounded-lg text-blue-800 text-sm border border-blue-100">
          <strong className="block mb-1">场景演示：</strong>
          当商户询问复杂的技术问题时，您可以将问题粘贴到“工单回复助手”中，AI 将结合 StablePay 的语料库生成回复，您可以直接复制或微调后发送。
        </div>
      </ManualSection>

      {/* 5. Analytics */}
      <ManualSection title="5. 数据洞察 (Analytics) - 决策大脑" icon={<BarChart3 className="w-5 h-5" />}>
        <p><strong className="text-slate-800">设计意图：</strong> 满足“数据分析与流程优化支持”的要求，用数据说话。</p>
        <div className="ml-1">
          <ul className="list-disc list-inside space-y-2">
            <li>展示入驻时长趋势图和 CSAT 满意度分布。</li>
            <li>
              <strong className="text-brand-600">AI 洞察报告：</strong> 
              点击“生成月度报告”，AI 会分析非结构化的客户反馈文本，提炼出改进建议（例如：“商户抱怨文档难懂 -&gt; 建议优化 API 文档”）。
            </li>
          </ul>
        </div>
      </ManualSection>

      {/* Part 3: Workflow Integration */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 flex items-center mb-6">
          <GitMerge className="w-5 h-5 mr-3 text-brand-600" />
          各模块如何协同工作？
        </h3>
        <div className="relative border-l-2 border-brand-200 ml-4 space-y-8 pb-2">
          <div className="pl-6 relative">
            <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-brand-500 border-2 border-white"></div>
            <h4 className="font-bold text-slate-800 text-sm">第 1 步：发现问题</h4>
            <p className="text-sm text-slate-600 mt-1">在 <span className="font-semibold text-brand-600">Onboarding</span> 页面发现“艺数藏品坊”卡在 KYB 阶段。</p>
          </div>
          <div className="pl-6 relative">
            <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-brand-500 border-2 border-white"></div>
            <h4 className="font-bold text-slate-800 text-sm">第 2 步：解决个案</h4>
            <p className="text-sm text-slate-600 mt-1">使用 <span className="font-semibold text-brand-600">Knowledge Base</span> 的 AI 助手起草一封专业的邮件，指导商户提交缺失材料。</p>
          </div>
          <div className="pl-6 relative">
            <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-brand-500 border-2 border-white"></div>
            <h4 className="font-bold text-slate-800 text-sm">第 3 步：机制优化 (标准化)</h4>
            <p className="text-sm text-slate-600 mt-1">意识到这是普遍问题，前往 <span className="font-semibold text-brand-600">Team Ops</span>，利用 AI 生成一份《Web3 商户 KYB 快速通关指南》SOP。</p>
          </div>
          <div className="pl-6 relative">
            <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-brand-500 border-2 border-white"></div>
            <h4 className="font-bold text-slate-800 text-sm">第 4 步：验证成果</h4>
            <p className="text-sm text-slate-600 mt-1">下个月在 <span className="font-semibold text-brand-600">Analytics</span> 页面查看“平均入驻时长”是否下降，闭环完成。</p>
          </div>
        </div>
      </div>

    </div>
  );
};