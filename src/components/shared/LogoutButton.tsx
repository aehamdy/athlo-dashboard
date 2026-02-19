import Cookies from "js-cookie";
import { Button } from "../ui/button";
import { AUTH } from "@/constants/auth";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "@/routes/paths";
import Icon from "./Icon";

function LogoutButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    Cookies.remove(AUTH.COOKIE.ACCESS_TOKEN);
    Cookies.remove(AUTH.COOKIE.REFRESH_TOKEN);

    navigate(ROUTE_PATHS.login, { replace: true });
  };

  return (
    <Button
      variant="plain"
      className="group flex items-center gap-compact hover:gap-base w-full text-gray-400 hover:text-light hover:bg-red-500/80 active:bg-red-500/30 border border-gray-700/50 hover:border-red-500/80"
      onClick={handleClick}
    >
      <Icon
        name="LogOut"
        className="text-gray-400 group-hover:text-light rotate-180 duration-normal"
      />
      Logout
    </Button>
  );
}

export default LogoutButton;
