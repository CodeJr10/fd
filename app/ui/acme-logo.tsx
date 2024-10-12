import Image from "next/image";
import logoImage from "./logo.jpeg"; // Importing the image
import { lusitana } from "@/app/ui/fonts";

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-black`}
    >
      {/* Custom logo image */}
      <Image
        src={logoImage} // Use the imported image
        alt="Ettarra Cafe House Logo"
        className="h-12 w-12"
        width={70} // Width of the image
        height={70} // Height of the image
      />
    </div>
  );
}
