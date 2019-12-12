import React, { FC } from "react";

import "./style.css";

export const ProgressBar: FC<{
    value: number,
    max: number,
}> = ({
    value, max
}) => {

        const percent = 100 * value / max;

        return <div className="progress">
            <div className="progress__text">{value} / {max} ({~~(percent)}%)</div>
            <div className="progress__bg">
                <div className="progress__bar" style={{ width: `${percent}%` }} />
            </div>
        </div>
    }