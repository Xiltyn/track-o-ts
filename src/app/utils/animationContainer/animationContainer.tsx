import * as React from 'react';
import posed from 'react-pose';

export namespace animationContainer {
    export interface Props {
        identifier:string,
        isMounted: boolean,
        delayTime: number,
        poses: {
            preEnter: Object,
            enter: Object,
            exit: Object,
        },
    }

    export interface State {
        shouldRender: boolean,
        shouldAnimate: boolean,
    }
}

const animationContainer = (ComponentToAnimate:any) =>
    class extends React.Component<animationContainer.Props & any, animationContainer.State> {
    static defaultProps:Pick<animationContainer.Props, 'delayTime'|'poses'> = {
        delayTime: 1000,
        poses: {
            preEnter: {
                y: 120,
                opacity: 0,
                transition: {
                    default: {
                        duration: 1000
                    }
                },
            },
            enter: {
                y: 0,
                opacity: 1,
                transition: {
                    default: {
                        duration: 1000
                    }
                },
            },
            exit: {
                y: -120,
                opacity: 0,
                transition: {
                    default: {
                        duration: 1000
                    }
                },
            },
        },
    };

    AnimationWrapper:any;

    state = {
        shouldRender: this.props.isMounted,
        shouldAnimate: false,
    };

    componentDidMount() {
        if (this.props.isMounted) {
            const _TIMEOUT = 300;

            setTimeout(() => {
                this.setState({
                    shouldAnimate: true,
                });
            }, _TIMEOUT);
        }
    }

    componentDidUpdate(oldProps:animationContainer.Props & any) {
        const { isMounted, delayTime } = this.props;
        if(oldProps.isMounted && !isMounted) {
            this.setState({
                shouldAnimate: false,
            });

            setTimeout(() => {
                this.setState({
                    shouldRender: false,
                });
            }, delayTime);

        } else if(!oldProps.isMounted && isMounted) {
            const _TIMEOUT = 300;

            this.setState({
                shouldRender: true,
            });

            setTimeout(() => {
                this.setState({
                    shouldAnimate: true,
                });
            }, _TIMEOUT);
        }
    }

    constructor(props:animationContainer.Props) {
        super(props);

        this.AnimationWrapper = posed.div(this.remapPoses(this.props.poses));
    }

    remapPoses = (poses:any) => {
        const {
            identifier,
        } = this.props;

        let result:Array<Object> = [];

        if(poses) {
            result = Object.keys(poses).map(pose => {
                if(pose !== 'initialPose' ) {
                    return { [ `${identifier}${pose}` ]: poses[ pose ] };
                } else {
                    return { [ pose ]: `${identifier}${poses[ pose ]}` };
                }
            });

            return result.reduce((a, b) => Object.assign({}, a, b));
        } else {
            return false;
        }
    };

    render() {
        const { AnimationWrapper, props: { isMounted } } = this;
        const { shouldAnimate } = this.state;
        const { identifier } = this.props;

        return this.state.shouldRender ?
            <AnimationWrapper
                className={ `animation-container animation-container--${identifier}` }
                pose={ shouldAnimate ? `${identifier}enter` : isMounted ? `${identifier}preEnter` : `${identifier}exit` }>
                <ComponentToAnimate { ...this.props } />
            </AnimationWrapper> : null;
    }
};

export default animationContainer;
