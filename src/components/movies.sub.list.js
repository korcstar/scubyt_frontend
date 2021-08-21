import React, { Component } from "react";
export default class MovieSubList extends Component {
    setActiveMovie = (movie, index) => {
        if(this.props.setActiveMovie) {
            this.props.setActiveMovie(movie, index)
        }
    }
    render() {
        const {movies, currentIndex} = this.props;

        return (
            <ul className="list-group">
                {movies && movies.map((movie, index) => (
                <li
                    className={"list-group-item " + (index === currentIndex ? "active" : "")}
                    onClick={() => this.setActiveMovie(movie, index)}
                    key={index}
                >
                    {movie.title}
                </li>
                ))}
            </ul>
        )
    }
}