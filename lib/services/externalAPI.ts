// lib/services/externalAPI.ts (BÁSICO)
import axios, { AxiosInstance } from "axios";

export const externalAPI: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_EXTERNAL_API_URL || "https://api.guionix.com",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});