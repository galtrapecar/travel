import { Icons } from '../../assets/icons';
import ExpandableButton from '../ExpandableButton/ExpandableButton';
import FlagIcon from '../FlagIcon/FlagIcon';

type CityInfoHeaderProps = {
  city: string;
  country: string;
  iso2: string;
  image?: string;
};

const CityInfoHeader = ({ city, country, iso2, image }: CityInfoHeaderProps) => {    
  return (
    <div className="CityInfoHeader">
      <div className="CityInfoHeader__left">
        <div className="CityInfoHeader__image" style={{backgroundImage: `url(${image})`}} />
        <div>
          <div className="CityInfoHeader__title">{city}</div>
          <div className="CityInfoHeader__subtitleWrapper">
            <FlagIcon iso2={iso2} />
            <div className="CityInfoHeader__subtitle">{country}</div>
          </div>
        </div>
      </div>
      <div className="CityInfoHeader__links">
        <ExpandableButton icon={<Icons.DuckDuckGoLogoIcon width={24} height={24} />} label={'DuckDuckGo'} />
      </div>
    </div>
  );
};

export default CityInfoHeader;
