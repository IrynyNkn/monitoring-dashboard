export type UserType = {
  id: string,
  email: string,
};

export type AuthResponseType  = {
  user: UserType,
  token: string,
};

export type AuthFetchType = {
  response: Response;
  unauthorized: boolean;
};

export class ExtendedError extends Error {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  info: any;
  status: number;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(message: string, status: number, info?: any) {
    super(message);
    this.info = info;
    this.status = status;
  }
}
