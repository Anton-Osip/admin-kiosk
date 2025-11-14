import { BaseResponse, instance } from '@/shared/api';

import {
  ChangeKioskLanguageRequest,
  ChangeKioskStatusRequest,
  GenerateCodeResponse,
  GetKioskErrorsParams,
  KioskErrorResponse,
  KioskResponse,
} from './kiosks-api.types';

export const kiosksAPI = {
  getKiosks() {
    return instance.get<KioskResponse[] | BaseResponse<KioskResponse[]>>('kiosks').then(
      (response) => {
        if (Array.isArray(response.data)) {
          return {
            ...response,
            data: {
              resultCode: 0,
              messages: [],
              fieldsErrors: [],
              data: response.data,
            } as BaseResponse<KioskResponse[]>,
          };
        }
        
        return response as { data: BaseResponse<KioskResponse[]>; status: number };
      },
      (error) => {
        throw error;
      }
    );
  },

  // GET /partner/kiosks/:id - получить детали киоска
  getKioskById(id: string) {
    return instance.get<BaseResponse<KioskResponse>>(`kiosks/${id}`);
  },

  // POST /partner/kiosks/:id/status - изменить статус киоска
  changeStatus(id: string, request: ChangeKioskStatusRequest) {
    return instance.post<BaseResponse<KioskResponse>>(
      `kiosks/${id}/status`,
      request
    );
  },

  // POST /partner/kiosks/:id/language - сменить язык киоска
  changeLanguage(id: string, request: ChangeKioskLanguageRequest) {
    return instance.post<BaseResponse<KioskResponse>>(
      `kiosks/${id}/language`,
      request
    );
  },

  // GET /partner/kiosks/:id/errors - получить ошибки киоска
  getKioskErrors(id: string, params?: GetKioskErrorsParams) {
    const queryParams = params?.limit ? `?limit=${params.limit}` : '';

    return instance.get<BaseResponse<KioskErrorResponse[]>>(
      `kiosks/${id}/errors${queryParams}`
    );
  },

  // POST /partner/kiosks/:id/errors/clear - сбросить ошибку
  clearError(id: string) {
    return instance.post<BaseResponse<KioskResponse>>(
      `kiosks/${id}/errors/clear`
    );
  },

  // POST /partner/kiosks/:id/code - сгенерировать код
  generateCode(id: string) {
    return instance.post<GenerateCodeResponse | BaseResponse<GenerateCodeResponse>>(
      `kiosks/${id}/code`
    ).then(
      (response) => {
        if (response.data && !('resultCode' in response.data)) {
          return {
            ...response,
            data: {
              resultCode: 0,
              messages: [],
              fieldsErrors: [],
              data: response.data as GenerateCodeResponse,
            } as BaseResponse<GenerateCodeResponse>,
          };
        }

        return response as { data: BaseResponse<GenerateCodeResponse>; status: number };
      },
      (error) => {
        throw error;
      }
    );
  },
};

