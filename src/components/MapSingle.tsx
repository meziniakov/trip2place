// eslint-disable-next-line import/no-extraneous-dependencies
import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps'
import type { FC } from 'react'

import type { GeneralData } from '@/types/MKRF.type'

type Props = {
  data: GeneralData
}

const MapSingle: FC<Props> = ({ data }) => {
  const coordinates = data?.address?.mapPosition?.coordinates
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
        width={'100%'}
        height={'300px'}
      >
        <Placemark
          key={data.id}
          modules={['geoObject.addon.balloon']}
          defaultGeometry={coords}
          properties={{
            // iconContent: `${room.price}`,
            preset: 'islands#grayStretchyIcon',
            balloonContentBody: `<div class="flex flex-col">
<div class="text-lg font-semibold leading-7"></div>
<div class="">${data.name}</div>
<div class=""><img src=${data.image.url} class="h-32" /></div>
</div>`,
          }}
        />
      </Map>
    </YMaps>
  )
}

export default MapSingle
