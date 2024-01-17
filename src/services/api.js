import { axiosInstance as axios } from "./axiosInstance";

const SEARCH_TERM = () => `/item/searchItems`;
const CREATE_NEW_USER = () => `/api/public/user/create`;
const GET_USER_PROFILE = (username) => `/api/public/user/findUser/${username}`;
const GET_USER_BY_ID = (userId) => `/api/public/user/getUser/${userId}`;
const CREATE_NEW_ORDER = () => `/order/create/`;
const ORDER_TEMP = (userId) => `order/orderTemp/${userId}`;
const GET_OPEN_ORDER = (userId) => `/order/openOrder/${userId}`;
const CHECKOUT_ORDER = (orderId) => `/order/processPayment/${orderId}`;

const ALL_ITEMS = () => `/item/all`;
const ADD_ITEM_TO_CART = () => `/orderItem/create/`;
const DELETE_ORDER_ITEM = (itemId) => `/orderItem/delete/${itemId}`;

const FAVORITE_ITEMS = (userId) => `/favoriteItem/all/${userId}`;
const ADD_FAVORITE_ITEMS = () => `/favoriteItem/itemAddFavorite/`;
const REMOVE_FAVORITE_ITEM = (itemId) => `/favoriteItem/delete/${itemId}`;

const DELETE_USER = (userId) => `/api/public/user/deleteUser/${userId}`;

const AUTHENTICATE = () => `/api/public/authenticate`;
const TEST_API = () => `/api/public/test1`;

export const searchTerm = async (title) =>
  axios.get(SEARCH_TERM(), { params: { title } });

export const createNewUser = (userBody) =>
  axios.post(CREATE_NEW_USER(), userBody);

export const getProfileUser = async (username) => {
  try {
    const response = await axios.get(GET_USER_PROFILE(username));
    const userProfile = { ...response.data, userId: response.data.userId };
    return userProfile;
  } catch (error) {
    console.error("Error fetching user profile: ", error);
    throw error;
  }
};

export const getUserById = (userId, jwt) =>
  axios.get(GET_USER_BY_ID(userId), {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

export const createNewOrder = (bodyParam, jwt) => {
  return axios.post(CREATE_NEW_ORDER(), bodyParam, {
    params: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const getOrderTemp = (userId, jwt) => {
  return axios.get(ORDER_TEMP(userId), {
    params: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const getOpenOrder = (userId, jwt) => {
  return axios.get(GET_OPEN_ORDER(userId), {
    params: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const checkOutOrder = (orderId, bodyParam, jwt) => {
  return axios.post(CHECKOUT_ORDER(orderId), bodyParam, {
    params: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const getAllItems = async () => axios.get(ALL_ITEMS());

export const addItemToCart = (bodyParam, jwt) => {
  return axios.post(ADD_ITEM_TO_CART(), bodyParam, {
    params: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const deleteOrderItem = (itemId, jwt) => {
  return axios.delete(DELETE_ORDER_ITEM(itemId), {
    params: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const getFavoriteItems = (userId, token) =>
  axios.get(FAVORITE_ITEMS(userId), {
    params: { Authorization: `Bearer ${token}` },
  });

export const addFavoriteItem = (bodyParam, jwt) => {
  return axios.post(ADD_FAVORITE_ITEMS(), bodyParam, {
    params: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const removeFavoriteItem = (favoriteItemId, jwt) => {
  return axios.delete(REMOVE_FAVORITE_ITEM(favoriteItemId), {
    params: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const deleteUser = (userId, jwt) => {
  return axios.delete(DELETE_USER(userId), {
    params: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const authenticate = (userBody) => {
  return axios.post(AUTHENTICATE(), userBody);
};

export const testAuthenticatedApi = (params) =>
  axios.get(TEST_API(), { params });
