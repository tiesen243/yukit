import { DotIcon } from 'lucide-react'
import type { NextPage } from 'next'

const Page: NextPage = () => {
  return (
    <div>
      <div className="flex gap-0">
        <DotIcon className="animate-bounce [animation-delay:-0.3s]" />
        <DotIcon className="animate-bounce [animation-delay:-0.15s]" />
        <DotIcon className="animate-bounce" />
      </div>
    </div>
  )
}

export default Page
