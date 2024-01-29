import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

function Google() {
  const history = useNavigate();

  return (
    <div>
      <GoogleOAuthProvider clientId={process.env.GOOGLE_CLINT_ID}>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            
            localStorage.setItem("login", credentialResponse.credential);
            history("/auth/form");
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </GoogleOAuthProvider>
    </div>
  );
}

export default Google;
