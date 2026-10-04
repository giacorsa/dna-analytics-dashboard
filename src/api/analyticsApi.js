import axios from "axios";

const API_URL =
  "https://raw.githubusercontent.com/Anita-Liberatore/dna-analytics-api/master/analytics.json";

export async function getAnalytics() {
  const response = await axios.get(API_URL);

  return response.data;
}
