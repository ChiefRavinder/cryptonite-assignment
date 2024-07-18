import { ThemeProvider } from "next-themes";
import ThemeToggle from "@/components/ThemeToggler/ThemeToggler";
import CoinsList from "@/components/CoinsList/CoinsList";
export default function Home() {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <div className="text-black dark:text-white">welcome</div>
      <ThemeToggle></ThemeToggle>
      <CoinsList />
    </ThemeProvider>
  );
}
