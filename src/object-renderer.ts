import { Resource, isPhoto } from "./pexels-api";
import { html } from "lit-html";

// export function renderPhoto(
//     photo: Photo, 
//     onLikeClick: (resource: Photo) => void, 
//     photoIsLiked: boolean 
//     ) {
//     return html`<li class="photo"><img src=${photo.src.small} />
//     <button class="like" @click=${ () => onLikeClick(photo)}>
//     ${photoIsLiked ? "Dislike" : "Like"}
//     </button>
//     </li>`
// }

// export function renderVideo(
//     video: Video, 
//     onLikeClick: (resource: Video) => void,
//     videoIsLiked: boolean
//     ) {
//         return html`<li class="photo"><img src=${video.image} />
//         <button class="like" @click=${() => onLikeClick(video)}>
//         ${videoIsLiked ? "Dislike" : "Like"} 
//         </button>
//         </li>`
//     }

export function renderResource(
    resource: Resource,
    onLikeClick: (resource: Resource) => void,
    recourseIsLiked: boolean
) {
    const imageURL = isPhoto(resource) ? resource.src.small : resource.image;
    return html`<li class="photo">
        <img src=${imageURL} />
        <button class="like" @click=${() => onLikeClick(resource)}>
            ${recourseIsLiked ? "Dislike" : "Like"}
        </button>
    </li>`;
}