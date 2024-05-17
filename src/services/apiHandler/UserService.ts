import axios from "@/services/CustomAxios";

const signUp = async (data: {
  email: string;
  password: string;
  fullName: string;
}) => {
  const { email, password, fullName } = data;
  try {
    const response = await axios.post(
      "user/register",
      {
        email: email,
        password: password,
        fullName: fullName,
      },
      { withCredentials: true }
    );
    if (response) {
      return response;
    }
  } catch (error) {
    return (error as any).data;
  }
};

const login = async (data: { email: string; password: string }) => {
  const { email, password } = data;
  try {
    const response = await axios.post(
      "user/login",
      {
        email: email,
        password: password,
      },
      { withCredentials: true }
    );
    if (response) {
      return response;
    }
  } catch (error) {
    return (error as any).data;
  }
};

export { signUp, login };
