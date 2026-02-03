import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { API_ENDPOINTS } from "@/api/endPoints";
import { Spinner } from "./ui/spinner";
import { Spinner } from "./ui/spinner";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "@/routes/paths";
import { AUTH } from "@/constants/auth";
import http from "@/api/http";

const formSchema = z.object({
  username: z.string().min(3, "Username is required"),
  password: z.string().min(6, "Password is required"),
});

type LoginFormData = z.infer<typeof formSchema>;

function LoginCard() {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const navigate = useNavigate();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      setServerError(null);

      const response = await http.post(API_ENDPOINTS.auth.login, {
        userName: data.username,
        password: data.password,
      });

      console.log("Login response:", response.data);

      // If backend says login failed
      if (!response.data.succeeded) {
        setServerError(response.data.message || "Login failed");
        return;
      }

      // Save tokens in cookies
      Cookies.set(AUTH.COOKIE.ACCESS_TOKEN, response.data.data.accessToken, {
        path: "/",
        expires: 1, // 1 day
      });
      Cookies.set(
        AUTH.COOKIE.REFRESH_TOKEN,
        response.data.data.refreshToken.tokenString,
        { path: "/", expires: 7 }, // refresh token lasts longer
      );

      // Redirect to dashboard
      navigate(ROUTE_PATHS.dashboard.overview, { replace: true });
    } catch (error) {
      console.error("Login error:", error);
      const axiosError = error as AxiosError<{ message?: string }>;
      setServerError(
        axiosError.response?.data?.message ||
          "An error occurred. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-9/10 md:w-3/4 lg:w-3/10">
      <CardHeader className="flex flex-col items-center">
        <CardTitle>Athlo Dashboard</CardTitle>
        <CardDescription className="text-center">
          Log in to your account to access your dashboard.
        </CardDescription>
      </CardHeader>

      <Separator />

      <CardContent>
        <form
          id="login-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <FieldGroup>
            {/* Username */}
            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="username">Username</FieldLabel>
                  <Input
                    {...field}
                    id="username"
                    placeholder="Enter your username"
                    autoComplete="username"
                    className="focus-visible:ring-accent-focus focus-visible:border-none"
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Password */}
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    {...field}
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="focus-visible:ring-accent-focus focus-visible:border-none"
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          {/* Server Error */}
          {serverError && (
            <p className="text-sm text-red-500 text-center">{serverError}</p>
          )}
        </form>
      </CardContent>

      <CardFooter>
        <Button
          type="submit"
          form="login-form"
          disabled={isLoading}
          className="w-full text-dark bg-accent hover:bg-accent-soft active:bg-accent-strong cursor-pointer"
        >
          {isLoading ? <Spinner className="text-dark" /> : "Login"}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default LoginCard;
