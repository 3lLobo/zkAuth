import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { enableMapSet } from 'immer'

import { graphApi } from './graphApi'
import { graphApi2} from './graphApi2'

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [graphApi.reducerPath]: graphApi.reducer,
    [graphApi2.reducerPath]: graphApi2.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .concat(graphApi.middleware)
    .concat(graphApi2.middleware),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)
enableMapSet()

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch