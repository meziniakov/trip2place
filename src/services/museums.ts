import type { RootDataMuseum } from '@/types/Museum.type'

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

export async function getAllMuseums(
  currentPage: string
): Promise<RootDataMuseum[]> {
  return fetcher(`/mincult/museums/$?s=${currentPage}&l=10&o=false`)
}
