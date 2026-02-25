export type User = {
  id: number;
  username: string;
  password: string;
};

// Mock users
export const users: User[] = [
  { id: 1, username: "user1", password: "password1" },
  { id: 2, username: "user2", password: "password2" },
];
