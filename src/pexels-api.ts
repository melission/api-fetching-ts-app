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
  
 export interface VideoFile {
    id: number;
    qualirt: "hd" | "sd";
    file_type: string;
    width: number;
    height: number;
    link: string;
 }
 
 export interface Video {
    readonly id: number;
    readonly url: string;
    readonly image: number;
    readonly duration: number;
    readonly video_files: readonly VideoFile[];
 }

 export interface VideoSearchAPIResult {
    readonly page: number;
    readonly per_page: number;
    readonly next_page: number;
    readonly total_results: number;
    readonly videos: readonly Video[];
 }


 //union type
export type Resource = Photo | Video;

const PEXELS_API_KEY = "hFC7xuAzaT4Af81QYKA7o5yVdf9FOKNyNpPl16QioZRDzaBzBh4k1df6"

export function isPhoto(object: Resource): object is Photo {
    //duration is an attribute of Video interface only
    const hasDuration = "duration" in object;
    return !hasDuration;
}

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

  export async function fetchVideosFromAPI(searchTerm: string, perPage: number): 
  Promise<VideoSearchAPIResult> {
    const result = await fetch(
        `https://api.pexels.com/v1/videos/search?query=${searchTerm}&per_page=${perPage}`,
        {
            headers: {
                Authorization: PEXELS_API_KEY,
            },
        }
    );
    
    const json = (await result.json()) as VideoSearchAPIResult;
    return json;
  }