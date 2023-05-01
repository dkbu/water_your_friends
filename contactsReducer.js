function ContactsReducer(contacts, action) {
    switch (action.type) {
    case 'added':
        const contactIdx = contacts.findIndex(c => c.name === action.name);
        if (contactIdx == -1) {
            console.log("in contacts reducer: " + action.contactMethod);
            return [
                ...contacts,
                {
                name: action.name,
                lastContacted: action.lastContacted,
                contactMethod: action.contactMethod
                },
            ];
        }
        else {
            if (contacts[contactIdx].lastContacted < action.lastContacted) {
                contacts[contactIdx].lastContacted = action.lastContacted;
            }
            return contacts;
        }
    case 'changed':
        return contacts.map((t) => {
            if (t.id === action.contact.id) {
            return action.contact;
            } else {
            return t;
            }
        });
    case 'deleted':
        return contacts.filter((t) => t.id !== action.id);
    default:
        throw Error('Unknown action: ' + action.type);
    }
  };

  export default ContactsReducer;