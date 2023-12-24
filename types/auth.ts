import { $Enums } from "@prisma/client";
import {
  type DefaultSession,
  type DefaultUser,
} from "next-auth";   

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      role?: $Enums.Role;
      barangayId?: number | null;
    };
  }
  interface User extends DefaultUser {
    role?: $Enums.Role;
    barangayId?: number | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: $Enums.Role;
    barangayId?: number | null;
  }
}
