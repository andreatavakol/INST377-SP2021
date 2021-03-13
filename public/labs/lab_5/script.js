function mapInit() {
  // follow the Leaflet Getting Started tutorial here
  return map;
}

async function dataHandler(mapObjectFromFunction) {
  /// The filter is by category

  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json'
  x = []

  async function windowActions(){
      console.log('Window loaded')
      const form = document.querySelector('.userform');

      form.addEventListener('submit', async(event) =>{
          event.preventDefault();
          const request = await fetch(endpoint);
          const arrayName = await request.json()
              .then(data => x.push(...data))
              
          });

      function findMatches(wordToMatch, x){
          return x.filter(place => {

              const regex = new RegExp(wordToMatch, 'gi');
              return place.category.match(regex)
          });
      }
      function displayMatches(event){
          const matchArray = findMatches(event.target.value, x);
          const html = matchArray.map(place => {
              const regex = new RegExp(event.target.value, 'gi');
              const categoryName = place.category.replace(regex, `<span class="hl">${event.target.value}</span>`);
              return `
                  <li class="block mt-4 py-4">
                      <span class="name big">${place.name}</span><br>
                      <span class="name">${categoryName}</span>
                      <address>
                          <span>${place.address_line_1}</span><br>
                          <span>${place.city}</span><br>
                          <span>${place.zip}</span>
                      </address>
                  </li>
              `;
          }).join('');
          suggestions.innerHTML = html;
      }

      const suggestions = document.querySelector('.suggestions');

      search.addEventListener('change', displayMatches);
      search.addEventListener('keyup', (evt) => {displayMatches(evt)});

  }

  window.onload = windowActions;
}

async function windowActions() {
  const map = mapInit();
  await dataHandler(map);
}

window.onload = windowActions;