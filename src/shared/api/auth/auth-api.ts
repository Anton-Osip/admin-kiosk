import { BaseResponse, instance } from '@/shared/api';

import { LoginRequest, LoginResponse } from './auth-api.types';

export const authAPI = {
  login(request: LoginRequest) {
    return instance.post<BaseResponse<LoginResponse>>('auth/login', request);
  },
};

