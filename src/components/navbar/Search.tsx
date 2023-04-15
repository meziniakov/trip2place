import useSearchModal from '@/hooks/useSearchModal'

const Search = () => {
  const searchModal = useSearchModal()
  return (
    <div
      onClick={searchModal.onOpen}
      className="border-[1px] md:w-auto rounded-full py-2 shadow-sm hover:shadow-md transition cursor-pointer"
    >
      <div className="flex flex-row items-center justify-between">
        <div className="text-sm font-semibold px-6">Поиск</div>
        <div className="hidden sm:block text-sm font-semibold border-x-[1px] px-6 flex-1 text-center">
          Город
        </div>
        <div className="hidden md:block text-sm font-semibold border-x-[1px] pl-6 pr-2 flex flex-row gap-3 items-center">
          <div className="hidden sm:block">Категория</div>
        </div>
      </div>
    </div>
  )
}
export default Search
