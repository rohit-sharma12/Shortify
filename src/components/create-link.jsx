import { UrlState } from "@/context"
import { useNavigate, useSearchParams } from "react-router-dom";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Error from "./error";
import { Card } from "./ui/card";
import * as yup from "yup";
import { useEffect, useRef, useState } from "react";
import useFetch from "@/hooks/use-fetch";
import { BeatLoader } from "react-spinners";
import { createUrl } from "@/db/apiUrls";
import { QRCode } from "react-qrcode-logo";

const CreateLink = () => {
    const { user } = UrlState();
    const navigate = useNavigate();
    let [searchParams, setSerachParams] = useSearchParams();
    const longLink = searchParams.get("createNew");
    const ref = useRef();
    const [errors, setErrors] = useState({});
    const [formValues, setFormValues] = useState({
        title: "",
        longUrl: longLink ? longLink : "",
        customUrl: "",
    });

    const schema = yup.object().shape({
        title: yup.string().required("Title is required"),
        longUrl: yup
            .string()
            .url("Must be a valid URL")
            .required("Long URL is required"),
        customUrl: yup.string(),
    });

    const handleChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.id]: e.target.value,
        });
    };

    const {
        loading,
        error,
        data,
        fn: fnCreateUrl,
    } = useFetch(createUrl, { ...formValues, user_id: user.id });

    useEffect(() => {
        if (error === null && data) {
            navigate(`/link/${data[0].id}`);
        }
    }, [error, data]);

    const createNewLink = async () => {
        setErrors([]);
        try {
            await schema.validate(formValues, { abortEarly: false });

            const canvas = ref.current.canvasRef.current;
            const blob = await new Promise((resolve) => canvas.toBlob(resolve));

            await fnCreateUrl(blob);
        } catch (e) {
            const newErrors = {};

            e?.inner?.forEach((err) => {
                newErrors[err.path] = err.message;
            });

            setErrors(newErrors);
        }
    };

    return (
        <Dialog defaultOpen={longLink}
            onOpenChange={(res) => {
                if (!res) setSerachParams({});
            }}
        >
            <DialogTrigger>
                <Button variant="destructive">Create New Link</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="font-bold text-2xl">Create New</DialogTitle>
                </DialogHeader>

                {formValues?.longUrl && (
                    <QRCode ref={ref} size={250} value={formValues?.longUrl} />
                )}

                <Input id="title" placeholder="Short Link's Title" value={formValues.title} onChange={handleChange} />
                {errors.title && <Error message={errors.title} />}

                <Input id="longUrl" placeholder="Enter your Long URL" value={formValues.longUrl} onChange={handleChange} />
                {errors.longUrl && <Error message={errors.longUrl} />}
                <div className="flex items-center gap-2">
                    <Card className="p-2">Shorten.in</Card> /
                    <Input id="customUrl" placeholder="Custom Link (Optional)" value={formValues.customUrl} onChange={handleChange} />
                </div>

                {error && <Error message={errors.message} />}

                <DialogFooter className="sm:justify-start">
                    <Button type="button" onClick={createNewLink} variant="destructive" disabled={loading}>
                        {loading ? <BeatLoader size={10} color="white" /> : "Create"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}

export default CreateLink
