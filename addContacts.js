import { useContext } from "react";
import { View, TouchableOpacity, Screen, ScrollView, FlatList, TouchableHighlight, Text, StyleSheet } from "react-native";
import {FriendsContext} from "./friends";
import ContactsContext from "./contacts";

const AddContacts = () => {
  const friendsObj = useContext(FriendsContext);
  const contactObj = useContext(ContactsContext);

  const handleChange = item => {
    console.log("in add contacts: " + item.contactMethod);
    friendsObj.handleAddFriend(item.name,item.lastContacted, item.contactMethod);
  };

  const styles = StyleSheet.create({
    is_friend : {
      backgroundColor: '#00ffff'
    },
    not_friend : {
      backgroundColor: '#ffffff'
    }});

    const getIsFriend = name => {  
      if (friendsObj.friends.some(f => f.name === name)) return styles.is_friend;
      else return styles.not_friend;
    };

  return (
    <FlatList
      data={contactObj.contacts}
      scrollEnabled={true}
      renderItem={({ item, index, separators }) => (
        <TouchableHighlight
          key={item.key}
          onPress={
            () => {handleChange(item);}
        }
          onShowUnderlay={separators.highlight}
          onHideUnderlay={separators.unhighlight}>
          <View style={getIsFriend(item.name)}>
            <Text>{item.name}</Text>
          </View>
        </TouchableHighlight>
      )}
    />);
};

export default AddContacts;