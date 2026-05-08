// src/types.ts

export interface OmnifyConfig {
  name: string;
  version: string;
  url: string;
  package_id: string;

  public: {
    icon: string;
    splash: string;
  };

  permissions: string[];
  packages: Record<string, string>;

  cache: {
    eager: string[];
    max_size_mb: number;
  };

  offline: {
    enabled: boolean;
    show_indicator: boolean;
  };

  omnify: {
    tier: 'free' | 'pro' | 'business' | 'enterprise';
    watermark: boolean;
    license_key?: string;
  };
}
