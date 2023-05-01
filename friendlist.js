import Friend from '.friend'

const FriendList = props => {
    const sourceFuncs = props.sourceFuncs;
  
    return (
      <View>
        {sourceFuncs.map((sourceFunc) => {
            const friends = sourceFunc();
            friends.map((friend) => {
                return (
                    <Friend name={friend.name} lastContacted={friend.lastContacted}/>
                );
            })
        })}
      </View>
    );
  };
  
  export default FriendList;