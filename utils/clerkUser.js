export const fallbackClerkEmail = (clerkUserId) => `${clerkUserId}@clerk.local`;

export const normalizeClerkEmail = (email) => {
  if (typeof email !== "string") return null;
  const trimmedEmail = email.trim();
  return trimmedEmail ? trimmedEmail.toLowerCase() : null;
};

export const getClerkPayloadEmail = (payload) =>
  normalizeClerkEmail(
    payload?.email ??
      payload?.email_address ??
      payload?.primary_email_address ??
      payload?.emailAddress
  );

export const getClerkPayloadName = (payload) => {
  const name =
    payload?.name ??
    payload?.full_name ??
    [payload?.first_name, payload?.last_name].filter(Boolean).join(" ");

  return typeof name === "string" && name.trim() ? name.trim() : null;
};
