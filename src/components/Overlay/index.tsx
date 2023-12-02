import { Children, ReactNode } from "react";
import { motion, Variants } from "framer-motion";
import { useSnapshot } from "valtio";

import { storeState } from "../../stores";

const container: Variants = {
  hidden: { opacity: 0, height: 0, transition: { staggerChildren: 0.05 } },
  show: {
    opacity: 1,
    height: "auto",
    transition: { when: "beforeChildren", staggerChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: "100%" },
  show: { opacity: 1, y: 0 },
};

type Props = {
  children: ReactNode;
  open?: boolean;
};

function List({ children, open }: Props) {
  return (
    <motion.ul
      style={{
        position: "fixed",
        top: "50%",
        listStyleType: "none",
        color: "white"
      }}
      variants={container}
      initial="hidden"
      animate={open ? "show" : "hidden"}
    >
      {Children.map(children, (child) => (
        <li>
          <motion.div variants={item}>{child}</motion.div>
        </li>
      ))}
    </motion.ul>
  );
}

export function Overlay() {
  const { open } = useSnapshot(storeState);

  return (
    <List open={open}>
      <h1>Type the number to choose action:</h1>
      <h3>1. Stand and sit</h3>
      <h3>2. I purchase the product, thanks</h3>
      <h3>
        <span className="accent">3. Show me what you've got</span>
      </h3>
      <h4>4. Running Shoes</h4>
      <p className="price">5. $98.97</p>
      <p>
        6. Year after year Pegasus has proven itself on the feet of runners
        everywhere. Now our most trusted style returns with new innovations that
        make it more itself than ever. Meet the reliable, comfortable, always
        ready-to-run Nike Air Zoom Pegasus.
      </p>
    </List>
  );
}
