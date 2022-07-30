import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect, useRef, useReducer, useContext, createContext, forwardRef, useImperativeHandle } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Schema from 'async-validator';
import { mapValues, each } from 'lodash-es';
import { CSSTransition } from 'react-transition-group';
import axios from 'axios';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

// size影响padding、fontSize、borderRadius
// type影响bgc、border-radius
/**
 * @param {ButtonType} btnType 按钮类型
 * @param {ButtonSize} size 按钮大小
 * @param {boolean} disabled 是否禁用
 * @param {string} className 自定义样式
 * @param {string} href 链接按钮的href
 * @param {React.ReactNode} children 子元素
 */
var Button = function (props) {
    var _a;
    var className = props.className, _b = props.disabled, disabled = _b === void 0 ? false : _b, _c = props.btnType, btnType = _c === void 0 ? "default" : _c, _d = props.size, size = _d === void 0 ? "large" : _d, children = props.children, href = props.href, restProps = __rest(props, ["className", "disabled", "btnType", "size", "children", "href"]);
    //   btn-type、btn-size、btn-disabled
    var btnClasses = classNames("btn", className, (_a = {},
        _a["btn-".concat(btnType)] = btnType,
        _a["btn-".concat(size)] = size,
        _a.disabled = btnType === "link" && disabled,
        _a));
    if (btnType === "link" && href) {
        return (React.createElement("a", __assign({ className: btnClasses, href: href }, restProps), children));
    }
    return (React.createElement("button", __assign({ className: btnClasses, disabled: disabled }, restProps), children));
};

var Alert = function (props) {
    var _a;
    var _b = useState(true), isShow = _b[0], setIsShow = _b[1];
    var className = props.className, _c = props.type, type = _c === void 0 ? "default" : _c, header = props.header, description = props.description, _d = props.showCloseIcon, showCloseIcon = _d === void 0 ? true : _d, onClose = props.onClose, resProps = __rest(props, ["className", "type", "header", "description", "showCloseIcon", "onClose"]);
    var alertClass = classNames("alert", className, (_a = {},
        _a["alert-".concat(type)] = type,
        _a));
    var handleClose = function () {
        setIsShow(false);
        onClose && onClose();
    };
    return (React.createElement(React.Fragment, null, isShow && (React.createElement("div", __assign({ className: alertClass }, resProps),
        React.createElement("div", { className: "alert-header" },
            React.createElement("div", { className: "alert-header-left" }, header),
            showCloseIcon && (React.createElement("div", { className: "alert-header-right", onClick: handleClose }, "\u5173\u95ED"))),
        description && (React.createElement("div", { className: "alert-description" }, description))))));
};

var Icon = function (props) {
    var _a;
    // icon-xxx
    var theme = props.theme, className = props.className, styles = props.styles, restProps = __rest(props, ["theme", "className", "styles"]);
    var classes = classNames("icon", className, (_a = {},
        _a["icon-".concat(theme)] = theme,
        _a));
    return React.createElement(FontAwesomeIcon, __assign({ className: classes, style: styles }, restProps));
};

var Input = function (props) {
    var _a, _b, _c;
    var _d = props.disabled, disabled = _d === void 0 ? false : _d, _e = props.size, size = _e === void 0 ? "small" : _e, icon = props.icon, prefix = props.prefix, suffix = props.suffix; props.className; var restProps = __rest(props, ["disabled", "size", "icon", "prefix", "suffix", "className"]);
    //   后面两个主要是决定input的前后margin
    var classes = classNames("input-wrapper", (_a = {},
        _a["input-".concat(size)] = size,
        _a["input-disabled"] = disabled,
        _a["input-prefix"] = prefix,
        _a["input-suffix"] = suffix,
        _a["input-large"] = size === "large",
        _a["input-small"] = size === "small",
        _a));
    var prefixClasses = classNames("input-prefix-wrapper", (_b = {},
        _b["input-prefix-wrapper-".concat(size)] = size,
        _b));
    var suffixClasses = classNames("input-suffix-wrapper", (_c = {},
        _c["input-suffix-wrapper-".concat(size)] = size,
        _c));
    var fixControlledValue = function (value) {
        if (typeof value === 'undefined' || value === null) {
            return '';
        }
        return value;
    };
    if ('value' in props) {
        delete restProps.defaultValue;
        restProps.value = fixControlledValue(props.value);
    }
    return (React.createElement("div", { className: "input-container" },
        prefix && React.createElement("div", { className: prefixClasses }, prefix),
        React.createElement("div", { className: classes },
            icon && (React.createElement("span", { className: "input-icon" },
                React.createElement(Icon, { icon: icon }))),
            React.createElement("input", __assign({}, restProps, { disabled: disabled, className: "input" }))),
        suffix && React.createElement("div", { className: suffixClasses }, suffix)));
};

function useDebounce(value, delay, deps) {
    if (delay === void 0) { delay = 300; }
    if (deps === void 0) { deps = []; }
    var _a = useState(value), debounceValue = _a[0], setDebounceValue = _a[1];
    useEffect(function () {
        var handler = window.setTimeout(function () {
            setDebounceValue(value);
        }, delay);
        return function () {
            clearTimeout(handler);
        };
    }, __spreadArray([value, delay], deps, true));
    return [debounceValue];
}

function useClickOutside(ref, handler) {
    useEffect(function () {
        var listener = function (event) {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            handler(event);
        };
        document.addEventListener("click", listener);
        return function () {
            document.removeEventListener("click", listener);
        };
    }, [handler, ref.current]);
}

var AutoComplete = function (props) {
    var fetchSuggestions = props.fetchSuggestions, onSelect = props.onSelect, renderOption = props.renderOption, renderLoading = props.renderLoading, value = props.value, restProps = __rest(props, ["fetchSuggestions", "onSelect", "renderOption", "renderLoading", "value"]);
    var _a = useState(value), inputValue = _a[0], setInputValue = _a[1];
    var _b = useState([]), suggestions = _b[0], setSuggestions = _b[1];
    var _c = useState(false), loading = _c[0], setLoading = _c[1];
    var triggerSearch = useRef(false);
    var componentRef = useRef(null);
    // 高亮的索引
    var _d = useState(-1), highlightIndex = _d[0], setHighlightIndex = _d[1];
    var debouncedValue = useDebounce(inputValue, 300)[0];
    useClickOutside(componentRef, function () { setSuggestions([]); });
    useEffect(function () {
        if (debouncedValue && triggerSearch.current) {
            var results = fetchSuggestions(debouncedValue);
            if (results instanceof Promise) {
                setLoading(true);
                results.then(function (data) { setSuggestions(data); setLoading(false); });
            }
            else {
                setSuggestions(results);
            }
        }
        else {
            setSuggestions([]);
        }
        setHighlightIndex(-1);
    }, [debouncedValue]);
    var handleChange = function (e) {
        var _a;
        var value = (_a = e.target.value) === null || _a === void 0 ? void 0 : _a.trim();
        setInputValue(value);
        triggerSearch.current = true;
    };
    var handleItemClick = function (item) {
        setInputValue(item.value);
        setSuggestions([]);
        onSelect && onSelect(item);
        triggerSearch.current = false;
    };
    var renderTemplate = function (item) {
        return renderOption ? renderOption(item) : item.value;
    };
    var handleKeyDown = function (e) {
        var code = e.key;
        var highlight = function (index) {
            if (index < 0)
                index = 0;
            if (index >= suggestions.length) {
                index = suggestions.length - 1;
            }
            setHighlightIndex(index);
        };
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
    };
    return React.createElement("div", { className: "auto-complete", ref: componentRef },
        React.createElement(Input, __assign({ value: inputValue }, restProps, { onChange: handleChange, onKeyDown: handleKeyDown })),
        loading && (renderLoading ? renderLoading() : React.createElement("div", null, "...loading")),
        !loading && (suggestions === null || suggestions === void 0 ? void 0 : suggestions.length) > 0 && React.createElement("ul", { className: "item-wrapper" }, suggestions.map(function (item, idx) {
            var classes = classNames("item", {
                "item-highlighted": idx === highlightIndex
            });
            return React.createElement("li", { key: idx, onClick: function () { return handleItemClick(item); }, className: classes }, renderTemplate(item));
        })));
};

var createSkeleton = function (child, depth, current) {
    var _a, _b;
    var _c, _d, _e;
    // 递归层数到了，或者带有 data-skeleton-ignore属性，不进行绘制
    console.log(child.type, current);
    if (!child) {
        return null;
    }
    // else if (child.type === "img") {
    //     const originClass = child.props?.className;
    //     // 保留部分样式，与react-skeleton的样式
    //     const classes = classNames('react-skeleton2', {
    //         [originClass]: originClass
    //     })
    //     console.log(classes);
    //     return <div className={classes}>
    //         *
    //     </div>
    // }
    else if (current < depth) {
        // 没有递归到最深一层
        // 每一层都用一个div代替
        var children = (_c = child.props) === null || _c === void 0 ? void 0 : _c.children;
        var originClass = (_d = child.props) === null || _d === void 0 ? void 0 : _d.className;
        // 保留部分样式，与react-skeleton的样式
        var classes = classNames('react-skeleton', (_a = {},
            _a[originClass] = originClass,
            _a));
        //
        return React.createElement("div", { className: classes, key: Math.random() * 100000 }, children && children.length > 0 && React.Children.map(children, function (c, idx) {
            return createSkeleton(c, depth, current + 1);
        }));
    }
    else {
        // 递归到了最深层
        var originClass = (_e = child.props) === null || _e === void 0 ? void 0 : _e.className;
        // 保留部分样式，与react-skeleton的样式
        var classes = classNames('react-skeleton2', (_b = {},
            _b[originClass] = originClass,
            _b));
        return React.createElement("div", { className: classes }, "*");
    }
};
var Skeleton = function (props) {
    var isVisible = props.isVisible, _a = props.depth, depth = _a === void 0 ? 2 : _a, children = props.children;
    if (!children)
        return React.createElement("div", null);
    if (isVisible) {
        return createSkeleton(children, depth, 1);
    }
    else {
        return children ? children : React.createElement("div", null);
    }
};

function fieldsReducer(state, action) {
    var _a, _b, _c;
    switch (action.type) {
        case "addField": {
            return __assign(__assign({}, state), (_a = {}, _a[action.name] = __assign({}, action.value), _a));
        }
        case "updateField": {
            return __assign(__assign({}, state), (_b = {}, _b[action.name] = __assign(__assign({}, state[action.name]), { value: action.value }), _b));
        }
        case "updateValidateResult": {
            var _d = action.value, isValid = _d.isValid, errors = _d.errors;
            return __assign(__assign({}, state), (_c = {}, _c[action.name] = __assign(__assign({}, state[action.name]), { isValid: isValid, errors: errors }), _c));
        }
        default:
            return state;
    }
}
function useStore(initialValue) {
    var _this = this;
    // form的整个state
    var _a = useState({ isValid: true, isSubmitting: false, errors: {} }), form = _a[0], setForm = _a[1];
    var _b = useReducer(fieldsReducer, {}), fields = _b[0], dispatch = _b[1];
    var getFieldValue = function (key) {
        return fields[key] && fields[key].value;
    };
    // 设置form的值
    var setFieldValue = function (key, value) {
        if (fields && fields[key]) {
            var oldValue = fields[key].value;
            dispatch({ type: "updateField", name: key, value: __assign(__assign({}, oldValue), { value: value }) });
        }
    };
    // 获取所有的字段对应的值
    var getAllFields = function () {
        return mapValues(fields, function (item) { return item.value; });
    };
    // 设置初始值
    var resetField = function () {
        if (initialValue) {
            console.log(initialValue);
            // 循环dispatch
            each(initialValue, function (value, name) {
                if (fields[name]) {
                    dispatch({ type: "updateField", name: name, value: value });
                }
            });
        }
    };
    var transformRules = function (rules) {
        return rules.map(function (r) {
            if (typeof r === "function") {
                var rule = r({ getFieldValue: getFieldValue });
                return rule;
            }
            else {
                return r;
            }
        });
    };
    var validateField = function (name) { return __awaiter(_this, void 0, void 0, function () {
        var _a, value, rules, transformedRules, descriptor, valueMap, validator, isValid, errors, e_1, err;
        var _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = fields[name], value = _a.value, rules = _a.rules;
                    transformedRules = transformRules(rules);
                    descriptor = (_b = {},
                        _b[name] = transformedRules,
                        _b);
                    valueMap = (_c = {},
                        _c[name] = value,
                        _c);
                    validator = new Schema(descriptor);
                    isValid = true;
                    errors = [];
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, validator.validate(valueMap)];
                case 2:
                    _d.sent();
                    return [3 /*break*/, 5];
                case 3:
                    e_1 = _d.sent();
                    isValid = false;
                    err = e_1;
                    errors = err.errors;
                    return [3 /*break*/, 5];
                case 4:
                    dispatch({ type: "updateValidateResult", name: name, value: { isValid: isValid, errors: errors } });
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var validateFields = function () { return __awaiter(_this, void 0, void 0, function () {
        var isValid, errors, valueMap, descriptor, validator, e_2, err;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    isValid = true;
                    errors = {};
                    valueMap = mapValues(fields, function (item) { return item.value; });
                    descriptor = mapValues(fields, function (item) { return transformRules(item.rules); });
                    validator = new Schema(descriptor);
                    setForm(__assign(__assign({}, form), { isSubmitting: true }));
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, validator.validate(valueMap)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 3:
                    e_2 = _a.sent();
                    err = e_2;
                    isValid = false;
                    errors = err.fields;
                    // 更新各个field的error
                    each(fields, function (value, name) {
                        // name是否有error
                        if (errors[name]) {
                            var itemErrors = errors[name];
                            dispatch({ type: "updateValidateResult", name: name, value: { isValid: false, errors: itemErrors } });
                        }
                        else if (value.rules.length > 0 && !errors[name]) {
                            dispatch({ type: "updateValidateResult", name: name, value: { isValid: true, errors: [] } });
                        }
                    });
                    return [3 /*break*/, 5];
                case 4:
                    setForm(__assign(__assign({}, form), { isSubmitting: false, isValid: isValid, errors: errors }));
                    return [2 /*return*/, {
                            isValid: isValid,
                            errors: errors,
                            values: valueMap
                        }];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return {
        fields: fields,
        dispatch: dispatch,
        form: form,
        setForm: setForm,
        validateField: validateField,
        validateFields: validateFields,
        setFieldValue: setFieldValue,
        getFieldValue: getFieldValue,
        getAllFields: getAllFields,
        resetField: resetField
    };
}

var FormItem = function (props) {
    var _a;
    var _b;
    var label = props.label, name = props.name, children = props.children, _c = props.valueName, valueName = _c === void 0 ? "value" : _c, _d = props.trigger, trigger = _d === void 0 ? "onChange" : _d, _e = props.getValueFromEvent, getValueFromEvent = _e === void 0 ? function (e) { return e.target.value; } : _e, _f = props.rules, rules = _f === void 0 ? [] : _f, _g = props.validateTrigger, validateTrigger = _g === void 0 ? "onBlur" : _g;
    var _h = useContext(formContext), dispatch = _h.dispatch, fields = _h.fields, initialValue = _h.initialValue, validateField = _h.validateField;
    // 获取初始值
    var value = initialValue ? initialValue[name] : "";
    // 注册field
    useEffect(function () {
        dispatch({ type: "addField", name: name, value: { label: label, name: name, value: value, rules: rules, isValid: true, errors: [] } });
    }, []);
    // 获取当前store中的key, value
    var fieldState = fields[name];
    var fieldValue = (_b = (fieldState && fieldState.value)) !== null && _b !== void 0 ? _b : value;
    // errors
    var hasError = fieldState && fieldState.errors && fieldState.errors.length > 0;
    var errors = fieldState && fieldState.errors;
    // rules中是否有必填
    var isRequired = rules && rules.length > 0 && rules.some(function (r) { return typeof r !== "function" && r.required; });
    var labelClass = classNames({
        "label-required": isRequired
    });
    var errorClass = classNames({
        "input-validated-error": hasError,
        "input-error": true
    });
    var rowClass = classNames("timo-row", {
        "timo-row-with-label": label,
        "timo-row-without-label": !label,
        "timo-row-has-error": hasError
    });
    // 更新值的回调
    var onValueUpdateChange = function (e) {
        var value = getValueFromEvent && getValueFromEvent(e);
        dispatch({ type: "updateField", name: name, value: value });
    };
    var onValueValidate = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, validateField(name)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    // 创建要给input的value，赋值给Input
    // cloneElement
    var controlProps = (_a = {},
        _a[valueName] = fieldValue,
        _a[trigger] = onValueUpdateChange,
        _a);
    if (rules) {
        controlProps[validateTrigger] = onValueValidate;
    }
    // children列表
    var childList = React.Children.toArray(children);
    if (childList.length === 0) {
        console.error("请传入子组件");
    }
    // 子组件大于1个
    if (childList.length > 1) {
        console.error("仅支持传入一个子组件");
    }
    if (!React.isValidElement(childList[0])) {
        console.error("请传入合理的React组件");
    }
    var inputNode = childList[0];
    var renderNode = React.cloneElement(inputNode, __assign(__assign({}, inputNode.props), controlProps));
    var renderErrors = function (errors) {
        return errors.map(function (e) { return e.message; }).join("; ");
    };
    return React.createElement("div", { className: rowClass },
        label && React.createElement("div", { className: "timo-row-label" },
            React.createElement("label", { className: labelClass },
                label,
                "\uFF1A")),
        React.createElement("div", { className: "timo-row-form-item" },
            renderNode,
            React.createElement("div", { className: errorClass }, errors && errors.length > 0 && renderErrors(errors))));
};

var formContext = createContext({});
/*
* 为了统一管理每个表单Item的数据，定义store
* store: fields，各个input的name以及数据
* addField：input刚挂载时注册field
* updateField：change事件触发时更新store里的数值
* 当item失去焦点时，对value进行校验
* 当submit时，判断整体的isValid，并提供验证成功、验证失败的回调
* */
var Form = forwardRef(function (props, ref) {
    var _a = props.name, name = _a === void 0 ? "timo-form" : _a, children = props.children, initialValue = props.initialValue, onValidateSuccess = props.onValidateSuccess, onValidateError = props.onValidateError;
    var _b = useStore(initialValue), form = _b.form, fields = _b.fields, dispatch = _b.dispatch, validateField = _b.validateField, validateFields = _b.validateFields, setFieldValue = _b.setFieldValue, getFieldValue = _b.getFieldValue, getAllFields = _b.getAllFields, resetField = _b.resetField;
    useImperativeHandle(ref, function () {
        return {
            setFieldValue: setFieldValue,
            getFieldValue: getFieldValue,
            getAllFields: getAllFields,
            resetField: resetField
        };
    });
    var passedContext = {
        dispatch: dispatch,
        fields: fields,
        initialValue: initialValue,
        validateField: validateField
    };
    var handleSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, isValid, errors, values;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    e.preventDefault();
                    e.stopPropagation();
                    return [4 /*yield*/, validateFields()];
                case 1:
                    _a = _b.sent(), isValid = _a.isValid, errors = _a.errors, values = _a.values;
                    if (isValid && onValidateSuccess) {
                        onValidateSuccess(values);
                    }
                    else if (!isValid && onValidateError) {
                        onValidateError(values, errors);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var childNode;
    if (typeof children === "function") {
        childNode = children(form);
    }
    else {
        childNode = children;
    }
    return React.createElement(React.Fragment, null,
        React.createElement("form", { name: name, className: "timo-form", onSubmit: handleSubmit },
            React.createElement(formContext.Provider, { value: passedContext }, childNode)));
});
// @ts-ignore
var TransForm = Form;
TransForm.FormItem = FormItem;

var MenuItem = function (props) {
    var index = props.index, className = props.className, disabled = props.disabled, style = props.style, children = props.children;
    var _a = useContext(MenuContext), selectedIndex = _a.selectedIndex, onSelect = _a.onSelect;
    var classes = classNames("menu-item", className, {
        "menu-item-disabled": disabled,
        "menu-item-active": index === selectedIndex,
    });
    var handleClick = function () {
        onSelect && !disabled && typeof index === "string" && onSelect(index);
    };
    return (React.createElement("li", { className: classes, style: style, onClick: handleClick }, children));
};

var SubMenu = function (props) {
    var _a = useContext(MenuContext), selectedIndex = _a.selectedIndex, mode = _a.mode, defaultOpenedSubMenus = _a.defaultOpenedSubMenus;
    var children = props.children, index = props.index, title = props.title, className = props.className;
    var isOpened = defaultOpenedSubMenus && index && mode === "vertical"
        ? defaultOpenedSubMenus.includes(index)
        : false;
    var _b = useState(isOpened), open = _b[0], setOpen = _b[1];
    var classes = classNames("menu-item submenu-item", className, {
        "menu-item-active": selectedIndex === index,
        "submenu-item-opened": open,
    });
    var renderChildren = function () {
        var childrenElement = React.Children.map(children, function (child, i) {
            var c = child;
            var name = c.type.name;
            if (name === "MenuItem") {
                return React.cloneElement(c, { index: "".concat(index, "-").concat(i) });
            }
            else {
                console.error("必须传入MenuItem类型的组件！");
            }
        });
        return (React.createElement(CSSTransition, { in: open, timeout: 300, appear: true, unmountOnExit: true },
            React.createElement("ul", { className: "submenu" }, childrenElement)));
    };
    // 水平模式下点击再显示子项
    var handleClick = function (e) {
        e.preventDefault();
        setOpen(!open);
    };
    // 垂直模式下鼠标移入、移出控制是否显示
    var handleMouseMove = function (e, toggle) {
        e.preventDefault();
        setOpen(toggle);
    };
    var clickEvents = {
        onClick: mode !== "horizontal"
            ? function (e) {
                console.log(e.nativeEvent.target);
                handleClick(e);
            }
            : function () { },
    };
    var moveEvents = {
        onMouseMove: mode !== "vertical"
            ? function (e) {
                handleMouseMove(e, true);
            }
            : function () { },
        onMouseLeave: mode !== "vertical"
            ? function (e) {
                handleMouseMove(e, false);
            }
            : function () { },
    };
    return (React.createElement("li", { key: index, className: classes },
        React.createElement("div", __assign({ className: "submenu-title" }, clickEvents, moveEvents),
            title,
            React.createElement(Icon, { icon: "angle-down", className: "menu-icon" })),
        renderChildren()));
};

var MenuContext = createContext({ selectedIndex: "0" });
/**
 * @param {number} selectedIndex 当前被选中项的索引
 * @param {string} className 自定义样式类
 * @param {Mode} mode 模式
 * @param {Function} onSelect 菜单项被选中后触发的回调
 * @param {string[]} defaultOpenedSubMenus 默认展开的二级菜单
 * @param {React.CSSProperties} styles 行内样式
 */
var Menu = function (props) {
    var className = props.className, style = props.style, _a = props.mode, mode = _a === void 0 ? "horizontal" : _a, onSelect = props.onSelect, _b = props.selectedIndex, selectedIndex = _b === void 0 ? "0" : _b, children = props.children, _c = props.defaultOpenedSubMenus, defaultOpenedSubMenus = _c === void 0 ? [] : _c;
    var _d = useState(selectedIndex), activeIndex = _d[0], setactiveIndex = _d[1];
    var classes = classNames("menu", className, {
        "menu-vertical": mode === "vertical",
        "menu-horizontal": mode === "horizontal",
    });
    var handleMenuItemClick = function (index) {
        setactiveIndex(index);
        onSelect && onSelect(index);
    };
    var renderChildren = function () {
        return React.Children.map(children, function (child, index) {
            var childElement = child;
            var name = childElement.type.name;
            if (name === "MenuItem" || name === "SubMenu") {
                return React.cloneElement(childElement, { index: index.toString() });
            }
            else {
                console.error("类型不对哇");
            }
        });
    };
    return (React.createElement("ul", { className: classes, style: style, "data-testid": "test-menu" },
        React.createElement(MenuContext.Provider, { value: {
                selectedIndex: activeIndex,
                onSelect: handleMenuItemClick,
                mode: mode,
                defaultOpenedSubMenus: defaultOpenedSubMenus,
            } }, renderChildren())));
};
var MenuComponent = Menu;
MenuComponent.SubMenu = SubMenu;
MenuComponent.MenuItem = MenuItem;

var Progress = function (props) {
    var _a = props.height, height = _a === void 0 ? 30 : _a, _b = props.width, width = _b === void 0 ? 200 : _b, _c = props.percent, percent = _c === void 0 ? 0 : _c;
    return (React.createElement("div", { className: "outer", style: { height: "".concat(height, "px"), width: "".concat(width, "px") } },
        React.createElement("div", { className: "inner", style: { width: "".concat((percent * width) / 100, "px") } },
            React.createElement("span", null, percent.toFixed(2) + "%"))));
};

var UploadList = function (props) {
    var fileList = props.fileList, onRemove = props.onRemove;
    return (React.createElement("ul", { className: "upload-list" }, fileList.map(function (item) {
        return (React.createElement("li", { className: "upload-list-item", key: item.uid },
            React.createElement("div", { className: "item-wrapper" },
                React.createElement("span", { className: "upload-list-item-name" }, item.name),
                item.status === "success" && (React.createElement("span", { className: "upload-success" }, "\u4E0A\u4F20\u6210\u529F")),
                item.status === "error" && (React.createElement("span", { className: "upload-error" }, "\u4E0A\u4F20\u5931\u8D25")),
                item.status === "uploading" && (React.createElement("span", { className: "upload-uploading" }, "\u4E0A\u4F20\u4E2D...")),
                React.createElement("span", { className: "remove", onClick: function () { return onRemove(item); } }, "\u5220\u9664")),
            item.status === "uploading" && (React.createElement(Progress, { percent: item.percent, width: 300 }))));
    })));
};

var Dragger = function (props) {
    var onFile = props.onFile;
    var _a = useState(false), dragOver = _a[0], setDragOver = _a[1];
    var handleDrop = function (e) {
        e.preventDefault();
        var files = e.dataTransfer.files;
        onFile(files);
        setDragOver(false);
    };
    return (React.createElement("div", { className: classNames({ drag: true, "is-dragOver": dragOver }), onDragOver: function (e) {
            e.preventDefault();
            setDragOver(true);
        }, onDragLeave: function (e) {
            e.preventDefault();
            setDragOver(false);
        }, onDrop: handleDrop }, "\u62D6\u52A8\u4E0A\u4F20\u6587\u4EF6\u4E0A\u4F20"));
};

var Upload = function (props) {
    var action = props.action, headers = props.headers, name = props.name, data = props.data, withCredentials = props.withCredentials, accept = props.accept, multiple = props.multiple, onRemove = props.onRemove, onProgress = props.onProgress, onSuccess = props.onSuccess, onError = props.onError, beforeUpload = props.beforeUpload, onChange = props.onChange;
    var _a = useState([]), fileList = _a[0], setFileList = _a[1];
    var handleFileChange = function (e) {
        var files = e.target.files;
        if (files) {
            // 上传文件
            uploadFiles(files);
            if (fileInput.current) {
                fileInput.current.value = '';
            }
        }
    };
    var uploadFiles = function (files) {
        console.log(files);
        var postFiles = Array.from(files);
        postFiles.forEach(function (file) {
            if (!beforeUpload) {
                post(file);
            }
            else {
                var result = beforeUpload(file);
                if (result && result instanceof Promise) {
                    result.then(function (f) {
                        post(f);
                    });
                }
                else if (result !== false) {
                    post(file);
                }
            }
        });
    };
    //   更新文件列表中文件的状态
    var updateFileList = function (updateFile, updateObj) {
        setFileList(function (prevList) {
            return prevList.map(function (f) {
                if (f.uid === updateFile.uid) {
                    return __assign(__assign({}, f), updateObj);
                }
                else {
                    return f;
                }
            });
        });
    };
    var post = function (file) {
        var _file = {
            uid: Date.now() + file.name + file.size,
            status: 'ready',
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file,
        };
        // setFileList([_file, ...fileList]);
        setFileList(function (prevList) {
            return __spreadArray([_file], prevList, true);
        });
        var formData = new FormData();
        formData.append(name || 'file', file);
        if (data) {
            Object.keys(data).forEach(function (key) {
                formData.append(key, data[key]);
            });
        }
        axios
            .post(action, formData, {
            headers: __assign({ 'Content-Type': 'multipart/form-data' }, headers),
            withCredentials: withCredentials,
            onUploadProgress: function (e) {
                var percentage = Math.round(e.loaded * 100) / e.total || 0;
                // fileList在此处不一定是最新的
                updateFileList(_file, {
                    uid: _file.uid,
                    percent: percentage,
                    status: 'uploading',
                });
                if (percentage < 100) {
                    onProgress && onProgress(percentage, file);
                }
            },
        })
            .then(function (res) {
            console.log(res);
            onSuccess && onSuccess(res.data, file);
            onChange && onChange(file);
            updateFileList(_file, {
                uid: _file.uid,
                status: 'success',
                response: res.data,
            });
        })
            .catch(function (err) {
            console.log(err);
            onError && onError(err, file);
            onChange && onChange(file);
            updateFileList(_file, { uid: _file.uid, status: 'error', error: err });
        });
    };
    var fileInput = useRef(null);
    var handleClick = function () {
        if (fileInput.current) {
            fileInput.current.click();
        }
    };
    var handleRemove = function (file) {
        setFileList(function (prevList) {
            var res = prevList.filter(function (item) {
                return item.uid !== file.uid;
            });
            return res;
        });
        onRemove && onRemove(file);
    };
    return (React.createElement("div", null,
        React.createElement("input", { type: "file", name: "myFile", onChange: handleFileChange, ref: fileInput, style: { display: 'none' }, accept: accept, multiple: multiple }),
        React.createElement(Dragger, { onFile: function (files) {
                uploadFiles(files);
            } }),
        React.createElement("button", { onClick: handleClick, style: { margin: '0 auto', display: 'block' } }, "\u70B9\u51FB\u4E0A\u4F20"),
        React.createElement(UploadList, { fileList: fileList, onRemove: handleRemove })));
};
var UploadComponent = Upload;
UploadComponent.UploadList = UploadList;
UploadComponent.Dragger = Dragger;
UploadComponent.Progress = Progress;

var TabItem = function (props) {
    var _a = useContext(tabItemContext), activeIndex = _a.activeIndex, onSelect = _a.onSelect, setContent = _a.setContent;
    var title = props.title, index = props.index, children = props.children, className = props.className, styles = props.styles, disabled = props.disabled;
    var classes = classNames("tab-item", className, {
        "tab-item-active": index === activeIndex,
        "tab-item-disabled": disabled,
    });
    // 当activeIndex改变，且是自身，切换内容
    useEffect(function () {
        if (index === activeIndex) {
            setContent && setContent(children);
        }
    }, [activeIndex]);
    var handleClick = function (e) {
        e.preventDefault();
        typeof index === "number" && onSelect && onSelect(index);
    };
    return (React.createElement("li", { className: classes, style: styles, onClick: handleClick }, title));
};

var tabItemContext = createContext({ activeIndex: 0 });
var Tabs = function (props) {
    var _a = props.activeIndex, defaultIndex = _a === void 0 ? 0 : _a, onSelect = props.onSelect, children = props.children, className = props.className, styles = props.styles;
    var _b = useState(defaultIndex), activeIndex = _b[0], setActiveIndex = _b[1];
    var _c = useState(null), content = _c[0], setContent = _c[1];
    var classes = classNames("tabs", className);
    var handleTabItemClick = function (index) {
        setActiveIndex(index);
        if (onSelect) {
            onSelect(index);
        }
    };
    var renderChildren = function () {
        return React.Children.map(children, function (c, idx) {
            var child = c;
            if (child.type.name === "TabItem") {
                return React.cloneElement(child, { index: idx });
            }
            else {
                console.error("请传入TabItem组件");
            }
        });
    };
    return (React.createElement("div", { className: classes, style: styles },
        React.createElement(tabItemContext.Provider, { value: { activeIndex: activeIndex, onSelect: handleTabItemClick, setContent: setContent } },
            React.createElement("ul", { className: "tabs-items" }, renderChildren()),
            React.createElement("div", { className: "tabs-content" }, content))));
};
var TabsComponent = Tabs;
TabsComponent.TabItem = TabItem;

library.add(fas);

export { Alert, AutoComplete, Button, TransForm as Form, Icon, Input, MenuComponent as Menu, Skeleton, TabsComponent as Tabs, UploadComponent as Upload };
