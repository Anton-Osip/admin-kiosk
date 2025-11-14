export interface LoginRequest {
  name: string;
  password: string;
}

export interface LoginResponse {
  id: string; // string (uuid)
  name: string; // string
  email: string; // string (email)
  attempts: number; // number
  locale: string; // string (locale code)
  address: string; // string
  city: string; // string
  comment: string; // string
  country: string; // string
  createdUserId: string | null; // string|null
  fullName: string; // string
  generations: number; // number
  jobPosition: string; // string
  messengerAddress: string; // string
  objectName: string; // string
  phone: string; // string
  spotName: string; // string
  storeType: string; // string
  uncompUserId: string | null; // string|null
  createdAt: string; // string (ISO date)
  updatedAt: string; // string (ISO date)
  deletedAt: string | null; // string|null (ISO date)
  role: {
    name: string; // string
  };
}

export interface AuthError {
  resultCode: number;
  messages: string[];
  fieldsErrors: unknown[];
  data: null;
}

