import { PermissionsAndroid, View, Linking } from 'react-native';
import CallLogs from 'react-native-call-log';

const PhoneImporter = async(handleAddContact, timeLimit) => {

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
      {
        title: 'Call Log Example',
        message:
          'Access your call logs',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      CallLogs.load(1000, {minTimestamp: timeLimit}).
        then((res) => {
          res.map(c => {
            if (c.name) {
              let contactMethod = () => {Linking.openURL(`tel:${c.phoneNumber}`)};
              console.log("added contact: " + contactMethod);
              handleAddContact(c.name, c.timestamp, contactMethod);
          }});
        });
      }
    }
  catch (e) {
    console.log(e);
  }
};

export default PhoneImporter;