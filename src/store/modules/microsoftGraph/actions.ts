import { Action, ActionContext, ActionTree } from "vuex";
import { AuthResponse } from "msal";

import { RootState } from "@/store/state";
import State from "./state";
import { ActionTypes } from "@/store/modules/microsoftGraph/actions-types";
import { MutationTypes } from "@/store/modules/microsoftGraph/mutations-types";

import { getUserDetails } from "@/lib/microsoftGraph/graphService";
import { getAccessToken } from "@/lib/microsoftGraph/authService";
import microsoftGraph from ".";
import { GraphUserDetails } from "@/lib/microsoftGraph/graphTypes";
import { useConfig } from "@/lib/microsoftGraph/config";

type MicrosoftGraphActionCtx = ActionContext<typeof State, RootState>;

export interface MicrosoftGraphActions
  extends ActionTree<typeof State, RootState> {
  setAccessToken: (
    ctx: MicrosoftGraphActionCtx
  ) => Promise<void>;
  [ActionTypes.GET_USER_PROFILE]: (
    ctx: MicrosoftGraphActionCtx
  ) => Promise<void>;
  userAgentLogin: (
    ctx: MicrosoftGraphActionCtx
  ) => Promise<void>;
}

export const actions: MicrosoftGraphActions = {
  async setAccessToken({ commit, rootState }) {
    if (rootState.microsoftGraph.auth.accessToken) {
      new Promise<GraphUserDetails>((resolve) => {
        resolve(getUserDetails(rootState.microsoftGraph.auth.accessToken));
      })
        .then((user) => {
          commit(MutationTypes.GET_USER_PROFILE_SUCCESS, user);
        })
        .catch((error) => {
          commit(MutationTypes.GET_USER_PROFILE_ERROR, error);
        });
    }
  },

  async [ActionTypes.GET_USER_PROFILE]({ commit, rootState }) {
    commit(MutationTypes.SET_SPINNER_LOGIN);
    if (rootState.microsoftGraph.auth.accessToken) {
      new Promise<GraphUserDetails>((resolve) => {
        resolve(getUserDetails(rootState.microsoftGraph.auth.accessToken));
      })
        .then((user) => {
          commit(MutationTypes.GET_USER_PROFILE_SUCCESS, user);
        })
        .catch((error) => {
          commit(MutationTypes.GET_USER_PROFILE_ERROR, error);
        });
    } else {
      new Promise<string>((resolve) => {
        resolve(getAccessToken(rootState.microsoftGraph.userAgentApplication, rootState.microsoftGraph.auth.scopes));
      })
        .then((accessToken: string) => {
          console.log(accessToken)
          if (accessToken === "TOKEN_NOT_EXISTS") return;
          localStorage.setItem(
            `msal.${useConfig().AUTH_ID}.accessToken`,
            accessToken
          );
          console.log('token being passed',accessToken)
          commit(MutationTypes.SET_ACCESS_TOKEN,accessToken);
          new Promise<GraphUserDetails>((resolve) => {
            resolve(getUserDetails(accessToken));
          })
            .then((user) => {
              commit(MutationTypes.GET_USER_PROFILE_SUCCESS, user);
            })
            .catch((error) => {
              commit(MutationTypes.GET_USER_PROFILE_ERROR, error);
            });
        })
        .catch((error) => {
          console.error("ACCESS_TOKEN_ERROR", error);
        });
    }
  },
  async userAgentLogin({
    commit,
    state,
    dispatch
  }) {
    new Promise<AuthResponse | void>(resolve => {
      resolve(
        state.userAgentApplication.loginPopup({
          scopes: state.auth.scopes,
          prompt: "select_account"
        })
      );
    }).then(() => {
      new Promise<void>(resolve => {
        console.log('before');
        resolve(dispatch(ActionTypes.GET_USER_PROFILE));
        console.log('after');
      }).catch(error => commit(MutationTypes.GET_USER_PROFILE_ERROR, error));
    });
  }
};
