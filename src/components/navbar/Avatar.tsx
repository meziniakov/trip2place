import Image from 'next/image'

import avatar from './placeholder_avatar.jpeg'

const Avatar = () => {
  return (
    <Image
      src={avatar.src}
      width="30"
      alt="Аватар"
      height="30"
      className="cursor-pointer rounded-full"
    />
  )
}
export default Avatar
