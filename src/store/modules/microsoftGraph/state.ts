//state, interfaces, types used for this module

import { useConfig } from '@/lib/microsoftGraph/config';
import { UserAgentApplication } from "msal";

export type AuthType = {
  user: User;
  isAuthenticated: boolean;
  error: object | undefined | null;
  scopes: Array<string>;
  accessToken: string;
  spinner: SpinnerType;
}
export type SpinnerType = {
  login: boolean;
}

export type UserAgentApplicationType = {
  userAgentApplication: UserAgentApplication;
}

export type GraphType = {
  auth: Auth;
  userAgentApplication: UserAgentApplication;
}

export interface Spinner {
  login: boolean;
}

export interface User {
  displayName: string;
  mail: string;
}

export interface Auth {
  user: User;
  isAuthenticated: boolean;
  error: object | undefined | null;
  scopes: Array<string>;
  accessToken: string;
  spinner: Spinner;
}

export interface State {
  auth: Auth;
  userAgentApplication: UserAgentApplication;
}

export const microsoftGraphState: State = {
  auth: {
    user: {
      displayName: "",
      mail: "",
    },
    isAuthenticated: false,
    error: null,
    scopes: ["user.read", "calendars.read"],
    accessToken: "",
    spinner: {
      login: false
    }
  },
  userAgentApplication: new UserAgentApplication({
    auth: {
      clientId: "fab26eb8-2dd4-452e-a6f3-576ae15617cd",
      redirectUri: "http://localhost:8080"
    },
    cache: {
      cacheLocation: "localStorage",
      storeAuthStateInCookie: true
    }
  })
}

export default microsoftGraphState;