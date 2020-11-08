import { GetterTree } from "vuex";
import { RootState } from "../../state";

import microsoftGraphState, { AuthType } from "./state";

//get auth and userAgentApplication

type MicrosoftGraphGettersCtx<T> = (
  state: typeof microsoftGraphState,
  getters: any,
  rootState: RootState,
  rootGetters: any
) => T;

export interface MicrosoftGraphGetters
  extends GetterTree<typeof microsoftGraphState, RootState> {
  getAuth: MicrosoftGraphGettersCtx<AuthType | null>;
  getUserAgentApplication: MicrosoftGraphGettersCtx<any | null>;
}

export const getters: MicrosoftGraphGetters = {
  getAuth: (_state, _gets, rootState) => {
    return rootState.microsoftGraph.auth;
  },
  getUserAgentApplication: (_state, _gets, rootState) => {
    return rootState.microsoftGraph.userAgentApplication;
  },
};
