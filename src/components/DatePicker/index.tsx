import React, { useState, useMemo } from "react";
import dayjs, {Dayjs} from "dayjs";
import Icon from "../Icon";

export interface DatePickerProps {
    /** 选中日期 */
    activeDate: Dayjs;
    /** 选中一天后的回调 */
    onSelect: (day: Dayjs) => void;
}

// 6行七列的数据
const DatePicker: React.FC<DatePickerProps> = (props) => {
    const { activeDate, onSelect } = props;

    // 生成42天的日期对象思路:
    // 当前选中日期那个月的第一天，在通过当月第一天获取那一周的对应周一
    // 拿到第一天
    const [first, setFirstDate] = useState(activeDate.date(1))
    // 42天的第一天
    const firstNumber = first.day()
        ? first.day(1)
        : dayjs(first).subtract(1, "day").day(1)
    // 全部的42天
    const dateArr = Array.from({ length: 42 }).map((item, index) => {
        return dayjs(firstNumber).add(index, "day")
    })
    const times = useMemo(() => {
        return ["一", "二", "三", "四", "五", "六", "七"]
    }, [])

    const handleSelectDate = (date: Dayjs) => {
        onSelect(date);
        console.log(`选中的日期是${date.year()}年${date.month()+1}月${date.date()}日`)
    }

    console.log(dateArr);
    return <div className={"date-picker-wrapper"}>
        <div className={"date-picker-header"}>
            <span className={"left-double"}>
                <Icon icon={"angle-double-left"}/>
            </span>
            <span className={"left-one"}>
                <Icon icon={"angle-left"}/>
            </span>
            <span className={"current-date"}>
                {
                    `${activeDate.year()}年${activeDate.month()+1}月${activeDate.date()}日`
                }
            </span>
            <span className={"right-one"}>
                <Icon icon={"angle-right"}/>
            </span>
            <span className={"right-two"}>
                <Icon icon={"angle-double-right"}/>
            </span>
        </div>
        <div className={"date-picker-row"}>
            {
                times.map(time => {
                    return <span key={time} className={"date-picker-item"}>{time}</span>
                })
            }
        </div>
        <div className={"date-picker-row"}>
            {
                dateArr.slice(0, 7).map(d => {
                    return <span className={"date-picker-item date-picker-item-date"} key={d.date()} onClick={() => handleSelectDate(d)}>{d.date()}</span>
                })
            }
        </div>
        <div className={"date-picker-row"}>
            {
                dateArr.slice(7, 14).map(d => {
                    return <span className={"date-picker-item date-picker-item-date"} key={d.date()} onClick={() => handleSelectDate(d)}>{d.date()}</span>
                })
            }
        </div>
        <div className={"date-picker-row"}>
            {
                dateArr.slice(14, 21).map(d => {
                    return <span className={"date-picker-item date-picker-item-date"} key={d.date()} onClick={() => handleSelectDate(d)}>{d.date()}</span>
                })
            }
        </div>
        <div className={"date-picker-row"}>
            {
                dateArr.slice(21, 28).map(d => {
                    return <span className={"date-picker-item date-picker-item-date"} key={d.date()} onClick={() => handleSelectDate(d)}>{d.date()}</span>
                })
            }
        </div>
        <div className={"date-picker-row"}>
            {
                dateArr.slice(28, 35).map(d => {
                    return <span className={"date-picker-item date-picker-item-date"} key={d.date()} onClick={() => handleSelectDate(d)}>{d.date()}</span>
                })
            }
        </div>
        <div className={"date-picker-row"}>
            {
                dateArr.slice(35, 42).map(d => {
                    return <span className={"date-picker-item date-picker-item-date"} key={d.date()} onClick={() => handleSelectDate(d)}>{d.date()}</span>
                })
            }
        </div>
    </div>
}

export default DatePicker;
