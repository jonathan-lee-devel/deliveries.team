import type {PageLoad} from './$types';

export const load = (async ({url}) => {
  const redirectTo = url.searchParams.get('redirectTo');
  return {
    redirectTo,
  };
}) satisfies PageLoad;
