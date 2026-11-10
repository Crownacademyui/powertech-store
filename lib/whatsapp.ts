import { site } from "@/config/site";
export const naira = (n: number) => "₦" + n.toLocaleString("en-NG");
export const waLink = (message: string) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
const hi = "Hello Powertech Energy & Solutions, ";
export const msg = {
  general: () => waLink(hi + "I would like to make an enquiry."),
  product: (name: string) => waLink(hi + `I am interested in the ${name}. Please share more details.`),
  inverter: () => waLink(hi + "I need help choosing the right solar inverter. Please assist me with a load assessment."),
  install: () => waLink(hi + "I would like to request a solar installation."),
  repair: () => waLink(hi + "I would like to request a solar fan repair."),
  contact: (f: { name: string; phone: string; interest: string; message: string }) =>
    waLink(hi + `my name is ${f.name}.\nPhone: ${f.phone}\nInterested in: ${f.interest}\n\n${f.message}`),
  order: (o: { product: string; model: string; qty: number; total: number; name: string; address: string; notes?: string }) =>
    waLink(
      `Hello Powertech Energy & Solutions, I have made payment for my order.\n\nProduct: ${o.product}\nModel: ${o.model}\nQuantity: ${o.qty}\nTotal Amount: ${naira(o.total)}\nCustomer Name: ${o.name}\nDelivery Address: ${o.address}\n` +
        (o.notes ? `Notes: ${o.notes}\n` : "") + `\nPlease confirm my payment and order. Thank you.`
    ),
};
