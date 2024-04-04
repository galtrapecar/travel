import { Icons } from '../../../../assets/icons';
import IconButton from '../../../../components/IconButton/IconButton';
import SearchBar from '../../../../components/SearchBar/SearchBar';

const StartLocationDialog = () => {

  const getMyLocation = () => {
    const geolocation = navigator.geolocation;
    geolocation.getCurrentPosition((position) => {
        console.log(position);
    });
  };

  return (
    <div className="StartLocationDialog">
      <div>Where do you want to start from?</div>
      <SearchBar placeholder="Search" />
      <div>Or</div>
      <IconButton
        label={'Start from my location'}
        icon={<Icons.LocationIcon width={24} height={24} />}
        onClick={() => getMyLocation()}
      />
    </div>
  );
};

export default StartLocationDialog;
