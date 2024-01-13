import { axiosInstance as axios } from "./axiosInstance";

const CREATE_NEW_USER = () => "/user/create";
const GET_USERNAME = (username) => `/user/profile/${username}`;
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

export const getUsernameByUsername = (username, jwt) =>
  axios.get(GET_USERNAME(username), {
    params: {
      Authorization: `Bearer ${jwt}`,
    },
  });

export const getUserById = (userId, jwt) =>
  axios.get(GET_USER_BY_ID(userId), {
    params: {
      Authorization: `Bearer ${jwt}`,
    },
  });

export const createNewOrder = (userBody, jwt) =>
  axios.post(CREATE_NEW_ORDER(), userBody, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

export const getOpenOrder = (userId, jwt) =>
  axios.get(GET_OPEN_ORDER(userId), {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

export const getAllItems = async () => axios.get(ALL_ITEMS());

export const addItemToCart = (itemId, jwt) =>
  axios.post(ADD_ITEM_TO_CART(), itemId, {
    headers: { Authorization: `Bearer ${jwt}` },
  });

export const removeItemFromCart = (itemId, jwt) =>
  axios.delete(DELETE_ORDER_ITEM(itemId), {
    params: { Authorization: `Bearer ${jwt}` },
  });

export const getFavoriteItems = () => axios.get(FAVORITE_ITEMS());

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

export const deleteUser = (params, jwt) =>
  axios.delete(DELETE_USER(params), {
    params: { Authorization: `Bearer ${jwt}` },
  });

export const authenticate = (params) => axios.post(AUTHENTICATE(), params);

export const testAuthenticatedApi = (params) =>
  axios.get(TEST_API(), { params });
