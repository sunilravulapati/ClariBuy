import { jsPDF } from "jspdf";

export const exportBuyerReport = (product, explanation, traits) => {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(22);
  doc.setTextColor(79, 70, 229); // Indigo color
  doc.text("ClariBuy Purchase Analysis", 20, 20);
  
  // Product Info
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text(`Recommended: ${product.name}`, 20, 40);
  doc.text(`Price: ₹${product.price?.toLocaleString()}`, 20, 50);

  // AI Insights
  doc.setFontSize(12);
  doc.text("Psychometric Insight:", 20, 70);
  const splitExplanation = doc.splitTextToSize(explanation, 170);
  doc.text(splitExplanation, 20, 80);

  // Technical DNA
  doc.text("Technical DNA Scores:", 20, 130);
  let yPos = 140;
  Object.entries(traits).forEach(([trait, val]) => {
    doc.text(`${trait.toUpperCase()}: ${Math.round(val * 100)}%`, 25, yPos);
    yPos += 10;
  });

  doc.save(`${product.name.replace(/\s+/g, '_')}_ClariBuy_Report.pdf`);
};