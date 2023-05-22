// import { Component } from 'react';
import css from './Button.module.css';
import PropTypes from 'prop-types';


// class Button extends Component {

//     handleOnClick = () => {
//      this.props.onClick()
//     };

//     render() {
//         return (
//             <button
//                 onClick={this.handleOnClick}
//                 type="button"
//                 className={css.Button}>Loade more
                
//             </button>
//         );
//     }
// };


const Button = ({onClick}) => {
    
    const handleOnClick = () => {
     onClick()
    };

        return (
            <button
                onClick={handleOnClick}
                type="button"
                className={css.Button}>Loade more
                
            </button>
        );
};

export default Button;

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};