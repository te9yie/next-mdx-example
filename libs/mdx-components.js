import Link from "next/link";
import { H2 } from "../components/H2";

export const components = {
  a: (props) => <Link {...props} />,
  MyH2: H2,
};
