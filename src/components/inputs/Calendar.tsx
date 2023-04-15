import { DateRange, Range, RangeKeyDict } from 'react-date-range'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import * as rdrLocales from 'react-date-range/dist/locale'

interface DatePickerProps {
  value: Range
  onChange: (value: RangeKeyDict) => void
  disabledDates?: Date[]
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  disabledDates,
}) => {
  return (
    <DateRange
      rangeColors={['#262626']}
      ranges={[value]}
      date={new Date()}
      months={2}
      locale={rdrLocales.ru}
      weekStartsOn={1}
      onChange={onChange}
      direction="horizontal"
      showDateDisplay={false}
      minDate={new Date()}
      disabledDates={disabledDates}
    />
  )
}
export default DatePicker
