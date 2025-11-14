'use client';

import { create } from 'zustand';

import { KioskErrorResponse, KioskResponse,kiosksAPI } from '@/shared/api';

interface ModalStore {
  kiosksData: KiosksData[];
  isLoading: boolean;
  defaultLanguageIsOpen: boolean;
  setDefaultLanguageIsOpen: (value?: boolean) => void;
  setSelectedKiosk: (kioskID: string) => void;
  clearError: (kioskId: string, errorId: string) => Promise<void>;
  changeLanguage: (kioskId: string, language: string) => void;
  changeStatus: (kioskId: string, status: Status) => void;
  fetchKiosks: () => Promise<void>;
  updateKioskStatus: (kioskId: string, status: Status) => Promise<void>;
  updateKioskLanguage: (kioskId: string, language: string) => Promise<void>;
  clearKioskError: (kioskId: string) => Promise<void>;
  fetchKioskErrors: (kioskId: string) => Promise<void>;
}

export interface ErrorData {
  id: string;
  message: string;
  title: string;
}

export interface KiosksData {
  id: string;
  name: string;
  status: Status;
  isSelected: boolean;
  defaultLanguage: string;
  error?: ErrorData[];
}

export type Status = 'active' | 'inactive' | 'error';

const mapKioskResponseToKiosksData = (
  kiosk: KioskResponse,
  existingKiosk?: KiosksData
): KiosksData => {
  const mapStatus = (status: string): Status => {
    if (status === 'working') return 'active';
    if (status === 'active' || status === 'inactive' || status === 'error') {
      return status as Status;
    }

    return 'inactive';
  };

  const getLanguage = (): string => {
    const backendLanguage = kiosk.defaultLanguage || 
                             kiosk.settings?.defaultLanguage || 
                             existingKiosk?.defaultLanguage || 
                             'en';
    
    const languageMap: Record<string, string> = {
      'en': 'english',
      'fr': 'french',
      'es': 'spanish',
      'ja': 'japanese',
      'be': 'belarus ',
    };
    
    return languageMap[backendLanguage.toLowerCase()] || backendLanguage;
  };

  return {
    id: kiosk.id,
    name: kiosk.name,
    status: mapStatus(kiosk.status),
    isSelected: existingKiosk?.isSelected ?? false,
    defaultLanguage: getLanguage(),
    error: existingKiosk?.error,
  };
};

const mapKioskErrorsToErrorData = (
  errors: KioskErrorResponse[]
): ErrorData[] => {
  return errors.map((error, index) => ({
    id: error.id || `error-${index}`,
    message: error.message,
    title: error.code || `Error ${index + 1}`,
  }));
};

export const useKiosksStore = create<ModalStore>((set, get) => ({
  kiosksData: [],
  isLoading: false,
  defaultLanguageIsOpen: false,

  setSelectedKiosk: (kioskId: string) => {
    set(state => ({
      kiosksData: state.kiosksData.map(kiosk => ({
        ...kiosk,
        isSelected: kiosk.isSelected ? false : kiosk.id === kioskId,
      })),
      defaultLanguageIsOpen: false,
    }));
  },

  clearError: async (kioskId: string, errorId: string) => {
    set(state => ({
      kiosksData: state.kiosksData.map(kiosk => {
        if (kiosk.id === kioskId && kiosk.error) {
          const filteredErrors = kiosk.error.filter(
            error => error.id !== errorId
          );

          return {
            ...kiosk,
            error: filteredErrors.length > 0 ? filteredErrors : undefined,
            status: filteredErrors.length > 0 ? 'error' : 'inactive',
          };
        }

        return kiosk;
      }),
    }));

    const kiosk = get().kiosksData.find(k => k.id === kioskId);
    if (kiosk && kiosk.error && kiosk.error.length === 1) {
      await get().clearKioskError(kioskId);
    }
  },
  changeLanguage: (kioskId: string, language: string) => {
    set(state => ({
      kiosksData: state.kiosksData.map(kiosk => ({
        ...kiosk,
        defaultLanguage:
          kiosk.id === kioskId ? language : kiosk.defaultLanguage,
      })),
    }));
  },
  changeStatus: (kioskId: string, status: Status) => {
    set(state => ({
      kiosksData: state.kiosksData.map(kiosk => ({
        ...kiosk,
        status: kiosk.id === kioskId ? status : kiosk.status,
      })),
    }));
  },
  setDefaultLanguageIsOpen: value => {
    set({ defaultLanguageIsOpen: value });
  },

  fetchKiosks: async () => {
    try {
      set({ isLoading: true });
      const response = await kiosksAPI.getKiosks();
      const kiosks = response.data?.data || [];

      const currentKiosks = get().kiosksData;
      const mappedKiosks = kiosks.map(kiosk => {
        const existingKiosk = currentKiosks.find(k => k.id === kiosk.id);

        return mapKioskResponseToKiosksData(kiosk, existingKiosk);
      });

      set({ kiosksData: mappedKiosks, isLoading: false });

      for (const kiosk of mappedKiosks) {
        if (kiosk.status === 'error') {
          await get().fetchKioskErrors(kiosk.id);
        }
      }
    } catch {
      set({ isLoading: false });
    }
  },

  updateKioskStatus: async (kioskId: string, status: Status) => {
    set(state => ({
      kiosksData: state.kiosksData.map(kiosk => {
        if (kiosk.id === kioskId) {
          return { ...kiosk, status };
        }

        return kiosk;
      }),
    }));

    try {
      const response = await kiosksAPI.changeStatus(kioskId, { status });
      const updatedKiosk = response.data?.data;

      if (updatedKiosk) {
        set(state => ({
          kiosksData: state.kiosksData.map(kiosk => {
            if (kiosk.id === kioskId) {
              const existingKiosk = state.kiosksData.find(k => k.id === kioskId);

              return mapKioskResponseToKiosksData(updatedKiosk, existingKiosk);
            }

            return kiosk;
          }),
        }));
      }
    } catch {
      // ignore
    }
  },

  updateKioskLanguage: async (kioskId: string, language: string) => {
    set(state => ({
      kiosksData: state.kiosksData.map(kiosk => {
        if (kiosk.id === kioskId) {
          return { ...kiosk, defaultLanguage: language };
        }

        return kiosk;
      }),
    }));

    try {
      const languageMap: Record<string, string> = {
        'english': 'en',
        'french': 'fr',
        'spanish': 'es',
        'japanese': 'ja',
        'belarus ': 'be',
      };
      
      const backendLanguage = languageMap[language.toLowerCase()] || language;
      
      const response = await kiosksAPI.changeLanguage(kioskId, { language: backendLanguage });
      const updatedKiosk = response.data?.data;

      if (updatedKiosk) {
        set(state => ({
          kiosksData: state.kiosksData.map(kiosk => {
            if (kiosk.id === kioskId) {
              const existingKiosk = state.kiosksData.find(k => k.id === kioskId);

              return mapKioskResponseToKiosksData(updatedKiosk, existingKiosk);
            }

            return kiosk;
          }),
        }));
      }
    } catch {
      // ignore
    }
  },

  clearKioskError: async (kioskId: string) => {
    try {
      const response = await kiosksAPI.clearError(kioskId);
      const updatedKiosk = response.data?.data;

      if (updatedKiosk) {
        set(state => ({
          kiosksData: state.kiosksData.map(kiosk => {
            if (kiosk.id === kioskId) {
              const existingKiosk = state.kiosksData.find(k => k.id === kioskId);
              const mapped = mapKioskResponseToKiosksData(updatedKiosk, existingKiosk);

              return { ...mapped, error: undefined };
            }

            return kiosk;
          }),
        }));
      }
    } catch {
      // ignore
    }
  },

  fetchKioskErrors: async (kioskId: string) => {
    try {
      const response = await kiosksAPI.getKioskErrors(kioskId, { limit: 10 });
      const errors = response.data?.data || [];

      set(state => ({
        kiosksData: state.kiosksData.map(kiosk => {
          if (kiosk.id === kioskId) {
            return {
              ...kiosk,
              error: mapKioskErrorsToErrorData(errors),
            };
          }

          return kiosk;
        }),
      }));
    } catch {
      // ignore
    }
  },
}));
