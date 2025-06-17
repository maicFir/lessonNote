"use client"
import { useState, ReactNode, forwardRef, useImperativeHandle, createContext } from 'react';
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

type Props = {
    children?: ReactNode;
    title?: string;
    renderButtonText?: string | ReactNode;
}

export const ModalContext = createContext<{
    open: () => void;
    close: () => void;
}>({
    open: () => { },
    close: () => { }
});



export default forwardRef(function Modal4(props: Props, ref) {
    const { children, title, renderButtonText = "" } = props
    let [isOpen, setIsOpen] = useState(false)

    function open() {
        setIsOpen(true)
    }

    function close() {
        setIsOpen(false)
    }

    useImperativeHandle(ref, () => {
        return {
            open,
            close,
        }
    })

    return (
        <>
            <ModalContext.Provider value={{ open, close }}>
                {
                    renderButtonText ? <div
                        className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                        onClick={open}
                    >
                        {renderButtonText || 'Open Modal'}
                    </div> : null
                }
                {children}
                <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close} __demoMode>
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/50 backdrop-blur-sm data-open:bg-black/60 data-closed:bg-transparent">
                        <div className="flex min-h-full items-center justify-center p-4">
                            <DialogPanel
                                transition
                                className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                            >
                                <DialogTitle as="h3" className="text-base/7 font-medium text-white">
                                    {title}
                                </DialogTitle>
                                我的弹框内容
                            </DialogPanel>
                        </div>
                    </div>
                </Dialog>
            </ModalContext.Provider>
        </>
    )
})