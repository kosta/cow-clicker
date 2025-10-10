import { Links, Meta, Outlet, Scripts } from "react-router";

import "@/global-styles.css";
import Spinner from "@/components/Spinner";
import { createConnectTransport } from "@connectrpc/connect-web";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TransportProvider } from "@connectrpc/connect-query";

const finalTransport = createConnectTransport({
  baseUrl: "/connect",
});

const queryClient = new QueryClient();

const CowClickerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="apple-mobile-web-app-title" content="Cow Clicker" />
        <title>Cow Clicker</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Meta />
        <Links />
      </head>

      <body>
        {children}
        <Scripts />
      </body>

    </html>
  )
}

export default function App() {
  return <TransportProvider transport={finalTransport}>
    <QueryClientProvider client={queryClient}>
      <CowClickerLayout><Outlet /></CowClickerLayout>
    </QueryClientProvider>
  </TransportProvider>
}


export function HydrateFallback() {
  return <CowClickerLayout><Spinner /></CowClickerLayout>
}
