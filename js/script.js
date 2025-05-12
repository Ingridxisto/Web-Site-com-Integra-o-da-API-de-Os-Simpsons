/*************************************
* Objetivo: Integração com API de Os Simpsons.
* Data: 12/05/2025
* Autor: Ingrid Xisto Santos
* Versão: 1.0
* Github: https://github.com/Ingridxisto/Web-Site-com-Integra-o-da-API-de-Os-Simpsons
************************************/


const API_URL = 'https://apisimpsons.fly.dev/api/personajes?limit=100';
let allCharacters = [];

const fetchCharacters = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    allCharacters = data.docs;
    displayCharacters(allCharacters);
  } catch (error) {
    console.error('Erro ao buscar os personagens:', error);
  }
};


const displayCharacters = (characters) => {
  const container = document.getElementById('cards-container');
  container.innerHTML = ''; // Limpa os cards antes de renderizar

  characters.forEach((character) => {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
      <h3>${character.Nombre}</h3>
      <span class="heart">&#9825;</span> 
      <img src="${character.Imagen}" alt="${character.Nombre}" />
      <div class="card-body">
        ${character.Historia ? character.Historia.substring(0, 100) + '...' : 'Sem descrição disponível'}
      </div>
    `;

    const heart = card.querySelector('.heart');
    heart.addEventListener('click', () => {
      const favoritesContainer = document.getElementById('favorites-container');
      const isFavorited = heart.classList.toggle('favorited');
      heart.innerHTML = isFavorited ? '&#10084;' : '&#9825;';

      if (isFavorited) {
        const favoriteCard = document.createElement('div');
        favoriteCard.classList.add('card');
        favoriteCard.innerHTML = `
          <h3>${character.Nombre}</h3>
          <span class="heart favorited">&#10084;</span>
          <img src="${character.Imagen}" alt="${character.Nombre}" />
          <div class="card-body">
            ${character.Historia ? character.Historia.substring(0, 100) + '...' : 'Sem descrição disponível'}
          </div>
        `;
        favoriteCard.setAttribute('data-nome', character.Nombre);

        // Adiciona o evento de clique no coração da seção de favoritos
        const favHeart = favoriteCard.querySelector('.heart');
        favHeart.addEventListener('click', () => {
          // Remove o favorito
          favoriteCard.remove();
          heart.classList.remove('favorited');
          heart.innerHTML = '&#9825;';
        });

        favoritesContainer.appendChild(favoriteCard);
      } else {
        // Caso o personagem seja removido dos favoritos, será removido o coração vermelho na lista de personagens
        heart.classList.remove('favorited');
        heart.innerHTML = '&#9825;';
      }
    });

    container.appendChild(card);
  });
};

// Filtro de busca
const searchInput = document.getElementById('search');
searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filtered = allCharacters.filter((char) =>
    char.Nombre.toLowerCase().includes(searchTerm)
  );
  displayCharacters(filtered);
});

fetchCharacters();
