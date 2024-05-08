import { useEffect, useState } from 'react';
import { Monument } from '../../../types';
import { ImagesAPIUrls } from '../../../urls';
import { DuckDuckGoImage } from 'duckduckgo-images-api';

const useMonumentImage = (monument: Monument) => {
  const [image, setImage] = useState<string>();

  const fetchImage = async () => {
    if (!monument || !monument.monument) return;
    const url = ImagesAPIUrls.getImages(`${monument.monument} ${monument.iso2}`);
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

export default useMonumentImage;
