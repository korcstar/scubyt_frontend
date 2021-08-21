import React, { Component } from "react";
export default class MovieSubComments extends Component {
    render() {
        const {comments} = this.props;

        return (
            <div className="col-md-12">
                <h5>Comments</h5>
                <div className="wd100p ml-2">
                  {comments && comments.map((commentObj, index) => (
                    <div className="wd100p" key={index}>
                      <label>
                        <strong>{commentObj.name}: </strong>
                      </label>
                      &nbsp;{commentObj.comment}
                    </div>
                  ))}
                </div>
            </div>
        )
    }
}