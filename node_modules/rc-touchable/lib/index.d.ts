import React from 'react';
export interface ITouchable {
    fixClickPenetration?: boolean;
    disabled?: boolean;
    delayPressIn?: number;
    delayLongPress?: number;
    delayPressOut?: number;
    pressRetentionOffset?: {
        left: number;
        right: number;
        top: number;
        bottom: number;
    };
    hitSlop?: {
        left: number;
        right: number;
        top: number;
        bottom: number;
    };
    activeStyle?: any;
    activeStopPropagation?: boolean;
    activeClassName?: string;
    onPress?: (e?: any) => void;
    onLongPress?: (e?: any) => void;
    longPressCancelsPress?: boolean;
}
export default class Touchable extends React.Component<ITouchable, any> {
    static defaultProps: {
        fixClickPenetration: boolean;
        disabled: boolean;
        delayPressIn: number;
        delayLongPress: number;
        delayPressOut: number;
        pressRetentionOffset: {
            left: number;
            right: number;
            top: number;
            bottom: number;
        };
        hitSlop: undefined;
        longPressCancelsPress: boolean;
    };
    state: {
        active: boolean;
    };
    touchable: any;
    root: any;
    releaseLockTimer: any;
    touchableDelayTimeout: any;
    longPressDelayTimeout: any;
    pressOutDelayTimeout: any;
    lockMouse: any;
    shouldActive: Boolean;
    pressInLocation: {
        pageX: number;
        pageY: number;
    };
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    callChildEvent(event: any, e: any): void;
    onTouchStart: (e: any) => void;
    onTouchMove: (e: any) => void;
    onTouchEnd: (e: any) => void;
    onTouchCancel: (e: any) => void;
    onMouseDown: (e: any) => void;
    onMouseUp: (e: any) => void;
    _remeasureMetricsOnInit(e: any): void;
    processActiveStopPropagation(e: any): void;
    touchableHandleResponderGrant(e: any): void;
    checkScroll(e: any): boolean;
    touchableHandleResponderRelease(e: any): void;
    touchableHandleResponderTerminate(e: any): void;
    checkTouchWithinActive(e: any): boolean;
    touchableHandleResponderMove: (e: any) => void;
    callProp(name: any, e: any): void;
    touchableHandleActivePressIn(e: any): void;
    touchableHandleActivePressOut(e: any): void;
    touchableHandlePress(e: any): void;
    touchableHandleLongPress(e: any): void;
    setActive(active: any): void;
    _remeasureMetricsOnActivation(): void;
    _handleDelay(e: any): void;
    _handleLongDelay(e: any): void;
    _receiveSignal(signal: any, e: any): void;
    _cancelLongPressDelayTimeout(): void;
    _isHighlight(state: any): boolean;
    _savePressInLocation(e: any): void;
    _getDistanceBetweenPoints(aX: any, aY: any, bX: any, bY: any): number;
    _performSideEffectsForTransition(curState: any, nextState: any, signal: any, e: any): void;
    _startHighlight(e: any): void;
    _endHighlight(e: any): void;
    render(): React.ReactElement<any>;
}
