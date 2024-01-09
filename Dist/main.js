"use strict";
// Varibles 
let tries = 0;
let openCount = 0;
let countCorrect = 0;
let prevImg = null;
let index = -1;
let user = "";
let imgs = ['bear', 'Butterfly', 'cat', 'cow', 'dog', 'fish', 'horse', 'Snake', 'soso', 'whale', 'bear', 'Butterfly', 'cat', 'cow', 'dog', 'fish', 'horse', 'Snake', 'soso', 'whale'];
let userText = document.querySelector('header .user');
let wrongsText = document.querySelector('header .wrongs');
let cardsContent = document.querySelector('.cards ');
let startBtn = document.querySelector('.start .stars');
let input = document.querySelector('.start input');
// Execution Functions
wrongsText.innerHTML = tries < 10 ? `Wrong Tries : <span>0${tries}</span>` : `Wrong Tries : <span>${tries}</span>`;
input.oninput = () => {
    user = input.value;
    if (user != '' && user.length > 3) {
        startBtn.classList.remove('unclick');
    }
    else if (user == '' || user.length < 4) {
        startBtn.classList.add('unclick');
    }
};
startBtn.onclick = () => {
    var _a, _b;
    (_b = (_a = startBtn.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.classList.add('opacity-0');
    setTimeout(() => {
        var _a, _b;
        (_b = (_a = startBtn.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.remove();
    }, 520);
    userText.innerHTML = `Player : <span>${user}</span>`;
};
// againBtn.onclick = () => {
//   location.reload;
// }
let randomImgs = getImg(imgs);
for (let i = 0; i < randomImgs.length; i++) {
    createCard(randomImgs[i]);
}
let cardList = document.querySelectorAll('.cards .card');
cardList.forEach((card, i) => {
    card.addEventListener('click', () => {
        card.classList.add('rotate');
        let nowImg = card.children[0].children[0].getAttribute('src');
        openCount++;
        if (openCount == 2 && prevImg === nowImg) {
            cardList.forEach((card) => {
                card.classList.add('no');
            });
            setTimeout(addClass, 500, card, cardList, 'correct');
            openCount = 0;
            prevImg = null;
            countCorrect += 2;
        }
        else if (openCount == 2) {
            cardList.forEach((card) => {
                card.classList.add('no');
            });
            setTimeout(() => {
                removeClass('rotate', cardList);
                removeClass('no', cardList);
                openCount = 0;
                tries++;
                wrongsText.innerHTML = tries < 10 ? `Wrong Tries : <span>0${tries}</span>` : `Wrong Tries : <span>${tries}</span>`;
            }, 500);
        }
        else {
            prevImg = card.children[0].children[0].getAttribute('src');
            index = i;
        }
        if (countCorrect === cardList.length) {
            setTimeout(() => {
                createEnd();
                let againBtn = document.querySelector('.start .again');
                againBtn.onclick = () => {
                    location.reload();
                };
            }, 5000);
        }
    });
});
// Functions
function getImg(imgs) {
    let counter = imgs.length;
    let clone = imgs;
    let finalArr = [];
    while (counter--) {
        let randomNum = Math.floor(Math.random() * counter);
        let randomImg = clone[randomNum];
        finalArr.push(randomImg);
        clone.splice(randomNum, 1);
    }
    return finalArr;
}
function createCard(url) {
    let card = document.createElement('div');
    card.className = 'card';
    let frontCard = document.createElement('div');
    let img = document.createElement('img');
    img.src = `Images/${url}.jpg`;
    frontCard.appendChild(img);
    let backCard = document.createElement('div');
    backCard.className = 'back';
    backCard.innerHTML = `?`;
    card.appendChild(frontCard);
    card.appendChild(backCard);
    cardsContent.appendChild(card);
}
function removeClass(className, menu) {
    menu.forEach((ele) => {
        ele.classList.remove(className);
    });
}
function addClass(el, listEl, className) {
    el.classList.add(className);
    listEl[index].classList.add(className);
    removeClass('no', cardList);
}
function createEnd() {
    let endPage = document.createElement('div');
    endPage.className = 'start';
    let holder = document.createElement('div');
    holder.classList.add('holder');
    let playAgain = document.createElement('input');
    playAgain.type = `submit`;
    playAgain.value = `Play Agin`;
    playAgain.classList.add('again');
    playAgain.classList.add('btn');
    holder.appendChild(playAgain);
    endPage.appendChild(holder);
    document.body.appendChild(endPage);
}
