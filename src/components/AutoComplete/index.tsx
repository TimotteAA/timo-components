import React, {useEffect, useState, useRef} from "react";
import Input, {FInputProps as InputProps} from "../Input";
import classNames from "classnames";
import { useDebounce } from "../../hooks/useDebounce";
import { useClickOutside } from "../../hooks/useClickOutside"

export interface DataSourceObject  {
    value: string;
    index?: number;
}

export type DataSourceType<T = {}> = T & DataSourceObject;

interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
    /** 根据input的value，搜索得到内容的回调  */
    fetchSuggestions: (keyword: string) => DataSourceType[] | Promise<DataSourceType[]>;
    /** 选中某一项item时的回调 */
    onSelect?: (item: DataSourceType) => void;
    /** 渲染单一搜索项的渲染方法 */
    renderOption?: (item: DataSourceType) => React.ReactElement;
    /** 自定义渲染loading */
    renderLoading?: () => React.ReactNode;
}

const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
    const {
        fetchSuggestions,
        onSelect,
        renderOption,
        renderLoading,
        value,
        ...restProps
    } = props;
    const [inputValue, setInputValue] = useState(value as string);
    const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
    const [loading, setLoading] = useState(false);
    const triggerSearch = useRef(false);
    const componentRef = useRef<HTMLDivElement>(null);
    // 高亮的索引
    const [highlightIndex, setHighlightIndex] = useState(-1);
    const [debouncedValue] = useDebounce(inputValue, 300);
    useClickOutside(componentRef, () => {setSuggestions([])});

    useEffect(() => {
        if (debouncedValue && triggerSearch.current) {
            const results = fetchSuggestions(debouncedValue);
            if (results instanceof Promise) {
                setLoading(true);
                results.then(data => {setSuggestions(data);setLoading(false)})
            } else {
                setSuggestions(results);
            }
        } else {
            setSuggestions([]);
        }
        setHighlightIndex(-1);
    }, [debouncedValue])
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value?.trim();
        setInputValue(value);
        triggerSearch.current = true;
    }

    const handleItemClick = (item: DataSourceType) => {
        setInputValue(item.value);
        setSuggestions([]);
        onSelect && onSelect(item);
        triggerSearch.current = false;
    }

    const renderTemplate = (item: DataSourceType) => {
        return renderOption ? renderOption(item) : item.value;
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const code = e.key;
        const highlight = (index: number) => {
            if (index < 0) index = 0;
            if (index >= suggestions.length) {
                index = suggestions.length - 1;
            }
            setHighlightIndex(index);
        }
        switch (code) {
             case "ArrowUp": {
                 highlight(highlightIndex - 1);
                 break;
            }
            case "ArrowDown": {
                highlight(highlightIndex + 1);
                 break;
            }
            case "Enter": {
                 suggestions && suggestions.length && handleItemClick(suggestions[highlightIndex]);
                 break;
            }
            case "Escape": {
                 setSuggestions([]);
                 break;
            }
        }

        // 回车

        // esc
    }

    return <div className="auto-complete" ref={componentRef}>
        <Input value={inputValue} {...restProps} onChange={handleChange} onKeyDown={handleKeyDown} />
        {
            loading && (renderLoading ? renderLoading() : <div>...loading</div>)
        }
        {
            !loading && suggestions?.length > 0 && <ul className="item-wrapper">
                {suggestions.map((item, idx) => {
                    const classes = classNames("item", {
                        "item-highlighted": idx === highlightIndex
                    })
                    return <li key={idx} onClick={() => handleItemClick(item)} className={classes}>{renderTemplate(item)}</li>
                })}
            </ul>
        }
    </div>
}

export default AutoComplete;
