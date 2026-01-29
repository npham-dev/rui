/**
 * Create 2 letter avatar fallback (depending on  what is provided) \
 * Prioritizes full name over usernmae
 * @param username user selected name
 * @param fullName real name of the user
 * @returns 2 letter, uppercase avatar fallback
 */
export function getAvatarFallback(username: string, fullName?: string) {
  let fallback = username.substring(0, 2);

  if (fullName) {
    // if full name w/ lastName is provided, use first and last initials
    // otherwise use first two letters of the name
    const [firstName, lastName] = fullName.split(" ");
    fallback =
      firstName && lastName
        ? firstName.charAt(0) + lastName.charAt(0)
        : fullName.substring(0, 2);
  }

  return fallback.toLocaleUpperCase();
}
