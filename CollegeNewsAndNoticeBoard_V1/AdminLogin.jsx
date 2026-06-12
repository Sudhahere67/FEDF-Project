// src/components/AdminLogin.jsx

import React, {
  useState,
  useCallback,
} from "react";

import { useNavigate } from "react-router-dom";

export default function AdminLogin({
  onLogin,
}) {
  const navigate = useNavigate();

  const [credentials, setCredentials] =
    useState({
      username: "",
      password: "",
    });

  const [error, setError] =
    useState("");

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      setCredentials((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      setError("");

      const adminUser =
        import.meta.env
          .VITE_ADMIN_USERNAME;

      const adminPass =
        import.meta.env
          .VITE_ADMIN_PASSWORD;

      if (
        credentials.username ===
          adminUser &&
        credentials.password ===
          adminPass
      ) {
        onLogin(true);

        navigate("/");
      } else {
        setError(
          "Invalid Credentials!"
        );
      }
    },
    [credentials, onLogin, navigate]
  );

  return (
  <div className="admin-login-page">
    <div className="admin-login-card">

      <h2 className="admin-login-title">
        KLH University Admin Access
      </h2>

      <form onSubmit={handleSubmit}>

        <div className="admin-login-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="admin-login-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>

        {error && (
          <div className="admin-error">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="admin-login-btn"
        >
          Login as Admin
        </button>

      </form>
    </div>
  </div>
);
}