'use client'
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { redirect } from 'next/navigation';

export default function Home() {
  // const router = useRouter();
  useEffect(() => {
    redirect(`/ticket/${'mxUQwzymrRYgVOXR8B)OKw=='}`);
  }, []);
  return (
    <main className={styles.main}>
      <div>Redirecting ...</div>
    </main>
  );
}
