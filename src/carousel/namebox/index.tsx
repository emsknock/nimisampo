import React, { useState } from "react";
import { FC } from "react";

import "./style.css";

export const NameBox: FC<{
    value: string,
    checked: boolean,
    onCheck: (value: string) => void,
}> = ({
    value,
    checked,
    onCheck,
}) => {

        const onChange = () => onCheck(value);

        return <label className={`namebox --${checked ? "on" : "off"}`}>
            <input type="checkbox" name={value} onChange={onChange} />
            <span className="namebox__indicator">→</span>
            <span className="namebox__value">{value}</span>
        </label>;

    }