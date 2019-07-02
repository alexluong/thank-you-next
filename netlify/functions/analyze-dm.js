export async function handler(event, context, callback) {
  console.log("hello")

  return {
    statusCode: 200,
    body: JSON.stringify("Hello"),
  }
}
