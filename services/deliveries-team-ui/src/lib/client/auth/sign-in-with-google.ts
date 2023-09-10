import {GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth';
import {auth} from './firebase-init';

/**
 * Function which signs in with google and stores JWT on client-side.
 */
export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  const user = await signInWithPopup(auth, provider);
  return user;
}

/**
 * Function which signs out with google and removes JWT from client-side.
 */
export async function signOutWithGoogle() {
  await signOut(auth);
}
