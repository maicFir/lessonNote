"use client"
import { useState, useRef, useContext } from 'react'
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import Modal1 from "@/app/components/modal1";
import Modal2 from "@/app/components/modal2";
import Modal3 from "@/app/components/modal3";
import { ModalContext } from "@/app/components/modal4";
import { useModal } from "@/app/hooks/useModal";

export default function Page() {
    const { open: handleOpen, close: handleClose } = useModal();
    // const { open: handleOpen, close: handleClose } = useContext(ModalContext);
    let [isOpen, setIsOpen] = useState(false);
    const refModal3 = useRef<{
        open: () => void;
        close: () => void;
    }>(null);

  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }
    const handleOpen3 = () => {
        refModal3.current?.open();
    }
    const handleOpen4 = () => {
        handleOpen();
    }
  return (
      <>
      <div>HEllo</div>
      <Button
        onClick={open}
        className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-black/30"
      >
        Open dialog
          </Button>
          <Button onClick={handleOpen3}>Open dialog3</Button>

          <Modal1 isOpen={isOpen} close={close} />
          
          <Modal2 renderButtonText='Open Modal 2' title='Modal2 Title'>
              <div> Open dialog2</div>
          </Modal2>

          <Modal3 title='Modal3 Title' ref={refModal3}>
              <div> Open dialog3</div>
          </Modal3>
          <Button onClick={handleOpen4}>Open dialog4</Button>
   
    </>
  )
}

