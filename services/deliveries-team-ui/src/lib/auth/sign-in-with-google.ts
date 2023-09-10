import {GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth';
import {auth} from '$lib/client/firebase-init';

/**
 * Function which signs in with google and stores JWT on client-side.
 */
export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  const credential = await signInWithPopup(auth, provider);

  const idToken = await credential.user.getIdToken();

  await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({idToken}),
  });
}

/**
 * Function which signs out with google and removes JWT from client-side.
 */
export async function signOutWithGoogle() {
  await fetch('/api/login', {method: 'DELETE'});
  await signOut(auth);
}
