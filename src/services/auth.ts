import { v4 as UuidV4 } from "uuid";

type SignInRequestData = {
  email: string;
  password: string;
};

const delay = (amount = 750) =>
  new Promise((resolve) => setTimeout(resolve, amount));

export const signInRequest = async (data: SignInRequestData) => {
  await delay();

  return {
    token: UuidV4(),
    user: {
      name: "Alexandre Bekor",
      email: "staff@alexandrebekor.com",
      avatar: "https://github.com/alexandrebekor.png",
    },
  };
};

export const recoverUserInformation = async () => {
  await delay();

  return {
    user: {
      name: "Alexandre Bekor",
      email: "staff@alexandrebekor.com",
      avatar: "https://github.com/alexandrebekor.png",
    },
  };
};
