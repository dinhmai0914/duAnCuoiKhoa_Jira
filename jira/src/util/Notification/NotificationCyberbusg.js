import { Button, notification, Space } from "antd";

export const notifiFunction = (type, message, description) => {
  notification[type]({
    message: message,
    description: description,
  });
};
