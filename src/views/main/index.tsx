import React, {FC, useState, useMemo} from "react";

import { ProgressBar } from "./progress-bar";
import { Carousel } from "./carousel";

interface props {

    nameList: string[],
    likedNames: string[],

    namesPerPage: number,
    pageIdx: number,
    setPageIdx: React.Dispatch<React.SetStateAction<number>>,

    onCheckName: (name: string) => void,

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
            itemsPerPage={namesPerPage}
            page={pageIdx}
            setPage={setPageIdx}
            checkItem={onCheckName}
        />
        <ProgressBar
            value={pageIdx + 1}
            max={Math.ceil(nameList.length / namesPerPage)}
        />
    </>;

}