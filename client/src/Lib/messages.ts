export const messagesData = {
  register: {
    userName: {
      required: "Username is a required field",
      max: "Username must be at most 100 characters",
      trim: "Username is a required field",
      matches: "Username not contain any special character",
    },
    name: {
      required: "Name is a required field",
      max: "Name must be at most 100 characters",
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
  forgotPassword: {
    email: {
      required: "Email is a required field",
      matches: "Email must be a valid email",
      email: "Email must be a valid email",
    },
  },
  organization: {
    name: {
      required: "Name is a required field",
      max: "Name must be at most 100 characters",
      trim: "Name is a required field",
      matches: "Name not contain any special character",
    },
    description: {
      required: "Description is a required field",
    },
    address: {
      required: "Address is a required field",
    },
    contact: {
      required: "Contact is a required field",
      matches: "Contact info must be a number",
    },
    city: {
      required: "City is a required field",
      matches: "City not contain any special character",
    },
    country: {
      required: "Country is a required field",
    },
  },
  warehouse: {
    name: {
      required: "Name is a required field",
      max: "Name must be at most 100 characters",
      trim: "Name is a required field",
      matches: "Name not contain any special character",
    },
    location: {
      required: "Location is a required field",
      matches: "Location not contain any special character",
    },
    area: {
      required: "Area is a required field",
      matches: "Area not contain any special character",
    },
    organization: {
      required: "Organization is a required field",
    },
  },
  pharmacy: {
    name: {
      required: "Name is a required field",
      max: "Name must be at most 100 characters",
      trim: "Name is a required field",
      matches: "Name not contain any special character",
    },
    location: {
      required: "Location is a required field",
      matches: "Location not contain any special character",
    },
    contact: {
      required: "Contact is a required field",
      matches: "Contact info is not a valid number",
    },
    organization: {
      required: "Organization is a required field",
    },
  },
};

export default messagesData;
