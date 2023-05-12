export const locations = [
  { value: 1, label: 'Москва', latlng: [55.755864, 37.617698] },
  { value: 2, label: 'Темников', latlng: [54.630972, 43.216089] },
  { value: 3, label: 'Ростов-на-Дону', latlng: [47.222078, 39.720358] },
]

const formattedLocation = locations.map((item) => ({
  value: item.value,
  label: item.label,
  latlng: item.latlng,
}))

const useLocation = () => {
  const getAll = () => formattedLocation

  const getByValue = (value: any) => {
    formattedLocation.find((item) => item.value === value)
  }

  return { getAll, getByValue }
}

export default useLocation
