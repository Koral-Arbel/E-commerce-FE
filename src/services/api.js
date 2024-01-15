import { axiosInstance as axios } from "./axiosInstance";

const CREATE_NEW_USER = () => "/api/public/user/create";
const GET_USER_PROFILE = (username) => `/api/public/user/findUser/${username}`;
const GET_USER_BY_ID = (userId) => `/api/public/user/getUser/${userId}`;
const CREATE_NEW_ORDER = () => "/order/create";
const GET_OPEN_ORDER = (userId) => `/order/${userId}/statusOrder`;
const ALL_ITEMS = () => "/item/all";
const ADD_ITEM_TO_CART = () => "/orderItem/create";
const DELETE_ORDER_ITEM = (itemId) => `/orderItem/delete/${itemId}`;

const FAVORITE_ITEMS = () => "/favoriteItem/all";
const ADD_FAVORITE_ITEMS = () => "/favoriteItem/itemAddFavorite/";
const REMOVE_FAVORITE_ITEM = (itemId) => `/favoriteItem/delete/${itemId}`;

const DELETE_USER = (userId) => `/api/public/user/deleteUser/${userId}`;

const AUTHENTICATE = () => "/api/public/authenticate";
const TEST_API = () => "/api/public/test1";

export const createNewUser = (userBody) =>
  axios.post(CREATE_NEW_USER(), userBody);

export const getProfileUser = async (username) => {
  try {
    const response = await axios.get(GET_USER_PROFILE(username));
    return response.data;
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

export const createNewOrder = async (userBody, queryParams) => {
  try {
    const response = await axios.post(CREATE_NEW_ORDER(), userBody, {
      params: queryParams,
    });
    return response.data;
  } catch (error) {
    console.log("Error Create New Order : " + error);
    throw error;
  }
};

export const getOpenOrder = async (userId, queryParams) => {
  try {
    const response = await axios.get(GET_OPEN_ORDER(userId), {
      params: queryParams,
    });
    return response.data;
  } catch (error) {
    console.log("Error get open order for user : " + error);
    throw error;
  }
};

export const getAllItems = async () => axios.get(ALL_ITEMS());

export const addItemToCart = async (userBody, queryParams) => {
  try {
    const response = await axios.post(ADD_ITEM_TO_CART(), userBody, {
      params: queryParams,
    });
    return response.data;
  } catch (error) {
    console.log("Error add item to cart : " + error);
    throw error;
  }
};

export const deleteOrderItem = (itemId, queryParams) => {
  return axios.delete(DELETE_ORDER_ITEM(itemId), {
    params: queryParams,
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

export const removeFavoriteItem = (wishlistProductId, jwt) => {
  return axios.delete(REMOVE_FAVORITE_ITEM(wishlistProductId), {
    params: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const deleteUser = (userId, queryParams) => {
  return axios.delete(DELETE_USER(userId), {
    params: queryParams,
  });
};

export const authenticate = (userBody) => {
  return axios.post(AUTHENTICATE(), userBody);
};

export const testAuthenticatedApi = (params) =>
  axios.get(TEST_API(), { params });
