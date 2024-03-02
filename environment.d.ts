declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV: "development" | "test" | "production";
      readonly PORT?: string;
      readonly PWD: string;
      readonly JWT_SECRET: string;
      readonly JWT_EXPIRES: string;
      readonly COOKIE_EXPIRES_IN: number;
    }
  }
}

export {};
