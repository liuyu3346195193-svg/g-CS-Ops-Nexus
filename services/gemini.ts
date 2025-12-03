import { GoogleGenAI } from "@google/genai";

// Helper to safely get the AI client
// This prevents the app from crashing on load if the API key is missing
const getAiClient = () => {
  // @ts-ignore - process.env is replaced at build time
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    console.warn("Gemini API Key is missing. Please check your environment variables.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateSOPDraft = async (topic: string): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return "⚠️ 系统未配置 API Key，无法生成内容。请在 Vercel 环境变量中设置 API_KEY。";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are an expert Chief Customer Officer Assistant at StablePay, a Web3 stablecoin payment gateway. 
      Write a structured Standard Operating Procedure (SOP) for: "${topic}".
      
      Output Language: Simplified Chinese (简体中文).
      
      Format it with Markdown.
      Include:
      1. Objective (目标)
      2. Key Stakeholders (关键利益相关者)
      3. Prerequisites (前置条件)
      4. Step-by-Step Process (bullet points) (详细步骤)
      5. Success Metrics (KPIs) (成功指标)
      
      Keep it professional, concise, and focused on efficiency and compliance.`,
    });
    return response.text || "生成 SOP 失败。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "内容生成出错。请检查 API 配额或网络连接。";
  }
};

export const generateSmartResponse = async (query: string, context: string): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return "⚠️ 系统未配置 API Key。";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Context: You are a Customer Success AI Agent for StablePay. 
      User Query: "${query}"
      Background Info: ${context}
      
      Draft a polite, professional, and technically accurate response to the merchant in Simplified Chinese (简体中文). 
      Highlight "API-First" (API优先) and "5-minute integration" (5分钟集成) where relevant.`,
    });
    return response.text || "生成回复失败。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "生成回复时出错。";
  }
};

export const analyzeSentiment = async (feedback: string): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return "⚠️ 系统未配置 API Key。";

   try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Analyze the sentiment of this customer feedback and suggest 3 actionable improvements. 
      Feedback: "${feedback}"
      
      Output Language: Simplified Chinese (简体中文).
      Output format: Markdown.`,
    });
    return response.text || "分析失败。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "情感分析时出错。";
  }
}