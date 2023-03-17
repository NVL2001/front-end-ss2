import { api } from "./api";

const getListCategoryAPI = () => {
  return api("GET", "category/get-categories", null);
};

// export
export { getListCategoryAPI };
