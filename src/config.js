export default {
  API_ENDPOINT:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8000/api'
      : 'ENTER LIVE ZEIT URL HERE',
  TOKEN_KEY: process.env.REACT_APP_API_KEY,
}
