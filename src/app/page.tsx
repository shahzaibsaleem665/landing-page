"use client";
import Form from "@/Form/Form";
import styles from "../styles/pages/page.module.scss";
import { useEffect, useState } from "react";
import { db } from "@/util/firebase";
import firebase from "firebase/compat/app";
import Image from "next/image";
import logo from "../images/logo.png";
export default function Home() {
  const [counters, setCounters] = useState({
    members: 130,
    categories: 100,
    dailySignups: 10,
  });

  const [showLogo, setShowLogo] = useState(true);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setShowLogo(true);
      } else {
        setShowLogo(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Run on mount in case the page is not at top initially
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    const unsubscribeTotal = db
      .collection("earlyAccess")
      .onSnapshot((snapshot) => {
        setCounters((prev) => ({
          ...prev,
          members: 130 + snapshot.size,
        }));
      });

    const getSydneyStartOfDay = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-AU", {
        timeZone: "Australia/Sydney",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });

      const parts = formatter.formatToParts(now);
      const day = parts.find((p) => p.type === "day")?.value;
      const month = parts.find((p) => p.type === "month")?.value;
      const year = parts.find((p) => p.type === "year")?.value;

      return new Date(`${year}-${month}-${day}T00:00:00+11:00`);
    };

    const unsubscribeDaily = db
      .collection("earlyAccess")
      .where(
        "createdAt",
        ">",
        firebase.firestore.Timestamp.fromDate(getSydneyStartOfDay())
      )
      .onSnapshot((snapshot) => {
        setCounters((prev) => ({
          ...prev,
          dailySignups: 10 + snapshot.size,
        }));
      });

    return () => {
      unsubscribeTotal();
      unsubscribeDaily();
    };
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.betaBadge}>
        <span>Beta Testing</span>
        <div className={styles.pulseDot}></div>
      </div>
      <div
        className={`${styles.logoWrapper} ${
          showLogo ? styles.logoVisible : styles.logoHidden
        }`}
      >
        <Image src={logo} alt="Logo" className={styles.logo} />
      </div>

      <section className={`${styles.hero} ${styles.fullWidthSection}`}>
        <div className={styles.sectionContent}>
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>
                <span className={styles.titleHighlight}>Find People</span> Like
                you, for you!
              </h1>
              <p className={styles.tagline}>
                Common Secs — Where connections begin anonymously
              </p>

              <div className={styles.verificationBanner}>
                <div className={styles.verificationContent}>
                  <span className={styles.verificationIcon}>🔞</span>
                  <p>
                    Strictly 18+ — ID verified for real, respectful adult chat
                  </p>
                </div>
              </div>

              <p className={styles.heroSubtitle}>
                Join {counters.members.toLocaleString()}+ verified members in
                our {counters.categories}+ themed chatrooms
              </p>

              <ul className={styles.perksList}>
                <li>
                  <span className={styles.perkIcon}>🚀</span>
                  <span>
                    <strong>Early Access Benefits</strong> - Get exclusive
                    features for free during beta
                  </span>
                </li>
                <li>
                  <span className={styles.perkIcon}>💎</span>
                  <span>
                    <strong>Exclusive Perks</strong> - Special profile badges
                    for early joining members
                  </span>
                </li>
                <li>
                  <span className={styles.perkIcon}>🎁</span>
                  <span>
                    <strong>Free Membership</strong> - Receive free premium
                    membership for 2-months when officially launched
                  </span>
                </li>
              </ul>

              <div className={styles.heroButtons}>
                <a href="#signup" className={styles.primaryButton}>
                  Join Free
                </a>
                <a href="#features" className={styles.secondaryButton}>
                  Explore Features
                </a>
              </div>
            </div>
            <div className={styles.heroForm} id="signup">
              <Form />
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.statsBanner} ${styles.fullWidthSection}`}>
        <div className={styles.sectionContent}>
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>
                {counters.members.toLocaleString()}+
              </span>
              <span className={styles.statLabel}>Testers Joined</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{counters.categories}+</span>
              <span className={styles.statLabel}>Chatroom Categories</span>
            </div>
          </div>
        </div>
      </section>

      <section
        className={`${styles.section} ${styles.fullWidthSection}`}
        id="features"
      >
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>Discover Our Features</h2>
          <p className={styles.sectionSubtitle}>
            Everything you need for safe, meaningful connections
          </p>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🌈</div>
              <h3>All Genders Welcome</h3>
              <p>
                Inclusive space welcoming all identities with zero tolerance for
                discrimination
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>💬</div>
              <h3>Chatroom Style</h3>
              <p>
                Engage in themed group conversations based on shared interests
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🕵️</div>
              <h3>Anonymous Chatting</h3>
              <p>
                Stay anonymous until you&rsquo;re ready to reveal your identity
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🔞</div>
              <h3>18+ Only</h3>
              <p>Age-verified community with adult-friendly features</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>✅</div>
              <h3>No Fake Profiles</h3>
              <p>Mandatory verification ensures real people only</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>💎</div>
              <h3>Premium and above Features</h3>
              <p>Exclusive perks for members who want enhanced experiences</p>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.sectionDark} ${styles.fullWidthSection}`}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>Why Choose Common Secs?</h2>
          <p className={styles.sectionSubtitle}>
            The platform designed for authentic connections
          </p>
          <div className={styles.benefitsGrid}>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>🔒</div>
              <h3>Privacy First</h3>
              <p>
                We prioritize your privacy with end-to-end encryption and
                anonymous options
              </p>
            </div>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>🤝</div>
              <h3>Quality Connections</h3>
              <p>
                Verified members mean more meaningful conversations and
                relationships
              </p>
            </div>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>⚡</div>
              <h3>No Time Wasted</h3>
              <p>
                Skip the small talk with interest-based matching and themed
                chatrooms
              </p>
            </div>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>🛡️</div>
              <h3>Safe Environment</h3>
              <p>
                Strict moderation and reporting tools keep the community
                respectful
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.ctaSection} ${styles.fullWidthSection}`}>
        <div className={styles.sectionContent}>
          <div className={styles.ctaGrid}>
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>
                Ready to <span className={styles.titleHighlight}>Connect</span>?
              </h2>
              <p className={styles.ctaSubtitle}>
                Join {counters.members.toLocaleString()}+ people who found their
                community today
              </p>
              <div className={styles.trustBadges}>
                <div className={styles.trustItem}>🔞 18+ Verified</div>
                <div className={styles.trustItem}>🔒 Secure Chats</div>
                <div className={styles.trustItem}>🚀 Early Access Perks</div>
              </div>
            </div>
            <div className={styles.ctaForm}>
              <Form />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
