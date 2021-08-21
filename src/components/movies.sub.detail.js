import React, { Component } from "react";
export default class MovieDetail extends Component {
    render() {
        const {selectedMovie} = this.props;

        return (
            <div className="col-md-12">
                <h4>{selectedMovie.title}</h4>
                <hr className="wd100p"/>
                <div className="wd100p">
                    <label>
                        <strong>Genre: </strong>
                    </label>
                    &nbsp;{selectedMovie.genre}
                </div>
                <div className="wd100p">
                    <label>
                        <strong>Studio:</strong>
                    </label>
                    &nbsp;{selectedMovie.lead_studio}
                </div>
                <div className="wd100p">
                    <label>
                        <strong>User Rating:</strong>
                    </label>
                    &nbsp;{selectedMovie.audience_score}%
                </div>
                <div className="wd100p">
                    <label>
                        <strong>Profitability:</strong>
                    </label>
                    &nbsp;{Math.round(selectedMovie.profitability * 100) / 100}%
                </div>
                <div className="wd100p">
                    <label>
                        <strong>Rotten Tomatoes Rating:</strong>
                    </label>
                    &nbsp;{selectedMovie.rotten_tomatoes}%
                </div>
                <div className="wd100p">
                    <label>
                        <strong>Worldwide Gross:</strong>
                    </label>
                    &nbsp;{selectedMovie.worldwide_gross}
                </div>
                <div className="wd100p">
                    <label>
                        <strong>Year Release:</strong>
                    </label>
                    &nbsp;{selectedMovie.year}
                </div>
            </div>
        )
    }
}