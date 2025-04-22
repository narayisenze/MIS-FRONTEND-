"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardStats from "./DashboardStats";
import { Icon } from "@iconify/react";
import { dashboardData, overviewColors, overviewIcon } from "@/lib/data";
import PortfolioReport from "./reports-snapshot";
import LoanDistribution from "./reports-snapshot/LoanDistribution";

const page = () => {
  const responseData = dashboardData;

  return (
    <div className="space-y-6 pb-5">
      <div className="px-3">
        <h3 className="text-3xl font-semibold">Hi Snave 👋, Welcome to AMIR</h3>
      </div>
      <Card className="">
        <CardContent className="pt-6 px-6">
          <div
            className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4`}
          >
            <DashboardStats
              stats={
                responseData?.statistics?.map(
                  (stat: {
                    name: string;
                    quantity: number | string;
                    description: string;
                  }) => ({
                    name: stat?.name,
                    quantity: stat?.quantity,
                    description: stat?.description,
                    color: overviewColors(stat.name),
                    icon: (
                      <Icon
                        icon={overviewIcon(stat.name)}
                        className="w-4 h-4 text-white"
                      />
                    ),
                  })
                ) || []
              }
            />
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-12  gap-6 h-max">
        <div className="col-span-12 lg:col-span-6">
          <PortfolioReport />
        </div>
        <div className="col-span-12 lg:col-span-6 h-full">
          <Card className="h-full">
            <CardHeader className="border-none p-6 pt-5 mb-0">
              <CardTitle className="text-lg font-semibold text-default-900 p-0">
                Loan Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="dashtail-legend">
                <LoanDistribution />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default page;
