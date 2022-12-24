import "bootstrap/dist/css/bootstrap.min.css";

import React, {useState} from "react";
import {PaginationControl} from "react-bootstrap-pagination-control";
import {View} from "react-native";

export default function PaginationBar({
                                          currentSizes,
                                          numberOfElement,
                                          callbackSelectedPage,
                                      }) {
    const [page, setPage] = useState(1);
    return (
        <View style={{margin: 20}}>
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
        </View>

    );
}
