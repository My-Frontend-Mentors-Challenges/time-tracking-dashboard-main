const ulDiv = document.querySelector("ul");
const timeControls = document.querySelector(".time-controls");
const weeklyBtn= timeControls.querySelector('[data-filter="weekly"]');
let activeFilter = "weekly";
weeklyBtn.classList.add('active');

const addToDom = (data) => {
    const liDiv = document.createElement("li");
    const titleLowerCase = data.title.replace(" ", "-").toLowerCase();
    liDiv.classList.add(titleLowerCase);
    const timeframes = data.timeframes;

    liDiv.innerHTML = `
        <h2>${data.title}</h2>
        <button type="button"><img src="./images/icon-ellipsis.svg" alt="icon ellipsis"></button>
        <span>${timeframes[activeFilter].current} hrs</span>
        <p>${activeFilter === "weekly" ? "Last Week" : activeFilter === "daily" ? "Yesterday" : "Last Month"} - ${timeframes[activeFilter].previous}hrs</p>
        <img src="./images/icon-${titleLowerCase}.svg" alt="">
    `;
    ulDiv.appendChild(liDiv);
};

const fetchData = fetch("./data.json").then((response) => response.json());

const render = () => {
    fetchData.then((dataArray) => {
        ulDiv.innerHTML = "";
        dataArray.forEach((data) => {
            addToDom(data);
        });
    });
};
render();

timeControls.addEventListener("click", (e) => {
    const button = e.target.closest("button"); // it might contain another child elements so we choose the closest parent button
    if (!button) return;

    activeFilter = button.dataset.filter;
    console.log(activeFilter);
    [...timeControls.children].forEach((button) => {
        button.classList.toggle("active", button.dataset.filter === activeFilter);
    });

    render();
});
