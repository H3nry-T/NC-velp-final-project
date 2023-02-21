import { Text, TouchableOpacity } from "react-native";
import { handleLogIn } from "../firebase/auth/login";

export function LoginButton({ email, password }) {
  return (
    <TouchableOpacity
      onPress={() => handleLogIn(email, password)}
      className=" rounded-full bg-sky-500 p-2 w-2/5 my-4"
    >
      <Text className="text-l text-center font-bold text-white">Login</Text>
    </TouchableOpacity>
  );
}
