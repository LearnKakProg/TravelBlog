import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const { data } = await axios.get('/posts');
    return data;
});

export const fetchTagPage = createAsyncThunk('/tag/fetchTagPage', async (tags) => {
    const { data } = await axios.get(`/tag/${tags}`);
    return data;
});

export const fetchTags = createAsyncThunk('tags/fetchTags', async () => {
    const { data } = await axios.get('/tags');
    return data;
});

export const fetchDeletePost = createAsyncThunk('posts/fetchDeletePost', async (id) => {
    axios.delete(`/posts/${id}`);
});

const initialState = {
        posts: {
            items: [],
            status: 'loading',
    },
        tags: {
            items: [],
            status: 'loading',
    },
};
const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers:{
        [fetchPosts.pending]: (state) => {
            state.posts.items = [];
            state.posts.status = 'loading';
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts.items = action.payload;
            state.posts.status = 'loaded';
        },
        [fetchPosts.rejected]: (state) => {
            state.posts.items = [];
            state.posts.status = 'error';
        },

        [fetchTagPage.pending]: (state) => {
            state.posts.items = [];
            state.posts.status = 'loading';
        },
        [fetchTagPage.fulfilled]: (state, action) => {
            state.posts.items = action.payload;
            state.posts.status = 'loaded';
        },
        [fetchTagPage.rejected]: (state) => {
            state.posts.items = [];
            state.posts.status = 'error';
        },

        [fetchTags.pending]: (state) => {
            state.tags.items = [];
            state.tags.status = 'loading';
        },
        [fetchTags.fulfilled]: (state, action) => {
            state.tags.items = action.payload;
            state.tags.status = 'loaded';
        },
        [fetchTags.rejected]: (state) => {
            state.tags.items = [];
            state.tags.status = 'error';
        },


        [fetchDeletePost.pending]: (state, action) => {
            state.posts.items = state.posts.items.filter(obj => obj._id !== action.meta.arg);//можно и просто страницу обновить
        },
        [fetchDeletePost.rejected]: (state) => {
            state.posts.status = 'error';
        },
    },
});

export const postsReducer = postsSlice.reducer;