const switchYear = year => {
    document.querySelectorAll('.day-container').forEach(element => {
        element.className = 'day-container';
    });

    document.querySelectorAll('.year-selector').forEach(element => {
        element.className = 'year-selector';
    });

    document.querySelector(`#year-${year}`).className = 'day-container current';
    document.querySelector(`#year-selector-${year}`).className = 'year-selector current';
}