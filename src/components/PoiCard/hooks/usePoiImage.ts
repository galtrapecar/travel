import { useEffect, useState } from 'react';
import { PointOfInterest } from '../../../types';
import { ImagesAPIUrls } from '../../../urls';
import { DuckDuckGoImage } from 'duckduckgo-images-api';

const usePoiImage = (poi: PointOfInterest) => {
  const [image, setImage] = useState<string>();

  const fetchImage = async () => {
    if (!poi || !poi.name) return;
    const url = ImagesAPIUrls.getImages(`${poi.name} ${poi.iso2}`);
    try {
      const response = await fetch(url);
      const images: DuckDuckGoImage[] = await response.json();
      setImage(images[0].thumbnail);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchImage();
  }, []);

  return {
    image,
    fetchImage,
  };
};

export default usePoiImage;
