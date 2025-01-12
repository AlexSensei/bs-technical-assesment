export const API_CONFIG = {
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://job-application.bitstarz.workers.dev",
  headers: {
    "Content-Type": "application/json",
  },
};
