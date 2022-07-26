import React from "react";
import { UploadFile } from "../";
export interface UploadListProps {
    fileList: UploadFile[];
    onRemove: (file: UploadFile) => void;
}
declare const UploadList: React.FC<UploadListProps>;
export default UploadList;
