import {Text, View, StyleSheet } from 'react-native';

const Friend = props => {
  const lessRecentDays = 3;
  const oldDays = 10;

  // Styles.
  const styles = StyleSheet.create({
      recent : {
        color: '#8DE983'
      },
      less_recent : {
        color: '#E9E983'
      },
      old : {
        color: '#EC8F61'
      }});

  const getFriendState = lastContacted => {
    console.log("getting friend state: last connected " + lastContacted);

    var relTime = (Date.now() - lastContacted) / (3600 * 24); // how many hours since last contacted
    if (relTime < lessRecentDays) return styles.recent;
    else if (relTime < oldDays) return styles.less_recent;
    else return styles.old;
  };

  return (
    <View>
      <Text style={getFriendState(props.lastContacted)}>{props.name}</Text>
    </View>
  );
};

export default Friend;