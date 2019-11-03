import React from 'react';
import {connect} from "react-redux";
import YouTube from '@u-wave/react-youtube';
import {concat, path} from 'ramda';
import Player from './Player';
import Box from "@material-ui/core/Box";

class Preview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {pos: 0};
    }

    handleStateChange = (value) =>
        this.setState({pos: value});

    render() {
        const {board} = this.props;
        const {regions, regions1, regions2} = this.props;
        const concatRegions = concat(regions, regions1);
        const allEffects = concat(concatRegions, regions2);


        let styleForPosition = (effect) => {

            if (effect.previewPosition === 1 && this.state.pos > effect.start && this.state.pos < (effect.start+effect.duration)) {
                return {
                    width: '33%',
                    height: '50%',
                    top: 0,
                    left: 0,
                    opacity: 0.5,
                    display: 'block'
                }
            } else if (effect.previewPosition === 2 && this.state.pos > effect.start && this.state.pos < (effect.start+effect.duration)) {
                return {
                    width: '33%',
                    height: '50%',
                    top: 0,
                    left: '33.3%',
                    opacity: 0.5,
                    display: 'block'
                }
            } else if (effect.previewPosition === 3 && this.state.pos > effect.start && this.state.pos < (effect.start+effect.duration)) {
                return {
                    width: '33%',
                    height: '50%',
                    top: 0,
                    left: '66.6%',
                    opacity: 0.5,
                    display: 'block'
                }
            } else if (effect.previewPosition === 4 && this.state.pos > effect.start && this.state.pos < (effect.start+effect.duration)) {
                return {
                    width: '33%',
                    height: '50%',
                    top: '50%',
                    left: 0,
                    opacity: 0.5,
                    display: 'block'
                }
            } else if (effect.previewPosition === 5 && this.state.pos > effect.start && this.state.pos < (effect.start+effect.duration)) {
                return {
                    width: '33%',
                    height: '50%',
                    top: '50%',
                    left: '33.3%',
                    opacity: 0.5,
                    display: 'block'
                }
            } else if (effect.previewPosition === 6 && this.state.pos > effect.start && this.state.pos < (effect.start+effect.duration)) {
                return {
                    width: '33%',
                    height: '50%',
                    top: '50%',
                    left: '66.6%',
                    opacity: 0.5,
                    display: 'block'
                }
            }
        }

        return (
            <div>
                {allEffects.map((effect, index) => (
                    <Box position="fixed" display="none" style={styleForPosition(effect)}>
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
                            play={this.state.pos > effect.start && this.state.pos < (effect.start+effect.duration)}
                            pause={!(this.state.pos > effect.start && this.state.pos < (effect.start+effect.duration))}
                        />
                    </Box>
                ))}
                <Player handleStateChange={this.handleStateChange}/>
            </div>

        )
    }
}

const mapStateToProps = (state) => ({
    board: path(['app', 'board'], state),
    regions: state.app.board.lanes[0].cards,
    regions1: state.app.board.lanes[1].cards,
    regions2: state.app.board.lanes[2].cards,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Preview);
