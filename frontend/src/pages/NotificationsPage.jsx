import { useEffect, useState } from "react";
import API from "../utils/api";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const { data } = await API.get("/notifications");
      setNotifications(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">
          Notifications
        </h1>

        {notifications.length === 0 ? (
          <p>No notifications available.</p>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification._id}
              className="border-b py-3"
            >
              <p>{notification.message}</p>

              <p className="text-sm text-gray-500">
                {new Date(
                  notification.createdAt
                ).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;