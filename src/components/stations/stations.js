import React, { useState } from "react";
import { MenuItem, Select } from "@mui/material";

function Stations(props) {
    const [showStations, setShowStations] = useState(true);

    const STATIONS = [
        'Bello',
        'Caribe',
        'Envigado',
        'Hospital',
        'Itagui',
        'Poblado',
        'San Antonio',
    ];

    const index = STATIONS.indexOf(props.popStation);
    
    if (index > -1) {
        STATIONS.splice(index, 1);
    }

    return(
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label={props.label}
            value={props.start}
            onChange={props.handleChange}
            name={props.label}
            required
            >
            {STATIONS.map((STATION, index) => {
                if(index === 0 || showStations) {
                    return <MenuItem key={index} value={STATION}>{STATION}</MenuItem>
                }
                return '';
            })}
            
        </Select>
            
    )
};

export default Stations; 