import axios from "axios";

//const baseUrl = "http://localhost:5000/api";
const API = axios.create({ baseURL: "https://instaverse-api.onrender.com" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("user")).token
    }`;
  }

  return req;
});

export const fetchPosts = () => API.get("/api/posts");

export const createPost = (newPost) => API.post("/api/posts", newPost);

export const updatePost = (id, updatedPost) =>
  API.put(`/posts/${id}`, updatedPost);

export const deletePost = (id) => API.delete(`/api/posts/${id}`);

//"application/x-www-form-urlencoded"

// {
//   headers: { "Content-Type": "application/x-www-form-urlencoded" },
// }

export const likePost = (id) => API.put(`/api/posts/${id}/likePost`);

export const signIn = (formData) => API.post(`/api/user/login`, formData);

export const signUp = (formData) => API.post(`/api/user/signup`, formData);
