import type { RootObject } from '@/types/MKRF.type'

async function fetcher<T>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined
): Promise<T> {
  return fetch(input, {
    ...init,
    headers: {
      'X-API-KEY': process.env.NEXT_PUBLIC_MINCULT_API_KEY || '',
    },
  }).then((res) => res.json())
}

export async function getAllPlaces(
  currentPage: any,
  category: string = 'museums',
  locale: string | undefined = undefined,
  limit: string = '10',
  offset: string = 'false'
): Promise<RootObject> {
  const f =
    locale ??
    JSON.stringify(`'data.general.locale.name': $search: ${locale}`)
  return fetcher(
    `/mincult/${category}/$?f=${f}&s=${currentPage}&l=${limit}&o=${offset}`
  )
}

export async function getAllEvents(
  currentPage: any,
  // category: string,
  locale: string | undefined = undefined,
  limit: string = '10',
  offset: string = 'false'
): Promise<RootObject> {
  const f =
    locale ??
    JSON.stringify(`'data.general.locale.name': $search: ${locale}`)
  return fetcher(
    `/mincult/events/$?f=${f}&s=${currentPage}&l=${limit}&o=${offset}`
  )
}

export async function getPlaceByNativeId(
  category: string,
  nativeId: string
): Promise<RootObject> {
  const rootObject: RootObject = await fetcher(
    `/mincult/${category}/$?f={"nativeId":{"$eq":${nativeId}}}`
  )
  return rootObject
}
