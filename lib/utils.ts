import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import bcrypt from "bcryptjs";

const SALT_ROUNDS: number = parseInt(process.env.SALT_ROUNDS!) || 10;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function generateHash(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const passwordHash = await bcrypt.hash(password, salt);
  return passwordHash;
}

export async function validateUser(
  password: string,
  passwordHash: string
): Promise<Boolean> {
  const result = await bcrypt.compare(password, passwordHash);
  return result;
}

export function formatElapsedTime(dateString: string): string {
  const currentDate = new Date();
  const date = new Date(dateString);

  const elapsedMilliseconds = currentDate.getTime() - date.getTime();
  const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
  const elapsedMinutes = Math.floor(elapsedSeconds / 60);
  const elapsedHours = Math.floor(elapsedMinutes / 60);
  const elapsedDays = Math.floor(elapsedHours / 24);

  if (elapsedDays > 0) {
    return `${elapsedDays} day${elapsedDays > 1 ? "s" : ""} ago`;
  } else if (elapsedHours > 0) {
    return `${elapsedHours} hour${elapsedHours > 1 ? "s" : ""} ago`;
  } else if (elapsedMinutes > 0) {
    return `${elapsedMinutes} minute${elapsedMinutes > 1 ? "s" : ""} ago`;
  } else {
    return "Just now";
  }
}
