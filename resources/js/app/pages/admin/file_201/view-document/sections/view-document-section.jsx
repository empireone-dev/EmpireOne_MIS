import SummernoteEditor from "@/app/pages/_components/summernote-editor2";
import { App, Button } from "antd";
import { FilePdfOutlined } from "@ant-design/icons";
import React from 'react'
import { useState, useRef } from 'react';
import { useSelector } from "react-redux";
import html2pdf from 'html2pdf.js';

export default function ViewDocumentSection() {

    const { onboarding_ackdoc } = useSelector((state) => state.onboarding_ackdocs);

    const { onboarding_doc } = useSelector((state) => state.onboarding_docs);
    const [form, setForm] = useState({});
    const [loading, setLoading] = useState(false);
    const [pdfLoading, setPdfLoading] = useState(false);
    const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
    const documentRef = useRef(null);

    console.log("onboarding_ackdoc:", onboarding_ackdoc);

    // Get the e-signature from the onboarding_ackdoc data
    const eSignature = onboarding_ackdoc?.length > 0 ? onboarding_ackdoc[0]?.e_signature : null;

    console.log("eSignature:", eSignature);

    // Combine document content with e-signature
    const getDocumentContentWithSignature = () => {
        let content = onboarding_doc?.data?.doc_content ?? "";

        if (eSignature && eSignature.signature) {
            const signatureHtml = `
                        <div style="display: inline-block; text-align: center; margin: 20px 0;">
                        <img 
                            src="${eSignature.signature}" 
                            alt="Electronic Signature" 
                            style="max-width: 400px; max-height: 180px; background-color: white; display: block; margin: 0 auto; border: none; outline: none;"
                            loading="eager"
                        />
                        <div style="display: none; color: #6b7280; font-size: 14px;">
                            Signature image could not be loaded
                        </div>
                        <div style=" border-top: 1px solid #000; padding-top: 4px; text-transform: uppercase; letter-spacing: 1px;">
                            ${(eSignature.applicant ? eSignature.applicant.fname.toUpperCase() : '')} 
                            ${(eSignature.applicant ? eSignature.applicant.lname.toUpperCase() : '')}
                        </div>
                    </div>
            `;
            content += signatureHtml;
        }

        return content;
    };

    // Helper function to convert image to base64 using fetch (handles CORS better)
    const convertImageToBase64 = async (imageUrl) => {
        try {
            // Create a proxy image to avoid CORS issues
            const proxyImg = new Image();
            proxyImg.crossOrigin = 'anonymous';
            
            return new Promise((resolve) => {
                proxyImg.onload = () => {
                    try {
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');
                        
                        canvas.width = proxyImg.naturalWidth || proxyImg.width;
                        canvas.height = proxyImg.naturalHeight || proxyImg.height;
                        
                        ctx.drawImage(proxyImg, 0, 0);
                        const base64 = canvas.toDataURL('image/png');
                        resolve(base64);
                    } catch (error) {
                        console.error('Canvas conversion error:', error);
                        resolve(imageUrl); // fallback to original URL
                    }
                };
                
                proxyImg.onerror = () => {
                    console.error('Image loading error for:', imageUrl);
                    resolve(imageUrl); // fallback to original URL
                };
                
                // Set source last to trigger loading
                proxyImg.src = imageUrl;
            });
        } catch (error) {
            console.error('Error in convertImageToBase64:', error);
            return imageUrl; // fallback to original URL
        }
    };

    const handleDownloadPDF = async () => {
        if (!documentRef.current) return;

        setPdfLoading(true);
        setIsGeneratingPdf(true);

        try {
            const element = documentRef.current;
            const filename = `${(onboarding_doc?.data?.doc_name ?? "Document").replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`;

            // Expand the container temporarily
            const originalStyle = {
                height: element.style.height,
                maxHeight: element.style.maxHeight,
                overflow: element.style.overflow,
            };

            element.style.height = 'auto';
            element.style.maxHeight = 'none';
            element.style.overflow = 'visible';

            // Convert signature images to base64 for better PDF compatibility
            const signatureImages = element.querySelectorAll('img[alt="Electronic Signature"]');
            
            for (const img of signatureImages) {
                try {
                    const originalSrc = img.src;
                    console.log('Converting signature image:', originalSrc);
                    
                    // Convert to base64
                    const base64Src = await convertImageToBase64(originalSrc);
                    img.src = base64Src;
                    
                    console.log('Signature converted successfully');
                } catch (error) {
                    console.error('Failed to convert signature:', error);
                    // Continue with original src if conversion fails
                }
            }

            // Ensure fonts/images are loaded
            await new Promise(resolve => setTimeout(resolve, 1000));

            const opt = {
                margin: [10, 10, 10, 10], // mm margins
                filename,
                image: {
                    type: 'jpeg',
                    quality: 1, // best quality
                },
                html2canvas: {
                    scale: 2, // higher scale = sharper text
                    useCORS: true,
                    allowTaint: true, // Allow cross-origin images
                    logging: true, // Enable logging to debug
                    scrollX: 0,
                    scrollY: 0,
                    windowWidth: element.scrollWidth, // ensures full width capture
                    windowHeight: element.scrollHeight,
                    onclone: (clonedDoc) => {
                        // Ensure images in cloned document are properly loaded
                        const clonedImages = clonedDoc.querySelectorAll('img[alt="Electronic Signature"]');
                        clonedImages.forEach(img => {
                            img.style.display = 'block';
                            img.style.visibility = 'visible';
                            img.style.opacity = '1';
                            console.log('Cloned image src:', img.src.substring(0, 50) + '...');
                        });
                    }
                },
                jsPDF: {
                    unit: 'mm',
                    format: 'a4',
                    orientation: 'portrait',
                },
                pagebreak: {
                    mode: ['avoid-all', 'css', 'legacy'],
                    before: '.page-break', // allow manual page breaks
                    avoid: ['img', 'tr', 'td'] // try not to break these
                },
            };

            // Generate and save PDF
            await html2pdf().set(opt).from(element).save();

            // Restore original styles
            element.style.height = originalStyle.height;
            element.style.maxHeight = originalStyle.maxHeight;
            element.style.overflow = originalStyle.overflow;

        } catch (error) {
            console.error('Error generating PDF:', error);
            // Fallback: restore styles
            if (documentRef.current) {
                documentRef.current.style.height = 'auto';
                documentRef.current.style.maxHeight = 'none';
                documentRef.current.style.overflow = 'visible';
            }
        } finally {
            setPdfLoading(false);
            setIsGeneratingPdf(false);
        }
    };

    return (
        <div>
            <div className="mb-6 flex justify-end items-center">
                <Button
                    type="primary"
                    icon={<FilePdfOutlined />}
                    onClick={handleDownloadPDF}
                    loading={pdfLoading}
                    size="large"
                    className="bg-red-600 hover:bg-red-700 border-red-600 hover:border-red-700"
                >
                    {pdfLoading ? 'Generating PDF...' : 'Download PDF'}
                </Button>
            </div>

            <div
                ref={documentRef}
                className="bg-white p-8 shadow-sm border rounded-lg"
                style={{
                    width: '100%',
                    maxWidth: 'none',
                    minHeight: 'auto',
                    height: 'auto'
                }}
            >
                {!isGeneratingPdf && (
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">
                            {onboarding_doc?.data?.doc_name ?? "No Document Title"}
                        </h1>
                    </div>
                )}

                {/* Document Content */}
                <div
                    className="document-content"
                    dangerouslySetInnerHTML={{ __html: getDocumentContentWithSignature() }}
                    style={{
                        fontFamily: 'Arial, sans-serif',
                        lineHeight: '1.6',
                        color: '#333',
                        fontSize: '14px',
                        width: '100%',
                        wordWrap: 'break-word',
                        overflow: 'visible',
                        display: 'block'
                    }}
                />
            </div>
        </div>
    )
}
