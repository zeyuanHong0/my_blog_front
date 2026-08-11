import { useState } from "react";

import CheckEmailForm from "./checkEmailForm";
import NewPasswordForm from "./newPasswordForm";

const ForgetPasswordForm = () => {
  const [showCheckEmailForm, setShowCheckEmailForm] = useState(true);
  const [resetToken, setResetToken] = useState(""); // 用于存储重置密码的令牌

  return (
    <>
      {showCheckEmailForm ? (
        <CheckEmailForm
          onVerified={(token: string) => {
            setResetToken(token);
            setShowCheckEmailForm(false);
          }}
        />
      ) : (
        <NewPasswordForm resetToken={resetToken} />
      )}
    </>
  );
};

export default ForgetPasswordForm;
