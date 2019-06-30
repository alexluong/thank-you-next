const React = require("react")
const Index = require("./src/index").default

exports.wrapPageElement = ({ element, props }) => {
  return <Index {...props}>{element}</Index>
}
