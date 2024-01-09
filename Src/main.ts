// Varibles 

let tries: number = 0;
let openCount: number = 0;
let countCorrect: number = 0;
let prevImg: string | null = null;
let index: number = -1;
let user: string = "";
let imgs: string[] = ['bear', 'Butterfly','cat', 'cow','dog', 'fish', 'horse', 'Snake','soso', 'whale', 'bear', 'Butterfly','cat', 'cow','dog', 'fish', 'horse', 'Snake','soso', 'whale'];

let userText = <HTMLDivElement>document.querySelector('header .user');
let wrongsText = <HTMLDivElement>document.querySelector('header .wrongs');
let cardsContent = <HTMLDivElement>document.querySelector('.cards ');
let startBtn = <HTMLInputElement>document.querySelector('.start .stars');
let input = <HTMLInputElement>document.querySelector('.start input');

// Execution Functions

wrongsText.innerHTML = tries < 10 ? `Wrong Tries : <span>0${tries}</span>`: `Wrong Tries : <span>${tries}</span>`;

input.oninput = () => {
  user = input.value;
  if (user != '' && user.length > 3) {
    startBtn.classList.remove('unclick');
  }
  else if (user == '' || user.length < 4) {
    startBtn.classList.add('unclick');
  }
}



startBtn.onclick = () => {
  startBtn.parentElement?.parentElement?.classList.add('opacity-0');
  setTimeout(() => {
    startBtn.parentElement?.parentElement?.remove();
  }, 520);
  userText.innerHTML = `Player : <span>${user}</span>`;
}

// againBtn.onclick = () => {
//   location.reload;
// }

let randomImgs: string[] = getImg(imgs);

for (let i = 0; i < randomImgs.length; i++) {
  
  createCard(randomImgs[i]);
  
}

let cardList = <NodeListOf<HTMLElement>>document.querySelectorAll('.cards .card')

cardList.forEach((card: HTMLElement, i: number) => {
  card.addEventListener('click', () => {
    card.classList.add('rotate');
    let nowImg: string | null = card.children[0].children[0].getAttribute('src');
    openCount++;

    if (openCount == 2 && prevImg === nowImg) {
      cardList.forEach((card: HTMLElement) => {
        card.classList.add('no')
      })
      setTimeout(addClass, 500, card, cardList, 'correct');
      openCount = 0;
      prevImg = null;
      countCorrect += 2;
    }

    else if (openCount == 2) {
      cardList.forEach((card: HTMLElement) => {
        card.classList.add('no')
      })
      setTimeout(() => {
        removeClass('rotate', cardList);
        removeClass('no', cardList);
        openCount = 0;
        tries++;
        wrongsText.innerHTML = tries < 10 ? `Wrong Tries : <span>0${tries}</span>`: `Wrong Tries : <span>${tries}</span>`;
      }, 500);

    }

    else {
      prevImg = card.children[0].children[0].getAttribute('src');
      index = i;
    }
    if (countCorrect === cardList.length) {
      setTimeout(() => {
        createEnd();
        let againBtn = <HTMLInputElement>document.querySelector('.start .again');
        againBtn.onclick = () => {
          location.reload();
        }
      }, 5000);
    }
  })
  
})




// Functions

function getImg(imgs:string[]): string[] {
  let counter: number = imgs.length;
  let clone: string[] = imgs;
  let finalArr: string[] = [];

  while (counter--) {
    let randomNum: number = Math.floor(Math.random() * counter);

    let randomImg: string = clone[randomNum];
    finalArr.push(randomImg);
    clone.splice(randomNum, 1);
  }
  return finalArr;
}

function createCard(url: string) {
  let card = <HTMLElement>document.createElement('div');
  card.className = 'card';

  let frontCard = <HTMLElement>document.createElement('div');
  let img = <HTMLImageElement>document.createElement('img');
  img.src = `Images/${url}.jpg`;

  frontCard.appendChild(img);

  let backCard = <HTMLElement>document.createElement('div');
  backCard.className = 'back';
  backCard.innerHTML = `?`;

  card.appendChild(frontCard);
  card.appendChild(backCard);

  cardsContent.appendChild(card);
}

function removeClass(className: string, menu: NodeListOf<HTMLElement>) {
  menu.forEach((ele) => {
    ele.classList.remove(className);
  })
}

function addClass(el: HTMLElement, listEl: NodeListOf<HTMLElement>, className: string) {
    el.classList.add(className);
    listEl[index].classList.add(className);
    removeClass('no', cardList);
}

function createEnd() {
  let endPage = <HTMLDivElement>document.createElement('div');
  endPage.className = 'start';
  
  let holder = <HTMLDivElement>document.createElement('div');
  holder.classList.add('holder');

  let playAgain = <HTMLInputElement>document.createElement('input');
  playAgain.type = `submit`;
  playAgain.value = `Play Agin`;

  playAgain.classList.add('again');
  playAgain.classList.add('btn');

  holder.appendChild(playAgain);
  endPage.appendChild(holder);

  document.body.appendChild(endPage);
  
}

