import { create } from 'zustand';

interface ToastState {
  visible: boolean;
  message: string;
}

interface DownloadState {
  visible: boolean;
  label: string;
  percent: number;
}

interface UiState {
  toast: ToastState;
  download: DownloadState;
  showToast: (message: string) => void;
  startDownload: (label: string, onDone?: () => void) => void;
}

let toastTimer: ReturnType<typeof setTimeout> | null = null;
let downloadTimer: ReturnType<typeof setInterval> | null = null;

export const useUiStore = create<UiState>()((set, get) => ({
  toast: { visible: false, message: '' },
  download: { visible: false, label: '', percent: 0 },

  showToast: message => {
    if (toastTimer) clearTimeout(toastTimer);
    set({ toast: { visible: true, message } });
    toastTimer = setTimeout(() => {
      set(s => ({ toast: { ...s.toast, visible: false } }));
    }, 2200);
  },

  startDownload: (label, onDone) => {
    if (downloadTimer) clearInterval(downloadTimer);
    set({ download: { visible: true, label, percent: 0 } });
    downloadTimer = setInterval(() => {
      const next = Math.min(100, get().download.percent + 9);
      set(s => ({ download: { ...s.download, percent: next } }));
      if (next >= 100) {
        if (downloadTimer) clearInterval(downloadTimer);
        downloadTimer = null;
        setTimeout(() => {
          set(s => ({ download: { ...s.download, visible: false } }));
          onDone?.();
        }, 250);
      }
    }, 110);
  },
}));
