import moment from 'moment';

export function duration({ from, to }) {
    const difference = findLongestDifference({
        from: moment(from),
        to: to ? moment(to) : moment()
    });

    if (difference) {
        const { value, measurement } = difference;
        return moment.duration(value, measurement).humanize(true);
    }

    return 'a moment ago';
}

function findLongestDifference({ from, to }) {
    const measurements = ['years', 'months', 'days', 'hours', 'minutes'];

    for (let i = 0; i < measurements.length; ++i) {
        let measurement = measurements[i];
        let value = from.diff(to, measurement);

        if (value < 0) {
            return {
                value,
                measurement,
            };
        }
    }

    return null;
}