import { zodResolver } from '@hookform/resolvers/zod';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useRegisterUserMutation } from '../../../../services/main-service';
import { Button } from '../../../ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '../../../ui/card';
import { Checkbox } from '../../../ui/checkbox';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../../../ui/form';
import { Input } from '../../../ui/input';

const USERNAME_REGEX = /^[a-zA-Z0-9]+$/;
const STRONG_PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

const registerFormSchema = z
  .object({
    username: z
      .string()
      .min(3, 'Username need to have atleast 3 characters')
      .max(20, "Username can't have more than 20 characters")
      .regex(USERNAME_REGEX, 'Username can only contains letters and numbers'),
    password: z
      .string()
      .min(8)
      .regex(
        STRONG_PASSWORD_REGEX,
        'Password must contains at least 1 numeric digit, 1 special character, 1 uppercase and 1 lowercase letter',
      ),
    confirmPassword: z.string(),
    isAcceptTermsAndConditions: z.literal(true, {
      message: 'You must accept our terms and conditions',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export function RegisterForm(props: { isHidden: boolean }) {
  const { isHidden } = props;
  const [registerUser, { isLoading: isRegistering, isError, error, isSuccess }] = useRegisterUserMutation();
  const navigate = useNavigate();

  const registerForm = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
  });

  function onRegisterSubmit(values: z.infer<typeof registerFormSchema>) {
    const { username, password } = values;
    registerUser({ username, password });
  }

  useEffect(() => {
    if (isError && 'status' in error) {
      if (error.status === 409) {
        registerForm.setError('username', {
          message: 'This username already taken',
        });
      } else {
        console.log('other errors');
      }
    }
    if (isSuccess) {
      navigate('/');
    }
  }, [isError, error, registerForm, isSuccess, navigate]);

  return (
    <Card className="w-full max-w-sm" hidden={isHidden}>
      <Form {...registerForm}>
        <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)}>
          <CardHeader className="text-center space-y-6">
            <h1 className="font-black text-foreground">Register new account</h1>
            <Avatar className="rounded-full w-16 overflow-hidden mx-auto">
              <AvatarImage src="https://api.dicebear.com/8.x/lorelei-neutral/svg?seed=Willow" alt="@shadcn" />
            </Avatar>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <FormField
              control={registerForm.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="enter your username..." {...field} />
                  </FormControl>
                  <FormDescription>This will be used to login.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={registerForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="enter your password..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={registerForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="confirm your password..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={registerForm.control}
              name="isAcceptTermsAndConditions"
              render={({ field }) => (
                <FormItem>
                  <FormControl className="items-top flex space-x-2">
                    <div className="items-top flex space-x-2">
                      <Checkbox id="terms1" onCheckedChange={(value) => field.onChange(value)} />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor="terms1"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Accept terms and conditions
                        </label>
                        <p className="text-xs text-muted-foreground">
                          You agree to our Terms of Service and Privacy Policy.
                        </p>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="block text-center">
            <Button type="submit" className="w-full" disabled={isRegistering}>
              Register
            </Button>
            <p className="mt-4 text-sm text-secondary-foreground font-light">
              <span className="opacity-40 ">Already have an account? </span>
              <NavLink to="/login" className="opacity-40 font-medium hover:opacity-100 duration-300">
                Let's login
              </NavLink>
            </p>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
