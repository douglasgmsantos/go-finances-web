module.exports = (phase) => {

  const env = {
    BASE_URL: process.env.BASE_URL,
    NEXT_AUTH_CALLBACK_URL: process.env.NEXT_AUTH_CALLBACK_URL
  }

  return {
    env,
  }
}
