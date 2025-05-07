"use client";
import { useState } from "react";
import { db } from "@/util/firebase";
import { Timestamp } from "firebase/firestore";
import styles from "../styles/components/Form.module.scss";

export default function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [isAdult, setIsAdult] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !gender || !isAdult) {
      setError("Please fill all fields and confirm you are 18+");
      return;
    }

    setIsSubmitting(true);

    try {
      const snapshot = await db
        .collection("earlyAccess")
        .where("email", "==", email)
        .get();

      if (!snapshot.empty) {
        setError("This email is already registered.");
        return;
      }

      await db.collection("earlyAccess").add({
        name,
        email,
        gender,
        isAdult,
        submittedAt: Timestamp.now(),
      });
      setIsSuccess(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error("Error adding document: ", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.form}>
      {isSuccess ? (
        <div className={styles.form__success}>
          <svg
            className={styles.form__successIcon}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
              clipRule="evenodd"
            />
          </svg>
          <h3 className={styles.form__successTitle}>Thank you!</h3>
          <p className={styles.form__privacy}>
            We respect your privacy. Your information is secure and will only be
            used for communication related to early access.
          </p>

          <button
            onClick={() => setIsSuccess(false)}
            className={styles.form__successButton}
          >
            Back to form
          </button>
        </div>
      ) : (
        <>
          <h3 className={styles.form__title}>Join Early Access</h3>
          <p className={styles.form__subtitle}>
            Be the first to experience our new chat platform
          </p>

          <form onSubmit={handleSubmit} className={styles.form__container}>
            <div className={styles.form__group}>
              <label htmlFor="name" className={styles.form__label}>
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles.form__input}
                placeholder="Your name"
                disabled={isSubmitting}
              />
            </div>

            <div className={styles.form__group}>
              <label htmlFor="email" className={styles.form__label}>
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.form__input}
                placeholder="your@email.com"
                disabled={isSubmitting}
              />
            </div>

            <div className={styles.form__group}>
              <label htmlFor="gender" className={styles.form__label}>
                Gender
                <span className={styles.form__tooltip}>
                  ⓘ
                  <span className={styles.form__tooltipText}>
                    We ask for your gender to help build a more inclusive and
                    relevant experience during beta.
                  </span>
                </span>
              </label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className={styles.form__input}
                disabled={isSubmitting}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non-binary">Non-binary</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>

            <div className={styles.form__checkboxGroup}>
              <input
                type="checkbox"
                id="adult"
                checked={isAdult}
                onChange={(e) => setIsAdult(e.target.checked)}
                className={styles.form__checkbox}
                disabled={isSubmitting}
              />
              <label htmlFor="adult" className={styles.form__checkboxLabel}>
                I confirm I am 18 years old or above
              </label>
            </div>

            {error && <p className={styles.form__error}>{error}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`${styles.form__button} ${
                isSubmitting ? styles["form__button--loading"] : ""
              }`}
            >
              {isSubmitting ? (
                <>
                  <span className={styles.form__buttonSpinner} />
                  Processing...
                </>
              ) : (
                "Join Early Access"
              )}
            </button>
          </form>

          <p className={styles.form__privacy}>
            We respect your privacy. Your information is secure and will only be
            used for communication related to early access.
          </p>
        </>
      )}
    </div>
  );
}
