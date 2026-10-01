import React, { useState } from "react";
import { Tooltip } from "antd";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import moment from "moment";

// Source documents the employee acknowledged, keyed by acknowledgment type.
const DOC_PDF_PATHS = {
    cocd: "/documents/code-of-discipline.pdf",
    handbook: "/documents/employee-handbook.pdf",
    ethics: "/documents/code-of-ethics.pdf",
    nda: "/documents/nda.pdf",
    government: "/documents/government-mandated.pdf",
    payroll_101: "/documents/payroll_101_2026.pdf",
};

async function fetchBytes(url) {
    const res = await fetch(url);
    if (!res.ok) return null;
    return res.arrayBuffer();
}

// Transparent PNGs can leave a faint border/halo when embedded directly in a PDF,
// so flatten onto a white background and re-encode as JPEG before embedding.
function loadImageAsJpegBytes(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            const ctx = canvas.getContext("2d");
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
            canvas.toBlob(
                (blob) => {
                    if (!blob) {
                        reject(new Error("Failed to convert image"));
                        return;
                    }
                    blob.arrayBuffer().then(resolve).catch(reject);
                },
                "image/jpeg",
                0.95,
            );
        };
        img.onerror = reject;
        img.src = url;
    });
}

function dataUrlToBytes(dataUrl) {
    const base64 = dataUrl.split(",")[1] ?? "";
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
}

export default function DownloadDocumentSection({
    docType,
    docLabel,
    ack,
    employeeName,
}) {
    const [downloading, setDownloading] = useState(false);

    const hasAcknowledged = !!ack;

    const handleDownload = async () => {
        if (!hasAcknowledged || downloading) return;

        setDownloading(true);
        try {
            const empName = ack.emp_name || employeeName || "";
            const sourcePath = DOC_PDF_PATHS[docType];
            const sourceBytes = sourcePath
                ? await fetchBytes(sourcePath)
                : null;

            const pdfDoc = sourceBytes
                ? await PDFDocument.load(sourceBytes)
                : await PDFDocument.create();

            const fontBold = await pdfDoc.embedFont(
                StandardFonts.HelveticaBold,
            );
            const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

            const page = pdfDoc.addPage([612, 792]);
            const { width, height } = page.getSize();

            // Logo
            const logoBytes = await loadImageAsJpegBytes("/images/E1CXlogo.png");
            if (logoBytes) {
                const logo = await pdfDoc.embedJpg(logoBytes);
                const logoWidth = 100;
                const logoHeight = (logo.height / logo.width) * logoWidth;
                page.drawImage(logo, {
                    x: 50,
                    y: height - 50 - logoHeight,
                    width: logoWidth,
                    height: logoHeight,
                });
            }

            // Title + status
            const title = docLabel || "Acknowledgment";
            page.drawText(title, {
                x: width - 50 - fontBold.widthOfTextAtSize(title, 14),
                y: height - 55,
                size: 14,
                font: fontBold,
                color: rgb(0.1, 0.1, 0.1),
            });
            const status = "Signed & Acknowledged";
            page.drawText(status, {
                x: width - 50 - font.widthOfTextAtSize(status, 10),
                y: height - 72,
                size: 10,
                font,
                color: rgb(0.1, 0.5, 0.2),
            });

            page.drawLine({
                start: { x: 50, y: height - 90 },
                end: { x: width - 50, y: height - 90 },
                thickness: 1,
                color: rgb(0.85, 0.85, 0.85),
            });

            // Certification statement
            page.drawText(
                "This certifies that the employee named below has read and acknowledged the document included in this file.",
                {
                    x: 50,
                    y: height - 115,
                    size: 10.5,
                    font,
                    color: rgb(0.3, 0.3, 0.3),
                },
            );

            // Employee name + date
            page.drawText(empName, {
                x: 50,
                y: height - 165,
                size: 12,
                font: fontBold,
                color: rgb(0.1, 0.1, 0.1),
            });
            const dateStr = ack.acknowledged_at
                ? moment(ack.acknowledged_at).format("MMMM D, YYYY [at] h:mm A")
                : "";
            page.drawText(dateStr, {
                x: 50,
                y: height - 180,
                size: 9,
                font,
                color: rgb(0.5, 0.5, 0.5),
            });

            // E-signature box
            const boxX = 50;
            const boxY = height - 300;
            const boxWidth = 240;
            const boxHeight = 110;
            page.drawRectangle({
                x: boxX,
                y: boxY,
                width: boxWidth,
                height: boxHeight,
                borderColor: rgb(0.8, 0.8, 0.8),
                borderWidth: 1,
            });
            page.drawText("E-SIGNATURE", {
                x: boxX + 15,
                y: boxY + boxHeight - 20,
                size: 8,
                font,
                color: rgb(0.6, 0.6, 0.6),
            });

            if (ack.signature) {
                const sigBytes = dataUrlToBytes(ack.signature);
                const isJpg = ack.signature.startsWith("data:image/jpeg");
                const sigImage = isJpg
                    ? await pdfDoc.embedJpg(sigBytes)
                    : await pdfDoc.embedPng(sigBytes);
                const maxW = boxWidth - 30;
                const maxH = 50;
                const scale = Math.min(
                    maxW / sigImage.width,
                    maxH / sigImage.height,
                    1,
                );
                const sigDims = {
                    width: sigImage.width * scale,
                    height: sigImage.height * scale,
                };
                page.drawImage(sigImage, {
                    x: boxX + (boxWidth - sigDims.width) / 2,
                    y: boxY + 35,
                    width: sigDims.width,
                    height: sigDims.height,
                });
            }

            page.drawLine({
                start: { x: boxX + 15, y: boxY + 30 },
                end: { x: boxX + boxWidth - 15, y: boxY + 30 },
                thickness: 1,
                color: rgb(0.8, 0.8, 0.8),
            });
            page.drawText(empName, {
                x: boxX + (boxWidth - font.widthOfTextAtSize(empName, 9)) / 2,
                y: boxY + 15,
                size: 9,
                font,
                color: rgb(0.4, 0.4, 0.4),
            });

            const mergedBytes = await pdfDoc.save();
            const blob = new Blob([mergedBytes], { type: "application/pdf" });
            const url = URL.createObjectURL(blob);

            const safeName = empName.trim().replace(/\s+/g, "_") || "employee";
            const safeDoc = (docLabel || "Acknowledgment").replace(/\s+/g, "_");

            const link = document.createElement("a");
            link.href = url;
            link.download = `${safeName}_${safeDoc}_Acknowledgment.pdf`;
            link.click();
            URL.revokeObjectURL(url);
        } finally {
            setDownloading(false);
        }
    };

    return (
        <Tooltip
            title={
                hasAcknowledged
                    ? "Download Signed Document"
                    : "Not yet acknowledged"
            }
        >
            <button
                onClick={handleDownload}
                disabled={!hasAcknowledged || downloading}
                className={
                    hasAcknowledged
                        ? "bg-amber-400 hover:bg-amber-500 text-white p-2 px-4 rounded-md"
                        : "bg-gray-200 text-gray-400 p-2 px-4 rounded-md cursor-not-allowed"
                }
            >
                <ArrowDownTrayIcon className="h-5" />
            </button>
        </Tooltip>
    );
}
