/* eslint-disable import/no-extraneous-dependencies */
import Image from 'next/image'
import { CldUploadWidget } from 'next-cloudinary'
import { useCallback, useRef } from 'react'
import { TbPhotoPlus } from 'react-icons/tb'

declare global {
  let cloudinary: any
}

type UploadType = {
  type: string
  public_id: string
  width: number
  height: number
  format: string
  bytes?: number
  src: string
  duration?: number
}

interface ImageUploadProps {
  value: UploadType[]
  onChange: (value: UploadType) => void
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange }) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange({
        type: result.info.resource_type,
        public_id: result.info.public_id,
        width: result.info.width,
        height: result.info.height,
        format: result.info.format,
        bytes: result.info.bytes,
        src: result.info.secure_url,
        duration: result.info.duration,
      })
    },
    [onChange]
  )
  const videoRef = useRef(null)

  const onFocus = (e: any) => {
    e.target.play()
  }

  const onLeave = (e: any) => {
    e.target.pause()
  }

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="xjebcgpf"
      options={{
        maxFiles: 5,
        sources: ['local', 'camera', 'url'],
      }}
    >
      {({ open }) => {
        return (
          <>
            {value && (
              <div className="grid grid-cols-1 items-start justify-center gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                {value?.map((item) => (
                  <div
                    key={item.public_id}
                    className="relative aspect-[3/4] w-full overflow-hidden rounded-xl"
                  >
                    {item.type === 'video' ? (
                      <video
                        onMouseOver={onFocus}
                        onMouseLeave={onLeave}
                        ref={videoRef}
                        muted
                        tabIndex={-1}
                        src={item.src}
                      />
                    ) : (
                      <Image
                        alt="Загруженное фото"
                        style={{ objectFit: 'cover' }}
                        src={item.src || ''}
                        fill
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
            <div
              onClick={() => open?.()}
              className="
        relative
        flex
        cursor-pointer
        flex-col
        items-center
        justify-center
        gap-4
        border-2
        border-dashed
        border-neutral-300
        p-2
        text-neutral-600
        transition
        hover:opacity-70
        "
            >
              <TbPhotoPlus size={50} />
              <div className="text-lg font-semibold">
                Нажмите для выбора
              </div>
            </div>
          </>
        )
      }}
    </CldUploadWidget>
  )
}
export default ImageUpload
