import { Photo } from "./pexels-api";
import { html } from "lit-html";

export function renderPhoto(photo: Photo, onLikeClick: (photoID: number) => void, photoIsLiked: boolean ) {
    return html`<li class="photo"><img src=${photo.src.small} />
    <button class="like" @click=${ () => onLikeClick(photo.id)}>${photoIsLiked ? "Dislike" : "Like"}</button>
    </li>`
}
