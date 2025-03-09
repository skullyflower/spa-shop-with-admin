export type Gallery = {
  id: string
  json_path: string
  path: string
  title: string,
  linked_prod?: string,
  isStory?: boolean
}
export type GalleryObject = {
  [key: string]: Gallery
} | undefined

export const setgalleries = async (): Promise<GalleryObject> => {
  const response = await fetch("/data/galleries_list.json");
  const galleriesObj: GalleryObject = {};
  if (response.ok) {
    const galleries = await response.json();
    if (Array.isArray(galleries.galleries)) {
      galleries.galleries.forEach((gal: Gallery) => {
        galleriesObj[gal.id] = gal;
      });
    }
  }
  return galleriesObj;

};

export type GalleryImage = {
  imgfile: string
  imgtitle: string,
  imgyear: string
}
export type GalleryImages = {
  [key: string]: GalleryImage
}

export const getImageGallery = async (gallery: Gallery): Promise<GalleryImages> => {
  const galleryfeed = gallery.json_path;
  const response = await fetch(galleryfeed);
  return await response.json();
};
