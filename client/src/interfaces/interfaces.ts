export interface SignupUserInput {
  username: string;
  name: string;
  email: string;
  roleId: string;
  password: string;
}

export interface SignupResponse {
  signup: {
    access_token: string;
  };
}
