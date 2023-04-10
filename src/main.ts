import "./style.css";
import {render, html, nothing} from "lit-html"


interface Photo {
  id: number;
  width: number; 
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: string;
  avg_color: string;
  //src might be a separate interface, but atm there is no need for that
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    tiny: string;
  }
}

interface PhotoSearchAPIResult {
  total_results: number;
  page: number;
  per_page: number;
  photos: Photo[];
  next_page: string;
}

const PEXELS_API_KEY = "hFC7xuAzaT4Af81QYKA7o5yVdf9FOKNyNpPl16QioZRDzaBzBh4k1df6"

async function fetchImagesFromAPI(searchTerm: string, perPage: number): Promise<PhotoSearchAPIResult> {
  const result = await fetch(
    `https://api.pexels.com/v1/search?query=${searchTerm}&per_page=${perPage}`, 
    {
      headers: {
        Authorization: PEXELS_API_KEY
      },
    }
  );

  // TS type assertion. 
  // extra () to tell TS that we need the result of the await function, not Promise()
  const json = (await result.json()) as PhotoSearchAPIResult;
  return json
} 


// fetchImagesFromAPI('dogs', 5).then((data) => {
//   // const htmlToRender = html`
//   //   <h1>Results for "dogs"</h1>
//   //   <ul>
//   //     ${data.photos.map((photo) => {
//   //       return html`<li><img src=${photo.src.small} /></li>`;
//   //     })}
//   //   </ul>
//   // `;
//   // const div = document.getElementById('app');
//   // if (!div) {
//   //   throw new Error("could not find app div")
//   // }
//   // render(htmlToRender, div)
// });

async function onFormSubmit(event: SubmitEvent) {
  event.preventDefault();
  if (!event.target) {
    return ;
  }
  // here "as" is needed because TS doesnt know that event.target is a form element. 
  const formData = new FormData(event.target as HTMLFormElement);

  const query = formData.get("search-query");
  if (query && typeof query === "string") {
    const results = await fetchImagesFromAPI(query, 10)
    renderApp(results)
  }
}

function renderApp(results: PhotoSearchAPIResult | null): void {
  const div = document.getElementById("app");
  if (!div) {
    throw new Error("couldnt'd find app div")
  }
  const htmlToRender = html`
  <h1>Amazing Photo App</h1>

  <form id="search" @submit=${onFormSubmit}>
    <input type="text" name="search-query" placeholder="for example: dogs" />
    <input type="submit" value="Search" />
  </form>
  <ul>
    ${results ? results.photos.map((photo) => {
      return html`<li><img src=${photo.src.small} /></li>`;
    })
  : nothing}
  </ul>
  `;
  render(htmlToRender, div);
}

renderApp(null);
