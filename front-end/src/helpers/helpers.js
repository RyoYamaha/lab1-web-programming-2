import axios from 'axios';
import Vue from 'vue';
import VueFlashMessage from 'vue-flash-message';
import 'vue-flash-message/dist/vue-flash-message.min.css';

Vue.use(VueFlashMessage);

// 1. SỬA BASE URL: Bỏ chữ 'words/' đi, chỉ để về gốc server
const baseURL = 'http://localhost:3000/'; 

// Tự động thêm Token vào mọi yêu cầu gửi đi
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const handleError = fn => (...params) =>
  fn(...params).catch(error => {
    console.error(error);
  });

export const api = {
  // --- CÁC HÀM VỀ TỪ VỰNG (Phải thêm chữ 'words' vào đường dẫn) ---
  
  getWord: handleError(async id => {
    // baseURL + 'words/' + id
    const res = await axios.get(baseURL + 'words/' + id);
    return res.data;
  }),
  
  getWords: handleError(async () => {
    // baseURL + 'words'
    const res = await axios.get(baseURL + 'words');
    return res.data;
  }),
  
  deleteWord: handleError(async id => {
    const res = await axios.delete(baseURL + 'words/' + id);
    return res.data;
  }),
  
  createWord: handleError(async payload => {
    const res = await axios.post(baseURL + 'words', payload);
    return res.data;
  }),
  
  updateWord: handleError(async payload => {
    const res = await axios.put(baseURL + 'words/' + payload._id, payload);
    return res.data;
  }),
  
  searchWord: handleError(async query => {
    // baseURL + 'words/search'
    const res = await axios.get(`${baseURL}words/search?q=${encodeURIComponent(query)}`);
    return res.data;
  }),

  // --- CÁC HÀM VỀ AUTH (Giữ nguyên, giờ sẽ chạy đúng) ---
  // Kết quả sẽ là: http://localhost:3000/auth/register -> CHUẨN
  register: (userInfo) => {
    return axios.post(baseURL + 'auth/register', userInfo).then(res => res.data);
  },
  
  login: (credentials) => {
    return axios.post(baseURL + 'auth/login', credentials).then(res => res.data);
  }
};