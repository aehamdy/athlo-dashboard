import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import axios, { AxiosError } from "axios";
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
import Cookies from "js-cookie";

const formSchema = z.object({
  username: z.string().min(3, "Username is required"),
  password: z.string().min(6, "Password is required"),
});

type LoginFormData = z.infer<typeof formSchema>;

function LoginCard() {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onLogin(data: LoginFormData) {
    try {
      setIsLoading(true);
      setServerError(null);

      const response = await axios.post(API_ENDPOINTS.auth.login, {
        userName: data.username,
        password: data.password,
      });

      const accessToken = response.data?.data?.accessToken;

      if (!accessToken) {
        setServerError("Failed to retrieve access token");
        setIsLoading(false);
        return;
      }

      Cookies.set("athloDashboard-accessToken", accessToken, {
        expires: 1, // 1 day
        secure: true, // only HTTPS
        sameSite: "strict",
      });

      console.log("Login successful:", response.data);
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      setServerError(
        err.response?.data?.message || "Invalid username or password"
      );
    } finally {
      setIsLoading(false);
    }
  }

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
          onSubmit={form.handleSubmit(onLogin)}
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
          {serverError && <p className="text-sm text-red-500">{serverError}</p>}
        </form>
      </CardContent>

      <CardFooter>
        <Button
          type="submit"
          form="login-form"
          disabled={isLoading}
          className="w-full text-dark bg-accent hover:bg-accent-soft active:bg-accent-strong cursor-pointer"
        >
          {isLoading ? (
            <Spinner className="text-dark" />
          ) : (
            <p className="font-semibold text-dark">Login</p>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default LoginCard;
