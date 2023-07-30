import { useState } from "react";
import { match } from "ts-pattern";
import { api } from "~/utils/api";

export default function LancePayment() {
  const [cardNumber, setCardNumber] = useState("5555555555554444");
  const [cardCvv, setCardCvv] = useState("666");
  const [cardExpMonth, setCardExpMonth] = useState("12");
  const paymentMutation = api.payment.createCard.useMutation();
  const [cardExpYear, setCardExpYear] = useState("2024");
  const [cardName, setCardName] = useState("Courseka Bayer");
  const [cardCity, setCardCity] = useState("San Francisco");
  const [cardCountry, setCardCountry] = useState("US");
  const [cardLine1, setCardLine1] = useState("458 East Park");
  const [cardPostalCode, setCardPostalCode] = useState("94103");
  const [cardDistrict, setCardDistrict] = useState("CA");
  const [amount, setAmount] = useState(30);

  async function processPayment() {
    const data = await paymentMutation.mutateAsync({
      number: cardNumber,
      cvv: cardCvv,
      expMonth: cardExpMonth,
      expYear: cardExpYear,
      billingDetails: {
        name: cardName,
        city: cardCity,
        country: cardCountry,
        line1: cardLine1,
        postalCode: cardPostalCode,
        district: cardDistrict,
      },
      amount: amount,
    });

    alert("Payment Successful, Cohort joining date would be emailed to you");
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold underline">Course Payment</h1>

      <div className="flex gap-4">
        <div className="flex w-full flex-col gap-4">
          <h2 className="text-xl font-bold">Card</h2>
          <input
            className="rounded-md border-2 border-pink-600 bg-[#131621] px-4 py-2"
            type="text"
            placeholder="Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
          <input
            className="rounded-md border-2 border-pink-600 bg-[#131621] px-4 py-2"
            type="password"
            placeholder="Card CVC"
            value={cardCvv}
            onChange={(e) => setCardCvv(e.target.value)}
          />
          <input
            className="rounded-md border-2 border-pink-600 bg-[#131621] px-4 py-2"
            type="text"
            placeholder="Card Exp Month"
            value={cardExpMonth}
            onChange={(e) => setCardExpMonth(e.target.value)}
          />
          <input
            className="rounded-md border-2 border-pink-600 bg-[#131621] px-4 py-2"
            type="text"
            placeholder="Card Exp Year"
            value={cardExpYear}
            onChange={(e) => setCardExpYear(e.target.value)}
          />

          <button
            onClick={() => void processPayment()}
            className="bg-indigo-600 px-6 py-4 text-lg"
          >
            Process Payment
          </button>

          <div className="rounded-md bg-lime-500 px-12 py-4 text-center text-black">
            {match(paymentMutation)
              .with({ status: "loading" }, () => (
                <p className="text-lg">Contacting Circle for Payment...</p>
              ))
              .with({ status: "idle" }, () => (
                <p className="text-lg">^^</p>
              ))
              .with({ status: "success" }, ({ data }) => (
                <p className="text-lg">Course Bought! ID: {data!.id}</p>
              ))
              .with({ status: "error" }, ({ error }) => (
                <p className="text-lg">Error! {error.message}</p>
              ))
              .exhaustive()}
          </div>
        </div>

        <div className="flex w-full flex-col gap-4">
          <h2 className="text-xl font-bold">Billing Details</h2>
          <input
            className="rounded-md border-2 border-pink-600 bg-[#131621] px-4 py-2"
            type="text"
            placeholder="Card Name"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
          />
          <input
            className="rounded-md border-2 border-pink-600 bg-[#131621] px-4 py-2"
            type="text"
            placeholder="Card City"
            value={cardCity}
            onChange={(e) => setCardCity(e.target.value)}
          />
          <input
            className="rounded-md border-2 border-pink-600 bg-[#131621] px-4 py-2"
            type="text"
            placeholder="Card Country"
            value={cardCountry}
            onChange={(e) => setCardCountry(e.target.value)}
          />
          <input
            className="rounded-md border-2 border-pink-600 bg-[#131621] px-4 py-2"
            type="text"
            placeholder="Card Line 1"
            value={cardLine1}
            onChange={(e) => setCardLine1(e.target.value)}
          />
          <input
            className="rounded-md border-2 border-pink-600 bg-[#131621] px-4 py-2"
            type="text"
            placeholder="Card Postal Code"
            value={cardPostalCode}
            onChange={(e) => setCardPostalCode(e.target.value)}
          />
          <input
            className="rounded-md border-2 border-pink-600 bg-[#131621] px-4 py-2"
            type="text"
            placeholder="Card District"
            value={cardDistrict}
            onChange={(e) => setCardDistrict(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
