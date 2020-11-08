import { Module } from 'vuex';
import { RootState } from '@/store/state';

import microsoftGraphState from './state';
import { getters } from './getters';
import { mutations } from './mutations';
import { actions } from './actions';


const microsoftGraph: Module<typeof microsoftGraphState, RootState> = {
  namespaced: true,
  state: microsoftGraphState,
  getters: getters,
  mutations: mutations,
  actions: actions,
  
}

export default microsoftGraph;