export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  TEAM_OPS = 'TEAM_OPS',
  ONBOARDING = 'ONBOARDING',
  KNOWLEDGE_BASE = 'KNOWLEDGE_BASE',
  ANALYTICS = 'ANALYTICS',
  USER_MANUAL = 'USER_MANUAL'
}

export interface MetricData {
  name: string;
  value: number;
  target?: number;
}

export interface OnboardingStep {
  id: string;
  title: string;
  status: 'pending' | 'in-progress' | 'completed' | 'blocked';
  assignee: string;
}

export interface MerchantProfile {
  id: string;
  name: string;
  industry: string;
  stage: string;
  healthScore: number;
}

export interface SOPDocument {
  id: string;
  title: string;
  category: 'Onboarding' | 'Support' | 'Technical' | 'Internal';
  lastUpdated: string;
}