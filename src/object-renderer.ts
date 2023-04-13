import { Photo, Video } from "./pexels-api";
import { html } from "lit-html";

export function renderPhoto(
    photo: Photo, 
    onLikeClick: (resource: Photo) => void, 
    photoIsLiked: boolean 
    ) {
    return html`<li class="photo"><img src=${photo.src.small} />
    <button class="like" @click=${ () => onLikeClick(photo)}>
    ${photoIsLiked ? "Dislike" : "Like"}
    </button>
    </li>`
}

export function renderVideo(
    video: Video, 
    onLikeClick: (resource: Video) => void,
    videoIsLiked: boolean
    ) {
        return html`<li class="photo"><img src=${video.image} />
        <button class="like" @click=${() => onLikeClick(video)}>
        ${videoIsLiked ? "Dislike" : "Like"} 
        </button>
        </li>`
    }