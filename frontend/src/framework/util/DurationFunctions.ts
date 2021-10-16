export function addDurations(duration1: string, duration2: string): string {
    const durationRegexp: RegExp = /^(\d+:)?[0-5]?\d:[0-5]\d$/;

    // check both are valid durations
    const duration1Valid: boolean = durationRegexp.test(duration1);
    const duration2Valid: boolean = durationRegexp.test(duration2);

    if (duration1Valid && duration2Valid) {

        // split them into seconds, minutes, and hours
        const duration1Components: string[] = duration1.split(':');
        const duration2Components: string[] = duration2.split(':');


        let carry = 0;
        // add the seconds (last elements in each)
        const duration1Seconds = parseInt(duration1Components[duration1Components.length - 1]);
        const duration2Seconds = parseInt(duration2Components[duration2Components.length - 1]);


        let sumSeconds = duration1Seconds + duration2Seconds;
        if (sumSeconds >= 60) {
            carry = 1;
            sumSeconds -= 60;
        }

        const duration1Minutes = parseInt(duration1Components[duration1Components.length - 2]);
        const duration2Minutes = parseInt(duration2Components[duration2Components.length - 2]);

        let sumMinutes = duration1Minutes + duration2Minutes + carry;
        if (sumMinutes >= 60) {
            carry = 1;
            sumMinutes -= 60;
        }

        // do we have hours?
        let duration1Hours = 0;
        if (duration1Components.length == 3) {
            duration1Hours = parseInt(duration1Components[0]);
        }
        let duration2Hours = 0;
        if (duration2Components.length == 3) {
            duration2Hours = parseInt(duration2Components[0]);
        }


        let sumHours = duration1Hours + duration2Hours + carry;

        return `${(sumHours > 0) ? sumHours + ':' : ''}${(sumMinutes < 10) ? '0' + sumMinutes : sumMinutes}:${(sumSeconds < 10) ? '0' + sumSeconds : sumSeconds}`
    } else {
        return '00:00';
    }
}