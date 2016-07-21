import React from 'react';

import UserDialPad from '../container/UserDialPad.react';
import ActiveCall from './ActiveCall/ActiveCall.react';
import IncomingCall from './IncomingCall/IncomingCall.react';

const WebPhone = (props) => {
  if (props.status === 'OnCall') {
    return <ActiveCall phoneNumber={props.phoneNumber} />;
  } else if (props.status === 'OnCallIncoming') {
    return <IncomingCall phoneNumber={props.phoneNumber} />;
  }
  return <UserDialPad contacts={props.contacts} />;
};

WebPhone.propTypes = {
  status: React.PropTypes.oneOf(['OnCall', 'OnCallIncoming', 'Idle']),
  contacts: React.PropTypes.array,
  phoneNumber: React.PropTypes.string,
};

export default WebPhone;