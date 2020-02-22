import React from "react";
import SwipeableViews from 'react-swipeable-views';
import { virtualize, bindKeyboard } from 'react-swipeable-views-utils';
import "./style.css";

const VirtualSwipeable = virtualize(bindKeyboard(SwipeableViews));

const ListItem = ({ value, isChecked, onChange }) => 
    <div className={`carousel__item ${isChecked ? "--checked" : ""}`}>
        <input
            type="checkbox"
            id={`checkbox-${value}`}
            value={value}
            checked={isChecked}
            onChange={e => onChange(!e.target.checked)}
        />
        <label htmlFor={`checkbox-${value}`} className="carousel__label" >
            <span className="carousel__checkmark">→</span>
            <span className="carousel__value">{value}</span>
        </label>
    </div>;

export const Carousel = ({
    list,
    checkedItems,
    onChangeItem,
    page,
    onChangePage,
    itemsPerPage = 5,
}) => {

    const slideRenderer = ({ key, index: thisSlideIdx }) => {

        const startIdx = thisSlideIdx * itemsPerPage;
        const nextStartIdx = startIdx + itemsPerPage;

        const itemsOnPage = list.slice(startIdx, nextStartIdx);

        return <div className="carousel__page" key={key}>
            {itemsOnPage.map(
                item => <ListItem
                    key={item}
                    value={item}
                    isChecked={checkedItems.includes(item)}
                    onChange={newValue => onChangeItem(item, newValue)}
                />
            )}
        </div>;

    }

    // React-swipeable-views apparently has a bug when combining virtualize() with 
    // bindKeyboard() where trying to swipe from page numer 0 to -1 jumps to pageIdx 2. 
    // As a workaround, we filter out events that would jump over pages:
    const handleChangeIndex = newPage =>
        Math.abs(page - newPage) === 1
            ? onChangePage(newPage)
            : null;

    return <div className="carousel-container">
        <div className="carousel">
            <VirtualSwipeable
                slideRenderer={slideRenderer}
                index={page}
                onChangeIndex={handleChangeIndex}
                slideCount={Math.ceil(list.length / itemsPerPage)}
            />
        </div>
    </div>;

};