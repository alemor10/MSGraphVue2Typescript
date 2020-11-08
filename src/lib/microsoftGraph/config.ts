import {
  useMicrosoftGraphGetters,
} from "@/store";



// this can be moved somewhere else but this is where env variables are read

export const useConfig = () => {
  const REDIRECT_URI = process.env.REDIRECT_URI
  const AUTH_ID = process.env.AUTH_ID

  return {
    REDIRECT_URI,
    AUTH_ID,
  };
};
