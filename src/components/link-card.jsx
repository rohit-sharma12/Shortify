import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { Copy, Trash, Download } from "lucide-react"
import { BarLoader } from "react-spinners";
import useFetch from "@/hooks/use-fetch";
import { deleteUrl } from "@/db/apiUrls";

const LinkCard = ({ url = [], fetchUrls }) => {

    const downloadImage = () => {
        const imageUrl = url?.qr;
        const fileName = url?.title;

        const anchor = document.createElement("a");
        anchor.href = imageUrl;
        anchor.download = fileName;

        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
    };


    const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, url.id);

    return (
        <div className="flex flex-col md:flex-row gap-5 border p-4 bg-blue-950 rounded-lg">
            <img src={url?.qr} alt="qrcode" className="h-32 object-contain ring ring-blue-500 self-start" />

            <Link to={`/link/${url?.id}`} className="flex flex-col flex-1 text-white">
                <span className="text-3xl font-extraboldhover:underline cursor-pointer">{url?.title}</span>
                <span className="flex flex-col flex-1 text-blue-400">https://short.in/{url?.custom_url ? url?.custom_url : url.short_url}</span>
                <span className="flex flex-col flex-1 text-white">{url?.original_url}</span>
                <span className="flex items-end font-extralight text-sm flex-1 text-white">{new Date(url?.created_at).toLocaleString()}</span>
            </Link>

            <div className="flex gap-2">
                <Button variant="destructive" onClick={() => navigator.clipboard.writeText(`https://short.in/${url?.short_url}`)}><Copy /></Button>
                <Button variant="destructive" onClick={downloadImage}><Download /></Button>
                <Button variant="destructive" onClick={() => fnDelete().then(() => fetchUrls())}>{loadingDelete ? <BarLoader size={5} color="white" /> : <Trash />}</Button>
            </div>
        </div>
    )
}

export default LinkCard
