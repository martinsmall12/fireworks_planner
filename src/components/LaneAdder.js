import React from "react";

const LaneAdder = ({ addLane }) => (
        <div onClick={()=> addLane({title: 'Title', cards:[]})}>
            Add lane
        </div>
    );

export default LaneAdder;