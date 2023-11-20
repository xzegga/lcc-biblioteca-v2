import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import {
   Image, SafeAreaView, Text, TouchableOpacity, View
} from 'react-native';
import tailwind from 'twrnc';

import { Feather } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';

import { useAuth } from '../context/AuthContext';
import { capitalizeFirstLetter } from '../helpers/capital';
import SafeViewAndroid from './SafeViewAndroid';

export function CustomHeader() {
  const { authState, logout } = useAuth();
  const [userName, setUserName] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    if (authState?.token) {
      const token = jwtDecode(authState.token) as any;
      setUserName(capitalizeFirstLetter(token.name || ""));
    }
  }, [authState]);

  const drawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  }

  return (
    <SafeAreaView style={[tailwind`flex`, SafeViewAndroid.AndroidSafeArea]}>

      <View
        style={tailwind`
                flex h-[12]
                px-2
                bg-white
                flex-row items-center
                justify-between`}
      >
        <TouchableOpacity onPress={drawer}>
          <View
            style={tailwind`
                    flex h-[12]
                    flex-row items-center
                    justify-between
                    gap-x-2`}
          >
            <Image
              source={require("../assets/logo-cp.png")}
              resizeMode="contain"
              style={tailwind`w-9 h-9 `}
            />

            <Text style={tailwind`text-green-900 text-base`}>{userName}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={drawer}>
          <View
            style={tailwind`
                        bg-white
                        flex h-[12]
                        flex-row items-center 
                        justify-between
                        gap-x-1`}
          >
            <Feather name="menu" size={24} color="black" />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
