import {json} from '@sveltejs/kit';
import type {RequestHandler} from './$types';
import {LogoutStatus} from '$lib/auth/logout-status';
import {SESSION_COOKIE_NAME} from '$lib/auth/auth-constants';

export const DELETE: RequestHandler = async ({cookies}) => {
  cookies.delete(SESSION_COOKIE_NAME, {path: '/'});
  return json({status: LogoutStatus[LogoutStatus.SUCCESS]});
};
