const generate = async () => {
  const requestURL = 'https://api.tvmaze.com/shows';
  const request = new Request(requestURL);

  const response = await fetch(request);
  const result = await response.json();

  return result;
};

const displayShows = async () => {
  const data = await generate();

  const container = document.querySelector('.container');

  data.forEach((show) => {
    const showCard = `
      <div id=${show.id} class="showCard">
      <img src=${show.image.medium} alt="TVshow thumbnail"/>
      <div class="title">
      <h2>${show.name}</h2>
      <i class="fa-regular fa-heart"></i>
      </div>
      <button class="comment">Comments</button>
      </div>
      `;

    container.innerHTML += showCard;
  });
};

const diplayComments = async () => {
  const data = await generate();

  const commentButtons = document.querySelectorAll('.comment');

  commentButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const currentShow = e.path[1];
      const id = currentShow.getAttribute('id');
      const currentShowDetail = data.filter((show) => show.id == id);

      console.log(currentShow, id, currentShowDetail);
    });
  });
};

export { displayShows, diplayComments };
