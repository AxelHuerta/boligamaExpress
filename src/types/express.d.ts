declare namespace Express {
  export interface Request {
    // WARNING: that's any
    user: any;
    auth: any;
  }
}
