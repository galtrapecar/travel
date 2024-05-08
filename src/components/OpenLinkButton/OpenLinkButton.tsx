import { Icons } from '../../assets/icons';

type OpenLinkButtonProps = { url: string };

const OpenLinkButton = ({ url }: OpenLinkButtonProps) => {
  const openUrl = () => {
    window.open(url, '_blank');
  };

  return (
    <div className="OpenLinkButton" onClick={openUrl}>
      Open
      {<Icons.OpenLinkIcon width={24} height={24} />}
    </div>
  );
};

export default OpenLinkButton;
