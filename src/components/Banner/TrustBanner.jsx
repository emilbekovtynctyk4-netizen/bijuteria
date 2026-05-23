import React from "react";
import styles from "./TrustBanner.module.css";

import {
  Truck,
  RefreshCcw,
  Wallet,
  ShieldCheck,
} from "lucide-react";

const items = [
  {
    id: 1,
    icon: <Truck size={28} />,
    title: "Бесплатная доставка",
    text: "От 1500 сом по Бишкеку",
  },
  {
    id: 2,
    icon: <RefreshCcw size={28} />,
    title: "Обмен и возврат",
    text: "В течение 14 дней",
  },
  {
    id: 3,
    icon: <Wallet size={28} />,
    title: "Удобная оплата",
    text: "Онлайн или при получении",
  },
  {
    id: 4,
    icon: <ShieldCheck size={28} />,
    title: "Поддержка 24/7",
    text: "Всегда на связи",
  },
];

const TrustBanner = () => {
  return (
    <section className={styles.banner}>
      <div className={styles.container}>
        {items.map((item) => (
          <div
            key={item.id}
            className={styles.card}
          >
            <div className={styles.icon}>
              {item.icon}
            </div>

            <div>
              <h3 className={styles.title}>
                {item.title}
              </h3>

              <p className={styles.text}>
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustBanner;