import { memo, ReactNode } from 'react';
import Loader from '../Loader/Loader';

type PendingContentProps = { loading: boolean; children: ReactNode };

const PendingContent = ({ loading, children }: PendingContentProps) => {
  return (
    <div className="PendingContent">
      {children}
      {loading && (
        <div className="PendingContent__curtain">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default memo(PendingContent);
