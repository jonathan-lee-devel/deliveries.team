import {error, redirect, type Actions, fail} from '@sveltejs/kit';
import {adminDB} from '$lib/server/firebase-admin';
import type {PageServerLoad} from './$types';

export const load = (async ({locals, params}) => {
  const uid = locals.userID;
  if (!uid) {
    throw redirect(301, '/login');
  }

  const userDocument = await adminDB.collection('users').doc(uid).get();
  const userData = userDocument.data();

  if (params.username !== userData?.username) {
    throw error(403, 'You do not have permissions to access that resource');
  }

  return {bio: userData?.bio};
}) satisfies PageServerLoad;

export const actions = {
  default: async ({locals, request, params}) => {
    const uid = locals.userID;

    const data = await request.formData();
    const bio = data.get('bio');

    const userRef = adminDB.collection('users').doc(uid!);
    const {username} = (await userRef.get()).data()!;

    if (params.username !== username) {
      throw error(403, 'You do not have permissions to access that resource');
    }

    if (bio!.length > 260) {
      return fail(400, {problem: 'Bio must be less than 260 characters'});
    }

    await userRef.update({bio});
  },
} satisfies Actions;
