import axios from "axios";

export const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// this is going to be the function which we will use to fetch data from api
export const getPostsPage = async (pageParams = 1, options = {}) => {
  const response = await api.get(`/posts?_page=${pageParams}`, options);
  return response.data;
};
