import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/hooks/useAuthQueries";
import { useAuthStore } from "@/store/useAuthStore";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  //hook
  const { isLoading, error: isError } = useAuthStore((state) => state);
  const navigate = useNavigate();

  const { mutate, error, isPending } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(formData);
  };

  const handleLoginWithGoogle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.location.href = "http://localhost:5000/api/v1/auth/google";
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="w-full lg:w-1/3 p-4 ">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl ">
              <span>Login</span>
              <p className="text-base mt-1 text-muted-foreground/60 ">
                welcome back
              </p>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Label className=" flex flex-col items-start">
              <span className="text-base">Email</span>
              <Input
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                type="email"
              />
            </Label>
            <Label className=" flex flex-col items-start">
              <span className="text-base">Password</span>
              <Input
                value={formData.password}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, password: e.target.value }))
                }
                type="password"
              />
            </Label>
            {error && (
              <p className="text-sm text-destructive font-semibold">
                {
                  // Try to get a message from the error response, otherwise fallback to a generic message
                  (error as any)?.response?.data?.message ||
                    error.message ||
                    "An error occurred"
                }
              </p>
            )}
            {isError && (
              <p className="text-sm text-destructive font-semibold">
                {isError}
              </p>
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 w-full">
              <Button
                disabled={isLoading || isPending}
                className="w-full text-base "
              >
                {isLoading || isPending ? (
                  <div className="size-6 rounded-full border-muted-foreground border-3 border-t-secondary animate-spin"></div>
                ) : (
                  "Login"
                )}
              </Button>
              <div className="flex items-center gap-4 w-full">
                <hr className="w-full" />
                <p className=" shrink-0">Or</p>
                <hr className="w-full" />
              </div>
              <Button
                onClick={handleLoginWithGoogle}
                className="w-full"
                variant={"outline"}
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M3.06364 7.50914C4.70909 4.24092 8.09084 2 12 2C14.6954 2 16.959 2.99095 18.6909 4.60455L15.8227 7.47274C14.7864 6.48185 13.4681 5.97727 12 5.97727C9.39542 5.97727 7.19084 7.73637 6.40455 10.1C6.2045 10.7 6.09086 11.3409 6.09086 12C6.09086 12.6591 6.2045 13.3 6.40455 13.9C7.19084 16.2636 9.39542 18.0227 12 18.0227C13.3454 18.0227 14.4909 17.6682 15.3864 17.0682C16.4454 16.3591 17.15 15.3 17.3818 14.05H12V10.1818H21.4181C21.5364 10.8363 21.6 11.5182 21.6 12.2273C21.6 15.2727 20.5091 17.8363 18.6181 19.5773C16.9636 21.1046 14.7 22 12 22C8.09084 22 4.70909 19.7591 3.06364 16.4909C2.38638 15.1409 2 13.6136 2 12C2 10.3864 2.38638 8.85911 3.06364 7.50914Z"></path>
                </svg>
                Continue with Google
              </Button>
            </div>
            <p>
              Don't have a account ?{" "}
              <Link to={"/signup"} className="font-bold">
                Create Account
              </Link>
            </p>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default Login;
