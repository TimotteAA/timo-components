import React from 'react';
import './index.scss';
import classnames from 'classnames';
import cancelSrc from "./cancel.png";

const TYPE = {
  text: 'text',
  textarea: 'textarea',
};

export type SizeType = 'normal' | 'large';
export type Type = 'text' | 'textarea' | '';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * @description 自动获取焦点
   */
  autoFocus?: boolean;
  /**
   * @description 控件类型
   */
  type?: Type;
  /**
   * @description 控件大小
   */
  size?: SizeType;
  /**
   * @description 是否禁用
   */
  disabled?: boolean;
  /**
   * @description 设置前置标签
   */
  addonBefore?: React.ReactNode;
  /**
   * @description 设置后置标签
   */
  addonAfter?: React.ReactNode;
  /**
   * @description 可以计数
   */
  allowCount?: boolean;
  /**
   * @description 可以点击清除图标删除内容
   */
  allowClear?: boolean;
  /**
   * @description textarea行数，默认3
   */
  rows?: number;
  /**
   * @description 动态样式
   */
  style?: React.CSSProperties;
  /**
   * @description 输入框内容
   */
  value?: string | number | undefined;
  /**
   * @description 输入框占位符
   */
  placeholder?: string;
  /**
   * @description 输入框id
   */
  id?: string;
  /**
   * @description 最大长度
   */
  maxLength?: number;
  /**
   * @description 是否背景透明
   */
  isBgTransparent?: boolean;
  /**
   * @description input改变的回调函数
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

interface InputState {
  focus: boolean;
  text: string | number;
}

export default class Index extends React.PureComponent<InputProps, InputState> {
  input: HTMLInputElement | HTMLTextAreaElement | undefined;
  constructor(props: InputProps) {
    super(props);
    this.state = {
      focus: false,
      text: props?.value || '',
    };
  }

  componentDidMount() {
    if (this.props.value) {
      this.setState({
        text: this.props.value,
      });
    }
  }

  static getDerivedStateFromProps(nextProps: InputProps) {
    if (nextProps.value) {
      return {
        text: nextProps.value,
      };
    } else {
      return {};
    }
  }

  saveInput = (input: HTMLInputElement | HTMLTextAreaElement) => {
    this.input = input;
  };

  // 模拟change事件
  onInputChange(e: any) {
    const target = this.input as any;
    const event = Object.create(e);
    // 如果是点击清除按钮，则需要改target指向input，value清空
    if (e.type === 'click') {
      target.value = '';
      event.target = target;
      event.currentTarget = target;
    }
    this.props.onChange && this.props.onChange(event);
  }

  focus = () => {
    this.input && this.input.focus();
  };

  blur = () => {
    this.input && this.input.blur();
  };

  onFocus = () => {
    this.setState({
      focus: true,
    });
  };

  onBlur = () => {
    this.setState({
      focus: false,
    });
  };

  onInput = (e: any) => {
    this.setState({ text: e.target.value });
    this.onInputChange(e);
  };

  onClear = (e: any) => {
    this.setState({
      text: '',
    });
    this.onInputChange(e);
  };

  // 渲染三个位置的图标
  renderBefore() {
    const { addonBefore } = this.props;
    return !!addonBefore && <div className="input-center">{addonBefore}</div>;
  }

  renderAfter() {
    const { addonAfter } = this.props;
    return !!addonAfter && <div className="input-center">{addonAfter}</div>;
  }

  renderClear() {
    const { allowClear } = this.props;
    return !!allowClear && this.state.text && <i className="input-clear" onClick={this.onClear} style={{backgroundImage: cancelSrc, backgroundPosition: "center"}} />;
  }

  renderInput() {
    const { placeholder, size = 'normal', maxLength, id, disabled, autoFocus } = this.props;
    return (
      <div
        className={classnames(`input-input`, {
          [`${size}`]: true,
        })}
      >
        <input
          {...{ placeholder, maxLength, id, disabled, autoFocus }}
          value={this.state.text}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onInput={this.onInput}
          ref={this.saveInput as any}
        />
        {this.renderClear()}
      </div>
    );
  }

  renderTextarea() {
    const { placeholder, maxLength = 1000, id, disabled, allowCount = true, autoFocus, rows } = this.props;
    const _rows = rows || 3;
    const text = this.state.text;
    return (
      <div className="input-textarea" style={{ height: 24 * _rows }}>
        <textarea
          {...{ placeholder, maxLength, id, disabled, autoFocus }}
          rows={_rows}
          value={text}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onInput={this.onInput}
          ref={this.saveInput as any}
        />
        {this.renderClear()}
        {allowCount && (
          <div className="input-textarea-footer">
            <span
              className={classnames({
                'max-length-text': !!maxLength && text && String(text).length >= maxLength,
              })}
            >
              {String(text).length}
            </span>
            {!!maxLength && (
              <>
                <span>/</span>
                <span>{maxLength}</span>
              </>
            )}
          </div>
        )}
      </div>
    );
  }

  render() {
    const { isBgTransparent = false, style, type, allowClear } = this.props;
    return (
      <div
        style={style}
        className={classnames('input', {
          normal: !isBgTransparent,
          focus: this.state.focus,
          'allow-clear': allowClear,
        })}
      >
        {this.renderBefore()}
        {TYPE.textarea === type ? this.renderTextarea() : this.renderInput()}
        {this.renderAfter()}
      </div>
    );
  }
}
