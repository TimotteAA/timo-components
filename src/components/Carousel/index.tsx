import React, {useState, useMemo, useCallback, useEffect, useRef} from "react";
import classNames from "classnames";

import Icon from "../Icon"


export interface CarouselProps {
    imgUrls: string[];
    showDots?: boolean;
    showArrow?: boolean;
    fontSize?: number
    renderDot?: (idx: number) => React.ReactNode;
    width?: number;
    height?: number;
    transformSpeed?: number;
    interval?: number;
    autoplay?: boolean;
}

type StepAndSpeed = {
    step: number;
    speed: number;
}

const Carousel: React.FC<CarouselProps> = (props) => {
    const { imgUrls, showArrow = true, showDots = true,
        fontSize = 30, renderDot,
        width = 500, height = 150,
        transformSpeed = 800, interval = 1500,
        autoplay = true} = props;

    const timerRef = useRef<any>(null);

    // const [step, setStep] = useState(1);
    const [stepAndSpeed, setStepAndSpeed] = useState<StepAndSpeed>({
        step: 1,
        speed: transformSpeed
    })
    const transFormImgUrls = useCallback((imgUrls: string[]) => {
        const imgUrlClone: string[] = [...imgUrls];
        imgUrlClone.push(imgUrls[0])
        imgUrlClone.unshift(imgUrls[imgUrls.length - 1])
        return imgUrlClone;
    }, [])
    const [imgs, setImgs] = useState<string[]>([]);
    useEffect(() => {
        const newImgs = transFormImgUrls(imgUrls);
        setImgs(newImgs);
    }, [])

    const containerStyle = useMemo(() => {
        return {
            width: `${width}px`,
            height: `${height}px`,
        }
    }, [width, height])

    const carouselImgsContainerStyle = useMemo(() => {
        const { speed, step } = stepAndSpeed;
        return {
            width: `calc(100% * ${imgs.length})`,
            height: `${height}px`,
            left: `-${step * width}px`,
            transition: `all ${speed}ms linear`
        }
    }, [stepAndSpeed, width,height, imgs])

    // 切换下一张的方法
    const next = () => {
        // if (step >= imgs.length - 1) {
        //     setStep(1);
        // }
        setTimeout(() => {
            setStepAndSpeed(stepAndSpeed => {
                const { step } = stepAndSpeed;
                if (step >= imgs.length - 1) {
                    return {
                        step: 1,
                        speed: 0,
                    }
                } else {
                    return {
                        step: step + 1,
                        speed: transformSpeed
                    }
                }
            });
        }, 0)
    }
    // 自动轮播
    useEffect(() => {

        if (autoplay) {
            timerRef.current = setInterval(() => {
                next();
            }, interval)
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        }
    }, []);
    console.log(stepAndSpeed);

    return <div className={"carousel-container"} style={containerStyle}>
        <div className={"carousel-imgs-container"} style={carouselImgsContainerStyle}>
            {
                imgs.map((img, idx) => {
                    return  <div className={"carousel-img"} key={idx}><img src={img} /></div>
                })
            }
        </div>
        { showArrow && <span className={"carousel-left-arrow"}>
            <Icon icon={"arrow-left"} fontSize={fontSize} color={"white"}/>
        </span>}
        { showArrow && <span className={"carousel-right-arrow"}>
            <Icon icon={"arrow-right"} fontSize={fontSize} color={"white"}/>
        </span> }
        { showDots && <div className={"carousel-dots"}>
            {
                imgUrls.map((_, idx) => {
                    const classes = classNames("carousel-dot", {
                        "carousel-dot-active":  stepAndSpeed.step === idx + 1
                    });
                    return <div key={idx} className={"carousel-dot-wrapper"}>{

                        renderDot ? renderDot(idx) : <div className={classes}></div>
                    }</div>
                })
            }
        </div> }
    </div>
}

export default Carousel;
