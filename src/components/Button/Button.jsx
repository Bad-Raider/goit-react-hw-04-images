import css from './Button.module.css';
import PropTypes from 'prop-types';


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