import { axiosInstance as axios } from "./axiosInstance";

const CREATE_NEW_USER = () => `/user/create`;
const ALL_ITEMS = () => `/api/public/item/all`;
const ADD_ITEM_TO_CART = () => "/orderItem/create";
const AUTHENTICATE = () => `/api/public/authenticate`;

const TEST_API = () => `/api/public/test1`;

export const createNewUser = (params) => {
  return axios.post(CREATE_NEW_USER(), params);
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

export const authenticate = (params) => {
  return axios.post(AUTHENTICATE(), params);
};

export const testAuthenticatedApi = (params) => {
  return axios.get(TEST_API(), { params: params });
};
