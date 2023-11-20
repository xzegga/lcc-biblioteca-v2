
import "react-native-get-random-values";

import RealmWrapper from "../components/realm/RealmWrapper";
import { AuthProvider } from "../context/AuthContext";
import Drawer from "expo-router/drawer";
import { SideBar } from "../components/Drawer";

export const unstable_settings = {
  // ensures any route can link back to `/`
  initialRouteName: "index",
};

export default function Root() {
 
  return (
    <AuthProvider>
      <RealmWrapper>
        <Drawer
           screenOptions={{ headerShown: false }}
           drawerContent={SideBar}
           initialRouteName="index"
         />
      </RealmWrapper>
    </AuthProvider>
  );
}
