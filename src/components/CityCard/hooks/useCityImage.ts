import { useEffect, useState } from 'react';
import { City } from '../../../types';
import { ImagesAPIUrls } from '../../../urls';
import { DuckDuckGoImage } from 'duckduckgo-images-api';

const useCityImage = (city: City) => {
  const [image, setImage] = useState<string>();

  const fetchImage = async () => {
    if (!city || !city.city) return;
    const url = ImagesAPIUrls.getImages(`${city.city} city town ${city.country}`);
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

export default useCityImage;
