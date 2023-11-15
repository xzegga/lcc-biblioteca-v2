import * as Updates from "expo-updates";
import { Alert } from "react-native";

export default function useUpdateApp(){
    async function onFetchUpdateAsync() {
        try {
          const update = await Updates.checkForUpdateAsync();
          if (update.isAvailable) {
            await Updates.fetchUpdateAsync();
            // ... notify user of update ...
            await Updates.reloadAsync();
          }
        } catch (e) {
          Alert.alert("Error", "Error al actualizar la aplicación")
        }
      }
    return {
        onFetchUpdateAsync
    }
}