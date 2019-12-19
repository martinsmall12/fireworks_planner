import React from 'react';
import WaveSurfer from 'wavesurfer.js';
import Timeline from 'wavesurfer.js/dist/plugin/wavesurfer.timeline';
import Regions from 'wavesurfer.js/dist/plugin/wavesurfer.regions';
import {connect} from "react-redux";
import Slider from '@material-ui/core/Slider';
import {path, concat} from 'ramda';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import HeightIcon from '@material-ui/icons/Height';
import PauseIcon from '@material-ui/icons/Pause';
import VerticalAlignCenterIcon from '@material-ui/icons/VerticalAlignCenter';
import pink from "@material-ui/core/colors/pink";
import grey from "@material-ui/core/colors/grey";
import Box from '@material-ui/core/Box';
import { timeformat } from '../utils';
import {getEffects} from "../selectors";

class Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = {volume: 0.5, lastVolume: 0, isPlaying: false};
    }

    componentDidMount() {
        const { effects } = this.props;
        const aud = document.querySelector('#song');

        this.wavesurfer = WaveSurfer.create({
            barWidth: 1,
            cursorWidth: 1,
            container: '#waveform',
            backend: 'MediaElement',
            height: 60,
            progressColor: pink[700],
            responsive: true,
            waveColor: grey[300],
            cursorColor: pink[500],
            plugins: [
                Timeline.create({
                    container: "#wave-timeline"
                }),
                Regions.create({
                    regions: effects,
                    dragSelection: {
                        slop: 5
                    },
                }),
            ]
        });

        this.wavesurfer.load(aud);

        this.wavesurfer.on("audioprocess", pos => {
            this.props.handleStateChange(pos);
        });

        this.wavesurfer.on("seek", () => {
            const pos = this.wavesurfer.getCurrentTime();
            this.props.handleStateChange(pos);
        });

        this.wavesurfer.on("region-update-end", (e) => {
            console.log(e);
           console.log("zmena pozice regionu");
        });
    }

    playIt = () => {
        this.distributionRegions();
        this.wavesurfer.playPause();

        const isPlaying = this.wavesurfer.isPlaying();
        const duration = this.wavesurfer.getDuration();
        this.setState({duration: timeformat(duration, 0), isPlaying });
    };

    stopIt = () => {
        this.wavesurfer.stop();
    };

    isPlaying = () => {
        console.log(this.wavesurfer.isPlaying());
        return this.wavesurfer.isPlaying();
    };

    volumeMute = () => {
        const volume = this.wavesurfer.getVolume();
        const lastVolume = this.state.lastVolume;
        if (volume === 0) {
            this.setState({volume: lastVolume});
            this.wavesurfer.setVolume(lastVolume);
        } else {
            this.setState({volume: 0, lastVolume: volume});
            this.wavesurfer.setVolume(0);
        }
    };


    distributionRegions = () => {
        let regions = this.wavesurfer.regions.params.regions;
        let regionsFromDom = document.getElementsByTagName('region');

        let i;
        for (i = 0; i < regions.length; i++) {
            let name = regions[i].firePlace;
            let arr = regionsFromDom[i].className.split(" ");
            if (arr.indexOf(name) === -1) {
                regionsFromDom[i].className += " " + name;
            }
        }
    };

    handleZoom = (event, newValue) => {
        this.wavesurfer.zoom(newValue);
    };

    handleSetHeight = (event, newValue) => {
        this.wavesurfer.setHeight(newValue);
    };

    handleSetVolume = (event, newValue) => {
        this.wavesurfer.setVolume(newValue);
        this.setState({volume: newValue});
    };


    render() {
        const isPlaying = this.state.isPlaying;
        const volume = this.state.volume;
        const duration = this.state.duration;
        return (
            <div>
                <Box position="fixed" bottom="0" style={{width: '100%'}}>
                    <Grid container spacing={1}>
                        <Grid item xs={2}>
                            <Grid container spacing={2}>
                                <Grid item>
                                    <VolumeDown color="secondary"/>
                                </Grid>
                                <Grid item xs>
                                    <Slider max={1} step={0.01} onChange={this.handleSetVolume} value={volume}
                                            aria-labelledby="continuous-slider"/>
                                </Grid>
                                <Grid item>
                                    <VolumeUp color="secondary"/>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <div
                                id="waveform"
                                className="player"
                            />
                            <div
                                id="wave-timeline"
                            />
                            <audio
                                id="song"
                                src="https://reelcrafter-east.s3.amazonaws.com/aux/test.m4a"
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} justify="center"
                          alignItems="center">
                        <Grid item xs={2}>
                            <Grid container spacing={2}>
                                <Grid item>
                                    <VerticalAlignCenterIcon color="secondary"/>
                                </Grid>
                                <Grid item xs>
                                    <Slider min={60} max={500} onChange={this.handleSetHeight}
                                            aria-labelledby="continuous-slider"/>
                                </Grid>
                                <Grid item>
                                    <HeightIcon color="secondary"/>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={8}>
                            <Grid container spacing={0} justify="center" alignItems="center" alignContent="center">
                                {timeformat(this.props.pos, 2)}
                                <Fab color="secondary" aria-label="Stop" onClick={this.stopIt}>
                                    <StopIcon/>
                                </Fab>
                                <Fab color="primary" aria-label="Play" onClick={this.playIt}>
                                    {isPlaying ? (<PauseIcon/>):(<PlayArrowIcon/>)}
                                </Fab>
                                <Fab color="secondary" aria-label="Mute" onClick={this.volumeMute}>
                                    <VolumeOffIcon/>
                                </Fab>
                                {duration}
                            </Grid>
                        </Grid>
                        <Grid item xs={2}>
                            <Grid container spacing={2}>
                                <Grid item>
                                    <ZoomOutIcon color="secondary"/>
                                </Grid>
                                <Grid item xs>
                                    <Slider onChange={this.handleZoom} aria-labelledby="continuous-slider"/>
                                </Grid>
                                <Grid item>
                                    <ZoomInIcon color="secondary"/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    effects: getEffects(state),
});

const mapDispatchToProps = {

};

export { Player };
export default connect(mapStateToProps, mapDispatchToProps)(Player);
