import { Icons } from '../../assets/icons';

type SearchBarProps = {
  onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

const SearchBar = ({ onInput, placeholder }: SearchBarProps) => {
  return (
    <div className="SearchBar">
      <input type="text" placeholder={placeholder} onInput={onInput} />
      <Icons.MagnifyingGlassIcon width={24} height={24} />
    </div>
  );
};

export default SearchBar;
