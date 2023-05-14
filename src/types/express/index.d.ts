import 'express';
import express from 'express';

declare module 'express' {

  export interface Request {
    signedCookies: Record<string, string>;
  }
}

export interface IReq<T = void> extends express.Request {
  body: T;
}

