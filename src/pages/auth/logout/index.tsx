import React, { useEffect } from "react";
import { useRouter } from "next/router";

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    window.localStorage.clear();
    router.push("/auth/login");
  }, []);
  return (
    <>
      <div className="m-6">Loading...</div>
    </>
  );
};

Logout.guestGuard = true;
export default Logout;
