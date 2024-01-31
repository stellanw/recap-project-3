const cardContainer = document.querySelector('[data-js="card-container"]');

export function CharacterCard() {
    const newCard = document.createElement("li");
    newCard.innerHTML = `
    <li class="card">
      <div class="card__image-container">
        <img
          class="card__image"
          src=${}
          alt=${}
        />
        <div class="card__image-gradient"></div>
      </div>
      <div class="card__content">
        <h2 class="card__title">${}</h2>
        <dl class="card__info">
          <dt class="card__info-title">Status</dt>
          <dd class="card__info-description">${}</dd>
          <dt class="card__info-title">Type</dt>
          <dd class="card__info-description">${}</dd>
          <dt class="card__info-title">Occurrences</dt>
          <dd class="card__info-description">${}</dd>
        </dl>
      </div>
    </li>
`;
    cardContainer.append(newCard);
}