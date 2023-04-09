export const checkImageURL = (url) => {
  if (!url) return false;
  return (new RegExp('^https?:\\/\\/.+\\.(png|jpg|jpeg|bmp|gif|webp)$', 'i')).test(url);
}