import _ from 'lodash';
import { Icons } from '../../assets/icons';

type SearchBarResult = {
  label: string;
  icon?: JSX.Element;
};

type SearchBarProps = {
  onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  results?: SearchBarResult[];
  onResultHover?: (index: number) => void;
};

const SearchBar = ({
  onInput,
  onResultHover,
  placeholder,
  results,
}: SearchBarProps) => {
  return (
    <div className="SearchBar">
      <input type="text" placeholder={placeholder} onInput={onInput} />
      <Icons.MagnifyingGlassIcon width={24} height={24} />
      {_.isArray(results) && results.length > 0 && (
        <div className="SearchBar__results">
          {results?.map((result, i) => (
            <div
              key={i}
              className="SearchBar__results__result"
              onMouseEnter={() => onResultHover?.(i)}
            >
              <div className="SearchBar__results__result__label">
                {result.label}
              </div>
              {result.icon && (
                <div className="SearchBar__results__result__icon">
                  {result.icon}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
