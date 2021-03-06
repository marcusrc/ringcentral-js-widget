import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Alert from 'ringcentral-integration/modules/Alert';
import Brand from 'ringcentral-integration/modules/Brand';
import Locale from 'ringcentral-integration/modules/Locale';
import RateLimiter from 'ringcentral-integration/modules/RateLimiter';

import AlertDisplay from '../../components/AlertDisplay';

import AuthAlert from '../../components/AuthAlert';
import CallAlert from '../../components/CallAlert';
import CallingSettingsAlert from '../../components/CallingSettingsAlert';
import RegionSettingsAlert from '../../components/RegionSettingsAlert';
import MessageSenderAlert from '../../components/MessageSenderAlert';
import RateExceededAlert from '../../components/RateExceededAlert';
import ConnectivityAlert from '../../components/ConnectivityAlert';

const AlertContainer = connect((state, {
  locale,
  alert,
}) => ({
  currentLocale: locale.currentLocale,
  messages: alert.messages,
}), (dispatch, {
  rateLimiter,
  brand,
  alert,
}) => ({
  getRenderer: (message) => {
    if (AuthAlert.handleMessage(message)) {
      return AuthAlert;
    }
    if (CallAlert.handleMessage(message)) {
      return props => (
        <CallAlert
          {...props}
          regionSettingsUrl="/settings/region" />
      );
    }
    if (CallingSettingsAlert.handleMessage(message)) {
      return props => (
        <CallingSettingsAlert
          {...props}
          brand={brand.fullName}
          callingSettingsUrl="/settings/calling" />
      );
    }

    if (RegionSettingsAlert.handleMessage(message)) {
      return props => (
        <RegionSettingsAlert
          {...props}
          regionSettingsUrl="/settings/region" />
      );
    }

    if (MessageSenderAlert.handleMessage(message)) {
      return props => (
        <MessageSenderAlert
          {...props}
          regionSettingsUrl="/settings/region" />
      );
    }

    if (RateExceededAlert.handleMessage(message)) {
      return props => (
        <RateExceededAlert
          {...props}
          timestamp={rateLimiter.timestamp}
          duration={rateLimiter._throttleDuration} />
      );
    }

    if (ConnectivityAlert.handleMessage(message)) {
      return ConnectivityAlert;
    }

    return undefined;
  },
  dismiss: (id) => {
    alert.dismiss(id);
  },
}))(AlertDisplay);

AlertContainer.propTypes = {
  alert: PropTypes.instanceOf(Alert).isRequired,
  brand: PropTypes.instanceOf(Brand).isRequired,
  locale: PropTypes.instanceOf(Locale).isRequired,
  rateLimiter: PropTypes.instanceOf(RateLimiter).isRequired,
};

export default AlertContainer;
