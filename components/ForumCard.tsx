"use client";
import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, MoreHorizontal, Trash } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { formatElapsedTime } from "@/lib/utils";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import axios from "axios";

interface ForumCardProps {
  src: string;
  category: "ANONYMOUS" | "NON_ANONYMOUS";
  content: string;
  username: string;
  createdAt: string;
  userId: string;
  id: string;
  setPosts: any;
}

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

export function ForumCard({
  src,
  category,
  content,
  username,
  createdAt,
  userId,
  id,
  setPosts,
}: ForumCardProps) {
  const time = formatElapsedTime(createdAt);
  const user = useCurrentUser();

  const handleDelete = async () => {
    await axios.delete(`/api/posts/${id}`);
    setPosts((prev: Post[]) => prev.filter((item: Post) => item.id !== id));
  };

  return (
    <Card className="bg-secondary">
      <CardHeader className="flex justify-between">
        <div className="flex space-x-6">
          <Avatar className="h-[44px] w-[44px]">
            <AvatarImage
              src={
                category === "ANONYMOUS"
                  ? "/anonymous.jpg"
                  : "https://github.com/shadcn.png"
              }
              alt="@shadcn"
            />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-center flex-1">
            <CardTitle className="text-sm font-normal leading-none tracking-tight">
              {category === "ANONYMOUS" ? "Anonymous" : username}
            </CardTitle>
            <CardDescription>{time}</CardDescription>
          </div>
          {userId === user?.id && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon">
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleDelete}>
                  <Trash className="w-4 h-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-[660px] h-[107px] bg-background rounded-md flex items-center justify-between space-x-2">
          <div className="h-[48px] w-[48px] flex items-center justify-center m-3 rounded-full bg-secondary ">
            <Avatar className="h-[18px] w-[18px]">
              <AvatarImage src={src} alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <ScrollArea className="h-full w-full text-muted-foreground text-xs p-5">
            {content}
          </ScrollArea>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex space-x-1 items-center">
          <MessageSquare className="text-muted-foreground h-[20px] w-[20px]" />
          <span className="text-xs text-muted-foreground">24 Comments</span>
        </div>
      </CardFooter>
    </Card>
  );
}
