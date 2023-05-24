/* eslint-disable import/no-extraneous-dependencies */
import { ArrowUpTrayIcon, StarIcon } from '@heroicons/react/20/solid'
import {
  GlobeAltIcon,
  HeartIcon,
  MapPinIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import type { FC } from 'react'
import { useState } from 'react'

import type { GeneralData } from '@/types/MKRF.type'

import MapSingle from './MapSingle'

type Props = {
  data: GeneralData
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const ItemSingle: FC<Props> = ({ data }) => {
  const [isLoading, setLoading] = useState(true)
  return (
    <div className="px-2 pt-6 lg:px-28 2xl:px-56">
      <div className="w-full justify-center">
        <div className="flex max-w-[1280px] flex-col space-y-2">
          <div className="flex">
            <h1 className="text-2xl font-extrabold">{data?.name}</h1>
          </div>
          <div className="flex justify-end md:justify-between">
            <div className="hidden items-center md:flex">
              <StarIcon className="h-4 text-red-600" />
              {''} ∙ {'нет отзывов'}∙ <MapPinIcon className="h-4" />{' '}
              {data?.address?.fullAddress}
            </div>
            <div className="flex">
              <div className="mr-3 flex items-center">
                <span className="mr-2">
                  <HeartIcon className="h-4" />
                </span>
                <span className="hidden sm:block">Сохранить</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">
                  <ArrowUpTrayIcon className=" h-4" />
                </span>
                <span className="hidden sm:block">Поделиться</span>
              </div>
            </div>
          </div>
          {data?.gallery && data?.gallery?.length > 2 ? (
            <section className="overflow-hidden text-neutral-700">
              <div className="container mx-auto p-1">
                <div className="flex flex-wrap">
                  <div className="flex w-2/3 flex-wrap pr-2">
                    <div
                      className={`${
                        isLoading && 'animate-pulse'
                      } relative h-96 w-full overflow-hidden rounded-l-lg bg-gray-200`}
                    >
                      <Image
                        src={data?.image?.url || ''}
                        alt={data?.name || ''}
                        width={580}
                        height={300}
                        style={{ transform: 'translate3d(0, 0, 0)' }}
                        className={cn(
                          'group-hover:opacity-75 h-full w-full duration-700 ease-in-out rounded-l-lg object-cover object-center brightness-90 transition',
                          isLoading
                            ? 'grayscale blur-2xl scale-110'
                            : 'grayscale-0 blur-0 scale-100'
                        )}
                        onLoadingComplete={() => setLoading(false)}
                      />
                    </div>
                  </div>
                  {data?.gallery?.length > 1 && (
                    <div className="flex h-96 w-1/3 flex-wrap">
                      <div
                        className={`${
                          isLoading && 'animate-pulse'
                        } h-1/2 w-full rounded-tr-lg bg-gray-200`}
                      >
                        <Image
                          src={data?.gallery[0]?.url || ''}
                          alt={data?.gallery[0]?.title || data?.name}
                          width={250}
                          height={190}
                          style={{ transform: 'translate3d(0, 0, 0)' }}
                          className={cn(
                            'group-hover:opacity-75 h-full w-full duration-700 ease-in-out rounded-tr-lg object-cover object-center brightness-90 transition',
                            isLoading
                              ? 'grayscale blur-2xl scale-110'
                              : 'grayscale-0 blur-0 scale-100'
                          )}
                          onLoadingComplete={() => setLoading(false)}
                        />
                      </div>
                      <div className="h-1/2 w-full pt-2">
                        <div
                          className={`${
                            isLoading && 'animate-pulse'
                          } h-full w-full rounded-br-lg bg-gray-200`}
                        >
                          <Image
                            src={data?.gallery[1]?.url || ''}
                            alt={data?.gallery[1]?.title || data?.name}
                            width={250}
                            height={190}
                            style={{ transform: 'translate3d(0, 0, 0)' }}
                            className={cn(
                              'group-hover:opacity-75 h-full w-full duration-700 ease-in-out rounded-br-lg object-cover object-center brightness-90 transition',
                              isLoading
                                ? 'grayscale blur-2xl scale-110'
                                : 'grayscale-0 blur-0 scale-100'
                            )}
                            onLoadingComplete={() => setLoading(false)}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          ) : (
            <section className="overflow-hidden text-neutral-700">
              <div className="container mx-auto p-1">
                <div className="flex flex-wrap">
                  <div className="flex w-full flex-wrap">
                    <div className="h-96 w-full p-0.5 md:p-0.5">
                      <Image
                        src={data?.image?.url || ''}
                        alt={data?.name}
                        width={580}
                        height={300}
                        className="block h-full w-full rounded-lg object-cover object-center"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
          <div className="grid grid-cols-1 justify-between lg:grid-cols-3">
            {data.organization && (
              <div className="mt-10 flex flex-col lg:col-span-2 lg:pr-10">
                <div className="flex justify-between">
                  <div className="">
                    <div className="">
                      <h3 className="text-xl font-extrabold">
                        {data?.organization?.name}
                      </h3>
                    </div>
                    <div className="flex items-center">
                      <MapPinIcon className="h-4" />
                      {data?.organization?.address?.fullAddress}
                    </div>
                  </div>
                  <div className="">
                    {/* {data.organization?.name} */}
                    {/* <img
                    className="h-14 rounded-full"
                    alt={data.organization?.name}
                    src={data.organization.subordi}
                  /> */}
                  </div>
                </div>
                <hr className="my-8 h-px border-[0.5px] bg-gray-200" />
                <div
                  dangerouslySetInnerHTML={{ __html: data?.description }}
                ></div>
                {/* <hr className="my-8 h-px border-[0.5px] bg-gray-200" /> */}
              </div>
            )}
            {data.contacts && (
              <div className="mt-10 lg:col-span-1">
                <div className="sticky top-20 mb-9 w-full flex-col rounded-lg border bg-white p-5 shadow-xl">
                  <div className="flex flex-col justify-start gap-4">
                    {data.contacts.phones.length > 0 && (
                      <div className="flex flex-col text-sm">
                        <div className="text-sm">Телефон:</div>
                        <div className="flex items-center">
                          <div className="mr-2">
                            <PhoneIcon className="h-4" />
                          </div>
                          <div className="">
                            <a
                              href={`tel:+${data?.contacts?.phones[0]?.value}`}
                            >
                              +{data?.contacts?.phones[0]?.value}
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                    {data.contacts?.website && (
                      <div className="flex flex-col text-sm">
                        <div className="text-sm">Адрес сайта:</div>
                        <div className="flex items-center">
                          <div className="mr-2">
                            <GlobeAltIcon className="h-4" />{' '}
                          </div>
                          <div className="">
                            <Link href={data?.contacts?.website}>
                              {new URL(data?.contacts?.website).hostname}
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                    {data?.organization?.socialGroups && (
                      <div className="flex flex-col text-sm">
                        <div className="text-sm">Соцсети:</div>
                        <div className="flex flex-col">
                          {data?.organization?.socialGroups.map(
                            (social) => (
                              <div
                                key={social.networkId}
                                className="mr-2 flex items-center"
                              >
                                {social?.network &&
                                  social?.network === 'ok' && (
                                    <>
                                      <div>
                                        <Link
                                          href={`https://ok.com/profile/${social.networkId}`}
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="#000000"
                                            width="16px"
                                            height="16px"
                                            viewBox="0 0 32 32"
                                          >
                                            <path d="M19.339 23.255c1.703-0.391 3.323-1.061 4.801-1.989 1.111-0.744 1.412-2.244 0.667-3.359-0.713-1.068-2.14-1.391-3.244-0.735-3.401 2.125-7.724 2.125-11.125 0-1.125-0.713-2.62-0.375-3.333 0.749 0 0.005 0 0.005 0 0.005-0.713 1.131-0.375 2.625 0.756 3.333l0.004 0.005c1.475 0.928 3.095 1.599 4.792 1.985l-4.62 4.619c-0.943 0.928-0.957 2.437-0.036 3.381l0.041 0.041c0.459 0.473 1.079 0.708 1.699 0.708s1.239-0.235 1.697-0.708l4.563-4.537 4.536 4.543c0.964 0.921 2.495 0.9 3.423-0.063 0.905-0.937 0.905-2.423 0-3.36zM16 16.516c4.563-0.005 8.255-3.699 8.26-8.256 0-4.552-3.708-8.26-8.26-8.26s-8.26 3.708-8.26 8.26c0.005 4.563 3.703 8.256 8.26 8.261zM16 4.844c1.885 0 3.416 1.531 3.416 3.416 0 1.891-1.531 3.417-3.416 3.423-1.885-0.005-3.416-1.532-3.421-3.423 0.005-1.885 1.536-3.416 3.421-3.421z" />
                                          </svg>
                                        </Link>
                                      </div>
                                      <div>
                                        {social.network === 'ok' ??
                                          'Одноклассники'}
                                      </div>
                                    </>
                                  )}
                                {social.network === 'vk' && (
                                  <>
                                    <div>
                                      <Link
                                        href={`https://vk.com/id${social.networkId}`}
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="#000000"
                                          width="12px"
                                          height="12px"
                                          viewBox="-2.5 0 32 32"
                                          version="1.1"
                                        >
                                          <path d="M16.563 15.75c-0.5-0.188-0.5-0.906-0.531-1.406-0.125-1.781 0.5-4.5-0.25-5.656-0.531-0.688-3.094-0.625-4.656-0.531-0.438 0.063-0.969 0.156-1.344 0.344s-0.75 0.5-0.75 0.781c0 0.406 0.938 0.344 1.281 0.875 0.375 0.563 0.375 1.781 0.375 2.781 0 1.156-0.188 2.688-0.656 2.75-0.719 0.031-1.125-0.688-1.5-1.219-0.75-1.031-1.5-2.313-2.063-3.563-0.281-0.656-0.438-1.375-0.844-1.656-0.625-0.438-1.75-0.469-2.844-0.438-1 0.031-2.438-0.094-2.719 0.5-0.219 0.656 0.25 1.281 0.5 1.813 1.281 2.781 2.656 5.219 4.344 7.531 1.563 2.156 3.031 3.875 5.906 4.781 0.813 0.25 4.375 0.969 5.094 0 0.25-0.375 0.188-1.219 0.313-1.844s0.281-1.25 0.875-1.281c0.5-0.031 0.781 0.406 1.094 0.719 0.344 0.344 0.625 0.625 0.875 0.938 0.594 0.594 1.219 1.406 1.969 1.719 1.031 0.438 2.625 0.313 4.125 0.25 1.219-0.031 2.094-0.281 2.188-1 0.063-0.563-0.563-1.375-0.938-1.844-0.938-1.156-1.375-1.5-2.438-2.563-0.469-0.469-1.063-0.969-1.063-1.531-0.031-0.344 0.25-0.656 0.5-1 1.094-1.625 2.188-2.781 3.188-4.469 0.281-0.5 0.938-1.656 0.688-2.219-0.281-0.625-1.844-0.438-2.813-0.438-1.25 0-2.875-0.094-3.188 0.156-0.594 0.406-0.844 1.063-1.125 1.688-0.625 1.438-1.469 2.906-2.344 4-0.313 0.375-0.906 1.156-1.25 1.031z" />
                                        </svg>
                                      </Link>
                                    </div>
                                    <div>Вконтакте</div>
                                  </>
                                )}
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  {/* <span className="mb-3 mr-2 inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                  {' '}
                  ⚡️ Мгновенное бронирование{' '}
                </span> */}
                  {/* <div className="flex">
                  <input
                    className="block w-full rounded-tl-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Заезд"
                    required
                  />
                  <input
                    className="block w-full rounded-tr-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Гость"
                    required
                  />
                </div>
                <div className="flex">
                  <select
                    id="guests"
                    defaultValue={0}
                    className="block w-full rounded-b-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value={0} disabled>
                      Гостей
                    </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div> */}
                  {data?.contacts?.phones[0]?.value && (
                    <div className="flex">
                      <a
                        href={`tel:+${data?.contacts?.phones[0]?.value}`}
                        className="mt-3 flex w-full items-center justify-center rounded-lg bg-amber-300 px-5 py-2.5 text-base font-medium text-black hover:bg-amber-200 focus:outline-none focus:ring-4 focus:ring-blue-300"
                      >
                        <span className="mr-2">
                          <PhoneIcon className="h-4" />
                        </span>
                        <span className="flex">
                          +{data?.contacts?.phones[0]?.value}
                        </span>
                      </a>
                    </div>
                  )}
                </div>
                <div className="z-0 flex text-sm">
                  Источник - &nbsp;
                  <a
                    href="http://culture.ru"
                    target="_blank"
                    rel="nofollow"
                  >
                    Культура.РФ
                  </a>
                </div>
              </div>
            )}
          </div>
          {/* <hr className="my-8 h-px border-[0.5px] bg-gray-200" /> */}
          {/* {external_reviews && (
            <>
              <div className="flex flex-col py-4">
                <h3 className="mb-7 flex text-xl font-extrabold">
                  <img src="/assets/images/star.svg" width="20" alt="Рейтинг" />
                  {external_reviews.rating}∙{' '}
                  {room.external_reviews_localizedCounter} на{' '}
                  {external_reviews.site}
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2">
                  {external_reviews.reviews.map((review, i) => {
                    return (
                      i < 6 && (
                        <div key={review.name + i} className="flex-col">
                          <div className="flex">
                            <div className="mr-4">
                              <img
                                alt={review.name}
                                className="h-14 rounded-full"
                                src={review.avatar}
                              />
                            </div>
                            <div className="flex-col">
                              <div className="font-extrabold">
                                {review.name}
                              </div>
                              <div className="text-sm font-light">
                                {review.date}
                              </div>
                            </div>
                          </div>
                          <div className="">
                            <p className="">{review.comment}</p>
                          </div>
                        </div>
                      )
                    )
                  })}
                </div>
              </div>
              <hr className="my-8 h-px border-[0.5px] bg-gray-200" />
            </>
          )} */}
          {data?.tags && data.tags?.length > 0 && (
            <div className="flex flex-col py-5">
              <h3 className="mb-3 text-xl font-extrabold">Теги</h3>
              <div className="flex flex-wrap items-end justify-start space-x-2 space-y-2">
                {data?.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className=" inline-block whitespace-nowrap rounded-[0.27rem] bg-orange-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none"
                  >
                    <Link href={`/tags/${tag?.sysName}`}>{tag?.name}</Link>
                  </span>
                ))}
              </div>
            </div>
          )}
          {data.address?.mapPosition?.coordinates && (
            <div className="flex flex-col py-5">
              <h3 className="mb-3 text-xl font-extrabold">
                Местоположение
              </h3>
              <div className="flex h-96 w-full">
                <MapSingle data={data} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default ItemSingle
