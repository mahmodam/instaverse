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

export const fetchPosts = () => API.get("/posts");

export const createPost = (newPost) => API.post("/posts", newPost);

export const updatePost = (id, updatedPost) =>
  API.put(`/posts/${id}`, updatedPost);

export const deletePost = (id) => API.delete(`/posts/${id}`);

//"application/x-www-form-urlencoded"

// {
//   headers: { "Content-Type": "application/x-www-form-urlencoded" },
// }

export const likePost = (id) => API.put(`/posts/${id}/likePost`);

export const signIn = (formData) => API.post(`/user/login`, formData);

export const signUp = (formData) => API.post(`/user/signup`, formData);
