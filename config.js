export default {
  API_ENDPOINT:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8000/api'
      : 'ENTER LIVE ZEIT URL HERE',
  TOKEN_KEY: 'bdae8b61-2eb5-4ec2-aefe-8042fedd92f9',
}
