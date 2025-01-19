declare global {

  interface PaystackCallbackResponse {
    reference: string; // e.g., "ref-1734515090043"
    trans: string; // e.g., "4493150681"
    status: string; // e.g., "success"
    message: string; // e.g., "Approved"
    transaction: string; // e.g., "4493150681"
    trxref: string; // e.g., "ref-1734515090043"
    redirecturl: string; // e.g., "?trxref=ref-1734515090043&reference=ref-1734515090043"
}
  type PaystackCallback = (response: PaystackCallbackResponse) => void | Promise<void>;  
  interface PaystackOptions {
    key: string;
    email: string;
    amount: number;
    currency?: string;
    ref?: string;
    callback: PaystackCallback;
    onClose?: () => void;
  }

  interface PaystackHandler {
    openIframe(): void;
  }

  interface Window {
    PaystackPop: {
      setup(options: PaystackOptions): PaystackHandler;
    };
  }
}

export type { PaystackOptions, PaystackHandler, PaystackCallbackResponse, PaystackCallback };
