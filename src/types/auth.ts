export type UserType = {
  id: string,
  email: string,
};

export type AuthResponseType  = {
  user: UserType,
  token: string,
};