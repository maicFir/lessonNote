import React, { useEffect, useState } from "react";

export function userTitle() {
  const [title, setTitle] = useState<string>("web技术学苑");
  const [userInfo, setUserInfo] = useState<{ name?: string }>({});
  useEffect(() => {
    if (userInfo?.name) {
      setTitle("web技术学苑" + new Date().getTime());
    }
  }, [userInfo]);
  return {
    title,
  };
}
