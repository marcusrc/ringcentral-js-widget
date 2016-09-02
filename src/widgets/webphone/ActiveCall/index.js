import React from 'react';
import classNames from 'classnames';

import { Ratio } from '../../shared/Ratio/';

import Flip from '../Flip';
import Transfer from '../Transfer';
import CallConsole from '../CallConsole';
import Dialer from '../Dialer';
import CallInfo from '../CallInfo';
import CallFooter from '../CallFooter';
import Closeable from '../Closable';

import prefix from '../../../utils/style';

const { main, container } =
  prefix(['main', 'container'], 'ActiveCall');

let durationInterval;

export default class ActiveCall extends React.PureComponent {

  static propTypes = {
    flip: React.PropTypes.object,
    transfer: React.PropTypes.object,
    callInfo: React.PropTypes.object,

    bye: React.PropTypes.func,
    park: React.PropTypes.func,
    record: React.PropTypes.func,
    hold: React.PropTypes.func,
    mute: React.PropTypes.func,
    dtmf: React.PropTypes.func,
    disabledOperation: React.PropTypes.array,
    operationStatus: React.PropTypes.array,
    webphoneStatus: React.PropTypes.oneOf(['CALL_CONNECTED', 'CALL_CONNECTING']),
  }

  state = {
    openedPanel: null,
    duration: 0,
  }

  componentDidMount() {
    this.enums = this.props.enums;
    if (this.props.webphoneStatus === 'CALL_CONNECTED') {
      this.startToCountDuration();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.webphoneStatus === 'CALL_CONNECTED' &&
        this.props.webphoneStatus === 'CALL_CONNECTING') {
      this.startToCountDuration();
    }
  }

  componentWillUnmount() {
    if (durationInterval) {
      window.clearInterval(durationInterval);
      durationInterval = null;
    }
  }

  startToCountDuration() {
    durationInterval = window.setInterval(
      () => this.setState({ duration: this.state.duration + 1 }),
      1000
    );
  }

  render() {
    function contain(arr, target) {
      return arr && target && arr.indexOf(target) !== -1;
    }
    const content = () => {
      if (this.state.openedPanel === 'keypad') {
        return (
          <div className={classNames(main, container)}>
            <CallInfo {...this.props.callInfo} duration={this.state.duration} />
            <Ratio size={0.9}>
              <Dialer handleClick={(number) => this.props.dtmf(number)} />
            </Ratio>
            <CallFooter
              leftIcon={'icon-uni40'}
              rightIcon={'icon-uni44'}
              onLeftClick={() => this.setState({ openedPanel: null })}
              onRightClick={this.props.bye}
            />
          </div>
        );
      } else if (this.state.openedPanel === 'flip') {
        return (
          <Closeable onClose={() => this.setState({ openedPanel: null })} className={main}>
            <Flip
              {...this.props.flip}
            />
          </Closeable>
        );
      } else if (this.state.openedPanel === 'transfer') {
        return (
          <Closeable onClose={() => this.setState({ openedPanel: null })} className={main}>
            <Transfer {...this.props.transfer} />
          </Closeable>
        );
      }
      return (
        <div className={classNames(main, container)}>
          <CallInfo {...this.props.callInfo} duration={this.state.duration} />
          <CallConsole
            status={this.props.operationStatus}
            disabledOperation={this.props.disabledOperation}
            disabled={this.props.webphoneStatus !== 'CALL_CONNECTED'}
            handleHoldClick={(flag) => this.props.hold(flag)}
            handleRecordClick={(flag) => this.props.record(flag)}
            handleKeypadClick={() => this.setState({ openedPanel: 'keypad' })}
            handleFlipClick={() => this.setState({ openedPanel: 'flip' })}
            handleTransferClick={() => this.setState({ openedPanel: 'transfer' })}
            handleParkClick={() => this.props.park()}
          />
          <CallFooter
            leftIcon={classNames({
              'icon-uniCE': !contain(this.props.operationStatus, 'MUTED'),
              'icon-uni7B': contain(this.props.operationStatus, 'MUTED'),
            })}
            rightIcon={'icon-uni44'}
            onLeftClick={() => this.props.mute(!contain(this.props.operationStatus, 'MUTED'))}
            onRightClick={this.props.bye}
          />
        </div>
      );
    };

    return (
      <div className={main}>
        {content()}
      </div>
    );
  }
}