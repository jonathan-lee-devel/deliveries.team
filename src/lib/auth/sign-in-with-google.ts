import {GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth';
import {auth, db} from '$lib/client/firebase-init';
import {HttpMethod} from '$lib/http/enum/HttpMethod';
import {HttpHeaderPresets} from '$lib/http/enum/HttpHeaderPresets';
import {HttpStatus} from '$lib/http/enum/HttpStatus';
import {redirect} from '@sveltejs/kit';
import {LoginStatus} from './login-status';

/**
 * Function which signs in with google and stores JWT on client-side.
 */
export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  const credential = await signInWithPopup(auth, provider);

  const idToken = await credential.user.getIdToken();

  await fetch('/api/login', {
    method: HttpMethod.POST,
    headers: HttpHeaderPresets.CONTENT_TYPE_JSON,
    body: JSON.stringify({idToken}),
  });
}

/**
 * Function which signs out with google and removes JWT from client-side.
 */
export async function signOutWithGoogle() {
  await fetch('/api/logout', {method: HttpMethod.DELETE});
  await signOut(auth);
}
