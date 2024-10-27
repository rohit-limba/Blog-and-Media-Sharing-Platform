"use client";
import { useState, useTransition } from "react";
import EmojiPicker from "emoji-picker-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { postFormSchema } from "@/FormSchemas/CreatePostForm";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Checkbox } from "./ui/checkbox";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

interface Post {
  content: string;
  src: string;
  category: "NON_ANONYMOUS" | "ANONYMOUS";
  username: string;
  createdAt: string;
  userId: string;
  updatedAt: string;
  id: string;
}

export function CreatePost({ setPosts }: any) {
  const [isVisible, setVisible] = useState(false);
  const [emoji, setEmoji] = useState(
    "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f4ac.png"
  );
  const session = useCurrentUser();
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const createPostForm = useForm<z.infer<typeof postFormSchema>>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      content: "",
      anonymous: false,
      src: "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f4ac.png",
      userId: session?.id,
    },
  });

  async function postSubmit(values: z.infer<typeof postFormSchema>) {
    const { content, anonymous } = values;

    const payload = {
      content,
      src: emoji,
      category: anonymous ? "ANONYMOUS" : "NON_ANONYMOUS",
      userId: session?.id,
    };
    startTransition(async () => {
      try {
        const post = await axios.post("/api/posts", payload);
        setPosts((prevPosts: Post[]) =>
          [...prevPosts, post.data.post].reverse()
        );
      } catch (error) {
        console.log("Error in Creating Post", error);
        toast({
          variant: "default",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with creatign Post.",
        });
      }
      createPostForm.reset();
    });
  }

  return (
    <Card className=" bg-secondary">
      <Form {...createPostForm}>
        <form onSubmit={createPostForm.handleSubmit(postSubmit)}>
          <CardHeader className="flex ">
            <div className="flex justify-between flex-1">
              <CardTitle className="text-sm font-normal leading-none tracking-tight">
                Create Post
              </CardTitle>
              <FormField
                control={createPostForm.control}
                name="anonymous"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-1 space-y-0 rounded-md border px-4 shadow">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isPending}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Anonymous</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="w-[660px] h-[78px] bg-background rounded-md flex items-center space-x-2">
              <FormField
                control={createPostForm.control}
                name="src"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Button
                        size={"icon"}
                        variant={"ghost"}
                        type="button"
                        className="h-[48px] w-[48px] flex items-center justify-center m-3 rounded-full bg-secondary"
                        {...field}
                        disabled={isPending}
                        onClick={() => {
                          setVisible(!isVisible);
                        }}
                      >
                        <Avatar className="h-[18px] w-[18px]">
                          <AvatarImage src={emoji} alt="emoji" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        {isVisible && (
                          <div className="absolute top-[25%] left-0 z-50">
                            <EmojiPicker
                              height={400}
                              width={800}
                              onEmojiClick={(item) => {
                                setVisible(!isVisible);
                                setEmoji(item.imageUrl);
                              }}
                            />
                          </div>
                        )}
                      </Button>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={createPostForm.control}
                name="content"
                render={({ field }) => (
                  <FormItem className="w-full h-full">
                    <FormControl>
                      <textarea
                        className="w-full h-full bg-background text-xs text-muted-foreground px-3 py-2 outline-none"
                        placeholder="How are you feeling today ?"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>

          <CardFooter>
            <div className="w-full flex justify-end">
              <Button className="w-[111px] h-[43px]" variant={"primary"}>
                Post
              </Button>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
