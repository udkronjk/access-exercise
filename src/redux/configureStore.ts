import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic, rootReducer } from './modules/root';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

const epicMiddleware = createEpicMiddleware();

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore() {
    const store = createStore(rootReducer, composeEnhancers(applyMiddleware(epicMiddleware)));

    epicMiddleware.run(rootEpic);

    return store;
}

export const store = configureStore();
type AppDispatch = typeof store.dispatch;
type AppSelector = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppSelector> = useSelector;
