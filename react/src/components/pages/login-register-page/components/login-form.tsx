import { zodResolver } from '@hookform/resolvers/zod';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';
import { useLoginMutation } from '../../../../services/main-service';
import { Button } from '../../../ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '../../../ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../ui/form';
import { Input } from '../../../ui/input';
import { saveUserToken } from '../../../../app/slices/authSlice';

const loginFormSchema = z.object({
  username: z.string().trim().min(1, 'Please enter username'),
  password: z.string().trim().min(1, 'Please enter password'),
});

export function LoginForm(props: { isHidden: boolean }) {
  const { isHidden } = props;
  const [login, { isLoading: isLoggingin, data, isError, error, isSuccess }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  function onLoginSubmit(values: z.infer<typeof loginFormSchema>) {
    const { username, password } = values;
    login({ username, password });
  }

  useEffect(() => {
    if (isError && 'status' in error) {
      if (error.status === 401) {
        loginForm.setError('password', {
          message: 'Password is not correct',
        });
      }
    }
    if (isSuccess) {
      dispatch(saveUserToken(data));
      toast.success('Logged in');
      navigate('/');
    }
  }, [isSuccess, data, dispatch, isError, error, loginForm, navigate]);

  return (
    <Card className="w-full max-w-sm" hidden={isHidden}>
      <Form {...loginForm}>
        <form onSubmit={loginForm.handleSubmit(onLoginSubmit)}>
          <CardHeader className="text-center space-y-6">
            <Avatar className="rounded-full w-16 overflow-hidden mx-auto">
              <AvatarImage src="https://api.dicebear.com/8.x/lorelei-neutral/svg?seed=Willow" alt="@shadcn" />
            </Avatar>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <FormField
              control={loginForm.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="enter your username..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={loginForm.control}
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
          </CardContent>
          <CardFooter className="block text-center">
            <Button type="submit" className="w-full" disabled={isLoggingin}>
              Login
            </Button>
            <p className="mt-4 text-sm text-secondary-foreground font-light">
              <span className="opacity-40 ">Don't have an account? </span>
              <NavLink to="/register" className="opacity-40 font-medium hover:opacity-100 duration-300">
                Register new account
              </NavLink>
            </p>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
