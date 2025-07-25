export type JwtPayload = {
  id: string;
  name: string;
};

declare global {
  namespace Express {
    interface Request {
      jwt?: JwtPayload;
    }
  }
}
