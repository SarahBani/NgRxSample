import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import * as fromDance from './dance.reducer';
import { environment } from '../../environments/environment';

export interface AppState {
  dance: fromDance.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  dance: fromDance.danceReducer
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
