import request from "react"
import { addCron } from "../utils"
import { cronExpression15 } from "../config"

export async function handler(event, context) {
  const analyzeDmUrl = `${URL}/.netlify/functions/analyze-dm`

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Successful Init" }),
  }
}
