import React, { Component } from "react";
import CommentService from "../services/comment.service";

export default class CommentForm extends Component {
    constructor(props) {
        super(props);
    
        this.onChangeCommentName = this.onChangeCommentName.bind(this);
        this.onChangeCommentText = this.onChangeCommentText.bind(this);
        this.submitComment = this.submitComment.bind(this);
    
        this.state = {
            message: "",
            commentName: "",
            commentText:""
        };    
    }
    clearForm() {
        this.setState({
            commentName: "",
            commentText: ""
        })
    }
    onChangeCommentName(e) {
        this.setState({
            commentName: e.target.value,
        });
    }
    onChangeCommentText(e) {
        this.setState({
            commentText: e.target.value,
        });
    }
    submitComment(){
        const movieID = this.props.selectedMovieID;
        const params = {
            name: this.state.commentName,
            comment: this.state.commentText
        };
        CommentService.create(movieID, params)
            .then((response) => {
                const { result, message, comment } = response.data;

                if (result){
                    params.cid = comment.cid;
                    params.movie_id = comment.movie_id;

                    if(this.props.addNewComment) {
                        this.props.addNewComment(params);
                    }

                    this.setState({
                        message: ""
                    });
                }
                else {
                    this.setState({
                        message: message
                    });
                }
            })
            .catch((e) => {
                this.setState({
                    message: "some error occurred while adding the comment.",
                });
            });
    }

    render() {
        return (
            <div className="col-md-12">
                <input type="text" className="form-control" placeholder="Your Name" value={this.state.commentName} onChange={this.onChangeCommentName} required/>
                <textarea className="form-control mt-2" placeholder="Your comment" value={this.state.commentText} onChange={this.onChangeCommentText} required/>
                <span className="badge badge-danger">{this.state.message}</span>
                <button type="button" className="btn btn-primary float-right mt-3" onClick={this.submitComment}>
                    Submit
                </button>
            </div>
        )
    }
}