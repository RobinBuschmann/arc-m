import * as React from 'react';
import {string, func} from 'prop-types';

export const Info = ({value, onClick}) => React.createElement(
    'div',
    null,
    React.createElement(
        'p',
        null,
        `${value}`

    ),
    React.createElement(
        'button',
        {onClick: () => onClick('from react')},
        `Click me!`

    ),
);
Info.propTypes = {
    value: string,
    onClick: func,
};