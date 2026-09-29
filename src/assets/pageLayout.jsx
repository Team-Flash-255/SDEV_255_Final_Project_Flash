import React from "react";
import NavigationBar from "./navigationBar";

function PageLayout({ children }) {
  const childrenArray = React.Children.toArray(children);

  const headerElement = childrenArray[0]; //get the first element (should be the header/banner); we cannot have a title element as the first element because this.
  const bodyElements = childrenArray.slice(1); // get all elements after the first element.

  return (
    <>
      {headerElement}
      <NavigationBar />
      {bodyElements}
    </>
  );
}
export default PageLayout;
