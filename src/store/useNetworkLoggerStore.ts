import { create } from 'zustand';

export interface NetworkLog {
  id: string;
  method: string;
  url: string;
  requestHeaders: any;
  requestBody: any;
  responseStatus: number | null;
  responseHeaders: any;
  responseBody: any;
  startTime: number;
  endTime: number | null;
  duration: number | null;
  isError: boolean;
}

interface NetworkLoggerState {
  logs: NetworkLog[];
  isModalVisible: boolean;
  addLog: (log: NetworkLog) => void;
  updateLog: (id: string, updates: Partial<NetworkLog>) => void;
  clearLogs: () => void;
  setModalVisible: (visible: boolean) => void;
}

export const useNetworkLoggerStore = create<NetworkLoggerState>((set) => ({
  logs: [],
  isModalVisible: false,
  addLog: (log) => set((state) => ({ logs: [log, ...state.logs].slice(0, 100) })), // Keep last 100
  updateLog: (id, updates) => set((state) => ({
    logs: state.logs.map((log) => (log.id === id ? { ...log, ...updates } : log)),
  })),
  clearLogs: () => set({ logs: [] }),
  setModalVisible: (visible) => set({ isModalVisible: visible }),
}));
