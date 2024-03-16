import axios from 'axios';

const API_BASE_URL = 'https://your-api-base-url.com/users';

export const addUser = async (name: string, email: string) => {
  const response = await axios.post(API_BASE_URL, { name, email });
  return response.data;
};

export const updateUser = async (id: number, name: string, email: string) => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, { name, email });
  return response.data;
};

export const deleteUser = async (id: number) => {
  const response = await axios.delete(`${API_BASE_URL}/${id}`);
  return response.data;
};
