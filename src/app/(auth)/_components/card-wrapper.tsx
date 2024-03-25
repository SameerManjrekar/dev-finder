import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ReactNode } from "react";
import Social from "./social";
import BackButton from "./back-button";

type CardWrapperProps = {
  headerTitle: string;
  children: ReactNode;
  backButtonlabel: string;
  backButtonHref: string;
  showSocial?: boolean;
};

const CardWrapper = ({
  headerTitle,
  children,
  backButtonlabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="w-[500px] sm:w-[600px] shadow-md">
      <CardHeader className="text-center font-bold text-2xl">
        {headerTitle}
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton href={backButtonHref} label={backButtonlabel} />
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
