//declaration of vuex store


import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { createNamespacedHelpers } from 'vuex-composition-helpers';

import { RootState } from './state';


import microsoftGraph from './modules/microsoftGraph'
import microsoftGraphState from './modules/microsoftGraph/state' 
import { MicrosoftGraphActions } from './modules/microsoftGraph/actions';
import { MicrosoftGraphGetters } from './modules/microsoftGraph/getters';
 
Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  modules: {
    microsoftGraph
  }
};

const vuexStore = new Vuex.Store<RootState>(store);

export const {
  useState: useMicrosoftGraphState,
  useGetters: useMicrosoftGraphGetters,
  useMutations: useMicrosoftGraphMutations,
  useActions: useMicrosoftGraphActions
} = createNamespacedHelpers<typeof microsoftGraphState, MicrosoftGraphGetters, MicrosoftGraphActions,any>(vuexStore,'microsoftGraph')


export default vuexStore;