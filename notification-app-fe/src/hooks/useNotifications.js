import { useEffect, useState } from "react";
import { getNotifications } from "../api/notifications";

const useNotifications = (page, limit, type) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadNotifications() {
      try {
        setLoading(true);

        const data = await getNotifications(
          page,
          limit,
          type
        );

        if (Array.isArray(data)) {
          setNotifications(data);
        } else {
          setNotifications(data.notifications || []);
        }
      } catch (err) {
        setError("Unable to load notifications.");
      } finally {
        setLoading(false);
      }
    }

    loadNotifications();
  }, [page, limit, type]);

  return {
    notifications,
    loading,
    error,
  };
};

export default useNotifications;