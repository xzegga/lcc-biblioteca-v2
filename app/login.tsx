import { useRootNavigationState, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    Image, ImageBackground, Pressable, Text, TextInput, TouchableOpacity, View
} from 'react-native';
import tailwind from 'twrnc';

import Loading from '../components/Loading';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const rootNavigationState = useRootNavigationState();
    
    const { authState } = useAuth();
    const router = useRouter();

    const loginFn = async () => {
        setLoading(true);
        await login(email, password);

        setLoading(false);
    }

    useEffect(() => {
        if(authState?.authenticated == true && rootNavigationState?.key ) {
            router.push("/");
        }
    }, [authState?.authenticated]);

    return (
        <View style={tailwind`flex-1 items-center justify-center bg-slate-50`}>
            {loading && <Loading />}
            <ImageBackground source={require('../assets/login-background.png')} resizeMode="cover"
                style={tailwind`flex-1 items-center justify-center w-full`}>
                <TouchableOpacity
                    style={tailwind`flex-1 items-center justify-center w-full ${loading ? 'opacity-50' : ''}`}
                    disabled={loading}>
                    <View style={tailwind`p-8 pb-40 w-11/12 max-w-sm`}>
                        <Image source={require('../assets/logo-cp.png')}
                            resizeMode="contain"
                            style={tailwind`w-44 h-44 mx-auto mb-8`}
                        />
                        <TextInput
                            style={tailwind`w-full bg-white border border-[#a2ab7b] rounded-md h-12 px-4 mb-4 text-lime-900`}
                            placeholderTextColor="#3f6212"
                            placeholder="Usuario"
                            onChangeText={(text: string) => { setEmail(text) }}
                            value={email}
                            autoCapitalize="none"
                        />

                        <TextInput
                            style={tailwind`w-full bg-white border border-[#a2ab7b] rounded-md h-12 px-4 text-lime-900`}
                            placeholderTextColor="#3f6212"
                            placeholder="Contraseña"
                            onChangeText={(text: string) => { setPassword(text) }}
                            value={password}
                            secureTextEntry={true}
                            autoCapitalize="none"
                        />

                        <View style={tailwind`flex flex-row justify-between items-center my-8`}>
                            <View style={tailwind`flex-row items-center`}>
                                <Pressable
                                    style={tailwind`h-4 w-4 
                                    rounded-sm mr-2 flex items-center justify-center`}
                                >
                                    {/* selected state */}
                                    <View style={tailwind`bg-lime-700 w-4 h-4 rounded-sm`} />
                                </Pressable>
                                <Text style={tailwind`text-lime-900`}>Recordarme</Text>
                            </View>
                        </View>

                        <TouchableOpacity onPress={loginFn}
                            style={tailwind`h-12 bg-orange-500 rounded-md flex flex-row justify-center items-center px-6`}
                        >
                            <View style={tailwind`flex-1 flex items-center`}>
                                <Text
                                    style={tailwind`text-white text-base font-medium w-full text-center`}
                                >Iniciar Sesión</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    );
}
