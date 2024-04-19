import { iso2FlagEmoji } from './util';

type FlagIconProps = {
  iso2?: string;
  iso3?: string;
  width?: number;
  height?: number;
};

const FlagIcon = ({ iso2, iso3, width, height }: FlagIconProps) => {
  if (!iso2 && !iso3) return null;
  return (
    <div className="FlagIcon">
      <svg
        height={height || 24}
        width={width || 24}
        xmlns="http://www.w3.org/2000/svg"
      >
        <text
          x="50%"
          y="50%"
          dominant-baseline="middle"
          text-anchor="middle"
          fontSize={width || height || 24}
        >
          {iso2FlagEmoji(iso2!)}
        </text>
      </svg>
    </div>
  );
};

export default FlagIcon;
