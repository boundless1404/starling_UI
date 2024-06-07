export type ViewModelDefaultFunctionArgs = {
  onSuccess?: () => Promise<void>;
  onError?: (message?: string) => Promise<void>;
};
