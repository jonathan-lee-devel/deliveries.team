import {error, json} from '@sveltejs/kit';
import type {RequestHandler} from './$types';
import {adminAuth} from '$lib/server/firebase-admin';
import {LoginStatus} from '$lib/auth/login-status';
import {COOKIE_VALIDITY_PERIOD, SESSION_COOKIE_NAME} from '$lib/auth/auth-constants';
import {UserModel} from '$lib/server/models/User';

export const POST: RequestHandler = async ({request, cookies}) => {
  const {idToken} = await request.json();

  const decodedIdToken = await adminAuth.verifyIdToken(idToken);

  if (new Date().getTime() / 1000 - decodedIdToken.auth_time < 5 * 60) {
    const cookie = await adminAuth.createSessionCookie(idToken, {expiresIn: COOKIE_VALIDITY_PERIOD});
    const options = {maxAge: COOKIE_VALIDITY_PERIOD, httpOnly: true, secure: true, path: '/'};

    console.log('Saving user to the database...');
    await UserModel.create({
      email: 'jonathan.lee.devel@gmail.com',
      emailVerified: false,
      firstName: 'Jonathan',
      lastName: 'Lee',
      googleId: undefined,
      password: undefined,
    });

    cookies.set(SESSION_COOKIE_NAME, cookie, options);

    return json({status: LoginStatus[LoginStatus.SUCCESS]});
  } else {
    throw error(401, 'Recent sign in required!');
  }
};
