import { axiosInstance as axios } from "./axiosInstance";

const CREATE_NEW_USER = () => "/user/create";
const GET_USER_PROFILE = (username) => `/user/profile/${username}`;
const GET_USER_BY_ID = (userId) => `/user/getUser/${userId}`;
const CREATE_NEW_ORDER = () => "/order/create";
const GET_OPEN_ORDER = (userId) => `/order/${userId}/statusOrder`;
const ALL_ITEMS = () => "/item/all";
const ADD_ITEM_TO_CART = () => "/orderItem/create";
const DELETE_ORDER_ITEM = (itemId) => `/orderItem/delete/${itemId}`;

const FAVORITE_ITEMS = () => "/favoriteItem/all";
const ADD_FAVORITE_ITEMS = () => "/favoriteItem/itemAddFavorite/";
const REMOVE_FAVORITE_ITEM = (itemId) => `/favoriteItem`;

const DELETE_USER = (userId) => `/user/deleteUser/${userId}`;

const AUTHENTICATE = () => "/api/public/authenticate";
const TEST_API = () => "/api/public/test1";

export const createNewUser = (userBody) =>
  axios.post(CREATE_NEW_USER(), userBody);

export const getProfileUser = async (username) => {
  try {
    const response = await axios.get(GET_USER_PROFILE(username));
    return response.data;
  } catch (error) {
    console.log("Error Get User Id : " + error);
    throw error;
  }
};

export const getUserById = (userId, jwt) =>
  axios.get(GET_USER_BY_ID(userId), {
    params: {
      Authorization: `Bearer ${jwt}`,
    },
  });

export const createNewOrder = (userBody, jwt) =>
  axios.post(CREATE_NEW_ORDER(), userBody, {
    params: {
      Authorization: `Bearer ${jwt}`,
    },
  });

export const getOpenOrder = (userId, jwt) =>
  axios.get(GET_OPEN_ORDER(userId), {
    params: {
      Authorization: `Bearer ${jwt}`,
    },
  });

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

export const getAllFavoriteItems = async (userId, queryParams) => {
  try {
    const response = await axios.get(FAVORITE_ITEMS(userId) + queryParams);
    return response.data;
  } catch (error) {
    console.error("Error fetching all favorite items: ", error);
    throw error;
  }
};

export const getFavoriteItems = async (auth) => {
  try {
    const userResponse = await getProfileUser(auth.username);
    const userId = userResponse.userId;
    const queryParams = `?Authorization=Bearer ${auth.token}`;
    const favoriteItems = await getAllFavoriteItems(userId, queryParams);
    return favoriteItems;
  } catch (error) {
    console.error("Error fetching favorite items: ", error);
    throw error;
  }
};

export const addFavoriteItem = (itemId, jwt) =>
  axios.post(
    ADD_FAVORITE_ITEMS(),
    { itemId },
    { params: { Authorization: `Bearer ${jwt}` } }
  );

export const removeFavoriteItem = (favoriteItemId, jwt) =>
  axios.delete(REMOVE_FAVORITE_ITEM(favoriteItemId), {
    params: { Authorization: `Bearer ${jwt}` },
  });

export const deleteUser = (userId, jwt) => {
  return axios.delete(DELETE_USER(userId), {
    params: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const authenticate = (params) => {
  return axios.post(AUTHENTICATE(), params);
};

export const testAuthenticatedApi = (params) =>
  axios.get(TEST_API(), { params });
