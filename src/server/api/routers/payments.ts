import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { v4 } from "uuid";
import { circle, encryptCard } from "~/server/utils/circle";
import {
  Currency,
  PaymentCreationRequestVerificationEnum,
  SourceTypeEnum,
} from "@circle-fin/circle-sdk";

export const schema = z.object({
  number: z.string(),
  cvc: z.number(),
  expMonth: z.number(),
  expYear: z.number(),
  billingDetails: z.object({
    name: z.string(),
    city: z.string(),
    country: z.string(),
    line1: z.string(),
    postalCode: z.string(),
    district: z.string(),
  }),
  amount: z.number(),
});

export const paymentsRouter = createTRPCRouter({
  createCard: protectedProcedure
    .input(schema)
    .mutation(async ({ ctx, input }) => {
      const { number, cvc, expMonth, expYear, billingDetails, amount } = input;

      const encryptedMessage = await encryptCard({
        number,
        cvc,
      });
      const { keyId } = (await circle.encryption.getPublicKey()).data.data!;
      const metadata = {
        email: ctx.session.user.email!,
        sessionId: ctx.session.user.id,
        ipAddress: "1.1.1.1",
      };

      const cardDetails = {
        idempotencyKey: v4(),
        encryptedData: encryptedMessage,
        billingDetails,
        keyId,
        expMonth,
        expYear,
        metadata,
      };

      const cardId = (await circle.cards.createCard(cardDetails)).data.data!.id;

      const paymentDetails = {
        idempotencyKey: v4(),
        metadata: metadata,
        amount: {
          amount: amount.toString(),
          currency: Currency.Usd,
        },
        autoCapture: true,
        verification: PaymentCreationRequestVerificationEnum.Cvv,
        source: {
          id: cardId,
          type: SourceTypeEnum.Card,
        },
        description: `Payment for Lancing Order`,
      };

      const createPaymentResponse = await circle.payments.createPayment(
        paymentDetails
      );

      return createPaymentResponse.data.data?.id;
    }),
});
