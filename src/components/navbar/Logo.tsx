import img from './logo.png'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
const Logo = () => {
  const router = useRouter()
  return (
    <div className="flex flex-row justify-start items-center">
      <Image
        onClick={() => router.push('/')}
        src={img.src}
        width="50"
        alt="Logo"
        height="50"
        className="cursor-pointer"
      />
      <span className="font-extrabold text-2xl">Trip2place</span>
    </div>
  )
}
export default Logo
