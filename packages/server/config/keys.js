export default {
  app: {
    port: process.env.POST || 3001,
    apiUrl: process.env.API_URL || "/api",
    hashSalt: "",
  },
  auth: {
    hashRounds: Number(process.env.HASH_ROUNDS) || 10,
    accessTokenSecret: "t1SkP!lz",
    accessTokenExp: "7d",
    refreshTokenSecret: "t1SkP!lz",
    refreshTokenExp: "7d",
  },
  db: {
    url: process.env.MONGO_URI || "mongodb+srv://eliotslavik:password1234@prioritypet.eqxedmq.mongodb.net/?retryWrites=true&w=majority",
  },
  constants: {
    email_regex:
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
  },
};
