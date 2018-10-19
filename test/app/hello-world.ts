import {createElement} from 'react';
import {string, func} from 'prop-types';

export const HelloWorld = ({name, onClick}) => createElement(
    'div',
    null,
    createElement(
        'p',
        null,
        `Hello ${name}`

    ),
    createElement(
        'button',
        {onClick: () => onClick('from react')},
        `Click me!`

    ),
);
HelloWorld.propTypes = {
    name: string,
    onClick: func,
};