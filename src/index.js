
const dateHeading = document.querySelector('#current-date');

//setting current date
const setDate = () => {
    let date = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    dateHeading.innerHTML = `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}`;
}

setDate();