export const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .slice(0, 2);
