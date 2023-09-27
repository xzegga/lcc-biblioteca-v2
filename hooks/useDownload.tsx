import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import Config from "../services/config";

export default function useSaveLocalImage() {
  const downloadAndSave = async (imageUrl: string) => {
    const [path, fileName] = extractPathAndFileName(imageUrl);
    const fileUri = `${FileSystem.documentDirectory}images${path}/`;

    await FileSystem.makeDirectoryAsync(fileUri, { intermediates: true });

    const fileCompleteUrl = `${Config.apiUrl}${imageUrl}`;
    try {
      const res = await FileSystem.downloadAsync(fileCompleteUrl, fileUri + fileName);
      // saveFile(res.uri);
    } catch (err) {
      console.log("FS Err: ", err);
    } 
  };

  const saveFile = async (fileUri: string) => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === "granted") {
      try {
        const asset = await MediaLibrary.createAssetAsync(fileUri);
        const album = await MediaLibrary.getAlbumAsync("Download");
        // if (album == null) {
        //   await MediaLibrary.createAlbumAsync("Download", asset, false);
        // } else {
        //   await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
        // }
      } catch (err) {
        console.log("Save err: ", err);
      }
    } else if (status === "denied") {
      alert("please allow permissions to download");
    }
  };

  function extractPathAndFileName(url: string): [string, string] {
    // Split the URL into an array of path segments
    const segments = url.split('/');

    // Get the last segment, which is the filename
    const fileName = segments.pop() || '';

    // Join the remaining segments to get the path
    const path = segments.join('/');

    return [path, fileName];
  }


  return { downloadAndSave };
}
