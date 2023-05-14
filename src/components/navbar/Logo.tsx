import Image from 'next/image'
import Link from 'next/link'
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
      <Link href={'/'}>
        <span className="text-2xl font-extrabold">Trip2place</span>
      </Link>
    </div>
  )
}
export default Logo
