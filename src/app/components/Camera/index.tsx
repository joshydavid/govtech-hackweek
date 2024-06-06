import { Button } from "@/components/Button";
import { NavigationContext } from "@/context/NavigationContext";
import { errMessages } from "@/errorMessages/errMessages";
import { tabs } from "@/models/tabs";
import Image from "next/image";
import { useContext, useRef, useState } from "react";
import { Camera as ReactCamera } from "react-camera-pro";
import { RxCross1 } from "react-icons/rx";

import { backendAxiosPost } from "@/api";
import { type PutBlobResult } from "@vercel/blob";

export default function Camera() {
  const camera = useRef<any>(null);
  const [image, setImage] = useState(null);
  const { setCapturedImage } = useContext(NavigationContext);
  const { setSelected } = useContext(NavigationContext);
  const { setOpenCamera } = useContext(NavigationContext);
  const { setReceiptData } = useContext(NavigationContext);
  const [files, setFiles] = useState<any>();

  const handleReset = () => {
    setImage(null);
    setOpenCamera(false);
    setSelected(tabs[0].label);
  };

  const handleCamera = () => {
    const capture = camera.current.takePhoto();
    setImage(capture);
    setCapturedImage(capture);

    const file = base64ToFile(capture, "capture.png");
    setFiles(file);
  };

  const handleSubmit = async () => {
    setOpenCamera(false);
    setSelected(tabs[2].label);
    processUpload();
  };

  const processUpload = () => {
    const UPLOAD_API_ROUTE = "/api/upload";
    fetch(UPLOAD_API_ROUTE, {
      method: "POST",
      headers: { "content-type": files?.type || "application/octet-stream" },
      body: files,
    }).then(async (res) => {
      if (res.status === 200) {
        const { url } = (await res.json()) as PutBlobResult;
        const apiRoute = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/${process.env.NEXT_PUBLIC_QUERY}`;
        const response = await backendAxiosPost(apiRoute, { imageUrl: url });
        if (response.status === 201) {
          setReceiptData(response.data);
        }
      }
    });
  };

  const base64ToFile = (base64String: string, fileName: string) => {
    const byteString = atob(base64String.split(",")[1]);
    const mimeString = base64String.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });
    return new File([blob], fileName, { type: mimeString });
  };

  const renderCaptureAndCancelButton = () => {
    return (
      <>
        <div
          className="relative flex items-center justify-center"
          onClick={handleCamera}
        >
          <div className="absolute flex h-24 w-24 items-center justify-center rounded-full">
            <div className="h-16 w-16 rounded-full bg-white"></div>
          </div>
          <div className="border-1 relative z-10 h-14 w-14 rounded-full border-2 border-black bg-white"></div>
        </div>

        <div className="flex justify-end" onClick={handleReset}>
          <RxCross1
            size={50}
            onClick={() => setImage(null)}
            className="rounded-2xl p-3 text-white"
          />
        </div>
      </>
    );
  };

  const renderDeleteAndSubmitButton = () => {
    return (
      <>
        <Button
          variant="ghost"
          onClick={() => setImage(null)}
          size="sm"
          className="text-white"
        >
          Cancel
        </Button>

        <span></span>

        <Button
          variant="ghost"
          onClick={handleSubmit}
          size="sm"
          className="text-white"
        >
          Confirm
        </Button>
      </>
    );
  };

  return (
    <div className="mx-auto flex max-h-screen w-screen flex-col justify-center bg-black">
      <div className="fixed top-0 mx-auto grid w-full grid-cols-3 items-center justify-center bg-black p-8 text-center"></div>
      {!image ? (
        <ReactCamera
          ref={camera}
          errorMessages={errMessages}
          facingMode="environment"
        />
      ) : (
        <Image src={image} alt="Photo" fill={true} />
      )}
      <div className="fixed bottom-0 mx-auto grid w-full grid-cols-3 items-center justify-center bg-black p-8 text-center">
        {!image ? (
          <>
            <span></span>
            {renderCaptureAndCancelButton()}
          </>
        ) : (
          <>{renderDeleteAndSubmitButton()}</>
        )}
      </div>
    </div>
  );
}
