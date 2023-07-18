import { Navigate} from "react-router-dom";
import useAuth from "../authHooks/useAuth";

export default function PrivateRoute({ children }) {
  const isLoggedIn = useAuth();
  

  return isLoggedIn ? children : <Navigate to="/login" />;
}
