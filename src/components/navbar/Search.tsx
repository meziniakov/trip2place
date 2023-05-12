import useSearchModal from '@/hooks/useSearchModal'

const Search = () => {
  const searchModal = useSearchModal()
  return (
    <div
      onClick={searchModal.onOpen}
      className="cursor-pointer rounded-full border-[1px] py-2 shadow-sm transition hover:shadow-md md:w-auto"
    >
      <div className="flex flex-row items-center justify-between">
        <div className="px-6 text-sm font-semibold">Поиск</div>
        <div className="hidden flex-1 border-x-[1px] px-6 text-center text-sm font-semibold sm:block">
          Город
        </div>
        <div className="hidden flex-row items-center gap-3 border-x-[1px] pl-6 pr-2 text-sm font-semibold md:block">
          <div className="hidden sm:block">Категория</div>
        </div>
      </div>
    </div>
  )
}
export default Search
