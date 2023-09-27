import * as FileSystem from "expo-file-system";
import * as Updates from 'expo-updates';

export const folderPath = `${FileSystem.documentDirectory}images`;
export const baseUri = `${FileSystem.documentDirectory}images`;

const Config = {
  apiUrl: "https://lcc-ecommerce.asesoriait.net",
  enableHiddenFeatures: true,
};

if (Updates.channel === "production") {
  Config.apiUrl = "https://lcc-ecommerce.asesoriait.net";
  Config.enableHiddenFeatures = false;
} else if (Updates.channel === "staging") {
  Config.apiUrl = "https://lcc-ecommerce.asesoriait.net";
  Config.enableHiddenFeatures = true;
}

export default Config;
