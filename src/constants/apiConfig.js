const baseHeader = {
  "Content-Type": "application/json",
};

const multipartFormHeader = {
  "Content-Type": "multipart/form-data",
};

const apiConfig = {
  productCategory: {
    getAll: {
      path: "v1/product-category/get-all",
      method: "GET",
      headers: baseHeader,
    },
  },
  product: {
    getListByCategory: {
      path: "v1/product/get-by-category",
      method: "GET",
      headers: baseHeader,
    },
    getById: {
      path: "v1/product/get-details",
      method: "GET",
      headers: baseHeader,
    },
  },
  new: {
    getNew: {
      path: "v1/news/list-news",
      method: "GET",
      headers: baseHeader,
    },
    categoryAutoComplete: {
      path: "v1/category/auto-complete",
      method: "GET",
      headers: baseHeader,
    },
    getById: {
      path: "v1/news/get-news",
      method: "GET",
      headers: baseHeader,
    },
  },
  account: {
    login: {
      path: "v1/account/login",
      method: "POST",
      headers: baseHeader,
    },
    register: {
      path: "v1/customer/register",
      method: "POST",
      headers: baseHeader,
    },
    getProfile: {
      path: "v1/customer/profile",
      method: "GET",
      headers: baseHeader,
    },
    requestForgetPass: {
      path: "v1/account/request_forget_password",
      method: "POST",
      headers: baseHeader,
    },
    forgetPassword: {
      path: "v1/account/forget_password",
      method: "POST",
      headers: baseHeader,
    },
  },
  order: {
    create: {
      path: "v1/order/create",
      method: "POST",
      headers: baseHeader,
    },
    getList: {
      path: "v1/order/list",
      method: "GET",
      headers: baseHeader,
    },
    getById: {
      path: "v1/order/get",
      method: "GET",
      headers: baseHeader,
    },
  },
  location: {
    getList: {
      path: "v1/locations/list",
      method: "GET",
      headers: baseHeader,
    },
  },
  profile: {
    getListAddress: {
      path: "v1/customer/address/list",
      method: "GET",
      headers: baseHeader,
    },
    createAddress: {
      path: "v1/customer/address/create",
      method: "POST",
      headers: baseHeader,
    },
    getAddressById: {
      path: "v1/customer/address/get",
      method: "GET",
      headers: baseHeader,
    },
    updateAddress: {
      path: "v1/customer/address/update",
      method: "PUT",
      headers: baseHeader,
    },
    deleteAddress: {
      path: "v1/customer/address/delete",
      method: "DELETE",
      headers: baseHeader,
    },
    getProfile:{
      path: "v1/customer/profile",
      method: "GET",
      headers: baseHeader,
    },
    profileUpdate:{
      path: "v1/account/update_profile",
      method: "PUT",
      headers: baseHeader,
    },
  },
};

export default apiConfig;
