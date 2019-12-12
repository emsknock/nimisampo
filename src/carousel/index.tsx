import React, { FC } from "react";
import { useSwipeable } from "react-swipeable";
import { useTransition, animated } from "react-spring";

import "./style.css";
import { NameBox } from "./namebox";

interface props {
    list: string[],
    page: number,
    setPage: (n: number) => void,
    checkedItems: string[],
    checkItem: (s: string) => void,
    itemsPerPage?: number,
}

export const Carousel: FC<props> = ({
    list,
    page,
    setPage,
    checkedItems,
    checkItem,
    itemsPerPage = 5,
}) => {

    const pageCount = Math.ceil(list.length / itemsPerPage);

    const startIdx = page * itemsPerPage;
    const items = list.slice(startIdx, startIdx + itemsPerPage);

    const transitions = useTransition(
        [items],
        ([name]) => name,
        {
            from: { opacity: 0, transform: "translate3d(-1rem, 0, 0)" },
            enter: { opacity: 1, transform: "translate3d(0, 0, 0)" },
            leave: { opacity: 0, transform: "translate3d(1rem, 0, 0)" },
            config: { duration: 100 }
        }
    )

    const onSwiped = {
        onSwipedLeft: () => // Next page
            page !== pageCount - 1 && setPage(page + 1),
        onSwipedRight: () => // Previous page
            page !== 0 && setPage(page - 1),
    }

    const swipeHandlers = useSwipeable(onSwiped);

    return <div {...swipeHandlers} className="carousel">
        {
            transitions.map(
                ({ key, item, props }) => (
                    <animated.div style={props} key={key} className="carousel__list">
                        {
                            item.map(
                                (name) => <NameBox
                                    key={name}
                                    value={name}
                                    checked={checkedItems.includes(name)}
                                    onCheck={checkItem}
                                />
                            )
                        }
                    </animated.div>
                )
            )
        }
    </div>

};
