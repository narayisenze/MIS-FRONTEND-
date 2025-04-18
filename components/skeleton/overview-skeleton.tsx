"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const OverviewSkeleton = ({
  title,
  numberOfCards,
}: {
  title: String;
  numberOfCards: number;
}) => {
  return (
    <Card className="mt-2">
      <CardHeader className="flex-row items-center border-none mb-0">
        <CardTitle className="flex-1 text-xl font-medium text-default-900 pl-2.5">
          {title} Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 px-6">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-${numberOfCards} gap-4`}
        >
          {[...Array(numberOfCards)].map((_, index) => (
            <div key={index} className="rounded-sm p-4 w-full bg-gray-50 dark:bg-default-50">
              <div className="flex justify-between">
                <Skeleton className="w-[40%] h-4" />
                <Skeleton className="flex-none h-7 w-7 rounded-sm" />
              </div>
              <div className="flex gap-3 mt-2">
                <div className="flex-1">
                  <Skeleton className="h-8 w-[60%]" />
                  <Skeleton className="h-4 w-[80%] mt-2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OverviewSkeleton;
