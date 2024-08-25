import { memo } from 'react';
import { Helmet } from 'react-helmet-async';

const Login = () => {
  return (
    <>
      <Helmet>
        <title>{'Login'}</title>
      </Helmet>
      <div className="Login"></div>
    </>
  );
};

export default memo(Login);
