import React from 'react';
import { UploadListProps } from './UploadList';
import { DraggerProps } from './Dragger';
import { ProgressProps } from "./Progress";
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
    action: string;
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
export declare type TransUplod = React.FC<UploadProps> & {
    Progress: React.FC<ProgressProps>;
    UploadList: React.FC<UploadListProps>;
    Dragger: React.FC<DraggerProps>;
};
declare const UploadComponent: TransUplod;
export default UploadComponent;
