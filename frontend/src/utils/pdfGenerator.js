import { jsPDF } from 'jspdf';

/**
 * Generates an executive, styled multi-page PDF career profile report safely.
 */
export function generatePdfReport(profile) {
  if (!profile || !profile.student_profile) {
    throw new Error('No profile data available for PDF generation');
  }

  const sp = profile.student_profile;
  const fullName = String(sp.fullName || 'Student');
  const preferredCareer = String(sp.preferredCareer || 'Target Career');
  const collegeName = String(sp.collegeName || 'Institute');
  const degree = String(sp.degree || 'Degree');
  const branch = String(sp.branch || 'Department');
  const academicYear = String(sp.academicYear || 'Year');
  const cgpa = String(sp.cgpa || 'N/A');
  const careerGoal = String(sp.careerGoal || 'Career Advancement');
  const matchPercentage = profile.skill_gap_analysis?.overall_match_percentage || 75;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  function checkPageBreak(spaceNeeded) {
    if (y + spaceNeeded > pageHeight - margin) {
      doc.addPage();
      y = margin;
      drawHeaderFooter();
    }
  }

  function drawHeaderFooter() {
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text('CareerAI – Personalized Career Content Report', margin, pageHeight - 10);
    const pageNum = doc.internal.getCurrentPageInfo().pageNumber;
    doc.text(`Page ${pageNum}`, pageWidth - margin - 15, pageHeight - 10);
  }

  // --- Title Banner ---
  doc.setFillColor(2, 132, 199);
  doc.rect(margin, y, contentWidth, 24, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.text('CareerAI – Personalized Career Profile Report', margin + 6, y + 10);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  const genDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  doc.text(`Candidate: ${fullName} | Role: ${preferredCareer} | Generated: ${genDate}`, margin + 6, y + 18);

  y += 32;

  // --- Student Snapshot Card ---
  doc.setFillColor(240, 249, 255);
  doc.setDrawColor(186, 230, 253);
  doc.roundedRect(margin, y, contentWidth, 26, 3, 3, 'FD');

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('Student Snapshot', margin + 5, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);

  const col1X = margin + 5;
  const col2X = margin + 65;
  const col3X = margin + 125;

  doc.text(`Institution: ${collegeName.slice(0, 35)}`, col1X, y + 13);
  doc.text(`Degree: ${degree} - ${branch.slice(0, 25)}`, col1X, y + 19);

  doc.text(`Standing: ${academicYear} | CGPA: ${cgpa}`, col2X, y + 13);
  doc.text(`Experience: ${sp.experienceLevel || 'Intermediate'}`, col2X, y + 19);

  const goalSummary = careerGoal.length > 35 ? `${careerGoal.slice(0, 35)}...` : careerGoal;
  doc.text(`Goal: ${goalSummary}`, col3X, y + 13);
  doc.text(`Match Score: ${matchPercentage}%`, col3X, y + 19);

  y += 32;

  // --- Section 1: Professional Summary ---
  doc.setTextColor(2, 132, 199);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('1. Professional Summary', margin, y);
  y += 5;

  doc.setDrawColor(226, 232, 240);
  doc.line(margin, y, margin + contentWidth, y);
  y += 5;

  if (profile.professional_summary) {
    const ps = profile.professional_summary;

    if (ps.suggested_headline) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(30, 41, 59);
      doc.text(`Headline: ${String(ps.suggested_headline)}`, margin, y);
      y += 6;
    }

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(51, 65, 85);
    const summaryText = String(ps.full_summary || ps.short_summary || '');
    const summaryLines = doc.splitTextToSize(summaryText, contentWidth);
    doc.text(summaryLines, margin, y);
    y += (summaryLines.length * 4.5) + 4;

    if (Array.isArray(ps.key_highlights) && ps.key_highlights.length > 0) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(15, 23, 42);
      doc.text('Key Strengths & Objectives:', margin, y);
      y += 5;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(71, 85, 105);
      ps.key_highlights.forEach(h => {
        checkPageBreak(8);
        const bulletLines = doc.splitTextToSize(`• ${String(h)}`, contentWidth - 4);
        doc.text(bulletLines, margin + 4, y);
        y += (bulletLines.length * 4) + 1;
      });
    }
  }

  y += 6;
  checkPageBreak(30);

  // --- Section 2: Skill Gap Analysis ---
  doc.setTextColor(2, 132, 199);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('2. Skill Gap Analysis & Industry Benchmark', margin, y);
  y += 5;

  doc.setDrawColor(226, 232, 240);
  doc.line(margin, y, margin + contentWidth, y);
  y += 6;

  if (profile.skill_gap_analysis) {
    const sga = profile.skill_gap_analysis;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text(`Target Role: ${sga.target_role || preferredCareer} | Readiness: ${sga.readiness_level || 'Evaluated'} (${sga.overall_match_percentage || 75}% Match)`, margin, y);
    y += 6;

    if (Array.isArray(sga.possessed_skills) && sga.possessed_skills.length > 0) {
      checkPageBreak(12);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(22, 163, 74);
      doc.text('Already Possessed Skills:', margin, y);
      y += 4.5;
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(51, 65, 85);
      const posStr = sga.possessed_skills.map(s => s.skill || s).join(', ');
      const pLines = doc.splitTextToSize(posStr, contentWidth - 4);
      doc.text(pLines, margin + 4, y);
      y += (pLines.length * 4) + 3;
    }

    if (Array.isArray(sga.needs_improvement_skills) && sga.needs_improvement_skills.length > 0) {
      checkPageBreak(12);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(217, 119, 6);
      doc.text('Needs Improvement (Deepen Practical Proficiency):', margin, y);
      y += 4.5;
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(51, 65, 85);
      sga.needs_improvement_skills.forEach(s => {
        checkPageBreak(8);
        const line = `• ${s.skill || 'Skill'}: ${s.improvement_tip || s.gap_reason || 'Practice advanced implementations'}`;
        const sLines = doc.splitTextToSize(line, contentWidth - 4);
        doc.text(sLines, margin + 4, y);
        y += (sLines.length * 4) + 1;
      });
      y += 2;
    }

    if (Array.isArray(sga.missing_skills) && sga.missing_skills.length > 0) {
      checkPageBreak(12);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(220, 38, 38);
      doc.text('Missing High-Priority Skills:', margin, y);
      y += 4.5;
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(51, 65, 85);
      sga.missing_skills.forEach(s => {
        checkPageBreak(8);
        const line = `• ${s.skill || 'Skill'} [${s.importance || 'High'}]: ${s.action_plan || s.why_needed || 'Follow guided labs'}`;
        const mLines = doc.splitTextToSize(line, contentWidth - 4);
        doc.text(mLines, margin + 4, y);
        y += (mLines.length * 4) + 1;
      });
    }
  }

  y += 6;
  checkPageBreak(30);

  // --- Section 3: Learning Recommendations ---
  doc.setTextColor(2, 132, 199);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('3. Personalized Learning Roadmap & Weekly Plan', margin, y);
  y += 5;

  doc.setDrawColor(226, 232, 240);
  doc.line(margin, y, margin + contentWidth, y);
  y += 6;

  if (profile.learning_recommendations) {
    const lr = profile.learning_recommendations;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text(`Estimated Commitment: ${lr.estimated_total_hours || '120-140 Hours'}`, margin, y);
    y += 6;

    if (Array.isArray(lr.learning_roadmap)) {
      lr.learning_roadmap.forEach(phase => {
        checkPageBreak(16);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(3, 105, 161);
        doc.text(`${phase.phase || 'Phase'} (${phase.duration || ''}): ${phase.focus || ''}`, margin, y);
        y += 4.5;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(71, 85, 105);
        if (Array.isArray(phase.milestones)) {
          phase.milestones.forEach(m => {
            checkPageBreak(6);
            doc.text(`  - ${String(m)}`, margin + 2, y);
            y += 4;
          });
        }
        y += 2;
      });
    }
  }

  y += 6;
  checkPageBreak(30);

  // --- Section 4: Interview Preparation ---
  doc.setTextColor(2, 132, 199);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('4. Interview Preparation (Technical & HR)', margin, y);
  y += 5;

  doc.setDrawColor(226, 232, 240);
  doc.line(margin, y, margin + contentWidth, y);
  y += 6;

  if (profile.interview_preparation) {
    const ip = profile.interview_preparation;

    // Technical Questions
    if (Array.isArray(ip.technical_questions) && ip.technical_questions.length > 0) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(15, 23, 42);
      doc.text(`Technical Interview Questions (${ip.technical_questions.length} Questions):`, margin, y);
      y += 6;

      ip.technical_questions.forEach((q, idx) => {
        checkPageBreak(22);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(30, 41, 59);
        const qTitle = `Q${idx + 1}. [${q.category || 'Tech'} - ${q.difficulty || 'Medium'}] ${q.question || ''}`;
        const qLines = doc.splitTextToSize(qTitle, contentWidth);
        doc.text(qLines, margin, y);
        y += (qLines.length * 4) + 1;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(71, 85, 105);
        const ansLines = doc.splitTextToSize(`Ans: ${q.detailed_answer || ''}`, contentWidth - 4);
        doc.text(ansLines, margin + 4, y);
        y += (ansLines.length * 3.8) + 3;
      });
    }

    // HR Questions
    if (Array.isArray(ip.hr_questions) && ip.hr_questions.length > 0) {
      checkPageBreak(20);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(15, 23, 42);
      doc.text(`HR & Behavioral Questions (${ip.hr_questions.length} Questions):`, margin, y);
      y += 6;

      ip.hr_questions.forEach((q, idx) => {
        checkPageBreak(22);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(30, 41, 59);
        const qTitle = `HR ${idx + 1}. ${q.question || ''}`;
        const qLines = doc.splitTextToSize(qTitle, contentWidth);
        doc.text(qLines, margin, y);
        y += (qLines.length * 4) + 1;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(71, 85, 105);
        const ansLines = doc.splitTextToSize(`STAR Answer: ${q.star_framework_answer || ''}`, contentWidth - 4);
        doc.text(ansLines, margin + 4, y);
        y += (ansLines.length * 3.8) + 3;
      });
    }
  }

  // Draw footers
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    drawHeaderFooter();
  }

  // Save the PDF
  const safeName = fullName.replace(/[^a-zA-Z0-9]/g, '_');
  doc.save(`${safeName}_CareerAI_Report.pdf`);
}
