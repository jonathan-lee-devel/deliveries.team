import {adminAuth} from '$lib/server/firebase-admin';
import {error, type Handle} from '@sveltejs/kit';

export const handle = (async ({event, resolve}) => {
  const sessionCookie = event.cookies.get('__session');

  try {
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie!);
    event.locals.userID = decodedClaims.uid;
  } catch (err) {
    event.locals.userID = null;
  }

  return resolve(event);
}) satisfies Handle;
