import type {PageServerLoad, Actions} from './$types';

export const load = (async ({cookies}) => {
  const boatName = cookies.get('boatName');

  return {boatName};
}) satisfies PageServerLoad;

export const actions = {
  default: async ({request, cookies}) => {
    const formData = await request.formData();
    const boatName = formData.get('boatName') as string;

    cookies.set('boatName', boatName);
  },
} satisfies Actions;
