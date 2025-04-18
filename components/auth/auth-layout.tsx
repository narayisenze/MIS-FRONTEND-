"use client";
import background from "@/public/images/auth/line.png";
import Image from "next/image";
import { Fragment, ReactNode } from "react";
import { AmirLogo } from "../svg";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Fragment>
      <div className="min-h-screen bg-background  flex items-center  overflow-hidden w-full">
        <div className="min-h-screen basis-full flex flex-wrap w-full  justify-center overflow-y-auto">
          <div
            className="basis-1/2 bg-success-70 w-full  relative hidden xl:flex justify-center items-center bg-gradient-to-br
          from-success-700 via-success to-success-700
         "
          >
            <Image
              src={background}
              alt="image"
              className="absolute top-0 left-0 w-full h-full "
            />
            <div className="relative z-10 backdrop-blur bg-primary-foreground/40 2xl:py-[84px] px-8 rounded max-w-[640px] flex items-center justify-center">
              <div className="flex gap-10 items-center">
                <div className="">
                  <AmirLogo />
                </div>
                <div>
                  <div className="text-4xl leading-[50px] 2xl:text-6xl 2xl:leading-[72px] font-semibold">
                    <span className="text-default-900">
                      AMIR
                    </span>
                  </div>
                  <div className="mt-2 2xl:mt-3 text-default-900  text-2xl font-medium uppercase">
                    Association of Microfinance institutions in Rwanda
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className=" min-h-screen basis-full md:basis-1/2 w-full px-4 py-5 flex justify-center items-center">
            <div className="lg:w-[480px] ">{children}</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AuthLayout;
