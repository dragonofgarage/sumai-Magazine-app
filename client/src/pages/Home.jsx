import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const cat = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="home">
      <div className="posts">
        {posts.length !== 0 ? (
          posts.map((post) => (
            <div className="post" key={post.id}>
              <div className="img">
                {post.img ? (
                  <img src={`./upload/${post.img}`} alt="" />
                ) : (
                  <div className="bg">
                    <p>{post.title[0]}...</p>
                  </div>
                )}
              </div>
              <div className="content">
                <Link className="link" to={`/post/${post.id}`}>
                  <h1>{post.title}</h1>
                </Link>
                <p>
                  {getText(
                    post.desc.length > 200
                      ? post.desc.substring(0, 200).concat("...")
                      : post.desc
                  )}
                </p>
              </div>
            </div>
          ))
        ) : (
          <h1>该类别下暂时没有文章。</h1>
        )}
      </div>
    </div>
  );
};

export default Home;
