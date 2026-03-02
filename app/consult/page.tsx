"use client"

import { ConsultMobile } from "@/components/c2c/consult/consult-mobile"
import { ConsultDesktop } from "@/components/c2c/consult/consult-desktop"

export default function ConsultPage() {
  return (
    <>
      <div className="md:hidden">
        <ConsultMobile />
      </div>
      <div className="hidden md:block">
        <ConsultDesktop />
      </div>
    </>
  )
}
