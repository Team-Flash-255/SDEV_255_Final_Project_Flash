import React from "react";
import StudentNavigationBar from "./studentNavigationBar";

function StudentPageLayout({ children }) {
  const childrenArray = React.Children.toArray(children);

  const headerElement = childrenArray[0]; //get the first element (should be the header/banner); we cannot have a title element as the first element because this.
  const bodyElements = childrenArray.slice(1); // get all elements after the first element.

  return (
    <>
      {headerElement}
      <StudentNavigationBar />
      {bodyElements}
    </>
  );
}
export default StudentPageLayout;

