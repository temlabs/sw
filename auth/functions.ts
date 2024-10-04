import { makeRequest } from "@/api/apiUtils";
import {
  ConfirmSignUpParams,
  SignUpParams,
  SignUpResponse,
  ConfirmSignUpResponse,
} from "./types";

export const signUp = async (signUpParams: SignUpParams) => {
  try {
    const resJson = await makeRequest<SignUpResponse>(
      "POST",
      "signUp",
      {body:signUpParams}
    );
    return resJson;
  } catch (error) {
    console.debug(error);
    throw error;
  }
};

export const confirmSignUp = async (
  confirmSignUpParams: ConfirmSignUpParams
) => {
  try {
    const resJson = await makeRequest<ConfirmSignUpResponse>(
      "POST",
      "confirmSignUp",
      {body:confirmSignUpParams}
    );
    return resJson;
  } catch (error) {
    throw error;
  }
};
