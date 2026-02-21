import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const FaqSection = () => {
    const faqs = [
        {
            question: "What is an IP address?",
            answer: "An IP (Internet Protocol) address is a unique numerical label assigned to each device connected to a computer network that uses the Internet Protocol for communication. It serves two main functions: host or network interface identification and location addressing."
        },
        {
            question: "How does IP geolocation work?",
            answer: "IP geolocation is the mapping of an IP address to the real-world geographic location of an internet-connected device. This is done by looking up the IP address in databases that associate IP ranges with specific geographic locations, ISPs, and other data."
        },
        {
            question: "Is my IP address private?",
            answer: "Your public IP address is visible to every website and server you connect to. While it doesn't reveal your exact home address, it can pinpoint your city, region, and ISP. Using a VPN or proxy can help hide your real IP address."
        },
        {
            question: "What is the difference between IPv4 and IPv6?",
            answer: "IPv4 uses a 32-bit address format (e.g., 192.168.1.1), providing about 4.3 billion unique addresses. IPv6 uses a 128-bit format (e.g., 2001:0db8:85a3:0000:0000:8a2e:0370:7334), allowing for an almost infinite number of unique addresses to accommodate the growing number of devices online."
        },
        {
            question: "What is an ISP?",
            answer: "An ISP (Internet Service Provider) is a company that provides individuals and organizations access to the internet and other related services, such as website building and virtual hosting."
        }
    ];

    return (
        <section className="w-full py-12 border-t border-border mt-12">
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    Frequently Asked Questions
                </h2>
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-left font-medium text-lg py-4">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
};

export default FaqSection;
