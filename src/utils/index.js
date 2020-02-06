import {equals, prop} from "ramda";

const togetherStyle = {
    opacity: 0.5,
    display: 'block',
    width: '33%',
    height: '33.3%',
};

export const timeformat = (time, secFormat) => {
    const minutes = Math.floor(time / 60);
    const minutesFormat = minutes < 10 ? '0' + minutes : minutes;
    const seconds = time - minutes * 60;
    const secondsFormat = seconds < 10 ? '0' + seconds.toFixed(secFormat) : seconds.toFixed(secFormat);
    return minutesFormat + ':' + secondsFormat;
};

export const effectInFirePosition = (pos, effect) => pos > effect.start && pos < (effect.start + effect.duration);

export const equalsPreviewPosition = (effect, previewPosition) => equals(prop('previewPosition', effect), previewPosition);

export const fireToPreviewPosition = (effect, pos, previewPosition) => equalsPreviewPosition(effect, previewPosition) && effectInFirePosition(pos, effect);

export const getStyleForPreviewPositions = (effect, pos ) => {
    const previewPosition = effect ? effect.previewPosition : undefined;
    if (previewPosition === 1 && fireToPreviewPosition(effect, pos, previewPosition)) {
        return {top: 0, left: 0, ...togetherStyle};
    } else if (previewPosition === 2 && fireToPreviewPosition(effect, pos, previewPosition)) {
        return {top: 0, left: '33.3%', ...togetherStyle};
    } else if (previewPosition === 3 && fireToPreviewPosition(effect, pos, previewPosition)) {
        return {top: 0, left: '66.6%', ...togetherStyle};
    } else if (previewPosition === 4 && fireToPreviewPosition(effect, pos, previewPosition)) {
        return {top: '33.3%', left: 0, ...togetherStyle};
    } else if (previewPosition === 5 && fireToPreviewPosition(effect, pos, previewPosition)) {
        return {top: '33.3%', left: '33.3%', ...togetherStyle};
    } else if (previewPosition === 6 && fireToPreviewPosition(effect, pos, previewPosition)) {
        return {top: '33.3%', left: '66.6%', ...togetherStyle};
    } else if (previewPosition === 7 && fireToPreviewPosition(effect, pos, previewPosition)) {
        return {top: '66.6%', left: 0, ...togetherStyle};
    } else if (previewPosition === 8 && fireToPreviewPosition(effect, pos, previewPosition)) {
        return {top: '66.6%', left: '33.3%', ...togetherStyle};
    } else if (previewPosition === 9 && fireToPreviewPosition(effect, pos, previewPosition)) {
        return {top: '66.6%', left: '66.6%', ...togetherStyle};
    } else if (previewPosition === 10 && fireToPreviewPosition(effect, pos, previewPosition)) {
        return {top: '33.3%', left: '0', ...togetherStyle, width: '100%', height: '66.6%'};
    } else if (previewPosition === 11 && fireToPreviewPosition(effect, pos, previewPosition)) {
        return {
            top: '33.3%',
            left: '15%',
            width: '66.6%',
            height: '66.6%',
            opacity: 0.5,
            display: 'block',
            transform: 'rotate(45deg)'
        };
    } else if (previewPosition === 12 && fireToPreviewPosition(effect, pos, previewPosition)) {
        return {
            top: '33.3%',
            right: '15%',
            width: '66.6%',
            height: '66.6%',
            opacity: 0.5,
            display: 'block',
            transform: 'rotate(-45deg)'
        };
    } else if (previewPosition === 13 && fireToPreviewPosition(effect, pos, previewPosition)) {
        return {
            top: '38%',
            left: '3%',
            width: '66.6%',
            height: '66.6%',
            opacity: 0.5,
            display: 'block',
            transform: 'rotate(-45deg)'
        };
    } else if (previewPosition === 14 && fireToPreviewPosition(effect, pos, previewPosition)) {
        return {
            top: '38%',
            right: '3%',
            width: '66.6%',
            height: '66.6%',
            opacity: 0.5,
            display: 'block',
            transform: 'rotate(45deg)'
        };
    }
}
