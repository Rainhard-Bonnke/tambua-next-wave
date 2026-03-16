import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What is the best time to visit Kenya for a safari?",
    a: "The best time for a Kenyan safari is during the dry seasons: January–March and July–October. The Great Migration in the Masai Mara happens from July to October, which is a spectacular time to visit.",
  },
  {
    q: "Do I need a visa to visit Kenya?",
    a: "Most visitors need an eTA (Electronic Travel Authorization) to enter Kenya. You can apply online at etakenya.go.ke. Some nationalities may require a traditional visa. We'll help guide you through the process.",
  },
  {
    q: "What vaccinations do I need?",
    a: "Yellow fever vaccination is required if traveling from an endemic country. We recommend consulting your doctor about malaria prophylaxis, Hepatitis A & B, and Typhoid vaccinations at least 6 weeks before travel.",
  },
  {
    q: "What should I pack for a safari?",
    a: "Pack lightweight, neutral-colored clothing (khaki, olive, tan), comfortable walking shoes, a wide-brimmed hat, sunscreen, binoculars, and a good camera. Evenings can be cool, so bring a light jacket.",
  },
  {
    q: "Are your safaris suitable for children?",
    a: "Yes! We offer family-friendly safari packages with age-appropriate activities. Children aged 5+ can join most game drives. We also arrange private vehicle safaris for families with younger children.",
  },
  {
    q: "What is your cancellation policy?",
    a: "Free cancellation up to 30 days before departure for a full refund. Cancellations 15-29 days before receive a 50% refund. Within 14 days, no refund is available. We recommend travel insurance.",
  },
  {
    q: "Can I customize my safari itinerary?",
    a: "Absolutely! All our packages can be customized to suit your preferences, budget, and timeframe. Contact us with your requirements and we'll create a bespoke itinerary just for you.",
  },
  {
    q: "What is included in the safari price?",
    a: "Our prices typically include accommodation, meals as specified, park entry fees, game drives with professional guides, airport transfers, and transport in a 4x4 safari vehicle. International flights and visa fees are not included.",
  },
];

const FAQSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="section-padding bg-background" ref={ref}>
      <div className="container-wide mx-auto">
        <div className="text-center mb-12">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">FAQ</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-2">Frequently Asked Questions</h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            Everything you need to know before planning your safari adventure.
          </p>
        </div>

        <div
          className={`max-w-3xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-card border border-border rounded-xl px-5 data-[state=open]:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left text-foreground font-semibold text-sm sm:text-base hover:no-underline py-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
