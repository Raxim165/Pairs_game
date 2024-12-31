class Card {
  constructor(container, cardNumber, flip) {
    this.container = container;
    this._cardNumber = cardNumber;
    this._open = false;
    this._success = false;
    this.flip = flip;

    this._cardElement = this.createElement();
    this.container.append(this._cardElement);
  }

  createElement() {
    const card = document.createElement("div");
    card.classList.add("card");
    card.addEventListener("click", () => {
      if (!this._success && !this._open) this.flip(this); // Вызываем колбэк-функцию при клике
    });
    return card;
  }

  set cardNumber(value) {
    this._cardNumber = value;
    if (this._cardElement) {
      this._cardElement.dataset.cardNumber = value; // Сохраняем номер в data-атрибут
    }
  }

  get cardNumber() {
    return this._cardNumber;
  }

  set success(value) {
    this._success = value;
    if (this._cardElement && value) {
      this._cardElement.classList.add("success");
    }
  }

  get success() {
    return this._success;
  }
}

export class AmazingCard extends Card {
  constructor(container, cardNumber, flip) {
    super(container, cardNumber, flip); // Вызываем конструктор родителя
  }
  set open(value) {
    this._open = value;
    if (this._cardElement) {
      if (value) {
        this._cardElement.classList.add("open");
        const img = document.createElement('img')
        img.src = `./svg-icons/${this._cardNumber}.svg`;
        img.onerror = () => img.src = `./svg-icons/default.svg`;
        this._cardElement.append(img);
      }
      else {
        this._cardElement.classList.remove("open");
        setTimeout(() => (this._cardElement.innerHTML = ""), 100);
      }
    }
  }

  get open() {
    return this._open;
  }
}

let firstCard = null;
let secondCard = null;

export function flipCard(card) {
  if (!firstCard) {
    firstCard = card;
    card.open = true; // Открываем первую карту
  } else if (!secondCard && card !== firstCard) {
    secondCard = card;
    card.open = true; // Открываем вторую карту

    // Проверяем, совпадают ли карты
    if (firstCard.cardNumber === secondCard.cardNumber) {
      firstCard.success = true;
      secondCard.success = true;
      firstCard = null;
      secondCard = null; // Сбрасываем выбранные карты
    } else {
      // Если карты не совпали, закрываем их с задержкой
      setTimeout(() => {
        firstCard.open = false;
        secondCard.open = false;
        firstCard = null;
        secondCard = null; // Сбрасываем выбранные карты
      }, 600);
    }
  }
}