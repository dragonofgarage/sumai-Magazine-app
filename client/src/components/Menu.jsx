// import axios from "axios";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Menu = ({ cat }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/?cat=${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  return (
    <div className="menu">
      <h1>其它你可能会喜欢的文章</h1>
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <div className="img">
            {post.img ? (
              <img src={`../upload/${post?.img}`} alt="" />
            ) : (
              <div className="bg">
                <p>{post.title[0]}...</p>
              </div>
            )}
          </div>
          <h2>{post.title}</h2>
          <button>阅读更多&gt;&gt;</button>
        </div>
      ))}
    </div>
  );
};

export default Menu;
