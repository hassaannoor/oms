import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(isoString) {
  return new Date(isoString).toISOString().slice(0, 10);
}

export function formatDateToISO(dateString) {
  return new Date(dateString).toISOString();
}