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
import { useSignup } from "@/hooks/useAuthQueries";
// import { useImageUpload } from "@/hooks/useUploadQueries";
import { useAuthStore } from "@/store/useAuthStore";
import { useState } from "react";
import { Link } from "react-router";
// import { User2 } from "lucide-react";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    profilePic: "",
  });

  //hook
  const { isLoading, error: isError } = useAuthStore((state) => state);
  console.log(isError);
  const { mutate, error, isPending } = useSignup();
  console.log(error);

  // const { mutateAsync, isPending: imageUploadingPending } = useImageUpload();

  //helper files

  // const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const formData = new FormData();
  //     formData.append("image", file);
  //     const res = await mutateAsync(formData);
  //     setFormData((prev) => ({ ...prev, profilePic: res.url }));
  //   }
  // };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="w-full lg:w-1/3 p-4 ">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl ">
              <span>SignUp</span>
              <p className="text-base mt-1 text-muted-foreground/60 ">
                welcome back
              </p>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* image upload */}
            {/* <div>
              <span className="font-semibold ">Profile Picture</span>
              <Label
                id="upload"
                className=" size-32 border-2 border-dashed border-muted-foreground/50 rounded p-1 mt-2 flex items-center justify-center"
              >
                <input
                  id="upload"
                  onChange={(e) => handleUpload(e)}
                  type="file"
                  className="hidden"
                />
                {formData.profilePic ? (
                  <img
                    className="w-full h-full object-cover"
                    src={formData.profilePic}
                    alt="profile-image"
                  />
                ) : imageUploadingPending ? (
                  <div className="size-8 rounded-full border-4 border-muted-foreground/50 border-t-primary animate-spin bg-transparent"></div>
                ) : (
                  <div className="size-20 rounded-md hover:bg-accent flex items-center justify-center">
                    <User2 className="text-muted-foreground/50 " />
                  </div>
                )}
              </Label>
            </div> */}
            <Label className=" flex flex-col items-start">
              <span className="text-base">Username</span>
              <Input
                value={formData.username}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, username: e.target.value }))
                }
                type="text"
              />
            </Label>
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
            <Button
              disabled={isLoading || isPending}
              className="w-full text-base "
            >
              {isLoading || isPending ? (
                <div className="size-6 rounded-full border-muted-foreground border-3 border-t-secondary animate-spin"></div>
              ) : (
                "SignUp"
              )}
            </Button>

            <p>
              Already Have Account{" "}
              <Link to={"/login"} className="font-bold">
                Sign In
              </Link>
            </p>
          </CardFooter>
        </Card>
      </form>

      {JSON.stringify(formData)}
    </div>
  );
};

export default SignUp;
