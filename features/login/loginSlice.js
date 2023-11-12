import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginJWT } from "../../utils/auth";

export const login = createAsyncThunk('u/login', async ({ email, password }) => {      // creamos el thunk para el login q recibe el email y el password y hace la llamada a la api
    try {
        const response = await loginJWT({ email, password });                          // llamamos a la funcion loginJWT q esta en utils/auth y le pasamos el email y el password
        return response.data;                                                          // devolvemos la data q nos devuelve la api
    } catch (error) {
        throw error;
    }
});

const loginSlice = createSlice({                                                        // creamos el slice para el login
    name: 'login',                                                                      // le ponemos el nombre
    initialState: {                                                                     // le ponemos el estado inicial
        email: null,
        token: null,
        isAuth: localStorage.getItem('isAuth') === 'true' ? true : false,
        userId: null,
        error: null
    },
    reducers: {                                                                         // creamos los reducers que son las funciones que modifican el estado
        loginSetData: (state, action) => {                                                     // seteamos los datos
            console.log(action.payload.data)
            state.email = action.payload.email;
            state.token = action.payload.token;
            localStorage.setItem('token', action.payload.token);
            state.isAuth = true;
            state.error = null;
            localStorage.setItem('isAuth', true);
            state.userId = action.payload.data.id;
            localStorage.setItem('userId', action.payload.data.id);
        },
        logout: (state) => {                                                            // borramos los datos
            state.email = null;
            state.token = null;
            state.isAuth = false;
            state.error = null;
            localStorage.removeItem('isAuth');
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            state.userId = null;
        },
    },
    extraReducers: (builder) => {                                                       // creamos los reducers extra que son los que se ejecutan cuando se llama a un thunk
        builder
        .addCase(login.fulfilled, (state, action) => {                                  // si el thunk se ejecuta correctamente
            return {
                ...state,                                                               // se devuelve el estado con los datos
                email: action.payload.email,
                token: action.payload.token,
                isAuth: true,
            }
        })
        .addCase(login.rejected, (state, action) => {                                   // si el thunk falla
            return {
                ...state,
                error: action.error.message
            }
        });
    },
});

export const { logout, loginSetData } = loginSlice.actions;   

export default loginSlice.reducer;