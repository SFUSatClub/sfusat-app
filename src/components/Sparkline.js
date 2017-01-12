import React, {
  Component,
} from 'react';

import {
  ART,
  Text,
  LayoutAnimation,
  View,
  TouchableOpacity,
} from 'react-native';
import Morph from 'art/morph/path';

import Utils from '../utils';
import darkTheme from '../themes/dark';

const {
  Group,
  Shape,
  Surface,
} = ART;
const AnimationDurationMs = 500;
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export default class Sparkline extends Component {
  static defaultProps = {
    width: 50,
    height: 50,
    pre: [98, 10, 2, 11, 3, 14, 5, 87, 4, 2, 4, 32, 8, 4, 2, 4, 9],
  };

  constructor(props) {
    super(props);

    this.state = {
      slideX: 0,
    };
  }

  componentWillMount() {
    this.computeNextState(this.props);
  }

  // componentWillReceiveProps(nextProps) {
  //   this.computeNextState(props);
  // }

  computeNextState(nextProps) {
    const {
      pre
    } = nextProps;
    const lineGraph = {path:1};//this.generateLinePath(pre);

    this.setState({
      linePath: lineGraph.path,
      pre,
    });
    if (!this.previousGraph) {
      this.previousGraph = lineGraph;
    }

    if (this.props !== nextProps) {
      const pathFrom = this.previousGraph.path;
      const pathTo = lineGraph.path;

      cancelAnimationFrame(this.animating);
      this.animating = null;

      // Opt-into layout animations so our y tickLabel's animate.
      // If we wanted more discrete control over their animation behavior
      // we could use the Animated component from React Native, however this
      // was a nice shortcut to get the same effect.
      // Kick off our animations!
      this.animate();
      this.previousGraph = lineGraph;
    }
  }

  animate(start) {
    this.animating = requestAnimationFrame((timestamp) => {
      if (!start) {
        // eslint-disable-next-line no-param-reassign
        start = timestamp;
      }

      // Get the delta on how far long in our animation we are.
      const delta = (timestamp - start) / AnimationDurationMs;

      // If we're above 1 then our animation should be complete.
      if (delta > 1) {
        console.log("in delta 1");
        cancelAnimationFrame(this.animating);
        this.animating = null;

        // Stop our animation loop.
        return;
      }
        console.log("after delta");

      // Tween the SVG path value according to what delta we're currently at.
      //this.state.linePath.tween(delta);
      //this.state.slideX = this.state.slideX - this.previousGraph.scale.x(1)*delta;
      this.state.slideX = this.state.slideX - 0.3;

      // Update our state with the new tween value and then jump back into
      // this loop.
      this.setState(this.state, () => {
        this.animate(start);
        console.log("set animate");
      });
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  generateLinePath(preData) {
    const data = preData.map((v, i) => {
      let ret = {
        time: i,
        val: v,
      };
      console.log(ret);
      return ret;
    });
    const xAccessor = (d) => d.time;
    const yAccessor = (d) => d.val;

    const lineGraph = Utils.createLineGraph({
      data,
      xAccessor,
      yAccessor,
      width: this.props.width,
      height: this.props.height,
    });
    return lineGraph;
  }

  render() {
    console.log(`spark rendered slideX: ${this.state.slideX}`);
    let ga = "M0,42.22222222222222L0.49019607843137253,43.05555555555555C0.9803921568627451,43.888888888888886,1.9607843137254901,45.55555555555555,2.941176470588235,38.7962962962963C3.9215686274509802,32.03703703703704,4.901960784313725,16.85185185185185,5.882352941176471,16.944444444444443C6.862745098039215,17.037037037037035,7.843137254901961,32.40740740740741,8.823529411764707,40.27777777777778C9.803921568627452,48.14814814814815,10.784313725490195,48.51851851851851,11.76470588235294,48.51851851851851C12.745098039215685,48.51851851851851,13.725490196078432,48.14814814814815,14.70588235294118,45.370370370370374C15.686274509803923,42.59259259259259,16.666666666666668,37.40740740740741,17.64705882352941,37.03703703703704C18.627450980392158,36.666666666666664,19.6078431372549,41.111111111111114,20.58823529411765,43.7037037037037C21.56862745098039,46.2962962962963,22.549019607843135,47.03703703703704,23.52941176470588,47.59259259259259C24.50980392156863,48.14814814814815,25.49019607843137,48.51851851851851,26.470588235294116,48.51851851851851C27.450980392156865,48.51851851851851,28.43137254901961,48.14814814814815,29.41176470588235,47.5C30.3921568627451,46.85185185185185,31.372549019607845,45.925925925925924,32.35294117647059,44.25925925925926C33.333333333333336,42.59259259259259,34.31372549019608,40.18518518518518,35.29411764705882,40.648148148148145C36.27450980392157,41.111111111111114,37.254901960784316,44.44444444444445,38.235294117647065,45.74074074074074C39.2156862745098,47.03703703703704,40.19607843137255,46.2962962962963,41.1764705882353,44.53703703703704C42.15686274509804,42.77777777777778,43.13725490196078,40,44.11764705882353,38.42592592592593C45.09803921568627,36.851851851851855,46.07843137254901,36.48148148148149,47.05882352941177,37.12962962962963C48.03921568627451,37.77777777777778,49.01960784313726,39.44444444444445,49.509803921568626,40.27777777777778L50,41.111111111111114";
    return (
      <View>
        <Surface width={this.props.width} height={this.props.height}>
          <Group x={this.state.slideX} y={0}>
            <Shape
              d={ga}
              stroke={darkTheme.customIndigo}
              strokeWidth={1}
            />
          </Group>

        </Surface>
        <TouchableOpacity onPress={() => {
          const pre = this.state.pre.concat(getRandomInt(0,30));
          this.computeNextState({pre});
        }}>
          <Text>Add</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
