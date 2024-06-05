import { Button } from "@/components/Button";
import { NavigationContext } from "@/context/NavigationContext";
import { errMessages } from "@/errorMessages/errMessages";
import { tabs } from "@/models/tabs";
import Image from "next/image";
import { useContext, useRef, useState } from "react";
import { Camera as ReactCamera } from "react-camera-pro";
import { GrPowerReset } from "react-icons/gr";
import { MdOutlineCamera } from "react-icons/md";

export default function Camera() {
  const camera = useRef<any>(null);
  const [image, setImage] = useState(null);
  const { setSelected } = useContext(NavigationContext);
  const { setOpenCamera } = useContext(NavigationContext);

  const handleReset = () => {
    setImage(null);
    setOpenCamera(false);
    setSelected(tabs[0].label);
  };

  const handleCamera = () => {
    const capture = camera.current.takePhoto();
    setImage(capture);
  };

  const handleSubmit = () => {
    setOpenCamera(false);
    setSelected(tabs[3].label);
  };

  return (
    <div className="mx-auto flex max-h-screen w-screen flex-col justify-center">
      {!image && (
        <ReactCamera
          ref={camera}
          errorMessages={errMessages}
          facingMode="environment"
        />
      )}
      {image && (
        <div>
          <Image src={image} alt="Photo" fill={true} />
        </div>
      )}
      <div className="fixed bottom-0 mx-auto grid w-full grid-cols-3 items-center justify-center bg-black p-8 text-center">
        <span></span>
        {!image && (
          <>
            <div className="flex justify-center">
              <MdOutlineCamera
                size={40}
                color="#FFFFFF"
                onClick={handleCamera}
              />
            </div>
            <p className="text-white" onClick={handleReset}>
              Cancel
            </p>
          </>
        )}
        {image && (
          <>
            <div className="flex justify-center">
              <GrPowerReset
                size={35}
                color="#FFFFFF"
                onClick={() => setImage(null)}
              />
            </div>
            <div>
              <Button variant="white" onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
