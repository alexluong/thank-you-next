import request from "react"
import { addCron } from "../utils"
import { cronExpression15 } from "../config"

export async function handler(event, context) {
  // Add Cron every 15min to analyze dm
  const analyzeDmUrl = `${URL}/.netlify/functions/analyze-dm`
  addCron(enalyzeDmUrl, cronExpression15)

  // Add Cron every month to redo dm analysis

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Successful Init" }),
  }
}
