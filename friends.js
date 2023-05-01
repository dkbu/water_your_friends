import React from "react";
import { useContext } from "react";
import { View, FlatList, TouchableHighlight, Text } from "react-native";
import Friend from "./friend";


export const FriendsContext = React.createContext(null);

export const Friends = () => {    
  const friendsObj = useContext(FriendsContext);

  console.log(friendsObj.friends);

  return (
    <FlatList
      data={friendsObj.friends}
      scrollEnabled={true}
      renderItem={({ item, index, separators }) => (
        <TouchableHighlight
          key={item.key}
          onPress={
            () => {item.contactMethod()}
        }
          onShowUnderlay={separators.highlight}
          onHideUnderlay={separators.unhighlight}>
          <View>
            <Friend name={item.name} lastContacted={item.lastContacted}/>
          </View>
        </TouchableHighlight>
      )}
    />);
}