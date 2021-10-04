module.exports = input => {
    let events = [];
    input.split('\n').forEach(element => {
        let event = {};
        let tokens = element.replace(/\[/g, '').split('] ');
        let [date, time] = tokens[0].split(' ');
        event.time = parseInt(time.split(':')[0]) * 60 + parseInt(time.split(':')[1]);
        event.time += parseInt(date.split('-')[0]) * 525600 + parseInt(date.split('-')[1]) * 43200 + parseInt(date.split('-')[2]) * 1440;
        event.rawTime = tokens[0];
        event.description = tokens[1];

        events.push(event);
    });
    events.sort((a, b) => a.time - b.time);

    let sleepingGuards = {};
    let currentGuardID = 0, sleepingTime = 0;
    for (let i = 0; i < events.length; i++) {
        let tokens = events[i].description.split(' ');
        if (tokens[0] == 'Guard') {
            currentGuardID = tokens[1].replace('#', '');
            if (!sleepingGuards[currentGuardID]) sleepingGuards[currentGuardID] = new Array(60);
        } else if (tokens[0] == 'falls') {
            sleepingTime = parseInt(events[i].rawTime.split(':')[1]);
        } else {
            let wakingTime = parseInt(events[i].rawTime.split(':')[1]);
            for (let i = sleepingTime; i < wakingTime; i++) {
                if (sleepingGuards[currentGuardID][i] == null) sleepingGuards[currentGuardID][i] = 0;
                sleepingGuards[currentGuardID][i]++;
            }
        }
    }

    let mostSleepingTime = 0;
    let mostSleeping = '';
    Object.keys(sleepingGuards).forEach(element => {
        let minutes = sleepingGuards[element].filter(element => element);
        if (minutes.length == 0) return;
        let timeSleeping = minutes.reduce((element, sum) => sum += element);
        if (mostSleepingTime < timeSleeping) {
            mostSleeping = element;
            mostSleepingTime = timeSleeping;
        }
    });

    let mostIndex = -1;
    for (let i = 0; i < sleepingGuards[mostSleeping].length; i++) {
        if (sleepingGuards[mostSleeping][i] == null) continue;
        if (mostIndex == -1) mostIndex = i;
        if (sleepingGuards[mostSleeping][mostIndex] < sleepingGuards[mostSleeping][i]) mostIndex = i;
    }
    return parseInt(mostSleeping) * mostIndex;
}