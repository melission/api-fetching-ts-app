import "./style.css";
import {render, html, nothing} from "lit-html";
import { fetchImagesFromAPI, fetchVideosFromAPI, isPhoto, Resource } from "./pexels-api";
import { renderResource } from "./object-renderer";
import { LikedResource, loadLikes, saveLikes } from "./storage";


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

    const photosAndVideos: Array<Resource> = [];
    for (let i = 0; i < results.photos.length; i++){
      photosAndVideos.push(results.photos[i]);
      photosAndVideos.push(videos.videos[i]);
    }
    renderApp(photosAndVideos);
  }
}

function renderApp(results: Array<Resource> | null): void {
  const div = document.getElementById("app");
  if (!div) {
    throw new Error("couldnt'd find app div")
  }
  const likedData = loadLikes() || [];

  function onUserLikeClick(resource: Resource): void {
    const enumResourceType = isPhoto(resource) 
    ? LikedResource.Photo 
    : LikedResource.Video;

    const likedResourceEntry = likedData.find((entry) => {
      return(entry.id === resource.id && entry.resourceType === enumResourceType);
    });

    const resourceIsLiked = likedResourceEntry !== undefined;

    let newLikedResources = likedData;

    if (resourceIsLiked) {
      newLikedResources = newLikedResources.filter(
        (entry) => entry !== likedResourceEntry);
    } else {
      newLikedResources.push({
        id: resource.id,
        resourceType: enumResourceType,
      });
    }
    saveLikes(newLikedResources);
    renderApp(results);
  };

  const htmlToRender = html`
  <h1>Amazing Photo App</h1>

  <form id="search" @submit=${onFormSubmit}>
    <input type="text" name="search-query" placeholder="for example: dogs" />
    <input type="submit" value="Search" />
  </form>
  <ul>
  ${ results ? results.map((resource) => {
    const resourceIsLiked = likedData.some((entry) => {
      const enumResourceType = isPhoto(resource) 
      ? LikedResource.Photo : LikedResource.Video;
      return (
        entry.id === resource.id && entry.resourceType === enumResourceType
      );
    });
    return renderResource(resource, onUserLikeClick, resourceIsLiked);
  })
  : nothing}
  </ul>
  `;
  render(htmlToRender, div);
}

renderApp(null);
