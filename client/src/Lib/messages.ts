export const messagesData = {
  register: {
    userName: {
      required: "Username is a required field",
      max: "Username must be at most 100 characters",
      min: "Username must be at least 3 characters",
      trim: "Username is a required field",
      matches: "Username not contain any special character",
    },
    name: {
      required: "Name is a required field",
      max: "Name must be at most 100 characters",
      min: "Name must be at least 3 characters",
      trim: "Name is a required field",
      matches: "Name not contain any special character",
    },
    role: {
      required: "Role is a required field",
    },
    email: {
      required: "Email is a required field",
      matches: "Email must be a valid email",
      email: "Email must be a valid email",
    },
    password: {
      required: "Password is a required field",
    },
    organizationId: {
      required: "Organization is a required field",
    },
  },
};

export default messagesData;
