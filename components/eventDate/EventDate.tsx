import {EventDateProps} from "@/types/components/EventDate";
import {Colors, Spacings, Text, View} from "react-native-ui-lib";
import {StyleSheet} from "react-native";
import {differenceInCalendarDays} from "date-fns";

const EventDate = ({date, dateTo}: EventDateProps) => {
    const dateF = new Date(date);
    const dateFDay = dateF.getDate();
    const dateFMonth = dateF.getMonth()+1;
    const dateFYear = dateF.getFullYear();
    const diff = differenceInCalendarDays(new Date(dateTo), dateF)+1;

    return <View>
        <View style={styles.eventDate}>
            <Text text60BO $textDefaultLight>{dateFDay}.{dateFMonth}.</Text>
            <Text text70M $textDefaultLight>{dateFYear}</Text>
        </View>
        {diff > 1 && <View style={styles.eventDiff}><Text text90BO>{`${diff} dni`}</Text></View>}
    </View>

}

const styles = StyleSheet.create({
    eventDate: {
        width: 90,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: Spacings.s4,
        paddingVertical: Spacings.s2,
        backgroundColor: Colors.$backgroundPrimaryHeavy,
        borderRadius: 12
    },
    eventDiff: {
        display: "flex",
        width: 90,
        backgroundColor: Colors.$backgroundDefault,
        padding: Spacings.s1,
        alignItems: "center",
        borderRadius: 12,
        marginTop: Spacings.s1
    }
});

export default EventDate;