import BookingPaymentClient from "./BookingPaymentClient";

export default async function BookingPaymentPage({
  searchParams,
}: {
  searchParams: Promise<{ order_id?: string }>;
}) {
  const { order_id: orderId = "" } = await searchParams;

  return <BookingPaymentClient orderId={orderId} />;
}
