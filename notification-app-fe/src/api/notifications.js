import axios from "axios";

const API_URL =
"http://localhost:5000/evaluation-service/notifications";

export const getNotifications = async (
  page = 1,
  limit = 10,
  notificationType = "ALL"
) => {
  try {
    const params = {
      page,
      limit,
    };

    if (notificationType !== "ALL") {
      params.notification_type = notificationType;
    }

    const response = await axios.get(API_URL, {
      params,
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};