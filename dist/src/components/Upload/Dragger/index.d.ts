import React from "react";
export interface DraggerProps {
    onFile: (files: FileList) => void;
}
declare const Dragger: React.FC<DraggerProps>;
export default Dragger;
