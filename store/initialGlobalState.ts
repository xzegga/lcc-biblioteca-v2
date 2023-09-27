
export const localStorageKeys = ['selectedWorkspace', 'selectedNotebook'];
export const sessionStorageKeys = ['page.name:page'];

type ImageList = {
  [key: string]: string;
}

type AppState = 'idle' | 'loading' | 'error';

export const initialGlobalState = {
  images: {} as ImageList,
  toDownload: [] as string[],
  appState: 'loading' as AppState,
};
