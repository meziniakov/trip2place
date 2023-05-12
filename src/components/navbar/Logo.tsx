import Image from 'next/image'
import { useRouter } from 'next/navigation'

import img from './logo.png'

const Logo = () => {
  const router = useRouter()
  return (
    <div className="flex flex-row items-center justify-start">
      <Image
        onClick={() => router.push('/')}
        src={img.src}
        width="50"
        alt="Logo"
        height="50"
        className="cursor-pointer"
      />
      <span className="text-2xl font-extrabold">Trip2place</span>
    </div>
  )
}
export default Logo
