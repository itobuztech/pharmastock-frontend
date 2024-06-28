
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


export interface PaginationArgsInput {
  skip: number;
  take: number;
}

export interface OrganizationsListResponse {
  active: boolean;
  address: string;
  city: string;
  country: string;
  createdAt: string;
  description: string;
  id: string;
  name: string;
  updatedAt: string;
}
