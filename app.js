'use strict'
let imgSection = document.getElementById('images');

let leftI = document.createElement('img')
imgSection.appendChild(leftI)
let middleI = document.createElement('img')
imgSection.appendChild(middleI)
let rightI = document.createElement('img')
imgSection.appendChild(rightI)
console.log(imgSection);


const maxClicks = 25;
let counter = 0;

function Items(name, path,) {
    this.name = name;
    this.path = path;
    this.showingT = 0;
    this.vote = 0;
    Items.iArray.push(this);
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

console.log(Items.iArray);

function generateRandomIndex() {
    return Math.floor(Math.random() * Items.iArray.length);
}

console.log(generateRandomIndex());

let leftI_
let middleI_
let rightI_

function render3Imgs() {
    leftI_ = generateRandomIndex();
    middleI_ = generateRandomIndex();
    rightI_ = generateRandomIndex();
    while (middleI_ === rightI_) {
        middleI_ = generateRandomIndex();
    }
    while (leftI_ === middleI_ || leftI_ === rightI_) {
        leftI_ = generateRandomIndex();
    }
    //i think we should add the show times here
    Items.iArray[leftI_].showingT++;
    Items.iArray[middleI_].showingT++;
    Items.iArray[rightI_].showingT++;

    leftI.src = Items.iArray[leftI_].path;
    middleI.src = Items.iArray[middleI_].path;
    rightI.src = Items.iArray[rightI_].path;
    leftI.id = 'left';
    middleI.id = 'middle';
    rightI.id = 'right';
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
            const btn = document.createElement('input');
            imgSection.appendChild(btn);
            btn.type = 'submit';
            btn.value = 'Show results';
            btn.addEventListener('click', show);
            function show() {
                renderResults();
                btn.removeEventListener('click', show);
                leftI.removeEventListener('click', reaction);
                middleI.removeEventListener('click', reaction);
                rightI.removeEventListener('click', reaction);
            }

        }
        render3Imgs();
    } 
    console.log(counter);
    console.log(Items.iArray);
}

function renderResults() {
    const list = document.getElementById('resultsL')
    for (let i = 0; i < Items.iArray.length; i++) {
        let li = document.createElement('li')
        list.appendChild(li)
        li.textContent = `${Items.iArray[i].name} had ${Items.iArray[i].vote} votes, and was seen ${Items.iArray[i].showingT} times.`
    }
    leftI.removeEventListener('click', reaction);
    middleI.removeEventListener('click', reaction);
    rightI.removeEventListener('click', reaction);
}