import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
import { AuthContext } from "../context/authContext";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <div className="login-page">
      <h1>登录</h1>
      <form>
        <input
          required
          type="text"
          placeholder="用户名"
          name="username"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="密码"
          name="password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>登录</button>
        {err && <p>{err}</p>}
        <span>
          还没拥有账户？请点击这里<Link to="/register">注册</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
