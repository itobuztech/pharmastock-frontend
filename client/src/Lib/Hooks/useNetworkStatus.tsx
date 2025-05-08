import { useApolloClient } from "@apollo/client";
import { useEffect, useState } from "react";

export const useNetworkStatus = () => {
  const client = useApolloClient();
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      // Only refetch observable queries
      client.reFetchObservableQueries();
    };
    const handleOffline = () => setIsOffline(true);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return { isOffline, setIsOffline };
};
