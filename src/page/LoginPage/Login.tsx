import React from "react";
import LoginComponent from "../../components/LoginComponent/LoginComponent";

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
      <LoginComponent />
    </div>
  );
};

export default LoginPage;