import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

// import * as rdrLocales from 'react-date-range/dist/locale'
import ru from 'date-fns/locale/ru'
import type { Range } from 'react-date-range'
import { DateRange } from 'react-date-range'

interface DatePickerProps {
  value: Range
  onChange: (value: any) => void
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
      locale={ru}
      // locale={rdrLocales.ru}
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
