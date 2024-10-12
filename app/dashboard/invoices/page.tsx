import LatestInvoices from "@/app/ui/dashboard/latest-invoices";
import { fetchLatestInvoices } from "@/app/lib/data";
import { lusitana } from "@/app/ui/fonts";

export default async function Page() {
  const latestInvoices = await fetchLatestInvoices();

  return (
    <main>
      <h1
        className={`${lusitana.className} mb-4 text-xl md:text-xl md:text-2x1`}
      ></h1>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <LatestInvoices latestInvoices={latestInvoices} />
      </div>
    </main>
  );
}
