import { CalendarIcon } from "@heroicons/react/24/outline";
import { Revenue } from "@/app/lib/definitions";
import { generateYAxis } from "@/app/lib/utils";
import { lusitana } from "@/app/ui/fonts";

export default async function RevenueChart({
  revenue,
}: {
  revenue: Revenue[];
}) {
  const chartHeight = 350;

  const { yAxisLabels, topLabel } = generateYAxis(revenue);

  // If no revenue data, display a message
  if (!revenue || revenue.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }

  return (
    <div className="w-full md:col-span-4">
      <h2
        className={`${lusitana.className} mb-4 text-xl md:text-2xl text-brown-900`}
      >
        Recent Revenue
      </h2>

      <div className="rounded-xl bg-coffee-50 p-4">
        <div className="sm:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4">
          <div
            className="mb-6 hidden flex-col justify-between text-sm text-brown-400 sm:flex"
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map((label) => (
              <p key={label} className="text-brown-600">
                {label}
              </p>
            ))}
          </div>

          {revenue.map((month) => {
            // Calculate the height of each bar
            const barHeight = (chartHeight / topLabel) * month.revenue;

            // Add a minimum height for bars to be visible
            const adjustedHeight = barHeight < 10 ? 10 : barHeight; // Minimum height is 10px

            return (
              <div
                key={month.month}
                className="flex flex-col items-center gap-2"
              >
                <div
                  className="w-full rounded-md bg-gradient-to-t from-coffee-dark via-coffee-medium to-coffee-light"
                  style={{
                    height: `${adjustedHeight}px`, // Use adjusted height
                  }}
                ></div>
                <p className="-rotate-90 text-sm text-brown-500 sm:rotate-0">
                  {month.month}
                </p>
              </div>
            );
          })}
        </div>

        <div className="flex items-center pb-2 pt-6">
          <CalendarIcon className="h-5 w-5 text-brown-600" />
          <h3 className="ml-2 text-sm text-brown-600">Last 12 months</h3>
        </div>
      </div>
    </div>
  );
}
