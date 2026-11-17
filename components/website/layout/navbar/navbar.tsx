import { getMenu } from "@/data/menu";
import NavbarClient from "./navbar-client";

export default async function Navbar() {
  const menu = await getMenu();

  // TODO: cartCount aur wishlistCount ko apne store / API se connect karein
  return <NavbarClient menu={menu} cartCount={2} wishlistCount={2} />;
}