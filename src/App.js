import React, { useReducer, useState } from 'react';
import { StyleSheet, Text, View, PermissionsAndroid } from 'react-native';
import Friend from './friend';
import { Button } from 'react-native';
import ContactsReducer from './contactsReducer';
import AddContacts from './addContacts';
import friendsReducer from './friendsReducer';
import {FriendsContext, Friends} from './friends';
import ContactsContext from './contacts';
import PhoneImporter from './phoneImporter';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function App() {
  /*const findFriends = props => {

  };*/
  const [contacts, dispatchContacts] = useReducer(ContactsReducer, []);
  const [friends, dispatchFriends] = useReducer(friendsReducer, []);

  var friendObj = {
    friends: friends,
    handleAddFriend: ((name, lastContacted, contactMethod) => {
      dispatchFriends({
        type: 'added',
        name: name,
        lastContacted: lastContacted,
        contactMethod: contactMethod
      });
    }),
    handleChangeFriend: ((friend) => {
      dispatchFriends({
        type: 'changed',
        contact: friend,
      });
    }),
    handleDeleteFriend: ((friendID) => {
      dispatchFriends({
        type: 'deleted',
        id: friendID,
      });
    })
  }

  var contactObj = {
    contacts: contacts,
    handleAddContact: ((name, lastContacted, contactMethod) => {
      dispatchContacts({
        type: 'added',
        name: name,
        lastContacted: lastContacted,
        contactMethod: contactMethod
      });
    }),
    handleChangeContact: ((contact) => {
      dispatchContacts({
        type: 'changed',
        contact: contact,
      });
    })
  }

  const Tab = createBottomTabNavigator();

  function ImportContacts() {
    return (<View style={styles.container}>
      <Button title="import phone contacts" onPress={() => {
        PhoneImporter(handleAddContact = contactObj.handleAddContact, timeLimit = (Date.now() - (7 * 24 * 3600 * 1000)));
      }} />
    </View>);
  }

  return (
    <NavigationContainer>
      <FriendsContext.Provider value={friendObj}>
        <ContactsContext.Provider value={contactObj}>
          <Tab.Navigator>
            <Tab.Screen name="Friends" component={Friends}/>
            <Tab.Screen name="Import contacts" component={ImportContacts} />
            <Tab.Screen name="Add friends" component={AddContacts} />
          </Tab.Navigator>
        </ContactsContext.Provider>
      </FriendsContext.Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});