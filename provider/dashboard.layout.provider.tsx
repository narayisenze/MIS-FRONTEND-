"use client";
import HeaderSearch from "@/components/header-search";
import LayoutLoader from "@/components/layout-loader";
import Footer from "@/components/partials/footer";
import Header from "@/components/partials/header";
import Sidebar from "@/components/partials/sidebar";
import MobileSidebar from "@/components/partials/sidebar/mobile-sidebar";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";
import { useSidebar, useThemeStore } from "@/store";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import React from "react";

const DashBoardLayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const { collapsed, sidebarType, setCollapsed, subMenu } = useSidebar();
  const [open, setOpen] = React.useState(false);
  const { layout } = useThemeStore();
  const location = usePathname();
  const isMobile = useMediaQuery("(min-width: 768px)");
  const mounted = useMounted();
  if (!mounted) {
    return <LayoutLoader />;
  }
  if (layout === "semibox") {
    return (
      <>
        <Header handleOpenSearch={() => setOpen(true)} />
        <Sidebar />

        <div
          className={cn("content-wrapper transition-all duration-150 ", {
            "xl:ml-[182px]": collapsed,
            "xl:ml-[272px]": !collapsed,
          })}
        >
          <div
            className={cn(
              "pt-6 pb-8 px-4  page-min-height-semibox ",

            )}
          >
            <div className="mx-4">
              <LayoutWrapper
                isMobile={isMobile}
                setOpen={setOpen}
                open={open}
                location={location}
              >
                {children}
              </LayoutWrapper>
            </div>
          </div>
        </div>
        <Footer handleOpenSearch={() => setOpen(true)} />
      </>
    );
  }
  if (layout === "horizontal") {
    return (
      <>
        <Header handleOpenSearch={() => setOpen(true)} />

        <div className={cn("content-wrapper transition-all duration-150 ")}>
          <div
            className={cn(
              "  pt-6 px-6 pb-8  page-min-height-horizontal ",
              {}
            )}
          >
            <LayoutWrapper
              isMobile={isMobile}
              setOpen={setOpen}
              open={open}
              location={location}
            >
              {children}
            </LayoutWrapper>
          </div>
        </div>
        <Footer handleOpenSearch={() => setOpen(true)} />
      </>
    );
  }

  if (sidebarType !== "module") {
    return (
      <>
        <Header handleOpenSearch={() => setOpen(true)}  />
        <Sidebar  />

        <div
          className={cn("content-wrapper transition-all duration-150 ", {
            "xl:ml-[248px]": !collapsed,
            "xl:ml-[82px]": collapsed,
          })}
        >
          <div
            className={cn(
              "mx-4  pt-6 px-6 pb-8  page-min-height ",
              {}
            )}
          >
            <LayoutWrapper
              isMobile={isMobile}
              setOpen={setOpen}
              open={open}
              location={location}
            >
              {children}
            </LayoutWrapper>
          </div>
        </div>
        <Footer handleOpenSearch={() => setOpen(true)} />
      </>
    );
  }
  return (
    <>
      <Header handleOpenSearch={() => setOpen(true)}  />
      <Sidebar  />

      <div
        className={cn("content-wrapper transition-all duration-150 ", {
          "xl:ml-[300px]": !collapsed,
          "xl:ml-[72px]": collapsed,
        })}
      >
        <div
          className={cn(
            " layout-padding px-6 pt-6  page-min-height ",

          )}
        >
          <LayoutWrapper
            isMobile={isMobile}
            setOpen={setOpen}
            open={open}
            location={location}
          >
            {children}
          </LayoutWrapper>
        </div>
      </div>
      <Footer handleOpenSearch={() => setOpen(true)} />
    </>
  );
};

export default DashBoardLayoutProvider;

const LayoutWrapper = ({ children, isMobile, setOpen, open, location }: { children: React.ReactNode, isMobile: boolean, setOpen: any, open: boolean, location: any }) => {
  return (
    <>
      <motion.div
        key={location}
        initial="pageInitial"
        animate="pageAnimate"
        exit="pageExit"
        variants={{
          pageInitial: {
            opacity: 0,
            y: 50,
          },
          pageAnimate: {
            opacity: 1,
            y: 0,
          },
          pageExit: {
            opacity: 0,
            y: -50,
          },
        }}
        transition={{
          type: "tween",
          ease: "easeInOut",
          duration: 0.5,
        }}
      >
        <main className="">{children}</main>
      </motion.div>

      <MobileSidebar className="left-[300px]" />
      <HeaderSearch open={open} setOpen={setOpen} />
    </>
  );
};
