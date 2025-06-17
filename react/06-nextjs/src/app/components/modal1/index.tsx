"use client"
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
type Props ={
    close: () => void;
    isOpen: boolean;
}
export default function Modal(props: Props) {
    const { close, isOpen } = props
  return (
      <>

<Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close} __demoMode>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/50 backdrop-blur-sm data-open:bg-black/60 data-closed:bg-transparent">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              
               modal1 content
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}