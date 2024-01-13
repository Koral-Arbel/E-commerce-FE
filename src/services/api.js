import { axiosInstance as axios } from "./axiosInstance";

const CREATE_NEW_USER = () => `/user/create`;
const GET_USERNAME = (username) => `/user/profile/${username}`;
const GET_USER_BY_ID = (userId) => `/user/getUser/${userId}`;
const CREATE_NEW_ORDER = () => `/order/create`;
const GET_OPEN_ORDER = (orderId) =>
  `/order/${orderId}/?Authorization=Bearer {}`;
const ALL_ITEMS = () => `/item/all`;
const ADD_ITEM_TO_CART = () => `/orderItem/create`;
const DELETE_ORDER_ITEM = (itemId) => `/orderItem/delete/${itemId}`;

const FAVORITE_ITEMS = () => `/favoriteItem/all`;
const ADD_FAVORITE_ITEMS = () => `/favoriteItem/itemAddFavorite/`;
const REMOVE_FAVORITE_ITEM = (itemId) => `/favoriteItem`;

const DELETE_USER = (userId) => `/user/deleteUser/${userId}`;

const AUTHENTICATE = () => `/api/public/authenticate`;

const TEST_API = () => `/api/public/test1`;

export const createNewUser = (userBody) => {
  return axios.post(CREATE_NEW_USER(), userBody);
};

export const getUsernameByUsername = (username, jwt) => {
  return axios.get(GET_USERNAME(username), {
    params: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const getUserById = (userId, jwt) => {
  return axios.get(GET_USER_BY_ID(userId), {
    params: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const createNewOrder = (userBody, jwt) => {
  return axios.post(CREATE_NEW_ORDER(), userBody, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const getCheckOpenOrder = (userId, jwt) => {
  return axios.get(GET_OPEN_ORDER(userId), {
    params: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const getAllItems = async () => {
  return axios.get(ALL_ITEMS());
};

export const addItemToCart = (bodyParam, jwt) => {
  return axios.post(ADD_ITEM_TO_CART(), bodyParam, {
    params: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const removeItemFromCart = (itemId, jwt) => {
  return axios.delete(DELETE_ORDER_ITEM(itemId), {
    params: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const getFavoriteItems = () => {
  return axios.get(FAVORITE_ITEMS());
};

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

export const deleteUser = (params, jwt) => {
  return axios.delete(DELETE_USER(params), {
    params: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const authenticate = (params) => {
  return axios.post(AUTHENTICATE(), params);
};

export const testAuthenticatedApi = (params) => {
  return axios.get(TEST_API(), { params: params });
};
