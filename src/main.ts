import "./style.css";
import {render, html, nothing} from "lit-html";
import { fetchImagesFromAPI, fetchVideosFromAPI, Photo, 
  PhotoSearchAPIResult, Video, isPhoto } from "./pexels-api";
import { renderPhoto, renderVideo } from "./object-renderer";
import { loadLikes, saveLikes } from "./storage";


async function onFormSubmit(event: SubmitEvent) {
  event.preventDefault();
  if (!event.target) {
    return ;
  }
  // here "as" is needed because TS doesnt know that event.target is a form element. 
  const formData = new FormData(event.target as HTMLFormElement);

  const query = formData.get("search-query");
  if (query && typeof query === "string") {
    const results = await fetchImagesFromAPI(query, 10);
    const videos = await fetchVideosFromAPI(query, 10);

    const photosAndVideos: Array<Photo | Video> = [];
    for (let i = 0; i < results.photos.length; i++){
      photosAndVideos.push(results.photos[i]);
      photosAndVideos.push(videos.videos[i]);
    }
    renderApp(photosAndVideos);
  }
}

function renderApp(results: Array<Photo | Video> | null): void {
  const div = document.getElementById("app");
  if (!div) {
    throw new Error("couldnt'd find app div")
  }
  const likedData = loadLikes() || {
    photos: [],
    videos: [],
  };
  function onUserLikeClick(photoID: number): void {
    const photoIsLiked = likedData.photos.includes(photoID);
    if (photoIsLiked) {
      likedData.photos = likedData.photos.filter( (id) => id !== photoID);
    } else {
      likedData.photos.push(photoID);
    }
    saveLikes(likedData);
    renderApp(results);
  };

  const htmlToRender = html`
  <h1>Amazing Photo App</h1>

  <form id="search" @submit=${onFormSubmit}>
    <input type="text" name="search-query" placeholder="for example: dogs" />
    <input type="submit" value="Search" />
  </form>
  <ul>
    ${results ? results.map((recourse) => {
      if (isPhoto(recourse)) {
        const photoIsLiked = likedData.photos.includes(recourse.id)
        return renderPhoto(recourse, onUserLikeClick, photoIsLiked)
      } else {
        const videoIsLiked = likedData.videos.includes(recourse.id);
        return renderVideo(recourse, onUserLikeClick, videoIsLiked);
      }
    })
  : nothing}
  </ul>
  `;
  render(htmlToRender, div);
}

renderApp(null);
