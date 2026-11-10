import api from './client';

export const getCategories = async () => {
  const response = await api.get('/categories');
  return response.data;
};

export const getConvertersByCategory = async (categoryId, page = 0, size = 20) => {
  const response = await api.get(`/converters/category/${categoryId}?page=${page}&size=${size}`);
  return response.data;
};

export const getConverterDetails = async (id) => {
  const response = await api.get(`/converters/${id}`);
  return response.data;
};
