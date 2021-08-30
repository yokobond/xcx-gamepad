const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
// const cast = require('../../util/cast');
// const log = require('../../util/log');

/**
 * Formatter which is used for translation.
 * This will be replaced which is used in the runtime.
 * @param {*} messageData - format-message object
 * @returns {string} - message for the locale
 */
let formatMessage = messageData => messageData.defaultMessage;

const EXTENSION_ID = 'webGamepad';

/**
 * URL to get this extension as a module.
 * When it was loaded as a module, 'extensionURL' will be replaced a URL which is retrieved from.
 * @type {string}
 */
let extensionURL = 'https://yokobond.github.io/xcx-gamepad/dist/webGamepad.mjs';

/**
 * Icon png to be displayed at the left edge of each extension block, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const blockIconURI = 'data:image/png;base64,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';

/**
 * Enum for index of button
 * @readonly
 * @enum {string}
 */
const WebGamepadButtonIndex = {
    A: '0',
    B: '1',
    X: '2',
    Y: '3',
    LB: '4',
    RB: '5',
    LT: '6',
    RT: '7',
    Select: '8',
    Start: '9',
    LeftStick: '10',
    RightStick: '11',
    DPadUp: '12',
    DPadDown: '13',
    DPadLeft: '14',
    DPadRight: '15',
    Home: '16'
};

/**
 * Enum for ID of analog sticks
 * @readonly
 * @enum {string}
 */
const WebGamepadStickParameter = {
    X: 'X',
    Y: 'Y',
    Direction: 'Direction',
    Lean: 'Lean'
};

/**
 * Enum for ID of analog sticks
 * @readonly
 * @enum {string}
 */
const WebGamepadStickID = {
    Left: 'Left',
    Right: 'Right'
};

/**
 * Enum for ID of button state
 * @readonly
 * @enum {string}
 */
const WebGamepadButtonStateID = {
    Down: 'Down',
    Up: 'Up'
};

/**
 * Scratch 3.0 blocks for example of Xcratch.
 */
class WebGamePadBlocks {

    /**
     * @return {string} - the name of this extension.
     */
    static get EXTENSION_NAME () {
        return 'Gamepad';
    }

    /**
     * @return {string} - the ID of this extension.
     */
    static get EXTENSION_ID () {
        return EXTENSION_ID;
    }

    /**
     * URL to get this extension.
     * @type {string}
     */
    static get extensionURL () {
        return extensionURL;
    }

    /**
     * Set URL to get this extension.
     * extensionURL will be reset when the module is loaded from the web.
     * @param {string} url - URL
     */
    static set extensionURL (url) {
        extensionURL = url;
    }

    /**
     * @return {array} - text and values for each controller names menu element
     */
    get CONTROLLER_INDEX_MENU () {
        return ['1', '2', '3', '4'];
    }

    /**
     * @return {array} - text and values for each stick names menu element
     */
    get STICK_NAME_MENU () {
        return [
            {
                text: formatMessage({
                    id: 'webGamepad.stickNameMenu.left',
                    default: 'Left',
                    description: 'label for name of left analog stick'
                }),
                value: WebGamepadStickID.Left
            },
            {
                text: formatMessage({
                    id: 'webGamepad.stickNameMenu.right',
                    default: 'Right',
                    description: 'label for name of right analog stick'
                }),
                value: WebGamepadStickID.Right
            }
        ];
    }

    /**
     * @return {array} - text and values for each parameter of analog stick menu element
     */
    get STICK_PARAMETER_MENU () {
        return [
            {
                text: formatMessage({
                    id: 'webGamepad.stickParameterMenu.direction',
                    default: 'Direction',
                    description: 'label for direction of analog stick'
                }),
                value: WebGamepadStickParameter.Direction
            },
            {
                text: formatMessage({
                    id: 'webGamepad.stickParameterMenu.lean',
                    default: 'Lean',
                    description: 'label for lean of analog stick'
                }),
                value: WebGamepadStickParameter.Lean
            },
            {
                text: 'X',
                value: WebGamepadStickParameter.X
            },
            {
                text: 'Y',
                value: WebGamepadStickParameter.Y
            }
        ];
    }

    /**
     * @return {array} - text and values for each button names menu element
     */
    get BUTTON_NAME_MENU () {
        return [
            {
                text: 'A / ✕',
                value: WebGamepadButtonIndex.A
            },
            {
                text: 'B / ○',
                value: WebGamepadButtonIndex.B
            },
            {
                text: 'X / □',
                value: WebGamepadButtonIndex.X
            },
            {
                text: 'Y / △',
                value: WebGamepadButtonIndex.Y
            },
            {
                text: 'LB / L1',
                value: WebGamepadButtonIndex.LB
            },
            {
                text: 'RB / R1',
                value: WebGamepadButtonIndex.RB
            },
            {
                text: 'LT / L2',
                value: WebGamepadButtonIndex.LT
            },
            {
                text: 'RT / R2',
                value: WebGamepadButtonIndex.RT
            },
            {
                text: 'Select / Share',
                value: WebGamepadButtonIndex.Select
            },
            {
                text: 'Start / Option',
                value: WebGamepadButtonIndex.Start
            },
            {
                text: formatMessage({
                    id: 'webGamepad.buttonNameMenu.leftStick',
                    default: 'Left Stick',
                    description: 'label for name of left analog stick button'
                }),
                value: WebGamepadButtonIndex.LeftStick
            },
            {
                text: formatMessage({
                    id: 'webGamepad.buttonNameMenu.rightStick',
                    default: 'Right Stick',
                    description: 'label for name of right analog stick button'
                }),
                value: WebGamepadButtonIndex.RightStick
            },
            {
                text: formatMessage({
                    id: 'webGamepad.buttonNameMenu.dPadUp',
                    default: 'Pad Up',
                    description: 'label for name of up of direction pad'
                }),
                value: WebGamepadButtonIndex.DPadUp
            },
            {
                text: formatMessage({
                    id: 'webGamepad.buttonNameMenu.dPadDown',
                    default: 'Pad Down',
                    description: 'label for name of down of direction pad'
                }),
                value: WebGamepadButtonIndex.DPadDown
            },
            {
                text: formatMessage({
                    id: 'webGamepad.buttonNameMenu.dPadLeft',
                    default: 'Pad Left',
                    description: 'label for name of left of direction pad'
                }),
                value: WebGamepadButtonIndex.DPadLeft
            },
            {
                text: formatMessage({
                    id: 'webGamepad.buttonNameMenu.dPadRight',
                    default: 'Pad Right',
                    description: 'label for name of right of direction pad'
                }),
                value: WebGamepadButtonIndex.DPadRight
            },
            {
                text: 'Home',
                value: WebGamepadButtonIndex.Home
            }
        ];
    }
    

    /**
     * @return {array} - Menu items for button state selector.
     */
    get BUTTON_STATE_MENU () {
        return [
            {
                text: formatMessage({
                    id: 'webGamepad.buttonStateMenu.down',
                    default: 'down',
                    description: 'label for button down state'
                }),
                value: WebGamepadButtonStateID.Down
            },
            {
                text: formatMessage({
                    id: 'webGamepad.buttonStateMenu.up',
                    default: 'up',
                    description: 'label for button up state'
                }),
                value: WebGamepadButtonStateID.Up
            }
        ];
    }

    /**
     * Construct a set of blocks for Gamepad.
     * @param {Runtime} runtime - the Scratch 3.0 runtime.
     */
    constructor (runtime) {
        /**
         * The Scratch 3.0 runtime.
         * @type {Runtime}
         */
        this.runtime = runtime;

        if (runtime.formatMessage) {
            // Replace 'formatMessage' to a formatter which is used in the runtime.
            formatMessage = runtime.formatMessage;
        }

        this.controllers = {};

        if ('GamepadEvent' in window) {
            window.addEventListener('gamepadconnected', e => {
                this.connectHandler(e);
            });
            window.addEventListener('gamepaddisconnected', e => {
                this.disconnectHandler(e);
            });
        } else if ('WebKitGamepadEvent' in window) {
            window.addEventListener('webkitgamepadconnected', e => {
                this.connectHandler(e);
            });
            window.addEventListener('webkitgamepaddisconnected', e => {
                this.disconnectHandler(e);
            });
        }
        setInterval(() => {
            this.scanGamepads();
        }, this.runtime.constructor.THREAD_STEP_INTERVAL);

    }

    scanGamepads () {
        const gamepads = navigator.getGamepads ?
            navigator.getGamepads() :
            (navigator.webkitGetGamepads ?
                navigator.webkitGetGamepads() :
                []);
        Object.values(gamepads).forEach(gp => {
            if (!gp) return;
            this.controllers[gp.index] = gp;
        });
    }

    addGamepad (gamepad) {
        this.controllers[gamepad.index] = gamepad;
    }

    removeGamepad (gamepad) {
        delete this.controllers[gamepad.index];
    }

    connectHandler (e) {
        this.addGamepad(e.gamepad);
    }

    disconnectHandler (e) {
        this.removeGamepad(e.gamepad);
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo () {
        this.setupTranslations();
        return {
            id: WebGamePadBlocks.EXTENSION_ID,
            name: WebGamePadBlocks.EXTENSION_NAME,
            extensionURL: WebGamePadBlocks.extensionURL,
            blockIconURI: blockIconURI,
            showStatusButton: false,
            blocks: [
                {
                    opcode: 'whenButtonState',
                    text: formatMessage({
                        id: 'webGamepad.whenButtonState',
                        default: 'when P[CONTROLLER] [BUTTON] is [STATE]',
                        description: 'when the button goes to the state'
                    }),
                    blockType: BlockType.HAT,
                    arguments: {
                        CONTROLLER: {
                            type: ArgumentType.STRING,
                            menu: 'controllerIndexMenu',
                            defaultValue: '1'
                        },
                        BUTTON: {
                            type: ArgumentType.STRING,
                            menu: 'buttonNameMenu',
                            defaultValue: WebGamepadButtonIndex.A
                        },
                        STATE: {
                            type: ArgumentType.STRING,
                            menu: 'buttonStateMenu',
                            defaultValue: WebGamepadButtonStateID.Down
                        }
                    }
                },
                {
                    opcode: 'isButtonPressed',
                    text: formatMessage({
                        id: 'webGamepad.isButtonPressed',
                        default: 'P[CONTROLLER] [BUTTON] is pressed',
                        description: 'whether the button state is the selected one'
                    }),
                    blockType: BlockType.BOOLEAN,
                    arguments: {
                        CONTROLLER: {
                            type: ArgumentType.STRING,
                            menu: 'controllerIndexMenu',
                            defaultValue: '1'
                        },
                        BUTTON: {
                            type: ArgumentType.STRING,
                            menu: 'buttonNameMenu',
                            defaultValue: WebGamepadButtonIndex.A
                        }
                    }
                },
                {
                    opcode: 'getButtonPressure',
                    text: formatMessage({
                        id: 'webGamepad.getButtonPressure',
                        default: 'P[CONTROLLER] [BUTTON]',
                        description: 'pressure of the button'
                    }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        CONTROLLER: {
                            type: ArgumentType.STRING,
                            menu: 'controllerIndexMenu',
                            defaultValue: '1'
                        },
                        BUTTON: {
                            type: ArgumentType.STRING,
                            menu: 'buttonNameMenu',
                            defaultValue: WebGamepadButtonIndex.A
                        }
                    }
                },
                {
                    opcode: 'getAnalogStickValue',
                    text: formatMessage({
                        id: 'webGamepad.getAnalogStickValue',
                        default: '[CONTROLLER] [STICK] stick [PARAMETER]',
                        description: 'value of the analog stick'
                    }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        CONTROLLER: {
                            type: ArgumentType.STRING,
                            menu: 'controllerIndexMenu',
                            defaultValue: '1'
                        },
                        STICK: {
                            type: ArgumentType.STRING,
                            menu: 'stickNameMenu',
                            defaultValue: WebGamepadStickID.Left
                        },
                        PARAMETER: {
                            type: ArgumentType.STRING,
                            menu: 'stickParameterMenu',
                            defaultValue: WebGamepadStickParameter.Direction
                        }

                    }
                }
            ],
            menus: {
                controllerIndexMenu: {
                    acceptReporters: true,
                    items: this.CONTROLLER_INDEX_MENU
                },
                stickNameMenu: {
                    acceptReporters: false,
                    items: this.STICK_NAME_MENU
                },
                stickParameterMenu: {
                    acceptReporters: false,
                    items: this.STICK_PARAMETER_MENU
                },
                buttonNameMenu: {
                    acceptReporters: false,
                    items: this.BUTTON_NAME_MENU
                },
                buttonStateMenu: {
                    acceptReporters: false,
                    items: this.BUTTON_STATE_MENU
                }
            },
            // eslint-disable-next-line no-use-before-define
            translationMap: extensionTranslations
        };
    }


    /**
     * Return whether the button is the selected state.
     * @param {object} args - the block's arguments.
     * @param {string} args.CONTROLLER - index of the controller.
     * @param {string} args.BUTTON - index of the button.
     * @param {string} args.STATE - state to check.
     * @return {boolean} - true if the current state is the state.
     */
    whenButtonState (args) {
        let controllerIndex = parseInt(args.CONTROLLER, 10);
        if (Number.isNaN(controllerIndex)) return false;
        controllerIndex = controllerIndex - 1;
        const buttonIndex = parseInt(args.BUTTON, 10);
        return (args.STATE === WebGamepadButtonStateID.Down) ===
        this.controllers[controllerIndex]
            ?.buttons[buttonIndex]
            ?.pressed;
    }

    /**
     * Return whether the button is the state.
     * @param {object} args - the block's arguments.
     * @param {string} args.CONTROLLER - index of the controller.
     * @param {string} args.BUTTON - index of the button.
     * @return {boolean} - true if the current state is the state.
     */
    isButtonPressed (args) {
        let controllerIndex = parseInt(args.CONTROLLER, 10);
        if (Number.isNaN(controllerIndex)) return false;
        controllerIndex = controllerIndex - 1;
        const buttonIndex = parseInt(args.BUTTON, 10);
        return this.controllers[controllerIndex]?.buttons[buttonIndex]?.pressed === true;
    }

    /**
     * Return pressure of the button.
     * @param {object} args - the block's arguments.
     * @param {string} args.CONTROLLER - index of the controller.
     * @param {string} args.BUTTON - index of the button.
     * @return {boolean} - true if the current state is the state.
     */
    getButtonPressure (args) {
        let controllerIndex = parseInt(args.CONTROLLER, 10);
        if (Number.isNaN(controllerIndex)) return 0;
        controllerIndex = controllerIndex - 1;
        const buttonIndex = parseInt(args.BUTTON, 10);
        return this.controllers[controllerIndex]?.buttons[buttonIndex]?.value;
    }

    /**
     * Get parameter of the analog stick.
     * @param {object} args - the block's arguments
     * @param {string} args.CONTROLLER - index of the controller
     * @param {string} args.STICK - ID of the stick
     * @param {string} args.PARAMETER - ID of parameter
     * @return {number} - value of the parameter
     */
    getAnalogStickValue (args) {
        let controllerIndex = parseInt(args.CONTROLLER, 10);
        if (Number.isNaN(controllerIndex)) return 0;
        controllerIndex = controllerIndex - 1;
        const stickID = args.STICK;
        const param = args.PARAMETER;
        if (!this.controllers[controllerIndex]) return 0;
        if ((param === WebGamepadStickParameter.X) || (param === WebGamepadStickParameter.Y)) {
            const axisValue = this.readAnalogStickAxis(controllerIndex, stickID, param);
            return (axisValue * 100); // negative/positive percentage
        }
        if ((param === WebGamepadStickParameter.Direction)) {
            return this.readAnalogStickDirection(controllerIndex, stickID);
        }
        if ((param === WebGamepadStickParameter.Lean)) {
            const leanValue = this.readAnalogStickLean(controllerIndex, stickID);
            return (leanValue * 100); // unit of lean is percentage
        }
    }

    /**
     * Get value of the axis of the analog stick.
     * The range of magnitude is [0.0, 1.0].
     * @param {number} controllerIndex - index of the controller
     * @param {string} stickID - ID of the stick
     * @param {string} axis - ID of the axis
     * @return {number} - value of the axis
     */
    readAnalogStickAxis (controllerIndex, stickID, axis) {
        let axisIndex;
        if (stickID === WebGamepadStickID.Left) {
            axisIndex = 0;
        }
        if (stickID === WebGamepadStickID.Right) {
            axisIndex = 2;
        }
        if (axis === WebGamepadStickParameter.Y) {
            axisIndex++;
        }
        const value = this.controllers[controllerIndex].axes[axisIndex];
        return value ? (value * 100) : 0;
    }

    /**
     * Get direction of the analog stick.
     * The value is converted for Scratch coordinate system
     * which means the angle of clockwise from vertical top
     * and the range is (-180, 180].
     * @param {number} controllerIndex - index of the controller
     * @param {string} stickID - ID of the stick
     * @return {number} - value of the direction [degrees]
     */
    readAnalogStickDirection (controllerIndex, stickID) {
        const gp = this.controllers[controllerIndex];
        const x = gp.axes[(stickID === WebGamepadStickID.Left) ? 0 : 2];
        const y = gp.axes[(stickID === WebGamepadStickID.Left) ? 1 : 3];
        if ((typeof (x) !== 'number') || (typeof (y) !== 'number')) return 0;
        if ((x === 0) && (y === 0)) return 0;
        const rad = Math.atan2(-x, -y);
        return (-rad * 180 / Math.PI);
    }

    /**
     * Get lean of the analog stick.
     * The range of lean is [0.0, 1.0].
     * @param {number} controllerIndex - index of the controller
     * @param {string} stickID - ID of the stick
     * @return {number} - value of the lean
     */
    readAnalogStickLean (controllerIndex, stickID) {
        const gp = this.controllers[controllerIndex];
        const x = gp.axes[(stickID === WebGamepadStickID.Left) ? 0 : 2];
        const y = gp.axes[(stickID === WebGamepadStickID.Left) ? 1 : 3];
        if ((typeof (x) !== 'number') || (typeof (y) !== 'number')) return 0;
        return (Math.sqrt((x * x) + (y * y)));
    }


    /**
     * Setup format-message for this extension.
     */
    setupTranslations () {
        const localeSetup = formatMessage.setup();
        if (localeSetup && localeSetup.translations[localeSetup.locale]) {
            Object.assign(
                localeSetup.translations[localeSetup.locale],
                // eslint-disable-next-line no-use-before-define
                extensionTranslations[localeSetup.locale]
            );
        }
    }
}

const extensionTranslations = {
    'ja': {
        'webGamepad.whenButtonState': 'P[CONTROLLER] の [BUTTON] が [STATE] とき',
        'webGamepad.isButtonPressed': 'P[CONTROLLER] の [BUTTON] が押されている',
        'webGamepad.getButtonPressure': 'P[CONTROLLER] の [BUTTON] の押し込み',
        'webGamepad.buttonStateMenu.down': '押された',
        'webGamepad.buttonStateMenu.up': '離された',
        'webGamepad.buttonNameMenu.leftStick': '左スティック',
        'webGamepad.buttonNameMenu.rightStick': '右スティック',
        'webGamepad.buttonNameMenu.dPadUp': '上方向パッド',
        'webGamepad.buttonNameMenu.dPadDown': '下方向パッド',
        'webGamepad.buttonNameMenu.dPadLeft': '左方向パッド',
        'webGamepad.buttonNameMenu.dPadRight': '右方向パッド',
        'webGamepad.getAnalogStickValue': 'P[CONTROLLER] の [STICK] スティックの [PARAMETER]',
        'webGamepad.stickNameMenu.left': '左',
        'webGamepad.stickNameMenu.right': '右',
        'webGamepad.stickParameterMenu.direction': '方向',
        'webGamepad.stickParameterMenu.lean': '傾き'
    },
    'ja-Hira': {
        'webGamepad.whenButtonState': 'P[CONTROLLER] の [BUTTON] が [STATE] とき',
        'webGamepad.isButtonPressed': 'P[CONTROLLER] の [BUTTON] がおされている',
        'webGamepad.getButtonPressure': 'P[CONTROLLER] の [BUTTON] の押し込み',
        'webGamepad.buttonStateMenu.down': 'おされた',
        'webGamepad.buttonStateMenu.up': 'はなされた',
        'webGamepad.buttonNameMenu.leftStick': 'ひだりスティック',
        'webGamepad.buttonNameMenu.rightStick': 'みぎスティック',
        'webGamepad.buttonNameMenu.dPadUp': 'うえほうこうパッド',
        'webGamepad.buttonNameMenu.dPadDown': 'したほうこうパッド',
        'webGamepad.buttonNameMenu.dPadLeft': 'ひだりほうこうパッド',
        'webGamepad.buttonNameMenu.dPadRight': 'みぎほうこうパッド',
        'webGamepad.getAnalogStickValue': 'P[CONTROLLER] の [STICK] スティックの [PARAMETER]',
        'webGamepad.stickNameMenu.left': 'ひだり',
        'webGamepad.stickNameMenu.right': 'みぎ',
        'webGamepad.stickParameterMenu.direction': 'ほうこう',
        'webGamepad.stickParameterMenu.lean': 'かたむき'
    }
};

module.exports = WebGamePadBlocks;
