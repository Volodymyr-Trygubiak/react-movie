const apiConfig = {
  baseUrl: 'https://api.themoviedb.org/3/',
  apiKey: 'c423f88e3274239684f0b71da2550fa8',
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500//${imgPath}`
}

export default apiConfig;