export const pageVariants = {
    initial: {
        opacity: 0,
        scale: 1
    },
    in: {
        opacity: 1,
        scale: 1
    },
    out: {
        opacity: 0,
        scale: 1.2,
        duration: 1
    }
};

export const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
};

export const pageStyle = {
    position: "static"
};