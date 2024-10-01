import { Hub } from "aws-amplify/utils";
import { useEffect, useState } from "react";

import { getCurrentUser } from "aws-amplify/auth";
import { AuthStatus } from "./types";

export function useAuthStatus() {
  const [authStatus, setAuthStatus] = useState<AuthStatus>();

  useEffect(() => {
    const hubListener = Hub.listen("auth", (eventData) => {
      const event = eventData.payload.event;
      switch (event) {
        case "signedIn":
          //   queryClient.prefetchQuery({
          //     queryKey: userQueryKeys.current,
          //     queryFn: fetchUser,
          //   });
          setAuthStatus("AUTHENTICATED");
          break;
        case "signedOut":
          setAuthStatus("UNAUTHENTICATED");
          break;
        case "tokenRefresh":
          break;
        case "tokenRefresh_failure":
          setAuthStatus("UNAUTHENTICATED");
          break;
      }
    });
    getCurrentUser()
      .then((currentUser) => setAuthStatus("AUTHENTICATED"))
      .catch(() => setAuthStatus("UNAUTHENTICATED"));
    // Clean up
    return () => hubListener();
  }, []);

  return { authStatus };
}
