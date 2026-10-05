// Neuer Schluessel: frueher gemerkte Fotos (alter Standard koltuk.webp) zeigen nicht mehr
const KEY = 'ekado_avatar_img';
/** Standard oben im Menue: EK-Logo statt Foto */
export const LOGO_AVATAR = '/media/brand/ek-logo.png';

export const getStoredAvatar = (): string => {
  try {
    return localStorage.getItem(KEY) || LOGO_AVATAR;
  } catch {
    return LOGO_AVATAR;
  }
};

export const setStoredAvatar = (dataUrl: string) => {
  try {
    localStorage.setItem(KEY, dataUrl);
  } catch {
    /* depolama kapalı: sadece bu oturumda görünür */
  }
};
