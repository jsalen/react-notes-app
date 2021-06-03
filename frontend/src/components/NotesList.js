import React, { Component } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";

export default class NotesList extends Component {
  state = {
    notes: [],
  };

  async componentDidMount() {
    this.getNotes();
  }

  deleteNote = async (id) => {
    await axios.delete("http://localhost:4000/api/notes/" + id);
    this.getNotes();
  };

  getNotes = async () => {
    const res = await axios.get("http://localhost:4000/api/notes/");
    this.setState({
      notes: res.data,
    });
  };

  render() {
    return (
      <div className="row">
        {this.state.notes.map((note) => (
          <div className="col-md-4 p-2" key={note._id}>
            <div className="card">
              <div className="card-header text-center">
                <h4>{note.title}</h4>
              </div>
              <div className="card-body">
                <p>{note.content}</p>
              </div>
              <div className="card-footer">
                <div className="d-flex justify-content-between">
                  <p>
                    Author: <span>{note.author}</span>
                  </p>
                  <p>{format(note.date)}</p>
                </div>
                <div className="d-flex justify-content-between">
                  <Link
                    className="btn btn-sm btn-secondary"
                    to={"/edit/" + note._id}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => this.deleteNote(note._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
