import { Button } from "@/components/ui/button";
import Link from "next/link";

type BackButtonProps = {
  href: string;
  label: string;
};

const BackButton = ({ href, label }: BackButtonProps) => {
  return (
    <Button className="w-full font-normal" variant="link" size="sm" asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
};

export default BackButton;
