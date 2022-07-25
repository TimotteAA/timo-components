import React, {useState, useEffect} from "react";

import Skeleton from "../../components/Skeleton";
import "./index.scss";
import imgSrc from "../../assets/imgs/bg.jpg";


const Simple: React.FC = () => {
    const [isVisible, setIsVisible] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setIsVisible(false);
        }, 15000)
    }, [])

    return (
        <Skeleton isVisible={isVisible} depth={4}>
            <div className="simple-wrapper">
                <div className="simple-top">
                    <div className="item">第一条</div>
                    <div className="item">第二条</div>
                </div>
                <div className="simple-middle">
                    <div className="item">第一条</div>
                    <div className="item">第二条</div>
                    <div className="item">第三条</div>
                </div>
                <div className="simple-bottom">
                    <img src={imgSrc}/>
                    <div className={"item"}>xxx</div>
                </div>
            </div>
        </Skeleton>)
}

export default Simple;