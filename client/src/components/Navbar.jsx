import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const flag = useLocation().pathname;

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <h1 className="nav-logo">
            <Link className="link" to="/">
              SUMAI誌
            </Link>
          </h1>
        </div>
        <div className="links">
          <Link className="link" to="/?cat=humanity">
            <h4>人文</h4>
          </Link>
          <Link className="link" to="/?cat=art">
            <h4>艺术</h4>
          </Link>
          <Link className="link" to="/?cat=science">
            <h4>科学</h4>
          </Link>
          <Link className="link" to="/?cat=technology">
            <h4>技术</h4>
          </Link>
          <span>{currentUser?.username}</span>
          {currentUser ? (
            <span onClick={logout}>登出</span>
          ) : (
            <Link className="link" to="/login">
              登录
            </Link>
          )}

          {currentUser && flag !== "/write" ? (
            <Link className="write" to="/write">
              <span className="link">发布文章</span>
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
