import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
//import { Image } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { testimonialsData } from "@/data/landing"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const LandingPage = () => {
    const [longUrl, setLongUrl] = useState();
    const navigate = useNavigate();

    const handleShorten = (e) => {
        e.preventDefault();
        if (longUrl) navigate(`/auth?createNew=${longUrl}`);
    }
    return (
        <div className="flex flex-col items-center">
            <h1 className="my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-red-500 text-center font-extrabold">The best URL Shortener</h1>

            <form onSubmit={handleShorten} className="sm:h-14 flex flex-col sm:flex-row w-full md:w-2/3 gap-2">
                <Input className='border-orange-950 h-full flex-1 py-4 px-4' type="url" value={longUrl} placeholder="Paste Your URL" onChange={(e) => setLongUrl(e.target.value)} />
                <Button className="h-full" type="submit" variant="destructive">Shorten</Button>
            </form>
            <img src="/banner.png" alt="banner" className="w-full my-11 md:px-11 object-contain" />

            <section id="testimonials" className="py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-16">
                        What Our Users Say
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonialsData.map((testimonial, index) => (
                            <Card key={index} className="p-6">
                                <CardContent className="pt-4">
                                    <div className="flex items-center mb-4">
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            width={40}
                                            height={40}
                                            className="rounded-full"
                                        />
                                        <div className="ml-4">
                                            <div className="font-semibold">{testimonial.name}</div>
                                            <div className="text-sm text-gray-600">
                                                {testimonial.role}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-gray-600">{testimonial.quote}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
            <Accordion type="multiple" collapsible className="w-full md:px-12">
                <AccordionItem value="item-1">
                    <AccordionTrigger>
                        How does the Shortify URL shortener works?
                    </AccordionTrigger>
                    <AccordionContent>
                        When you enter a long URL, our system generates a shorter version of
                        that URL. This shortened URL redirects to the original long URL when
                        accessed.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>
                        Do I need an account to use the app?
                    </AccordionTrigger>
                    <AccordionContent>
                        Yes. Creating an account allows you to manage your URLs, view
                        analytics, and customize your short URLs.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>
                        What analytics are available for my shortened URLs?
                    </AccordionTrigger>
                    <AccordionContent>
                        You can view the number of clicks, geolocation data of the clicks
                        and device types (mobile/desktop) for each of your shortened URLs.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

        </div>
    )
}

export default LandingPage
