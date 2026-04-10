import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";

const Terms = () => {
  return (
    <PageTransition>
      <Navbar />
      <div className="pt-24 pb-16 bg-background">
        <div className="container-wide mx-auto section-padding">
          <div className="max-w-4xl mx-auto space-y-12 text-foreground">
            {/* Header */}
            <div className="text-center space-y-4">
              <h1 className="text-4xl sm:text-5xl font-bold font-playfair text-primary">Privacy Policy & Terms of Service</h1>
              <p className="text-muted-foreground text-lg">Our Commitment to Integrity and Excellence</p>
            </div>

            {/* Intro Content */}
            <div className="bg-card p-6 sm:p-8 rounded-2xl border border-border">
              <p className="leading-relaxed">
                We uphold transparent, fair, and ethical business practices that guide every decision, ensuring trust, accountability, and mutual respect in all our operations and client relationships.
              </p>
            </div>

            {/* Main Policy Content */}
            <div className="space-y-10">
              <h2 className="text-3xl font-semibold font-playfair border-b border-border pb-4">COMPANY POLICY ON BOOKINGS, CANCELLATIONS, AND REFUNDS</h2>

              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-primary">1. Booking & Reservation</h3>
                <p className="leading-relaxed">All tours and safaris must be booked in advance. A reservation is officially confirmed upon receipt of the required deposit.</p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li><strong className="text-foreground">How to Book:</strong> Reservations can be made via our official website, email, telephone/WhatsApp, or in person at our office.</li>
                  <li><strong className="text-foreground">Deposit:</strong> A 50% deposit of the total tour cost is required to secure your booking.</li>
                  <li><strong className="text-foreground">Final Payment:</strong> Full payment must be settled at least 15 days prior to the tour departure date unless otherwise agreed in writing.</li>
                  <li><strong className="text-foreground">Cancellation for Non-Payment:</strong> Bookings not paid in full by the due date may be automatically cancelled.</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-primary">2. Cancellations by Client</h3>
                <p className="leading-relaxed">Should you need to cancel your booking, notification must be provided in writing (via email or in person). Cancellation charges are calculated based on the date of the scheduled tour, as follows:</p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li><strong className="text-foreground">More than 14 days before tour:</strong> Full refund, minus a 10% administrative fee.</li>
                  <li><strong className="text-foreground">7 to 14 days before tour:</strong> 50% refund of the total amount paid.</li>
                  <li><strong className="text-foreground">Less than 7 days before tour:</strong> No refund will be issued.</li>
                </ul>
                <div className="bg-muted p-4 rounded-lg mt-4 text-sm leading-relaxed">
                  <p>No-shows or late arrivals on the day of the tour are not eligible for a refund. In the event of a verified medical emergency or exceptional circumstance, management may, at its sole discretion, review the cancellation policy on a case-by-case basis.</p>
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-primary">3. Refunds</h3>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li><strong className="text-foreground">Processing Time:</strong> All approved refunds will be processed within 14 business days of the cancellation request.</li>
                  <li><strong className="text-foreground">Method:</strong> Refunds will be issued through the original payment method. Any transaction fees or bank charges incurred will be borne by the client and deducted from the refund amount.</li>
                  <li><strong className="text-foreground">Cancellations by Tambua Africa Tours and Safaris Ltd:</strong> If we must cancel a tour due to operational issues, extreme weather, or other unforeseen circumstances, you will be offered the choice of a full refund or rescheduling to an alternative date.</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-primary">4. Amendments to Bookings</h3>
                <p className="leading-relaxed">Change Requests: Changes to an existing booking are subject to availability and must be approved by Tambua Africa Tours and Safaris Ltd.</p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li><strong className="text-foreground">Fees:</strong> Changes requested more than 7 days before the tour are free of charge.</li>
                  <li>Changes requested less than 7 days before the tour may incur a 10% rescheduling fee.</li>
                </ul>
                <p className="text-sm italic text-muted-foreground">Please note that changes are not guaranteed and are dependent on tour capacity.</p>
              </section>

              <section className="space-y-4 bg-primary/5 p-6 rounded-xl border border-primary/10 mt-8">
                <h3 className="text-xl font-semibold text-primary">5. Force Majeure</h3>
                <p className="leading-relaxed">
                  Tambua Africa Tours and Safaris Ltd shall not be held liable for failure to perform its obligations due to circumstances beyond its reasonable control, including but not limited to natural disasters, acts of government, political instability, or pandemics. In such events, we will work with you to provide alternative tour dates or a credit subject to management’s discretion.
                </p>
              </section>

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </PageTransition>
  );
};

export default Terms;
