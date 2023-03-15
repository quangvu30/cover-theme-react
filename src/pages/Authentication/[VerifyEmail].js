import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { postVerifyEmail } from "@/helpers/backend_request";

const VerifyEmail = () => {
  const router = useRouter();
  const [status, updateStatus] = useState(false);
  const { VerifyEmail } = router.query;
  console.log(VerifyEmail);
  useEffect(() => {
    console.log(VerifyEmail);
    postVerifyEmail({ token: VerifyEmail }).then(() => {
      updateStatus(status);
    });
  }, [VerifyEmail]);

  return (
    <>
      {status ? (
        <h1>Your account is activated</h1>
      ) : (
        <h1>Some thing wrong !</h1>
      )}
    </>
  );
};

export default VerifyEmail;
