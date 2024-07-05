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

export interface TokenID {
  token: string;
}

export interface LoginUserInput {
  email: string;
  password: string;
}

export interface LoginResponseWithToken {
  tokenConfirmation: {
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

export interface CreatePharmacyInput {
  contact_info: string;
  location: string;
  name: string;
  organizationId: string;
}

export interface CreatePharmacyResponse {
  createPharmacy: {
    contact_info: string;
    createdAt: string;
    id: string;
    location: string;
    name: string;
    organizationId: string;
    updatedAt: string;
  };
}

export interface OrganizationList {
  organizations: {
    organizations: [
      {
        active?: string;
        address?: string;
        city?: string;
        country?: string;
        createdAt?: string;
        description?: string;
        id?: string;
        name?: string;
        updatedAt?: string;
      }
    ];
    total: number;
  };
}
// ---------------------- For Item category ------------------------//
export interface CreateItemCategoryInput {
  name: string,
  parentCategoryId: string
}
export interface CreateItemCategoryResponse {
  id: string,
  name: string
}
export interface ItemCategoryCreationError {
  em: string
}

export interface ItemCategoryCreationSucc {
  sm: string
}

export interface ItemCategory {
  id: string,
  name: string,
  parentCategoryId: string | null,
  createdAt: string
}

export interface PaginationArgs {
  take: number,
  skip: number
}
