import SearchBar from '../../../../components/SearchBar/SearchBar';

const StartLocationDialog = () => {
  return (
    <div className="StartLocationDialog">
      <div>Where do you want to start from?</div>
      <SearchBar placeholder="Search" />
    </div>
  );
};

export default StartLocationDialog;
