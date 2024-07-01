import {format} from "date-fns/format";
import {formatInTimeZone} from "date-fns-tz";
import {parseISO} from "date-fns";

export const dateFormatter = (date: Date) => {
    return formatInTimeZone(date, "Europe/Bratislava", "dd.MM.yyyy H:ii")
}

export const isoFormatter = (date: string) => {
    return parseISO(`${date.split("+")[0]}Z`)
}

export const dateBaseFormatter = (date: Date) => {
    return format(date, "dd.MM.yyyy");
}