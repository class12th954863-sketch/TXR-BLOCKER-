
export enum Language {
  HINDI = 'hindi',
  ENGLISH = 'english'
}

export interface UsageData {
  name: string;
  minutes: number;
}

export interface AppInfo {
  id: string;
  name: string;
  icon: string;
  blocked: boolean;
  usageMinutes: number;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
