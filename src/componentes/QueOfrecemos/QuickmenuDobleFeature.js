import React from "react";
import { motion } from "framer-motion";
import styles from "./QuickmenuDobleFeature.module.css";

const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};
const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function QuickmenuDobleFeature() {
  return (
    <section className={styles.dobleFeatureSection}>
      <motion.div
        className={styles.dobleFeatureCard}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        {/* Bloque Izquierda */}
        <motion.div
          className={styles.featureCol}
          variants={fadeLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.7 }}
        >
          <h2 className={styles.featureTitle}>
            Pedidos listos, <span className={styles.accent}>clientes felices</span>
          </h2>
          <p className={styles.featureText}>
            Avisá cuando el pedido esté listo sin perder tiempo. Con QuickMenu, la atención es clara, rápida y organizada.<br />
            <span className={styles.extraText}>Mejorá la experiencia y optimizá el flujo de trabajo en tu local.</span>
          </p>
          <div className={styles.featureImgBox}>
            <img src="/pedidolisto.png" alt="Pedido listo Quickmenu" className={styles.featureImg} />
          </div>
        </motion.div>

        {/* Bloque Derecha */}
        <motion.div
          className={styles.featureCol}
          variants={fadeRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.7 }}
        >
          <h2 className={styles.featureTitle}>
            Pagos simples, <span className={styles.accent}>sin vueltas</span>
          </h2>
          <p className={styles.featureText}>
            Olvidate de terminales lentas. Tus clientes eligen cómo pagar y vos cobrás al instante.<br />
            <span className={styles.extraText}>Con Mercado Pago, la experiencia es rápida y segura.</span>
          </p>
          <div className={styles.mercadoPagoBox}>
            <img src="/mplogo.png" alt="Mercado Pago" className={styles.mercadoPagoLogo} />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
