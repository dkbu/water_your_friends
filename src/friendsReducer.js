function friendsReducer(friends, action) {
    switch (action.type) {
    case 'added':
        return [
            ...friends,
            {
            name: action.name,
            lastContacted: action.lastContacted,
            contactMethod: action.contactMethod
            },
        ];
    case 'changed':
        return contacts.map((t) => {
            if (t.name === action.friend.name) {
            return action.friend;
            } else {
            return t;
            }
        });
    case 'deleted':
        return contacts.filter((t) => t.name !== action.name);
    default:
        throw Error('Unknown action: ' + action.type);
    }
  };

  export default friendsReducer;