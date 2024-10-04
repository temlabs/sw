import { ErrorResponse } from "./apiTypes";

export const isErrorResponse = (
  response: Object
): response is ErrorResponse => {
  if (
    "error" in response &&
    typeof response.error === "object" &&
    response.error &&
    "message" in response.error &&
    "code" in response.error &&
    "internalCode" in response.error
  ) {
    return true;
  }
  return false;
};

export const throwApiError = (res: Object, callbackName: string) => {
  if (isErrorResponse(res)) {
    const message = res.error.message;
    const e = new Error(message);
    // e.name = `${callbackName} error`;
    e.name = res.error.internalCode;
    throw e;
  }
};

export const makeRequest = async <T = Object>(
  method: RequestInit["method"],
  endpoint: string,
  body?: Object
) => {
  const url = new URL(
    endpoint,
    "https://sheerwonder-backend-production.up.railway.app/"
  );
  const jsonData = JSON.stringify(body);

  const headers = {
    "Content-Type": "application/json",
  };

  const fetchOptions = {
    method,
    headers: headers,
    body: jsonData,
  };
  const res = await fetch(url, fetchOptions);
  const resJson = await res.json();
  throwApiError(resJson, endpoint);
  return resJson as T;
};
