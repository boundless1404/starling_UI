import { Loading, Notify } from 'quasar';
import { Ref } from 'vue';

export function useNotify({
  type = 'positive',
  message,
}: {
  type?: 'positive' | 'negative' | 'warning' | 'info';
  message?: string;
} = {}) {
  Notify.create({
    message:
      message || type === 'negative'
        ? 'Process failed'
        : 'Process was successful',
    type,
    timeout: type === 'positive' ? 300 : 5000,
  });
}

export function useRequestionProcessingChecker(checkerRef: Ref<boolean>) {
  if (checkerRef.value) {
    // invoke form validation
    useNotify({
      type: 'warning',
      message: 'Please, wait for the current process to complete.',
    });
    return;
  }
}

export function useRequestionProcessingNotification(
  processingCheckerRef: Ref,
  processingNotifieer: Loading,
  message?: string
) {
  processingCheckerRef.value = true;
  processingNotifieer.show({
    message: message || 'Processing!',
  });
}
