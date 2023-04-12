import { Photo, Video } from "./pexels-api";
import { html } from "lit-html";

export function renderPhoto(
    photo: Photo, 
    onLikeClick: (photoID: number) => void, 
    photoIsLiked: boolean 
    ) {
    return html`<li class="photo"><img src=${photo.src.small} />
    <button class="like" @click=${ () => onLikeClick(photo.id)}>${photoIsLiked ? "Dislike" : "Like"}</button>
    </li>`
}

export function renderVideo(
    video: Video, 
    onLikeClick: (videoID: number) => void,
    videoIsLiked: boolean
    ) {
        return html`<li class="photo"><img src=${video.image} />
        <button class="like" @click=${() => onLikeClick(video.id)}>
        ${videoIsLiked ? "Dislike" : "Like"} 
        </button>
        </li>`
    }