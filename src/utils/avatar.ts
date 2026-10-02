// Shared avatar state manager with localStorage persistence
export const getStoredAvatar = (): string => {
  return localStorage.getItem('ado_avatar_img') || '/12.jpg';
};

export const setStoredAvatar = (dataUrl: string) => {
  localStorage.setItem('ado_avatar_img', dataUrl);
  window.dispatchEvent(new CustomEvent('ado-avatar-updated', { detail: dataUrl }));
};
