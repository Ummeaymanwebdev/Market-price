const messages: Record<string, string> = {
  INVALID_EMAIL_OR_PASSWORD: "ইমেইল বা পাসওয়ার্ড ভুল হয়েছে",
  INVALID_PASSWORD: "পাসওয়ার্ড ভুল হয়েছে",
  USER_NOT_FOUND: "এই ইমেইলে কোনো অ্যাকাউন্ট নেই",
  USER_ALREADY_EXISTS: "এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট খোলা হয়েছে",
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL:
    "এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট খোলা হয়েছে",
  INVALID_EMAIL: "ইমেইল ঠিকমতো লিখুন",
  PASSWORD_TOO_SHORT: "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে",
};

export function authErrorMessage(
  error?: { code?: string; message?: string; status?: number } | null
): string {
  console.error("Auth error:", JSON.stringify(error), error?.status);

  const code = error?.code ?? "";
  if (messages[code]) return messages[code];

  // চেনা কোড না হলে আসল বার্তাটাই দেখাবে
    const raw = error?.message;
  if (raw) return `সমস্যা: ${raw}`;
  if (error?.status) return `সার্ভারে সমস্যা (কোড ${error.status}), আবার চেষ্টা করুন`;
  return "কিছু একটা সমস্যা হয়েছে, আবার চেষ্টা করুন";
}