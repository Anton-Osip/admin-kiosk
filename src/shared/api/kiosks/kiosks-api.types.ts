export type KioskStatus = 'active' | 'inactive' | 'error' | 'working';

export interface KioskResponse {
  id: string; // uuid
  name: string;
  shopName?: string; // название магазина (может быть)
  location?: string; // локация (может быть)
  status: string; // "working", "active", "inactive", "error" и т.д.
  defaultLanguage?: string; // язык напрямую в объекте (не в settings)
  lastSeenAt?: string | null; // ISO date
  lastErrorCode?: string | null;
  settings?: {
    defaultLanguage: string; // en, fr, es, he и т.д. (если есть)
  };
}

// Ответ от GET /partner/kiosks/:id/errors
export interface KioskErrorResponse {
  id?: string; // uuid ошибки (если есть)
  code: string; // например "B2"
  message: string;
  createdAt?: string; // ISO date (если есть)
}

// Запрос для POST /partner/kiosks/:id/status
export interface ChangeKioskStatusRequest {
  status: KioskStatus;
}

// Запрос для POST /partner/kiosks/:id/language
export interface ChangeKioskLanguageRequest {
  language: string; // en, fr, es, he и т.д.
}

// Ответ от POST /partner/kiosks/:id/code
export interface GenerateCodeResponse {
  code: string; // 4-значный код
  type: 'cash' | 'error';
  issuedAt: string; // ISO date
}

// Параметры для GET /partner/kiosks/:id/errors
export interface GetKioskErrorsParams {
  limit?: number; // по умолчанию 3
}

