// eslint-disable-next-line import/no-extraneous-dependencies
import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps'
import type { FC } from 'react'

import type { Museum } from '@/types/Museum.type'

type Props = {
  museum: Museum
}

const MapSingle: FC<Props> = ({ museum }) => {
  const coordinates = museum?.address?.mapPosition?.coordinates
  let coords: number[] = []
  if (coordinates.length > 0) {
    coords = [
      coordinates[1] ? coordinates[1] : 55.751574,
      coordinates[0] ? coordinates[0] : 37.573856,
    ]
  }

  return (
    <YMaps>
      <Map
        defaultState={{
          center: coords,
          zoom: 9,
        }}
        className="h-full w-full"
      >
        <Placemark
          key={museum.id}
          modules={['geoObject.addon.balloon']}
          defaultGeometry={coords}
          properties={{
            // iconContent: `${room.price}`,
            preset: 'islands#grayStretchyIcon',
            balloonContentBody: `<div class="flex flex-col">
<div class="text-lg font-semibold leading-7"></div>
<div class="">${museum.name}</div>
<div class=""><img src=${museum.image.url} class="h-32" /></div>
</div>`,
          }}
        />
      </Map>
    </YMaps>
  )
}

export default MapSingle
