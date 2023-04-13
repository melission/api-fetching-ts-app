
// interface StoredUserLikes {
//     photos: number[];
//     videos: number[];
//   }

const LOCAL_STORAGE_KEY = "__REXELS_LIKES__";

export enum LikedResource {
  Photo = "Photo",
  Video = "Video"
};

interface StoredLike {
  id: number;
  resourceType: LikedResource;
}

export type StoredLikes = StoredLike[]

// localStorage stores only strings, so each value needs to be converted. 
export function saveLikes(likes: StoredLikes): void {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(likes));
}

export function loadLikes(): StoredLikes | null {
  const data = window.localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!data) {
    return null;
  }
  return JSON.parse(data)
}