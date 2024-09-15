import { useEffect, useState } from 'react';
import { PointOfInterest } from '../../../types';
import { ImagesAPIUrls } from '../../../urls';
import { DuckDuckGoImage } from 'duckduckgo-images-api';

const usePoiImage = (poi: PointOfInterest | null) => {
  const [image, setImage] = useState<string>();
  const [loading, setLoading] = useState(true);

  const fetchImage = async () => {
    if (!poi || !poi.name) return;
    setLoading(true);
    const url = ImagesAPIUrls.getImages(`${poi.name} ${poi.iso2}`);
    try {
      const response = await fetch(url);
      const images: DuckDuckGoImage[] = await response.json();
      setImage(images[0].thumbnail);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImage();
  }, [poi]);

  return {
    image,
    loading,
    fetchImage,
  };
};

export default usePoiImage;
