const KEY = 'ado_avatar_img';

export const getStoredAvatar = (): string => {
  try {
    return localStorage.getItem(KEY) || '/media/design/koltuk.webp';
  } catch {
    return '/media/design/koltuk.webp';
  }
};

export const setStoredAvatar = (dataUrl: string) => {
  try {
    localStorage.setItem(KEY, dataUrl);
  } catch {
    /* depolama kapalı: sadece bu oturumda görünür */
  }
};
