import { useEffect, useState } from 'react';
import { City } from '../../../types';
import { ImagesAPIUrls } from '../../../urls';
import { DuckDuckGoImage } from 'duckduckgo-images-api';
import _ from 'lodash';

const useCityImage = (city?: City, image_url?: string | null) => {
  const [image, setImage] = useState<string>();

  const fetchFromUrl = async (url?: string | null) => {
    if (!url) {
      fetchImage();
      return;
    }
    var img = new Image();
    img.onerror = () => fetchImage();
    img.src = url;
    setImage(image_url!);
  };

  const fetchImage = async () => {
    if (!city || !city.city) return;
    const url = ImagesAPIUrls.getImages(
      `${city.city} city town ${city.country}`,
    );
    try {
      const response = await fetch(url);
      const images: DuckDuckGoImage[] = await response.json();
      setImage(images[0].thumbnail);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFromUrl(image_url);
  }, []);

  return {
    image,
    fetchImage,
  };
};

export default useCityImage;
