export const checkImage = (url: string) => {
  if (
    url === 'https://placeimg.com/640/480/any' ||
    url === 'http://placeimg.com/640/480/any' ||
    url === 'https://placeimg.com/640/480' ||
    url === 'http://placeimg.com/640/480'
  ) {
    return false
  }

  try {
    new URL(url)
    return true
  } catch (_) {
    return false
  }
}
