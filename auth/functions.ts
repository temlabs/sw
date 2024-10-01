import { SignUpParams, SignUpResponse } from "./types";

export const signUp = async (
  signUpParams: SignUpParams
): Promise<{ sessionToken: string; sessionJwt: string }> => {
  const url = new URL(
    "signUp",
    "https://sheerwonder-backend-production.up.railway.app/"
  );

  const jsonData = JSON.stringify(signUpParams);

  const headers = {
    "Content-Type": "application/json",
  };

  const fetchOptions = {
    method: "POST",
    headers: headers,
    body: jsonData,
  };

  try {
    const res = await fetch(url, fetchOptions);
    const resJson = (await res.json()) as unknown as SignUpResponse;

    return resJson;
  } catch (error) {
    console.debug(error);
  }
  return { sessionJwt: "", sessionToken: "" };
};
