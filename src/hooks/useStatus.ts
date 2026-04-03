import { useEffect, useState } from "react";
import { fetchStatus, type Status } from "@/api/status";

const useStatus = () => {
  const [status, setStatus] = useState<Status | null>(null);
  useEffect(() => {
    fetchStatus()
      .then((res) => {
        setStatus({
          ...res.data,
          is_online: res.data.is_online === 1,
        });
      })
      .catch((err) => {
        console.log("获取状态失败", err);
        setStatus({
          is_online: false,
          status_text: "离线",
          status_desc: "服务已离线",
        });
      });
  }, []);
  return { status, setStatus };
};

export default useStatus;
