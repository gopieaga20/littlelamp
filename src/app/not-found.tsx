import Link from "next/link";
import { BookingCta } from "@/components/BookingCta";

export default function NotFound() {
  return (
    <section className="section text-center">
      <h1 className="text-4xl font-bold">Page not found</h1>
      <p className="mx-auto mt-4 max-w-md text-ink-500">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link href="/" className="btn-secondary">
          Back to Home
        </Link>
        <BookingCta />
      </div>
    </section>
  );
}
