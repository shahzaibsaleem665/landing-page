"use client";
import Head from "next/head";
import { motion } from "framer-motion";
import { useRef } from "react";
import styles from "../styles/pages/page.module.scss";
import {
  FaLock,
  FaHandsHelping,
  FaUserShield,
  FaGlobe,
  FaFilter,
  FaCrown,
  FaStar,
  FaDoorOpen,
  FaHeart,
  FaFire,
  FaHandshake,
  FaArrowDown,
  FaFacebook,
  FaTiktok,
  FaInstagram,
  FaUsers,
  FaTransgender,
  FaUserFriends,
} from "react-icons/fa";
import Form from "@/Form/Form";
import { useEffect, useState } from "react";
import { db } from "@/util/firebase";
import firebase from "firebase/compat/app";
import Image from "next/image";
import logo from "../images/logo.svg";
import BackToTop from "@/components/BackToTop";

const LandingPage = () => {
  const [counters, setCounters] = useState({
    members: 130,
    categories: 100,
    dailySignups: 10,
  });

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

  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Head>
        <title>Common Secs | Connect in Private Chatrooms</title>

        <meta
          name="description"
          content="Join the ultimate adult-only community. Explore fetishes, BDSM, FWB, and more in private chatrooms. Secure, verified, and respectful."
        />

        <meta
          name="keywords"
          content="adult chat, BDSM chatrooms, fetishes community, private chatrooms, 18+ verified chats, secure adult platform, adult-only community, FWB chatrooms, exclusive online chats, respectful adult connections, Common Secs chat, adult chat network, online BDSM discussions, private fetish communities, Australian dating app, alternative dating app, safe adult dating, open-minded community, adult chat app Australia, online dating for adults, private message platform, discreet online dating, exclusive adult chat rooms, adult social networking, open-minded dating, secure online connections, alternative lifestyle chats, LGBTQ+ private rooms"
        />
        <meta
          name="google-site-verification"
          content="lFgs7SkVAWxPwqqXS3eac901aAGMbEPoV8Ue5HGOAOQ"
        />
        <meta name="author" content="Common Secs" />
      </Head>

      <main className={styles.landingPage}>
        <div className={styles.logoWrapper}>
          <Image src={logo} alt="Logo" className={styles.logo} />
        </div>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <motion.h1
              className={styles.heroHeading}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Unlock Your Desires in <span>Private Chatrooms</span>
            </motion.h1>
            <motion.p
              className={styles.heroSubheading}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Connect with like-minded adults in a safe, secure, and discreet
              environment.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.button
                className={styles.cta}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToForm}
              >
                Join the Beta Now
                <FaArrowDown className={styles.ctaIcon} />
              </motion.button>
            </motion.div>
          </div>
          <div className={styles.heroPattern}></div>
        </section>

        {/* Stats Section */}
        <section className={styles.stats}>
          <div className={styles.statsContainer}>
            <h2 className={styles.statsHeading}>
              Join the New Dating experience
            </h2>
            <p className={styles.statsSubheading}>
              Be part of our growing community of open-minded individuals
            </p>
            <div className={styles.statsContent}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>100+</span>
                <p className={styles.statLabel}>Chatrooms</p>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>
                  {" "}
                  {counters.members.toLocaleString()}+
                </span>
                <p className={styles.statLabel}>Members</p>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>100%</span>
                <p className={styles.statLabel}>Privacy Guaranteed</p>
              </div>
            </div>
          </div>
        </section>

        {/* Early Access Form Section */}
        <section className={styles.formSection} ref={formRef}>
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>Get Early Access</h2>
            <p className={styles.formSubtitle}>
              Join our beta program and get exclusive features
            </p>
          </div>
          <div className={styles.formContainer}>
            <Form />
          </div>
        </section>
        {/* Why Join Now? */}
        <section className={styles.cardSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.cardSectionHeading}>Why Join Now?</h2>
            <p className={styles.sectionSubheading}>
              Exclusive benefits for our early community members
            </p>
          </div>
          <div className={styles.cardSectionGrid}>
            <motion.div className={styles.card} whileHover={{ y: -5 }}>
              <div className={styles.cardIcon}>
                <FaDoorOpen size={24} />
              </div>
              <h3 className={styles.cardTitle}>Exclusive Early Access</h3>
              <p className={styles.cardDescription}>
                Get first dibs on private rooms and new features before public
                release.
              </p>
            </motion.div>
            <motion.div className={styles.card} whileHover={{ y: -5 }}>
              <div className={styles.cardIcon}>
                <FaStar size={24} />
              </div>
              <h3 className={styles.cardTitle}>Member-Only Perks</h3>
              <p className={styles.cardDescription}>
                Special tools, customizations, and badges for verified users.
              </p>
            </motion.div>
            <motion.div className={styles.card} whileHover={{ y: -5 }}>
              <div className={styles.cardIcon}>
                <FaCrown size={24} />
              </div>
              <h3 className={styles.cardTitle}>Free membership</h3>
              <p className={styles.cardDescription}>
                Enjoy 2-months free premium membership when join Beta.
              </p>
            </motion.div>
            <motion.div className={styles.card} whileHover={{ y: -5 }}>
              <div className={styles.cardIcon}>
                <FaUsers size={24} />
              </div>
              <h3 className={styles.cardTitle}>Inclusive Spaces</h3>
              <p className={styles.cardDescription}>
                Safe rooms for LGBTQ+, non-binary, and all gender identities.
              </p>
            </motion.div>
            <motion.div className={styles.card} whileHover={{ y: -5 }}>
              <div className={styles.cardIcon}>
                <FaHandshake size={24} />
              </div>
              <h3 className={styles.cardTitle}>Community First</h3>
              <p className={styles.cardDescription}>
                Your voice helps shape features and policies from day one.
              </p>
            </motion.div>
            <motion.div className={styles.card} whileHover={{ y: -5 }}>
              <div className={styles.cardIcon}>
                <FaGlobe size={24} />
              </div>
              <h3 className={styles.cardTitle}>Global Reach</h3>
              <p className={styles.cardDescription}>
                Connect with diverse people worldwide — every identity, every
                background.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Features That Set Us Apart */}
        <section className={`${styles.cardSection} ${styles.darkBg}`}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.cardSectionHeading}>
              Features That Set Us Apart
            </h2>
            <p className={styles.sectionSubheading}>
              Designed for privacy, security, and authentic connections
            </p>
          </div>
          <div className={styles.cardSectionGrid}>
            <motion.div className={styles.card} whileHover={{ y: -5 }}>
              <div className={styles.cardIcon}>
                <FaLock size={24} />
              </div>
              <h3 className={styles.cardTitle}>Private Chatrooms</h3>
              <p className={styles.cardDescription}>
                One-on-one or themed groups — always encrypted and private.
              </p>
            </motion.div>
            <motion.div className={styles.card} whileHover={{ y: -5 }}>
              <div className={styles.cardIcon}>
                <FaUserShield size={24} />
              </div>
              <h3 className={styles.cardTitle}>18+ Verified Only</h3>
              <p className={styles.cardDescription}>
                Strict age verification keeps our community safe and respectful.
              </p>
            </motion.div>
            <motion.div className={styles.card} whileHover={{ y: -5 }}>
              <div className={styles.cardIcon}>
                <FaFilter size={24} />
              </div>
              <h3 className={styles.cardTitle}>Smart Filters</h3>
              <p className={styles.cardDescription}>
                Advanced matching by kinks, tags, preferences, and
                compatibility.
              </p>
            </motion.div>
            <motion.div className={styles.card} whileHover={{ y: -5 }}>
              <div className={styles.cardIcon}>
                <FaHandsHelping size={24} />
              </div>
              <h3 className={styles.cardTitle}>Peer Support Rooms</h3>
              <p className={styles.cardDescription}>
                Find support and talk freely in community-led, moderated spaces.
              </p>
            </motion.div>
            <motion.div className={styles.card} whileHover={{ y: -5 }}>
              <div className={styles.cardIcon}>
                <FaTransgender size={24} />
              </div>
              <h3 className={styles.cardTitle}>Identity Respect</h3>
              <p className={styles.cardDescription}>
                Customize pronouns, identities, and how you show up — no
                assumptions.
              </p>
            </motion.div>
            <motion.div className={styles.card} whileHover={{ y: -5 }}>
              <div className={styles.cardIcon}>
                <FaUserFriends size={24} />
              </div>
              <h3 className={styles.cardTitle}>Community Moderation</h3>
              <p className={styles.cardDescription}>
                Empowered users with tools to maintain a welcoming, safe
                environment.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Explore Your Interests */}
        <section className={styles.cardSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.cardSectionHeading}>
              Explore Your Interests
            </h2>
            <p className={styles.sectionSubheading}>
              Discover chatrooms and communitites that match your desires
            </p>
          </div>
          <div className={styles.cardSectionGrid}>
            {/* Dating Card */}
            <motion.div className={styles.categoryCard} whileHover={{ y: -5 }}>
              <div className={styles.cardFront}>
                <div className={styles.cardIcon}>
                  <FaHeart size={24} />
                </div>
                <h3 className={styles.cardTitle}>Dating</h3>
                <p className={styles.cardDescription}>
                  Find romantic and long-term partners.
                </p>
              </div>
              <div className={styles.cardHoverContent}>
                <ul>
                  <li>Serious Dating</li>
                  <li>Queer Dating</li>
                  <li>Poly Connections</li>
                  <li>Long-Term Relationships</li>
                  <li>Virtual Romance</li>
                </ul>
              </div>
            </motion.div>

            {/* Friendship Card */}
            <motion.div className={styles.categoryCard} whileHover={{ y: -5 }}>
              <div className={styles.cardFront}>
                <div className={styles.cardIcon}>
                  <FaUserFriends size={24} />
                </div>
                <h3 className={styles.cardTitle}>Friendship</h3>
                <p className={styles.cardDescription}>
                  Make meaningful connections without pressure.
                </p>
              </div>
              <div className={styles.cardHoverContent}>
                <ul>
                  <li>Support Groups</li>
                  <li>Activity Buddies</li>
                  <li>Safe Socials</li>
                  <li>LGBTQ+ Circles</li>
                  <li>Shared Interests</li>
                </ul>
              </div>
            </motion.div>

            {/* Casual Fun Card */}
            <motion.div className={styles.categoryCard} whileHover={{ y: -5 }}>
              <div className={styles.cardFront}>
                <div className={styles.cardIcon}>
                  <FaFire size={24} />
                </div>
                <h3 className={styles.cardTitle}>Casual Fun</h3>
                <p className={styles.cardDescription}>
                  Explore fantasies, kinks, and playful vibes.
                </p>
              </div>
              <div className={styles.cardHoverContent}>
                <ul>
                  <li>No Strings Attached</li>
                  <li>BDSM</li>
                  <li>Kink & Fetish</li>
                  <li>Friends with benefits</li>
                  <li>Roleplay</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaHeading}>Ready to Join?</h2>
            <p className={styles.ctaText}>
              Don&apos;t miss your chance to be part of our exclusive beta
              community.
            </p>

            <motion.button
              className={styles.cta}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToForm}
            >
              Join the Beta Now
            </motion.button>
          </div>
        </section>
        <BackToTop />
        {/* Footer */}
        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <div className={styles.footerBrand}>
              <h3 className={styles.footerLogo}>Common Secs</h3>
              <p className={styles.footerTagline}>
                Find people like you, for you!
              </p>
            </div>
            <div className={styles.footerLinks}>
              <p className={styles.footerText}>Follow us on:</p>
              <div className={styles.socialLinks}>
                <a
                  href="https://www.instagram.com/commonsecs/"
                  className={styles.socialLink}
                  aria-label="Instagram"
                >
                  <FaInstagram size={20} />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61575503165254"
                  className={styles.socialLink}
                  aria-label="Twitter"
                >
                  <FaFacebook size={20} />
                </a>
                <a
                  href="https://www.tiktok.com/@commonsecs1"
                  className={styles.socialLink}
                  aria-label="Discord"
                >
                  <FaTiktok size={20} />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
};

export default LandingPage;
