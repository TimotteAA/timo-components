import React, { useState, useRef } from "react";
import classNames from "classnames";
import "./index.scss";

interface IRadio {
    children?: React.ReactNode;
    checked?: boolean;
    disabled?: boolean;
    style?: React.CSSProperties;
    classes?: string;
    onChange?: Function;
}

const Radio: React.FC<IRadio> = (props) => {
    const { children, style, classes, disabled, ...rest } = props;
    const [checked, setChecked] = useState(rest.checked);
    const inputRef = useRef<HTMLInputElement>(null);

    const wrapperCls = classNames("timo-radio", classes, {
        "timo-radio-disabled": disabled,
        "timo-radio-checked": checked,
    })

    const radioInnerCls = classNames("timo-radio-inner", {
        "timo-radio-inner-checked": checked,
        "timo-radio-inner-disabled": disabled
    })

    const handleClick = () => {
        setChecked(true);

    }

    return <span style={style} className={wrapperCls} onClick={handleClick}>
        <span className={"timo-radio-outer"}>
            <input type="radio" ref={inputRef}/>
            <span className={radioInnerCls}>
                {checked && <span className={"timo-radio-checked-circle"}></span>}
                {checked && <span className={"timo-radio-checked-outline"}></span> }
            </span>
        </span>
        <span className={"timo-radio-text"}>{ children }</span>
    </span>
}

export default Radio;
