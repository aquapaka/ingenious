import { zodResolver } from '@hookform/resolvers/zod';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { z } from 'zod';
import { Button } from '../../../ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '../../../ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../ui/form';
import { Input } from '../../../ui/input';

const loginFormSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export function LoginForm(props: { isHidden: boolean }) {
  const { isHidden } = props;

  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  function onLoginSubmit(values: z.infer<typeof loginFormSchema>) {
    console.log(values);
  }

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
            <Button type="submit" className="w-full">
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
