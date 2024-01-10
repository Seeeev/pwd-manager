import { Session } from "next-auth";

 type UpdateSession = (data?: any) => Promise<Session | null>;
export type sessionType = {
      update: UpdateSession,
      data: Session | null,
      status: "authenticated" | "unauthenticated" | "loading";
    }