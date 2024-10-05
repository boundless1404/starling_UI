import { Loading, Notify } from 'quasar';
import { NotifierTypes } from 'src/lib/types';
import { Ref } from 'vue';

export function useNotify({
  type = 'positive',
  message,
}: {
  type?: 'positive' | 'negative' | 'warning' | 'info';
  message?: string;
} = {}) {
  Notify.create({
    message: message
      ? message
      : type === 'negative'
      ? 'Process failed'
      : 'Process succcessful!',
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

export default async function useUiProcessHandler({
  process,
  onError,
  loader,
  useNotifer = true,
  notifierType = 'positive',
  notifierMessage,
  loaderMessage = 'Please, wait!',
  showErrorNotifier = true,
}: {
  loader?: Loading;
  useNotifer?: boolean;
  loaderMessage?: string;
  notifierMessage?: string;
  notifierType?: NotifierTypes;
  showErrorNotifier?: boolean;
  process: () => Promise<void>;
  onError?: () => void;
}) {
  loader && loader.show({ message: loaderMessage });

  try {
    await process();
    useNotifer &&
      useNotify({
        type: notifierType,
        ...(notifierMessage ? { message: notifierMessage } : {}),
      });
  } catch (err) {
    const error = <Error>err;
    onError?.();
    showErrorNotifier &&
      useNotify({
        type: 'negative',
        ...(error.message ? { message: error.message } : {}),
      });
  } finally {
    loader?.isActive && loader.hide();
  }
}
