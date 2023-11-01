import { configureStore } from '@reduxjs/toolkit';
import restaurantReducer from '../features/restaurant/restaurantSlice';
import loginReducer from '../features/login/loginSlice';

export const store = configureStore({
    reducer: {
        restaurants: restaurantReducer,
        login: loginReducer
    }
});