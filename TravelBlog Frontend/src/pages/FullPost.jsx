import React from "react";
import ReactMarkdown from 'react-markdown'
import { Post } from "../components/Post";
import { useParams } from "react-router-dom";
import axios from "../axios";
export const FullPost = () => {
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const {id} = useParams();

  React.useEffect(() => {
    axios
    .get(`/posts/${id}`)
    .then ((res) => {setData(res.data);
      setLoading(false);
    }).catch ((err) =>{
      console.warn(err);
      alert('Ошибка FP');
    });
  }, [id]);

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  };

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `http://localhost:4300${data.imageUrl}` : 'http://localhost:4300/uploads/error.png'}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost
      >
      <ReactMarkdown children={data.text}/>
      </Post>
    </>
  );
};
