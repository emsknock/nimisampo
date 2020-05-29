import React, { FC, useRef, useEffect, useState } from "react";
import "./style.css";

export const InitialScroller: FC = () => {

    const listRef = useRef<HTMLDivElement>(null);
    const [selectedIdx, setSelectedIdx] = useState(0);

    const initials = "abcdefghijklmnopqrstuvwxyzåäö".split("");

    const onClick = (idx: number) => () => {
        listRef.current?.scrollTo({ behavior: "smooth", left: idx * 48 });
    }

    useEffect(
        () => {
            if (listRef.current) {
                listRef.current.addEventListener(
                    "scroll",
                    () => {
                        const { round, min, max } = Math;
                        const scrollLeft = listRef.current?.scrollLeft ?? 0;
                        // The 32 is based on the letters being 2rem wide with a 16px base font.
                        // This must be adjusted if the styling changes.
                        const idx = round(scrollLeft / 48);
                        // Makes sure the idx is in bounds for the alphabet (e.g. no negative numbers)
                        // since rubber banding is a thing
                        const boundIdx = max(0, min(idx, initials.length - 1));
                        setSelectedIdx(boundIdx);
                    },
                    { passive: true }
                );
            }
        },
        // eslint-disable-next-line
        [listRef]
    );

    return <div className="initials-scroller">
        <div className="initials-scroller__list" ref={listRef}>
            <div className="initials-scroller__spacer" />
            {
                initials.map(
                    (letter, idx) => <div
                        className={`initials__letter ${idx === selectedIdx ? "--sel" : ""}`}
                        key={letter}
                        onClick={onClick(idx)}
                    >
                        {letter}
                    </div>
                )
            }
            <div className="initials-scroller__spacer" />
        </div>
        <div className="initials-scroller__spotlight" />
    </div>

}