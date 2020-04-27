const timezone = "Europe/Paris";
const config = {
  currentEnv: process.env.NODE_ENV || "local",
  locale: "fr",
  timezone: timezone,
  express: {
    limiter: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 1000, // limit each IP to 1000 requests per windowMs
      delayMs: 0 // disable delaying - full speed until the max limit is reached
    }
  },
  zodiac: {
    host: process.env.HOST,
    port: process.env.PORT
  }
};
module.exports = config;
