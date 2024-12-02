import { getAccessToken } from "./auth.js";

export const fetchProtectedRoute = (url, options = {}) => {
  return new Promise((resolve, reject) => {
    const token = getAccessToken();
    const headers = new Headers(options.headers || {});
    headers.append("Authorization", `Bearer ${token}`);
    fetch(url, {
      ...options,
      headers: headers,
    })
      .then((result) => result.json())
      .then((data) => {
        resolve(data);
      })
      .catch((error) => reject(error));
  });
};
