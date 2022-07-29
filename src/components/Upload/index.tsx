import React, { useRef, useState } from 'react';
// @ts-ignore
import axios from 'axios';
import UploadList from './UploadList';
import Dragger from './Dragger';


/**
 * @description Upload component
 * @description onProgress：上传进度回调
 * @description onSuccess：上传成功回调
 * @description onError：上传失败回调
 * @description beforeUpload：上传前对文件做校验，或者转换
 * @description onChange：上传中->成功、失败的状态改变回调
 * @description name: 上传文化的formData自定义key，默认为file
 * @description data：额外的上传数据
 * @description withCrenditial：是否携带token
 * @description accept：接受的文件类型
 * @description multiple：是否支持文件多选
 * @returns
 */
interface UploadProps {
  action: string; // 接口
  onProgress?: (percentage: number, file: File) => void;
  onSuccess?: (data: any, file: File) => void;
  onError?: (err: any, file: File) => void;
  onChange?: (file: File) => void;
  onRemove?: (file: UploadFile) => void;
  beforeUpload?: (file: File) => boolean | Promise<File>;
  headers?: Record<string, any>;
  name?: string;
  data?: Record<string, any>;
  withCredentials?: boolean;
  accept?: string;
  multiple?: boolean;
}

export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status?: 'ready' | 'uploading' | 'success' | 'error';
  percent?: number;
  raw?: File;
  response?: any;
  error?: any;
}

const Upload: React.FC<UploadProps> = (props) => {
  const {
    action,
    headers,
    name,
    data,
    withCredentials,
    accept,
    multiple,
    onRemove,
    onProgress,
    onSuccess,
    onError,
    beforeUpload,
    onChange,
  } = props;
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // 上传文件
      uploadFiles(files);
      if (fileInput.current) {
        fileInput.current.value = '';
      }
    }
  };
  const uploadFiles = (files: FileList) => {
    console.log(files);
    let postFiles = Array.from(files);
    postFiles.forEach((file) => {
      if (!beforeUpload) {
        post(file);
      } else {
        const result = beforeUpload(file);
        if (result && result instanceof Promise) {
          result.then((f) => {
            post(f);
          });
        } else if (result !== false) {
          post(file);
        }
      }
    });
  };

  //   更新文件列表中文件的状态
  const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
    setFileList((prevList) => {
      return prevList.map((f) => {
        if (f.uid === updateFile.uid) {
          return { ...f, ...updateObj };
        } else {
          return f;
        }
      });
    });
  };

  const post = (file: File) => {
    let _file: UploadFile = {
      uid: Date.now() + file.name + file.size,
      status: 'ready',
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file,
    };
    // setFileList([_file, ...fileList]);
    setFileList((prevList) => {
      return [_file, ...prevList];
    });
    const formData = new FormData();
    formData.append(name || 'file', file);
    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
    }
    axios
      .post(action, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          ...headers,
        },
        withCredentials,
        onUploadProgress(e: any) {
          let percentage = Math.round(e.loaded * 100) / e.total || 0;
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
      .then((res: any) => {
        console.log(res);
        onSuccess && onSuccess(res.data, file);
        onChange && onChange(file);
        updateFileList(_file, {
          uid: _file.uid,
          status: 'success',
          response: res.data,
        });
      })
      .catch((err: any) => {
        console.log(err);
        onError && onError(err, file);
        onChange && onChange(file);
        updateFileList(_file, { uid: _file.uid, status: 'error', error: err });
      });
  };

  const fileInput = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  const handleRemove = (file: UploadFile) => {
    setFileList((prevList) => {
      const res = prevList.filter((item) => {
        return item.uid !== file.uid;
      });
      return res;
    });
    onRemove && onRemove(file);
  };

  return (
    <div>
      <input
        type="file"
        name="myFile"
        onChange={handleFileChange}
        ref={fileInput}
        style={{ display: 'none' }}
        accept={accept}
        multiple={multiple}
      />
      <Dragger
        onFile={(files) => {
          uploadFiles(files);
        }}
      />
      <button onClick={handleClick} style={{ margin: '0 auto', display: 'block' }}>
        点击上传
      </button>
      <UploadList fileList={fileList} onRemove={handleRemove} />
    </div>
  );
};

export default Upload;
