import { useApolloClient } from "@apollo/client";
import { useNetwork } from "@mantine/hooks";
import { useEffect, useRef } from "react";

export default function NetworkOverlay() {
  const networkStatus = useNetwork();
  const client = useApolloClient();
  const wasOffline = useRef(false);

  useEffect(() => {
    if (networkStatus.online && wasOffline.current) {
      client.reFetchObservableQueries();
      wasOffline.current = false;
    }

    if (!networkStatus.online) {
      wasOffline.current = true;
    }
  }, [networkStatus.online, client]);

  if (networkStatus.online) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-90 text-white">
      <div className="text-center max-w-sm">
        <h2 className="text-3xl font-bold text-white">You're Offline</h2>
        <div className="text-gray-300 text-lg">
          Please check your internet connection or try reconnecting to your
          network.
        </div>
      </div>
    </div>
  );
}
