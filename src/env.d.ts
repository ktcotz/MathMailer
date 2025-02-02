declare namespace NodeJS {
  interface ProcessEnv {
    SERVER_PORT: string;
    EMAIL_FROM_USER: string;
    EMAIL_FROM_PASS: string;
    SUPABASE_URL: string;
    SUPABASE_SUPER_KEY: string;
  }
}
