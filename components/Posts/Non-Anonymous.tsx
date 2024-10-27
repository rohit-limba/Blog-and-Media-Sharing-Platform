"use client";
import { ForumCard } from "@/components/ForumCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useEffect, useState } from "react";
import axios from "axios";
import { DotLoader } from "react-spinners";
import { Badge } from "@/components/ui/badge";

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

const NonAnonymous = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/posts/nonanonymous")
      .then((response) => {
        setPosts(response.data.nonanonymousPosts);
      })
      .catch((error) => {
        console.log("Error Fetching Posts", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <DotLoader color="#ffffff" size={60} speedMultiplier={1} />
      </div>
    );
  }

  if (!posts?.length) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Badge>Oops No posts yet!</Badge>
      </div>
    );
  }

  return (
    <ScrollArea className="h-screen w-full flex items-center justify-center rounded-md mt-4">
      <div className=" flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center space-y-2">
          {posts?.map((item: Post) => (
            <ForumCard
              key={item.id}
              src={item.src}
              category={item.category}
              username={item.username}
              content={item.content}
              createdAt={item.createdAt}
              userId={item.userId}
              id={item.id}
              setPosts={setPosts}
            />
          ))}
        </div>
      </div>
    </ScrollArea>
  );
};

export default NonAnonymous;
