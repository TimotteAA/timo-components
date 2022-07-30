import React, { useState } from "react";

import classNames from "classnames";

export interface DraggerProps {
  onFile: (files: FileList) => void;
}

const Dragger: React.FC<DraggerProps> = (props) => {
  const { onFile } = props;
  const [dragOver, setDragOver] = useState(false);
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    onFile(files);
    setDragOver(false);
  };

  return (
    <div
      className={classNames({ drag: true, "is-dragOver": dragOver })}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setDragOver(false);
      }}
      onDrop={handleDrop}
    >
      拖动上传文件上传
    </div>
  );
};

export default Dragger;
