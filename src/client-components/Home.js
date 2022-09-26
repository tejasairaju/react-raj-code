
import React, { Fragment } from "react";
import { useAuth0 } from "../react-auth0-spa";

const HomePage = ({entry = ''}) => {
  const { loading, user } = useAuth0();
console.log(':::::::::::::::::', user);
  if (loading || !user) {
    return <div>Loading...</div>;
  } 

  return (
    <Fragment>
<div>Hello Home World - {entry}</div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </Fragment>
  );
};

export default HomePage;