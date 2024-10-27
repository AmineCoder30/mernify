import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  const profile = localStorage.getItem("profile");
  if (profile) {
    const token = JSON.parse(profile).token;
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

//auth api
export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = async (formData) => {
  const form = new FormData();
  for (const key in formData) {
    form.append(key, formData[key]);
  }

  // Return the result of the API call
  return await API.post("/user/signup", form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const getUsers = () => API.get("/user/getall");

//messages api
export const fetchMessages = async (id) => await API.get(`/messages/${id}`);
export const createMessage = async (newMessage) => {
  return await API.post("/messages", newMessage, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const deleteMessages = async (id) =>
  await API.delete(`/messages/deleteMessages/${id}`);

//conversations api
export const fetchConversations = (id) =>
  API.get(`/conversations/getall/${id}`);
export const createConversation = (newConversation) =>
  API.post("/conversations/create", newConversation);
export const removeConversation = (conversation_id) =>
  API.delete(`/conversations/remove`, conversation_id);
