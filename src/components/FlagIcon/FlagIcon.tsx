import { iso2FlagEmoji } from './util';

type FlagIconProps = {
  iso2?: string;
  iso3?: string;
  width?: number;
  height?: number;
};

const FlagIcon = ({ iso2, iso3, width, height }: FlagIconProps) => {
  if (!iso2 && !iso3) return null;

  const getFontSize = () => {
    if (width) {
      return width * 0.75;
    }
    if (height) {
      return height * 0.75;
    }
    return 18;
  };

  return (
    <div className="FlagIcon">
      <svg
        height={height || 24}
        width={width || 24}
        xmlns="http://www.w3.org/2000/svg"
      >
        <text
          x="50%"
          y="57%"
          dominantBaseline="middle"
          textAnchor="middle"
          style={{ fontSize: getFontSize() }}
        >
          {iso2FlagEmoji(iso2!)}
        </text>
      </svg>
    </div>
  );
};

export default FlagIcon;
