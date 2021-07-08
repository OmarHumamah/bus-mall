'use strict'
let imgSection = document.getElementById('images');

let leftI = document.createElement('img')
imgSection.appendChild(leftI)
let middleI = document.createElement('img')
imgSection.appendChild(middleI)
let rightI = document.createElement('img')
imgSection.appendChild(rightI)
// console.log(imgSection);


const maxClicks = 5;
let counter = 0;
let arrayOfNames = [];
let numberOfVotes = [];
let numberOfShow = [];
function Items(name, path,) {
    this.name = name;
    this.path = path;
    this.showingT = 0;
    this.vote = 0;
    Items.iArray.push(this);
    arrayOfNames.push(this.name)
}

Items.iArray = []

new Items('bag', 'images/bag.jpg');
new Items('banana', 'images/banana.jpg');
new Items('bathroom', 'images/bathroom.jpg');
new Items('boots', 'images/boots.jpg');
new Items('breakfast', 'images/breakfast.jpg');
new Items('bubblegum', 'images/bubblegum.jpg');
new Items('chair', 'images/chair.jpg');
new Items('cthulh', 'images/cthulhu.jpg');
new Items('dog-duck', 'images/dog-duck.jpg');
new Items('dragon', 'images/dragon.jpg');
new Items('pen', 'images/pen.jpg');
new Items('pet-sweep', 'images/pet-sweep.jpg');
new Items('scissors', 'images/scissors.jpg');
new Items('shark', 'images/shark.jpg');
new Items('sweep', 'images/sweep.png');
new Items('tauntaun', 'images/tauntaun.jpg');
new Items('unicorn', 'images/unicorn.jpg');
new Items('water-can', 'images/water-can.jpg');
new Items('wine-glass', 'images/wine-glass.jpg');

// console.log(Items.iArray);

function generateRandomIndex() {
    return Math.floor(Math.random() * Items.iArray.length);
}


let leftI_
let middleI_
let rightI_
let preLeftI_ = -1;
let preMiddleI_ = -1;
let preRightI_ = -1;
let checkerIndexesArray;
function render3Imgs() {
    checkerIndexesArray = [preLeftI_, preMiddleI_, preRightI_]

    leftI_ = generateRandomIndex();
    console.log([leftI_]);
    while (checkerIndexesArray.includes(leftI_)) {
        leftI_ = generateRandomIndex();
    }
    middleI_ = generateRandomIndex();
    console.log([middleI_]);
    while (checkerIndexesArray.includes(middleI_) || leftI_ === middleI_) {
        middleI_ = generateRandomIndex();
    }
    rightI_ = generateRandomIndex();
    console.log([rightI_]);
    while (checkerIndexesArray.includes(rightI_) || middleI_ === rightI_ || leftI_ === rightI_) {
        rightI_ = generateRandomIndex();
    }

    preLeftI_ = leftI_;
    preMiddleI_ = middleI_;
    preRightI_ = rightI_;

    Items.iArray[leftI_].showingT++;
    Items.iArray[middleI_].showingT++;
    Items.iArray[rightI_].showingT++;

    leftI.src = Items.iArray[leftI_].path;
    middleI.src = Items.iArray[middleI_].path;
    rightI.src = Items.iArray[rightI_].path;
    leftI.id = 'left';
    middleI.id = 'middle';
    rightI.id = 'right';

    console.log(checkerIndexesArray);
    console.log([leftI_, middleI_, rightI_]);


}

render3Imgs();




leftI.addEventListener('click', reaction);
middleI.addEventListener('click', reaction);
rightI.addEventListener('click', reaction);

function reaction(event) {
    counter++;

    if (maxClicks >= counter) {
        if (event.target.id === 'left') {
            Items.iArray[leftI_].vote++;
        } else if (event.target.id === 'middle') {
            Items.iArray[middleI_].vote++;
        } else if (event.target.id === 'right') {
            Items.iArray[rightI_].vote++;
        }
        if (counter === maxClicks) {
            const display = document.getElementById('chart')
            const btn = document.createElement('input');
            imgSection.appendChild(btn);
            btn.type = 'submit';
            btn.value = 'Show results';
            btn.addEventListener('click', show);
            function show() {
                display.style.display = 'block'
                renderResults();
                getChart();
                btn.removeEventListener('click', show);

            }

        }
        saveResults();
        render3Imgs();

    }
    // console.log(counter);
    // console.log(Items.iArray);
}

function renderResults() {
    const list = document.getElementById('resultsL')

    for (let i = 0; i < Items.iArray.length; i++) {
        numberOfVotes.push(Items.iArray[i].vote);
        numberOfShow.push(Items.iArray[i].showingT);
        let li = document.createElement('li');
        list.appendChild(li);
        li.textContent = `${Items.iArray[i].name} had ${Items.iArray[i].vote} votes, and was seen ${Items.iArray[i].showingT} times.`
    }

    leftI.removeEventListener('click', reaction);
    middleI.removeEventListener('click', reaction);
    rightI.removeEventListener('click', reaction);
}

// console.log(numberOfVotes);
function getChart() {
    /* var ctx = document.getElementById('myChart');
     var myChart = new Chart(ctx, {
         type: 'bar',
         data: {
             labels: arrayOfNames,
             datasets: [{
                 label: 'Number of Show',
                 data: numberOfShow,
                 backgroundColor: [
                     'rgba(255, 0, 0, 0.8)',
 
                 ],
                 borderColor: [
                     'rgba(0, 0, 0, 1)',
                 ],
                 borderWidth: 2
             },
             {
                 label: 'Number of Votes',
                 data: numberOfVotes,
                 backgroundColor: [
                     'rgba(0, 0, 255, 0.8)',
 
                 ],
                 borderColor: [
                     'rgba(0, 0, 0, 1)',
                 ],
                 borderWidth: 2
             }]
         },
 
     });*/
    //..
    var ctx = document.getElementById('myChart');
    var mixedChart = new Chart(ctx, {
        data: {
            datasets: [{
                type: 'line',
                label: 'Number of Votes',
                data: numberOfVotes,
                backgroundColor: [
                    'rgba(255, 0, 0, 0.8)',],
                borderWidth: 2,
                borderColor: [
                    'rgba(0, 0, 0, 1)',
                ],
            },
            {
                type: 'bar',
                label: 'Number of Show',
                data: numberOfShow,
                backgroundColor: [
                    'rgba(0, 0, 255, 0.8)',],
                borderWidth: 2,
                borderColor: [
                    'rgba(0, 0, 0, 1)',
                ],
            }],
            labels: arrayOfNames,
            
        },
    });
}
function saveResults() {
    let ConvArray = JSON.stringify(Items.iArray)
    localStorage.setItem('results', ConvArray);
}

function getResults() {
    let savedResults = localStorage.getItem('results');
    let parsedResults = JSON.parse(savedResults);
    if (parsedResults) {
        Items.iArray = parsedResults;
    }

}

getResults();