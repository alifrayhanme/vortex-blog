import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://vortex-blog.vercel.app",
    baseUrl: "http://localhost:8000",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Like", "Comment", "Auth", "Post", "User"],
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
      providesTags: ["Like"],
    }),
    getComments: builder.query({
      query: (postId) => `/api/v1/comments/${postId}`,
      providesTags: ["Comment"],
    }),
    addLike: builder.mutation({
      query: ({ postId, liker_id }) => ({
        url: `/api/v1/likes/${postId}`,
        method: "POST",
        body: { liker_id },
      }),
      invalidatesTags: ["Like"],
    }),
    addComment: builder.mutation({
      query: ({ postId, commentor_id, comment }) => ({
        url: `/api/v1/comments/${postId}`,
        method: "POST",
        body: { commentor_id, comment },
      }),
      invalidatesTags: ["Comment"],
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: "/api/v1/auth/register",
        method: "POST",
        body: userData,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/api/v1/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/api/v1/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
    getUserPosts: builder.query({
      query: (userId) => `/api/v1/post/user/${userId}`,
      providesTags: ["Post"],
    }),
    deletePost: builder.mutation({
      query: (postId) => ({
        url: `/api/v1/post/${postId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),
    getAllUsers: builder.query({
      query: () => "/api/v1/users",
      providesTags: ["User"],
    }),
    updateUserStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/api/v1/users/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/api/v1/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    uploadImage: builder.mutation({
      query: (formData) => ({
        url: "/api/v1/upload-image",
        method: "POST",
        body: formData,
      }),
    }),
    createPost: builder.mutation({
      query: (postData) => ({
        url: "/api/v1/post/create",
        method: "POST",
        body: postData,
      }),
      invalidatesTags: ["Post"],
    }),
    updatePost: builder.mutation({
      query: ({ id, ...postData }) => ({
        url: `/api/v1/post/${id}`,
        method: "PUT",
        body: postData,
      }),
      invalidatesTags: ["Post"],
    }),
    updateUser: builder.mutation({
      query: ({ id, ...userData }) => ({
        url: `/api/v1/user/${id}`,
        method: "PUT",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),
    getUserStats: builder.query({
      query: (userId) => `/api/v1/users/${userId}/stats`,
      providesTags: ["User"],
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
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetUserPostsQuery,
  useDeletePostMutation,
  useGetAllUsersQuery,
  useUpdateUserStatusMutation,
  useDeleteUserMutation,
  useUploadImageMutation,
  useCreatePostMutation,
  useUpdatePostMutation,
  useUpdateUserMutation,
  useGetUserStatsQuery,
} = apiSlice;
