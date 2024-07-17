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
        active?: true;
        address?: string;
        city?: string;
        contact?: string;
        country?: string;
        createdAt?: string;
        description?: string;
        id: string;
        name?: string;
        updatedAt?: string;
      }
    ];
    total: number;
  };
}
export interface createOrganizationInput {
  active?: true;
  address?: string;
  city?: string;
  contact?: string;
  country?: string;
  description?: string;
  name?: string;
}

export interface Pharmacies {
  pharmacies: {
    pharmacies: [
      {
        contactInfo: string;
        createdAt: Date;
        id: string;
        location: string;
        name: string;
        organization: OrganizationsListResponse;
        updatedAt: string;
      }
    ];
    total: number;
  };
}

export interface Pharmacy {
  contactInfo: string;
  createdAt: Date;
  id: string;
  location: string;
  name: string;
  organization: OrganizationsListResponse;
  updatedAt: Date;
}

// ---------------------- For Item category ------------------------//
// export interface CreateItemCategoryInput {
//   name: string;
//   parentCategoryId: string;
// }
// export interface CreateItemCategoryResponse {
//   id: string;
//   name: string;
// }
// export interface ItemCategoryCreationError {
//   em: string;
// }

// export interface ItemCategoryCreationSucc {
//   sm: string;
// }

// export interface ItemCategory {
//   id: string;
//   name: string;
//   parentCategoryId: string | null;
//   createdAt: string;
// }

export interface PaginationArgs {
  take: number;
  skip: number;
}

export interface CreateItemCategories {
  itemCategories: ItemCategories;
}

export interface ItemCategories {
  total: number;
  itemCategories: CategoryItem[];
}

export interface CategoryItem {
  createdAt: string;
  id: string;
  name: string;
  updatedAt: string;
  Item?: Item;
}

// export interface Item {
//   id: string;
// }

export interface CreateWarehouses {
  warehouses: Warehouses;
}
export interface Warehouses {
  total: number;
  warehouses: WarehouseItem[];
}
export interface WarehouseItem {
  area: string;
  createdAt: string;
  id: string;
  location: string;
  name: string;
  updatedAt: string;
  organization: {
    id: string;
    name: string;
  };
}

export interface ItemLists {
  items: Items;
}

export interface Items {
  items: Item[];
  total: number;
}

export interface Item {
  baseUnit: string;
  createdAt: string;
  hsnCode: string;
  id: string;
  instructions: string;
  mrpBaseUnit: number;
  updatedAt: string;
  wholesalePrice: number;
  Category: CategoryItem[];
  name: string;
}
