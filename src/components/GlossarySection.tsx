import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const GlossarySection = () => {
    const terms = [
        {
            term: "IPv4",
            definition: "The fourth version of the Internet Protocol, using 32-bit addresses. It's the most widely used version."
        },
        {
            term: "IPv6",
            definition: "The latest version of the Internet Protocol, using 128-bit addresses to overcome IPv4 address exhaustion."
        },
        {
            term: "ASN (Autonomous System Number)",
            definition: "A unique number that identifies an Autonomous System—a collection of connected IP routing prefixes."
        },
        {
            term: "ISP (Internet Service Provider)",
            definition: "A company that provides access to the internet to customers."
        },
        {
            term: "Geolocation",
            definition: "The identification or estimation of the real-world geographic location of an object, such as a mobile phone or computer terminal."
        },
        {
            term: "Whois",
            definition: "A query and response protocol that is widely used for querying databases that store the registered users or assignees of an Internet resource."
        },
        {
            term: "CIDR (Classless Inter-Domain Routing)",
            definition: "A method for allocating IP addresses and IP routing which replaces the previous system based on address classes."
        },
        {
            term: "DNS (Domain Name System)",
            definition: "The system that translates human-friendly domain names (like google.com) into numerical IP addresses."
        }
    ];

    return (
        <section className="w-full py-12 border-t border-border">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    Networking Glossary
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {terms.map((item, index) => (
                        <Card key={index} className="bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all duration-300">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg font-bold text-primary">{item.term}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {item.definition}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GlossarySection;
