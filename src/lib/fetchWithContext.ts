import { parseCookies } from "nookies";

export let headers: { [value: string]: string } = {};

export const getAPIClient = (ctx?: any) => {
  const { "poc-token": token } = parseCookies(ctx);

  if (token) {
    headers = {
      ...headers,
      authorization: `Bearer ${token}`,
    };
  }

  const api = async (url: string, method: string = "GET") => {
    console.log(headers);

    return await fetch(url, {
      method,
      headers,
    });
  };

  return api;
};
