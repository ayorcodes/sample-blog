import { ApiConfigService } from './apiConfig';

const API = new ApiConfigService();

export function LoginRequest(data: any) {
  return API.LoginRequest().post('auth/register', data);
}

export function SignupRequest(data: any) {
  return API.LoginRequest().post('auth/login', data);
}

export function GetMe() {
  return API.Request().post('auth/me');
}

export function GetPosts() {
  return API.Request().get('posts');
}
