export interface SignupUserInput {
  username: string;
  name: string;
  email: string;
  role: string;
  password: string;
}

export interface SignupResponse {
  signup: {
    access_token: string;
  };
}

export interface LoginUserInput {
  email: string;
  password: string;
}

export interface LoginResponse {
  login: {
    access_token: string;
    user: {
      createdAt: string;
      email: string;
      id: string;
      name: string;
      updatedAt: string;
      username: string;
    };
  };
}

export interface Adminprofile {
  account: {
    role: string;
    user: {
      email: string;
      id: string;
      name: string;
      username: string;
    };
  };
}

export interface ResetPasswordInput {
  oldPassword: string;
  newPassword: string;
}

export interface ResetPasswordResponse {
  resetPassword: boolean;
}

export interface ProfileUpdateInput {
  name?: string;
  username?: string;
}

export interface ProfileUpdateResponse {
  updateprofile: boolean;
}
