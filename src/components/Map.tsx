// eslint-disable-next-line import/no-extraneous-dependencies
import { Map as YMap, Placemark, YMaps } from '@pbe/react-yandex-maps'

interface MapProps {
  center?: number[]
}

const Map: React.FC<MapProps> = ({ center }) => {
  return (
    <YMaps>
      <YMap
        defaultState={{
          center: center || [55.755864, 37.617698],
          zoom: 9,
        }}
        width={'100%'}
        height={'300px'}
      >
        <Placemark geometry={center} />
      </YMap>
    </YMaps>
  )
}

export default Map
