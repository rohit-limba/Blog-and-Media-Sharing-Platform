"use client";
import { CreatePost } from "@/components/CreatePost";
import { ForumCard } from "@/components/ForumCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import axios from "axios";
import { DotLoader } from "react-spinners";
import { useSession } from "next-auth/react";

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

const Feed = () => {
  const { status, data } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/feed")
      .then((response) => {
        setPosts(response.data.posts);
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
      <div className="w-screen h-full flex items-center justify-center">
        <DotLoader color="#ffffff" size={60} speedMultiplier={1} />
      </div>
    );
  }

  return (
    <div className="h-screen w-full">
      <ScrollArea className="h-full w-full flex items-center justify-center rounded-md p-4">
        <div className="p-4 flex flex-col items-center">
          {status === "authenticated" && (
            <div className="flex flex-col w-full items-center justify-center">
              <div className="w-[700px] space-y-4 m-6">
                <h2 className=" text-2xl">Hello {data.user?.email}</h2>
                <p className=" text-sm text-muted-foreground">
                  How are you doing today? Would you like to share something
                  with the community! 🤗
                </p>
              </div>
              <CreatePost setPosts={setPosts} />
            </div>
          )}
          <div className="flex flex-col items-center justify-center space-y-2 mt-3">
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
    </div>
  );
};

export default Feed;
