import React from "react";
interface SkeletonProps {
    isVisible?: boolean;
    depth?: number;
    children?: React.ReactElement;
}
declare const Skeleton: React.FC<SkeletonProps>;
export default Skeleton;
