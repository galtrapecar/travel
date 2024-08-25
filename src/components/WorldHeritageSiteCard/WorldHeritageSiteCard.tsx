import { memo } from 'react';
import { WorldHeritageSite } from '../../types';
import FlagIcon from '../FlagIcon/FlagIcon';
import OpenLinkButton from '../OpenLinkButton/OpenLinkButton';

const WorldHeritageSiteCard = (site: WorldHeritageSite) => {
  return (
    <div className="WorldHeritageSiteCard">
      <div
        className="WorldHeritageSiteCard__top"
        dangerouslySetInnerHTML={{ __html: site.name }}
      />
      <div className="WorldHeritageSiteCard__middle">
        <div
          className="WorldHeritageSiteCard__image"
          style={{ backgroundImage: `url(${site.image_url})` }}
        />
        <div className="WorldHeritageSiteCard__descriptionWrapper">
          <div className="WorldHeritageSiteCard__header">Short description</div>
          <div
            className="WorldHeritageSiteCard__description"
            dangerouslySetInnerHTML={{ __html: site.description }}
          />
        </div>
      </div>
      <div className="WorldHeritageSiteCard__bottom">
        <div className="WorldHeritageSiteCard__flags">
          {site.iso2.map((iso2) => (
            <FlagIcon key={iso2} iso2={iso2} />
          ))}
        </div>
        <OpenLinkButton url={site.url} />
      </div>
    </div>
  );
};

export default memo(WorldHeritageSiteCard);
