import "bootstrap/dist/css/bootstrap.min.css";

import React, { useState } from "react";
import { PaginationControl } from "react-bootstrap-pagination-control";

export default function PaginationBar({
  currentSizes,
  numberOfElement,
  callbackSelectedPage,
}) {
  const [page, setPage] = useState(1);

  return (
    <PaginationControl
      page={page}
      between={3}
      total={numberOfElement}
      limit={currentSizes}
      changePage={(page) => {
        setPage(page);
        console.log("page in pagination: " + page);
        callbackSelectedPage(page);
      }}
      ellipsis={1}
    />
  );
}
