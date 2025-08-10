import "express";

declare global {
  namespace Express {
    interface Request {
      accessToken?: string;
      userId?: string; //
    }
  }
}

export {};
