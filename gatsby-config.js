require("dotenv").config()

const proxy = require("http-proxy-middleware")

module.exports = {
  plugins: [
    "gatsby-plugin-material-ui",
    { resolve: "gatsby-plugin-firebase", options: { features: { database: true, auth: true } } },
    {
      resolve: "gatsby-plugin-layout",
      options: {
        component: require.resolve("./src"),
      },
    },
  ],

  developMiddleware: app => {
    app.use(
      "/.netlify/functions/",
      proxy({
        target: "http://localhost:9000",
        pathRewrite: {
          "/.netlify/functions/": "",
        },
      }),
    )
  },
}
