import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/auth/routes";

const Social = () => {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };
  return (
    <div className="flex items-center gap-x-3 w-full">
      <Button
        className="w-full"
        variant="outline"
        size="lg"
        onClick={() => onClick("google")}
      >
        <FcGoogle className="size-4" />
      </Button>
      <Button
        className="w-full"
        variant="outline"
        size="lg"
        onClick={() => onClick("github")}
      >
        <FaGithub className="size-4" />
      </Button>
    </div>
  );
};

export default Social;
