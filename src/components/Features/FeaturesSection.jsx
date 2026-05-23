import React from "react";
import styles from "./FeaturesSection.module.css";

import {
  Gem,
  Truck,
  Gift,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    id: 1,
    icon: <Gem size={34} />,
    title: "Качественная бижутерия",
    text: "Стильные украшения высокого качества для любого образа.",
  },
  {
    id: 2,
    icon: <Truck size={34} />,
    title: "Доставка 1-2 дня",
    text: "Быстрая доставка по Бишкеку и ближайшим регионам.",
  },
  {
    id: 3,
    icon: <Gift size={34} />,
    title: "Подарочная упаковка",
    text: "Каждый заказ красиво упакован и готов к подарку.",
  },
  {
    id: 4,
    icon: <ShieldCheck size={34} />,
    title: "Гипоаллергенно",
    text: "Безопасные материалы и комфортное ношение каждый день.",
  },
];

const FeaturesSection = () => {
  return (
    <section className={styles.features}>
      <div className={styles.container}>
        {features.map((item) => (
          <div key={item.id} className={styles.card}>
            <div className={styles.icon}>
              {item.icon}
            </div>

            <h3 className={styles.title}>
              {item.title}
            </h3>

            <p className={styles.text}>
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;