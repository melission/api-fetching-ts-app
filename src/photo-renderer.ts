import { Photo } from "./pexels-api";
import { html } from "lit-html";

export function renderPhoto(photo: Photo) {
    return html`<li class="photo"><img src=${photo.src.small} />
    <button class="like">Like</button>
    </li>`
}
