export const timeformat = (time, secFormat) => {
    const minutes = Math.floor(time / 60);
    const minutesFormat = minutes < 10 ? '0' + minutes : minutes;
    const seconds = time - minutes * 60;
    const secondsFormat = seconds < 10 ? '0' + seconds.toFixed(secFormat) : seconds.toFixed(secFormat);
    return minutesFormat + ':' + secondsFormat;
};