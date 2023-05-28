/* eslint-disable import/no-extraneous-dependencies */
import { ArrowUpTrayIcon, StarIcon } from '@heroicons/react/20/solid'
import {
  GlobeAltIcon,
  HeartIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import type { FC } from 'react'
import { useState } from 'react'

import type { GeneralDataEvent } from '@/types/MKRF.type'

import MapSingle from './MapSingle'

type Props = {
  data: GeneralDataEvent
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const ItemSingleEvent: FC<Props> = ({ data }) => {
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
              {data?.places[0]?.address?.fullAddress}
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
                      {data?.places[0]?.address?.fullAddress}
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
            {data.places.length > 0 && (
              <div className="mt-10 lg:col-span-1">
                <div className="sticky top-20 mb-9 w-full flex-col rounded-lg border bg-white p-5 shadow-xl">
                  <div className="flex flex-col justify-start gap-4">
                    {/* {data.contacts.phones.length > 0 && (
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
                    )} */}
                    {data?.places[0]?.address && (
                      <div className="flex flex-col text-sm">
                        <div className="text-sm">Адрес:</div>
                        <div className="flex items-center">
                          <div className="mr-2">
                            <GlobeAltIcon className="h-4" />{' '}
                          </div>
                          <div className="">
                            {data?.places[0]?.address.fullAddress}
                          </div>
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
                  {data?.saleLink && (
                    <div className="flex">
                      <a
                        href={data?.saleLink}
                        className="mt-3 flex w-full items-center justify-center rounded-lg bg-amber-300 px-5 py-2.5 text-base font-medium text-black hover:bg-amber-200 focus:outline-none focus:ring-4 focus:ring-blue-300"
                      >
                        Регистрация
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
          {data.places[0]?.address?.mapPosition?.coordinates && (
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
export default ItemSingleEvent
