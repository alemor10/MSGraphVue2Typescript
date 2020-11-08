import {
  useMicrosoftGraphGetters,
} from "@/store";



// this can be moved somewhere else but this is where env variables are read

export const useConfig = () => {
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ID = "fab26eb8-2dd4-452e-a6f3-576ae15617cd";

  return {
    REDIRECT_URI,
    AUTH_ID,
  };
};
