// eslint-disable-next-line import/no-extraneous-dependencies
import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps'

const MapSingle = ({ data }: any) => {
  let coordinates: number[] = []
  let coordinatesEvent: number[] = []
  let coords: number[] = []

  if (data?.address?.mapPosition?.coordinates) {
    coordinates = data?.address?.mapPosition?.coordinates
  }

  if (data?.places && data?.places?.length > 0) {
    coordinatesEvent = data?.places[0]?.address?.mapPosition?.coordinates
  }

  if (coordinates?.length > 0) {
    coords = [
      coordinates[1] ? coordinates[1] : 55.751574,
      coordinates[0] ? coordinates[0] : 37.573856,
    ]
  }

  if (coordinatesEvent?.length > 0) {
    coords = coordinatesEvent
  }

  let balloonContentBody
  if (data?.price) {
    balloonContentBody = `<div class="flex flex-col">
      <div class="text-lg font-semibold leading-7"></div>
      <div class="">${data.name}</div>
      <div class="">от ${data?.price} руб.</div>
      <div class=""><img src=${data.image.url} class="h-32" /></div>
      </div>`
  } else {
    balloonContentBody = `<div class="flex flex-col">
      <div class="text-lg font-semibold leading-7"></div>
      <div class="">${data.name}</div>
      <div class=""><img src=${data.image.url} class="h-32" /></div>
      </div>`
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
            balloonContentBody: `${balloonContentBody}`,
          }}
        />
      </Map>
    </YMaps>
  )
}

export default MapSingle
