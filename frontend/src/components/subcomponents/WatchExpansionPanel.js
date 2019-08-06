import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LineChart from '../Charts/LineChart';


// const test = {
//     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//     prices: [65, 59, 80, 81, 56, 55, 40]
// };

const useStyles = makeStyles(theme => {
    // console.log(theme)
    return (
        {
            root: {
                width: '100%',
            },
            heading: {
                fontSize: theme.typography.pxToRem(15),
                fontWeight: theme.typography.fontWeightRegular,
            },
        })
});

export default class WatchExpansionPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            coinData: []
        }
    }

    render() {
        return (
            <div onClick={ () => { this._fetchHistoricalData(this.props.id) } }>
                {/* <div className={ classes.root } > */ }
                <div style={ { width: '100%' } } >
                    <ExpansionPanel >
                        <ExpansionPanelSummary
                            expandIcon={ <ExpandMoreIcon /> }
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography style={ { fontSize: '1rem', fontWeight: '600' } }>{ this.props.id }</Typography>
                            {/* <Typography className={ classes.heading }>{ this.props.id }</Typography> */ }
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <LineChart data={ this.state.coinData } coinName={ this.props.id } />
                        </ExpansionPanelDetails>
                    </ExpansionPanel>

                </div>
            </div>
        );
    }
    _fetchHistoricalData = async (id) => {
        const proxy = "https://cors-anywhere.herokuapp.com/",
            base_url = "https://api.coincap.io/v2/",
            resource = "assets/",
            history = "/history?interval=d1";
        const request_url = proxy + base_url + resource + id + history;

        const response = await fetch(request_url)
        const responseJSON = await response.json()
        const { data } = responseJSON;
        // console.log("data:", data)
        this.setState({
            coinData: data
        })
        // return data
    }
}

// export default function WatchExpansionPanel(props) {
//     const classes = useStyles();

//     return (
//         <div onClick={ (e) => { console.log(props.id) } }>
//             <div className={ classes.root } >
//                 <ExpansionPanel >
//                     <ExpansionPanelSummary
//                         expandIcon={ <ExpandMoreIcon /> }
//                         aria-controls="panel1a-content"
//                         id="panel1a-header"
//                     >
//                         <Typography className={ classes.heading }>{ props.id }</Typography>
//                     </ExpansionPanelSummary>
//                     <ExpansionPanelDetails>
//                         <LineChart data={ props.dataArray } />
//                     </ExpansionPanelDetails>
//                 </ExpansionPanel>

//             </div>
//         </div>
//     );
// }