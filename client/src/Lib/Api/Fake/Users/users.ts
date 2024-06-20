import { faker } from '@faker-js/faker';
import _ from 'lodash';

import { CurrentUserResponse, LoginPayload, User } from './users.interface';

export const userApi = {
  login: async (payload: LoginPayload) => {
    return new Promise((resolve) => {
      _.delay(() => {
        resolve({ token: faker.datatype.uuid() });
      }, 1000);
    });
  },
  getCurrentUser: (): Promise<CurrentUserResponse> => {
    return new Promise((resolve) => {
      _.delay(() => {
        const user: User = {
          id: faker.datatype.uuid(),
          firstName: faker.name.firstName(),
          lastName:  faker.name.lastName(),
          phoneNo: faker.phone.number(),
          token: faker.datatype.uuid(),
          image: faker.image.avatar()
        };
        resolve({ user });
      }, 1000);
    });
  },

  forgetPassword: (): Promise<{ token: string }> => {
    return new Promise((resolve) => {
      _.delay(() => {
        resolve({ token: faker.datatype.uuid() });
      }, 1000);
    });
  }
};

export default userApi;
