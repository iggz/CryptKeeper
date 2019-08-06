import React, { Component } from 'react';
import fetch from 'node-fetch';

import RowBadge from './RowBadge';
import RowItem from './RowItem';


import '../../styles/Row.css';

class WatchIndexRow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: [],
            rendered: false
        };
    }

    componentDidMount() {
        const proxy = "https://cors-anywhere.herokuapp.com/",
            base_url = "https://api.coincap.io/v2/",
            resource = "assets/",
            id = "bitcoin",
            history = "/history?interval=d1";
        const request_url = proxy + base_url + resource + id + history;
        console.log("url", request_url)
        fetch(request_url)
            .then(resp => resp.json())
            .then(data => data.priceUsd)
            .then(data_object => {
                this.setState({
                    ...data_object,
                    rendered: !this.state.rendered
                });
            });
    };

    // extract the data object
    // .then(data.data.forEach(price => {
    //     // get the current price
    //     const priceUSD = price.priceUsd;
    //     console.log(priceUSD);
    // }),
    // )


    render() {
        if (this.state.rendered) {
            // extract row data items to render
            const data = {};

            for (const property in this.state) {
                if (property === "price" || property === "percent_change") {
                    data[property] = this.state[property];
                }
            }

            // console.log("data:", data);

            return (
                <div className="row-div"  >
                    <RowBadge
                        name={ this.state.name }
                        ticker={ this.state.ticker }
                    />
                    <RowItem data={ data } />
                </div>

            )
        } else {
            return (
                <div>
                    <h1>Name: { this.state.name }</h1>
                    <h1>Ticker: { this.state.ticker }</h1>
                </div>
            )
        }
    }
}

/*******************/
/* HELPER FUNCTION */
/*******************/
// const processDataArray = (object) => {
//     // given a data object as received per the above API call response,
//     // construct the object as required by the state. namely, extract
//     // floats, integers, etc from strings and reassign to property names.
//     // this will all be returned in a new object.

//     // TODO: refactor if/then sequence below into switch statement

//     const return_object = {};
//     for (const property in object) {
//         if (property === "rank") {
//             return_object.rank = parseInt(object.rank);
//         } else if (property === "supply") {
//             return_object.supply = parseInt(object.supply);
//         } else if (property === "marketCapUsd") {
//             const mkt_cap = parseFloat(object.marketCapUsd);
//             return_object.market_cap = Math.round(mkt_cap * 100) / 100;
//         } else if (property === "volumeUsd24Hr") {
//             const vol = parseFloat(object.volumeUsd24Hr);
//             return_object.volume = Math.round(vol * 100) / 100;
//         } else if (property === "vwap24Hr") {
//             const vwap = parseFloat(object.vwap24Hr);
//             return_object.vwap = Math.round(vwap * 100) / 100;
//         } else if (property === "priceUsd") {
//             const price = parseFloat(object.priceUsd);
//             return_object.price = (Math.round(price * 100) / 100);
//         } else if (property === "changePercent24Hr") {
//             const percent_change = parseFloat(object.changePercent24Hr);
//             return_object.percent_change = (Math.round(percent_change * 100) / 100) + '%';
//         }
//     }
//     return return_object;
// }

export default WatchIndexRow;