"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { FcClearFilters } from "react-icons/fc";
import { useEffect } from "react";

const searchSchema = z.object({
  searchText: z.string().optional(),
});

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      searchText: search ?? "",
    },
  });

  const onSubmit = async (values: z.infer<typeof searchSchema>) => {
    if (values.searchText) {
      router.push(`/?search=${values.searchText}`);
    } else {
      router.push("/");
    }
  };

  // this useEffect is defined to persist the value in search textbox when clicked on a badge to filter data
  useEffect(() => {
    form.setValue("searchText", search ?? "");
  }, [search, form]);

  return (
    <Form {...form}>
      <form
        className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 items-center gap-x-3"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="searchText"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="w-[400px]"
                  placeholder="filter room by keywords such as node js, typescript"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button size="icon" title="search">
          <SearchIcon />
        </Button>
        {search && (
          <Button
            title="clear filters"
            size="icon"
            variant="outline"
            onClick={() => {
              form.setValue("searchText", "");
              router.push("/");
            }}
          >
            <FcClearFilters className="size-5 mr-1" />
          </Button>
        )}
      </form>
    </Form>
  );
};

export default SearchBar;
