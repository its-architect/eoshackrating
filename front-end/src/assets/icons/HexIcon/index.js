import React  from 'react';
import styles from './styles.scss';

const HexIcon = () => (
    <svg
        viewBox='0 0 43 50'
        xmlns='http://www.w3.org/2000/svg'
        className={ styles.hexIcon }
    >
        <path
            d='M43 12.4L21.5 0 0 12.4v24.9l21.5 12.4L43 37.3V12.4z'
        />
    </svg>
);

export default HexIcon;
