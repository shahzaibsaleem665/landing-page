// src/app/page.tsx
import Form from "@/Form/Form";
import styles from "../styles/pages/page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.hero__content}>
          <h1 className={styles.hero__title}>
            Connect{" "}
            <span className={styles.hero__titleHighlight}>Authentically</span>
          </h1>
          <p className={styles.hero__subtitle}>
            The next-gen chat platform where real conversations happen
          </p>
          <div className={styles.hero__buttons}>
            <a href="#signup" className={styles.hero__cta}>
              Join Early Access
            </a>
            <a href="#features" className={styles.hero__secondary}>
              Learn More
            </a>
          </div>
        </div>
        <div className={styles.hero__form} id="signup">
          <Form />
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.section} id="features">
        <h2 className={styles.section__title}>Why You'll Love It</h2>
        <div className={styles.features}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🔒</div>
            <h3>Verified Community</h3>
            <p>No bots or fake profiles - everyone is identity-verified</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>💬</div>
            <h3>Topic-Based Chatrooms</h3>
            <p>Join communities that match your interests</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🎭</div>
            <h3>Multiple Personas</h3>
            <p>Show different sides of yourself in different rooms</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className={styles.section}>
        <h2 className={styles.section__title}>How It Works</h2>
        <div className={styles.steps}>
          <div className={styles.step}>
            <div className={styles.stepNumber}>1</div>
            <h3>Sign Up</h3>
            <p>Quick verification process</p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>2</div>
            <h3>Set Your Interests</h3>
            <p>We'll suggest relevant chatrooms</p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>3</div>
            <h3>Start Connecting</h3>
            <p>Jump into conversations instantly</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={styles.section}>
        <h2 className={styles.section__title}>What Early Users Say</h2>
        <div className={styles.testimonials}>
          <div className={styles.testimonial}>
            <p>"Finally a chat app where I feel safe to be myself"</p>
            <div className={styles.testimonialAuthor}>- Jamie, 28</div>
          </div>
          <div className={styles.testimonial}>
            <p>"The verification makes all the difference in quality"</p>
            <div className={styles.testimonialAuthor}>- Alex, 32</div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className={styles.ctaSection}>
        <h2>Ready for Better Conversations?</h2>
        <p>Join our early access list today</p>
        <div className={styles.ctaForm}>
          <Form />
        </div>
      </section>
    </main>
  );
}
