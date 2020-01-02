import React, { FC, useState, useMemo } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

import { ProgressBar } from "./progress-bar";
import { Carousel } from "./carousel";

import { getNameList } from "./data";
import { useStorageState } from "./use-storage-state";

const App: FC<{}> = () => {

    const [itemsPerPage] = useState(10);
    const [currentPage, setPage] = useStorageState("saved-page", 0);
    const [likedNames, setLikedNames] = useStorageState<string[]>("liked-names", []);

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

if (process.env.NODE_ENV === "production") {
    serviceWorker.register();
} else {
    serviceWorker.unregister();
}