// functional component representing the Market Index page that'll
// function as the base page

import React from 'react';
import BaseTemplate from '../BaseTemplate';
// import SimpleExpansionPanel from '../subcomponents/WatchExpansionPanel';
import WatchIndex from '../WatchIndex';
// import LineChart from '../Charts/LineChart';
import WatchIndexRow from '../subcomponents/WatchIndexRow';

// const test = {
//     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//     prices: [65, 59, 80, 81, 56, 55, 40]
// };

const WatchListView = () => {
    return (
        <BaseTemplate >
            {/* <SimpleExpansionPanel /> */ }
            <WatchIndex />
            {/* <LineChart data={test} /> */ }
            <WatchIndexRow />
        </BaseTemplate >
    );
};

export default WatchListView;