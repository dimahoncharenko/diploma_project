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

export function CaseOverlay() {
  const { case_menu } = useSnapshot(storeState);

  return (
    <List open={case_menu}>
      <h1>Тисніть на відповідні кнопки для вибору опції:</h1>
      <h3>1. "Доброго дня"</h3>
      <h3>2. "Я купую товар, дякую"</h3>
      <h3>
        <span className="accent">3. "Покажіть що наявно у асортименті"</span>
      </h3>
    </List>
  );
}

export function ShoeOverlay() {
  const { shoe_menu } = useSnapshot(storeState);

  return (
    <List open={shoe_menu}>
      <h1>Тисніть на відповідні кнопки для вибору опції:</h1>
      <h3>1. "Доброго дня"</h3>
      <h3>2. "Я купую товар, дякую"</h3>
      <h3>
        <span className="accent">5. "Покажіть що наявно у асортименті"</span>
      </h3>
    </List>
  );
}

export function ShirtOverlay() {
  const { shirt_menu } = useSnapshot(storeState);

  return (
    <List open={shirt_menu}>
      <h1>Тисніть на відповідні кнопки для вибору опції:</h1>
      <h3>1. "Доброго дня"</h3>
      <h3>2. "Я купую товар, дякую"</h3>
      <h3>
        <span className="accent">4. "Покажіть що наявно у асортименті"</span>
      </h3>
    </List>
  );
}
