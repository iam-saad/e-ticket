'use client';

import styles from './page.module.css';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
	const router = useRouter();

	useEffect(() => {
		router.push(`/ticket/${'mxUQwzymrRYgVOXR8B)OKw=='}`);
	}, [router]);
  
	return (
		<main className={styles.main}>
			<div>Redirecting ...</div>
		</main>
	);
}
