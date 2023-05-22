import { Component } from 'react';
import PropTypes from "prop-types";
import Modal from 'components/Modal/Modal';
import css from './ImageGalleryItem.module.css';


class ImageGalleryItem extends Component {

    state ={ 
        isOpen: false,
    };
    
    toggleModal = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  };

    handleOnClick = () => {
        this.toggleModal();  
    };

    render() {
        return (
            <>
                <li onClick={this.handleOnClick}
                    className={css.ImageGalleryItem}>
                    <img className={css.ImageGalleryItemImg} src={this.props.littleImg} alt={this.props.name} />
                </li>

                {this.state.isOpen && <Modal
                    largeImg={this.props.largeImg}
                    name={this.props.name}
                    onChangeStatusModal={this.toggleModal}
                />}
            </>
        );
    }
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  littleImg: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    largeImg: PropTypes.string.isRequired,
};