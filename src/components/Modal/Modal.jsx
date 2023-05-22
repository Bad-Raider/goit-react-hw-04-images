import { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import PropTypes from "prop-types";

const modalRoot = document.querySelector("#modal-root");

class Modal extends Component {

    componentDidMount() {
    window.addEventListener('keydown', this.handleKeydownEscape);
    };

    componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydownEscape);
    };

    handleKeydownEscape = e => {
        if (e.code === 'Escape') {
            this.props.onChangeStatusModal();
        };
    };

    handleOnClick = e => {
        if (e.currentTarget === e.target) {
            this.props.onChangeStatusModal();
        }
    };

    render() {
        return createPortal (
            <div onClick={this.handleOnClick}
                className={css.Overlay}>
                <div className={css.Modal}>
                    <img src={this.props.largeImg} alt={this.props.name} />
                </div>
            </div>, modalRoot);
    }
};

export default Modal;


Modal.propTypes = {
    onChangeStatusModal: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    largeImg: PropTypes.string.isRequired,
};