import Cookies from "js-cookie";
import { Button } from "../ui/button";
import { AUTH } from "@/constants/auth";

import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "@/routes/paths";

function LogoutButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    Cookies.remove(AUTH.COOKIE.ACCESS_TOKEN);
    Cookies.remove(AUTH.COOKIE.REFRESH_TOKEN);

    navigate(ROUTE_PATHS.login, { replace: true });
  };

  return (
    <Button
      className="w-full hover:bg-red-500/50 active:bg-red-500/30 duration-normal cursor-pointer"
      onClick={handleClick}
    >
      Logout
    </Button>
  );
}

export default LogoutButton;
