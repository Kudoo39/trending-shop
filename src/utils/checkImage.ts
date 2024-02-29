export const checkImage = (url: string) => {
  if (url.includes('placeimg.com')) {
    return false
  }
  try {
    new URL(url)
    return true
  } catch (_) {
    return false
  }
}
