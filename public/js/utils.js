import { getAccessToken } from "./auth";

export const fetchProtectedRoute = async (url) => {
    const token = getAccessToken();
    if (!token) {
        throw new Error("Access token is missing. Please log in.");
    }

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    return response.json();
};