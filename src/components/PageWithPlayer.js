import React, {cloneElement, useState, useCallback} from "react";
import throttle from 'lodash.throttle'
import Player from "./Player";

const PageWithPlayer = ({children}) => {
    const [ pos, setPos ] = useState(0);
    const handleSetPos = useCallback(throttle((value) => {
        // if(shouldSetPos(value)){
            setPos(value)
        // }
    },100), []);
    return <>
       {cloneElement(children, {pos})}
        <Player handleStateChange={handleSetPos} pos={pos}/>
    </>
}

export default PageWithPlayer