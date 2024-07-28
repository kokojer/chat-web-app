export enum CONTENT_TYPES {
  SVG = "image/svg+xml",
  PNG = "image/png",
  JPG = "image/jpeg",
  GIF = "image/gif",
}

export const IMAGE_TYPES = {
  [CONTENT_TYPES.SVG]: "svg",
  [CONTENT_TYPES.PNG]: "png",
  [CONTENT_TYPES.JPG]: "jpg",
  [CONTENT_TYPES.GIF]: "gif",
};
