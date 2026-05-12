import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import { useLogin } from '../hooks/useLogin';
import { loginSchema, type LoginFormData } from '../auth.schema';

function LoginCard() {
  const { login, isLoading, error } = useLogin();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: 'ahmed',
      password: 'Ahmed.10',
    },
  });

  const onSubmit = (data: LoginFormData) => {
    login(data.username, data.password);
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col items-center">
        <CardTitle className="py-xs px-sm font-semibold text-md text-accent-strong">
          Welcome to Athlo!
        </CardTitle>

        <CardDescription>Your dashboard is waiting for you.</CardDescription>
      </CardHeader>

      <Separator />

      <CardContent>
        <form
          id="login-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <FieldGroup>
            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Username</FieldLabel>
                  <Input
                    {...field}
                    autoComplete="username"
                    className="form-input"
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Password</FieldLabel>
                  <Input
                    type="password"
                    {...field}
                    autoComplete="current-password"
                    className="form-input"
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}
        </form>
      </CardContent>

      <CardFooter>
        <Button
          type="submit"
          form="login-form"
          disabled={isLoading}
          className="w-full font-semibold"
        >
          {isLoading ? (
            <div className="flex items-center gap-sm">
              <Spinner />

              <span>Logging in...</span>
            </div>
          ) : (
            "Let's Go"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default LoginCard;
