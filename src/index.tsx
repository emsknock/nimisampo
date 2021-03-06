import React, { FC, useMemo } from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import smoothscroll from "smoothscroll-polyfill";
import "./index.css";

import { getNameList } from "./data";
import { useStorageState } from "./hooks/use-storage-state";

import { MainView } from "./views/main";

smoothscroll.polyfill();

const App: FC = () => {

    const namesPerPage = 8;
    const [currentPageIdx, setPageIdx] = useStorageState("saved-page", 0);
    const [likedNames, setLikedNames] = useStorageState<string[]>("liked-names", []);

    const onCheckName = (name: string, checked: boolean) => {

        const newList = checked
            ? likedNames.filter(n => name !== n)
            : likedNames.concat(name);

        setLikedNames(newList);

    };

    const nameList: string[] = useMemo(
        () => {
            return getNameList({ m: false, f: true, b: false });
        },
        []
    );
    console.log(nameList);

    return <MainView
        nameList={nameList}
        namesPerPage={namesPerPage}
        pageIdx={currentPageIdx}
        setPageIdx={setPageIdx}
        onCheckName={onCheckName}
        likedNames={likedNames}
    />;

};

ReactDOM.render(
    <App />,
    document.getElementById("root")
);

if (process.env.NODE_ENV === "production") {
    serviceWorker.register();
} else {
    serviceWorker.unregister();
}