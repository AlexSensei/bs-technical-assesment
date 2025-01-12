export const API_CONFIG = {
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    "https://job-application.bitstarz.workers.dev",
  headers: {
    "Content-Type": "application/json",
  },
};
