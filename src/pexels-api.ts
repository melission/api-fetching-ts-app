// import { render, html, nothing} from "lit-html";


export interface Photo {
    readonly id: number;
    readonly width: number; 
    readonly height: number;
    readonly url: string;
    readonly photographer: string;
    readonly photographer_url: string;
    readonly photographer_id: string;
    readonly avg_color: string;
    //src might be a separate interface, but atm there is no need for that
    readonly src: Readonly<{
      original: string;
      large2x: string;
      large: string;
      medium: string;
      small: string;
      portrait: string;
      tiny: string;
    }>
  }
  
export interface PhotoSearchAPIResult {
    readonly total_results: number;
    readonly page: number;
    readonly per_page: number;
    readonly photos: readonly Photo[];
    readonly next_page: string;
  }
  
const PEXELS_API_KEY = "hFC7xuAzaT4Af81QYKA7o5yVdf9FOKNyNpPl16QioZRDzaBzBh4k1df6"
  
export async function fetchImagesFromAPI(searchTerm: string, perPage: number): Promise<PhotoSearchAPIResult> {
    const result = await fetch(
      `https://api.pexels.com/v1/search?query=${searchTerm}&per_page=${perPage}`, 
      {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
      }
    );
  
    // TS type assertion. 
    // extra () to tell TS that we need the result of the await function, not Promise()
    const json = (await result.json()) as PhotoSearchAPIResult;
    return json
  } 