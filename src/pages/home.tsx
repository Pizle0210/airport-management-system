import FlightManagement from "@/components/flight-list";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div
      className={cn(
        `w-[min(100%,80rem)] py-14 lg:py-24 px-5 lg:px-10 flex justify-center mx-auto `
      )}
    >
      <div className="flex flex-col gap-20">
        <div>
          <img
            src="https://cdn.pixabay.com/photo/2019/06/27/06/49/plane-4301615_1280.png"
            alt="brand image"
            className=" rounded border border-spacing-4 aspect-video"
          />
        </div>
        <FlightManagement />
      </div>
    </div>
  );
}
