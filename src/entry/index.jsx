/**
 * Formatter which is used for translation.
 * This will be replaced which is used in the React component.
 * @param {*} messageData - data for format-message
 * @returns {string} - message for the current locale
 */
let formatMessage = messageData => messageData.defaultMessage;

import iconURL from './entry-icon.png';
import insetIconURL from './inset-icon.svg';

const translationMap = {
    'ja': {
        'gui.extension.webGamepad.description': 'ゲームパッドを使う'
    },
    'ja-Hira': {
        'gui.extension.webGamepad.description': 'ゲームパッドをつかう'
    }
};

const entry = {
    name: 'Gamepad',
    extensionId: 'webGamepad',
    extensionURL: 'https://yokobond.github.io/xcx-gamepad/dist/webGamepad.mjs',
    collaborator: 'Yengawa Lab',
    iconURL: iconURL,
    insetIconURL: insetIconURL,
    get description () {
        return formatMessage({
            defaultMessage: 'Use gamepad.',
            description: 'Description for gamepad xcratch extension',
            id: 'gui.extension.webGamepad.description'
        });
    },
    featured: true,
    disabled: false,
    bluetoothRequired: false,
    internetConnectionRequired: false,
    helpLink: 'https://github.com/yokobond/xcx-gamepad/',
    setFormatMessage: formatter => {
        formatMessage = formatter;
    },
    translationMap: translationMap
};

export {entry}; // loadable-extension needs this line.
export default entry;
