export type ViewModelDefaultFunctionArgs = {
  onSuccess?: (arg?: Record<string, unknown>) => Promise<void>;
  onError?: (message?: string) => Promise<void>;
};

export type NotifierTypes = 'positive' | 'negative' | 'warning' | 'info';
