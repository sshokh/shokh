import { Skeleton } from "@heroui/skeleton";
import Image from "next/image";

export default function Avatar({ image }) {
  return (
    <div className="relative inline-block">
      {image ? (
        <Image
          src={`https://cdn.discordapp.com/avatars/1002464043665195038/${image}.webp?size=4096`}
          width={300}
          height={300}
          alt="avatar"
          priority
          className="rounded-full"
        />
      ) : (
        <Skeleton className="w-[300px] h-[300px] rounded-full" />
      )}
      <Image
        src="/crown.png"
        width={80}
        height={80}
        alt="crown"
        className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/2 rotate-[40deg] z-10"
      />
    </div>
  );
}
