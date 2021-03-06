import messageSenderMessages from 'ringcentral-integration/modules/MessageSender/messageSenderMessages';

export default {
  [messageSenderMessages.sendSuccess]: 'Send Success.',
  [messageSenderMessages.sendError]: 'Something wrong happened when send message.',
  [messageSenderMessages.numberValidateError]: 'Phone Number Validate Error.',
  [messageSenderMessages.textEmpty]: 'Please enter the text to be sent.',
  [messageSenderMessages.noPermission]: 'You have no permission to send message.',
  [messageSenderMessages.senderEmpty]: 'You must select a number from your phone numbers to send',
  [messageSenderMessages.noToNumber]: 'Please enter a valid phone number.',
  [messageSenderMessages.recipientsEmpty]: 'Please enter a valid receiver number.',
  [messageSenderMessages.textTooLong]: 'Text is too long, 1000 Limited',
  [messageSenderMessages.recipientNumberInvalids]: 'Recipient number is invalids',
  [messageSenderMessages.noAreaCode]: 'Please set {areaCodeLink} to use 7-digit local phone numbers.',
  [messageSenderMessages.specialNumber]: 'Dialing emergency or special service numbers is not supported.',
  [messageSenderMessages.connectFailed]: 'Connection failed. Please try again later.',
  [messageSenderMessages.internalError]: 'Cannot connect due to internal errors. Please try again later.',
  [messageSenderMessages.notAnExtension]: 'The extension number does not exist.',
  [messageSenderMessages.networkError]: 'Cannot connect due to network issues. Please try again later.',
  [messageSenderMessages.notSmsToExtension]: `Cannot send To a extension number with main phone number.\n    If you want to sent to a extension Number,\n    please just enter extension Number.`,
  [messageSenderMessages.senderNumberInvalids]: `You don't have valid phone number to send SMS
    from. Please contact your account administrator.`,
  [messageSenderMessages.internationalSMSNotSupported]: `Sending SMS to international phone number
    is not supported.`,
  areaCode: 'area code',
};
