import React from 'react';
import  Navbar  from './components/Navbar/Navbar';
import './index.css';


function Layout(props) {
  //const children = props.children;
return (
    <React.Fragment>  
      <div className="bg">
      <Navbar />
      {props.children}

      </div>
    </React.Fragment>
  );
}
export default Layout;
