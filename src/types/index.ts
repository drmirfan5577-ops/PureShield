export type Language = 'en' | 'ur' | 'ar';
export type ThemeMode = 'light'; // Only light mode per requirements

export type Tab = 'dashboard' | 'activity' | 'filters' | 'settings' | 'integration';
export type AdminTab = 'overview' | 'appearance' | 'launchers' | 'filters' | 'integrations' | 'language' | 'security';

export type LauncherId = 'crystal' | 'neon' | 'emerald' | 'crimson' | 'aurora';

export interface FilterItem {
  key: string;
  label: string;
  description: string;
  enabled: boolean;
  category: 'ads' | 'privacy' | 'security' | 'social';
  color: string;
}

export interface ActivityItem {
  id: string;
  type: 'Ad' | 'Tracker' | 'Malware' | 'Phishing' | 'Cryptominer';
  site: string;
  count: number;
  timestamp: Date;
  severity: 'low' | 'medium' | 'high';
}

export interface IntegrationPlatform {
  id: string;
  name: string;
  category: string;
  icon: string;
  color: string;
  url: string;
  description: string;
  connected: boolean;
  gradient: string;
}

export interface LauncherConfig {
  id: LauncherId;
  name: string;
  description: string;
  primaryGradient: string[];
  accentColor: string;
  cardStyle: string;
}

export interface AppConfig {
  language: Language;
  launcherId: LauncherId;
  protectionEnabled: boolean;
  statsVisible: boolean;
  activityFeedEnabled: boolean;
  autoSync: boolean;
  customTitle: string;
  customTagline: string;
  filters: FilterItem[];
}
