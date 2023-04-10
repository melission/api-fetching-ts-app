
interface StoredUserLikes {
    photos: number[];
    videos: number[];
  }

const LOCAL_STORAGE_KEY = "__REXELS_LIKES__";

// localStorage stores only strings, so each value needs to be converted. 
export function saveLikes(likes: StoredUserLikes): void {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(likes));
}
