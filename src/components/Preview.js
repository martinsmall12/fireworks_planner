import React from 'react';
import {connect, useSelector} from "react-redux";
import YouTube from '@u-wave/react-youtube';
import {concat, path, equals, prop, cond, always} from 'ramda';
import Player from './Player';
import Box from "@material-ui/core/Box";
import {effectInFirePosition, getStyleForPreviewPositions} from '../utils';
import {getSitesInSceneWithEffects} from "../selectors";


const Preview = ({pos}) => {
    const sitesInSceneWithEffects = useSelector( getSitesInSceneWithEffects('scene1'));
    return <div>
        {sitesInSceneWithEffects.map((effect, index) => (
            <Box position="fixed" display="none"
                 style={getStyleForPreviewPositions(effect, pos, effect.previewPosition)}>
                <YouTube
                    key={`list-${effect.id}`}
                    index={index}
                    video={effect.videoUrl}
                    autoplay={false}
                    width="100%"
                    height="100%"
                    showCaptions={false}
                    showInfo={false}
                    controls={false}
                    disableKeyboard={true}
                    annotations={false}
                    showRelatedVideos={false}
                    modestBranding={true}
                    play={effectInFirePosition(pos, effect)}
                    pause={!effectInFirePosition(pos, effect)}
                />
            </Box>
        ))}
    </div>
}

export default Preview
