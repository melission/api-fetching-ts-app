import { Photo } from "./pexels-api";
import { html } from "lit-html";

export function renderPhoto(photo: Photo) {
    return html`<li><img src=${photo.src.small} /></li>`
}
