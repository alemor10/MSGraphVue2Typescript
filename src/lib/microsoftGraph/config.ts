import {
  useMicrosoftGraphGetters,
} from "@/store";

export const useGraph = () => {
  const auth = useMicrosoftGraphGetters(["getAuth"]).getAuth.value
  const userAgentApplication = useMicrosoftGraphGetters(["getUserAgentApplication"]).getUserAgentApplication.value

  return {
    auth,
    userAgentApplication
  };
};

export const useConfig = () => {
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ID = "fab26eb8-2dd4-452e-a6f3-576ae15617cd";

  return {
    REDIRECT_URI,
    AUTH_ID,
  };
};
