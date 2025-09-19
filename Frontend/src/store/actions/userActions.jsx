import { loadUser, removeUser, setAllUser } from "../reducers/userSlice";
import axios from "../../util/axios";

export const asyncLoadUser = () => async (dispatch, getState) => {
  try {
    const { data, status } = await axios.get("/auth/user");

    if (data && status === 200) {
      await dispatch(loadUser(data));
    }
  } catch (error) {
    console.log(error.response.data);
  }
};

export const asyncSendOTP = (email) => async (dispatch, getState) => {
  try {
    const { data, status } = await axios.post("/auth/verify-email", { email });
    if (data && status === 200) {
      return data.otp;
    }
  } catch (error) {
    console.log(error.response.data);
  }
};

export const asyncRegisterUser =
  ({ firstName, lastName, email, password, role, otp }) =>
  async (dispatch, getState) => {
    try {
      const { data, status } = await axios.post("/auth/register", {
        fullName: { firstName, lastName },
        email,
        password,
        role,
        otp,
      });

      if (data && status === 201) {
        await dispatch(asyncLoadUser());
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

export const asyncLoginUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const { data, status } = await axios.post("/auth/login", {
        email,
        password,
      });

      if (data && status === 200) {
        await dispatch(asyncLoadUser());
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

export const asyncLogoutUser = () => async (dispatch, getState) => {
  try {
    const { data, status } = await axios.get("/auth/logout");

    if (data && status === 200) {
      await dispatch(removeUser());
    }
  } catch (error) {
    console.log(error.response.data);
  }
};

export const asyncEditUser =
  ({ fullName, email, role, profileImage }) =>
  async (dispatch, getState) => {
    const formData = new FormData();

    formData.append("fullName", JSON.stringify(fullName));
    formData.append("email", email);
    formData.append("role", role);

    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    try {
      const { data, status } = await axios.post("/auth/edit", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data && status === 200) {
        await dispatch(asyncLoadUser());
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

export const asyncFetchAllUser = () => async (dispatch, getState) => {
  try {
    const { data, status } = await axios.get("/auth/users");

    if (data && status === 200) {
      await dispatch(setAllUser(data));
    }
  } catch (error) {
    console.log(error.response.data);
  }
};
