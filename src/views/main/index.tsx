import React, { FC } from "react";

import { Carousel } from "./carousel";
import { InitialScroller } from "./initial-scroller";
import { ProgressBar } from "./progress-bar";

interface props {

    nameList: string[],
    likedNames: string[],

    namesPerPage: number,
    pageIdx: number,
    setPageIdx: React.Dispatch<React.SetStateAction<number>>,

    onCheckName: (name: string, newValue: boolean) => void,

}

export const MainView: FC<props> = ({
    nameList,
    likedNames,
    namesPerPage,
    pageIdx,
    setPageIdx,
    onCheckName,
}) => {

    return <>
        <Carousel
            list={nameList}
            checkedItems={likedNames}
            onChangeItem={onCheckName}
            page={pageIdx}
            onChangePage={setPageIdx}
            itemsPerPage={namesPerPage}
        />
        <InitialScroller />
        <ProgressBar
            value={pageIdx + 1}
            max={Math.ceil(nameList.length / namesPerPage)}
        />
    </>;

}