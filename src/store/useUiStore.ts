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
  cancelDownload: () => void;
}

// Los timers viven fuera del estado de zustand a propósito: no son datos de UI
// y así nunca se serializan ni provocan re-render. Todos se limpian en
// cancelDownload y al empezar una descarga nueva.
let toastTimer: ReturnType<typeof setTimeout> | null = null;
let downloadTimer: ReturnType<typeof setInterval> | null = null;
let downloadHideTimer: ReturnType<typeof setTimeout> | null = null;

function clearDownloadTimers() {
  if (downloadTimer) clearInterval(downloadTimer);
  if (downloadHideTimer) clearTimeout(downloadHideTimer);
  downloadTimer = null;
  downloadHideTimer = null;
}

export const useUiStore = create<UiState>()((set, get) => ({
  toast: { visible: false, message: '' },
  download: { visible: false, label: '', percent: 0 },

  showToast: message => {
    if (toastTimer) clearTimeout(toastTimer);
    set({ toast: { visible: true, message } });
    toastTimer = setTimeout(() => {
      toastTimer = null;
      set(s => ({ toast: { ...s.toast, visible: false } }));
    }, 2200);
  },

  startDownload: (label, onDone) => {
    clearDownloadTimers();
    set({ download: { visible: true, label, percent: 0 } });
    downloadTimer = setInterval(() => {
      const next = Math.min(100, get().download.percent + 9);
      set(s => ({ download: { ...s.download, percent: next } }));
      if (next >= 100) {
        if (downloadTimer) clearInterval(downloadTimer);
        downloadTimer = null;
        downloadHideTimer = setTimeout(() => {
          downloadHideTimer = null;
          set(s => ({ download: { ...s.download, visible: false } }));
          onDone?.();
        }, 250);
      }
    }, 110);
  },

  cancelDownload: () => {
    clearDownloadTimers();
    set(s => ({ download: { ...s.download, visible: false, percent: 0 } }));
  },
}));
