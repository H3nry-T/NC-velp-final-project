import { Text, TouchableOpacity } from "react-native";

export default function List() {
  function handlePress() {
    console.log("Button pressed");
  }

  return (
    <TouchableOpacity onPress={handlePress} className="pb-10">
      <Text>List</Text>
    </TouchableOpacity>
  );
}
