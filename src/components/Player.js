import React from 'react';
import WaveSurfer from 'wavesurfer.js';
import Timeline from 'wavesurfer.js/dist/plugin/wavesurfer.timeline';
import Regions from 'wavesurfer.js/dist/plugin/wavesurfer.regions';
import LaneAdder from "./LaneAdder";
import LaneHeader from "./LaneHeader";
import Effect from "./Effect";
import Board from "@lourenci/react-kanban";
import {connect} from "react-redux";
import YouTube from '@u-wave/react-youtube';
import {Form} from 'react-bootstrap'

class Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = {pos: 0};
    }

    componentDidMount() {
        const {regions} = this.props;
        const aud = document.querySelector('#song');

        this.wavesurfer = WaveSurfer.create({
            barWidth: 1,
            cursorWidth: 1,
            container: '#waveform',
            backend: 'MediaElement',
            height: 100,
            progressColor: '#4a74a5',
            responsive: true,
            waveColor: '#ccc',
            cursorColor: '#4a74a5',
            plugins: [
                Timeline.create({
                    container: "#wave-timeline"
                }),
                Regions.create({
                    regions: regions,
                    dragSelection: {
                        slop: 5
                    }
                })
            ]
        });

        this.wavesurfer.load(aud);

        this.wavesurfer.on("audioprocess", pos => {
            this.setState({ pos });
        });
    }

    playIt = () => {
        this.wavesurfer.playPause();
    };

    handleZoom = ({ target }) => {
        console.log(target.value);
        this.wavesurfer.zoom(Number(target.value));
    };


    render() {
        const {board} = this.props;
        return (
            <div>
                <Board
                    allowRemoveLane
                    allowRenameLane
                    allowRemoveCard
                    onLaneRemove={console.log}
                    onCardRemove={console.log}
                    onLaneRename={console.log}
                    onCardRename={console.log}
                    allowAddLane
                    onCardNew={console.log}
                    renderLaneAdder={({addLane}) => <LaneAdder addLane={addLane}/>}
                    renderLaneHeader={({title}, {removeLane, renameLane, addCard}) => (
                        <LaneHeader>
                            {title}
                            <button type='button' onClick={removeLane}>Remove Lane</button>
                            <button type='button' onClick={() => renameLane('New title')}>Rename Lane</button>
                            <button type='button' onClick={() => addCard({id: 99, title: 'New Card'})}>Add Card</button>
                        </LaneHeader>
                    )}
                    renderCard={({name, shots, duration, videoUrl, start}, {removeCard, dragging}) => (
                        <Effect dragging={dragging} >
                            {name} -
                            {shots} -
                            {duration}
                            {(this.state.pos > start && this.state.pos < (start+duration)) &&
                            <YouTube
                                video={videoUrl}
                                autoplay
                                className={'leftSide'}
                                width={560}
                                height={315}
                                showCaptions={false}
                                showInfo={false}
                                controls={false}
                                disableKeyboard={true}
                                annotations={false}
                                showRelatedVideos={false}
                                modestBranding={true}
                            />
                            }
                            <button type="button" onClick={removeCard}>Remove Card</button>
                        </Effect>
                    )}
                >
                    {board}
                </Board>
                <button onClick={this.playIt}>Play</button>
                <div
                    id="waveform"
                    className="player"
                />
                <div
                    id="wave-timeline"
                />
                <div>
                    Pozice: {this.state.pos}
                </div>
                <audio
                    id="song"
                    src="https://reelcrafter-east.s3.amazonaws.com/aux/test.m4a"
                />
                <Form className="zoom">
                    <Form.Group>
                        <Form.Label>Zoom</Form.Label>
                        <Form.Control type="range" min="20" max="200" defaultValue="20" onChange={this.handleZoom} />
                    </Form.Group>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = () => ({
    board: {
        lanes: [
            {
                id: 1,
                title: 'Backlog',
                cards: [
                    {
                        id: 1,
                        name: 'Kompakt',
                        shots: 100,
                        duration: 20,
                        videoUrl: "NTkv2uzVSOc",
                        start: 10
                    },
                    {
                        id: 2,
                        name: 'Kompakt',
                        shots: 100,
                        duration: 20,
                        videoUrl: "ghzsOnfXCsA",
                        start: 12
                    },
                    {
                        id: 3,
                        name: 'Kompakt',
                        shots: 100,
                        duration: 25,
                        videoUrl: "OYyIr5cZkXM",
                        start: 14
                    },
                ]
            },
            {
                id: 2,
                title: 'Doing',
                cards: [
                    {
                        id: 2,
                        title: 'Drag-n-drop support',
                        description: 'Move a card between the lanes'
                    },
                ]
            }
        ]
    },
    regions: [{
        start: 1,
        end: 3,
        loop: false,
        color: 'hsla(400, 100%, 30%, 0.5)'
    }]
});
export default connect(mapStateToProps)(Player);
