export default {
  API_ENDPOINT:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8000/api'
      : 'https://syntrack-api.herokuapp.com/api',
  TOKEN_KEY: 'spaced-repetition-token',
}
