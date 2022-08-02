import React, { useState, useEffect } from 'react';
import { gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import './gantt.css';

const Gantt = ({ dataSource }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (dataSource) {
            gantt.config.date_format = "%Y-%m-%d %H:%i";
            gantt.init(this.ganttContainer);
            gantt.parse(dataSource);
            setData(dataSource);
        }
    }, [dataSource])

    return (
        <div
        ref={ (input) => { this.ganttContainer = input } }
        style={ { width: '100%', height: '100%' } }
        />
   ); 
}

export default Gantt;
