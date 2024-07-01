// @ts-nocheck
import {CalendarProps} from "@/types/components/Calendar";
import {AgendaList, CalendarProvider, WeekCalendar} from "react-native-calendars";
import {Button, Colors, Spacings, Text, View} from "react-native-ui-lib";

const {differenceInCalendarDays, addDays} = require("date-fns");
import React, {useCallback} from "react";
import {StyleSheet} from "react-native";
import {MarkedDates} from "react-native-calendars/src/types";
import TagsList from "@/components/tagsList/TagsList";
import {router} from "expo-router";
import {isoFormatter} from "@/utils/dateFormater";

const Calendar = ({events}: CalendarProps) => {

    const parseEvents = useCallback((events) => {
        let eventsCalendar: { [key: string]: any } = {}
        let marked: { [key: string]: any } = {}

        events.forEach((event) => {
            let dateFrom = isoFormatter(event.dateFrom)
            let dateTo = isoFormatter(event.dateTo);
            let diff = differenceInCalendarDays(dateTo, dateFrom);
            while (diff >= 0) {
                let eventDate = addDays(dateFrom, diff).toISOString().split('T')[0];

                let mappedEvent = {
                    id: event.id,
                    title: event.title,
                    dateFrom: dateFrom,
                    dateTo: dateTo,
                    tags: event.tags,
                    shorText: event.shorText
                };

                if (eventsCalendar[eventDate]) {
                    eventsCalendar[eventDate].data.push(mappedEvent)
                } else {
                    eventsCalendar[eventDate] = {
                        title: eventDate,
                        data: [mappedEvent]
                    }
                    marked[eventDate] = {marked: true, disabled: false}
                }
                diff--;
            }
        });

        return [Object.values(Object.keys(eventsCalendar).sort().reduce((obj, key) => {
                obj[key] = eventsCalendar[key];
                return obj;
            },
            {})), marked];
    }, [events]);

    const [planedEvents, marked] = parseEvents(events);

    return <CalendarProvider
        date={new Date().toISOString().split('T')[0]}
        showTodayButton
    >
        <WeekCalendar
            testID={`weekCalendar`}
            firstDay={1}
            pastScrollRange={2}
            futureScrollRange={2}
            showWeekNumbers={false}
            disabledByDefault={true}
            markedDates={marked as MarkedDates}
            theme={{
                dayTextColor: Colors.$textDefault,
                todayTextColor: Colors.$textPrimary,
                selectedDayBackgroundColor: Colors.$textPrimary,
                dotColor: Colors.$textPrimary
            }}
        />
        <AgendaList
            sections={planedEvents}
            renderItem={(item) => {
                let isMoreInfo = item.item.tags.find((tag) => tag.name === "Zvoz odpadu");
                return <View style={styles.calendarItem}>
                    <View style={styles.calendarItemBody}>
                        <Text text70BO>{item.item.title}</Text>
                        {!isMoreInfo && <Text>{item.item.shorText}</Text>}
                        <TagsList tags={item.item.tags.map((tag) => tag.name)}/>
                    </View>
                    <View style={styles.calendarItemAction}>{!isMoreInfo
                        && <Button
                            size={'small'}
                            outline
                            label={"info"}
                            onPress={() => router.navigate(`/events/${item.item.id}`)}
                        />
                    }</View>
                </View>
            }}
            sectionStyle={styles.section}
        />
    </CalendarProvider>;
}


const styles = StyleSheet.create({
    calendar: {
        paddingLeft: 20,
        paddingRight: 20
    },
    header: {
        backgroundColor: Colors.$textPrimary
    },
    section: {
        backgroundColor: Colors.$backgroundNeutralLight,
        color: Colors.$textNeutralLight,
        textTransform: 'uppercase',
    },
    calendarItem: {
        paddingHorizontal: Spacings.s5,
        display: "flex",
        gap: Spacings.s2,
        marginTop: Spacings.s3,
        paddingBottom: Spacings.s4,
        borderBottomColor: Colors.$backgroundNeutralLight,
        borderBottomWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        width: '100%',
    },
    calendarItemBody: {
        display: "flex",
        gap: Spacings.s2,
        flexBasis: "75%",
        flexShrink: 1,
    },
    calendarItemAction: {
        flexBasis: "25%",
    }
});

export default Calendar;