import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import tailwind from "twrnc";

import Ionicons from "@expo/vector-icons/Ionicons";

import { useAuth } from "../context/AuthContext";
import { capitalizeFirstLetter } from "../helpers/capital";
import SafeViewAndroid from "./SafeViewAndroid";

export function CustomHeader() {
  const { authState, logout } = useAuth();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (authState?.token) {
      const token = jwtDecode(authState.token) as any;
      setUserName(capitalizeFirstLetter(token.name || ""));
    }
  }, [authState]);

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
            style={tailwind`w-8 h-8 `}
          />

          <Text style={tailwind`text-green-900 font-medium`}>{userName}</Text>
        </View>

        <TouchableOpacity onPress={logout}>
          <View
            style={tailwind`
                        bg-white
                        flex h-[12]
                        flex-row items-center 
                        justify-between
                        gap-x-1`}
          >
            <Ionicons name="close" size={20} color="green" />
            <Text style={tailwind`text-green-900 font-medium`}> Salir</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
