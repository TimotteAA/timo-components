import React, { useState } from "react";

import dayjs, { Dayjs } from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import isToday from "dayjs/plugin/isToday";
import localeData from "dayjs/plugin/localeData";
import classNames from "classnames";

import Icon from "../Icon";

// dayjs插件

dayjs.locale('zh-cn')
dayjs.extend(isoWeek);
dayjs.extend(isToday);
dayjs.extend(localeData);

export interface WeekProps {
    /** 自定义类 */
    className?: string;
    /** 自定义样式 */
    styles?: React.CSSProperties;
    /** 选择某天后的回调 */
    onSelect?: (day: Dayjs) => void;
    /** 是否显示左右箭头的Icon */
    isShow?: boolean;
}

const Week: React.FC<WeekProps> = (props) => {
    const {
        className,
        styles,
        onSelect,
        isShow = true
    } = props;

    // 当前选择日期
    const [activeDate, setActiveDate] = useState(dayjs());
    // 一周时间
    const thisWeek = Array.from({length:7}).map((item,index)=>{
        return dayjs().isoWeekday(index + 1)
    })

    // 返回值是单日的英文字母数组
    const getMonthAndDay = (date: Dayjs) => {
        return date.localeData().weekdays(dayjs(date));
    }

    const handleClickDay = (date: Dayjs) => {
        setActiveDate(date);
        onSelect && onSelect(date);
    }

    const classes = classNames("date-wrapper", {
        className
    })

    const handleLeftIconClick = () => {
        const tmpDat = activeDate.subtract(1, "day");
        if (tmpDat >= thisWeek[0]) {
            // 比这周的第一天大或等于
            setActiveDate(tmpDat);
        } else {
            setActiveDate(thisWeek[0])
        }
    }

    const handleRightIconClick = () => {
        const tmpDat = activeDate.add(1, "day");
        if (tmpDat <= thisWeek[6]) {
            // 比这周的最后一天小或等于
            setActiveDate(tmpDat);
        } else {
            setActiveDate(thisWeek[6])
        }
    }

    return <div className={classes} style={styles}>
        { isShow && <Icon icon={"arrow-left"} className={"icon"} onClick={handleLeftIconClick}/>}
        {
            thisWeek.map((day) => {
                const dayItemClasses = classNames("day-item", {
                    "active": day.date() === activeDate.date(),
                    "today": day.isToday()
                })

                return <div key={day.date()} onClick={() => handleClickDay(day)} className={dayItemClasses}>
                    {day.isToday() ? "今" : day.date()}
                </div>
            })
        }
        {isShow && <Icon icon={"arrow-right"} className={"icon"} onClick={handleRightIconClick}/>}
        <div className={"date"}>
            {
                `${activeDate.month() + 1}月${activeDate.date()}日 
                    ${getMonthAndDay(activeDate)}
                `
            }
        </div>
    </div>
}

export default Week;
