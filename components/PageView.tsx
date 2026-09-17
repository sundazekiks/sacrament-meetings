import { ArrowLeft, ArrowRight } from "lucide-react"
interface PageViewProps {
    currentPage: number
    totalPages: number
    setPage: (page: number) => void
}

export default function PageView({ currentPage, totalPages, setPage }: PageViewProps) {

    function nextPage() {
        setPage(currentPage + 1);
    }
    function prevPage() {
        setPage(currentPage - 1);
    }

    return (<div className="flex gap-2 ">

        <p onClick={prevPage}>
            <ArrowLeft />
        </p>
        <p>
            {currentPage} / {totalPages}
        </p>
        <p onClick={nextPage}>
            <ArrowRight />
        </p>
    </div>)
}