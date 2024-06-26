import { cookies } from 'next/headers';

import SublinksApiBase, { AUTH_COOKIE_NAME, CookieStore } from './base';
import logger from '../logger';

class SublinksApiServerSide extends SublinksApiBase {
  private static instance: SublinksApiServerSide;

  constructor() {
    super();
    SublinksApiServerSide.instance = this;

    const cookieStore = {
      get: () => {
        try {
          const nextCookies = cookies();
          return nextCookies.get(AUTH_COOKIE_NAME)?.value;
        } catch (e) {
          logger.error('Failed to get server auth cookie', e);
          return undefined;
        }
      },
      set: (value: string, options?: object) => {
        try {
          const nextCookies = cookies();
          nextCookies.set(AUTH_COOKIE_NAME, value, {
            ...options,
            httpOnly: true
          });
        } catch (e) {
          logger.error('Failed to set server auth cookie', e);
        }
      },
      remove: () => {
        try {
          const nextCookies = cookies();
          nextCookies.delete(AUTH_COOKIE_NAME);
        } catch (e) {
          logger.error('Failed to remove server auth cookie', e);
        }
      }
    } as CookieStore;

    this.setAuthCookieStore(cookieStore);
  }

  public static Instance() {
    return SublinksApiServerSide.instance ?? new SublinksApiServerSide();
  }
}

export default SublinksApiServerSide;
