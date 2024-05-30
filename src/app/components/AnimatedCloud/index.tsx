import Image from "next/image";

interface Logo {
  name: string;
  url: string;
}

interface AnimatedLogoCloudProps {
  logos: Logo[];
}

const AnimatedLogoCloud = ({ logos }: AnimatedLogoCloudProps) => {
  return (
    <div className="w-full">
      <div className="mx-auto w-full px-4 md:px-8">
        <div
          className="group mt-6 flex gap-6 overflow-hidden p-2"
          style={{
            maskImage:
              "linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 95%)",
          }}
        >
          {Array(5)
            .fill(null)
            .map((_, i) => (
              <div
                key={`container-${i}`}
                className="flex shrink-0 animate-logo-cloud flex-row justify-around gap-6"
              >
                {logos?.map((logo, j) => (
                  <Image
                    key={`logo-${i}-${j}`}
                    src={logo.url}
                    className="h-10 w-28 px-2 brightness-0"
                    alt={`${logo.name}`}
                    width={10}
                    height={10}
                  />
                ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AnimatedLogoCloud;
