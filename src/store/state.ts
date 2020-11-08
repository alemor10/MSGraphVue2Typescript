//declaration of rootState

import microsoftGraphState from './modules/microsoftGraph/state';

export interface RootState {
  microsoftGraph: typeof microsoftGraphState;
}