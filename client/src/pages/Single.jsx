import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import moment from "moment";

const Single = () => {
  const [post, setPost] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${postId}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="single">
      <div className="content">
        {post.img ? <img src={`../upload/${post?.img}`} alt="" /> : ""}
        <div className="user">
          {post.userImg ? (
            <img src={post.userImg} alt="" />
          ) : (
            <h4 className="avatar">{post.username && post.username[0]}</h4>
          )}
          <div className="info">
            <span>{post.username}</span>
            <p>发布于 {moment(post.date).fromNow()}</p>
          </div>
          {currentUser && currentUser.username === post.username && (
            <div className="edit">
              <Link className="link" to={`/write?edit=2`} state={post}>
                <h4>编辑</h4>
              </Link>
              <h4 onClick={handleDelete}>删除</h4>
            </div>
          )}
        </div>
        <h1>{post.title}</h1>
        <p>{getText(post.desc)}</p>
      </div>
      <Menu cat={post.cat} />
    </div>
  );
};

export default Single;
