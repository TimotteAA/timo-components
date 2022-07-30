import React from "react";
import { UploadFile } from "../";
import Progress from "../Progress";

export interface UploadListProps {
  fileList: UploadFile[];
  onRemove: (file: UploadFile) => void;
}

const UploadList: React.FC<UploadListProps> = (props) => {
  const { fileList, onRemove } = props;
  return (
    <ul className="upload-list">
      {fileList.map((item) => {
        return (
          <li className="upload-list-item" key={item.uid}>
            <div className="item-wrapper">
              <span className="upload-list-item-name">{item.name}</span>
              {item.status === "success" && (
                <span className="upload-success">上传成功</span>
              )}
              {item.status === "error" && (
                <span className="upload-error">上传失败</span>
              )}
              {item.status === "uploading" && (
                <span className="upload-uploading">上传中...</span>
              )}
              <span className="remove" onClick={() => onRemove(item)}>
                删除
              </span>
            </div>
            {item.status === "uploading" && (
              <Progress percent={item.percent} width={300} />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default UploadList;
