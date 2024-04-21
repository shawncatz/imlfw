// Code generated by github.com/dashotv/golem. DO NOT EDIT.
import { Response, imlfwClient } from '.';

export interface AuthGoogleCallbackRequest {
  state: string;
  code: string;
  scope: string;
}

export const AuthGoogleCallback = async (params: AuthGoogleCallbackRequest) => {
  const response = await imlfwClient.get(
    `/auth/google/callback?state=${params.state}&code=${params.code}&scope=${params.scope}`,
  );

  if (!response.data) {
    throw new Error('response empty?');
  }

  if (response.data.error) {
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    throw new Error('unknown error');
  }

  return response.data as Response;
};

export const AuthGoogle = async () => {
  const response = await imlfwClient.get(`/auth/google?`);

  if (!response.data) {
    throw new Error('response empty?');
  }

  if (response.data.error) {
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    throw new Error('unknown error');
  }

  return response.data as Response;
};
