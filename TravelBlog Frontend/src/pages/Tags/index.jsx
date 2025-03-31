import React from 'react'
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { Post } from '../../components/Post';
import { TagsBlock } from '../../components/TagsBlock';
import { fetchTagPage, fetchTags } from '../../redux/slices/posts';

export const TagPage = () => {
  const dispatch = useDispatch();
  const {posts, tags } = useSelector(state => state.posts);
  const userData = useSelector(state => state.auth.data);
  const isPostsLoading = posts.status === 'loading'; 
  const isTagsLoading = posts.status === 'loading';
  const tag = window.location.toString().substring(26);
  console.log(tag)
  React.useEffect(() => {
    dispatch(fetchTagPage(tag))
  }, [dispatch, tag]);
  React.useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  return (
    <>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(10)] : posts.items).map((obj, index) => 
          isPostsLoading ? (
          <Post key={index} isLoading={true}/>) : (
            <Post
              id={obj._id}
              title={obj.title}
              imageUrl={obj.imageUrl ? `http://localhost:4300${obj.imageUrl}` : 'http://localhost:4300/uploads/error.png'}
              user={obj.user}
              createdAt={obj.createdAt}
              viewsCount={obj.viewsCount}
              tags={obj.tags}
              isEditable={userData?._id === obj.user._id}
            />
          )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
        </Grid>
      </Grid>
    </>
  );
};
