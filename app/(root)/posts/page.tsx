"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Anonymous from "@/components/Posts/Anonymous";
import NonAnonymous from "@/components/Posts/Non-Anonymous";

const FeedPosts = () => {
  return (
    <div className="flex items-center h-screen w-full pt-5">
      <Tabs
        defaultValue="anonymous"
        className="w-full h-full flex flex-col items-center"
      >
        <TabsList className="grid w-[700px] grid-cols-2">
          <TabsTrigger value="anonymous">Anonymous</TabsTrigger>
          <TabsTrigger value="non_anonymous">Non-Anonymous</TabsTrigger>
        </TabsList>
        <TabsContent value="anonymous">
          <Anonymous />
        </TabsContent>
        <TabsContent value="non_anonymous">
          <NonAnonymous />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FeedPosts;
