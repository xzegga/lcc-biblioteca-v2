import { Image } from 'expo-image';
import { Alert, BackHandler, Platform, View } from 'react-native';
import tailwind from 'twrnc';

import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

import { useAuth } from '../context/AuthContext';

export function SideBar(
    props: any) {
    const { authState, logout } = useAuth();

    const close = () => {
        Platform.OS === "ios" ? logout() :
            Alert.alert(
                'Cerrar Sesión',
                'Al cerrar sesión no podrá acceder a la aplicación hasta que vuelva a iniciar sesión. \n\n¿Desea cerrar la aplicación en su lugar?',
                [
                    {
                        text: 'Cerrar Sesión',
                        onPress: () => logout(),
                        style: 'destructive',
                    },
                    {
                        text: 'Salir',
                        onPress: () => BackHandler.exitApp(),
                        style: 'default',
                        isPreferred: true,
                    },
                ],
                {
                    cancelable: true,

                },
            );

    }
    return (
        <>

            {authState?.authenticated &&
                <DrawerContentScrollView {...props}
                    contentContainerStyle={tailwind`flex`}
                >
                    <Image style={tailwind`h-35 w-35 my-5 mx-auto`} source={require('../assets/logo-cp.png')}></Image>
                    <View style={tailwind`flex-1 flex`}>
                        <DrawerItem
                            icon={({ color, size }) => <AntDesign name="questioncircleo" style={tailwind`-mr-5`} size={18} color="#309f01" />}
                            label="Sobre Nosotros"
                            onPress={() => props.navigation.navigate('about')}
                            style={tailwind`border-b border-gray-100`}
                        />
                        <DrawerItem
                            icon={({ color, size }) => <MaterialCommunityIcons name="book-check-outline" style={tailwind`-mr-5`} size={18} color="#309f01" />}
                            label="Términos de uso"
                            onPress={() => props.navigation.navigate('terms')}
                            style={tailwind`border-b border-gray-100`}
                        />
                        <DrawerItem
                            icon={({ color, size }) => <MaterialCommunityIcons name="shield-check-outline" style={tailwind`-mr-5`} size={18} color="#309f01" />}
                            label="Políticas de Privacidad"
                            onPress={() => props.navigation.navigate('policies')}
                            style={tailwind`border-b border-gray-100`}
                        />
                        <DrawerItem
                            icon={({ color, size }) => <AntDesign name="questioncircleo" style={tailwind`-mr-5`} size={18} color="#309f01" />}
                            label="Consultas"
                            onPress={() => props.navigation.navigate('questions')}
                            style={tailwind`border-b border-gray-100`}
                        />
                        <DrawerItem
                            icon={({ color, size }) => <AntDesign name="logout" style={tailwind`-mr-5`} size={18} color="#309f01" />}
                            label="Cerrar sesión"
                            onPress={close}
                            style={tailwind`border-b border-gray-100`}
                        />
                    </View>
                </DrawerContentScrollView>}
        </>

    )
}


