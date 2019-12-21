import React, { FC, useState, useMemo } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

import { ProgressBar } from "./progress-bar";
import { Carousel } from "./carousel";
import { getNameList } from "./data";

const getSavedNames = (): string[] => {
    const listString = localStorage.getItem("liked-names") ?? "[]";
    return JSON.parse(listString);
}

const App: FC<{}> = () => {

    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setPage] = useState(0);
    const [likedNames, setLikedNames] = useState(getSavedNames());

    const checkName = (name: string) => {
        
        const newList = likedNames.includes(name)
            ? likedNames.filter(n => name !== n)
            : likedNames.concat(name);

        localStorage.setItem("liked-names", JSON.stringify(newList));
        setLikedNames(newList);
    
    };

    const nameList: string[] = useMemo(
        () => {
            return getNameList({ m: false, f: true, b: false });
        },
        []
    );

    return <>
        <Carousel
            list={nameList}
            page={currentPage}
            setPage={setPage}
            checkedItems={likedNames}
            checkItem={checkName}
            itemsPerPage={itemsPerPage}
        />
        <ProgressBar
            value={currentPage + 1}
            max={Math.ceil(nameList.length / itemsPerPage)}
        />
    </>;

}

ReactDOM.render(
    <App />,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
