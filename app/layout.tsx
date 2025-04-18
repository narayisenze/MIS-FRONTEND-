import { siteConfig } from "@/config/site";
import AuthProvider from "@/provider/auth.provider";
import Providers from "@/provider/providers";
import TanstackProvider from "@/provider/providers.client";
import "flatpickr/dist/themes/light.css";
import "simplebar-react/dist/simplebar.min.css";
import "./assets/scss/globals.scss";
import "./assets/scss/theme.scss";

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <AuthProvider>
        <TanstackProvider>
          <Providers>{children}</Providers>
        </TanstackProvider>
      </AuthProvider>
    </html>
  );
}
