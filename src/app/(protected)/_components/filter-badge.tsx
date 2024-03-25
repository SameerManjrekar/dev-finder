"use client";

import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

type FilterBadgeProps = {
  languageTags: string[];
};

const FilterBadge = ({ languageTags }: FilterBadgeProps) => {
  const router = useRouter();
  return (
    <>
      {languageTags &&
        languageTags.map((lang, index) => (
          <Badge
            onClick={() => router.push(`/?search=${lang}`)}
            className="mb-3 flex flex-col w-fit cursor-pointer"
            key={index}
          >
            {lang}
          </Badge>
        ))}
    </>
  );
};

export default FilterBadge;
