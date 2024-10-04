import { ErrorResponse } from "./apiTypes";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth";

async function getAuthToken() {
    try {
      // Get the current authenticated user
      const user = await getCurrentUser();
      
      // Fetch the user's session
      const session = await fetchAuthSession();
      
      // Extract the access token
      const token = session.tokens?.accessToken;
  
      if (!token) {
        throw new Error('No access token found');
      }
  
      return token.toString();
    } catch (error) {
      console.error('Error fetching auth token:', error);
      throw error;
    }
  }



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
  options: {
    body?:Object, queryParams?:Object, isAuthenticated?:boolean
  }
) => {
  const url = new URL(
    endpoint,
    "https://sheerwonder-backend-production.up.railway.app/"
  );
  const jsonData = JSON.stringify(options.body);
  const searchParams = new URLSearchParams();
  options.queryParams && Object.entries(options.queryParams).forEach(([key, value]) => {
    searchParams.append(key, value.toString());
  });
  
  const defaultHeader = {
    "Content-Type": "application/json",
  }

  const token = options.isAuthenticated ? await getAuthToken() : undefined

  
  const headers = token ? {...defaultHeader, 'Authorization': `Bearer ${token}`} : defaultHeader;


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
