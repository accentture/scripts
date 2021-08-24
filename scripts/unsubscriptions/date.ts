import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import objectSupport from "dayjs/plugin/objectSupport";
dayjs.extend(utc)
dayjs.extend(localizedFormat)
dayjs.extend(objectSupport);


export class DateService {
    getDate(year: any, month: any, day: any) {
        const randomHour = Math.floor(Math.random() * 24) + 1
        const randomMinute = Math.floor(Math.random() * 60) + 1
        const randomSecond = Math.floor(Math.random() * 60) + 1

        let date = dayjs(`${year}-${month}-${day}`)
            .utc()
            .hour(randomHour)
            .minute(randomMinute)
            .second(randomSecond)
            .format('YYYY-MM-DD HH:mm:ss.SSS')

        return date
    }
    getNameOfMonth(month: number) {
        let monthName = dayjs().month(month - 1).format('MMMM')
        return monthName
    }
}