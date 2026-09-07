const ulDiv = document.querySelector("ul");
const timeControls = document.querySelector(".time-controls");
let activeBtn = document.querySelector(".active");

const addToDom = (data) => {
    const liDiv = document.createElement("li");
    liDiv.classList.add(data.title.replace(" ", "-").toLowerCase());
    const timeframes = data.timeframes;
    const activeBtnText = activeBtn.textContent.toLowerCase();
    liDiv.innerHTML = `
        <h2>${data.title}</h2>
        <button type="button"><img src="./images/icon-ellipsis.svg" alt="icon ellipsis"></button>
        <span>${timeframes[activeBtnText.toLowerCase()].current} hrs</span>
        <p>Last ${activeBtnText == "weekly" ? "Week" : activeBtnText == "daily" ? "Day" : "Month"} - ${timeframes[activeBtnText.toLowerCase()].previous}hrs</p>
    `;
    ulDiv.appendChild(liDiv);
};

const fetchData = () => {
    fetch("./data.json")
        .then((response) => {ulDiv.innerHTML = "";return response.json();})
        .then((dataArray) => {
            dataArray.forEach((data) => {
                addToDom(data);
            });
        });
};
fetchData();

timeControls.addEventListener("click", (e) => {
    e.target.classList.add("active");
    activeBtn = e.target;
    [...timeControls.children]
        .filter((button) => button != e.target)
        .forEach((button) => {
            button.classList.remove("active");
        });
    
    fetchData();
});
