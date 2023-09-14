import type {Handle} from '@sveltejs/kit';
import {SESSION_COOKIE_NAME} from '$lib/auth/auth-constants';
import {adminAuth} from '$lib/server/firebase-admin';
import {safeMongooseConnection} from '$lib/server/mongoose-connection';

export const handle = (async ({event, resolve}) => {
  const sessionCookie = event.cookies.get(SESSION_COOKIE_NAME);

  try {
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie!);
    event.locals.userID = decodedClaims.uid;
  } catch (err) {
    event.locals.userID = null;
  }

  return resolve(event);
}) satisfies Handle;

safeMongooseConnection.connect((mongoUrl) => console.log(`Connected to MongoDB at: ${mongoUrl}`));
