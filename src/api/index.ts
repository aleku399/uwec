import axios, { AxiosRequestConfig, AxiosHeaders } from "axios";
import { UserData, Credentials, Location, Review } from "@/types";

const instance = axios.create({
  baseURL: "http://localhost:3001/api/",
});

instance.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem("token");
    if (token) {
      if (!config.headers) {
        config.headers = {};
      }
      (config.headers as AxiosHeaders).set('Authorization', `Bearer ${token}`);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const registerUser = async (userData: UserData) => {
  try {
    const response = await instance.post('/register', userData);
    return response.data;
  } catch (error) {
    console.error('Error in registerUser:', error);
    throw error;
  }
};

export const loginUser = async (credentials: Credentials) => {
  try {
    const response = await instance.post('/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Error in loginUser:', error);
    throw error;
  }
};

export const fetchLocations = async (): Promise<Location[]> => {
  try {
    const response = await instance.get('/locations');
    return response.data;
  } catch (error) {
    console.error('Error in fetchLocations:', error);
    throw error;
  }
};

export const fetchReviews = async (): Promise<any> => {
  try {
    const response = await instance.get('/reviews');
    return response.data;
  } catch (error) {
    console.error('Error in fetchReviews:', error);
    throw error;
  }
};

export const createReview = async (reviewData: Review) => {
  try {
    const response = await instance.post('/reviews', reviewData);
    return response.data;
  } catch (error) {
    console.error('Error in createReview:', error);
    throw error;
  }
};

export default instance;
