import * as SecureStore from 'expo-secure-store';
import { createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';

import { AxiosClient } from '../services/axiosClient';

interface AuthState {
    token: string | null;
    authenticated: boolean | null;
}

interface AuthProps {
    authState?: AuthState;
    onRegister?: (email: string, password: string) => Promise<any>;
    login: (email: string, password: string) => Promise<any>;
    logout: () => Promise<any>;
    getAtlasUser: (app: any) => Promise<any>;
    user: any;
}

export const TOKEN_KEY = 'jwt-auth-token';
export const TOKEN_TYPE = 'token-type';
export const REALM_API_ID = 'realm-api';
export const REALM_API_KEY = 'realm-api-key';
export const GPT_API_KEY = 'gpt-api-key';

export const AUTH_URL = 'api/v1/token';
export const API_KEY_URL = 'wp/v2/atlas-api-key';
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }: any) => {

    const axiosClient = AxiosClient.get('');
    const [authState, setAuthState] = useState<AuthState>({
        token: null,
        authenticated: null,
    });
    const [user, setUser] = useState<any>();

    useEffect(() => {
        const loadToken = async () => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY);

            if (token) {
                setAuthState({
                    token,
                    authenticated: true,
                });
            }
        }
        loadToken();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            let data = new FormData();
            data.append('username', email);
            data.append('password', password);

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };

            const result = await axiosClient.post(AUTH_URL, data, config);

            if (result?.data?.jwt_token) {
                const { jwt_token, token_type } = result.data;
                await SecureStore.setItemAsync(TOKEN_KEY, jwt_token);
                await SecureStore.setItemAsync(TOKEN_TYPE, token_type);

                const axiosAuthClient = AxiosClient.get(jwt_token);
                const api_credentials = await axiosAuthClient.get(API_KEY_URL)

                if (api_credentials?.data?.api_key) {
                    await SecureStore.setItemAsync(REALM_API_ID, api_credentials.data.api_id);
                    await SecureStore.setItemAsync(REALM_API_KEY, api_credentials.data.api_key);
                    await SecureStore.setItemAsync(GPT_API_KEY, api_credentials.data.gpt_api_key);
                    console.log(api_credentials.data.gpt_api_key);
                }

                setAuthState({
                    token: jwt_token,
                    authenticated: true,
                });
            }



            return result;
        } catch (error) {
            Alert.alert(
                'Error de autenticación',
                `El usuario y/o contraseña introducidos no son correctos o no estás conectado a Internet`, [
                { text: 'OK' },
            ]);
        }
    }

    const logout = async () => {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        await SecureStore.deleteItemAsync(TOKEN_TYPE);
        await SecureStore.deleteItemAsync(REALM_API_ID);
        await SecureStore.deleteItemAsync(REALM_API_KEY);

        setAuthState({
            token: null,
            authenticated: false,
        });
    }


    const getAtlasUser = async (app: any) => {
        // If the device has no cached user credentials, log in.
        if (!app.currentUser) {

            // Set api key to authenticate to atlas mongodb
            const apiKey = await SecureStore.getItemAsync(REALM_API_KEY);

            if (apiKey) {
                const credentials = Realm.Credentials.apiKey(apiKey);
                await app.logIn(credentials);
            }
        }
        // If the app is offline, but credentials are
        // cached, return existing user.
        //setUser(app.currentUser!);

        return app.currentUser!;
    };

    const value = {
        login,
        logout,
        authState,
        getAtlasUser,
        user
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
