import reduxStore from "../store/store";

export const token = () => {

  const getToken = reduxStore.store.getState();

  if (getToken) {
    return getToken?.auth?.tokenData?.token
      ;
  }
  return false;
};
