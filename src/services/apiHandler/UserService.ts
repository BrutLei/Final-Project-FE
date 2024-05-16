import axios from "../CustomAxios";

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

export { signUp };
