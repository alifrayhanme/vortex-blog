import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
  }),
  tagTypes: ['Like', 'Comment'],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => `/api/v1/post`,
    }),
    getLatestPosts: builder.query({
      query: (limit) => `/api/v1/post?limit=${limit}&sort=-createdAt`,
    }),
    getPost: builder.query({
      query: (id) => `/api/v1/post/${id}`,
    }),
    getPostWithCategory: builder.query({
      query: (category) => `/api/v1/post?category=${category}`,
    }),
    searchPosts: builder.query({
      query: (searchTerm) =>
        `/api/v1/post?search=${encodeURIComponent(searchTerm)}`,
    }),
    getCategories: builder.query({
      query: () => `/api/v1/post/categories`,
    }),
    getLikes: builder.query({
      query: (postId) => `/api/v1/likes/${postId}`,
      providesTags: ['Like'],
    }),
    getComments: builder.query({
      query: (postId) => `/api/v1/comments/${postId}`,
      providesTags: ['Comment'],
    }),
    addLike: builder.mutation({
      query: ({ postId, liker_id }) => ({
        url: `/api/v1/likes/${postId}`,
        method: 'POST',
        body: { liker_id },
      }),
      invalidatesTags: ['Like'],
    }),
    addComment: builder.mutation({
      query: ({ postId, commentor_id, comment }) => ({
        url: `/api/v1/comments/${postId}`,
        method: 'POST',
        body: { commentor_id, comment },
      }),
      invalidatesTags: ['Comment'],
    }),

  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useGetPostWithCategoryQuery,
  useSearchPostsQuery,
  useGetCategoriesQuery,
  useGetLatestPostsQuery,
  useGetLikesQuery,
  useGetCommentsQuery,
  useAddLikeMutation,
  useAddCommentMutation,
} = apiSlice;
