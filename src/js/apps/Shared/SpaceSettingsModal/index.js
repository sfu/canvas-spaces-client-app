'use strict';

import React from 'react';
import Modal from 'react-modal';
const {PropTypes} = React;

Modal.setAppElement(document.getElementById('CanvasSpacesApp'));

const SpaceSettingsModal = React.createClass({

  propTypes: {
    modalIsOpen: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    className: PropTypes.string,
    overlayClassName: PropTypes.string
  },

  render() {
    return (
      <Modal isOpen={this.props.modalIsOpen}
             onRequestClose={this.props.onRequestClose}
             className={this.props.className}
             overlayClassName={this.props.overlayClassName}>

        <div className="ReactModal__Layout">

          <div className="ReactModal__InnerSection ReactModal__Header">
            <div className="ReactModal__Header-Title">
              <h4>Modal Title Goes Here</h4>
            </div>
            <div className="ReactModal__Header-Actions">
              <button className="Button Button--icon-action" type="button" onClick={this.closeModal}>
                <i className="icon-x"></i>
                <span className="screenreader-only">Close</span>
              </button>
            </div>
          </div>

          <div className="ReactModal__InnerSection ReactModal__Body">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus deserunt doloremque, explicabo illo
            ipsum libero magni odio officia optio perferendis ratione repellat suscipit tempore. Commodi hic sed.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus deserunt doloremque, explicabo illo
            ipsum libero magni odio officia optio perferendis ratione repellat suscipit tempore. Commodi hic sed.
          </div>

          <div className="ReactModal__InnerSection ReactModal__Footer">
            <div className="ReactModal__Footer-Actions">
              <button type="button" className="btn btn-default" onClick={this.props.onRequestClose}>Cancel</button>
              <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
            </div>
          </div>

        </div>

      </Modal>

    );
  }

});

export default SpaceSettingsModal;
