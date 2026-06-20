-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "thehomestars";

-- CreateEnum
CREATE TYPE "thehomestars"."UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "thehomestars"."QuoteStatus" AS ENUM ('PENDING', 'QUOTED', 'ACCEPTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "thehomestars"."ProjectStatus" AS ENUM ('DRAFT', 'CONTRACT_SENT', 'SIGNED', 'DEPOSIT_PAID', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "thehomestars"."InvoiceStatus" AS ENUM ('DRAFT', 'SENT', 'PAID', 'OVERDUE', 'VOID');

-- CreateEnum
CREATE TYPE "thehomestars"."PaymentMethod" AS ENUM ('STRIPE', 'BANK_TRANSFER', 'PLAID', 'CASH');

-- CreateEnum
CREATE TYPE "thehomestars"."PaymentStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "thehomestars"."InquiryStatus" AS ENUM ('NEW', 'IN_PROGRESS', 'RESOLVED', 'CLOSED');

-- CreateEnum
CREATE TYPE "thehomestars"."InvoiceStage" AS ENUM ('DEPOSIT', 'MIDPOINT', 'FINAL', 'CUSTOM');

-- CreateEnum
CREATE TYPE "thehomestars"."AppointmentStatus" AS ENUM ('SCHEDULED', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "thehomestars"."User" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "phone" TEXT,
    "passwordHash" TEXT,
    "role" "thehomestars"."UserRole" NOT NULL DEFAULT 'USER',
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "thehomestars"."EmailVerificationToken" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "phone" TEXT,
    "passwordHash" TEXT,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMPTZ NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmailVerificationToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "thehomestars"."Account" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "thehomestars"."Session" (
    "id" UUID NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "expires" TIMESTAMPTZ NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "thehomestars"."VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMPTZ NOT NULL
);

-- CreateTable
CREATE TABLE "thehomestars"."QuoteRequest" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "city" TEXT,
    "province" TEXT,
    "address" TEXT,
    "species" JSONB,
    "squareFeet" INTEGER,
    "projectType" TEXT,
    "timeline" TEXT,
    "budgetRange" TEXT,
    "service" TEXT,
    "notes" TEXT,
    "attachments" JSONB,
    "status" "thehomestars"."QuoteStatus" NOT NULL DEFAULT 'PENDING',
    "adminNotes" TEXT,
    "stripeCheckoutSessionId" TEXT,
    "quotedAmount" DECIMAL(12,2),
    "quoteTaxRate" DECIMAL(5,2),
    "quoteLineItems" JSONB NOT NULL DEFAULT '[]',
    "quoteNotes" TEXT,
    "quoteValidUntil" TIMESTAMPTZ,
    "quoteIssuedAt" TIMESTAMPTZ,
    "quotePdfUrl" TEXT,
    "userId" UUID,
    "projectId" UUID,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "QuoteRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "thehomestars"."Project" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "address" TEXT,
    "city" TEXT,
    "province" TEXT,
    "species" JSONB,
    "squareFeet" INTEGER,
    "startDate" TIMESTAMPTZ,
    "endDate" TIMESTAMPTZ,
    "status" "thehomestars"."ProjectStatus" NOT NULL DEFAULT 'DRAFT',
    "contractPdfUrl" TEXT,
    "signedContractPdfUrl" TEXT,
    "contractSignedAt" TIMESTAMPTZ,
    "depositPct" DECIMAL(5,2) DEFAULT 30.00,
    "midpointPct" DECIMAL(5,2) DEFAULT 40.00,
    "finalPct" DECIMAL(5,2) DEFAULT 30.00,
    "taxRate" DECIMAL(5,2) DEFAULT 13.00,
    "contractValue" DECIMAL(12,2),
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "thehomestars"."ProjectNote" (
    "id" UUID NOT NULL,
    "projectId" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProjectNote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "thehomestars"."Invoice" (
    "id" UUID NOT NULL,
    "number" TEXT,
    "projectId" UUID NOT NULL,
    "stage" "thehomestars"."InvoiceStage",
    "status" "thehomestars"."InvoiceStatus" NOT NULL DEFAULT 'DRAFT',
    "subtotal" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "discountPct" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "surchargePct" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "taxRate" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "total" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "lineItems" JSONB NOT NULL DEFAULT '[]',
    "description" TEXT,
    "dueDate" TIMESTAMPTZ,
    "issuedAt" TIMESTAMPTZ,
    "paidAt" TIMESTAMPTZ,
    "pdfUrl" TEXT,
    "stripePaymentIntentId" TEXT,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "thehomestars"."Payment" (
    "id" UUID NOT NULL,
    "invoiceId" UUID NOT NULL,
    "userId" UUID,
    "amount" DECIMAL(12,2) NOT NULL,
    "method" "thehomestars"."PaymentMethod",
    "status" "thehomestars"."PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "stripePaymentIntentId" TEXT,
    "stripeCharged" BOOLEAN NOT NULL DEFAULT false,
    "bankReference" TEXT,
    "bankConfirmedAt" TIMESTAMPTZ,
    "bankConfirmedByNote" TEXT,
    "plaidTransactionId" TEXT,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "thehomestars"."Inquiry" (
    "id" UUID NOT NULL,
    "userId" UUID,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "subject" TEXT,
    "message" TEXT NOT NULL,
    "status" "thehomestars"."InquiryStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Inquiry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "thehomestars"."InquiryReply" (
    "id" UUID NOT NULL,
    "inquiryId" UUID NOT NULL,
    "fromAdmin" BOOLEAN NOT NULL DEFAULT false,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InquiryReply_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "thehomestars"."Settings" (
    "id" UUID NOT NULL,
    "defaultDepositPct" DECIMAL(5,2) NOT NULL DEFAULT 30,
    "defaultMidpointPct" DECIMAL(5,2) NOT NULL DEFAULT 40,
    "defaultFinalPct" DECIMAL(5,2) NOT NULL DEFAULT 30,
    "defaultTaxRate" DECIMAL(5,2) NOT NULL DEFAULT 13,
    "companyName" TEXT,
    "companyAddress" TEXT,
    "companyPhone" TEXT,
    "companyEmail" TEXT,
    "companyNumberHst" TEXT,
    "companyLogoUrl" TEXT,
    "aiEnabled" BOOLEAN NOT NULL DEFAULT true,
    "aiBankTransferInstructions" TEXT,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "thehomestars"."Appointment" (
    "id" UUID NOT NULL,
    "quoteRequestId" UUID NOT NULL,
    "startsAt" TIMESTAMPTZ NOT NULL,
    "durationMinutes" INTEGER NOT NULL DEFAULT 60,
    "status" "thehomestars"."AppointmentStatus" NOT NULL DEFAULT 'SCHEDULED',
    "customerName" TEXT,
    "customerEmail" TEXT,
    "customerPhone" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "thehomestars"."User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "thehomestars"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "EmailVerificationToken_token_key" ON "thehomestars"."EmailVerificationToken"("token");

-- CreateIndex
CREATE INDEX "EmailVerificationToken_token_idx" ON "thehomestars"."EmailVerificationToken"("token");

-- CreateIndex
CREATE INDEX "EmailVerificationToken_email_idx" ON "thehomestars"."EmailVerificationToken"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "thehomestars"."Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "thehomestars"."Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "thehomestars"."VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "thehomestars"."VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "QuoteRequest_projectId_key" ON "thehomestars"."QuoteRequest"("projectId");

-- CreateIndex
CREATE INDEX "QuoteRequest_email_idx" ON "thehomestars"."QuoteRequest"("email");

-- CreateIndex
CREATE INDEX "QuoteRequest_status_idx" ON "thehomestars"."QuoteRequest"("status");

-- CreateIndex
CREATE INDEX "QuoteRequest_userId_idx" ON "thehomestars"."QuoteRequest"("userId");

-- CreateIndex
CREATE INDEX "Project_userId_idx" ON "thehomestars"."Project"("userId");

-- CreateIndex
CREATE INDEX "Project_status_idx" ON "thehomestars"."Project"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_number_key" ON "thehomestars"."Invoice"("number");

-- CreateIndex
CREATE INDEX "Invoice_projectId_idx" ON "thehomestars"."Invoice"("projectId");

-- CreateIndex
CREATE INDEX "Invoice_status_idx" ON "thehomestars"."Invoice"("status");

-- CreateIndex
CREATE INDEX "Invoice_number_idx" ON "thehomestars"."Invoice"("number");

-- CreateIndex
CREATE INDEX "Payment_invoiceId_idx" ON "thehomestars"."Payment"("invoiceId");

-- CreateIndex
CREATE INDEX "Payment_status_idx" ON "thehomestars"."Payment"("status");

-- CreateIndex
CREATE INDEX "Inquiry_email_idx" ON "thehomestars"."Inquiry"("email");

-- CreateIndex
CREATE INDEX "Inquiry_status_idx" ON "thehomestars"."Inquiry"("status");

-- CreateIndex
CREATE INDEX "Inquiry_userId_idx" ON "thehomestars"."Inquiry"("userId");

-- CreateIndex
CREATE INDEX "Appointment_startsAt_idx" ON "thehomestars"."Appointment"("startsAt");

-- CreateIndex
CREATE INDEX "Appointment_status_idx" ON "thehomestars"."Appointment"("status");

-- CreateIndex
CREATE INDEX "Appointment_quoteRequestId_idx" ON "thehomestars"."Appointment"("quoteRequestId");

-- AddForeignKey
ALTER TABLE "thehomestars"."Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "thehomestars"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "thehomestars"."Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "thehomestars"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "thehomestars"."QuoteRequest" ADD CONSTRAINT "QuoteRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "thehomestars"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "thehomestars"."QuoteRequest" ADD CONSTRAINT "QuoteRequest_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "thehomestars"."Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "thehomestars"."Project" ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "thehomestars"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "thehomestars"."ProjectNote" ADD CONSTRAINT "ProjectNote_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "thehomestars"."Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "thehomestars"."Invoice" ADD CONSTRAINT "Invoice_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "thehomestars"."Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "thehomestars"."Payment" ADD CONSTRAINT "Payment_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "thehomestars"."Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "thehomestars"."Payment" ADD CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "thehomestars"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "thehomestars"."Inquiry" ADD CONSTRAINT "Inquiry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "thehomestars"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "thehomestars"."InquiryReply" ADD CONSTRAINT "InquiryReply_inquiryId_fkey" FOREIGN KEY ("inquiryId") REFERENCES "thehomestars"."Inquiry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "thehomestars"."Appointment" ADD CONSTRAINT "Appointment_quoteRequestId_fkey" FOREIGN KEY ("quoteRequestId") REFERENCES "thehomestars"."QuoteRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

