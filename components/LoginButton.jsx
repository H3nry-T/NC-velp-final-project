import { Text, TouchableOpacity } from "react-native";
import { handleLogIn } from "../firebase/auth/login";

export function LoginButton({ email, password }) {
  return (
    <TouchableOpacity onPress={() => handleLogIn(email, password)}>
      <Text>Login</Text>
    </TouchableOpacity>
  );
}
