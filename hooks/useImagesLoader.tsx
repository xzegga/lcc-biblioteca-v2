import { useCallback, useEffect, useState } from 'react';
import * as FileSystem from 'expo-file-system';

const getImagePathsRecursive = async (
  directory: string,
  baseUri: string
): Promise<{ [key: string]: string }> => {
  const result: { [key: string]: string } = {};

  const readDirectory = async (dir: string, currentPath: string) => {
    const files = await FileSystem.readDirectoryAsync(dir);
    for (const file of files) {
      const fullPath = `${dir}/${file}`;
      const stat = await FileSystem.getInfoAsync(fullPath);

      if (stat.isDirectory) {
        await readDirectory(fullPath, `${currentPath}/${file}`);
      } else if (file.match(/\.(jpg|jpeg|png|gif|bmp)$/)) {
        result[`${currentPath}/${file}`] = `${baseUri}${currentPath}/${file}`;
      }
    }
  };

  await readDirectory(directory, '');

  return result;
};

const useImagesLoader = (
  folderPath: string,
  baseUri: string
): { imagePaths: {[key: string]: string } | null, pathsLoaded: boolean} => {
  const [imagePaths, setImagePaths] = useState<{ [key: string]: string } | null>(
    null
  );
  const [pathsLoaded, setPathsLoaded] = useState(false);

  useEffect(() => {
    loadImages();
  }, [folderPath, baseUri]);

  const loadImages = useCallback(async () => {
    try {
      const paths = await getImagePathsRecursive(folderPath, baseUri);
      setImagePaths(paths);
      setPathsLoaded(true);
    } catch (error) {
      setPathsLoaded(true);
    }
  }, [folderPath, baseUri]);

  return { imagePaths, pathsLoaded };
};

export default useImagesLoader;
