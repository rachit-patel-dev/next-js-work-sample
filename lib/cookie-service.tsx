import { cookies } from "next/headers";

import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export const cookieService = {
  get(name = ""): RequestCookie | null {
    const cookie = cookies().get(name) || null;
    return cookie;
  },
  set(name: string, value: string) {
    cookies().set(name, value);
  },
};
